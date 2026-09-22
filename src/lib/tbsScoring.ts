/**
 * Task-based simulation scoring. Every gradable cell is worth one point, so
 * partial credit falls out naturally, and each cell carries its own
 * explanation for the review screen.
 */
import type { Tbs, TbsPart } from '../content/schema'

export interface JournalLineResponse {
  account: string
  debit?: string | number | null
  credit?: string | number | null
}

/** Responses keyed by part id. Shape depends on the part kind. */
export type TbsResponses = Record<string, PartResponse>
export type PartResponse =
  | { kind: 'numeric'; values: Record<string, string> }
  | { kind: 'dropdown'; values: Record<string, string> }
  | { kind: 'journal'; lines: JournalLineResponse[] }
  | { kind: 'docreview'; values: Record<string, string> }
  | { kind: 'research'; value: string }

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

/** Parse a learner-entered number: tolerates $, commas, spaces, and (parentheses) negatives. */
export function parseAmount(input: string | number | null | undefined): number | null {
  if (input === null || input === undefined) return null
  if (typeof input === 'number') return Number.isFinite(input) ? input : null
  let s = input.trim()
  if (!s) return null
  let neg = false
  if (/^\(.*\)$/.test(s)) {
    neg = true
    s = s.slice(1, -1)
  }
  s = s.replace(/[$,\s]/g, '')
  if (s.startsWith('-')) {
    neg = !neg
    s = s.slice(1)
  }
  if (!/^\d*\.?\d+$/.test(s)) return null
  const n = Number(s)
  return neg ? -n : n
}

export function withinTolerance(given: number | null, expected: number, tolerance: number): boolean {
  return given !== null && Math.abs(given - expected) <= tolerance + 1e-9
}

const fmt = (n: number | undefined | null) => (n === undefined || n === null ? '' : n.toLocaleString('en-US'))

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
        expected: fmt(r.answer),
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
  }
}

/**
 * Journal entries: each expected line is a cell (right account, right side,
 * right amount). Extra non-blank lines that match nothing each cost a cell,
 * so "list every account" is never rewarded. Order does not matter.
 */
export function scoreJournal(
  part: Extract<TbsPart, { kind: 'journal' }>,
  lines: JournalLineResponse[],
): CellResult[] {
  const entered = lines
    .map((l) => ({ account: l.account, debit: parseAmount(l.debit ?? null), credit: parseAmount(l.credit ?? null) }))
    .filter((l) => l.account || l.debit !== null || l.credit !== null)
  const used = new Set<number>()
  const results: CellResult[] = part.lines.map((exp, i) => {
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
    const partial = entered.find((l) => l.account === exp.account)
    return {
      partId: part.id,
      cellId: `${part.id}-line${i + 1}`,
      label: `${side === 'debit' ? 'Dr' : 'Cr'} ${exp.account}`,
      correct: idx >= 0,
      given: partial ? `${partial.debit !== null ? 'Dr ' + fmt(partial.debit) : ''}${partial.credit !== null ? 'Cr ' + fmt(partial.credit) : ''}` : '—',
      expected: `${side === 'debit' ? 'Dr' : 'Cr'} ${fmt(amt)}`,
      explanation: part.explanation,
    }
  })
  entered.forEach((l, j) => {
    if (used.has(j)) return
    if (part.lines.some((e) => e.account === l.account)) return // already penalized via its expected cell
    results.push({
      partId: part.id,
      cellId: `${part.id}-extra${j + 1}`,
      label: `Extra line: ${l.account || '(no account)'}`,
      correct: false,
      given: `${l.debit !== null ? 'Dr ' + fmt(l.debit) : ''}${l.credit !== null ? 'Cr ' + fmt(l.credit) : ''}`,
      expected: 'No such line',
      explanation: 'This line is not part of the correct entry. Extra lines cost credit, just as on the exam.',
    })
  })
  return results
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
