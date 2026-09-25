// Quiz hotkeys: choice (A-D) followed quickly by confidence (1-3) - is the confidence key dropped?
import { launch, BASE, DESKTOP, onboard } from './lib.mjs'
const b = await launch()
for (const [label, cpu] of [['cpu1x', 1], ['cpu4x', 4]]) {
  const ctx = await b.newContext({ viewport: DESKTOP })
  const page = await ctx.newPage()
  await onboard(page)
  if (cpu > 1) await (await ctx.newCDPSession(page)).send('Emulation.setCPUThrottlingRate', { rate: cpu })
  await page.goto(BASE + '#/practice/start?module=far-conceptual-framework')
  await page.waitForURL(/#\/quiz\//)
  const out = []
  for (const delay of [0, 20, 50, 100, 200]) {
    await page.waitForSelector('[role=radiogroup]')
    await page.waitForTimeout(300)
    await page.keyboard.press('b')
    if (delay) await page.waitForTimeout(delay)
    await page.keyboard.press('3')
    await page.waitForTimeout(700)
    const revealed = await page.locator('[role=status]').count()
    out.push({ delayMs: delay, submitted: revealed > 0 })
    if (!revealed) { await page.keyboard.press('3'); await page.waitForTimeout(500) }
    await page.keyboard.press('ArrowRight')
    await page.waitForTimeout(400)
  }
  console.log(label, JSON.stringify(out))
  await ctx.close()
}
await b.close()
