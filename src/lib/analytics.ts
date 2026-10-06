/**
 * Performance analytics and the readiness estimate. Everything here is a
 * pure function of attempts + content metadata so it is easy to test and
 * easy to reason about. Readiness is deliberately conservative: with little
 * data it says so rather than guessing.
 */
import type { Attempt, ErrorCause, ErrorLogEntry } from '../db/types'
import { ERROR_CAUSES } from '../db/types'
import { isTrulyCorrect, type MasteryStatus } from './mastery'
import type { Confidence } from './srs'
import { addDays, dayKey, parseDay } from './dates'

export interface Rate {
  n: number
  correct: number
  pct: number | null
}

export function rate(list: Pick<Attempt, 'correct' | 'confidence'>[], strict = true): Rate {
  const correct = list.filter((a) => (strict ? isTrulyCorrect(a) : a.correct)).length
  return { n: list.length, correct, pct: list.length ? correct / list.length : null }
}

export function groupRate<K extends string>(attempts: Attempt[], key: (a: Attempt) => K | undefined): Record<string, Rate> {
  const groups: Record<string, Attempt[]> = {}
  for (const a of attempts) {
    const k = key(a)
    if (k === undefined) continue
    ;(groups[k] ??= []).push(a)
  }
  return Object.fromEntries(Object.entries(groups).map(([k, v]) => [k, rate(v)]))
}

/**
 * Practice attempts that measure knowledge. Excludes in-lesson checks (mid-learning)
 * and mock-exam attempts, which feed readiness only through the mock blend.
 */
export function scoringAttempts(attempts: Attempt[]): Attempt[] {
  return attempts.filter((a) => a.mode !== 'lesson' && a.mode !== 'exam')
}

/**
 * First-attempt evidence: the first time the learner ever saw each item, kept
 * only if that first sighting was a practice attempt (tutor or test). Repeats,
 * review-queue answers, and items first met in a lesson or a mock don't count,
 * so re-answering familiar questions can't inflate readiness.
 */
export function firstAttempts(attempts: Attempt[]): Attempt[] {
  const seen = new Set<string>()
  const out: Attempt[] = []
  for (const a of [...attempts].sort((x, y) => x.at.localeCompare(y.at))) {
    const key = `${a.itemType}:${a.itemId}`
    if (seen.has(key)) continue
    seen.add(key)
    if (a.mode === 'tutor' || a.mode === 'test') out.push(a)
  }
  return out
}

export interface CalibrationRow {
  confidence: Confidence
  n: number
  accuracy: number | null
  verdict: string
}

export function calibration(attempts: Attempt[]): CalibrationRow[] {
  const levels: Confidence[] = ['guess', 'unsure', 'confident']
  return levels.map((c) => {
    const list = attempts.filter((a) => a.itemType === 'mcq' && a.confidence === c)
    const acc = list.length ? list.filter((a) => a.correct).length / list.length : null
    let verdict = 'Not enough data'
    if (list.length >= 5 && acc !== null) {
      if (c === 'confident') verdict = acc >= 0.85 ? 'Well calibrated' : acc >= 0.7 ? 'Slightly overconfident' : 'Overconfident — slow down on "sure" answers'
      else if (c === 'unsure') verdict = acc > 0.85 ? 'Underconfident — you know more than you think' : 'Reasonable'
      else verdict = acc > 0.6 ? 'Your guesses are educated — trust your instincts a bit more' : 'Expected: guesses are shaky'
    }
    return { confidence: c, n: list.length, accuracy: acc, verdict }
  })
}

export function avgTimeSeconds(attempts: Attempt[], itemType: 'mcq' | 'tbs' = 'mcq'): number | null {
  const list = attempts.filter((a) => a.itemType === itemType && a.timeMs > 0 && a.timeMs < 30 * 60_000)
  if (!list.length) return null
  return list.reduce((s, a) => s + a.timeMs, 0) / list.length / 1000
}

/** Weekly accuracy for the last `weeks` weeks (oldest first). */
export function weeklyTrend(attempts: Attempt[], today: string = dayKey(), weeks = 8): { weekStart: string; rate: Rate }[] {
  const out: { weekStart: string; rate: Rate }[] = []
  for (let w = weeks - 1; w >= 0; w--) {
    const end = addDays(today, -7 * w)
    const start = addDays(end, -6)
    const list = attempts.filter((a) => a.day >= start && a.day <= end)
    out.push({ weekStart: start, rate: rate(list) })
  }
  return out
}

export function errorBreakdown(errors: ErrorLogEntry[]): Record<ErrorCause, number> {
  const out = Object.fromEntries(ERROR_CAUSES.map((c) => [c, 0])) as Record<ErrorCause, number>
  for (const e of errors) out[e.cause]++
  return out
}

export const CAUSE_ADVICE: Record<ErrorCause, string> = {
  concept: 'Re-read the lesson’s big idea and worked examples, then redo the faded example.',
  misread: 'Slow down on stems: underline what is asked (amount? classification? date?) before reading choices.',
  calculation: 'Redo the worked and faded examples by hand; write each step, then check with the calculator.',
  trap: 'Review why each distractor is wrong — the same traps recur. Name the trap before choosing.',
  memory: 'Drill the flashcards for this module; they are scheduled for spaced review.',
  time: 'Practice timed sets in test mode to build pace (about 1.5–2 minutes per MCQ).',
}

export interface ModuleStat {
  moduleId: string
  title: string
  areaId: string
  status: MasteryStatus
  lessonDone: boolean
  rate: Rate
  topCause?: ErrorCause
}

export interface Recommendation {
  moduleId: string
  title: string
  reason: string
  action: string
  score: number
}

/**
 * Rank the weakest modules. Only modules the learner has started are
 * considered: an untouched module is "not yet studied", not "weak".
 */
export function weakestModules(stats: ModuleStat[], limit = 3): Recommendation[] {
  const recs: Recommendation[] = []
  for (const s of stats) {
    if (!s.lessonDone && s.rate.n === 0) continue
    let score = 0
    let reason = ''
    if (s.status === 'slipping') {
      score = 0.9
      reason = 'Was mastered, but recent mixed practice slipped below 60%.'
    } else if (s.rate.n >= 3 && s.rate.pct !== null && s.rate.pct < 0.8) {
      score = 1 - s.rate.pct
      reason = `Accuracy ${Math.round(s.rate.pct * 100)}% over ${s.rate.n} questions (guesses count as misses).`
    } else if (s.lessonDone && s.rate.n < 3) {
      score = 0.35
      reason = 'Lesson done but barely practiced — retrieval practice is what makes it stick.'
    } else if (s.status !== 'mastered' && s.rate.n >= 3) {
      score = 0.25
      reason = 'Solid accuracy, but not yet confirmed on two separate days.'
    }
    if (score <= 0) continue
    const action = s.topCause ? CAUSE_ADVICE[s.topCause] : s.rate.n < 3 ? 'Do a practice set for this module.' : 'Do a mixed mastery check.'
    recs.push({ moduleId: s.moduleId, title: s.title, reason, action, score })
  }
  return recs.sort((a, b) => b.score - a.score).slice(0, limit)
}

/* ------------------------------------------------------------------ */
/* Readiness                                                           */
/* ------------------------------------------------------------------ */

/** Expected accuracy on material the learner has not studied (educated guessing). */
export const UNSTUDIED_ACCURACY = 0.3
export const MIN_ATTEMPTS_FOR_ESTIMATE = 15

export interface AreaReadiness {
  areaId: string
  title: string
  weight: number // blueprint midpoint allocation (0..1, normalized)
  coverage: number // share of the area's modules studied (lesson done)
  masteredShare: number
  accuracy: number | null // first-attempt practice accuracy (MCQ and TBS blended by the exam weighting)
  mcqAccuracy: number | null
  tbsAccuracy: number | null
  n: number // MCQ first attempts
  tbsN: number
  estimate: number | null // expected raw % on the area
}

export interface Readiness {
  areas: AreaReadiness[]
  /** Estimate on the same approximate 0–99 scale as the mock's scaled score (65% raw ≈ 75). */
  overall: number | null
  /** Plausible range for `overall` (about 95%), from the amount of evidence. */
  band: [number, number] | null
  /** Weighted raw percent (0..1) behind `overall`. */
  raw: number | null
  label: string
  detail: string
}

export function areaReadiness(args: {
  areaId: string
  title: string
  weight: number
  modules: { id: string; lessonDone: boolean; status: MasteryStatus }[]
  attempts: Attempt[] // first-attempt MCQ practice for this area's modules
  tbsAttempts?: Attempt[] // first-attempt TBS practice for this area
  weighting?: { mcq: number; tbs: number }
}): AreaReadiness {
  const total = args.modules.length || 1
  const studied = args.modules.filter((m) => m.lessonDone || m.status !== 'not-started')
  const coverage = studied.length / total
  const masteredShare = args.modules.filter((m) => m.status === 'mastered').length / total
  const recent = [...args.attempts].sort((a, b) => a.at.localeCompare(b.at)).slice(-60)
  const r = rate(recent)
  const tbs = [...(args.tbsAttempts ?? [])].sort((a, b) => a.at.localeCompare(b.at)).slice(-10)
  const tbsAccuracy = tbs.length ? tbs.reduce((s, a) => s + a.score, 0) / tbs.length : null
  const accuracy = r.pct !== null && tbsAccuracy !== null && args.weighting ? weightedPercent(r.pct, tbsAccuracy, args.weighting) : r.pct
  const estimate =
    r.n >= 5 && accuracy !== null ? coverage * accuracy + (1 - coverage) * UNSTUDIED_ACCURACY : coverage === 0 ? UNSTUDIED_ACCURACY : null
  return {
    areaId: args.areaId,
    title: args.title,
    weight: args.weight,
    coverage,
    masteredShare,
    accuracy,
    mcqAccuracy: r.pct,
    tbsAccuracy,
    n: r.n,
    tbsN: tbs.length,
    estimate,
  }
}

export function overallReadiness(areas: AreaReadiness[], mockPercent?: number | null): Readiness {
  const totalN = areas.reduce((s, a) => s + a.n, 0)
  const wsum = areas.reduce((s, a) => s + a.weight, 0) || 1
  if (totalN < MIN_ATTEMPTS_FOR_ESTIMATE || areas.some((a) => a.estimate === null)) {
    return {
      areas,
      overall: null,
      band: null,
      raw: null,
      label: 'Not enough data yet',
      detail: `Answer at least ${MIN_ATTEMPTS_FOR_ESTIMATE} new practice questions across every area for an honest estimate. Right now any number would be a guess.`,
    }
  }
  let raw = areas.reduce((s, a) => s + (a.estimate ?? 0) * a.weight, 0) / wsum
  // Evidence: first-attempt items plus a full mock counted as about 60 items.
  let n = totalN + areas.reduce((s, a) => s + a.tbsN, 0)
  if (mockPercent !== undefined && mockPercent !== null) {
    raw = 0.5 * raw + 0.5 * mockPercent
    n += 60
  }
  const se = Math.sqrt(Math.max(raw * (1 - raw), 0.01) / n)
  const overall = approxScaledScore(raw)
  const band: [number, number] = [approxScaledScore(raw - 1.96 * se), approxScaledScore(raw + 1.96 * se)]
  let label: string
  let detail: string
  if (overall >= 75) {
    label = 'Likely ready'
    detail = 'Your first-attempt accuracy across the whole blueprint is at a passing level. Keep reviewing to stay sharp and take a simulated exam if you have not.'
  } else if (overall >= 70) {
    label = 'Borderline'
    detail = 'You are close. Work the weakest areas below; a few points in a heavily weighted area moves the needle most.'
  } else if (overall >= 60) {
    label = 'Building'
    detail = 'Real progress, but not exam-ready yet. Finish unstudied modules and fix the weakest areas first.'
  } else {
    label = 'Early stage'
    detail = 'Most of the blueprint is still ahead of you. That is normal early on — follow the daily plan.'
  }
  return { areas, overall, band, raw, label, detail }
}

/* ------------------------------------------------------------------ */
/* Simulated exam score                                                */
/* ------------------------------------------------------------------ */

/**
 * Heuristic mapping from weighted raw percent to an approximate 0–99 scale.
 * The real CPA exam uses item response theory with difficulty-weighted and
 * unscored pretest items, and the AICPA does not publish a conversion. This
 * piecewise-linear map (65% raw -> 75) is a rough, commonly used rule of
 * thumb and must be presented as such.
 */
export function approxScaledScore(weightedPercent: number): number {
  const p = Math.max(0, Math.min(1, weightedPercent)) * 100
  const s = p <= 65 ? (p / 65) * 75 : 75 + ((p - 65) / 35) * 24
  return Math.round(s)
}

export function weightedPercent(mcqPct: number, tbsPct: number, weighting: { mcq: number; tbs: number }): number {
  const total = weighting.mcq + weighting.tbs
  return (mcqPct * weighting.mcq + tbsPct * weighting.tbs) / total
}

export function daysUntil(date: string | undefined, today: string = dayKey()): number | null {
  if (!date) return null
  return Math.round((parseDay(date).getTime() - parseDay(today).getTime()) / 86_400_000)
}
