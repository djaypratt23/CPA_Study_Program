import 'fake-indexeddb/auto'
import { beforeEach, describe, expect, it } from 'vitest'
import { Rating } from 'ts-fsrs'
import { Mcq, type Tbs } from '../src/content/schema'
import { CpaDb, exportBackup, importBackup, resetAll } from '../src/db'
import { recordMcqAttempt, recordTbsAttempt } from '../src/db/actions'
import { newCard, review } from '../src/lib/srs'

const q = Mcq.parse({
  id: 'far-test-q1',
  moduleId: 'far-cash',
  pool: 'practice',
  stem: 'Which item is a cash equivalent?',
  choices: [
    { id: 'a', text: 'A 60-day T-bill bought 60 days before maturity', explanation: 'Right: original maturity to the holder of 3 months or less.' },
    { id: 'b', text: 'A 6-month CD', explanation: 'Original maturity exceeds three months.', trap: 'wrong-rule' },
    { id: 'c', text: 'Postdated check received', explanation: 'A receivable, not cash.', trap: 'wrong-classification' },
    { id: 'd', text: 'Compensating balance (legally restricted)', explanation: 'Legally restricted balances are not available cash.', trap: 'overgeneralization' },
  ],
  answer: 'a',
  explanation: 'Cash equivalents mature within 3 months of acquisition.',
  skill: 'remembering',
})

let d: CpaDb
beforeEach(async () => {
  d = new CpaDb(`test-${Math.random()}`)
  await resetAll(d)
})

const base = { timeMs: 1000, mode: 'tutor' as const, mixed: false, sessionId: 's', section: 'FAR' as const }

describe('recording attempts', () => {
  it('confident correct answers stay out of the review queue', async () => {
    await recordMcqAttempt(q, { ...base, choice: 'a', confidence: 'confident' }, d)
    expect(await d.srs.count()).toBe(0)
    expect(await d.attempts.count()).toBe(1)
  })
  it('misses and lucky guesses are re-queued for spaced review', async () => {
    await recordMcqAttempt(q, { ...base, choice: 'b', confidence: 'confident' }, d)
    const item = await d.srs.get('q:far-test-q1')
    expect(item?.kind).toBe('question')
    await d.srs.clear()
    await recordMcqAttempt(q, { ...base, sessionId: 's2', choice: 'a', confidence: 'guess' }, d)
    expect(await d.srs.get('q:far-test-q1')).toBeTruthy()
  })
})

describe('backup', () => {
  it('export → reset → import restores everything', async () => {
    await recordMcqAttempt(q, { ...base, choice: 'b', confidence: 'unsure' }, d)
    await d.settings.put({ id: 'settings', onboarded: true } as never)
    const backup = await exportBackup(d)
    await resetAll(d)
    expect(await d.attempts.count()).toBe(0)
    await importBackup(JSON.parse(JSON.stringify(backup)), d)
    expect(await d.attempts.count()).toBe(1)
    expect(await d.srs.count()).toBe(1)
    expect((await d.settings.get('settings'))?.onboarded).toBe(true)
  })
  it('rejects files that are not backups', async () => {
    await expect(importBackup({ foo: 1 }, d)).rejects.toThrow(/not a CPA Study Program backup/)
  })
})

describe('engine robustness (P1-2)', () => {
  it('a device clock set backwards does not break scheduling', async () => {
    await recordMcqAttempt(q, { ...base, sessionId: 's1', choice: 'b', confidence: 'confident', now: new Date('2026-03-10T12:00:00Z') }, d)
    await recordMcqAttempt(q, { ...base, sessionId: 's2', choice: 'a', confidence: 'confident', now: new Date('2026-03-08T12:00:00Z') }, d)
    expect(await d.attempts.count()).toBe(2)
    expect((await d.srs.get('q:far-test-q1'))!.card.reps).toBe(2)
  })

  it('review() clamps a review time earlier than the last review', () => {
    const t0 = new Date('2026-03-12T12:00:00Z')
    const card = review(newCard(t0), Rating.Good, t0)
    for (const mins of [1, 60, 60 * 24, 60 * 48]) expect(() => review(card, Rating.Good, new Date(t0.getTime() - mins * 60_000))).not.toThrow()
  })

  it('a double-submitted answer is recorded and scheduled once', async () => {
    const now = new Date('2026-03-01T12:00:00Z')
    const ans = { ...base, choice: 'b', confidence: 'confident' as const, now }
    const [a1, a2] = await Promise.all([recordMcqAttempt(q, ans, d), recordMcqAttempt(q, ans, d)])
    expect(await d.attempts.count()).toBe(1)
    expect(a1.id).toBe(a2.id)
    expect((await d.srs.get('q:far-test-q1'))!.card.reps).toBe(1)
  })

  it('TBS attempts are idempotent per session', async () => {
    const tbs = { id: 'far-tbs-x', moduleIds: ['far-cash'], section: 'FAR' } as unknown as Tbs
    await Promise.all([recordTbsAttempt(tbs, 0.5, 1000, 'tutor', 'run-1', d), recordTbsAttempt(tbs, 0.5, 1000, 'tutor', 'run-1', d)])
    await recordTbsAttempt(tbs, 0.9, 1000, 'tutor', 'run-2', d)
    expect(await d.attempts.count()).toBe(2)
  })
})
