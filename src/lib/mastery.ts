/**
 * Mastery gating: a module is mastered only after >= 80% on mixed retrieval
 * practice on at least two different days. A correct answer the learner
 * marked as a guess does not count as correct here.
 */
import type { Attempt } from '../db/types'

export const MASTERY_THRESHOLD = 0.8
export const MASTERY_DAYS = 2
export const MIN_ITEMS_PER_DAY = 3

export type MasteryStatus = 'not-started' | 'learning' | 'mastered' | 'slipping'

export interface MasteryInfo {
  status: MasteryStatus
  qualifyingDays: string[]
  mixedAttempts: number
  recentAccuracy: number | null // last 10 non-lesson attempts, guesses count as wrong
}

export function isTrulyCorrect(a: Pick<Attempt, 'correct' | 'confidence'>): boolean {
  return a.correct && a.confidence !== 'guess'
}

export function computeMastery(attempts: Attempt[], lessonDone: boolean): MasteryInfo {
  const practice = attempts.filter((a) => a.itemType === 'mcq' && a.mode !== 'lesson')
  const mixed = practice.filter((a) => a.mixed)
  const byDay = new Map<string, Attempt[]>()
  for (const a of mixed) byDay.set(a.day, [...(byDay.get(a.day) ?? []), a])
  const dayStats = [...byDay.entries()]
    .map(([day, list]) => ({ day, n: list.length, acc: list.filter(isTrulyCorrect).length / list.length }))
    .sort((x, y) => x.day.localeCompare(y.day))
  const qualifyingDays = dayStats.filter((d) => d.n >= MIN_ITEMS_PER_DAY && d.acc >= MASTERY_THRESHOLD).map((d) => d.day)

  const recent = [...practice].sort((a, b) => a.at.localeCompare(b.at)).slice(-10)
  const recentAccuracy = recent.length ? recent.filter(isTrulyCorrect).length / recent.length : null

  let status: MasteryStatus = 'not-started'
  if (lessonDone || practice.length) status = 'learning'
  if (qualifyingDays.length >= MASTERY_DAYS) {
    status = 'mastered'
    // A mastered module "slips" if the most recent mixed day (after mastery) went badly.
    const last = dayStats.filter((d) => d.n >= MIN_ITEMS_PER_DAY).at(-1)
    const masteredOn = qualifyingDays[MASTERY_DAYS - 1]
    if (last && last.day > masteredOn && last.acc < 0.6) status = 'slipping'
  }
  return { status, qualifyingDays, mixedAttempts: mixed.length, recentAccuracy }
}
