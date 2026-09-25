/**
 * Spaced repetition using FSRS (via ts-fsrs). Flashcards and "problem"
 * questions (missed or low-confidence) share one scheduler.
 */
import { createEmptyCard, fsrs, generatorParameters, Rating, State, type Card, type Grade } from 'ts-fsrs'

export type Confidence = 'guess' | 'unsure' | 'confident'
export { Rating, State }

const scheduler = fsrs(generatorParameters({ request_retention: 0.9, maximum_interval: 365, enable_fuzz: false }))

/** Serializable FSRS card (dates as ISO strings) for IndexedDB/JSON backups. */
export interface StoredCard {
  due: string
  stability: number
  difficulty: number
  elapsed_days: number
  scheduled_days: number
  learning_steps: number
  reps: number
  lapses: number
  state: State
  last_review?: string
}

export function toStored(c: Card): StoredCard {
  return {
    due: c.due.toISOString(),
    stability: c.stability,
    difficulty: c.difficulty,
    elapsed_days: c.elapsed_days,
    scheduled_days: c.scheduled_days,
    learning_steps: c.learning_steps,
    reps: c.reps,
    lapses: c.lapses,
    state: c.state,
    last_review: c.last_review ? c.last_review.toISOString() : undefined,
  }
}

export function fromStored(s: StoredCard): Card {
  return { ...s, due: new Date(s.due), last_review: s.last_review ? new Date(s.last_review) : undefined }
}

export function newCard(now: Date = new Date()): StoredCard {
  return toStored(createEmptyCard(now))
}

export function review(card: StoredCard, grade: Grade, now: Date = new Date()): StoredCard {
  // A device clock set backwards must not produce a review before the last one (negative elapsed time).
  const last = card.last_review ? Date.parse(card.last_review) : NaN
  const at = Number.isFinite(last) && now.getTime() < last ? new Date(last) : now
  return toStored(scheduler.next(fromStored(card), at, grade).card)
}

/** Preview the next interval for each grade (for button labels like "Good · 3d"). */
export function previewIntervals(card: StoredCard, now: Date = new Date()): Record<'again' | 'hard' | 'good' | 'easy', string> {
  const p = scheduler.repeat(fromStored(card), now)
  const fmt = (d: Date) => {
    const mins = Math.max(1, Math.round((d.getTime() - now.getTime()) / 60000))
    if (mins < 60) return `${mins}m`
    if (mins < 60 * 24) return `${Math.round(mins / 60)}h`
    const days = Math.round(mins / 1440)
    return days < 31 ? `${days}d` : `${Math.round(days / 30)}mo`
  }
  return {
    again: fmt(p[Rating.Again].card.due),
    hard: fmt(p[Rating.Hard].card.due),
    good: fmt(p[Rating.Good].card.due),
    easy: fmt(p[Rating.Easy].card.due),
  }
}

/**
 * Map an answered question to an FSRS grade. A correct answer that was a
 * guess is treated exactly like a miss: the learner did not actually know it.
 */
export function gradeFromAttempt(correct: boolean, confidence: Confidence): Grade {
  if (!correct || confidence === 'guess') return Rating.Again
  if (confidence === 'unsure') return Rating.Hard
  return Rating.Good
}

/** Should this attempt put the question into the review queue? */
export function needsRequeue(correct: boolean, confidence: Confidence): boolean {
  return !correct || confidence === 'guess' || confidence === 'unsure'
}

export function isDue(card: StoredCard, now: Date = new Date()): boolean {
  return new Date(card.due).getTime() <= now.getTime()
}
