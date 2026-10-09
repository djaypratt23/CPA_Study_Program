#!/usr/bin/env python3
"""Sample >=10% (min 3) of a batch's no-finding items and print them for independent re-verification.

Usage: python3 review/tools/spotcheck.py <batch-id> [--pct 10] [--types mcq,flashcard,tbs,lesson]
Sampling is deterministic per batch (seeded by the batch id). Numeric items are over-sampled.
"""
import csv, json, math, random, sys, hashlib
bid = sys.argv[1]
pct = float(sys.argv[sys.argv.index('--pct') + 1]) if '--pct' in sys.argv else 10
rows = list(csv.DictReader(open(f'review/batches/{bid}/ledger.csv')))
clean = [r['id'] for r in rows if str(r.get('findings_count', '0')).strip() in ('0', '')]
items = json.load(open(f'review/batches/{bid}/items.json'))
mcq = {q['id']: q for q in items['mcqs']}
cards = {c['id']: c for c in items['flashcards']}
tbs = {}
for f in items['tbs_files']:
    t = json.load(open(f)); tbs[t['id']] = t
n = max(3, math.ceil(len(clean) * pct / 100))
rng = random.Random(int(hashlib.md5(bid.encode()).hexdigest()[:8], 16))
calc = [i for i in clean if i in mcq and mcq[i].get('calc')]
other = [i for i in clean if i not in calc]
k_calc = min(len(calc), max(1, round(n * 0.5)))
pick = rng.sample(calc, k_calc) + rng.sample(other, min(len(other), n - k_calc))
print(f'# {bid}: {len(clean)} no-finding items of {len(rows)}; sampling {len(pick)}\n')
for i in pick:
    if i in mcq:
        q = mcq[i]
        print(f"## {i} [{q['pool']}] skill={q['skill']} diff={q.get('difficulty',2)} calc={q.get('calc',False)} key={q['answer']}")
        print('STEM:', q['stem'])
        for c in q['choices']:
            print(f"  ({c['id']}){'*' if c['id']==q['answer'] else ' '} {c['text']}  — {c['explanation']}" + (f" [trap:{c['trap']}]" if c.get('trap') else ''))
        print('EXPL:', q['explanation']); print()
    elif i in cards:
        c = cards[i]; print(f"## {i} [flashcard]\nFRONT: {c['front']}\nBACK: {c['back']}\n")
    elif i in tbs:
        t = tbs[i]; print(f"## {i} [TBS {t['pool']}] skill={t['skill']} minutes={t['minutes']}\n(see {next(f for f in items['tbs_files'] if t['id'] in f)})\n")
    else:
        print(f'## {i} [lesson or other]\n')
