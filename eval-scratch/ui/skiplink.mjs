// Skip link under HashRouter: does "#main" skip to content or navigate away?
import { launch, BASE, DESKTOP, onboard } from './lib.mjs'
const b = await launch()
const page = await (await b.newContext({ viewport: DESKTOP })).newPage()
await onboard(page)
for (const route of ['#/course', '#/module/far-conceptual-framework', '#/analytics']) {
  await page.goto('about:blank')
  await page.goto(BASE + route)
  await page.waitForSelector('h1')
  await page.keyboard.press('Tab')
  const txt = await page.evaluate(() => document.activeElement.textContent)
  await page.keyboard.press('Enter')
  await page.waitForTimeout(600)
  console.log(JSON.stringify({ from: route, focused: txt, urlAfterEnter: page.url(), h1: await page.locator('h1').first().innerText() }))
}
// Accessibility tree of a flashcard (what a screen reader gets)
await page.goto(BASE + '#/flashcards')
await page.getByRole('button', { name: 'Study' }).first().click()
await page.waitForTimeout(300)
console.log('flashcard aria snapshot (front):\n' + (await page.locator('main').ariaSnapshot()).slice(0, 600))
await page.getByRole('button', { name: 'Show answer' }).click()
await page.waitForTimeout(300)
console.log('flashcard aria snapshot (back):\n' + (await page.locator('main').ariaSnapshot()).slice(0, 600))
await b.close()
