const L = require('./lib.cjs');
(async () => {
  const b = await L.launch();
  for (const [vp, opts] of [['d', L.DESKTOP], ['m', L.PHONE]]) {
    const { ctx, page } = await L.newPage(b, opts, 'j2-' + vp);
    await L.onboard(page, { section: 'FAR', date: '2027-01-15' });
    // Course
    if (vp === 'd') await page.getByRole('link', { name: 'Course', exact: true }).first().click();
    else await page.locator('nav[aria-label="Main"] >> text=Course').last().click();
    await page.waitForTimeout(800);
    await L.shot(page, `j2-${vp}-01-course`);
    console.log('course text head:', (await L.text(page)).slice(0, 800));
    await page.getByRole('link', { name: /Income statement, OCI/ }).first().click();
    await page.waitForSelector('text=The big idea');
    await page.waitForTimeout(1000);
    console.log('module url', page.url());
    await L.shot(page, `j2-${vp}-02-lesson-top`);
    // pre-question: choose wrong (a), then confidence Guess
    const groups = page.locator('[role=group]');
    console.log('inline question groups', await groups.count());
    const pre = groups.nth(0);
    // choose by text
    await pre.getByRole('radio', { name: /extraordinary item/ }).click();
    await pre.getByRole('button', { name: /Guess/ }).click();
    await page.waitForTimeout(500);
    console.log('pre feedback:', (await pre.innerText()).slice(0, 400));
    await L.shot(page, `j2-${vp}-03-prequestion-wrong`);
    // check 1 correct with Confident
    const chk1 = page.locator('[role=group][aria-label="Check your understanding"]').nth(0);
    await chk1.scrollIntoViewIfNeeded();
    await chk1.getByRole('radio', { name: /Sales commissions/ }).click();
    await chk1.getByRole('button', { name: /Confident/ }).click();
    await page.waitForTimeout(400);
    console.log('chk1 feedback:', (await chk1.innerText()).slice(0, 200));
    // mermaid rendered?
    const svgCount = await page.locator('svg[id^=mermaid], .mermaid svg, figure svg').count();
    console.log('mermaid svgs', svgCount);
    // worked example: click Show step
    const worked = page.locator('section[aria-label^="Worked example"]').first();
    await worked.scrollIntoViewIfNeeded();
    let n = 0;
    while (await worked.getByRole('button', { name: /Show step/ }).count() && n++ < 10) await worked.getByRole('button', { name: /Show step/ }).click();
    await L.shot(page, `j2-${vp}-04-worked`);
    // faded example
    const faded = page.locator('section[aria-label^="Your turn"]').first();
    await faded.scrollIntoViewIfNeeded();
    const inputs = faded.locator('input');
    console.log('faded inputs', await inputs.count(), 'inputmode', await inputs.first().getAttribute('inputmode'), 'type', await inputs.first().getAttribute('type'));
    const vals = ['320,000', '$150,000', '100000', '70000', '87000'];
    for (let i = 0; i < 5; i++) { await inputs.nth(i).fill(vals[i]); await inputs.nth(i).press('Enter'); }
    await page.waitForTimeout(300);
    console.log('faded text:', (await faded.innerText()).slice(0, 1500));
    await L.shot(page, `j2-${vp}-05-faded`);
    // check 2 wrong with Unsure
    const chk2 = page.locator('[role=group][aria-label="Check your understanding"]').nth(1);
    await chk2.scrollIntoViewIfNeeded();
    await chk2.getByRole('radio').nth(1).click();
    const selText = await chk2.getByRole('radio').nth(1).innerText();
    await chk2.getByRole('button', { name: /Unsure/ }).click();
    await page.waitForTimeout(400);
    console.log('chk2 picked', selText, 'feedback:', (await chk2.innerText()).slice(0, 300));
    await L.shot(page, `j2-${vp}-06-check2`);
    // Highlight: select a paragraph text in lesson body
    const para = page.locator('.prose-lesson p').nth(2);
    await para.scrollIntoViewIfNeeded();
    const ptxt = await para.innerText();
    if (vp === 'd') {
      const box = await para.boundingBox();
      await page.mouse.move(box.x + 2, box.y + 5); await page.mouse.down(); await page.mouse.move(box.x + 200, box.y + 5, { steps: 5 }); await page.mouse.up();
    } else {
      // programmatic selection on mobile
      await para.evaluate((el) => { const r = document.createRange(); r.selectNodeContents(el); const s = getSelection(); s.removeAllRanges(); s.addRange(r); });
    }
    await page.waitForTimeout(400);
    const saveBtn = page.getByRole('button', { name: /Save highlight/ });
    console.log('save highlight visible', await saveBtn.isVisible().catch(() => false));
    await L.shot(page, `j2-${vp}-07-selection`);
    if (await saveBtn.isVisible().catch(() => false)) await saveBtn.click();
    await page.waitForTimeout(500);
    // Notes
    const notes = page.getByLabel('Module notes');
    await notes.scrollIntoViewIfNeeded();
    await notes.fill('My note: unusual items stay pretax in continuing ops.');
    await page.waitForTimeout(1500);
    await L.shot(page, `j2-${vp}-08-notes`);
    // reload and check notes, highlight, scroll restore
    const scrollBefore = await page.evaluate(() => window.scrollY);
    await page.reload();
    await page.waitForSelector('text=The big idea');
    await page.waitForTimeout(1500);
    const scrollAfter = await page.evaluate(() => window.scrollY);
    console.log('scroll before/after reload', scrollBefore, scrollAfter);
    const notesVal = await page.getByLabel('Module notes').inputValue();
    console.log('notes after reload:', notesVal);
    const hl = await page.locator('text=Highlights').count();
    console.log('highlights section present', hl);
    // inline question state after reload
    console.log('pre-question state after reload:', (await page.locator('[role=group]').nth(0).innerText()).slice(0, 200));
    // Mark complete
    const btn = page.getByRole('button', { name: /Mark complete/ });
    await btn.scrollIntoViewIfNeeded();
    console.log('mark complete label', await btn.innerText());
    await L.shot(page, `j2-${vp}-09-before-complete`);
    await btn.click();
    await page.waitForTimeout(1200);
    console.log('after complete url', page.url());
    await L.shot(page, `j2-${vp}-10-after-complete`);
    console.log('after complete text', (await L.text(page)).slice(0, 800));
    // back to module
    await page.goto(L.BASE + '#/module/far-income-statement-oci');
    await page.waitForTimeout(1200);
    console.log('module after complete has warmup?', await page.locator('text=Warm-up').count(), 'chip', (await page.locator('header').innerText()).slice(0, 200));
    // Course page status
    await page.goto(L.BASE + '#/course');
    await page.waitForTimeout(800);
    const row = page.locator('li', { hasText: 'Income statement, OCI' }).first();
    console.log('course row', await row.innerText());
    // notes page
    await page.goto(L.BASE + '#/notes');
    await page.waitForTimeout(800);
    console.log('notes page:', (await L.text(page)).slice(0, 800));
    await L.shot(page, `j2-${vp}-11-notes-page`);
    await ctx.close();
  }
  L.saveLogs('j2');
  await b.close();
})().catch((e) => { console.error('FAIL', e); process.exit(1); });
