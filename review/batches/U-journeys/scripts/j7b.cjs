const L = require('./lib.cjs');
const fs = require('fs');
const DL = '/tmp/claude-0/-home-user-CPA-Study-Program/919ae4b5-e38d-5c69-9f4c-abdc45e71ff4/scratchpad/dl';
const Q = L.loadQuestions();
const clean = (t) => t.replace(/Skip to content[\s\S]*?Settings\n/, '');
(async () => {
  const b = await L.launch();
  for (const [vp, opts] of [['d', L.DESKTOP], ['m', L.PHONE]]) {
    const { ctx, page } = await L.newPage(b, { ...opts, acceptDownloads: true }, 'j7b-' + vp);
    const dialogs = [];
    page.on('dialog', async (d) => { dialogs.push(d.message()); await d.accept(); });
    await L.onboard(page, { section: 'FAR', date: '2027-01-15' });
    // --- generate data: lesson note + highlight, complete, practice 5 answers
    await page.goto(L.BASE + '#/module/far-income-statement-oci');
    await page.waitForSelector('text=Discontinued operations'); await page.waitForTimeout(600);
    const para = page.locator('p', { hasText: 'Held for sale' }).first();
    await para.evaluate((el) => { const r = document.createRange(); r.setStart(el.firstChild, 0); r.setEnd(el.lastChild, (el.lastChild.textContent || '').length); const s = getSelection(); s.removeAllRanges(); s.addRange(r); });
    await page.waitForTimeout(400);
    await page.getByRole('button', { name: /Save highlight/ }).click(); await page.waitForTimeout(300);
    await page.getByLabel('Module notes').fill('Note: unusual items stay pretax.'); await page.waitForTimeout(1300);
    await page.getByRole('button', { name: /Mark complete/ }).click(); await page.waitForURL(/#\/quiz\//); await page.waitForTimeout(600);
    for (let i = 0; i < 5; i++) {
      await page.waitForTimeout(300);
      const id = await L.currentQid(page); const q = Q[id];
      if (i === 1) { await page.getByRole('button', { name: /^Note/ }).click(); await page.getByLabel('Question note').fill('Q-note ' + id); await page.waitForTimeout(1200); await page.getByRole('button', { name: /^Flag/ }).click(); }
      const tgt = i % 2 ? q.choices.find((c) => c.id !== q.answer).id : q.answer;
      await page.locator(`[role=radio][data-choice="${tgt}"]`).click();
      await page.getByRole('button', { name: /^Unsure/ }).click(); await page.waitForTimeout(300);
      await page.getByRole('button', { name: /Next question/ }).click();
    }
    // --- Analytics
    await page.goto(L.BASE + '#/analytics'); await page.waitForTimeout(1200);
    await L.shot(page, `j7b-${vp}-01-analytics`, true);
    console.log(vp, 'ANALYTICS:', clean(await L.text(page)).slice(0, 1500).replace(/\n+/g, ' | '));
    console.log('overflow', await page.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]));
    // --- Search
    for (const term of ['deferred tax', 'ASC 842', 'goodwill impairment', 'zzqxv']) {
      await page.goto(L.BASE + '#/search'); await page.waitForTimeout(500);
      await page.fill('#q', term); await page.waitForTimeout(1200);
      const n = await page.locator('text=/\\d+ result\\(s\\)/').innerText().catch(() => 'no count');
      const first = await page.locator('ul li a').first().innerText().catch(() => '(none)');
      console.log(`SEARCH "${term}": ${n} | first: ${first.replace(/\n/g, ' / ').slice(0, 160)}`);
      if (term === 'deferred tax') await L.shot(page, `j7b-${vp}-02-search`);
      if (term === 'zzqxv') await L.shot(page, `j7b-${vp}-03-search-none`);
    }
    // click a question hit
    await page.fill('#q', 'deferred tax'); await page.waitForTimeout(1000);
    const qhit = page.locator('ul li a', { hasText: 'Question' }).first();
    if (await qhit.count()) { const t = await qhit.innerText(); await qhit.click(); await page.waitForTimeout(1000); console.log('question hit', t.replace(/\n/g, ' / ').slice(0, 120), '-> url', page.url(), '| page h1', await page.locator('h1').first().innerText()); await L.shot(page, `j7b-${vp}-04-search-question-hit`); }
    // --- Glossary
    await page.goto(L.BASE + '#/glossary'); await page.waitForTimeout(700);
    console.log('GLOSSARY header', await page.locator('h1 + p, header p').first().innerText().catch(() => ''));
    await page.getByLabel('Filter glossary').fill('goodwill'); await page.waitForTimeout(300);
    console.log('glossary goodwill', await page.locator('dl > div').count());
    await page.getByLabel('All sections').check(); await page.waitForTimeout(300);
    console.log('glossary goodwill all sections', await page.locator('dl > div').count());
    await L.shot(page, `j7b-${vp}-05-glossary`);
    // --- Notes
    await page.goto(L.BASE + '#/notes'); await page.waitForTimeout(800);
    console.log('NOTES:', clean(await L.text(page)).slice(0, 700).replace(/\n+/g, ' | '));
    await L.shot(page, `j7b-${vp}-06-notes`, true);
    // --- Settings: theme + font
    await page.goto(L.BASE + '#/settings'); await page.waitForTimeout(700);
    await page.getByRole('button', { name: 'Dark' }).click(); await page.locator('#font').fill('1.2'); await page.waitForTimeout(400);
    await L.shot(page, `j7b-${vp}-07-settings-dark`, true);
    console.log('html dark?', await page.evaluate(() => document.documentElement.className), 'font', await page.evaluate(() => document.documentElement.style.fontSize));
    console.log('SETTINGS data text:', (await page.locator('section[aria-labelledby=data]').innerText()).replace(/\n+/g, ' | '));
    if (vp === 'm') { await ctx.close(); continue; }
    // --- Export JSON + CSV
    let [dl] = await Promise.all([page.waitForEvent('download'), page.getByRole('button', { name: /Export backup/ }).click()]);
    const p1 = `${DL}/${vp}-backup1.json`; await dl.saveAs(p1);
    [dl] = await Promise.all([page.waitForEvent('download'), page.getByRole('button', { name: /Export attempts/ }).click()]);
    const pc = `${DL}/${vp}-attempts.csv`; await dl.saveAs(pc);
    const b1 = JSON.parse(fs.readFileSync(p1, 'utf8'));
    const counts = (bk) => Object.fromEntries(Object.entries(bk.tables).map(([k, v]) => [k, v.length]));
    console.log('export1 counts', JSON.stringify(counts(b1)), 'csv lines', fs.readFileSync(pc, 'utf8').trim().split('\n').length, 'csv head', fs.readFileSync(pc, 'utf8').split('\n')[0]);
    // --- invalid imports
    fs.writeFileSync(`${DL}/bad.json`, '{not json');
    fs.writeFileSync(`${DL}/other.json`, JSON.stringify({ app: 'other', tables: {} }));
    for (const f of ['bad.json', 'other.json']) {
      await page.locator('input[type=file]').setInputFiles(`${DL}/${f}`); await page.waitForTimeout(600);
      console.log('import', f, '->', await page.locator('p[role=status]').innerText());
    }
    await L.shot(page, `j7b-${vp}-08-import-error`);
    // --- Reset everything
    await page.getByRole('button', { name: 'Reset everything' }).click(); await page.waitForTimeout(1200);
    console.log('after reset url', page.url(), '| dialogs so far', dialogs.length);
    // can we reach settings/import before onboarding?
    await page.goto(L.BASE + '#/settings'); await page.waitForTimeout(800);
    console.log('settings before onboarding ->', page.url());
    await L.shot(page, `j7b-${vp}-09-after-reset-settings-redirect`);
    // onboard with different choices (AUD, no date) then import
    await L.onboard(page, { section: 'AUD', date: '' });
    await page.goto(L.BASE + '#/settings'); await page.waitForTimeout(700);
    const downloads = [];
    page.on('download', (d) => downloads.push(d.suggestedFilename()));
    await page.locator('input[type=file]').setInputFiles(p1); await page.waitForTimeout(2000);
    console.log('import dialog text:', dialogs[dialogs.length - 1]);
    console.log('import status:', await page.locator('p[role=status]').innerText(), '| pre-import download', downloads);
    await L.shot(page, `j7b-${vp}-10-import-done`);
    // re-export and compare
    [dl] = await Promise.all([page.waitForEvent('download'), page.getByRole('button', { name: /Export backup/ }).click()]);
    const p2 = `${DL}/${vp}-backup2.json`; await dl.saveAs(p2);
    const b2 = JSON.parse(fs.readFileSync(p2, 'utf8'));
    console.log('export2 counts', JSON.stringify(counts(b2)));
    const diffs = [];
    for (const t of Object.keys(b1.tables)) if (JSON.stringify(b1.tables[t]) !== JSON.stringify(b2.tables[t])) diffs.push(t);
    console.log('round-trip differing tables:', diffs);
    if (diffs.includes('settings')) { const a = b1.tables.settings[0], c = b2.tables.settings[0]; for (const k of new Set([...Object.keys(a), ...Object.keys(c)])) if (JSON.stringify(a[k]) !== JSON.stringify(c[k])) console.log('  settings.' + k, JSON.stringify(a[k]), '->', JSON.stringify(c[k])); }
    for (const t of diffs.filter((x) => x !== 'settings')) { console.log('  ', t, JSON.stringify(b1.tables[t]).slice(0, 200), ' VS ', JSON.stringify(b2.tables[t]).slice(0, 200)); }
    // UI after import: dashboard + notes + section
    await page.goto(L.BASE + '#/'); await page.waitForTimeout(900);
    console.log('dashboard after import:', clean(await L.text(page)).slice(0, 300).replace(/\n+/g, ' | '));
    await L.shot(page, `j7b-${vp}-11-dashboard-after-import`);
    await page.goto(L.BASE + '#/notes'); await page.waitForTimeout(700);
    console.log('notes after import:', clean(await L.text(page)).slice(0, 300).replace(/\n+/g, ' | '));
    console.log('all dialogs:', JSON.stringify(dialogs));
    await ctx.close();
  }
  L.saveLogs('j7b');
  await b.close();
})().catch((e) => { console.error('FAIL', e); process.exit(1); });
