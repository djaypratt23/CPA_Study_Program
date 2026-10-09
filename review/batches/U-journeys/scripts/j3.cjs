const L = require('./lib.cjs');
const Q = L.loadQuestions();
async function waitQ(page, prev) { for (let i = 0; i < 40; i++) { const c = await L.currentQid(page).catch(() => null); if (c && c !== prev) return c; await page.waitForTimeout(100); } return L.currentQid(page).catch(() => null); }
async function answer(page, { right = true, conf = 'Confident', viaKeys = false }) {
  await page.waitForTimeout(250);
  const id = await L.currentQid(page);
  const q = Q[id];
  const target = right ? q.answer : q.choices.find((c) => c.id !== q.answer).id;
  if (viaKeys) {
    // find display letter of target
    const btns = page.locator('[role=radio][data-choice]');
    const n = await btns.count();
    let letter;
    for (let i = 0; i < n; i++) if ((await btns.nth(i).getAttribute('data-choice')) === target) letter = 'ABCDE'[i];
    await page.keyboard.press(letter.toLowerCase());
    await page.waitForTimeout(150);
    await page.keyboard.press({ Guess: '1', Unsure: '2', Confident: '3' }[conf]);
  } else {
    await page.locator(`[role=radio][data-choice="${target}"]`).click();
    await page.getByRole('button', { name: new RegExp('^' + conf) }).click();
  }
  await page.waitForTimeout(300);
  return { id, target, right };
}
(async () => {
  const b = await L.launch();
  for (const [vp, opts] of [['d', L.DESKTOP], ['m', L.PHONE]]) {
    const { ctx, page } = await L.newPage(b, opts, 'j3-' + vp);
    await L.onboard(page, { section: 'FAR', date: '2027-01-15' });
    await page.goto(L.BASE + '#/module/far-income-statement-oci');
    await page.waitForSelector('text=The big idea');
    await page.getByRole('button', { name: /Mark complete/ }).click();
    await page.waitForURL(/#\/quiz\//);
    await page.waitForTimeout(800);
    const quizUrl = page.url();
    await L.shot(page, `j3-${vp}-01-quiz-q1`);
    // Q1: right, confident -> auto-advance
    let r = await answer(page, { right: true, conf: 'Confident' });
    await L.shot(page, `j3-${vp}-02-q1-correct`);
    console.log('auto-advance msg', await page.locator('text=Next question in a moment').count());
    await page.waitForTimeout(2000);
    console.log('after 2s qid changed?', (await L.currentQid(page)) !== r.id);
    // Q2: wrong, unsure
    r = await answer(page, { right: false, conf: 'Unsure', viaKeys: vp === 'd' });
    await L.shot(page, `j3-${vp}-03-q2-wrong`, true);
    const fb = await page.locator('[role=status]').first().innerText();
    console.log('q2 feedback', fb);
    // error tagger
    const tag = page.getByRole('button', { name: /Didn.t know|Misread|Calculation|Rushed|Concept/i }).first();
    console.log('error-tagger', await page.locator('text=Why did you miss it').count());
    const chips = page.locator('div.rounded-lg:has(> div:text("Why did you miss it")) button');
    console.log('cause buttons', await chips.allInnerTexts());
    if (await chips.count()) await chips.first().click();
    await page.waitForTimeout(200);
    console.log('logged?', await page.locator('text=Logged.').count());
    await page.getByRole('button', { name: /Next question/ }).click();
    // Q3: right, guess
    r = await answer(page, { right: true, conf: 'Guess' });
    console.log('q3 feedback', await page.locator('[role=status]').first().innerText(), 'auto-adv?', await page.locator('text=Next question in a moment').count());
    await L.shot(page, `j3-${vp}-04-q3-guess`);
    await page.getByRole('button', { name: /Next question/ }).click();
    // Q4: flag + note, then right unsure
    await page.getByRole('button', { name: /^Flag/ }).click();
    await page.getByRole('button', { name: /^Note/ }).click();
    await page.getByLabel('Question note').fill('Remember: unusual items pretax');
    await page.waitForTimeout(1200);
    // strike out a choice and highlight
    await page.locator('button[aria-label^="Strike out choice"]').first().click();
    await L.shot(page, `j3-${vp}-05-q4-flag-note-strike`);
    // reload mid-quiz
    const qBefore = await L.currentQid(page);
    const clockBefore = await page.locator('span[aria-label^="Elapsed"], span[aria-label^="Time left"]').first().innerText().catch(() => '?');
    await page.reload();
    await page.waitForTimeout(1500);
    const qAfter = await L.currentQid(page);
    console.log('reload mid-quiz: same q?', qBefore === qAfter, 'flag text', await page.getByRole('button', { name: /^Flag/ }).innerText(), 'clock before/after', clockBefore, await page.locator('span[aria-label^="Elapsed"], span[aria-label^="Time left"]').first().innerText().catch(() => '?'));
    console.log('header after reload', await page.locator('h1').first().innerText(), '|', (await page.locator('.sticky .muted').first().innerText()));
    r = await answer(page, { right: true, conf: 'Unsure' });
    await page.waitForTimeout(1800);
    console.log('q4 unsure correct auto-advance?', (await L.currentQid(page)) !== r.id);
    if ((await L.currentQid(page)) === r.id) await page.getByRole('button', { name: /Next question/ }).click();
    // Q5: skip
    await page.getByRole('button', { name: 'Skip', exact: true }).click();
    // Q6..Q10 answer right confident except last wrong
    for (let i = 6; i <= 10; i++) {
      const before = await L.currentQid(page);
      r = await answer(page, { right: i !== 10, conf: 'Confident' });
      await page.waitForTimeout(1800);
      if ((await L.currentQid(page)) === before) {
        const nx = page.getByRole('button', { name: /Next question|See results/ });
        if (await nx.count()) { const t = await nx.innerText(); await nx.click(); if (/See results/.test(t)) break; }
      }
    }
    await page.waitForTimeout(1000);
    await L.shot(page, `j3-${vp}-06-results`, true);
    console.log('results:', (await L.text(page)).replace(/Skip to content[\s\S]*?Settings\n/, '').slice(0, 1200));
    // srs counts
    const srs = await page.evaluate(() => new Promise((res) => { const rq = indexedDB.open('cpa-study'); rq.onsuccess = () => { const tx = rq.result.transaction('srs'); const g = tx.objectStore('srs').getAll(); g.onsuccess = () => res(g.result.map((s) => s.key + ' ' + s.due)); }; }));
    console.log('srs rows', srs.length, srs);
    // open a missed item in review list
    const missed = page.locator('button:has(span.chip:text("Missed"))').first();
    if (await missed.count()) { await missed.click(); await page.waitForTimeout(400); await L.shot(page, `j3-${vp}-07-results-review-item`); }
    // ---- Mixed set ----
    await page.goto(L.BASE + '#/practice');
    await page.waitForTimeout(800);
    await L.shot(page, `j3-${vp}-08-practice-home`, true);
    await page.getByRole('link', { name: /Mixed practice/ }).click();
    await page.waitForURL(/#\/quiz\//);
    await page.waitForTimeout(800);
    console.log('mixed header', await page.locator('.sticky').first().innerText());
    const mixedIds = [];
    for (let i = 0; i < 20; i++) {
      const before = await L.currentQid(page);
      if (!before) break;
      mixedIds.push(before);
      const right = i % 3 !== 0;
      await answer(page, { right, conf: ['Guess', 'Unsure', 'Confident'][i % 3], viaKeys: vp === 'd' });
      await page.waitForTimeout(right && i % 3 === 2 ? 1800 : 200);
      if ((await L.currentQid(page)) === before) {
        const nx = page.getByRole('button', { name: /Next question|See results/ });
        const t = await nx.innerText(); await nx.click(); if (/See results/.test(t)) break;
      }
      await page.waitForTimeout(150);
    }
    const mods = new Set(mixedIds.map((id) => Q[id] && Q[id].moduleId));
    console.log('mixed set size', mixedIds.length, 'modules', [...mods]);
    await page.waitForTimeout(800);
    await L.shot(page, `j3-${vp}-09-mixed-results`);
    console.log('mixed results:', (await L.text(page)).replace(/Skip to content[\s\S]*?Settings\n/, '').slice(0, 600));
    // ---- Custom test-mode timed set ----
    await page.goto(L.BASE + '#/practice');
    await page.waitForTimeout(600);
    await page.locator('label:has-text("Area I") input[type=checkbox]').first().check();
    await page.fill('#count', '4');
    await page.locator('input[name=mode]').nth(1).check();
    await page.getByLabel(/Timed/).check();
    const startBtn = page.getByRole('button', { name: /^Start/ });
    console.log('start button', await startBtn.innerText());
    await startBtn.click();
    await page.waitForURL(/#\/quiz\//);
    await page.waitForTimeout(800);
    await L.shot(page, `j3-${vp}-10-test-mode`);
    // Q1: choose but no confidence
    let id = await L.currentQid(page);
    await page.locator(`[role=radio][data-choice="${Q[id].answer}"]`).click();
    console.log('test header after choose-no-confidence', await page.locator('.sticky .muted').first().innerText());
    await page.getByRole('button', { name: 'Next →' }).click();
    id = await L.currentQid(page);
    await page.locator(`[role=radio][data-choice="${Q[id].answer}"]`).click();
    await page.getByRole('button', { name: /^Confident/ }).click();
    await page.getByRole('button', { name: 'Next →' }).click();
    await page.getByRole('button', { name: 'Next →' }).click();
    console.log('test header', await page.locator('.sticky').first().innerText());
    await L.shot(page, `j3-${vp}-11-test-last`);
    page.once('dialog', (d) => { console.log('DIALOG', d.message()); d.accept(); });
    await page.getByRole('button', { name: /Submit set/ }).click();
    await page.waitForTimeout(1000);
    console.log('test results:', (await L.text(page)).replace(/Skip to content[\s\S]*?Settings\n/, '').slice(0, 700));
    await L.shot(page, `j3-${vp}-12-test-results`);
    // ---- Review queue: make srs due now ----
    await page.evaluate(() => new Promise((res) => { const rq = indexedDB.open('cpa-study'); rq.onsuccess = () => { const tx = rq.result.transaction('srs', 'readwrite'); const st = tx.objectStore('srs'); const g = st.getAll(); g.onsuccess = () => { for (const s of g.result) { s.due = '2026-01-01T00:00:00.000Z'; st.put(s); } }; tx.oncomplete = () => res(); }; }));
    await page.goto(L.BASE + '#/review');
    await page.waitForTimeout(1000);
    await L.shot(page, `j3-${vp}-13-review-home`);
    console.log('review page:', (await L.text(page)).replace(/Skip to content[\s\S]*?Settings\n/, '').slice(0, 600));
    await page.getByRole('link', { name: /Review \d+ questions/ }).click();
    await page.waitForURL(/#\/quiz\//);
    await page.waitForTimeout(800);
    console.log('review session header', await page.locator('.sticky').first().innerText());
    const flagCheck = await page.getByRole('button', { name: /^Flag/ }).innerText();
    console.log('flag state on first review q', flagCheck);
    let cnt = 0;
    while (cnt++ < 30) {
      const before = await L.currentQid(page);
      if (!before) break;
      await answer(page, { right: cnt % 2 === 1, conf: 'Confident' });
      await page.waitForTimeout(1700);
      if ((await L.currentQid(page)) === before) {
        const nx = page.getByRole('button', { name: /Next question|See results/ });
        const t = await nx.innerText(); await nx.click(); if (/See results/.test(t)) break;
      }
    }
    await page.waitForTimeout(800);
    console.log('review results', (await L.text(page)).replace(/Skip to content[\s\S]*?Settings\n/, '').slice(0, 500));
    await L.shot(page, `j3-${vp}-14-review-results`);
    // flagged filter in builder
    await page.goto(L.BASE + '#/practice');
    await page.waitForTimeout(500);
    await page.locator('label:has-text("Area I") input[type=checkbox]').first().check();
    await page.selectOption('#status', 'flagged');
    console.log('flagged match', await page.locator('text=match your filters').innerText());
    await ctx.close();
  }
  L.saveLogs('j3');
  await b.close();
})().catch((e) => { console.error('FAIL', e); process.exit(1); });
