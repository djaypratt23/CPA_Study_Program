/**
 * CI content gate: schema validation, cross-references, and coverage rules.
 * Usage: npm run validate
 */
import { loadContent } from './load-content.ts'

const { bundle, errors, warnings } = loadContent()

for (const s of bundle.sections) {
  const mods = bundle.modules.filter((m) => m.section === s.id)
  const lessons = mods.filter((m) => bundle.lessons[m.id]).length
  const qs = Object.values(bundle.questions).filter((q) => mods.some((m) => m.id === q.moduleId))
  const tbs = Object.values(bundle.tbs).filter((t) => t.section === s.id)
  const cards = bundle.flashcards.filter((f) => f.section === s.id)
  console.log(
    `${s.id.padEnd(4)} ${s.status.padEnd(9)} modules ${lessons}/${mods.length}  ` +
      `MCQ practice ${qs.filter((q) => q.pool === 'practice').length}, lesson ${qs.filter((q) => q.pool === 'lesson').length}, exam ${qs.filter((q) => q.pool === 'exam').length}  ` +
      `TBS ${tbs.length}  cards ${cards.length}  exams ${bundle.exams.filter((e) => e.section === s.id).length}`,
  )
}
const flagged = [
  ...Object.values(bundle.lessons).filter((l) => l.needsReview).map((l) => `lesson ${l.id}`),
  ...Object.values(bundle.questions).filter((q) => q.needsReview).map((q) => `mcq ${q.id}`),
  ...Object.values(bundle.tbs).filter((t) => t.needsReview).map((t) => `tbs ${t.id}`),
  ...bundle.flashcards.filter((f) => f.needsReview).map((f) => `card ${f.id}`),
]
console.log(`needsReview items: ${flagged.length}`)
for (const w of warnings) console.warn('warning: ' + w)
if (errors.length) {
  console.error(`\n${errors.length} content error(s):`)
  for (const e of errors) console.error(' - ' + e)
  process.exit(1)
}
console.log('Content OK')
