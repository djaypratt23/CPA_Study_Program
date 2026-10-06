import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { ExamSession, QuizSession } from '../src/db/types'
import {
  breakRemainingMs,
  examRemainingMs,
  isExamClockPaused,
  pauseExamClock,
  quizDeadline,
  quizTimeLeftMs,
  resumeExamClock,
} from '../src/lib/examClock'
import { areaPercent, scoreExam } from '../src/lib/examScoring'
import { summarizeQuiz } from '../src/lib/quizScoring'
import { loadContent } from '../scripts/load-content'

const T0 = Date.parse('2026-09-25T12:00:00Z')
const HOUR = 3_600_000

beforeEach(() => {
  vi.useFakeTimers()
  vi.setSystemTime(T0)
})
afterEach(() => vi.useRealTimers())

const exam = (patch: Partial<ExamSession> = {}): ExamSession => ({
  id: 'e',
  examId: 'x',
  section: 'FAR',
  startedAt: new Date(T0).toISOString(),
  remainingMs: 4 * HOUR,
  endsAt: new Date(T0 + 4 * HOUR).toISOString(),
  testletIndex: 0,
  onBreak: false,
  breakUsed: false,
  testlets: [],
  ...patch,
})

describe('exam wall clock', () => {
  it('keeps running while the candidate is away ("Save & exit" does not pause)', () => {
    const s = exam()
    vi.setSystemTime(T0 + HOUR) // closed the tab for an hour
    expect(examRemainingMs(s, Date.now())).toBe(3 * HOUR)
  })

  it('is not slowed by a throttled interval: time derives from Date.now()', () => {
    const s = exam()
    vi.setSystemTime(T0 + 90_000)
    expect(examRemainingMs(s, Date.now())).toBe(4 * HOUR - 90_000)
  })

  it('never goes below zero', () => {
    vi.setSystemTime(T0 + 5 * HOUR)
    expect(examRemainingMs(exam(), Date.now())).toBe(0)
  })

  it('stops only for the scheduled break and restarts from the frozen time', () => {
    let s = exam()
    vi.setSystemTime(T0 + HOUR)
    s = { ...s, breakOffered: true, ...pauseExamClock(s, Date.now()) }
    expect(isExamClockPaused(s)).toBe(true)
    expect(s.endsAt).toBeUndefined()
    s = { ...s, breakUsed: true, onBreak: true, breakOffered: false, breakEndsAt: new Date(Date.now() + 15 * 60_000).toISOString() }
    vi.setSystemTime(T0 + HOUR + 10 * 60_000) // 10 minutes into the break
    expect(examRemainingMs(s, Date.now())).toBe(3 * HOUR)
    expect(breakRemainingMs(s, Date.now(), 15 * 60_000)).toBe(5 * 60_000)
    s = { ...s, onBreak: false, breakEndsAt: undefined, ...resumeExamClock(s, Date.now()) }
    vi.setSystemTime(T0 + 2 * HOUR + 10 * 60_000)
    expect(examRemainingMs(s, Date.now())).toBe(2 * HOUR)
  })

  it('a break that was offered but already used does not freeze the clock', () => {
    const s = exam({ breakOffered: true, breakUsed: true })
    vi.setSystemTime(T0 + HOUR)
    expect(examRemainingMs(s, Date.now())).toBe(3 * HOUR)
  })

  it('falls back to the saved remaining time for sessions without a deadline', () => {
    expect(examRemainingMs(exam({ endsAt: undefined, remainingMs: 1234 }), Date.now())).toBe(1234)
  })
})

describe('timed practice sets', () => {
  const quiz = (patch: Partial<QuizSession>) => ({ timeLimitMs: 10 * 60_000, elapsedMs: 0, ...patch })
  it('count down from a wall-clock deadline', () => {
    const s = { ...quiz({}), endsAt: quizDeadline(quiz({}), Date.now()) }
    vi.setSystemTime(T0 + 4 * 60_000)
    expect(quizTimeLeftMs(s, Date.now())).toBe(6 * 60_000)
    vi.setSystemTime(T0 + 20 * 60_000)
    expect(quizTimeLeftMs(s, Date.now())).toBe(0)
  })
  it('resume older sessions from their saved elapsed time', () => {
    expect(Date.parse(quizDeadline(quiz({ elapsedMs: 3 * 60_000 }), Date.now())!)).toBe(T0 + 7 * 60_000)
  })
  it('untimed sets have no deadline', () => {
    expect(quizTimeLeftMs({ elapsedMs: 0 }, Date.now())).toBeNull()
  })
})

describe('test-mode score', () => {
  const items: QuizSession['items'] = {
    q1: { itemId: 'q1', timeMs: 0, correct: true, answeredAt: 'x', confidence: 'confident' },
    q2: { itemId: 'q2', timeMs: 0, correct: false, answeredAt: 'x' },
    q3: { itemId: 'q3', timeMs: 0 },
    q4: { itemId: 'q4', timeMs: 0 },
  }
  it('divides by all items and reports skipped ones', () => {
    const s = summarizeQuiz({ mode: 'test', items }, ['q1', 'q2', 'q3', 'q4'])
    expect(s).toMatchObject({ correct: 1, scoredOn: 4, skipped: 2, percent: 0.25 })
  })
  it('tutor mode still scores answered items', () => {
    expect(summarizeQuiz({ mode: 'tutor', items }, ['q1', 'q2', 'q3', 'q4']).percent).toBe(0.5)
  })
})

describe('per-area exam breakdown', () => {
  it('weights an area by the MCQ/TBS weighting instead of counting a TBS like one MCQ', () => {
    // 10 MCQs all right, 1 TBS at 0%: an unweighted tally says 10/11 = 91%.
    const area = { earned: 10, possible: 11, mcq: { earned: 10, possible: 10 }, tbs: { earned: 0, possible: 1 } }
    expect(areaPercent(area, { mcq: 50, tbs: 50 })).toBe(0.5)
  })
  it('uses the single item type when an area has only one', () => {
    expect(areaPercent({ earned: 3, possible: 4, mcq: { earned: 3, possible: 4 } }, { mcq: 50, tbs: 50 })).toBe(0.75)
  })
  it('reads legacy results that only have a combined tally', () => {
    expect(areaPercent({ earned: 1, possible: 2 }, { mcq: 50, tbs: 50 })).toBe(0.5)
  })
  it('scoreExam reports MCQ and TBS separately per area', () => {
    const { bundle } = loadContent()
    const form = bundle.exams[0]
    const section = bundle.sections.find((s) => s.id === form.section)!
    const testlets = form.testlets.map((t) => ({ kind: t.kind, items: t.items, submitted: true, mcqAnswers: {}, flags: {}, tbsResponses: {}, index: 0 }))
    const r = scoreExam(testlets, section, bundle)
    const areas = Object.values(r.byArea)
    expect(areas.some((a) => a.mcq && a.tbs)).toBe(true)
    for (const a of areas) expect(a.percent).toBe(0)
  })
})
