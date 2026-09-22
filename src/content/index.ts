/**
 * App-side content loader. Vite inlines every file under /content at build
 * time; buildContent validates and indexes it. Invalid content is reported in
 * the console (and blocked in CI by `npm run validate`).
 */
import { buildContent, type ContentBundle, type ModuleMeta } from './build'
import type { Mcq, SectionConfig, SectionId, Tbs } from './schema'

const raw = import.meta.glob('/content/**/*.{md,json,yaml,yml}', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const result = buildContent(raw)
if (result.errors.length) console.warn('[content] validation errors:\n' + result.errors.join('\n'))

export const content: ContentBundle = result.bundle
export const contentErrors = result.errors

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

export function practiceQuestions(section?: string): Mcq[] {
  return Object.values(content.questions).filter(
    (q) => q.pool === 'practice' && (!section || getModule(q.moduleId)?.section === section),
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
