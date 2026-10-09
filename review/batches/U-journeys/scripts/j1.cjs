const L = require('./lib.cjs');
(async () => {
  const b = await L.launch();
  for (const [vp, opts] of [['d', L.DESKTOP], ['m', L.PHONE]]) {
    const { ctx, page } = await L.newPage(b, opts, 'j1-' + vp);
    const t0 = Date.now();
    await page.goto(L.BASE);
    await page.waitForSelector('text=How this works', { timeout: 15000 });
    console.log(vp, 'first paint of welcome ms', Date.now() - t0, 'url', page.url());
    await L.shot(page, `j1-${vp}-01-welcome`, true);
    await page.getByRole('button', { name: /Got it/ }).click();
    await L.shot(page, `j1-${vp}-02-sections`, true);
    const opts1 = await page.locator('#first option').allInnerTexts();
    console.log('first options', opts1);
    const opts2 = await page.locator('#disc option').allInnerTexts();
    console.log('disc options', opts2);
    await page.selectOption('#first', 'FAR');
    // try a past date
    await page.fill('#date', '2026-01-01');
    console.log('date input min attr', await page.locator('#date').getAttribute('min'));
    await page.getByRole('button', { name: 'Next' }).click();
    const t2 = await L.text(page);
    console.log('step3 text:', t2.slice(0, 600));
    await L.shot(page, `j1-${vp}-03-time`, true);
    await page.getByRole('button', { name: 'Back' }).click();
    console.log('after back date value', await page.locator('#date').inputValue());
    await page.fill('#date', '2027-01-15');
    await page.getByRole('button', { name: 'Next' }).click();
    // default minutes
    const mins = [];
    for (let i = 0; i < 7; i++) mins.push(await page.locator(`#m${i}`).inputValue());
    console.log('default minutes', mins);
    await page.getByRole('button', { name: /Build my plan/ }).click();
    await page.waitForTimeout(1500);
    console.log('url after finish', page.url());
    await L.shot(page, `j1-${vp}-04-dashboard`, true);
    console.log('dashboard text:\n', (await L.text(page)).slice(0, 3000));
    // Check persisted storage
    const persisted = await page.evaluate(async () => navigator.storage && navigator.storage.persisted ? await navigator.storage.persisted() : 'n/a');
    console.log('persisted', persisted);
    // horizontal overflow check
    const ov = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
    console.log('overflow', ov);
    await ctx.close();
  }
  L.saveLogs('j1');
  await b.close();
})();
