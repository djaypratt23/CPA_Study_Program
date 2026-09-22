import type { SectionId } from '../content/schema'
import { uid } from '../lib/random'
import { db } from './index'
import type { QuizSession } from './types'

export async function createQuizSession(opts: {
  section: SectionId
  title: string
  mode: QuizSession['mode']
  mixed: boolean
  itemIds: string[]
  timeLimitMs?: number
}): Promise<string> {
  const id = uid('quiz-')
  await db.quizSessions.put({
    id,
    section: opts.section,
    title: opts.title,
    mode: opts.mode,
    mixed: opts.mixed,
    itemIds: opts.itemIds,
    items: Object.fromEntries(opts.itemIds.map((i) => [i, { itemId: i, timeMs: 0 }])),
    index: 0,
    startedAt: new Date().toISOString(),
    elapsedMs: 0,
    timeLimitMs: opts.timeLimitMs,
  })
  return id
}
