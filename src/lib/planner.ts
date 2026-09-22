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
  const unitOrder = [...new Set(input.modules.map((m) => m.unitId))]
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

function readyOn(item: WorkItem, day: string): boolean {
  if (item.notBefore && day < item.notBefore) return false
  if (item.after) {
    if (!item.after.doneDay) return false
    const gapIdx = item.kind === 'mastery' ? (item.after.kind === 'mastery' ? 1 : 0) : -1
    if (gapIdx >= 0 && diffDays(item.after.doneDay, day) < MASTERY_GAPS[gapIdx]) return false
  }
  return true
}

export function generatePlan(input: PlanInput): Plan {
  const { today } = input
  const cap = (d: string) => Math.max(0, input.minutesByWeekday[weekday(d)] ?? 0)
  const hasExam = !!input.examDate && input.examDate > today
  const totalDays = hasExam ? diffDays(today, input.examDate!) : (input.horizonDays ?? 28)
  const finalDays = hasExam ? finalReviewDays(totalDays) : 0
  const finalStart = hasExam ? addDays(input.examDate!, -finalDays) : null
  const lastDay = hasExam ? input.examDate! : addDays(today, totalDays - 1)

  const queue = buildQueue(input)
  const days: PlanDay[] = []
  const learnMinutesNeeded = queue.reduce((s, w) => s + w.minutes, 0)
  let learnCapacity = 0
  let projectedFinish: string | null = queue.length ? null : today

  // Place the mock exam first so learning work flows around it.
  let mockDay: string | null = null
  if (hasExam && !input.mockTaken && finalStart) {
    let best: string | null = null
    const windowEnd = addDays(input.examDate!, -3)
    for (let d = finalStart; d <= windowEnd; d = addDays(d, 1)) if (!best || cap(d) > cap(best)) best = d
    mockDay = best ?? finalStart
  }

  for (let d = today; d <= lastDay; d = addDays(d, 1)) {
    const capacity = cap(d)
    const isExamDay = hasExam && d === input.examDate
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
      day.tasks.push({ kind: 'mock', minutes: MOCK_MINUTES, label: 'Full simulated exam (4 hours)' })
      continue
    }
    if (hasExam && d === addDays(input.examDate!, -1)) {
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
  if (!hasExam) message = 'Set an exam date in Settings to get a full schedule with final-review weeks.'
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
