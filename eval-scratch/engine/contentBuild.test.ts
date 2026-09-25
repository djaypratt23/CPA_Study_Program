// buildContent robustness with in-memory fixtures.
import { describe, expect, it } from 'vitest'
import { buildContent } from '../../src/content/build'
import { scoreTbs } from '../../src/lib/tbsScoring'
import { weightedPercent } from '../../src/lib/analytics'

const section = (extra = '', weighting = '{ mcq: 50, tbs: 50 }', alloc = '{ min: 1, max: 2 }') => `id: FAR
name: F
kind: core
status: scaffold
blueprintEffective: '2026-01-01'
description: d
exam: { durationMinutes: 240, testlets: [{ kind: mcq, count: 1 }, { kind: tbs, count: 1 }], weighting: ${weighting}, passingScore: 75${extra} }
skillAllocation: [{ level: application, min: 1, max: 2 }]
areas:
  - id: FAR-I
    title: Area
    allocation: ${alloc}
    units:
      - id: far-u1
        title: Unit
        modules: [{ id: far-x, title: 'Module X' }, { id: far-y, title: 'Module Y' }]
`
const mcq = (id: string, o: Record<string, unknown> = {}) => ({
  id, pool: 'practice', stem: 'A question stem here', answer: 'a', explanation: 'overall explanation', skill: 'application',
  choices: [
    { id: 'a', text: '1', explanation: 'right because reasons' },
    { id: 'b', text: '2', explanation: 'wrong because reasons', trap: 'other' },
    { id: 'c', text: '3', explanation: 'wrong because reasons', trap: 'other' },
    { id: 'd', text: '4', explanation: 'wrong because reasons', trap: 'other' },
  ], ...o,
})
const tbs = (id: string, parts: unknown[], o: Record<string, unknown> = {}) => JSON.stringify({ id, section: 'FAR', unitId: 'far-u1', moduleIds: ['far-x'], pool: 'practice', title: 't', minutes: 10, skill: 'application', instructions: 'i', parts, ...o })
const S = { '/content/sections/far.yaml': section() }
const errs = (files: Record<string, string>) => buildContent({ ...S, ...files }).errors.join('\n')

describe('buildContent catches', () => {
  it('answer key not among choices (letter e) / only 3 choices / duplicate choice ids', () => {
    expect(errs({ '/content/far/modules/far-x/questions.json': JSON.stringify([mcq('far-x-1', { answer: 'e' })]) })).toMatch(/answer/)
    expect(errs({ '/content/far/modules/far-x/questions.json': JSON.stringify([mcq('far-x-1', { choices: mcq('x').choices.slice(0, 3) })]) })).toMatch(/choices/)
    const dup = mcq('far-x-1'); (dup.choices as { id: string }[])[1] = { ...(dup.choices as object[])[1], id: 'a' } as { id: string }
    expect(errs({ '/content/far/modules/far-x/questions.json': JSON.stringify([dup]) })).toMatch(/duplicate choice ids/)
  })
  it('duplicate ids across files (question vs question, question vs flashcard, question vs TBS)', () => {
    const e = errs({
      '/content/far/modules/far-x/questions.json': JSON.stringify([mcq('far-x-1')]),
      '/content/far/modules/far-y/questions.json': JSON.stringify([mcq('far-x-1', { moduleId: 'far-y' })]),
      '/content/far/modules/far-y/flashcards.json': JSON.stringify([{ id: 'far-x-1', front: 'fff', back: 'b' }]),
    })
    expect(e.match(/Duplicate id "far-x-1"/g)?.length).toBe(2)
  })
  it('malformed JSON / YAML / non-array files are reported, not thrown', () => {
    const r = buildContent({ ...S, '/content/far/modules/far-x/questions.json': '[{oops', '/content/far/modules/far-y/flashcards.json': '{"a":1}', '/content/sections/aud.yaml': 'id: [unclosed' })
    expect(r.errors.length).toBeGreaterThanOrEqual(3)
  })
  it('TBS with a dropdown answer missing from options / research answer not in excerpts / unbalanced JE are caught', () => {
    const e = errs({
      '/content/far/tbs/far-t1.json': tbs('far-t1', [{ kind: 'dropdown', id: 'p', prompt: 'p', options: ['A', 'B'], rows: [{ id: 'r', label: 'l', answer: 'C', explanation: 'because' }] }]),
      '/content/far/tbs/far-t2.json': tbs('far-t2', [{ kind: 'research', id: 'p', prompt: 'p', excerpts: [{ id: 'e1', citation: 'c', text: 't' }, { id: 'e2', citation: 'c', text: 't' }], answer: 'e3', explanation: 'because' }]),
      '/content/far/tbs/far-t3.json': tbs('far-t3', [{ kind: 'journal', id: 'p', prompt: 'p', accounts: ['Cash', 'Rev'], lines: [{ account: 'Cash', debit: 1 }, { account: 'Rev', credit: 2 }], explanation: 'because' }]),
    })
    expect(e).toMatch(/not in options/)
    expect(e).toMatch(/research answer not among excerpts/)
    expect(e).toMatch(/does not balance/)
  })
  it('TBS part with no gradable cells is caught (rows min 1) ...', () => {
    expect(errs({ '/content/far/tbs/far-t1.json': tbs('far-t1', [{ kind: 'numeric', id: 'p', prompt: 'p', rows: [] }]) })).toMatch(/rows/)
  })
})

describe('buildContent does NOT catch', () => {
  it('a doc-review part made only of text segments (0 gradable cells) -> TBS scores 0/0', () => {
    const r = buildContent({ ...S, '/content/far/tbs/far-t1.json': tbs('far-t1', [{ kind: 'docreview', id: 'p', prompt: 'p', segments: [{ text: 'only text' }] }]) })
    expect(r.errors.filter((e) => e.includes('far-t1'))).toEqual([])
    const s = scoreTbs(r.bundle.tbs['far-t1'], {})
    expect([s.earned, s.possible, s.percent]).toEqual([0, 0, 0])
  })
  it('a doc-review segment that has BOTH text and id silently becomes plain text (union picks {text}, strips id)', () => {
    const r = buildContent({ ...S, '/content/far/tbs/far-t1.json': tbs('far-t1', [{ kind: 'docreview', id: 'p', prompt: 'p', segments: [{ text: 'x', id: 's1', original: 'a', options: ['a', 'b'], answer: 'b', explanation: 'because' }] }]) })
    expect(r.errors.filter((e) => e.includes('far-t1'))).toEqual([])
    expect(scoreTbs(r.bundle.tbs['far-t1'], {}).possible).toBe(0)
  })
  it('duplicate part ids / row ids inside one TBS (responses collide)', () => {
    const part = (id: string) => ({ kind: 'numeric', id, prompt: 'p', rows: [{ id: 'r', label: 'l', answer: 100, explanation: 'because' }, { id: 'r', label: 'l2', answer: 200, explanation: 'because' }] })
    const r = buildContent({ ...S, '/content/far/tbs/far-t1.json': tbs('far-t1', [part('p'), part('p')]) })
    expect(r.errors.filter((e) => e.includes('far-t1'))).toEqual([])
    // Impossible to get 100%: rows r (answer 1) and r (answer 2) share one input value
    const best = Math.max(...['100', '200'].map((v) => scoreTbs(r.bundle.tbs['far-t1'], { p: { kind: 'numeric', values: { r: v } } }).percent))
    expect(best).toBe(0.5)
  })
  it('the same item twice in an exam testlet / across testlets', () => {
    const r = buildContent({
      ...S,
      '/content/far/exam-questions/x.json': JSON.stringify([mcq('far-e-1', { pool: 'exam', moduleId: 'far-x' })]),
      '/content/far/tbs/far-te.json': tbs('far-te', [{ kind: 'numeric', id: 'p', prompt: 'p', rows: [{ id: 'r', label: 'l', answer: 1, explanation: 'because' }] }], { pool: 'exam' }),
      '/content/far/exams/f1.json': JSON.stringify({ id: 'far-mock', section: 'FAR', title: 't', testlets: [{ kind: 'mcq', items: ['far-e-1'] }, { kind: 'tbs', items: ['far-te'] }] }),
      '/content/far/exams/f2.json': JSON.stringify({ id: 'far-mock', section: 'FAR', title: 't2', testlets: [{ kind: 'mcq', items: ['far-e-1'] }, { kind: 'tbs', items: ['far-te'] }] }),
    })
    const noScaffold = (e: string[]) => e.filter((x) => !x.includes('scaffold'))
    expect(noScaffold(r.errors)).toEqual([])
    expect(r.bundle.exams.filter((e) => e.id === 'far-mock')).toHaveLength(2) // duplicate exam-form ids accepted
    const r2 = buildContent({ ...S, '/content/far/exam-questions/x.json': JSON.stringify([mcq('far-e-1', { pool: 'exam', moduleId: 'far-x' })]), '/content/far/tbs/far-te.json': tbs('far-te', [{ kind: 'numeric', id: 'p', prompt: 'p', rows: [{ id: 'r', label: 'l', answer: 1, explanation: 'because' }] }], { pool: 'exam' }),
      '/content/sections/far.yaml': section().replace('{ kind: mcq, count: 1 }', '{ kind: mcq, count: 2 }'),
      '/content/far/exams/f1.json': JSON.stringify({ id: 'far-mock', section: 'FAR', title: 't', testlets: [{ kind: 'mcq', items: ['far-e-1', 'far-e-1'] }, { kind: 'tbs', items: ['far-te'] }] }) })
    expect(noScaffold(r2.errors)).toEqual([])
  })
  it('weighting {0,0} / negative, allocation min > max, breakAfterTestlet beyond last testlet', () => {
    expect(buildContent({ '/content/sections/far.yaml': section('', '{ mcq: 0, tbs: 0 }') }).errors.join()).not.toMatch(/weight/)
    expect(Number.isNaN(weightedPercent(1, 1, { mcq: 0, tbs: 0 }))).toBe(true)
    expect(buildContent({ '/content/sections/far.yaml': section('', '{ mcq: -50, tbs: 150 }') }).errors.join()).not.toMatch(/weight/)
    expect(buildContent({ '/content/sections/far.yaml': section(', breakAfterTestlet: 9', undefined, '{ min: 90, max: 10 }') }).errors.join()).not.toMatch(/allocation|break/)
  })
  it('exam-pool question whose module belongs to another section; TBS whose section != its unit section', () => {
    const r = buildContent({
      ...S, '/content/sections/aud.yaml': section().replace('id: FAR\n', 'id: AUD\n').replace('FAR-I', 'AUD-I').replace('far-u1', 'aud-u1').replace("far-x, title: 'Module X' }, { id: far-y", "aud-x, title: 'Module X' }, { id: aud-y"),
      '/content/far/tbs/far-t1.json': tbs('far-t1', [{ kind: 'numeric', id: 'p', prompt: 'p', rows: [{ id: 'r', label: 'l', answer: 1, explanation: 'because' }] }], { unitId: 'aud-u1', moduleIds: ['aud-x'] }),
    })
    expect(r.errors.filter((e) => e.includes('far-t1'))).toEqual([])
  })
  it('numeric tolerance can dwarf the answer (e.g. ratio 0.8 with default tolerance 1 accepts 0 and 1.8)', () => {
    const r = buildContent({ ...S, '/content/far/tbs/far-t1.json': tbs('far-t1', [{ kind: 'numeric', id: 'p', prompt: 'p', rows: [{ id: 'r', label: 'Quick ratio', answer: 0.8, explanation: 'because' }] }]) })
    expect(r.errors.filter((e) => e.includes('far-t1'))).toEqual([])
    expect(scoreTbs(r.bundle.tbs['far-t1'], { p: { kind: 'numeric', values: { r: '0' } } }).percent).toBe(1)
  })
})
