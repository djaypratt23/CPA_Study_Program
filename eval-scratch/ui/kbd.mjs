// Keyboard-only navigation, focus visibility, hotkeys-vs-typing, screen-reader semantics spot checks.
import fs from 'node:fs'
import { launch, BASE, DESKTOP, onboard } from './lib.mjs'

const b = await launch()
const ctx = await b.newContext({ viewport: DESKTOP })
const page = await ctx.newPage()
const log = []
const note = (k, v) => {
  log.push([k, v])
  console.log(k, typeof v === 'string' ? v : JSON.stringify(v))
}
const active = () =>
  page.evaluate(() => {
    const el = document.activeElement
    if (!el || el === document.body) return { tag: 'BODY' }
    const cs = getComputedStyle(el)
    const r = el.getBoundingClientRect()
    return {
      tag: el.tagName,
      role: el.getAttribute('role'),
      name: (el.getAttribute('aria-label') || el.innerText || el.value || '').trim().slice(0, 40),
      outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}`,
      boxShadow: cs.boxShadow !== 'none',
      inView: r.bottom > 0 && r.top < innerHeight,
    }
  })
const tabs = async (n) => {
  const out = []
  for (let i = 0; i < n; i++) {
    await page.keyboard.press('Tab')
    out.push(await active())
  }
  return out
}

await onboard(page)
// 1. Dashboard tab order
await page.goto(BASE + '#/')
await page.waitForSelector('h1')
const t = await tabs(22)
note('dashboard tab order', t.map((x) => `${x.tag}${x.role ? '[' + x.role + ']' : ''}:${x.name}|${x.outline.startsWith('solid') ? 'ring' : 'NO-RING'}`))
// skip link visible?
await page.goto(BASE + '#/')
await page.waitForSelector('h1')
await page.keyboard.press('Tab')
const skip = await page.evaluate(() => {
  const el = document.activeElement
  const r = el.getBoundingClientRect()
  return { text: el.textContent, w: r.width, h: r.height, href: el.getAttribute('href') }
})
note('skip link', skip)
await page.keyboard.press('Enter')
await page.waitForTimeout(300)
note('after activating skip link url/focus', { url: page.url(), focus: await active() })

// 2. Quiz keyboard-only
await page.goto(BASE + '#/practice/start?module=far-conceptual-framework')
await page.waitForURL(/#\/quiz\//)
await page.waitForSelector('[role=radiogroup]')
await page.locator('body').click({ position: { x: 700, y: 5 } })
// Count Tabs from top of page to first choice
let n = 0
let a
do {
  await page.keyboard.press('Tab')
  a = await active()
  n++
} while (a.role !== 'radio' && n < 60)
note('tabs to first choice (from page top)', n)
// Arrow key inside radiogroup: expected per ARIA to move to next radio; here it navigates questions
const qBefore = await page.locator('article span.font-semibold').first().innerText()
await page.keyboard.press('ArrowDown')
await page.waitForTimeout(200)
const aDown = await active()
await page.keyboard.press('ArrowRight')
await page.waitForTimeout(400)
const qAfter = await page.locator('article span.font-semibold').first().innerText()
note('ArrowDown on radio -> focus', aDown.name)
note('ArrowRight on radio -> question changes?', [qBefore, qAfter])
await page.keyboard.press('ArrowLeft')
await page.waitForTimeout(400)
// radios are all separate tab stops?
const radioTabIdx = await page.locator('[role=radio]').evaluateAll((els) => els.map((e) => e.tabIndex))
note('radio tabIndex values (roving tabindex would be [0,-1,-1,-1])', radioTabIdx)
// Select via Space on focused radio, then Tab to confidence and Enter
await page.locator('[role=radio]').first().focus()
await page.keyboard.press('Space')
await page.waitForTimeout(200)
n = 0
do {
  await page.keyboard.press('Tab')
  a = await active()
  n++
} while (!/Confident/.test(a.name) && n < 20)
note('tabs from choice A to Confident', n)
await page.keyboard.press('Enter')
await page.waitForTimeout(400)
note('after Enter on Confident: status', await page.locator('[role=status]').first().innerText().catch(() => 'none'))
note('focus after reveal (confidence button unmounted)', await active())
n = 0
do {
  await page.keyboard.press('Tab')
  a = await active()
  n++
} while (!/Next question/.test(a.name) && n < 40)
note('tabs from reveal to Next question', n)
await page.keyboard.press('Enter')
await page.waitForTimeout(300)
// Hotkeys: 'c' then '3'
await page.keyboard.press('c')
await page.waitForTimeout(150)
await page.keyboard.press('3')
await page.waitForTimeout(400)
note('hotkeys c + 3 revealed?', await page.locator('[role=status]').count())
await page.keyboard.press('ArrowRight')
await page.waitForTimeout(300)
// Typing into the Note textarea must not trigger A-D / 1-3 / arrows
await page.getByRole('button', { name: /Note/ }).click()
await page.locator('textarea[aria-label="Question note"]').click()
await page.keyboard.type('a b c d 1 2 3')
await page.keyboard.press('ArrowLeft')
await page.keyboard.press('ArrowRight')
await page.waitForTimeout(300)
note('after typing in note: checked radios / revealed / question', {
  checked: await page.locator('[role=radio][aria-checked=true]').count(),
  revealed: await page.locator('[role=status]').count(),
  q: await page.locator('article span.font-semibold').first().innerText(),
})
// SELECT focused (section switcher) + letter keys
await page.locator('aside select').focus()
await page.keyboard.press('a')
await page.waitForTimeout(300)
note('press "a" with section <select> focused -> choice selected? / section', {
  checked: await page.locator('[role=radio][aria-checked=true]').count(),
  section: await page.locator('aside select').inputValue(),
})
// live regions on the page
note('live regions', await page.evaluate(() => [...document.querySelectorAll('[aria-live],[role=status],[role=alert],output')].map((e) => e.tagName + ':' + (e.getAttribute('role') || e.getAttribute('aria-live')))))

// 3. Flashcards: Space/1-4; and keys in <select> should not rate
await page.goto(BASE + '#/flashcards')
await page.getByRole('button', { name: 'Study' }).first().click()
await page.waitForTimeout(300)
const cardName = await page.locator('button.card').first().evaluate((e) => ({ ariaLabel: e.getAttribute('aria-label'), text: e.innerText.slice(0, 80) }))
note('flashcard button accessible name vs visible text', cardName)
await page.keyboard.press('Space')
await page.waitForTimeout(200)
const left1 = await page.getByText(/left in this session/).innerText()
await page.locator('aside select').focus()
await page.keyboard.press('3')
await page.waitForTimeout(400)
note('press "3" while section <select> focused on a flipped card', { before: left1, after: await page.getByText(/left in this session/).innerText().catch(() => 'n/a'), section: await page.locator('aside select').inputValue() })
// Ctrl+2 (browser tab switch shortcut) also rates?
await page.locator('body').click({ position: { x: 700, y: 5 } })
await page.keyboard.press('Space')
await page.waitForTimeout(200)
const left2 = await page.getByText(/left in this session/).innerText()
await page.keyboard.press('Control+4')
await page.waitForTimeout(400)
note('Ctrl+4 on flipped card rates it?', { before: left2, after: await page.getByText(/left in this session/).innerText().catch(() => 'n/a') })

// 4. TBS keyboard: type letters into numeric input; reach submit
await page.goto(BASE + '#/tbs/far-tbs-u1-cash-flows')
await page.waitForSelector('h1')
await page.locator('main input').first().focus()
await page.keyboard.type('abc-1,000')
note('numeric input accepts free text (no validation)', await page.locator('main input').first().inputValue())
n = 0
do {
  await page.keyboard.press('Tab')
  a = await active()
  n++
} while (!/Submit & see/.test(a.name) && n < 80)
note('tabs from first TBS input to Submit', n)
await page.keyboard.press('Enter')
await page.waitForTimeout(600)
note('TBS submitted via keyboard', await page.locator('#tbs-results').innerText().catch(() => 'no'))
note('focus after TBS submit', await active())

// 5. Exam keyboard: calculator reachability
await page.goto(BASE + '#/exam')
await page.getByRole('button', { name: 'Start' }).first().click()
await page.waitForSelector('[role=radiogroup]')
await page.getByRole('button', { name: 'Calculator' }).focus()
await page.keyboard.press('Enter')
await page.waitForTimeout(200)
note('exam: calc open after Enter on toolbar button', await page.locator('[role=dialog]').count())
note('exam: focus after opening calculator', await active())
n = 0
do {
  await page.keyboard.press('Tab')
  a = await active()
  n++
} while (!(a.name === 'MC') && n < 120)
note('exam: Tab presses from calculator button to first calculator key', n)
await page.keyboard.type('7*6')
await page.keyboard.press('Enter')
await page.waitForTimeout(200)
note('exam: calculator result 7*6 via keyboard (focus inside)', await page.locator('[role=dialog] output').innerText())
await page.keyboard.press('Escape')
await page.waitForTimeout(200)
note('exam: focus after Escape closes calculator', await active())

// 6. Exam navigator aria-current value & flag button semantics
note('navigator aria-current attr values', await page.locator('nav[aria-label="Question navigator"] button').evaluateAll((els) => els.slice(0, 3).map((e) => e.getAttribute('aria-current'))))

fs.writeFileSync('out/kbd.json', JSON.stringify(log, null, 2))
await b.close()
