/**
 * All learner progress lives in IndexedDB (via Dexie). There is no server:
 * export/import of the full database is the backup story.
 */
import Dexie, { type Table } from 'dexie'
import type {
  Attempt,
  ErrorLogEntry,
  ExamSession,
  Highlight,
  ItemMeta,
  ModuleProgress,
  QuizSession,
  Settings,
  SrsItem,
  TbsSession,
} from './types'
import { DEFAULT_SETTINGS } from './types'

export class CpaDb extends Dexie {
  settings!: Table<Settings, string>
  attempts!: Table<Attempt, number>
  errors!: Table<ErrorLogEntry, number>
  srs!: Table<SrsItem, string>
  itemMeta!: Table<ItemMeta, string>
  moduleProgress!: Table<ModuleProgress, string>
  highlights!: Table<Highlight, number>
  quizSessions!: Table<QuizSession, string>
  tbsSessions!: Table<TbsSession, string>
  examSessions!: Table<ExamSession, string>

  constructor(name = 'cpa-study') {
    super(name)
    this.version(1).stores({
      settings: 'id',
      attempts: '++id, itemId, moduleId, section, day, sessionId, mode',
      errors: '++id, itemId, moduleId, section, cause',
      srs: 'key, kind, itemId, moduleId, section, due',
      itemMeta: 'itemId',
      moduleProgress: 'moduleId, section, lastVisitedAt',
      highlights: '++id, moduleId',
      quizSessions: 'id, section, startedAt, finishedAt',
      tbsSessions: 'id',
      examSessions: 'id, section, startedAt',
    })
  }
}

export const db = new CpaDb()

export const TABLES = [
  'settings',
  'attempts',
  'errors',
  'srs',
  'itemMeta',
  'moduleProgress',
  'highlights',
  'quizSessions',
  'tbsSessions',
  'examSessions',
] as const

export async function getSettings(d: CpaDb = db): Promise<Settings> {
  const s = await d.settings.get('settings')
  return { ...DEFAULT_SETTINGS, ...s }
}

export async function saveSettings(patch: Partial<Settings>, d: CpaDb = db): Promise<Settings> {
  const next = { ...(await getSettings(d)), ...patch, id: 'settings' as const }
  await d.settings.put(next)
  try {
    localStorage.setItem('cpa-theme', JSON.stringify({ theme: next.theme, fontScale: next.fontScale }))
  } catch {
    /* storage may be unavailable (private mode); theme falls back to system */
  }
  return next
}

export interface Backup {
  app: 'cpa-study-program'
  version: 1
  exportedAt: string
  tables: Record<string, unknown[]>
}

export async function exportBackup(d: CpaDb = db): Promise<Backup> {
  const tables: Record<string, unknown[]> = {}
  for (const t of TABLES) tables[t] = await d.table(t).toArray()
  return { app: 'cpa-study-program', version: 1, exportedAt: new Date().toISOString(), tables }
}

export async function importBackup(data: unknown, d: CpaDb = db): Promise<void> {
  const b = data as Backup
  if (!b || b.app !== 'cpa-study-program' || typeof b.tables !== 'object')
    throw new Error('This file is not a CPA Study Program backup.')
  await d.transaction('rw', TABLES.map((t) => d.table(t)), async () => {
    for (const t of TABLES) {
      await d.table(t).clear()
      const rows = b.tables[t]
      if (Array.isArray(rows) && rows.length) await d.table(t).bulkPut(rows)
    }
  })
}

export async function resetAll(d: CpaDb = db): Promise<void> {
  await d.transaction('rw', TABLES.map((t) => d.table(t)), async () => {
    for (const t of TABLES) await d.table(t).clear()
  })
}
