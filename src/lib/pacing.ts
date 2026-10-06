/**
 * Pacing feedback (P1-10): how long the candidate spent per item compared with a target.
 * Targets are study guidance, not AICPA figures: about 90 seconds per multiple-choice
 * question, and each simulation's own suggested minutes.
 */

export const MCQ_TARGET_MS = 90_000

export interface Pacing {
  /** Items with a recorded time. */
  timed: number
  totalMs: number
  targetMs: number
  avgMs: number
  /** Indexes (0-based, in the order given) of items that took more than twice their target. */
  slow: number[]
}

/** Summarize time spent against per-item targets. Items without a recorded time are ignored. */
export function pacing(items: { timeMs?: number; targetMs: number }[]): Pacing {
  let totalMs = 0
  let targetMs = 0
  let timed = 0
  const slow: number[] = []
  items.forEach((it, i) => {
    if (!it.timeMs || it.timeMs <= 0) return
    timed++
    totalMs += it.timeMs
    targetMs += it.targetMs
    if (it.timeMs > 2 * it.targetMs) slow.push(i)
  })
  return { timed, totalMs, targetMs, avgMs: timed ? totalMs / timed : 0, slow }
}

/** m:ss (or h:mm:ss) for display. */
export function formatDuration(ms: number): string {
  const total = Math.max(0, Math.round(ms / 1000))
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  const ss = String(s).padStart(2, '0')
  return h ? `${h}:${String(m).padStart(2, '0')}:${ss}` : `${m}:${ss}`
}
