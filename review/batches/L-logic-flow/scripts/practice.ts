// Per-module practice design: count, difficulty spread, authored easy→hard order, skill mix, lesson-pool checks.
import { loadContent } from '../../../../scripts/load-content.ts'
const { bundle } = loadContent()
for (const s of bundle.sections) {
  const mods = bundle.modules.filter((m) => m.section === s.id)
  const lines: string[] = []
  let noEasy = 0, noHard = 0, hardHeavy = 0, ordered = 0
  for (const m of mods) {
    const qs = Object.values(bundle.questions).filter((q) => q.moduleId === m.id && q.pool === 'practice')
    const d = [1, 2, 3].map((k) => qs.filter((q) => q.difficulty === k).length)
    if (!d[0]) noEasy++
    if (!d[2]) noHard++
    if (d[2] / qs.length > 0.5) hardHeavy++
    // Spearman-ish: share of adjacent pairs (in file order) that are non-decreasing in difficulty
    let up = 0
    for (let i = 1; i < qs.length; i++) if (qs[i].difficulty >= qs[i - 1].difficulty) up++
    const mono = up / Math.max(1, qs.length - 1)
    if (mono > 0.8) ordered++
    const sk = ['remembering', 'application', 'analysis', 'evaluation'].map((k) => qs.filter((q) => q.skill === k).length)
    lines.push(`${m.id.padEnd(34)} n=${String(qs.length).padStart(2)} diff ${d.join('/').padEnd(9)} non-decreasing pairs ${(mono * 100).toFixed(0).padStart(3)}% skill R/Ap/An/Ev ${sk.join('/')}${m.optional ? ' (optional module)' : ''}`)
  }
  console.log(`\n=== ${s.id}: modules with no easy items ${noEasy}, no hard items ${noHard}, >50% hard ${hardHeavy}, authored roughly easy→hard ${ordered}/${mods.length}`)
  console.log(lines.join('\n'))
}
