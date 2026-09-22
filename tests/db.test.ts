import 'fake-indexeddb/auto'
import { beforeEach, describe, expect, it } from 'vitest'
import { Mcq } from '../src/content/schema'
import { CpaDb, exportBackup, importBackup, resetAll } from '../src/db'
import { recordMcqAttempt } from '../src/db/actions'

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
    await recordMcqAttempt(q, { ...base, choice: 'a', confidence: 'guess' }, d)
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
