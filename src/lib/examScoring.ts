import type { ContentBundle } from '../content/build'
import type { SectionConfig } from '../content/schema'
import type { ExamResult, ExamTestletState } from '../db/types'
import { approxScaledScore, weightedPercent } from './analytics'
import { scoreTbs } from './tbsScoring'

/** Score a completed simulated exam. Unanswered items score zero. */
export function scoreExam(testlets: ExamTestletState[], section: SectionConfig, content: ContentBundle): ExamResult {
  let mcqN = 0
  let mcqCorrect = 0
  const tbsScores: number[] = []
  const byArea: Record<string, { earned: number; possible: number }> = {}
  const areaOf = (moduleId: string) => content.modules.find((m) => m.id === moduleId)?.areaId ?? 'other'
  const add = (area: string, earned: number, possible: number) => {
    byArea[area] ??= { earned: 0, possible: 0 }
    byArea[area].earned += earned
    byArea[area].possible += possible
  }
  for (const t of testlets) {
    for (const id of t.items) {
      if (t.kind === 'mcq') {
        const q = content.questions[id]
        if (!q) continue
        mcqN++
        const ok = t.mcqAnswers[id] === q.answer
        if (ok) mcqCorrect++
        add(areaOf(q.moduleId), ok ? 1 : 0, 1)
      } else {
        const tbs = content.tbs[id]
        if (!tbs) continue
        const s = scoreTbs(tbs, t.tbsResponses[id] ?? {})
        tbsScores.push(s.percent)
        add(areaOf(tbs.moduleIds[0]), s.percent, 1)
      }
    }
  }
  const mcqPercent = mcqN ? mcqCorrect / mcqN : 0
  const tbsPercent = tbsScores.length ? tbsScores.reduce((a, b) => a + b, 0) / tbsScores.length : 0
  const w = weightedPercent(mcqPercent, tbsPercent, section.exam.weighting)
  return { mcqPercent, tbsPercent, weightedPercent: w, approxScaled: approxScaledScore(w), byArea }
}
