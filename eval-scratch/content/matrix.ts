/**
 * Coverage matrix (repo side) per section: Area -> Unit -> module with lesson / MCQ / TBS / card counts
 * and a depth rating. Blueprint columns could not be fetched (AICPA site egress-blocked), so Area/Unit
 * names and allocation ranges here are the repo's own content/sections/*.yaml, not the AICPA PDF.
 * Run from the repo root:  npx tsx eval-scratch/content/matrix.ts > eval-scratch/content/matrix.md
 */
import { loadContent } from '../../scripts/load-content.ts'

const { bundle } = loadContent()
const qs = Object.values(bundle.questions)
const tbs = Object.values(bundle.tbs)
// Depth rating vs. commercial norms (~1,000-1,500 MCQs/section => ~30-40 practice MCQs per module-sized topic).
const rate = (p: number, t: number) => (p >= 30 && t >= 2 ? 'Full' : p >= 15 && t >= 1 ? 'Partial' : p >= 10 ? 'Thin' : 'Missing')
for (const s of bundle.sections) {
  console.log(`\n### ${s.id} coverage matrix (repo structure; blueprint verification BLOCKED)\n`)
  console.log('| Area (repo YAML alloc.) | Unit | Module | Lesson min | Objectives w/ blueprint task | Practice MCQ | Exam MCQ | TBS (practice/exam) | Cards | Depth |')
  console.log('|---|---|---|---|---|---|---|---|---|---|')
  for (const a of s.areas)
    for (const u of a.units)
      for (const m of u.modules) {
        const l = bundle.lessons[m.id]
        const mq = qs.filter((q) => q.moduleId === m.id)
        const p = mq.filter((q) => q.pool === 'practice').length
        const e = mq.filter((q) => q.pool === 'exam').length
        const tp = tbs.filter((t) => t.moduleIds.includes(m.id) && t.pool === 'practice').length
        const te = tbs.filter((t) => t.moduleIds.includes(m.id) && t.pool === 'exam').length
        const cards = bundle.flashcards.filter((c) => c.moduleId === m.id).length
        const tasks = l ? l.objectives.filter((o) => o.task).length + '/' + l.objectives.length : '—'
        console.log(`| ${a.id} (${a.allocation.min}–${a.allocation.max}%) | ${u.title} | ${m.title} | ${l?.minutes ?? 0} | ${tasks} | ${p} | ${e} | ${tp}/${te} | ${cards} | ${rate(p, tp + te)} |`)
      }
}
