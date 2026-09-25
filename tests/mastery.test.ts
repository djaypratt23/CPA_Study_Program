import { describe, expect, it } from 'vitest'
import type { Attempt } from '../src/db/types'
import { computeMastery } from '../src/lib/mastery'

let n = 0
const att = (day: string, correct: boolean, over: Partial<Attempt> = {}): Attempt => ({
  itemId: `q${n++}`,
  itemType: 'mcq',
  moduleId: 'm',
  section: 'FAR',
  correct,
  score: correct ? 1 : 0,
  confidence: 'confident',
  timeMs: 1000,
  mode: 'tutor',
  mixed: true,
  sessionId: 's',
  at: `${day}T12:00:00.000Z`,
  day,
  ...over,
})
const day = (d: string, right: number, wrong: number, over: Partial<Attempt> = {}) => [
  ...Array.from({ length: right }, () => att(d, true, over)),
  ...Array.from({ length: wrong }, () => att(d, false, over)),
]

describe('mastery gating', () => {
  it('is not mastered after one great day', () => {
    expect(computeMastery(day('2026-03-01', 5, 0), true).status).toBe('learning')
  })
  it('is mastered after >= 80% on two different days', () => {
    const m = computeMastery([...day('2026-03-01', 4, 1), ...day('2026-03-04', 5, 0)], true)
    expect(m.status).toBe('mastered')
    expect(m.qualifyingDays).toEqual(['2026-03-01', '2026-03-04'])
  })
  it('does not count blocked (non-mixed) practice', () => {
    const m = computeMastery([...day('2026-03-01', 5, 0, { mixed: false }), ...day('2026-03-04', 5, 0, { mixed: false })], true)
    expect(m.status).toBe('learning')
  })
  it('does not count in-lesson checks', () => {
    const m = computeMastery([...day('2026-03-01', 5, 0, { mode: 'lesson' }), ...day('2026-03-04', 5, 0, { mode: 'lesson' })], true)
    expect(m.status).toBe('learning')
  })
  it('treats correct guesses as wrong', () => {
    const m = computeMastery([...day('2026-03-01', 5, 0, { confidence: 'guess' }), ...day('2026-03-04', 5, 0)], true)
    expect(m.qualifyingDays).toEqual(['2026-03-04'])
  })
  it('needs a minimum number of items per day', () => {
    const m = computeMastery([...day('2026-03-01', 2, 0), ...day('2026-03-04', 2, 0)], true)
    expect(m.status).toBe('learning')
  })
  it('flags a mastered module that slips', () => {
    const m = computeMastery([...day('2026-03-01', 5, 0), ...day('2026-03-04', 5, 0), ...day('2026-03-20', 1, 4)], true)
    expect(m.status).toBe('slipping')
  })
  it('one repeated question cannot produce mastery', () => {
    const same = (d: string) => Array.from({ length: 5 }, () => att(d, true, { itemId: 'only-one' }))
    const m = computeMastery([...same('2026-03-01'), ...same('2026-03-04')], true)
    expect(m.qualifyingDays).toEqual([])
    expect(m.status).toBe('learning')
  })
  it('does not count review-queue or mock answers', () => {
    expect(computeMastery([...day('2026-03-01', 5, 0, { mode: 'review' }), ...day('2026-03-04', 5, 0, { mode: 'exam' })], true).status).toBe('learning')
  })
  it('is not-started with no activity', () => {
    expect(computeMastery([], false).status).toBe('not-started')
  })
})
