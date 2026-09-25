// Tests for engine paths that had none (REMEDIATION_TASKS.md P1-12), ported from eval-scratch/engine.
import { afterAll, describe, expect, it } from 'vitest'
import { loadContent } from '../scripts/load-content'
import type { Mcq } from '../src/content/schema'
import { DEFAULT_SETTINGS, type Attempt, type SrsItem } from '../src/db/types'
import { weightedPercent } from '../src/lib/analytics'
import { buildCardQueue } from '../src/lib/cardQueue'
import { addDays, dayKey, diffDays, parseDay, weekday } from '../src/lib/dates'
import { buildMasteryCheck, buildQuiz, historyByItem, interleave, type ItemHistory } from '../src/lib/quiz'
import { mulberry32, shuffle } from '../src/lib/random'
import { newCard } from '../src/lib/srs'
import { computeStudyState } from '../src/lib/studyState'

describe('shuffle', () => {
  it('is uniform over all 24 permutations of 4 (chi-square, p = 0.001)', () => {
    const counts = new Map<string, number>()
    const rand = mulberry32(12345)
    const trials = 48_000
    for (let t = 0; t < trials; t++) {
      const k = shuffle([0, 1, 2, 3], rand).join('')
      counts.set(k, (counts.get(k) ?? 0) + 1)
    }
    const exp = trials / 24
    const chi = [...counts.values()].reduce((a, c) => a + (c - exp) ** 2 / exp, 0)
    expect(counts.size).toBe(24)
    expect(chi).toBeLessThan(49.73)
  })
  it('is reproducible for a seed and does not mutate its input', () => {
    const input = [1, 2, 3, 4, 5]
    expect(shuffle(input, mulberry32(7))).toEqual(shuffle(input, mulberry32(7)))
    expect(input).toEqual([1, 2, 3, 4, 5])
  })
})

const mk = (id: string, moduleId: string, pool: Mcq['pool'] = 'practice') =>
  ({ id, moduleId, pool, stem: 's', choices: [], answer: 'a', explanation: '', skill: 'application', difficulty: 2, calc: false, needsReview: false }) as unknown as Mcq

describe('buildQuiz and buildMasteryCheck', () => {
  const pool = [
    ...Array.from({ length: 12 }, (_, i) => mk(`far-a-${i}`, 'far-a')),
    ...Array.from({ length: 6 }, (_, i) => mk(`far-b-${i}`, 'far-b')),
    mk('far-a-exam', 'far-a', 'exam'),
    mk('far-a-lesson', 'far-a', 'lesson'),
  ]
  it('never returns duplicates or exam/lesson items, and respects the count', () => {
    for (let s = 0; s < 200; s++) {
      const q = buildQuiz(pool, { moduleIds: ['far-a', 'far-b'], status: 'all', count: 10, seed: s }, new Map(), new Map())
      expect(q).toHaveLength(10)
      expect(new Set(q.map((x) => x.id)).size).toBe(10)
      expect(q.every((x) => x.pool === 'practice')).toBe(true)
    }
  })
  it('prefers least-seen items', () => {
    const hist = new Map<string, ItemHistory>(pool.slice(0, 12).map((q) => [q.id, { attempts: 3, everMissed: false, lastCorrect: true }]))
    const q = buildQuiz(pool, { moduleIds: ['far-a', 'far-b'], status: 'all', count: 6, seed: 1 }, hist, new Map())
    expect(q.every((x) => x.moduleId === 'far-b')).toBe(true)
  })
  it('handles empty inputs', () => {
    expect(buildQuiz(pool, { moduleIds: ['far-zzz'], status: 'all', count: 10, seed: 1 }, new Map(), new Map())).toEqual([])
    expect(buildQuiz(pool, { moduleIds: ['far-a'], status: 'all', count: 0, seed: 1 }, new Map(), new Map())).toEqual([])
    expect(buildQuiz(pool, { moduleIds: [], status: 'all', count: 5, seed: 1 }, new Map(), new Map())).toEqual([])
    expect(buildMasteryCheck(pool, 'far-zzz', [], new Map(), 1)).toEqual([])
  })
  it('mastery check mixes 5 own items with up to 3 from other modules, without duplicates', () => {
    for (let s = 0; s < 100; s++) {
      const q = buildMasteryCheck(pool, 'far-a', ['far-a', 'far-b'], new Map(), s)
      expect(q.filter((x) => x.moduleId === 'far-a')).toHaveLength(5)
      expect(q.filter((x) => x.moduleId === 'far-b')).toHaveLength(3)
      expect(new Set(q.map((x) => x.id)).size).toBe(8)
    }
  })
  it('interleave is a permutation with no adjacent repeats when that is feasible', () => {
    for (let s = 0; s < 200; s++) {
      const rand = mulberry32(s)
      const items = Array.from({ length: 12 }, (_, i) => ({ id: i, moduleId: 'm' + Math.floor(rand() * 3) }))
      const out = interleave(items)
      expect(out.map((x) => x.id).sort((a, b) => a - b)).toEqual(items.map((x) => x.id))
      const max = Math.max(...['m0', 'm1', 'm2'].map((m) => items.filter((x) => x.moduleId === m).length))
      if (max <= Math.ceil(items.length / 2)) expect(out.filter((x, i) => i > 0 && out[i - 1].moduleId === x.moduleId)).toHaveLength(0)
    }
  })
  it('historyByItem: the latest attempt wins, and any miss is remembered', () => {
    const at = (s: string, correct: boolean, mode: Attempt['mode'] = 'tutor') => ({ itemId: 'x', correct, at: s, mode }) as Attempt
    expect(historyByItem([]).size).toBe(0)
    expect(historyByItem([at('2026-01-02T00:00:00Z', true), at('2026-01-01T00:00:00Z', false, 'lesson')]).get('x')).toMatchObject({
      attempts: 2,
      lastCorrect: true,
      everMissed: true,
    })
  })
})

describe('buildCardQueue', () => {
  const cards = Array.from({ length: 30 }, (_, i) => ({ id: `c${i}`, moduleId: i < 20 ? 'm1' : 'm2', section: 'FAR' as const, front: 'f', back: 'b', needsReview: false }))
  const srsCard = (id: string, due: string, introduced: string): SrsItem => ({ key: `card:${id}`, kind: 'card', itemId: id, moduleId: 'm1', section: 'FAR', card: newCard(), due, introduced })
  it('subtracts cards introduced today from the new-card allowance and sorts due cards most-overdue first', () => {
    const srs = [srsCard('c0', '2026-03-01T00:00:00.000Z', '2026-03-01'), srsCard('c1', '2026-02-01T00:00:00.000Z', '2026-03-05'), srsCard('c2', '2026-04-01T00:00:00.000Z', '2026-03-05')]
    const r = buildCardQueue({ cards, srs, studiedModules: new Set(['m1']), newPerDay: 5, today: '2026-03-05', now: '2026-03-05T12:00:00.000Z' })
    expect(r.due.map((c) => c.id)).toEqual(['c1', 'c0'])
    expect(r.fresh).toHaveLength(3)
    expect(r.fresh.every((c) => c.moduleId === 'm1')).toBe(true)
  })
  it('never goes negative, and a module filter bypasses the daily limit', () => {
    const srs = Array.from({ length: 8 }, (_, i) => srsCard(`c${i}`, '2099-01-01T00:00:00.000Z', '2026-03-05'))
    expect(buildCardQueue({ cards, srs, studiedModules: new Set(['m1']), newPerDay: 5, today: '2026-03-05', now: '2026-03-05T12:00:00.000Z' }).fresh).toHaveLength(0)
    expect(buildCardQueue({ cards, srs, studiedModules: new Set(), newPerDay: 5, today: '2026-03-05', now: '2026-03-05T12:00:00.000Z', moduleFilter: 'm1' }).fresh).toHaveLength(12)
  })
})

describe('date helpers across time zones', () => {
  const original = process.env.TZ
  afterAll(() => {
    process.env.TZ = original
  })
  for (const tz of ['UTC', 'America/Los_Angeles', 'Pacific/Kiritimati', 'America/Santiago', 'Australia/Lord_Howe']) {
    it(`${tz}: addDays, diffDays and weekday walk 2025–2027 without gaps, and dayKey(parseDay(k)) round-trips`, () => {
      process.env.TZ = tz
      let k = '2025-01-01'
      let wd = weekday(k)
      for (let i = 1; i <= 365 * 3; i++) {
        const n = addDays(k, 1)
        const [y, m, d] = k.split('-').map(Number)
        expect(n, `after ${k}`).toBe(new Date(Date.UTC(y, m - 1, d + 1)).toISOString().slice(0, 10))
        expect(diffDays('2025-01-01', n)).toBe(i)
        expect(weekday(n)).toBe((wd + 1) % 7)
        expect(dayKey(parseDay(n))).toBe(n)
        wd = weekday(n)
        k = n
      }
    })
  }
})

describe('scoring helpers', () => {
  it('weightedPercent applies the section weighting', () => {
    expect(weightedPercent(0.8, 0.4, { mcq: 50, tbs: 50 })).toBeCloseTo(0.6)
    expect(weightedPercent(1, 0, { mcq: 60, tbs: 40 })).toBeCloseTo(0.6)
  })
})

describe('computeStudyState', () => {
  const { bundle } = loadContent()
  const section = bundle.sections.find((s) => s.id === 'FAR')!
  const empty = { attempts: [], progress: [], srs: [], errors: [], quizSessions: [], tbsSessions: [], examSessions: [] }
  const settings = { ...DEFAULT_SETTINGS, onboarded: true, examDates: { FAR: '2026-12-15' } }
  it('starts a new learner with no readiness estimate and a lesson as the next action', () => {
    const s = computeStudyState({ content: bundle, section, settings, ...empty, now: new Date('2026-09-25T12:00:00Z') })
    expect(s.readiness.overall).toBeNull()
    expect(s.modules.every((m) => m.mastery.status === 'not-started')).toBe(true)
    expect(s.plan.days.length).toBeGreaterThan(0)
    expect(s.next.to).toMatch(/module|practice|review|flashcards|tbs|exam/)
  })
  it('counts practice per module and ignores other sections', () => {
    const m = s0Module()
    const attempts: Attempt[] = Array.from({ length: 4 }, (_, i) => ({
      itemId: `x${i}`,
      itemType: 'mcq',
      moduleId: m,
      section: 'FAR',
      correct: true,
      score: 1,
      confidence: 'confident',
      timeMs: 1000,
      mode: 'tutor',
      mixed: false,
      sessionId: 's',
      at: '2026-09-25T10:00:00.000Z',
      day: '2026-09-25',
    }))
    const other = { ...attempts[0], section: 'AUD' as const, moduleId: 'aud-x' }
    const s = computeStudyState({ content: bundle, section, settings, ...empty, attempts: [...attempts, other], now: new Date('2026-09-25T12:00:00Z') })
    expect(s.modules.find((x) => x.id === m)!.practiceCount).toBe(4)
  })
  function s0Module() {
    return bundle.modules.find((x) => x.section === 'FAR')!.id
  }
})
