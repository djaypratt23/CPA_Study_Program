import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export function ReviewBadge({ note }: { note?: string }) {
  return (
    <span
      className="chip bg-amber-100 text-amber-900 dark:bg-amber-900/50 dark:text-amber-200"
      title={note ?? 'This item is flagged for expert review. Verify against the authoritative source.'}
    >
      ⚠ Needs review
    </span>
  )
}

export function ProgressBar({ value, label, className = '' }: { value: number; label?: string; className?: string }) {
  const pct = Math.round(Math.max(0, Math.min(1, value)) * 100)
  return (
    <div className={className}>
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div className="h-full rounded-full bg-emerald-600 transition-all dark:bg-emerald-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

export function PageHeader({ title, subtitle, back, actions }: { title: string; subtitle?: ReactNode; back?: string; actions?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
      <div className="min-w-0">
        {back && (
          <Link to={back} className="mb-1 inline-block text-sm text-blue-700 hover:underline dark:text-blue-400">
            ← Back
          </Link>
        )}
        <h1 className="h1">{title}</h1>
        {subtitle && <p className="muted mt-1">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  )
}

export function Stat({ label, value, hint }: { label: string; value: ReactNode; hint?: string }) {
  return (
    <div className="card">
      <div className="text-xs font-medium uppercase tracking-wide muted">{label}</div>
      <div className="mt-1 text-2xl font-bold">{value}</div>
      {hint && <div className="mt-1 text-xs muted">{hint}</div>}
    </div>
  )
}

export function Empty({ children }: { children: ReactNode }) {
  return <div className="card text-center muted">{children}</div>
}

export const pct = (v: number | null | undefined, digits = 0) => (v === null || v === undefined ? '—' : `${(v * 100).toFixed(digits)}%`)

export const STATUS_STYLES: Record<string, { label: string; cls: string }> = {
  'not-started': { label: 'Not started', cls: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300' },
  learning: { label: 'Learning', cls: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200' },
  mastered: { label: 'Mastered', cls: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200' },
  slipping: { label: 'Slipping', cls: 'bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-200' },
  planned: { label: 'Coming later', cls: 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400' },
}

export function StatusChip({ status }: { status: string }) {
  const s = STATUS_STYLES[status] ?? STATUS_STYLES['not-started']
  return <span className={`chip ${s.cls}`}>{s.label}</span>
}

/**
 * Props for amount inputs. The iOS decimal keypad has no minus sign or parentheses, so amounts use the
 * text keyboard; the pattern flags anything parseAmount would reject.
 */
export const amountInputProps = {
  inputMode: 'text',
  autoComplete: 'off',
  autoCorrect: 'off',
  spellCheck: false,
  pattern: String.raw`\s*[\-−]?\s*\$?\s*\(?\s*\$?[\d,]*\.?\d+\s*%?\s*\)?\s*`,
} as const
