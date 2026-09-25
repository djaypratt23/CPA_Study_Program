// Simulated exam walkthrough: timer, calculator, flag, answer race, refresh, testlet lock, break, results.
// Usage: node exam.mjs   (VP=mobile for 390x844 screenshots)
import fs from 'node:fs'
import { launch, BASE, DESKTOP, MOBILE, collectErrors, onboard } from './lib.mjs'

const vp = process.env.VP === 'mobile' ? 'mobile' : 'desktop'
const b = await launch()
const ctx = await b.newContext(vp === 'mobile' ? { viewport: MOBILE, isMobile: true, hasTouch: true, deviceScaleFactor: 2 } : { viewport: DESKTOP })
const page = await ctx.newPage()
const errs = []
collectErrors(page, errs)
const log = []
const note = (k, v) => {
  log.push([k, v])
  console.log(k, typeof v === 'string' ? v : JSON.stringify(v))
}
const shot = (n, full = false) => page.screenshot({ path: `shots/${vp}-exam-${n}.png`, fullPage: full })
const clock = () => page.locator('header span.font-mono').first().innerText()
const dbSession = () =>
  page.evaluate(
    () =>
      new Promise((res) => {
        const r = indexedDB.open('cpa-study')
        r.onsuccess = () => {
          const tx = r.result.transaction('examSessions', 'readonly')
          const g = tx.objectStore('examSessions').getAll()
          g.onsuccess = () => res(g.result[0])
        }
      }),
  )

await onboard(page)
await page.goto(BASE + '#/exam')
await page.waitForSelector('h1')
await shot('00-home', true)
await page.getByRole('button', { name: 'Start' }).first().click()
await page.waitForURL(/#\/exam\/exam-/)
await page.waitForSelector('[role=radiogroup]')
const examUrl = page.url()
await shot('01-mcq')
const c0 = await clock()
await page.waitForTimeout(6000)
note('clock t0 / t+6s', [c0, await clock()])

// Tools present in the exam UI
const bodyText = await page.locator('body').innerText()
note('exam tools', {
  authLiterature: /authoritative literature|codification|search the literature/i.test(bodyText),
  spreadsheet: /spreadsheet|excel/i.test(bodyText),
  calculatorBtn: await page.getByRole('button', { name: 'Calculator' }).count(),
  highlight: /highlight/i.test(bodyText),
  headerButtons: await page.locator('header button, header a').allInnerTexts(),
})

if (vp === 'desktop') {
  // Calculator: open via mouse, then type without clicking inside it
  await page.getByRole('button', { name: 'Calculator' }).click()
  await page.waitForSelector('[role=dialog][aria-label=Calculator]')
  note('calc focus after open', await page.evaluate(() => document.activeElement?.getAttribute('aria-label') || document.activeElement?.tagName))
  await page.keyboard.type('12+3')
  await page.waitForTimeout(200)
  note('calc display after typing 12+3 (no click inside)', await page.locator('[role=dialog] output').innerText())
  await page.keyboard.press('Enter')
  await page.waitForTimeout(300)
  note('calc still open after Enter?', await page.locator('[role=dialog][aria-label=Calculator]').count())
  if (!(await page.locator('[role=dialog][aria-label=Calculator]').count())) await page.getByRole('button', { name: 'Calculator' }).click()
  // Now click a calculator key then type
  await page.locator('[role=dialog] button', { hasText: /^C$/ }).click()
  await page.keyboard.type('12+3')
  await page.keyboard.press('Enter')
  await page.waitForTimeout(300)
  note('calc display after clicking C then typing', await page.locator('[role=dialog] output').innerText())
  // What does Enter do when focus is on a calc button? (native button click + onKeyDown equals)
  note('calc: Escape closes?', await (async () => { await page.keyboard.press('Escape'); await page.waitForTimeout(200); return (await page.locator('[role=dialog][aria-label=Calculator]').count()) === 0 })())
  await shot('02-after-calc')
  // Did typing '1','2','3' etc. change the MCQ answer? (letters a-d not typed, but check)
  const s = await dbSession()
  note('mcqAnswers after calc typing', s.testlets[0].mcqAnswers)
}

// Flag for review
await page.getByRole('button', { name: /Flag for review/ }).click()
await page.waitForTimeout(300)
note('navigator Q1 label after flag', await page.locator('nav[aria-label="Question navigator"] button').first().getAttribute('aria-label'))

// Answer race: select, then immediately navigate next (keyboard), for several delays
const results = []
for (const [i, delay] of [[1, 0], [2, 0], [3, 10], [4, 30], [5, 60], [6, 120], [7, 250]].entries()) {
  // go to question index delay[0] (0-based = i+1?) -> use navigator
  const qi = delay[0]
  await page.locator('nav[aria-label="Question navigator"] button').nth(qi).click()
  await page.waitForTimeout(300)
  await page.locator('body').click({ position: { x: 5, y: 700 } }).catch(() => {})
  await page.keyboard.press('b')
  if (delay[1]) await page.waitForTimeout(delay[1])
  await page.keyboard.press('ArrowRight')
  await page.waitForTimeout(400)
  const s = await dbSession()
  const id = s.testlets[0].items[qi]
  results.push({ q: qi + 1, delayMs: delay[1], saved: s.testlets[0].mcqAnswers[id] ?? null, indexNow: s.testlets[0].index })
}
note('answer-then-next race (expected saved=b)', results)
// Same race with mouse: click choice then click Next
const mouseRace = []
for (const qi of [10, 11, 12]) {
  await page.locator('nav[aria-label="Question navigator"] button').nth(qi).click()
  await page.waitForTimeout(300)
  await page.getByRole('radio').nth(2).click()
  await page.getByRole('button', { name: 'Next →' }).click()
  await page.waitForTimeout(400)
  const s = await dbSession()
  mouseRace.push({ q: qi + 1, saved: s.testlets[0].mcqAnswers[s.testlets[0].items[qi]] ?? null })
}
note('mouse click-choice-then-Next race (expected c)', mouseRace)

// Refresh mid-exam
await page.waitForTimeout(2500)
const beforeC = await clock()
const beforeDb = (await dbSession()).remainingMs
await page.reload()
await page.waitForSelector('[role=radiogroup]')
const afterC = await clock()
await page.waitForTimeout(3000)
note('exam refresh', { clockBefore: beforeC, dbRemainingBefore: beforeDb, clockAfterReload: afterC, clockAfter3s: await clock() })
const s1 = await dbSession()
note('answers after reload', Object.keys(s1.testlets[0].mcqAnswers).length)

// Main-thread stall: exam clock is tick-counted, not wall-clock based
const cA = await clock()
await page.evaluate(() => {
  const end = Date.now() + 8000
  while (Date.now() < end) {}
})
await page.waitForTimeout(1100)
note('8 s main-thread stall: clock before/after', [cA, await clock()])

// Pause & exit, wait, resume
const cP = await clock()
await page.getByRole('link', { name: /Pause & exit/ }).click()
await page.waitForURL(/#\/exam$/)
await page.waitForTimeout(6000)
await page.getByRole('link', { name: /Resume exam/ }).click()
await page.waitForSelector('[role=radiogroup]')
note('pause&exit 6 s: clock before/after resume', [cP, await clock()])

// Submit testlet 1 -> confirm
await page.getByRole('button', { name: 'Submit testlet' }).click()
await shot('03-confirm')
await page.getByRole('button', { name: 'Submit testlet' }).click()
await page.waitForTimeout(500)
note('after submit t1 header', await page.locator('header div.text-sm').first().innerText())
note('any way back to testlet 1?', await page.getByText(/Testlet 1/).count())
// browser back
await page.goBack()
await page.waitForTimeout(500)
note('browser back from exam goes to', page.url())
await page.goForward()
await page.waitForSelector('[role=radiogroup]')
// submit testlet 2 unanswered
await page.getByRole('button', { name: 'Submit testlet' }).click()
await page.getByRole('button', { name: 'Submit testlet' }).click()
await page.waitForTimeout(600)
await shot('04-tbs-testlet')
await shot('04-tbs-testlet-full', true)
note('tbs testlet hscroll', await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth })))
// fill one input in TBS then refresh
const inp = page.locator('main input:not([type=radio])').first()
if (await inp.count()) {
  await inp.fill('12345')
  await page.waitForTimeout(500)
  await page.reload()
  await page.waitForSelector('main')
  await page.waitForTimeout(500)
  note('exam TBS value after reload', await page.locator('main input:not([type=radio])').first().inputValue())
}
// Keyboard hotkeys while typing into a TBS input: type "abcd" into a numeric field -> should not select anything
await page.getByRole('button', { name: 'Submit testlet' }).click()
await page.getByRole('button', { name: 'Submit testlet' }).click()
await page.waitForTimeout(600)
await shot('05-break-offer')
note('break offer text', (await page.locator('main').innerText()).slice(0, 200))
await page.getByRole('button', { name: 'Take break' }).click()
await page.waitForTimeout(3000)
const bc = await page.locator('main span.font-mono').first().innerText()
const examClockOnBreak = await clock()
await page.waitForTimeout(6000)
note('break: break clock t0/t+6, exam clock t0/t+6', [bc, await page.locator('main span.font-mono').first().innerText(), examClockOnBreak, await clock()])
await shot('06-break')
await page.reload()
await page.waitForSelector('main')
await page.waitForTimeout(1000)
note('break after reload', { onBreak: (await page.locator('h1').innerText().catch(() => '')), breakClock: await page.locator('main span.font-mono').first().innerText().catch(() => '') })
await page.getByRole('button', { name: 'Resume exam' }).click()
await page.waitForTimeout(500)
// submit testlets 4 & 5
for (let i = 0; i < 2; i++) {
  await page.getByRole('button', { name: /Submit (testlet|exam)/ }).click()
  await page.getByRole('button', { name: /Submit testlet/ }).click()
  await page.waitForTimeout(800)
}
await page.waitForSelector('text=Simulated exam results', { timeout: 10000 })
await shot('07-results', true)
note('results', (await page.locator('body').innerText()).slice(0, 400))
note('errors', errs)
fs.writeFileSync(`out/exam-${vp}.json`, JSON.stringify(log, null, 2))
await b.close()
