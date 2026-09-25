// axe-core scan of each main page in light and dark themes (WCAG 2.x A/AA + best practices).
// Usage: node axe.mjs  -> out/axe-summary.json, out/axe-full.json
import fs from 'node:fs'
import { AxeBuilder } from '@axe-core/playwright'
import { launch, BASE, DESKTOP, onboard } from './lib.mjs'

const b = await launch()
const summary = {}
const full = {}
for (const scheme of ['light', 'dark']) {
  const ctx = await b.newContext({ viewport: DESKTOP, colorScheme: scheme })
  const page = await ctx.newPage()
  await onboard(page)
  const pages = [
    ['dashboard', '#/'],
    ['course', '#/course'],
    ['module', '#/module/far-conceptual-framework'],
    ['quiz', async () => {
      await page.goto(BASE + '#/practice/start?module=far-conceptual-framework')
      await page.waitForURL(/#\/quiz\//)
      await page.waitForSelector('[role=radiogroup]')
    }],
    ['quiz-revealed', async () => {
      await page.getByRole('radio').nth(1).click()
      await page.getByRole('button', { name: /Guess/ }).click()
      await page.waitForSelector('[role=status]')
    }],
    ['practice-builder', '#/practice'],
    ['review', '#/review'],
    ['flashcards', '#/flashcards'],
    ['flashcard-player', async () => {
      await page.goto(BASE + '#/flashcards')
      await page.getByRole('button', { name: 'Study' }).first().click()
      await page.getByRole('button', { name: 'Show answer' }).click()
    }],
    ['tbs', '#/tbs/far-tbs-u1-cash-flows'],
    ['tbs-submitted', async () => {
      await page.getByRole('button', { name: /Submit & see/ }).click()
      await page.waitForSelector('#tbs-results')
    }],
    ['exam-home', '#/exam'],
    ['exam-mcq', async () => {
      await page.goto(BASE + '#/exam')
      await page.getByRole('button', { name: 'Start' }).first().click()
      await page.waitForSelector('[role=radiogroup]')
      await page.getByRole('button', { name: 'Calculator' }).click()
    }],
    ['analytics', '#/analytics'],
    ['settings', '#/settings'],
    ['plan', '#/plan'],
    ['search', '#/search?q=lease'],
    ['glossary', '#/glossary'],
  ]
  for (const [name, target] of pages) {
    if (typeof target === 'string') {
      await page.goto(BASE + target)
      await page.waitForSelector('h1', { timeout: 10000 }).catch(() => {})
    } else await target()
    await page.waitForTimeout(700)
    const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']).analyze()
    const key = `${name}/${scheme}`
    summary[key] = {
      violations: r.violations.length,
      nodes: r.violations.reduce((s, v) => s + v.nodes.length, 0),
      rules: Object.fromEntries(r.violations.map((v) => [v.id, `${v.impact}:${v.nodes.length}`])),
    }
    full[key] = r.violations.map((v) => ({ id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.slice(0, 4).map((n) => ({ target: n.target, summary: n.failureSummary?.slice(0, 300), html: n.html.slice(0, 200) })) }))
    console.log(key, JSON.stringify(summary[key]))
  }
  await ctx.close()
}
fs.writeFileSync('out/axe-summary.json', JSON.stringify(summary, null, 2))
fs.writeFileSync('out/axe-full.json', JSON.stringify(full, null, 2))
await b.close()
