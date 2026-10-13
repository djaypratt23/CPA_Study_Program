// FSRS behaviour under the app's parameters (src/lib/srs.ts): intervals by confidence path, lapses, and
// retrievability on a fixed exam date.
import { fsrs, generatorParameters, Rating, forgetting_curve } from 'ts-fsrs'
import { gradeFromAttempt, needsRequeue, newCard, review, type StoredCard, type Confidence } from '../../../../src/lib/srs.ts'
const params = generatorParameters({ request_retention: 0.9, maximum_interval: 365, enable_fuzz: false })
console.log('params: retention', params.request_retention, 'max', params.maximum_interval, 'learning_steps', JSON.stringify(params.learning_steps), 'relearning_steps', JSON.stringify(params.relearning_steps), 'short-term', params.enable_short_term)
const t0 = new Date('2026-10-12T09:00:00Z')
const D = 86_400_000
const fmt = (ms: number) => (ms < D ? `${Math.round(ms / 60000)}m` : `${(ms / D).toFixed(1)}d`)
function path(label: string, steps: [boolean, Confidence][], examDay = 56) {
  let c: StoredCard | null = null
  let now = t0
  const out: string[] = []
  for (const [correct, conf] of steps) {
    if (!c && !needsRequeue(correct, conf)) { out.push('(not queued)'); break }
    c = review(c ?? newCard(now), gradeFromAttempt(correct, conf), now)
    const due = new Date(c.due)
    out.push(`${correct ? '✓' : '✗'}${conf[0]}→${fmt(due.getTime() - now.getTime())}`)
    now = due
  }
  const exam = new Date(t0.getTime() + examDay * D)
  let r = ''
  if (c) {
    const last = c.last_review ? new Date(c.last_review) : t0
    const elapsed = (exam.getTime() - last.getTime()) / D
    r = ` | last review day ${((last.getTime() - t0.getTime()) / D).toFixed(1)}, next due day ${((Date.parse(c.due) - t0.getTime()) / D).toFixed(1)}; R on exam day ${examDay} = ${elapsed >= 0 ? forgetting_curve(params.w, elapsed, c.stability).toFixed(3) : 'n/a'} (S=${c.stability.toFixed(1)}d)`
  }
  console.log(`${label.padEnd(48)} ${out.join('  ')}${r}`)
}
path('missed, then confident-correct ×6', [[false, 'confident'], [true, 'confident'], [true, 'confident'], [true, 'confident'], [true, 'confident'], [true, 'confident'], [true, 'confident']])
path('missed, then unsure-correct ×6', [[false, 'confident'], [true, 'unsure'], [true, 'unsure'], [true, 'unsure'], [true, 'unsure'], [true, 'unsure'], [true, 'unsure']])
path('correct guess, then confident ×5', [[true, 'guess'], [true, 'confident'], [true, 'confident'], [true, 'confident'], [true, 'confident'], [true, 'confident']])
path('unsure-correct first, then confident ×5', [[true, 'unsure'], [true, 'confident'], [true, 'confident'], [true, 'confident'], [true, 'confident'], [true, 'confident']])
path('confident-correct first (never queued)', [[true, 'confident']])
path('missed, confident ×3, lapse, confident ×3', [[false, 'confident'], [true, 'confident'], [true, 'confident'], [true, 'confident'], [false, 'confident'], [true, 'confident'], [true, 'confident'], [true, 'confident']])
path('lucky guess every time (correct+guess) ×6', [[true, 'guess'], [true, 'guess'], [true, 'guess'], [true, 'guess'], [true, 'guess'], [true, 'guess']])
// How many reviews does a confident-correct path need before the next due date passes the exam?
for (const examDay of [28, 56, 84, 112]) {
  let c = review(newCard(t0), Rating.Again, t0)
  let now = new Date(c.due)
  let n = 0
  while (Date.parse(c.due) - t0.getTime() < examDay * D && n < 30) { c = review(c, Rating.Good, now); now = new Date(c.due); n++ }
  const last = new Date(c.last_review!)
  const R = forgetting_curve(params.w, (t0.getTime() + examDay * D - last.getTime()) / D, c.stability)
  console.log(`exam in ${examDay} d: a missed item answered confidently each time it is due gets ${n} reviews; last on day ${((last.getTime() - t0.getTime()) / D).toFixed(1)}, next due day ${((Date.parse(c.due) - t0.getTime()) / D).toFixed(1)} (after the exam); predicted recall on exam day ${R.toFixed(3)}`)
}
// Flashcard: 'Good' from new
let f = review(newCard(t0), Rating.Good, t0)
console.log(`new flashcard rated Good → due in ${fmt(Date.parse(f.due) - t0.getTime())}; then Good → ${fmt(Date.parse(review(f, Rating.Good, new Date(f.due)).due) - Date.parse(f.due))}`)
f = review(newCard(t0), Rating.Easy, t0)
console.log(`new flashcard rated Easy → due in ${fmt(Date.parse(f.due) - t0.getTime())}`)
