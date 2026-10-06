/** CSV export of answered questions and simulations (P2-6), for spreadsheets or item analysis. */
import type { Attempt } from '../db/types'

export const ATTEMPT_COLUMNS = ['at', 'day', 'section', 'moduleId', 'itemId', 'itemType', 'mode', 'correct', 'score', 'choice', 'confidence', 'timeSeconds', 'mixed', 'sessionId'] as const

/** RFC 4180 quoting; a leading =, +, - or @ is prefixed with ' so spreadsheets don't run it as a formula. */
export function csvCell(v: unknown): string {
  if (v === undefined || v === null) return ''
  let s = String(v)
  if (/^[=+\-@]/.test(s)) s = `'${s}`
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

export function attemptsToCsv(attempts: Attempt[]): string {
  const rows = [...attempts]
    .sort((a, b) => a.at.localeCompare(b.at))
    .map((a) =>
      [a.at, a.day, a.section, a.moduleId, a.itemId, a.itemType, a.mode, a.correct, a.score, a.choice, a.confidence, Math.round(a.timeMs / 1000), a.mixed, a.sessionId].map(csvCell).join(','),
    )
  return [ATTEMPT_COLUMNS.join(','), ...rows].join('\r\n') + '\r\n'
}
