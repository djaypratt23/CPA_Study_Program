#!/usr/bin/env python3
"""Regex search over the flattened corpus (see flatten.py).
Usage: python3 s.py CORPUS 'regex' [-w WIDTH] [-k kind1,kind2] [-x exclude_regex] [-c] [-f file_substr]
Prints: kind | item | file | field :: snippet
"""
import json, re, sys, argparse
ap = argparse.ArgumentParser()
ap.add_argument('corpus'); ap.add_argument('pat')
ap.add_argument('-w', type=int, default=110)
ap.add_argument('-k', default='')
ap.add_argument('-x', default='')
ap.add_argument('-f', default='')
ap.add_argument('-c', action='store_true', help='count only by value')
ap.add_argument('-i', action='store_true')
a = ap.parse_args()
fl = re.I if a.i else 0
rx = re.compile(a.pat, fl)
xr = re.compile(a.x, fl) if a.x else None
kinds = set(a.k.split(',')) if a.k else None
n = 0
from collections import Counter
cnt = Counter()
for line in open(a.corpus):
    u = json.loads(line)
    if kinds and u['kind'] not in kinds: continue
    if a.f and a.f not in u['file']: continue
    t = u['text']
    for m in rx.finditer(t):
        s = max(0, m.start() - a.w); e = min(len(t), m.end() + a.w)
        snip = t[s:e].replace('\n', ' ⏎ ')
        if xr and xr.search(snip): continue
        n += 1
        if a.c:
            cnt[m.group(0)] += 1
        else:
            f = u['file'].replace('content/', '')
            print(f"{u['kind']:9}| {u['item']} | {f} | {u['field'][:40]} :: {snip}")
        break
if a.c:
    for k, v in cnt.most_common(): print(v, k)
print(f'-- {n} units', file=sys.stderr)
