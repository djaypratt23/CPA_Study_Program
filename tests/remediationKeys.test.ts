import { describe, expect, it } from 'vitest'
import { loadContent } from '../scripts/load-content'
import type { Tbs } from '../src/content/schema'
import { scoreTbs, type TbsResponses } from '../src/lib/tbsScoring'

// Regression tests for answer keys corrected in remediation (REMEDIATION_TASKS.md P0-1, P0-2).
// Each corrected key is pinned here so a later edit can't silently revert it.

const { bundle } = loadContent()

function tbs(id: string): Tbs {
  const t = bundle.tbs[id]
  if (!t) throw new Error(`missing TBS ${id}`)
  return t
}

function perfectResponses(t: Tbs): TbsResponses {
  const responses: TbsResponses = {}
  for (const p of t.parts) {
    if (p.kind === 'numeric') responses[p.id] = { kind: 'numeric', values: Object.fromEntries(p.rows.map((r) => [r.id, String(r.answer)])) }
    if (p.kind === 'dropdown') responses[p.id] = { kind: 'dropdown', values: Object.fromEntries(p.rows.map((r) => [r.id, r.answer])) }
    if (p.kind === 'journal') responses[p.id] = { kind: 'journal', lines: p.lines }
    if (p.kind === 'docreview')
      responses[p.id] = { kind: 'docreview', values: Object.fromEntries(p.segments.flatMap((s) => ('id' in s ? [[s.id, s.answer]] : []))) }
    if (p.kind === 'research') responses[p.id] = { kind: 'research', value: p.answer }
  }
  return responses
}

function rowAnswer(t: Tbs, rowId: string): number | string | undefined {
  for (const p of t.parts) {
    if (p.kind === 'numeric' || p.kind === 'dropdown') {
      const row = p.rows.find((r) => r.id === rowId)
      if (row) return row.answer
    }
  }
  return undefined
}

const numericKeys: Record<string, Record<string, number>> = {
  'reg-tbs-u6-corporate-ti': { pre: 542000, ch: 44200, drd: 39000, nol: 100000, ti: 358800, tax: 75348 },
  'tcp-tbs-x2-corporate': { pre: 650000, ch: 45000, m1: 605000, drd: 32500, nol: 200000, ti: 372500, tax: 78225 },
  'far-tbs-u8-bonds': { p: 1837774, i1: 73511, c1: 1851285, i2: 74051, ca: 947574, rp: 970000, gl: -22426 },
}

describe('remediated TBS answer keys', () => {
  for (const [id, keys] of Object.entries(numericKeys)) {
    it(`${id} carries the corrected keys`, () => {
      const t = tbs(id)
      for (const [row, value] of Object.entries(keys)) expect(rowAnswer(t, row), `${id}/${row}`).toBe(value)
    })
  }

  it('tcp-tbs-u2-retirement-education d3 keys RMD age 75 (born 1960 or later)', () => {
    const t = tbs('tcp-tbs-u2-retirement-education')
    expect(rowAnswer(t, 'd3')).toBe('75')
  })

  it('the corporate charitable limit is 10% of income after the NOL carryforward', () => {
    // IRC §170(b)(2)(D): ignore the DRD and NOL carrybacks, but not carryforwards.
    expect(0.1 * (542000 - 100000)).toBe(numericKeys['reg-tbs-u6-corporate-ti'].ch)
    expect(0.1 * (650000 - 200000)).toBe(numericKeys['tcp-tbs-x2-corporate'].ch)
  })

  it('far-tbs-u8-bonds keys agree with the exhibit factors', () => {
    let carrying = Math.round(2000000 * 0.67556 + 60000 * 8.1109)
    expect(carrying).toBe(numericKeys['far-tbs-u8-bonds'].p)
    for (let i = 0; i < 4; i++) carrying += Math.round(carrying * 0.04) - 60000
    expect(Math.round(carrying / 2)).toBe(numericKeys['far-tbs-u8-bonds'].ca)
  })

  it.each([
    'reg-tbs-u6-corporate-ti',
    'tcp-tbs-x2-corporate',
    'tcp-tbs-u2-retirement-education',
    'far-tbs-u8-bonds',
    'far-tbs-u7-equity',
    'tcp-tbs-u3-estimates-consolidated',
    'tcp-tbs-x4-property',
    'tcp-tbs-u6-multistate-liquidation',
    'aud-tbs-u3-analytics',
  ])('%s: a perfect response scores 100%%', (id) => {
    const t = tbs(id)
    expect(scoreTbs(t, perfectResponses(t)).percent).toBe(1)
  })

  it('tcp-tbs-x4-property dep accepts the unrounded mid-month result', () => {
    const t = tbs('tcp-tbs-x4-property')
    const responses = perfectResponses(t)
    const part = t.parts.find((p) => p.kind === 'numeric' && p.rows.some((r) => r.id === 'dep'))!
    const numeric = responses[part.id] as { kind: 'numeric'; values: Record<string, string> }
    numeric.values.dep = '79166.67'
    expect(scoreTbs(t, responses).percent).toBe(1)
  })
})

describe('remediated MCQ answer keys', () => {
  it('reg-x2-08: the March 1 filer has priority (possessory interest attached only on March 5)', () => {
    const q = bundle.questions['reg-x2-08']
    expect(q.answer).toBe('a')
    expect(q.choices.find((c) => c.id === 'a')?.trap).toBeUndefined()
    expect(q.choices.find((c) => c.id === 'd')?.trap).toBe('wrong-rule')
  })

  it('far-nd-08: a 45% customer concentration must be disclosed', () => {
    const q = bundle.questions['far-nd-08']
    expect(q.answer).toBe('b')
    expect(q.choices.find((c) => c.id === 'b')?.text).toMatch(/always deemed at least reasonably possible/)
    expect(q.choices.find((c) => c.id === 'c')?.trap).toBe('wrong-rule')
  })

  it('aud-wr-10: the stem states the dollar amounts', () => {
    const q = bundle.questions['aud-wr-10']
    expect(q.stem).toContain('$40,000')
    expect(q.stem).toContain('$100,000')
    expect(q.answer).toBe('b')
  })
})
