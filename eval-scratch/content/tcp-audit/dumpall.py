import json,glob,re,sys
files=sorted(glob.glob('content/tcp/modules/*/questions.json'))+sorted(glob.glob('content/tcp/exam-questions/*.json'))
for f in files:
    lines=open(f).read().split('\n')
    d=json.load(open(f))
    qs=d if isinstance(d,list) else d.get('questions',[])
    for q in qs:
        ln=next((i+1 for i,l in enumerate(lines) if f'"id": "{q["id"]}"' in l),'?')
        nr='NR ' if q.get('needsReview') else ''
        print(f"## {nr}{q['id']} [{f.split('/')[-2] if 'modules' in f else f.split('/')[-1]}:{ln}] sk={q.get('skill','')[:3]} ty={q.get('taxYear','')}")
        print("Q:",q['stem'])
        for c in q['choices']:
            mark='*' if c['id']==q['answer'] else ' '
            print(f" {mark}{c['id']}) {c['text']}")
        print("E:",q.get('explanation',''))
