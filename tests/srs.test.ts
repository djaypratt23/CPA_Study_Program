import { describe, expect, it } from 'vitest'
import { Rating } from 'ts-fsrs'
import { gradeFromAttempt, isDue, needsRequeue, newCard, review, State } from '../src/lib/srs'

const t0 = new Date('2026-01-05T12:00:00Z')
const days = (n: number) => new Date(t0.getTime() + n * 86_400_000)

describe('FSRS scheduling', () => {
  it('a new card is due immediately', () => {
    const c = newCard(t0)
    expect(c.state).toBe(State.New)
    expect(isDue(c, t0)).toBe(true)
  })

  it('good answers push the next review further out each time', () => {
    let c = newCard(t0)
    let now = t0
    const intervals: number[] = []
    for (let i = 0; i < 5; i++) {
      c = review(c, Rating.Good, now)
      const next = new Date(c.due)
      intervals.push(next.getTime() - now.getTime())
      now = next
    }
    for (let i = 1; i < intervals.length; i++) expect(intervals[i]).toBeGreaterThanOrEqual(intervals[i - 1])
    expect(c.state).toBe(State.Review)
  })

  it('"again" on a review card is a lapse and shortens the interval', () => {
    let c = newCard(t0)
    c = review(c, Rating.Good, t0)
    c = review(c, Rating.Good, new Date(c.due))
    c = review(c, Rating.Good, new Date(c.due))
    const beforeLapse = c.scheduled_days
    const lapseAt = new Date(c.due)
    c = review(c, Rating.Again, lapseAt)
    expect(c.lapses).toBe(1)
    expect(new Date(c.due).getTime() - lapseAt.getTime()).toBeLessThan(beforeLapse * 86_400_000)
  })

  it('easy schedules further out than hard', () => {
    const base = review(newCard(t0), Rating.Good, t0)
    const at = days(3)
    expect(new Date(review(base, Rating.Easy, at).due).getTime()).toBeGreaterThan(new Date(review(base, Rating.Hard, at).due).getTime())
  })

  it('stored cards round-trip through JSON (backups)', () => {
    const c = review(newCard(t0), Rating.Good, t0)
    expect(JSON.parse(JSON.stringify(c))).toEqual(c)
  })
})

describe('confidence → grade mapping', () => {
  it('treats a correct guess exactly like a miss', () => {
    expect(gradeFromAttempt(true, 'guess')).toBe(Rating.Again)
    expect(gradeFromAttempt(false, 'confident')).toBe(Rating.Again)
    expect(needsRequeue(true, 'guess')).toBe(true)
  })
  it('unsure-correct is hard, confident-correct is good and not requeued', () => {
    expect(gradeFromAttempt(true, 'unsure')).toBe(Rating.Hard)
    expect(gradeFromAttempt(true, 'confident')).toBe(Rating.Good)
    expect(needsRequeue(true, 'confident')).toBe(false)
  })
})
