import json,glob,sys
files=sys.argv[1:]
for f in files:
    t=json.load(open(f))
    lines=open(f).read().split('\n')
    print(f"######## {t['id']} ({f.split('/')[-1]}) NR={t.get('needsReview')} skill={t.get('skill')}")
    print("INSTR:",t.get('instructions'))
    for e in t.get('exhibits',[]):
        print(f"--EXHIBIT {e['title']}:\n{e['content']}")
    for p in t['parts']:
        print(f"--PART {p['id']} ({p['kind']}): {p.get('prompt','')}")
        if p['kind'] in ('numeric','dropdown'):
            for r in p['rows']:
                ln=next((i+1 for i,l in enumerate(lines) if f'"id": "{r["id"]}"' in l),'?')
                extra=f" opts={r['options']}" if 'options' in r else f" tol={r.get('tolerance')}"
                print(f"   [{r['id']}@L{ln}] {r['label']} => {r['answer']}{extra} | {r.get('explanation','')}")
        elif p['kind']=='research':
            for e in p['excerpts']: print(f"   excerpt {e['id']}: {e.get('citation')} :: {e.get('text','')[:300]}")
            print("   ANSWER:",p['answer'],"|",p.get('explanation'))
        elif p['kind']=='journal':
            for l in p['lines']: print("   ",l)
        else:
            print(json.dumps(p)[:1500])
    print()
