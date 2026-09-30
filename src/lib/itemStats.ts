/**
 * Item statistics for content QA (P1-14), computed from many learners' attempts
 * (e.g. several exported backups). Each learner's FIRST attempt at an item is used,
 * so repeated practice does not inflate the p-value.
 *
 * - p-value: share of learners answering correctly.
 * - discrimination: point-biserial correlation between getting this item right and the
 *   learner's rest-score (share correct on their other first attempts). Needs at least
 *   MIN_RESPONDENTS learners; low or negative values suggest an ambiguous item or wrong key.
 * - choiceRates: share of learners choosing each option (MCQ).
 */
import type { Attempt } from '../db/types'

export const MIN_RESPONDENTS = 5

export interface ItemStat {
  itemId: string
  n: number
  pValue: number
  discrimination: number | null
  choiceRates: Record<string, number>
  flags: string[]
}

export interface Respondent {
  id: string
  attempts: Pick<Attempt, 'itemId' | 'correct' | 'choice' | 'at' | 'mode'>[]
}

function firstAttempts(r: Respondent) {
  const first = new Map<string, Respondent['attempts'][number]>()
  for (const a of [...r.attempts].filter((x) => x.mode !== 'lesson').sort((x, y) => x.at.localeCompare(y.at))) if (!first.has(a.itemId)) first.set(a.itemId, a)
  return first
}

function pointBiserial(xs: number[], ys: number[]): number | null {
  const n = xs.length
  if (n < 2) return null
  const mx = xs.reduce((a, b) => a + b, 0) / n
  const my = ys.reduce((a, b) => a + b, 0) / n
  let sxy = 0
  let sxx = 0
  let syy = 0
  for (let i = 0; i < n; i++) {
    sxy += (xs[i] - mx) * (ys[i] - my)
    sxx += (xs[i] - mx) ** 2
    syy += (ys[i] - my) ** 2
  }
  return sxx && syy ? sxy / Math.sqrt(sxx * syy) : null
}

/** `answers` maps item ids to their keyed choice, used to flag a distractor chosen more often than the key. */
export function computeItemStats(respondents: Respondent[], answers: Record<string, string> = {}): ItemStat[] {
  const firsts = respondents.map((r) => firstAttempts(r))
  const totals = firsts.map((f) => {
    const list = [...f.values()]
    return { correct: list.filter((a) => a.correct).length, n: list.length }
  })
  const items = new Set(firsts.flatMap((f) => [...f.keys()]))
  const out: ItemStat[] = []
  for (const itemId of items) {
    const xs: number[] = []
    const ys: number[] = []
    const choices: Record<string, number> = {}
    firsts.forEach((f, i) => {
      const a = f.get(itemId)
      if (!a) return
      const x = a.correct ? 1 : 0
      xs.push(x)
      const rest = totals[i].n - 1
      ys.push(rest > 0 ? (totals[i].correct - x) / rest : 0)
      if (a.choice) choices[a.choice] = (choices[a.choice] ?? 0) + 1
    })
    const n = xs.length
    const pValue = xs.reduce((a, b) => a + b, 0) / n
    const discrimination = n >= MIN_RESPONDENTS ? pointBiserial(xs, ys) : null
    const choiceRates = Object.fromEntries(Object.entries(choices).map(([k, v]) => [k, v / n]))
    const flags: string[] = []
    if (n >= MIN_RESPONDENTS) {
      if (pValue < 0.25) flags.push('very hard: check the key and wording')
      if (pValue > 0.95) flags.push('very easy: may not discriminate')
      if (discrimination !== null && discrimination < 0) flags.push('negative discrimination: check the key')
      const key = answers[itemId]
      if (key) {
        const top = Object.entries(choiceRates).sort((a, b) => b[1] - a[1])[0]
        if (top && top[0] !== key && top[1] > (choiceRates[key] ?? 0)) flags.push(`distractor ${top[0]} chosen more often than the key`)
      }
    }
    out.push({ itemId, n, pValue, discrimination, choiceRates, flags })
  }
  return out.sort((a, b) => b.flags.length - a.flags.length || a.itemId.localeCompare(b.itemId))
}
