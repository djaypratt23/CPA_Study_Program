// Shared helpers for the U-a11y-perf review (journeys 9-10). Review-only: nothing here writes outside review/.
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
const path = require('path');
const ROOT = '/home/user/CPA_Study_Program';
const OUT = path.join(ROOT, 'review/batches/U-a11y-perf');
const SHOTS = path.join(ROOT, 'review/screens');
const BASE = 'http://localhost:4174/';
const AXE = '/tmp/claude-0/ux/node_modules/axe-core/axe.min.js';
const DESKTOP = { viewport: { width: 1366, height: 900 } };
const PHONE = { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function launch() {
  return chromium.launch({ headless: true });
}
async function newCtx(browser, vp, scheme = 'light', extra = {}) {
  const ctx = await browser.newContext({ ...vp, colorScheme: scheme, ...extra });
  const page = await ctx.newPage();
  page.errors = [];
  page.on('pageerror', (e) => page.errors.push('pageerror: ' + e.message));
  page.on('console', (m) => m.type() === 'error' && page.errors.push('console: ' + m.text()));
  return { ctx, page };
}
async function shot(page, name, full = false) {
  const p = path.join(SHOTS, `ua-${name}.png`);
  await page.screenshot({ path: p, fullPage: full });
  return 'review/screens/' + path.basename(p);
}
async function onboard(page, { section = 'FAR', date = '2027-01-15' } = {}) {
  await page.goto(BASE);
  await page.waitForSelector('text=How this works', { timeout: 20000 });
  await page.getByRole('button', { name: /Got it/ }).click();
  await page.selectOption('#first', section);
  if (date) await page.fill('#date', date);
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: /Build my plan/ }).click();
  await page.waitForURL(/#\/$/, { timeout: 15000 }).catch(() => {});
  await page.waitForSelector('h1', { timeout: 15000 });
  await sleep(500);
}
async function go(page, hash, waitFor) {
  await page.goto(BASE + '#' + hash);
  if (waitFor) await page.waitForSelector(waitFor, { timeout: 20000 });
  await waitIdle(page);
}
async function waitIdle(page) {
  // Wait until no "Loading…" placeholder remains (route chunk, section and lesson loads).
  for (let i = 0; i < 60; i++) {
    const loading = await page.evaluate(() => /Loading( lesson| diagram)?…|Building your set…/.test(document.body.innerText));
    if (!loading) break;
    await sleep(250);
  }
  await sleep(300);
}
const AXE_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'];
async function axe(page) {
  if (!(await page.evaluate(() => !!window.axe))) await page.addScriptTag({ path: AXE });
  return page.evaluate(async (tags) => {
    const r = await window.axe.run(document, { runOnly: { type: 'tag', values: tags }, resultTypes: ['violations', 'incomplete'] });
    const slim = (v) => ({
      id: v.id,
      impact: v.impact,
      tags: v.tags.filter((t) => /wcag|best/.test(t)),
      help: v.help,
      nodes: v.nodes.map((n) => ({ target: n.target.join(' '), html: n.html.slice(0, 220), summary: (n.failureSummary || '').slice(0, 400), data: n.any.concat(n.all, n.none).map((c) => c.data).filter(Boolean)[0] || null })),
    });
    return { violations: r.violations.map(slim), incomplete: r.incomplete.filter((v) => v.id === 'color-contrast').map(slim) };
  }, AXE_TAGS);
}
/** Patch a record in the app's IndexedDB directly (Dexie live queries do not see this; reload afterwards). */
async function idbPatch(page, store, key, patchFn) {
  return page.evaluate(
    async ({ store, key, fnSrc }) => {
      const fn = eval('(' + fnSrc + ')');
      const db = await new Promise((res, rej) => {
        const r = indexedDB.open('cpa-study');
        r.onsuccess = () => res(r.result);
        r.onerror = () => rej(r.error);
      });
      const tx = db.transaction(store, 'readwrite');
      const os = tx.objectStore(store);
      const rec = await new Promise((res) => {
        const g = key ? os.get(key) : os.getAll();
        g.onsuccess = () => res(g.result);
      });
      const target = key ? rec : rec[rec.length - 1];
      const next = fn(target);
      os.put(next);
      await new Promise((res) => (tx.oncomplete = res));
      db.close();
      return next && next.id;
    },
    { store, key, fnSrc: patchFn.toString() },
  );
}
function writeJson(rel, data) {
  const p = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(data, null, 2));
}
module.exports = { chromium, launch, newCtx, shot, onboard, go, waitIdle, axe, idbPatch, writeJson, sleep, BASE, DESKTOP, PHONE, ROOT, OUT, SHOTS };
