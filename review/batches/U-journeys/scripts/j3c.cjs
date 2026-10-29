const L = require('./lib.cjs');
(async () => {
  const b = await L.launch();
  const { ctx, page } = await L.newPage(b, L.DESKTOP, 'j3c');
  await L.onboard(page, { section: 'FAR', date: '2027-01-15' });
  await page.goto(L.BASE + '#/practice/start?module=far-bonds'); await page.waitForURL(/#\/quiz\//); await page.waitForTimeout(1000);
  await page.keyboard.press('d'); await page.keyboard.press('2');
  await page.waitForTimeout(800);
  const st = await page.locator('[role=status]').first().innerText();
  console.log('immediate d,2 -> feedback:', JSON.stringify(st), 'D selected:', await page.locator('[role=radio]').nth(3).getAttribute('aria-checked'));
  await L.shot(page, 'j3c-d-keyboard-race');
  await page.keyboard.press('2'); await page.waitForTimeout(600);
  console.log('second 2 ->', JSON.stringify(await page.locator('[role=status]').first().innerText()).slice(0, 60));
  await ctx.close(); await b.close();
})();
