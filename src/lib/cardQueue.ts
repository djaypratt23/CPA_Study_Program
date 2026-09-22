import type { FlashcardWithModule } from '../content/schema'
import type { SrsItem } from '../db/types'

/**
 * Today's flashcard queue: due cards first (most overdue first), then new
 * cards from studied modules up to the daily new-card allowance.
 */
export function buildCardQueue(opts: {
  cards: FlashcardWithModule[]
  srs: SrsItem[]
  studiedModules: Set<string>
  newPerDay: number
  today: string
  now: string
  moduleFilter?: string
}): { due: FlashcardWithModule[]; fresh: FlashcardWithModule[] } {
  const bySrs = new Map(opts.srs.filter((s) => s.kind === 'card').map((s) => [s.itemId, s]))
  const pool = opts.cards.filter((c) => !opts.moduleFilter || c.moduleId === opts.moduleFilter)
  const due = pool
    .filter((c) => {
      const s = bySrs.get(c.id)
      return s && !s.suspended && s.due <= opts.now
    })
    .sort((a, b) => bySrs.get(a.id)!.due.localeCompare(bySrs.get(b.id)!.due))
  const introducedToday = opts.srs.filter((s) => s.kind === 'card' && s.introduced === opts.today).length
  const allowance = opts.moduleFilter ? Infinity : Math.max(0, opts.newPerDay - introducedToday)
  const fresh = pool.filter((c) => !bySrs.has(c.id) && (opts.moduleFilter || opts.studiedModules.has(c.moduleId))).slice(0, allowance)
  return { due, fresh }
}
