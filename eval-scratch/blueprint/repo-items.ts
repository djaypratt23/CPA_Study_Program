/**
 * Compact per-section export of repo content for Blueprint mapping: modules (with lesson objectives and
 * the repo's own blueprint-task paraphrases), every practice/exam MCQ (id, pool, skill, stem), and every TBS
 * (id, pool, unit, modules, skill, title, part kinds and row labels).
 * Run from the repo root:  npx tsx eval-scratch/blueprint/repo-items.ts
 */
import { writeFileSync } from 'node:fs'
import { loadContent } from '../../scripts/load-content.ts'

const { bundle } = loadContent()
for (const s of bundle.sections) {
  const mods = bundle.modules.filter((m) => m.section === s.id)
  const out = {
    section: s.id,
    modules: mods.map((m) => {
      const l = bundle.lessons[m.id]
      const heads = (l?.body.match(/^#{2,3} .+$/gm) ?? []).map((h) => h.replace(/^#+ /, ''))
      return {
        id: m.id, title: m.title, area: m.areaId, unit: m.unitId, minutes: l?.minutes,
        objectives: l?.objectives.map((o) => ({ skill: o.skill, text: o.text, task: o.task })),
        headings: heads,
      }
    }),
    mcqs: Object.values(bundle.questions)
      .filter((q) => q.pool !== 'lesson' && mods.some((m) => m.id === q.moduleId))
      .map((q) => ({ id: q.id, module: q.moduleId, pool: q.pool, skill: q.skill, stem: q.stem.replace(/\s+/g, ' ').slice(0, 220) })),
    tbs: Object.values(bundle.tbs)
      .filter((t) => t.section === s.id)
      .map((t) => ({
        id: t.id, pool: t.pool, unit: t.unitId, modules: t.moduleIds, skill: t.skill, title: t.title,
        parts: t.parts.map((p) => ({ kind: p.kind, prompt: p.prompt.slice(0, 120), rows: 'rows' in p ? p.rows.map((r) => r.label.slice(0, 80)) : undefined })),
      })),
  }
  writeFileSync(`eval-scratch/blueprint/repo-items-${s.id}.json`, JSON.stringify(out, null, 1))
  console.log(s.id, out.modules.length, 'modules', out.mcqs.length, 'MCQs', out.tbs.length, 'TBS')
}
