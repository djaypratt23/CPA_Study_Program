import { useState } from 'react'
import { useIsWide } from '../hooks/useDesktop'
import type { Tbs, TbsPart } from '../content/schema'
import { scoreTbs, type JournalLineResponse, type PartResponse, type TbsResponses } from '../lib/tbsScoring'
import Markdown from './Markdown'
import { ReviewBadge } from './ui'

interface Props {
  tbs: Tbs
  responses: TbsResponses
  onChange: (r: TbsResponses) => void
  submitted: boolean
  /** On wide screens, show exhibits beside the task (like the exam's split view). */
  split?: boolean
}

export default function TbsView({ tbs, responses, onChange, submitted, split = false }: Props) {
  const [tab, setTab] = useState<number>(-1) // -1 = task, otherwise exhibit index
  const [exhibit, setExhibit] = useState(0) // split view: exhibit shown in the side panel
  const wide = useIsWide()
  const set = (partId: string, r: PartResponse) => onChange({ ...responses, [partId]: r })
  const score = submitted ? scoreTbs(tbs, responses) : null
  const splitView = split && wide && tbs.exhibits.length > 0

  const task = (
    <div role={splitView ? undefined : 'tabpanel'} className="space-y-6">
      <div className="card">
        <Markdown>{tbs.instructions}</Markdown>
        {tbs.exhibits.length > 0 && (
          <p className="mt-2 text-xs muted">
            {splitView ? 'The exhibits are in the panel on the right.' : 'Open the exhibit tabs above for the information you need.'}
          </p>
        )}
      </div>
      {tbs.parts.map((p) => (
        <section key={p.id} className="card space-y-3">
          <Markdown className="prose-lesson font-medium">{p.prompt}</Markdown>
          <PartInput part={p} response={responses[p.id]} onChange={(r) => set(p.id, r)} disabled={submitted} />
        </section>
      ))}
    </div>
  )

  if (splitView) {
    const ex = tbs.exhibits[Math.min(exhibit, tbs.exhibits.length - 1)]
    return (
      <div className="space-y-4">
        {tbs.needsReview && <ReviewBadge note={tbs.reviewNote} />}
        <div className="grid grid-cols-2 items-start gap-6">
          {task}
          <aside className="card sticky top-16 flex max-h-[calc(100dvh-5rem)] flex-col p-0" aria-label="Exhibits">
            <div className="flex shrink-0 gap-1 overflow-x-auto border-b border-slate-200 px-2 dark:border-slate-800" role="tablist" aria-label="Exhibits">
              {tbs.exhibits.map((e, i) => (
                <TabButton key={i} active={exhibit === i} onClick={() => setExhibit(i)}>
                  📎 {e.title}
                </TabButton>
              ))}
            </div>
            <div className="min-h-0 overflow-y-auto p-4" role="tabpanel">
              <h2 className="mb-2 font-semibold">{ex.title}</h2>
              <Markdown>{ex.content}</Markdown>
            </div>
          </aside>
        </div>
        {score && <TbsResults score={score} />}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {tbs.needsReview && <ReviewBadge note={tbs.reviewNote} />}
      <div className="flex gap-1 overflow-x-auto border-b border-slate-200 dark:border-slate-800" role="tablist" aria-label="Task and exhibits">
        <TabButton active={tab === -1} onClick={() => setTab(-1)}>
          Task
        </TabButton>
        {tbs.exhibits.map((e, i) => (
          <TabButton key={i} active={tab === i} onClick={() => setTab(i)}>
            📎 {e.title}
          </TabButton>
        ))}
      </div>

      {tab >= 0 ? (
        <div className="card" role="tabpanel">
          <h2 className="mb-2 font-semibold">{tbs.exhibits[tab].title}</h2>
          <Markdown>{tbs.exhibits[tab].content}</Markdown>
          <button className="btn-secondary mt-3" onClick={() => setTab(-1)}>
            Back to task
          </button>
        </div>
      ) : (
        task
      )}

      {score && <TbsResults score={score} />}
    </div>
  )
}

function TbsResults({ score }: { score: ReturnType<typeof scoreTbs> }) {
  return (
    <section className="space-y-3" aria-labelledby="tbs-results">
      <div className="card">
        <h2 id="tbs-results" className="h2">
          Score: {score.earned}/{score.possible} cells ({Math.round(score.percent * 100)}%)
        </h2>
        <p className="text-sm muted">Each cell is scored separately — partial credit, just like the exam.</p>
      </div>
      <ul className="space-y-2">
        {score.cells.map((c) => (
          <li key={c.cellId} className={`card border-l-4 ${c.correct ? 'border-l-emerald-500' : 'border-l-rose-500'}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="font-semibold">
                {c.correct ? '✓' : '✗'} {c.label}
              </span>
              <span className="text-sm">
                {!c.correct && (
                  <>
                    You: <span className="font-mono">{c.given || '—'}</span> ·{' '}
                  </>
                )}
                Answer: <span className="font-mono font-semibold">{c.expected}</span>
              </span>
            </div>
            <Markdown className="prose-lesson mt-1 text-sm">{c.explanation}</Markdown>
          </li>
        ))}
      </ul>
    </section>
  )
}

/** Renders a document-review text segment, honoring **bold** runs within the segment. */
function InlineText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g)
  return <span>{parts.map((p, i) => (i % 2 === 1 ? <strong key={i}>{p}</strong> : p))}</span>
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`shrink-0 border-b-2 px-3 py-2 text-sm font-medium ${active ? 'border-blue-700 text-blue-800 dark:border-blue-400 dark:text-blue-300' : 'border-transparent muted hover:text-slate-900 dark:hover:text-white'}`}
    >
      {children}
    </button>
  )
}

function PartInput({ part, response, onChange, disabled }: { part: TbsPart; response?: PartResponse; onChange: (r: PartResponse) => void; disabled: boolean }) {
  switch (part.kind) {
    case 'numeric': {
      const values = response?.kind === 'numeric' ? response.values : {}
      return (
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {part.rows.map((r) => (
            <div key={r.id} className="flex flex-col gap-1 py-2 sm:flex-row sm:items-center sm:justify-between">
              <label htmlFor={`${part.id}-${r.id}`} className="text-sm sm:max-w-[60%]">
                {r.label}
              </label>
              <input
                id={`${part.id}-${r.id}`}
                className="input font-mono sm:w-44 sm:text-right"
                inputMode="decimal"
                disabled={disabled}
                value={values[r.id] ?? ''}
                placeholder="0"
                onChange={(e) => onChange({ kind: 'numeric', values: { ...values, [r.id]: e.target.value } })}
              />
            </div>
          ))}
          <p className="pt-2 text-xs muted">Enter whole dollars unless told otherwise. Commas and $ are fine; use a minus sign or (parentheses) for negatives.</p>
        </div>
      )
    }
    case 'dropdown': {
      const values = response?.kind === 'dropdown' ? response.values : {}
      return (
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {part.rows.map((r) => (
            <div key={r.id} className="flex flex-col gap-1 py-2 sm:flex-row sm:items-center sm:justify-between">
              <label htmlFor={`${part.id}-${r.id}`} className="text-sm sm:max-w-[55%]">
                {r.label}
              </label>
              <select
                id={`${part.id}-${r.id}`}
                className="input sm:w-64"
                disabled={disabled}
                value={values[r.id] ?? ''}
                onChange={(e) => onChange({ kind: 'dropdown', values: { ...values, [r.id]: e.target.value } })}
              >
                <option value="">Select…</option>
                {(r.options ?? part.options ?? []).map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )
    }
    case 'journal': {
      const lines: JournalLineResponse[] =
        response?.kind === 'journal' ? response.lines : Array.from({ length: part.maxLines }, () => ({ account: '' }))
      const update = (i: number, patch: Partial<JournalLineResponse>) =>
        onChange({ kind: 'journal', lines: lines.map((l, j) => (j === i ? { ...l, ...patch } : l)) })
      return (
        <div className="overflow-x-auto">
          {/* Below the sm breakpoint each line stacks: account on top, debit and credit side by side. */}
          <table className="w-full text-sm sm:min-w-[34rem]">
            <thead className="hidden sm:table-header-group">
              <tr className="text-left text-xs uppercase muted">
                <th className="py-1 pr-2">Account</th>
                <th className="w-32 py-1 pr-2 text-right">Debit</th>
                <th className="w-32 py-1 text-right">Credit</th>
              </tr>
            </thead>
            <tbody>
              {lines.map((l, i) => (
                <tr key={i} className="grid grid-cols-2 gap-x-2 gap-y-1 border-b border-slate-100 py-2 sm:table-row sm:border-0 sm:py-0 dark:border-slate-800">
                  <td className="col-span-2 sm:table-cell sm:py-1 sm:pr-2">
                    <select className="input" aria-label={`Line ${i + 1} account`} disabled={disabled} value={l.account} onChange={(e) => update(i, { account: e.target.value })}>
                      <option value="">—</option>
                      {part.accounts.map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="sm:table-cell sm:py-1 sm:pr-2">
                    <span className="text-xs muted sm:hidden" aria-hidden="true">
                      Debit
                    </span>
                    <input
                      className="input text-right font-mono"
                      inputMode="decimal"
                      aria-label={`Line ${i + 1} debit`}
                      disabled={disabled}
                      value={l.debit ?? ''}
                      onChange={(e) => update(i, { debit: e.target.value === '' ? null : e.target.value })}
                    />
                  </td>
                  <td className="sm:table-cell sm:py-1">
                    <span className="text-xs muted sm:hidden" aria-hidden="true">
                      Credit
                    </span>
                    <input
                      className="input text-right font-mono"
                      inputMode="decimal"
                      aria-label={`Line ${i + 1} credit`}
                      disabled={disabled}
                      value={l.credit ?? ''}
                      onChange={(e) => update(i, { credit: e.target.value === '' ? null : e.target.value })}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="pt-2 text-xs muted">Use only the lines you need. Order does not matter; extra lines cost credit.</p>
        </div>
      )
    }
    case 'docreview': {
      const values = response?.kind === 'docreview' ? response.values : {}
      return (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 leading-8 dark:border-slate-700 dark:bg-slate-950">
          {part.segments.map((s, i) =>
            'id' in s ? (
              <select
                key={i}
                aria-label={`Replacement for: ${s.original}`}
                disabled={disabled}
                className="mx-0.5 inline max-w-full rounded border-2 border-dashed border-blue-500 bg-blue-50 px-1 py-0.5 text-sm dark:bg-blue-950"
                value={values[s.id] ?? s.original}
                onChange={(e) => onChange({ kind: 'docreview', values: { ...values, [s.id]: e.target.value } })}
              >
                {s.options.map((o) => (
                  <option key={o} value={o}>
                    {o === s.original ? `${o} (original)` : o}
                  </option>
                ))}
              </select>
            ) : (
              <InlineText key={i} text={s.text} />
            ),
          )}
          <p className="mt-2 text-xs leading-normal muted">Dashed boxes are editable. Keep the original text if it is already correct.</p>
        </div>
      )
    }
    case 'research': {
      const value = response?.kind === 'research' ? response.value : ''
      return (
        <fieldset className="space-y-2">
          <legend className="text-sm muted">Select the excerpt that answers the question.</legend>
          {part.excerpts.map((e) => (
            <label key={e.id} className={`card flex cursor-pointer gap-3 p-3 ${value === e.id ? 'border-blue-600 ring-2 ring-blue-600/30' : ''}`}>
              <input type="radio" name={part.id} className="mt-1 accent-blue-700" disabled={disabled} checked={value === e.id} onChange={() => onChange({ kind: 'research', value: e.id })} />
              <span>
                <span className="block text-xs font-bold">{e.citation}</span>
                <span className="text-sm">{e.text}</span>
              </span>
            </label>
          ))}
        </fieldset>
      )
    }
  }
}
