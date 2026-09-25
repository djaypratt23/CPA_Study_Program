// Runs ONLY as a child process spawned by tz.test.ts with TZ set (skipped otherwise).
import 'fake-indexeddb/auto'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { addDays, dayKey, diffDays, parseDay, weekday, formatDay } from '../../src/lib/dates'
import { generatePlan } from '../../src/lib/planner'
import { daysUntil, weeklyTrend } from '../../src/lib/analytics'
import { CpaDb, resetAll } from '../../src/db'
import { logError } from '../../src/db/actions'

const child = process.env.TZ_CHILD === '1'
const d = child ? describe : describe.skip
const TZ = process.env.TZ
afterEach(() => { vi.useRealTimers() })

d(`dates in ${TZ}`, () => {
  it('addDays/diffDays/weekday walk every calendar day 2024-2028 without gaps or repeats', () => {
    let k = '2024-01-01'
    let wd = weekday(k)
    for (let i = 1; i <= 365 * 5; i++) {
      const n = addDays(k, 1)
      const [y, m, dd] = k.split('-').map(Number)
      const exp = new Date(Date.UTC(y, m - 1, dd + 1)).toISOString().slice(0, 10)
      expect(n, `after ${k}`).toBe(exp)
      expect(diffDays('2024-01-01', n)).toBe(i)
      expect(weekday(n)).toBe((wd + 1) % 7)
      wd = weekday(n); k = n
    }
  })
  it('dayKey(parseDay(k)) round-trips', () => {
    for (let k = '2026-01-01'; k < '2027-01-01'; k = addDays(k, 1)) expect(dayKey(parseDay(k))).toBe(k)
  })
  it('planner across DST: consecutive unique days, exam day last', () => {
    for (const [today, exam] of [['2026-03-01', '2026-03-20'], ['2026-10-20', '2026-11-10'], ['2026-09-01', '2026-09-15'], ['2026-03-25', '2026-04-10']]) {
      const p = generatePlan({ today, examDate: exam, minutesByWeekday: [60, 60, 60, 60, 60, 60, 60], modules: [], units: [], dueReviews: 0, mockTaken: false })
      const dates = p.days.map((x) => x.date)
      expect(dates.length).toBe(diffDays(today, exam) + 1)
      dates.forEach((x, i) => expect(x).toBe(addDays(today, i)))
      expect(p.days.at(-1)!.phase).toBe('exam')
      expect(daysUntil(exam, today)).toBe(dates.length - 1)
    }
  })
  it('weeklyTrend buckets are contiguous 7-day windows across DST', () => {
    const w = weeklyTrend([], '2026-11-05', 10)
    for (let i = 1; i < w.length; i++) expect(diffDays(w[i - 1].weekStart, w[i].weekStart)).toBe(7)
  })
  it('logError "one cause per item per day" (compares UTC date of e.at with LOCAL dayKey)', async () => {
    // Pick an instant where local date != UTC date in this zone, if one exists within the day.
    const db = new CpaDb(`tz-${Math.random()}`)
    await resetAll(db)
    let instant: Date | null = null
    for (let h = 0; h < 24; h++) {
      const t = new Date(Date.UTC(2026, 8, 23, h, 30))
      if (dayKey(t) !== t.toISOString().slice(0, 10)) { instant = t; break }
    }
    let mismatchHours = 0
    for (let m = 0; m < 24 * 60; m += 15) { const t = new Date(Date.UTC(2026, 8, 23, 0, m)); if (dayKey(t) !== t.toISOString().slice(0, 10)) mismatchHours += 0.25 }
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(instant ?? new Date('2026-09-23T12:00:00Z'))
    await logError('far-q1', 'far-cash-flows', 'FAR', 'concept', undefined, db)
    await logError('far-q1', 'far-cash-flows', 'FAR', 'misread', undefined, db)
    const n = await db.errors.count()
    console.log(JSON.stringify({ TZ, logErrorRows: n, mismatchInstant: instant?.toISOString() ?? null, hoursPerDayAffected: mismatchHours }))
    expect(n).toBe(instant ? 2 : 1)
  })
  it('ExamHome past-attempt date uses finishedAt.slice(0,10) (UTC) instead of the local day', () => {
    let wrong = 0
    for (let h = 0; h < 24; h++) {
      const t = new Date(Date.UTC(2026, 8, 23, h, 0))
      if (formatDay(t.toISOString().slice(0, 10)) !== formatDay(dayKey(t))) wrong++
    }
    console.log(JSON.stringify({ TZ, examHomeDateWrongHoursPerDay: wrong }))
  })
})
