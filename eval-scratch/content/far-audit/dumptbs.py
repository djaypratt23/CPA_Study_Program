import json,glob,sys
for f in sorted(glob.glob('tbs/*.json')):
    if sys.argv[1:] and not any(s in f for s in sys.argv[1:]): continue
    t=json.load(open(f))
    print(f"##### {t['id']} ({t['pool']}, {t['skill']}) {t['title']}\nINSTR: {t['instructions']}")
    for e in t.get('exhibits',[]): print(f"EXH[{e['title']}]: {e['content']}")
    for p in t['parts']:
        print(f"-- PART {p['id']} ({p['kind']}): {p['prompt']}")
        if p['kind'] in ('numeric',):
            for r in p['rows']: print(f"   {r['id']} {r['label']} = {r['answer']} (tol {r.get('tolerance',1)}) :: {r['explanation']}")
        elif p['kind']=='dropdown':
            for r in p['rows']: print(f"   {r['id']} {r['label']} = [{r['answer']}] opts={r.get('options') or p.get('options')} :: {r['explanation']}")
        elif p['kind']=='journal':
            print("   accounts:", p['accounts']); 
            for l in p['lines']: print("   ", l)
            print("   tol", p.get('tolerance',1), "::", p['explanation'])
        elif p['kind']=='docreview':
            for s in p['segments']:
                if 'id' in s: print(f"   [{s['id']}] orig='{s['original']}' -> ans='{s['answer']}' opts={s['options']} :: {s['explanation']}")
                else: print("   TXT:", s['text'][:300])
        elif p['kind']=='research':
            for e in p['excerpts']: print(f"   ex {e['id']} {e['citation']}: {e['text'][:250]}")
            print("   ANSWER", p['answer'], "::", p['explanation'])
