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
        if (p.kind === 'review')
          responses[p.id] = {
            kind: 'review',
            values: Object.fromEntries(p.rows.map((r) => [r.id, r.prepared === r.answer ? { flagged: false } : { flagged: true, corrected: String(r.answer) }])),
          } as never
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

describe('validator hardening (P1-3)', () => {
  const sectionYaml = (over: { exam?: string; allocation?: string; extraSection?: boolean } = {}) => ({
    '/content/sections/far.yaml': `id: FAR
name: F
kind: core
status: scaffold
blueprintEffective: '2026-01-01'
description: d
exam: ${over.exam ?? '{ durationMinutes: 240, testlets: [{ kind: mcq, count: 2 }, { kind: tbs, count: 1 }], weighting: { mcq: 50, tbs: 50 }, passingScore: 75 }'}
skillAllocation: [{ level: application, min: 1, max: 2 }]
areas:
  - id: FAR-I
    title: Area
    allocation: ${over.allocation ?? '{ min: 1, max: 2 }'}
    units:
      - id: far-u1
        title: Unit
        modules: [{ id: far-x, title: 'Module X', blueprint: ['I.A'] }]
`,
    ...(over.extraSection
      ? {
          '/content/sections/aud.yaml': `id: AUD
name: A
kind: core
status: scaffold
blueprintEffective: '2026-01-01'
description: d
exam: { durationMinutes: 240, testlets: [{ kind: mcq, count: 1 }], weighting: { mcq: 50, tbs: 50 }, passingScore: 75 }
skillAllocation: [{ level: application, min: 1, max: 2 }]
areas:
  - id: AUD-I
    title: Area
    allocation: { min: 1, max: 2 }
    units:
      - id: aud-u1
        title: Unit
        modules: [{ id: aud-x, title: 'Module A' }]
`,
        }
      : {}),
  })
  const errorsFor = (files: Record<string, string>) => buildContent(files).errors.join('\n')
  const tbs = (over: Record<string, unknown> = {}, parts?: unknown[]) =>
    JSON.stringify({
      id: 'far-tbs-t',
      section: 'FAR',
      unitId: 'far-u1',
      moduleIds: ['far-x'],
      pool: 'practice',
      title: 'T',
      minutes: 10,
      skill: 'application',
      instructions: 'Do it',
      parts: parts ?? [{ kind: 'numeric', id: 'n', prompt: 'p', rows: [{ id: 'r1', label: 'A', answer: 1, explanation: 'because' }] }],
      ...over,
    })

  it('rejects duplicate TBS part ids', () => {
    const part = { kind: 'numeric', id: 'n', prompt: 'p', rows: [{ id: 'r1', label: 'A', answer: 1, explanation: 'because' }] }
    expect(errorsFor({ ...sectionYaml(), '/content/far/tbs/far-tbs-t.json': tbs({}, [part, part]) })).toMatch(/duplicate part id "n"/)
  })
  it('rejects duplicate TBS row ids', () => {
    const rows = [
      { id: 'r1', label: 'A', answer: 1, explanation: 'because' },
      { id: 'r1', label: 'B', answer: 2, explanation: 'because' },
    ]
    expect(errorsFor({ ...sectionYaml(), '/content/far/tbs/far-tbs-t.json': tbs({}, [{ kind: 'numeric', id: 'n', prompt: 'p', rows }]) })).toMatch(/duplicate row id "r1"/)
  })
  it('rejects a doc-review segment with both text and an id', () => {
    const seg = { text: 'x', id: 's1', original: 'a', options: ['a', 'b'], answer: 'b', explanation: 'because' }
    expect(errorsFor({ ...sectionYaml(), '/content/far/tbs/far-tbs-t.json': tbs({}, [{ kind: 'docreview', id: 'd', prompt: 'p', segments: [seg] }]) })).toMatch(/far-tbs-t/)
  })
  it('requires an explicit tolerance on non-integer numeric answers', () => {
    const part = { kind: 'numeric', id: 'n', prompt: 'p', rows: [{ id: 'r1', label: 'A', answer: 23.75, explanation: 'because' }] }
    expect(errorsFor({ ...sectionYaml(), '/content/far/tbs/far-tbs-t.json': tbs({}, [part]) })).toMatch(/needs an explicit tolerance/)
  })
  it('rejects a TBS whose unit or module belongs to another section', () => {
    const files = { ...sectionYaml({ extraSection: true }), '/content/far/tbs/far-tbs-t.json': tbs({ unitId: 'aud-u1', moduleIds: ['aud-x'] }) }
    expect(errorsFor(files)).toMatch(/unit aud-u1 belongs to AUD/)
    expect(errorsFor(files)).toMatch(/module aud-x belongs to AUD/)
  })
  it('rejects zero or negative exam weights', () => {
    expect(errorsFor(sectionYaml({ exam: '{ durationMinutes: 240, testlets: [{ kind: mcq, count: 1 }], weighting: { mcq: 100, tbs: 0 }, passingScore: 75 }' }))).toMatch(/weighting/)
  })
  it('rejects an allocation whose min exceeds its max', () => {
    expect(errorsFor(sectionYaml({ allocation: '{ min: 30, max: 20 }' }))).toMatch(/min must not exceed max/)
  })
  it('rejects a break after the last testlet', () => {
    const exam = '{ durationMinutes: 240, testlets: [{ kind: mcq, count: 1 }], breakAfterTestlet: 1, weighting: { mcq: 50, tbs: 50 }, passingScore: 75 }'
    expect(errorsFor(sectionYaml({ exam }))).toMatch(/breakAfterTestlet 1 must come before the last testlet/)
  })
  it('rejects duplicate exam-form ids and an item used twice in a form', () => {
    const q = (id: string) => ({
      id,
      moduleId: 'far-x',
      pool: 'exam',
      stem: 'A question stem here',
      choices: ['a', 'b', 'c', 'd'].map((c) => ({ id: c, text: c, explanation: 'because of reasons', ...(c === 'a' ? {} : { trap: 'other' }) })),
      answer: 'a',
      explanation: 'overall explanation',
      skill: 'application',
    })
    const form = { id: 'far-mock', section: 'FAR', title: 'Mock', testlets: [{ kind: 'mcq', items: ['far-q1', 'far-q1'] }, { kind: 'tbs', items: ['far-tbs-t'] }] }
    const files = {
      ...sectionYaml(),
      '/content/far/exam-questions/far-exam.json': JSON.stringify([q('far-q1')]),
      '/content/far/tbs/far-tbs-t.json': tbs({ pool: 'exam' }),
      '/content/far/exams/far-mock.json': JSON.stringify(form),
      '/content/far/exams/far-mock-copy.json': JSON.stringify(form),
    }
    expect(errorsFor(files)).toMatch(/far-mock: duplicate exam form id/)
    expect(errorsFor(files)).toMatch(/item far-q1 appears more than once/)
  })
  it('carries optional Blueprint tags on modules', () => {
    expect(buildContent(sectionYaml()).bundle.modules[0].blueprint).toEqual(['I.A'])
  })
  it('reports the skill mix against the Blueprint allocation as a warning', () => {
    const r = buildContent({ ...sectionYaml(), '/content/far/tbs/far-tbs-t.json': tbs() })
    expect(r.warnings.join('\n')).toMatch(/skill mix: FAR application is 100.0%/)
  })
})
