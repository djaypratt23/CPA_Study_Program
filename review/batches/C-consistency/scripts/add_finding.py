#!/usr/bin/env python3
"""Append one finding (JSON object on stdin) to findings.jsonl with the next local id."""
import json, sys, os
p = os.path.join(os.path.dirname(__file__), '..', 'findings.jsonl')
f = json.load(sys.stdin)
n = 0
if os.path.exists(p):
    n = sum(1 for l in open(p) if l.strip())
f = {'id': f'C-consistency-{n+1:03d}', **f}
with open(p, 'a') as fh:
    fh.write(json.dumps(f, ensure_ascii=False) + '\n')
print(f['id'])
