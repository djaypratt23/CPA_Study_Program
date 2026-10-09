#!/usr/bin/env python3
"""Source of truth for U-journeys findings. Run to (re)write findings.jsonl and ledger.csv."""
import json, os
B = os.path.join(os.path.dirname(__file__), '..')
F = []
def add(sev, section, item, file, issue, evidence, fix, confidence='high', expected='', observed='', steps='', source='Hands-on walkthrough (Playwright, Chromium) of the built app on vite preview :4173', module=''):
    F.append(dict(severity=sev, category='usability', section=section, module=module, item=item, file=file, issue=issue,
                  evidence=evidence, source=source, fix=fix, confidence=confidence, expected=expected, observed=observed, steps=steps))

exec(open(os.path.join(os.path.dirname(__file__), 'findings_list.py')).read())

with open(os.path.join(B, 'findings.jsonl'), 'w') as fh:
    for i, f in enumerate(F, 1):
        fh.write(json.dumps({'id': f'U-journeys-{i:03d}', **f}, ensure_ascii=False) + '\n')
with open(os.path.join(B, 'ledger.csv'), 'w') as fh:
    fh.write('id,type,reviewed,findings_count,note\n')
from collections import Counter
print(len(F), Counter(f['severity'] for f in F))
