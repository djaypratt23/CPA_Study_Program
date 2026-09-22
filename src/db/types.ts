import type { SectionId } from '../content/schema'
import type { Confidence, StoredCard } from '../lib/srs'
import type { TbsResponses } from '../lib/tbsScoring'

export type AttemptMode = 'tutor' | 'test' | 'lesson' | 'review' | 'exam'

/** One answered MCQ or scored TBS. The raw material for every analytic. */
export interface Attempt {
  id?: number
  itemId: string
  itemType: 'mcq' | 'tbs'
  moduleId: string // for TBS: first module id
  section: SectionId
  correct: boolean
  score: number // 0..1 (MCQ: 0 or 1)
  confidence?: Confidence
  choice?: string
  timeMs: number
  mode: AttemptMode
  mixed: boolean // part of an interleaved/mixed set (counts toward mastery)
  sessionId: string
  at: string // ISO timestamp
  day: string // local YYYY-MM-DD
}

export const ERROR_CAUSES = ['concept', 'misread', 'calculation', 'trap', 'memory', 'time'] as const
export type ErrorCause = (typeof ERROR_CAUSES)[number]
export const ERROR_CAUSE_LABELS: Record<ErrorCause, string> = {
  concept: 'Concept gap',
  misread: 'Misread the question',
  calculation: 'Calculation error',
  trap: 'Fell for a trap',
  memory: 'Forgot a rule/number',
  time: 'Rushed / time pressure',
}

export interface ErrorLogEntry {
  id?: number
  itemId: string
  moduleId: string
  section: SectionId
  cause: ErrorCause
  note?: string
  at: string
}

export interface SrsItem {
  key: string // "card:<id>" or "q:<id>"
  kind: 'card' | 'question'
  itemId: string
  moduleId: string
  section: SectionId
  card: StoredCard
  due: string // duplicated from card.due for indexing
  introduced?: string // local day the item entered the queue
  suspended?: boolean
}

export interface ItemMeta {
  itemId: string
  flagged?: boolean
  note?: string
}

export interface ModuleProgress {
  moduleId: string
  section: SectionId
  startedAt?: string
  lessonCompletedAt?: string
  scrollPct?: number
  lastVisitedAt?: string
  notes?: string
}

export interface Highlight {
  id?: number
  moduleId: string
  text: string
  note?: string
  at: string
}

export interface QuizItemState {
  itemId: string
  choice?: string
  confidence?: Confidence
  correct?: boolean
  timeMs: number
  answeredAt?: string
}

export interface QuizSession {
  id: string
  section: SectionId
  title: string
  mode: 'tutor' | 'test' | 'review'
  mixed: boolean
  itemIds: string[]
  items: Record<string, QuizItemState>
  index: number
  startedAt: string
  finishedAt?: string
  timeLimitMs?: number
  elapsedMs: number
}

export interface TbsSession {
  id: string // tbs id (one in-progress session per TBS)
  responses: TbsResponses
  startedAt: string
  elapsedMs: number
  submittedAt?: string
  score?: number
}

export interface ExamTestletState {
  kind: 'mcq' | 'tbs'
  items: string[]
  submitted: boolean
  mcqAnswers: Record<string, string>
  flags: Record<string, boolean>
  tbsResponses: Record<string, TbsResponses>
  index: number
}

export interface ExamSession {
  id: string
  examId: string
  section: SectionId
  startedAt: string
  remainingMs: number
  testletIndex: number
  onBreak: boolean
  breakUsed: boolean
  breakOffered?: boolean
  breakRemainingMs?: number
  testlets: ExamTestletState[]
  finishedAt?: string
  result?: ExamResult
}

export interface ExamResult {
  mcqPercent: number
  tbsPercent: number
  weightedPercent: number
  approxScaled: number
  byArea: Record<string, { earned: number; possible: number }>
}

export interface Settings {
  id: 'settings'
  onboarded: boolean
  walkthroughSeen: boolean
  theme: 'system' | 'light' | 'dark'
  fontScale: number
  activeSection: SectionId
  sectionOrder: SectionId[]
  examDates: Partial<Record<SectionId, string>>
  /** Minutes available per weekday, index 0 = Sunday. */
  minutesByWeekday: number[]
  newCardsPerDay: number
  lastLocation?: { path: string; label: string; at: string }
}

export const DEFAULT_SETTINGS: Settings = {
  id: 'settings',
  onboarded: false,
  walkthroughSeen: false,
  theme: 'system',
  fontScale: 1,
  activeSection: 'FAR',
  sectionOrder: ['FAR', 'AUD', 'REG', 'TCP'],
  examDates: {},
  minutesByWeekday: [120, 45, 45, 45, 45, 30, 180],
  newCardsPerDay: 20,
}
