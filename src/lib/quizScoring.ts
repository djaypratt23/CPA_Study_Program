import type { QuizSession } from '../db/types'

export interface QuizSummary {
  answered: number
  correct: number
  missed: number
  guessedRight: number
  skipped: number
  /** Denominator for the headline score: every item in test mode, answered items otherwise. */
  scoredOn: number
  percent: number
}

/** Summarize a finished practice set. In test mode a skipped question counts as wrong, as on the exam. */
export function summarizeQuiz(session: Pick<QuizSession, 'mode' | 'items'>, itemIds: string[]): QuizSummary {
  const states = itemIds.map((id) => session.items[id]).filter(Boolean)
  const answered = states.filter((s) => s.answeredAt)
  const correct = answered.filter((s) => s.correct).length
  const scoredOn = session.mode === 'test' ? states.length : answered.length
  return {
    answered: answered.length,
    correct,
    missed: answered.length - correct,
    guessedRight: answered.filter((s) => s.correct && s.confidence === 'guess').length,
    skipped: states.length - answered.length,
    scoredOn,
    percent: scoredOn ? correct / scoredOn : 0,
  }
}
