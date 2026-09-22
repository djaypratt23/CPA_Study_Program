import { useLiveQuery } from 'dexie-react-hooks'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import FlashcardPlayer from '../components/FlashcardPlayer'
import { PageHeader } from '../components/ui'
import { content, getSection } from '../content'
import type { FlashcardWithModule } from '../content/schema'
import { db } from '../db'
import { useSettingsOrDefault } from '../hooks/useStore'

export default function Flashcards() {
  const settings = useSettingsOrDefault()
  const [params, setParams] = useSearchParams()
  const srs = useLiveQuery(() => db.srs.where('kind').equals('card').toArray(), []) ?? []
  const [session, setSession] = useState<FlashcardWithModule[] | null>(null)
  const moduleParam = params.get('module')
  const section = getSection(settings.activeSection) ?? content.sections[0]
  const now = new Date().toISOString()
  const bySrs = new Map(srs.map((s) => [s.itemId, s]))

  if (session)
    return (
      <FlashcardPlayer
        cards={session}
        onDone={() => {
          setSession(null)
          setParams({})
        }}
      />
    )

  const decks = section.areas.flatMap((a) =>
    a.units.flatMap((u) =>
      u.modules
        .map((m) => {
          const cards = content.flashcards.filter((c) => c.moduleId === m.id)
          return {
            id: m.id,
            title: m.title,
            cards,
            due: cards.filter((c) => (bySrs.get(c.id)?.due ?? '9') <= now).length,
            fresh: cards.filter((c) => !bySrs.has(c.id)).length,
          }
        })
        .filter((d) => d.cards.length),
    ),
  )
  const focus = moduleParam ? decks.find((d) => d.id === moduleParam) : undefined
  // Study what is new or due; if the whole deck is up to date, allow a full cram pass.
  const pendingFor = (cards: FlashcardWithModule[]) => {
    const pending = cards.filter((c) => !bySrs.has(c.id) || (bySrs.get(c.id)?.due ?? '') <= now)
    return pending.length ? pending : cards
  }

  return (
    <div>
      <PageHeader title="Flashcard decks" subtitle="One deck per module, scheduled with FSRS spaced repetition." back="/review" />
      {focus && (
        <div className="card mb-4 space-y-2 border-blue-400">
          <div className="font-semibold">{focus.title}</div>
          <button className="btn-primary" onClick={() => setSession(pendingFor(focus.cards))}>
            Study this deck ({focus.cards.length} cards)
          </button>
        </div>
      )}
      <ul className="space-y-2">
        {decks.map((d) => (
          <li key={d.id} className="card flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="truncate font-medium">{d.title}</div>
              <div className="text-xs muted">
                {d.cards.length} cards · {d.due} due · {d.fresh} new
              </div>
            </div>
            <button
              className="btn-secondary shrink-0"
              onClick={() => setSession(pendingFor(d.cards))}
            >
              Study
            </button>
          </li>
        ))}
      </ul>
      {!decks.length && <p className="muted">No flashcards for this section yet.</p>}
    </div>
  )
}
