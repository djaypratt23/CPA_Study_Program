import { useLiveQuery } from 'dexie-react-hooks'
import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PageHeader } from '../components/ui'
import { content, getSection, practiceQuestions } from '../content'
import { db } from '../db'
import { createQuizSession } from '../db/quizzes'
import { useSettingsOrDefault } from '../hooks/useStore'
import { buildQuiz, historyByItem, matchesStatus, type StatusFilter } from '../lib/quiz'

const STATUS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'new', label: 'New (unseen)' },
  { value: 'missed', label: 'Missed last time' },
  { value: 'lowconf', label: 'Low confidence' },
  { value: 'flagged', label: 'Flagged' },
]

export default function PracticeBuilder() {
  const settings = useSettingsOrDefault()
  const nav = useNavigate()
  const section = getSection(settings.activeSection) ?? content.sections[0]
  const attempts = useLiveQuery(() => db.attempts.toArray(), [])
  const metaRows = useLiveQuery(() => db.itemMeta.toArray(), [])
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [status, setStatus] = useState<StatusFilter>('all')
  const [count, setCount] = useState(15)
  const [mode, setMode] = useState<'tutor' | 'test'>('tutor')
  const [timed, setTimed] = useState(false)

  const pool = useMemo(() => practiceQuestions(section.id), [section.id])
  const hist = useMemo(() => historyByItem(attempts ?? []), [attempts])
  const meta = useMemo(() => new Map((metaRows ?? []).map((m) => [m.itemId, m])), [metaRows])
  const withQuestions = new Set(pool.map((q) => q.moduleId))
  const matching = pool.filter((q) => selected.has(q.moduleId) && matchesStatus(q, status, hist, meta)).length

  const toggle = (ids: string[]) =>
    setSelected((s) => {
      const n = new Set(s)
      const all = ids.every((i) => n.has(i))
      ids.forEach((i) => (all ? n.delete(i) : n.add(i)))
      return n
    })

  const start = async () => {
    const qs = buildQuiz(pool, { moduleIds: [...selected], status, count }, hist, meta)
    if (!qs.length) return
    const mixed = new Set(qs.map((q) => q.moduleId)).size > 1
    const id = await createQuizSession({
      section: section.id,
      title: `Custom ${mode} set (${qs.length})`,
      mode,
      mixed,
      itemIds: qs.map((q) => q.id),
      timeLimitMs: timed ? qs.length * 90_000 : undefined,
    })
    nav(`/quiz/${id}`)
  }

  return (
    <div>
      <PageHeader title="Practice" subtitle="Build a custom multiple-choice set, or use a quick start." />
      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <Link to="/practice/start?due=1" className="card hover:border-blue-400">
          <div className="font-semibold">Review due questions</div>
          <div className="text-sm muted">Missed & low-confidence items the scheduler says are due.</div>
        </Link>
        <Link to={`/practice/start?mixed=${section.id}`} className="card hover:border-blue-400">
          <div className="font-semibold">Mixed practice</div>
          <div className="text-sm muted">20 interleaved questions from everything you’ve studied.</div>
        </Link>
        <Link to="/tbs" className="card hover:border-blue-400">
          <div className="font-semibold">Simulations</div>
          <div className="text-sm muted">Task-based simulations with partial credit.</div>
        </Link>
      </div>

      <section className="card space-y-5" aria-labelledby="builder">
        <h2 id="builder" className="h2">
          Custom set — {section.id}
        </h2>
        <fieldset>
          <legend className="label">Topics</legend>
          <div className="space-y-3">
            {section.areas.map((a) => {
              const areaMods = a.units.flatMap((u) => u.modules.map((m) => m.id)).filter((id) => withQuestions.has(id))
              if (!areaMods.length) return null
              return (
                <div key={a.id}>
                  <label className="flex items-center gap-2 font-semibold">
                    <input type="checkbox" className="h-6 w-6 shrink-0 accent-blue-700" checked={areaMods.every((m) => selected.has(m))} onChange={() => toggle(areaMods)} />
                    {a.title}
                  </label>
                  <div className="mt-1 ml-7 grid gap-1 sm:grid-cols-2">
                    {a.units.flatMap((u) =>
                      u.modules
                        .filter((m) => withQuestions.has(m.id))
                        .map((m) => (
                          <label key={m.id} className="flex items-start gap-2 text-sm">
                            <input type="checkbox" className="h-6 w-6 shrink-0 accent-blue-700" checked={selected.has(m.id)} onChange={() => toggle([m.id])} />
                            {m.title}
                          </label>
                        )),
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </fieldset>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="status">
              Question status
            </label>
            <select id="status" className="input" value={status} onChange={(e) => setStatus(e.target.value as StatusFilter)}>
              {STATUS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="count">
              Number of questions
            </label>
            <input id="count" type="number" min={1} max={100} className="input" value={count} onChange={(e) => setCount(Math.max(1, Number(e.target.value) || 1))} />
          </div>
        </div>

        <fieldset>
          <legend className="label">Mode</legend>
          <div className="grid grid-cols-2 gap-2">
            {(['tutor', 'test'] as const).map((m) => (
              <label key={m} className={`card flex cursor-pointer items-start gap-2 p-3 ${mode === m ? 'border-blue-600 ring-2 ring-blue-600/30' : ''}`}>
                <input type="radio" name="mode" className="mt-1 accent-blue-700" checked={mode === m} onChange={() => setMode(m)} />
                <span>
                  <span className="font-semibold capitalize">{m}</span>
                  <span className="block text-xs muted">{m === 'tutor' ? 'Explanation after every question' : 'Exam-like: results at the end'}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" className="h-6 w-6 shrink-0 accent-blue-700" checked={timed} onChange={(e) => setTimed(e.target.checked)} />
          Timed (90 seconds per question — close to exam pace)
        </label>

        <div className="flex flex-wrap items-center gap-3">
          <button className="btn-primary" disabled={!matching} onClick={start}>
            Start {Math.min(count, matching)} questions
          </button>
          <span className="text-sm muted">{selected.size ? `${matching} match your filters` : 'Choose at least one topic'}</span>
        </div>
      </section>
    </div>
  )
}
