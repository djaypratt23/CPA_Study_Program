#!/usr/bin/env python3
import json, os, sys
from collections import Counter
bid = sys.argv[1]
man = json.load(open(f'review/batches/{bid}/manifest.json'))
head = open('review/tools/agent_prompt_head.md').read()
std = open('review/batches/_standards-2-4.md').read()
fmt = open('review/batches/_finding-format.md').read()
sec = man['section']
refs = {'FAR': ['review/reference/far-standards.md'], 'AUD': ['review/reference/aud-standards.md'],
        'REG': ['review/reference/tax-2025.md'], 'TCP': ['review/reference/tax-2025.md']}[sec] + ['review/reference/blueprint-notes.md']
refs = [r for r in refs if os.path.exists(r)] or ['(none available yet — rely on web search)']
c = Counter(i['type'] for i in man['items'])
tbsfiles = [i['file'] for i in man['items'] if i['type'].startswith('tbs')]
lesson = [i['file'] for i in man['items'] if i['type'] == 'lesson'][0]
out = head
for k, v in {'{BATCH}': bid, '{SECTION}': sec, '{MODULE}': man['module'], '{TITLE}': man['title'], '{UNIT}': man['unit'], '{AREA}': man['area'],
             '{OPTIONAL}': ' — marked `optional: true` (outside the current Blueprint per the platform; verify that judgment)' if man.get('optional') else '',
             '{NITEMS}': str(len(man['items'])), '{COUNTS}': ', '.join(f'{v} {k}' for k, v in sorted(c.items())),
             '{LESSON}': lesson, '{TBSFILES}': ', '.join(f'`{f}`' for f in tbsfiles) or '(none)', '{SECLOWER}': sec.lower(),
             '{REFS}': ', '.join(f'`{r}`' for r in refs)}.items():
    out = out.replace(k, v)
print(out + std + '\n\n' + fmt)
