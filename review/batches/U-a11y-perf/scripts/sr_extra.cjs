// Screen-reader semantics for the states sr_semantics.cjs did not snapshot (continuation run):
// onboarding, course, practice builder, quiz test mode + results, exam TBS testlet, submit confirmation, break offer,
// break, exam results, glossary, notes, final review (+ doc), flashcard decks. Desktop, light.
// Writes aria/x-*.yml and aria/report_extra.json (headings, landmarks, live regions, focus after each transition).
// Usage: node sr_extra.cjs
const fs = require('fs');
const path = require('path');
const L = require('./lib.cjs');
const rep = {};

async function info(page) {
  return page.evaluate(() => {
    const vis = (e) => !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
    const a = document.activeElement;
    return {
      title: document.title,
      h: [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].filter(vis).map((h) => `${h.tagName.toLowerCase()} ${h.innerText.trim().slice(0, 60)}`).slice(0, 25),
      landmarks: [...document.querySelectorAll('main,nav,aside,header,footer,[role=main],[role=navigation],[role=region],section[aria-label],section[aria-labelledby],form[aria-label]')]
        .filter(vis)
        .map((e) => `${e.getAttribute('role') || e.tagName.toLowerCase()}${e.getAttribute('aria-label') ? '[' + e.getAttribute('aria-label') + ']' : ''}`),
      live: [...document.querySelectorAll('[aria-live],[role=status],[role=alert],[role=timer],output')].map((e) => `${e.tagName.toLowerCase()} role=${e.getAttribute('role')} live=${e.getAttribute('aria-live')} "${e.innerText.trim().slice(0, 70)}"`),
      unlabelled: [...document.querySelectorAll('input,select,textarea')]
        .filter(vis)
        .filter((e) => !(e.labels && e.labels.length) && !e.getAttribute('aria-label') && !e.getAttribute('aria-labelledby') && !e.getAttribute('title'))
        .map((e) => `${e.tagName.toLowerCase()}[type=${e.type}] placeholder="${e.placeholder || ''}"`),
      focus: a === document.body || !a ? 'BODY' : `${a.tagName.toLowerCase()}${a.getAttribute('role') ? '[role=' + a.getAttribute('role') + ']' : ''} "${(a.getAttribute('aria-label') || a.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 60)}"`,
    };
  });
}
async function snap(page, name) {
  const yml = await page.locator('body').ariaSnapshot();
  fs.writeFileSync(path.join(L.OUT, 'aria', 'x-' + name + '.yml'), yml);
  rep[name] = await info(page);
  console.log(name, JSON.stringify(rep[name]).slice(0, 400));
}

(async () => {
  const browser = await L.launch();
  const { page } = await L.newCtx(browser, L.DESKTOP, 'light');
  try {
    await page.goto(L.BASE);
    await page.waitForSelector('text=How this works', { timeout: 20000 });
    await snap(page, 'onboarding-1');
    await L.onboard(page).catch(async () => {
      // already on step 1
    });
    for (const [h, n] of [['/course', 'course'], ['/practice', 'practice-builder'], ['/flashcards', 'flashcard-decks'], ['/glossary', 'glossary'], ['/notes', 'notes'], ['/final-review', 'final-review'], ['/final-review/far-high-yield', 'final-review-doc']]) {
      await L.go(page, h, 'h1');
      await snap(page, n);
    }
    // Quiz, test mode: in progress, then results (where does focus go; is the score announced?)
    await L.go(page, '/practice/start?diagnostic=FAR');
    await page.waitForURL(/#\/quiz\//, { timeout: 20000 });
    await L.waitIdle(page);
    await page.keyboard.press('a');
    await page.keyboard.press('2');
    await L.sleep(300);
    await snap(page, 'quiz-test');
    await page.getByRole('button', { name: /^Question 40/ }).click();
    const submit = page.getByRole('button', { name: /Submit set/ });
    await submit.focus();
    await page.keyboard.press('Enter');
    await page.waitForSelector('text=Set complete', { timeout: 20000 });
    await L.sleep(500);
    await snap(page, 'quiz-test-results');
    // Exam: TBS testlet, confirmation, break offer, break, results
    await L.go(page, '/exam', 'h1');
    await page.getByRole('button', { name: 'Start' }).first().click();
    await page.waitForURL(/#\/exam\/exam-/);
    await L.waitIdle(page);
    const submitTestlet = async () => {
      await page.getByRole('button', { name: /^Submit (testlet|exam)$/ }).click();
      await page.getByRole('button', { name: /^Submit testlet$/ }).click();
      await L.sleep(800);
    };
    await submitTestlet();
    await submitTestlet();
    await page.waitForSelector('text=TBS 1');
    await snap(page, 'exam-tbs');
    const st = page.getByRole('button', { name: /^Submit testlet$/ });
    await st.focus();
    await page.keyboard.press('Enter');
    await L.sleep(400);
    await snap(page, 'exam-submit-confirm');
    await page.getByRole('button', { name: /^Submit testlet$/ }).click();
    await page.waitForSelector('text=Optional break');
    await snap(page, 'exam-break-offer');
    await page.getByRole('button', { name: 'Take break' }).click();
    await page.waitForSelector('text=Resume exam');
    await L.sleep(1500);
    await snap(page, 'exam-break');
    await page.getByRole('button', { name: 'Resume exam' }).click();
    await L.sleep(500);
    await submitTestlet();
    await submitTestlet();
    await page.waitForSelector('text=Simulated exam results', { timeout: 20000 });
    await L.sleep(500);
    await snap(page, 'exam-results');
  } catch (e) {
    console.log('ERROR', e.message);
    rep.error = e.message;
  }
  L.writeJson('aria/report_extra.json', rep);
  await browser.close();
})();
