// Adversarial TBS scoring: number parsing, JE matching, bounds, denominators.
import { describe, expect, it } from 'vitest'
import { Tbs } from '../../src/content/schema'
import { parseAmount, scoreJournal, scoreTbs, cellCount, type TbsResponses } from '../../src/lib/tbsScoring'
import { mulberry32 } from '../../src/lib/random'
import { loadContent } from '../../scripts/load-content'

const je = Tbs.parse({
  id: 'far-tbs-je', section: 'FAR', unitId: 'far-u1', moduleIds: ['far-x'], pool: 'practice', title: 't', minutes: 10, skill: 'application', instructions: 'i',
  parts: [{
    kind: 'journal', id: 'j', prompt: 'p', accounts: ['Cash', 'Revenue', 'Receivable', 'Deferred revenue'],
    lines: [{ account: 'Cash', debit: 500 }, { account: 'Receivable', debit: 500 }, { account: 'Revenue', credit: 1000 }], explanation: 'because',
  }],
}).parts[0] as Extract<Tbs['parts'][number], { kind: 'journal' }>

const pctTbs = Tbs.parse({
  id: 'aud-tbs-pct', section: 'AUD', unitId: 'aud-u6', moduleIds: ['aud-x'], pool: 'practice', title: 't', minutes: 10, skill: 'application', instructions: 'i',
  parts: [{ kind: 'numeric', id: 'n', prompt: 'p', rows: [
    { id: 'sr', label: 'Sample deviation rate (%)', answer: 2.0, tolerance: 0.05, explanation: 'because' },
    { id: 'gm', label: 'Gross margin % (Year 2)', answer: 36.0, tolerance: 0.1, explanation: 'because' },
  ] }],
})

describe('parseAmount edge cases', () => {
  it.each([
    ['1,000', 1000], ['$1,000.50', 1000.5], ['(500)', -500], ['-500', -500], ['- 500', -500], ['($1,000)', -1000],
    ['.5', 0.5], ['1,00,0', 1000], ['99999999999999999999', 1e20],
  ])('accepts %s -> %s', (s, n) => expect(parseAmount(s)).toBe(n))
  it.each([
    ['', null], ['   ', null], ['abc', null], ['1e5', null], ['5.', null], ['1.2.3', null], ['500-', null],
    ['2%', null], ['36.0%', null], ['$(1,000)', null], ['−500' /* U+2212 */, null], ['１２３', null],
  ])('rejects %s', (s, n) => expect(parseAmount(s)).toBe(n))
  it('double negative "(-500)" parses as +500', () => expect(parseAmount('(-500)')).toBe(500))
  it('numbers: NaN/Infinity -> null', () => {
    expect(parseAmount(NaN)).toBeNull()
    expect(parseAmount(Infinity)).toBeNull()
    expect(parseAmount(-0)).toBe(-0)
  })
})

describe('percent-labelled numeric rows (real content uses these)', () => {
  it('"2%" and "36%" are marked WRONG even though they are the right answer', () => {
    const r = scoreTbs(pctTbs, { n: { kind: 'numeric', values: { sr: '2%', gm: '36%' } } })
    expect(r.earned).toBe(0)
    const ok = scoreTbs(pctTbs, { n: { kind: 'numeric', values: { sr: '2', gm: '36.0' } } })
    expect(ok.earned).toBe(2)
  })
  it('real content: every numeric row whose label mentions % rejects "<answer>%"', () => {
    const { bundle } = loadContent()
    const rows: string[] = []
    for (const t of Object.values(bundle.tbs))
      for (const p of t.parts)
        if (p.kind === 'numeric')
          for (const r of p.rows)
            if (/%|percent/i.test(r.label)) {
              const s = scoreTbs(t, { [p.id]: { kind: 'numeric', values: { [r.id]: `${r.answer}%` } } })
              const cell = s.cells.find((c) => c.cellId === r.id && c.partId === p.id)!
              if (!cell.correct) rows.push(`${t.id}/${p.id}/${r.id} (${r.label}) answer ${r.answer}`)
            }
    console.log(`percent rows that reject "<answer>%": ${rows.length}\n` + rows.join('\n'))
    expect(rows.length).toBeGreaterThan(0)
  })
})

describe('journal entry scoring', () => {
  const L = (account: string, debit?: string | number | null, credit?: string | number | null) => ({ account, debit, credit })
  it('perfect, any order', () => {
    const r = scoreJournal(je, [L('Revenue', null, '1,000'), L('Receivable', 500), L('Cash', '$500')])
    expect(r.filter((c) => c.correct)).toHaveLength(3)
    expect(r).toHaveLength(3)
  })
  it('HEDGING EXPLOIT: entering every expected account on BOTH sides still scores 100%', () => {
    const lines = [L('Cash', 500), L('Cash', null, 500), L('Receivable', 500), L('Receivable', null, 500), L('Revenue', 1000), L('Revenue', null, 1000)]
    const r = scoreJournal(je, lines)
    const earned = r.filter((c) => c.correct).length
    console.log('hedged JE:', earned, '/', r.length)
    expect(earned).toBe(3)
    expect(r).toHaveLength(3) // no penalty cells for the 3 wrong-side lines
  })
  it('duplicate correct lines are not penalized either', () => {
    const r = scoreJournal(je, [L('Cash', 500), L('Cash', 500), L('Cash', 500), L('Receivable', 500), L('Revenue', null, 1000)])
    expect(r.filter((c) => c.correct).length).toBe(3)
    expect(r).toHaveLength(3)
  })
  it('extra unrelated account costs one cell (denominator grows)', () => {
    const r = scoreJournal(je, [L('Cash', 500), L('Receivable', 500), L('Revenue', null, 1000), L('Deferred revenue', null, 1)])
    expect([r.filter((c) => c.correct).length, r.length]).toEqual([3, 4])
  })
  it('swapped debit/credit earns 0 and adds no penalty cells', () => {
    const r = scoreJournal(je, [L('Cash', null, 500), L('Receivable', null, 500), L('Revenue', 1000)])
    expect([r.filter((c) => c.correct).length, r.length]).toEqual([0, 3])
  })
  it('a line with both a debit and a credit does not match', () => {
    const r = scoreJournal(je, [L('Cash', 500, 500), L('Receivable', 500), L('Revenue', null, 1000)])
    expect(r.filter((c) => c.correct).length).toBe(2)
  })
  it('amount with 0 on the other side is accepted; negative amount on right side is not', () => {
    expect(scoreJournal(je, [L('Cash', 500, 0)])[0].correct).toBe(true)
    expect(scoreJournal(je, [L('Cash', '(500)')])[0].correct).toBe(false)
  })
  it('lines with amounts but no account are penalized', () => {
    const r = scoreJournal(je, [L('', 500)])
    expect(r.some((c) => c.label.includes('(no account)'))).toBe(true)
  })
  it('review display: "given" for an account shows the FIRST entered line, even when a later line matched', () => {
    const r = scoreJournal(je, [L('Cash', null, 500), L('Cash', 500)])
    expect(r[0].correct).toBe(true)
    expect(r[0].given).toBe('Cr 500')
  })
})

describe('bounds: random adversarial responses never leave [0,1]', () => {
  it('fuzz 20k responses against real TBS', () => {
    const { bundle } = loadContent()
    const tbsList = Object.values(bundle.tbs)
    const rand = mulberry32(99)
    const junk = ['', ' ', 'NaN', '-', '()', '1e999', '(0)', '0', '-0', '9'.repeat(400), '$', ',', '12%', '1,000', '(1,000)']
    const pick = <T,>(a: T[]) => a[Math.floor(rand() * a.length)]
    let minP = 1, maxP = 0
    for (let k = 0; k < 20000; k++) {
      const t = pick(tbsList)
      const resp: TbsResponses = {}
      for (const p of t.parts) {
        if (p.kind === 'numeric') resp[p.id] = { kind: 'numeric', values: Object.fromEntries(p.rows.map((r) => [r.id, rand() < 0.3 ? String(r.answer) : pick(junk)])) }
        if (p.kind === 'dropdown') resp[p.id] = { kind: 'dropdown', values: Object.fromEntries(p.rows.map((r) => [r.id, rand() < 0.5 ? r.answer : 'x'])) }
        if (p.kind === 'docreview') resp[p.id] = { kind: 'docreview', values: {} }
        if (p.kind === 'research') resp[p.id] = { kind: 'research', value: rand() < 0.5 ? p.answer : '' }
        if (p.kind === 'journal')
          resp[p.id] = { kind: 'journal', lines: Array.from({ length: Math.floor(rand() * 12) }, () => ({ account: pick([...p.accounts, '']), debit: pick([...junk, 100, null]), credit: pick([...junk, 100, null]) })) }
      }
      const s = scoreTbs(t, resp)
      expect(s.earned).toBeLessThanOrEqual(s.possible)
      expect(s.possible).toBeGreaterThanOrEqual(cellCount(t))
      expect(Number.isFinite(s.percent)).toBe(true)
      minP = Math.min(minP, s.percent); maxP = Math.max(maxP, s.percent)
    }
    expect(minP).toBeGreaterThanOrEqual(0)
    expect(maxP).toBeLessThanOrEqual(1)
  })
  it('blank response: only untouched doc-review segments whose original is already correct earn credit', () => {
    const { bundle } = loadContent()
    const withFree = Object.values(bundle.tbs).map((t) => ({ id: t.id, s: scoreTbs(t, {}) })).filter((x) => x.s.earned > 0)
    console.log('TBS earning credit on a completely blank response:', withFree.map((x) => `${x.id} ${x.s.earned}/${x.s.possible}`).join(', '))
  })
  it('wrong response kind for a part is treated as blank (no crash)', () => {
    const s = scoreTbs(pctTbs, { n: { kind: 'dropdown', values: { sr: '2' } } } as never)
    expect(s.earned).toBe(0)
  })
})
