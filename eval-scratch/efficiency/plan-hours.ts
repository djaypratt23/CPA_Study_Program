/**
 * Total study time the built-in planner schedules for a brand-new learner, per section.
 * Run from the repo root:  npx tsx eval-scratch/efficiency/plan-hours.ts
 */
import { loadContent } from '../../scripts/load-content.ts'
import { generatePlan } from '../../src/lib/planner.ts'

const { bundle } = loadContent()
for (const s of bundle.sections) {
  const mods = bundle.modules.filter((m) => m.section === s.id && bundle.lessons[m.id])
  const units = s.areas.flatMap((a) => a.units).map((u) => ({ id: u.id, title: u.title, tbsRemaining: Object.values(bundle.tbs).filter((t) => t.unitId === u.id && t.pool === 'practice').length }))
  const plan = generatePlan({
    today: '2026-09-23',
    examDate: '2027-06-30',
    minutesByWeekday: [120, 45, 45, 45, 45, 30, 180],
    modules: mods.map((m) => ({ id: m.id, title: m.title, unitId: m.unitId, minutes: bundle.lessons[m.id].minutes, lessonDone: false, practiceDone: false, masteryDays: 0 })),
    units,
    dueReviews: 0,
    mockTaken: false,
  })
  const lessonMin = mods.reduce((a, m) => a + bundle.lessons[m.id].minutes, 0)
  console.log(`${s.id}: new-learning work scheduled = ${(plan.status.requiredMinutes / 60).toFixed(1)} h (lesson reading ${(lessonMin / 60).toFixed(1)} h); projected finish with default 8.75 h/week = ${plan.status.projectedFinish}`)
}
