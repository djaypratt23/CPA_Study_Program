"""Print the extracted Blueprint outline. Usage: python3 eval-scratch/blueprint/outline.py <json-dir>"""
import json, re, sys
ab = {'remembering': 'R', 'application': 'Ap', 'analysis': 'An', 'evaluation': 'E'}
ws = lambda t: re.sub(r'\s+', ' ', t).strip()
for s in ['FAR', 'AUD', 'REG', 'TCP']:
    A = json.load(open(f'{sys.argv[1]}/{s}.json'))
    print('=====', s)
    for a in A:
        print('Area %s %s (%d-%d%%)' % (a['id'], a['title'], a['min'], a['max']))
        for g in a['groups']:
            print('  %s. %s' % (g['id'], ws(g['title'])[:90]))
            for t in g['topics']:
                sk = [ab[k['skills'][0]] if len(k['skills']) == 1 else '?%s%s' % (k['skills'], k['ink']) for k in t['tasks']]
                print('     %s. %-62s %d  %s' % (t['id'], ws(t['title'])[:62], len(t['tasks']), ' '.join(sk)))
