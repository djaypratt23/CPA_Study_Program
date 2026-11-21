// Retainer paths for detached DOM in a heap snapshot saved by leak.cjs (HEAP_OUT=...). Prints, for a few detached
// elements matching a pattern, the shortest retainer chain from a GC root (BFS over reverse edges, weak edges skipped).
// Usage: node retainers.cjs <snapshot> [nameRegex] [samples=3]
const fs = require('fs');
const [file, pat = 'prose-lesson \\[&amp;_p\\]:my-0', nS = '3'] = process.argv.slice(2);
const snap = JSON.parse(fs.readFileSync(file, 'utf8'));
const m = snap.snapshot.meta;
const NF = m.node_fields.length, EF = m.edge_fields.length;
const f = (k) => m.node_fields.indexOf(k), ef = (k) => m.edge_fields.indexOf(k);
const [nType, nName, nEdges, nDet, nId] = ['type', 'name', 'edge_count', 'detachedness', 'id'].map(f);
const [eType, eName, eTo] = ['type', 'name_or_index', 'to_node'].map(ef);
const nodeTypes = m.node_types[nType], edgeTypes = m.edge_types[eType];
const { nodes, edges, strings } = snap;
const count = nodes.length / NF;
const first = new Uint32Array(count + 1);
for (let i = 0, e = 0; i < count; i++) { first[i] = e; e += nodes[i * NF + nEdges] * EF; first[i + 1] = e; }
const name = (i) => strings[nodes[i * NF + nName]];
const type = (i) => nodeTypes[nodes[i * NF + nType]];
const det = (i) => nodes[i * NF + nDet];
// reverse edges
const rcount = new Uint32Array(count);
for (let e = 0; e < edges.length; e += EF) if (edgeTypes[edges[e + eType]] !== 'weak') rcount[edges[e + eTo] / NF]++;
const rfirst = new Uint32Array(count + 1);
for (let i = 0; i < count; i++) rfirst[i + 1] = rfirst[i] + rcount[i];
const rsrc = new Uint32Array(rfirst[count]), redge = new Uint32Array(rfirst[count]);
const fill = new Uint32Array(count);
for (let i = 0; i < count; i++)
  for (let e = first[i]; e < first[i + 1]; e += EF) {
    if (edgeTypes[edges[e + eType]] === 'weak') continue;
    const to = edges[e + eTo] / NF;
    const k = rfirst[to] + fill[to]++;
    rsrc[k] = i; redge[k] = e;
  }
const ename = (e) => { const t = edgeTypes[edges[e + eType]]; return t === 'element' || t === 'hidden' ? `[${edges[e + eName]}]` : strings[edges[e + eName]]; };
// forward BFS from root (node 0) to get distances, then walk back along the shortest path
const dist = new Int32Array(count).fill(-1), via = new Int32Array(count).fill(-1);
dist[0] = 0;
const q = [0];
for (let h = 0; h < q.length; h++) {
  const i = q[h];
  for (let e = first[i]; e < first[i + 1]; e += EF) {
    if (edgeTypes[edges[e + eType]] === 'weak') continue;
    const to = edges[e + eTo] / NF;
    if (dist[to] === -1) { dist[to] = dist[i] + 1; via[to] = e; q.push(to); }
  }
}
const parentOf = (i) => { const e = via[i]; if (e < 0) return -1; // find source node of edge e
  let lo = 0, hi = count - 1; while (lo < hi) { const mid = (lo + hi + 1) >> 1; if (first[mid] <= e) lo = mid; else hi = mid - 1; } return lo; };
const re = new RegExp(pat);
const targets = [];
for (let i = 0; i < count && targets.length < Number(nS); i++) if (det(i) === 2 && re.test(name(i))) targets.push(i);
console.log(`detached matches sampled: ${targets.length}`);
for (const t of targets) {
  const chain = [];
  let i = t;
  while (i > 0 && chain.length < 40) {
    const e = via[i];
    const p = parentOf(i);
    if (p < 0) break;
    chain.push(`${type(p)}:${name(p).slice(0, 70)}${det(p) === 2 ? ' (detached)' : ''} --${edgeTypes[edges[e + eType]]}:${String(ename(e)).slice(0, 40)}-->`);
    i = p;
  }
  console.log(`\n== ${name(t).slice(0, 80)} (distance ${dist[t]})`);
  console.log(chain.reverse().join('\n'));
}
