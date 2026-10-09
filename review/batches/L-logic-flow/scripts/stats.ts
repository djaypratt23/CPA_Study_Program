// Platform-level content statistics: module counts, lesson minutes, practice MCQ counts,
// difficulty spread/progression, skill mix vs Blueprint, key-letter balance, TBS counts.
import { loadContent } from '../../../../scripts/load-content.ts'
const { bundle, errors, warnings } = loadContent()
console.log('errors', errors.length, 'warnings', warnings.length)
for (const w of warnings) console.log('  WARN', w)
const pctf = (x: number) => (100 * x).toFixed(1) + '%'
for (const s of bundle.sections) {
  const mods = bundle.modules.filter((m) => m.section === s.id)
  const inScope = mods.filter((m) => !m.optional)
  const qs = Object.values(bundle.questions).filter((q) => mods.some((m) => m.id === q.moduleId))
  const practice = qs.filter((q) => q.pool === 'practice')
  const lessonQ = qs.filter((q) => q.pool === 'lesson')
  const exam = qs.filter((q) => q.pool === 'exam')
  const tbs = Object.values(bundle.tbs).filter((t) => t.section === s.id)
  const minutes = mods.map((m) => bundle.lessons[m.id]?.minutes ?? 0)
  const inMin = inScope.map((m) => bundle.lessons[m.id]?.minutes ?? 0)
  console.log(`\n=== ${s.id}: ${mods.length} modules (${inScope.length} in scope), lessons ${Object.keys(bundle.lessons).filter((id) => mods.some((m) => m.id === id)).length}`)
  console.log(`lesson minutes total ${minutes.reduce((a, b) => a + b, 0)} (in-scope ${inMin.reduce((a, b) => a + b, 0)}); min ${Math.min(...minutes)} max ${Math.max(...minutes)} mean ${(minutes.reduce((a, b) => a + b, 0) / minutes.length).toFixed(1)}`)
  console.log(`MCQ: practice ${practice.length} (optional ${practice.filter((q) => q.optional).length}), lesson ${lessonQ.length}, exam ${exam.length}; TBS practice ${tbs.filter((t) => t.pool === 'practice').length}, exam ${tbs.filter((t) => t.pool === 'exam').length}; flashcards ${bundle.flashcards.filter((f) => f.section === s.id).length}`)
  // practice counts per module
  const counts = mods.map((m) => practice.filter((q) => q.moduleId === m.id).length)
  console.log(`practice MCQs/module: min ${Math.min(...counts)} max ${Math.max(...counts)} mean ${(counts.reduce((a, b) => a + b, 0) / counts.length).toFixed(1)}`)
  // difficulty
  const diff = [1, 2, 3].map((d) => practice.filter((q) => q.difficulty === d).length)
  console.log(`practice difficulty 1/2/3: ${diff.join('/')} (${diff.map((d) => pctf(d / practice.length)).join(' / ')})`)
  const ediff = [1, 2, 3].map((d) => exam.filter((q) => q.difficulty === d).length)
  console.log(`exam difficulty 1/2/3: ${ediff.join('/')}`)
  // skill mix
  for (const [label, list] of [['practice MCQ', practice], ['exam MCQ', exam], ['lesson MCQ', lessonQ]] as const) {
    const n = list.length
    const parts = s.skillAllocation.map((a) => `${a.level} ${pctf(list.filter((q) => q.skill === a.level).length / n)} [${a.min}-${a.max}]`)
    const other = list.filter((q) => !s.skillAllocation.some((a) => a.level === q.skill))
    console.log(`skill ${label} (n=${n}): ${parts.join('; ')}${other.length ? `; OFF-BLUEPRINT LEVEL ${[...new Set(other.map((q) => q.skill))].join(',')} n=${other.length}` : ''}`)
  }
  const tb = tbs
  console.log(`skill TBS (n=${tb.length}): ${s.skillAllocation.map((a) => `${a.level} ${tb.filter((t) => t.skill === a.level).length}`).join('; ')}`)
  // key letters
  for (const [label, list] of [['practice', practice], ['exam', exam], ['lesson', lessonQ]] as const) {
    const k = ['a', 'b', 'c', 'd'].map((l) => list.filter((q) => q.answer === l).length)
    console.log(`keys ${label}: ${k.join('/')}`)
  }
  // calc share
  console.log(`calc share practice ${pctf(practice.filter((q) => q.calc).length / practice.length)}`)
}
