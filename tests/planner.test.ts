import { describe, expect, it } from 'vitest'
import { addDays } from '../src/lib/dates'
import { finalReviewDays, generatePlan, type PlanInput, type PlanModule } from '../src/lib/planner'

const mods = (n: number, unitSize = 4): PlanModule[] =>
  Array.from({ length: n }, (_, i) => ({
    id: `m${i}`,
    title: `Module ${i}`,
    unitId: `u${Math.floor(i / unitSize)}`,
    minutes: 15,
    lessonDone: false,
    practiceDone: false,
    masteryDays: 0,
  }))

const base = (over: Partial<PlanInput> = {}): PlanInput => ({
  today: '2026-03-02', // a Monday
  examDate: '2026-05-01',
  minutesByWeekday: [120, 45, 45, 45, 45, 30, 180],
  modules: mods(12),
  units: [
    { id: 'u0', title: 'Unit 0', tbsRemaining: 2 },
    { id: 'u1', title: 'Unit 1', tbsRemaining: 2 },
    { id: 'u2', title: 'Unit 2', tbsRemaining: 2 },
  ],
  dueReviews: 0,
  mockTaken: false,
  ...over,
})

const allTasks = (p: ReturnType<typeof generatePlan>) => p.days.flatMap((d) => d.tasks.map((t) => ({ ...t, date: d.date })))

describe('planner', () => {
  it('schedules every day from today through exam day', () => {
    const p = generatePlan(base())
    expect(p.days[0].date).toBe('2026-03-02')
    expect(p.days.at(-1)!.date).toBe('2026-05-01')
    expect(p.days.at(-1)!.phase).toBe('exam')
  })

  it('never exceeds daily capacity', () => {
    const p = generatePlan(base())
    for (const d of p.days) {
      const used = d.tasks.filter((t) => t.kind !== 'mock').reduce((s, t) => s + t.minutes, 0)
      expect(used).toBeLessThanOrEqual(d.capacity)
    }
  })

  it('reserves a final-review window and places one mock exam inside it', () => {
    const p = generatePlan(base())
    const start = p.status.finalReviewStart!
    expect(start).toBe(addDays('2026-05-01', -finalReviewDays(60)))
    const mocks = allTasks(p).filter((t) => t.kind === 'mock')
    expect(mocks).toHaveLength(1)
    expect(mocks[0].date >= start).toBe(true)
    expect(mocks[0].date <= addDays('2026-05-01', -3)).toBe(true)
    expect(allTasks(p).some((t) => t.kind === 'lesson' && t.date >= start)).toBe(false)
  })

  it('does lessons in course order, practice after its lesson, and mastery checks on later days', () => {
    const p = generatePlan(base())
    const tasks = allTasks(p)
    const lessonDates = mods(12).map((m) => tasks.find((t) => t.kind === 'lesson' && t.moduleId === m.id)!.date)
    expect([...lessonDates].sort()).toEqual(lessonDates)
    for (const m of mods(12)) {
      const lesson = tasks.find((t) => t.kind === 'lesson' && t.moduleId === m.id)!
      const mastery = tasks.filter((t) => t.kind === 'mastery' && t.moduleId === m.id)
      expect(mastery).toHaveLength(2)
      expect(mastery[0].date > lesson.date).toBe(true)
      expect(mastery[1].date > mastery[0].date).toBe(true)
    }
  })

  it('reports on-track when there is ample time', () => {
    const p = generatePlan(base())
    expect(p.status.onTrack).toBe(true)
    expect(p.status.extraMinutesPerWeek).toBe(0)
  })

  it('re-plans honestly when the learner falls behind (little time left)', () => {
    const p = generatePlan(base({ today: '2026-04-20', modules: mods(40, 4) }))
    expect(p.status.onTrack).toBe(false)
    expect(p.status.extraMinutesPerWeek).toBeGreaterThan(0)
    expect(p.status.message).toMatch(/Behind/)
  })

  it('pulls work forward when the learner is ahead (completed modules drop out)', () => {
    const done = mods(12).map((m, i) => (i < 8 ? { ...m, lessonDone: true, practiceDone: true, masteryDays: 2 } : m))
    const p = generatePlan(base({ modules: done, units: [] }))
    const lessons = allTasks(p).filter((t) => t.kind === 'lesson' && !t.continued)
    expect(lessons.map((l) => l.moduleId)).toEqual(['m8', 'm9', 'm10', 'm11'])
    expect(p.days[0].tasks.some((t) => t.kind === 'lesson' && t.moduleId === 'm8')).toBe(true)
  })

  it('fills spare time with mixed practice once new material is done', () => {
    const done = mods(4).map((m) => ({ ...m, lessonDone: true, practiceDone: true, masteryDays: 2 }))
    const p = generatePlan(base({ modules: done, units: [] }))
    expect(p.days[0].tasks.some((t) => t.kind === 'mixed')).toBe(true)
    expect(p.status.projectedFinish).toBe('2026-03-02')
  })

  it('schedules today’s reviews in proportion to what is due', () => {
    const p = generatePlan(base({ dueReviews: 40 }))
    expect(p.days[0].tasks[0].kind).toBe('review')
    expect(p.days[0].tasks[0].minutes).toBeGreaterThanOrEqual(10)
  })

  it('works without an exam date (rolling plan)', () => {
    const p = generatePlan(base({ examDate: undefined }))
    expect(p.status.hasExamDate).toBe(false)
    expect(p.days).toHaveLength(28)
    expect(allTasks(p).some((t) => t.kind === 'mock')).toBe(false)
  })

  it('respects the mastery spacing already earned', () => {
    const m = [{ ...mods(1)[0], lessonDone: true, practiceDone: true, masteryDays: 1, lastMasteryDay: '2026-03-01' }]
    const p = generatePlan(base({ modules: m, units: [] }))
    const check = allTasks(p).find((t) => t.kind === 'mastery')!
    expect(check.date >= '2026-03-06').toBe(true)
  })
})
