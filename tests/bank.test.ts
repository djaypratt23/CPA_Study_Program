import { describe, expect, it } from 'vitest'
import { loadContent } from '../scripts/load-content'

// P2-8 bank expansion: every in-scope module has a minimum number of in-scope practice
// MCQs, and no single difficulty level dominates a section's bank.

const { bundle } = loadContent()

/** Raised section by section as each expansion round lands. */
const MIN_PRACTICE_PER_MODULE: Record<string, number> = { FAR: 20, AUD: 20, REG: 20, TCP: 20 }
/** Task-based simulations per section (P2-8 target: 60), raised as each round lands. */
const MIN_TBS: Record<string, number> = { FAR: 60, AUD: 40, REG: 36, TCP: 36 }
/** Sections whose difficulty levels have been spread (1–3). */
const DIFFICULTY_SPREAD = new Set(['FAR', 'AUD', 'REG', 'TCP'])

describe.each(Object.keys(MIN_PRACTICE_PER_MODULE))('%s bank', (section) => {
  const modules = bundle.modules.filter((m) => m.section === section && !m.optional)
  const items = Object.values(bundle.questions).filter((q) => q.pool !== 'lesson' && !q.optional && modules.some((m) => m.id === q.moduleId))

  it.each(modules.map((m) => m.id))(`%s has at least ${MIN_PRACTICE_PER_MODULE[section]} practice MCQs`, (id) => {
    const n = items.filter((q) => q.moduleId === id && q.pool === 'practice').length
    expect(n).toBeGreaterThanOrEqual(MIN_PRACTICE_PER_MODULE[section])
  })

  it(`has at least ${MIN_TBS[section]} task-based simulations`, () => {
    expect(Object.values(bundle.tbs).filter((t) => t.section === section).length).toBeGreaterThanOrEqual(MIN_TBS[section])
  })

  it.runIf(DIFFICULTY_SPREAD.has(section))('spreads difficulty: no level above 60% of items', () => {
    for (const level of [1, 2, 3]) expect(items.filter((q) => q.difficulty === level).length / items.length).toBeLessThanOrEqual(0.6)
  })
})
