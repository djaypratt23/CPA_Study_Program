import { useLiveQuery } from 'dexie-react-hooks'
import { useMemo } from 'react'
import { content, getSection } from '../content'
import { db, getSettings } from '../db'
import { DEFAULT_SETTINGS, type Settings } from '../db/types'
import { computeStudyState, type StudyState } from '../lib/studyState'

export function useSettings(): Settings | undefined {
  return useLiveQuery(() => getSettings(), [], undefined)
}

export function useSettingsOrDefault(): Settings {
  return useSettings() ?? DEFAULT_SETTINGS
}

/** Live, derived study state for the active section (recomputed on any data change). */
export function useStudyState(): { state: StudyState | undefined; settings: Settings | undefined } {
  const settings = useSettings()
  const data = useLiveQuery(async () => {
    const [attempts, progress, srs, errors, quizSessions, tbsSessions, examSessions] = await Promise.all([
      db.attempts.toArray(),
      db.moduleProgress.toArray(),
      db.srs.toArray(),
      db.errors.toArray(),
      db.quizSessions.toArray(),
      db.tbsSessions.toArray(),
      db.examSessions.toArray(),
    ])
    return { attempts, progress, srs, errors, quizSessions, tbsSessions, examSessions }
  }, [])
  const state = useMemo(() => {
    if (!settings || !data) return undefined
    const section = getSection(settings.activeSection) ?? content.sections[0]
    if (!section) return undefined
    return computeStudyState({ content, section, settings, ...data })
  }, [settings, data])
  return { state, settings }
}
