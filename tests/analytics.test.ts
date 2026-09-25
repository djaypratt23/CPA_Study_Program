import { describe, expect, it } from 'vitest'
import type { Attempt } from '../src/db/types'
import { approxScaledScore, areaReadiness, calibration, firstAttempts, overallReadiness, scoringAttempts, weakestModules } from '../src/lib/analytics'
import { interleave } from '../src/lib/quiz'
import { evaluate } from '../src/lib/calc'

const mk = (correct: boolean, confidence: Attempt['confidence'] = 'confident', moduleId = 'm1'): Attempt => ({
  itemId: Math.random().toString(),
  itemType: 'mcq',
  moduleId,
  section: 'FAR',
  correct,
  score: correct ? 1 : 0,
  confidence,
  timeMs: 60000,
  mode: 'tutor',
  mixed: true,
  sessionId: 's',
  at: new Date().toISOString(),
  day: '2026-03-01',
})

describe('readiness', () => {
  it('refuses to estimate with too little data', () => {
    const a = areaReadiness({ areaId: 'A', title: 'A', weight: 35, modules: [{ id: 'm1', lessonDone: true, status: 'learning' }], attempts: [mk(true)] })
    expect(overallReadiness([a]).overall).toBeNull()
  })
  it('blends accuracy on studied material with guess-level accuracy on unstudied material', () => {
    const attempts = Array.from({ length: 20 }, (_, i) => mk(i < 16)) // 80%
    const a = areaReadiness({
      areaId: 'A',
      title: 'A',
      weight: 1,
      modules: [
        { id: 'm1', lessonDone: true, status: 'learning' },
        { id: 'm2', lessonDone: false, status: 'not-started' },
      ],
      attempts,
    })
    expect(a.coverage).toBe(0.5)
    expect(a.estimate).toBeCloseTo(0.5 * 0.8 + 0.5 * 0.3)
    const r = overallReadiness([a])
    expect(r.raw).toBeCloseTo(0.55)
    expect(r.overall).toBe(approxScaledScore(0.55))
    expect(r.band![0]).toBeLessThan(r.overall!)
    expect(r.band![1]).toBeGreaterThan(r.overall!)
  })
  it('counts correct guesses as misses', () => {
    const attempts = Array.from({ length: 20 }, () => mk(true, 'guess'))
    const a = areaReadiness({ areaId: 'A', title: 'A', weight: 1, modules: [{ id: 'm1', lessonDone: true, status: 'learning' }], attempts })
    expect(a.accuracy).toBe(0)
  })
})

describe('calibration', () => {
  it('flags overconfidence', () => {
    const rows = calibration([...Array.from({ length: 6 }, () => mk(false, 'confident')), ...Array.from({ length: 4 }, () => mk(true, 'confident'))])
    expect(rows.find((r) => r.confidence === 'confident')!.verdict).toMatch(/Overconfident/)
  })
})

describe('weakest modules', () => {
  it('ranks low accuracy first and ignores unstudied modules', () => {
    const recs = weakestModules([
      { moduleId: 'a', title: 'A', areaId: 'X', status: 'learning', lessonDone: true, rate: { n: 10, correct: 9, pct: 0.9 } },
      { moduleId: 'b', title: 'B', areaId: 'X', status: 'learning', lessonDone: true, rate: { n: 10, correct: 4, pct: 0.4 }, topCause: 'calculation' },
      { moduleId: 'c', title: 'C', areaId: 'X', status: 'not-started', lessonDone: false, rate: { n: 0, correct: 0, pct: null } },
    ])
    expect(recs[0].moduleId).toBe('b')
    expect(recs[0].action).toMatch(/worked/)
    expect(recs.some((r) => r.moduleId === 'c')).toBe(false)
  })
})

describe('approximate scaled score', () => {
  it('maps 65% raw to 75 and is monotonic', () => {
    expect(approxScaledScore(0.65)).toBe(75)
    expect(approxScaledScore(1)).toBe(99)
    expect(approxScaledScore(0)).toBe(0)
    expect(approxScaledScore(0.7)).toBeGreaterThan(approxScaledScore(0.6))
  })
})

describe('interleaving', () => {
  it('avoids consecutive items from the same module when possible', () => {
    const items = [...'aaaabbbbcc'].map((m, i) => ({ moduleId: m, i }))
    const out = interleave(items)
    expect(out).toHaveLength(items.length)
    for (let i = 1; i < out.length; i++) expect(out[i].moduleId).not.toBe(out[i - 1].moduleId)
  })
})

describe('calculator', () => {
  it('does basic arithmetic and guards division by zero', () => {
    expect(evaluate(6, 3, '÷')).toBe(2)
    expect(evaluate(6, 3, '×')).toBe(18)
    expect(evaluate(6, 3, '−')).toBe(3)
    expect(Number.isNaN(evaluate(6, 0, '÷'))).toBe(true)
  })
})

describe('readiness v2 (P1-1)', () => {
  const at = (i: number) => new Date(Date.UTC(2026, 2, 1, 0, i)).toISOString()
  const att = (itemId: string, correct: boolean, i: number, extra: Partial<Attempt> = {}): Attempt => ({ ...mk(correct), itemId, at: at(i), ...extra })
  const oneModule = [{ id: 'm1', lessonDone: true, status: 'learning' as const }]

  it('repeats do not inflate first-attempt accuracy', () => {
    // 10 new items, half right; then the learner re-answers the 5 missed ones correctly 4 times each.
    const first = Array.from({ length: 10 }, (_, i) => att(`q${i}`, i < 5, i))
    const repeats = Array.from({ length: 20 }, (_, i) => att(`q${5 + (i % 5)}`, true, 100 + i))
    const f = firstAttempts([...first, ...repeats])
    expect(f).toHaveLength(10)
    expect(areaReadiness({ areaId: 'A', title: 'A', weight: 1, modules: oneModule, attempts: f }).accuracy).toBe(0.5)
  })

  it('ignores items first seen in a lesson, a mock, or the review queue', () => {
    const f = firstAttempts([att('a', true, 1, { mode: 'lesson' }), att('a', true, 2), att('b', true, 3, { mode: 'exam' }), att('c', true, 4, { mode: 'review' }), att('d', true, 5)])
    expect(f.map((x) => x.itemId)).toEqual(['d'])
  })

  it('mock attempts are not practice accuracy', () => {
    expect(scoringAttempts([att('a', true, 1, { mode: 'exam' }), att('b', true, 2)]).map((x) => x.itemId)).toEqual(['b'])
  })

  it('TBS results move readiness, weighted by the exam weighting', () => {
    const mcq = Array.from({ length: 20 }, (_, i) => att(`q${i}`, true, i))
    const tbs = [{ ...att('t1', false, 50), itemType: 'tbs' as const, score: 0.2 }]
    const without = areaReadiness({ areaId: 'A', title: 'A', weight: 1, modules: oneModule, attempts: mcq })
    const withTbs = areaReadiness({ areaId: 'A', title: 'A', weight: 1, modules: oneModule, attempts: mcq, tbsAttempts: tbs, weighting: { mcq: 50, tbs: 50 } })
    expect(without.accuracy).toBe(1)
    expect(withTbs.accuracy).toBeCloseTo(0.6)
    expect(overallReadiness([withTbs]).overall!).toBeLessThan(overallReadiness([without]).overall!)
  })

  it('reports readiness on the mock scaled-score scale', () => {
    const mcq = Array.from({ length: 40 }, (_, i) => att(`q${i}`, i < 26, i)) // 65%
    const r = overallReadiness([areaReadiness({ areaId: 'A', title: 'A', weight: 1, modules: oneModule, attempts: mcq })])
    expect(r.overall).toBe(75)
  })
})
