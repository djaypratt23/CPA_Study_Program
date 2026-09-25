"""Blueprint representative-task counts by Area and skill. Usage: python3 eval-scratch/blueprint/skillmix.py <json-dir>"""
import json, sys
K = ['remembering', 'application', 'analysis', 'evaluation']
print('| Section | Area (allocation) | Groups | Topics | Tasks | R&U | App | Analysis | Eval |')
print('|---|---|---|---|---|---|---|---|---|')
for s in ['FAR', 'AUD', 'REG', 'TCP']:
    A = json.load(open(f'{sys.argv[1]}/{s}.json'))
    tot = dict.fromkeys(K, 0)
    for a in A:
        c = dict.fromkeys(K, 0)
        for g in a['groups']:
            for t in g['topics']:
                for k in t['tasks']:
                    c[k['skills'][0]] += 1
        for k in K: tot[k] += c[k]
        print(f"| {s} | {a['id']}. {a['title']} ({a['min']}–{a['max']}%) | {len(a['groups'])} | {sum(len(g['topics']) for g in a['groups'])} | {sum(c.values())} | {c['remembering']} | {c['application']} | {c['analysis']} | {c['evaluation']} |")
    n = sum(tot.values())
    print(f"| **{s}** | **Total** | | | **{n}** | {tot['remembering']} ({100*tot['remembering']/n:.0f}%) | {tot['application']} ({100*tot['application']/n:.0f}%) | {tot['analysis']} ({100*tot['analysis']/n:.0f}%) | {tot['evaluation']} ({100*tot['evaluation']/n:.0f}%) |")
