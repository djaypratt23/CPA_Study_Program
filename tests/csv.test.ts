import { describe, expect, it } from 'vitest'
import type { Attempt } from '../src/db/types'
import { attemptsToCsv, csvCell } from '../src/lib/csv'

const a = (over: Partial<Attempt>): Attempt => ({
  itemId: 'far-rec-01',
  itemType: 'mcq',
  moduleId: 'far-receivables',
  section: 'FAR',
  correct: true,
  score: 1,
  choice: 'b',
  confidence: 'confident',
  timeMs: 42_400,
  mode: 'tutor',
  mixed: false,
  sessionId: 'quiz-1',
  at: '2026-09-30T10:00:00.000Z',
  day: '2026-09-30',
  ...over,
})

describe('CSV export (P2-6)', () => {
  it('writes a header and one row per attempt, oldest first', () => {
    const csv = attemptsToCsv([a({ at: '2026-09-30T11:00:00.000Z', itemId: 'second' }), a({})])
    const lines = csv.trim().split('\r\n')
    expect(lines[0]).toBe('at,day,section,moduleId,itemId,itemType,mode,correct,score,choice,confidence,timeSeconds,mixed,sessionId')
    expect(lines[1]).toBe('2026-09-30T10:00:00.000Z,2026-09-30,FAR,far-receivables,far-rec-01,mcq,tutor,true,1,b,confident,42,false,quiz-1')
    expect(lines[2]).toContain(',second,')
  })

  it('quotes special characters and neutralizes spreadsheet formulas', () => {
    expect(csvCell('a,b')).toBe('"a,b"')
    expect(csvCell('say "hi"')).toBe('"say ""hi"""')
    expect(csvCell('=SUM(A1)')).toBe("'=SUM(A1)")
    expect(csvCell(undefined)).toBe('')
  })
})
