import json,sys
d=json.load(open('eval-scratch/content/sample-tcp.json'))
for i,q in enumerate(d['mcqs']):
    print(f"=== [{i+1}] {q['id']} | {q['moduleId']} | pool={q.get('pool')} | skill={q.get('skill')} | diff={q.get('difficulty')} | calc={q.get('calc')} | needsReview={q.get('needsReview')} | area={q.get('area')}")
    print("STEM:",q['stem'])
    for c in q['choices']:
        print(f"  ({c['id']}) {c['text']}  -- {c.get('explanation','')}  [{c.get('trap','')}]")
    print("ANSWER:",q['answer'])
    print("EXPL:",q.get('explanation'))
    extra={k:v for k,v in q.items() if k not in ('id','moduleId','pool','stem','choices','answer','explanation','skill','difficulty','calc','needsReview','area','lessonCitations','taxYear')}
    if extra: print("EXTRA:",json.dumps(extra)[:800])
    print()
