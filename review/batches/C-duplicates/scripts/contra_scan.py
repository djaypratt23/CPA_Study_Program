#!/usr/bin/env python3
"""Contradiction scan: stem-only TF-IDF cosine >= 0.6 (pairs not in candidates.tsv) whose keyed answers differ.
Numbers in stems must match exactly (same fact pattern), so differing keys are suspicious."""
import json, glob, re, math, collections, csv
STOP = set('the a an of to and or in on for is are be by with as at that this from it its which what was were will not no their has have had who when how than then into per following company year does do may must should can her his she he'.split())
def toks(s): return [w.strip('.') for w in re.findall(r"[a-z0-9§%$,.]+", s.lower().replace(',', '')) if w not in STOP and w.strip('.')]
def nums(s): return sorted(re.findall(r'\d[\d,]*(?:\.\d+)?', s.replace(',', '')))
qs = []
for f in glob.glob('content/*/modules/*/questions.json') + glob.glob('content/*/exam-questions/*.json'):
    for q in json.load(open(f)): q['_f'] = f; q.setdefault('moduleId', f.split('/')[3]); qs.append(q)
key = {q['id']: next(c['text'] for c in q['choices'] if c['id'] == q['answer']) for q in qs}
docs = [collections.Counter(toks(q['stem'])) for q in qs]
N = len(docs); df = collections.Counter(t for d in docs for t in d)
vec = []
for d in docs:
    v = {t: (1 + math.log(c)) * math.log(N / df[t]) for t, c in d.items()}
    n = math.sqrt(sum(x * x for x in v.values())) or 1
    vec.append({t: x / n for t, x in v.items()})
inv = collections.defaultdict(list)
for i, v in enumerate(vec):
    for t in v:
        if df[t] <= 60: inv[t].append(i)
have = {frozenset((r['id_a'], r['id_b'])) for r in csv.DictReader(open('review/batches/C-duplicates/candidates.tsv'), delimiter='\t')}
seen = set(); out = []
for l in inv.values():
    for a in range(len(l)):
        for b in range(a + 1, len(l)):
            i, j = l[a], l[b]
            if (i, j) in seen: continue
            seen.add((i, j))
            s = sum(x * vec[j].get(t, 0) for t, x in vec[i].items())
            if s < 0.6: continue
            qa, qb = qs[i], qs[j]
            if frozenset((qa['id'], qb['id'])) in have: continue
            if nums(qa['stem']) != nums(qb['stem']): continue
            ka, kb = key[qa['id']], key[qb['id']]
            if re.sub(r'\W', '', ka.lower()) == re.sub(r'\W', '', kb.lower()): continue
            out.append((round(s, 3), qa['id'], qb['id'], qa['pool'], qb['pool'], ka, kb, qa['stem'], qb['stem']))
out.sort(reverse=True)
for r in out: print(f"{r[0]} {r[1]}({r[3][0]})~{r[2]}({r[4][0]}) K: {r[5][:60]} || {r[6][:60]}\n   A: {r[7][:140]}\n   B: {r[8][:140]}")
print(len(out), 'pairs')
