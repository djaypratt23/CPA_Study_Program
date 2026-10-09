#!/usr/bin/env python3
"""Build the coverage ledger and per-batch review packets.

Usage: python3 review/tools/setup_batches.py   (run from the repo root)

Writes review/ledger.csv (only if it does not exist yet, so progress is never
overwritten) and review/batches/<batch>/{manifest.json,blind.md,items.json,cues.md}.
"""
import csv, glob, json, os, re, sys, itertools
import yaml

ROOT = os.getcwd()
REV = os.path.join(ROOT, 'review')
BATCH_DIR = os.path.join(REV, 'batches')
SECS = ['far', 'aud', 'reg', 'tcp']

def load_sections():
    mods = []
    for s in SECS:
        cfg = yaml.safe_load(open(f'content/sections/{s}.yaml'))
        order = 0
        for a in cfg['areas']:
            for u in a['units']:
                for m in u['modules']:
                    mods.append(dict(section=cfg['id'], area=a['id'], unit=u['id'], id=m['id'], title=m['title'], optional=bool(m.get('optional')), order=order))
                    order += 1
    return mods

def main():
    mods = load_sections()
    modix = {m['id']: m for m in mods}
    mcqs, cards, tbs, lessons, exams, docs, gloss = [], [], [], [], [], [], []
    for s in SECS:
        for qf in sorted(glob.glob(f'content/{s}/modules/*/questions.json')):
            mid = qf.split('/')[3]
            for q in json.load(open(qf)):
                q.setdefault('moduleId', mid); q['_file'] = qf; mcqs.append(q)
        for qf in sorted(glob.glob(f'content/{s}/exam-questions/*.json')):
            for q in json.load(open(qf)):
                q['_file'] = qf; mcqs.append(q)
        for ff in sorted(glob.glob(f'content/{s}/modules/*/flashcards.json')):
            mid = ff.split('/')[3]
            for c in json.load(open(ff)):
                c['moduleId'] = mid; c['_file'] = ff; cards.append(c)
        for tf in sorted(glob.glob(f'content/{s}/tbs/*.json')):
            t = json.load(open(tf)); t['_file'] = tf; tbs.append(t)
        for lf in sorted(glob.glob(f'content/{s}/modules/*/lesson.md')):
            lessons.append(dict(id=lf.split('/')[3], _file=lf))
        for ef in sorted(glob.glob(f'content/{s}/exams/*.json')):
            e = json.load(open(ef)); e['_file'] = ef; exams.append(e)
        for df in sorted(glob.glob(f'content/{s}/review/*.md')):
            docs.append(dict(id=os.path.basename(df)[:-3], section=s.upper(), _file=df))
    for gf in sorted(glob.glob('content/glossary/*.json')):
        for g in json.load(open(gf)):
            g['_file'] = gf; gloss.append(g)

    # ---- batches
    batches = {}
    def B(bid):
        return batches.setdefault(bid, dict(id=bid, items=[]))
    def add(bid, iid, typ, sec, mod, f):
        B(bid)['items'].append(dict(id=iid, type=typ, section=sec, module=mod, file=f))
    for m in mods:
        B('M-' + m['id']).update(section=m['section'], module=m['id'], title=m['title'], optional=m['optional'], unit=m['unit'], area=m['area'])
    for l in lessons:
        m = modix[l['id']]; add('M-' + l['id'], l['id'], 'lesson', m['section'], l['id'], l['_file'])
    for q in mcqs:
        m = modix[q['moduleId']]; add('M-' + q['moduleId'], q['id'], 'mcq-' + q['pool'], m['section'], q['moduleId'], q['_file'])
    for c in cards:
        m = modix[c['moduleId']]; add('M-' + c['moduleId'], c['id'], 'flashcard', m['section'], c['moduleId'], c['_file'])
    for t in tbs:
        mid = t['moduleIds'][0]; add('M-' + mid, t['id'], 'tbs-' + t['pool'], t['section'], mid, t['_file'])
    for d in docs:
        add('G-' + d['section'], d['id'], 'review-doc', d['section'], '', d['_file'])
    for g in gloss:
        add('G-' + g['section'], f"gloss:{g['section']}:{g['term']}", 'glossary', g['section'], g.get('moduleId', ''), g['_file'])
    for e in exams:
        add('X-' + e['section'], e['id'], 'exam-form', e['section'], '', e['_file'])

    # ---- ledger (never overwrite)
    ledger = os.path.join(REV, 'ledger.csv')
    if not os.path.exists(ledger):
        with open(ledger, 'w', newline='') as fh:
            w = csv.writer(fh)
            w.writerow(['id', 'type', 'section', 'module', 'reviewed', 'reviewer_batch', 'findings_count'])
            for b in sorted(batches.values(), key=lambda b: b['id']):
                for it in b['items']:
                    w.writerow([it['id'], it['type'], it['section'], it['module'], 'n', b['id'], 0])
        print('wrote', ledger)

    mcq_by_id = {q['id']: q for q in mcqs}
    tbs_by_id = {t['id']: t for t in tbs}
    card_by_id = {c['id']: c for c in cards}
    for b in batches.values():
        d = os.path.join(BATCH_DIR, b['id']); os.makedirs(d, exist_ok=True)
        json.dump(b, open(os.path.join(d, 'manifest.json'), 'w'), indent=1)
        if not b['id'].startswith('M-'):
            continue
        qs = [mcq_by_id[i['id']] for i in b['items'] if i['type'].startswith('mcq')]
        ts = [tbs_by_id[i['id']] for i in b['items'] if i['type'].startswith('tbs')]
        cs = [card_by_id[i['id']] for i in b['items'] if i['type'] == 'flashcard']
        write_blind(d, b, qs, ts)
        full = dict(mcqs=[{k: v for k, v in q.items()} for q in qs], flashcards=cs, tbs_files=[t['_file'] for t in ts])
        json.dump(full, open(os.path.join(d, 'items.json'), 'w'), indent=1, ensure_ascii=False)
        write_cues(d, qs)
    print('batches', len(batches), 'items', sum(len(b['items']) for b in batches.values()))

def strip_md(s):
    return s

def write_blind(d, b, qs, ts):
    out = [f"# Blind packet — {b['id']} ({b.get('title','')})", '',
           'Answer every item **before** opening items.json or the TBS files. No keys or explanations appear here.', '']
    order = {'lesson': 0, 'practice': 1, 'exam': 2}
    for q in sorted(qs, key=lambda q: (order[q['pool']], q['id'])):
        out.append(f"## {q['id']}  [pool: {q['pool']}]")
        out.append(q['stem'])
        for c in q['choices']:
            out.append(f"- ({c['id']}) {c['text']}")
        out.append('')
    for t in ts:
        out.append(f"## TBS {t['id']}  [pool: {t['pool']}; {t['minutes']} min; {t['title']}]")
        out.append('**Instructions:** ' + t['instructions'])
        for e in t.get('exhibits', []):
            out.append(f"### Exhibit: {e['title']}\n{e['content']}")
        for p in t['parts']:
            k = p['kind']
            out.append(f"### Part {p['id']} ({k}): {p['prompt']}")
            if k == 'numeric':
                for r in p['rows']:
                    out.append(f"- [{r['id']}] {r['label']}" + (f" ({r['unit']})" if r.get('unit') else ''))
            elif k == 'dropdown':
                if p.get('options'):
                    out.append('Options (shared): ' + ' | '.join(p['options']))
                for r in p['rows']:
                    out.append(f"- [{r['id']}] {r['label']}" + (('  — options: ' + ' | '.join(r['options'])) if r.get('options') else ''))
            elif k == 'journal':
                out.append('Accounts available: ' + ' | '.join(p['accounts']) + f"  (max {p.get('maxLines',6)} lines)")
            elif k == 'docreview':
                for s in p['segments']:
                    if 'id' in s:
                        out.append(f"  [[{s['id']}: \"{s['original']}\" — options: " + ' | '.join(s['options']) + ']]')
                    else:
                        out.append('  ' + s['text'])
            elif k == 'research':
                for e in p['excerpts']:
                    out.append(f"- [{e['id']}] {e['citation']}: {e['text']}")
            elif k == 'review':
                out.append(f"Column: {p.get('preparedLabel','Prepared amount')}")
                for r in p['rows']:
                    out.append(f"- [{r['id']}] {r['label']}: prepared {r['prepared']}")
        out.append('')
    open(os.path.join(d, 'blind.md'), 'w').write('\n'.join(out))

ABS = re.compile(r"\b(always|never|all|none|only|must|cannot|any|every|no)\b", re.I)
STOP = set('the a an of to and or in on for is are be by with as at that this from it its which what was were will not no its their has have had who whom when how under than then into per'.split())

def toks(s):
    return [w for w in re.findall(r"[a-z0-9§%$.,']+", s.lower()) if w not in STOP]

def write_cues(d, qs):
    lines = ['# Automated cue hints (heuristics only — judge each). REVEALS KEY INFORMATION: open only after blind-answers.csv is saved.', '', '| id | flags |', '|---|---|']
    for q in qs:
        ch = {c['id']: c['text'] for c in q['choices']}
        L = {k: len(v) for k, v in ch.items()}
        key = q['answer']; flags = []
        others = [L[k] for k in L if k != key]
        if L[key] > max(others) and L[key] >= 1.25 * max(others): flags.append('key much longest')
        elif L[key] > max(others): flags.append('key longest')
        if L[key] < min(others) and L[key] * 1.25 <= min(others): flags.append('key much shortest')
        txt = ' '.join(ch.values()).lower()
        if re.search(r'all of the above|none of the above|both (a|b)|a and b', txt): flags.append('all/none/both-of-above option')
        abs_d = [k for k in ch if k != key and ABS.search(ch[k])]
        if abs_d and not ABS.search(ch[key]): flags.append('absolutes only in distractors ' + ','.join(abs_d))
        st = set(toks(q['stem']))
        ov = {k: len(set(toks(v)) & st) for k, v in ch.items()}
        if ov[key] >= 2 and ov[key] > max(ov[k] for k in ov if k != key): flags.append(f'key repeats most stem words ({ov[key]})')
        if flags: lines.append(f"| {q['id']} | {'; '.join(flags)} |")
    # within-module near duplicates
    lines += ['', '## Near-duplicate stems within this batch (Jaccard ≥ 0.5 on word sets)', '']
    for a, b in itertools.combinations(qs, 2):
        sa, sb = set(toks(a['stem'])), set(toks(b['stem']))
        if not sa or not sb: continue
        j = len(sa & sb) / len(sa | sb)
        if j >= 0.5: lines.append(f"- {a['id']} ~ {b['id']}: {j:.2f}")
    # skill/difficulty distribution
    from collections import Counter
    lines += ['', '## Label distribution (practice + exam pools)', '']
    pq = [q for q in qs if q['pool'] != 'lesson']
    lines.append('skill: ' + str(dict(Counter(q['skill'] for q in pq))))
    lines.append('difficulty: ' + str(dict(Counter(q.get('difficulty', 2) for q in pq))))
    lines.append('key letters: ' + str(dict(Counter(q['answer'] for q in pq))))
    lines.append('calc: ' + str(dict(Counter(bool(q.get('calc', False)) for q in pq))))
    open(os.path.join(d, 'cues.md'), 'w').write('\n'.join(lines) + '\n')

if __name__ == '__main__':
    main()
