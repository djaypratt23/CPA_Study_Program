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
module.exports = { load, fill };
