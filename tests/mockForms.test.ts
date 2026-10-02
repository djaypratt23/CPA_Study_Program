import { describe, expect, it } from 'vitest'
import { loadContent } from '../scripts/load-content'

// P1-9: additional mock forms built from the exam pool (option b: each later form reuses at most half of
// form 1's multiple-choice questions, and later forms share none with each other).

const { bundle } = loadContent()
const sections = [...new Set(bundle.exams.map((e) => e.section))]
const mcqs = (formId: string) => bundle.exams.find((e) => e.id === formId)!.testlets.filter((t) => t.kind === 'mcq').flatMap((t) => t.items)
const tbsIds = (formId: string) => bundle.exams.find((e) => e.id === formId)!.testlets.filter((t) => t.kind === 'tbs').flatMap((t) => t.items)

describe.each(sections)('%s mock forms', (section) => {
  const forms = bundle.exams.filter((e) => e.section === section).map((e) => e.id).sort()
  const first = forms[0]
  const later = forms.slice(1)

  it.each(later)('%s shares at most half its MCQs with form 1', (id) => {
    const shared = mcqs(id).filter((q) => mcqs(first).includes(q))
    expect(shared.length).toBeLessThanOrEqual(mcqs(id).length / 2)
  })

  it('later forms share no MCQs or simulations with each other', () => {
    for (let i = 0; i < later.length; i++)
      for (let j = i + 1; j < later.length; j++) {
        expect(mcqs(later[i]).filter((q) => mcqs(later[j]).includes(q))).toEqual([])
        expect(tbsIds(later[i]).filter((t) => tbsIds(later[j]).includes(t))).toEqual([])
      }
  })

  it.each(forms)('%s keeps each area within its Blueprint allocation (±5 points)', (id) => {
    const sec = bundle.sections.find((s) => s.id === section)!
    const areaOf = new Map(bundle.modules.map((m) => [m.id, m.areaId]))
    const items = mcqs(id)
    for (const a of sec.areas) {
      const share = (100 * items.filter((q) => areaOf.get(bundle.questions[q].moduleId) === a.id).length) / items.length
      expect(share, `${id} ${a.id}`).toBeGreaterThanOrEqual(a.allocation.min - 5)
      expect(share, `${id} ${a.id}`).toBeLessThanOrEqual(a.allocation.max + 5)
    }
  })
})
