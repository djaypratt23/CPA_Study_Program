/**
 * Write operations used by the UI. Keeping them here (instead of inside
 * components) keeps the data rules — SRS re-queueing, error logging,
 * progress tracking — in one testable place.
 */
import type { FlashcardWithModule, Mcq, SectionId, Tbs } from '../content/schema'
import { dayKey } from '../lib/dates'
import { gradeFromAttempt, needsRequeue, newCard, review, type Confidence } from '../lib/srs'
import type { Grade } from 'ts-fsrs'
import { db, type CpaDb } from './index'
import type { Attempt, AttemptMode, ErrorCause, SrsItem } from './types'

export interface McqAnswer {
  choice: string
  /** Omitted in the simulated exam, which (like the real one) does not ask. */
  confidence?: Confidence
  timeMs: number
  mode: AttemptMode
  mixed: boolean
  sessionId: string
  section: SectionId
  now?: Date
}

/** The attempt already recorded for this item in this session, if any (double submits are no-ops). */
function existingAttempt(d: CpaDb, sessionId: string, itemId: string): Promise<Attempt | undefined> {
  return d.attempts.where('sessionId').equals(sessionId).and((a) => a.itemId === itemId).first()
}

/**
 * Record an answered MCQ and update its review schedule in one transaction.
 * Idempotent per (sessionId, itemId): a repeated submit returns the first attempt.
 */
export async function recordMcqAttempt(q: Mcq, ans: McqAnswer, d: CpaDb = db): Promise<Attempt> {
  return d.transaction('rw', d.attempts, d.srs, async () => {
    const prior = await existingAttempt(d, ans.sessionId, q.id)
    if (prior) return prior
    return addMcqAttempt(q, ans, d)
  })
}

async function addMcqAttempt(q: Mcq, ans: McqAnswer, d: CpaDb): Promise<Attempt> {
  const now = ans.now ?? new Date()
  const attempt: Attempt = {
    itemId: q.id,
    itemType: 'mcq',
    moduleId: q.moduleId,
    section: ans.section,
    correct: ans.choice === q.answer,
    score: ans.choice === q.answer ? 1 : 0,
    confidence: ans.confidence,
    choice: ans.choice,
    timeMs: ans.timeMs,
    mode: ans.mode,
    mixed: ans.mixed,
    sessionId: ans.sessionId,
    at: now.toISOString(),
    day: dayKey(now),
  }
  attempt.id = await d.attempts.add(attempt)
  await scheduleQuestion(q.id, q.moduleId, ans.section, attempt.correct, ans.confidence ?? 'confident', now, d)
  return attempt
}

/**
 * Missed, guessed, or unsure questions enter the spaced-review queue. Once a
 * question is in the queue, every later answer updates its schedule.
 */
export async function scheduleQuestion(
  itemId: string,
  moduleId: string,
  section: SectionId,
  correct: boolean,
  confidence: Confidence,
  now: Date,
  d: CpaDb = db,
): Promise<void> {
  const key = `q:${itemId}`
  const existing = await d.srs.get(key)
  if (!existing && !needsRequeue(correct, confidence)) return
  const base = existing?.card ?? newCard(now)
  const card = review(base, gradeFromAttempt(correct, confidence), now)
  const item: SrsItem = { key, kind: 'question', itemId, moduleId, section, card, due: card.due, introduced: existing?.introduced ?? dayKey(now) }
  await d.srs.put(item)
}

export async function recordTbsAttempt(
  tbs: Tbs,
  score: number,
  timeMs: number,
  mode: AttemptMode,
  sessionId: string,
  d: CpaDb = db,
  now = new Date(),
): Promise<void> {
  // Idempotent per (sessionId, itemId), like MCQ attempts.
  await d.transaction('rw', d.attempts, async () => {
    if (await existingAttempt(d, sessionId, tbs.id)) return
    await d.attempts.add({
      itemId: tbs.id,
      itemType: 'tbs',
      moduleId: tbs.moduleIds[0],
      section: tbs.section,
      correct: score >= 0.75,
      score,
      timeMs,
      mode,
      mixed: true,
      sessionId,
      at: now.toISOString(),
      day: dayKey(now),
    })
  })
}

export async function logError(itemId: string, moduleId: string, section: SectionId, cause: ErrorCause, note?: string, d: CpaDb = db) {
  // One cause per item per day: re-tagging replaces the earlier tag.
  const today = dayKey()
  const prior = await d.errors.where('itemId').equals(itemId).filter((e) => e.at.slice(0, 10) === today).first()
  if (prior?.id) await d.errors.update(prior.id, { cause, note })
  else await d.errors.add({ itemId, moduleId, section, cause, note, at: new Date().toISOString() })
}

export async function toggleFlag(itemId: string, d: CpaDb = db): Promise<boolean> {
  const cur = await d.itemMeta.get(itemId)
  const flagged = !cur?.flagged
  await d.itemMeta.put({ ...cur, itemId, flagged })
  return flagged
}

export async function setItemNote(itemId: string, note: string, d: CpaDb = db) {
  const cur = await d.itemMeta.get(itemId)
  await d.itemMeta.put({ ...cur, itemId, note })
}

export async function reviewFlashcard(card: FlashcardWithModule, grade: Grade, d: CpaDb = db, now = new Date()) {
  const key = `card:${card.id}`
  const existing = await d.srs.get(key)
  const next = review(existing?.card ?? newCard(now), grade, now)
  await d.srs.put({
    key,
    kind: 'card',
    itemId: card.id,
    moduleId: card.moduleId,
    section: card.section,
    card: next,
    due: next.due,
    introduced: existing?.introduced ?? dayKey(now),
  })
}

export async function reviewQuestionItem(itemId: string, grade: Grade, d: CpaDb = db, now = new Date()) {
  const key = `q:${itemId}`
  const existing = await d.srs.get(key)
  if (!existing) return
  const next = review(existing.card, grade, now)
  await d.srs.put({ ...existing, card: next, due: next.due })
}

export async function touchModule(moduleId: string, section: SectionId, patch: { scrollPct?: number } = {}, d: CpaDb = db) {
  const cur = await d.moduleProgress.get(moduleId)
  const now = new Date().toISOString()
  await d.moduleProgress.put({ ...cur, moduleId, section, startedAt: cur?.startedAt ?? now, lastVisitedAt: now, ...patch })
}

export async function completeLesson(moduleId: string, section: SectionId, d: CpaDb = db) {
  const cur = await d.moduleProgress.get(moduleId)
  const now = new Date().toISOString()
  await d.moduleProgress.put({ ...cur, moduleId, section, startedAt: cur?.startedAt ?? now, lastVisitedAt: now, lessonCompletedAt: cur?.lessonCompletedAt ?? now, scrollPct: 1 })
}

export async function setModuleNotes(moduleId: string, section: SectionId, notes: string, d: CpaDb = db) {
  const cur = await d.moduleProgress.get(moduleId)
  await d.moduleProgress.put({ ...cur, moduleId, section, notes })
}

export async function addHighlight(moduleId: string, text: string, d: CpaDb = db) {
  await d.highlights.add({ moduleId, text: text.slice(0, 1000), at: new Date().toISOString() })
}

export async function setLastLocation(path: string, label: string, d: CpaDb = db) {
  const s = await d.settings.get('settings')
  if (!s) return
  await d.settings.update('settings', { lastLocation: { path, label, at: new Date().toISOString() } })
}
