#!/usr/bin/env python3
"""Build classification.tsv and the generated findings (leaks, REG<->TCP, duplicate clusters, >3 clusters).
Keeps the hand-written findings C-duplicates-001..003 already in findings.jsonl."""
import json, glob, csv, re, collections
B = 'review/batches/C-duplicates/'
qs = {}
for f in glob.glob('content/*/modules/*/questions.json') + glob.glob('content/*/exam-questions/*.json'):
    for q in json.load(open(f)):
        q['_f'] = f; q.setdefault('moduleId', f.split('/')[3]); qs[q['id']] = q
def key(i): q = qs[i]; return next(c['text'] for c in q['choices'] if c['id'] == q['answer'])
def sec(i): return qs[i]['_f'].split('/')[1].upper()
def pool(i): return qs[i]['pool']
# ---- classification.tsv
cand = list(csv.DictReader(open(B + 'candidates.tsv'), delimiter='\t'))
heads = re.findall(r'### Pair (\d+) .*?\n\[(\S+) \|.*?\n.*?\n.*?\n\[(\S+) \|', open(B + 'pairs-1.md').read() + open(B + 'pairs-2.md').read())
assert len(heads) == 510
cls = {}
for line in open(B + 'scripts/cls_raw.txt'):
    n, c, note = line.rstrip('\n').split('|', 2); cls[int(n)] = (c, note)
assert sorted(cls) == list(range(1, 511))
pairs = []
with open(B + 'classification.tsv', 'w') as fh:
    fh.write('pair\tid_a\tid_b\tclass\tnote\n')
    for (n, a, b), r in zip(heads, cand):
        n = int(n); assert (a, b) == (r['id_a'], r['id_b']), (n, a, b)
        c, note = cls[n]; fh.write(f'{n}\t{a}\t{b}\t{c}\t{note}\n'); pairs.append((a, b, c, note, f'pair {n}'))
for line in open(B + 'scripts/extra_confirmed.txt'):
    if line.startswith('#') or not line.strip(): continue
    a, b, c, note = line.rstrip('\n').split('|', 3)
    assert a in qs and b in qs, (a, b)
    pairs.append((a, b, c, note, 'extra scan'))
# ---- helpers
def strip(n):
    h, _, t = n.partition(': ')
    return t if t and re.search(r'<->|duplicate|mirror|Exam-pool|Lesson|REG|TCP', h) else n
def files(ids): return ', '.join(sorted({qs[i]['_f'] for i in ids}))
def mods(ids): return ', '.join(sorted({qs[i]['moduleId'] for i in ids}))
def secs(ids): return '/'.join(sorted({sec(i) for i in ids}))
out = []
def add(**k): out.append(k)
# ---- S2 practice/lesson <-> exam leaks, one per section (section of the exam item)
leak = collections.defaultdict(list); seen = set()
regtcp = []
for a, b, c, note, src in pairs:
    if c not in ('b', 'c'): continue
    pa, pb = pool(a), pool(b)
    if (pa == 'exam') != (pb == 'exam'):
        ex, other = (a, b) if pa == 'exam' else (b, a)
        if (ex, other) in seen: continue
        seen.add((ex, other)); leak[sec(ex)].append((other, ex, strip(note)))
    else:
        regtcp.append((a, b, strip(note), pa == 'exam' and pb == 'exam'))
for s in ['AUD', 'FAR', 'REG', 'TCP']:
    L = leak[s]; ex_ids = sorted({e for _, e, _ in L}); oth = sorted({o for o, _, _ in L})
    lst = '; '.join(f'{o} ({pool(o)}, {sec(o)}) = {e}: {t}' for o, e, t in sorted(L, key=lambda x: x[1]))
    add(severity='S2', category='item-quality', section=s, module=mods(ex_ids + oth), item=','.join(ex_ids + oth), file=files(ex_ids + oth),
        issue=f'{len(ex_ids)} {s} mock-exam (pool "exam") items also appear, the same or nearly so (same fact, same answer, often identical numbers or options), in a practice or lesson pool ({len(L)} pairs). A student who has done the practice item recognizes the exam item, which inflates mock scores and weakens the mock as a readiness signal.',
        evidence='Pairs (practice/lesson item = exam item: shared fact): ' + lst,
        source='Review brief check 7 (duplicates); word-shingle scan (review/tools/dupscan.py) plus TF-IDF stem+key scan (review/batches/C-duplicates/scripts/tfidf_scan.py), each pair opened and compared',
        fix='For each pair, rewrite the exam item (new fact pattern, numbers and distractors, or a different angle such as application instead of recall) or replace it with a fresh item, so no exam-pool item has a practice or lesson twin. Then add a CI check that runs dupscan/tfidf_scan across pools and fails on exam-vs-practice similarity of 0.6 or more.',
        confidence='high')
# ---- S3 REG<->TCP cross-section duplicates (non-exam, and exam<->exam)
rt = [(a, b, t, e) for a, b, t, e in regtcp if {sec(a), sec(b)} == {'REG', 'TCP'} or a.split('-')[0] != b.split('-')[0]]
ids = sorted({x for a, b, _, _ in rt for x in (a, b)})
add(severity='S3', category='item-quality', section='REG/TCP', module=mods(ids), item=','.join(ids), file=files(ids),
    issue=f'{len(rt)} REG<->TCP cross-section duplicate pairs: the same item (often identical stem, numbers and key) appears in both a REG and a TCP pool. Students take both sections, so they drill the same item twice. {sum(1 for x in rt if x[3])} of the pairs are exam-pool items in both sections, so the second mock repeats the first.',
    evidence='Pairs: ' + '; '.join(f'{a} = {b}{" [both exam]" if e else ""}: {t}' for a, b, t, e in rt),
    source='Review brief check 7 (duplicates); dupscan.py and tfidf_scan.py results, each pair opened',
    fix='Keep each fact in the section whose Blueprint owns it. REG-only basics stay in REG. In the TCP twin, raise it to the TCP planning or compliance angle (e.g., ask for the planning consequence or a multi-step computation) instead of repeating the REG item. Rewrite one item of each exam<->exam pair.',
    confidence='high')
# ---- manual >3 clusters
K = [
 ('Form 1065 due date (15th day of 3rd month)', ['tcp-po-06', 'tcp-po-26', 'tcp-pf-11', 'reg-pt-08', 'reg-x5-41']),
 ('Form 1120 due date (April 15)', ['tcp-cc-29', 'tcp-cc-05', 'reg-cc-06', 'reg-x5-39']),
 ('Issuer lead partner rotation (5 years on, 5 off)', ['aud-spi-chk2', 'aud-spi-16', 'aud-spi-21', 'aud-x1-20']),
 ('Earliest auditor report date = sufficient appropriate evidence obtained', ['aud-uo2-03', 'aud-uo2-12', 'aud-uo2-22', 'aud-se-04']),
 ('$25,000 active-participation rental allowance phase-out (50% over $100,000 MAGI)', ['tcp-pa-chk1', 'tcp-pa-11', 'tcp-pa-08', 'reg-bri-chk2', 'reg-bri-09', 'reg-x4-09', 'tcp-x1-09', 'tcp-x1-31']),
 ('Goodwill impairment = carrying amount over fair value, capped at goodwill', ['far-imp-05', 'far-imp-13', 'far-imp-14', 'far-imp-29', 'far-imp-30', 'far-x2-11']),
 ('Post-2017 NOL limited to 80% of taxable income', ['tcp-cc-11', 'tcp-cc-43', 'tcp-cr-36', 'reg-cc-03', 'reg-cc-29', 'reg-x5-04', 'reg-x5-24']),
 ('Dividends-received deduction percentage and taxable-income limit', ['reg-cc-01', 'reg-cc-02', 'reg-cc-21', 'reg-x5-23', 'reg-x5-37', 'tcp-cc-23', 'tcp-cc-34', 'tcp-cc-35']),
 ('2025 SALT cap ($40,000, phased down 30% over $500,000 MAGI, floor $10,000)', ['reg-id-11', 'reg-id-16', 'reg-id-28', 'reg-x4-39', 'tcp-ip-10', 'tcp-ip-30', 'tcp-ip-31', 'tcp-x1-22']),
 ('2025 Sec.179 limit $2.5M with dollar-for-dollar phase-out over $4M', ['reg-dep-04', 'tcp-x4-08', 'tcp-cr2-chk1', 'tcp-cr2-19']),
 ('Kiddie tax: unearned income over $2,700 taxed at parents\' rate', ['tcp-ip-07', 'reg-ot-04', 'tcp-x1-37', 'tcp-x1-04']),
 ('Sec.1245 recapture characterization on equipment sales', ['tcp-ad-11', 'tcp-ad-18', 'tcp-ad-26', 'tcp-ad-27', 'tcp-x4-11', 'reg-cg-chk2', 'reg-cg-10']),
 ('Traditional IRA deduction phase-out ($79,000-$89,000 single active participant)', ['tcp-re-chk1', 'tcp-re-28', 'reg-adj-09', 'reg-x4-12']),
 ('American opportunity credit ($3,000 tuition -> $2,250, four times)', ['reg-cr-14', 'reg-cr-chk2', 'reg-x4-17', 'reg-x4-31', 'tcp-x1-21', 'tcp-re-08']),
 ('Sec.6694(a) preparer penalty = greater of $1,000 or 50% of fee', ['reg-pen-chk2', 'reg-pen-13', 'reg-x1-15', 'reg-x1-06']),
 ('Sec.1244 ordinary loss limit ($50,000 single / $100,000 MFJ)', ['tcp-fl-03', 'reg-cg-08', 'tcp-ad-38', 'tcp-x3-05']),
 ('Capital interest received for services = ordinary income at FMV', ['tcp-pf-01', 'tcp-pf-30', 'tcp-x2-07', 'tcp-x2-31']),
 ('Holding period tacks for contributed capital assets', ['tcp-pf-04', 'tcp-pf-18', 'tcp-pf-32', 'tcp-fl-20']),
 ('Representation letter dated as of the auditor\'s report date', ['aud-wr-pre1', 'aud-wr-21', 'aud-x3-27', 'aud-x3-52']),
 ('Guaranteed payments are deductible and ordinary to the partner', ['reg-pt-35', 'tcp-po-28', 'reg-x5-33', 'reg-x5-15', 'tcp-x2-10']),
 ('Tax Court: 90 days to petition, no prepayment', ['reg-irs-chk1', 'reg-irs-24', 'reg-irs-34', 'reg-irs-pre1', 'reg-irs-14', 'reg-x1-19']),
 ('401(k) 2025 deferral with age-50 / age 60-63 catch-up', ['tcp-re-01', 'tcp-re-16', 'tcp-re-27', 'tcp-x1-17']),
 ('SE tax / half-SE-tax of $7,065', ['reg-ot-12', 'reg-ot-chk1', 'reg-x4-32', 'reg-x4-19']),
 ('Fair value in principal market = price less transport, not transaction costs', ['far-fv-chk1', 'far-fv-12', 'far-fv-19', 'far-fv-23']),
 ('Predecessor-audited prior year (report not reissued) -> other-matter paragraph', ['aud-rp-25', 'aud-uo2-14', 'aud-sp-chk2', 'aud-rp-chk1', 'aud-x4-21']),
]
inK = set()
for name, ids in K:
    for i in ids: assert i in qs, i
    inK |= set(ids)
    ex = [i for i in ids if pool(i) == 'exam']
    ev = '; '.join(f'{i} ({pool(i)}): "{qs[i]["stem"][:90]}{"..." if len(qs[i]["stem"]) > 90 else ""}" -> {key(i)}' for i in ids)
    add(severity='S3', category='item-quality', section=secs(ids), module=mods(ids), item=','.join(ids), file=files(ids),
        issue=f'Cluster: "{name}" is tested the same way {len(ids)} times across the bank{f" ({len(ex)} in exam pools)" if ex else ""}. This is over the brief\'s threshold of about 3 and crowds out other Blueprint content.',
        evidence=ev, source='Review brief check 7 (same fact tested the same way more than about 3 times); candidates graph plus key-phrase searches',
        fix='Keep the 2-3 strongest items (one recall, one computation, one application or trap item). Retire the rest or rewrite them to test a different rule from the same topic, and keep any exam-pool survivor unlike the practice items.',
        confidence='high')
# ---- S3 duplicate clusters from class-a edges (components), skipping those inside a manual cluster
g = collections.defaultdict(set); edgenote = {}
for a, b, c, note, src in pairs:
    if c == 'a': g[a].add(b); g[b].add(a); edgenote[frozenset((a, b))] = (strip(note), src)
done = set(); comps = []
for v in sorted(g):
    if v in done: continue
    st = [v]; comp = set()
    while st:
        x = st.pop()
        if x in comp: continue
        comp.add(x); st.extend(g[x] - comp)
    done |= comp; comps.append(sorted(comp))
skipped = 0
for comp in comps:
    if set(comp) <= inK: skipped += 1; continue
    notes = sorted({edgenote[frozenset((a, b))][0] for a in comp for b in comp if frozenset((a, b)) in edgenote})
    pls = {pool(i) for i in comp}
    kind = 'exam-pool' if pls == {'exam'} else ('lesson and practice' if 'lesson' in pls else 'practice')
    ev = '; '.join(f'{i} ({pool(i)}): "{qs[i]["stem"][:80]}{"..." if len(qs[i]["stem"]) > 80 else ""}" -> {key(i)[:70]}' for i in comp)
    fix = ('Remove one item from the exam pool or rewrite it to test a different fact; a mock that draws both gives a free answer.' if kind == 'exam-pool' else
           f'Keep {comp[0]} (or the better-written item) and retire the other(s), or rewrite them to test a different angle, numbers or trap, so practice time covers more of the Blueprint.' +
           (' A lesson check that repeats a practice item is acceptable only if the practice twin is varied.' if 'lesson' in pls else ''))
    add(severity='S3', category='item-quality', section=secs(comp), module=mods(comp), item=','.join(comp), file=files(comp),
        issue=f'Near-duplicate {kind} items ({len(comp)}): same stem and same tested fact ({"; ".join(notes)}). This is redundant.',
        evidence=ev, source='Review brief check 7 (duplicates); dupscan.py / tfidf_scan.py, each pair opened and compared',
        fix=fix, confidence='high')
# ---- write: keep hand-written findings, append generated
hand = [json.loads(l) for l in open(B + 'findings.jsonl') if l.strip() and json.loads(l)['id'] in ('C-duplicates-001', 'C-duplicates-002', 'C-duplicates-003')]
with open(B + 'findings.jsonl', 'w') as fh:
    n = 0
    for f in hand: fh.write(json.dumps(f, ensure_ascii=False) + '\n'); n += 1
    for f in out:
        n += 1; f = {'id': f'C-duplicates-{n:03d}', **f}; fh.write(json.dumps(f, ensure_ascii=False) + '\n')
c = collections.Counter(x[2] for x in pairs[:510])
print('classes', dict(c), '| extra confirmed', len(pairs) - 510, '| findings', n, '| a-components', len(comps), 'skipped in K', skipped,
      '| leaks', {s: len(leak[s]) for s in leak}, '| regtcp', len(rt))
