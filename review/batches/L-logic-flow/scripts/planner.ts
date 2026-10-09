// Planner scenarios through the real computeStudyState → generatePlan path (empty or partial progress).
import { loadContent } from '../../../../scripts/load-content.ts'
import { computeStudyState } from '../../../../src/lib/studyState.ts'
import { DEFAULT_SETTINGS, type ModuleProgress, type Attempt, type Settings } from '../../../../src/db/types.ts'
import { addDays } from '../../../../src/lib/dates.ts'
const { bundle } = loadContent()
const TODAY = '2026-10-09'
const now = new Date(2026, 9, 9, 8, 0, 0)
const perDay = (hrsPerWeek: number) => { const m = Math.round((hrsPerWeek * 60) / 7); return [m, m, m, m, m, m, m] }

function run(sec: string, examDate: string | undefined, week: number[], progress: ModuleProgress[] = [], attempts: Attempt[] = []) {
  const section = bundle.sections.find((s) => s.id === sec)!
  const settings: Settings = { ...DEFAULT_SETTINGS, activeSection: section.id, examDates: examDate ? { [section.id]: examDate } : {}, minutesByWeekday: week }
  const st = computeStudyState({ content: bundle, section, settings, attempts, progress, srs: [], errors: [], quizSessions: [], tbsSessions: [], examSessions: [], now })
  return st
}
function summarize(label: string, st: ReturnType<typeof run>, sec: string) {
  const p = st.plan
  const tasks = p.days.flatMap((d) => d.tasks.map((t) => ({ ...t, date: d.date, phase: d.phase })))
  const byKind: Record<string, number> = {}
  for (const t of tasks) byKind[t.kind] = (byKind[t.kind] ?? 0) + t.minutes
  const inScope = bundle.modules.filter((m) => m.section === sec && !m.optional)
  const lessonDone = (id: string) => tasks.some((t) => t.kind === 'lesson' && t.moduleId === id)
  const mastery2 = (id: string) => tasks.filter((t) => t.kind === 'mastery' && t.moduleId === id).length
  const fs = p.status.finalReviewStart
  const lessonsInFinal = tasks.filter((t) => t.kind === 'lesson' && fs && t.date >= fs).length
  const lastLesson = tasks.filter((t) => t.kind === 'lesson').map((t) => t.date).sort().at(-1)
  const missingLesson = inScope.filter((m) => !lessonDone(m.id) && !st.modules.find((x) => x.id === m.id)?.lessonDone).length
  const lackingMastery = inScope.filter((m) => mastery2(m.id) < 2).length
  const mock = tasks.find((t) => t.kind === 'mock')
  const h = (m: number) => (m / 60).toFixed(1)
  console.log(`\n[${label}] days ${p.days.length}; status: ${p.status.message}`)
  console.log(`  required ${h(p.status.requiredMinutes)} h new-learning vs available ${h(p.status.availableMinutes)} h; onTrack=${p.status.onTrack}; finalReviewStart=${fs}; projectedFinish=${p.status.projectedFinish}`)
  console.log(`  scheduled hours by kind: ${Object.entries(byKind).map(([k, v]) => `${k} ${h(v)}`).join(', ')}`)
  console.log(`  lessons never scheduled: ${missingLesson}/${inScope.length}; modules with <2 mastery checks scheduled: ${lackingMastery}; lesson tasks inside final window: ${lessonsInFinal}; last lesson ${lastLesson}; mock ${mock ? mock.date + ' (' + mock.label.slice(0, 60) + ')' : 'NONE'}`)
  const first = p.days[0]?.tasks.slice(0, 4).map((t) => t.label).join(' | ')
  console.log(`  day 1: ${first}`)
  console.log(`  next action: ${st.next.label} — ${st.next.detail}`)
}
// Full-content hour estimate per section
for (const s of bundle.sections) {
  const mods = bundle.modules.filter((m) => m.section === s.id && !m.optional)
  const lessonMin = mods.reduce((a, m) => a + (bundle.lessons[m.id]?.minutes ?? 0), 0)
  const mcq = Object.values(bundle.questions).filter((q) => q.pool === 'practice' && !q.optional && mods.some((m) => m.id === q.moduleId)).length
  const tbs = Object.values(bundle.tbs).filter((t) => t.section === s.id && t.pool === 'practice')
  const tbsMin = tbs.reduce((a, t) => a + t.minutes, 0)
  const units = new Set(mods.map((m) => m.unitId)).size
  const planModel = lessonMin + mods.length * (15 + 20) + tbs.length * 15 + 240
  const contentHours = lessonMin + mcq * 2.5 + tbsMin * 1.5 + 3 * 240 + 3 * 120
  console.log(`${s.id}: in-scope modules ${mods.length}, units ${units}; lesson ${(lessonMin / 60).toFixed(1)} h; planner's model of the whole course (lessons + 10-MCQ set + 2 mastery checks + practice TBS@15 + 1 mock) = ${(planModel / 60).toFixed(1)} h; one pass through all content (lessons + ${mcq} MCQs@2.5 min incl. explanation + ${tbs.length} TBS @1.5x suggested ${tbsMin} min + 3 mocks + 3 mock reviews@2h) = ${(contentHours / 60).toFixed(1)} h`)
}
for (const sec of ['FAR', 'REG']) {
  for (const weeks of [4, 8, 12, 16]) for (const hrs of [5, 10, 20]) summarize(`${sec} exam in ${weeks} wk, ${hrs} h/wk`, run(sec, addDays(TODAY, weeks * 7), perDay(hrs)), sec)
}
summarize('FAR exam tomorrow, 10 h/wk', run('FAR', addDays(TODAY, 1), perDay(10)), 'FAR')
summarize('FAR exam in 4 days, 10 h/wk', run('FAR', addDays(TODAY, 4), perDay(10)), 'FAR')
summarize('FAR exam in the past', run('FAR', addDays(TODAY, -3), perDay(10)), 'FAR')
summarize('FAR no exam date', run('FAR', undefined, perDay(10)), 'FAR')
summarize('FAR default weekly pattern (8.5 h), exam 8 wk', run('FAR', addDays(TODAY, 56), DEFAULT_SETTINGS.minutesByWeekday), 'FAR')
summarize('AUD exam in 12 wk, 10 h/wk', run('AUD', addDays(TODAY, 84), perDay(10)), 'AUD')
summarize('TCP exam in 12 wk, 10 h/wk', run('TCP', addDays(TODAY, 84), perDay(10)), 'TCP')
// Partially complete: first half of FAR modules lesson-done
const farMods = bundle.modules.filter((m) => m.section === 'FAR' && !m.optional)
const half = farMods.slice(0, Math.floor(farMods.length / 2)).map((m) => ({ moduleId: m.id, section: 'FAR' as const, lessonCompletedAt: '2026-09-01T00:00:00Z' }))
summarize('FAR half the lessons done, exam 6 wk, 10 h/wk', run('FAR', addDays(TODAY, 42), perDay(10), half), 'FAR')
// Multiple sections: both FAR (6 wk) and AUD (14 wk) on 10 h/wk — each plan assumes all hours
const a = run('FAR', addDays(TODAY, 42), perDay(10)), b = run('AUD', addDays(TODAY, 98), perDay(10))
const wk1 = (st: ReturnType<typeof run>) => st.plan.days.slice(0, 7).reduce((s, d) => s + d.tasks.reduce((x, t) => x + t.minutes, 0), 0) / 60
console.log(`\n[multi-section] FAR (exam +6 wk) plan week 1 = ${wk1(a).toFixed(1)} h; AUD (exam +14 wk) plan week 1 = ${wk1(b).toFixed(1)} h; weekly budget = 10 h. Each plan is computed for the active section only and assumes the whole budget.`)
// Unit order for a new learner per section
for (const s of bundle.sections) {
  const st = run(s.id, addDays(TODAY, 84), perDay(10))
  const order: string[] = []
  for (const d of st.plan.days) for (const t of d.tasks) if (t.kind === 'lesson' && t.unitId && !order.includes(t.unitId)) order.push(t.unitId)
  const course = [...new Set(bundle.modules.filter((m) => m.section === s.id && !m.optional).map((m) => m.unitId))]
  const area = (u: string) => bundle.modules.find((m) => m.unitId === u)!.areaId
  console.log(`${s.id} new-learner unit order: ${order.map((u) => `${u}(${area(u)})`).join(' → ')}${order.join() === course.join() ? ' [= course order]' : ' [REORDERED vs course order ' + course.join(',') + ']'}`)
}
