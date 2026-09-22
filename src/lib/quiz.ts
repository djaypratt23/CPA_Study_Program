/**
 * Custom quiz builder: filter by topic and status, then order the items.
 * Mixed sets are interleaved so consecutive questions come from different
 * modules — the learner has to identify *which* rule applies, not just apply
 * the rule from the chapter they just read.
 */
import type { Mcq } from '../content/schema'
import type { Attempt, ItemMeta } from '../db/types'
import { mulberry32, shuffle } from './random'

export type StatusFilter = 'all' | 'new' | 'missed' | 'flagged' | 'lowconf'

export interface QuizFilter {
  moduleIds: string[]
  status: StatusFilter
  count: number
  seed?: number
}

export interface ItemHistory {
  attempts: number
  lastCorrect?: boolean
  lastConfidence?: Attempt['confidence']
  everMissed: boolean
}

export function historyByItem(attempts: Attempt[]): Map<string, ItemHistory> {
  const map = new Map<string, ItemHistory>()
  const sorted = [...attempts].sort((a, b) => a.at.localeCompare(b.at))
  for (const a of sorted) {
    const h = map.get(a.itemId) ?? { attempts: 0, everMissed: false }
    h.attempts++
    h.lastCorrect = a.correct
    h.lastConfidence = a.confidence
    if (!a.correct) h.everMissed = true
    map.set(a.itemId, h)
  }
  return map
}

export function matchesStatus(q: Mcq, status: StatusFilter, hist: Map<string, ItemHistory>, meta: Map<string, ItemMeta>): boolean {
  const h = hist.get(q.id)
  switch (status) {
    case 'all':
      return true
    case 'new':
      return !h
    case 'missed':
      return !!h && h.lastCorrect === false
    case 'flagged':
      return !!meta.get(q.id)?.flagged
    case 'lowconf':
      return !!h && (h.lastConfidence === 'guess' || h.lastConfidence === 'unsure')
  }
}

/** Reorder so the same module never appears twice in a row when avoidable. */
export function interleave<T extends { moduleId: string }>(items: T[]): T[] {
  const buckets = new Map<string, T[]>()
  for (const it of items) buckets.set(it.moduleId, [...(buckets.get(it.moduleId) ?? []), it])
  const out: T[] = []
  let last: string | undefined
  while (out.length < items.length) {
    const candidates = [...buckets.entries()].filter(([k, v]) => v.length && k !== last)
    const pool = candidates.length ? candidates : [...buckets.entries()].filter(([, v]) => v.length)
    pool.sort((a, b) => b[1].length - a[1].length) // largest bucket first avoids dead ends
    const [k, v] = pool[0]
    out.push(v.shift()!)
    last = k
  }
  return out
}

export function buildQuiz(
  pool: Mcq[],
  filter: QuizFilter,
  hist: Map<string, ItemHistory>,
  meta: Map<string, ItemMeta>,
): Mcq[] {
  const rand = mulberry32(filter.seed ?? Date.now())
  const ids = new Set(filter.moduleIds)
  const eligible = pool.filter((q) => q.pool === 'practice' && ids.has(q.moduleId) && matchesStatus(q, filter.status, hist, meta))
  // Prefer items seen least often so repeated sets rotate through the bank.
  const ordered = shuffle(eligible, rand).sort((a, b) => (hist.get(a.id)?.attempts ?? 0) - (hist.get(b.id)?.attempts ?? 0))
  const picked = shuffle(ordered.slice(0, filter.count), rand)
  return ids.size > 1 ? interleave(picked) : picked
}

/**
 * Mastery check: mostly the target module, plus a few interleaved items from
 * other studied modules so the learner must discriminate between topics.
 */
export function buildMasteryCheck(pool: Mcq[], moduleId: string, otherModuleIds: string[], hist: Map<string, ItemHistory>, seed = Date.now()): Mcq[] {
  const rand = mulberry32(seed)
  const byLeastSeen = (list: Mcq[]) => shuffle(list, rand).sort((a, b) => (hist.get(a.id)?.attempts ?? 0) - (hist.get(b.id)?.attempts ?? 0))
  const own = byLeastSeen(pool.filter((q) => q.pool === 'practice' && q.moduleId === moduleId)).slice(0, 5)
  const others = byLeastSeen(pool.filter((q) => q.pool === 'practice' && otherModuleIds.includes(q.moduleId) && q.moduleId !== moduleId)).slice(0, 3)
  return interleave(shuffle([...own, ...others], rand))
}
