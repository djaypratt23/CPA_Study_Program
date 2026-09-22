import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/CPA_Study_Program/',
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg'],
      manifest: {
        name: 'CPA Study Program',
        short_name: 'CPA Study',
        description: 'Concept-first CPA exam review with spaced repetition, simulations, and an adaptive study plan.',
        theme_color: '#1e3a8a',
        background_color: '#0f172a',
        display: 'standalone',
        start_url: '/CPA_Study_Program/',
        scope: '/CPA_Study_Program/',
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
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
        navigateFallback: 'index.html',
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
