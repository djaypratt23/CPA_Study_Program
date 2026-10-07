/// <reference types="vite/client" />

declare module 'virtual:content-core' {
  import type { ContentBundle } from './content/build'
  export const core: Pick<ContentBundle, 'sections' | 'modules' | 'glossary' | 'reviewDocs'>
  export const errors: string[]
  export const loaders: Record<string, () => Promise<{ default: Pick<ContentBundle, 'lessons' | 'questions' | 'flashcards' | 'tbs' | 'exams'> }>>
  /** One lesson's markdown body, keyed by module id (section chunks carry lessons with an empty body). */
  export const bodyLoaders: Record<string, () => Promise<{ default: string }>>
}
