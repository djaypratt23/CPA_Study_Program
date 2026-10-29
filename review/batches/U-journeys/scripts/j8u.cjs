const L = require('./lib.cjs');
const http = require('http');
const bump = () => new Promise((r) => http.get('http://localhost:4173/__bump', (res) => { let d = ''; res.on('data', (c) => (d += c)); res.on('end', () => r(d)); }));
const toastLoc = (page) => page.locator('[role=status]', { hasText: 'new version' });
(async () => {
  const b = await L.launch();
  for (const [vp, opts] of [['d', L.DESKTOP], ['m', L.PHONE]]) {
    const { ctx, page } = await L.newPage(b, opts, 'j8u-' + vp);
    await L.onboard(page, { section: 'FAR', date: '2027-01-15' });
    await page.evaluate(() => navigator.serviceWorker.ready); await page.waitForTimeout(4000);
    await page.reload(); await page.waitForTimeout(1500);
    console.log(vp, 'controlled', await page.evaluate(() => !!navigator.serviceWorker.controller));
    // start a quiz first, then deploy while busy
    await page.goto(L.BASE + '#/practice/start?module=far-bonds'); await page.waitForURL(/#\/quiz\//); await page.waitForTimeout(800);
    console.log(vp, 'bump ->', await bump());
    const upd = await page.evaluate(async () => { const r = await navigator.serviceWorker.getRegistration(); await r.update(); await new Promise((res) => setTimeout(res, 3000)); return { waiting: !!r.waiting, installing: !!r.installing }; });
    console.log(vp, 'after update()', JSON.stringify(upd));
    await toastLoc(page).first().waitFor({ timeout: 15000 }).catch(() => console.log('no toast'));
    console.log(vp, 'toast in quiz:', (await toastLoc(page).innerText().catch(() => 'none')).replace(/\n/g, ' / '));
    await L.shot(page, `j8u-${vp}-01-update-toast-quiz`);
    if (vp === 'm') {
      console.log('  toast box', JSON.stringify(await toastLoc(page).boundingBox().catch(() => null)), 'quiz controls', JSON.stringify(await page.locator('div.sticky', { hasText: 'Skip' }).boundingBox().catch(() => null)), 'bottom nav', JSON.stringify(await page.locator('nav[aria-label=Main]').last().boundingBox()));
    }
    // leave the quiz
    await page.goto(L.BASE + '#/'); await page.waitForTimeout(800);
    console.log(vp, 'toast on dashboard:', (await toastLoc(page).innerText().catch(() => 'none')).replace(/\n/g, ' / '));
    await L.shot(page, `j8u-${vp}-02-update-toast-dashboard`);
    if (vp === 'm') console.log('  toast box', JSON.stringify(await toastLoc(page).boundingBox().catch(() => null)), 'bottom nav', JSON.stringify(await page.locator('nav[aria-label=Main]').last().boundingBox()));
    // Later
    await page.getByRole('button', { name: 'Later' }).click();
    await page.goto(L.BASE + '#/course'); await page.waitForTimeout(800);
    console.log(vp, 'toast after Later + in-app navigation:', await toastLoc(page).count());
    await page.reload(); await page.waitForTimeout(2500);
    console.log(vp, 'toast after a plain reload:', await toastLoc(page).count(), '| waiting SW', await page.evaluate(async () => !!(await navigator.serviceWorker.getRegistration()).waiting));
    // mock exam busy check
    await page.goto(L.BASE + '#/exam'); await page.waitForTimeout(800);
    await page.getByRole('button', { name: 'Start' }).first().click(); await page.waitForTimeout(1500);
    console.log(vp, 'toast in mock exam:', (await toastLoc(page).innerText().catch(() => 'none')).replace(/\n/g, ' / '));
    await L.shot(page, `j8u-${vp}-03-update-toast-exam`);
    await page.getByRole('link', { name: 'Save & exit' }).click(); await page.waitForTimeout(800);
    const rl = page.getByRole('button', { name: 'Reload' });
    if (await rl.count()) {
      await rl.click(); await page.waitForTimeout(4000);
      console.log(vp, 'after Reload: url', page.url(), '| toast', await toastLoc(page).count(), '| waiting', await page.evaluate(async () => !!(await navigator.serviceWorker.getRegistration()).waiting), '| exam resumable', await page.getByRole('link', { name: /Resume exam/ }).count());
    } else console.log(vp, 'no Reload button on exam home');
    await ctx.close();
  }
  L.saveLogs('j8u');
  await b.close();
})().catch((e) => { console.error('FAIL', e); process.exit(1); });
