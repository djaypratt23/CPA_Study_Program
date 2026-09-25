// What the user sees on unknown routes / ids.
import { launch, BASE, DESKTOP, onboard } from './lib.mjs'
const b = await launch()
const page = await (await b.newContext({ viewport: DESKTOP })).newPage()
await onboard(page)
for (const r of ['#/module/does-not-exist', '#/exam/bogus', '#/tbs/bogus', '#/quiz/bogus', '#/final-review/bogus', '#/course/XYZ', '#/nonsense/path', '#/practice/start?module=nope', '#/practice/start', '#/flashcards?module=nope', '#/tbs?unit=nope']) {
  await page.goto(BASE + r)
  await page.waitForTimeout(900)
  const t = await page.evaluate(() => (document.querySelector('main') ?? document.getElementById('root')).innerText.replace(/\s+/g, ' ').slice(0, 120))
  console.log(JSON.stringify({ route: r, finalUrl: page.url().replace(BASE, ''), text: t }))
}
await b.close()
