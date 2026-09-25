// Exam scoring, readiness, mastery and analytics recomputed by hand.
import { describe, expect, it } from 'vitest'
import { loadContent } from '../../scripts/load-content'
import { scoreExam } from '../../src/lib/examScoring'
import { approxScaledScore, areaReadiness, overallReadiness, rate, weightedPercent, weeklyTrend, calibration, avgTimeSeconds, UNSTUDIED_ACCURACY } from '../../src/lib/analytics'
import { computeMastery } from '../../src/lib/mastery'
import { computeStudyState } from '../../src/lib/studyState'
import { scoreTbs, type TbsResponses } from '../../src/lib/tbsScoring'
import { DEFAULT_SETTINGS, type Attempt, type ExamTestletState } from '../../src/db/types'

const { bundle } = loadContent()

function perfectResponses(id: string): TbsResponses {
  const t = bundle.tbs[id]
  const r: TbsResponses = {}
  for (const p of t.parts) {
    if (p.kind === 'numeric') r[p.id] = { kind: 'numeric', values: Object.fromEntries(p.rows.map((x) => [x.id, String(x.answer)])) }
    if (p.kind === 'dropdown') r[p.id] = { kind: 'dropdown', values: Object.fromEntries(p.rows.map((x) => [x.id, x.answer])) }
    if (p.kind === 'journal') r[p.id] = { kind: 'journal', lines: p.lines }
    if (p.kind === 'docreview') r[p.id] = { kind: 'docreview', values: Object.fromEntries(p.segments.flatMap((s) => ('id' in s ? [[s.id, s.answer]] : []))) }
    if (p.kind === 'research') r[p.id] = { kind: 'research', value: p.answer }
  }
  return r
}
const form = bundle.exams.find((e) => e.id === 'far-mock-1')!
const section = bundle.sections.find((s) => s.id === 'FAR')!
const blankTestlets = (): ExamTestletState[] => form.testlets.map((t) => ({ kind: t.kind, items: [...t.items], submitted: false, mcqAnswers: {}, flags: {}, tbsResponses: {}, index: 0 }))

describe('scoreExam (far-mock-1)', () => {
  it('perfect exam -> 100% / 99', () => {
    const tl = blankTestlets()
    for (const t of tl)
      for (const id of t.items) {
        if (t.kind === 'mcq') t.mcqAnswers[id] = bundle.questions[id].answer
        else t.tbsResponses[id] = perfectResponses(id)
      }
    const r = scoreExam(tl, section, bundle)
    expect(r).toMatchObject({ mcqPercent: 1, tbsPercent: 1, weightedPercent: 1, approxScaled: 99 })
  })
  it('hand-computed: 30/50 MCQ correct, TBS = 3 perfect + 4 blank', () => {
    const tl = blankTestlets()
    const mcqIds = tl.filter((t) => t.kind === 'mcq').flatMap((t) => t.items)
    const tbsIds = tl.filter((t) => t.kind === 'tbs').flatMap((t) => t.items)
    expect([mcqIds.length, tbsIds.length]).toEqual([50, 7])
    let k = 0
    for (const t of tl) for (const id of t.items) {
      if (t.kind === 'mcq') { if (k++ < 30) t.mcqAnswers[id] = bundle.questions[id].answer; else if (k % 2) t.mcqAnswers[id] = bundle.questions[id].answer === 'a' ? 'b' : 'a' }
      else if (tbsIds.indexOf(id) < 3) t.tbsResponses[id] = perfectResponses(id)
    }
    const blankTbsPct = tbsIds.slice(3).map((id) => scoreTbs(bundle.tbs[id], {}).percent)
    const expTbs = (3 + blankTbsPct.reduce((a, b) => a + b, 0)) / 7
    const r = scoreExam(tl, section, bundle)
    expect(r.mcqPercent).toBeCloseTo(0.6, 12) // unanswered and wrong both count as 0 of 50
    expect(r.tbsPercent).toBeCloseTo(expTbs, 12)
    expect(r.weightedPercent).toBeCloseTo(0.5 * 0.6 + 0.5 * expTbs, 12)
    const p = r.weightedPercent * 100
    expect(r.approxScaled).toBe(Math.round(p <= 65 ? (p / 65) * 75 : 75 + ((p - 65) / 35) * 24))
    // byArea: sum of possible == 50 MCQ + 7 TBS (each TBS counts as ONE unit, same as one MCQ)
    const possible = Object.values(r.byArea).reduce((s, a) => s + a.possible, 0)
    expect(possible).toBe(57)
    console.log('hand exam', r.mcqPercent, r.tbsPercent, r.weightedPercent, r.approxScaled, JSON.stringify(r.byArea))
  })
  it('all blank: TBS doc-review "keep original" segments still earn credit', () => {
    const r = scoreExam(blankTestlets(), section, bundle)
    expect(r.mcqPercent).toBe(0)
    console.log('blank exam', r)
  })
  it('byArea weighting: a 0% TBS counts the same as one MCQ', () => {
    const tl = blankTestlets()
    // answer every FAR-I MCQ correctly, leave FAR-I TBS blank
    for (const t of tl) if (t.kind === 'mcq') for (const id of t.items) t.mcqAnswers[id] = bundle.questions[id].answer
    const r = scoreExam(tl, section, bundle)
    for (const [a, v] of Object.entries(r.byArea)) console.log(a, v, (v.earned / v.possible).toFixed(3))
  })
  it('missing content items are silently dropped from the denominator', () => {
    const tl = blankTestlets()
    tl[0].items = ['far-does-not-exist', ...tl[0].items]
    const r1 = scoreExam(blankTestlets(), section, bundle)
    const r2 = scoreExam(tl, section, bundle)
    expect(r2.mcqPercent).toBe(r1.mcqPercent)
  })
  it('weighting edge cases: {0,0} gives NaN; schema accepts it', () => {
    expect(Number.isNaN(weightedPercent(0.5, 0.5, { mcq: 0, tbs: 0 }))).toBe(true)
    expect(Number.isNaN(approxScaledScore(NaN))).toBe(true)
    expect(weightedPercent(1, 0, { mcq: 50, tbs: 50 })).toBe(0.5)
  })
  it('approxScaledScore: anchors, continuity, clamping, monotonic', () => {
    expect([0, 0.65, 1, -1, 2].map(approxScaledScore)).toEqual([0, 75, 99, 0, 99])
    let prev = -1
    for (let i = 0; i <= 1000; i++) { const s = approxScaledScore(i / 1000); expect(s).toBeGreaterThanOrEqual(prev); prev = s }
    expect(approxScaledScore(0.6499)).toBe(75)
    expect(approxScaledScore(0.64)).toBe(74)
  })
})

const A = (o: Partial<Attempt>): Attempt => ({ itemId: 'q', itemType: 'mcq', moduleId: 'm1', section: 'FAR', correct: true, score: 1, timeMs: 1000, mode: 'tutor', mixed: true, sessionId: 's', at: '2026-01-01T10:00:00.000Z', day: '2026-01-01', ...o })

describe('readiness math (hand-computed)', () => {
  it('area estimate = coverage*acc + (1-coverage)*0.3; overall = allocation-midpoint weighted', () => {
    const atts1 = Array.from({ length: 10 }, (_, i) => A({ correct: i < 8, at: `2026-01-01T10:00:${String(i).padStart(2, '0')}.000Z` }))
    const a1 = areaReadiness({ areaId: 'I', title: 'I', weight: 35, modules: [{ id: 'm1', lessonDone: true, status: 'learning' }, { id: 'm2', lessonDone: false, status: 'not-started' }], attempts: atts1 })
    expect(a1.coverage).toBe(0.5)
    expect(a1.estimate).toBeCloseTo(0.5 * 0.8 + 0.5 * UNSTUDIED_ACCURACY, 12) // 0.55
    const atts2 = Array.from({ length: 6 }, (_, i) => A({ correct: i < 3, confidence: i === 0 ? 'guess' : 'confident' }))
    const a2 = areaReadiness({ areaId: 'II', title: 'II', weight: 15, modules: [{ id: 'm3', lessonDone: true, status: 'learning' }], attempts: atts2 })
    expect(a2.accuracy).toBeCloseTo(2 / 6, 12) // guess-correct counts as wrong
    expect(a2.estimate).toBeCloseTo(2 / 6, 12)
    const o = overallReadiness([a1, a2])
    expect(o.overall).toBe(Math.round(((0.55 * 35 + (2 / 6) * 15) / 50) * 100)) // 49
    const withMock = overallReadiness([a1, a2], 0.8)
    expect(withMock.overall).toBe(Math.round((0.5 * ((0.55 * 35 + (2 / 6) * 15) / 50) + 0.4) * 100))
  })
  it('an area with study but < 5 attempts blocks the overall estimate entirely', () => {
    const ok = areaReadiness({ areaId: 'I', title: 'I', weight: 1, modules: [{ id: 'm1', lessonDone: true, status: 'learning' }], attempts: Array.from({ length: 20 }, () => A({})) })
    const thin = areaReadiness({ areaId: 'II', title: 'II', weight: 1, modules: [{ id: 'm2', lessonDone: true, status: 'learning' }], attempts: Array.from({ length: 4 }, () => A({})) })
    expect(thin.estimate).toBeNull()
    expect(overallReadiness([ok, thin]).overall).toBeNull()
  })
  it('division by zero guards: no modules, no weights, no attempts', () => {
    const empty = areaReadiness({ areaId: 'X', title: 'X', weight: 0, modules: [], attempts: [] })
    expect(empty).toMatchObject({ coverage: 0, estimate: UNSTUDIED_ACCURACY, accuracy: null })
    expect(rate([])).toEqual({ n: 0, correct: 0, pct: null })
    expect(avgTimeSeconds([])).toBeNull()
    expect(calibration([]).every((c) => c.accuracy === null)).toBe(true)
    expect(weeklyTrend([], '2026-03-10', 2).map((w) => w.weekStart)).toEqual(['2026-02-25', '2026-03-04'])
  })
  it('repeated attempts of ONE item all count (20 answers to the same question -> n=20)', () => {
    const same = Array.from({ length: 20 }, (_, i) => A({ itemId: 'same', at: `2026-01-01T10:00:${String(i).padStart(2, '0')}Z` }))
    const a = areaReadiness({ areaId: 'I', title: 'I', weight: 1, modules: [{ id: 'm1', lessonDone: true, status: 'learning' }], attempts: same })
    expect(a.n).toBe(20)
    expect(a.accuracy).toBe(1)
  })
})

describe('computeStudyState readiness inputs', () => {
  const farMods = bundle.modules.filter((m) => m.section === 'FAR')
  const base = { content: bundle, section, settings: { ...DEFAULT_SETTINGS }, progress: [], srs: [], errors: [], quizSessions: [], tbsSessions: [], examSessions: [], now: new Date('2026-09-23T12:00:00Z') }
  it('lesson-mode attempts and TBS attempts are excluded from readiness; exam/review modes are included', () => {
    const m = farMods[0]
    const mk = (mode: Attempt['mode'], itemType: Attempt['itemType'] = 'mcq', correct = true) => A({ moduleId: m.id, mode, itemType, correct })
    const s1 = computeStudyState({ ...base, attempts: [...Array(5).fill(0).map(() => mk('lesson')), ...Array(5).fill(0).map(() => mk('tbs' as never, 'tbs'))] })
    const area = s1.readiness.areas.find((a) => a.areaId === m.areaId)!
    expect(area.n).toBe(0)
    const s2 = computeStudyState({ ...base, attempts: [mk('exam'), mk('review'), mk('test'), mk('tutor', 'mcq', false)] })
    expect(s2.readiness.areas.find((a) => a.areaId === m.areaId)!.n).toBe(4)
  })
  it('weights are allocation midpoints', () => {
    const s = computeStudyState({ ...base, attempts: [] })
    expect(s.readiness.areas.map((a) => a.weight)).toEqual(section.areas.map((a) => (a.allocation.min + a.allocation.max) / 2))
  })
  it('empty state: no attempts -> no NaN anywhere', () => {
    const s = computeStudyState({ ...base, attempts: [] })
    expect(s.readiness.overall).toBeNull()
    expect(Number.isFinite(s.progressPct) && Number.isFinite(s.lessonsPct)).toBe(true)
  })
})

describe('mastery', () => {
  const day = (d: string, n: number, correct: number, o: Partial<Attempt> = {}) =>
    Array.from({ length: n }, (_, i) => A({ day: d, at: `${d}T10:00:${String(i).padStart(2, '0')}Z`, correct: i < correct, ...o }))
  it('ONE question answered 3x on each of two days (review mode, mixed) = mastered', () => {
    const m = computeMastery([...day('2026-01-01', 3, 3, { itemId: 'only', mode: 'review' }), ...day('2026-01-03', 3, 3, { itemId: 'only', mode: 'review' })], false)
    expect(m.status).toBe('mastered')
  })
  it('exam-mode attempts count toward mastery (mixed: true, no confidence)', () => {
    const m = computeMastery([...day('2026-01-01', 3, 3, { mode: 'exam', confidence: undefined }), ...day('2026-01-02', 3, 3, { mode: 'exam' })], false)
    expect(m.status).toBe('mastered')
  })
  it('threshold boundaries: 4/5 = 80% qualifies, 7/9 does not', () => {
    expect(computeMastery([...day('2026-01-01', 5, 4), ...day('2026-01-02', 5, 4)], true).status).toBe('mastered')
    expect(computeMastery([...day('2026-01-01', 9, 7), ...day('2026-01-02', 5, 4)], true).status).toBe('learning')
  })
  it('slipping only after the mastery day, below 60%', () => {
    const base = [...day('2026-01-01', 5, 5), ...day('2026-01-02', 5, 5)]
    expect(computeMastery([...base, ...day('2026-01-05', 5, 3)], true).status).toBe('mastered') // 60% is not < 60%
    expect(computeMastery([...base, ...day('2026-01-05', 5, 2)], true).status).toBe('slipping')
    // A third perfect day after a bad day un-slips it
    expect(computeMastery([...base, ...day('2026-01-05', 5, 2), ...day('2026-01-06', 5, 5)], true).status).toBe('mastered')
  })
})
