import { Link } from 'react-router-dom'
import { getSection } from '../content'
import { useStudyState } from '../hooks/useStore'
import { daysUntil } from '../lib/analytics'
import { formatDay, formatMinutes } from '../lib/dates'
import { taskRoute } from '../lib/studyState'
import Icon from '../components/Icon'
import { ProgressBar, pct } from '../components/ui'

const TASK_ICONS: Record<string, string> = {
  review: 'refresh',
  lesson: 'book',
  practice: 'check',
  mastery: 'star',
  tbs: 'sim',
  mixed: 'check',
  mock: 'exam',
  final: 'star',
  exam: 'exam',
}

export default function Dashboard() {
  const { state, settings } = useStudyState()
  if (!state || !settings) return <p className="muted">Loading…</p>
  const section = getSection(settings.activeSection)!
  const examDate = settings.examDates[section.id]
  const countdown = daysUntil(examDate)
  const today = state.plan.days[0]
  const r = state.readiness

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm muted">{section.name}</p>
        <h1 className="h1">
          {countdown !== null && countdown >= 0 ? (
            <>
              {countdown} day{countdown === 1 ? '' : 's'} to {section.id}
            </>
          ) : (
            <>{section.id} study home</>
          )}
        </h1>
        {examDate ? (
          <p className="muted text-sm">Exam on {formatDay(examDate, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
        ) : (
          <p className="text-sm">
            <Link to="/settings" className="text-blue-700 underline dark:text-blue-400">
              Set your exam date
            </Link>{' '}
            to unlock a full countdown plan.
          </p>
        )}
        {section.status === 'scaffold' && (
          <p className="mt-2 rounded-lg bg-amber-50 p-2 text-sm dark:bg-amber-950/40">
            {section.id} is in preview: the full blueprint outline and a sample module are here; the rest of the content is coming in later updates.
          </p>
        )}
      </div>

      {/* The one obvious next step */}
      <Link
        to={state.next.to}
        className="block rounded-2xl bg-blue-700 p-5 text-white shadow-lg transition hover:bg-blue-800 focus-visible:outline-offset-4 dark:bg-blue-600 dark:hover:bg-blue-500"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="text-2xl font-bold">{state.next.label} →</div>
            <div className="mt-1 truncate text-blue-100">{state.next.detail}</div>
          </div>
          <Icon name="chevron" className="h-8 w-8 shrink-0" />
        </div>
      </Link>

      <section className="card" aria-labelledby="today">
        <div className="mb-3 flex items-center justify-between">
          <h2 id="today" className="h2">
            Today’s plan
          </h2>
          <Link to="/plan" className="text-sm text-blue-700 hover:underline dark:text-blue-400">
            Full schedule
          </Link>
        </div>
        {today && today.tasks.length ? (
          <ul className="divide-y divide-slate-100 dark:divide-slate-800">
            {today.tasks.map((t, i) => (
              <li key={i}>
                <Link to={taskRoute(t, section.id)} className="flex items-center gap-3 py-2.5 hover:text-blue-700 dark:hover:text-blue-400">
                  <Icon name={TASK_ICONS[t.kind]} className="h-5 w-5 shrink-0 text-blue-700 dark:text-blue-400" />
                  <span className="min-w-0 flex-1 text-sm">
                    {t.kind === 'review' && state.dueCount > 0 ? `${t.label} — ${state.dueCount} due` : t.label}
                  </span>
                  {t.minutes > 0 && <span className="shrink-0 text-xs muted tabular-nums">{formatMinutes(t.minutes)}</span>}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm muted">No study time scheduled today. Rest counts too — or do a quick review if you have 10 minutes.</p>
        )}
        <p className={`mt-3 rounded-lg p-2 text-sm ${state.plan.status.onTrack ? 'bg-emerald-50 dark:bg-emerald-950/30' : 'bg-amber-50 dark:bg-amber-950/40'}`}>
          {state.plan.status.message}
        </p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        <section className="card" aria-labelledby="progress">
          <h2 id="progress" className="h2 mb-3">
            Progress
          </h2>
          <div className="space-y-3 text-sm">
            <div>
              <div className="mb-1 flex justify-between">
                <span>Lessons completed</span>
                <span className="tabular-nums">{pct(state.lessonsPct)}</span>
              </div>
              <ProgressBar value={state.lessonsPct} label="Lessons completed" />
            </div>
            <div>
              <div className="mb-1 flex justify-between">
                <span>Modules mastered</span>
                <span className="tabular-nums">{pct(state.progressPct)}</span>
              </div>
              <ProgressBar value={state.progressPct} label="Modules mastered" />
            </div>
            <div className="flex justify-between">
              <span>Due for review</span>
              <Link to="/review" className="font-semibold text-blue-700 dark:text-blue-400">
                {state.dueCount}
              </Link>
            </div>
          </div>
        </section>

        <section className="card" aria-labelledby="ready">
          <h2 id="ready" className="h2">
            Readiness
          </h2>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-3xl font-bold">{r.overall !== null ? `≈ ${r.overall}` : '—'}</span>
            <span className="font-semibold">{r.label}</span>
          </div>
          {r.band && (
            <p className="text-xs muted">
              Likely range {r.band[0]}–{r.band[1]} on the approximate 0–99 scale used for mock exams (75 ≈ passing).
            </p>
          )}
          <p className="mt-1 text-xs muted">{r.detail}</p>
          <ul className="mt-3 space-y-2 text-sm">
            {r.areas.map((a) => (
              <li key={a.areaId}>
                <div className="mb-1 flex justify-between gap-2">
                  <span className="truncate">{a.title}</span>
                  <span className="shrink-0 tabular-nums">{a.estimate !== null && a.n >= 5 ? pct(a.estimate) : '—'}</span>
                </div>
                <ProgressBar value={a.estimate !== null && a.n >= 5 ? a.estimate : 0} label={a.title} />
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs muted">Estimated % correct by blueprint area. An estimate from your practice, not a score prediction.</p>
        </section>
      </div>

      {state.recommendations.length > 0 && (
        <section className="card" aria-labelledby="weak">
          <h2 id="weak" className="h2 mb-2">
            Weakest areas — study these next
          </h2>
          <ul className="space-y-3">
            {state.recommendations.map((rec) => (
              <li key={rec.moduleId} className="text-sm">
                <Link to={`/module/${rec.moduleId}`} className="font-semibold text-blue-700 hover:underline dark:text-blue-400">
                  {rec.title}
                </Link>
                <div className="muted">{rec.reason}</div>
                <div>→ {rec.action}</div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
