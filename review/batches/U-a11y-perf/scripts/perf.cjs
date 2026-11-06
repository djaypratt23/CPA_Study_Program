// Performance: first load and section/lesson load on Fast 3G (1.6 Mbps down, 750 Kbps up, 150 ms RTT) + 4x CPU,
// with bytes per request (raw, as served by `vite preview`, which does not compress) and the gzip/brotli size of
// the same dist files (what a compressing host such as Cloudflare Pages would send).
// Usage: node perf.cjs [load|lesson|warm|all]
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const L = require('./lib.cjs');
const DIST = path.join(L.ROOT, 'dist');
const which = process.argv[2] || 'all';
const out = fs.existsSync(path.join(L.OUT, 'perf.json')) ? JSON.parse(fs.readFileSync(path.join(L.OUT, 'perf.json'))) : {};
const FAST3G = { offline: false, latency: 150, downloadThroughput: (1.6 * 1e6) / 8, uploadThroughput: (750 * 1e3) / 8 };

const compCache = {};
function compressed(urlPath) {
  if (compCache[urlPath]) return compCache[urlPath];
  let f = path.join(DIST, urlPath === '/' ? 'index.html' : urlPath);
  if (!fs.existsSync(f)) return (compCache[urlPath] = { raw: 0, gz: 0, br: 0 });
  const buf = fs.readFileSync(f);
  return (compCache[urlPath] = { raw: buf.length, gz: zlib.gzipSync(buf, { level: 9 }).length, br: zlib.brotliCompressSync(buf).length });
}

const LONGTASK_INIT = () => {
  window.__lt = [];
  try {
    new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__lt.push([Math.round(e.startTime), Math.round(e.duration)]))).observe({ type: 'longtask', buffered: true });
  } catch {}
};

async function instrument(ctx, page, { throttle = true, noCache = true } = {}) {
  const cdp = await ctx.newCDPSession(page);
  await cdp.send('Network.enable');
  if (noCache) await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
  if (throttle) {
    await cdp.send('Network.emulateNetworkConditions', FAST3G);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  }
  const reqs = new Map();
  const t0 = { v: Date.now() };
  cdp.on('Network.responseReceived', (e) => {
    const r = reqs.get(e.requestId) || {};
    r.url = e.response.url;
    r.type = e.type;
    r.fromSW = e.response.fromServiceWorker;
    r.fromCache = e.response.fromDiskCache;
    reqs.set(e.requestId, r);
  });
  cdp.on('Network.loadingFinished', (e) => {
    const r = reqs.get(e.requestId) || {};
    r.bytes = e.encodedDataLength;
    r.at = Date.now() - t0.v;
    reqs.set(e.requestId, r);
  });
  const summary = (sinceMs = 0, untilMs = Infinity) => {
    const list = [...reqs.values()].filter((r) => r.url && r.bytes !== undefined && r.at >= sinceMs && r.at <= untilMs && !r.url.startsWith('data:'));
    const by = {};
    let raw = 0, gz = 0, br = 0;
    for (const r of list) {
      const u = new URL(r.url);
      const c = compressed(u.pathname);
      raw += r.bytes;
      gz += c.gz || r.bytes;
      br += c.br || r.bytes;
      by[r.type] = (by[r.type] || 0) + r.bytes;
    }
    return {
      requests: list.length,
      transferredBytes: raw,
      gzipBytes: gz,
      brotliBytes: br,
      byType: by,
      fromServiceWorker: list.filter((r) => r.fromSW).length,
      // lower bound for the same bytes on Fast 3G if the host compressed them (bandwidth only, no RTTs)
      brotliFast3gSeconds: Math.round((br / FAST3G.downloadThroughput) * 10) / 10,
      largest: list.sort((a, b) => b.bytes - a.bytes).slice(0, 8).map((r) => `${new URL(r.url).pathname} ${Math.round(r.bytes / 1024)}KB`),
    };
  };
  return { cdp, reqs, t0, summary };
}
async function timeTo(page, t0, fn, timeout = 120000) {
  await page.waitForFunction(fn, null, { timeout, polling: 50 });
  return Date.now() - t0;
}
async function vitals(page) {
  return page.evaluate(() => {
    const p = Object.fromEntries(performance.getEntriesByType('paint').map((e) => [e.name, Math.round(e.startTime)]));
    const nav = performance.getEntriesByType('navigation')[0];
    const lt = window.__lt || [];
    return { fp: p['first-paint'], fcp: p['first-contentful-paint'], domContentLoaded: nav && Math.round(nav.domContentLoadedEventEnd), load: nav && Math.round(nav.loadEventEnd), longTasks: lt.length, longTaskMax: Math.max(0, ...lt.map((x) => x[1])), totalBlockingMs: lt.reduce((s, x) => s + Math.max(0, x[1] - 50), 0) };
  });
}

(async () => {
  const browser = await L.launch();
  const vp = L.PHONE;

  if (which === 'load' || which === 'all') {
    // P1: first visit, cold, no service worker
    {
      const ctx = await browser.newContext({ ...vp, serviceWorkers: 'block' });
      const page = await ctx.newPage();
      await page.addInitScript(LONGTASK_INIT);
      const m = await instrument(ctx, page);
      m.t0.v = Date.now();
      await page.goto(L.BASE, { waitUntil: 'commit' });
      const splash = await timeTo(page, m.t0.v, () => /Loading CPA Study Program/.test(document.body?.innerText || ''));
      const appUi = await timeTo(page, m.t0.v, () => !!document.querySelector('h1'));
      const interactive = await timeTo(page, m.t0.v, () => [...document.querySelectorAll('button')].some((b) => /Got it/.test(b.innerText)));
      await L.sleep(3000);
      out.firstVisit = { splashVisibleMs: splash, firstAppRenderMs: appUi, onboardingInteractiveMs: interactive, ...(await vitals(page)), network: m.summary() };
      await L.shot(page, 'perf-first-visit');
      console.log('firstVisit', JSON.stringify(out.firstVisit));
      // Onboard (unthrottled) so the next scenario is a returning user
      await m.cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 0, downloadThroughput: -1, uploadThroughput: -1 });
      await m.cdp.send('Emulation.setCPUThrottlingRate', { rate: 1 });
      await L.onboard(page);
      await page.close();

      // P2: returning user (onboarded, FAR active), cold HTTP cache, no SW -> dashboard
      const page2 = await ctx.newPage();
      await page2.addInitScript(LONGTASK_INIT);
      const m2 = await instrument(ctx, page2);
      m2.t0.v = Date.now();
      await page2.goto(L.BASE, { waitUntil: 'commit' });
      const splash2 = await timeTo(page2, m2.t0.v, () => /Loading CPA Study Program/.test(document.body?.innerText || ''));
      const dash = await timeTo(page2, m2.t0.v, () => [...document.querySelectorAll('a')].some((a) => /→/.test(a.innerText) && a.className.includes('bg-blue-700')));
      const atDash = Date.now() - m2.t0.v;
      const v2 = await vitals(page2);
      const beforeBg = m2.summary(0, atDash);
      // SectionLoader starts loading every other section 3 s after render; watch the next 60 s
      await L.sleep(60000);
      out.returningCold = { splashVisibleMs: splash2, dashboardUsableMs: dash, ...v2, networkToDashboard: beforeBg, backgroundAfterDashboard60s: m2.summary(atDash + 1, Infinity) };
      await L.shot(page2, 'perf-returning-dashboard');
      console.log('returningCold', JSON.stringify(out.returningCold));

      // P3: section switch FAR -> AUD on Fast 3G with all other sections already fetched in background above? Use a fresh page so nothing is cached
      const page3 = await ctx.newPage();
      await page3.addInitScript(LONGTASK_INIT);
      const m3 = await instrument(ctx, page3, { throttle: false });
      await page3.goto(L.BASE + '#/course');
      await page3.waitForSelector('h1');
      await L.waitIdle(page3);
      await m3.cdp.send('Network.emulateNetworkConditions', FAST3G);
      await m3.cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
      m3.t0.v = Date.now();
      m3.reqs.clear();
      await page3.locator('header select').selectOption('AUD');
      const audReady = await timeTo(page3, m3.t0.v, () => /AUD/.test(document.querySelector('h1')?.innerText || '') && document.querySelectorAll('main a[href*="#/module/aud-"]').length > 5);
      out.sectionSwitch = { to: 'AUD', courseListUsableMs: audReady, network: m3.summary() };
      await L.shot(page3, 'perf-section-switch-aud');
      console.log('sectionSwitch', JSON.stringify(out.sectionSwitch));
      await ctx.close();
    }
  }

  if (which === 'lesson' || which === 'all') {
    // P4: open a lesson (with a mermaid diagram) on Fast 3G, after the dashboard is up; cold cache
    const ctx = await browser.newContext({ ...vp, serviceWorkers: 'block' });
    const page = await ctx.newPage();
    await L.onboard(page);
    await page.goto(L.BASE + '#/');
    await page.waitForSelector('h1');
    await L.sleep(5000); // let the background section loads finish unthrottled
    const m = await instrument(ctx, page);
    for (const mod of ['far-income-statement-oci', 'far-leases-finance']) {
      m.reqs.clear();
      m.t0.v = Date.now();
      await page.evaluate((h) => (location.hash = h), `#/module/${mod}`);
      const header = await timeTo(page, m.t0.v, () => /The big idea/.test(document.body.innerText));
      const body = await timeTo(page, m.t0.v, () => !/Loading lesson…/.test(document.body.innerText) && !!document.querySelector('.prose-lesson h2'));
      let diagram = null;
      if (await page.evaluate(() => !!document.querySelector('figure'))) diagram = await timeTo(page, m.t0.v, () => !!document.querySelector('figure svg') || /couldn/.test(document.body.innerText), 180000).catch(() => 'timeout');
      out['lesson_' + mod] = { headerMs: header, lessonTextMs: body, diagramMs: diagram, network: m.summary() };
      await L.shot(page, `perf-lesson-${mod}`);
      console.log('lesson', mod, JSON.stringify(out['lesson_' + mod]));
      await page.evaluate(() => (location.hash = '#/'));
      await L.sleep(1500);
    }
    await ctx.close();
  }

  if (which === 'warm' || which === 'all') {
    // P5: returning user with the service worker installed and precache complete (offline-first path)
    const ctx = await browser.newContext({ ...vp, serviceWorkers: 'allow' });
    const page = await ctx.newPage();
    await L.onboard(page);
    await page.evaluate(async () => {
      const reg = await navigator.serviceWorker.ready;
      return !!reg.active;
    });
    // wait for the precache to fill
    let n = 0;
    for (let i = 0; i < 60; i++) {
      n = await page.evaluate(async () => {
        let c = 0;
        for (const k of await caches.keys()) c += (await (await caches.open(k)).keys()).length;
        return c;
      });
      if (n > 300) break;
      await L.sleep(1000);
    }
    const precache = await page.evaluate(async () => {
      let entries = 0;
      for (const k of await caches.keys()) entries += (await (await caches.open(k)).keys()).length;
      const est = await navigator.storage.estimate();
      return { entries, usageMB: Math.round((est.usage / 1048576) * 10) / 10 };
    });
    await page.close();
    const page2 = await ctx.newPage();
    await page2.addInitScript(LONGTASK_INIT);
    const m = await instrument(ctx, page2, { noCache: false });
    m.t0.v = Date.now();
    await page2.goto(L.BASE, { waitUntil: 'commit' });
    const dash = await timeTo(page2, m.t0.v, () => [...document.querySelectorAll('a')].some((a) => /→/.test(a.innerText) && a.className.includes('bg-blue-700')));
    out.returningWarmSW = { precache, dashboardUsableMs: dash, ...(await vitals(page2)), network: m.summary() };
    console.log('warm', JSON.stringify(out.returningWarmSW));
    await ctx.close();
  }

  fs.writeFileSync(path.join(L.OUT, 'perf.json'), JSON.stringify(out, null, 2));
  await browser.close();
})();
