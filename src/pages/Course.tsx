import { Link, useParams } from 'react-router-dom'
import { content, getSection } from '../content'
import { SKILL_LABELS } from '../content/schema'
import { useStudyState } from '../hooks/useStore'
import { PageHeader, ProgressBar, StatusChip } from '../components/ui'

export default function Course() {
  const { sectionId } = useParams()
  const { state, settings } = useStudyState()
  if (!state || !settings) return <p className="muted">Loading…</p>
  const section = getSection(sectionId ?? settings.activeSection) ?? content.sections[0]
  const byId = new Map(state.modules.map((m) => [m.id, m]))
  const isActive = section.id === settings.activeSection
  return (
    <div>
      <PageHeader title={`${section.id}: ${section.name}`} subtitle={section.description} />
      <div className="mb-4 flex flex-wrap gap-2">
        {content.sections.map((s) => (
          <Link
            key={s.id}
            to={`/course/${s.id}`}
            className={`chip min-h-8 px-3 text-sm ${s.id === section.id ? 'bg-blue-700 text-white' : 'bg-slate-200 dark:bg-slate-800'}`}
          >
            {s.id}
            {s.status === 'scaffold' ? ' · preview' : ''}
          </Link>
        ))}
      </div>
      <div className="card mb-6 text-sm">
        <div className="grid gap-2 sm:grid-cols-2">
          <div>
            <span className="muted">Exam format: </span>
            {section.exam.testlets.map((t) => `${t.count} ${t.kind.toUpperCase()}`).join(' · ')} in {section.exam.durationMinutes / 60} hours
          </div>
          <div>
            <span className="muted">Score weighting: </span>MCQ {section.exam.weighting.mcq}% / TBS {section.exam.weighting.tbs}%
          </div>
          <div className="sm:col-span-2">
            <span className="muted">Skill mix: </span>
            {section.skillAllocation.map((s) => `${SKILL_LABELS[s.level]} ${s.min}–${s.max}%`).join(' · ')}
          </div>
          {section.taxYear && (
            <div className="sm:col-span-2">
              <span className="muted">Tax year: </span>
              {section.taxYear}. {section.taxNote}
            </div>
          )}
          <div className="text-xs muted sm:col-span-2">Blueprint effective {section.blueprintEffective}.</div>
        </div>
      </div>
      <div className="space-y-8">
        {section.areas.map((a) => {
          const mods = a.units.flatMap((u) => u.modules)
          const mastered = isActive ? mods.filter((m) => byId.get(m.id)?.mastery.status === 'mastered').length : 0
          return (
            <section key={a.id} aria-labelledby={`area-${a.id}`}>
              <div className="mb-2 flex items-end justify-between gap-2">
                <h2 id={`area-${a.id}`} className="h2">
                  {a.title}
                </h2>
                <span className="chip shrink-0 bg-slate-200 dark:bg-slate-800">
                  {a.allocation.min}–{a.allocation.max}% of exam
                </span>
              </div>
              {isActive && <ProgressBar value={mods.length ? mastered / mods.length : 0} label={`${a.title} mastered`} className="mb-3" />}
              <div className="space-y-4">
                {a.units.map((u) => (
                  <div key={u.id} className="card">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <h3 className="font-semibold">{u.title}</h3>
                      <Link to={`/tbs?unit=${u.id}`} className="text-xs text-blue-700 hover:underline dark:text-blue-400">
                        Simulations
                      </Link>
                    </div>
                    <ol className="divide-y divide-slate-100 dark:divide-slate-800">
                      {u.modules.map((m) => {
                        const lesson = content.lessons[m.id]
                        const ms = byId.get(m.id)
                        return (
                          <li key={m.id} className="flex items-center justify-between gap-3 py-2">
                            {lesson ? (
                              <Link to={`/module/${m.id}`} className="min-w-0 text-sm hover:text-blue-700 hover:underline dark:hover:text-blue-400">
                                {m.title}
                                <span className="ml-2 text-xs muted">{lesson.minutes} min</span>
                              </Link>
                            ) : (
                              <span className="min-w-0 text-sm muted">{m.title}</span>
                            )}
                            <StatusChip status={!lesson ? 'planned' : isActive ? (ms?.mastery.status ?? 'not-started') : 'not-started'} />
                          </li>
                        )
                      })}
                    </ol>
                  </div>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
