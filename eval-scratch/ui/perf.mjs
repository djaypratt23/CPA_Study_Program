// Load timing under throttling (cold + warm/service-worker), JS heap, long tasks.
import fs from 'node:fs'
import { launch, BASE, onboard } from './lib.mjs'

const b = await launch()
const out = {}
async function measure(label, { cpu = 1, net = null, warm = false }) {
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })
  const page = await ctx.newPage()
  const cdp = await ctx.newCDPSession(page)
  if (warm) {
    await onboard(page)
    // wait for the service worker to install + precache
    await page.evaluate(async () => {
      const reg = await navigator.serviceWorker.ready
      return !!reg.active
    })
    await page.waitForTimeout(3000)
  }
  await cdp.send('Performance.enable')
  if (net) await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: net.rtt, downloadThroughput: (net.kbps * 1024) / 8, uploadThroughput: (net.kbps * 1024) / 8 })
  if (cpu > 1) await cdp.send('Emulation.setCPUThrottlingRate', { rate: cpu })
  await page.addInitScript(() => {
    window.__lt = []
    try {
      new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__lt.push(Math.round(e.duration)))).observe({ type: 'longtask', buffered: true })
    } catch {}
  })
  const t0 = Date.now()
  if (warm) await page.reload({ waitUntil: 'commit' })
  else await page.goto(BASE, { waitUntil: 'commit' })
  await page.waitForSelector('h1', { timeout: 120000 })
  const tH1 = Date.now() - t0
  const nav = await page.evaluate(() => {
    const n = performance.getEntriesByType('navigation')[0]
    const fcp = performance.getEntriesByName('first-contentful-paint')[0]
    return { domContentLoaded: Math.round(n.domContentLoadedEventEnd), load: Math.round(n.loadEventEnd), fcp: fcp && Math.round(fcp.startTime), transfer: n.transferSize, longTasks: window.__lt }
  })
  const m = await cdp.send('Performance.getMetrics')
  const heap = m.metrics.find((x) => x.name === 'JSHeapUsedSize').value
  const sw = await page.evaluate(() => !!navigator.serviceWorker.controller)
  out[label] = { msToFirstH1: tH1, ...nav, jsHeapMB: +(heap / 1048576).toFixed(1), swControlled: sw, h1: await page.locator('h1').first().innerText() }
  console.log(label, JSON.stringify(out[label]))
  if (label === 'warm-nothrottle') {
    // memory after walking the heavier pages
    for (const r of ['#/module/far-conceptual-framework', '#/analytics', '#/plan', '#/search?q=lease', '#/tbs/far-tbs-u1-cash-flows']) {
      await page.goto(BASE + r)
      await page.waitForSelector('h1')
      await page.waitForTimeout(800)
    }
    await cdp.send('HeapProfiler.enable')
    await cdp.send('HeapProfiler.collectGarbage')
    const m2 = await cdp.send('Performance.getMetrics')
    out['heap-after-pages-MB'] = +(m2.metrics.find((x) => x.name === 'JSHeapUsedSize').value / 1048576).toFixed(1)
    console.log('heap after walking 5 pages + GC (MB)', out['heap-after-pages-MB'])
    // cache storage size
    out.cacheStorage = await page.evaluate(async () => {
      const names = await caches.keys()
      const res = {}
      for (const n of names) {
        const c = await caches.open(n)
        const keys = await c.keys()
        let bytes = 0
        for (const k of keys) bytes += (await (await c.match(k)).arrayBuffer()).byteLength
        res[n] = { entries: keys.length, MB: +(bytes / 1048576).toFixed(2), sample: n === 'lazy-chunks' ? keys.map((k) => k.url.split('/').pop()) : undefined }
      }
      const est = await navigator.storage.estimate()
      res.estimateUsageMB = +(est.usage / 1048576).toFixed(2)
      return res
    })
    console.log('cache storage', JSON.stringify(out.cacheStorage))
  }
  await ctx.close()
}
const SLOW4G = { rtt: 150, kbps: 1600 }
await measure('cold-nothrottle', {})
await measure('cold-slow4g-cpu4x', { cpu: 4, net: SLOW4G })
await measure('warm-nothrottle', { warm: true })
await measure('warm-sw-cpu4x', { warm: true, cpu: 4 })
fs.writeFileSync('out/perf.json', JSON.stringify(out, null, 2))
await b.close()
