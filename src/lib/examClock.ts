/**
 * Wall-clock timing for mock exams and timed practice sets. Time left is
 * derived from a stored deadline (`endsAt`), so closing the tab, switching
 * apps or a slow interval can't stop or skew the clock. Only the scheduled
 * break (and the screen offering it) pauses the exam clock: the remaining
 * time is frozen in `remainingMs` and the deadline is cleared.
 */
import type { ExamSession, QuizSession } from '../db/types'

type ClockFields = Pick<ExamSession, 'remainingMs' | 'endsAt' | 'onBreak' | 'breakOffered' | 'breakUsed'>

export function isExamClockPaused(s: ClockFields): boolean {
  return s.onBreak || (!!s.breakOffered && !s.breakUsed)
}

/** Milliseconds left on the exam clock at `now`. */
export function examRemainingMs(s: ClockFields, now: number): number {
  if (isExamClockPaused(s) || !s.endsAt) return Math.max(0, s.remainingMs)
  return Math.max(0, Date.parse(s.endsAt) - now)
}

/** Patch that stops the exam clock (break offered or taken). */
export function pauseExamClock(s: ClockFields, now: number): Pick<ExamSession, 'remainingMs' | 'endsAt'> {
  return { remainingMs: examRemainingMs(s, now), endsAt: undefined }
}

/** Patch that restarts the exam clock from the frozen remaining time. */
export function resumeExamClock(s: Pick<ExamSession, 'remainingMs'>, now: number): Pick<ExamSession, 'endsAt'> {
  return { endsAt: new Date(now + Math.max(0, s.remainingMs)).toISOString() }
}

/** Milliseconds left in the scheduled break at `now`. */
export function breakRemainingMs(s: Pick<ExamSession, 'breakEndsAt' | 'breakRemainingMs'>, now: number, defaultMs: number): number {
  if (s.breakEndsAt) return Math.max(0, Date.parse(s.breakEndsAt) - now)
  return Math.max(0, s.breakRemainingMs ?? defaultMs)
}

/** Deadline for a timed practice set; resumes older sessions from their saved elapsed time. */
export function quizDeadline(s: Pick<QuizSession, 'timeLimitMs' | 'endsAt' | 'elapsedMs'>, now: number): string | undefined {
  if (!s.timeLimitMs) return undefined
  return s.endsAt ?? new Date(now + Math.max(0, s.timeLimitMs - s.elapsedMs)).toISOString()
}

/** Milliseconds left in a timed practice set, or null if untimed. */
export function quizTimeLeftMs(s: Pick<QuizSession, 'timeLimitMs' | 'endsAt' | 'elapsedMs'>, now: number): number | null {
  const deadline = quizDeadline(s, now)
  return deadline ? Math.max(0, Date.parse(deadline) - now) : null
}
