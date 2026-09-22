import { Link } from 'react-router-dom'
import { useStudyState } from '../hooks/useStore'
import { dayKey, formatDay, formatMinutes } from '../lib/dates'
import { taskRoute } from '../lib/studyState'
import { PageHeader } from '../components/ui'

export default function Planner() {
  const { state, settings } = useStudyState()
  if (!state || !settings) return <p className="muted">Loading…</p>
  const { days, status } = state.plan
  const today = dayKey()
  return (
    <div>
      <PageHeader
        title="Study plan"
        subtitle="Re-plans itself every time you open the app: finish early and it pulls work forward; fall behind and it redistributes."
        actions={
          <Link to="/settings" className="btn-secondary">
            Change hours or date
          </Link>
        }
      />
      <div className={`card mb-6 ${status.onTrack ? '' : 'border-amber-400 dark:border-amber-700'}`}>
        <p className="font-semibold">{status.onTrack ? 'On track' : 'Behind schedule'}</p>
        <p className="text-sm">{status.message}</p>
        {status.hasExamDate && (
          <dl className="mt-3 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
            <div>
              <dt className="muted text-xs">Days left</dt>
              <dd className="font-semibold">{status.daysLeft}</dd>
            </div>
            <div>
              <dt className="muted text-xs">Final review starts</dt>
              <dd className="font-semibold">{status.finalReviewStart ? formatDay(status.finalReviewStart) : '—'}</dd>
            </div>
            <div>
              <dt className="muted text-xs">New learning left</dt>
              <dd className="font-semibold">{formatMinutes(status.requiredMinutes)}</dd>
            </div>
            <div>
              <dt className="muted text-xs">Time available for it</dt>
              <dd className="font-semibold">{formatMinutes(status.availableMinutes)}</dd>
            </div>
          </dl>
        )}
      </div>
      <ol className="space-y-3">
        {days.map((d) => (
          <li key={d.date} className={`card ${d.date === today ? 'ring-2 ring-blue-600' : ''}`}>
            <div className="mb-2 flex items-center justify-between">
              <div className="font-semibold">
                {d.date === today ? 'Today · ' : ''}
                {formatDay(d.date)}
              </div>
              <div className="flex items-center gap-2 text-xs">
                {d.phase === 'final-review' && <span className="chip bg-violet-100 text-violet-800 dark:bg-violet-900/50 dark:text-violet-200">Final review</span>}
                {d.phase === 'exam' && <span className="chip bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200">Exam</span>}
                <span className="muted">{d.capacity ? formatMinutes(d.capacity) : 'Off'}</span>
              </div>
            </div>
            {d.tasks.length ? (
              <ul className="space-y-1 text-sm">
                {d.tasks.map((t, i) => (
                  <li key={i} className="flex justify-between gap-3">
                    <Link to={taskRoute(t, settings.activeSection)} className="min-w-0 hover:text-blue-700 hover:underline dark:hover:text-blue-400">
                      {t.label}
                    </Link>
                    {t.minutes > 0 && <span className="shrink-0 muted tabular-nums">{formatMinutes(t.minutes)}</span>}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm muted">Rest day</p>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}
