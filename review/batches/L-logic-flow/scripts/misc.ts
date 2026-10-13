import { loadContent } from '../../../../scripts/load-content.ts'
const { bundle } = loadContent()
// exam-form items whose stem matches a non-exam item
const formItems = new Set(bundle.exams.flatMap((e) => e.testlets.filter((t) => t.kind === 'mcq').flatMap((t) => t.items)))
const norm = (s: string) => s.replace(/\s+/g, ' ').trim().toLowerCase()
const byStem = new Map<string, string[]>()
for (const q of Object.values(bundle.questions)) { const k = norm(q.stem).slice(0, 120); byStem.set(k, [...(byStem.get(k) ?? []), q.id]) }
for (const ids of byStem.values()) if (ids.length > 1 && ids.some((i) => formItems.has(i))) console.log('duplicate stem:', ids.map((i) => `${i}(${bundle.questions[i].pool}${formItems.has(i) ? ',on form' : ''})`).join(' = '), '| same key:', new Set(ids.map((i) => bundle.questions[i].answer)).size === 1)
// TBS skill levels outside section allocation
for (const t of Object.values(bundle.tbs)) {
  const s = bundle.sections.find((x) => x.id === t.section)!
  if (!s.skillAllocation.some((a) => a.level === t.skill)) console.log('TBS skill not in Blueprint allocation:', t.id, t.skill, t.pool)
}
for (const q of Object.values(bundle.questions)) {
  const s = bundle.sections.find((x) => x.id === bundle.modules.find((m) => m.id === q.moduleId)?.section)!
  if (!s.skillAllocation.some((a) => a.level === q.skill)) console.log('MCQ skill not in allocation:', q.id, q.skill)
}
// TBS size: scored cells per TBS, exam vs practice
const cells = (t: (typeof bundle.tbs)[string]) => t.parts.reduce((s, p) => s + (p.kind === 'numeric' || p.kind === 'dropdown' || p.kind === 'review' ? p.rows.length : p.kind === 'docreview' ? p.segments.filter((x) => 'id' in x).length : p.kind === 'journal' ? p.lines.length : 1), 0)
for (const s of bundle.sections) {
  const ts = Object.values(bundle.tbs).filter((t) => t.section === s.id)
  for (const pool of ['practice', 'exam'] as const) {
    const l = ts.filter((t) => t.pool === pool)
    const c = l.map(cells), m = l.map((t) => t.minutes)
    console.log(`${s.id} ${pool} TBS: n=${l.length}, scored cells mean ${(c.reduce((a, b) => a + b, 0) / l.length).toFixed(1)} (min ${Math.min(...c)}, max ${Math.max(...c)}), minutes mean ${(m.reduce((a, b) => a + b, 0) / l.length).toFixed(1)} (min ${Math.min(...m)}, max ${Math.max(...m)}), min/cell ${(m.reduce((a, b) => a + b, 0) / c.reduce((a, b) => a + b, 0)).toFixed(2)}`)
  }
}
// Review docs
for (const d of bundle.reviewDocs) console.log(`review doc ${d.section} ${d.id} kind=${d.kind} words=${d.body.split(/\s+/).length} headings=${(d.body.match(/^#{1,3} /gm) ?? []).length}`)
