/**
 * Derives everything the dashboard needs — module status, the plan, readiness,
 * recommendations, and the single "what do I do next" action — from raw
 * stored data. Pure, so it is recomputed (and therefore re-planned) on every
 * change.
 */
import type { ContentBundle } from '../content/build'
import type { SectionConfig } from '../content/schema'
import type { Attempt, ErrorLogEntry, ExamSession, ModuleProgress, QuizSession, Settings, SrsItem, TbsSession } from '../db/types'
import type { ErrorCause } from '../db/types'
import { areaReadiness, firstAttempts, overallReadiness, rate, scoringAttempts, weakestModules, type ModuleStat, type Readiness, type Recommendation } from './analytics'
import { dayKey } from './dates'
import { computeMastery, type MasteryInfo } from './mastery'
import { generatePlan, type Plan, type PlanTask } from './planner'

export interface StudyInputs {
  content: ContentBundle
  section: SectionConfig
  settings: Settings
  attempts: Attempt[]
  progress: ModuleProgress[]
  srs: SrsItem[]
  errors: ErrorLogEntry[]
  quizSessions: QuizSession[]
  tbsSessions: TbsSession[]
  examSessions: ExamSession[]
  now?: Date
}

export interface ModuleState {
  id: string
  title: string
  unitId: string
  areaId: string
  available: boolean
  lessonDone: boolean
  mastery: MasteryInfo
  practiceCount: number
}

export interface NextAction {
  label: string
  detail: string
  to: string
}

export interface StudyState {
  modules: ModuleState[]
  plan: Plan
  readiness: Readiness
  recommendations: Recommendation[]
  dueCount: number
  next: NextAction
  progressPct: number // share of available modules mastered
  lessonsPct: number
}

export function taskRoute(t: PlanTask, sectionId: string): string {
  switch (t.kind) {
    case 'lesson':
      return `/module/${t.moduleId}`
    case 'practice':
      return `/practice/start?module=${t.moduleId}`
    case 'mastery':
      return `/practice/start?mastery=${t.moduleId}`
    case 'tbs':
      return `/tbs?unit=${t.unitId}`
    case 'mixed':
      return `/practice/start?mixed=${sectionId}`
    case 'mock':
      return '/exam'
    case 'final':
      return '/final-review'
    case 'review':
      return '/review'
    case 'exam':
      return '/'
  }
}

export function computeStudyState(inp: StudyInputs): StudyState {
  const now = inp.now ?? new Date()
  const today = dayKey(now)
  const sectionId = inp.section.id
  const mods = inp.content.modules.filter((m) => m.section === sectionId)
  const progress = new Map(inp.progress.map((p) => [p.moduleId, p]))
  const attemptsByModule = new Map<string, Attempt[]>()
  for (const a of inp.attempts) if (a.section === sectionId) attemptsByModule.set(a.moduleId, [...(attemptsByModule.get(a.moduleId) ?? []), a])

  const modules: ModuleState[] = mods.map((m) => {
    const lessonDone = !!progress.get(m.id)?.lessonCompletedAt
    const list = attemptsByModule.get(m.id) ?? []
    return {
      id: m.id,
      title: m.title,
      unitId: m.unitId,
      areaId: m.areaId,
      available: !!inp.content.lessons[m.id],
      lessonDone,
      mastery: computeMastery(list, lessonDone),
      practiceCount: list.filter((a) => a.itemType === 'mcq' && a.mode !== 'lesson').length,
    }
  })
  const available = modules.filter((m) => m.available)

  // Blocked practice counts as "done" once the learner has answered >= 8 non-lesson questions in the module.
  const tbsDone = new Set(inp.tbsSessions.filter((s) => s.submittedAt).map((s) => s.id))
  const units = inp.section.areas.flatMap((a) => a.units).map((u) => ({
    id: u.id,
    title: u.title,
    tbsRemaining: Object.values(inp.content.tbs).filter((t) => t.unitId === u.id && t.pool === 'practice' && !tbsDone.has(t.id)).length,
  }))

  const dueCount = inp.srs.filter((s) => s.section === sectionId && !s.suspended && s.due <= now.toISOString()).length
  const mockTaken = inp.examSessions.some((e) => e.section === sectionId && e.finishedAt)
  const plan = generatePlan({
    today,
    examDate: inp.settings.examDates[sectionId],
    minutesByWeekday: inp.settings.minutesByWeekday,
    modules: available.map((m) => ({
      id: m.id,
      title: m.title,
      unitId: m.unitId,
      minutes: inp.content.lessons[m.id]?.minutes ?? 15,
      lessonDone: m.lessonDone,
      practiceDone: m.practiceCount >= 8,
      masteryDays: Math.min(2, m.mastery.qualifyingDays.length),
      lastMasteryDay: m.mastery.qualifyingDays.at(-1),
    })),
    units: units.filter((u) => available.some((m) => m.unitId === u.id)),
    dueReviews: dueCount,
    mockTaken,
  })

  // Readiness by blueprint area.
  const first = firstAttempts(inp.attempts.filter((a) => a.section === sectionId))
  const scoring = first.filter((a) => a.itemType === 'mcq')
  const tbsFirst = first.filter((a) => a.itemType === 'tbs')
  const modArea = new Map(mods.map((m) => [m.id, m.areaId]))
  const areas = inp.section.areas.map((a) =>
    areaReadiness({
      areaId: a.id,
      title: a.title,
      weight: (a.allocation.min + a.allocation.max) / 2,
      modules: modules.filter((m) => m.areaId === a.id).map((m) => ({ id: m.id, lessonDone: m.lessonDone, status: m.mastery.status })),
      attempts: scoring.filter((x) => modArea.get(x.moduleId) === a.id),
      tbsAttempts: tbsFirst.filter((x) => modArea.get(x.moduleId) === a.id),
      weighting: inp.section.exam.weighting,
    }),
  )
  const lastMock = inp.examSessions.filter((e) => e.section === sectionId && e.result).sort((a, b) => (b.finishedAt ?? '').localeCompare(a.finishedAt ?? ''))[0]
  const readiness = overallReadiness(areas, lastMock?.result?.weightedPercent)

  // Recommendations.
  const causesByModule = new Map<string, Record<string, number>>()
  for (const e of inp.errors) {
    const c = causesByModule.get(e.moduleId) ?? {}
    c[e.cause] = (c[e.cause] ?? 0) + 1
    causesByModule.set(e.moduleId, c)
  }
  const stats: ModuleStat[] = available.map((m) => {
    const c = causesByModule.get(m.id)
    const topCause = c ? (Object.entries(c).sort((a, b) => b[1] - a[1])[0]?.[0] as ErrorCause) : undefined
    const recent = scoringAttempts(attemptsByModule.get(m.id) ?? []).filter((a) => a.itemType === 'mcq').slice(-20)
    return { moduleId: m.id, title: m.title, areaId: m.areaId, status: m.mastery.status, lessonDone: m.lessonDone, rate: rate(recent), topCause }
  })
  const recommendations = weakestModules(stats)

  // The one obvious next step.
  const openQuiz = inp.quizSessions.filter((q) => !q.finishedAt && q.section === sectionId).sort((a, b) => b.startedAt.localeCompare(a.startedAt))[0]
  const openExam = inp.examSessions.find((e) => !e.finishedAt && e.section === sectionId)
  const inLesson = inp.progress
    .filter((p) => p.section === sectionId && !p.lessonCompletedAt && p.lastVisitedAt)
    .sort((a, b) => (b.lastVisitedAt ?? '').localeCompare(a.lastVisitedAt ?? ''))[0]
  let next: NextAction
  const todayTasks = plan.days[0]?.tasks ?? []
  const firstTask = todayTasks.find((t) => t.kind !== 'review' || dueCount > 0)
  if (openExam) next = { label: 'Resume simulated exam', detail: 'Your exam clock is paused where you left it.', to: `/exam/${openExam.id}` }
  else if (openQuiz)
    next = { label: 'Resume practice set', detail: `${openQuiz.title} — question ${openQuiz.index + 1} of ${openQuiz.itemIds.length}`, to: `/quiz/${openQuiz.id}` }
  else if (inLesson && inp.content.lessons[inLesson.moduleId])
    next = { label: 'Continue lesson', detail: inp.content.lessons[inLesson.moduleId].title, to: `/module/${inLesson.moduleId}` }
  else if (firstTask) next = { label: firstTask.kind === 'review' ? `Review ${dueCount} due item${dueCount === 1 ? '' : 's'}` : 'Study next', detail: firstTask.label, to: taskRoute(firstTask, sectionId) }
  else {
    const nextModule = available.find((m) => !m.lessonDone)
    next = nextModule
      ? { label: 'Study next', detail: nextModule.title, to: `/module/${nextModule.id}` }
      : { label: 'Mixed practice', detail: 'Interleaved questions across everything you have studied', to: `/practice/start?mixed=${sectionId}` }
  }

  const mastered = available.filter((m) => m.mastery.status === 'mastered').length
  return {
    modules,
    plan,
    readiness,
    recommendations,
    dueCount,
    next,
    progressPct: available.length ? mastered / available.length : 0,
    lessonsPct: available.length ? available.filter((m) => m.lessonDone).length / available.length : 0,
  }
}
