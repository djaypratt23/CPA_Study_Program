import { useLiveQuery } from 'dexie-react-hooks'
import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Calculator from '../components/Calculator'
import Icon from '../components/Icon'
import TbsView from '../components/TbsView'
import Clock from '../components/Timer'
import { PageHeader } from '../components/ui'
import { content, unitTitle } from '../content'
import { db } from '../db'
import { recordTbsAttempt, setLastLocation } from '../db/actions'
import { scoreTbs, type TbsResponses } from '../lib/tbsScoring'

export default function TbsPage() {
  const { tbsId = '' } = useParams()
  const tbs = content.tbs[tbsId]
  // Map "no saved session" to null so it's distinguishable from "still loading" (undefined).
  const session = useLiveQuery(() => db.tbsSessions.get(tbsId).then((s) => s ?? null), [tbsId])
  const [responses, setResponses] = useState<TbsResponses>({})
  const [elapsed, setElapsed] = useState(0)
  const [calc, setCalc] = useState(false)
  const loaded = useRef(false)
  const [ready, setReady] = useState(false)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (session === undefined || loaded.current) return
    loaded.current = true
    if (session) {
      setResponses(session.responses)
      setElapsed(session.elapsedMs)
    }
    if (tbs) setLastLocation(`/tbs/${tbs.id}`, tbs.title)
    setReady(true)
  }, [session, tbs])

  const submitted = !!session?.submittedAt
  useEffect(() => {
    if (submitted || !ready) return
    const t = setInterval(() => setElapsed((e) => e + 1000), 1000)
    return () => clearInterval(t)
  }, [submitted, ready])

  if (!tbs) return <p>Simulation not found.</p>
  if (session === undefined) return <p className="muted">Loading…</p>

  const save = (r: TbsResponses) => {
    setResponses(r)
    db.tbsSessions.put({ id: tbs.id, responses: r, startedAt: session?.startedAt ?? new Date().toISOString(), elapsedMs: elapsed })
  }
  const submit = async () => {
    if (busy) return
    setBusy(true)
    try {
      const s = scoreTbs(tbs, responses)
      const startedAt = session?.startedAt ?? new Date().toISOString()
      await db.tbsSessions.put({ id: tbs.id, responses, startedAt, elapsedMs: elapsed, submittedAt: new Date().toISOString(), score: s.percent })
      // One attempt per run of the simulation; a retry starts a new run (new startedAt).
      await recordTbsAttempt(tbs, s.percent, elapsed, 'tutor', `tbs-${tbs.id}-${startedAt}`)
    } finally {
      setBusy(false)
    }
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  }
  const retry = async () => {
    await db.tbsSessions.delete(tbs.id)
    setResponses({})
    setElapsed(0)
    loaded.current = true
    window.scrollTo(0, 0)
  }

  return (
    <div>
      <PageHeader
        title={tbs.title}
        subtitle={`${unitTitle(tbs.unitId)} · suggested ${tbs.minutes} min`}
        back={`/tbs?unit=${tbs.unitId}`}
        actions={
          <div className="flex items-center gap-2 text-sm">
            <Icon name="clock" className="h-4 w-4" />
            <Clock ms={elapsed} label="Elapsed" warn={elapsed > tbs.minutes * 60000} />
            <button className="btn-ghost min-h-9 px-2" onClick={() => setCalc((c) => !c)} aria-label="Calculator">
              <Icon name="calc" />
            </button>
          </div>
        }
      />
      <TbsView tbs={tbs} responses={responses} onChange={save} submitted={submitted} split />
      <div className="mt-6 flex flex-wrap gap-2">
        {!submitted ? (
          <button className="btn-primary" onClick={submit} disabled={busy}>
            Submit & see explanations
          </button>
        ) : (
          <>
            <button className="btn-secondary" onClick={retry}>
              Try again from scratch
            </button>
            <Link to={`/tbs?unit=${tbs.unitId}`} className="btn-primary">
              More simulations
            </Link>
          </>
        )}
      </div>
      {calc && <Calculator onClose={() => setCalc(false)} />}
    </div>
  )
}
