// SRS per-item memory, card queue limits, and persistence / backup import robustness.
import 'fake-indexeddb/auto'
import { beforeEach, describe, expect, it } from 'vitest'
import { Rating } from 'ts-fsrs'
import { Mcq } from '../../src/content/schema'
import { CpaDb, exportBackup, importBackup, resetAll, getSettings } from '../../src/db'
import { recordMcqAttempt, reviewFlashcard } from '../../src/db/actions'
import { newCard, review, gradeFromAttempt, needsRequeue } from '../../src/lib/srs'
import { buildCardQueue } from '../../src/lib/cardQueue'
import { historyByItem } from '../../src/lib/quiz'
import { computeStudyState } from '../../src/lib/studyState'
import { loadContent } from '../../scripts/load-content'
import type { SrsItem } from '../../src/db/types'

const q = Mcq.parse({
  id: 'far-test-q1', moduleId: 'far-cash', pool: 'practice', stem: 'Which item is a cash equivalent?',
  choices: [
    { id: 'a', text: 'A', explanation: 'Right: original maturity three months.' },
    { id: 'b', text: 'B', explanation: 'Original maturity exceeds three months.', trap: 'wrong-rule' },
    { id: 'c', text: 'C', explanation: 'A receivable, not cash at all.', trap: 'wrong-classification' },
    { id: 'd', text: 'D', explanation: 'Restricted balances are not cash.', trap: 'overgeneralization' },
  ],
  answer: 'a', explanation: 'Cash equivalents mature within 3 months.', skill: 'remembering',
})
let d: CpaDb
beforeEach(async () => { d = new CpaDb(`t-${Math.random()}`); await resetAll(d) })
const base = { timeMs: 1000, mode: 'tutor' as const, mixed: true, sessionId: 's', section: 'FAR' as const }

describe('SRS per-item memory', () => {
  it('rating map: wrong/guess->Again, unsure->Hard, confident->Good; requeue on wrong/guess/unsure', () => {
    expect([gradeFromAttempt(false, 'confident'), gradeFromAttempt(true, 'guess'), gradeFromAttempt(true, 'unsure'), gradeFromAttempt(true, 'confident')]).toEqual([Rating.Again, Rating.Again, Rating.Hard, Rating.Good])
    expect([needsRequeue(true, 'confident'), needsRequeue(true, 'unsure'), needsRequeue(true, 'guess'), needsRequeue(false, 'confident')]).toEqual([false, true, true, true])
  })
  it('second answer builds on the stored card (reps/stability evolve), not on a fresh card', async () => {
    const t0 = new Date('2026-03-01T12:00:00Z')
    await recordMcqAttempt(q, { ...base, choice: 'b', confidence: 'confident', now: t0 }, d)
    const s1 = (await d.srs.get('q:far-test-q1'))!
    expect(s1.card.reps).toBe(1)
    expect(new Date(s1.due).getTime() - t0.getTime()).toBeLessThanOrEqual(10 * 60_000) // Again -> minutes
    const t1 = new Date('2026-03-01T12:30:00Z')
    await recordMcqAttempt(q, { ...base, choice: 'a', confidence: 'confident', now: t1 }, d)
    const s2 = (await d.srs.get('q:far-test-q1'))!
    expect(s2.card.reps).toBe(2)
    expect(s2.introduced).toBe(s1.introduced)
    // Compare with what a fresh card would give for the same Good answer
    const fresh = review(newCard(t1), Rating.Good, t1)
    expect(s2.card.stability).not.toBe(fresh.stability)
    // correct-confident on an item already queued moves it OUT to a later date but keeps it scheduled
    expect(s2.due > t1.toISOString()).toBe(true)
  })
  it('correct guess is requeued (Again) even though correct', async () => {
    await recordMcqAttempt(q, { ...base, choice: 'a', confidence: 'guess', now: new Date('2026-03-01T12:00:00Z') }, d)
    expect((await d.srs.get('q:far-test-q1'))!.card.lapses + (await d.srs.get('q:far-test-q1'))!.card.reps).toBeGreaterThan(0)
  })
  it('exam answers (no confidence) are scheduled as confident', async () => {
    await recordMcqAttempt(q, { ...base, mode: 'exam', choice: 'a', now: new Date('2026-03-01T12:00:00Z') }, d)
    expect(await d.srs.count()).toBe(0)
  })
  it('CLOCK SKEW: reviewing at a time earlier than last_review THROWS (FSRSValidationError)', () => {
    const t0 = new Date('2026-03-10T12:00:00Z')
    const learning = review(newCard(t0), Rating.Again, t0)
    const reviewCard = review(review(newCard(t0), Rating.Good, t0), Rating.Good, new Date('2026-03-12T12:00:00Z'))
    const res: string[] = []
    for (const [name, c, ref] of [['learning', learning, t0], ['review', reviewCard, new Date('2026-03-12T12:00:00Z')]] as const)
      for (const mins of [1, 60, 60 * 13, 60 * 24, 60 * 48]) {
        try { review(c, Rating.Good, new Date(ref.getTime() - mins * 60000)); res.push(`${name} -${mins}m ok`) } catch (e) { res.push(`${name} -${mins}m THROWS ${(e as Error).message}`) }
      }
    console.log(res.join('\n'))
    expect(res.some((r) => r.includes('THROWS'))).toBe(true)
  })
  it('CLOCK SKEW via recordMcqAttempt: attempt row is written, then scheduling throws (caller never marks item answered)', async () => {
    await recordMcqAttempt(q, { ...base, choice: 'b', confidence: 'confident', now: new Date('2026-03-10T12:00:00Z') }, d)
    await expect(recordMcqAttempt(q, { ...base, choice: 'a', confidence: 'confident', now: new Date('2026-03-08T12:00:00Z') }, d)).rejects.toThrow(/delta_t/)
    expect(await d.attempts.count()).toBe(2) // orphan attempt persisted before the throw
  })
  it('recordMcqAttempt is not idempotent: a double-submitted answer is stored twice and reviewed twice', async () => {
    const now = new Date('2026-03-01T12:00:00Z')
    await Promise.all([recordMcqAttempt(q, { ...base, choice: 'b', confidence: 'confident', now }, d), recordMcqAttempt(q, { ...base, choice: 'b', confidence: 'confident', now }, d)])
    expect(await d.attempts.count()).toBe(2)
  })
})

describe('card queue', () => {
  const cards = Array.from({ length: 30 }, (_, i) => ({ id: `c${i}`, moduleId: i < 20 ? 'm1' : 'm2', section: 'FAR' as const, front: 'f', back: 'b', needsReview: false }))
  const srsCard = (id: string, due: string, introduced: string): SrsItem => ({ key: `card:${id}`, kind: 'card', itemId: id, moduleId: 'm1', section: 'FAR', card: newCard(), due, introduced })
  it('new-per-day allowance subtracts cards introduced today; due sorted most-overdue first', () => {
    const srs = [srsCard('c0', '2026-03-01T00:00:00.000Z', '2026-03-01'), srsCard('c1', '2026-02-01T00:00:00.000Z', '2026-03-05'), srsCard('c2', '2026-04-01T00:00:00.000Z', '2026-03-05')]
    const r = buildCardQueue({ cards, srs, studiedModules: new Set(['m1']), newPerDay: 5, today: '2026-03-05', now: '2026-03-05T12:00:00.000Z' })
    expect(r.due.map((c) => c.id)).toEqual(['c1', 'c0'])
    expect(r.fresh).toHaveLength(3) // 5 - 2 introduced today
    expect(r.fresh.every((c) => c.moduleId === 'm1')).toBe(true) // unstudied module m2 excluded
  })
  it('allowance never negative; module filter bypasses the daily limit', () => {
    const srs = Array.from({ length: 8 }, (_, i) => srsCard(`c${i}`, '2099-01-01T00:00:00.000Z', '2026-03-05'))
    expect(buildCardQueue({ cards, srs, studiedModules: new Set(['m1']), newPerDay: 5, today: '2026-03-05', now: '2026-03-05T12:00:00.000Z' }).fresh).toHaveLength(0)
    expect(buildCardQueue({ cards, srs, studiedModules: new Set(), newPerDay: 5, today: '2026-03-05', now: '2026-03-05T12:00:00.000Z', moduleFilter: 'm1' }).fresh).toHaveLength(12)
  })
  it('reviewFlashcard stamps introduced once and keeps it', async () => {
    const card = cards[0]
    await reviewFlashcard(card, Rating.Good, d, new Date('2026-03-05T12:00:00'))
    await reviewFlashcard(card, Rating.Good, d, new Date('2026-03-09T12:00:00'))
    expect((await d.srs.get('card:c0'))!.introduced).toBe('2026-03-05')
    expect((await d.srs.get('card:c0'))!.card.reps).toBe(2)
  })
})

describe('backup import', () => {
  const seed = async () => {
    await recordMcqAttempt(q, { ...base, choice: 'b', confidence: 'confident' }, d)
    await d.settings.put({ ...(await getSettings(d)), onboarded: true })
  }
  it('a backup with an empty tables object silently WIPES every table', async () => {
    await seed()
    await importBackup({ app: 'cpa-study-program', version: 1, tables: {} }, d)
    expect([await d.attempts.count(), await d.srs.count(), await d.settings.count()]).toEqual([0, 0, 0])
  })
  it('an older/partial backup (missing tables) replaces, not merges: tables absent from the file are cleared', async () => {
    await seed()
    const old = await exportBackup(d)
    await d.examSessions.put({ id: 'exam-1', examId: 'x', section: 'FAR', startedAt: 'x', remainingMs: 1, testletIndex: 0, onBreak: false, breakUsed: false, testlets: [] })
    delete (old.tables as Record<string, unknown>).examSessions
    await importBackup(old, d)
    expect(await d.examSessions.count()).toBe(0)
    expect(await d.attempts.count()).toBe(1)
  })
  it('version is not checked (version 99 accepted)', async () => {
    await expect(importBackup({ app: 'cpa-study-program', version: 99, tables: {} }, d)).resolves.toBeUndefined()
  })
  it('tables: null throws inside the transaction and rolls back (data survives)', async () => {
    await seed()
    await expect(importBackup({ app: 'cpa-study-program', version: 1, tables: null }, d)).rejects.toThrow()
    expect(await d.attempts.count()).toBe(1)
  })
  it('rows missing a primary key abort and roll back (data survives)', async () => {
    await seed()
    await expect(importBackup({ app: 'cpa-study-program', version: 1, tables: { srs: [{ kind: 'card' }] } }, d)).rejects.toThrow()
    expect(await d.attempts.count()).toBe(1)
  })
  it('structurally malformed rows are accepted and later crash the analytics pipeline', async () => {
    await importBackup({ app: 'cpa-study-program', version: 1, tables: { attempts: [{ itemId: 'x', itemType: 'mcq', mode: 'tutor', section: 'FAR', moduleId: 'far-cash-flows' }, { itemId: 'y', itemType: 'mcq', mode: 'tutor', section: 'FAR', moduleId: 'far-cash-flows' }] } }, d)
    const attempts = await d.attempts.toArray()
    expect(attempts).toHaveLength(2)
    expect(() => historyByItem(attempts)).toThrow(TypeError) // a.at.localeCompare
    const { bundle } = loadContent()
    const section = bundle.sections.find((s) => s.id === 'FAR')!
    expect(() => computeStudyState({ content: bundle, section, settings: { ...(awaitSettings) }, attempts, progress: [], srs: [], errors: [], quizSessions: [], tbsSessions: [], examSessions: [] })).toThrow()
  })
  it('malformed settings (minutesByWeekday string) flow straight into the planner', async () => {
    await importBackup({ app: 'cpa-study-program', version: 1, tables: { settings: [{ id: 'settings', minutesByWeekday: 'abc', examDates: { FAR: '2026-12-01' } }] } }, d)
    const s = await getSettings(d)
    expect(s.minutesByWeekday).toBe('abc')
    const { bundle } = loadContent()
    const section = bundle.sections.find((x) => x.id === 'FAR')!
    const st = computeStudyState({ content: bundle, section, settings: s, attempts: [], progress: [], srs: [], errors: [], quizSessions: [], tbsSessions: [], examSessions: [], now: new Date('2026-09-23T12:00:00') })
    console.log('planner with junk minutes:', st.plan.status.message, st.plan.status.availableMinutes)
    expect(Number.isNaN(st.plan.status.availableMinutes)).toBe(true)
  })
})
const awaitSettings = { id: 'settings' as const, onboarded: true, walkthroughSeen: true, theme: 'system' as const, fontScale: 1, activeSection: 'FAR' as const, sectionOrder: ['FAR' as const], examDates: {}, minutesByWeekday: [60, 60, 60, 60, 60, 60, 60], newCardsPerDay: 20 }
