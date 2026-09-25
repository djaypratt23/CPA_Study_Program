import { useLiveQuery } from 'dexie-react-hooks'
import { Link, useNavigate } from 'react-router-dom'
import { PageHeader } from '../components/ui'
import { content, getSection } from '../content'
import { db } from '../db'
import type { ExamSession } from '../db/types'
import { useSettingsOrDefault } from '../hooks/useStore'
import { formatDay } from '../lib/dates'
import { uid } from '../lib/random'

export default function ExamHome() {
  const settings = useSettingsOrDefault()
  const nav = useNavigate()
  const section = getSection(settings.activeSection) ?? content.sections[0]
  const forms = content.exams.filter((e) => e.section === section.id)
  const sessions = useLiveQuery(() => db.examSessions.where('section').equals(section.id).toArray(), [section.id]) ?? []
  const open = sessions.find((s) => !s.finishedAt)

  const start = async (examId: string) => {
    const form = forms.find((f) => f.id === examId)!
    const session: ExamSession = {
      id: uid('exam-'),
      examId,
      section: section.id,
      startedAt: new Date().toISOString(),
      remainingMs: section.exam.durationMinutes * 60_000,
      endsAt: new Date(Date.now() + section.exam.durationMinutes * 60_000).toISOString(),
      testletIndex: 0,
      onBreak: false,
      breakUsed: false,
      testlets: form.testlets.map((t) => ({ kind: t.kind, items: t.items, submitted: false, mcqAnswers: {}, flags: {}, tbsResponses: {}, index: 0 })),
    }
    await db.examSessions.put(session)
    nav(`/exam/${session.id}`)
  }

  return (
    <div>
      <PageHeader title="Simulated exam" subtitle={`A full-length ${section.id} exam under real conditions.`} />
      <div className="card mb-6 space-y-2 text-sm">
        <h2 className="h2">What to expect</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            {section.exam.testlets.length} testlets: {section.exam.testlets.map((t, i) => `#${i + 1} ${t.count} ${t.kind === 'mcq' ? 'MCQs' : 'TBS'}`).join(', ')}.
          </li>
          <li>{section.exam.durationMinutes / 60}-hour clock. Like the real exam, it keeps running if you leave; only the scheduled break stops it. Your answers are saved as you go.</li>
          {section.exam.breakAfterTestlet && (
            <li>
              Optional {section.exam.breakMinutes ?? 15}-minute break after testlet {section.exam.breakAfterTestlet} that does not use exam time.
            </li>
          )}
          <li>Once you submit a testlet you cannot return to it — just like the real exam.</li>
          <li>No feedback until the end. Then you get an approximate score and full explanations.</li>
        </ul>
        <p className="rounded-lg bg-amber-50 p-2 text-xs dark:bg-amber-950/40">
          Best time: 7–10 days before your exam, after finishing new material. Plan a quiet 4-hour block.
        </p>
      </div>
      {open ? (
        <Link to={`/exam/${open.id}`} className="btn-primary mb-6">
          Resume exam in progress
        </Link>
      ) : forms.length ? (
        <div className="mb-6 space-y-2">
          {forms.map((f) => (
            <div key={f.id} className="card flex items-center justify-between gap-3">
              <div className="font-semibold">{f.title}</div>
              <button className="btn-primary" onClick={() => start(f.id)}>
                Start
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="muted mb-6">A simulated exam for {section.id} is coming with the full content for this section.</p>
      )}
      {sessions.some((s) => s.result) && (
        <section>
          <h2 className="h2 mb-2">Past attempts</h2>
          <ul className="space-y-2">
            {sessions
              .filter((s) => s.result)
              .sort((a, b) => (b.finishedAt ?? '').localeCompare(a.finishedAt ?? ''))
              .map((s) => (
                <li key={s.id}>
                  <Link to={`/exam/${s.id}`} className="card flex justify-between hover:border-blue-400">
                    <span>{formatDay(s.finishedAt!.slice(0, 10))}</span>
                    <span className="font-semibold">≈ {s.result!.approxScaled} (approx.)</span>
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      )}
    </div>
  )
}
