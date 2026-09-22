import { useState } from 'react'
import { evaluate } from '../lib/calc'

/** Basic four-function calculator with memory, similar to the exam's on-screen tool. */

export default function Calculator({ onClose }: { onClose: () => void }) {
  const [display, setDisplay] = useState('0')
  const [acc, setAcc] = useState<number | null>(null)
  const [op, setOp] = useState<string | null>(null)
  const [fresh, setFresh] = useState(true)
  const [mem, setMem] = useState(0)

  const cur = () => Number(display)
  const show = (n: number) => setDisplay(Number.isFinite(n) ? String(Math.round(n * 1e10) / 1e10) : 'Error')
  const digit = (d: string) => {
    if (fresh || display === '0' || display === 'Error') setDisplay(d === '.' ? '0.' : d)
    else if (!(d === '.' && display.includes('.'))) setDisplay(display + d)
    setFresh(false)
  }
  const operator = (o: string) => {
    if (acc !== null && op && !fresh) {
      const r = evaluate(acc, cur(), op)
      setAcc(r)
      show(r)
    } else setAcc(cur())
    setOp(o)
    setFresh(true)
  }
  const equals = () => {
    if (acc === null || !op) return
    const r = evaluate(acc, cur(), op)
    show(r)
    setAcc(null)
    setOp(null)
    setFresh(true)
  }
  const keys: [string, () => void, string?][] = [
    ['MC', () => setMem(0), 'fn'],
    ['MR', () => (show(mem), setFresh(true)), 'fn'],
    ['M+', () => setMem(mem + cur()), 'fn'],
    ['M−', () => setMem(mem - cur()), 'fn'],
    ['C', () => (setDisplay('0'), setAcc(null), setOp(null), setFresh(true)), 'fn'],
    ['CE', () => (setDisplay('0'), setFresh(true)), 'fn'],
    ['±', () => show(-cur()), 'fn'],
    ['÷', () => operator('÷'), 'op'],
    ['7', () => digit('7')],
    ['8', () => digit('8')],
    ['9', () => digit('9')],
    ['×', () => operator('×'), 'op'],
    ['4', () => digit('4')],
    ['5', () => digit('5')],
    ['6', () => digit('6')],
    ['−', () => operator('−'), 'op'],
    ['1', () => digit('1')],
    ['2', () => digit('2')],
    ['3', () => digit('3')],
    ['+', () => operator('+'), 'op'],
    ['%', () => show(acc !== null ? (acc * cur()) / 100 : cur() / 100), 'fn'],
    ['0', () => digit('0')],
    ['.', () => digit('.')],
    ['=', equals, 'eq'],
  ]
  return (
    <div
      className="fixed right-3 bottom-24 z-50 w-64 rounded-xl border border-slate-300 bg-white p-3 shadow-2xl md:bottom-6 dark:border-slate-700 dark:bg-slate-900"
      role="dialog"
      aria-label="Calculator"
      onKeyDown={(e) => {
        if (/^[0-9.]$/.test(e.key)) digit(e.key)
        else if (e.key === '+') operator('+')
        else if (e.key === '-') operator('−')
        else if (e.key === '*') operator('×')
        else if (e.key === '/') operator('÷')
        else if (e.key === 'Enter' || e.key === '=') equals()
        else if (e.key === 'Escape') onClose()
        else return
        e.preventDefault()
      }}
    >
      <div className="mb-2 flex items-center justify-between text-xs muted">
        <span>Calculator{mem ? ' · M' : ''}</span>
        <button onClick={onClose} className="px-1 hover:underline" aria-label="Close calculator">
          ✕
        </button>
      </div>
      <output className="mb-2 block truncate rounded bg-slate-100 px-2 py-2 text-right font-mono text-xl dark:bg-slate-800" aria-live="polite">
        {display}
      </output>
      <div className="grid grid-cols-4 gap-1.5">
        {keys.map(([k, fn, kind]) => (
          <button
            key={k}
            onClick={fn}
            className={`rounded-md py-2 text-sm font-semibold ${
              kind === 'eq'
                ? 'bg-blue-700 text-white'
                : kind === 'op'
                  ? 'bg-slate-300 dark:bg-slate-700'
                  : kind === 'fn'
                    ? 'bg-slate-200 text-xs dark:bg-slate-800'
                    : 'bg-slate-100 dark:bg-slate-800/60'
            }`}
          >
            {k}
          </button>
        ))}
      </div>
    </div>
  )
}
