const { chromium, devices } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
const path = require('path');
const ROOT = '/home/user/CPA_Study_Program';
const SHOTS = path.join(ROOT, 'review/screens');
const LOGS = path.join(ROOT, 'review/batches/U-journeys/logs');
const BASE = 'http://localhost:4173/';
const DESKTOP = { viewport: { width: 1366, height: 900 } };
const PHONE = { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2,
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1' };
async function launch() { return chromium.launch({ headless: true }); }
const allLogs = [];
function attach(page, tag) {
  page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') { const l = `[${tag}] console.${m.type()}: ${m.text()}`; allLogs.push(l); console.log(l); } });
  page.on('pageerror', (e) => { const l = `[${tag}] pageerror: ${e.message}`; allLogs.push(l); console.log(l); });
  page.on('requestfailed', (r) => { const l = `[${tag}] requestfailed: ${r.url()} ${r.failure() && r.failure().errorText}`; allLogs.push(l); console.log(l); });
}
async function newPage(browser, opts = DESKTOP, tag = 'p') {
  const ctx = await browser.newContext({ ...opts, serviceWorkers: opts.serviceWorkers || 'allow' });
  const page = await ctx.newPage();
  attach(page, tag);
  return { ctx, page };
}
async function shot(page, name, full = false) {
  const p = path.join(SHOTS, `uj-${name}.png`);
  await page.screenshot({ path: p, fullPage: full });
  return p;
}
async function text(page) { return (await page.locator('main, body').first().innerText()).slice(0, 4000); }
function saveLogs(name) { fs.writeFileSync(path.join(LOGS, name + '.log'), allLogs.join('\n') + '\n'); }
// Onboard quickly via UI
async function onboard(page, { section = 'FAR', date = '', minutes = null } = {}) {
  await page.goto(BASE);
  await page.waitForSelector('text=How this works', { timeout: 15000 });
  await page.getByRole('button', { name: /Got it/ }).click();
  await page.selectOption('#first', section);
  if (date) await page.fill('#date', date);
  await page.getByRole('button', { name: 'Next' }).click();
  if (minutes) for (let i = 0; i < 7; i++) await page.locator(`#m${i}`).fill(String(minutes[i]));
  await page.getByRole('button', { name: /Build my plan/ }).click();
  await page.waitForURL(/#\/$/, { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(800);
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
module.exports = { chromium, devices, launch, newPage, shot, text, saveLogs, onboard, BASE, DESKTOP, PHONE, ROOT, SHOTS, LOGS, allLogs, sleep, attach };
// ---- content helpers ----
function loadQuestions() {
  const glob = require('fs');
  const out = {};
  for (const sec of ['far', 'aud', 'reg', 'tcp']) {
    const base = path.join(ROOT, 'content', sec);
    for (const m of fs.existsSync(path.join(base, 'modules')) ? fs.readdirSync(path.join(base, 'modules')) : []) {
      const f = path.join(base, 'modules', m, 'questions.json');
      if (fs.existsSync(f)) for (const q of JSON.parse(fs.readFileSync(f, 'utf8'))) out[q.id] = q;
    }
    const eq = path.join(base, 'exam-questions');
    if (fs.existsSync(eq)) for (const f of fs.readdirSync(eq)) { const d = JSON.parse(fs.readFileSync(path.join(eq, f), 'utf8')); for (const q of (Array.isArray(d) ? d : d.questions || [])) out[q.id] = q; }
  }
  return out;
}
async function currentQid(page) {
  const id = await page.locator('article[aria-labelledby^="stem-"]').first().getAttribute('aria-labelledby');
  return id && id.replace(/^stem-/, '');
}
module.exports.loadQuestions = loadQuestions;
module.exports.currentQid = currentQid;
