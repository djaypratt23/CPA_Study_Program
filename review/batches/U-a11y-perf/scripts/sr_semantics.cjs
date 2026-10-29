// Screen-reader semantics: accessibility-tree snapshots (ariaSnapshot), document titles, live regions,
// symbol-only controls, and what each clock exposes. Usage: node sr_semantics.cjs
const fs = require('fs');
const path = require('path');
const L = require('./lib.cjs');
const report = { titles: {}, liveRegions: {}, symbolButtons: {}, clocks: {}, landmarks: {} };

async function snap(page, name, selector = 'body') {
  const yml = await page.locator(selector).first().ariaSnapshot();
  fs.writeFileSync(path.join(L.OUT, 'aria', name + '.yml'), yml);
  report.titles[name] = await page.title();
  report.liveRegions[name] = await page.evaluate(() =>
    [...document.querySelectorAll('[aria-live],[role=status],[role=alert],output')].map((e) => ({
      tag: e.tagName.toLowerCase(), role: e.getAttribute('role'), live: e.getAttribute('aria-live'), text: e.innerText.slice(0, 80),
    })),
  );
  report.symbolButtons[name] = await page.evaluate(() =>
    [...document.querySelectorAll('button,a,[role=tab],[role=radio]')]
      .filter((b) => b.offsetParent !== null)
      .map((b) => ({ text: b.innerText.trim(), label: b.getAttribute('aria-label'), title: b.getAttribute('title') }))
      .filter((b) => /^[^A-Za-z0-9]{0,3}$/.test(b.text) || /^[←-⯿\u{1F300}-\u{1FAFF}]/u.test(b.text)),
  );
  report.clocks[name] = await page.evaluate(() => [...document.querySelectorAll('span[aria-label]')].map((s) => ({ label: s.getAttribute('aria-label'), role: s.getAttribute('role'), text: s.innerText })));
  report.landmarks[name] = await page.evaluate(() =>
    [...document.querySelectorAll('main,nav,aside,header,footer,[role=main],[role=navigation],[role=complementary],section[aria-label],section[aria-labelledby]')]
      .filter((e) => e.offsetParent !== null || e.tagName === 'MAIN')
      .map((e) => `${e.tagName.toLowerCase()}${e.getAttribute('aria-label') ? '[' + e.getAttribute('aria-label') + ']' : ''}`),
  );
}

(async () => {
  const browser = await L.launch();
  for (const [vpKey, vp] of [['d', L.DESKTOP], ['m', L.PHONE]]) {
    const { page } = await L.newCtx(browser, vp, 'light');
    await L.onboard(page);
    const P = (n) => `${vpKey}-${n}`;
    await snap(page, P('dashboard'));
    if (vpKey === 'm') {
      await page.getByRole('button', { name: 'More' }).click();
      await snap(page, P('more-menu'));
      await page.getByRole('button', { name: 'More' }).click();
    }
    await L.go(page, '/module/far-income-statement-oci', 'text=The big idea');
    await page.waitForSelector('figure svg', { timeout: 20000 }).catch(() => {});
    await snap(page, P('lesson'), 'main');
    await L.go(page, '/practice/start?module=far-income-statement-oci');
    await page.waitForURL(/#\/quiz\//);
    await L.waitIdle(page);
    await snap(page, P('quiz-tutor'), 'main');
    await page.locator('[role=radio]').nth(1).click();
    await page.getByRole('button', { name: /^Unsure/ }).click();
    await page.waitForSelector('text=Explanation');
    await snap(page, P('quiz-tutor-revealed'), 'main');
    await L.go(page, '/flashcards', 'h1');
    await page.getByRole('button', { name: 'Study', exact: true }).first().click();
    await snap(page, P('flashcard-front'), 'main');
    await page.getByRole('button', { name: 'Show answer' }).click();
    await snap(page, P('flashcard-back'), 'main');
    for (const id of ['far-tbs-r3-deferred-tax', 'far-tbs-u1-statement-review', 'far-tbs-u1-income-statement', 'aud-tbs-r3-rep-letter']) {
      await L.go(page, '/tbs/' + id, 'h1');
      await snap(page, P('tbs-' + id), 'main');
    }
    await L.go(page, '/exam', 'h1');
    await page.getByRole('button', { name: 'Start' }).first().click();
    await page.waitForURL(/#\/exam\/exam-/);
    await L.waitIdle(page);
    await snap(page, P('exam-mcq'));
    await page.getByRole('button', { name: 'Calculator' }).click();
    await snap(page, P('exam-calculator'));
    await page.keyboard.press('Escape');
    for (const [h, n] of [['/analytics', 'analytics'], ['/plan', 'planner'], ['/settings', 'settings'], ['/search?q=lease', 'search']]) {
      await L.go(page, h, 'h1');
      await snap(page, P(n), 'main');
    }
    await page.context().close();
  }
  L.writeJson('aria/report.json', report);
  console.log(JSON.stringify({ titles: report.titles }, null, 1));
  await browser.close();
})();
