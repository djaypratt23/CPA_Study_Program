#!/usr/bin/env python3
"""Cross-module near-duplicate scan of MCQ stems (word-shingle Jaccard). Writes review/batches/C-duplicates/candidates.tsv"""
import json, glob, re, itertools, collections
STOP=set('the a an of to and or in on for is are be by with as at that this from it its which what was were will not no their has have had who when how than then into per following company year'.split())
def toks(s): return [w for w in re.findall(r"[a-z0-9§%$]+", s.lower()) if w not in STOP]
qs=[]
for f in glob.glob('content/*/modules/*/questions.json'):
    mid=f.split('/')[3]
    for q in json.load(open(f)): q['moduleId']=mid; q['_f']=f; qs.append(q)
for f in glob.glob('content/*/exam-questions/*.json'):
    for q in json.load(open(f)): q['_f']=f; qs.append(q)
sets=[(q, set(toks(q['stem'])), set(zip(toks(q['stem']),toks(q['stem'])[1:]))) for q in qs]
# inverted index on rare tokens to limit pairs
df=collections.Counter(t for _,s,_ in sets for t in s)
idx=collections.defaultdict(list)
for i,(q,s,b) in enumerate(sets):
    for t in s:
        if df[t]<=40: idx[t].append(i)
cand=set()
for t,l in idx.items():
    for a,b in itertools.combinations(l,2): cand.add((a,b))
out=[]
for a,b in cand:
    qa,sa,ba=sets[a]; qb,sb,bb=sets[b]
    j=len(sa&sb)/len(sa|sb); jb=len(ba&bb)/max(1,len(ba|bb))
    if j>=0.55 or jb>=0.45:
        out.append((round(j,2),round(jb,2),qa['id'],qb['id'],qa['moduleId'],qb['moduleId'],qa['pool'],qb['pool'],qa['answer'],qb['answer']))
out.sort(reverse=True)
with open('review/batches/C-duplicates/candidates.tsv','w') as fh:
    fh.write('jaccard\tbigram_j\tid_a\tid_b\tmod_a\tmod_b\tpool_a\tpool_b\tkey_a\tkey_b\n')
    for r in out: fh.write('\t'.join(map(str,r))+'\n')
print(len(qs),'mcqs;',len(out),'candidate pairs;', sum(1 for r in out if r[4]!=r[5]),'cross-module;', sum(1 for r in out if r[6]=='exam' or r[7]=='exam'),'involve exam pool')
