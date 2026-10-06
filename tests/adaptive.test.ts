import { describe, expect, it } from 'vitest'
import type { Mcq } from '../src/content/schema'
import { orderUnits, type PlanModule } from '../src/lib/planner'
import { buildDiagnostic } from '../src/lib/quiz'
import { unmasteredPrerequisites, type ModuleState } from '../src/lib/studyState'

const mod = (id: string, unitId: string, over: Partial<PlanModule> = {}): PlanModule => ({
  id,
  title: id,
  unitId,
  minutes: 15,
  lessonDone: false,
  practiceDone: false,
  masteryDays: 0,
  ...over,
})

describe('adaptive unit order (P1-13)', () => {
  const modules = [mod('a1', 'u1'), mod('b1', 'u2'), mod('c1', 'u3'), mod('d1', 'u4')]

  it('keeps course order without priorities', () => {
    expect(orderUnits({ modules })).toEqual(['u1', 'u2', 'u3', 'u4'])
  })

  it('puts untouched units in priority order, ties in course order', () => {
    expect(orderUnits({ modules, unitPriority: { u1: 5, u2: 20, u3: 5, u4: 12 } })).toEqual(['u2', 'u4', 'u1', 'u3'])
  })

  it('keeps started units first so work in progress is not reshuffled', () => {
    const started = [mod('a1', 'u1'), mod('b1', 'u2'), mod('c1', 'u3', { lessonDone: true }), mod('d1', 'u4')]
    expect(orderUnits({ modules: started, unitPriority: { u1: 1, u2: 9, u3: 0, u4: 5 } })).toEqual(['u3', 'u2', 'u4', 'u1'])
  })
})

const q = (id: string, moduleId: string): Mcq =>
  ({ id, moduleId, pool: 'practice', stem: 'stem text', choices: [], answer: 'a', explanation: 'explanation', skill: 'application', difficulty: 2, calc: false, needsReview: false }) as unknown as Mcq

describe('stratified diagnostic (P1-13)', () => {
  const pool: Mcq[] = []
  for (const m of ['m1', 'm2', 'm3', 'm4']) for (let i = 0; i < 20; i++) pool.push(q(`${m}-${i}`, m))
  pool.push({ ...q('exam-1', 'm1'), pool: 'exam' } as Mcq)
  const areas = [
    { id: 'A', weight: 30, moduleIds: ['m1', 'm2'] },
    { id: 'B', weight: 10, moduleIds: ['m3', 'm4'] },
  ]

  it('allocates items by area weight and spreads them across modules', () => {
    const items = buildDiagnostic(pool, areas, new Map(), 40, 1)
    const inA = items.filter((x) => ['m1', 'm2'].includes(x.moduleId))
    expect(items).toHaveLength(40)
    expect(inA).toHaveLength(30)
    expect(inA.filter((x) => x.moduleId === 'm1')).toHaveLength(15)
    expect(new Set(items.map((x) => x.id)).size).toBe(40)
    expect(items.some((x) => x.pool === 'exam')).toBe(false)
  })

  it('prefers questions the learner has not seen', () => {
    const hist = new Map(pool.filter((x) => x.moduleId === 'm3').slice(0, 15).map((x) => [x.id, { attempts: 1, lastCorrect: true, correctCount: 1 }]))
    const items = buildDiagnostic(pool, areas, hist as never, 40, 2)
    const m3 = items.filter((x) => x.moduleId === 'm3')
    expect(m3.every((x) => !hist.has(x.id))).toBe(true)
  })
})

const ms = (id: string, unitId: string, lessonDone: boolean, status: string): ModuleState =>
  ({ id, title: id, unitId, areaId: 'A', available: true, lessonDone, mastery: { status, qualifyingDays: [] }, practiceCount: 0 }) as unknown as ModuleState

describe('mastery gating warning (P1-13)', () => {
  const modules = [ms('a', 'u1', true, 'learning'), ms('b', 'u1', true, 'mastered'), ms('c', 'u2', false, 'not-started'), ms('d', 'u2', false, 'not-started')]

  it('warns when starting a new unit with studied modules not yet mastered', () => {
    expect(unmasteredPrerequisites(modules, 'c').map((m) => m.id)).toEqual(['a'])
  })

  it('does not warn inside a unit already begun, or for a completed lesson', () => {
    const begun = modules.map((m) => (m.id === 'd' ? { ...m, lessonDone: true } : m))
    expect(unmasteredPrerequisites(begun, 'c')).toEqual([])
    expect(unmasteredPrerequisites(modules, 'a')).toEqual([])
  })
})
