/**
 * Keeps the correct-answer letter roughly uniform across a question file by
 * swapping the correct choice's position with an under-used letter.
 * Choice ids are positional (a–d), so swapping text/explanation/trap between
 * two positions is safe as long as no text refers to a letter.
 * Usage: npx tsx scripts/rebalance-answers.ts content/far/modules/<id>/questions.json ...
 */
import { readFileSync, writeFileSync } from 'node:fs'

type Choice = { id: string; text: string; explanation: string; trap?: string }
type Q = { id: string; answer: string; choices: Choice[] }

const LETTERS = ['a', 'b', 'c', 'd']

for (const file of process.argv.slice(2)) {
  const qs = JSON.parse(readFileSync(file, 'utf8')) as Q[]
  const count = (l: string) => qs.filter((q) => q.answer === l).length
  const target = Math.ceil(qs.length / 4)
  for (const q of qs) {
    const over = count(q.answer) > target
    const under = LETTERS.filter((l) => count(l) < target - 0).sort((x, y) => count(x) - count(y))[0]
    if (!over || !under || under === q.answer) continue
    const from = q.choices.findIndex((c) => c.id === q.answer)
    const to = q.choices.findIndex((c) => c.id === under)
    const a = q.choices[from]
    const b = q.choices[to]
    q.choices[from] = { ...b, id: a.id }
    q.choices[to] = { ...a, id: b.id }
    q.answer = under
  }
  writeFileSync(file, JSON.stringify(qs, null, 2) + '\n')
  console.log(file, LETTERS.map((l) => `${l}:${count(l)}`).join(' '))
}
