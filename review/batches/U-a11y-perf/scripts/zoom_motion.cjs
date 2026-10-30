// Text scaling (browser default font size, 200% text, the app's own 140% setting), 320px reflow,
// prefers-reduced-motion, and focus obscured by sticky/fixed bars on the phone layout.
// Usage: node zoom_motion.cjs
const fs = require('fs');
const os = require('os');
const path = require('path');
const L = require('./lib.cjs');
const out = { defaultFontSize: {}, zoom: [], motion: {}, obscured: {}, moreMenu: {} };

async function layoutProblems(page) {
  return page.evaluate(() => {
    const de = document.documentElement;
    const hScroll = Math.max(de.scrollWidth, document.body.scrollWidth) - de.clientWidth;
    const clipped = [];
    for (const el of document.querySelectorAll('body *')) {
      if (!el.offsetParent && getComputedStyle(el).position !== 'fixed') continue;
      const cs = getComputedStyle(el);
      const clipsX = ['hidden', 'clip'].includes(cs.overflowX) || cs.textOverflow === 'ellipsis';
      const clipsY = ['hidden', 'clip'].includes(cs.overflowY);
      const txt = (el.innerText || '').trim();
      if (!txt) continue;
      if ((clipsX && el.scrollWidth > el.clientWidth + 1) || (clipsY && el.scrollHeight > el.clientHeight + 1)) {
        clipped.push(`${el.tagName.toLowerCase()}.${String(el.className).split(' ').slice(0, 3).join('.')}: "${txt.slice(0, 50).replace(/\s+/g, ' ')}"`);
      }
    }
    // elements wider than the viewport that are not inside a horizontal scroller
    const wide = [];
    for (const el of document.querySelectorAll('main *, header *')) {
      const r = el.getBoundingClientRect();
      if (r.right > innerWidth + 2 && r.width > 0) {
        let p = el.parentElement, scroller = false;
        while (p) {
          const o = getComputedStyle(p).overflowX;
          if (o === 'auto' || o === 'scroll') { scroller = true; break; }
          p = p.parentElement;
        }
        if (!scroller) wide.push(`${el.tagName.toLowerCase()}.${String(el.className).split(' ').slice(0, 2).join('.')} right=${Math.round(r.right)}`);
      }
    }
    // sticky/fixed bars that overlap each other (e.g. the quiz bar sliding under the phone header)
    const bars = [...document.querySelectorAll('header, nav, [class*="sticky"]')].filter((e) => ['sticky', 'fixed'].includes(getComputedStyle(e).position));
    const overlaps = [];
    for (let i = 0; i < bars.length; i++)
      for (let j = i + 1; j < bars.length; j++) {
        const a = bars[i].getBoundingClientRect(), b = bars[j].getBoundingClientRect();
        const ov = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
        if (ov > 2 && Math.min(a.right, b.right) - Math.max(a.left, b.left) > 2 && a.height && b.height) overlaps.push(`${bars[i].tagName}.${String(bars[i].className).slice(0, 30)} x ${bars[j].tagName}.${String(bars[j].className).slice(0, 30)} by ${Math.round(ov)}px`);
      }
    const fixedH = [...document.querySelectorAll('body *')]
      .filter((e) => ['sticky', 'fixed'].includes(getComputedStyle(e).position) && e.getBoundingClientRect().height > 0 && e.getBoundingClientRect().width > innerWidth * 0.8)
      .reduce((s, e) => s + e.getBoundingClientRect().height, 0);
    return { hScroll, clipped: clipped.slice(0, 12), clippedCount: clipped.length, wide: wide.slice(0, 8), wideCount: wide.length, overlaps, stickyFixedHeightPx: Math.round(fixedH), viewportH: innerHeight, htmlFont: getComputedStyle(document.documentElement).fontSize };
  });
}

const ROUTES = [
  ['/', 'dashboard', 'h1'],
  ['/course', 'course', 'h1'],
  ['/module/far-income-statement-oci', 'lesson', 'text=The big idea'],
  ['QUIZ', 'quiz-revealed', null],
  ['/tbs/far-tbs-r3-deferred-tax', 'tbs-journal', 'h1'],
  ['/tbs/far-tbs-u1-statement-review', 'tbs-review', 'h1'],
  ['/analytics', 'analytics', 'h1'],
  ['/plan', 'planner', 'h1'],
  ['/settings', 'settings', 'h1'],
  ['EXAM', 'exam-mcq+calculator', null],
];

async function visit(page, r) {
  if (r[0] === 'QUIZ') {
    await L.go(page, '/practice/start?module=far-income-statement-oci');
    await page.waitForURL(/#\/quiz\//);
    await L.waitIdle(page);
    await page.locator('[role=radio]').first().click();
    await page.getByRole('button', { name: /^Unsure/ }).click();
    await page.waitForSelector('text=Explanation');
    return;
  }
  if (r[0] === 'EXAM') {
    await L.go(page, '/exam', 'h1');
    await page.getByRole('button', { name: 'Start' }).first().click();
    await page.waitForURL(/#\/exam\/exam-/);
    await L.waitIdle(page);
    await page.getByRole('button', { name: 'Calculator', exact: true }).click();
    return;
  }
  await L.go(page, r[0], r[2]);
}

(async () => {
  const browser = await L.launch();

  // 1) Does the app honour the browser's default font size? (CDP Page.setFontSizes standard=32, like a user choosing "Very large")
  {
    const { ctx, page } = await L.newCtx(browser, L.DESKTOP, 'light');
    const cdp = await ctx.newCDPSession(page);
    await cdp.send('Page.enable');
    await cdp.send('Page.setFontSizes', { fontSizes: { standard: 32, fixed: 26 } });
    await page.goto(L.BASE + 'robots.txt');
    out.defaultFontSize.plainPage = await page.evaluate(() => getComputedStyle(document.documentElement).fontSize);
    await L.onboard(page);
    out.defaultFontSize.appHtml = await page.evaluate(() => ({ inline: document.documentElement.style.fontSize, computed: getComputedStyle(document.documentElement).fontSize, body: getComputedStyle(document.body).fontSize }));
    out.defaultFontSize.shot = await L.shot(page, 'zoom-d-default-font-32px-ignored');
    console.log('default font size', out.defaultFontSize);
    await ctx.close();
  }

  // 2) 200% text (html font-size 32px, i.e. what a 200% default would give) and the app's own max (140%) at phone and desktop; 320px reflow
  const cases = [
    ['m', L.PHONE, '200', 'html{font-size:32px !important}'],
    ['d', L.DESKTOP, '200', 'html{font-size:32px !important}'],
    ['m', L.PHONE, 'app140', null],
    ['r320', { viewport: { width: 320, height: 640 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }, '100', null],
  ];
  for (const [vk, vp, label, css] of cases) {
    const { ctx, page } = await L.newCtx(browser, vp, 'light');
    await L.onboard(page);
    if (label === 'app140') {
      await L.go(page, '/settings', 'h1');
      await page.locator('#font').fill('1.4');
      await L.sleep(500);
    }
    if (css) await page.addStyleTag({ content: css });
    for (const r of ROUTES) {
      try {
        await visit(page, r);
        await L.sleep(400);
        const p = await layoutProblems(page);
        const shotPath = await L.shot(page, `zoom-${vk}-${label}-${r[1]}`);
        out.zoom.push({ vp: vk, text: label, route: r[1], url: page.url().replace(L.BASE, '/'), ...p, shot: shotPath });
        console.log(vk, label, r[1], 'hScroll', p.hScroll, 'clipped', p.clippedCount, 'wide', p.wideCount, 'overlaps', p.overlaps.length, 'sticky/fixed px', p.stickyFixedHeightPx, '/', p.viewportH, p.htmlFont);
      } catch (e) {
        console.log('ERR', vk, label, r[1], e.message.slice(0, 120));
      }
    }
    await ctx.close();
  }

  // 3) prefers-reduced-motion
  {
    const { ctx, page } = await L.newCtx(browser, L.DESKTOP, 'light', { reducedMotion: 'reduce' });
    await L.onboard(page);
    out.motion.matches = await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
    out.motion.transitions = await page.evaluate(() =>
      [...document.querySelectorAll('a,button,[role=progressbar] > div')]
        .map((e) => getComputedStyle(e))
        .filter((cs) => cs.transitionDuration !== '0s')
        .map((cs) => `${cs.transitionProperty.slice(0, 60)} ${cs.transitionDuration}`)
        .filter((v, i, a) => a.indexOf(v) === i),
    );
    out.motion.cssMotionReduceRules = await page.evaluate(() => {
      let n = 0;
      for (const sh of document.styleSheets) {
        try {
          for (const r of sh.cssRules) if (r.media && /reduced-motion/.test(r.media.mediaText)) n++;
        } catch {}
      }
      return n;
    });
    await L.go(page, '/module/far-income-statement-oci', 'text=The big idea');
    out.motion.runningAnimations = await page.evaluate(() => document.getAnimations().length);
    // auto-advance still fires after 1.5 s
    await L.go(page, '/practice/start?module=far-income-statement-oci');
    await page.waitForURL(/#\/quiz\//);
    await L.waitIdle(page);
    const qs = require('/home/user/CPA_Study_Program/content/far/modules/far-income-statement-oci/questions.json');
    const qid = (await page.locator('article[aria-labelledby^="stem-"]').getAttribute('aria-labelledby')).replace('stem-', '');
    await page.locator(`[data-choice="${qs.find((q) => q.id === qid).answer}"]`).click();
    await L.sleep(300);
    await page.getByRole('button', { name: /^Confident/ }).click();
    const t0 = Date.now();
    await page.waitForFunction(() => /Question 2 of/.test(document.querySelector('main').innerText), null, { timeout: 5000 }).catch(() => {});
    out.motion.autoAdvanceMs = Date.now() - t0;
    console.log('motion', out.motion);
    await ctx.close();
  }

  // 4) Phone: focus obscured by sticky/fixed bars (More menu closed), and the More menu's Tab order
  {
    const { ctx, page } = await L.newCtx(browser, L.PHONE, 'light');
    await L.onboard(page);
    const probe = () =>
      page.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body) return null;
        const r = el.getBoundingClientRect();
        const bars = [...document.querySelectorAll('header, nav, div')].filter((b) => ['sticky', 'fixed'].includes(getComputedStyle(b).position) && !b.contains(el) && b.getBoundingClientRect().height > 0);
        let hiddenPx = 0, by = '';
        for (const b of bars) {
          const q = b.getBoundingClientRect();
          const ov = Math.max(0, Math.min(r.bottom, q.bottom) - Math.max(r.top, q.top));
          if (ov > hiddenPx && Math.min(r.right, q.right) > Math.max(r.left, q.left)) { hiddenPx = ov; by = String(b.className).slice(0, 50); }
        }
        // z-order check: sample 5 points; count those where the topmost element is not the focused one
        const pts = [[0.5, 0.5], [0.1, 0.1], [0.9, 0.1], [0.1, 0.9], [0.9, 0.9]].map(([fx, fy]) => [r.left + r.width * fx, r.top + r.height * fy]).filter(([x, y]) => y >= 0 && y < innerHeight);
        const coveredPts = pts.filter(([x, y]) => { const t = document.elementFromPoint(x, y); return t && t !== el && !el.contains(t); }).length;
        return { name: (el.getAttribute('aria-label') || el.innerText || '').trim().slice(0, 40), h: Math.round(r.height), hiddenPx: Math.round(hiddenPx), fully: coveredPts === 5, coveredPts, by };
      });
    for (const [route, label] of [['QUIZ', 'quiz'], ['/module/far-income-statement-oci', 'lesson'], ['/tbs/far-tbs-r3-deferred-tax', 'tbs']]) {
      if (route === 'QUIZ') {
        await L.go(page, '/practice/start?module=far-income-statement-oci');
        await page.waitForURL(/#\/quiz\//);
        await L.waitIdle(page);
      } else await L.go(page, route, 'h1');
      await page.evaluate(() => scrollTo(0, 0));
      const hits = [];
      let n = 0;
      for (let i = 0; i < 70; i++) {
        await page.keyboard.press('Tab');
        await L.sleep(60);
        const p = await probe();
        if (!p) continue;
        n++;
        if (p.coveredPts > 0) hits.push(p);
      }
      out.obscured[label] = { stops: n, partlyHidden: hits.length, fullyHidden: hits.filter((h) => h.fully).length, samples: hits.slice(0, 8) };
      console.log('obscured', label, out.obscured[label].stops, out.obscured[label].partlyHidden, out.obscured[label].fullyHidden, JSON.stringify(hits.slice(0, 3)));
      if (hits.find((h) => h.fully)) {
        // re-create one fully hidden focus for a screenshot
        out.obscured[label].shot = await L.shot(page, `obscured-m-${label}`);
      }
    }
    // More menu: Tab beyond the last item, Shift+Tab before the first
    await L.go(page, '/', 'h1');
    await page.getByRole('button', { name: 'More' }).focus();
    await page.keyboard.press('Enter');
    const seq = [];
    for (let i = 0; i < 22; i++) {
      await page.keyboard.press('Tab');
      seq.push(await page.evaluate(() => {
        const el = document.activeElement;
        const inMenu = !!el.closest('#more-menu');
        const r = el.getBoundingClientRect();
        const top = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
        if (el === document.body) return 'BODY';
        return `${(el.getAttribute('aria-label') || el.innerText || el.tagName).trim().slice(0, 24)}${inMenu ? ' [menu]' : top && (top === el || el.contains(top)) ? '' : ' [under overlay]'}`;
      }));
    }
    out.moreMenu.tabSequence = seq;
    out.moreMenu.shot = await L.shot(page, 'more-menu-focus-under-overlay');
    console.log('more menu tab seq', seq);
    await ctx.close();
  }
  L.writeJson('zoom_motion.json', out);
  await browser.close();
})();
