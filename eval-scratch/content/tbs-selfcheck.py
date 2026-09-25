"""
Consistency check: every numeric TBS row's answer vs. the final **bold** number in its own explanation,
and each '=' arithmetic chain of plain + and - terms in the explanation.
NOTE: the "=" chain check is heuristic; its 4 current hits are regex false positives (verified by hand).
Run from the repo root:  python3 eval-scratch/content/tbs-selfcheck.py
"""
import json, glob, re
num = lambda s: float(s.replace(',', '').replace('(', '-').replace(')', ''))
issues = 0
for f in sorted(glob.glob('content/*/tbs/*.json')):
    t = json.load(open(f))
    for p in t['parts']:
        if p['kind'] != 'numeric':
            continue
        for r in p['rows']:
            ex = r['explanation']
            bolds = re.findall(r'\*\*\(?\$?(-?[\d,]+(?:\.\d+)?)\)?%?\*\*', ex)
            if bolds:
                b = num(bolds[-1])
                a = r['answer']
                if abs(abs(b) - abs(a)) > max(r.get('tolerance', 1), 0.5):
                    issues += 1
                    print(f"{f} {t['id']}/{p['id']}/{r['id']}: answer {a} vs bold {bolds[-1]} (tol {r.get('tolerance', 1)})")
            # simple chains like "1,351,120 + 486,654 = 1,837,782" (only + and - of plain numbers)
            for m in re.finditer(r'((?:[\d,]+(?:\.\d+)?\s*[+−-]\s*)+[\d,]+(?:\.\d+)?)\s*=\s*\**\$?([\d,]+(?:\.\d+)?)', ex):
                expr, res = m.group(1), m.group(2)
                terms = re.findall(r'([+−-]?)\s*([\d,]+(?:\.\d+)?)', expr)
                total = 0.0
                for sign, v in terms:
                    total += -num(v) if sign in '−-' and sign else num(v)
                if abs(total - num(res)) > 1.01:
                    issues += 1
                    print(f"{f} {t['id']}/{p['id']}/{r['id']}: '{expr.strip()} = {res}' but sums to {total:,.2f}")
print('issues:', issues)
