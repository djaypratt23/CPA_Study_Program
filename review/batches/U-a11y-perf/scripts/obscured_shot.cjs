// Captures a screenshot at the moment a Tab stop is fully hidden under the phone's fixed/sticky bars.
const L = require('./lib.cjs');
(async () => {
  const browser = await L.launch();
  const { page } = await L.newCtx(browser, L.PHONE, 'light');
  await L.onboard(page);
  const hiddenNow = () => page.evaluate(() => {
    const el = document.activeElement;
    if (!el || el === document.body) return null;
    const r = el.getBoundingClientRect();
    const pts = [[0.5, 0.5], [0.1, 0.1], [0.9, 0.1], [0.1, 0.9], [0.9, 0.9]].map(([fx, fy]) => [r.left + r.width * fx, r.top + r.height * fy]);
    const cov = pts.filter(([x, y]) => { const t = document.elementFromPoint(x, y); return t && t !== el && !el.contains(t); }).length;
    if (cov < 5) return null;
    el.setAttribute('data-ua-hidden', '1');
    return (el.getAttribute('aria-label') || el.innerText || el.tagName).trim().slice(0, 40);
  });
  for (const [label, setup] of [
    ['quiz', async () => { await L.go(page, '/practice/start?module=far-income-statement-oci'); await page.waitForURL(/#\/quiz\//); await L.waitIdle(page); }],
    ['tbs', async () => L.go(page, '/tbs/far-tbs-r3-deferred-tax', 'h1')],
  ]) {
    await setup();
    await page.evaluate(() => scrollTo(0, 0));
    for (let i = 0; i < 70; i++) {
      await page.keyboard.press('Tab');
      await L.sleep(60);
      const h = await hiddenNow();
      if (h) {
        const p = await L.shot(page, `obscured-m-${label}`);
        console.log(label, 'fully hidden focus:', h, 'after', i + 1, 'Tabs ->', p);
        break;
      }
    }
  }
  await browser.close();
})();
