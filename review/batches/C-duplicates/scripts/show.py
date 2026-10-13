#!/usr/bin/env python3
"""Print full MCQs (stem, choices, explanations, key, file) for the given ids."""
import json, glob, sys
qs = {}
for f in glob.glob('content/*/modules/*/questions.json') + glob.glob('content/*/exam-questions/*.json'):
    for q in json.load(open(f)):
        q['_f'] = f; q.setdefault('moduleId', f.split('/')[3]); qs[q['id']] = q
for i in sys.argv[1:]:
    q = qs.get(i)
    if not q: print('MISSING', i); continue
    print(f"== {i} | {q['moduleId']} | {q.get('pool')} | key {q['answer']} | {q['_f']}")
    print('  STEM:', q['stem'])
    for c in q['choices']:
        print(f"  ({c['id']}) {c['text']}  -- {c.get('explanation','')}")
    print('  EXPL:', q.get('explanation', ''))
