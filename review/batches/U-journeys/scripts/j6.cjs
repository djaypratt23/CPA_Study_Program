const L = require('./lib.cjs');
const { load, fill } = require('./tbsfill.cjs');
const Q = L.loadQuestions();
const form = JSON.parse(require('fs').readFileSync(L.ROOT + '/content/far/exams/far-mock-1.json', 'utf8'));
const clock = async (page) => (await page.locator('span[aria-label^="Time remaining"]').getAttribute('aria-label')).replace('Time remaining ', '');
const toSec = (c) => c.split(':').reduce((a, b) => a * 60 + Number(b), 0);
const readSession = (page) => page.evaluate(() => new Promise((res) => { const rq = indexedDB.open('cpa-study'); rq.onsuccess = () => { const g = rq.result.transaction('examSessions').objectStore('examSessions').getAll(); g.onsuccess = () => res(g.result); }; }));
(async () => {
  const b = await L.launch();
  // ---------------- desktop full run ----------------
  {
    const { ctx, page } = await L.newPage(b, L.DESKTOP, 'j6-d');
    await L.onboard(page, { section: 'FAR', date: '2027-01-15' });
    await page.goto(L.BASE + '#/exam');
    await page.waitForTimeout(800);
    await L.shot(page, 'j6-d-01-exam-home', true);
    console.log('exam home', (await L.text(page)).replace(/Skip to content[\s\S]*?Settings\n/, '').slice(0, 900));
    await page.getByRole('button', { name: 'Start' }).first().click();
    await page.waitForURL(/#\/exam\/exam-/);
    await page.waitForTimeout(1000);
    const examUrl = page.url();
    console.log('start clock', await clock(page));
    await L.shot(page, 'j6-d-02-testlet1-q1');
    let right = 0, total = 0;
    const answerCur = async (ok, viaKey) => {
      await page.waitForTimeout(200);
      const id = await L.currentQid(page);
      const q = Q[id];
      const target = ok ? q.answer : q.choices.find((c) => c.id !== q.answer).id;
      if (viaKey) {
        const btns = page.locator('[role=radio][data-choice]');
        const n = await btns.count();
        for (let i = 0; i < n; i++) if ((await btns.nth(i).getAttribute('data-choice')) === target) await page.keyboard.press('abcde'[i]);
      } else await page.locator(`[role=radio][data-choice="${target}"]`).click();
      await page.waitForTimeout(150);
      return id;
    };
    // T1: Q1 right click; Q2 wrong keyboard; flag Q3; strike & highlight on Q3; jump to Q10 via navigator
    const t1answers = {};
    let id = await answerCur(true, false); t1answers[id] = true;
    await page.getByRole('button', { name: 'Next →' }).click();
    id = await answerCur(false, true); t1answers[id] = false;
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(300);
    await page.getByRole('button', { name: /Flag for review/ }).click();
    await page.locator('button[aria-label^="Strike out choice"]').nth(1).click();
    const stem = page.locator('[id^=stem-] p').first();
    await stem.evaluate((el) => { const r = document.createRange(); r.setStart(el.firstChild, 0); r.setEnd(el.firstChild, Math.min(20, el.firstChild.length)); const s = getSelection(); s.removeAllRanges(); s.addRange(r); });
    await page.getByRole('button', { name: 'Highlight selection' }).click();
    await page.waitForTimeout(300);
    await L.shot(page, 'j6-d-03-flag-strike-highlight');
    // Calculator
    await page.getByRole('button', { name: 'Calculator' }).click();
    for (const k of ['1', '2', '3', '4', '*', '5', 'Enter']) await page.keyboard.press(k);
    console.log('calc 1234*5 =', await page.locator('[role=dialog][aria-label=Calculator] output').innerText());
    for (const k of ['C']) await page.locator('[role=dialog][aria-label=Calculator] button', { hasText: /^C$/ }).click();
    for (const k of ['1', '0', '0', '/', '3', 'Enter']) await page.keyboard.press(k);
    console.log('calc 100/3 =', await page.locator('[role=dialog][aria-label=Calculator] output').innerText());
    await page.keyboard.press('Backspace');
    console.log('after Backspace', await page.locator('[role=dialog][aria-label=Calculator] output').innerText());
    await L.shot(page, 'j6-d-04-calculator');
    await page.keyboard.press('Escape');
    console.log('calc closed', await page.locator('[role=dialog][aria-label=Calculator]').count());
    // Spreadsheet
    await page.getByRole('button', { name: 'Spreadsheet' }).click();
    await page.locator('#sheet-A1').click(); await page.keyboard.type('1500'); await page.keyboard.press('Enter');
    await page.locator('#sheet-A2').click(); await page.keyboard.type('2500'); await page.keyboard.press('Enter');
    await page.locator('#sheet-A3').click(); await page.keyboard.type('=SUM(A1:A2)*0.25'); await page.keyboard.press('Enter');
    await page.waitForTimeout(200);
    console.log('sheet A3', await page.locator('#sheet-A3').innerText().catch(() => '?'), await page.locator('#sheet-A3').inputValue().catch(() => ''));
    await L.shot(page, 'j6-d-05-spreadsheet');
    await page.getByRole('button', { name: 'Close spreadsheet' }).click();
    // reopen calc: memory/state kept?
    await page.getByRole('button', { name: 'Calculator' }).click();
    console.log('calc display after reopen', await page.locator('[role=dialog][aria-label=Calculator] output').innerText());
    await page.getByRole('button', { name: 'Close calculator' }).click();
    // answer Q3 right
    id = await answerCur(true, false); t1answers[id] = true;
    // jump to Q10
    await page.getByRole('button', { name: /^Question 10/ }).click();
    await page.waitForTimeout(300);
    id = await answerCur(true, false); t1answers[id] = true;
    // reload mid-mock
    const c1 = await clock(page);
    await page.waitForTimeout(2000);
    await page.reload();
    await page.waitForTimeout(1500);
    const c2 = await clock(page);
    const sess = (await readSession(page))[0];
    console.log('reload mid-mock: clock', c1, '->', c2, '| on Q', sess.testlets[0].index + 1, '| answers', Object.keys(sess.testlets[0].mcqAnswers).length, '| flags', JSON.stringify(sess.testlets[0].flags));
    console.log('navigator labels', (await page.locator('nav[aria-label="Question navigator"] button').evaluateAll((els) => els.slice(0, 4).map((e) => e.getAttribute('aria-label')))).join(' | '));
    console.log('highlight after reload', await page.evaluate(() => (CSS.highlights.get('exam-highlight') || { size: 0 }).size));
    await L.shot(page, 'j6-d-06-after-reload');
    // answer all remaining T1: 80% right
    for (let i = 0; i < 25; i++) {
      await page.locator('nav[aria-label="Question navigator"] button').nth(i).click();
      await page.waitForTimeout(150);
      const cid = await L.currentQid(page);
      if (t1answers[cid] !== undefined) continue;
      const ok = i % 5 !== 4;
      await answerCur(ok, false); t1answers[cid] = ok;
    }
    right += Object.values(t1answers).filter(Boolean).length; total += 25;
    // Submit testlet
    await page.getByRole('button', { name: 'Submit testlet' }).click();
    await L.shot(page, 'j6-d-07-submit-confirm');
    console.log('confirm text', await page.locator('.card.border-amber-400').innerText());
    await page.locator('.card.border-amber-400').getByRole('button', { name: 'Submit testlet' }).click();
    await page.waitForTimeout(800);
    console.log('after submit T1 header', await page.locator('header').first().innerText());
    // try going back
    await page.goBack();
    await page.waitForTimeout(800);
    console.log('after browser back url', page.url());
    if (!page.url().includes('/exam/exam-')) { await page.goto(examUrl); await page.waitForTimeout(800); }
    console.log('testlet after back', await page.locator('header').first().innerText());
    // T2: answer 20 of 25, 60% right
    const t2 = {};
    for (let i = 0; i < 20; i++) {
      await page.locator('nav[aria-label="Question navigator"] button').nth(i).click();
      await page.waitForTimeout(120);
      const cid = await L.currentQid(page);
      const ok = i % 5 < 3;
      await answerCur(ok, false); t2[cid] = ok;
    }
    right += Object.values(t2).filter(Boolean).length; total += 25;
    await page.getByRole('button', { name: 'Submit testlet' }).click();
    console.log('confirm text T2 (5 unanswered)', await page.locator('.card.border-amber-400').innerText());
    await page.locator('.card.border-amber-400').getByRole('button', { name: 'Submit testlet' }).click();
    await page.waitForTimeout(800);
    // T3: TBS x2: first perfect, second partial
    await L.shot(page, 'j6-d-08-testlet3-tbs', false);
    const tbsPct = [];
    const fillTbs = async (idx, wrong) => {
      await page.locator('nav[aria-label="Simulations in this testlet"] button').nth(idx).click();
      await page.waitForTimeout(400);
      const sess2 = (await readSession(page))[0];
      const tl = sess2.testlets[sess2.testletIndex];
      const tid = tl.items[idx];
      const log = await fill(page, load(tid), wrong);
      return { tid, log };
    };
    let r1 = await fillTbs(0, false);
    let r2 = await fillTbs(1, true);
    console.log('T3 filled', r1, r2);
    // switch back to TBS 1: still filled?
    await page.locator('nav[aria-label="Simulations in this testlet"] button').nth(0).click();
    await page.waitForTimeout(300);
    console.log('TBS1 first input still filled', await page.locator('section.card input').first().inputValue().catch(() => '?'));
    await page.getByRole('button', { name: 'Submit testlet' }).click();
    await page.locator('.card.border-amber-400').getByRole('button', { name: 'Submit testlet' }).click();
    await page.waitForTimeout(800);
    await L.shot(page, 'j6-d-09-break-offer');
    const cb1 = await clock(page); await page.waitForTimeout(3000); const cb2 = await clock(page);
    console.log('break offered: clock', cb1, cb2, (await L.text(page)).slice(0, 300));
    await page.getByRole('button', { name: 'Take break' }).click();
    await page.waitForTimeout(500);
    const br1 = await page.locator('span[aria-label^="Break remaining"]').getAttribute('aria-label');
    const ce1 = await clock(page);
    await page.waitForTimeout(3000);
    console.log('on break: break', br1, '->', await page.locator('span[aria-label^="Break remaining"]').getAttribute('aria-label'), '| exam clock', ce1, '->', await clock(page));
    await L.shot(page, 'j6-d-10-break');
    // reload during break
    await page.reload(); await page.waitForTimeout(1200);
    console.log('after reload on break:', await page.locator('h1').first().innerText(), await page.locator('span[aria-label^="Break remaining"]').getAttribute('aria-label').catch(() => 'none'));
    await page.getByRole('button', { name: 'Resume exam' }).click();
    await page.waitForTimeout(800);
    const ca = await clock(page); await page.waitForTimeout(2500); console.log('after resume clock runs', ca, '->', await clock(page));
    // T4: three TBS: fill first perfectly, leave others blank
    r1 = await fillTbs(0, false);
    console.log('T4 filled', r1);
    await page.getByRole('button', { name: 'Submit testlet' }).click();
    await page.locator('.card.border-amber-400').getByRole('button', { name: 'Submit testlet' }).click();
    await page.waitForTimeout(800);
    // T5: last testlet
    console.log('T5 header', await page.locator('header').first().innerText());
    r1 = await fillTbs(1, false);
    const lastBtn = page.getByRole('button', { name: /Submit exam/ });
    console.log('last-testlet button', await lastBtn.innerText());
    await lastBtn.click();
    console.log('final confirm text', await page.locator('.card.border-amber-400').innerText());
    await L.shot(page, 'j6-d-11-final-confirm');
    await page.locator('.card.border-amber-400').getByRole('button', { name: /Submit/ }).click();
    await page.waitForTimeout(2000);
    await L.shot(page, 'j6-d-12-results', true);
    console.log('results', (await page.locator('main, body').first().innerText()).slice(0, 2500));
    console.log('MCQ expected', right, '/', total, (right / total * 100).toFixed(1) + '%');
    const fin = (await readSession(page))[0];
    console.log('stored result', JSON.stringify(fin.result).slice(0, 600));
    // open a review item
    await page.locator('li.card button').first().click();
    await page.waitForTimeout(500);
    await L.shot(page, 'j6-d-13-results-review-item');
    const addBtn = page.getByRole('button', { name: /Add missed questions/ });
    await addBtn.click(); await page.waitForTimeout(500);
    console.log('add missed', await page.locator('[role=status]').last().innerText());
    // exam home after
    await page.goto(L.BASE + '#/exam'); await page.waitForTimeout(800);
    console.log('exam home after', (await L.text(page)).replace(/Skip to content[\s\S]*?Settings\n/, '').slice(-400));
    await L.shot(page, 'j6-d-14-exam-home-after', true);
    // Analytics afterwards
    await page.goto(L.BASE + '#/analytics'); await page.waitForTimeout(1000);
    await L.shot(page, 'j6-d-15-analytics-after-mock', true);
    await ctx.close();
  }
  // ---------------- phone: tools layout, tab lock, save & exit ----------------
  {
    const { ctx, page } = await L.newPage(b, L.PHONE, 'j6-m');
    await L.onboard(page, { section: 'FAR', date: '2027-01-15' });
    await page.goto(L.BASE + '#/exam'); await page.waitForTimeout(800);
    await page.getByRole('button', { name: 'Start' }).first().click();
    await page.waitForURL(/#\/exam\/exam-/); await page.waitForTimeout(1000);
    await L.shot(page, 'j6-m-01-testlet1');
    const ov = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
    console.log('phone overflow', ov, 'header', await page.locator('header').first().innerText());
    await page.getByRole('button', { name: 'Calculator' }).tap();
    await page.waitForTimeout(300);
    await L.shot(page, 'j6-m-02-calculator-overlay');
    const cbox = await page.locator('[role=dialog][aria-label=Calculator]').boundingBox();
    console.log('calc box', cbox);
    await page.getByRole('button', { name: 'Close calculator' }).tap();
    await page.getByRole('button', { name: 'Spreadsheet' }).tap();
    await page.waitForTimeout(300);
    await L.shot(page, 'j6-m-03-spreadsheet-overlay');
    console.log('sheet box', await page.locator('[role=dialog][aria-label=Spreadsheet]').boundingBox());
    await page.getByRole('button', { name: 'Close spreadsheet' }).tap();
    // second tab
    const p2 = await ctx.newPage(); L.attach(p2, 'j6-m-tab2');
    await p2.goto(page.url()); await p2.waitForTimeout(1500);
    console.log('tab2:', (await p2.locator('body').innerText()).slice(0, 200));
    await L.shot(p2, 'j6-m-04-second-tab');
    await p2.close();
    await page.waitForTimeout(500);
    // Save & exit
    await page.getByRole('link', { name: 'Save & exit' }).tap();
    await page.waitForTimeout(800);
    await L.shot(page, 'j6-m-05-exam-home-resume');
    console.log('exam home resume', await page.getByRole('link', { name: /Resume exam/ }).count());
    await ctx.close();
  }
  L.saveLogs('j6');
  await b.close();
})().catch((e) => { console.error('FAIL', e); process.exit(1); });
