import { useState } from 'react'
import type { z } from 'zod'
import type { FadedBlock, JournalBlock, TAccountBlock, TimelineBlock, WorkedBlock } from '../content/schema'
import { parseAmount, withinTolerance } from '../lib/tbsScoring'
import Markdown from './Markdown'

const money = (n: number) => n.toLocaleString('en-US')

export function WorkedExample({ data }: { data: z.infer<typeof WorkedBlock> }) {
  const [shown, setShown] = useState(1)
  return (
    <section className="my-6 rounded-xl border border-blue-200 bg-blue-50/60 p-4 dark:border-blue-900 dark:bg-blue-950/30" aria-label={`Worked example: ${data.title}`}>
      <div className="text-xs font-bold uppercase tracking-wide text-blue-800 dark:text-blue-300">Worked example</div>
      <h4 className="mt-1 font-semibold">{data.title}</h4>
      <Markdown className="prose-lesson text-sm">{data.scenario}</Markdown>
      <ol className="mt-3 space-y-2">
        {data.steps.slice(0, shown).map((s, i) => (
          <li key={i} className="rounded-lg bg-white p-3 text-sm shadow-sm dark:bg-slate-900">
            <div className="font-semibold">
              Step {i + 1}: {s.label}
            </div>
            <Markdown className="prose-lesson text-sm">{s.work}</Markdown>
            {s.result && <div className="mt-1 font-semibold text-emerald-800 dark:text-emerald-300">→ {s.result}</div>}
          </li>
        ))}
      </ol>
      {shown < data.steps.length ? (
        <button className="btn-secondary mt-3" onClick={() => setShown((n) => n + 1)}>
          Show step {shown + 1} of {data.steps.length}
        </button>
      ) : (
        data.insight && (
          <p className="mt-3 rounded-lg bg-emerald-50 p-3 text-sm dark:bg-emerald-950/40">
            <strong>Why it works:</strong> {data.insight}
          </p>
        )
      )}
      {shown < data.steps.length && (
        <button className="btn-ghost mt-3 ml-2 text-xs" onClick={() => setShown(data.steps.length)}>
          Show all
        </button>
      )}
    </section>
  )
}

export function FadedExample({ data }: { data: z.infer<typeof FadedBlock> }) {
  const [values, setValues] = useState<Record<number, string>>({})
  const [checked, setChecked] = useState<Record<number, boolean>>({})
  const [hints, setHints] = useState<Record<number, boolean>>({})
  return (
    <section className="my-6 rounded-xl border border-violet-200 bg-violet-50/60 p-4 dark:border-violet-900 dark:bg-violet-950/30" aria-label={`Your turn: ${data.title}`}>
      <div className="text-xs font-bold uppercase tracking-wide text-violet-800 dark:text-violet-300">Your turn — faded example</div>
      <h4 className="mt-1 font-semibold">{data.title}</h4>
      <Markdown className="prose-lesson text-sm">{data.scenario}</Markdown>
      <ol className="mt-3 space-y-2">
        {data.steps.map((s, i) => {
          const needs = s.answer !== undefined
          const ok = needs && checked[i] ? withinTolerance(parseAmount(values[i]), s.answer!, s.tolerance) : undefined
          return (
            <li key={i} className="rounded-lg bg-white p-3 text-sm shadow-sm dark:bg-slate-900">
              <div className="font-semibold">
                Step {i + 1}: {s.label}
              </div>
              {s.work && <Markdown className="prose-lesson text-sm">{s.work}</Markdown>}
              {needs && (
                <div className="mt-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <label className="sr-only" htmlFor={`faded-${data.title}-${i}`}>
                      Your answer for step {i + 1}
                    </label>
                    <input
                      id={`faded-${data.title}-${i}`}
                      className="input max-w-44"
                      inputMode="decimal"
                      placeholder="Your answer"
                      value={values[i] ?? ''}
                      onChange={(e) => {
                        setValues((v) => ({ ...v, [i]: e.target.value }))
                        setChecked((c) => ({ ...c, [i]: false }))
                      }}
                      onKeyDown={(e) => e.key === 'Enter' && setChecked((c) => ({ ...c, [i]: true }))}
                    />
                    <button className="btn-secondary" onClick={() => setChecked((c) => ({ ...c, [i]: true }))}>
                      Check
                    </button>
                    {s.hint && !hints[i] && (
                      <button className="btn-ghost text-xs" onClick={() => setHints((h) => ({ ...h, [i]: true }))}>
                        Hint
                      </button>
                    )}
                  </div>
                  {hints[i] && <p className="mt-2 text-xs muted">Hint: {s.hint}</p>}
                  {ok === true && <p className="mt-2 font-semibold text-emerald-700 dark:text-emerald-400">✓ Correct: {money(s.answer!)}</p>}
                  {ok === false && (
                    <div className="mt-2 text-rose-700 dark:text-rose-400">
                      <p className="font-semibold">Not quite. Expected {money(s.answer!)}.</p>
                      {s.solution && <Markdown className="prose-lesson text-sm">{s.solution}</Markdown>}
                    </div>
                  )}
                  {ok === true && s.solution && <Markdown className="prose-lesson text-sm muted">{s.solution}</Markdown>}
                </div>
              )}
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export function JournalEntry({ data }: { data: z.infer<typeof JournalBlock> }) {
  const dr = data.lines.reduce((s, l) => s + (l.debit ?? 0), 0)
  const cr = data.lines.reduce((s, l) => s + (l.credit ?? 0), 0)
  return (
    <figure className="my-5 overflow-x-auto rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
      {(data.title || data.date) && (
        <figcaption className="border-b border-slate-200 px-3 py-2 text-sm font-semibold dark:border-slate-700">
          {data.title} {data.date && <span className="font-normal muted">· {data.date}</span>}
        </figcaption>
      )}
      <table className="w-full min-w-[20rem] text-sm">
        <thead>
          <tr className="text-left text-xs uppercase muted">
            <th className="px-3 py-1.5">Account</th>
            <th className="px-3 py-1.5 text-right">Debit</th>
            <th className="px-3 py-1.5 text-right">Credit</th>
          </tr>
        </thead>
        <tbody className="font-mono">
          {data.lines.map((l, i) => (
            <tr key={i} className="border-t border-slate-100 dark:border-slate-800">
              <td className={`px-3 py-1.5 font-sans ${l.credit !== undefined ? 'pl-10' : ''}`}>{l.account}</td>
              <td className="px-3 py-1.5 text-right">{l.debit !== undefined ? money(l.debit) : ''}</td>
              <td className="px-3 py-1.5 text-right">{l.credit !== undefined ? money(l.credit) : ''}</td>
            </tr>
          ))}
          <tr className="border-t-2 border-slate-300 text-xs muted dark:border-slate-600">
            <td className="px-3 py-1 font-sans">Totals</td>
            <td className="px-3 py-1 text-right">{money(dr)}</td>
            <td className="px-3 py-1 text-right">{money(cr)}</td>
          </tr>
        </tbody>
      </table>
      {data.memo && <p className="border-t border-slate-200 px-3 py-2 text-xs italic muted dark:border-slate-700">{data.memo}</p>}
    </figure>
  )
}

export function TAccounts({ data }: { data: z.infer<typeof TAccountBlock> }) {
  return (
    <figure className="my-5">
      {data.title && <figcaption className="mb-2 text-sm font-semibold">{data.title}</figcaption>}
      <div className="grid gap-4 sm:grid-cols-2">
        {data.accounts.map((a) => {
          const d = a.debits.reduce((s, x) => s + x.amount, 0)
          const c = a.credits.reduce((s, x) => s + x.amount, 0)
          const bal = d - c
          return (
            <div key={a.name} className="rounded-lg border border-slate-200 bg-white p-3 text-sm dark:border-slate-700 dark:bg-slate-900">
              <div className="border-b-2 border-slate-800 pb-1 text-center font-semibold dark:border-slate-300">{a.name}</div>
              <div className="grid grid-cols-2">
                <div className="border-r-2 border-slate-800 pr-2 dark:border-slate-300">
                  {a.debits.map((x, i) => (
                    <div key={i} className="flex justify-between gap-2 py-0.5">
                      <span className="truncate text-xs muted">{x.label}</span>
                      <span className="font-mono">{money(x.amount)}</span>
                    </div>
                  ))}
                </div>
                <div className="pl-2">
                  {a.credits.map((x, i) => (
                    <div key={i} className="flex justify-between gap-2 py-0.5">
                      <span className="font-mono">{money(x.amount)}</span>
                      <span className="truncate text-xs muted">{x.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-1 border-t border-slate-300 pt-1 text-xs font-semibold dark:border-slate-600">
                {bal >= 0 ? `Debit balance ${money(bal)}` : `Credit balance ${money(-bal)}`}
              </div>
            </div>
          )
        })}
      </div>
    </figure>
  )
}

export function Timeline({ data }: { data: z.infer<typeof TimelineBlock> }) {
  return (
    <figure className="my-5">
      {data.title && <figcaption className="mb-2 text-sm font-semibold">{data.title}</figcaption>}
      <ol className="relative border-l-2 border-blue-300 pl-5 dark:border-blue-800">
        {data.events.map((e, i) => (
          <li key={i} className="mb-4 last:mb-0">
            <span className="absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full bg-blue-600 dark:bg-blue-400" aria-hidden="true" />
            <div className="text-xs font-bold uppercase tracking-wide text-blue-800 dark:text-blue-300">{e.when}</div>
            <div className="font-semibold">{e.label}</div>
            {e.detail && <div className="text-sm muted">{e.detail}</div>}
          </li>
        ))}
      </ol>
    </figure>
  )
}
