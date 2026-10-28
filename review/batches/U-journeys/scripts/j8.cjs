const L = require('./lib.cjs');
const clean = (t) => t.replace(/Skip to content[\s\S]*?Settings\n/, '');
async function swReady(page) {
  return page.evaluate(async () => { const r = await navigator.serviceWorker.ready; return { scope: r.scope, active: !!r.active, state: r.active && r.active.state }; });
}
async function visit(page, hash, waitFor, tag) {
  await page.goto(L.BASE + hash).catch((e) => console.log('goto error', hash, e.message));
  await page.waitForTimeout(1500);
  const ok = waitFor ? await page.locator(waitFor).first().isVisible().catch(() => false) : true;
  const txt = clean(await page.locator('body').innerText().catch(() => '')).slice(0, 160).replace(/\n+/g, ' | ');
  console.log(`OFFLINE ${hash}: ${ok ? 'OK' : 'NOT OK'} — ${txt}`);
  if (tag) await L.shot(page, tag);
  return ok;
}
(async () => {
  const b = await L.launch();
  // ---------- Part A: offline after first load ----------
  for (const [vp, opts] of [['d', L.DESKTOP], ['m', L.PHONE]]) {
    const { ctx, page } = await L.newPage(b, opts, 'j8-' + vp);
    await L.onboard(page, { section: 'FAR', date: '2027-01-15' });
    console.log(vp, 'sw', JSON.stringify(await swReady(page)), 'controlled', await page.evaluate(() => !!navigator.serviceWorker.controller));
    await page.waitForTimeout(5000); // let background section loading + precache settle
    await page.reload(); await page.waitForTimeout(1500);
    console.log(vp, 'controlled after reload', await page.evaluate(() => !!navigator.serviceWorker.controller));
    const cacheInfo = await page.evaluate(async () => { const ks = await caches.keys(); const out = {}; for (const k of ks) out[k] = (await (await caches.open(k)).keys()).length; return out; });
    console.log(vp, 'caches', JSON.stringify(cacheInfo));
    await ctx.setOffline(true);
    await page.reload().catch((e) => console.log('reload offline error', e.message));
    await page.waitForTimeout(2000);
    console.log(vp, 'navigator.onLine', await page.evaluate(() => navigator.onLine));
    await visit(page, '#/', 'text=Study next', `j8-${vp}-01-offline-dashboard`);
    await visit(page, '#/course', 'text=Area I', null);
    await visit(page, '#/module/far-bonds', 'text=Key takeaways', `j8-${vp}-02-offline-lesson-unvisited`);
    console.log('  lesson body loaded?', await page.locator('text=/couldn.t load/').count() ? 'FAILED' : 'yes', '| mermaid figure', await page.locator('figure svg').count());
    await visit(page, '#/practice/start?module=far-bonds', 'text=/Question 1 of/', `j8-${vp}-03-offline-quiz`);
    await visit(page, '#/tbs/far-tbs-r3-deferred-tax', 'text=Submit & see explanations', null);
    await visit(page, '#/tbs/aud-tbs-r3-rep-letter', 'text=Submit & see explanations', `j8-${vp}-04-offline-other-section-tbs`);
    await visit(page, '#/flashcards', 'text=Flashcard decks', null);
    await visit(page, '#/search?q=lease', 'text=/result/', null);
    await visit(page, '#/final-review', null, null);
    await visit(page, '#/exam', 'text=Start', null);
    await page.getByRole('button', { name: 'Start' }).first().click().catch(() => {});
    await page.waitForTimeout(1500);
    console.log('  offline exam started:', await page.locator('text=Testlet 1 of 5').count() ? 'yes' : 'no');
    await L.shot(page, `j8-${vp}-05-offline-exam`);
    // switch section offline
    await page.goto(L.BASE + '#/settings'); await page.waitForTimeout(800);
    await page.selectOption('#active', 'REG'); await page.waitForTimeout(1500);
    await visit(page, '#/course', 'text=REG', null);
    await visit(page, '#/module/reg-partnerships', 'text=Key takeaways', `j8-${vp}-06-offline-reg-lesson`);
    // cold start offline: new page in same context
    const p2 = await ctx.newPage(); L.attach(p2, 'j8-' + vp + '-cold');
    await p2.goto(L.BASE).catch((e) => console.log('cold offline goto error', e.message));
    await p2.waitForTimeout(2500);
    console.log(vp, 'cold start offline (new tab):', clean(await p2.locator('body').innerText()).slice(0, 120).replace(/\n+/g, ' | '));
    await p2.close();
    await ctx.setOffline(false);
    await ctx.close();
  }
  // ---------- Part B: update prompt via a changed sw.js ----------
  for (const [vp, opts] of [['d', L.DESKTOP], ['m', L.PHONE]]) {
    const ctx = await b.newContext({ ...opts, serviceWorkers: 'allow' });
    let bump = false;
    await ctx.route('**/sw.js', async (route) => {
      const resp = await route.fetch();
      let body = await resp.text();
      if (bump) body += '\n// bumped for update test ' + Date.now();
      await route.fulfill({ response: resp, body, headers: { ...resp.headers(), 'cache-control': 'no-cache' } });
    });
    const page = await ctx.newPage(); L.attach(page, 'j8u-' + vp);
    await L.onboard(page, { section: 'FAR', date: '2027-01-15' });
    await swReady(page); await page.waitForTimeout(3000);
    await page.reload(); await page.waitForTimeout(1500);
    bump = true;
    const upd = await page.evaluate(async () => { const r = await navigator.serviceWorker.getRegistration(); await r.update().catch((e) => 'err ' + e.message); return { waiting: !!r.waiting, installing: !!r.installing }; });
    console.log(vp, 'after update()', JSON.stringify(upd));
    const toast = page.locator('text=A new version');
    await toast.first().waitFor({ timeout: 20000 }).catch(() => console.log('no toast appeared'));
    await page.waitForTimeout(500);
    console.log(vp, 'toast on dashboard:', await page.locator('[role=status]', { hasText: 'new version' }).innerText().catch(() => 'none'));
    await L.shot(page, `j8u-${vp}-01-update-toast-dashboard`);
    if (vp === 'm') {
      const tb = await page.locator('[role=status]', { hasText: 'new version' }).boundingBox().catch(() => null);
      const nb = await page.locator('nav[aria-label=Main]').last().boundingBox();
      console.log('toast box', tb, 'bottom nav box', nb);
    }
    // go to a quiz (busy)
    await page.goto(L.BASE + '#/module/far-bonds'); await page.waitForTimeout(1000);
    await page.goto(L.BASE + '#/practice/start?module=far-bonds'); await page.waitForTimeout(1500);
    console.log(vp, 'toast in quiz:', await page.locator('[role=status]', { hasText: 'new version' }).innerText().catch(() => 'none'));
    await L.shot(page, `j8u-${vp}-02-update-toast-quiz`);
    if (vp === 'm') {
      const tb = await page.locator('[role=status]', { hasText: 'new version' }).boundingBox().catch(() => null);
      const cb = await page.locator('div.sticky', { hasText: 'Skip' }).boundingBox().catch(() => null);
      console.log('toast box', tb, 'quiz controls box', cb);
    }
    // leave quiz -> reload offered again?
    await page.goto(L.BASE + '#/'); await page.waitForTimeout(800);
    console.log(vp, 'toast after leaving quiz:', await page.locator('[role=status]', { hasText: 'new version' }).innerText().catch(() => 'none'));
    // Later, then navigate: does it come back?
    await page.getByRole('button', { name: 'Later' }).click().catch(() => {});
    await page.goto(L.BASE + '#/course'); await page.waitForTimeout(800);
    console.log(vp, 'toast after Later + navigation:', await page.locator('[role=status]', { hasText: 'new version' }).count());
    await page.reload(); await page.waitForTimeout(2000);
    console.log(vp, 'toast after plain reload (still waiting SW):', await page.locator('[role=status]', { hasText: 'new version' }).count());
    const rl = page.getByRole('button', { name: 'Reload' });
    if (await rl.count()) { await rl.click(); await page.waitForTimeout(3000); console.log(vp, 'after Reload click: url', page.url(), 'toast', await page.locator('[role=status]', { hasText: 'new version' }).count(), 'waiting', await page.evaluate(async () => !!(await navigator.serviceWorker.getRegistration()).waiting)); }
    await ctx.close();
  }
  L.saveLogs('j8');
  await b.close();
})().catch((e) => { console.error('FAIL', e); process.exit(1); });
