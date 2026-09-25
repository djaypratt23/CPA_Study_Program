import { describe, expect, it } from 'vitest'
import { cueProblems, cueStats, CUE_LIMITS } from '../src/content/cueLint'
import type { Mcq } from '../src/content/schema'
import { CHOICE_LETTERS, displayChoices, displayLetter } from '../src/lib/random'

const choices = ['a', 'b', 'c', 'd'].map((id) => ({ id, text: `Choice ${id}` }))

describe('per-session choice shuffling', () => {
  it('keeps the authored order without a seed', () => {
    expect(displayChoices('q1', choices).map((c) => c.id)).toEqual(['a', 'b', 'c', 'd'])
  })

  it('is stable for the same session and item', () => {
    const one = displayChoices('q1', choices, 'session-1').map((c) => c.id)
    expect(displayChoices('q1', choices, 'session-1').map((c) => c.id)).toEqual(one)
  })

  it('keeps every stored choice id exactly once', () => {
    for (let i = 0; i < 50; i++) expect(displayChoices(`q${i}`, choices, 's').map((c) => c.id).sort()).toEqual(['a', 'b', 'c', 'd'])
  })

  it('varies across sessions and spreads the key over all four positions', () => {
    const positions = { A: 0, B: 0, C: 0, D: 0 } as Record<string, number>
    for (let i = 0; i < 400; i++) positions[displayLetter(displayChoices('q1', choices, `session-${i}`), 'a')]++
    for (const letter of ['A', 'B', 'C', 'D']) expect(positions[letter], letter).toBeGreaterThan(60)
  })

  it('maps display letters back to stored ids', () => {
    const order = displayChoices('q7', choices, 'exam-9')
    order.forEach((c, i) => expect(displayLetter(order, c.id)).toBe(CHOICE_LETTERS[i]))
  })
})

function mcq(id: string, answer: 'a' | 'b' | 'c' | 'd', correctText: string, distractor = 'Short'): Mcq {
  return {
    id,
    moduleId: 'm1',
    pool: 'practice',
    stem: 'Stem',
    answer,
    explanation: 'Because.',
    skill: 'application',
    choices: (['a', 'b', 'c', 'd'] as const).map((c) => ({ id: c, text: c === answer ? correctText : distractor, explanation: 'Because.' })),
  } as Mcq
}

const bundleOf = (qs: Mcq[]) => ({
  sections: [{ id: 'AUD' }] as never,
  modules: [{ id: 'm1', section: 'AUD' }] as never,
  questions: Object.fromEntries(qs.map((q) => [q.id, q])),
})

describe('answer-cue lint', () => {
  it('flags a pool where the correct choice is usually the longest', () => {
    const qs = Array.from({ length: 40 }, (_, i) => mcq(`q${i}`, (['a', 'b', 'c', 'd'] as const)[i % 4], 'A much longer and more qualified correct answer'))
    const problems = cueProblems(cueStats(bundleOf(qs)))
    expect(problems.some((p) => /unique longest in 100.0%/.test(p))).toBe(true)
    expect(problems.some((p) => /average .*x the length/.test(p))).toBe(true)
  })

  it('flags a lopsided key-letter distribution', () => {
    const qs = Array.from({ length: 40 }, (_, i) => mcq(`q${i}`, i < 20 ? 'b' : (['a', 'c', 'd'] as const)[i % 3], 'Same', 'Same'))
    const problems = cueProblems(cueStats(bundleOf(qs)))
    expect(problems.some((p) => /key "b" is 50.0%/.test(p))).toBe(true)
  })

  it('passes a balanced, parallel pool', () => {
    const qs = Array.from({ length: 40 }, (_, i) => mcq(`q${i}`, (['a', 'b', 'c', 'd'] as const)[i % 4], 'Same', 'Same'))
    expect(cueProblems(cueStats(bundleOf(qs)))).toEqual([])
  })

  it('uses the thresholds from the remediation plan', () => {
    expect(CUE_LIMITS).toMatchObject({ maxUniqueLongest: 0.35, maxLengthRatio: 1.25, minLetterShare: 0.18, maxLetterShare: 0.32 })
  })
})

describe('repository bank passes the cue lint', () => {
  it('has no answer-cue problems in any section or pool', async () => {
    const { loadContent } = await import('../scripts/load-content')
    const { bundle } = loadContent()
    expect(cueProblems(cueStats(bundle))).toEqual([])
  })
})
