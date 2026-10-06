import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { availableModules, content, getModule, getSection, practiceQuestions } from '../content'
import type { SectionId } from '../content/schema'
import { db, getSettings } from '../db'
import { createQuizSession } from '../db/quizzes'
import { buildDiagnostic, buildMasteryCheck, buildQuiz, historyByItem } from '../lib/quiz'

/** Creates a quiz session from URL intent (?module=, ?mastery=, ?mixed=, ?due=, ?diagnostic=) and opens it. */
export default function PracticeStart() {
  const [params] = useSearchParams()
  const nav = useNavigate()
  const [error, setError] = useState('')
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    started.current = true
    ;(async () => {
      const settings = await getSettings()
      const attempts = await db.attempts.toArray()
      const hist = historyByItem(attempts)
      const meta = new Map((await db.itemMeta.toArray()).map((m) => [m.itemId, m]))
      const progress = await db.moduleProgress.toArray()
      const studied = new Set(progress.filter((p) => p.lessonCompletedAt).map((p) => p.moduleId))
      const moduleId = params.get('module')
      const masteryId = params.get('mastery')
      const mixedSection = params.get('mixed') as SectionId | null
      const due = params.get('due')
      const diagnostic = params.get('diagnostic') as SectionId | null

      let id: string | null = null
      const empty = 'No practice questions match yet for this selection.'
      if (moduleId) {
        const m = getModule(moduleId)
        if (!m) return setError('Unknown module.')
        const qs = buildQuiz(practiceQuestions(m.section, true), { moduleIds: [moduleId], status: 'all', count: 10 }, hist, meta)
        if (!qs.length) return setError(empty)
        id = await createQuizSession({ section: m.section, title: `Practice: ${m.title}`, mode: 'tutor', mixed: false, itemIds: qs.map((q) => q.id) })
      } else if (masteryId) {
        const m = getModule(masteryId)
        if (!m) return setError('Unknown module.')
        const others = availableModules(m.section)
          .filter((x) => studied.has(x.id) && x.id !== masteryId)
          .map((x) => x.id)
        const qs = buildMasteryCheck(practiceQuestions(m.section, !!settings.includeOptional || !!m.optional), masteryId, others, hist)
        if (!qs.length) return setError(empty)
        id = await createQuizSession({ section: m.section, title: `Mastery check: ${m.title}`, mode: 'tutor', mixed: true, itemIds: qs.map((q) => q.id), purpose: 'mastery', moduleId: masteryId })
      } else if (mixedSection) {
        const sec = getSection(mixedSection)
        if (!sec) return setError('Unknown section.')
        const avail = availableModules(sec.id)
        let ids = avail.filter((m) => studied.has(m.id)).map((m) => m.id)
        if (!ids.length) ids = avail.map((m) => m.id)
        const qs = buildQuiz(practiceQuestions(sec.id, !!settings.includeOptional), { moduleIds: ids, status: 'all', count: 20 }, hist, meta)
        if (!qs.length) return setError(empty)
        id = await createQuizSession({ section: sec.id, title: `Mixed practice (${sec.id})`, mode: 'tutor', mixed: true, itemIds: qs.map((q) => q.id) })
      } else if (diagnostic) {
        const sec = getSection(diagnostic)
        if (!sec) return setError('Unknown section.')
        const avail = new Set(availableModules(sec.id).map((m) => m.id))
        const areas = sec.areas.map((a) => ({
          id: a.id,
          weight: (a.allocation.min + a.allocation.max) / 2,
          moduleIds: a.units.flatMap((u) => u.modules.map((m) => m.id)).filter((m) => avail.has(m)),
        }))
        const qs = buildDiagnostic(practiceQuestions(sec.id), areas, hist, 40)
        if (!qs.length) return setError(empty)
        id = await createQuizSession({ section: sec.id, title: `Diagnostic (${sec.id})`, mode: 'test', mixed: true, itemIds: qs.map((q) => q.id), purpose: 'diagnostic' })
      } else if (due) {
        const now = new Date().toISOString()
        const items = (await db.srs.where('kind').equals('question').toArray()).filter((s) => s.due <= now && s.section === settings.activeSection && content.questions[s.itemId])
        if (!items.length) return setError('No questions are due for review right now. Nice work.')
        id = await createQuizSession({
          section: settings.activeSection,
          title: 'Review: missed & low-confidence questions',
          mode: 'review',
          mixed: true,
          // Most overdue first.
          itemIds: [...items].sort((a, b) => a.due.localeCompare(b.due)).slice(0, 25).map((s) => s.itemId),
        })
      }
      if (!id) return setError('Nothing to practice with those settings.')
      nav(`/quiz/${id}`, { replace: true })
    })()
  }, [params, nav])

  if (error)
    return (
      <div className="card space-y-3">
        <p>{error}</p>
        <Link to="/" className="btn-secondary">
          Back home
        </Link>
      </div>
    )
  return <p className="muted">Building your set…</p>
}
