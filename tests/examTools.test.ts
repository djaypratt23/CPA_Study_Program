import { describe, expect, it } from 'vitest'
import { CYCLE, DIV0, ERR, displayValue, evaluate, expandRange } from '../src/lib/sheet'
import { formatDuration, pacing } from '../src/lib/pacing'

describe('spreadsheet evaluator (P1-10)', () => {
  it('evaluates arithmetic with precedence, parentheses and unary minus', () => {
    const v = evaluate({
      A1: '=2+3*4',
      A2: '=(2+3)*4',
      A3: '=-A1+1',
      A4: '=2^3^2',
    })
    expect(v).toMatchObject({ A1: 14, A2: 20, A3: -13, A4: 512 })
  })

  it('resolves references, numbers with commas, and ranges in functions', () => {
    const v = evaluate({
      A1: '1,000',
      A2: '2500',
      A3: '=SUM(A1:A2)',
      B1: '=AVERAGE(A1:A3)',
      B2: '=MAX(A1,A2,10000)',
      B3: '=ROUND(B1/3,2)',
    })
    expect(v.A3).toBe(3500)
    expect(v.B1).toBeCloseTo(7000 / 3)
    expect(v.B2).toBe(10000)
    expect(v.B3).toBe(Math.round((7000 / 3 / 3) * 100) / 100)
  })

  it('treats blank cells as zero and ignores text inside ranges', () => {
    expect(evaluate({ A1: 'Revenue', A2: '100', C1: '=SUM(A1:A5)+B9' }).C1).toBe(100)
  })

  it('reports errors, division by zero and cycles instead of throwing', () => {
    const v = evaluate({
      A1: '=1/0',
      A2: '=A1+1',
      A3: '=SUM(',
      B1: '=B2',
      B2: '=B1',
      C1: '=A1*0',
    })
    expect(v.A1).toBe(DIV0)
    expect(v.A2).toBe(DIV0)
    expect(v.A3).toBe(ERR)
    expect(v.B1).toBe(CYCLE)
    expect(v.B2).toBe(CYCLE)
    expect(v.C1).toBe(DIV0)
  })

  it('expands ranges in either direction', () => {
    expect(expandRange('B2', 'A1')).toEqual(['A1', 'A2', 'B1', 'B2'])
  })

  it('formats values for display', () => {
    expect(displayValue(1234567.891)).toBe('1,234,567.891')
    expect(displayValue('')).toBe('')
    expect(displayValue(ERR)).toBe(ERR)
  })
})

describe('pacing (P1-10)', () => {
  it('averages timed items and flags those over twice the target', () => {
    const p = pacing([
      { timeMs: 60_000, targetMs: 90_000 },
      { timeMs: 200_000, targetMs: 90_000 },
      { timeMs: 0, targetMs: 90_000 },
      { timeMs: 90_000, targetMs: 90_000 },
    ])
    expect(p.timed).toBe(3)
    expect(p.totalMs).toBe(350_000)
    expect(p.targetMs).toBe(270_000)
    expect(p.slow).toEqual([1])
    expect(p.avgMs).toBeCloseTo(350_000 / 3)
  })

  it('formats durations', () => {
    expect(formatDuration(65_000)).toBe('1:05')
    expect(formatDuration(3_725_000)).toBe('1:02:05')
    expect(formatDuration(-5)).toBe('0:00')
  })
})
