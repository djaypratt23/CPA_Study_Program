#!/usr/bin/env python3
"""Merge one finished batch into review/findings.jsonl and review/ledger.csv.

Usage: python3 review/tools/merge_batch.py <batch-id> [--check]

Re-merging a batch replaces its earlier findings (they move to
review/batches/_superseded.jsonl) and appends the new ones with new F-ids.
"""
import csv, json, os, re, sys

REV = 'review'
SEV = {'S1', 'S2', 'S3', 'S4'}
CATS = {'content-correctness', 'item-quality', 'tbs', 'lesson', 'currency', 'coverage', 'flow', 'pedagogy',
        'usability', 'accessibility', 'performance'}
REQ = ['severity', 'category', 'section', 'module', 'item', 'file', 'issue', 'evidence', 'source', 'fix', 'confidence']

def fail(msg):
    print('ERROR:', msg); sys.exit(1)

def main():
    bid = sys.argv[1]; check_only = '--check' in sys.argv
    bdir = os.path.join(REV, 'batches', bid)
    man = json.load(open(os.path.join(bdir, 'manifest.json')))
    ids = [i['id'] for i in man['items']]
    # batch ledger
    bl = os.path.join(bdir, 'ledger.csv')
    if not os.path.exists(bl): fail(f'{bl} missing')
    rows = {r['id']: r for r in csv.DictReader(open(bl))}
    missing = [i for i in ids if i not in rows]
    extra = [i for i in rows if i not in ids]
    notrev = [i for i in ids if i in rows and rows[i].get('reviewed', '').strip().lower() != 'y']
    problems = []
    if missing: problems.append(f'{len(missing)} manifest items missing from batch ledger: {missing[:10]}')
    if extra: problems.append(f'{len(extra)} unknown ids in batch ledger: {extra[:10]}')
    if notrev: problems.append(f'{len(notrev)} items not reviewed: {notrev[:10]}')
    # findings
    fl = os.path.join(bdir, 'findings.jsonl')
    finds = []
    if os.path.exists(fl):
        for n, line in enumerate(open(fl), 1):
            line = line.strip()
            if not line: continue
            try: f = json.loads(line)
            except Exception as e: problems.append(f'findings line {n}: bad JSON {e}'); continue
            for k in REQ:
                if k not in f: problems.append(f"finding {f.get('id', n)}: missing {k}")
            if f.get('severity') not in SEV: problems.append(f"finding {f.get('id', n)}: bad severity {f.get('severity')}")
            if f.get('category') not in CATS: problems.append(f"finding {f.get('id', n)}: bad category {f.get('category')}")
            if f.get('severity') in ('S1', 'S2') and (not str(f.get('evidence', '')).strip() or not str(f.get('fix', '')).strip()):
                problems.append(f"finding {f.get('id', n)}: S1/S2 needs evidence and fix")
            if f.get('confidence') not in ('high', 'medium', 'low'): problems.append(f"finding {f.get('id', n)}: bad confidence")
            items = [x.strip() for x in str(f.get('item', '')).split(',') if x.strip()]
            unk = [x for x in items if x not in ids and x != '']
            f['_items'] = items; f['_unknown_items'] = unk
            finds.append(f)
    cnt = {}
    for f in finds:
        for x in f['_items']:
            cnt[x] = cnt.get(x, 0) + 1
    for i in ids:
        if i in rows:
            try: c = int(rows[i].get('findings_count') or 0)
            except ValueError: c = -1
            if c != cnt.get(i, 0): problems.append(f'{i}: ledger findings_count {c} != findings referencing it {cnt.get(i, 0)}')
    if problems:
        print('\n'.join('PROBLEM: ' + p for p in problems[:60]))
        if len(problems) > 60: print(f'... {len(problems) - 60} more')
    print(f'{bid}: {len(ids)} items, {len(finds)} findings', {s: sum(1 for f in finds if f.get('severity') == s) for s in sorted(SEV)})
    if check_only or problems:
        sys.exit(1 if problems else 0)
    # merge findings
    gpath = os.path.join(REV, 'findings.jsonl')
    existing = [json.loads(l) for l in open(gpath)] if os.path.exists(gpath) else []
    keep = [f for f in existing if f.get('batch') != bid]
    sup = [f for f in existing if f.get('batch') == bid]
    if sup:
        with open(os.path.join(REV, 'batches', '_superseded.jsonl'), 'a') as fh:
            for f in sup: fh.write(json.dumps(f, ensure_ascii=False) + '\n')
    nxt = max([int(f['id'][2:]) for f in existing if re.match(r'F-\d+$', f.get('id', ''))] + [0]) + 1
    out = []
    for f in finds:
        g = {'id': f'F-{nxt:04d}'}; nxt += 1
        for k in ['severity', 'category', 'section', 'module', 'item', 'file', 'issue', 'evidence', 'source', 'fix', 'confidence']:
            g[k] = f.get(k)
        for k, v in f.items():
            if k not in g and not k.startswith('_') and k != 'id': g[k] = v
        g['batch'] = bid; g['local_id'] = f.get('id')
        out.append(g)
    with open(gpath, 'w') as fh:
        for f in keep + out: fh.write(json.dumps(f, ensure_ascii=False) + '\n')
    # ledger
    lpath = os.path.join(REV, 'ledger.csv')
    L = list(csv.DictReader(open(lpath)))
    for r in L:
        if r['id'] in rows and r['reviewer_batch'] == bid:
            r['reviewed'] = 'y'; r['findings_count'] = str(cnt.get(r['id'], 0))
    with open(lpath, 'w', newline='') as fh:
        w = csv.DictWriter(fh, fieldnames=['id', 'type', 'section', 'module', 'reviewed', 'reviewer_batch', 'findings_count'])
        w.writeheader(); w.writerows(L)
    with open(os.path.join(REV, 'batches', '_merged.txt'), 'a') as fh:
        fh.write(f'{bid}\t{len(finds)}\n')
    print(f'merged {bid}: +{len(out)} findings ({len(sup)} superseded)')

if __name__ == '__main__':
    main()
