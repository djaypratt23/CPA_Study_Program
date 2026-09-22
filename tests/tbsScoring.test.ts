import { describe, expect, it } from 'vitest'
import { Tbs } from '../src/content/schema'
import { parseAmount, scoreJournal, scoreTbs } from '../src/lib/tbsScoring'

const tbs = Tbs.parse({
  id: 'far-tbs-test',
  section: 'FAR',
  unitId: 'far-u5',
  moduleIds: ['far-cash'],
  pool: 'practice',
  title: 'Test',
  minutes: 10,
  skill: 'application',
  instructions: 'Do it',
  parts: [
    {
      kind: 'numeric',
      id: 'n',
      prompt: 'Numbers',
      rows: [
        { id: 'r1', label: 'A', answer: 1000, tolerance: 1, explanation: 'because' },
        { id: 'r2', label: 'B', answer: -250, explanation: 'because' },
      ],
    },
    { kind: 'dropdown', id: 'd', prompt: 'Pick', options: ['X', 'Y'], rows: [{ id: 'd1', label: 'row', answer: 'Y', explanation: 'because' }] },
    {
      kind: 'journal',
      id: 'j',
      prompt: 'JE',
      accounts: ['Cash', 'Revenue', 'Receivable'],
      lines: [
        { account: 'Cash', debit: 500 },
        { account: 'Revenue', credit: 500 },
      ],
      explanation: 'because',
    },
    {
      kind: 'docreview',
      id: 'dr',
      prompt: 'Fix',
      segments: [
        { text: 'The entity ' },
        { id: 's1', original: 'expensed', options: ['expensed', 'capitalized'], answer: 'capitalized', explanation: 'because' },
        { text: ' the cost; it ' },
        { id: 's2', original: 'is', options: ['is', 'is not'], answer: 'is', explanation: 'because' },
      ],
    },
    {
      kind: 'research',
      id: 'rs',
      prompt: 'Which?',
      excerpts: [
        { id: 'e1', citation: 'ASC 1', text: 'a' },
        { id: 'e2', citation: 'ASC 2', text: 'b' },
      ],
      answer: 'e2',
      explanation: 'because',
    },
  ],
})

describe('parseAmount', () => {
  it('accepts $, commas, parentheses and minus', () => {
    expect(parseAmount('$1,234')).toBe(1234)
    expect(parseAmount('(250)')).toBe(-250)
    expect(parseAmount('-250')).toBe(-250)
    expect(parseAmount(' 12.5 ')).toBe(12.5)
    expect(parseAmount('')).toBeNull()
    expect(parseAmount('abc')).toBeNull()
  })
})

describe('scoreTbs', () => {
  it('awards one point per cell with partial credit', () => {
    const s = scoreTbs(tbs, {
      n: { kind: 'numeric', values: { r1: '1,000.8', r2: '(250)' } },
      d: { kind: 'dropdown', values: { d1: 'X' } },
      j: {
        kind: 'journal',
        lines: [
          { account: 'Revenue', credit: '500' },
          { account: 'Cash', debit: '500' },
        ],
      },
      dr: { kind: 'docreview', values: { s1: 'capitalized' } },
      rs: { kind: 'research', value: 'e2' },
    })
    // cells: 2 numeric + 1 dropdown + 2 journal + 2 docreview + 1 research = 8; only the dropdown is wrong
    expect(s.possible).toBe(8)
    expect(s.earned).toBe(7)
    expect(s.cells.find((c) => c.cellId === 'd1')?.correct).toBe(false)
  })

  it('treats an untouched doc-review segment as keeping the original', () => {
    const s = scoreTbs(tbs, {})
    expect(s.cells.find((c) => c.cellId === 's2')?.correct).toBe(true)
    expect(s.cells.find((c) => c.cellId === 's1')?.correct).toBe(false)
  })

  it('respects numeric tolerance', () => {
    const s = scoreTbs(tbs, { n: { kind: 'numeric', values: { r1: '1002', r2: '-250' } } })
    expect(s.cells.find((c) => c.cellId === 'r1')?.correct).toBe(false)
  })
})

describe('journal entry scoring', () => {
  const part = tbs.parts.find((p) => p.kind === 'journal')!
  if (part.kind !== 'journal') throw new Error('bad fixture')
  it('penalizes extra unrelated lines', () => {
    const cells = scoreJournal(part, [
      { account: 'Cash', debit: 500 },
      { account: 'Revenue', credit: 500 },
      { account: 'Receivable', debit: 100 },
    ])
    expect(cells.filter((c) => c.correct)).toHaveLength(2)
    expect(cells).toHaveLength(3)
  })
  it('requires the right side, not just the right amount', () => {
    const cells = scoreJournal(part, [
      { account: 'Cash', credit: 500 },
      { account: 'Revenue', debit: 500 },
    ])
    expect(cells.filter((c) => c.correct)).toHaveLength(0)
  })
  it('ignores blank lines', () => {
    const cells = scoreJournal(part, [{ account: '' }, { account: 'Cash', debit: 500 }, { account: 'Revenue', credit: 500 }, { account: '' }])
    expect(cells).toHaveLength(2)
    expect(cells.every((c) => c.correct)).toBe(true)
  })
})

describe('TBS schema checks', () => {
  it('rejects an unbalanced journal entry', () => {
    const bad = structuredClone(tbs) as unknown as { parts: { kind: string; lines?: { account: string; debit?: number; credit?: number }[] }[] }
    bad.parts[2].lines = [
      { account: 'Cash', debit: 500 },
      { account: 'Revenue', credit: 400 },
    ]
    expect(Tbs.safeParse(bad).success).toBe(false)
  })
})
