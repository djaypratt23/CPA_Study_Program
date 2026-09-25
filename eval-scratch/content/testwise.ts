/**
 * How well does a content-blind strategy score? (answer-cue audit)
 * Run from the repo root:  npx tsx eval-scratch/content/testwise.ts
 * Strategies: always pick the longest choice (ties → split credit evenly); always pick the most common letter.
 */
import { loadContent } from '../../scripts/load-content.ts'

const { bundle } = loadContent()
const qsAll = Object.values(bundle.questions)

function longest(q: (typeof qsAll)[number]): number {
  const lens = q.choices.map((c) => c.text.length)
  const max = Math.max(...lens)
  const tied = q.choices.filter((c) => c.text.length === max)
  return tied.some((c) => c.id === q.answer) ? 1 / tied.length : 0
}

// Also: "pick the choice that shares the most words with the stem" and "pick the most hedged/qualified wording"
console.log('| Section | Pool | n | Longest-choice score | Best single letter | Letter score |')
console.log('|---|---|---|---|---|---|')
for (const s of bundle.sections) {
  const mods = new Set(bundle.modules.filter((m) => m.section === s.id).map((m) => m.id))
  for (const pool of ['practice', 'exam', 'lesson'] as const) {
    const qs = qsAll.filter((q) => mods.has(q.moduleId) && q.pool === pool)
    if (!qs.length) continue
    const lscore = qs.reduce((a, q) => a + longest(q), 0) / qs.length
    const counts: Record<string, number> = { a: 0, b: 0, c: 0, d: 0 }
    for (const q of qs) counts[q.answer]++
    const best = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]
    console.log(`| ${s.id} | ${pool} | ${qs.length} | ${(100 * lscore).toFixed(1)}% | ${best[0]} | ${((100 * best[1]) / qs.length).toFixed(1)}% |`)
  }
}

// Mean length ratio of the correct choice to the mean distractor length
console.log('\nMean (correct length / mean distractor length):')
for (const s of bundle.sections) {
  const mods = new Set(bundle.modules.filter((m) => m.section === s.id).map((m) => m.id))
  const qs = qsAll.filter((q) => mods.has(q.moduleId))
  const r = qs.map((q) => {
    const c = q.choices.find((x) => x.id === q.answer)!.text.length
    const d = q.choices.filter((x) => x.id !== q.answer).map((x) => x.text.length)
    return c / (d.reduce((a, b) => a + b, 0) / d.length)
  })
  console.log(`  ${s.id}: ${(r.reduce((a, b) => a + b, 0) / r.length).toFixed(2)}x (n=${qs.length})`)
}

// Examples of the most extreme AUD cues
const aud = new Set(bundle.modules.filter((m) => m.section === 'AUD').map((m) => m.id))
const ex = qsAll
  .filter((q) => aud.has(q.moduleId))
  .map((q) => {
    const c = q.choices.find((x) => x.id === q.answer)!.text.length
    const d = Math.max(...q.choices.filter((x) => x.id !== q.answer).map((x) => x.text.length))
    return { id: q.id, ratio: c / d }
  })
  .sort((a, b) => b.ratio - a.ratio)
  .slice(0, 8)
console.log('\nAUD items where the correct choice is longest relative to the longest distractor:')
for (const e of ex) console.log(`  ${e.id}: ${e.ratio.toFixed(2)}x`)
