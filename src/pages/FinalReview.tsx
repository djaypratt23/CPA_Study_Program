import { Link, useParams } from 'react-router-dom'
import LessonMarkdown from '../components/LessonMarkdown'
import { PageHeader } from '../components/ui'
import { content, getSection } from '../content'
import { useSettingsOrDefault } from '../hooks/useStore'

const KIND_LABEL: Record<string, string> = {
  condensed: 'Condensed notes',
  formulas: 'Formula sheet',
  mnemonics: 'Mnemonics',
  'high-yield': 'High-yield summary',
}

export default function FinalReview() {
  const { docId } = useParams()
  const settings = useSettingsOrDefault()
  const section = getSection(settings.activeSection) ?? content.sections[0]
  const docs = content.reviewDocs.filter((d) => d.section === section.id)
  const doc = docId ? content.reviewDocs.find((d) => d.id === docId) : undefined

  if (doc)
    return (
      <div>
        <PageHeader title={doc.title} subtitle={KIND_LABEL[doc.kind]} back="/final-review" />
        <LessonMarkdown body={doc.body} sessionId="final-review" />
      </div>
    )

  return (
    <div>
      <PageHeader title="Final review" subtitle="Condensed, high-yield material for the last two weeks — and for any 10-minute gap." />
      {docs.length ? (
        <ul className="grid gap-3 sm:grid-cols-2">
          {docs.map((d) => (
            <li key={d.id}>
              <Link to={`/final-review/${d.id}`} className="card block h-full hover:border-blue-400">
                <div className="text-xs font-bold uppercase tracking-wide muted">{KIND_LABEL[d.kind]}</div>
                <div className="mt-1 font-semibold">{d.title}</div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="muted">Final review material for {section.id} is coming with its full content.</p>
      )}
      <div className="card mt-6 space-y-2 text-sm">
        <h2 className="h2">Cumulative review built in</h2>
        <p>Your plan switches to final-review mode automatically before the exam: mixed practice across all areas, a full simulated exam, and weak-area review.</p>
        <div className="flex flex-wrap gap-2">
          <Link to={`/practice/start?mixed=${section.id}`} className="btn-primary">
            Cumulative mixed set
          </Link>
          <Link to="/exam" className="btn-secondary">
            Simulated exam
          </Link>
        </div>
      </div>
    </div>
  )
}
