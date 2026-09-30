import { describe, expect, it } from 'vitest'
import { computeItemStats, type Respondent } from '../src/lib/itemStats'
import { issueUrl } from '../src/lib/report'

const att = (itemId: string, correct: boolean, choice: string, at = '2026-01-01T00:00:00Z') => ({ itemId, correct, choice, at, mode: 'tutor' as const })

// Six learners of increasing ability: good items are answered right by the strong learners.
const learners: Respondent[] = [0, 1, 2, 3, 4, 5].map((k) => ({
  id: `l${k}`,
  attempts: [
    att('good', k >= 3, k >= 3 ? 'a' : 'b'),
    att('x1', k >= 2, 'a'),
    att('x2', k >= 1, 'a'),
    att('x3', k >= 4, 'a'),
    // A miskeyed item: strong learners pick c, which the key marks wrong.
    att('bad', k < 2, k < 2 ? 'a' : 'c'),
  ],
}))

describe('item statistics (P1-14)', () => {
  const stats = Object.fromEntries(computeItemStats(learners, { good: 'a', bad: 'a' }).map((s) => [s.itemId, s]))

  it('computes p-values and choice rates from first attempts', () => {
    expect(stats.good.n).toBe(6)
    expect(stats.good.pValue).toBeCloseTo(0.5)
    expect(stats.good.choiceRates).toEqual({ a: 0.5, b: 0.5 })
  })

  it('gives a positive discrimination to a good item and flags a miskeyed one', () => {
    expect(stats.good.discrimination!).toBeGreaterThan(0.5)
    expect(stats.bad.discrimination!).toBeLessThan(0)
    expect(stats.bad.flags.join(' ')).toMatch(/negative discrimination/)
    expect(stats.bad.flags.join(' ')).toMatch(/distractor c chosen more often/)
  })

  it('uses only the first attempt and ignores lesson checks', () => {
    const r: Respondent[] = [{ id: 'x', attempts: [att('q', false, 'b', '2026-01-01T00:00:00Z'), att('q', true, 'a', '2026-01-02T00:00:00Z'), { ...att('q2', true, 'a'), mode: 'lesson' }] }]
    const s = computeItemStats(r)
    expect(s).toHaveLength(1)
    expect(s[0].pValue).toBe(0)
    expect(s[0].discrimination).toBeNull()
  })
})

describe('issue link (P1-14)', () => {
  it('builds a prefilled GitHub issue URL without learner data', () => {
    const u = new URL(issueUrl('far-rec-12', 'question', 'Grove Co.’s customer subledger  totals $512,300'))
    expect(u.hostname).toBe('github.com')
    expect(u.pathname).toBe('/djaypratt23/CPA_Study_Program/issues/new')
    expect(u.searchParams.get('title')).toBe('Content issue: far-rec-12')
    expect(u.searchParams.get('body')).toContain('`far-rec-12` (question)')
    expect(u.searchParams.get('labels')).toBe('content')
  })
})
