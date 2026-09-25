// Error handling + backup-import robustness/XSS: IndexedDB unavailable, bad routes, malicious/malformed backups.
import fs from 'node:fs'
import { launch, BASE, DESKTOP, onboard } from './lib.mjs'

const b = await launch()
const log = []
const note = (k, v) => {
  log.push([k, v])
  console.log(k, JSON.stringify(v))
}
const bodyText = (p) => p.evaluate(() => document.body.innerText.trim().slice(0, 160))

// 1. IndexedDB unavailable (private mode / blocked storage)
{
  const ctx = await b.newContext({ viewport: DESKTOP })
  const page = await ctx.newPage()
  const errs = []
  page.on('pageerror', (e) => errs.push(e.message.slice(0, 150)))
  await page.addInitScript(() => {
    Object.defineProperty(window, 'indexedDB', {
      get() {
        return {
          open() {
            throw new DOMException('The user denied permission to access the database.', 'SecurityError')
          },
          deleteDatabase() {
            throw new DOMException('denied', 'SecurityError')
          },
        }
      },
    })
  })
  await page.goto(BASE)
  await page.waitForTimeout(4000)
  note('IndexedDB throws: visible text', await bodyText(page))
  note('IndexedDB throws: root children', await page.evaluate(() => document.getElementById('root').children.length))
  note('IndexedDB throws: page errors', errs.slice(0, 3))
  await page.screenshot({ path: 'shots/err-no-indexeddb.png' })
  await ctx.close()
}
// 1b. indexedDB undefined entirely
{
  const ctx = await b.newContext({ viewport: DESKTOP })
  const page = await ctx.newPage()
  await page.addInitScript(() => Object.defineProperty(window, 'indexedDB', { get: () => undefined }))
  await page.goto(BASE)
  await page.waitForTimeout(4000)
  note('indexedDB undefined: visible text', await bodyText(page))
  await ctx.close()
}

// 2. Unknown routes / ids
{
  const ctx = await b.newContext({ viewport: DESKTOP })
  const page = await ctx.newPage()
  await onboard(page)
  for (const r of ['#/module/does-not-exist', '#/exam/bogus', '#/tbs/bogus', '#/quiz/bogus', '#/final-review/bogus', '#/course/XYZ', '#/nonsense/path', '#/practice/start?module=nope', '#/practice/start']) {
    await page.goto(BASE + r)
    await page.waitForTimeout(800)
    note(`route ${r}`, { url: page.url().replace(BASE, ''), text: (await page.locator('main, body').first().innerText()).replace(/\s+/g, ' ').slice(0, 110) })
  }
  await ctx.close()
}

// 3. Backup import: XSS payloads, missing confirmation, malformed data
async function importBackup(page, obj, name) {
  const p = `out/${name}.json`
  fs.writeFileSync(p, JSON.stringify(obj))
  await page.goto(BASE + '#/settings')
  await page.waitForSelector('h1')
  let dialog = null
  page.once('dialog', async (d) => {
    dialog = d.message()
    await d.dismiss()
  })
  await page.setInputFiles('input[type=file]', p)
  await page.waitForTimeout(1200)
  return { dialogShown: dialog, status: await page.locator('[role=status]').innerText().catch(() => null) }
}
{
  const ctx = await b.newContext({ viewport: DESKTOP })
  const page = await ctx.newPage()
  const errs = []
  page.on('pageerror', (e) => errs.push(e.message.slice(0, 150)))
  let alerts = 0
  page.on('dialog', async (d) => {
    if (/xss/i.test(d.message())) alerts++
  })
  await onboard(page)
  const base = JSON.parse(fs.readFileSync('out/backup-export.json', 'utf8'))
  const xss = structuredClone(base)
  const payload = '<img src=x onerror="alert(\'xss\')"><script>alert("xss")</script>[x](javascript:alert("xss"))'
  xss.tables.moduleProgress = [{ moduleId: 'far-conceptual-framework', section: 'FAR', notes: payload, startedAt: new Date().toISOString(), lastVisitedAt: new Date().toISOString() }]
  xss.tables.highlights = [{ id: 1, moduleId: 'far-conceptual-framework', text: payload, at: new Date().toISOString() }]
  xss.tables.itemMeta = [{ itemId: Object.keys(JSON.parse(fs.readFileSync('../../content/far/modules/far-conceptual-framework/questions.json', 'utf8')))[0] ?? 'x', note: payload }]
  xss.tables.settings[0].lastLocation = { path: 'javascript:alert("xss")', label: payload, at: '' }
  note('import XSS backup', await importBackup(page, xss, 'backup-xss'))
  for (const r of ['#/notes', '#/module/far-conceptual-framework', '#/']) {
    await page.goto(BASE + r)
    await page.waitForTimeout(800)
  }
  note('XSS: alerts fired / injected <img onerror> or <script> in DOM', {
    alerts,
    injectedImg: await page.evaluate(() => document.querySelectorAll('img[onerror]').length),
    notesShowPayloadAsText: await page.goto(BASE + '#/notes').then(() => page.waitForTimeout(500)).then(() => page.getByText('<img src=x', { exact: false }).count()),
  })

  // Malformed backups
  const cases = {
    'bad-activeSection': (o) => (o.tables.settings[0].activeSection = 'XYZ'),
    'examDates-null': (o) => (o.tables.settings[0].examDates = null),
    'srs-missing-card': (o) => (o.tables.srs = [{ key: 'card:zzz', kind: 'card', itemId: 'zzz', moduleId: 'far-conceptual-framework', section: 'FAR', due: '2000-01-01T00:00:00.000Z' }]),
    'fontScale-huge': (o) => (o.tables.settings[0].fontScale = 40),
    'attempts-garbage': (o) => (o.tables.attempts = [{ id: 1, itemId: 42, section: 'FAR', day: null, at: 5 }]),
  }
  for (const [name, mut] of Object.entries(cases)) {
    const o = structuredClone(base)
    mut(o)
    const r = await importBackup(page, o, 'backup-' + name)
    const results = {}
    for (const route of ['#/', '#/review', '#/analytics', '#/settings']) {
      await page.goto(BASE + route)
      await page.waitForTimeout(900)
      const t = (await page.evaluate(() => document.getElementById('root')?.innerText.trim() ?? '')).replace(/\s+/g, ' ')
      results[route] = t ? t.slice(0, 50) : 'BLANK SCREEN'
    }
    note(`malformed backup ${name}`, { import: r, results, pageErrors: errs.splice(0).slice(0, 2) })
    await page.screenshot({ path: `shots/err-backup-${name}.png` })
    // restore a good state for the next case (if the app is still usable)
    await page.evaluate(() => new Promise((res) => { const q = indexedDB.deleteDatabase('cpa-study'); q.onsuccess = q.onerror = q.onblocked = () => res() }))
    await page.goto('about:blank')
    await onboard(page).catch(() => {})
  }
  // Non-backup JSON and non-JSON
  note('import non-backup JSON', await importBackup(page, { hello: 1 }, 'backup-notbackup'))
  fs.writeFileSync('out/backup-notjson.json', 'not json{')
  await page.goto(BASE + '#/settings')
  await page.setInputFiles('input[type=file]', 'out/backup-notjson.json')
  await page.waitForTimeout(800)
  note('import non-JSON file', await page.locator('[role=status]').innerText().catch(() => null))
  await ctx.close()
}
fs.writeFileSync('out/errors.json', JSON.stringify(log, null, 2))
await b.close()
