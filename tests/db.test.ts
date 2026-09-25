import 'fake-indexeddb/auto'
import { beforeEach, describe, expect, it } from 'vitest'
import { Mcq } from '../src/content/schema'
import { CpaDb, exportBackup, importBackup, parseBackup, resetAll, saveSettings } from '../src/db'
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

describe('backup import safety', () => {
  const seed = async () => {
    await recordMcqAttempt(q, { ...base, choice: 'b', confidence: 'unsure' }, d)
    await saveSettings({ onboarded: true, activeSection: 'AUD' }, d)
  }
  const snapshot = async () => ({ attempts: await d.attempts.count(), srs: await d.srs.count(), settings: await d.settings.get('settings') })
  const wrap = (tables: Record<string, unknown[]>, version: unknown = 1) => ({ app: 'cpa-study-program', version, exportedAt: '', tables })

  it('an empty backup changes nothing', async () => {
    await seed()
    const before = await snapshot()
    await importBackup(wrap({}), d)
    expect(await snapshot()).toEqual(before)
  })

  it('a partial backup keeps the tables it does not mention', async () => {
    await seed()
    await importBackup(wrap({ itemMeta: [{ itemId: 'far-test-q1', flagged: true }] }), d)
    expect(await d.attempts.count()).toBe(1)
    expect(await d.srs.count()).toBe(1)
    expect((await d.settings.get('settings'))?.activeSection).toBe('AUD')
    expect((await d.itemMeta.get('far-test-q1'))?.flagged).toBe(true)
  })

  it('"replace everything" clears tables missing from the file', async () => {
    await seed()
    await importBackup(wrap({ itemMeta: [{ itemId: 'x' }] }), d, 'replace')
    expect(await d.attempts.count()).toBe(0)
    expect(await d.settings.count()).toBe(0)
    expect(await d.itemMeta.count()).toBe(1)
  })

  const malformed: Record<string, Record<string, unknown[]>> = {
    'bad activeSection': { settings: [{ id: 'settings', activeSection: 'XYZ' }] },
    'examDates null': { settings: [{ id: 'settings', examDates: null }] },
    'huge fontScale': { settings: [{ id: 'settings', fontScale: 40 }] },
    'srs row without a card': { srs: [{ key: 'card:zzz', kind: 'card', itemId: 'zzz', moduleId: 'm', section: 'FAR', due: '2000-01-01T00:00:00.000Z' }] },
    'garbage attempts': { attempts: [{ id: 1, itemId: 42, section: 'FAR', day: null, at: 5 }] },
    'table that is not a list': { attempts: { a: 1 } as unknown as unknown[] },
    'javascript: lastLocation': { settings: [{ id: 'settings', lastLocation: { path: 'javascript:alert(1)', label: 'x', at: '' } }] },
  }
  for (const [name, tables] of Object.entries(malformed)) {
    it(`rejects a backup with ${name} and leaves data untouched`, async () => {
      await seed()
      const before = await snapshot()
      await expect(importBackup(wrap(tables), d)).rejects.toThrow(/nothing was imported/)
      expect(await snapshot()).toEqual(before)
    })
  }

  it('rejects an unknown backup version', async () => {
    await expect(importBackup(wrap({}, 2), d)).rejects.toThrow(/version/)
  })

  it('parseBackup reports row counts for the confirmation prompt', () => {
    expect(parseBackup(wrap({ itemMeta: [{ itemId: 'a' }, { itemId: 'b' }], attempts: [] })).counts).toEqual({ itemMeta: 2, attempts: 0 })
  })
})
