export function formatClock(ms: number): string {
  const s = Math.max(0, Math.floor(ms / 1000))
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  const mm = String(m).padStart(2, '0')
  const ss = String(sec).padStart(2, '0')
  return h ? `${h}:${mm}:${ss}` : `${mm}:${ss}`
}

export default function Clock({ ms, label, warn = false }: { ms: number; label: string; warn?: boolean }) {
  return (
    <span className={`font-mono tabular-nums ${warn ? 'font-bold text-rose-600 dark:text-rose-400' : ''}`} aria-label={`${label} ${formatClock(ms)}`}>
      {formatClock(ms)}
    </span>
  )
}
