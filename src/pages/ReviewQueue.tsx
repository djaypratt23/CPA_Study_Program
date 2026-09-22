import { useLiveQuery } from 'dexie-react-hooks'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import FlashcardPlayer from '../components/FlashcardPlayer'
import { PageHeader } from '../components/ui'
import { content } from '../content'
import type { FlashcardWithModule } from '../content/schema'
import { db } from '../db'
import { useSettingsOrDefault } from '../hooks/useStore'
import { buildCardQueue } from '../lib/cardQueue'
import { dayKey } from '../lib/dates'

export default function ReviewQueue() {
  const settings = useSettingsOrDefault()
  const srs = useLiveQuery(() => db.srs.toArray(), [])
  const progress = useLiveQuery(() => db.moduleProgress.toArray(), [])
  const [session, setSession] = useState<FlashcardWithModule[] | null>(null)
  if (!srs || !progress) return <p className="muted">Loading…</p>
  const now = new Date().toISOString()
  const studied = new Set(progress.filter((p) => p.lessonCompletedAt).map((p) => p.moduleId))
  const cards = content.flashcards.filter((c) => c.section === settings.activeSection)
  const { due, fresh } = buildCardQueue({ cards, srs, studiedModules: studied, newPerDay: settings.newCardsPerDay, today: dayKey(), now })
  const dueQuestions = srs.filter((s) => s.kind === 'question' && s.section === settings.activeSection && s.due <= now).length

  if (session) return <FlashcardPlayer cards={session} onDone={() => setSession(null)} />

  return (
    <div>
      <PageHeader title="Spaced review" subtitle="A few minutes a day keeps everything you’ve learned from fading. Do this first each session." />
      <div className="grid gap-4 sm:grid-cols-2">
        <section className="card space-y-2">
          <h2 className="h2">Flashcards</h2>
          <p className="text-sm">
            <strong>{due.length}</strong> due · <strong>{fresh.length}</strong> new today
          </p>
          <button className="btn-primary w-full" disabled={!due.length && !fresh.length} onClick={() => setSession([...due, ...fresh])}>
            {due.length + fresh.length ? `Study ${due.length + fresh.length} cards` : 'All caught up'}
          </button>
          {!studied.size && <p className="text-xs muted">New cards unlock as you complete lessons.</p>}
        </section>
        <section className="card space-y-2">
          <h2 className="h2">Missed & low-confidence questions</h2>
          <p className="text-sm">
            <strong>{dueQuestions}</strong> due now
          </p>
          {dueQuestions ? (
            <Link to="/practice/start?due=1" className="btn-primary w-full">
              Review {Math.min(25, dueQuestions)} questions
            </Link>
          ) : (
            <button className="btn-primary w-full" disabled>
              All caught up
            </button>
          )}
          <p className="text-xs muted">Wrong, guessed, and unsure answers come back on a spaced schedule until you know them.</p>
        </section>
      </div>
      <p className="mt-6 text-sm">
        Want to drill a specific module?{' '}
        <Link to="/flashcards" className="text-blue-700 underline dark:text-blue-400">
          Browse decks
        </Link>
      </p>
    </div>
  )
}
