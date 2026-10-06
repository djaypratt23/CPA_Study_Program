import type { ContentBundle } from '../content/build'
import type { SectionConfig } from '../content/schema'
import type { AreaResult, ExamResult, ExamTestletState } from '../db/types'
import { approxScaledScore, weightedPercent } from './analytics'
import { scoreTbs } from './tbsScoring'

type Tally = { earned: number; possible: number }

/**
 * An area's score, weighted like the whole exam: MCQ and TBS percentages
 * are combined with the section weighting. An area tested by only one item
 * type uses that type alone.
 */
export function areaPercent(area: Pick<AreaResult, 'mcq' | 'tbs' | 'earned' | 'possible' | 'percent'>, weighting: { mcq: number; tbs: number }): number {
  if (area.percent !== undefined) return area.percent
  const m = area.mcq?.possible ? area.mcq.earned / area.mcq.possible : undefined
  const t = area.tbs?.possible ? area.tbs.earned / area.tbs.possible : undefined
  if (m !== undefined && t !== undefined) return weightedPercent(m, t, weighting)
  if (m !== undefined) return m
  if (t !== undefined) return t
  return area.possible ? area.earned / area.possible : 0
}

/** Score a completed simulated exam. Unanswered items score zero. */
export function scoreExam(testlets: ExamTestletState[], section: SectionConfig, content: ContentBundle): ExamResult {
  let mcqN = 0
  let mcqCorrect = 0
  const tbsScores: number[] = []
  const byArea: Record<string, AreaResult> = {}
  const areaOf = (moduleId: string) => content.modules.find((m) => m.id === moduleId)?.areaId ?? 'other'
  const add = (area: string, kind: 'mcq' | 'tbs', earned: number) => {
    const a = (byArea[area] ??= { earned: 0, possible: 0 })
    a.earned += earned
    a.possible += 1
    const k: Tally = (a[kind] ??= { earned: 0, possible: 0 })
    k.earned += earned
    k.possible += 1
  }
  for (const t of testlets) {
    for (const id of t.items) {
      if (t.kind === 'mcq') {
        const q = content.questions[id]
        if (!q) continue
        mcqN++
        const ok = t.mcqAnswers[id] === q.answer
        if (ok) mcqCorrect++
        add(areaOf(q.moduleId), 'mcq', ok ? 1 : 0)
      } else {
        const tbs = content.tbs[id]
        if (!tbs) continue
        const s = scoreTbs(tbs, t.tbsResponses[id] ?? {})
        tbsScores.push(s.percent)
        add(areaOf(tbs.moduleIds[0]), 'tbs', s.percent)
      }
    }
  }
  for (const a of Object.values(byArea)) a.percent = areaPercent(a, section.exam.weighting)
  const mcqPercent = mcqN ? mcqCorrect / mcqN : 0
  const tbsPercent = tbsScores.length ? tbsScores.reduce((a, b) => a + b, 0) / tbsScores.length : 0
  const w = weightedPercent(mcqPercent, tbsPercent, section.exam.weighting)
  return { mcqPercent, tbsPercent, weightedPercent: w, approxScaled: approxScaledScore(w), byArea }
}
