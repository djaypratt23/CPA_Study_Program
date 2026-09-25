"""Independent recomputation of TCP sample arithmetic (seed 20260923) plus key outside-sample checks.
Run: python3 eval-scratch/content/tcp-audit/recompute.py
Each check prints OK/MISMATCH against the repo key."""
import json, re

results = []
def chk(item, row, computed, keyed, tol=0.0, note=""):
    ok = abs(computed - keyed) <= tol + 1e-9
    results.append((item, row, computed, keyed, ok, note))

# ---------------- Sample MCQs (calc items) ----------------
# tcp-x1-21 AOTC, $3,000 expenses, MAGI 100k MFJ (< 160k)
chk("tcp-x1-21", "AOTC", min(3000, 2000) + 0.25 * max(0, min(3000, 4000) - 2000), 2250)
# tcp-ip-04 NIIT single
magi = 180000 + 30000 + 20000; nii = 50000
chk("tcp-ip-04", "NIIT", 0.038 * min(nii, magi - 200000), 1140)
# tcp-sc-01 NQSO
chk("tcp-sc-01", "ordinary", (40 - 12) * 500, 14000)
chk("tcp-sc-01", "LTCG", 55 * 500 - 40 * 500, 7500)
# tcp-x2-06 partnership outside basis
chk("tcp-x2-06", "A basis", 40000 - 30000 + 0.5 * 30000, 25000)
# tcp-eo-03 UBTI silo
chk("tcp-eo-03", "UBTI", max(50000, 0) + 0 * max(-20000, 0), 50000)
# tcp-cc-04 M-2
chk("tcp-cc-04", "M-2 ending RE", 500000 + 180000 - 60000 - 20000, 600000)
# tcp-po-01 OBI
chk("tcp-po-01", "OBI", 500000 - 200000 - 50000, 250000)
# tcp-x3-04 §357(c)
gain = max(0, 50000 - 30000)
chk("tcp-x3-04", "gain", gain, 20000)
chk("tcp-x3-04", "stock basis", 30000 + gain - 50000, 0)
# tcp-x4-05 §1031 boot given
chk("tcp-x4-05", "recognized", 0, 0)
chk("tcp-x4-05", "new basis", 540000 - (500000 - 200000), 240000)
# tcp-cr2-01 5-yr MACRS HY
chk("tcp-cr2-01", "yr1 dep", 50000 * (2 / 5) * 0.5, 10000)
# distractor d $6,667: what mid-quarter would give (Q2 = 25%)
mq_q2 = 50000 * (2 / 5) * (7.5 / 12)   # mid-quarter, 2nd quarter (25%)
results.append(("tcp-cr2-01", "distractor d 'mid-quarter' check", mq_q2, 6667, abs(mq_q2 - 6667) < 1, "Q2 mid-quarter = 12,500, not 6,667 -> choice-d rationale wrong"))
# tcp-fl-10 redemption sanity: 45% -> 30% of 'otherwise unrelated' group
x = (45 - 30) / (1 - 0.30)          # shares redeemed per 100 outstanding
chk("tcp-fl-10", "after % < 80% of 45%", 30, 30, note=f"80% x 45% = {0.8*45:.1f}%; shares redeemed/100 = {x:.2f}")

# ---------------- Sample TBS ----------------
# tcp-tbs-u2-gift-709
AE = 19000
son_each = 60000 / 2 - AE
dau_each = max(0, 30000 / 2 - AE)
ch_each = max(0, 100000 / 2 - AE - (100000 / 2 - AE))
niece_each = max(0, 10000 / 2 - AE)
ana_gift = max(0, 500000 - AE - (500000 - AE))    # marital deduction
chk("u2-gift-709", "son", son_each, 11000); chk("u2-gift-709", "dau", dau_each, 0); chk("u2-gift-709", "ch", ch_each, 0)
chk("u2-gift-709", "lt (Luis)", son_each + dau_each + ch_each + niece_each + ana_gift, 11000)
chk("u2-gift-709", "at (Ana)", son_each + dau_each + ch_each + niece_each, 11000)
chk("u2-gift-709", "loss (sell 25k; FMV 30k < basis 40k)", 30000 - 25000, 5000)
# gift tax before credit on 11,000 (18% to 10k, 20% next 10k)
tent = 1800 + 0.20 * 1000
results.append(("u2-gift-709", "d3 tentative tax on 11,000 (covered by credit)", tent, 2000, True, "unified credit covers -> $0 payable"))

# tcp-tbs-u3-estimates-consolidated
chk("u3-est-consol", "i1", 0.25 * 400000, 100000)
chk("u3-est-consol", "i2", 0.50 * 600000 - 100000, 200000)
chk("u3-est-consol", "i3", 0.25 * 600000, 150000)
chk("u3-est-consol", "i4", 0.25 * 600000, 150000)
cti = 800000 - 50000 - 200000 + 150000
chk("u3-est-consol", "cti", cti, 700000); chk("u3-est-consol", "tax", 0.21 * cti, 147000)
results.append(("u3-est-consol", "EXHIBIT CONSISTENCY: expected 2025 consolidated tax vs computed", 0.21 * cti, 600000, False,
                "Exhibit says Pine 'expects $600,000 of 2025 tax (consolidated)' but part c computes 2025 consolidated tax = 147,000; "
                "on actual tax of 147,000 the minimum installments would be 36,750 each (lesser of current-year tax)"))

# tcp-tbs-u6-multistate-liquidation
s, p, w = 2.4e6 / 12e6, 3e6 / 10e6, 1.5e6 / 6e6
chk("u6-multistate", "eq %", 100 * (s + p + w) / 3, 25)
chk("u6-multistate", "eqi", (s + p + w) / 3 * 3e6, 750000)
chk("u6-multistate", "dw %", 100 * (2 * s + p + w) / 4, 23.75)
chk("u6-multistate", "ss % with throwback", 100 * (2.4e6 + 0.6e6) / 12e6, 25)
eq_tb = 100 * ((3.0e6 / 12e6) + p + w) / 3
results.append(("u6-multistate", "ALT: eq % if throwback also applied (label silent)", eq_tb, 25, False, "26.67% -> label ambiguity"))
chk("u6-multistate", "cg (Lark §336)", 400000 - 100000, 300000)
chk("u6-multistate", "sg (Mo §331)", 400000 + 100000 - 150000, 350000)

# tcp-tbs-x4-property
e_gain = 200000 - (300000 - 180000)
chk("x4-property", "e §1245", min(e_gain, 180000), 80000)
w_gain = 1150000 - (1000000 - 200000)
chk("x4-property", "w291", 0.20 * min(w_gain, 200000), 40000)
chk("x4-property", "w1231", w_gain - 0.20 * min(w_gain, 200000), 310000)
chk("x4-property", "net §1231", (w_gain - 40000) + (200000 - 250000), 260000)
chk("x4-property", "xg", min(700000 - 400000, 50000), 50000)
chk("x4-property", "xb", 650000 - (300000 - 50000), 400000)
dep_formula = 3900000 / 39 * 9.5 / 12
chk("x4-property", "dep (formula)", round(dep_formula), 79167)
dep_table = 3900000 * 0.02033   # Pub. 946 Table A-7a, 39-yr, month 3
results.append(("x4-property", "dep via IRS Table A-7a (2.033%)", dep_table, 79167, abs(dep_table - 79167) <= 0,
                "tolerance 0 rejects table result 79,287 and unrounded 79,166.67"))

# ---------------- Outside-sample: tcp-tbs-x2-corporate ----------------
pre = 500000 + 120000 - 10000 + 10000 - 40000 + 70000
nol = 200000
drd = 0.65 * 50000
# §170(b)(2)(D): 10% base ignores charitable, DRD, NOL *carrybacks*, cap-loss carrybacks -> NOL carryforward IS deducted
ch_correct = min(70000, 0.10 * (pre - nol))
ch_key = 0.10 * pre
chk("x2-corporate", "pre", pre, 650000)
results.append(("x2-corporate", "ch (charitable deduction)", ch_correct, 65000, False, f"key uses 10% x {pre:,.0f}; base should be net of $200,000 NOL carryforward"))
line28 = pre - ch_correct
results.append(("x2-corporate", "m1 (line 28)", line28, 585000, False, ""))
ti = line28 - drd - nol
results.append(("x2-corporate", "ti", ti, 352500, False, f"80% NOL limit = {0.8*(line28-drd):,.0f} (not binding)"))
results.append(("x2-corporate", "tax", 0.21 * ti, 74025, False, f"carryforward of charity = {70000-ch_correct:,.0f} (key says 5,000)"))

# ---------------- Outside-sample: tcp-tbs-u2-retirement-education ----------------
chk("u2-ret-edu", "ded", 7000 * (89000 - 85000) / 10000, 2800)
chk("u2-ret-edu", "exc", 12000 - 0.075 * 120000, 3000)
chk("u2-ret-edu", "pen", 0.10 * (20000 - 3000), 1700)
chk("u2-ret-edu", "tx", (15000 - 9000) / 15000 * 6000, 2400)
birth_year = 2025 - 50
rmd_age = 75 if birth_year >= 1960 else (73 if birth_year >= 1951 else 72)
results.append(("u2-ret-edu", f"d3 RMD age for Leo (age 50, born ~{birth_year})", rmd_age, 73, rmd_age == 73, "SECURE 2.0 §107: 75 for those born 1960+; option '75' absent"))

# ---------------- Other outside-sample spot recomputes ----------------
chk("tcp-x1-15", "donee basis", 70000 + 12000 * (30000 / 81000), 74444, tol=1)
chk("tcp-x1-18", "SEP", 0.20 * (120000 - 8478), 22304, tol=1)
se = 120000 * 0.9235 * 0.153 / 2
chk("tcp-x1-18", "half SE tax", se, 8478, tol=1)
chk("tcp-pa-05", "EBL MFJ 2025", 900000 - 626000, 274000)
chk("tcp-x1-22", "SALT", max(10000, 40000 - 0.30 * (550000 - 500000)), 25000)
chk("tcp-x4-08", "§179", 2500000 - (4600000 - 4000000), 1900000)
chk("tcp-cr2-chk1", "§179", 2500000 - (4300000 - 4000000), 2200000)
chk("tcp-ec-06", "§1202", min(9e6 - 1e6, max(10e6, 10 * 1e6)), 8000000)
chk("u5-trust", "DNI", 84000 + 9000 - 30000, 63000)
chk("u5-trust", "TI", 84000 - 54000 - 100, 29900)
chk("u4-k1", "Anika end basis", 50000 + 10000 + 122800 + 8000 + 1600 + 6400 + 4800 - 40000 - 1200 - 12000 - 4000, 146400)
chk("u5-s-corp", "stock basis", 60000 + 90000 + 5000 + 10000 - 132000 - 2000 - 6000, 25000)
chk("u7-exch", "realized", 800000 + 50000 + 250000 - 200000 - 350000, 550000)
chk("u7-exch", "basis", 800000 - (550000 - 100000), 350000)
chk("x3-entity", "pct", (2 * 30 + 20 + 10) / 4, 22.5)

# Percent-row parse check (mirrors src/lib/tbsScoring.ts parseAmount)
def parse_amount(s):
    s = s.strip(); neg = False
    if re.match(r"^\(.*\)$", s): neg = True; s = s[1:-1]
    s = re.sub(r"[$,\s]", "", s)
    if s.startswith("-"): neg = not neg; s = s[1:]
    if not re.match(r"^\d*\.?\d+$", s): return None
    n = float(s); return -n if neg else n
for inp in ["25", "25%", "0.25", "23.75%"]:
    results.append(("tbsScoring.parseAmount", f"input '{inp}'", parse_amount(inp) if parse_amount(inp) is not None else float('nan'), 25, parse_amount(inp) in (25.0, 23.75), "percent rows: '%' or decimal entry scored wrong"))

for r in results:
    item, row, comp, key, ok, note = r
    print(f"{'OK      ' if ok else 'MISMATCH'} {item:24s} {row:55s} computed={comp:,.2f} key={key:,.2f} {note}")
