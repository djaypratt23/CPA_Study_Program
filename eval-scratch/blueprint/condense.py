"""
Condense eval-scratch/blueprint/coverage-<SEC>.md topic tables into one compact table per section
(for EVALUATION.md §3.2). Usage (repo root): python3 eval-scratch/blueprint/condense.py FAR AUD REG TCP
"""
import re, sys

def cells(line):
    return [c.strip() for c in line.strip().strip('|').split('|')]

for sec in sys.argv[1:]:
    txt = open(f'eval-scratch/blueprint/coverage-{sec}.md').read()
    lines = txt.splitlines()
    hi = next(i for i, l in enumerate(lines) if l.startswith('| Area |'))
    head = cells(lines[hi])
    col = {h.split(' (')[0].lower(): i for i, h in enumerate(head)}
    find = lambda *names: next(i for n, i in col.items() if any(n.startswith(x) for x in names))
    ci = dict(area=0, topic=1, n=2, tasks=3, mods=find('repo modules'), p=find('practice'), e=find('exam'), tbs=find('tbs'), rating=find('rating'))
    rows, counts = [], {}
    for l in lines[hi + 2:]:
        if not l.startswith('|'):
            break
        c = cells(l)
        if len(c) < len(head) - 1:
            continue
        rating = re.sub(r'[*]', '', c[ci['rating']]).split()[0] if c[ci['rating']] else ''
        counts[rating] = counts.get(rating, 0) + 1
        ok = c[ci['tasks']].count('✓')
        n = re.match(r'(\d+)\s*\(([^)]*)\)', c[ci['n']])
        topic = re.sub(r'\*\*', '', c[ci['topic']])
        topic = re.sub(r'^.*›\s*', lambda m: re.match(r'^(\S+)', c[ci['topic']].replace('**', '')).group(1) + ' ', topic)
        mods = re.sub(r'(far|aud|reg|tcp)-', '', c[ci['mods']])
        rows.append(f"| {c[ci['area']]} | {topic[:70]} | {n.group(1) if n else c[ci['n']]} ({n.group(2) if n else ''}) | {ok} | {mods[:60]} | {c[ci['p']]} | {c[ci['e']]} | {c[ci['tbs']]} | {rating} |")
    print(f'\n#### {sec} — ratings: ' + ', '.join(f'{k} {v}' for k, v in sorted(counts.items(), key=lambda kv: ['Full', 'Partial', 'Thin', 'Missing'].index(kv[0]) if kv[0] in ['Full', 'Partial', 'Thin', 'Missing'] else 9)) + '\n')
    print('| Area | Group/Topic | Tasks (R/Ap/An/E) | Covered at level | Repo modules | Practice MCQ | Exam MCQ | TBS p/e | Rating |')
    print('|---|---|---|---|---|---|---|---|---|')
    print('\n'.join(rows))
