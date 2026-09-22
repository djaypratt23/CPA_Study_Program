import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { availableModules, content, getModule, getSection, practiceQuestions } from '../content'
import type { SectionId } from '../content/schema'
import { db, getSettings } from '../db'
import { createQuizSession } from '../db/quizzes'
import { buildMasteryCheck, buildQuiz, historyByItem } from '../lib/quiz'

/** Creates a quiz session from URL intent (?module=, ?mastery=, ?mixed=, ?due=) and opens it. */
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

      let id: string | null = null
      const empty = 'No practice questions match yet for this selection.'
      if (moduleId) {
        const m = getModule(moduleId)
        if (!m) return setError('Unknown module.')
        const qs = buildQuiz(practiceQuestions(m.section), { moduleIds: [moduleId], status: 'all', count: 10 }, hist, meta)
        if (!qs.length) return setError(empty)
        id = await createQuizSession({ section: m.section, title: `Practice: ${m.title}`, mode: 'tutor', mixed: false, itemIds: qs.map((q) => q.id) })
      } else if (masteryId) {
        const m = getModule(masteryId)
        if (!m) return setError('Unknown module.')
        const others = availableModules(m.section)
          .filter((x) => studied.has(x.id) && x.id !== masteryId)
          .map((x) => x.id)
        const qs = buildMasteryCheck(practiceQuestions(m.section), masteryId, others, hist)
        if (!qs.length) return setError(empty)
        id = await createQuizSession({ section: m.section, title: `Mastery check: ${m.title}`, mode: 'tutor', mixed: true, itemIds: qs.map((q) => q.id) })
      } else if (mixedSection) {
        const sec = getSection(mixedSection)
        if (!sec) return setError('Unknown section.')
        const avail = availableModules(sec.id)
        let ids = avail.filter((m) => studied.has(m.id)).map((m) => m.id)
        if (!ids.length) ids = avail.map((m) => m.id)
        const qs = buildQuiz(practiceQuestions(sec.id), { moduleIds: ids, status: 'all', count: 20 }, hist, meta)
        if (!qs.length) return setError(empty)
        id = await createQuizSession({ section: sec.id, title: `Mixed practice (${sec.id})`, mode: 'tutor', mixed: true, itemIds: qs.map((q) => q.id) })
      } else if (due) {
        const now = new Date().toISOString()
        const items = (await db.srs.where('kind').equals('question').toArray()).filter((s) => s.due <= now && s.section === settings.activeSection && content.questions[s.itemId])
        if (!items.length) return setError('No questions are due for review right now. Nice work.')
        id = await createQuizSession({
          section: settings.activeSection,
          title: 'Review: missed & low-confidence questions',
          mode: 'review',
          mixed: true,
          itemIds: items.slice(0, 25).map((s) => s.itemId),
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
