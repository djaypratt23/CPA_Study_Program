// Planner edge cases: past/today/tomorrow exam, no date, zero minutes, far-future dates.
import { describe, expect, it } from 'vitest'
import { generatePlan, type PlanInput, type PlanModule } from '../../src/lib/planner'

const mods = (n: number): PlanModule[] => Array.from({ length: n }, (_, i) => ({ id: `m${i}`, title: `M${i}`, unitId: `u${Math.floor(i / 5)}`, minutes: 20, lessonDone: false, practiceDone: false, masteryDays: 0 }))
const base = (o: Partial<PlanInput> = {}): PlanInput => ({ today: '2026-09-23', minutesByWeekday: [60, 60, 60, 60, 60, 60, 60], modules: mods(10), units: [], dueReviews: 0, mockTaken: false, ...o })

describe('planner edge cases', () => {
  it('exam date TODAY is treated as "no exam date" (no exam-day marker, 28-day rolling plan, misleading message)', () => {
    const p = generatePlan(base({ examDate: '2026-09-23' }))
    console.log('today:', p.status.hasExamDate, p.days.length, p.status.message)
    expect(p.status.hasExamDate).toBe(false)
    expect(p.days.some((d) => d.phase === 'exam')).toBe(false)
    expect(p.status.message).toMatch(/Set an exam date/)
  })
  it('exam date in the PAST: same "Set an exam date" message though a date is set', () => {
    const p = generatePlan(base({ examDate: '2026-09-01' }))
    expect(p.status.hasExamDate).toBe(false)
    expect(p.status.message).toMatch(/Set an exam date/)
  })
  it('exam TOMORROW: final-review window (min 3 days) starts before today; no learning scheduled; honest behind message', () => {
    const p = generatePlan(base({ examDate: '2026-09-24' }))
    console.log('tomorrow:', JSON.stringify(p.days.map((d) => [d.date, d.phase, d.tasks.map((t) => t.kind)])), p.status)
    expect(p.status.finalReviewStart! < '2026-09-23').toBe(true)
    expect(p.status.onTrack).toBe(false)
    expect(p.days).toHaveLength(2)
  })
  it('zero minutes every day: no tasks except exam marker; behind with finite numbers', () => {
    const p = generatePlan(base({ examDate: '2026-12-01', minutesByWeekday: [0, 0, 0, 0, 0, 0, 0] }))
    expect(p.days.flatMap((d) => d.tasks).every((t) => t.kind === 'exam')).toBe(true)
    expect(p.status.onTrack).toBe(false)
    expect(Number.isFinite(p.status.extraMinutesPerWeek)).toBe(true)
    console.log('zero minutes:', p.status.message)
  })
  it('zero minutes and no exam date: reports onTrack=true with no projected finish', () => {
    const p = generatePlan(base({ minutesByWeekday: [0, 0, 0, 0, 0, 0, 0] }))
    expect(p.status.onTrack).toBe(true)
    expect(p.status.projectedFinish).toBeNull()
  })
  it('missing weekday entries (short array) are treated as 0; negative minutes clamp to 0', () => {
    const p = generatePlan(base({ examDate: '2026-10-23', minutesByWeekday: [-30, 60] }))
    expect(p.days.every((d) => d.capacity >= 0)).toBe(true)
  })
  it('capacity never exceeded on non-mock days; mock in final window', () => {
    const p = generatePlan(base({ examDate: '2026-12-15', modules: mods(40), units: [{ id: 'u0', title: 'U0', tbsRemaining: 2 }] }))
    for (const d of p.days.filter((x) => !x.tasks.some((t) => t.kind === 'mock'))) expect(d.tasks.filter((t) => t.kind !== 'exam').reduce((s, t) => s + t.minutes, 0), d.date).toBeLessThanOrEqual(d.capacity)
    const mock = p.days.find((d) => d.tasks.some((t) => t.kind === 'mock'))
    expect(mock && mock.date >= p.status.finalReviewStart!).toBe(true)
  })
  it('mock day that is also the capacity-max day: mock (240 min) is placed even when capacity is 60 -> day overbooked', () => {
    const p = generatePlan(base({ examDate: '2026-12-15' }))
    const mock = p.days.find((d) => d.tasks.some((t) => t.kind === 'mock'))!
    const total = mock.tasks.reduce((s, t) => s + t.minutes, 0)
    console.log('mock day', mock.date, 'capacity', mock.capacity, 'scheduled', total)
    expect(total).toBeGreaterThan(mock.capacity)
  })
  it('works backward from the exam date: final review = clamp(round(20% of days), 3, 14)', () => {
    for (const [exam, fd] of [['2026-10-03', 3], ['2026-10-23', 6], ['2027-03-23', 14]] as const) {
      const p = generatePlan(base({ examDate: exam }))
      const days = p.days.filter((d) => d.phase === 'final-review').length
      expect(days, exam).toBe(fd)
    }
  })
  it('far-future exam date: plan size & time grow linearly (no horizon cap)', () => {
    const t0 = performance.now()
    const p = generatePlan(base({ examDate: '2036-09-23', modules: mods(60) }))
    const ms = performance.now() - t0
    console.log(`2036 exam: ${p.days.length} days in ${ms.toFixed(0)} ms`)
    expect(p.days.length).toBe(3654)
  })
  it('5-digit year from a date input typo (e.g. "20261-09-23") is accepted as a real exam date', () => {
    const t0 = performance.now()
    const p = generatePlan(base({ examDate: '20261-09-23', modules: [], minutesByWeekday: [0, 0, 0, 0, 0, 0, 0] }))
    console.log(`year-20261 exam: ${p.days.length} days in ${(performance.now() - t0).toFixed(0)} ms; daysLeft=${p.status.daysLeft}`)
    expect(p.status.hasExamDate).toBe(true)
    expect(p.days.length).toBe(100) // string compare '2027-..' > '20261-..' ends the loop early
    expect(p.status.daysLeft).toBe(6660197)
  }, 120_000)
})
