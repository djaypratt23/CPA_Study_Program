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
taxnote = ''
if sec in ('REG', 'TCP'):
    taxnote = '''
## Tax-year policy for this review (REG/TCP)
The platform teaches tax year 2025 law (with OBBBA 2025 provisions). Per `review/reference/tax-2025.md`, OBBBA provisions effective in 2024–2025 are testable from July 1, 2026, and provisions effective January 1, 2026 appear to be testable from July 1, 2026 too, under the six-month rule. That second point is not confirmed by AICPA text. The orchestrator files ONE cross-cutting finding about the platform's 2025-only scope, so do **not** file a finding on every item just because 2026 law might also be testable. Do file findings for:
(a) an item whose answer would differ under 2025 vs 2026 law but whose stem doesn't state the tax year (S2);
(b) a 2025 figure or rule that is wrong for 2025 (S1);
(c) a statement that a 2026 provision is "not tested" or a "2026 preview" where it appears testable now (S2 currency, medium confidence);
(d) inconsistency between the item, the lesson `taxYear` and the section `taxYear`.
The REG/TCP Blueprints reportedly say inflation-indexed amounts are given in the question, not memorised. An item that requires recalling an indexed amount the stem doesn't give is an S2 (realism and fairness). An item that requires recalling a statutory, non-indexed amount (for example $250,000/$500,000 for §121, or the $10,000/$40,000 SALT cap, or the $25,000 rental allowance) is fine.
'''
print(out + taxnote + '\n' + std + '\n\n' + fmt)
