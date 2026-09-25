// Probe the real content bundle for scoring hazards (read-only analysis).
import { describe, expect, it } from 'vitest'
import { loadContent } from '../../scripts/load-content'
import { cellCount } from '../../src/lib/tbsScoring'

const { bundle } = loadContent()

describe('content probe', () => {
  it('reports numeric rows where tolerance is large relative to the answer', () => {
    const risky: string[] = []
    let rows = 0
    for (const t of Object.values(bundle.tbs))
      for (const p of t.parts)
        if (p.kind === 'numeric')
          for (const r of p.rows) {
            rows++
            if (Math.abs(r.answer) > 0 && r.tolerance / Math.abs(r.answer) >= 0.01) risky.push(`${t.id}/${p.id}/${r.id}: answer ${r.answer} tol ${r.tolerance} label="${r.label.slice(0, 60)}"`)
            if (r.answer === 0 && r.tolerance >= 1) risky.push(`${t.id}/${p.id}/${r.id}: answer 0 tol ${r.tolerance}`)
            if (!Number.isInteger(r.answer)) risky.push(`${t.id}/${p.id}/${r.id}: non-integer answer ${r.answer} tol ${r.tolerance} label="${r.label.slice(0, 60)}"`)
          }
    console.log(`numeric rows: ${rows}; risky:\n` + risky.join('\n'))
  })

  it('answer letter distribution and choice-order', () => {
    const counts: Record<string, Record<string, number>> = {}
    for (const q of Object.values(bundle.questions)) {
      counts[q.pool] ??= { a: 0, b: 0, c: 0, d: 0 }
      counts[q.pool][q.answer]++
    }
    console.log('answer letters by pool', JSON.stringify(counts))
    // Is the correct answer ever the longest choice disproportionately?
    let longest = 0, n = 0
    for (const q of Object.values(bundle.questions)) {
      n++
      const lens = q.choices.map((c) => c.text.length)
      const ans = q.choices.find((c) => c.id === q.answer)!.text.length
      if (ans === Math.max(...lens)) longest++
    }
    console.log(`correct answer is (tied-)longest choice in ${longest}/${n} = ${(longest / n).toFixed(3)} (chance ~0.25)`)
    const byPool: Record<string, [number, number]> = {}
    for (const q of Object.values(bundle.questions)) {
      const lens = q.choices.map((c) => c.text.length)
      const ans = q.choices.find((c) => c.id === q.answer)!.text.length
      const strict = lens.filter((l) => l === Math.max(...lens)).length === 1 && ans === Math.max(...lens)
      byPool[q.pool] ??= [0, 0]
      byPool[q.pool][0] += strict ? 1 : 0
      byPool[q.pool][1]++
    }
    console.log('correct answer is the STRICTLY longest choice, by pool:', JSON.stringify(byPool))
  })

  it('duplicate part ids / row ids inside a TBS; duplicate expected JE accounts', () => {
    const out: string[] = []
    for (const t of Object.values(bundle.tbs)) {
      const pids = t.parts.map((p) => p.id)
      if (new Set(pids).size !== pids.length) out.push(`${t.id}: duplicate part ids ${pids}`)
      for (const p of t.parts) {
        if (p.kind === 'numeric' || p.kind === 'dropdown') {
          const ids = p.rows.map((r) => r.id)
          if (new Set(ids).size !== ids.length) out.push(`${t.id}/${p.id}: duplicate row ids`)
        }
        if (p.kind === 'journal') {
          const accts = p.lines.map((l) => l.account)
          if (new Set(accts).size !== accts.length) out.push(`${t.id}/${p.id}: expected JE repeats an account: ${accts}`)
        }
      }
    }
    console.log('dup ids:\n' + out.join('\n'))
  })

  it('exam forms: duplicate items, cross-section items, area coverage, cells per TBS', () => {
    for (const ex of bundle.exams) {
      const all = ex.testlets.flatMap((t) => t.items)
      const dups = all.filter((x, i) => all.indexOf(x) !== i)
      const sec = bundle.sections.find((s) => s.id === ex.section)!
      const areaCount: Record<string, number> = {}
      const wrongSection: string[] = []
      for (const t of ex.testlets)
        for (const id of t.items) {
          const mid = t.kind === 'mcq' ? bundle.questions[id]?.moduleId : bundle.tbs[id]?.moduleIds[0]
          const mod = bundle.modules.find((m) => m.id === mid)
          if (mod?.section !== ex.section) wrongSection.push(id)
          areaCount[mod?.areaId ?? 'other'] = (areaCount[mod?.areaId ?? 'other'] ?? 0) + 1
        }
      const cells = ex.testlets.filter((t) => t.kind === 'tbs').flatMap((t) => t.items.map((id) => `${id}:${cellCount(bundle.tbs[id])}`))
      console.log(`${ex.id}: items ${all.length}, dups ${JSON.stringify(dups)}, wrongSection ${JSON.stringify(wrongSection)}, byArea ${JSON.stringify(areaCount)}, alloc ${JSON.stringify(sec.areas.map((a) => [a.id, a.allocation]))}\n   tbs cells: ${cells.join(', ')}`)
      expect(dups).toEqual([])
    }
  })

  it('question id charset (Dexie keypath update uses items.<id>)', () => {
    const bad = Object.keys(bundle.questions).filter((id) => id.includes('.'))
    expect(bad).toEqual([])
  })
})
