import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../components/ui'
import { content, contentErrors } from '../content'
import type { SectionId } from '../content/schema'
import { exportBackup, importBackup, resetAll, saveSettings } from '../db'
import { useSettingsOrDefault } from '../hooks/useStore'
import { WEEKDAY_NAMES, dayKey, formatMinutes } from '../lib/dates'

export default function SettingsPage() {
  const s = useSettingsOrDefault()
  const nav = useNavigate()
  const fileRef = useRef<HTMLInputElement>(null)
  const [msg, setMsg] = useState('')

  const doExport = async () => {
    const data = await exportBackup()
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `cpa-study-backup-${dayKey()}.json`
    a.click()
    URL.revokeObjectURL(a.href)
    setMsg('Backup downloaded. Keep it somewhere safe (e.g., cloud drive).')
  }

  const doImport = async (file: File) => {
    try {
      await importBackup(JSON.parse(await file.text()))
      setMsg('Backup restored.')
    } catch (e) {
      setMsg(`Import failed: ${(e as Error).message}`)
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" />
      {msg && (
        <p className="rounded-lg bg-blue-50 p-3 text-sm dark:bg-blue-950/40" role="status">
          {msg}
        </p>
      )}

      <section className="card space-y-4" aria-labelledby="exam">
        <h2 id="exam" className="h2">
          Exams & schedule
        </h2>
        <div>
          <label className="label" htmlFor="active">
            Active section
          </label>
          <select id="active" className="input" value={s.activeSection} onChange={(e) => saveSettings({ activeSection: e.target.value as SectionId })}>
            {content.sections.map((x) => (
              <option key={x.id} value={x.id}>
                {x.id} — {x.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {s.sectionOrder.map((id) => (
            <div key={id}>
              <label className="label" htmlFor={`d-${id}`}>
                {id} exam date
              </label>
              <input
                id={`d-${id}`}
                type="date"
                className="input"
                value={s.examDates[id] ?? ''}
                onChange={(e) => saveSettings({ examDates: { ...s.examDates, [id]: e.target.value || undefined } })}
              />
            </div>
          ))}
        </div>
        <fieldset>
          <legend className="label">Study time per day</legend>
          <div className="space-y-2">
            {WEEKDAY_NAMES.map((d, i) => (
              <div key={d} className="flex items-center gap-3">
                <label htmlFor={`sm${i}`} className="w-10 text-sm">
                  {d}
                </label>
                <input
                  id={`sm${i}`}
                  type="range"
                  min={0}
                  max={360}
                  step={15}
                  value={s.minutesByWeekday[i]}
                  onChange={(e) => saveSettings({ minutesByWeekday: s.minutesByWeekday.map((v, j) => (j === i ? Number(e.target.value) : v)) })}
                  className="flex-1 accent-blue-700"
                  aria-valuetext={formatMinutes(s.minutesByWeekday[i])}
                />
                <span className="w-20 text-right text-sm tabular-nums">{s.minutesByWeekday[i] ? formatMinutes(s.minutesByWeekday[i]) : 'Off'}</span>
              </div>
            ))}
          </div>
        </fieldset>
        <div>
          <label className="label" htmlFor="newcards">
            New flashcards per day
          </label>
          <input id="newcards" type="number" min={0} max={100} className="input max-w-32" value={s.newCardsPerDay} onChange={(e) => saveSettings({ newCardsPerDay: Math.max(0, Number(e.target.value) || 0) })} />
        </div>
      </section>

      <section className="card space-y-4" aria-labelledby="display">
        <h2 id="display" className="h2">
          Display
        </h2>
        <fieldset>
          <legend className="label">Theme</legend>
          <div className="flex gap-2">
            {(['system', 'light', 'dark'] as const).map((t) => (
              <button key={t} className={s.theme === t ? 'btn-primary' : 'btn-secondary'} aria-pressed={s.theme === t} onClick={() => saveSettings({ theme: t })}>
                {t[0].toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </fieldset>
        <div>
          <label className="label" htmlFor="font">
            Text size: {Math.round(s.fontScale * 100)}%
          </label>
          <input id="font" type="range" min={0.85} max={1.4} step={0.05} value={s.fontScale} onChange={(e) => saveSettings({ fontScale: Number(e.target.value) })} className="w-full accent-blue-700" />
        </div>
      </section>

      <section className="card space-y-3" aria-labelledby="data">
        <h2 id="data" className="h2">
          Your data
        </h2>
        <p className="text-sm muted">Everything is stored only on this device. Export a backup regularly, and to move to another device, export here and import there.</p>
        <div className="flex flex-wrap gap-2">
          <button className="btn-primary" onClick={doExport}>
            Export backup (JSON)
          </button>
          <button className="btn-secondary" onClick={() => fileRef.current?.click()}>
            Import backup
          </button>
          <input ref={fileRef} type="file" accept="application/json,.json" className="hidden" onChange={(e) => e.target.files?.[0] && doImport(e.target.files[0])} />
          <button className="btn-secondary" onClick={() => saveSettings({ walkthroughSeen: false, onboarded: false }).then(() => nav('/welcome'))}>
            Replay walkthrough
          </button>
          <button
            className="btn border border-rose-300 text-rose-700 hover:bg-rose-50 dark:border-rose-800 dark:text-rose-300 dark:hover:bg-rose-950"
            onClick={async () => {
              if (window.confirm('Erase ALL progress, notes, and settings on this device? This cannot be undone. Consider exporting a backup first.')) {
                await resetAll()
                nav('/welcome')
              }
            }}
          >
            Reset everything
          </button>
        </div>
      </section>

      <section className="text-xs muted">
        <p>
          Content: {Object.keys(content.lessons).length} modules · {Object.keys(content.questions).length} questions · {Object.keys(content.tbs).length} simulations · {content.flashcards.length} flashcards
          {contentErrors.length ? ` · ${contentErrors.length} content warnings (see console)` : ''}
        </p>
        <p className="mt-1">All lessons, questions, and simulations are original and are not affiliated with or endorsed by the AICPA or any review provider.</p>
      </section>
    </div>
  )
}
