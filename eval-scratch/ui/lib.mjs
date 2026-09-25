import { chromium } from 'playwright'
export const BASE = process.env.BASE || 'http://localhost:4173/'
export async function launch(opts = {}) {
  return chromium.launch({ headless: true, ...opts })
}
export const DESKTOP = { width: 1366, height: 768 }
export const MOBILE = { width: 390, height: 844 }
export function collectErrors(page, arr) {
  page.on('pageerror', (e) => arr.push('pageerror: ' + e.message))
  page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') arr.push(m.type() + ': ' + m.text().slice(0, 300)) })
}
/** Complete onboarding with defaults (FAR first). */
export async function onboard(page, { section = 'FAR', date = '2026-12-15' } = {}) {
  await page.goto(BASE + '#/welcome')
  await page.getByRole('button', { name: /Got it/ }).click()
  await page.selectOption('#first', section)
  if (date) await page.fill('#date', date)
  await page.getByRole('button', { name: 'Next' }).click()
  await page.getByRole('button', { name: /Build my plan/ }).click()
  await page.waitForURL(/#\/$/)
}
