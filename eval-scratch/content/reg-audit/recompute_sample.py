"""Independent recomputation of every calc item in the REG accuracy-audit sample (seed 20260923)."""

def chk(name, got, key):
    print(f"{'OK ' if abs(got-key)<1e-6 else 'BAD'} {name}: recomputed={got:,.2f} key={key:,.2f}")

# reg-pen-01: FTF 5%/mo reduced by FTP 0.5%/mo; 2 months; tax 20,000
tax = 20000
ftp = 0.005 * 2 * tax
ftf = (0.05 - 0.005) * 2 * tax
chk("reg-pen-01 total", ftf + ftp, 2000)

# reg-x3-01 inherited stock
chk("reg-x3-01 loss", 65000 - 70000, -5000)

# reg-pb-03 gift tax basis adj (sec. 1015(d)(6)); stem gives taxable gift 80,000
adj = 12000 * (100000 - 40000) / 80000
chk("reg-pb-03 basis", 40000 + adj, 49000)
# what if 2025 $19,000 annual exclusion were used (taxable gift 81,000)
print("   pb-03 with 2025 $19,000 exclusion:", 40000 + 12000 * 60000 / 81000)

# reg-x4-13 60% cash limit
chk("reg-x4-13", min(40000, 0.6 * 60000), 36000)

# reg-gi-07 social security
prov = 15000 + 0.5 * 12000
chk("reg-gi-07 taxable SS", 0 if prov <= 25000 else None, 0)

# reg-ot-07 SE
nese = 60000 * 0.9235
chk("reg-ot-07 SS base", min(nese, 176100 - 150000), 26100)

# reg-id-02
chk("reg-id-02", min(15000, 0.3 * 100000), 15000)

# reg-x5-12
chk("reg-x5-12", 10000 + 40000 + 2000 - 25000, 27000)

# reg-cc-09
lim = 0.1 * 400000
chk("reg-cc-09", min(lim, 50000 + 30000), 40000)

# reg-cc-02
full = 0.5 * 100000
ti = 80000
drd = full if ti - full < 0 else min(full, 0.5 * ti)
chk("reg-cc-02", drd, 40000)

# reg-te-03
chk("reg-te-03", min(45000, 30000), 30000)

print("\n--- TBS reg-tbs-u2-bankruptcy")
rem = 300000 - (20000 + 15000 + 25000)
pct = rem / (440000 + 40000) * 100
chk("pri", 60000, 60000); chk("pct", pct, 50); chk("fb2", 110000 + pct / 100 * 40000, 130000)
print("   if $12,000 preference recovered & Kline claim reinstated:", (rem + 12000) / (480000 + 12000) * 100)

print("\n--- TBS reg-tbs-u3-exchanges")
ar = 800000 + 50000 + 200000 - 150000
chk("ar", ar, 900000); chk("rg", ar - 400000, 500000)
boot = 50000 + (200000 - 150000)
chk("boot", boot, 100000); chk("rec", min(boot, ar - 400000), 100000)
chk("bas", 400000 + 150000 + 100000 - 50000 - 200000, 400000)
chk("c1", max(0, min(600000 - 350000, 600000 - 520000)), 80000)
chk("c2", 520000 - (250000 - 80000), 350000)
chk("h", 540000 - 500000, 40000)
chk("i", 60000 * (300000 - 90000) / 300000, 42000)
print("   gross-method amount realized (liabs assumed added to basis):", 800000 + 50000 + 200000)

print("\n--- TBS reg-tbs-x4-family")
chk("ctc", 2200, 2200); chk("odc", 500, 500)
agi = 72000
rate = max(0.20, 0.35 - 0.01 * max(0, -(-(agi - 15000) // 2000)))
chk("dcc", min(4500, 3000) * rate, 600)
chk("aotc", 2000 + 0.25 * min(2000, 5000 - 2000), 2500)

print("\n--- TBS reg-tbs-u6-corporate-ti")
pre = 420000 + 90000 - 12000 + 15000 + 5000 + 0.5 * 8000 + 50000 - (70000 - 40000)
chk("pre", pre, 542000)
# repo approach: 10% limit before NOL carryforward
ch_repo = min(50000, 0.1 * pre)
# IRC 170(b)(2)(D): TI computed without charity, DRD, NOL CARRYBACK, cap-loss carryback -> NOL carryforward IS deducted.
# NOL carryforward (2021, post-2017): lesser of carryover or 80% of TI w/o NOL deduction. Solve (80% cap not binding):
nol = 100000
ch = min(50000, 0.1 * (pre - nol))
drd = min(0.65 * 60000, 0.65 * (pre - ch))  # 246(b) limit, TI w/o DRD, NOL, cap loss carryback
assert nol <= 0.8 * (pre - ch - drd)
ti = pre - ch - drd - nol
chk("ch (IRC 170(b)(2)(D))", ch, 50000)
chk("drd", drd, 39000)
chk("nol", nol, 100000)
chk("ti", ti, 353000)
chk("tax", ti * 0.21, 74130)
print(f"   repo-method ch={ch_repo:,.0f}; corrected ch={ch:,.0f}, carryforward={50000-ch:,.0f}, TI={ti:,.0f}, tax={ti*0.21:,.2f}")
