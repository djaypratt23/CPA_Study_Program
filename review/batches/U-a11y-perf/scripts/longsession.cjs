// Responsiveness in long sessions (phone viewport, 4x CPU throttling, no network throttling):
//  A) answer 120 questions in a row (6 mixed tutor sets of 20): per-step latency, long tasks, heap/DOM after GC
//  B) idle cost of the ticking clocks (quiz 1 s, exam 0.5 s) vs the dashboard
//  C) open 40 lessons in a row: time to lesson text, heap/DOM after GC
//  D) a long-term learner (5,000 stored attempts): dashboard/analytics/quiz-step timings
// Usage: node longsession.cjs [A|B|C|D|all]
const fs = require('fs');
const path = require('path');
const L = require('./lib.cjs');
const which = process.argv[2] || 'all';
const OUTF = path.join(L.OUT, 'longsession.json');
const out = fs.existsSync(OUTF) ? JSON.parse(fs.readFileSync(OUTF)) : {};
const save = () => fs.writeFileSync(OUTF, JSON.stringify(out, null, 2));
const LT = () => {
  window.__lt = [];
  try {
    new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__lt.push(Math.round(e.duration)))).observe({ type: 'longtask', buffered: true });
  } catch {}
};
const pct = (arr, p) => {
  const s = [...arr].sort((a, b) => a - b);
  return s.length ? s[Math.min(s.length - 1, Math.floor((p / 100) * s.length))] : null;
};
async function setup(browser) {
  const ctx = await browser.newContext({ ...L.PHONE, serviceWorkers: 'block' });
  const page = await ctx.newPage();
  await page.addInitScript(LT);
  await L.onboard(page);
  const cdp = await ctx.newCDPSession(page);
  await cdp.send('Performance.enable');
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  const metrics = async (gc = true) => {
    if (gc) await cdp.send('HeapProfiler.collectGarbage');
    const m = Object.fromEntries((await cdp.send('Performance.getMetrics')).metrics.map((x) => [x.name, x.value]));
    return { heapMB: Math.round((m.JSHeapUsedSize / 1048576) * 10) / 10, nodes: m.Nodes, listeners: m.JSEventListeners, taskDur: m.TaskDuration, scriptDur: m.ScriptDuration };
  };
  return { ctx, page, cdp, metrics };
}
const qNum = (page) => page.evaluate(() => Number(((document.querySelector('main')?.innerText || '').match(/Question (\d+) of/) || [])[1] || 0));
const lts = (page) => page.evaluate(() => window.__lt.splice(0));

(async () => {
  const browser = await L.launch();

  if (which === 'A' || which === 'all') {
    const { ctx, page, metrics } = await setup(browser);
    const steps = { select: [], reveal: [], next: [] };
    const series = [];
    let answered = 0;
    await lts(page);
    series.push({ answered, ...(await metrics()) });
    for (let set = 0; set < 6; set++) {
      await page.evaluate(() => (location.hash = '#/practice/start?mixed=FAR'));
      await page.waitForURL(/#\/quiz\//, { timeout: 60000 });
      await page.waitForSelector('[role=radio]', { timeout: 60000 });
      for (let i = 0; i < 20; i++) {
        const n = await qNum(page);
        let t = Date.now();
        await page.locator('[role=radio]').nth(i % 4).click();
        await page.waitForSelector('[role=radio][aria-checked=true]');
        steps.select.push(Date.now() - t);
        t = Date.now();
        await page.getByRole('button', { name: /^Unsure/ }).click();
        await page.waitForSelector('text=Explanation');
        steps.reveal.push(Date.now() - t);
        answered++;
        t = Date.now();
        if (i < 19) {
          await page.getByRole('button', { name: /Next question/ }).click();
          await page.waitForFunction((n) => Number(((document.querySelector('main')?.innerText || '').match(/Question (\d+) of/) || [])[1] || 0) === n + 1, n, { timeout: 30000 });
          steps.next.push(Date.now() - t);
        } else {
          await page.getByRole('button', { name: /See results/ }).click();
          await page.waitForSelector('text=Set complete', { timeout: 30000 });
        }
      }
      const lt = await lts(page);
      series.push({ answered, ...(await metrics()), longTasks: lt.length, longTaskMax: Math.max(0, ...lt), longTaskP90: pct(lt, 90), over100ms: lt.filter((x) => x > 100).length });
      console.log('A', JSON.stringify(series[series.length - 1]));
    }
    const sum = (a) => ({ n: a.length, median: pct(a, 50), p90: pct(a, 90), max: Math.max(...a), first20median: pct(a.slice(0, 19), 50), last20median: pct(a.slice(-19), 50) });
    out.A_120answers = { cpu: '4x', viewport: '390x844', steps: { select: sum(steps.select), reveal: sum(steps.reveal), next: sum(steps.next) }, series };
    await L.shot(page, 'long-a-after-120');
    console.log('A steps', JSON.stringify(out.A_120answers.steps));
    save();
    await ctx.close();
  }

  if (which === 'B' || which === 'all') {
    const { ctx, page, cdp, metrics } = await setup(browser);
    const idle = async (label, secs = 20) => {
      await L.sleep(1500);
      await lts(page);
      const a = await metrics(false);
      await L.sleep(secs * 1000);
      const b = await metrics(false);
      const lt = await lts(page);
      const r = { label, secs, mainThreadBusyPct: Math.round(((b.taskDur - a.taskDur) / secs) * 1000) / 10, scriptPct: Math.round(((b.scriptDur - a.scriptDur) / secs) * 1000) / 10, longTasks: lt.length, longTaskMax: Math.max(0, ...lt) };
      console.log('B', JSON.stringify(r));
      return r;
    };
    const res = [];
    await L.go(page, '/', 'h1');
    res.push(await idle('dashboard (no clock)'));
    await page.evaluate(() => (location.hash = '#/practice/start?module=far-income-statement-oci'));
    await page.waitForURL(/#\/quiz\//);
    await page.waitForSelector('[role=radio]');
    res.push(await idle('quiz question, 1 s clock'));
    await page.locator('[role=radio]').first().click();
    await page.getByRole('button', { name: /^Unsure/ }).click();
    await page.waitForSelector('text=Explanation');
    res.push(await idle('quiz after reveal (explanations shown), 1 s clock'));
    await L.go(page, '/tbs/far-tbs-u1-income-statement', 'h1');
    res.push(await idle('TBS page, 1 s elapsed clock'));
    await L.go(page, '/exam', 'h1');
    await page.getByRole('button', { name: 'Start' }).first().click();
    await page.waitForURL(/#\/exam\/exam-/);
    await page.waitForSelector('[role=radio]');
    res.push(await idle('exam MCQ, 0.5 s clock'));
    // React commit cost per tick, from a JS profile of 6 s on the exam page
    await cdp.send('Profiler.enable');
    await cdp.send('Profiler.start');
    await L.sleep(6000);
    const { profile } = await cdp.send('Profiler.stop');
    const self = {};
    const byId = new Map(profile.nodes.map((n) => [n.id, n]));
    const dt = profile.timeDeltas;
    for (let i = 0; i < profile.samples.length; i++) {
      const n = byId.get(profile.samples[i]);
      const fn = n.callFrame.functionName || '(anon)';
      if (fn === '(idle)' || fn === '(program)' || fn === '(garbage collector)') continue;
      self[fn + ' ' + (n.callFrame.url.split('/').pop() || '')] = (self[fn + ' ' + (n.callFrame.url.split('/').pop() || '')] || 0) + (dt[i] || 0) / 1000;
    }
    const top = Object.entries(self).sort((a, b) => b[1] - a[1]).slice(0, 12).map(([k, v]) => `${k} ${Math.round(v)}ms`);
    out.B_idleClocks = { cpu: '4x', results: res, examProfileTopSelfTime6s: top };
    console.log('B profile', top.join(' | '));
    save();
    await ctx.close();
  }

  if (which === 'C' || which === 'all') {
    const { ctx, page, metrics } = await setup(browser);
    const mods = fs.readdirSync(path.join(L.ROOT, 'content/far/modules')).slice(0, 40);
    const times = [];
    const series = [{ opened: 0, ...(await metrics()) }];
    await lts(page);
    for (let i = 0; i < mods.length; i++) {
      const t = Date.now();
      await page.evaluate((m) => (location.hash = '#/module/' + m), mods[i]);
      await page.waitForFunction(() => /The big idea/.test(document.body.innerText) && !/Loading lesson…/.test(document.body.innerText) && !!document.querySelector('.prose-lesson h2'), null, { timeout: 60000 }).catch(() => {});
      times.push(Date.now() - t);
      await L.sleep(400);
      if ((i + 1) % 10 === 0) {
        const lt = await lts(page);
        series.push({ opened: i + 1, ...(await metrics()), longTasks: lt.length, longTaskMax: Math.max(0, ...lt), over200ms: lt.filter((x) => x > 200).length });
        console.log('C', JSON.stringify(series[series.length - 1]));
      }
    }
    out.C_40lessons = { cpu: '4x', lessonTextMs: { median: pct(times, 50), p90: pct(times, 90), max: Math.max(...times), first10median: pct(times.slice(0, 10), 50), last10median: pct(times.slice(-10), 50) }, series };
    console.log('C times', JSON.stringify(out.C_40lessons.lessonTextMs));
    save();
    await ctx.close();
  }

  if (which === 'D' || which === 'all') {
    const { ctx, page, metrics } = await setup(browser);
    // seed 5,000 attempts over 90 days from real FAR question ids
    const qs = [];
    for (const m of fs.readdirSync(path.join(L.ROOT, 'content/far/modules'))) {
      const f = path.join(L.ROOT, 'content/far/modules', m, 'questions.json');
      if (fs.existsSync(f)) for (const q of JSON.parse(fs.readFileSync(f))) qs.push([q.id, m, q.answer]);
    }
    const rows = [];
    const now = Date.now();
    for (let i = 0; i < 5000; i++) {
      const [id, mod, ans] = qs[i % qs.length];
      const at = new Date(now - Math.floor(Math.random() * 90) * 86400000 - Math.floor(Math.random() * 36e6));
      const correct = Math.random() < 0.7;
      rows.push({ itemId: id, itemType: 'mcq', moduleId: mod, section: 'FAR', correct, score: correct ? 1 : 0, confidence: ['guess', 'unsure', 'confident'][i % 3], choice: correct ? ans : 'zz', timeMs: 60000 + (i % 60) * 1000, mode: 'tutor', mixed: true, sessionId: 'seed-' + Math.floor(i / 20), at: at.toISOString(), day: at.toISOString().slice(0, 10) });
    }
    await page.evaluate(async (rows) => {
      const db = await new Promise((res, rej) => { const r = indexedDB.open('cpa-study'); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });
      const tx = db.transaction('attempts', 'readwrite');
      for (const r of rows) tx.objectStore('attempts').add(r);
      await new Promise((res) => (tx.oncomplete = res));
      db.close();
    }, rows);
    await page.reload();
    await page.waitForSelector('h1');
    await lts(page);
    const nav = async (hash, ready) => {
      const t = Date.now();
      await page.evaluate((h) => (location.hash = h), hash);
      await page.waitForFunction(ready, null, { timeout: 60000 });
      const ms = Date.now() - t;
      const lt = await lts(page);
      return { ms, longTasks: lt.length, longTaskMax: Math.max(0, ...lt) };
    };
    const r = {};
    r.course = await nav('#/course', () => /Financial Accounting/.test(document.querySelector('h1')?.innerText || ''));
    r.dashboard = await nav('#/', () => !!document.querySelector('a.bg-blue-700'));
    r.analytics = await nav('#/analytics', () => /Performance analytics/.test(document.querySelector('h1')?.innerText || '') && /Error log/.test(document.body.innerText));
    r.planner = await nav('#/plan', () => /plan/i.test(document.querySelector('h1')?.innerText || ''));
    // quiz steps with the large history
    await page.evaluate(() => (location.hash = '#/practice/start?mixed=FAR'));
    await page.waitForURL(/#\/quiz\//);
    await page.waitForSelector('[role=radio]');
    const sel = [], rev = [];
    for (let i = 0; i < 5; i++) {
      let t = Date.now();
      await page.locator('[role=radio]').nth(1).click();
      await page.waitForSelector('[role=radio][aria-checked=true]');
      sel.push(Date.now() - t);
      t = Date.now();
      await page.getByRole('button', { name: /^Unsure/ }).click();
      await page.waitForSelector('text=Explanation');
      rev.push(Date.now() - t);
      await page.getByRole('button', { name: /Next question/ }).click();
      await L.sleep(400);
    }
    r.quizSelectMs = sel;
    r.quizRevealMs = rev;
    const lt = await lts(page);
    r.quizLongTasks = lt;
    // finishing the set lands on results, which computes the whole study state
    r.metrics = await metrics();
    out.D_5000attempts = { cpu: '4x', ...r };
    console.log('D', JSON.stringify(out.D_5000attempts));
    save();
    await ctx.close();
  }
  await browser.close();
})();
