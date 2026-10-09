import json,glob,yaml,collections
qs={}
for f in glob.glob('content/*/modules/*/questions.json'):
    mid=f.split('/')[3]
    for q in json.load(open(f)): q['moduleId']=mid; qs[q['id']]=q
for f in glob.glob('content/*/exam-questions/*.json'):
    for q in json.load(open(f)): qs[q['id']]=q
tbs={}
for f in glob.glob('content/*/tbs/*.json'):
    t=json.load(open(f)); tbs[t['id']]=t
mod2area={}; mod2unit={}; secs={}
for s in ['far','aud','reg','tcp']:
    cfg=yaml.safe_load(open(f'content/sections/{s}.yaml')); secs[cfg['id']]=cfg
    for a in cfg['areas']:
        for u in a['units']:
            for m in u['modules']: mod2area[m['id']]=a['id']; mod2unit[m['id']]=u['id']
forms=sorted(glob.glob('content/*/exams/*.json'))
allforms={}
for f in forms:
    e=json.load(open(f)); allforms[e['id']]=e
    sec=secs[e['section']]
    mcq=[i for t in e['testlets'] if t['kind']=='mcq' for i in t['items']]
    tb=[i for t in e['testlets'] if t['kind']=='tbs' for i in t['items']]
    area=collections.Counter(mod2area[qs[i]['moduleId']] for i in mcq)
    skill=collections.Counter(qs[i]['skill'] for i in mcq)
    diff=collections.Counter(qs[i].get('difficulty',2) for i in mcq)
    keys=collections.Counter(qs[i]['answer'] for i in mcq)
    tskill=collections.Counter(tbs[i]['skill'] for i in tb)
    tarea=collections.Counter(mod2area[tbs[i]['moduleIds'][0]] for i in tb)
    tmin=sum(tbs[i]['minutes'] for i in tb)
    kinds=collections.Counter(p['kind'] for i in tb for p in tbs[i]['parts'])
    print(f"== {e['id']} ({e['title']}) testlets {[ (t['kind'],len(t['items'])) for t in e['testlets']]} cfg {[(t['kind'],t['count']) for t in sec['exam']['testlets']]}")
    print('  MCQ area %:', {k: round(100*v/len(mcq)) for k,v in sorted(area.items())}, ' blueprint:', {a['id']:(a['allocation']['min'],a['allocation']['max']) for a in sec['areas']})
    print('  MCQ skill:', dict(skill), ' diff:', dict(sorted(diff.items())), ' keys:', dict(sorted(keys.items())), ' calc:', sum(1 for i in mcq if qs[i].get('calc')))
    print('  TBS:', len(tb), 'skill', dict(tskill), 'area', dict(tarea), 'sum minutes', tmin, 'part kinds', dict(kinds))
# overlap across forms
ids={k:set(i for t in v['testlets'] for i in t['items']) for k,v in allforms.items()}
for s in ['far','aud','reg','tcp']:
    fs=sorted(k for k in ids if k.startswith(s))
    for a in range(len(fs)):
        for b in range(a+1,len(fs)):
            print(f'  overlap {fs[a]} ∩ {fs[b]}: {len(ids[fs[a]]&ids[fs[b]])}')
# exam-pool items not on any form
onform=set().union(*ids.values())
ex=[q for q in qs.values() if q['pool']=='exam']
print('exam-pool MCQs', len(ex), 'not on any form', len([q for q in ex if q['id'] not in onform]))
et=[t for t in tbs.values() if t['pool']=='exam']
print('exam TBS', len(et), 'not on any form', [t['id'] for t in et if t['id'] not in onform])
