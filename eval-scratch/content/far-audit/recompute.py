# Independent recomputation of every numeric item in the FAR audit sample (seed 20260923).
def chk(name, got, exp, tol=0.5):
    ok = abs(got - exp) <= tol
    print(f"{'OK ' if ok else 'BAD'} {name}: computed {got:,.2f} vs key {exp:,.2f}")

# far-x1-17 property taxes
chk("x1-17 GF revenue", 900_000 + 40_000, 940_000)
chk("x1-17 GW revenue (distractor a)", 1_000_000 - 20_000, 980_000)
# far-iso-06
chk("iso-06 CI", 300_000 + 20_000 - 8_000, 312_000)
# far-bse-03
chk("bse-03 RE", 500_000 - 20_000*(1-.25) + 120_000 - 40_000, 565_000)
chk("bse-03 c", 500_000 - 20_000 + 120_000 - 40_000, 560_000)
chk("bse-03 d", 500_000 - 15_000 + 120_000 - 30_000, 575_000)
# far-x2-12
i = 96_000*.09; chk("x2-12 CA", 96_000 + i - 8_000, 96_640); chk("x2-12 SL (a)", 96_000 + 4_000/5, 96_800)
# far-bond-09
chk("bond-09", 600_000*.08*6/12, 24_000)
# far-dsec-08
chk("dsec-08", (158_000-150_000) - 3_000, 5_000)
# far-inv-01/03
gafs = 200*20 + 300*22 + 250*25; print("GAFS", gafs)
chk("inv-01 FIFO", 250*25 + 100*22, 8_450); chk("inv-01 LIFO", 200*20 + 150*22, 7_300)
chk("inv-03 WA", gafs/750*350, 7_863); chk("inv-03 simple avg", (20+22+25)/3*350, 7_817)
chk("inv-01 d", 350*25, 8_750)
# far-x3-05
p = 1.2/(1.2+2.8); chk("x3-05 GP", p*5_000_000 - 1_200_000, 300_000)
# far-tax-10
chk("tax-10 DTA", 1_000_000*.21, 210_000); chk("tax-10 d", 1_000_000*.21*.8, 168_000)
# far-lso-01
af = sum(1/1.06**t for t in range(1,5)); pv = 30_000*af; print("lso-01 PV", round(pv,2))
chk("lso-01 cost", 120_000/4, 30_000); chk("lso-01 interest", 104_000*.06, 6_240)
print("lso-01 choice b: key text says 'cash payment + interest' =", 30_000 + 6_240, "; finance-lease expense (26,000 + 6,240) =", 26_000 + 6_240, "; choice text = 32,240")
chk("lso-01 c", 104_000/4, 26_000)

# TBS u1 cash flows
A1 = 42+88+130+6+400-160; L1 = 74+12+150+100+100+70
A2 = 61+103+118+9+440-170; L2 = 81+10+120+130+100+120
print("u1 BS balance Y1", A1, L1, "Y2", A2, L2)
dep = 170_000 - 160_000 + 45_000; chk("u1 dep", dep, 55_000)
gain = 20_000 - (60_000-45_000); chk("u1 gain", gain, 5_000)
cfo = 85_000 + dep - gain - 15_000 + 12_000 - 3_000 + 7_000 - 2_000; chk("u1 CFO", cfo, 134_000)
purch = 440_000 - 400_000 + 60_000; chk("u1 purch", purch, 100_000)
cfi = 20_000 - purch; chk("u1 CFI", cfi, -80_000)
cff = 30_000 - 30_000 - 35_000; chk("u1 CFF", cff, -35_000)
chk("u1 net", cfo+cfi+cff, 19_000); chk("u1 RE rollfwd", 70_000+85_000-35_000, 120_000)

# TBS u7 debt securities
pv = 20_000*sum(1/1.07**t for t in range(1,5)) + 400_000/1.07**4; chk("u7 price", pv, 372_902)
i1 = round(372_902*.07); c1 = 372_902 + i1 - 20_000; i2 = round(c1*.07); c2 = c1 + i2 - 20_000
chk("u7 i1", i1, 26_103); chk("u7 a1", i1-20_000, 6_103); chk("u7 c1", c1, 379_005)
chk("u7 i2", i2, 26_530); chk("u7 c2", c2, 385_535)
chk("u7 FVA Y1", 378_000 - c1, -1_005); chk("u7 JE Y2", (390_000 - c2) - (378_000 - c1), 5_470)

# TBS u9 revenue
tp = 1_800_000; ssp = [1_200_000, 300_000, 500_000]; alloc = [tp*s/sum(ssp) for s in ssp]
chk("u9 hw", alloc[0], 1_080_000); chk("u9 inst", alloc[1], 270_000); chk("u9 sup", alloc[2], 450_000)
chk("u9 rev1", alloc[0]+alloc[1]+alloc[2]*3/24, 1_406_250); chk("u9 CL", alloc[2]*21/24, 393_750)
ev = .5*20_000 + .3*10_000; chk("u9 EV", ev, 13_000); chk("u9 rev2", 60_000+ev, 73_000)
print("u9 most-likely-amount alternative:", 20_000)

print("\n=== OUTSIDE-SAMPLE CHECKS ===")
# far-dsec-10: 3-yr $100,000 10% coupon bond, 8% yield, stated as ANNUAL payments, price given $105,242
ann = 10_000*sum(1/1.08**t for t in range(1,4)) + 100_000/1.08**3
semi = 5_000*sum(1/1.04**t for t in range(1,7)) + 100_000/1.04**6
print(f"dsec-10 price at 8% annual = {ann:,.2f}; at 8% semiannual = {semi:,.2f}; stem says 105,242 (annual)")
print(f"dsec-10 Y1 amortization with stem price = {10_000-105_242*.08:,.2f}; with correct annual price = {10_000-ann*.08:,.2f}")
# far-tbs-u8-bonds: $2,000,000 5-yr 6% semiannual, 8% market; exhibit factors 0.67556 / 8.11090
exh = 2_000_000*0.67556 + 60_000*8.11090
exact = 2_000_000/1.04**10 + 60_000*sum(1/1.04**t for t in range(1,11))
print(f"u8-bonds price with EXHIBIT factors = {exh:,.2f}; exact = {exact:,.2f}; key 1,837,782 tol 5 -> exhibit-based diff = {1_837_782-exh:,.0f}")
c1e = exh + round(exh*.04) - 60_000
print(f"u8-bonds June 30 CA from exhibit price = {c1e:,.0f}; key 1,851,293 tol 5 -> diff {1_851_293-c1e:,.0f}")
print(f"u8-bonds i1 from exhibit price = {exh*.04:,.2f} (key 73,511 tol 2); i2 = {c1e*.04:,.2f} (key 74,052 tol 2)")
ca = exact
for _ in range(4): ca = ca*1.04 - 60_000
print(f"u8-bonds CA Jan 1 Y3 exact = {ca:,.0f} (stem 1,895,157)")
# far-tbs-x2-bonds for comparison (exhibit-factor key)
print(f"x2-bonds exhibit price = {500_000*0.7473+25_000*4.2124:,.0f}; exact = {500_000/1.06**5+25_000*sum(1/1.06**t for t in range(1,6)):,.0f}")
