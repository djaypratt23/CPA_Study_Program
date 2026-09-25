// Shuffle bias (chi-square), seeding, buildQuiz / mastery-check invariants, empty states.
import { describe, expect, it } from 'vitest'
import { mulberry32, shuffle } from '../../src/lib/random'
import { buildMasteryCheck, buildQuiz, historyByItem, interleave, type ItemHistory } from '../../src/lib/quiz'
import type { Mcq } from '../../src/content/schema'
import type { Attempt } from '../../src/db/types'

// chi-square critical values at p = 0.001
const CRIT_23 = 49.73 // df = 23 (24 permutations of 4)
const CRIT_119 = 173.6 // df = 119 (120 permutations of 5), approx

function permChiSquare(n: number, trials: number, rand: () => number) {
  const counts = new Map<string, number>()
  const base = Array.from({ length: n }, (_, i) => i)
  for (let t = 0; t < trials; t++) {
    const k = shuffle(base, rand).join('')
    counts.set(k, (counts.get(k) ?? 0) + 1)
  }
  let perms = 1
  for (let i = 2; i <= n; i++) perms *= i
  const exp = trials / perms
  let chi = 0
  for (const c of counts.values()) chi += (c - exp) ** 2 / exp
  chi += (perms - counts.size) * exp // unseen permutations
  return { chi, seen: counts.size, perms }
}

describe('shuffle uniformity', () => {
  it('Fisher-Yates + mulberry32 (one seeded stream) is uniform over all 24 permutations of 4', () => {
    const r = permChiSquare(4, 240_000, mulberry32(12345))
    console.log('mulberry32 single stream n=4', r)
    expect(r.seen).toBe(24)
    expect(r.chi).toBeLessThan(CRIT_23)
  })
  it('uniform over 120 permutations of 5 with Math.random', () => {
    const r = permChiSquare(5, 240_000, Math.random)
    console.log('Math.random n=5', r)
    expect(r.chi).toBeLessThan(CRIT_119)
  })
  it('first draw across consecutive integer seeds (as Date.now() seeds would be) is uniform', () => {
    // buildQuiz seeds with Date.now(); consecutive seeds must not correlate.
    const counts = [0, 0, 0, 0]
    const N = 200_000
    for (let s = 1_700_000_000_000; s < 1_700_000_000_000 + N; s++) counts[shuffle([0, 1, 2, 3], mulberry32(s))[0]]++
    const exp = N / 4
    const chi = counts.reduce((a, c) => a + (c - exp) ** 2 / exp, 0)
    console.log('first element over consecutive seeds', counts, chi)
    expect(chi).toBeLessThan(16.27) // df=3, p=0.001
  })
  it('mulberry32 truncates seeds to 32 bits: Date.now() seeds 2^32 ms apart collide', () => {
    const a = mulberry32(1_700_000_000_000)
    const b = mulberry32(1_700_000_000_000 + 2 ** 32)
    expect(a()).toBe(b()) // documented behaviour, harmless (49.7 days apart)
  })
  it('same seed -> same order (reproducible)', () => {
    expect(shuffle([1, 2, 3, 4, 5], mulberry32(7))).toEqual(shuffle([1, 2, 3, 4, 5], mulberry32(7)))
  })
})

const mk = (id: string, moduleId: string, pool: Mcq['pool'] = 'practice') =>
  ({ id, moduleId, pool, stem: 's', choices: [], answer: 'a', explanation: '', skill: 'application', difficulty: 2, calc: false, needsReview: false }) as unknown as Mcq

describe('buildQuiz', () => {
  const pool = [
    ...Array.from({ length: 12 }, (_, i) => mk(`far-a-${i}`, 'far-a')),
    ...Array.from({ length: 6 }, (_, i) => mk(`far-b-${i}`, 'far-b')),
    mk('far-a-exam', 'far-a', 'exam'),
    mk('far-a-lesson', 'far-a', 'lesson'),
  ]
  it('never returns duplicates, never exam/lesson pool, respects count', () => {
    for (let s = 0; s < 500; s++) {
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
  it('empty states: module with zero questions / count 0 / no modules', () => {
    expect(buildQuiz(pool, { moduleIds: ['far-zzz'], status: 'all', count: 10, seed: 1 }, new Map(), new Map())).toEqual([])
    expect(buildQuiz(pool, { moduleIds: ['far-a'], status: 'all', count: 0, seed: 1 }, new Map(), new Map())).toEqual([])
    expect(buildQuiz(pool, { moduleIds: [], status: 'all', count: 5, seed: 1 }, new Map(), new Map())).toEqual([])
    expect(buildMasteryCheck(pool, 'far-zzz', [], new Map(), 1)).toEqual([])
    expect(historyByItem([]).size).toBe(0)
  })
  it('mastery check: <=5 own + <=3 others, no duplicates', () => {
    for (let s = 0; s < 200; s++) {
      const q = buildMasteryCheck(pool, 'far-a', ['far-a', 'far-b'], new Map(), s)
      expect(q.filter((x) => x.moduleId === 'far-a')).toHaveLength(5)
      expect(q.filter((x) => x.moduleId === 'far-b')).toHaveLength(3)
      expect(new Set(q.map((x) => x.id)).size).toBe(8)
    }
  })
  it('interleave is a permutation and is optimal when feasible', () => {
    for (let s = 0; s < 300; s++) {
      const rand = mulberry32(s)
      const items = Array.from({ length: 12 }, (_, i) => ({ id: i, moduleId: 'm' + Math.floor(rand() * 3) }))
      const out = interleave(items)
      expect(out.map((x) => x.id).sort((a, b) => a - b)).toEqual(items.map((x) => x.id))
      const max = Math.max(...['m0', 'm1', 'm2'].map((m) => items.filter((x) => x.moduleId === m).length))
      const feasible = max <= Math.ceil(items.length / 2)
      const adj = out.filter((x, i) => i > 0 && out[i - 1].moduleId === x.moduleId).length
      if (feasible) expect(adj).toBe(0)
    }
  })
  it('historyByItem: last attempt wins by timestamp, lesson attempts included', () => {
    const at = (s: string, correct: boolean, mode: Attempt['mode'] = 'tutor') => ({ itemId: 'x', correct, at: s, mode }) as Attempt
    const h = historyByItem([at('2026-01-02T00:00:00Z', true), at('2026-01-01T00:00:00Z', false, 'lesson')]).get('x')!
    expect(h).toMatchObject({ attempts: 2, lastCorrect: true, everMissed: true })
  })
})
