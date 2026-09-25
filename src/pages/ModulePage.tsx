import { useLiveQuery } from 'dexie-react-hooks'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import InlineQuestion from '../components/InlineQuestion'
import LessonMarkdown from '../components/LessonMarkdown'
import { ReviewBadge, StatusChip } from '../components/ui'
import { areaTitle, content, getModule, questionsForModule, unitTitle } from '../content'
import { SKILL_LABELS } from '../content/schema'
import { db } from '../db'
import { addHighlight, completeLesson, setLastLocation, setModuleNotes, touchModule } from '../db/actions'
import { useDebouncedSave } from '../hooks/useDebouncedSave'
import { useStudyState } from '../hooks/useStore'
import { uid } from '../lib/random'

export default function ModulePage() {
  const { moduleId = '' } = useParams()
  const nav = useNavigate()
  const lesson = content.lessons[moduleId]
  const meta = getModule(moduleId)
  const { state } = useStudyState()
  const progress = useLiveQuery(() => db.moduleProgress.get(moduleId).then((p) => p ?? null), [moduleId])
  const noteSection = meta?.section
  const saveNotes = useCallback((v: string) => noteSection && setModuleNotes(moduleId, noteSection, v), [moduleId, noteSection])
  const notesSave = useDebouncedSave(saveNotes)
  const highlights = useLiveQuery(() => db.highlights.where('moduleId').equals(moduleId).toArray(), [moduleId]) ?? []
  const sessionId = useMemo(() => uid('lesson-'), [])
  const [selection, setSelection] = useState('')
  const restored = useRef(false)
  const bodyRef = useRef<HTMLDivElement>(null)

  // Remember where the learner is, and restore it on return.
  useEffect(() => {
    if (!lesson || !meta) return
    touchModule(moduleId, meta.section)
    setLastLocation(`/module/${moduleId}`, lesson.title)
  }, [moduleId, lesson, meta])

  useEffect(() => {
    if (restored.current || progress === undefined) return
    restored.current = true
    const pct = progress?.scrollPct
    if (pct && pct > 0.05 && pct < 0.98) {
      requestAnimationFrame(() => window.scrollTo(0, pct * (document.body.scrollHeight - window.innerHeight)))
    } else window.scrollTo(0, 0)
  }, [progress])

  useEffect(() => {
    if (!meta) return
    let t: number | undefined
    const onScroll = () => {
      window.clearTimeout(t)
      t = window.setTimeout(() => {
        const max = document.body.scrollHeight - window.innerHeight
        if (max > 0) touchModule(moduleId, meta.section, { scrollPct: window.scrollY / max })
      }, 400)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.clearTimeout(t)
    }
  }, [moduleId, meta])

  useEffect(() => {
    const onSel = () => {
      const s = window.getSelection()
      const text = s?.toString().trim() ?? ''
      if (text && bodyRef.current && s?.anchorNode && bodyRef.current.contains(s.anchorNode)) setSelection(text)
      else setSelection('')
    }
    document.addEventListener('selectionchange', onSel)
    return () => document.removeEventListener('selectionchange', onSel)
  }, [])

  if (!lesson || !meta) {
    return (
      <div className="card">
        <p>This module is planned for a later content update.</p>
        <Link to="/course" className="btn-secondary mt-3">
          Back to course
        </Link>
      </div>
    )
  }

  const ms = state?.modules.find((m) => m.id === moduleId)
  const practiceCount = questionsForModule(moduleId).length
  const cardCount = content.flashcards.filter((f) => f.moduleId === moduleId).length
  const done = !!progress?.lessonCompletedAt

  return (
    <article className="pb-8">
      <nav className="mb-2 text-xs muted" aria-label="Breadcrumb">
        <Link to={`/course/${meta.section}`} className="hover:underline">
          {meta.section}
        </Link>{' '}
        › {areaTitle(meta.areaId)} › {unitTitle(meta.unitId)}
      </nav>
      <header className="mb-6">
        <h1 className="h1">{lesson.title}</h1>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
          <span className="muted">{lesson.minutes} min</span>
          {ms && <StatusChip status={ms.mastery.status} />}
          {ms && ms.mastery.qualifyingDays.length > 0 && ms.mastery.status !== 'mastered' && (
            <span className="text-xs muted">Mastery: {ms.mastery.qualifyingDays.length}/2 days</span>
          )}
          {lesson.taxYear && <span className="chip bg-slate-200 dark:bg-slate-800">Tax year {lesson.taxYear}</span>}
          {lesson.needsReview && <ReviewBadge note={lesson.reviewNote} />}
        </div>
      </header>

      <section className="card mb-6" aria-labelledby="objectives">
        <h2 id="objectives" className="mb-2 text-sm font-bold uppercase tracking-wide muted">
          After this module you can
        </h2>
        <ul className="space-y-1.5 text-sm">
          {lesson.objectives.map((o, i) => (
            <li key={i} className="flex gap-2">
              <span className="chip mt-0.5 h-fit shrink-0 bg-slate-100 dark:bg-slate-800">{SKILL_LABELS[o.skill]}</span>
              <span>
                {o.text}
                {o.task && <span className="block text-xs muted">Blueprint task: {o.task}</span>}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {lesson.preQuestions.length > 0 && !done && (
        <section aria-label="Warm-up">
          <p className="mb-1 text-sm muted">
            <strong>Warm-up:</strong> take your best guess before the lesson. Getting it wrong now is fine — it primes your brain for the answer.
          </p>
          {lesson.preQuestions.map((id) => (
            <InlineQuestion key={id} id={id} label="Pre-question — best guess" sessionId={sessionId} />
          ))}
        </section>
      )}

      <section className="my-6 rounded-2xl border border-emerald-300 bg-emerald-50 p-5 dark:border-emerald-800 dark:bg-emerald-950/30" aria-labelledby="bigidea">
        <h2 id="bigidea" className="mb-3 flex items-center gap-2 text-lg font-bold">
          <span aria-hidden="true">💡</span> The big idea
        </h2>
        <dl className="space-y-3">
          <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-emerald-800 dark:text-emerald-300">What it is</dt>
            <dd>{lesson.bigIdea.what}</dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-emerald-800 dark:text-emerald-300">Why the rule exists</dt>
            <dd>{lesson.bigIdea.why}</dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-emerald-800 dark:text-emerald-300">In the real world</dt>
            <dd>{lesson.bigIdea.example}</dd>
          </div>
        </dl>
      </section>

      <div ref={bodyRef}>
        <LessonMarkdown body={lesson.body} sessionId={sessionId} />
      </div>

      <section className="my-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950/30" aria-labelledby="takeaways">
        <h2 id="takeaways" className="mb-2 text-lg font-bold">
          Key takeaways
        </h2>
        <ul className="list-disc space-y-1 pl-5">
          {lesson.keyTakeaways.map((k, i) => (
            <li key={i}>{k}</li>
          ))}
        </ul>
      </section>

      <section className="mb-8 text-sm" aria-labelledby="cites">
        <h2 id="cites" className="mb-1 font-semibold">
          Authoritative sources
        </h2>
        <ul className="space-y-0.5 muted">
          {lesson.citations.map((c, i) => (
            <li key={i}>
              <strong className="text-slate-800 dark:text-slate-200">{c.source}</strong>
              {c.note ? ` — ${c.note}` : ''}
            </li>
          ))}
        </ul>
      </section>

      <section className="card mb-6 space-y-3" aria-labelledby="next">
        <h2 id="next" className="h2">
          {done ? 'Keep it sticking' : 'Finished reading?'}
        </h2>
        <div className="flex flex-wrap gap-2">
          {!done ? (
            <button
              className="btn-primary"
              onClick={async () => {
                await completeLesson(moduleId, meta.section)
                nav(`/practice/start?module=${moduleId}`)
              }}
            >
              Mark complete & practice ({practiceCount} questions)
            </button>
          ) : (
            <>
              <Link className="btn-primary" to={`/practice/start?mastery=${moduleId}`}>
                Mastery check
              </Link>
              <Link className="btn-secondary" to={`/practice/start?module=${moduleId}`}>
                Practice set
              </Link>
            </>
          )}
          <Link className="btn-secondary" to={`/flashcards?module=${moduleId}`}>
            Flashcards ({cardCount})
          </Link>
          <Link className="btn-secondary" to={`/tbs?unit=${meta.unitId}`}>
            Unit simulations
          </Link>
        </div>
        {!done && <p className="text-xs muted">Practice right after reading, then a mastery check on a later day — spacing is what makes it last.</p>}
      </section>

      <section className="card space-y-3" aria-labelledby="notes">
        <h2 id="notes" className="h2">
          Your notes
        </h2>
        <textarea
          key={progress?.moduleId ?? 'new'}
          className="input min-h-28"
          placeholder="Summarize the big idea in your own words — the best note you can write."
          defaultValue={progress?.notes ?? ''}
          onChange={(e) => notesSave.schedule(e.target.value)}
          onBlur={notesSave.flush}
          aria-label="Module notes"
        />
        {highlights.length > 0 && (
          <div>
            <h3 className="mb-1 text-sm font-semibold">Highlights</h3>
            <ul className="space-y-2">
              {highlights.map((h) => (
                <li key={h.id} className="flex items-start justify-between gap-2 rounded bg-yellow-100 p-2 text-sm dark:bg-yellow-900/40">
                  <span>“{h.text}”</span>
                  <button className="text-xs muted hover:underline" onClick={() => h.id && db.highlights.delete(h.id)} aria-label="Delete highlight">
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <p className="text-xs muted">Tip: select any text in the lesson to save it as a highlight.</p>
      </section>

      {selection && (
        <div className="fixed inset-x-0 bottom-20 z-40 flex justify-center md:bottom-6">
          <button
            className="btn-primary shadow-lg"
            onMouseDown={(e) => e.preventDefault()}
            onClick={async () => {
              await addHighlight(moduleId, selection)
              window.getSelection()?.removeAllRanges()
              setSelection('')
            }}
          >
            ★ Save highlight
          </button>
        </div>
      )}
    </article>
  )
}
