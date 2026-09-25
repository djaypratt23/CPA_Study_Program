// Friction audit of a "typical daily session" on day 2:
// open app -> review due flashcards -> review due questions -> ~10-MCQ practice set -> open next lesson.
// Counts every click/keypress/scroll, split into study vs non-study, and times non-study waits.
import fs from 'node:fs'
import { launch, BASE, DESKTOP, MOBILE, onboard } from './lib.mjs'

const vp = process.env.VP === 'mobile' ? 'mobile' : 'desktop'
const b = await launch()
const ctx = await b.newContext(vp === 'mobile' ? { viewport: MOBILE, isMobile: true, hasTouch: true } : { viewport: DESKTOP })
let page = await ctx.newPage()

// ---------- Day 1 setup (not counted) ----------
await onboard(page)
await page.goto(BASE + '#/module/far-conceptual-framework')
await page.getByRole('button', { name: /Mark complete & practice/ }).click()
await page.waitForURL(/#\/quiz\//)
for (let i = 0; i < 10; i++) {
  await page.waitForSelector('[role=radiogroup]')
  await page.getByRole('radio').nth(i % 4).click()
  await page.getByRole('button', { name: i % 3 ? /Confident/ : /Guess/ }).click()
  await page.waitForSelector('[role=status]')
  await page.getByRole('button', { name: /Next question|See results/ }).click()
}
await page.goto(BASE + '#/review')
await page.getByRole('button', { name: /Study \d+ cards/ }).click()
for (let i = 0; i < 40; i++) {
  await page.waitForSelector('button:has-text("Finish"), button[aria-label="Show answer"]')
  if (await page.getByRole('button', { name: 'Finish' }).count()) break
  await page.getByRole('button', { name: 'Show answer' }).click()
  await page.getByRole('button', { name: /^Good/ }).click()
}
// Unfinished practice set: does the dashboard offer to resume it?
await page.goto(BASE + '#/practice/start?module=far-balance-sheet-equity')
await page.waitForURL(/#\/quiz\//)
const unfinishedUrl = page.url()
await page.getByRole('radio').first().click()
await page.getByRole('button', { name: /Unsure/ }).click()
await page.goto(BASE + '#/')
await page.waitForSelector('h1')
const dashText = await page.locator('main').innerText()
const resumeOffered = /resume|continue/i.test(dashText)
const quizSessionsBefore = await page.evaluate(() => new Promise((r) => { const o = indexedDB.open('cpa-study'); o.onsuccess = () => { const g = o.result.transaction('quizSessions').objectStore('quizSessions').count(); g.onsuccess = () => r(g.result) } }))
await page.close()

// ---------- Day 2 (clock +1 day) ----------
page = await ctx.newPage()
await page.clock.install({ time: new Date(Date.now() + 24 * 3600 * 1000 + 60_000) })
const counts = { study: { clicks: 0, keys: 0, scrolls: 0 }, nonStudy: { clicks: 0, keys: 0, scrolls: 0 } }
const waits = []
const steps = []
const click = async (loc, kind, label) => {
  const box = await loc.boundingBox()
  const vh = page.viewportSize().height
  if (box && (box.y + box.height > vh - (vp === 'mobile' ? 70 : 0) || box.y < 0)) counts[kind].scrolls++ // needs a scroll first
  await loc.click()
  counts[kind].clicks++
  steps.push(`${kind}:click:${label}`)
}
const key = async (k, kind) => {
  await page.keyboard.press(k)
  counts[kind].keys++
}
const timed = async (label, fn) => {
  const t = Date.now()
  await fn()
  waits.push([label, Date.now() - t])
}
await timed('open app -> dashboard ready', async () => {
  await page.goto(BASE)
  await page.waitForSelector('h1')
})
const plan = await page.locator('#today ~ ul, section[aria-labelledby=today] ul').first().innerText().catch(() => '')
const nextBtn = (await page.getByRole('link', { name: /→/ }).first().innerText()).replace(/\s+/g, ' ')

// 1. Review due flashcards: click the plan's Review task (or bottom-nav Review)
await timed('dashboard -> review page', async () => {
  await click(page.getByRole('link', { name: /review/i }).filter({ hasText: /Review|due/ }).first(), 'nonStudy', 'Review task')
  await page.waitForSelector('h1:has-text("Spaced review")')
})
const reviewText = (await page.locator('main').innerText()).replace(/\s+/g, ' ').slice(0, 200)
const cardsBtn = page.getByRole('button', { name: /Study \d+ cards/ })
let cards = 0
if (await cardsBtn.count()) {
  await click(cardsBtn, 'nonStudy', 'Study N cards')
  for (let i = 0; i < 60; i++) {
    await page.waitForSelector('button:has-text("Finish"), button[aria-label="Show answer"]')
    if (await page.getByRole('button', { name: 'Finish' }).count()) break
    if (vp === 'desktop') {
      await key('Space', 'study')
      await key('3', 'study')
    } else {
      await click(page.getByRole('button', { name: 'Show answer' }), 'study', 'flip')
      await click(page.getByRole('button', { name: /^Good/ }), 'study', 'rate')
    }
    cards++
    await page.waitForTimeout(50)
  }
  await click(page.getByRole('button', { name: 'Finish' }), 'nonStudy', 'Finish cards')
}
// 2. Due questions (from the same review page)
let dueQs = 0
const dueLink = page.getByRole('link', { name: /Review \d+ questions/ })
if (await dueLink.count()) {
  await timed('review page -> due-question quiz', async () => {
    await click(dueLink, 'nonStudy', 'Review N questions')
    await page.waitForURL(/#\/quiz\//)
    await page.waitForSelector('[role=radiogroup]')
  })
  for (let i = 0; i < 30; i++) {
    if (await page.getByText('Set complete').count()) break
    if (vp === 'desktop') {
      await key('b', 'study')
      await page.waitForTimeout(150)
      await key('3', 'study')
      await page.waitForSelector('[role=status]')
      const last = await page.getByRole('button', { name: 'See results' }).count()
      if (last) await click(page.getByRole('button', { name: 'See results' }), 'nonStudy', 'See results')
      else await key('ArrowRight', 'nonStudy')
    } else {
      await click(page.getByRole('radio').nth(1), 'study', 'choice')
      await click(page.getByRole('button', { name: /Confident/ }), 'study', 'confidence')
      await page.waitForSelector('[role=status]')
      await click(page.getByRole('button', { name: /Next question|See results/ }), 'nonStudy', 'next')
    }
    dueQs++
    await page.waitForTimeout(80)
  }
}
// 3. Practice set (~10 MCQs) from today's plan
await timed('-> dashboard (Back to today’s plan)', async () => {
  const back = page.getByRole('link', { name: /Back to today/ })
  if (await back.count()) await click(back, 'nonStudy', 'Back to plan')
  else await click(page.getByRole('link', { name: 'Home' }).first(), 'nonStudy', 'Home')
  await page.waitForSelector('h1')
})
const practiceTask = page.getByRole('link', { name: /Practice set:|Mastery check|Mixed practice/ }).first()
const practiceLabel = await practiceTask.innerText().catch(() => 'none')
let mcqs = 0
if (await practiceTask.count()) {
  await timed('plan practice task -> first question', async () => {
    await click(practiceTask, 'nonStudy', 'Practice task')
    await page.waitForURL(/#\/quiz\//)
    await page.waitForSelector('[role=radiogroup]')
  })
  for (let i = 0; i < 30; i++) {
    if (await page.getByText('Set complete').count()) break
    if (vp === 'desktop') {
      await key('a', 'study')
      await page.waitForTimeout(150)
      await key('3', 'study')
      await page.waitForSelector('[role=status]')
      const last = await page.getByRole('button', { name: 'See results' }).count()
      if (last) await click(page.getByRole('button', { name: 'See results' }), 'nonStudy', 'See results')
      else await key('ArrowRight', 'nonStudy')
    } else {
      await click(page.getByRole('radio').nth(0), 'study', 'choice')
      await click(page.getByRole('button', { name: /Confident/ }), 'study', 'confidence')
      await page.waitForSelector('[role=status]')
      await click(page.getByRole('button', { name: /Next question|See results/ }), 'nonStudy', 'next')
    }
    mcqs++
    await page.waitForTimeout(80)
  }
}
// 4. Open next lesson
await timed('results -> dashboard -> next lesson open', async () => {
  await click(page.getByRole('link', { name: /Back to today/ }), 'nonStudy', 'Back to plan')
  await page.waitForSelector('h1')
  await page.waitForSelector('section[aria-labelledby=today]')
  await click(page.locator('section[aria-labelledby=today] a', { hasText: /^Lesson:/ }).first(), 'nonStudy', 'Next lesson')
  await page.waitForURL(/#\/module\//)
  await page.waitForSelector('#objectives')
})
const lesson = (await page.locator('h1').innerText()) + ' @ ' + page.url().replace(BASE, '')
const quizSessionsAfter = await page.evaluate(() => new Promise((r) => { const o = indexedDB.open('cpa-study'); o.onsuccess = () => { const g = o.result.transaction('quizSessions').objectStore('quizSessions').count(); g.onsuccess = () => r(g.result) } }))

const res = { vp, plan: plan.replace(/\n+/g, ' | '), nextBtn, reviewText, cards, dueQs, practiceLabel, mcqs, lesson, counts, waits, resumeOfferedForUnfinishedSet: resumeOffered, unfinishedUrl: unfinishedUrl.replace(BASE, ''), quizSessionsBefore, quizSessionsAfter }
console.log(JSON.stringify(res, null, 1))
fs.writeFileSync(`out/friction-${vp}.json`, JSON.stringify({ ...res, steps }, null, 2))
await b.close()
