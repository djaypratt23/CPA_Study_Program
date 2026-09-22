import { describe, expect, it } from 'vitest'
import { loadContent } from '../scripts/load-content'
import { buildContent } from '../src/content/build'
import { scoreTbs } from '../src/lib/tbsScoring'

const { bundle, errors } = loadContent()

describe('repository content', () => {
  it('passes schema and cross-reference validation', () => {
    expect(errors).toEqual([])
  })

  it('every practice/exam MCQ explains every choice and labels distractor traps', () => {
    for (const q of Object.values(bundle.questions)) {
      for (const c of q.choices) {
        expect(c.explanation.length, `${q.id}/${c.id}`).toBeGreaterThan(10)
        if (c.id !== q.answer) expect(c.trap, `${q.id}/${c.id}`).toBeTruthy()
      }
    }
  })

  it('a perfect TBS response earns 100% (answer keys are internally consistent)', () => {
    for (const t of Object.values(bundle.tbs)) {
      const responses: Record<string, never> = {}
      for (const p of t.parts) {
        if (p.kind === 'numeric') responses[p.id] = { kind: 'numeric', values: Object.fromEntries(p.rows.map((r) => [r.id, String(r.answer)])) } as never
        if (p.kind === 'dropdown') responses[p.id] = { kind: 'dropdown', values: Object.fromEntries(p.rows.map((r) => [r.id, r.answer])) } as never
        if (p.kind === 'journal') responses[p.id] = { kind: 'journal', lines: p.lines } as never
        if (p.kind === 'docreview')
          responses[p.id] = { kind: 'docreview', values: Object.fromEntries(p.segments.flatMap((s) => ('id' in s ? [[s.id, s.answer]] : []))) } as never
        if (p.kind === 'research') responses[p.id] = { kind: 'research', value: p.answer } as never
      }
      expect(scoreTbs(t, responses).percent, t.id).toBe(1)
    }
  })

  it('answer letters are reasonably balanced across the bank', () => {
    const qs = Object.values(bundle.questions)
    if (qs.length < 40) return
    const counts = { a: 0, b: 0, c: 0, d: 0 }
    for (const q of qs) counts[q.answer]++
    for (const k of Object.keys(counts) as (keyof typeof counts)[]) expect(counts[k] / qs.length, k).toBeGreaterThan(0.15)
  })
})

describe('validator rules', () => {
  const section = `id: FAR
name: F
kind: core
status: full
blueprintEffective: '2026-01-01'
description: d
exam: { durationMinutes: 240, testlets: [{ kind: mcq, count: 1 }], weighting: { mcq: 50, tbs: 50 }, passingScore: 75 }
skillAllocation: [{ level: application, min: 1, max: 2 }]
areas:
  - id: FAR-I
    title: Area
    allocation: { min: 1, max: 2 }
    units:
      - id: far-u1
        title: Unit
        modules: [{ id: far-x, title: 'Module X' }]
`
  it('flags a full section missing lessons, questions, TBS and an exam', () => {
    const r = buildContent({ '/content/sections/far.yaml': section })
    expect(r.errors.join('\n')).toMatch(/has no lesson/)
    expect(r.errors.join('\n')).toMatch(/practice TBS/)
    expect(r.errors.join('\n')).toMatch(/simulated exam/)
  })
  it('flags distractors without a trap label', () => {
    const q = [
      {
        id: 'far-x-1',
        pool: 'practice',
        stem: 'A question stem here',
        choices: [
          { id: 'a', text: '1', explanation: 'right because reasons' },
          { id: 'b', text: '2', explanation: 'wrong because reasons' },
          { id: 'c', text: '3', explanation: 'wrong because reasons', trap: 'other' },
          { id: 'd', text: '4', explanation: 'wrong because reasons', trap: 'other' },
        ],
        answer: 'a',
        explanation: 'overall explanation',
        skill: 'application',
      },
    ]
    const r = buildContent({ '/content/sections/far.yaml': section, '/content/far/modules/far-x/questions.json': JSON.stringify(q) })
    expect(r.errors.join('\n')).toMatch(/distractor b must name the trap/)
  })
})
