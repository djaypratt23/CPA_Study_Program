const L = require('./lib.cjs');
const fs = require('fs');
const path = require('path');
const load = (id) => JSON.parse(fs.readFileSync(path.join(L.ROOT, 'content', id.slice(0, 3), 'tbs', id + '.json'), 'utf8'));
const fmtN = (n, unit) => (unit === '%' ? `${n}%` : unit === '$' || !unit ? n.toLocaleString('en-US') : String(n));
async function fill(page, tbs, wrong) {
  const sections = page.locator('section.card');
  const log = [];
  for (let pi = 0; pi < tbs.parts.length; pi++) {
    const p = tbs.parts[pi];
    const sec = sections.nth(pi);
    if (p.kind === 'numeric') {
      for (const [ri, r] of p.rows.entries()) {
        let v = fmtN(r.answer, r.unit);
        if (wrong && ri === 0) { v = String(r.answer + 1000); log.push('numeric wrong ' + r.id); }
        await page.locator(`#${p.id}-${r.id}`).fill(v);
      }
    } else if (p.kind === 'dropdown') {
      for (const [ri, r] of p.rows.entries()) {
        let v = r.answer;
        const opts = r.options || p.options;
        if (wrong && ri === 0) { v = opts.find((o) => o !== r.answer); log.push('dropdown wrong ' + r.id); }
        await page.locator(`#${p.id}-${r.id}`).selectOption(v);
      }
    } else if (p.kind === 'journal') {
      for (const [li, l] of p.lines.entries()) {
        await sec.getByLabel(`Line ${li + 1} account`).selectOption(l.account);
        let amt = l.debit ?? l.credit;
        if (wrong && li === 0) { amt = amt + 500; log.push('journal wrong line1'); }
        await sec.getByLabel(`Line ${li + 1} ${l.debit !== undefined ? 'debit' : 'credit'}`).fill(amt.toLocaleString('en-US'));
      }
    } else if (p.kind === 'docreview') {
      let first = true;
      for (const s of p.segments) {
        if (!('id' in s)) continue;
        let v = s.answer;
        if (wrong && first && s.answer !== s.original) { v = s.original; log.push('docreview kept original ' + s.id); first = false; }
        await sec.locator(`select[aria-label="Replacement for: ${s.original.replace(/"/g, '\\"')}"]`).selectOption(v);
      }
    } else if (p.kind === 'research') {
      let target = p.answer;
      if (wrong) { target = p.excerpts.find((e) => e.id !== p.answer).id; log.push('research wrong'); }
      const ex = p.excerpts.find((e) => e.id === target);
      await sec.getByRole('searchbox').fill(ex.citation.split(' ')[1] || ex.citation);
      await sec.locator('label', { hasText: ex.citation }).first().click();
      await sec.getByRole('searchbox').fill('');
    } else if (p.kind === 'review') {
      const rows = sec.locator('tbody tr');
      for (const [ri, r] of p.rows.entries()) {
        const inErr = Math.abs(r.prepared - r.answer) > (r.tolerance || 0);
        const row = rows.nth(ri);
        if (inErr) {
          await row.locator('input[type=checkbox]').check();
          await row.locator('input:not([type=checkbox])').fill(r.answer.toLocaleString('en-US'));
        } else if (wrong && !log.some((x) => x.startsWith('review'))) {
          await row.locator('input[type=checkbox]').check();
          await row.locator('input:not([type=checkbox])').fill(r.prepared.toLocaleString('en-US'));
          log.push('review flagged correct row ' + r.id);
        }
      }
    }
  }
  return log;
}
const IDS = ['far-tbs-r3-deferred-tax', 'aud-tbs-r3-conduct-rules', 'aud-tbs-r3-rep-letter', 'far-tbs-u1-income-statement', 'far-tbs-u1-statement-review'];
(async () => {
  const b = await L.launch();
  for (const [vp, opts] of [['d', L.DESKTOP], ['m', L.PHONE]]) {
    const { ctx, page } = await L.newPage(b, opts, 'j5-' + vp);
    await L.onboard(page, { section: 'FAR', date: '2027-01-15' });
    await page.goto(L.BASE + '#/tbs');
    await page.waitForTimeout(1000);
    await L.shot(page, `j5-${vp}-00-tbs-list`);
    console.log('tbs list head', (await L.text(page)).replace(/Skip to content[\s\S]*?Settings\n/, '').slice(0, 500));
    for (const id of IDS) {
      const tbs = load(id);
      for (const wrong of [false, true]) {
        await page.goto(L.BASE + '#/tbs/' + id);
        await page.waitForSelector('text=Submit & see explanations', { timeout: 20000 }).catch(async () => {
          // maybe previously submitted
        });
        await page.waitForTimeout(600);
        if (await page.getByRole('button', { name: 'Try again from scratch' }).count()) { await page.getByRole('button', { name: 'Try again from scratch' }).click(); await page.waitForTimeout(500); }
        if (!wrong) await L.shot(page, `j5-${vp}-${id}-01-start`);
        const log = await fill(page, tbs, wrong);
        if (!wrong && id === 'far-tbs-r3-deferred-tax') {
          // reload mid-TBS
          const clock1 = await page.locator('span[aria-label^="Elapsed"]').innerText();
          await page.reload();
          await page.waitForSelector('text=Submit & see explanations');
          await page.waitForTimeout(800);
          const v = await page.locator('#n-ti').inputValue();
          const acct = await page.locator('section.card').nth(1).getByLabel('Line 1 account').inputValue();
          console.log('reload mid-TBS: numeric kept', v, 'journal acct kept', acct, 'clock', clock1, '->', await page.locator('span[aria-label^="Elapsed"]').innerText());
        }
        await L.shot(page, `j5-${vp}-${id}-${wrong ? 'b-partial' : 'a-perfect'}-filled`, true);
        await page.getByRole('button', { name: 'Submit & see explanations' }).click();
        await page.waitForTimeout(1200);
        const score = await page.locator('#tbs-results').innerText();
        const wrongCells = await page.locator('li.card.border-l-rose-500').allInnerTexts();
        console.log(vp, id, wrong ? 'PARTIAL' : 'PERFECT', '=>', score, '| mistakes injected', log.join('; '), '| wrong cells', wrongCells.map((t) => t.split('\n')[0]).join(' || '));
        await L.shot(page, `j5-${vp}-${id}-${wrong ? 'b-partial' : 'a-perfect'}-score`, false);
        if (wrong) await L.shot(page, `j5-${vp}-${id}-b-partial-full`, true);
      }
    }
    // TBS list after attempts
    await page.goto(L.BASE + '#/tbs');
    await page.waitForTimeout(800);
    await L.shot(page, `j5-${vp}-99-tbs-list-after`, true);
    await ctx.close();
  }
  L.saveLogs('j5');
  await b.close();
})().catch((e) => { console.error('FAIL', e); process.exit(1); });
