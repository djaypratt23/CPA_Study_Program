const L = require('./lib.cjs');
(async () => {
  const b = await L.launch();
  for (const [vp, opts] of [['d', L.DESKTOP], ['m', L.PHONE]]) {
    const { ctx, page } = await L.newPage(b, opts, 'j2b-' + vp);
    await L.onboard(page, { section: 'FAR', date: '2027-01-15' });
    await page.goto(L.BASE + '#/module/far-income-statement-oci');
    await page.waitForSelector('text=Discontinued operations');
    await page.waitForTimeout(800);
    const para = page.locator('p', { hasText: 'Held for sale' }).first();
    await para.scrollIntoViewIfNeeded();
    if (vp === 'd') {
      const box = await para.boundingBox();
      await page.mouse.move(box.x + 2, box.y + 8); await page.mouse.down(); await page.mouse.move(box.x + 300, box.y + 8, { steps: 8 }); await page.mouse.up();
    } else {
      await para.evaluate((el) => { const r = document.createRange(); r.setStart(el.firstChild, 0); r.setEnd(el.lastChild, (el.lastChild.textContent||'').length); const s = getSelection(); s.removeAllRanges(); s.addRange(r); });
    }
    await page.waitForTimeout(500);
    const saveBtn = page.getByRole('button', { name: /Save highlight/ });
    const vis = await saveBtn.isVisible().catch(() => false);
    console.log(vp, 'save highlight visible', vis);
    await L.shot(page, `j2b-${vp}-01-body-selection`);
    if (vis) { await saveBtn.click(); await page.waitForTimeout(500); }
    // Is the highlight visible inline in lesson? check <mark> or css highlight
    const inlineMark = await page.evaluate(() => document.querySelectorAll('mark').length + (CSS.highlights ? CSS.highlights.size : 0));
    console.log('inline marks / css highlights in lesson after save', inlineMark);
    const hlList = page.locator('h3', { hasText: 'Highlights' });
    console.log('highlights list present', await hlList.count());
    if (await hlList.count()) { await hlList.scrollIntoViewIfNeeded(); await L.shot(page, `j2b-${vp}-02-highlight-list`); }
    // Inline question highlight tool sharing a global name: highlight in chk1 then in chk2
    const chk = page.locator('[role=group][aria-label="Check your understanding"]');
    if (vp === 'd') {
      for (let k = 0; k < 2; k++) {
        const stem = chk.nth(k).locator('[id^=stem-] p').first();
        await stem.scrollIntoViewIfNeeded();
        await stem.evaluate((el) => { const r = document.createRange(); r.setStart(el.firstChild, 0); r.setEnd(el.firstChild, 12); const s = getSelection(); s.removeAllRanges(); s.addRange(r); });
        await chk.nth(k).getByRole('button', { name: 'Highlight selection' }).click();
        await page.waitForTimeout(200);
        const sz = await page.evaluate(() => { const h = CSS.highlights.get('exam-highlight'); return h ? h.size : 0; });
        console.log('after highlighting in check', k, 'global exam-highlight ranges =', sz);
        console.log('  floating Save highlight visible?', await saveBtn.isVisible().catch(() => false));
      }
      await chk.nth(0).scrollIntoViewIfNeeded();
      await L.shot(page, `j2b-${vp}-03-check1-highlight-after-check2`);
    }
    // Scroll restore: scroll to ~40% and reload
    await page.evaluate(() => window.scrollTo(0, (document.body.scrollHeight - innerHeight) * 0.4));
    await page.waitForTimeout(900);
    const before = await page.evaluate(() => [window.scrollY, document.body.scrollHeight]);
    await page.reload();
    await page.waitForSelector('text=Discontinued operations');
    await page.waitForTimeout(1500);
    const after = await page.evaluate(() => [window.scrollY, document.body.scrollHeight]);
    console.log('scroll restore before', before, 'after', after);
    // Navigate away and come back via dashboard "where you left off"
    await page.goto(L.BASE + '#/');
    await page.waitForTimeout(800);
    console.log('dashboard left off:', await page.locator('text=Where you left off').count(), (await page.locator('a.block').first().innerText()).replace(/\n/g, ' | '));
    await ctx.close();
  }
  L.saveLogs('j2b');
  await b.close();
})().catch((e) => { console.error('FAIL', e); process.exit(1); });
