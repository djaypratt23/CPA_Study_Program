// Offline behaviour after the service worker has installed: lessons with Mermaid diagrams, first-time.
import { launch, BASE, onboard } from './lib.mjs'
const b = await launch()
const ctx = await b.newContext({ viewport: { width: 1366, height: 768 } })
const page = await ctx.newPage()
const reqs = []
page.on('requestfinished', async (r) => { if (r.url().includes('/assets/')) { const s = await r.sizes().catch(() => null); reqs.push([r.url().split('/').pop(), s?.responseBodySize]) } })
await onboard(page)
await page.evaluate(() => navigator.serviceWorker.ready)
await page.waitForTimeout(4000)
// online: first lesson with a diagram -> which chunks load?
reqs.length = 0
await page.goto(BASE + '#/module/far-conceptual-framework')
await page.waitForSelector('figure [role=img]', { timeout: 15000 }).catch(() => {})
await page.waitForTimeout(1500)
console.log('online: chunks fetched when opening first diagram lesson:', JSON.stringify(reqs.filter(([u]) => !u.startsWith('index-'))))
// offline, fresh context sharing nothing: install SW, never open a diagram lesson, go offline
const ctx2 = await b.newContext({ viewport: { width: 1366, height: 768 } })
const p2 = await ctx2.newPage()
await onboard(p2)
await p2.evaluate(() => navigator.serviceWorker.ready)
await p2.waitForTimeout(4000)
await ctx2.setOffline(true)
await p2.goto('about:blank')
await p2.goto(BASE + '#/module/far-conceptual-framework').catch((e) => console.log('goto err', e.message))
await p2.waitForSelector('h1', { timeout: 10000 })
await p2.waitForTimeout(3000)
console.log('offline first diagram lesson:', JSON.stringify({
  renderedSvgDiagrams: await p2.locator('figure [role=img] svg').count(),
  fallbackSourceBlocks: await p2.locator('pre[aria-label="Diagram source"]').count(),
  loadingPlaceholders: await p2.getByText('Loading diagram…').count(),
}))
await p2.screenshot({ path: 'shots/offline-mermaid.png' })
await b.close()
