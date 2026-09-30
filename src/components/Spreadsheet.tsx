import { useEffect, useMemo, useRef, useState } from 'react'
import { colName, displayValue, evaluate, type Cells } from '../lib/sheet'

/**
 * A small scratch spreadsheet, like the exam's Excel-style tool (P1-10).
 * Type numbers or formulas (=A1+B2, =SUM(A1:A5), AVERAGE, MIN, MAX, ROUND).
 * Cells show computed values; the focused cell shows what you typed.
 */

const COLS = 5
const ROWS = 10

export default function Spreadsheet({ onClose }: { onClose: () => void }) {
  const [cells, setCells] = useState<Cells>({})
  const [active, setActive] = useState<string | null>(null)
  const dialog = useRef<HTMLDivElement>(null)
  const values = useMemo(() => evaluate(cells), [cells])

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    dialog.current?.focus()
    return () => previous?.focus?.()
  }, [])

  const move = (ref: string, dc: number, dr: number) => {
    const c = Math.min(COLS - 1, Math.max(0, ref.charCodeAt(0) - 65 + dc))
    const r = Math.min(ROWS, Math.max(1, Number(ref.slice(1)) + dr))
    document.getElementById(`sheet-${colName(c)}${r}`)?.focus()
  }

  return (
    <div
      className="fixed bottom-24 left-3 z-50 w-[min(34rem,calc(100vw-1.5rem))] rounded-xl border border-slate-300 bg-white p-3 shadow-2xl md:bottom-6 dark:border-slate-700 dark:bg-slate-900"
      role="dialog"
      aria-label="Spreadsheet"
      ref={dialog}
      tabIndex={-1}
      data-no-hotkeys
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          e.preventDefault()
          onClose()
        }
      }}
    >
      <div className="mb-2 flex items-center justify-between gap-2 text-xs muted">
        <span>Spreadsheet — type numbers or formulas such as =SUM(A1:A4)</span>
        <div className="flex gap-2">
          <button onClick={() => setCells({})} className="px-1 hover:underline">
            Clear
          </button>
          <button onClick={onClose} className="px-1 hover:underline" aria-label="Close spreadsheet">
            ✕
          </button>
        </div>
      </div>
      <div className="mb-2 truncate rounded bg-slate-100 px-2 py-1 font-mono text-xs dark:bg-slate-800" aria-live="polite">
        {active ? `${active}: ${cells[active] ?? ''}` : 'Select a cell'}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse font-mono text-xs">
          <thead>
            <tr>
              <td className="w-6" />
              {Array.from({ length: COLS }, (_, c) => (
                <th key={c} scope="col" className="px-1 py-0.5 font-semibold muted">
                  {colName(c)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: ROWS }, (_, r) => (
              <tr key={r}>
                <th scope="row" className="pr-1 text-right font-semibold muted">
                  {r + 1}
                </th>
                {Array.from({ length: COLS }, (_, c) => {
                  const ref = `${colName(c)}${r + 1}`
                  const editing = active === ref
                  return (
                    <td key={ref} className="border border-slate-200 p-0 dark:border-slate-700">
                      <input
                        id={`sheet-${ref}`}
                        aria-label={`Cell ${ref}`}
                        className="w-full min-w-16 bg-transparent px-1 py-1 text-right outline-none focus:bg-blue-50 dark:focus:bg-blue-950"
                        autoComplete="off"
                        spellCheck={false}
                        value={editing ? (cells[ref] ?? '') : displayValue(values[ref])}
                        onFocus={() => setActive(ref)}
                        onBlur={() => setActive((a) => (a === ref ? null : a))}
                        onChange={(e) =>
                          setCells((prev) => ({
                            ...prev,
                            [ref]: e.target.value,
                          }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            move(ref, 0, e.shiftKey ? -1 : 1)
                          } else if (e.key === 'ArrowDown') move(ref, 0, 1)
                          else if (e.key === 'ArrowUp') move(ref, 0, -1)
                        }}
                      />
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
