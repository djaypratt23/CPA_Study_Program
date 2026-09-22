import { useLiveQuery } from 'dexie-react-hooks'
import { useState } from 'react'
import type { Mcq, SectionId } from '../content/schema'
import { SKILL_LABELS } from '../content/schema'
import { db } from '../db'
import { logError, setItemNote, toggleFlag } from '../db/actions'
import { ERROR_CAUSES, ERROR_CAUSE_LABELS, type ErrorCause } from '../db/types'
import type { Confidence } from '../lib/srs'
import Icon from './Icon'
import Markdown from './Markdown'
import { ReviewBadge } from './ui'

export const TRAP_LABELS: Record<string, string> = {
  'wrong-rule': 'Applies the wrong rule',
  'partial-computation': 'Stops the computation too early',
  'wrong-period': 'Wrong period / timing',
  'wrong-sign': 'Wrong direction or sign',
  'wrong-classification': 'Misclassification',
  reversed: 'Reverses the relationship',
  'distractor-number': 'Uses an irrelevant number from the facts',
  'outdated-rule': 'Outdated standard or law',
  'irrelevant-fact': 'Swayed by an irrelevant fact',
  overgeneralization: 'Overgeneralizes a rule',
  other: 'Common misconception',
}

export const CONFIDENCE_OPTIONS: { value: Confidence; label: string; hint: string }[] = [
  { value: 'guess', label: 'Guess', hint: 'I would not bet on it' },
  { value: 'unsure', label: 'Unsure', hint: 'Narrowed it down' },
  { value: 'confident', label: 'Confident', hint: 'I know this' },
]

interface Props {
  q: Mcq
  index?: number
  total?: number
  selected?: string
  confidence?: Confidence
  revealed: boolean
  /** When true the confidence buttons submit the answer (tutor/lesson). */
  confidenceSubmits: boolean
  onSelect: (choice: string) => void
  onConfidence: (c: Confidence) => void
  showTools?: boolean
  /** Simulated exam: no confidence prompt, like the real exam. */
  hideConfidence?: boolean
  section: SectionId
}

export default function McqView({ q, index, total, selected, confidence, revealed, confidenceSubmits, onSelect, onConfidence, showTools = true, hideConfidence = false, section }: Props) {
  const meta = useLiveQuery(() => db.itemMeta.get(q.id), [q.id])
  const [noteOpen, setNoteOpen] = useState(false)
  const correct = selected === q.answer

  return (
    <article className="space-y-4" aria-labelledby={`stem-${q.id}`}>
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs muted">
        <div className="flex flex-wrap items-center gap-2">
          {index !== undefined && total !== undefined && (
            <span className="font-semibold">
              Question {index + 1} of {total}
            </span>
          )}
          <span className="chip bg-slate-100 dark:bg-slate-800">{SKILL_LABELS[q.skill]}</span>
          {q.needsReview && <ReviewBadge note={q.reviewNote} />}
        </div>
        {showTools && (
          <div className="flex items-center gap-1">
            <button
              className={`btn-ghost min-h-9 px-2 text-xs ${meta?.flagged ? 'text-amber-600 dark:text-amber-400' : ''}`}
              onClick={() => toggleFlag(q.id)}
              aria-pressed={!!meta?.flagged}
              title="Flag for later"
            >
              <Icon name="flag" className="h-4 w-4" />
              {meta?.flagged ? 'Flagged' : 'Flag'}
            </button>
            <button className="btn-ghost min-h-9 px-2 text-xs" onClick={() => setNoteOpen((o) => !o)} aria-expanded={noteOpen}>
              <Icon name="note" className="h-4 w-4" />
              Note{meta?.note ? ' •' : ''}
            </button>
          </div>
        )}
      </div>
      {noteOpen && (
        <textarea
          className="input min-h-20 text-sm"
          placeholder="Your note on this question (saved automatically)"
          defaultValue={meta?.note ?? ''}
          onBlur={(e) => setItemNote(q.id, e.target.value)}
          aria-label="Question note"
        />
      )}

      <div id={`stem-${q.id}`} className="text-base">
        <Markdown>{q.stem}</Markdown>
      </div>

      {revealed && (
        <div
        className={`rounded-lg p-3 font-semibold ${correct ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-100' : 'bg-rose-100 text-rose-900 dark:bg-rose-900/40 dark:text-rose-100'}`}
        role="status"
      >
        {correct
          ? confidence === 'guess'
            ? 'Correct — but you guessed, so it will come back for review like a miss.'
            : 'Correct.'
          : `Not quite — the answer is (${q.answer.toUpperCase()}).`}
      </div>
      )}

      <div role="radiogroup" aria-label="Answer choices" className="space-y-2">
        {q.choices.map((c) => {
          const isSel = selected === c.id
          const isAns = c.id === q.answer
          let cls = 'border-slate-300 bg-white hover:border-blue-400 dark:border-slate-700 dark:bg-slate-900'
          if (isSel && !revealed) cls = 'border-blue-600 bg-blue-50 ring-2 ring-blue-600/30 dark:border-blue-400 dark:bg-blue-950'
          if (revealed && isAns) cls = 'border-emerald-600 bg-emerald-50 dark:border-emerald-500 dark:bg-emerald-950/50'
          if (revealed && isSel && !isAns) cls = 'border-rose-600 bg-rose-50 dark:border-rose-500 dark:bg-rose-950/50'
          return (
            <div key={c.id}>
              <button
                role="radio"
                aria-checked={isSel}
                disabled={revealed}
                onClick={() => onSelect(c.id)}
                className={`flex w-full items-start gap-3 rounded-lg border p-3 text-left transition-colors disabled:cursor-default ${cls}`}
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-current text-xs font-bold uppercase">
                  {c.id}
                </span>
                <span className="min-w-0 flex-1">
                  <Markdown className="prose-lesson [&_p]:my-0">{c.text}</Markdown>
                </span>
                {revealed && isAns && <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">Correct</span>}
                {revealed && isSel && !isAns && <span className="text-sm font-semibold text-rose-700 dark:text-rose-400">Your answer</span>}
              </button>
              {revealed && (
                <div className={`mt-1 ml-9 rounded-md px-3 py-2 text-sm ${isAns ? 'bg-emerald-50/70 dark:bg-emerald-950/30' : 'bg-slate-50 dark:bg-slate-900/60'}`}>
                  {!isAns && c.trap && (
                    <div className="mb-1 text-xs font-bold uppercase tracking-wide text-rose-700 dark:text-rose-400">Trap: {TRAP_LABELS[c.trap]}</div>
                  )}
                  <Markdown className="prose-lesson text-sm [&_p]:my-1">{c.explanation}</Markdown>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {!revealed && !hideConfidence && (
        <fieldset className="rounded-lg border border-slate-200 p-3 dark:border-slate-800">
          <legend className="px-1 text-sm font-semibold">
            How sure are you?{confidenceSubmits ? ' (this submits your answer)' : ''}
          </legend>
          <div className="grid grid-cols-3 gap-2">
            {CONFIDENCE_OPTIONS.map((o) => (
              <button
                key={o.value}
                disabled={!selected}
                onClick={() => onConfidence(o.value)}
                aria-pressed={confidence === o.value}
                className={`btn flex-col gap-0 border px-2 ${
                  confidence === o.value
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{o.label}</span>
                <span className="text-[10px] font-normal opacity-80">{o.hint}</span>
              </button>
            ))}
          </div>
          {!selected && <p className="mt-2 text-xs muted">Pick an answer first.</p>}
        </fieldset>
      )}

      {revealed && (
        <div className="space-y-3">

          <div className="card">
            <div className="mb-1 text-xs font-bold uppercase tracking-wide muted">Explanation</div>
            <Markdown>{q.explanation}</Markdown>
          </div>
          {(!correct || confidence === 'guess') && <ErrorTagger q={q} section={section} />}
        </div>
      )}
    </article>
  )
}

export function ErrorTagger({ q, section }: { q: Mcq; section: SectionId }) {
  const [cause, setCause] = useState<ErrorCause | null>(null)
  return (
    <div className="rounded-lg border border-amber-300 bg-amber-50 p-3 dark:border-amber-800 dark:bg-amber-950/30">
      <div className="text-sm font-semibold">Why did you miss it? (feeds your error log)</div>
      <div className="mt-2 flex flex-wrap gap-2">
        {ERROR_CAUSES.map((c) => (
          <button
            key={c}
            className={`chip min-h-9 border px-3 text-sm ${cause === c ? 'border-amber-700 bg-amber-600 text-white' : 'border-amber-300 bg-white dark:border-amber-800 dark:bg-slate-900'}`}
            aria-pressed={cause === c}
            onClick={() => {
              setCause(c)
              logError(q.id, q.moduleId, section, c)
            }}
          >
            {ERROR_CAUSE_LABELS[c]}
          </button>
        ))}
      </div>
      {cause && <p className="mt-2 text-xs muted">Logged. Analytics will use this to suggest what to do next.</p>}
    </div>
  )
}
