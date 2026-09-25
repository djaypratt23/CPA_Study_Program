// Reflow/zoom (200% and 320px), horizontal scroll, tap-target sizes, large font scale, reduced motion.
import fs from 'node:fs'
import { launch, BASE, onboard } from './lib.mjs'

const b = await launch()
const log = []
const note = (k, v) => {
  log.push([k, v])
  console.log(k, JSON.stringify(v))
}
const ROUTES = [
  ['dashboard', '#/'],
  ['course', '#/course'],
  ['module', '#/module/far-conceptual-framework'],
  ['module-je', '#/module/far-payables'],
  ['quiz', 'QUIZ'],
  ['tbs', '#/tbs/far-tbs-u1-cash-flows'],
  ['tbs-journal', 'JE'],
  ['analytics', '#/analytics'],
  ['settings', '#/settings'],
  ['plan', '#/plan'],
  ['practice', '#/practice'],
  ['exam', 'EXAM'],
]
async function findJournalTbs(page) {
  return page.evaluate(() => null)
}
async function visit(page, route) {
  if (route === 'QUIZ') {
    await page.goto(BASE + '#/practice/start?module=far-conceptual-framework')
    await page.waitForURL(/#\/quiz\//)
    await page.waitForSelector('[role=radiogroup]')
  } else if (route === 'EXAM') {
    await page.goto(BASE + '#/exam')
    const resume = page.getByRole('link', { name: /Resume exam/ })
    if (await resume.count()) await resume.click()
    else await page.getByRole('button', { name: 'Start' }).first().click()
    await page.waitForSelector('[role=radiogroup]')
  } else if (route === 'JE') {
    await page.goto(BASE + '#/tbs/' + JE_TBS)
    await page.waitForSelector('h1')
  } else {
    await page.goto(BASE + route)
    await page.waitForSelector('h1', { timeout: 8000 }).catch(() => {})
  }
  await page.waitForTimeout(600)
}
const overflow = (page) =>
  page.evaluate(() => {
    const cw = document.documentElement.clientWidth
    const offenders = []
    for (const el of document.querySelectorAll('body *')) {
      const r = el.getBoundingClientRect()
      if (r.right > cw + 1 && r.width > 0) {
        // ignore elements inside a horizontally scrollable ancestor
        let p = el.parentElement
        let scrolls = false
        while (p) {
          const cs = getComputedStyle(p)
          if ((cs.overflowX === 'auto' || cs.overflowX === 'scroll' || cs.overflowX === 'hidden') && p.scrollWidth > p.clientWidth) {
            scrolls = true
            break
          }
          p = p.parentElement
        }
        if (!scrolls) offenders.push(el.tagName + '.' + String(el.className).slice(0, 40))
      }
    }
    return { scrollWidth: document.documentElement.scrollWidth, clientWidth: cw, offenders: offenders.slice(0, 5) }
  })
const smallTargets = (page) =>
  page.evaluate(() => {
    const els = [...document.querySelectorAll('a[href], button, input, select, textarea, [role=button], [role=radio], [role=tab]')].filter((e) => {
      const r = e.getBoundingClientRect()
      const cs = getComputedStyle(e)
      return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && !e.closest('.sr-only')
    })
    const lt24 = []
    const lt44 = []
    for (const e of els) {
      const r = e.getBoundingClientRect()
      const lab = (e.getAttribute('aria-label') || e.innerText || e.type || '').trim().slice(0, 30)
      if (r.width < 24 || r.height < 24) lt24.push(`${e.tagName}:${lab}:${Math.round(r.width)}x${Math.round(r.height)}`)
      else if (r.width < 44 || r.height < 44) lt44.push(`${e.tagName}:${lab}:${Math.round(r.width)}x${Math.round(r.height)}`)
    }
    return { total: els.length, under24: lt24.length, under44: lt44.length, examples24: lt24.slice(0, 6), examples44: lt44.slice(0, 6) }
  })

// pick a TBS with a journal part
const fsContent = (await import('node:fs')).default
let JE_TBS = null
for (const f of fsContent.readdirSync('../../content/far/tbs')) {
  const j = JSON.parse(fsContent.readFileSync('../../content/far/tbs/' + f, 'utf8'))
  if (j.parts?.some((p) => p.kind === 'journal')) {
    JE_TBS = j.id
    break
  }
}
note('journal TBS used', JE_TBS)

const configs = [
  ['zoom200', { viewport: { width: 683, height: 384 }, deviceScaleFactor: 2 }],
  ['w320', { viewport: { width: 320, height: 640 }, isMobile: true, hasTouch: true }],
  ['m390', { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }],
]
for (const [name, opts] of configs) {
  const ctx = await b.newContext(opts)
  const page = await ctx.newPage()
  await onboard(page)
  for (const [rn, route] of ROUTES) {
    await visit(page, route)
    const o = await overflow(page)
    const res = { hscroll: o.scrollWidth > o.clientWidth, sw: o.scrollWidth, cw: o.clientWidth, offenders: o.offenders }
    if (name === 'm390') Object.assign(res, { targets: await smallTargets(page) })
    note(`${name} ${rn}`, res)
    if (name !== 'm390' && ['tbs-journal', 'quiz', 'exam', 'module'].includes(rn)) await page.screenshot({ path: `shots/${name}-${rn}.png` })
    if (name === 'm390' && rn === 'tbs-journal') {
      // show a journal-entry grid on 390 px
      const grid = page.locator('table.min-w-\\[34rem\\]').first()
      if (await grid.count()) {
        await grid.scrollIntoViewIfNeeded()
        const box = await grid.evaluate((t) => ({ tableW: t.getBoundingClientRect().width, wrapW: t.parentElement.clientWidth }))
        note('m390 journal grid width vs container', box)
        await page.screenshot({ path: 'shots/m390-journal-grid.png' })
      }
    }
  }
  await ctx.close()
}

// Large text (font scale 140%) on a 390px phone
{
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })
  const page = await ctx.newPage()
  await onboard(page)
  await page.goto(BASE + '#/settings')
  await page.locator('#font').fill('1.4')
  await page.waitForTimeout(300)
  for (const [rn, route] of ROUTES.filter(([r]) => ['dashboard', 'quiz', 'tbs', 'exam'].includes(r))) {
    await visit(page, route)
    const o = await overflow(page)
    note(`font140 ${rn}`, { hscroll: o.scrollWidth > o.clientWidth, sw: o.scrollWidth, offenders: o.offenders })
    await page.screenshot({ path: `shots/font140-${rn}.png` })
  }
  await ctx.close()
}

// Reduced motion: does anything still animate/smooth-scroll?
{
  const ctx = await b.newContext({ viewport: { width: 1366, height: 768 }, reducedMotion: 'reduce' })
  const page = await ctx.newPage()
  await onboard(page)
  await page.goto(BASE + '#/tbs/far-tbs-u1-cash-flows')
  await page.waitForSelector('h1')
  await page.getByRole('button', { name: /Submit & see/ }).click()
  const ys = []
  for (let i = 0; i < 6; i++) {
    ys.push(await page.evaluate(() => Math.round(scrollY)))
    await page.waitForTimeout(60)
  }
  note('reduced-motion: scrollY samples after TBS submit (smooth scroll = gradual)', ys)
  const trans = await page.evaluate(() => [...document.querySelectorAll('*')].filter((e) => getComputedStyle(e).transitionDuration !== '0s').length)
  note('reduced-motion: elements with non-zero transition-duration', trans)
  await ctx.close()
}
fs.writeFileSync('out/responsive.json', JSON.stringify(log, null, 2))
await b.close()
