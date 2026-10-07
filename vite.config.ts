import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import { execSync } from 'node:child_process'
import type { Plugin } from 'vite'
import { resolve } from 'node:path'
import { readContentDir } from './scripts/load-content'
import { buildContent } from './src/content/build'

// Served from the domain root (Cloudflare Pages). A subpath host (e.g. GitHub Pages project
// sites) can set BASE_PATH=/repo-name/ at build time.
const base = process.env.BASE_PATH ?? '/'

function gitCommit(): string {
  // Cloudflare Pages and GitHub Actions expose the commit; fall back to git for local builds.
  const fromEnv = process.env.CF_PAGES_COMMIT_SHA || process.env.GITHUB_SHA
  if (fromEnv) return fromEnv
  try {
    return execSync('git rev-parse HEAD', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim()
  } catch {
    return 'unknown'
  }
}

/** Writes version.json to the build output so the live commit can be checked at /version.json. */
function versionStamp(): Plugin {
  return {
    name: 'version-stamp',
    apply: 'build',
    generateBundle() {
      const version = {
        commit: gitCommit(),
        branch: process.env.CF_PAGES_BRANCH || process.env.GITHUB_REF_NAME || null,
        builtAt: new Date().toISOString(),
      }
      this.emitFile({ type: 'asset', fileName: 'version.json', source: JSON.stringify(version, null, 2) + '\n' })
    },
  }
}

/**
 * Validates and indexes /content at build time (P2-1) and serves it as pre-parsed JSON in virtual
 * modules: `virtual:content-core` (section configs, module list, glossary, review docs, and loaders),
 * `virtual:content-section/<ID>` (that section's simulations, exam forms and lesson metadata),
 * `virtual:content-module/<ID>` (one module's questions and flashcards) and `virtual:content-body/<ID>`
 * (one lesson's text). A section loads as its section chunk plus all of its module chunks in parallel;
 * lesson text loads only when a lesson (or search) needs it. Small per-module chunks also mean a
 * content update re-downloads only the modules that changed. The browser neither parses YAML nor runs
 * schema validation.
 * Invalid content fails `vite build`; in dev it is reported in the console.
 */
function contentBundle(): Plugin {
  const CORE = 'virtual:content-core'
  const SECTION = 'virtual:content-section/'
  const MODULE = 'virtual:content-module/'
  const BODY = 'virtual:content-body/'
  let isBuild = false
  let cache: ReturnType<typeof buildContent> | null = null
  const build = (ctx: { addWatchFile: (f: string) => void }) => {
    const files = readContentDir()
    for (const f of Object.keys(files)) ctx.addWatchFile(resolve('content', f.slice('/content/'.length)))
    return (cache ??= buildContent(files))
  }
  // JSON.parse of a string literal parses faster than an equivalent object literal.
  const json = (v: unknown) => `JSON.parse(${JSON.stringify(JSON.stringify(v))})`
  return {
    name: 'content-bundle',
    configResolved(config) {
      isBuild = config.command === 'build'
    },
    resolveId(source) {
      return source === CORE || [SECTION, MODULE, BODY].some((p) => source.startsWith(p)) ? '\0' + source : undefined
    },
    load(id) {
      if (!id.startsWith('\0virtual:content-')) return
      const result = build(this)
      if (result.errors.length && isBuild) this.error('Content validation failed:\n' + result.errors.join('\n'))
      const b = result.bundle
      if (id === '\0' + CORE) {
        const imp = (id: string) => `import(${JSON.stringify(id)})`
        const loaders = b.sections.map((s) => {
          const parts = [SECTION + s.id, ...b.modules.filter((m) => m.section === s.id).map((m) => MODULE + m.id)]
          return `  ${JSON.stringify(s.id)}: () => Promise.all([${parts.map(imp).join(', ')}]).then(merge),`
        })
        const bodyLoaders = Object.keys(b.lessons).map((id) => `  ${JSON.stringify(id)}: () => ${imp(BODY + id)},`)
        return [
          `export const core = ${json({ sections: b.sections, modules: b.modules, glossary: b.glossary, reviewDocs: b.reviewDocs })}`,
          `export const errors = ${JSON.stringify(result.errors)}`,
          'const merge = (parts) => {',
          '  const out = { lessons: {}, questions: {}, flashcards: [], tbs: {}, exams: [] }',
          '  for (const { default: p } of parts) {',
          '    Object.assign(out.lessons, p.lessons); Object.assign(out.questions, p.questions); Object.assign(out.tbs, p.tbs)',
          '    if (p.flashcards) out.flashcards.push(...p.flashcards)',
          '    if (p.exams) out.exams.push(...p.exams)',
          '  }',
          '  return { default: out }',
          '}',
          `export const loaders = {\n${loaders.join('\n')}\n}`,
          `export const bodyLoaders = {\n${bodyLoaders.join('\n')}\n}`,
        ].join('\n')
      }
      if (id.startsWith('\0' + MODULE)) {
        const mod = id.slice(('\0' + MODULE).length)
        const questions = Object.fromEntries(Object.entries(b.questions).filter(([, q]) => q.moduleId === mod))
        return `export default ${json({ questions, flashcards: b.flashcards.filter((f) => f.moduleId === mod) })}`
      }
      if (id.startsWith('\0' + BODY)) return `export default ${JSON.stringify(b.lessons[id.slice(('\0' + BODY).length)]?.body ?? '')}`
      const sec = id.slice(('\0' + SECTION).length)
      const mods = new Set(b.modules.filter((m) => m.section === sec).map((m) => m.id))
      const pick = <T,>(rec: Record<string, T>, keep: (v: T, k: string) => boolean) => Object.fromEntries(Object.entries(rec).filter(([k, v]) => keep(v, k)))
      // Lesson text is left out (body: ''); it loads per lesson from virtual:content-body/<ID>.
      const lessons = Object.fromEntries(Object.entries(pick(b.lessons, (_, k) => mods.has(k))).map(([k, l]) => [k, { ...l, body: '' }]))
      return `export default ${json({
        lessons,
        tbs: pick(b.tbs, (t) => t.section === sec),
        exams: b.exams.filter((e) => e.section === sec),
      })}`
    },
    handleHotUpdate({ file, server }) {
      if (!file.includes('/content/')) return
      cache = null
      for (const mod of server.moduleGraph.idToModuleMap.values()) if (mod.id?.startsWith('\0virtual:content-')) server.moduleGraph.invalidateModule(mod)
      server.ws.send({ type: 'full-reload' })
      return []
    },
  }
}

export default defineConfig({
  base,
  plugins: [
    versionStamp(),
    contentBundle(),
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['icon.svg'],
      manifest: {
        name: 'CPA Study Program',
        short_name: 'CPA Study',
        description: 'Concept-first CPA exam review with spaced repetition, simulations, and an adaptive study plan.',
        theme_color: '#1e3a8a',
        background_color: '#0f172a',
        display: 'standalone',
        start_url: base,
        scope: base,
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        // Mermaid ships many diagram engines we never use; keep them out of the install-time
        // precache (they are still cached at runtime if ever loaded).
        globIgnores: [
          '**/{elk,cytoscape,katex,architectureDiagram,sequenceDiagram,usecaseDiagram,swimlanes,mindmap,ganttDiagram,gitGraphDiagram,c4Diagram,sankeyDiagram,xychartDiagram,quadrantDiagram,requirementDiagram,journeyDiagram,timeline-definition,kanban,radar,treemap,blockDiagram,packet,pieDiagram,erDiagram,classDiagram,stateDiagram,wardley,venn,ishikawa,eventmodeling}*.js',
        ],
        // All study content is bundled into the main chunk as pre-validated JSON;
        // allow it to be precached so the app works fully offline.
        maximumFileSizeToCacheInBytes: 8 * 1024 * 1024,
        navigateFallback: 'index.html',
        // Let these load directly instead of being answered with the app shell.
        navigateFallbackDenylist: [/\/version\.json$/, /\/robots\.txt$/],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.includes('/assets/') && url.pathname.endsWith('.js'),
            handler: 'CacheFirst',
            options: { cacheName: 'lazy-chunks', expiration: { maxEntries: 200 } },
          },
        ],
      },
    }),
  ],
})
