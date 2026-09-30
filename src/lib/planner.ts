/**
 * Study planner. The plan is a pure function of (today, settings, progress),
 * recomputed on every load. Falling behind or getting ahead therefore
 * re-plans automatically: unfinished work simply flows into the next days,
 * and the status tells the learner honestly whether the exam date still fits.
 */
import { addDays, diffDays, weekday } from './dates'

export interface PlanModule {
  id: string
  title: string
  unitId: string
  minutes: number
  lessonDone: boolean
  practiceDone: boolean // blocked practice set completed at least once
  masteryDays: number // qualifying mastery days so far (0..2)
  lastMasteryDay?: string
}

export interface PlanUnit {
  id: string
  title: string
  tbsRemaining: number
}

export interface PlanInput {
  today: string
  examDate?: string
  minutesByWeekday: number[] // index 0 = Sunday
  modules: PlanModule[] // in course order
  units: PlanUnit[]
  dueReviews: number // SRS items due today
  mockTaken: boolean
  horizonDays?: number // how far to plan when there is no exam date
  /**
   * Optional priority per unit (higher first), e.g. Blueprint area weight × weakness (P1-13).
   * Units already started keep their course order at the front; untouched units follow by priority.
   */
  unitPriority?: Record<string, number>
}

export type TaskKind = 'review' | 'lesson' | 'practice' | 'mastery' | 'tbs' | 'mixed' | 'mock' | 'final' | 'exam'

export interface PlanTask {
  kind: TaskKind
  minutes: number
  label: string
  moduleId?: string
  unitId?: string
  continued?: boolean
}

export interface PlanDay {
  date: string
  capacity: number
  phase: 'learn' | 'final-review' | 'exam'
  tasks: PlanTask[]
}

export interface PlanStatus {
  hasExamDate: boolean
  daysLeft: number | null
  finalReviewStart: string | null
  requiredMinutes: number // remaining new-learning work
  availableMinutes: number // capacity for new learning before final review
  onTrack: boolean
  extraMinutesPerWeek: number // how much more per week would make it fit (0 when on track)
  projectedFinish: string | null // day new-learning work completes
  message: string
}

export interface Plan {
  days: PlanDay[]
  status: PlanStatus
}

export const PRACTICE_MINUTES = 15 // blocked practice set (~10 MCQs)
export const MASTERY_MINUTES = 10 // mixed mastery check
export const TBS_MINUTES = 15
export const MOCK_MINUTES = 240
const MIN_CHUNK = 10
const REVIEW_SHARE = 0.15
const MASTERY_GAPS = [2, 5] // days after the lesson / after the first mastery day

interface WorkItem {
  kind: TaskKind
  minutes: number
  label: string
  moduleId?: string
  unitId?: string
  notBefore?: string
  after?: WorkItem // dependency: must be fully scheduled before this one
  startedDay?: string
  doneDay?: string
}

export function finalReviewDays(totalDays: number): number {
  return Math.min(14, Math.max(3, Math.round(totalDays * 0.2)))
}

export function reviewMinutes(capacity: number, dueReviews: number | null): number {
  if (capacity <= 0) return 0
  const target = dueReviews === null ? Math.round(capacity * REVIEW_SHARE) : Math.ceil(dueReviews * 0.5)
  return Math.min(Math.max(dueReviews === 0 ? 0 : 5, Math.min(target, Math.round(capacity * 0.3))), capacity)
}

function buildQueue(input: PlanInput): WorkItem[] {
  const q: WorkItem[] = []
  const byUnit = new Map<string, PlanModule[]>()
  for (const m of input.modules) byUnit.set(m.unitId, [...(byUnit.get(m.unitId) ?? []), m])
  const unitOrder = orderUnits(input)
  for (const unitId of unitOrder) {
    const mods = byUnit.get(unitId) ?? []
    let lastLearning: WorkItem | undefined
    for (const m of mods) {
      let learn: WorkItem | undefined
      if (!m.lessonDone) {
        learn = { kind: 'lesson', minutes: m.minutes, label: `Lesson: ${m.title}`, moduleId: m.id, unitId }
        q.push(learn)
      }
      if (!m.practiceDone) {
        const p: WorkItem = { kind: 'practice', minutes: PRACTICE_MINUTES, label: `Practice set: ${m.title}`, moduleId: m.id, unitId, after: learn }
        q.push(p)
        learn = p
      }
      if (learn) lastLearning = learn
      // Mastery checks on later days (spacing), each after the previous.
      let prev = learn
      for (let k = m.masteryDays; k < 2; k++) {
        const notBefore = !prev && m.lastMasteryDay ? addDays(m.lastMasteryDay, MASTERY_GAPS[1]) : undefined
        const item: WorkItem = {
          kind: 'mastery',
          minutes: MASTERY_MINUTES,
          label: `Mastery check ${k + 1}/2: ${m.title}`,
          moduleId: m.id,
          unitId,
          after: prev,
          notBefore,
        }
        q.push(item)
        prev = item
      }
    }
    const unit = input.units.find((u) => u.id === unitId)
    if (unit && unit.tbsRemaining > 0)
      q.push({
        kind: 'tbs',
        minutes: unit.tbsRemaining * TBS_MINUTES,
        label: `Simulations: ${unit.title}`,
        unitId,
        after: lastLearning,
      })
  }
  return q
}

/** Course order, except that untouched units are reordered by `unitPriority` (stable for ties). */
export function orderUnits(input: Pick<PlanInput, 'modules' | 'unitPriority'>): string[] {
  const course = [...new Set(input.modules.map((m) => m.unitId))]
  const pri = input.unitPriority
  if (!pri) return course
  const started = (u: string) => input.modules.some((m) => m.unitId === u && (m.lessonDone || m.practiceDone || m.masteryDays > 0))
  const begun = course.filter(started)
  const fresh = course.filter((u) => !started(u))
  const rank = new Map(course.map((u, i) => [u, i]))
  fresh.sort((a, b) => (pri[b] ?? 0) - (pri[a] ?? 0) || rank.get(a)! - rank.get(b)!)
  return [...begun, ...fresh]
}

function readyOn(item: WorkItem, day: string): boolean {
  if (item.notBefore && day < item.notBefore) return false
  if (item.after) {
    if (!item.after.doneDay) return false
    const gapIdx = item.kind === 'mastery' ? (item.after.kind === 'mastery' ? 1 : 0) : -1
    if (gapIdx >= 0 && diffDays(item.after.doneDay, day) < MASTERY_GAPS[gapIdx]) return false
  }
  return true
}

/** Longest schedule generated, whatever the exam date (P2-5). */
export const MAX_PLAN_DAYS = 400
const isDayKey = (d?: string): d is string => !!d && /^\d{4}-\d{2}-\d{2}$/.test(d)

export function generatePlan(input: PlanInput): Plan {
  const { today } = input
  const cap = (d: string) => Math.max(0, input.minutesByWeekday[weekday(d)] ?? 0)
  // Ignore malformed dates (e.g. a five-digit year typed into the date field).
  const examDate = isDayKey(input.examDate) ? input.examDate : undefined
  if (examDate === today) return examDayPlan(today)
  const examPassed = !!examDate && examDate < today
  const hasExam = !!examDate && examDate > today
  const totalDays = hasExam ? diffDays(today, examDate) : (input.horizonDays ?? 28)
  const finalDays = hasExam ? finalReviewDays(totalDays) : 0
  const finalStart = hasExam ? addDays(examDate, -finalDays) : null
  const horizonEnd = addDays(today, MAX_PLAN_DAYS - 1)
  const lastDay = hasExam ? (examDate < horizonEnd ? examDate : horizonEnd) : addDays(today, Math.min(totalDays, MAX_PLAN_DAYS) - 1)

  const queue = buildQueue(input)
  const days: PlanDay[] = []
  const learnMinutesNeeded = queue.reduce((s, w) => s + w.minutes, 0)
  let learnCapacity = 0
  let projectedFinish: string | null = queue.length ? null : today

  // Place the mock exam first so learning work flows around it.
  let mockDay: string | null = null
  if (hasExam && !input.mockTaken && finalStart) {
    let best: string | null = null
    const windowEnd = addDays(examDate!, -3)
    for (let d = finalStart; d <= windowEnd; d = addDays(d, 1)) if (!best || cap(d) > cap(best)) best = d
    mockDay = best ?? finalStart
  }
  // Flag a mock that lands on a day with less than four hours planned, rather than hiding the conflict.
  const mockLabel =
    mockDay && cap(mockDay) < MOCK_MINUTES
      ? `Full simulated exam (4 hours) — block out 4 hours; you usually plan ${cap(mockDay)} min this day`
      : 'Full simulated exam (4 hours)'

  for (let d = today; d <= lastDay; d = addDays(d, 1)) {
    const capacity = cap(d)
    const isExamDay = hasExam && d === examDate
    const inFinal = !!finalStart && d >= finalStart && !isExamDay
    const day: PlanDay = { date: d, capacity, phase: isExamDay ? 'exam' : inFinal ? 'final-review' : 'learn', tasks: [] }
    days.push(day)
    if (isExamDay) {
      day.tasks.push({ kind: 'exam', minutes: 0, label: 'Exam day — trust your preparation' })
      continue
    }
    if (capacity <= 0) continue
    let left = capacity

    const rev = reviewMinutes(capacity, d === today ? input.dueReviews : null)
    if (rev > 0) {
      day.tasks.push({ kind: 'review', minutes: rev, label: 'Spaced review (flashcards + missed questions)' })
      left -= rev
    }

    if (d === mockDay) {
      day.tasks.push({ kind: 'mock', minutes: MOCK_MINUTES, label: mockLabel })
      continue
    }
    if (hasExam && d === addDays(examDate, -1)) {
      day.tasks.push({ kind: 'final', minutes: Math.min(left, 45), label: 'Light review: formula sheet and high-yield notes, then rest' })
      continue
    }
    if (!inFinal) learnCapacity += left

    // Learning work (also spills into final review if behind).
    let guard = 0
    while (left >= MIN_CHUNK && guard++ < 50) {
      // Don't start a lesson in a sliver of time; other ready work (e.g. a mastery check) can use it.
      const item = queue.find((w) => !w.doneDay && readyOn(w, d) && (w.kind !== 'lesson' || w.startedDay || left >= Math.min(w.minutes, 15)))
      if (!item) break
      const chunk = Math.min(left, item.minutes)
      day.tasks.push({
        kind: item.kind,
        minutes: chunk,
        label: item.startedDay ? `${item.label} (continue)` : item.label,
        moduleId: item.moduleId,
        unitId: item.unitId,
        continued: !!item.startedDay,
      })
      item.startedDay ??= d
      item.minutes -= chunk
      left -= chunk
      if (item.minutes <= 0) item.doneDay = d
    }
    if (!projectedFinish && queue.every((w) => w.doneDay)) projectedFinish = d

    if (left >= MIN_CHUNK) {
      if (inFinal) {
        const half = Math.round(left / 2)
        day.tasks.push({ kind: 'mixed', minutes: left - half, label: 'Cumulative mixed practice (all areas)' })
        day.tasks.push({ kind: 'final', minutes: half, label: 'Final review notes: weakest areas first' })
      } else {
        day.tasks.push({ kind: 'mixed', minutes: left, label: 'Mixed practice: interleave everything studied so far' })
      }
    }
  }

  const onTrack = !hasExam || learnMinutesNeeded <= learnCapacity
  const studyDaysBeforeFinal = finalStart ? Math.max(1, diffDays(today, finalStart)) : totalDays
  const shortfall = Math.max(0, learnMinutesNeeded - learnCapacity)
  const extraMinutesPerWeek = onTrack ? 0 : Math.ceil((shortfall / studyDaysBeforeFinal) * 7)

  let message: string
  if (examPassed) message = `Your exam date (${examDate}) has passed. Set your next exam date in Settings for a new schedule.`
  else if (!hasExam) message = 'Set an exam date in Settings to get a full schedule with final-review weeks.'
  else if (!onTrack && totalDays < 7)
    message = `Your exam is ${totalDays === 1 ? 'tomorrow' : `in ${totalDays} days`} — too close to cover everything left. Focus on spaced review, mixed practice and your weakest areas.`
  else if (!queue.length) message = 'All modules are learned and mastered. Focus on mixed practice, weak areas, and the simulated exam.'
  else if (onTrack)
    message = `On track: new material finishes by ${projectedFinish ?? 'the final-review window'}, leaving ${finalDays} days for final review.`
  else
    message = `Behind by about ${Math.round(shortfall / 60)} hours. Adding ~${extraMinutesPerWeek} min/week (or moving the exam date) would restore the ${finalDays}-day final review.`

  return {
    days,
    status: {
      hasExamDate: hasExam,
      daysLeft: hasExam ? totalDays : null,
      finalReviewStart: finalStart,
      requiredMinutes: learnMinutesNeeded,
      availableMinutes: learnCapacity,
      onTrack,
      extraMinutesPerWeek,
      projectedFinish,
      message,
    },
  }
}

/** The plan when the exam is today: nothing new to learn, just the exam (P2-5). */
function examDayPlan(today: string): Plan {
  return {
    days: [{ date: today, capacity: 0, phase: 'exam', tasks: [{ kind: 'exam', minutes: 0, label: 'Exam day — trust your preparation' }] }],
    status: {
      hasExamDate: true,
      daysLeft: 0,
      finalReviewStart: null,
      requiredMinutes: 0,
      availableMinutes: 0,
      onTrack: true,
      extraMinutesPerWeek: 0,
      projectedFinish: null,
      message: 'Today is exam day. Skip new material: eat, arrive early, and trust your preparation.',
    },
  }
}
