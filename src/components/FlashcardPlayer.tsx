import { useEffect, useState } from 'react'
import { Rating, type Grade } from 'ts-fsrs'
import type { FlashcardWithModule } from '../content/schema'
import { db } from '../db'
import { reviewFlashcard } from '../db/actions'
import { newCard, previewIntervals } from '../lib/srs'
import Markdown from './Markdown'
import { ReviewBadge } from './ui'

const GRADES: { g: Grade; label: string; key: string; cls: string }[] = [
  { g: Rating.Again, label: 'Again', key: '1', cls: 'bg-rose-700 hover:bg-rose-800' },
  { g: Rating.Hard, label: 'Hard', key: '2', cls: 'bg-amber-700 hover:bg-amber-800' },
  { g: Rating.Good, label: 'Good', key: '3', cls: 'bg-emerald-700 hover:bg-emerald-800' },
  { g: Rating.Easy, label: 'Easy', key: '4', cls: 'bg-blue-700 hover:bg-blue-800' },
]

/** Studies a fixed queue of cards. "Again" puts the card back at the end of this session. */
export default function FlashcardPlayer({ cards, onDone }: { cards: FlashcardWithModule[]; onDone: () => void }) {
  const [queue, setQueue] = useState(cards)
  const [flipped, setFlipped] = useState(false)
  const [intervals, setIntervals] = useState<Record<string, string> | null>(null)
  const [reviewed, setReviewed] = useState(0)
  const card = queue[0]

  useEffect(() => {
    if (!card) return
    db.srs.get(`card:${card.id}`).then((s) => setIntervals(previewIntervals(s?.card ?? newCard())))
  }, [card])

  const rate = async (g: Grade) => {
    if (!card) return
    await reviewFlashcard(card, g)
    setReviewed((n) => n + 1)
    setFlipped(false)
    setQueue((q) => (g === Rating.Again ? [...q.slice(1), q[0]] : q.slice(1)))
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Never grade while the learner is using a form control (e.g. choosing a deck in a <select>).
      const t = e.target as HTMLElement | null
      if (t && (['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName) || t.isContentEditable || t.closest('[data-no-hotkeys]'))) return
      if (e.ctrlKey || e.metaKey || e.altKey) return
      if (e.key === ' ' && !flipped) {
        e.preventDefault()
        setFlipped(true)
      } else if (flipped) {
        const g = GRADES.find((x) => x.key === e.key)
        if (g) rate(g.g)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  if (!card)
    return (
      <div className="card text-center">
        <p className="text-lg font-semibold">Done — {reviewed} review{reviewed === 1 ? '' : 's'}.</p>
        <p className="muted text-sm">The scheduler will bring each card back right before you would forget it.</p>
        <button className="btn-primary mt-4" onClick={onDone}>
          Finish
        </button>
      </div>
    )

  return (
    <div className="space-y-4">
      <div className="text-sm muted">{queue.length} left in this session</div>
      {/* The card's text stays readable by screen readers; flipping is a real button, and the answer is announced. */}
      <div
        role="group"
        aria-label="Flashcard"
        className="card flex min-h-56 w-full cursor-pointer flex-col items-center justify-center text-center text-lg"
        onClick={() => setFlipped(true)}
      >
        {card.needsReview && <ReviewBadge />}
        <Markdown className="prose-lesson font-semibold">{card.front}</Markdown>
        <div aria-live="polite" className="w-full">
          {flipped && (
            <div className="mt-4 w-full border-t border-slate-200 pt-4 text-base dark:border-slate-700">
              <Markdown>{card.back}</Markdown>
            </div>
          )}
        </div>
        {!flipped && (
          <button className="btn-secondary mt-6" onClick={() => setFlipped(true)}>
            Show answer
          </button>
        )}
        {!flipped && <span className="mt-2 text-sm muted">Recall the answer first, then check (or press Space)</span>}
      </div>
      {flipped && (
        <div className="grid grid-cols-4 gap-2">
          {GRADES.map((g) => (
            <button key={g.label} className={`btn flex-col gap-0 text-white ${g.cls}`} onClick={() => rate(g.g)}>
              {g.label}
              <span className="text-xs font-normal">{intervals?.[g.label.toLowerCase()] ?? ''}</span>
            </button>
          ))}
        </div>
      )}
      <p className="text-center text-xs muted">Keyboard: Space to flip · 1 Again · 2 Hard · 3 Good · 4 Easy</p>
    </div>
  )
}
