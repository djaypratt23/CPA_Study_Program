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
import { TABLE_SCHEMAS } from './backupSchema'
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

export type TableName = (typeof TABLES)[number]

export interface ParsedBackup {
  /** Validated rows for each table present in the file. */
  tables: Partial<Record<TableName, unknown[]>>
  /** Row counts per table present in the file, for the confirmation prompt. */
  counts: Partial<Record<TableName, number>>
}

/**
 * Validate a backup without touching the database. Throws a readable error
 * naming the first few bad rows; nothing is imported unless every row passes.
 */
export function parseBackup(data: unknown): ParsedBackup {
  const b = data as Partial<Backup> | null
  if (!b || typeof b !== 'object' || b.app !== 'cpa-study-program' || !b.tables || typeof b.tables !== 'object' || Array.isArray(b.tables))
    throw new Error('This file is not a CPA Study Program backup.')
  if (b.version !== 1) throw new Error(`Unsupported backup version ${JSON.stringify(b.version)}; this app reads version 1.`)
  const tables: ParsedBackup['tables'] = {}
  const counts: ParsedBackup['counts'] = {}
  const problems: string[] = []
  for (const t of TABLES) {
    const rows = (b.tables as Record<string, unknown>)[t]
    if (rows === undefined) continue
    if (!Array.isArray(rows)) {
      problems.push(`${t}: expected a list of rows`)
      continue
    }
    const parsed: unknown[] = []
    rows.forEach((row, i) => {
      // Settings saved by older versions may lack newer fields; defaults fill them.
      const input = t === 'settings' && row && typeof row === 'object' ? { ...DEFAULT_SETTINGS, ...row } : row
      const r = TABLE_SCHEMAS[t].safeParse(input)
      if (r.success) parsed.push(r.data)
      else problems.push(`${t} row ${i + 1}: ${r.error.issues.map((x) => `${x.path.join('.') || 'row'} ${x.message}`).join('; ')}`)
    })
    tables[t] = parsed
    counts[t] = parsed.length
  }
  if (problems.length)
    throw new Error(
      `The backup has ${problems.length} invalid ${problems.length === 1 ? 'entry' : 'entries'}, so nothing was imported. ${problems.slice(0, 3).join(' | ')}${problems.length > 3 ? ' | …' : ''}`,
    )
  return { tables, counts }
}

/**
 * Restore a validated backup. Tables in the file replace the matching tables;
 * tables missing from the file are kept unless `mode` is "replace", which
 * clears everything first.
 */
export async function importBackup(data: unknown, d: CpaDb = db, mode: 'merge' | 'replace' = 'merge'): Promise<ParsedBackup> {
  const parsed = parseBackup(data)
  await d.transaction('rw', TABLES.map((t) => d.table(t)), async () => {
    for (const t of TABLES) {
      const rows = parsed.tables[t]
      if (rows === undefined && mode === 'merge') continue
      await d.table(t).clear()
      if (rows?.length) await d.table(t).bulkPut(rows)
    }
  })
  return parsed
}

export async function resetAll(d: CpaDb = db): Promise<void> {
  await d.transaction('rw', TABLES.map((t) => d.table(t)), async () => {
    for (const t of TABLES) await d.table(t).clear()
  })
}
