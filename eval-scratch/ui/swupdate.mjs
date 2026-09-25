// Service-worker auto-update: does a new deploy force-reload an open page mid-task (and lose unsaved input)?
// Serves dist-v1 (copy of ../../dist) then switches to build-sm (a second build) on the same origin.
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { launch, onboard } from './lib.mjs'

let root = path.resolve('dist-v1')
const types = { '.js': 'text/javascript', '.css': 'text/css', '.html': 'text/html', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webmanifest': 'application/manifest+json' }
const srv = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0])
  if (p === '/') p = '/index.html'
  const f = path.join(root, p)
  if (!fs.existsSync(f)) { res.writeHead(404); return res.end() }
  res.writeHead(200, { 'Content-Type': types[path.extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-cache' })
  fs.createReadStream(f).pipe(res)
}).listen(4180)
const BASE = 'http://localhost:4180/'
const b = await launch()
const ctx = await b.newContext({ viewport: { width: 1366, height: 768 } })
const page = await ctx.newPage()
let navs = 0
page.on('framenavigated', (f) => { if (f === page.mainFrame()) navs++ })
// v1: onboard + let SW install
await page.goto(BASE)
await page.evaluate(() => navigator.serviceWorker.ready)
await page.waitForTimeout(3000)
await page.goto(BASE + '#/welcome')
await page.getByRole('button', { name: /Got it/ }).click()
await page.getByRole('button', { name: 'Next' }).click()
await page.getByRole('button', { name: /Build my plan/ }).click()
await page.waitForURL(/#\/$/)
const v1Script = await page.evaluate(() => document.querySelector('script[type=module]')?.src)
// deploy v2
root = path.resolve('build-sm')
// user comes back: new page load (served from v1 precache), goes to a lesson and starts typing a note
await page.goto('about:blank')
await page.goto(BASE + '#/module/far-conceptual-framework')
const v1Loaded = await page.evaluate(() => document.querySelector('script[type=module]')?.src)
await page.waitForSelector('h1')
const navsBefore = navs
await page.locator('textarea[aria-label="Module notes"]').click()
await page.keyboard.type('My summary of the conceptual framework that I have not blurred yet')
const t0 = Date.now()
let reloaded = false
for (let i = 0; i < 40; i++) {
  await page.waitForTimeout(500)
  if (navs > navsBefore) { reloaded = true; break }
}
await page.waitForTimeout(1500)
const noteAfter = await page.locator('textarea[aria-label="Module notes"]').inputValue().catch(() => 'n/a')
const v2Script = await page.evaluate(() => document.querySelector('script[type=module]')?.src)
console.log(JSON.stringify({ v1Script, v1Loaded, v2Script, autoReloadedWhileTyping: reloaded, secondsAfterOpen: reloaded ? (Date.now() - t0) / 1000 : null, noteTextAfter: noteAfter }))
await b.close()
srv.close()
