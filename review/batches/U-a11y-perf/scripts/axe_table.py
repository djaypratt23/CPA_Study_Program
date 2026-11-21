#!/usr/bin/env python3
"""Print the axe summary table (route x {desktop, phone} x {light, dark}) as Markdown for notes.md.
Usage: python3 axe_table.py [suffix]   (suffix e.g. -recheck reads axe/axe-d-l-recheck.json etc. where present)"""
import json, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
AXE = os.path.join(HERE, '..', 'axe')
suffix = sys.argv[1] if len(sys.argv) > 1 else ''
combos = [('d', 'l', 'Desktop light'), ('d', 'd', 'Desktop dark'), ('m', 'l', 'Phone light'), ('m', 'd', 'Phone dark')]
data, order = {}, []
for vp, th, _ in combos:
    p = os.path.join(AXE, f'axe-{vp}-{th}{suffix}.json')
    if not os.path.exists(p):
        continue
    for r in json.load(open(p))['results']:
        if r['name'] not in order:
            order.append(r['name'])
        v = ' '.join(f"{x['id']}({len(x['nodes'])})" for x in r['violations']) or 'clean'
        inc = sum(len(x['nodes']) for x in r['incomplete'])
        data[(r['name'], vp, th)] = v + (f' · {inc}?' if inc else '')
print('| State | ' + ' | '.join(c[2] for c in combos) + ' |')
print('|---|' + '---|' * len(combos))
for n in order:
    print(f'| {n} | ' + ' | '.join(data.get((n, vp, th), 'n/a') for vp, th, _ in combos) + ' |')
