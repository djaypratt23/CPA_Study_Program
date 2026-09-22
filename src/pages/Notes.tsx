import { useLiveQuery } from 'dexie-react-hooks'
import { Link } from 'react-router-dom'
import { Empty, PageHeader } from '../components/ui'
import { content, getModule } from '../content'
import { db } from '../db'

export default function Notes() {
  const progress = useLiveQuery(() => db.moduleProgress.toArray(), []) ?? []
  const highlights = useLiveQuery(() => db.highlights.toArray(), []) ?? []
  const itemNotes = useLiveQuery(() => db.itemMeta.filter((m) => !!m.note).toArray(), []) ?? []
  const moduleIds = [...new Set([...progress.filter((p) => p.notes).map((p) => p.moduleId), ...highlights.map((h) => h.moduleId)])]
  return (
    <div>
      <PageHeader title="Notes & highlights" subtitle="Everything you’ve written or saved, by module." />
      {!moduleIds.length && !itemNotes.length && <Empty>No notes yet. Add notes at the bottom of any lesson, or select lesson text to highlight it.</Empty>}
      <div className="space-y-4">
        {moduleIds.map((id) => {
          const p = progress.find((x) => x.moduleId === id)
          const hs = highlights.filter((h) => h.moduleId === id)
          return (
            <section key={id} className="card">
              <Link to={`/module/${id}`} className="font-semibold text-blue-700 hover:underline dark:text-blue-400">
                {getModule(id)?.title ?? id}
              </Link>
              {p?.notes && <p className="mt-2 whitespace-pre-wrap text-sm">{p.notes}</p>}
              {hs.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {hs.map((h) => (
                    <li key={h.id} className="rounded bg-yellow-100 p-2 text-sm dark:bg-yellow-900/40">
                      “{h.text}”
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )
        })}
        {itemNotes.length > 0 && (
          <section className="card">
            <h2 className="h2 mb-2">Question notes</h2>
            <ul className="space-y-2 text-sm">
              {itemNotes.map((n) => {
                const q = content.questions[n.itemId]
                return (
                  <li key={n.itemId}>
                    <div className="muted">{q ? q.stem.replace(/[#*|_]/g, '').slice(0, 100) + '…' : n.itemId}</div>
                    <div>{n.note}</div>
                  </li>
                )
              })}
            </ul>
          </section>
        )}
      </div>
    </div>
  )
}
