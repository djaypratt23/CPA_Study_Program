// Follow-up to longsession.json A (DOM node and listener counts grew ~2,700 nodes / ~240 listeners per 20-question
// set even after a forced GC). Checks whether the growth is retained (detached) DOM: after each set, go back to the
// dashboard, force GC, and compare CDP's node count (attached + detached) with the attached count. Then take a heap
// snapshot and summarise the detached nodes and what retains them.
// Usage: node leak.cjs [sets=4] [mode=tutor|lesson|exam]
const fs = require('fs');
const path = require('path');
const L = require('./lib.cjs');
const sets = Number(process.argv[2] || 4);
const mode = process.argv[3] || 'tutor';
const OUTF = path.join(L.OUT, 'longsession.json');

async function snapshotDetached(cdp) {
  const chunks = [];
  const onChunk = (e) => chunks.push(e.chunk);
  cdp.on('HeapProfiler.addHeapSnapshotChunk', onChunk);
  await cdp.send('HeapProfiler.takeHeapSnapshot', { reportProgress: false, captureNumericValue: false });
  cdp.off('HeapProfiler.addHeapSnapshotChunk', onChunk);
  const snap = JSON.parse(chunks.join(''));
  const m = snap.snapshot.meta;
  const NF = m.node_fields.length;
  const EF = m.edge_fields.length;
  const nType = m.node_fields.indexOf('type');
  const nName = m.node_fields.indexOf('name');
  const nEdges = m.node_fields.indexOf('edge_count');
  const nSize = m.node_fields.indexOf('self_size');
  const eType = m.edge_fields.indexOf('type');
  const eName = m.edge_fields.indexOf('name_or_index');
  const eTo = m.edge_fields.indexOf('to_node');
  const nodeTypes = m.node_types[nType];
  const edgeTypes = m.edge_types[eType];
  const { nodes, edges, strings } = snap;
  const count = nodes.length / NF;
  const firstEdge = new Uint32Array(count + 1);
  for (let i = 0, e = 0; i < count; i++) {
    firstEdge[i] = e;
    e += nodes[i * NF + nEdges] * EF;
    firstEdge[i + 1] = e;
  }
  const name = (i) => strings[nodes[i * NF + nName]];
  const type = (i) => nodeTypes[nodes[i * NF + nType]];
  // reverse edges (retainers), skipping weak edges
  const retainers = new Map();
  for (let i = 0; i < count; i++) {
    for (let e = firstEdge[i]; e < firstEdge[i + 1]; e += EF) {
      const et = edgeTypes[edges[e + eType]];
      if (et === 'weak') continue;
      const to = edges[e + eTo] / NF;
      const ename = et === 'element' || et === 'hidden' ? String(edges[e + eName]) : strings[edges[e + eName]];
      if (!retainers.has(to)) retainers.set(to, []);
      retainers.get(to).push([i, et, ename]);
    }
  }
  const detached = [];
  const byName = {};
  for (let i = 0; i < count; i++) {
    const n = name(i);
    if (n.startsWith('Detached ')) {
      detached.push(i);
      byName[n] = (byName[n] || 0) + 1;
    }
  }
  // For a sample of detached elements, walk up retainers (preferring non-detached, non-DOM-internal) to find
  // the first JS object/closure that holds the detached tree.
  const isDetached = (i) => name(i).startsWith('Detached ');
  const holders = {};
  const sample = detached.filter((i) => /Detached (HTML|SVG)\w*Element/.test(name(i))).slice(0, 4000);
  for (const start of sample) {
    // BFS limited depth through retainers, stop at the first non-detached node that is not an internal/hidden one
    const seen = new Set([start]);
    let frontier = [[start, []]];
    let found = null;
    for (let depth = 0; depth < 12 && frontier.length && !found; depth++) {
      const next = [];
      for (const [n, chain] of frontier) {
        for (const [r, et, en] of retainers.get(n) || []) {
          if (seen.has(r)) continue;
          seen.add(r);
          const c = [...chain, `${type(r)}:${name(r).slice(0, 60)} -[${et}:${String(en).slice(0, 40)}]->`];
          if (!isDetached(r) && type(r) !== 'hidden' && !/^(system \/|InternalNode|\(|Detached)/.test(name(r)) && type(r) !== 'native') {
            found = c;
            break;
          }
          next.push([r, c]);
        }
        if (found) break;
      }
      frontier = next.slice(0, 400);
    }
    const key = found ? found.slice(-3).join(' ') : 'not found within depth 12';
    holders[key] = (holders[key] || 0) + 1;
  }
  const top = (o, k = 15) => Object.entries(o).sort((a, b) => b[1] - a[1]).slice(0, k);
  return { detachedTotal: detached.length, detachedByName: top(byName), sampledElements: sample.length, holders: top(holders, 12) };
}

(async () => {
  const browser = await L.launch();
  const ctx = await browser.newContext({ ...L.PHONE, serviceWorkers: 'block' });
  const page = await ctx.newPage();
  await L.onboard(page);
  const cdp = await ctx.newCDPSession(page);
  await cdp.send('Performance.enable');
  await cdp.send('HeapProfiler.enable');
  const metrics = async () => {
    await cdp.send('HeapProfiler.collectGarbage');
    await L.sleep(300);
    await cdp.send('HeapProfiler.collectGarbage');
    const m = Object.fromEntries((await cdp.send('Performance.getMetrics')).metrics.map((x) => [x.name, x.value]));
    const attached = await page.evaluate(() => document.getElementsByTagName('*').length);
    return { heapMB: Math.round((m.JSHeapUsedSize / 1048576) * 10) / 10, cdpNodes: m.Nodes, attachedElements: attached, listeners: m.JSEventListeners };
  };
  const toDash = async () => {
    await page.evaluate(() => (location.hash = '#/'));
    await page.waitForSelector('h1');
    await L.sleep(800);
  };
  const series = [];
  await toDash();
  series.push({ after: 0, where: 'dashboard', ...(await metrics()) });
  for (let s = 0; s < sets; s++) {
    if (mode === 'tutor') {
      await page.evaluate(() => (location.hash = '#/practice/start?mixed=FAR'));
      await page.waitForURL(/#\/quiz\//, { timeout: 60000 });
      await page.waitForSelector('[role=radio]', { timeout: 60000 });
      for (let i = 0; i < 20; i++) {
        const n = await page.evaluate(() => Number(((document.querySelector('main')?.innerText || '').match(/Question (\d+) of/) || [])[1] || 0));
        await page.locator('[role=radio]').nth(i % 4).click();
        await page.getByRole('button', { name: /^Unsure/ }).click();
        await page.waitForSelector('text=Explanation');
        if (i < 19) {
          await page.getByRole('button', { name: /Next question/ }).click();
          await page.waitForFunction((n) => Number(((document.querySelector('main')?.innerText || '').match(/Question (\d+) of/) || [])[1] || 0) === n + 1, n, { timeout: 30000 });
        } else {
          await page.getByRole('button', { name: /See results/ }).click();
          await page.waitForSelector('text=Set complete', { timeout: 30000 });
        }
      }
      series.push({ after: (s + 1) * 20, where: 'results page', ...(await metrics()) });
    } else if (mode === 'lesson') {
      const mods = fs.readdirSync(path.join(L.ROOT, 'content/far/modules')).slice(s * 10, s * 10 + 10);
      for (const m of mods) {
        await page.evaluate((m) => (location.hash = '#/module/' + m), m);
        await page.waitForFunction(() => !/Loading lesson…/.test(document.body.innerText) && !!document.querySelector('.prose-lesson h2'), null, { timeout: 60000 }).catch(() => {});
        await L.sleep(500);
      }
      series.push({ after: (s + 1) * 10, where: 'last lesson', ...(await metrics()) });
    }
    await toDash();
    series.push({ after: mode === 'tutor' ? (s + 1) * 20 : (s + 1) * 10, where: 'dashboard', ...(await metrics()) });
    console.log(JSON.stringify(series.slice(-2)));
  }
  const det = await snapshotDetached(cdp);
  console.log(JSON.stringify(det, null, 1));
  const out = fs.existsSync(OUTF) ? JSON.parse(fs.readFileSync(OUTF)) : {};
  out['E_retainedDom_' + mode] = { note: 'no CPU throttling; metrics after two forced GCs; cdpNodes counts attached + detached DOM nodes', unit: mode === 'tutor' ? 'questions answered' : 'lessons opened', series, heapSnapshot: det };
  fs.writeFileSync(OUTF, JSON.stringify(out, null, 2));
  await browser.close();
})();
