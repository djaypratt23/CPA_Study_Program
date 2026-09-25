/**
 * Content inventory for the evaluation.
 * Run from the repo root:  npx tsx eval-scratch/content/inventory.ts
 * Writes eval-scratch/content/inventory.json and prints a Markdown summary.
 */
import { writeFileSync } from 'node:fs'
import { loadContent } from '../../scripts/load-content.ts'

const { bundle } = loadContent()
const out: Record<string, unknown> = {}
const pct = (n: number, d: number) => (d ? ((100 * n) / d).toFixed(1) : '0.0')
const lines: string[] = []
const log = (s = '') => lines.push(s)

const allQ = Object.values(bundle.questions)
const allT = Object.values(bundle.tbs)

for (const s of bundle.sections) {
  const mods = bundle.modules.filter((m) => m.section === s.id)
  const modArea = new Map(mods.map((m) => [m.id, m.areaId]))
  const qs = allQ.filter((q) => modArea.has(q.moduleId))
  const tbs = allT.filter((t) => t.section === s.id)
  const cards = bundle.flashcards.filter((f) => f.section === s.id)
  log(`\n## ${s.id} — ${s.name}`)
  log(`Exam config (repo YAML): ${s.exam.testlets.map((t) => `${t.kind}:${t.count}`).join(' / ')}, ${s.exam.durationMinutes} min, weighting MCQ ${s.exam.weighting.mcq} / TBS ${s.exam.weighting.tbs}, blueprintEffective ${s.blueprintEffective}${s.taxYear ? ', taxYear ' + s.taxYear : ''}`)

  // Area distribution
  log(`\n| Area | YAML alloc | Modules | Lesson min | Practice MCQ | % of practice MCQ | Exam MCQ | % exam MCQ | Practice TBS | Exam TBS | Cards |`)
  log(`|---|---|---|---|---|---|---|---|---|---|---|`)
  const pr = qs.filter((q) => q.pool === 'practice')
  const ex = qs.filter((q) => q.pool === 'exam')
  const areaRows: unknown[] = []
  for (const a of s.areas) {
    const am = mods.filter((m) => m.areaId === a.id)
    const amIds = new Set(am.map((m) => m.id))
    const minutes = am.reduce((acc, m) => acc + (bundle.lessons[m.id]?.minutes ?? 0), 0)
    const apr = pr.filter((q) => amIds.has(q.moduleId)).length
    const aex = ex.filter((q) => amIds.has(q.moduleId)).length
    // TBS area = area of its unitId
    const unitIds = new Set(a.units.map((u) => u.id))
    const aTp = tbs.filter((t) => t.pool === 'practice' && unitIds.has(t.unitId)).length
    const aTe = tbs.filter((t) => t.pool === 'exam' && unitIds.has(t.unitId)).length
    const ac = cards.filter((c) => amIds.has(c.moduleId)).length
    log(`| ${a.title} | ${a.allocation.min}–${a.allocation.max}% | ${am.length} | ${minutes} | ${apr} | ${pct(apr, pr.length)}% | ${aex} | ${pct(aex, ex.length)}% | ${aTp} | ${aTe} | ${ac} |`)
    areaRows.push({ area: a.id, title: a.title, alloc: a.allocation, modules: am.length, minutes, practiceMcq: apr, examMcq: aex, practiceTbs: aTp, examTbs: aTe, cards: ac })
  }

  // Unit/module detail
  const moduleRows: unknown[] = []
  for (const a of s.areas)
    for (const u of a.units)
      for (const m of u.modules) {
        const mq = qs.filter((q) => q.moduleId === m.id)
        moduleRows.push({
          area: a.id,
          unit: u.id,
          module: m.id,
          title: m.title,
          lesson: !!bundle.lessons[m.id],
          minutes: bundle.lessons[m.id]?.minutes,
          practice: mq.filter((q) => q.pool === 'practice').length,
          lessonQs: mq.filter((q) => q.pool === 'lesson').length,
          exam: mq.filter((q) => q.pool === 'exam').length,
          tbs: tbs.filter((t) => t.moduleIds.includes(m.id)).map((t) => `${t.id}(${t.pool})`),
          cards: cards.filter((c) => c.moduleId === m.id).length,
          citations: bundle.lessons[m.id]?.citations.map((c) => c.source),
          taxYear: bundle.lessons[m.id]?.taxYear,
        })
      }

  // Skills
  const skillCount = (arr: { skill: string }[]) => {
    const c: Record<string, number> = {}
    for (const x of arr) c[x.skill] = (c[x.skill] ?? 0) + 1
    return c
  }
  const skP = skillCount(pr)
  const skE = skillCount(ex)
  const skT = skillCount(tbs)
  log(`\nSkill mix (YAML target: ${s.skillAllocation.map((k) => `${k.level} ${k.min}–${k.max}%`).join(', ')})`)
  log(`| Skill | Practice MCQ | Exam MCQ | TBS (all) |`)
  log(`|---|---|---|---|`)
  for (const k of ['remembering', 'application', 'analysis', 'evaluation'])
    log(`| ${k} | ${skP[k] ?? 0} (${pct(skP[k] ?? 0, pr.length)}%) | ${skE[k] ?? 0} (${pct(skE[k] ?? 0, ex.length)}%) | ${skT[k] ?? 0} (${pct(skT[k] ?? 0, tbs.length)}%) |`)

  // Answer letter distribution (position bias)
  const letters: Record<string, number> = { a: 0, b: 0, c: 0, d: 0 }
  for (const q of qs) letters[q.answer]++
  log(`\nAnswer-key letter distribution (all MCQ pools, n=${qs.length}): ${Object.entries(letters).map(([k, v]) => `${k}=${v} (${pct(v, qs.length)}%)`).join(', ')}`)

  // Longest-choice-is-correct bias
  let longestCorrect = 0
  for (const q of qs) {
    const lens = q.choices.map((c) => c.text.length)
    const max = Math.max(...lens)
    const ans = q.choices.find((c) => c.id === q.answer)!
    if (ans.text.length === max && lens.filter((l) => l === max).length === 1) longestCorrect++
  }
  log(`Correct answer is the uniquely longest choice: ${longestCorrect}/${qs.length} (${pct(longestCorrect, qs.length)}%; chance ≈ 25%)`)

  // "All of the above"/"none of the above"
  const aota = qs.filter((q) => q.choices.some((c) => /all of the above|none of the above|both .* and/i.test(c.text))).length
  log(`Items with "all/none of the above" or "both … and" choices: ${aota}`)

  // Difficulty, calc
  const diff: Record<number, number> = {}
  for (const q of pr) diff[q.difficulty] = (diff[q.difficulty] ?? 0) + 1
  log(`Practice MCQ difficulty: ${JSON.stringify(diff)}; calc=true: ${pr.filter((q) => q.calc).length}/${pr.length}`)

  // TBS part kinds
  const kinds: Record<string, number> = {}
  const kindsByTbs: Record<string, number> = {}
  for (const t of tbs) {
    const ks = new Set<string>()
    for (const p of t.parts) {
      kinds[p.kind] = (kinds[p.kind] ?? 0) + 1
      ks.add(p.kind)
    }
    for (const k of ks) kindsByTbs[k] = (kindsByTbs[k] ?? 0) + 1
  }
  log(`TBS: ${tbs.length} (practice ${tbs.filter((t) => t.pool === 'practice').length}, exam ${tbs.filter((t) => t.pool === 'exam').length}); part kinds (count of parts): ${JSON.stringify(kinds)}; TBS containing kind: ${JSON.stringify(kindsByTbs)}`)
  const scoredPts = tbs.map((t) => t.parts.reduce((n, p) => n + (p.kind === 'numeric' || p.kind === 'dropdown' ? p.rows.length : p.kind === 'docreview' ? p.segments.filter((x) => 'id' in x).length : 1), 0))
  log(`TBS scorable points per TBS (rows/segments): min ${Math.min(...scoredPts)}, median ${scoredPts.sort((a, b) => a - b)[Math.floor(scoredPts.length / 2)]}, max ${Math.max(...scoredPts)}`)

  // Exam forms
  for (const e of bundle.exams.filter((e) => e.section === s.id)) {
    log(`Exam form ${e.id}: ${e.testlets.map((t) => `${t.kind}:${t.items.length}`).join(' / ')}`)
  }

  const nr = qs.filter((q) => q.needsReview).length + tbs.filter((t) => t.needsReview).length
  log(`needsReview items: ${nr}`)
  log(`Flashcards: ${cards.length}; lesson minutes total: ${mods.reduce((acc, m) => acc + (bundle.lessons[m.id]?.minutes ?? 0), 0)}`)

  out[s.id] = { areas: areaRows, modules: moduleRows, skills: { practice: skP, exam: skE, tbs: skT }, letters, longestCorrect, total: { practice: pr.length, exam: ex.length, lesson: qs.filter((q) => q.pool === 'lesson').length, tbs: tbs.length, cards: cards.length } }
}

// Duplicate / near-duplicate stems across the whole bank
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
const byStem = new Map<string, string[]>()
for (const q of allQ) {
  const k = norm(q.stem)
  byStem.set(k, [...(byStem.get(k) ?? []), q.id])
}
const dups = [...byStem.values()].filter((v) => v.length > 1)
log(`\n## Bank-wide\nExact-duplicate stems (normalized): ${dups.length}${dups.length ? ' → ' + dups.map((d) => d.join(' = ')).join('; ') : ''}`)

// Near duplicates by Jaccard on word 3-shingles
const shingles = (s: string) => {
  const w = norm(s).split(' ')
  const set = new Set<string>()
  for (let i = 0; i + 2 < w.length; i++) set.add(w.slice(i, i + 3).join(' '))
  return set
}
const sh = allQ.map((q) => ({ id: q.id, s: shingles(q.stem) }))
const near: string[] = []
for (let i = 0; i < sh.length; i++)
  for (let j = i + 1; j < sh.length; j++) {
    const a = sh[i].s
    const b = sh[j].s
    if (a.size < 5 || b.size < 5) continue
    let inter = 0
    for (const x of a) if (b.has(x)) inter++
    const jac = inter / (a.size + b.size - inter)
    if (jac >= 0.6) near.push(`${sh[i].id} ~ ${sh[j].id} (${jac.toFixed(2)})`)
  }
log(`Near-duplicate stems (3-shingle Jaccard ≥ 0.6): ${near.length}`)
for (const n of near.slice(0, 40)) log(`  - ${n}`)
out.nearDuplicates = near

// Exam-pool items that also appear in practice (leakage) — by id and by stem
const practiceStems = new Set(allQ.filter((q) => q.pool !== 'exam').map((q) => norm(q.stem)))
const leak = allQ.filter((q) => q.pool === 'exam' && practiceStems.has(norm(q.stem))).map((q) => q.id)
log(`Exam-pool MCQs whose stem also appears in practice/lesson pools: ${leak.length} ${leak.join(', ')}`)

writeFileSync('eval-scratch/content/inventory.json', JSON.stringify(out, null, 2))
writeFileSync('eval-scratch/content/inventory.md', lines.join('\n') + '\n')
console.log(lines.join('\n'))
