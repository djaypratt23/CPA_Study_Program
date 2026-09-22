import { useState } from 'react'
import { content } from '../content'
import type { SectionId } from '../content/schema'
import { saveSettings } from '../db'
import { useSettingsOrDefault } from '../hooks/useStore'
import { WEEKDAY_NAMES, formatMinutes } from '../lib/dates'

const METHOD = [
  { icon: '💡', title: 'Big idea first', text: 'Every module starts with what the rule is, why it exists, and a real example — then the mechanics.' },
  { icon: '✎', title: 'Answer before you read', text: 'Pre-questions and in-lesson checks make you retrieve. Struggling a little is how memory forms.' },
  { icon: '🎯', title: 'Rate your confidence', text: 'Before seeing the answer, tap Guess, Unsure, or Confident. Lucky guesses come back like misses.' },
  { icon: '🔁', title: 'Spaced review', text: 'Flashcards and missed questions return right before you would forget them. A few minutes daily beats cramming.' },
  { icon: '✅', title: 'Mastery, not exposure', text: 'A module counts as mastered only after 80%+ on mixed practice on two different days.' },
  { icon: '▶', title: 'Just press Continue', text: 'The home screen always shows one next step and today’s plan. Your spot is saved automatically.' },
]

const DISCIPLINES: SectionId[] = ['BAR', 'ISC', 'TCP']

export default function Onboarding() {
  const current = useSettingsOrDefault()
  const [step, setStep] = useState(current.walkthroughSeen ? 1 : 0)
  const [first, setFirst] = useState<SectionId>(current.activeSection)
  const [discipline, setDiscipline] = useState<SectionId>(current.sectionOrder.find((s) => DISCIPLINES.includes(s)) ?? 'TCP')
  const [examDate, setExamDate] = useState(current.examDates[current.activeSection] ?? '')
  const [minutes, setMinutes] = useState<number[]>(current.minutesByWeekday)
  const core: SectionId[] = ['FAR', 'AUD', 'REG']
  const order = [first, ...core.filter((s) => s !== first), discipline].filter((s, i, a) => a.indexOf(s) === i) as SectionId[]
  const weekly = minutes.reduce((a, b) => a + b, 0)

  const finish = async () => {
    await saveSettings({
      onboarded: true,
      walkthroughSeen: true,
      activeSection: first,
      sectionOrder: order,
      examDates: { ...current.examDates, ...(examDate ? { [first]: examDate } : {}) },
      minutesByWeekday: minutes,
    })
    // The router gate redirects to the dashboard as soon as the saved settings are observed.
  }

  return (
    <div className="mx-auto min-h-dvh max-w-xl px-4 py-8">
      <div className="mb-6 flex items-center gap-3">
        <img src={`${import.meta.env.BASE_URL}icon.svg`} alt="" className="h-10 w-10" />
        <div>
          <h1 className="h1">CPA Study Program</h1>
          <p className="muted text-sm">Step {step + 1} of 3</p>
        </div>
      </div>

      {step === 0 && (
        <section aria-labelledby="how">
          <h2 id="how" className="h2 mb-1">
            How this works (45 seconds)
          </h2>
          <p className="muted mb-4 text-sm">The method is built on what learning research shows actually works.</p>
          <ol className="space-y-3">
            {METHOD.map((m, i) => (
              <li key={i} className="card flex gap-3">
                <span className="text-2xl" aria-hidden="true">
                  {m.icon}
                </span>
                <div>
                  <div className="font-semibold">{m.title}</div>
                  <div className="text-sm muted">{m.text}</div>
                </div>
              </li>
            ))}
          </ol>
          <button className="btn-primary mt-6 w-full" onClick={() => setStep(1)}>
            Got it — set up my plan
          </button>
        </section>
      )}

      {step === 1 && (
        <section className="space-y-5" aria-labelledby="sections">
          <h2 id="sections" className="h2">
            Your exam sections
          </h2>
          <div>
            <label className="label" htmlFor="first">
              Which section are you taking first?
            </label>
            <select id="first" className="input" value={first} onChange={(e) => setFirst(e.target.value as SectionId)}>
              {content.sections.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.id} — {s.name}
                  {s.status === 'scaffold' ? ' (preview content)' : ''}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="disc">
              Which discipline section will you take?
            </label>
            <select id="disc" className="input" value={discipline} onChange={(e) => setDiscipline(e.target.value as SectionId)}>
              {DISCIPLINES.map((d) => (
                <option key={d} value={d}>
                  {d} — {content.sections.find((s) => s.id === d)?.name ?? d}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="date">
              {first} exam date (you can change it later)
            </label>
            <input id="date" type="date" className="input" value={examDate} onChange={(e) => setExamDate(e.target.value)} />
            <p className="mt-1 text-xs muted">No date yet? Leave it blank — you will get a rolling 4-week plan until you set one.</p>
          </div>
          <p className="text-sm muted">Planned order: {order.join(' → ')}</p>
          <div className="flex gap-2">
            {!current.walkthroughSeen && (
              <button className="btn-secondary" onClick={() => setStep(0)}>
                Back
              </button>
            )}
            <button className="btn-primary flex-1" onClick={() => setStep(2)}>
              Next
            </button>
          </div>
        </section>
      )}

      {step === 2 && (
        <section className="space-y-5" aria-labelledby="time">
          <h2 id="time" className="h2">
            When can you study?
          </h2>
          <p className="text-sm muted">Be realistic — an honest plan you can keep beats an ambitious one you can’t. Short weekday sessions count.</p>
          <div className="space-y-2">
            {WEEKDAY_NAMES.map((d, i) => (
              <div key={d} className="flex items-center gap-3">
                <label htmlFor={`m${i}`} className="w-10 text-sm font-semibold">
                  {d}
                </label>
                <input
                  id={`m${i}`}
                  type="range"
                  min={0}
                  max={360}
                  step={15}
                  value={minutes[i]}
                  onChange={(e) => setMinutes((m) => m.map((v, j) => (j === i ? Number(e.target.value) : v)))}
                  className="flex-1 accent-blue-700"
                  aria-valuetext={formatMinutes(minutes[i])}
                />
                <span className="w-20 text-right text-sm tabular-nums">{minutes[i] ? formatMinutes(minutes[i]) : 'Off'}</span>
              </div>
            ))}
          </div>
          <p className="text-sm">
            About <strong>{formatMinutes(weekly)}</strong> per week.
          </p>
          <div className="flex gap-2">
            <button className="btn-secondary" onClick={() => setStep(1)}>
              Back
            </button>
            <button className="btn-primary flex-1" onClick={finish}>
              Build my plan
            </button>
          </div>
        </section>
      )}
    </div>
  )
}
