// Manual keyboard-only pass, scripted so every step's focus target is logged.
// Usage: node keyboard.cjs   -> writes keyboard.json and ua-kb-* screenshots
const L = require('./lib.cjs');
const log = [];
const note = (flow, step, data) => {
  log.push({ flow, step, ...data });
  console.log(`[${flow}] ${step}:`, JSON.stringify(data).slice(0, 300));
};

// Description of document.activeElement, its focus indicator, and whether something covers it.
async function focus(page) {
  return page.evaluate(() => {
    const el = document.activeElement;
    if (!el || el === document.body) return { body: true };
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    const pts = [[r.left + r.width / 2, r.top + r.height / 2], [r.left + 3, r.top + 3], [r.right - 3, r.bottom - 3]];
    const covered = pts
      .filter(([x, y]) => x >= 0 && y >= 0 && x < innerWidth && y < innerHeight)
      .map(([x, y]) => document.elementFromPoint(x, y))
      .filter((h) => h && h !== el && !el.contains(h) && !h.contains(el))
      .map((h) => (h.closest('nav,header,[class*=sticky],[class*=fixed]') || h).className.toString().slice(0, 60));
    const offscreen = r.bottom < 0 || r.top > innerHeight;
    return {
      tag: el.tagName.toLowerCase(),
      role: el.getAttribute('role'),
      name: (el.getAttribute('aria-label') || el.innerText || el.value || '').trim().replace(/\s+/g, ' ').slice(0, 60),
      outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}`,
      ring: cs.boxShadow !== 'none',
      bg: cs.backgroundColor,
      covered: [...new Set(covered)],
      offscreen,
      rect: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)],
    };
  });
}
const qNow = async (page) => ((await page.locator('main').innerText()).match(/Question \d+ of \d+/) || [''])[0];
async function key(page, k, ms = 450) {
  await page.keyboard.press(k);
  await L.sleep(ms);
}
async function tabUntil(page, pred, max = 80, key = 'Tab') {
  for (let i = 0; i < max; i++) {
    await page.keyboard.press(key);
    const f = await focus(page);
    if (pred(f)) return { f, presses: i + 1 };
  }
  return { f: await focus(page), presses: max, notFound: true };
}

(async () => {
  const browser = await L.launch();
  // ---------- Desktop ----------
  {
    const { page } = await L.newCtx(browser, L.DESKTOP, 'light');
    // Onboarding by keyboard
    await page.goto(L.BASE);
    await page.waitForSelector('text=How this works');
    let t = await tabUntil(page, (f) => /Got it/.test(f.name || ''));
    note('onboarding', 'tab to "Got it"', t);
    await page.keyboard.press('Enter');
    note('onboarding', 'after Enter on Got it (step 2 shown)', { focus: await focus(page) });
    t = await tabUntil(page, (f) => f.name === 'Next');
    await page.keyboard.press('Enter');
    note('onboarding', 'after Enter on Next (step 3 shown)', { focus: await focus(page) });
    await page.getByRole('button', { name: /Build my plan/ }).click();
    await page.waitForURL(/#\/$/);
    await L.waitIdle(page);

    // Skip link
    await page.keyboard.press('Tab');
    const skip = await focus(page);
    const skipShot = await L.shot(page, 'kb-d-01-skip-link');
    note('dashboard', 'first Tab', { focus: skip, shot: skipShot });
    await page.keyboard.press('Enter');
    note('dashboard', 'Enter on skip link', { focus: await focus(page), url: page.url() });
    await page.keyboard.press('Tab');
    note('dashboard', 'Tab after skip', { focus: await focus(page) });
    // Tab order + focus visibility over the first 45 stops
    await page.goto(L.BASE + '#/');
    await L.waitIdle(page);
    const stops = [];
    for (let i = 0; i < 45; i++) {
      await page.keyboard.press('Tab');
      stops.push(await focus(page));
    }
    note('dashboard', 'tab order (45 stops)', { stops: stops.map((s) => `${s.tag}:${s.name}|${s.outline}`) });
    // Route change by keyboard
    await page.goto(L.BASE + '#/');
    await L.waitIdle(page);
    t = await tabUntil(page, (f) => f.name === 'Course');
    await page.keyboard.press('Enter');
    await L.waitIdle(page);
    note('route-change', 'Enter on sidebar "Course"', { focus: await focus(page), title: await page.title(), h1: await page.locator('h1').first().innerText() });

    // Quiz (tutor) by keyboard
    await L.go(page, '/practice/start?module=far-income-statement-oci');
    await page.waitForURL(/#\/quiz\//);
    await L.waitIdle(page);
    t = await tabUntil(page, (f) => f.role === 'radio');
    note('quiz', 'Tab to first radio', t);
    await key(page, 'ArrowDown');
    note('quiz', 'ArrowDown in radiogroup', { focus: await focus(page), checked: await page.locator('[role=radio][aria-checked=true]').innerText().catch(() => null) });
    await key(page, 'ArrowRight');
    note('quiz', 'ArrowRight inside radiogroup (app-wide next-question key)', { qText: await qNow(page), focus: await focus(page) });
    await key(page, 'ArrowLeft');
    await key(page, 'c');
    note('quiz', 'key "c"', { checked: (await page.locator('[role=radio][aria-checked=true]').innerText().catch(() => '')).slice(0, 40) });
    await key(page, '2', 800);
    note('quiz', 'key "2" (Unsure, submits)', { focus: await focus(page), status: await page.locator('[role=status]').first().innerText() });
    await L.shot(page, 'kb-d-02-quiz-revealed-focus');
    t = await tabUntil(page, (f) => /Next question/.test(f.name || ''));
    note('quiz', 'Tab to "Next question" from verdict', { presses: t.presses, f: t.f });
    const q1 = await qNow(page);
    await page.keyboard.press('Enter');
    await L.sleep(500);
    const q2 = await qNow(page);
    const fAfterNext = await focus(page);
    note('quiz', 'Enter on "Next question"', { from: q1, to: q2, focus: fAfterNext });
    await L.shot(page, 'kb-d-03-quiz-focus-after-next');
    await page.keyboard.press('Enter');
    await L.sleep(500);
    note('quiz', 'second Enter (as a repeated keypress)', { now: await qNow(page), focus: await focus(page) });
    // Auto-advance after a confident correct answer: read the key from the content JSON
    const qs = require('/home/user/CPA_Study_Program/content/far/modules/far-income-statement-oci/questions.json');
    const qid = (await page.locator('article[aria-labelledby^="stem-"]').getAttribute('aria-labelledby')).replace('stem-', '');
    const ans = qs.find((q) => q.id === qid)?.answer;
    if (ans) {
      await page.locator(`[data-choice="${ans}"]`).focus();
      await key(page, 'Space', 600);
      await page.keyboard.press('3');
      await L.sleep(400);
      note('quiz', 'confident + correct -> status', { status: await page.locator('[role=status]').allInnerTexts(), focus: await focus(page) });
      await L.sleep(1800);
      note('quiz', 'after auto-advance (1.5 s)', { q: await qNow(page), focus: await focus(page) });
    }

    // Exam: shortcuts, calculator, spreadsheet, submit confirmation
    await L.go(page, '/exam', 'h1');
    await page.getByRole('button', { name: 'Start' }).first().click();
    await page.waitForURL(/#\/exam\/exam-/);
    await L.waitIdle(page);
    await key(page, 'b');
    note('exam', 'key "b"', { checked: (await page.locator('[role=radio][aria-checked=true]').innerText()).slice(0, 40) });
    await page.keyboard.press('ArrowRight');
    await L.sleep(400);
    note('exam', 'ArrowRight', { q: await qNow(page), focus: await focus(page) });
    t = await tabUntil(page, (f) => f.name === 'Calculator');
    await page.keyboard.press('Enter');
    note('exam', 'Enter on Calculator toggle', { focus: await focus(page), pressed: await page.getByRole('button', { name: 'Calculator', exact: true }).getAttribute('aria-pressed') });
    await page.keyboard.type('12*3');
    await page.keyboard.press('Enter');
    note('exam', 'typed 12*3 Enter', { display: await page.locator('[role=dialog] output').innerText() });
    await page.keyboard.press('Backspace');
    note('exam', 'Backspace', { display: await page.locator('[role=dialog] output').innerText() });
    t = await tabUntil(page, (f) => f.name === '7', 30);
    const calcFocus = t.f;
    await page.keyboard.press('Enter');
    note('exam', 'Tab to calculator key "7" then Enter', { focus: calcFocus, display: await page.locator('[role=dialog] output').innerText() });
    await page.keyboard.press('Space');
    note('exam', 'then Space on "7"', { display: await page.locator('[role=dialog] output').innerText() });
    await L.shot(page, 'kb-d-04-calculator-key-focus');
    // Tab out of the calculator: does focus leave the dialog?
    t = await tabUntil(page, (f) => !f.body && !['MC', 'MR', 'M+', 'M−', 'C', 'CE', '±', '÷', '×', '−', '+', '%', '.', '=', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Close calculator'].includes(f.name), 30);
    note('exam', 'Tab past the last calculator key', { focus: t.f, presses: t.presses });
    await page.locator('[role=dialog][aria-label=Calculator]').focus();
    await page.keyboard.press('Escape');
    note('exam', 'Escape in calculator', { open: await page.locator('[role=dialog][aria-label=Calculator]').count(), focus: await focus(page) });
    // Spreadsheet
    await page.getByRole('button', { name: 'Spreadsheet' }).focus();
    await page.keyboard.press('Enter');
    t = await tabUntil(page, (f) => f.name === 'Cell A1' || /A1/.test(f.name || ''), 10);
    const cellFocus = await page.evaluate(() => {
      const el = document.activeElement;
      const toRGB = (c) => {
        const cv = document.createElement('canvas').getContext('2d');
        cv.fillStyle = c;
        cv.fillRect(0, 0, 1, 1);
        return [...cv.getImageData(0, 0, 1, 1).data];
      };
      const other = document.getElementById('sheet-B1');
      const cs = getComputedStyle(el);
      const td = getComputedStyle(el.parentElement);
      return { focused: cs.backgroundColor, focusedRGB: toRGB(cs.backgroundColor), unfocused: getComputedStyle(other).backgroundColor, cellBorder: td.borderColor, outline: `${cs.outlineStyle} ${cs.outlineWidth}`, panelBg: toRGB(getComputedStyle(document.querySelector('[role=dialog][aria-label=Spreadsheet]')).backgroundColor) };
    });
    note('exam', 'Spreadsheet: focus on A1', { presses: t.presses, f: t.f, cellFocus });
    await page.keyboard.type('100');
    await page.keyboard.press('Enter');
    await page.keyboard.type('=A1*2');
    await page.keyboard.press('Enter');
    note('exam', 'typed 100 Enter =A1*2 Enter', { a2: await page.locator('#sheet-A2').inputValue(), focus: (await focus(page)).name });
    await L.shot(page, 'kb-d-05-spreadsheet-cell-focus');
    await page.keyboard.press('Escape');
    note('exam', 'Escape in spreadsheet', { open: await page.locator('[role=dialog][aria-label=Spreadsheet]').count(), focus: await focus(page) });
    // Submit testlet confirmation
    await page.getByRole('button', { name: /^Submit testlet$/ }).focus();
    await page.keyboard.press('Enter');
    note('exam', 'Enter on "Submit testlet" (confirmation appears)', { focus: await focus(page), confirm: await page.locator('text=You will not be able to return').count() });
    await L.shot(page, 'kb-d-06-exam-confirm-focus');
    t = await tabUntil(page, (f) => f.name === 'Keep working', 60);
    note('exam', 'Tabs from there to "Keep working"', { presses: t.presses });

    // Flashcards
    await L.go(page, '/flashcards', 'h1');
    await page.getByRole('button', { name: 'Study', exact: true }).first().focus();
    await page.keyboard.press('Enter');
    t = await tabUntil(page, (f) => f.name === 'Show answer', 60);
    note('flashcards', 'Tab to "Show answer"', { presses: t.presses });
    await page.keyboard.press('Enter');
    note('flashcards', 'Enter on Show answer', { focus: await focus(page), grades: await page.getByRole('button', { name: /^Good/ }).count() });
    await page.keyboard.press('3');
    await L.sleep(400);
    note('flashcards', 'key 3 (Good) -> next card', { focus: await focus(page) });

    // TBS tabs + submit
    await L.go(page, '/tbs/far-tbs-u1-income-statement', 'h1');
    await page.getByRole('tab').first().focus();
    const tab0 = await focus(page);
    await page.keyboard.press('ArrowRight');
    const tab1 = await focus(page);
    note('tbs', 'ArrowRight on first exhibit tab', { before: tab0.name, after: tab1.name, selected: await page.locator('[role=tab][aria-selected=true]').innerText() });
    await L.go(page, '/tbs/aud-tbs-r3-conduct-rules', 'h1');
    await page.getByRole('button', { name: /Submit & see/ }).focus();
    await page.keyboard.press('Enter');
    await page.waitForSelector('#tbs-results');
    await L.sleep(800);
    const afterSubmit = await focus(page);
    note('tbs', 'Enter on "Submit & see explanations"', { focus: afterSubmit, scrollY: await page.evaluate(() => scrollY) });
    await L.shot(page, 'kb-d-07-tbs-focus-after-submit');
    if (/Try again/.test(afterSubmit.name || '')) {
      await page.keyboard.press('Enter');
      await L.sleep(800);
      note('tbs', 'a second Enter', { results: await page.locator('#tbs-results').count(), focus: await focus(page) });
    }
    await page.context().close();
  }
  // ---------- Phone ----------
  {
    const { page } = await L.newCtx(browser, L.PHONE, 'light');
    await L.onboard(page);
    let t = await tabUntil(page, (f) => f.name === 'More');
    note('phone', 'Tab to "More"', { presses: t.presses, f: t.f });
    await page.keyboard.press('Enter');
    note('phone', 'Enter on More', { expanded: await page.getByRole('button', { name: 'More' }).getAttribute('aria-expanded'), focus: await focus(page) });
    await page.keyboard.press('Tab');
    note('phone', 'Tab after opening More', { focus: await focus(page) });
    await page.keyboard.press('Escape');
    note('phone', 'Escape with More open', { menuOpen: await page.locator('#more-menu').count(), focus: await focus(page) });
    await L.shot(page, 'kb-m-01-more-menu-after-escape');
    // Focus obscured by the sticky quiz bar / fixed bottom nav while tabbing through a quiz
    await L.go(page, '/practice/start?module=far-income-statement-oci');
    await page.waitForURL(/#\/quiz\//);
    await L.waitIdle(page);
    const hidden = [];
    for (let i = 0; i < 40; i++) {
      await page.keyboard.press('Tab');
      const f = await focus(page);
      if (f.covered && f.covered.length) hidden.push(`${f.tag}:${f.name} covered by ${f.covered.join('|')}`);
    }
    note('phone', 'quiz: focus stops covered by sticky/fixed bars (40 Tabs)', { count: hidden.length, hidden });
    // Lesson: tab through and look for covered focus
    await L.go(page, '/module/far-income-statement-oci', 'text=The big idea');
    const hiddenL = [];
    for (let i = 0; i < 60; i++) {
      await page.keyboard.press('Tab');
      const f = await focus(page);
      if (f.covered && f.covered.length) hiddenL.push(`${f.tag}:${f.name} covered by ${f.covered.join('|')}`);
    }
    note('phone', 'lesson: focus stops covered (60 Tabs)', { count: hiddenL.length, hidden: hiddenL.slice(0, 10) });
    await page.context().close();
  }
  L.writeJson('keyboard.json', log);
  await browser.close();
})();
