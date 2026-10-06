/**
 * Answer-cue lint: flags item pools a content-blind strategy could game.
 * Choice order is shuffled at run time, but length and key-letter cues in
 * the authored bank still leak the answer (and the stored letter is what
 * reviewers see), so each section/pool must stay within these limits.
 */
import type { ContentBundle } from './build'
import type { Mcq } from './schema'

export const CUE_LIMITS = {
  /** Share of items whose correct choice is the unique longest. */
  maxUniqueLongest: 0.35,
  /** Mean of (correct length / mean distractor length). */
  maxLengthRatio: 1.25,
  /** Each key letter's share of the pool. */
  minLetterShare: 0.18,
  maxLetterShare: 0.32,
  /** Pools smaller than this are too noisy for the letter check. */
  minPoolForLetters: 40,
}

/** Errors: every section and pool passed after the P0-6 part 3 rewrites, so a regression now fails the build. */
export const CUE_LINT_LEVEL: 'warning' | 'error' = 'error'

export interface CueStats {
  section: string
  pool: Mcq['pool']
  n: number
  uniqueLongest: number
  lengthRatio: number
  letterShare: Record<string, number>
}

function isUniqueLongest(q: Mcq): boolean {
  const correct = q.choices.find((c) => c.id === q.answer)!.text.length
  return q.choices.every((c) => c.id === q.answer || c.text.length < correct)
}

function lengthRatio(q: Mcq): number {
  const correct = q.choices.find((c) => c.id === q.answer)!.text.length
  const d = q.choices.filter((c) => c.id !== q.answer).map((c) => c.text.length)
  const mean = d.reduce((a, b) => a + b, 0) / d.length
  return mean ? correct / mean : 1
}

export function cueStats(bundle: Pick<ContentBundle, 'sections' | 'modules' | 'questions'>): CueStats[] {
  const out: CueStats[] = []
  const all = Object.values(bundle.questions)
  for (const s of bundle.sections) {
    const mods = new Set(bundle.modules.filter((m) => m.section === s.id).map((m) => m.id))
    for (const pool of ['practice', 'exam', 'lesson'] as const) {
      const qs = all.filter((q) => mods.has(q.moduleId) && q.pool === pool)
      if (!qs.length) continue
      const letters: Record<string, number> = { a: 0, b: 0, c: 0, d: 0 }
      for (const q of qs) letters[q.answer] = (letters[q.answer] ?? 0) + 1
      out.push({
        section: s.id,
        pool,
        n: qs.length,
        uniqueLongest: qs.filter(isUniqueLongest).length / qs.length,
        lengthRatio: qs.reduce((a, q) => a + lengthRatio(q), 0) / qs.length,
        letterShare: Object.fromEntries(Object.entries(letters).map(([k, v]) => [k, v / qs.length])),
      })
    }
  }
  return out
}

/** Human-readable problems, one per failing metric. */
export function cueProblems(stats: CueStats[], limits = CUE_LIMITS): string[] {
  const pct = (x: number) => `${(100 * x).toFixed(1)}%`
  const problems: string[] = []
  for (const s of stats) {
    const where = `${s.section} ${s.pool} MCQs (n=${s.n})`
    if (s.uniqueLongest > limits.maxUniqueLongest)
      problems.push(`${where}: the correct choice is the unique longest in ${pct(s.uniqueLongest)} of items (limit ${pct(limits.maxUniqueLongest)})`)
    if (s.lengthRatio > limits.maxLengthRatio)
      problems.push(`${where}: correct choices average ${s.lengthRatio.toFixed(2)}x the length of distractors (limit ${limits.maxLengthRatio}x)`)
    if (s.n >= limits.minPoolForLetters)
      for (const [letter, share] of Object.entries(s.letterShare))
        if (share < limits.minLetterShare || share > limits.maxLetterShare)
          problems.push(`${where}: key "${letter}" is ${pct(share)} of answers (allowed ${pct(limits.minLetterShare)}–${pct(limits.maxLetterShare)})`)
  }
  return problems
}
