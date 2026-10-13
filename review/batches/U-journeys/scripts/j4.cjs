const L = require('./lib.cjs');
(async () => {
  const b = await L.launch();
  for (const [vp, opts] of [['d', L.DESKTOP], ['m', L.PHONE]]) {
    const { ctx, page } = await L.newPage(b, opts, 'j4-' + vp);
    await L.onboard(page, { section: 'FAR', date: '2027-01-15' });
    // Flashcards before any lesson complete
    await page.goto(L.BASE + '#/review');
    await page.waitForTimeout(1000);
    console.log('review before lessons:', (await L.text(page)).replace(/Skip to content[\s\S]*?Settings\n/, '').slice(0, 400));
    await L.shot(page, `j4-${vp}-01-review-empty`);
    await page.goto(L.BASE + '#/module/far-income-statement-oci');
    await page.waitForSelector('text=The big idea');
    await page.getByRole('button', { name: /Mark complete/ }).click();
    await page.waitForURL(/#\/quiz\//);
    await page.goto(L.BASE + '#/review');
    await page.waitForTimeout(1000);
    const studyBtn = page.getByRole('button', { name: /Study \d+ cards/ });
    console.log('study btn', await studyBtn.innerText());
    await studyBtn.click();
    await page.waitForTimeout(500);
    await L.shot(page, `j4-${vp}-02-card-front`);
    console.log('front:', (await L.text(page)).replace(/Skip to content[\s\S]*?Settings\n/, '').slice(0, 500));
    console.log('exit/back controls in session:', await page.getByRole('button', { name: /End|Exit|Stop|Finish|Back/ }).count(), await page.getByRole('link', { name: /Back/ }).count());
    const grades = ['Again', 'Hard', 'Good', 'Easy', 'Good', 'Good', 'Again', 'Good', 'Good', 'Good', 'Good', 'Good'];
    let i = 0;
    const seen = [];
    while (i < 20) {
      const left = await page.locator('text=/\\d+ left in this session/').innerText().catch(() => null);
      if (!left) break;
      const front = await page.locator('[role=group][aria-label=Flashcard]').innerText();
      seen.push(front.slice(0, 40));
      if (vp === 'd' && i % 2 === 0) await page.keyboard.press(' ');
      else if (vp === 'm' && i % 2 === 0) await page.locator('[role=group][aria-label=Flashcard]').tap();
      else await page.getByRole('button', { name: 'Show answer' }).click();
      await page.waitForTimeout(200);
      if (i === 0) { await L.shot(page, `j4-${vp}-03-card-back`); console.log('grade buttons', await page.locator('.grid-cols-4 button').allInnerTexts()); }
      const g = grades[i] || 'Good';
      if (vp === 'd' && i % 3 === 1) await page.keyboard.press(String(['Again', 'Hard', 'Good', 'Easy'].indexOf(g) + 1));
      else await page.locator('.grid-cols-4 button', { hasText: g }).click();
      await page.waitForTimeout(250);
      console.log(i, left, g);
      i++;
      if (i === 4) {
        // reload mid-session
        await page.reload();
        await page.waitForTimeout(1200);
        console.log('after reload mid-session:', (await L.text(page)).replace(/Skip to content[\s\S]*?Settings\n/, '').slice(0, 300));
        await L.shot(page, `j4-${vp}-04-after-reload`);
        const sb = page.getByRole('button', { name: /Study \d+ cards/ });
        if (await sb.count()) { console.log('resume btn', await sb.innerText()); await sb.click(); await page.waitForTimeout(400); }
      }
    }
    console.log('seen', seen.length);
    await L.shot(page, `j4-${vp}-05-done`);
    console.log('done screen:', (await L.text(page)).replace(/Skip to content[\s\S]*?Settings\n/, '').slice(0, 400));
    // Decks page
    await page.goto(L.BASE + '#/flashcards?module=far-income-statement-oci');
    await page.waitForTimeout(800);
    await L.shot(page, `j4-${vp}-06-decks-focus`);
    const focusBtn = page.getByRole('button', { name: /Study this deck/ });
    console.log('focus btn', await focusBtn.innerText());
    const deckRow = page.locator('li', { hasText: 'Income statement, OCI' }).first();
    console.log('deck row', await deckRow.innerText());
    await focusBtn.click();
    await page.waitForTimeout(400);
    console.log('session size', await page.locator('text=/\\d+ left in this session/').innerText());
    // Try to leave the session through the "Flashcard decks" navigation entry (same route)
    if (vp === 'd') await page.locator('aside').getByRole('link', { name: 'Flashcard decks' }).click();
    else { await page.getByRole('button', { name: 'More' }).click(); await page.locator('#more-menu').getByRole('link', { name: 'Flashcard decks' }).click(); }
    await page.waitForTimeout(600);
    console.log('after clicking Flashcard decks nav: url', page.url(), 'still in session?', await page.locator('text=/left in this session/').count());
    await L.shot(page, `j4-${vp}-07-nav-decks-still-in-session`);
    // other deck with no lesson studied: Balance sheet
    await page.goto(L.BASE + '#/');
    await page.goto(L.BASE + '#/flashcards');
    await page.waitForTimeout(800);
    const bs = page.locator('li', { hasText: 'Balance sheet' }).first();
    console.log('bs deck', await bs.innerText());
    await bs.getByRole('button', { name: 'Study' }).click();
    await page.waitForTimeout(400);
    console.log('bs session size', await page.locator('text=/\\d+ left in this session/').innerText());
    // markdown/back overflow on mobile
    const ov = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
    console.log('overflow', ov);
    // try navigating away via header: is there an exit? Press Escape
    await page.keyboard.press('Escape');
    console.log('still in session after Esc', await page.locator('text=/left in this session/').count());
    await ctx.close();
  }
  L.saveLogs('j4');
  await b.close();
})().catch((e) => { console.error('FAIL', e); process.exit(1); });
