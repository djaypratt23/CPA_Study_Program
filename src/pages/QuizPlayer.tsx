import { useLiveQuery } from 'dexie-react-hooks'
import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Calculator from '../components/Calculator'
import Clock from '../components/Timer'
import Icon from '../components/Icon'
import KeyNav from '../components/KeyNav'
import McqView from '../components/McqView'
import { PageHeader, pct } from '../components/ui'
import { content, getModule } from '../content'
import { db } from '../db'
import { recordMcqAttempt, setLastLocation } from '../db/actions'
import type { QuizSession } from '../db/types'
import { quizDeadline, quizTimeLeftMs } from '../lib/examClock'
import { summarizeQuiz } from '../lib/quizScoring'
import type { Confidence } from '../lib/srs'

export default function QuizPlayer() {
  const { sessionId = '' } = useParams()
  const session = useLiveQuery(() => db.quizSessions.get(sessionId).then((s) => s ?? null), [sessionId])
  const [calc, setCalc] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const qStart = useRef(Date.now())
  const loadedElapsed = useRef(false)
  const [now, setNow] = useState(() => Date.now())
  const finishing = useRef(false)
  const submitting = useRef(false)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (session && !loadedElapsed.current) {
      loadedElapsed.current = true
      setElapsed(session.elapsedMs)
      if (!session.finishedAt) setLastLocation(`/quiz/${session.id}`, session.title)
    }
  }, [session])

  const finished = !!session?.finishedAt
  useEffect(() => {
    if (!session || finished) return
    const t = setInterval(() => {
      setElapsed((e) => e + 1000)
      setNow(Date.now())
    }, 1000)
    return () => clearInterval(t)
  }, [session, finished])

  // Timed sets run on a wall-clock deadline, so leaving the page doesn't stop the clock.
  useEffect(() => {
    if (session && !finished && session.timeLimitMs && !session.endsAt) db.quizSessions.update(session.id, { endsAt: quizDeadline(session, Date.now()) })
  }, [session, finished])

  // Persist elapsed time periodically so resuming restores the clock.
  useEffect(() => {
    if (!session || finished || elapsed % 10000 !== 0 || elapsed === 0) return
    db.quizSessions.update(session.id, { elapsedMs: elapsed })
  }, [elapsed, session, finished])

  useEffect(() => {
    qStart.current = Date.now()
  }, [session?.index])

  // At the deadline a timed set submits itself (the finish function is bound after the early returns below).
  const autoSubmit = useRef<(() => unknown) | undefined>(undefined)
  const timeUp = !!session && !finished && !!session.endsAt && Date.parse(session.endsAt) <= now
  useEffect(() => {
    if (timeUp) autoSubmit.current?.()
  }, [timeUp])

  if (session === undefined) return <p className="muted">Loading…</p>
  if (!session)
    return (
      <div className="card">
        That practice set no longer exists.{' '}
        <Link to="/practice" className="text-blue-700 underline">
          Build a new one
        </Link>
      </div>
    )
  if (session.finishedAt) return <QuizResults session={session} />

  const q = content.questions[session.itemIds[session.index]]
  if (!q) return <p>Question missing.</p>
  const st = session.items[q.id]
  const isTest = session.mode === 'test'
  const revealed = !isTest && !!st.answeredAt
  const answeredCount = Object.values(session.items).filter((i) => (isTest ? i.choice && i.confidence : i.answeredAt)).length
  const last = session.index === session.itemIds.length - 1
  const section = getModule(q.moduleId)?.section ?? session.section
  const timeLeft = session.endsAt ? quizTimeLeftMs(session, now) : null

  // Field-level key paths, so quick successive writes (choice, then confidence) never overwrite each other.
  const patchItem = (patch: Partial<QuizSession['items'][string]>) =>
    db.quizSessions.update(session.id, Object.fromEntries(Object.entries(patch).map(([k, v]) => [`items.${q.id}.${k}`, v])) as never)
  const go = (i: number) => db.quizSessions.update(session.id, { index: i, elapsedMs: elapsed })

  const submitTutor = async (c: Confidence) => {
    if (submitting.current) return
    submitting.current = true
    try {
      // Read the stored choice: the rendered snapshot can lag a fast click.
      const cur = (await db.quizSessions.get(session.id))?.items[q.id]
      if (!cur?.choice || cur.answeredAt) return
      const timeMs = Date.now() - qStart.current
      const a = await recordMcqAttempt(q, {
        choice: cur.choice,
        confidence: c,
        timeMs,
        mode: session.mode === 'review' ? 'review' : 'tutor',
        mixed: session.mixed,
        sessionId: session.id,
        section,
      })
      await patchItem({ confidence: c, correct: a.correct, timeMs, answeredAt: a.at })
    } finally {
      submitting.current = false
    }
  }

  const finishTest = async () => {
    if (finishing.current) return
    finishing.current = true
    setBusy(true)
    const fresh = (await db.quizSessions.get(session.id)) ?? session
    for (const id of fresh.itemIds) {
      const it = fresh.items[id]
      const qq = content.questions[id]
      if (!qq || !it.choice) continue
      const a = await recordMcqAttempt(qq, {
        choice: it.choice,
        confidence: it.confidence ?? 'unsure',
        timeMs: it.timeMs,
        mode: 'test',
        mixed: session.mixed,
        sessionId: session.id,
        section,
      })
      fresh.items[id] = { ...it, correct: a.correct, answeredAt: a.at }
    }
    await db.quizSessions.update(session.id, { items: fresh.items, finishedAt: new Date().toISOString(), elapsedMs: elapsed })
  }

  const finishTutor = async () => {
    if (finishing.current) return
    finishing.current = true
    setBusy(true)
    await db.quizSessions.update(session.id, { finishedAt: new Date().toISOString(), elapsedMs: elapsed })
  }

  autoSubmit.current = isTest ? finishTest : finishTutor

  return (
    <div>
      <div className="sticky top-[57px] z-20 -mx-4 mb-4 flex items-center justify-between gap-2 border-b border-slate-200 bg-slate-50/95 px-4 py-2 backdrop-blur md:top-0 dark:border-slate-800 dark:bg-slate-950/95">
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold">{session.title}</div>
          <div className="text-xs muted">
            {isTest ? 'Test mode — feedback at the end' : session.mode === 'review' ? 'Review mode' : 'Tutor mode — instant feedback'} · {answeredCount}/{session.itemIds.length} answered
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Icon name="clock" className="h-4 w-4" />
          {timeLeft !== null ? <Clock ms={timeLeft} label="Time left" warn={timeLeft < 60000} /> : <Clock ms={elapsed} label="Elapsed" />}
          <button className="btn-ghost min-h-9 px-2" onClick={() => setCalc((c) => !c)} aria-pressed={calc} aria-label="Calculator">
            <Icon name="calc" />
          </button>
        </div>
      </div>

      {isTest && (
        <nav className="mb-4 flex flex-wrap gap-1" aria-label="Question navigator">
          {session.itemIds.map((id, i) => {
            const it = session.items[id]
            return (
              <button
                key={id}
                onClick={() => go(i)}
                className={`h-8 w-8 rounded text-xs font-semibold ${i === session.index ? 'ring-2 ring-blue-600' : ''} ${it.choice ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-800'}`}
                aria-label={`Question ${i + 1}${it.choice ? ', answered' : ''}`}
                aria-current={i === session.index}
              >
                {i + 1}
              </button>
            )
          })}
        </nav>
      )}

      <McqView
        key={q.id}
        q={q}
        index={session.index}
        total={session.itemIds.length}
        section={section}
        selected={st.choice}
        confidence={st.confidence}
        revealed={revealed}
        confidenceSubmits={!isTest}
        onSelect={(c) => patchItem({ choice: c })}
        onConfidence={(c) => (isTest ? patchItem({ confidence: c, timeMs: st.timeMs + (Date.now() - qStart.current) }) : submitTutor(c))}
        keyboard
      />
      <KeyNav onPrev={session.index > 0 ? () => go(session.index - 1) : undefined} onNext={!last ? () => go(session.index + 1) : undefined} />

      <div className="mt-6 flex flex-wrap justify-between gap-2">
        <button className="btn-secondary" disabled={session.index === 0} onClick={() => go(session.index - 1)}>
          ← Previous
        </button>
        {isTest ? (
          last ? (
            <button className="btn-primary" onClick={finishTest} disabled={busy}>
              Submit set ({answeredCount}/{session.itemIds.length})
            </button>
          ) : (
            <button className="btn-primary" onClick={() => go(session.index + 1)}>
              Next →
            </button>
          )
        ) : revealed ? (
          last ? (
            <button className="btn-primary" onClick={finishTutor} disabled={busy}>
              See results
            </button>
          ) : (
            <button className="btn-primary" onClick={() => go(session.index + 1)}>
              Next question →
            </button>
          )
        ) : (
          <button className="btn-ghost" onClick={() => !last && go(session.index + 1)} disabled={last}>
            Skip
          </button>
        )}
      </div>
      <p className="mt-3 hidden text-xs muted md:block">Keyboard: ← / → previous and next question.</p>
      {calc && <Calculator onClose={() => setCalc(false)} />}
    </div>
  )
}

function QuizResults({ session }: { session: QuizSession }) {
  const [open, setOpen] = useState<string | null>(null)
  const items = session.itemIds.map((id) => ({ q: content.questions[id], st: session.items[id] })).filter((x) => x.q)
  const { correct, guessedRight, missed, skipped, scoredOn, percent } = summarizeQuiz(
    session,
    items.map((x) => x.q.id),
  )
  return (
    <div>
      <PageHeader title="Set complete" subtitle={session.title} />
      <div className="card mb-6">
        <div className="text-4xl font-bold">{pct(percent)}</div>
        <p className="muted">
          {correct} of {scoredOn} correct{guessedRight ? ` (${guessedRight} were guesses — they’ll come back for review)` : ''}.
          {skipped > 0 && ` ${skipped} question${skipped === 1 ? ' was' : 's were'} left unanswered${session.mode === 'test' ? ' and scored as wrong' : ''}.`}
        </p>
        <p className="mt-2 text-sm">
          {missed + guessedRight > 0
            ? `${missed + guessedRight} question(s) were added to your spaced review queue.`
            : 'Clean sweep. These will stay out of your review queue.'}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link to="/" className="btn-primary">
            Back to today’s plan
          </Link>
          <Link to="/practice" className="btn-secondary">
            Build another set
          </Link>
        </div>
      </div>
      <h2 className="h2 mb-2">Review every question</h2>
      <ul className="space-y-2">
        {items.map(({ q, st }, i) => (
          <li key={q.id} className="card">
            <button className="flex w-full items-center justify-between gap-3 text-left" onClick={() => setOpen(open === q.id ? null : q.id)} aria-expanded={open === q.id}>
              <span className="min-w-0 truncate text-sm">
                <span className="font-semibold">{i + 1}.</span> {q.stem.replace(/[#*|_]/g, '').slice(0, 110)}…
              </span>
              <span
                className={`chip shrink-0 ${!st.answeredAt ? 'bg-slate-200 dark:bg-slate-800' : st.correct ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200' : 'bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-200'}`}
              >
                {!st.answeredAt ? 'Skipped' : st.correct ? (st.confidence === 'guess' ? 'Lucky guess' : 'Correct') : 'Missed'}
              </span>
            </button>
            {open === q.id && (
              <div className="mt-4 border-t border-slate-200 pt-4 dark:border-slate-800">
                <McqView
                  q={q}
                  section={session.section}
                  selected={st.choice}
                  confidence={st.confidence}
                  revealed
                  confidenceSubmits={false}
                  onSelect={() => {}}
                  onConfidence={() => {}}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
