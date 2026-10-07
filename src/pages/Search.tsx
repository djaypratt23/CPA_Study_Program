import { useEffect, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { PageHeader } from '../components/ui'
import { content, loadLoadedLessonBodies, useContentVersion } from '../content'
import { search } from '../lib/search'

const KIND: Record<string, string> = { module: 'Lesson', question: 'Question', flashcard: 'Flashcard', glossary: 'Glossary', review: 'Final review', tbs: 'Simulation' }

export default function Search() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') ?? ''
  const version = useContentVersion()
  // Lesson text loads on demand; fetch it for the loaded sections so lessons are searchable.
  useEffect(() => {
    if (q) void loadLoadedLessonBodies().catch(() => undefined)
  }, [q, version])
  // `content` is mutated in place as lessons arrive; `version` is what changes.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const hits = useMemo(() => search(content, q), [q, version])
  return (
    <div>
      <PageHeader title="Search" subtitle="Lessons, glossary, flashcards, questions, simulations, and final-review notes." />
      <label htmlFor="q" className="sr-only">
        Search all content
      </label>
      <input
        id="q"
        type="search"
        autoFocus
        className="input mb-4"
        placeholder="Try “deferred tax”, “ASC 842”, or “goodwill impairment”"
        value={q}
        onChange={(e) => setParams(e.target.value ? { q: e.target.value } : {}, { replace: true })}
      />
      {q && <p className="mb-3 text-sm muted">{hits.length} result(s)</p>}
      <ul className="space-y-2">
        {hits.map((h) => (
          <li key={`${h.kind}-${h.id}`}>
            <Link to={h.to} className="card block hover:border-blue-400">
              <div className="text-xs font-bold uppercase tracking-wide muted">{KIND[h.kind]}</div>
              <div className="font-semibold">{h.title}</div>
              <div className="text-sm muted">{h.snippet}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
