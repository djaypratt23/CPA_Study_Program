/**
 * App-side content access. Content is validated and indexed at build time by the `content-bundle`
 * Vite plugin (vite.config.ts) and arrives as pre-parsed JSON (P2-1): a small core (sections, module
 * list, glossary, review docs) plus one chunk per section. main.tsx loads the active section before the
 * first render and the rest in the background; `useContentVersion` re-renders the app as they arrive.
 */
import { useSyncExternalStore } from 'react'
import { core, errors, loaders } from 'virtual:content-core'
import type { ContentBundle, ModuleMeta } from './build'
import type { Mcq, SectionConfig, SectionId, Tbs } from './schema'

if (errors.length) console.warn('[content] validation errors:\n' + errors.join('\n'))

export const content: ContentBundle = { ...core, lessons: {}, questions: {}, flashcards: [], tbs: {}, exams: [] }
export const contentErrors: string[] = errors

let version = 0
const listeners = new Set<() => void>()
const pending = new Map<string, Promise<void>>()
const loaded = new Set<string>()

/** Load one section's content (idempotent). */
export function loadSection(id: string): Promise<void> {
  const loader = loaders[id] as (typeof loaders)[string] | undefined
  if (!loader || loaded.has(id)) return Promise.resolve()
  let p = pending.get(id)
  if (!p) {
    p = loader().then(({ default: part }) => {
      Object.assign(content.lessons, part.lessons)
      Object.assign(content.questions, part.questions)
      Object.assign(content.tbs, part.tbs)
      content.flashcards.push(...part.flashcards)
      content.exams.push(...part.exams)
      loaded.add(id)
      version++
      for (const l of listeners) l()
    })
    pending.set(id, p)
  }
  return p
}

/** Load every section, the requested one first. */
export function loadAllSections(first?: string): Promise<void> {
  const ids = content.sections.map((s) => s.id).sort((a, b) => (a === first ? -1 : b === first ? 1 : 0))
  return ids.reduce<Promise<void>>((p, id) => p.then(() => loadSection(id)), Promise.resolve())
}

export const isSectionLoaded = (id: string) => loaded.has(id)
export const allSectionsLoaded = () => content.sections.every((s) => loaded.has(s.id))

/**
 * For "Loading…" guards: true while not every section is loaded, and starts loading them.
 * Safe to call during render (it only kicks off idempotent imports).
 */
export function ensureAllSections(): boolean {
  if (allSectionsLoaded()) return false
  void loadAllSections()
  return true
}

/** Re-render when more content arrives. */
export function useContentVersion(): number {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => version,
  )
}

export function getSection(id: string): SectionConfig | undefined {
  return content.sections.find((s) => s.id === id)
}

export function getModule(id: string): ModuleMeta | undefined {
  return content.modules.find((m) => m.id === id)
}

export function modulesForSection(id: SectionId | string): ModuleMeta[] {
  return content.modules.filter((m) => m.section === id)
}

export function availableModules(id: SectionId | string): ModuleMeta[] {
  return modulesForSection(id).filter((m) => content.lessons[m.id])
}

export function questionsForModule(id: string, pool: Mcq['pool'] = 'practice'): Mcq[] {
  return Object.values(content.questions).filter((q) => q.moduleId === id && q.pool === pool)
}

/** Inside the current Blueprint: neither the item nor its module is marked optional (P2-2). */
export function inScope(q: Mcq): boolean {
  return !q.optional && !getModule(q.moduleId)?.optional
}

/** Practice-pool questions, excluding off-Blueprint (optional) material unless asked for. */
export function practiceQuestions(section?: string, includeOptional = false): Mcq[] {
  return Object.values(content.questions).filter(
    (q) => q.pool === 'practice' && (!section || getModule(q.moduleId)?.section === section) && (includeOptional || inScope(q)),
  )
}

export function tbsForSection(section: string, pool: Tbs['pool'] = 'practice'): Tbs[] {
  return Object.values(content.tbs).filter((t) => t.section === section && t.pool === pool)
}

export function unitTitle(unitId: string): string {
  for (const s of content.sections)
    for (const a of s.areas) for (const u of a.units) if (u.id === unitId) return u.title
  return unitId
}

export function areaTitle(areaId: string): string {
  for (const s of content.sections) for (const a of s.areas) if (a.id === areaId) return a.title
  return areaId
}
