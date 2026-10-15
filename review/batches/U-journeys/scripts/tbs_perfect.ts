// Scores a "perfect" learner response for every TBS, typed the way the UI stores it (strings with commas / %).
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { scoreTbs } from '../../../../src/lib/tbsScoring'
import { Tbs } from '../../../../src/content/schema'
const root = join(import.meta.dirname, '../../../../content')
let n = 0, bad = 0
for (const sec of ['far', 'aud', 'reg', 'tcp']) {
  const dir = join(root, sec, 'tbs')
  if (!existsSync(dir)) continue
  for (const f of readdirSync(dir)) {
    const t: any = Tbs.parse(JSON.parse(readFileSync(join(dir, f), 'utf8')))
    const r: Record<string, unknown> = {}
    for (const p of t.parts) {
      if (p.kind === 'numeric') r[p.id] = { kind: 'numeric', values: Object.fromEntries(p.rows.map((x: any) => [x.id, x.unit === '%' ? `${x.answer}%` : x.answer.toLocaleString('en-US')])) }
      if (p.kind === 'dropdown') r[p.id] = { kind: 'dropdown', values: Object.fromEntries(p.rows.map((x: any) => [x.id, x.answer])) }
      if (p.kind === 'docreview') r[p.id] = { kind: 'docreview', values: Object.fromEntries(p.segments.filter((s: any) => 'id' in s).map((s: any) => [s.id, s.answer])) }
      if (p.kind === 'research') r[p.id] = { kind: 'research', value: p.answer }
      if (p.kind === 'journal') {
        const lines = p.lines.map((l: any) => ({ account: l.account, debit: l.debit !== undefined ? l.debit.toLocaleString('en-US') : null, credit: l.credit !== undefined ? l.credit.toLocaleString('en-US') : null }))
        while (lines.length < p.maxLines) lines.push({ account: '' })
        r[p.id] = { kind: 'journal', lines }
      }
      if (p.kind === 'review') r[p.id] = { kind: 'review', values: Object.fromEntries(p.rows.map((x: any) => [x.id, Math.abs(x.prepared - x.answer) > x.tolerance ? { flagged: true, corrected: x.answer.toLocaleString('en-US') } : { flagged: false }])) }
      // UI-availability checks: dropdown answer offered, docreview answer offered, journal account offered
      if (p.kind === 'dropdown') for (const x of p.rows) if (!(x.options ?? p.options ?? []).includes(x.answer)) console.log('UNOFFERED dropdown answer', t.id, x.id)
      if (p.kind === 'docreview') for (const s of p.segments) if ('id' in s && !s.options.includes(s.answer)) console.log('UNOFFERED docreview answer', t.id, s.id)
      if (p.kind === 'journal') { for (const l of p.lines) if (!p.accounts.includes(l.account)) console.log('UNOFFERED journal account', t.id, l.account); if (p.lines.length > p.maxLines) console.log('TOO FEW LINES', t.id) }
    }
    const s = scoreTbs(t, r as never)
    n++
    if (s.percent !== 1) { bad++; console.log('NOT 100%', t.id, s.earned, '/', s.possible, s.cells.filter((c) => !c.correct).map((c) => c.label + ' given=' + c.given + ' exp=' + c.expected).join(' | ')) }
  }
}
console.log(`scored ${n} TBS with a perfect UI-typed response; ${bad} below 100%`)
