// Core-flow walkthrough: onboarding -> dashboard -> lesson -> practice -> flashcards -> TBS -> analytics -> settings.
// Usage: node flows.mjs            (desktop 1366x768)
//        VP=mobile node flows.mjs  (390x844, touch)
import fs from 'node:fs'
import { launch, BASE, DESKTOP, MOBILE, collectErrors, onboard } from './lib.mjs'

const vp = process.env.VP === 'mobile' ? 'mobile' : 'desktop'
const b = await launch()
const ctx = await b.newContext(
  vp === 'mobile' ? { viewport: MOBILE, isMobile: true, hasTouch: true, deviceScaleFactor: 2 } : { viewport: DESKTOP, acceptDownloads: true },
)
const page = await ctx.newPage()
const errs = []
collectErrors(page, errs)
const log = []
const note = (k, v) => {
  log.push([k, v])
  console.log(k, typeof v === 'string' ? v : JSON.stringify(v))
}
const shot = (n, full = false) => page.screenshot({ path: `shots/${vp}-${n}.png`, fullPage: full })
const hscroll = () => page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }))

// 1. Onboarding
await page.goto(BASE)
await page.waitForSelector('h1')
await shot('01-welcome')
await onboard(page)
await shot('02-dashboard', true)
note('dashboard hscroll', await hscroll())

// 2. Lesson
await page.getByRole('link', { name: /Study next/ }).click()
await page.waitForURL(/#\/module\//)
await page.waitForSelector('h1')
const moduleUrl = page.url()
note('module url', moduleUrl)
await shot('03-module-top')
await shot('03-module-full', true)
note('module hscroll', await hscroll())
// inline pre-question
const preq = page.locator('aside[aria-label^="Pre-question"]').first()
if (await preq.count()) {
  await preq.getByRole('radio').first().click()
  await preq.getByRole('button', { name: /Unsure/ }).click()
  await page.waitForTimeout(300)
  note('pre-question feedback', (await preq.locator('[role=status]').innerText().catch(() => 'none')).slice(0, 120))
}
// mermaid present?
note('mermaid figures', await page.locator('figure [role=img]').count())

// 3. Practice set from lesson
await page.getByRole('button', { name: /Mark complete & practice/ }).click()
await page.waitForURL(/#\/quiz\//)
await page.waitForSelector('[role=radiogroup]')
await shot('04-quiz-q1')
const quizUrl = page.url()
// answer Q1 by click: choice B, confidence Confident
await page.getByRole('radio').nth(1).click()
await page.getByRole('button', { name: /Confident/ }).click()
await page.waitForSelector('[role=status]')
await shot('05-quiz-q1-explained', true)
note('quiz q1 feedback', await page.locator('[role=status]').first().innerText())
await page.getByRole('button', { name: /Next question/ }).click()
await page.waitForTimeout(300)
// Q2 via keyboard: 'a' then '2'
if (vp === 'desktop') {
  await page.keyboard.press('a')
  await page.waitForTimeout(150)
  await page.keyboard.press('2')
  await page.waitForTimeout(300)
  note('quiz q2 keyboard revealed', await page.locator('[role=status]').count())
  await page.keyboard.press('ArrowRight')
  await page.waitForTimeout(300)
} else {
  await page.getByRole('radio').first().click()
  await page.getByRole('button', { name: /Unsure/ }).click()
  await page.waitForTimeout(300)
  await page.getByRole('button', { name: /Next question/ }).click()
  await page.waitForTimeout(300)
}
// Q3: select but do not confirm, then refresh
await page.getByRole('radio').nth(2).click()
await page.waitForTimeout(12000) // let the elapsed clock persist (every 10 s)
const beforeReload = {
  header: await page.locator('.sticky').first().innerText(),
  q: await page.locator('article span.font-semibold').first().innerText(),
  checked: await page.locator('[role=radio][aria-checked=true]').count(),
}
await page.reload()
await page.waitForSelector('[role=radiogroup]')
await page.waitForTimeout(500)
const afterReload = {
  header: await page.locator('.sticky').first().innerText(),
  q: await page.locator('article span.font-semibold').first().innerText(),
  checked: await page.locator('[role=radio][aria-checked=true]').count(),
}
note('quiz refresh before', beforeReload)
note('quiz refresh after', afterReload)

// finish the set quickly (tutor): answer remaining with 'a' + confident
for (let i = 0; i < 12; i++) {
  const next = page.getByRole('button', { name: /Next question|See results/ })
  if (!(await page.locator('[role=status]').count())) {
    await page.getByRole('radio').first().click()
    await page.getByRole('button', { name: /Confident/ }).click()
    await page.waitForTimeout(200)
  }
  const label = await next.innerText().catch(() => '')
  await next.click()
  await page.waitForTimeout(200)
  if (/See results/.test(label)) break
}
await page.waitForSelector('text=Set complete')
await shot('06-quiz-results', true)
note('quiz results', (await page.locator('main').innerText()).slice(0, 300))

// 4. Review / flashcards
await page.goto(BASE + '#/review')
await page.waitForSelector('h1')
await shot('07-review')
note('review page', (await page.locator('main').innerText()).slice(0, 300))
const studyBtn = page.getByRole('button', { name: /Study \d+ cards/ })
if (await studyBtn.count()) {
  await studyBtn.click()
  await page.waitForTimeout(300)
  await shot('08-flashcard-front')
  await page.getByRole('button', { name: 'Show answer' }).click()
  await page.waitForTimeout(200)
  await shot('08-flashcard-back')
  await page.getByRole('button', { name: /^Good/ }).click()
  await page.waitForTimeout(200)
}

// 5. TBS
await page.goto(BASE + '#/tbs')
await page.waitForSelector('h1')
await shot('09-tbs-list')
const firstTbs = page.locator('a[href^="#/tbs/"]').first()
const tbsHref = await firstTbs.getAttribute('href')
note('tbs href', tbsHref)
await firstTbs.click()
await page.waitForSelector('h1')
await page.waitForTimeout(300)
await shot('10-tbs-open')
await shot('10-tbs-open-full', true)
note('tbs hscroll', await hscroll())
// fill every numeric/journal input and first option of every select
const inputs = page.locator('main input:not([type=radio]):not([type=checkbox])')
const nIn = await inputs.count()
for (let i = 0; i < nIn; i++) {
  if (await inputs.nth(i).isVisible()) await inputs.nth(i).fill(String(1000 * (i + 1)))
}
const selects = page.locator('main select')
const nSel = await selects.count()
for (let i = 0; i < nSel; i++) {
  const opts = await selects.nth(i).locator('option').allTextContents()
  if (opts.length > 1) await selects.nth(i).selectOption({ index: 1 })
}
const radios = page.locator('main input[type=radio]')
if (await radios.count()) await radios.first().check()
note('tbs filled', { nIn, nSel, radios: await radios.count() })
await page.waitForTimeout(3000)
const tbsClockBefore = await page.locator('span.font-mono.tabular-nums').first().innerText()
await page.waitForTimeout(3000)
const tbsClockBefore2 = await page.locator('span.font-mono.tabular-nums').first().innerText()
await page.reload()
await page.waitForSelector('h1')
await page.waitForTimeout(500)
const vals = await page.locator('main input:not([type=radio]):not([type=checkbox])').evaluateAll((els) => els.map((e) => e.value))
note('tbs refresh', { clockBeforeReload: tbsClockBefore2, clockAfterReload: await page.locator('span.font-mono.tabular-nums').first().innerText(), sampleValuesAfter: vals.slice(0, 4), filledAfter: vals.filter(Boolean).length, tbsClockBefore })
await page.getByRole('button', { name: /Submit & see explanations/ }).click()
await page.waitForSelector('#tbs-results')
await page.waitForTimeout(800)
note('tbs score', await page.locator('#tbs-results').innerText())
await shot('11-tbs-results')

// 6. Analytics
await page.goto(BASE + '#/analytics')
await page.waitForSelector('h1')
await page.waitForTimeout(300)
await shot('12-analytics', true)
note('analytics hscroll', await hscroll())

// 7. Settings export/import
await page.goto(BASE + '#/settings')
await page.waitForSelector('h1')
await shot('13-settings', true)
if (vp === 'desktop') {
  const [dl] = await Promise.all([page.waitForEvent('download'), page.getByRole('button', { name: /Export backup/ }).click()])
  const p = 'out/backup-export.json'
  await dl.saveAs(p)
  const bk = JSON.parse(fs.readFileSync(p, 'utf8'))
  note('export', { file: dl.suggestedFilename(), tables: Object.fromEntries(Object.entries(bk.tables).map(([k, v]) => [k, v.length])) })
  // Import it back
  await page.setInputFiles('input[type=file]', p)
  await page.waitForSelector('[role=status]')
  note('import msg', await page.locator('[role=status]').innerText())
}

note('console/page errors', errs)
fs.writeFileSync(`out/flows-${vp}.json`, JSON.stringify(log, null, 2))
await b.close()
