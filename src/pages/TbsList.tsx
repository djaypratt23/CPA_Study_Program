import { useLiveQuery } from 'dexie-react-hooks'
import { Link, useSearchParams } from 'react-router-dom'
import { PageHeader, ReviewBadge } from '../components/ui'
import { content, getSection, tbsForSection } from '../content'
import { SKILL_LABELS } from '../content/schema'
import { db } from '../db'
import { useSettingsOrDefault } from '../hooks/useStore'

export default function TbsList() {
  const settings = useSettingsOrDefault()
  const [params] = useSearchParams()
  const unitFilter = params.get('unit')
  const section = getSection(settings.activeSection) ?? content.sections[0]
  const sessions = useLiveQuery(() => db.tbsSessions.toArray(), []) ?? []
  const byId = new Map(sessions.map((s) => [s.id, s]))
  const all = tbsForSection(section.id)
  const units = section.areas.flatMap((a) => a.units).filter((u) => !unitFilter || u.id === unitFilter)

  return (
    <div>
      <PageHeader
        title="Task-based simulations"
        subtitle="Realistic TBS formats with exhibits, partial credit, and an explanation for every cell. Budget ~15–20 minutes each."
        back={unitFilter ? '/tbs' : undefined}
      />
      <div className="space-y-6">
        {units.map((u) => {
          const list = all.filter((t) => t.unitId === u.id)
          if (!list.length && !unitFilter) return null
          return (
            <section key={u.id}>
              <h2 className="h2 mb-2">{u.title}</h2>
              {list.length ? (
                <ul className="space-y-2">
                  {list.map((t) => {
                    const s = byId.get(t.id)
                    return (
                      <li key={t.id}>
                        <Link to={`/tbs/${t.id}`} className="card flex items-center justify-between gap-3 hover:border-blue-400">
                          <div className="min-w-0">
                            <div className="font-medium">{t.title}</div>
                            <div className="text-xs muted">
                              {t.parts.map((p) => p.kind).filter((k, i, a) => a.indexOf(k) === i).join(' · ')} · {SKILL_LABELS[t.skill]} · ~{t.minutes} min
                            </div>
                            {t.needsReview && <ReviewBadge note={t.reviewNote} />}
                          </div>
                          <span className="shrink-0 text-sm">
                            {s?.submittedAt ? `${Math.round((s.score ?? 0) * 100)}%` : s ? 'In progress' : 'Start →'}
                          </span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              ) : (
                <p className="muted text-sm">No simulations for this unit yet.</p>
              )}
            </section>
          )
        })}
        {!all.length && <p className="muted">Simulations for {section.id} are coming in a later content update.</p>}
      </div>
    </div>
  )
}
