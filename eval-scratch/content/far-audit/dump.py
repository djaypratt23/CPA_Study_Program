import json,glob,sys
files = sorted(glob.glob('modules/*/questions.json'))+sorted(glob.glob('exam-questions/*.json'))
sel = sys.argv[1:]
for f in files:
    if sel and not any(s in f for s in sel): continue
    for q in json.load(open(f)):
        ch = ' | '.join(f"{c['id']}) {c['text']}" for c in q['choices'])
        print(f"[{q['id']}] {q['stem']}\n   {ch}\n   KEY={q['answer']} :: {q['explanation']}")
