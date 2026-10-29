const L = require('./lib.cjs');
(async () => {
  const b = await L.launch();
  const { ctx, page } = await L.newPage(b, L.DESKTOP, 'j8i');
  await L.onboard(page, { section: 'FAR', date: '2027-01-15' });
  await page.evaluate(() => navigator.serviceWorker.ready); await page.waitForTimeout(3000); await page.reload(); await page.waitForTimeout(1500);
  const cdp = await ctx.newCDPSession(page);
  console.log('installability errors', JSON.stringify(await cdp.send('Page.getInstallabilityErrors')));
  const m = await cdp.send('Page.getAppManifest').catch((e) => ({ err: e.message }));
  console.log('manifest url', m.url, 'errors', JSON.stringify(m.errors));
  // standalone display mode emulation: does layout rely on browser chrome? check safe-area padding classes
  console.log('safe-bottom class present', await page.locator('.safe-bottom').count());
  await ctx.close(); await b.close();
})();
