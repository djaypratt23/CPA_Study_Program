import { describe, expect, it } from 'vitest'
import { Tbs } from '../src/content/schema'
import { parseAmount, scoreJournal, scoreReview, scoreTbs } from '../src/lib/tbsScoring'

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
  it('accepts a trailing %, the Unicode minus, and $(…) negatives', () => {
    expect(parseAmount('25%')).toBe(25)
    expect(parseAmount('23.75 %')).toBe(23.75)
    expect(parseAmount('\u2212250')).toBe(-250)
    expect(parseAmount('$(1,000)')).toBe(-1000)
    expect(parseAmount('($1,000)')).toBe(-1000)
    expect(parseAmount('-$1,000')).toBe(-1000)
    expect(parseAmount('%')).toBeNull()
    expect(parseAmount('25%%')).toBeNull()
  })
})

describe('percent rows', () => {
  const pctTbs = Tbs.parse({
    ...tbs,
    parts: [{ kind: 'numeric', id: 'p', prompt: 'Rates', rows: [{ id: 'gm', label: 'Gross margin', answer: 25, tolerance: 0.1, unit: '%', explanation: 'because' }] }],
  })
  const score = (v: string) => scoreTbs(pctTbs, { p: { kind: 'numeric', values: { gm: v } } }).percent
  it('scores "25%" and "25" as correct', () => {
    expect(score('25%')).toBe(1)
    expect(score('25')).toBe(1)
  })
  it('does not accept a decimal fraction for a percent key', () => {
    expect(score('0.25')).toBe(0)
  })
  it('shows the unit in the expected answer', () => {
    expect(scoreTbs(pctTbs, {}).cells[0].expected).toBe('25%')
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
  it('penalizes hedging by listing every account on both sides', () => {
    const cells = scoreJournal(part, [
      { account: 'Cash', debit: 500 },
      { account: 'Cash', credit: 500 },
      { account: 'Revenue', debit: 500 },
      { account: 'Revenue', credit: 500 },
    ])
    const earned = cells.filter((c) => c.correct).length
    expect(earned).toBe(2)
    expect(earned / cells.length).toBeLessThan(1)
    expect(cells).toHaveLength(4)
  })
  it('penalizes a duplicated correct line', () => {
    const cells = scoreJournal(part, [
      { account: 'Cash', debit: 500 },
      { account: 'Cash', debit: 500 },
      { account: 'Revenue', credit: 500 },
    ])
    expect(cells.filter((c) => c.correct)).toHaveLength(2)
    expect(cells).toHaveLength(3)
  })
  it('charges a wrong-amount line only once (through its expected cell)', () => {
    const cells = scoreJournal(part, [
      { account: 'Cash', debit: 450 },
      { account: 'Revenue', credit: 500 },
    ])
    expect(cells).toHaveLength(2)
    expect(cells.find((c) => c.label === 'Dr Cash')).toMatchObject({ correct: false, given: 'Dr 450' })
  })
  it('penalizes a second attempt at a line that is already wrong', () => {
    const cells = scoreJournal(part, [
      { account: 'Cash', debit: 450 },
      { account: 'Cash', debit: 400 },
      { account: 'Revenue', credit: 500 },
    ])
    expect(cells).toHaveLength(3)
    expect(cells.filter((c) => c.correct)).toHaveLength(1)
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

describe('review parts (P1-4)', () => {
  const reviewTbs = Tbs.parse({
    ...tbs,
    id: 'far-tbs-review-test',
    skill: 'analysis',
    parts: [
      {
        kind: 'review',
        id: 'rv',
        prompt: 'Review the schedule',
        rows: [
          { id: 'ok', label: 'Correct row', prepared: 1200, answer: 1200, explanation: 'agrees to the invoice' },
          { id: 'bad', label: 'Wrong row', prepared: 5000, answer: 4500, explanation: 'excludes the returned goods' },
        ],
      },
    ],
  })
  const part = reviewTbs.parts[0] as Extract<Tbs['parts'][number], { kind: 'review' }>

  it('credits a correct row left unflagged and an error row flagged with the right amount', () => {
    const cells = scoreReview(part, { ok: { flagged: false }, bad: { flagged: true, corrected: '$4,500' } })
    expect(cells.map((c) => c.correct)).toEqual([true, true])
    expect(cells[1].expected).toBe('Error → 4,500')
  })

  it('does not reward flagging everything', () => {
    const cells = scoreReview(part, { ok: { flagged: true, corrected: '1200' }, bad: { flagged: true, corrected: '4500' } })
    expect(cells.map((c) => c.correct)).toEqual([false, true])
  })

  it('requires the corrected amount, not just the flag', () => {
    expect(scoreReview(part, { bad: { flagged: true } })[1].correct).toBe(false)
    expect(scoreReview(part, { bad: { flagged: true, corrected: '5000' } })[1].correct).toBe(false)
    expect(scoreReview(part, { bad: { flagged: false, corrected: '4500' } })[1].correct).toBe(false)
  })

  it('an empty response scores the unflagged correct rows only', () => {
    expect(scoreTbs(reviewTbs, {}).percent).toBe(0.5)
  })

  it('rejects a review part with no error rows or no correct rows', () => {
    const rows = (prepared: number[]) => prepared.map((p, i) => ({ id: `r${i}`, label: 'x', prepared: p, answer: 100, explanation: 'because' }))
    const mk = (prepared: number[]) => ({ ...reviewTbs, parts: [{ kind: 'review', id: 'rv', prompt: 'p', rows: rows(prepared) }] })
    expect(Tbs.safeParse(mk([100, 100])).success).toBe(false)
    expect(Tbs.safeParse(mk([90, 80])).success).toBe(false)
    expect(Tbs.safeParse(mk([100, 80])).success).toBe(true)
  })
})
