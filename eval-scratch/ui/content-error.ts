// What happens to the bundle when one content file is invalid (the app only console.warns).
import fs from 'node:fs'
import path from 'node:path'
import { buildContent } from '../../src/content/build'
const root = path.resolve(import.meta.dirname, '../../content')
const raw: Record<string, string> = {}
const walk = (d: string) => {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f)
    if (fs.statSync(p).isDirectory()) walk(p)
    else if (/\.(md|json|ya?ml)$/.test(f)) raw['/content/' + path.relative(root, p)] = fs.readFileSync(p, 'utf8')
  }
}
walk(root)
const qf = '/content/far/modules/far-conceptual-framework/questions.json'
const qs = JSON.parse(raw[qf])
const victim = qs[0].id
delete qs[0].answer
const mutated = { ...raw, [qf]: JSON.stringify(qs) }
const r = buildContent(mutated)
console.log('errors:', r.errors.length, r.errors.slice(0, 2).map((e) => e.slice(0, 160)))
console.log('victim question present:', !!r.bundle.questions[victim], '| other questions from same file present:', qs.slice(1).filter((q: { id: string }) => r.bundle.questions[q.id]).length, 'of', qs.length - 1)
console.log('lesson still present:', !!r.bundle.lessons['far-conceptual-framework'], '| lesson preQuestions reference victim:', r.bundle.lessons['far-conceptual-framework']?.preQuestions.includes(victim))
// Broken YAML in a section file
const sf = '/content/sections/far.yaml'
const r2 = buildContent({ ...raw, [sf]: raw[sf].replace('durationMinutes: 240', 'durationMinutes: [') })
console.log('broken far.yaml -> errors:', r2.errors.length, '| FAR section present:', r2.bundle.sections.some((s) => s.id === 'FAR'), '| sections:', r2.bundle.sections.map((s) => s.id).join(','))
