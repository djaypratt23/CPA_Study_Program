/**
 * Zod schemas for backup files, one per table. Rows must carry every field
 * the app relies on; unknown extra fields are kept so older or newer
 * backups still round-trip.
 */
import { z } from 'zod'
import { SectionId } from '../content/schema'
import type { TABLES } from '.'
import { ERROR_CAUSES } from './types'

const Iso = z.string().min(1)
const Day = z.string().regex(/^\d{4}-\d{2}-\d{2}$/)
const Confidence = z.enum(['guess', 'unsure', 'confident'])

const Attempt = z.looseObject({
  id: z.number().int().optional(),
  itemId: z.string().min(1),
  itemType: z.enum(['mcq', 'tbs']),
  moduleId: z.string(),
  section: SectionId,
  correct: z.boolean(),
  score: z.number().min(0).max(1),
  confidence: Confidence.optional(),
  choice: z.string().optional(),
  timeMs: z.number().min(0),
  mode: z.enum(['tutor', 'test', 'lesson', 'review', 'exam']),
  mixed: z.boolean(),
  sessionId: z.string(),
  at: Iso,
  day: Day,
})

const ErrorLogEntry = z.looseObject({
  id: z.number().int().optional(),
  itemId: z.string().min(1),
  moduleId: z.string(),
  section: SectionId,
  cause: z.enum(ERROR_CAUSES),
  note: z.string().optional(),
  at: Iso,
})

const StoredCard = z.looseObject({
  due: Iso,
  stability: z.number(),
  difficulty: z.number(),
  elapsed_days: z.number(),
  scheduled_days: z.number(),
  learning_steps: z.number(),
  reps: z.number(),
  lapses: z.number(),
  state: z.number().int().min(0).max(3),
  last_review: Iso.optional(),
})

const SrsItem = z.looseObject({
  key: z.string().min(1),
  kind: z.enum(['card', 'question']),
  itemId: z.string().min(1),
  moduleId: z.string(),
  section: SectionId,
  card: StoredCard,
  due: Iso,
  introduced: z.string().optional(),
  suspended: z.boolean().optional(),
})

const ItemMeta = z.looseObject({ itemId: z.string().min(1), flagged: z.boolean().optional(), note: z.string().optional() })

const ModuleProgress = z.looseObject({
  moduleId: z.string().min(1),
  section: SectionId,
  startedAt: z.string().optional(),
  lessonCompletedAt: z.string().optional(),
  scrollPct: z.number().optional(),
  lastVisitedAt: z.string().optional(),
  notes: z.string().optional(),
})

const Highlight = z.looseObject({ id: z.number().int().optional(), moduleId: z.string().min(1), text: z.string(), note: z.string().optional(), at: Iso })

const QuizSession = z.looseObject({
  id: z.string().min(1),
  section: SectionId,
  title: z.string(),
  mode: z.enum(['tutor', 'test', 'review']),
  mixed: z.boolean(),
  itemIds: z.array(z.string()),
  items: z.record(z.string(), z.looseObject({ itemId: z.string(), timeMs: z.number() })),
  index: z.number().int().min(0),
  startedAt: Iso,
  finishedAt: z.string().optional(),
  timeLimitMs: z.number().optional(),
  elapsedMs: z.number().min(0),
})

const TbsSession = z.looseObject({
  id: z.string().min(1),
  responses: z.record(z.string(), z.looseObject({ kind: z.string() })),
  startedAt: Iso,
  elapsedMs: z.number().min(0),
  submittedAt: z.string().optional(),
  score: z.number().optional(),
})

const ExamTestlet = z.looseObject({
  kind: z.enum(['mcq', 'tbs']),
  items: z.array(z.string()),
  submitted: z.boolean(),
  mcqAnswers: z.record(z.string(), z.string()),
  flags: z.record(z.string(), z.boolean()),
  tbsResponses: z.record(z.string(), z.record(z.string(), z.unknown())),
  index: z.number().int().min(0),
})

const ExamSession = z.looseObject({
  id: z.string().min(1),
  examId: z.string().min(1),
  section: SectionId,
  startedAt: Iso,
  remainingMs: z.number(),
  testletIndex: z.number().int().min(0),
  onBreak: z.boolean(),
  breakUsed: z.boolean(),
  testlets: z.array(ExamTestlet),
  finishedAt: z.string().optional(),
})

const Settings = z.looseObject({
  id: z.literal('settings'),
  onboarded: z.boolean(),
  walkthroughSeen: z.boolean(),
  theme: z.enum(['system', 'light', 'dark']),
  fontScale: z.number().min(0.8).max(1.5),
  activeSection: SectionId,
  sectionOrder: z.array(SectionId),
  examDates: z.record(z.string(), z.string().optional()),
  minutesByWeekday: z.array(z.number().min(0).max(24 * 60)).length(7),
  newCardsPerDay: z.number().int().min(0),
  lastLocation: z.looseObject({ path: z.string().startsWith('/'), label: z.string(), at: z.string() }).optional(),
})

export const TABLE_SCHEMAS: Record<(typeof TABLES)[number], z.ZodType> = {
  settings: Settings,
  attempts: Attempt,
  errors: ErrorLogEntry,
  srs: SrsItem,
  itemMeta: ItemMeta,
  moduleProgress: ModuleProgress,
  highlights: Highlight,
  quizSessions: QuizSession,
  tbsSessions: TbsSession,
  examSessions: ExamSession,
}

export const TABLE_LABELS: Record<(typeof TABLES)[number], string> = {
  settings: 'Settings',
  attempts: 'Answered questions',
  errors: 'Error log',
  srs: 'Review queue',
  itemMeta: 'Flags and item notes',
  moduleProgress: 'Module progress and notes',
  highlights: 'Highlights',
  quizSessions: 'Practice sets',
  tbsSessions: 'Simulations',
  examSessions: 'Mock exams',
}
