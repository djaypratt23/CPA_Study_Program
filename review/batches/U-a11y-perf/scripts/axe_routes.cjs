// Runs axe-core on every main route/state for one viewport x theme combination.
// Usage: node axe_routes.cjs d|m light|dark
const L = require('./lib.cjs');
const [vpKey = 'd', theme = 'light'] = process.argv.slice(2);
const vp = vpKey === 'm' ? L.PHONE : L.DESKTOP;
const tag = `${vpKey}-${theme[0]}`;
const results = [];
let n = 0;

async function check(page, name, { full = false } = {}) {
  n += 1;
  await L.sleep(250);
  const r = await L.axe(page);
  const shotPath = await L.shot(page, `axe-${tag}-${String(n).padStart(2, '0')}-${name}`, full);
  const url = page.url().replace(L.BASE, '/');
  const summary = r.violations.map((v) => `${v.id}(${v.nodes.length})`).join(' ');
  console.log(`[${tag}] ${name} ${url} -> ${r.violations.length ? summary : 'clean'}`);
  results.push({ name, url, shot: shotPath, violations: r.violations, incomplete: r.incomplete, html_dark: await page.evaluate(() => document.documentElement.classList.contains('dark')) });
}

(async () => {
  const browser = await L.launch();
  const { ctx, page } = await L.newCtx(browser, vp, theme);
  try {
    // Onboarding (3 steps)
    await page.goto(L.BASE);
    await page.waitForSelector('text=How this works', { timeout: 20000 });
    await check(page, 'onboarding-1');
    await page.getByRole('button', { name: /Got it/ }).click();
    await check(page, 'onboarding-2');
    await page.fill('#date', '2027-01-15');
    await page.getByRole('button', { name: 'Next' }).click();
    await check(page, 'onboarding-3');
    await page.getByRole('button', { name: /Build my plan/ }).click();
    await page.waitForURL(/#\/$/, { timeout: 15000 });
    await L.waitIdle(page);
    await check(page, 'dashboard');

    await L.go(page, '/course', 'h1');
    await check(page, 'course');

    // Lesson with pre-question, inline checks, mermaid, worked + faded examples
    await L.go(page, '/module/far-income-statement-oci', 'text=The big idea');
    await page.waitForSelector('figure svg', { timeout: 20000 }).catch(() => console.log('no mermaid svg'));
    await check(page, 'lesson');
    const pre = page.locator('[role=group][aria-label^="Pre-question"]').first();
    await pre.locator('[role=radio]').first().click();
    await pre.getByRole('button', { name: /^Unsure/ }).click();
    await L.sleep(400);
    await check(page, 'lesson-inline-revealed');

    // Quiz, tutor mode
    await L.go(page, '/practice/start?module=far-income-statement-oci');
    await page.waitForURL(/#\/quiz\//, { timeout: 20000 });
    await L.waitIdle(page);
    await check(page, 'quiz-tutor');
    await page.locator('[role=radio]').first().click();
    await page.getByRole('button', { name: /^Unsure/ }).click();
    await page.waitForSelector('text=Explanation');
    await check(page, 'quiz-tutor-revealed');
    // Calculator + spreadsheet in practice
    await page.getByRole('button', { name: 'Calculator' }).click();
    await page.getByRole('button', { name: 'Spreadsheet' }).click();
    await check(page, 'quiz-tools-open');
    await page.keyboard.press('Escape');

    // Quiz, test mode (diagnostic) + results
    await L.go(page, '/practice/start?diagnostic=FAR');
    await page.waitForURL(/#\/quiz\//, { timeout: 20000 });
    await L.waitIdle(page);
    await page.locator('[role=radio]').first().click();
    await check(page, 'quiz-test');
    await page.getByRole('button', { name: /^Question 40/ }).click();
    await page.getByRole('button', { name: /Submit set/ }).click();
    await page.waitForSelector('text=Set complete', { timeout: 20000 });
    await check(page, 'quiz-results');
    await page.locator('li.card button[aria-expanded]').first().click();
    await check(page, 'quiz-results-expanded');

    await L.go(page, '/practice', 'h1');
    await check(page, 'practice-builder');
    await L.go(page, '/review', 'h1');
    await check(page, 'review-queue');

    // Flashcards
    await L.go(page, '/flashcards', 'h1');
    await check(page, 'flashcard-decks');
    await page.getByRole('button', { name: 'Study', exact: true }).first().click();
    await page.waitForSelector('text=left in this session');
    await check(page, 'flashcard-front');
    await page.getByRole('button', { name: 'Show answer' }).click();
    await check(page, 'flashcard-back');

    // TBS: one of each part kind
    await L.go(page, '/tbs', 'h1');
    await check(page, 'tbs-list');
    const tbs = [
      ['far-tbs-r3-deferred-tax', 'tbs-numeric-journal'],
      ['aud-tbs-r3-conduct-rules', 'tbs-dropdown'],
      ['aud-tbs-r3-rep-letter', 'tbs-docreview'],
      ['far-tbs-u1-income-statement', 'tbs-research'],
      ['far-tbs-u1-statement-review', 'tbs-review'],
    ];
    for (const [id, name] of tbs) {
      await L.go(page, `/tbs/${id}`, 'h1');
      await check(page, name);
    }
    await L.go(page, '/tbs/far-tbs-r3-deferred-tax', 'h1');
    if (vpKey === 'm') {
      await page.getByRole('tab').nth(1).click();
      await check(page, 'tbs-exhibit-tab');
      await page.getByRole('tab', { name: 'Task' }).click();
    }
    await page.getByRole('button', { name: /Submit & see/ }).click();
    await page.waitForSelector('#tbs-results');
    await check(page, 'tbs-results');

    // Exam
    await L.go(page, '/exam', 'h1');
    await check(page, 'exam-home');
    await page.getByRole('button', { name: 'Start' }).first().click();
    await page.waitForURL(/#\/exam\/exam-/);
    await L.waitIdle(page);
    await page.locator('[role=radio]').first().click();
    await check(page, 'exam-mcq');
    await page.getByRole('button', { name: 'Calculator' }).click();
    await check(page, 'exam-calculator');
    await page.keyboard.press('Escape');
    await page.getByRole('button', { name: 'Spreadsheet' }).click();
    await check(page, 'exam-spreadsheet');
    await page.keyboard.press('Escape');
    const submitTestlet = async () => {
      await page.getByRole('button', { name: /^Submit (testlet|exam)$/ }).click();
      await page.getByRole('button', { name: /^Submit testlet$/ }).click();
      await L.sleep(800);
    };
    await submitTestlet(); // testlet 1
    await submitTestlet(); // testlet 2
    await page.waitForSelector('text=TBS 1');
    await check(page, 'exam-tbs');
    await page.getByRole('button', { name: /^Submit testlet$/ }).click();
    await check(page, 'exam-submit-confirm');
    await page.getByRole('button', { name: /^Submit testlet$/ }).click();
    await page.waitForSelector('text=Optional break');
    await check(page, 'exam-break-offer');
    await page.getByRole('button', { name: 'Take break' }).click();
    await page.waitForSelector('text=Resume exam');
    await check(page, 'exam-break');
    await page.getByRole('button', { name: 'Resume exam' }).click();
    await L.sleep(500);
    await submitTestlet(); // testlet 4
    await submitTestlet(); // testlet 5 -> exam
    await page.waitForSelector('text=Simulated exam results', { timeout: 20000 });
    await check(page, 'exam-results');
    await page.locator('li.card button[aria-expanded]').first().click();
    await check(page, 'exam-results-expanded');

    for (const [h, name] of [
      ['/plan', 'planner'],
      ['/analytics', 'analytics'],
      ['/search?q=deferred%20tax', 'search'],
      ['/glossary', 'glossary'],
      ['/notes', 'notes'],
      ['/settings', 'settings'],
      ['/final-review', 'final-review'],
      ['/final-review/far-high-yield', 'final-review-doc'],
    ]) {
      await L.go(page, h, 'h1');
      await check(page, name);
    }
    if (vpKey === 'm') {
      await L.go(page, '/', 'h1');
      await page.getByRole('button', { name: 'More' }).click();
      await check(page, 'mobile-more-menu');
    }
  } catch (e) {
    console.log('ERROR', e.message);
    await L.shot(page, `axe-${tag}-error`);
  }
  L.writeJson(`axe/axe-${tag}.json`, { vp: vpKey, theme, results, errors: page.errors });
  await browser.close();
})();
