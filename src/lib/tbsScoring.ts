/**
 * Task-based simulation scoring. Every gradable cell is worth one point, so
 * partial credit falls out naturally, and each cell carries its own
 * explanation for the review screen.
 */
import type { NUMERIC_UNITS, Tbs, TbsPart } from '../content/schema'

type NumericUnit = (typeof NUMERIC_UNITS)[number]

export interface JournalLineResponse {
  account: string
  debit?: string | number | null
  credit?: string | number | null
}

/** One row of a review part: whether the candidate flagged it, and the corrected amount entered. */
export interface ReviewRowResponse {
  flagged: boolean
  corrected?: string
}

/** Responses keyed by part id. Shape depends on the part kind. */
export type TbsResponses = Record<string, PartResponse>
export type PartResponse =
  | { kind: 'numeric'; values: Record<string, string> }
  | { kind: 'dropdown'; values: Record<string, string> }
  | { kind: 'journal'; lines: JournalLineResponse[] }
  | { kind: 'docreview'; values: Record<string, string> }
  | { kind: 'research'; value: string }
  | { kind: 'review'; values: Record<string, ReviewRowResponse> }

export interface CellResult {
  partId: string
  cellId: string
  label: string
  correct: boolean
  given: string
  expected: string
  explanation: string
}

export interface TbsScore {
  earned: number
  possible: number
  percent: number
  cells: CellResult[]
}

/**
 * Parse a learner-entered number: tolerates $, commas, spaces, a trailing %,
 * (parentheses) negatives, and a leading hyphen or Unicode minus (U+2212).
 * A percent is read as written ("25%" → 25), never rescaled, so "0.25" does
 * not match a 25 key.
 */
export function parseAmount(input: string | number | null | undefined): number | null {
  if (input === null || input === undefined) return null
  if (typeof input === 'number') return Number.isFinite(input) ? input : null
  let s = input.trim().replace(/\u2212/g, '-').replace(/[$,\s]/g, '')
  if (!s) return null
  let neg = false
  if (s.startsWith('-')) {
    neg = true
    s = s.slice(1)
  }
  if (/^\(.*\)$/.test(s)) {
    neg = !neg
    s = s.slice(1, -1)
  }
  if (s.endsWith('%')) s = s.slice(0, -1)
  if (!/^\d*\.?\d+$/.test(s)) return null
  const n = Number(s)
  return neg ? -n : n
}

export function withinTolerance(given: number | null, expected: number, tolerance: number): boolean {
  return given !== null && Math.abs(given - expected) <= tolerance + 1e-9
}

export const fmt = (n: number | undefined | null) => (n === undefined || n === null ? '' : n.toLocaleString('en-US'))

/** Display a formatted number with its row unit: "$1,000", "25%", "1.5x", "60 days". */
export function withUnit(text: string, unit: NumericUnit | undefined): string {
  if (!unit || !text) return text
  if (unit === '$') return `$${text}`
  if (unit === '%' || unit === 'x') return `${text}${unit}`
  return `${text} ${unit}`
}

function scorePart(part: TbsPart, resp: PartResponse | undefined): CellResult[] {
  switch (part.kind) {
    case 'numeric': {
      const values = resp?.kind === 'numeric' ? resp.values : {}
      return part.rows.map((r) => ({
        partId: part.id,
        cellId: r.id,
        label: r.label,
        correct: withinTolerance(parseAmount(values[r.id]), r.answer, r.tolerance),
        given: values[r.id] ?? '',
        expected: withUnit(fmt(r.answer), r.unit),
        explanation: r.explanation,
      }))
    }
    case 'dropdown': {
      const values = resp?.kind === 'dropdown' ? resp.values : {}
      return part.rows.map((r) => ({
        partId: part.id,
        cellId: r.id,
        label: r.label,
        correct: values[r.id] === r.answer,
        given: values[r.id] ?? '',
        expected: r.answer,
        explanation: r.explanation,
      }))
    }
    case 'docreview': {
      const values = resp?.kind === 'docreview' ? resp.values : {}
      return part.segments.flatMap((s) =>
        'id' in s
          ? [
              {
                partId: part.id,
                cellId: s.id,
                label: `“${s.original}”`,
                // An untouched segment keeps its original wording.
                correct: (values[s.id] ?? s.original) === s.answer,
                given: values[s.id] ?? s.original,
                expected: s.answer,
                explanation: s.explanation,
              },
            ]
          : [],
      )
    }
    case 'research': {
      const value = resp?.kind === 'research' ? resp.value : ''
      const ex = part.excerpts.find((e) => e.id === part.answer)
      const given = part.excerpts.find((e) => e.id === value)
      return [
        {
          partId: part.id,
          cellId: part.id,
          label: part.prompt,
          correct: value === part.answer,
          given: given?.citation ?? '',
          expected: ex?.citation ?? part.answer,
          explanation: part.explanation,
        },
      ]
    }
    case 'journal':
      return scoreJournal(part, resp?.kind === 'journal' ? resp.lines : [])
    case 'review':
      return scoreReview(part, resp?.kind === 'review' ? resp.values : {})
  }
}

/**
 * Review parts: one cell per row. A row in error scores only if it is flagged
 * and the corrected amount is within tolerance; a correct row scores only if it
 * is left unflagged, so flagging everything is never rewarded.
 */
export function scoreReview(part: Extract<TbsPart, { kind: 'review' }>, values: Record<string, ReviewRowResponse>): CellResult[] {
  return part.rows.map((r) => {
    const v = values[r.id]
    const inError = Math.abs(r.prepared - r.answer) > r.tolerance
    const flagged = !!v?.flagged
    const correct = inError ? flagged && withinTolerance(parseAmount(v?.corrected ?? null), r.answer, r.tolerance) : !flagged
    return {
      partId: part.id,
      cellId: r.id,
      label: r.label,
      correct,
      given: flagged ? `Error → ${v?.corrected?.trim() || '(no amount)'}` : 'No error',
      expected: inError ? `Error → ${fmt(r.answer)}` : 'No error',
      explanation: r.explanation,
    }
  })
}

/**
 * Journal entries: each expected line is a cell (right account, right side,
 * right amount). Every entered non-blank line that matches no expected line
 * costs a cell, except one line per wrong expected cell for the same account
 * (an attempt at that line, already penalized by the wrong cell). So listing
 * every account on both sides, or repeating a correct line, is never free.
 * Order does not matter.
 */
export function scoreJournal(
  part: Extract<TbsPart, { kind: 'journal' }>,
  lines: JournalLineResponse[],
): CellResult[] {
  const entered = lines
    .map((l) => ({ account: l.account, debit: parseAmount(l.debit ?? null), credit: parseAmount(l.credit ?? null) }))
    .filter((l) => l.account || l.debit !== null || l.credit !== null)
  const used = new Set<number>()
  const matches = part.lines.map((exp) => {
    const side = exp.debit !== undefined ? 'debit' : 'credit'
    const amt = (exp.debit ?? exp.credit) as number
    const idx = entered.findIndex(
      (l, j) =>
        !used.has(j) &&
        l.account === exp.account &&
        withinTolerance(side === 'debit' ? l.debit : l.credit, amt, part.tolerance) &&
        (side === 'debit' ? l.credit === null || l.credit === 0 : l.debit === null || l.debit === 0),
    )
    if (idx >= 0) used.add(idx)
    return { exp, side, amt, idx }
  })
  // Each wrong expected cell absorbs at most one unmatched line for its account.
  const blamed = new Set<number>()
  const results: CellResult[] = matches.map(({ exp, side, amt, idx }, i) => {
    let shown = idx
    if (idx < 0) {
      shown = entered.findIndex((l, j) => !used.has(j) && !blamed.has(j) && l.account === exp.account)
      if (shown >= 0) blamed.add(shown)
    }
    const line = shown >= 0 ? entered[shown] : undefined
    return {
      partId: part.id,
      cellId: `${part.id}-line${i + 1}`,
      label: `${side === 'debit' ? 'Dr' : 'Cr'} ${exp.account}`,
      correct: idx >= 0,
      given: line ? describeLine(line) : '—',
      expected: `${side === 'debit' ? 'Dr' : 'Cr'} ${fmt(amt)}`,
      explanation: part.explanation,
    }
  })
  entered.forEach((l, j) => {
    if (used.has(j) || blamed.has(j)) return
    results.push({
      partId: part.id,
      cellId: `${part.id}-extra${j + 1}`,
      label: `Extra line: ${l.account || '(no account)'}`,
      correct: false,
      given: describeLine(l),
      expected: 'No such line',
      explanation: 'This line is not part of the correct entry. Extra lines cost credit, just as on the exam.',
    })
  })
  return results
}

function describeLine(l: { debit: number | null; credit: number | null }): string {
  return `${l.debit !== null ? 'Dr ' + fmt(l.debit) : ''}${l.credit !== null ? 'Cr ' + fmt(l.credit) : ''}`
}

export function scoreTbs(tbs: Tbs, responses: TbsResponses): TbsScore {
  const cells = tbs.parts.flatMap((p) => scorePart(p, responses[p.id]))
  const earned = cells.filter((c) => c.correct).length
  const possible = cells.length
  return { earned, possible, percent: possible ? earned / possible : 0, cells }
}

/** Number of gradable cells, excluding the "extra line" penalties that only exist after answering. */
export function cellCount(tbs: Tbs): number {
  return scoreTbs(tbs, {}).possible
}
