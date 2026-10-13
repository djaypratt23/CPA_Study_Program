#!/usr/bin/env python3
"""Supplementary scan: TF-IDF cosine over stem + keyed-answer text, plus normalized key-text matching.
Reports pairs NOT already in candidates.tsv. Writes scripts/extra_pairs.tsv."""
import json, glob, re, math, collections, csv
STOP = set('the a an of to and or in on for is are be by with as at that this from it its which what was were will not no their has have had who when how than then into per following company year does do may must should can her his she he'.split())
def toks(s): return [w for w in re.findall(r"[a-z0-9§%$,.]+", s.lower().replace(',', '')) if w not in STOP and w.strip('.')]
qs = []
for f in glob.glob('content/*/modules/*/questions.json') + glob.glob('content/*/exam-questions/*.json'):
    for q in json.load(open(f)):
        q['_f'] = f; q.setdefault('moduleId', f.split('/')[3]); qs.append(q)
key = {q['id']: next(c['text'] for c in q['choices'] if c['id'] == q['answer']) for q in qs}
docs = [collections.Counter([t.strip('.') for t in toks(q['stem'])] + ['K:' + t.strip('.') for t in toks(key[q['id']])]) for q in qs]
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
cand = set()
for l in inv.values():
    for a in range(len(l)):
        for b in range(a + 1, len(l)): cand.add((l[a], l[b]))
have = set()
for r in csv.DictReader(open('review/batches/C-duplicates/candidates.tsv'), delimiter='\t'):
    have.add(frozenset((r['id_a'], r['id_b'])))
out = []
for a, b in cand:
    va, vb = vec[a], vec[b]
    s = sum(x * vb.get(t, 0) for t, x in va.items())
    if s >= 0.50:
        qa, qb = qs[a], qs[b]
        if frozenset((qa['id'], qb['id'])) in have: continue
        out.append((round(s, 3), qa['id'], qb['id'], qa['moduleId'], qb['moduleId'], qa['pool'], qb['pool'], key[qa['id']], key[qb['id']], qa['stem'], qb['stem']))
out.sort(reverse=True)
with open('review/batches/C-duplicates/scripts/extra_pairs.tsv', 'w') as fh:
    fh.write('cos\tid_a\tid_b\tmod_a\tmod_b\tpool_a\tpool_b\tkey_a\tkey_b\tstem_a\tstem_b\n')
    for r in out: fh.write('\t'.join(map(str, r)) + '\n')
print(N, 'mcqs;', len(out), 'new pairs >=0.50;', sum(1 for r in out if 'exam' in (r[5], r[6])), 'involve exam;',
      sum(1 for r in out if r[1].split('-')[0] != r[2].split('-')[0]), 'cross-prefix')
