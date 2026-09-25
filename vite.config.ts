import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import { execSync } from 'node:child_process'
import type { Plugin } from 'vite'

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

export default defineConfig({
  base,
  plugins: [
    versionStamp(),
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
        // All study content is bundled into the main chunk (~0.9 MB gzipped with three full sections);
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
