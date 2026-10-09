// Mock-form analysis: structure, area and skill mix vs Blueprint, difficulty, reuse, TBS time budget.
import { loadContent } from '../../../../scripts/load-content.ts'
const { bundle } = loadContent()
const areaOf = new Map(bundle.modules.map((m) => [m.id, m.areaId]))
const p = (x: number) => (100 * x).toFixed(0)
for (const s of bundle.sections) {
  const forms = bundle.exams.filter((e) => e.section === s.id).sort((a, b) => a.id.localeCompare(b.id))
  const f1 = forms[0]
  const mcqs = (f: typeof f1) => f.testlets.filter((t) => t.kind === 'mcq').flatMap((t) => t.items)
  const tbss = (f: typeof f1) => f.testlets.filter((t) => t.kind === 'tbs').flatMap((t) => t.items)
  console.log(`\n=== ${s.id} Blueprint areas: ${s.areas.map((a) => `${a.id} ${a.allocation.min}-${a.allocation.max}`).join(', ')}; skills ${s.skillAllocation.map((a) => `${a.level.slice(0, 4)} ${a.min}-${a.max}`).join(', ')}`)
  for (const f of forms) {
    const m = mcqs(f).map((id) => bundle.questions[id])
    const t = tbss(f).map((id) => bundle.tbs[id])
    const struct = f.testlets.map((x) => `${x.items.length}${x.kind === 'mcq' ? 'M' : 'T'}`).join('/')
    const areaM = s.areas.map((a) => p(m.filter((q) => areaOf.get(q.moduleId) === a.id).length / m.length)).join('/')
    const areaT = s.areas.map((a) => t.filter((x) => areaOf.get(x.moduleIds[0]) === a.id).length).join('/')
    // combined area share: 50% MCQ share + 50% TBS share
    const areaC = s.areas.map((a) => p(0.5 * m.filter((q) => areaOf.get(q.moduleId) === a.id).length / m.length + 0.5 * t.filter((x) => areaOf.get(x.moduleIds[0]) === a.id).length / t.length)).join('/')
    const skills = ['remembering', 'application', 'analysis', 'evaluation'] as const
    const skM = skills.map((k) => m.filter((q) => q.skill === k).length)
    const skT = skills.map((k) => t.filter((x) => x.skill === k).length)
    const skC = skills.map((k, i) => p((s.exam.weighting.mcq / 100) * skM[i] / m.length + (s.exam.weighting.tbs / 100) * skT[i] / t.length))
    const diff = [1, 2, 3].map((d) => m.filter((q) => q.difficulty === d).length).join('/')
    const shared = f === f1 ? '-' : `${mcqs(f).filter((id) => mcqs(f1).includes(id)).length}/${m.length}`
    const tbsMin = t.reduce((a, x) => a + x.minutes, 0)
    const keys = ['a', 'b', 'c', 'd'].map((l) => m.filter((q) => q.answer === l).length).join('/')
    const remaining = s.exam.durationMinutes - m.length * 1.5
    console.log(`${f.id}: ${struct} | MCQ area% ${areaM} | TBS by area ${areaT} | combined area% ${areaC} | skill MCQ R/Ap/An/Ev ${skM.join('/')} TBS ${skT.join('/')} => weighted% ${skC.join('/')} | diff1/2/3 ${diff} | shared w/ form1 ${shared} | TBS suggested min ${tbsMin} vs ${remaining} left after MCQs@90s | keys ${keys}`)
  }
  // practice items vs exam items: any exam item id also a practice id? (pool unique by id, so check stems)
  const exStems = new Set(forms.flatMap((f) => mcqs(f)).map((id) => bundle.questions[id].stem.trim().slice(0, 80)))
  const dupStem = Object.values(bundle.questions).filter((q) => q.pool !== 'exam' && exStems.has(q.stem.trim().slice(0, 80)))
  console.log(`exam stems also in practice/lesson pool: ${dupStem.length} ${dupStem.slice(0, 5).map((q) => q.id).join(',')}`)
  // unique exam MCQs across forms, unused exam-pool items
  const used = new Set(forms.flatMap((f) => mcqs(f)))
  const poolEx = Object.values(bundle.questions).filter((q) => q.pool === 'exam' && bundle.modules.find((mm) => mm.id === q.moduleId)?.section === s.id)
  console.log(`exam-pool MCQs ${poolEx.length}, used on forms ${used.size}, unused ${poolEx.filter((q) => !used.has(q.id)).map((q) => q.id).join(',')}`)
  const usedT = new Set(forms.flatMap((f) => tbss(f)))
  const poolT = Object.values(bundle.tbs).filter((t) => t.pool === 'exam' && t.section === s.id)
  console.log(`exam-pool TBS ${poolT.length}, used ${usedT.size}, unused ${poolT.filter((t) => !usedT.has(t.id)).map((t) => t.id).join(',')}`)
  // module coverage of forms
  const inScope = bundle.modules.filter((mm) => mm.section === s.id && !mm.optional)
  for (const f of forms) {
    const covered = new Set([...mcqs(f).map((id) => bundle.questions[id].moduleId), ...tbss(f).flatMap((id) => bundle.tbs[id].moduleIds)])
    const missing = inScope.filter((mm) => !covered.has(mm.id)).map((mm) => mm.id)
    console.log(`  ${f.id} untested in-scope modules (${missing.length}/${inScope.length}): ${missing.join(', ')}`)
  }
}
