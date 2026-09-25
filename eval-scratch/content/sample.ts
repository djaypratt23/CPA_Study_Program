/**
 * Stratified random sample for the accuracy audit (seeded, reproducible).
 * Run from the repo root:  npx tsx eval-scratch/content/sample.ts [seed]
 * Per section: 25 MCQs stratified by blueprint Area (proportional to the Area's share of the section's
 * practice+exam MCQs, at least 2 per Area) and by pool, plus 1 TBS per Area (practice or exam, random).
 * Writes eval-scratch/content/sample-<sec>.json (full item content) and sample-ids.md.
 */
import { writeFileSync } from 'node:fs'
import { loadContent } from '../../scripts/load-content.ts'
import { mulberry32, shuffle } from '../../src/lib/random.ts'

const seed = Number(process.argv[2] ?? 20260923)
const rand = mulberry32(seed)
const { bundle } = loadContent()
const allQ = Object.values(bundle.questions).filter((q) => q.pool !== 'lesson')
const allT = Object.values(bundle.tbs)
const md: string[] = [`# Accuracy-audit sample (seed ${seed})\n`]

for (const s of bundle.sections) {
  const mods = bundle.modules.filter((m) => m.section === s.id)
  const areaOf = new Map(mods.map((m) => [m.id, m.areaId]))
  const qs = allQ.filter((q) => areaOf.has(q.moduleId))
  const N = 25
  // proportional allocation with a floor of 2
  const alloc = s.areas.map((a) => ({ a, n: Math.max(2, Math.round((N * qs.filter((q) => areaOf.get(q.moduleId) === a.id).length) / qs.length)) }))
  let total = alloc.reduce((x, y) => x + y.n, 0)
  while (total > N) {
    const big = alloc.sort((x, y) => y.n - x.n)[0]
    big.n--
    total--
  }
  while (total < N) {
    alloc.sort((x, y) => x.n - y.n)[0].n++
    total++
  }
  const picked: typeof qs = []
  for (const { a, n } of alloc) {
    const inArea = qs.filter((q) => areaOf.get(q.moduleId) === a.id)
    // stratify by pool within area: take exam items in proportion
    const ex = shuffle(inArea.filter((q) => q.pool === 'exam'), rand)
    const pr = shuffle(inArea.filter((q) => q.pool === 'practice'), rand)
    const nEx = Math.round((n * ex.length) / inArea.length)
    picked.push(...ex.slice(0, nEx), ...pr.slice(0, n - nEx))
  }
  const tbsPicked = s.areas
    .map((a) => {
      const units = new Set(a.units.map((u) => u.id))
      const pool = allT.filter((t) => t.section === s.id && units.has(t.unitId))
      return shuffle(pool, rand)[0]
    })
    .filter(Boolean)

  const items = picked.map((q) => ({
    ...q,
    area: areaOf.get(q.moduleId),
    lessonCitations: bundle.lessons[q.moduleId]?.citations,
    taxYear: bundle.lessons[q.moduleId]?.taxYear,
  }))
  writeFileSync(`eval-scratch/content/sample-${s.id.toLowerCase()}.json`, JSON.stringify({ section: s.id, seed, mcqs: items, tbs: tbsPicked }, null, 2))
  md.push(`## ${s.id}: ${items.length} MCQs + ${tbsPicked.length} TBS`)
  md.push('MCQs: ' + items.map((q) => `${q.id} (${q.area}, ${q.pool})`).join(', '))
  md.push('TBS: ' + tbsPicked.map((t) => `${t.id} (${t.pool})`).join(', ') + '\n')
}
writeFileSync('eval-scratch/content/sample-ids.md', md.join('\n') + '\n')
console.log(md.join('\n'))
