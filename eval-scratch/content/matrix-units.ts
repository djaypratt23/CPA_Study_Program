/**
 * Per-unit roll-up of the coverage matrix (repo structure; blueprint verification BLOCKED).
 * Run from the repo root:  npx tsx eval-scratch/content/matrix-units.ts > eval-scratch/content/matrix-units.md
 */
import { loadContent } from '../../scripts/load-content.ts'

const { bundle } = loadContent()
const qs = Object.values(bundle.questions)
const tbs = Object.values(bundle.tbs)
for (const s of bundle.sections) {
  console.log(`\n#### ${s.id}\n`)
  console.log('| Area (repo alloc.) | Unit (Group/Topic) | Modules | Sample representative task (from lesson objectives) | Lesson min | Practice MCQ | Exam MCQ | TBS p/e | Cards |')
  console.log('|---|---|---|---|---|---|---|---|---|')
  for (const a of s.areas)
    for (const u of a.units) {
      const ids = new Set(u.modules.map((m) => m.id))
      const mq = qs.filter((q) => ids.has(q.moduleId))
      const task = u.modules.map((m) => bundle.lessons[m.id]?.objectives.find((o) => o.task)?.task).find(Boolean) ?? '—'
      const tp = tbs.filter((t) => t.unitId === u.id && t.pool === 'practice').length
      const te = tbs.filter((t) => t.unitId === u.id && t.pool === 'exam').length
      console.log(`| ${a.id} (${a.allocation.min}–${a.allocation.max}%) | ${u.title} | ${u.modules.length} | ${task.replace(/\|/g, '/').slice(0, 90)} | ${u.modules.reduce((n, m) => n + (bundle.lessons[m.id]?.minutes ?? 0), 0)} | ${mq.filter((q) => q.pool === 'practice').length} | ${mq.filter((q) => q.pool === 'exam').length} | ${tp}/${te} | ${bundle.flashcards.filter((c) => ids.has(c.moduleId)).length} |`)
    }
}
