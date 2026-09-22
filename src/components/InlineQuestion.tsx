import { useRef, useState } from 'react'
import { content, getModule } from '../content'
import { recordMcqAttempt } from '../db/actions'
import type { AttemptMode } from '../db/types'
import type { Confidence } from '../lib/srs'
import McqView from './McqView'

/** A self-contained question (lesson check or pre-question) that records its own attempt. */
export default function InlineQuestion({ id, mode = 'lesson', label, sessionId }: { id: string; mode?: AttemptMode; label: string; sessionId: string }) {
  const q = content.questions[id]
  const [choice, setChoice] = useState<string>()
  const [conf, setConf] = useState<Confidence>()
  const [revealed, setRevealed] = useState(false)
  const started = useRef(Date.now())
  if (!q) return <p className="text-rose-600">Missing question {id}</p>
  const section = getModule(q.moduleId)?.section ?? 'FAR'
  return (
    <aside className="my-6 rounded-xl border-2 border-dashed border-blue-300 bg-white p-4 dark:border-blue-800 dark:bg-slate-900" aria-label={label}>
      <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-blue-800 dark:text-blue-300">
        <span aria-hidden="true">✎</span> {label}
      </div>
      <McqView
        q={q}
        section={section}
        selected={choice}
        confidence={conf}
        revealed={revealed}
        confidenceSubmits
        showTools={false}
        onSelect={setChoice}
        onConfidence={async (c) => {
          if (!choice) return
          setConf(c)
          setRevealed(true)
          await recordMcqAttempt(q, { choice, confidence: c, timeMs: Date.now() - started.current, mode, mixed: false, sessionId, section })
        }}
      />
    </aside>
  )
}
