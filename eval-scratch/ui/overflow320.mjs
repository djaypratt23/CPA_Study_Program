// Dashboard / module horizontal overflow at 320 px (and at 390 px with 140% text)
import { launch, BASE, onboard } from './lib.mjs'
const b = await launch()
for (const [name, vp, font] of [['w320', 320, 1], ['font140', 390, 1.4]]) {
  const page = await (await b.newContext({ viewport: { width: vp, height: 700 }, isMobile: true, hasTouch: true })).newPage()
  await onboard(page)
  if (font !== 1) { await page.goto(BASE + '#/settings'); await page.locator('#font').fill(String(font)); await page.waitForTimeout(300) }
  for (const r of ['#/', '#/module/far-conceptual-framework']) {
    await page.goto(BASE + r); await page.waitForSelector('h1'); await page.waitForTimeout(500)
    const info = await page.evaluate(() => {
      const cw = document.documentElement.clientWidth
      const widest = [...document.querySelectorAll('main *')].map(e => [e, e.getBoundingClientRect().right]).filter(([, r]) => r > cw + 1)
      const leaf = widest.filter(([e]) => ![...e.children].some(c => c.getBoundingClientRect().right > cw + 1)).slice(0, 3)
      return leaf.map(([e, r]) => ({ tag: e.tagName, cls: String(e.className).slice(0, 60), text: e.innerText?.slice(0, 50), right: Math.round(r) }))
    })
    console.log(name, r, JSON.stringify(info))
    await page.evaluate(() => window.scrollTo(0, document.querySelector('#progress')?.getBoundingClientRect().top + scrollY - 20 || 0))
    await page.screenshot({ path: `shots/overflow-${name}-${r === '#/' ? 'dashboard' : 'module'}.png` })
  }
}
await b.close()
