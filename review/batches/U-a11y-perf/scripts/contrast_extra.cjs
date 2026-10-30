// Non-text contrast (WCAG 1.4.11) and focus-indicator contrast that axe does not test, in light and dark.
// Usage: node contrast_extra.cjs
const L = require('./lib.cjs');
const out = {};

const HELPERS = () => {
  const cv = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
  window.__rgb = (c) => {
    cv.clearRect(0, 0, 1, 1);
    cv.fillStyle = '#000';
    cv.fillStyle = c;
    cv.fillRect(0, 0, 1, 1);
    const d = cv.getImageData(0, 0, 1, 1).data;
    return [d[0], d[1], d[2], d[3] / 255];
  };
  // Composite the background behind an element (walk up until opaque).
  window.__bg = (el) => {
    const layers = [];
    for (let e = el; e; e = e.parentElement) {
      const c = window.__rgb(getComputedStyle(e).backgroundColor);
      if (c[3] > 0) layers.push(c);
      if (c[3] >= 1) break;
    }
    let acc = [255, 255, 255];
    for (const c of layers.reverse()) acc = acc.map((v, i) => v * (1 - c[3]) + c[i] * c[3]);
    return acc.map(Math.round);
  };
  const lum = ([r, g, b]) => {
    const f = (v) => ((v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  window.__cr = (a, b) => {
    const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
    return Math.round(((x + 0.05) / (y + 0.05)) * 100) / 100;
  };
};

async function measure(page, label, selector, kind) {
  return page.evaluate(
    ({ label, selector, kind }) => {
      const el = document.querySelector(selector);
      if (!el) return { label, missing: selector };
      const cs = getComputedStyle(el);
      const r = {};
      if (kind === 'border') {
        const border = window.__rgb(cs.borderTopColor);
        const behind = window.__bg(el.parentElement);
        const inside = window.__bg(el);
        r.border = border; r.behind = behind; r.inside = inside;
        r.ratio_vs_behind = window.__cr(border.slice(0, 3), behind);
        r.ratio_vs_inside = window.__cr(border.slice(0, 3), inside);
      } else if (kind === 'outline') {
        const o = window.__rgb(cs.outlineColor);
        const behind = window.__bg(el.parentElement);
        r.outline = `${cs.outlineStyle} ${cs.outlineWidth} offset ${cs.outlineOffset}`;
        r.color = o; r.behind = behind; r.ratio = window.__cr(o.slice(0, 3), behind);
      } else if (kind === 'fill') {
        const f = window.__bg(el);
        const behind = window.__bg(el.parentElement);
        r.fill = f; r.behind = behind; r.ratio = window.__cr(f, behind);
      }
      return { label, selector, ...r };
    },
    { label, selector, kind },
  );
}
async function focusByTab(page, pred, max = 80) {
  for (let i = 0; i < max; i++) {
    await page.keyboard.press('Tab');
    const ok = await page.evaluate(pred);
    if (ok) return true;
  }
  return false;
}

(async () => {
  const browser = await L.launch();
  for (const theme of ['light', 'dark']) {
    const res = [];
    const { page } = await L.newCtx(browser, L.DESKTOP, theme);
    await L.onboard(page);
    await page.evaluate(HELPERS);
    await focusByTab(page, () => /Study next/.test(document.activeElement.innerText));
    await L.sleep(400);
    res.push(await measure(page, 'focus ring: dashboard "Study next" card', ':focus', 'outline'));
    await focusByTab(page, () => document.activeElement.getAttribute('href') === '#/plan');
    await L.sleep(400);
    res.push(await measure(page, 'focus ring: text link on card', ':focus', 'outline'));
    res.push(await measure(page, 'progress bar fill vs track', '[role=progressbar] > div', 'fill'));
    res.push(await measure(page, 'progress bar track vs card', '[role=progressbar]', 'fill'));
    res.push(await measure(page, 'section switcher <select> border', 'aside select', 'border'));

    await L.go(page, '/practice/start?module=far-income-statement-oci');
    await page.waitForURL(/#\/quiz\//);
    await L.waitIdle(page);
    await page.evaluate(HELPERS);
    res.push(await measure(page, 'answer choice (radio card) border', '[role=radio]', 'border'));
    res.push(await measure(page, 'confidence button border (disabled)', 'fieldset button', 'border'));
    await page.locator('[role=radio]').first().click();
    await L.sleep(300);
    res.push(await measure(page, 'selected choice border', '[role=radio][aria-checked=true]', 'border'));
    res.push(await measure(page, 'confidence button border (enabled)', 'fieldset button', 'border'));
    await page.getByRole('button', { name: 'Note' }).click();
    res.push(await measure(page, 'textarea (.input) border', 'textarea', 'border'));

    await L.go(page, '/tbs/far-tbs-r3-deferred-tax', 'h1');
    await page.evaluate(HELPERS);
    res.push(await measure(page, 'TBS amount input border', 'section input', 'border'));
    res.push(await measure(page, 'TBS journal account select border', 'section select', 'border'));

    await L.go(page, '/exam', 'h1');
    await page.getByRole('button', { name: 'Start' }).first().click();
    await page.waitForURL(/#\/exam\/exam-/);
    await L.waitIdle(page);
    await page.evaluate(HELPERS);
    res.push(await measure(page, 'exam navigator: unanswered question button vs page', 'nav[aria-label="Question navigator"] button:nth-child(2)', 'fill'));
    await focusByTab(page, () => document.activeElement.getAttribute('aria-label') === 'Calculator');
    await L.sleep(400);
    res.push(await measure(page, 'focus ring: exam header Calculator button (on slate-800 bar)', ':focus', 'outline'));
    await page.keyboard.press('Enter');
    await page.keyboard.press('Escape');
    await page.getByRole('button', { name: 'Spreadsheet' }).click();
    await page.locator('#sheet-A1').focus();
    await L.sleep(300);
    res.push(
      await page.evaluate(() => {
        const a = document.getElementById('sheet-A1');
        const b = document.getElementById('sheet-B1');
        const fa = window.__bg(a), fb = window.__bg(b);
        return { label: 'spreadsheet: focused cell vs unfocused cell (only focus cue; outline:none)', focused: fa, unfocused: fb, ratio: window.__cr(fa, fb), outline: getComputedStyle(a).outlineStyle };
      }),
    );
    res.push(await measure(page, 'spreadsheet cell border', '#sheet-B2', 'border'));
    await page.keyboard.press('Escape');

    // Mermaid label text vs node fill (axe cannot test text inside the role=img SVG)
    await L.go(page, '/module/far-income-statement-oci', 'text=The big idea');
    await page.waitForSelector('figure svg .node', { timeout: 20000 }).catch(() => {});
    await page.evaluate(HELPERS);
    res.push(
      await page.evaluate(() => {
        const node = document.querySelector('figure svg .node');
        const shape = node && node.querySelector('rect,polygon,path');
        const label = node && node.querySelector('.nodeLabel, span, p, text');
        if (!shape || !label) return { label: 'mermaid node', missing: true };
        const fill = window.__rgb(getComputedStyle(shape).fill).slice(0, 3);
        const txt = window.__rgb(getComputedStyle(label).color).slice(0, 3);
        const edge = document.querySelector('figure svg .edgeLabel, figure svg .labelBkg');
        const e = edge ? { color: window.__rgb(getComputedStyle(edge.querySelector('p,span') || edge).color).slice(0, 3), bg: window.__bg(edge) } : null;
        return { label: 'mermaid: node label text vs node fill', fill, text: txt, ratio: window.__cr(fill, txt), edge: e && { ...e, ratio: window.__cr(e.color, e.bg) } };
      }),
    );
    out[theme] = res;
    for (const r of res) console.log(theme, r.label, '->', r.ratio ?? r.ratio_vs_behind, JSON.stringify(r).slice(0, 200));
    await page.context().close();
  }
  L.writeJson('contrast_extra.json', out);
  await browser.close();
})();
