# C-consistency: cross-platform consistency review (notes)

**Scope.** All content under `content/`: lessons, module MCQs, exam-question pools, flashcards, TBS, review docs and glossaries. The corpus is 68,529 text units.

**Method.**
- `scripts/flatten.py` turns every JSON string leaf and every Markdown line into one text unit tagged with file, item id and field.
- `scripts/s.py` runs regex searches over those units.
- `scripts/counts.py` produces the "places" column below.

For each threshold I extracted every stated value and the year or standard it is tied to. I compared them with each other and with `review/reference/{tax-2025,aud-standards,far-standards}.md`. I used no web searches; the reference sheets settled every conflict.

**Place counts are approximate.** They count text units that match the topic's search pattern, so broad topics such as "60 days", "NOL" or "75%/90%" are over-counted. Every hit was read for the topics marked consistent.

## Threshold table

| Threshold / rule | Value(s) found in content | ≈ places | Consistent? | Reference value |
|---|---|---|---|---|
| **Tax** | | | | |
| Standard deduction 2025 | $15,750 / $31,500 / $23,625. tcp-ip-22 uses an undated hypothetical $30,000. Exhibit 15,000 in reg-tbs-x4-return-review is a deliberate error that the item corrects. | 60 | Yes | $15,750 / $31,500 / $23,625. 2026 amounts ($16,100 / $32,200 / $24,150) are not stated anywhere. |
| Additional std deduction (65+/blind) | $2,000 unmarried; $1,600 married | 22 | Yes | $2,000 / $1,600 |
| Senior deduction | $6,000 per person; 6% phase-out over $75k / $150k | 13 | Yes | Same (2025–2028) |
| SALT cap (2025) | $40,000 ($20,000 MFS); 30% over $500k MAGI; $10k floor. "Old $10,000 cap" appears only as a flagged error in a TBS. | 55 | Yes | Same. 2026 ($40,400; $505k threshold) is not stated anywhere. |
| §179 | $2,500,000; phase-out over $4,000,000 | 49 | Yes | Same (2025) |
| Bonus depreciation | 100% if acquired after Jan 19, 2025; 40% if acquired earlier | 14 | Yes | Same |
| Luxury auto limits | No dollar figures stated anywhere | 0 | n/a | — |
| Gift annual exclusion | $19,000 ($38,000 split); noncitizen spouse $190,000 | 84 | Yes | $19,000; $190,000 |
| Basic exclusion amount | $13,990,000 (2025); $15,000,000 (2026), no sunset | 23 | Yes | Same |
| GST exemption | Not mentioned | 0 | n/a | $13.99M / $15M |
| Child tax credit / ACTC / ODC | $2,200; refundable $1,700; $500; phase-out $200k / $400k | 71 | Yes | Same |
| Dependent care credit | 20–35% of $3,000 / $6,000. The 2026 50% rate is noted in reg-individual-credits. DCFSA $5,000. | 26 | Yes | Same (2026: 50%, $7,500 DCFSA, which is not stated) |
| AOTC / LLC | $2,500 (40% refundable) / $2,000; phase-out $80–90k / $160–180k | 77 | Yes | Same |
| Capital-gains breakpoints | 0% up to $48,350; 20% from $533,400 (single) | 11 | Yes | Same |
| NIIT | 3.8%; $200k / $250k / $125k | 96 | Yes | Same |
| Additional Medicare tax | 0.9% over $200k / $250k / $125k. reg-federal-regulation says a flat "$200,000". | 36 | **No** (F-002) | $200k / $250k / $125k; withholding at $200k |
| SE tax / SS wage base | 92.35% × 15.3%; $176,100 | 44 | Yes | Same |
| IRA / 401(k) / catch-ups / SIMPLE / §415(c) | $7,000 + $1,000; $23,500 + $7,500 / $11,250; $16,500; $70,000 | 49 | Yes | Same (2025) |
| HSA | $4,300 / $8,550 + $1,000 | 22 | Yes | Same |
| Kiddie tax | $2,700; "under 19, or full-time student under 24" | 33 | Yes (internally) | $2,700. The reference sheet says under 18 (18 if the support test is met); see the verification list. |
| QBI thresholds | $197,300 / $394,600; phase-in $50k / $100k | 6 | Yes | Same. The 2026 $75k / $150k phase-in and $400 minimum are not stated. |
| Excess business loss | $313,000 / $626,000 (TCP only) | 8 | Yes | Same (2026: $256k / $512k, not stated) |
| §163(j) | 30% of ATI, "EBITDA-based" (tcp-cc-37); §448(c) small-business exemption with no figure given | 5 | Yes | EBITDA from 2025 |
| NOL | 80% of TI; indefinite carryforward; no carryback (the TBS adds "other than farming") | 161 | Yes | Same |
| Corporate capital losses | Back 3, forward 5, as short-term | ~20 | Yes | Same |
| DRD | 50% / 65% / 100%, with TI limit and NOL exception | 111 | Yes | Same |
| Individual charitable limits | Cash 60%; LTCG property 30%; private foundation stock 20%; 5-year carryforward | 22 | Yes | Same |
| Corporate charitable | 10% of TI before charity, DRD and carrybacks (carryforward reduces the base). The 2026 1% floor is noted in reg-c-corp-income. | 12 | Yes | Same |
| 2026 individual charitable changes | REG lesson notes the 0.5% floor, the 35% cap and the $1,000 / $2,000 non-itemizer deduction. TCP never mentions them. | 2 | **No** (F-004) | Effective 2026 |
| Estimated-tax safe harbors | 90% / 100% / 110% (> $150k; $75k MFS); < $1,000. Corporations: 100% / 100%, prior year limited for large corps. | 32 | Yes | Same |
| Statute of limitations | 3 years; 6 years for > 25% omission; unlimited for fraud or no return; refund 3 years / 2 years. 7-year bad debt rule not mentioned. | 43 | Yes | Same |
| Failure-to-file / pay; accuracy; fraud | 5% / 0.5% per month, 25% max, combined 5%; 20% (40% gross valuation); 75% | 36 | Yes | Same |
| §6694 / §6695 | $1,000 or 50%; $5,000 or 75%; §6695 per failure (no dollar figure) | 43 | Yes | Same |
| Circular 230 §10.27 contingent fees | Lesson, flashcard, reg-c230-02 and reg-x1-21 are correct. reg-c230-25 says "only interest and penalty claims". The TBS adds a 120-day limit to the original-return examination exception. | 59 | **No** (F-001) | 4 exceptions (+ whistleblower) |
| Circular 230 §10.29 / §10.34 | Written consent within 30 days, kept 36 months; reasonable basis and good-faith reliance | ~15 | Yes | Same |
| §121 | $250k / $500k; 2 of 5 years | 45 | Yes | Same |
| Like-kind exchange | Real property only; 45 / 180 days | 59 | Yes | Same |
| §1202 | Pre-July 5, 2025 stock: 100% after 5 years, $10M / 10×. Later stock: 50 / 75 / 100% after 3 / 4 / 5 years, $15M, $75M. | 27 | Yes | Same |
| FBAR | > $10,000 aggregate; April 15 → October 15; FinCEN 114 | 23 | Yes | Same |
| Form 1099-NEC / 1099-K | $600 (2025), $2,000 (2026), only in reg-fr-27; 1099-K not stated | 7 | Yes | Same |
| RMD / QCD | Age 73 / 75; 25% excise (10% if corrected); QCD $108,000 at 70½ | 58 / 25 | Yes | Same |
| Trust top bracket | 37% above $15,650 | 11 | Yes | Same |
| AMT exemption | $88,100 / $137,000; 25% phase-out from $626,350 / $1,252,700; 26% / 28% split at $239,100 | 11 | Yes | Same (2026 changes not stated) |
| ISO spread for AMT | "Adjustment" everywhere except one TBS and one exam item ("preference") | 23 | **No** (F-003) | §56(b)(3) adjustment |
| Return due dates (calendar 2025) | 1065 / 1120-S: "March 15, 2026" in reg-x5-41 (key) and two distractor explanations, "March 16, 2026" in tcp-po-06, TBS and tcp-numbers. Other due dates agree. | 21 | **No** (F-005) | March 16, 2026 (§7503) |
| **Audit** | | | | |
| Materiality benchmark | 5% of pretax income, labelled firm practice. Performance materiality 70% or 75% and clearly trivial 5% are always given in the stem. | 7 | Yes | Rule of thumb, not a requirement |
| Documentation completion / retention | AICPA 60 days / 5 years; PCAOB 14 days (formerly 45, with phase-in) / 7 years | ~25 | Yes | Same |
| AU-C 265 communication | In writing; by report release, no later than 60 days after | 22 | Yes | Same |
| Going-concern period | AU-C 570 / ASC 205-40: one year after issued or available to be issued. AS 2415: one year beyond the balance-sheet date. Kept distinct. | 43 | Yes | Same |
| Partner rotation / cooling-off | 5 / 5, 7 / 2; 1-year cooling-off; SQMS 2 EQ-reviewer cooling-off 2 years | 96 | Yes | Same |
| Independence: loans, unpaid fees, inherited interests | Credit cards ≤ $10,000; unpaid fees > 1 year. Inherited interests: "promptly" in the lesson vs "as soon as practicable, ≤ 30 days" in the TBS. | ~20 | Mostly (F-008, S4) | ≤ 30 days |
| Single audit | $1,000,000; Type A ≥ $1M; 40% / 20% coverage; questioned costs > $25,000; reporting package due the earlier of 30 days or 9 months | 70 | Yes | Same |
| GAGAS CPE | 80 hours / 2 years, 24 government-related | 7 | Yes | Same |
| Negative confirmations | Four lists of conditions; only one includes the controls-evidence condition | 19 | **No** (F-007, S3) | AU-C 505.15 (4 conditions) |
| SQMS / QC 1000 / SAS 149 dates | SQMS 1 Dec 15, 2025; QC 1000 Dec 15, 2026; SAS 149 periods ending on or after Dec 15, 2026 | 3 | Yes | Same |
| KAM / CAM | KAM only if engaged; CAM required with exceptions (e.g., EGCs) | ~12 | Yes | Same |
| **FAR** | | | | |
| Lease classification | OWNES; ≈75% major part, ≈90% substantially all, described as guidelines | ~40 | Yes | ASC 842-10-55-2 |
| Short-term lease | ≤ 12 months, no reasonably certain purchase option; election by class | 15 | Yes | Same |
| LCNRV vs LCM | LCNRV for FIFO / average; LCM (ceiling and floor) for LIFO / retail | 44 | Yes | Same |
| Goodwill impairment | One step (ASU 2017-04), capped at goodwill; private-company 10-year amortization | 54 | Yes | Same |
| Capitalized interest | Avoidable interest, specific rate first, capped at actual | 16 | Yes | Same |
| Debt modification | 10% PV test at the original effective rate | ~5 | Yes | Same |
| NFP net asset classes | "With / without donor restrictions" mixed with "unrestricted net assets" (lesson, far-nfs-18 key) | 125 | **No** (F-006, S3) | ASU 2016-14 two classes |
| Modified accrual availability | 60 days for property taxes | ~15 | Yes | Same |
| GASB 54 order | Nonspendable → restricted → committed → assigned → unassigned | 12 | Yes | Same |
| EPS | Treasury stock method at average price; if-converted; antidilution | 26 | Yes | Same |
| Loss contingencies | Probable + estimable; best estimate, else the minimum | ~20 | Yes | Same |
| ASC 855 evaluation date | SEC filers: issued date. Others: available-to-be-issued date, disclosed. | 27 | Yes | Same |
| ASU effective dates cited | 2023-07, 2023-09, 2024-03 (annual periods > 12/15/2026), 2025-05 (> 12/15/2025), 2025-06 (> 12/15/2027): dates stated correctly and consistently | ~30 | Yes | Same |
| Nonmonetary exchanges / ratios | Boot ≥ 25% → monetary; 365-day year throughout | ~20 | Yes | Same |

## Findings written (8)

| Id | Severity | Rule | Places in conflict |
|---|---|---|---|
| C-consistency-001 | S2 | Circular 230 contingent-fee exceptions | reg-c230-25 and reg-tbs-r3-circular230 (a1) vs lesson, flashcard, reg-c230-02 and reg-x1-21 |
| C-consistency-002 | S3 | Additional Medicare Tax threshold | reg-federal-regulation lesson vs reg-amt-other-taxes, tcp-numbers |
| C-consistency-003 | S3 | ISO spread: AMT adjustment vs preference | tcp-tbs-r3-equity-comp and tcp-x1-35 vs all others |
| C-consistency-004 | S3 | 2026 charitable changes flagged in REG, absent in TCP | tcp-individual-planning vs reg-itemized-deductions and reg-c-corp-income |
| C-consistency-005 | **S1** | 2025 Form 1065 due date (March 15 vs March 16, 2026) | reg-x5-41 (wrong key), reg-x5-39 (b), reg-te-10 (c) vs tcp-po-06, reg-tbs-x5-research, tcp-tbs-u4-k1, tcp-numbers |
| C-consistency-006 | S3 | NFP net asset class names | far-nfs-18, far-nfs-03, far-nfs-chk1 and the far-nfp-statements lesson vs the rest of FAR |
| C-consistency-007 | S3 | Negative-confirmation conditions | aud-evidence-assertions lesson, flashcard, aud-rev-23 vs aud-x3-33 / AU-C 505 |
| C-consistency-008 | S4 | Disposal deadline for inherited interests | aud-code-of-conduct lesson vs aud-tbs-u1-independence |

## Needs expert verification (low confidence; not recorded as findings)

1. **Kiddie-tax age.** Content consistently says "under 19, or a full-time student under 24". The reference sheet says "under 18, or under 24 if full-time students". Under §1(g)(2) the rule is under 18, or age 18 or a full-time student aged 19–23 whose earned income is not more than half of support. The content is internally consistent, but the support test is mentioned only in the tcp-ip-f5 flashcard, and only for students.
2. **2026 indexed and statutory amounts are not stated anywhere.** This covers the 2026 standard deduction, SALT $40,400, the QBI $75k / $150k phase-in and $400 minimum, EBL $256k / $512k, AMT $500k / $1M with a 50% phase-out, and DCFSA $7,500. Nothing conflicts, but if 1/1/2026 OBBBA provisions are testable in Q4 2026 (the reference sheet calls this an unverified inference), REG and TCP flag them unevenly. REG has "Looking ahead to 2026" notes in 4 lessons; TCP has them only for the $15M exclusion and §529. Leave this to the currency reviewers.
3. **ASU 2024-03 (DISE) is taught and tested as current** (far-income-statement-oci objective; far-iso-14), although it is not eligible for testing until 1/1/2027. The effective date itself is stated correctly. This is a currency issue, not a consistency one.
4. **Circular 230 whistleblower exception (§10.27(b)(2)(iv)).** It is omitted everywhere, so the content is consistent but incomplete. Its addition is suggested in F-001.
