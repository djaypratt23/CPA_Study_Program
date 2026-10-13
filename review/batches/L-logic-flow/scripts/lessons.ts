// Lesson length realism and lesson structure: words, embedded checks, worked/faded examples vs the `minutes` value;
// pre-question counts; practice items per lesson objective.
import { loadContent } from '../../../../scripts/load-content.ts'
const { bundle } = loadContent()
const rows: { id: string; min: number; words: number; checks: number; worked: number; faded: number; pre: number; est: number }[] = []
for (const m of bundle.modules) {
  const l = bundle.lessons[m.id]
  if (!l) continue
  const body = l.body
  const fences = [...body.matchAll(/```(\w+)[^\n]*\n([\s\S]*?)```/g)]
  const checks = fences.filter((f) => f[1] === 'check').reduce((s, f) => s + f[2].split(/\s+/).filter(Boolean).length, 0)
  const worked = fences.filter((f) => f[1] === 'worked').length
  const faded = fences.filter((f) => f[1] === 'faded').length
  const text = [l.bigIdea.what, l.bigIdea.why, l.bigIdea.example, ...l.keyTakeaways, body].join(' ')
  const words = text.split(/\s+/).filter(Boolean).length
  const pre = l.preQuestions.length
  // Estimate: 130 wpm for dense technical text (incl. tables/worked blocks), 1.5 min per embedded/pre question, +2 min per faded example to compute.
  const est = words / 130 + 1.5 * (checks + pre) + 2 * faded
  rows.push({ id: m.id, min: l.minutes, words, checks, worked, faded, pre, est })
}
for (const sec of ['far', 'aud', 'reg', 'tcp']) {
  const r = rows.filter((x) => x.id.startsWith(sec + '-'))
  const sum = (k: keyof (typeof r)[number]) => r.reduce((s, x) => s + (x[k] as number), 0)
  const ratio = r.map((x) => x.est / x.min).sort((a, b) => a - b)
  console.log(`${sec.toUpperCase()}: ${r.length} lessons; stated ${sum('min')} min, estimated ${Math.round(sum('est'))} min (median est/stated ${ratio[Math.floor(ratio.length / 2)].toFixed(2)}, max ${ratio.at(-1)!.toFixed(2)}); words mean ${Math.round(sum('words') / r.length)}; checks ${sum('checks')}, pre-questions ${sum('pre')} (lessons with 0 pre: ${r.filter((x) => !x.pre).length}), worked ${sum('worked')}, faded ${sum('faded')} (lessons with 0 faded: ${r.filter((x) => !x.faded).length})`)
  const worst = [...r].sort((a, b) => b.est / b.min - a.est / a.min).slice(0, 4)
  console.log('   longest vs stated: ' + worst.map((x) => `${x.id} ${x.min}→~${Math.round(x.est)} min (${x.words} words)`).join('; '))
}
