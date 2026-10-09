// Simulated learners following the app's own plan (FAR, 10 h/week, exam in 12 weeks), driven through the real
// computeStudyState / buildQuiz / buildMasteryCheck / buildDiagnostic / scoreExam code. Reports what readiness and
// mastery show them week by week. Accuracy is fixed per profile once a module's lesson is done (0.30 before; the
// random guesser is 0.25 throughout). Review-queue work is skipped (it never feeds readiness or mastery).
import { loadContent } from '../../../../scripts/load-content.ts'
import { computeStudyState } from '../../../../src/lib/studyState.ts'
import { buildDiagnostic, buildMasteryCheck, buildQuiz, historyByItem } from '../../../../src/lib/quiz.ts'
import { scoreExam } from '../../../../src/lib/examScoring.ts'
import { mulberry32 } from '../../../../src/lib/random.ts'
import { addDays, dayKey, parseDay } from '../../../../src/lib/dates.ts'
import { DEFAULT_SETTINGS, type Attempt, type ExamSession, type ModuleProgress, type TbsSession } from '../../../../src/db/types.ts'
import type { Confidence } from '../../../../src/lib/srs.ts'
const { bundle } = loadContent()
const SEC = process.argv[2] ?? 'FAR'
const WEEKS = Number(process.argv[3] ?? 12)
const HRS = Number(process.argv[4] ?? 10)
const DIAG = process.argv[5] !== 'nodiag'
const section = bundle.sections.find((s) => s.id === SEC)!
const pool = Object.values(bundle.questions).filter((q) => q.pool === 'practice' && !q.optional && !bundle.modules.find((m) => m.id === q.moduleId)?.optional && bundle.modules.find((m) => m.id === q.moduleId)?.section === SEC)
type Profile = { name: string; p: number; pre: number; conf: (correct: boolean, r: () => number) => Confidence; diag: boolean }
const pick = (r: () => number, w: [Confidence, number][]): Confidence => { let x = r(); for (const [c, p] of w) { if ((x -= p) < 0) return c } return w[w.length - 1][0] }
const profiles: Profile[] = [
  { name: 'random guesser, honest ("Guess")', p: 0.25, pre: 0.25, conf: () => 'guess', diag: true },
  { name: 'random guesser, overconfident ("Confident")', p: 0.25, pre: 0.25, conf: () => 'confident', diag: true },
  { name: '60% learner', p: 0.6, pre: 0.3, conf: (c, r) => (c ? pick(r, [['confident', 0.6], ['unsure', 0.3], ['guess', 0.1]]) : pick(r, [['confident', 0.3], ['unsure', 0.4], ['guess', 0.3]])), diag: true },
  { name: '85% learner', p: 0.85, pre: 0.3, conf: (c, r) => (c ? pick(r, [['confident', 0.85], ['unsure', 0.12], ['guess', 0.03]]) : pick(r, [['confident', 0.3], ['unsure', 0.5], ['guess', 0.2]])), diag: true },
]
const START = '2026-10-12' // a Monday
const examDate = addDays(START, WEEKS * 7)
for (const prof of profiles) {
  const r = mulberry32(42)
  const attempts: Attempt[] = []
  const progress = new Map<string, ModuleProgress>()
  const lessonMin = new Map<string, number>()
  const tbsSessions: TbsSession[] = []
  const examSessions: ExamSession[] = []
  let seq = 0
  const answer = (qid: string, day: string, mode: Attempt['mode'], mixed: boolean, sessionId: string) => {
    const q = bundle.questions[qid]
    const studied = !!progress.get(q.moduleId)?.lessonCompletedAt
    const correct = r() < (studied ? prof.p : prof.pre)
    const conf = prof.conf(correct, r)
    attempts.push({ itemId: qid, itemType: 'mcq', moduleId: q.moduleId, section: SEC as never, correct, score: correct ? 1 : 0, confidence: mode === 'test' && r() < 0.5 ? undefined : conf, choice: correct ? q.answer : 'x', timeMs: 90000, mode, mixed, sessionId, at: `${day}T${String(8 + Math.floor(seq / 3600) % 12).padStart(2, '0')}:${String(Math.floor(seq / 60) % 60).padStart(2, '0')}:${String(seq++ % 60).padStart(2, '0')}.000Z`, day })
  }
  const settings = { ...DEFAULT_SETTINGS, activeSection: SEC as never, examDates: { [SEC]: examDate }, minutesByWeekday: Array(7).fill(Math.round((HRS * 60) / 7)) }
  const state = (day: string) => computeStudyState({ content: bundle, section, settings, attempts, progress: [...progress.values()], srs: [], errors: [], quizSessions: [], tbsSessions, examSessions, now: new Date(parseDay(day).getTime() + 7 * 3600_000) })
  const rows: string[] = []
  const snap = (label: string, day: string) => {
    const st = state(day)
    const rd = st.readiness
    const mastered = st.modules.filter((m) => !m.optional && m.mastery.status === 'mastered').length
    const inScope = st.modules.filter((m) => !m.optional).length
    rows.push(`${label.padEnd(16)} lessons ${String(Math.round(st.lessonsPct * 100)).padStart(3)}% | mastered ${String(mastered).padStart(2)}/${inScope} | readiness ${rd.overall === null ? '  —' : String(rd.overall).padStart(3)} ${rd.band ? `[${rd.band[0]}–${rd.band[1]}]` : '       '} "${rd.label}" | areas ${rd.areas.map((a) => (a.estimate === null ? '—' : Math.round(a.estimate * 100))).join('/')} | first-attempt n ${rd.areas.reduce((s, a) => s + a.n, 0)}`)
  }
  snap('start', START)
  if (prof.diag && DIAG) {
    const areas = section.areas.map((a) => ({ id: a.id, weight: (a.allocation.min + a.allocation.max) / 2, moduleIds: a.units.flatMap((u) => u.modules.map((m) => m.id)).filter((id) => !bundle.modules.find((m) => m.id === id)?.optional) }))
    for (const q of buildDiagnostic(pool, areas, historyByItem(attempts), 40, 7)) answer(q.id, START, 'test', true, 'diag')
    snap('after diagnostic', START)
  }
  let mockDone = false
  for (let day = START; day < examDate; day = addDays(day, 1)) {
    const st = state(day)
    const mtasks = (st.plan.days[0]?.tasks ?? []).filter((t) => t.kind === 'mastery').length
    const dI = Math.round((parseDay(day).getTime() - parseDay(START).getTime()) / 86400000)
    if (dI === 27 || dI === 55) rows.push(`  day ${dI + 1} plan: ${mtasks} mastery checks, ${(st.plan.days[0]?.tasks ?? []).filter((t) => t.kind === 'lesson').length} lesson tasks; capacity ${st.plan.days[0]?.capacity} min; status: ${st.plan.status.message.slice(0, 90)}`)
    const studied = new Set([...progress.values()].filter((p) => p.lessonCompletedAt).map((p) => p.moduleId))
    for (const t of st.plan.days[0]?.tasks ?? []) {
      const hist = historyByItem(attempts)
      if (t.kind === 'lesson' && t.moduleId) {
        const m = (lessonMin.get(t.moduleId) ?? 0) + t.minutes
        lessonMin.set(t.moduleId, m)
        if (m >= (bundle.lessons[t.moduleId]?.minutes ?? 15)) { progress.set(t.moduleId, { moduleId: t.moduleId, section: SEC as never, lessonCompletedAt: `${day}T09:00:00.000Z` }); studied.add(t.moduleId) }
      } else if (t.kind === 'practice' && t.moduleId) {
        if (!progress.get(t.moduleId)?.lessonCompletedAt) { progress.set(t.moduleId, { moduleId: t.moduleId, section: SEC as never, lessonCompletedAt: `${day}T09:00:00.000Z` }); studied.add(t.moduleId) }
        if (t.continued) continue
        const sid = `p${seq}`
        for (const q of buildQuiz(pool, { moduleIds: [t.moduleId], status: 'all', count: 10, seed: seq }, hist, new Map())) answer(q.id, day, 'tutor', false, sid)
      } else if (t.kind === 'mastery' && t.moduleId) {
        const sid = `m${seq}`
        for (const q of buildMasteryCheck(pool, t.moduleId, [...studied], hist, seq)) answer(q.id, day, 'tutor', true, sid)
      } else if (t.kind === 'mixed' || (t.kind === 'final' && t.label.startsWith('Final review notes'))) {
        if (t.kind === 'final') continue
        let n = Math.floor(t.minutes / 1.5)
        while (n > 0) {
          const sid = `x${seq}`
          const set = buildQuiz(pool, { moduleIds: studied.size ? [...studied] : pool.map((q) => q.moduleId), status: 'all', count: Math.min(20, n), seed: seq }, hist, new Map())
          for (const q of set) answer(q.id, day, 'tutor', true, sid)
          n -= Math.max(1, set.length)
        }
      } else if (t.kind === 'tbs' && t.unitId) {
        const todo = Object.values(bundle.tbs).filter((x) => x.unitId === t.unitId && x.pool === 'practice' && !tbsSessions.some((s) => s.id === x.id)).slice(0, Math.max(1, Math.round(t.minutes / 15)))
        for (const x of todo) {
          const score = Math.max(0, Math.min(1, prof.p * 0.85 + (r() - 0.5) * 0.2))
          tbsSessions.push({ id: x.id, responses: {}, startedAt: day, elapsedMs: 0, submittedAt: `${day}T10:00:00.000Z`, score })
          attempts.push({ itemId: x.id, itemType: 'tbs', moduleId: x.moduleIds[0], section: SEC as never, correct: score >= 0.75, score, timeMs: 900000, mode: 'tutor', mixed: true, sessionId: `t${seq++}`, at: `${day}T10:00:${String(seq % 60).padStart(2, '0')}.000Z`, day })
        }
      } else if (t.kind === 'mock' && !mockDone) {
        const form = bundle.exams.find((e) => e.section === SEC)!
        const testlets = form.testlets.map((tl) => ({ kind: tl.kind, items: tl.items, submitted: true, flags: {}, index: 0, tbsResponses: {}, mcqAnswers: Object.fromEntries(tl.kind === 'mcq' ? tl.items.map((id) => [id, r() < prof.p ? bundle.questions[id].answer : 'x']) : []) }))
        const res = scoreExam(testlets as never, section, bundle)
        // TBS responses are blank in this simulation; substitute the profile's TBS level for the TBS half.
        const tbsPct = prof.p * 0.85
        const w = (res.mcqPercent + tbsPct) / 2
        examSessions.push({ id: 'mock', examId: form.id, section: SEC as never, startedAt: day, remainingMs: 0, testletIndex: 4, onBreak: false, breakUsed: true, testlets: testlets as never, finishedAt: `${day}T18:00:00.000Z`, result: { ...res, tbsPercent: tbsPct, weightedPercent: w, approxScaled: 0 } })
        mockDone = true
        rows.push(`  mock on ${day}: MCQ ${Math.round(res.mcqPercent * 100)}%, weighted ${Math.round(w * 100)}%`)
      }
    }
    const dIdx = Math.round((parseDay(day).getTime() - parseDay(START).getTime()) / 86400000)
    if ((dIdx + 1) % 7 === 0) snap(`end of week ${(dIdx + 1) / 7}`, day)
  }
  console.log(`\n### ${SEC} — ${DIAG ? 'with' : 'no'} diagnostic — ${prof.name} (p=${prof.p}), ${HRS} h/wk, exam ${examDate}`)
  for (const row of rows) console.log(row)
}
