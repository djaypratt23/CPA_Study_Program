import { describe, expect, it } from 'vitest'
import { loadContent } from '../scripts/load-content'
import type { Tbs } from '../src/content/schema'

// Regression tests for content corrected in remediation (REMEDIATION_TASKS.md P0-9, P1-8).

const { bundle } = loadContent()
const q = (id: string) => {
  const item = bundle.questions[id]
  if (!item) throw new Error(`missing MCQ ${id}`)
  return item
}
const keyText = (id: string) => q(id).choices.find((c) => c.id === q(id).answer)!.text
const row = (t: Tbs, id: string) => {
  for (const p of t.parts) if (p.kind === 'numeric' || p.kind === 'dropdown') for (const r of p.rows) if (r.id === id) return r
  throw new Error(`missing row ${id}`)
}

describe('P0-9 stale AUD rules', () => {
  it('no AUD item teaches the superseded 45-day PCAOB assembly period as current', () => {
    const texts = [
      ...Object.values(bundle.questions)
        .filter((x) => x.moduleId.startsWith('aud-'))
        .flatMap((x) => [x.stem, x.explanation, ...x.choices.flatMap((c) => [c.text, c.explanation])]),
      ...bundle.flashcards.filter((f) => f.section === 'AUD').flatMap((f) => [f.front, f.back]),
    ]
    for (const t of texts) if (/45 days|45-day/.test(t)) expect(t, t).toMatch(/formerly 45|reduced from 45/)
  })
  it('aud-ev-chk2 offers the 14-day PCAOB period as the distractor', () => {
    expect(q('aud-ev-chk2').choices.some((c) => c.text === 'Within 14 days — March 24')).toBe(true)
  })
  it('SSARS 25: a known departure in a review modifies the conclusion', () => {
    expect(keyText('aud-ss-07')).toMatch(/qualified or adverse/)
    expect(keyText('aud-x4-12')).toMatch(/qualified or adverse/)
  })
})

describe('P1-8 medium content fixes', () => {
  it('far-dsec-10 price and key agree with annual payments', () => {
    expect(q('far-dsec-10').stem).toContain('$105,154')
    expect(keyText('far-dsec-10')).toBe('$1,588')
    const price = 10000 * [1, 2, 3].reduce((a, t) => a + 1 / 1.08 ** t, 0) + 100000 / 1.08 ** 3
    expect(Math.round(price)).toBe(105154)
    expect(10000 - Math.round(105154 * 0.08)).toBe(1588)
  })
  it('reg-pb-03 uses the $19,000 2025 annual exclusion', () => {
    expect(q('reg-pb-03').stem).toContain('$19,000')
    expect(keyText('reg-pb-03')).toBe('$48,000')
  })
  it('aud-sa-04 projected misstatement no longer equals the audited value', () => {
    expect(keyText('aud-sa-04')).toBe('$6,000')
    expect(q('aud-sa-04').stem).toContain('$3,500')
  })
  it('tcp-sc2-01 moves the weekend Form 2553 deadline (IRC §7503)', () => {
    expect(keyText('tcp-sc2-01')).toBe('March 17, 2025')
  })
  it('reg-tbs-x5-research uses the March 16, 2026 due date', () => {
    const t = bundle.tbs['reg-tbs-x5-research']
    expect(row(t, 'p').answer).toBe('March 16, 2026')
    expect(row(t, 's').answer).toBe('March 16, 2026')
  })
  it('tcp-tbs-u3-m1 book tax expense reconciles to current plus deferred tax', () => {
    const t = bundle.tbs['tcp-tbs-u3-m1']
    const current = Number(row(t, 'tax').answer)
    const deferred = Math.round(0.21 * (50000 - 18000 - 12000))
    expect(current + deferred).toBe(195720)
    expect(row(t, 're').answer).toBe(1200000 + (930000 - 195720) - 200000)
  })
})
