#!/usr/bin/env python3
"""Flatten all platform content into one TSV-like JSONL corpus of text units.

Each unit: {file, kind, item, field, text}
 - JSON: every string leaf, tagged with the nearest enclosing object's id (or term), and the key path.
 - Markdown: each non-empty line, tagged with line number and nearest heading.
Usage: python3 flatten.py > corpus.jsonl
"""
import json, os, sys, re

ROOT = 'content'

def kind_of(path):
    if path.endswith('lesson.md'): return 'lesson'
    if '/review/' in path: return 'review'
    if 'glossary' in path: return 'glossary'
    if path.endswith('flashcards.json'): return 'flashcard'
    if '/tbs/' in path: return 'tbs'
    if '/exam-questions/' in path: return 'exam-mcq'
    if path.endswith('questions.json'): return 'mcq'
    if '/exams/' in path: return 'mock'
    return 'other'

def walk(o, path, cur_id, out, fpath, top_id):
    if isinstance(o, dict):
        nid = o.get('id') if isinstance(o.get('id'), str) else None
        if 'term' in o and isinstance(o['term'], str): nid = 'term:' + o['term']
        # for nested choice/rows ids, keep the parent item id prefix
        if nid and cur_id and not nid.startswith(cur_id.split(':')[0][:3]) and len(nid) <= 4:
            nid2 = cur_id + '#' + nid
        elif nid and cur_id and len(nid) <= 6:
            nid2 = cur_id + '#' + nid
        else:
            nid2 = nid or cur_id
        for k, v in o.items():
            walk(v, path + [k], nid2, out, fpath, top_id)
    elif isinstance(o, list):
        for i, v in enumerate(o):
            walk(v, path + [str(i)], cur_id, out, fpath, top_id)
    elif isinstance(o, str):
        if path and path[-1] in ('id', 'answer', 'trap', 'skill', 'pool', 'kind', 'moduleId', 'unitId', 'section'):
            return
        out.append({'file': fpath, 'kind': kind_of(fpath), 'item': cur_id or top_id, 'field': '.'.join(path), 'text': o})

def main():
    out = []
    for dp, dn, fn in os.walk(ROOT):
        dn.sort()
        for f in sorted(fn):
            p = os.path.join(dp, f)
            if '/exams/' in p: continue
            if f.endswith('.json'):
                d = json.load(open(p))
                top = d.get('id') if isinstance(d, dict) else None
                walk(d, [], top, out, p, top)
            elif f.endswith('.md'):
                head = ''
                mod = p.split('/')[-2] if p.endswith('lesson.md') else os.path.basename(p)[:-3]
                for n, line in enumerate(open(p), 1):
                    s = line.rstrip('\n')
                    if s.startswith('#'): head = s.lstrip('#').strip()
                    if s.strip():
                        out.append({'file': p, 'kind': kind_of(p), 'item': mod, 'field': f'L{n} [{head[:50]}]', 'text': s})
    for u in out:
        print(json.dumps(u, ensure_ascii=False))

if __name__ == '__main__':
    main()
