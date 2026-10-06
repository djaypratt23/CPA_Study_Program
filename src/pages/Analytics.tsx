import { useLiveQuery } from 'dexie-react-hooks'
import { Link } from 'react-router-dom'
import { PageHeader, ProgressBar, Stat, StatusChip, pct } from '../components/ui'
import { areaTitle, content, getModule, getSection } from '../content'
import { SKILL_LABELS, type SkillLevel } from '../content/schema'
import { db } from '../db'
import { ERROR_CAUSES, ERROR_CAUSE_LABELS } from '../db/types'
import { useStudyState } from '../hooks/useStore'
import { avgTimeSeconds, calibration, CAUSE_ADVICE, errorBreakdown, groupRate, rate, scoringAttempts, weeklyTrend } from '../lib/analytics'
import { formatDay } from '../lib/dates'

export default function Analytics() {
  const { state, settings } = useStudyState()
  const attemptsAll = useLiveQuery(() => db.attempts.toArray(), [])
  const errorsAll = useLiveQuery(() => db.errors.toArray(), [])
  if (!state || !settings || !attemptsAll || !errorsAll) return <p className="muted">Loading…</p>
  const section = getSection(settings.activeSection) ?? content.sections[0]
  const attempts = attemptsAll.filter((a) => a.section === section.id)
  const scoring = scoringAttempts(attempts)
  const mcq = scoring.filter((a) => a.itemType === 'mcq')
  const tbs = scoring.filter((a) => a.itemType === 'tbs')
  const errors = errorsAll.filter((e) => e.section === section.id)
  const overall = rate(mcq)
  const bySkill = groupRate(mcq, (a) => content.questions[a.itemId]?.skill)
  const byArea = groupRate(mcq, (a) => getModule(a.moduleId)?.areaId)
  const cal = calibration(mcq)
  const trend = weeklyTrend(mcq)
  const causes = errorBreakdown(errors)
  const causeTotal = Object.values(causes).reduce((a, b) => a + b, 0)
  const topCause = ERROR_CAUSES.slice().sort((a, b) => causes[b] - causes[a])[0]
  const avgMcq = avgTimeSeconds(mcq)
  const mcqCount = section.exam.testlets.filter((t) => t.kind === 'mcq').reduce((s, t) => s + t.count, 0)
  const tbsAvg = tbs.length ? tbs.reduce((s, a) => s + a.score, 0) / tbs.length : null
  const maxTrend = Math.max(1, ...trend.map((t) => t.rate.n))

  return (
    <div className="space-y-6">
      <PageHeader title="Performance analytics" subtitle={`${section.id} · guesses count as misses everywhere on this page`} />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="MCQ accuracy" value={pct(overall.pct)} hint={`${overall.n} answered`} />
        <Stat label="TBS average" value={pct(tbsAvg)} hint={`${tbs.length} submitted`} />
        <Stat label="Avg time / MCQ" value={avgMcq ? `${Math.round(avgMcq)}s` : '—'} hint={`Exam pace ≈ ${mcqCount ? Math.round(((section.exam.durationMinutes * 60) / 2 / mcqCount) * 1) : 90}s`} />
        <Stat
          label="Readiness (approx. scaled)"
          value={state.readiness.overall !== null ? `≈ ${state.readiness.overall}` : '—'}
          hint={state.readiness.band ? `${state.readiness.label} · range ${state.readiness.band[0]}–${state.readiness.band[1]}` : state.readiness.label}
        />
      </div>

      <section className="card" aria-labelledby="recs">
        <h2 id="recs" className="h2 mb-2">
          Weakest areas — study these next
        </h2>
        {state.recommendations.length ? (
          <ol className="list-decimal space-y-3 pl-5">
            {state.recommendations.map((r) => (
              <li key={r.moduleId}>
                <Link to={`/module/${r.moduleId}`} className="font-semibold text-blue-700 hover:underline dark:text-blue-400">
                  {r.title}
                </Link>
                <div className="text-sm muted">{r.reason}</div>
                <div className="text-sm">→ {r.action}</div>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-sm muted">No weak spots detected yet. Complete a few lessons and practice sets and this will fill in.</p>
        )}
      </section>

      <section className="card" aria-labelledby="areas">
        <h2 id="areas" className="h2 mb-3">
          By blueprint area
        </h2>
        <ul className="space-y-3">
          {section.areas.map((a) => {
            const r = byArea[a.id]
            const ar = state.readiness.areas.find((x) => x.areaId === a.id)
            return (
              <li key={a.id}>
                <div className="mb-1 flex justify-between gap-2 text-sm">
                  <span>
                    {a.title} <span className="muted">({a.allocation.min}–{a.allocation.max}%)</span>
                  </span>
                  <span className="tabular-nums">
                    {pct(r?.pct)} <span className="muted">· n={r?.n ?? 0}</span>
                  </span>
                </div>
                <ProgressBar value={r?.pct ?? 0} label={a.title} />
                {ar && (
                  <div className="mt-1 text-xs muted">
                    Studied {pct(ar.coverage)} of modules · mastered {pct(ar.masteredShare)}
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        <section className="card" aria-labelledby="skills">
          <h2 id="skills" className="h2 mb-3">
            By skill level
          </h2>
          <ul className="space-y-2 text-sm">
            {section.skillAllocation.map((s) => {
              const r = bySkill[s.level]
              return (
                <li key={s.level}>
                  <div className="mb-1 flex justify-between">
                    <span>{SKILL_LABELS[s.level as SkillLevel]}</span>
                    <span className="tabular-nums">
                      {pct(r?.pct)} <span className="muted">· n={r?.n ?? 0}</span>
                    </span>
                  </div>
                  <ProgressBar value={r?.pct ?? 0} label={s.level} />
                </li>
              )
            })}
          </ul>
        </section>

        <section className="card" aria-labelledby="cal">
          <h2 id="cal" className="h2 mb-1">
            Confidence calibration
          </h2>
          <p className="mb-3 text-xs muted">How often you are right at each confidence level. Ideally “Confident” is 85%+.</p>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs muted">
                <th className="py-1">You said</th>
                <th className="py-1 text-right">n</th>
                <th className="py-1 text-right">Right</th>
              </tr>
            </thead>
            <tbody>
              {cal.map((c) => (
                <tr key={c.confidence} className="border-t border-slate-100 dark:border-slate-800">
                  <td className="py-1.5 capitalize">
                    {c.confidence}
                    <div className="text-xs muted normal-case">{c.verdict}</div>
                  </td>
                  <td className="py-1.5 text-right tabular-nums">{c.n}</td>
                  <td className="py-1.5 text-right tabular-nums">{pct(c.accuracy)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>

      <section className="card" aria-labelledby="trend">
        <h2 id="trend" className="h2 mb-3">
          Trend (weekly accuracy)
        </h2>
        <div className="flex h-40 items-end gap-2" role="img" aria-label="Weekly accuracy bar chart">
          {trend.map((t) => (
            <div key={t.weekStart} className="flex flex-1 flex-col items-center gap-1">
              <span className="text-[10px] tabular-nums muted">{t.rate.pct !== null ? Math.round(t.rate.pct * 100) : ''}</span>
              <div className="flex w-full flex-1 items-end rounded bg-slate-100 dark:bg-slate-800">
                <div
                  className="w-full rounded bg-blue-600 dark:bg-blue-500"
                  style={{ height: `${(t.rate.pct ?? 0) * 100}%`, opacity: t.rate.n ? 0.4 + 0.6 * (t.rate.n / maxTrend) : 0 }}
                  title={`${t.rate.n} questions`}
                />
              </div>
              <span className="text-[10px] muted">{formatDay(t.weekStart, { month: 'numeric', day: 'numeric' })}</span>
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs muted">Bar height = accuracy; faint bars mean few questions that week.</p>
      </section>

      <section className="card" aria-labelledby="errs">
        <h2 id="errs" className="h2 mb-3">
          Error log
        </h2>
        {causeTotal ? (
          <>
            <ul className="space-y-2 text-sm">
              {ERROR_CAUSES.filter((c) => causes[c]).map((c) => (
                <li key={c}>
                  <div className="mb-1 flex justify-between">
                    <span>{ERROR_CAUSE_LABELS[c]}</span>
                    <span className="tabular-nums">{causes[c]}</span>
                  </div>
                  <ProgressBar value={causes[c] / causeTotal} label={c} />
                </li>
              ))}
            </ul>
            <p className="mt-3 rounded-lg bg-blue-50 p-3 text-sm dark:bg-blue-950/40">
              <strong>Your most common miss: {ERROR_CAUSE_LABELS[topCause]}.</strong> {CAUSE_ADVICE[topCause]}
            </p>
            <details className="mt-3">
              <summary className="cursor-pointer text-sm font-semibold">Recent tagged misses</summary>
              <ul className="mt-2 space-y-1 text-sm">
                {errors
                  .slice()
                  .reverse()
                  .slice(0, 25)
                  .map((e) => (
                    <li key={e.id} className="flex justify-between gap-2">
                      <Link to={`/module/${e.moduleId}`} className="truncate hover:underline">
                        {getModule(e.moduleId)?.title ?? e.moduleId}
                      </Link>
                      <span className="shrink-0 muted">{ERROR_CAUSE_LABELS[e.cause]}</span>
                    </li>
                  ))}
              </ul>
            </details>
          </>
        ) : (
          <p className="text-sm muted">When you miss a question you’ll be asked why. Those tags show up here and drive the recommendations above.</p>
        )}
      </section>

      <section className="card" aria-labelledby="mods">
        <h2 id="mods" className="h2 mb-3">
          Modules
        </h2>
        <ul className="divide-y divide-slate-100 text-sm dark:divide-slate-800">
          {state.modules
            .filter((m) => m.available)
            .map((m) => (
              <li key={m.id} className="flex items-center justify-between gap-2 py-2">
                <Link to={`/module/${m.id}`} className="min-w-0 truncate hover:underline">
                  {m.title}
                  <span className="ml-2 text-xs muted">{areaTitle(m.areaId).split(' ')[0]}</span>
                </Link>
                <span className="flex shrink-0 items-center gap-2">
                  <span className="text-xs tabular-nums muted">{pct(m.mastery.recentAccuracy)}</span>
                  <StatusChip status={m.mastery.status} />
                </span>
              </li>
            ))}
        </ul>
      </section>
    </div>
  )
}
