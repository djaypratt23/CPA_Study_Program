import { useLiveQuery } from 'dexie-react-hooks'
import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Calculator from '../components/Calculator'
import Icon from '../components/Icon'
import Markdown from '../components/Markdown'
import KeyNav from '../components/KeyNav'
import McqView from '../components/McqView'
import TbsView from '../components/TbsView'
import Clock from '../components/Timer'
import { pct } from '../components/ui'
import { areaTitle, content, getSection } from '../content'
import { db } from '../db'
import { recordMcqAttempt, recordTbsAttempt } from '../db/actions'
import type { ExamSession, ExamTestletState } from '../db/types'
import { scoreExam } from '../lib/examScoring'
import { scoreTbs, type TbsResponses } from '../lib/tbsScoring'

export default function ExamPlayer() {
  const { sessionId = '' } = useParams()
  const session = useLiveQuery(() => db.examSessions.get(sessionId).then((s) => s ?? null), [sessionId])
  if (session === undefined) return <p className="p-6 muted">Loading…</p>
  if (!session)
    return (
      <p className="p-6">
        Exam not found. <Link to="/exam">Back</Link>
      </p>
    )
  if (session.finishedAt && session.result) return <ExamResults session={session} />
  return <ExamRunner session={session} />
}

function ExamRunner({ session }: { session: ExamSession }) {
  const section = getSection(session.section)!
  const [remaining, setRemaining] = useState(session.remainingMs)
  const [breakLeft, setBreakLeft] = useState(session.breakRemainingMs ?? (section.exam.breakMinutes ?? 15) * 60_000)
  const [calc, setCalc] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const remRef = useRef(remaining)
  remRef.current = remaining
  const t = session.testlets[session.testletIndex]
  const onBreak = session.onBreak

  const finish = async (s: ExamSession) => {
    // Lock everything, record attempts, and score.
    const testlets = s.testlets.map((x) => ({ ...x, submitted: true }))
    for (const tl of testlets) {
      for (const id of tl.items) {
        if (tl.kind === 'mcq') {
          const q = content.questions[id]
          if (q && tl.mcqAnswers[id])
            await recordMcqAttempt(q, { choice: tl.mcqAnswers[id], timeMs: 0, mode: 'exam', mixed: true, sessionId: s.id, section: s.section })
        } else {
          const tbs = content.tbs[id]
          if (tbs) await recordTbsAttempt(tbs, scoreTbs(tbs, tl.tbsResponses[id] ?? {}).percent, 0, 'exam', s.id)
        }
      }
    }
    const result = scoreExam(testlets, section, content)
    await db.examSessions.update(s.id, { testlets, finishedAt: new Date().toISOString(), result, remainingMs: remRef.current })
  }

  // Exam clock (paused during the optional break and while the page is closed).
  useEffect(() => {
    const id = setInterval(() => {
      if (onBreak) setBreakLeft((b) => Math.max(0, b - 1000))
      else setRemaining((r) => Math.max(0, r - 1000))
    }, 1000)
    return () => clearInterval(id)
  }, [onBreak])

  useEffect(() => {
    if (remaining % 5000 === 0) db.examSessions.update(session.id, { remainingMs: remaining })
    if (remaining === 0)
      db.examSessions.get(session.id).then((s) => {
        if (s && !s.finishedAt) finish(s)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining])

  useEffect(() => {
    if (onBreak && breakLeft % 5000 === 0) db.examSessions.update(session.id, { breakRemainingMs: breakLeft })
    if (onBreak && breakLeft === 0) db.examSessions.update(session.id, { onBreak: false })
  }, [breakLeft, onBreak, session.id])

  const patchTestlet = (patch: Partial<ExamTestletState>) => {
    const testlets = session.testlets.map((x, i) => (i === session.testletIndex ? { ...x, ...patch } : x))
    return db.examSessions.update(session.id, { testlets })
  }

  const submitTestlet = async () => {
    setConfirm(false)
    const testlets = session.testlets.map((x, i) => (i === session.testletIndex ? { ...x, submitted: true } : x))
    const next = session.testletIndex + 1
    if (next >= testlets.length) {
      await finish({ ...session, testlets })
      return
    }
    const offerBreak = section.exam.breakAfterTestlet === next && !session.breakUsed
    await db.examSessions.update(session.id, { testlets, testletIndex: next, remainingMs: remaining, onBreak: false, breakOffered: offerBreak })
    window.scrollTo(0, 0)
  }

  const breakOffered = session.breakOffered && !session.breakUsed

  return (
    <div className="min-h-dvh bg-slate-100 dark:bg-slate-950">
      <header className="sticky top-0 z-30 flex items-center justify-between gap-2 bg-slate-800 px-4 py-2 text-white">
        <div className="text-sm">
          <span className="font-bold">{section.id}</span> · Testlet {session.testletIndex + 1} of {session.testlets.length}
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="flex items-center gap-1">
            <Icon name="clock" className="h-4 w-4" />
            <Clock ms={remaining} label="Time remaining" warn={remaining < 15 * 60_000} />
          </span>
          <button className="rounded px-2 py-1 hover:bg-slate-700" onClick={() => setCalc((c) => !c)} aria-label="Calculator">
            <Icon name="calc" />
          </button>
          <Link to="/exam" className="rounded px-2 py-1 text-xs hover:bg-slate-700" title="The clock pauses while you are away">
            Pause & exit
          </Link>
        </div>
      </header>

      <main className={`mx-auto px-4 py-6 ${t?.kind === 'tbs' ? 'max-w-4xl lg:max-w-7xl' : 'max-w-4xl'}`}>
        {onBreak ? (
          <div className="card mx-auto max-w-md space-y-3 text-center">
            <h1 className="h1">Break</h1>
            <p className="muted">The exam clock is stopped. Stretch, hydrate, breathe.</p>
            <div className="text-4xl font-bold">
              <Clock ms={breakLeft} label="Break remaining" />
            </div>
            <button className="btn-primary w-full" onClick={() => db.examSessions.update(session.id, { onBreak: false })}>
              Resume exam
            </button>
          </div>
        ) : breakOffered ? (
          <div className="card mx-auto max-w-md space-y-3 text-center">
            <h1 className="h2">Optional break</h1>
            <p className="text-sm muted">
              You have finished testlet {section.exam.breakAfterTestlet}. You may take a {section.exam.breakMinutes ?? 15}-minute break that does not count against your exam time.
            </p>
            <div className="flex gap-2">
              <button className="btn-secondary flex-1" onClick={() => db.examSessions.update(session.id, { breakUsed: true, breakOffered: false })}>
                Skip break
              </button>
              <button className="btn-primary flex-1" onClick={() => db.examSessions.update(session.id, { breakUsed: true, onBreak: true, breakOffered: false })}>
                Take break
              </button>
            </div>
          </div>
        ) : t.kind === 'mcq' ? (
          <McqTestlet t={t} session={session} onPatch={patchTestlet} />
        ) : (
          <TbsTestlet t={t} onPatch={patchTestlet} />
        )}

        {!onBreak && !breakOffered && (
          <div className="mt-8 border-t border-slate-300 pt-4 dark:border-slate-700">
            {confirm ? (
              <div className="card space-y-3 border-amber-400">
                <p className="font-semibold">Submit testlet {session.testletIndex + 1}? You will not be able to return to it.</p>
                <div className="flex gap-2">
                  <button className="btn-secondary" onClick={() => setConfirm(false)}>
                    Keep working
                  </button>
                  <button className="btn-primary" onClick={submitTestlet}>
                    Submit testlet
                  </button>
                </div>
              </div>
            ) : (
              <button className="btn-primary" onClick={() => setConfirm(true)}>
                {session.testletIndex === session.testlets.length - 1 ? 'Submit exam' : 'Submit testlet'}
              </button>
            )}
          </div>
        )}
      </main>
      {calc && <Calculator onClose={() => setCalc(false)} />}
    </div>
  )
}

function McqTestlet({ t, session, onPatch }: { t: ExamTestletState; session: ExamSession; onPatch: (p: Partial<ExamTestletState>) => void }) {
  const q = content.questions[t.items[t.index]]
  if (!q) return <p>Missing question.</p>
  const answered = t.items.filter((id) => t.mcqAnswers[id]).length
  return (
    <div className="space-y-4">
      <nav className="flex flex-wrap gap-1" aria-label="Question navigator">
        {t.items.map((id, i) => (
          <button
            key={id}
            onClick={() => onPatch({ index: i })}
            className={`relative h-8 w-8 rounded text-xs font-semibold ${i === t.index ? 'ring-2 ring-blue-600' : ''} ${t.mcqAnswers[id] ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-800'}`}
            aria-label={`Question ${i + 1}${t.mcqAnswers[id] ? ', answered' : ''}${t.flags[id] ? ', flagged' : ''}`}
            aria-current={i === t.index}
          >
            {i + 1}
            {t.flags[id] && <span className="absolute -top-1 -right-1 text-[10px]">🚩</span>}
          </button>
        ))}
      </nav>
      <div className="flex items-center justify-between text-sm muted">
        <span>
          {answered}/{t.items.length} answered
        </span>
        <button className="btn-ghost min-h-9 text-xs" onClick={() => onPatch({ flags: { ...t.flags, [q.id]: !t.flags[q.id] } })} aria-pressed={!!t.flags[q.id]}>
          🚩 {t.flags[q.id] ? 'Unflag' : 'Flag for review'}
        </button>
      </div>
      <div className="card">
        <McqView
          key={q.id}
          q={q}
          index={t.index}
          total={t.items.length}
          section={session.section}
          selected={t.mcqAnswers[q.id]}
          revealed={false}
          confidenceSubmits={false}
          showTools={false}
          hideConfidence
          onSelect={(c) => onPatch({ mcqAnswers: { ...t.mcqAnswers, [q.id]: c } })}
          onConfidence={() => {}}
          keyboard
          shuffleSeed={session.id}
        />
      </div>
      <KeyNav
        onPrev={t.index > 0 ? () => onPatch({ index: t.index - 1 }) : undefined}
        onNext={t.index < t.items.length - 1 ? () => onPatch({ index: t.index + 1 }) : undefined}
      />
      <div className="flex justify-between">
        <button className="btn-secondary" disabled={t.index === 0} onClick={() => onPatch({ index: t.index - 1 })}>
          ← Previous
        </button>
        <button className="btn-secondary" disabled={t.index === t.items.length - 1} onClick={() => onPatch({ index: t.index + 1 })}>
          Next →
        </button>
      </div>
      <p className="hidden text-xs muted md:block">Keyboard: A–D to choose, ← / → previous and next question.</p>
    </div>
  )
}

function TbsTestlet({ t, onPatch }: { t: ExamTestletState; onPatch: (p: Partial<ExamTestletState>) => void }) {
  const tbs = content.tbs[t.items[t.index]]
  if (!tbs) return <p>Missing simulation.</p>
  return (
    <div className="space-y-4">
      <nav className="flex gap-2" aria-label="Simulations in this testlet">
        {t.items.map((id, i) => (
          <button key={id} onClick={() => onPatch({ index: i })} className={`btn ${i === t.index ? 'bg-blue-700 text-white' : 'bg-white dark:bg-slate-800'}`} aria-current={i === t.index}>
            TBS {i + 1}
          </button>
        ))}
      </nav>
      <h2 className="h2">{tbs.title}</h2>
      <TbsView
        key={tbs.id}
        tbs={tbs}
        responses={t.tbsResponses[tbs.id] ?? {}}
        submitted={false}
        split
        onChange={(r: TbsResponses) => onPatch({ tbsResponses: { ...t.tbsResponses, [tbs.id]: r } })}
      />
    </div>
  )
}

function ExamResults({ session }: { session: ExamSession }) {
  const r = session.result!
  const section = getSection(session.section)!
  const [open, setOpen] = useState<string | null>(null)
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link to="/" className="text-sm text-blue-700 hover:underline dark:text-blue-400">
        ← Home
      </Link>
      <h1 className="h1 mt-2">Simulated exam results</h1>
      <div className="card my-6">
        <div className="text-sm muted">Approximate scaled score</div>
        <div className="text-5xl font-bold">≈ {r.approxScaled}</div>
        <p className="mt-2 text-sm">
          MCQ {pct(r.mcqPercent)} · TBS {pct(r.tbsPercent)} · weighted {pct(r.weightedPercent)} (MCQ {section.exam.weighting.mcq}% / TBS {section.exam.weighting.tbs}%)
        </p>
        <p className="mt-3 rounded-lg bg-amber-50 p-3 text-xs dark:bg-amber-950/40">
          <strong>Caveat:</strong> this is a rough estimate. The real exam is scored with item response theory — harder questions carry more weight, some questions are unscored
          pretest items, and the AICPA does not publish a raw-to-scaled conversion. We map 65% weighted raw to about 75 as a rule of thumb. Use this to find weak areas, not to
          predict your score.
        </p>
      </div>
      <h2 className="h2 mb-2">By blueprint area</h2>
      <ul className="card mb-6 space-y-1 text-sm">
        {Object.entries(r.byArea).map(([a, v]) => (
          <li key={a} className="flex justify-between gap-2">
            <span>{areaTitle(a)}</span>
            <span className="tabular-nums">{pct(v.possible ? v.earned / v.possible : 0)}</span>
          </li>
        ))}
      </ul>
      <h2 className="h2 mb-2">Review every item</h2>
      <p className="mb-3 text-sm muted">Missed questions were added to your spaced review queue.</p>
      {session.testlets.map((t, ti) => (
        <section key={ti} className="mb-6">
          <h3 className="mb-2 font-semibold">
            Testlet {ti + 1} ({t.kind === 'mcq' ? 'multiple choice' : 'simulations'})
          </h3>
          <ul className="space-y-2">
            {t.items.map((id, i) => {
              const key = `${ti}-${id}`
              const q = t.kind === 'mcq' ? content.questions[id] : undefined
              const tbs = t.kind === 'tbs' ? content.tbs[id] : undefined
              const ok = q ? t.mcqAnswers[id] === q.answer : undefined
              const tbsPct = tbs ? scoreTbs(tbs, t.tbsResponses[id] ?? {}).percent : undefined
              return (
                <li key={key} className="card">
                  <button className="flex w-full items-center justify-between gap-2 text-left" onClick={() => setOpen(open === key ? null : key)} aria-expanded={open === key}>
                    <span className="min-w-0 truncate text-sm">
                      {i + 1}. {q ? q.stem.replace(/[#*|_]/g, '').slice(0, 100) : tbs?.title}
                    </span>
                    <span className="shrink-0 text-sm font-semibold">{q ? (ok ? '✓' : t.mcqAnswers[id] ? '✗' : '—') : pct(tbsPct)}</span>
                  </button>
                  {open === key && (
                    <div className="mt-4 border-t border-slate-200 pt-4 dark:border-slate-800">
                      {q && (
                        <McqView q={q} section={session.section} shuffleSeed={session.id} selected={t.mcqAnswers[id]} revealed confidenceSubmits={false} onSelect={() => {}} onConfidence={() => {}} />
                      )}
                      {tbs && <TbsView tbs={tbs} responses={t.tbsResponses[id] ?? {}} submitted onChange={() => {}} />}
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </section>
      ))}
      <Markdown className="prose-lesson text-sm muted">{'Next: open **Analytics** for your full weak-area breakdown, then follow the final-review plan.'}</Markdown>
    </div>
  )
}
