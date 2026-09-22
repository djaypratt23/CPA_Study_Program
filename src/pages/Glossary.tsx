import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { PageHeader } from '../components/ui'
import { content, getModule } from '../content'
import { useSettingsOrDefault } from '../hooks/useStore'

export default function Glossary() {
  const settings = useSettingsOrDefault()
  const [params] = useSearchParams()
  const [filter, setFilter] = useState(params.get('term') ?? '')
  const [all, setAll] = useState(false)
  const entries = content.glossary.filter(
    (g) => (all || g.section === settings.activeSection) && (!filter || g.term.toLowerCase().includes(filter.toLowerCase()) || g.definition.toLowerCase().includes(filter.toLowerCase())),
  )
  return (
    <div>
      <PageHeader title="Glossary" subtitle={`${entries.length} terms`} />
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <input className="input max-w-sm" type="search" placeholder="Filter terms" value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter glossary" />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" className="h-4 w-4 accent-blue-700" checked={all} onChange={(e) => setAll(e.target.checked)} />
          All sections
        </label>
      </div>
      <dl className="space-y-3">
        {entries.map((g) => (
          <div key={`${g.section}-${g.term}`} className="card">
            <dt className="font-semibold">
              {g.term} <span className="chip ml-1 bg-slate-100 text-xs dark:bg-slate-800">{g.section}</span>
            </dt>
            <dd className="mt-1 text-sm">{g.definition}</dd>
            {g.moduleId && getModule(g.moduleId) && content.lessons[g.moduleId] && (
              <Link to={`/module/${g.moduleId}`} className="mt-1 inline-block text-xs text-blue-700 hover:underline dark:text-blue-400">
                Lesson: {getModule(g.moduleId)!.title}
              </Link>
            )}
          </div>
        ))}
      </dl>
    </div>
  )
}
