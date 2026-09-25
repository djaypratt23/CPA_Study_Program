"""Recompute numeric keys of the non-sampled REG TBS (outside-sample scan)."""
import math

def chk(name, got, key, tol=0):
    ok = abs(got - key) <= tol + 1e-9
    print(f"{'OK ' if ok else 'BAD'} {name}: recomputed={got:,.2f} key={key:,.2f}")

m = lambda d: math.ceil(d)  # any part-month counts
# u1-penalties
chk("u1-pen m1", 0.005*5*12000, 300); chk("u1-pen m2", 0.045*5*12000, 2700)
chk("u1-pen l1", 0.005*5*5000, 125); chk("u1-pen p1", .2*40000, 8000)
chk("u1-pen r4", max(1000, .5*1600), 1000); chk("u1-pen r5", max(5000, .75*8000), 6000)
# u3-property-sales
chk("u3 lathe", min(70000-40000, 50000), 30000); chk("u3 drill", 10000-15000, -5000)
chk("u3 bldg", 330000-240000, 90000); chk("u3 u1250", min(90000, 60000), 60000)
chk("u3 n1231", 90000+20000-5000, 105000); chk("u3 ncg", 105000+12000-7000, 110000)
# u4-gross-income
chk("u4 gi", 68000+900+600+2000+12000+300, 83800)
# u4-schedule-c-rental
chk("u4c np", 180000-60000-24000-30000-.5*4000, 64000)
allow = 25000 - .5*(130000-100000)
chk("u4c al", allow, 10000); chk("u4c sus", 14000-min(14000, allow), 4000)
# u5-credits-amt
chk("u5 dc", min(7200, 6000)*.2, 1200); chk("u5 ao", 2000+.25*min(2000, 5900-2000), 2500)
amti = 180000+25000+90000+5000
tmt = (amti-88100)*.26
chk("u5 amti", amti, 300000); chk("u5 tmt", tmt, 55094, 1); chk("u5 amt", tmt-36000, 19094, 1)
# u5-taxable-income
se = 30000*.9235*.153; hse = se/2; agi = 150000+2000+30000-round(hse)-4000
med = 15000-.075*agi; it = round(med)+17000+12000+3000; qbi = .2*(30000-round(hse))
chk("u5t se", se, 4239, 1); chk("u5t agi", agi, 175881, 2); chk("u5t med", med, 1809, 2)
chk("u5t it", it, 33809, 3); chk("u5t qbi", qbi, 5576, 2); chk("u5t ti", agi-it-round(qbi), 136496, 5)
# u6-distributions-formation
chk("u6d rg", 250000+20000+80000-200000, 150000); chk("u6d sb", 200000+20000-20000-80000, 120000)
chk("u6d cb", 220000, 220000); chk("u6d dv", min(100000, 60000+20000), 80000); chk("u6d nb", 50000-20000, 30000)
# u7-partnership
obi = 600000-250000-110000-30000
end = 60000+.4*obi+.4*20000+.4*15000+.4*5000+.4*4000+10000-.4*10000-.4*12000-70000
chk("u7p obi", obi, 210000); chk("u7p se", .4*obi+30000, 114000); chk("u7p end", end, 92800)
print("   note: partner reduces SE by sec.179 share on Sch. SE ->", .4*obi+30000-.4*12000)
# u7-s-corp-gifts
chk("u7s aaa", 20000+50000, 70000); chk("u7s end", 93000-70000-(90000-70000-12000), 15000)
chk("u7s tg", 25000-19000, 6000)
# x1-procedures
chk("x1 ftp", .005*5*10000, 250); chk("x1 ftf", .045*5*10000, 2250); chk("x1 acc", .2*30000, 6000)
# x3-property
chk("x3 barn", 450000-300000, 150000); chk("x3 tr", 20000-15000, 5000)
chk("x3 n1231", 150000-15000, 135000); chk("x3 bas", 230000-(150000-20000), 100000)
# x4-individual
agi = 140000+3000+1000-3000-2500-300
chk("x4i agi", agi, 138200); chk("x4i med", 12000-.075*agi, 1635, 1); chk("x4i ti", agi-31500, 106700)
print("   note: IRC-defined gross income (gains gross, loss deducted under 62(a)(3)) would be", 140000+3000+1000+5000)
# x5-corporate
pre = 800000+200000-20000+6000+4000+.5*14000+60000-(150000-100000)
ti = pre-min(60000, .1*pre)-.5*40000
chk("x5c pre", pre, 1007000); chk("x5c ti", ti, 927000); chk("x5c tax", ti*.21, 194670)
# x5-flowthrough
sb = 20000+.6*5000+.6*2000-.6*1000
chk("x5f sb", sb, 23600); chk("x5f al", min(.6*70000, sb+15000), 38600)
chk("x5f g", 90000+20000-50000, 60000); chk("x5f cap", 60000-8000, 52000)
# x5-research
chk("x5r ex", 14/24*250000, 145833, 1)
