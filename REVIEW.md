# REVIEW — items needing a human check

Items flagged `needsReview: true` in content show a ⚠ **Needs review** badge in the app. `npm run validate`
prints the current count. Please confirm or correct each one, then remove the flag.

## Flagged content items

No individual items are open here; the OBBBA-amount items below keep their flags until those amounts are confirmed.

## Changed in remediation (confirm)

Answer keys and content changed while working through `REMEDIATION_TASKS.md`. Each is pinned by
`tests/remediationKeys.test.ts`; please confirm the new treatment.

| Item | Change | Authority |
|---|---|---|
| `reg-x2-08` (REG mock) | Key **d → a**. The possessory party's interest couldn't attach, and so couldn't be perfected, until value was given on March 5, after the March 1 filing. | UCC 9-203(b), 9-308(a), 9-322(a)(1) |
| `reg-tbs-u6-corporate-ti` | Charitable base is after the NOL carryforward: `ch` 44,200 (5,800 carries forward), `ti` 358,800, `tax` 75,348; `drd` and `nol` explanations updated. | IRC §170(b)(2)(D) |
| `tcp-tbs-x2-corporate` (TCP mock) | Same rule: `ch` 45,000 (25,000 carries forward), `m1` 605,000, `ti` 372,500, `tax` 78,225; `nol` explanation updated. | IRC §170(b)(2)(D) |
| `tcp-tbs-u2-retirement-education` `d3` | Added option "75" and keyed it (Leo, 50 in 2025, was born after 1959). | IRC §401(a)(9)(C)(v); SECURE 2.0 §107 |
| `far-tbs-u8-bonds` | Keys recomputed from the exhibit's factors: `p` 1,837,774, `c1` 1,851,285, `i2` 74,051; Year 3 carrying amount 1,895,147, `ca` 947,574, `gl` −22,426. Instructions now say to use the factors provided. | Arithmetic |
| `far-nd-08` | Key **c → b**: a 45%-of-revenue customer concentration must be disclosed because the near-term loss of any customer is always deemed at least reasonably possible. Lesson and flashcard `far-nd-fc8` added. | ASC 275-10-50-18, -50-20 |
| `aud-wr-10` | Restored the stripped dollar amounts in the stem ($40,000 uncorrected; $100,000 materiality). Key unchanged. | — |
| `far-tbs-u7-equity` `m5` | Exhibit now states Crestview elected the measurement alternative for Glenco; key unchanged. | ASC 321-10-35-2 |
| `far-lso-07` | Stem adds rent-free months and escalating payments, and says no impairment was recognized; choice c's explanation no longer calls impairment a possible cause. Key unchanged. | ASC 842-20 |
| `tcp-tbs-u3-estimates-consolidated` | The estimated-tax part is now self-contained (use the $600,000 expected tax; ignore the consolidated computation). | — |
| `tcp-tbs-x4-property` `dep` | Label says to use the mid-month formula, not the IRS tables; tolerance 0 → 1 so the unrounded 79,166.67 is accepted. | — |
| `tcp-tbs-u6-multistate-liquidation` `eq`, `dw` | Labels say "(without throwback)". | — |
| `aud-tbs-u3-analytics` `k1` | Exhibit adds clean cost-side testing (cutoff, costing, count roll-forward), which rules out cost of sales completeness; key unchanged. | — |
| `far-ppe-10` | Decision D3: rewritten from a city's relocation inducement (a government-to-business transfer, outside ASC 958-605 and unsettled) to an unconditional donation from a private foundation that holds no ownership interest. Key unchanged (fair value, contribution revenue or gain); `needsReview` removed. | ASC 958-605-15-2, 958-605-25-2, 958-605-30-2 |
| `tcp-ip-08` | Decision D2: client age 72 → 74 and the stem says 2025 (a 72-year-old in 2025 was born in 1953 and has no RMD until age 73). Key unchanged. | IRC §401(a)(9)(C)(v); SECURE 2.0 §107 |
| `tcp-retirement-education` lesson, flashcard `tcp-re-f5`, `review/tcp-numbers.md` | RMD age is 73 for owners born 1951–1959 and 75 for owners born 1960 or later. §529 K-12: $10,000 for 2025, with broader qualifying expenses for distributions after July 4, 2025, and a $20,000 cap from 2026. | IRC §401(a)(9)(C)(v); §529(c)(7), (e)(3) as amended by P.L. 119-21 |
| `reg-cr-01`, `reg-cr-06`, `reg-id-02`, `reg-id-05`, `reg-x4-13`, `reg-cc-chk2`, `reg-cc-09`, `tcp-cr-10`, `tcp-x1-05` | Decision D2: stems now say 2025 (and "itemizing" where relevant), because 2026 law changes their answers (the 0.5%/1% charitable floors, the 50% dependent care rate). Keys unchanged. REG and TCP quiz and mock headers show "2025 tax law". | P.L. 119-21 amending IRC §21, §170 |
| "Looking ahead to 2026" notes in `reg-itemized-deductions`, `reg-c-corp-income`, `reg-individual-credits`, `tcp-individual-planning` | Decision D2: 2026 changes are taught as lesson notes, not tested. Confirm the amounts: 0.5%-of-AGI individual charitable floor; 35% cap on the itemized-deduction benefit; $1,000/$2,000 non-itemizer cash gift deduction; 1% corporate charitable floor; dependent care credit top rate 50%, phasing down to 35% above $15,000 AGI and toward 20% above $75,000/$150,000. | P.L. 119-21 amending IRC §21, §68, §170 |
| `aud-code-of-conduct` lesson, `aud-coc-07`, `aud-x1-05` | Referral fees are permitted with disclosure; commissions and contingent fees are prohibited only for audit, review, compilation (without an independence disclosure) and PFI-examination clients. | ET 1.510, 1.520 |

## Mock forms 2 and 3 (P1-9) — new exam items to spot-check

Each later form reuses half of form 1's multiple-choice questions (forms 2 and 3 take different halves) and adds new
exam-pool items that never appear in practice. Please spot-check the new keys and computations:

| Section | New items | Forms |
|---|---|---|
| FAR | MCQs `far-x1-19`–`36`, `far-x2-18`–`34`, `far-x3-16`–`30`; TBS `far-tbs-x1-eps`, `far-tbs-x2-receivables-inventory`, `far-tbs-x3-income-taxes`, `far-tbs-x1-government`, `far-tbs-x1-statement-review`, `far-tbs-x2-equity`, `far-tbs-x3-operating-lease` | `far-mock-2`, `far-mock-3` |
| AUD | MCQs `aud-x1-17`–`32`, `aud-x2-24`–`46`, `aud-x3-28`–`54`, `aud-x4-13`–`24`; TBS `aud-tbs-x8-materiality`, `aud-tbs-x9-confirmations`, `aud-tbs-x10-single-audit`, `aud-tbs-x11-acceptance-quality`, `aud-tbs-x12-control-deviations`, `aud-tbs-x13-subsequent-events`, `aud-tbs-x14-engagement-types` | `aud-mock-2`, `aud-mock-3` |

## REG/TCP re-scope (decision D1) — new content to confirm

| Item | What to confirm | Authority |
|---|---|---|
| `reg-state-local-tax` lesson, `reg-slt-*`, `reg-x5-25`, `reg-x5-26` | Nexus, P.L. 86-272 scope, three-factor and double-weighted apportionment, allocation of nonbusiness rents and interest, throwback | P.L. 86-272 (15 U.S.C. §381); UDITPA §§4–17 |
| `reg-cost-recovery` lesson additions, `reg-dep-01`–`06`, `reg-x3-08` | MACRS table rates (7-year 14.29/24.49/17.49%; mid-quarter Q1 25%, Q3 10.71%, Q4 3.57%; 5-year Q4 5%), mid-month real property, §179 phase-out, §195/§197 amortization | IRC §168, §179, §195, §197; Rev. Proc. 87-57 |
| TBS `reg-tbs-u3-depreciation`, `reg-tbs-u3-depreciation-review`, `reg-tbs-x3-cost-recovery` | Keys: 808,517; 37,985 (mid-quarter applied to all 2025 personal property); 192,195 | Same |
| `reg-fr-11`–`14`, `reg-x2-15`, `reg-x2-16` | ACA applicable large employer (50 FTE; 30 hours), §4980H trigger, common-law worker test, FCPA anti-bribery and accounting provisions | IRC §4980H, §36B, §3509; 15 U.S.C. §78dd-1, §78m(b) |
| `reg-sc-12`, `reg-sc-13`, `reg-x5-21`, `reg-x5-22` | Ordinary business income vs. separately stated items; S stock basis order | IRC §1366, §1367, §702, §703 |
| `reg-c230-11`, `reg-c230-12` | State board licensing, revocation and substantial-equivalency mobility | Uniform Accountancy Act §7, §23 |
| `reg-te-11`–`13` | §501(c)(3)/(4)/(6)/(7) types, deductibility, private foundation presumption | IRC §501(c), §508(b), §509, §170(c) |
| `reg-x1-12`, `reg-x4-21`, `reg-x4-22`, `reg-x5-23`, `reg-x5-24` | FBAR $10,000 aggregate test and due date; NIIT; 110% estimated-tax safe harbor; 65% DRD; 80% NOL limit | 31 C.F.R. §1010.350, §1010.306(c); IRC §1411, §6654(d), §243, §172 |

## REG — 2025 amounts from the One Big Beautiful Bill Act

REG reflects tax year 2025 law, including provisions of the One Big Beautiful Bill Act (P.L. 119-21) effective for
2025, which are testable from July 1, 2026. These items use amounts set by that law and are flagged `needsReview`
so you can confirm them against current IRS guidance and your review course:

| Item | What to confirm |
|---|---|
| `reg-fs-chk2`, `reg-fs-08`, `reg-x4-03` | 2025 standard deduction ($15,750 single; $31,500 MFJ; $23,625 HOH) |
| `reg-cr-chk1`, `reg-x4-16` | 2025 child tax credit of $2,200 per child (refundable up to $1,700) |
| `reg-id-chk1` | 2025 SALT cap of $40,000 (phase-down above $500,000 MAGI) |
| `reg-id-10` | Qualified tips deduction (up to $25,000; 2025–2028) |
| `reg-cr-09` | Residential clean energy credit ending for expenditures after 2025 |
| `reg-cc-08` | 100% bonus depreciation after January 19, 2025; §179 limit of $2,500,000 |
| TBS `reg-tbs-u4-gross-income`, `reg-tbs-u5-taxable-income`, `reg-tbs-x4-individual`, `reg-tbs-x4-family` | Standard deduction, child tax credit, and SALT amounts |

The REG lessons and the `reg-numbers` review sheet also cite the senior deduction ($6,000), the overtime and car
loan interest deductions, and the 2026 estate and gift exemption ($15,000,000). Inflation-indexed 2025 amounts not
changed by the law (IRA, HSA, AMT exemption, Social Security wage base, gift annual exclusion) come from IRS
revenue procedures and are worth a spot-check too.

## TCP — 2025 amounts from the One Big Beautiful Bill Act

TCP reflects tax year 2025 law, including provisions of the One Big Beautiful Bill Act (P.L. 119-21) effective for
2025. These items use amounts or effective dates set by that law and are flagged `needsReview`:

| Item | What to confirm |
|---|---|
| `tcp-ip-10`, `tcp-x1-22` | 2025 SALT cap of $40,000, reduced by 30% of MAGI over $500,000 (floor $10,000) |
| `tcp-gt-04` | 2025 basic exclusion amount ($13,990,000) and the 2026 amount ($15,000,000) |
| `tcp-cr2-chk1`, `tcp-x4-08` | §179 limit of $2,500,000 with a phase-out above $4,000,000 |
| `tcp-cr2-02` | 100% bonus depreciation for property acquired after January 19, 2025 (40% if acquired earlier) |
| `tcp-cr2-08` | Domestic research expensing under new §174A for tax years beginning after 2024 |
| `tcp-ec-06` | §1202 exclusion rules for pre-July 5, 2025 stock (the lesson also summarizes the new tiered rules for later stock) |
| TBS `tcp-tbs-u7-exchange-installment`, `tcp-tbs-x1-gift-retirement` | §179/bonus amounts; basic exclusion amount |

Also worth a spot-check: the inflation-indexed 2025 figures used throughout TCP (retirement plan limits and
phase-outs, the $313,000/$626,000 excess business loss thresholds, the $108,000 QCD limit, the $2,700 kiddie tax
threshold, and the $15,650 fiduciary top-bracket threshold).

## Blueprint facts still marked "verify"

The official AICPA Blueprint PDFs could not be reached from the build environment, so these figures come
from multiple secondary sources (details in `docs/BLUEPRINT_NOTES.md`). Check them against the official PDF
before building out each section:

- **REG** — TBS split per testlet (configured 2/3/3); the Area II–III weights and skill ranges.
- **TCP** — the Area III–IV weights and skill ranges.
- **AUD** — skill ranges (configured R&U 30–40, Application 30–40, Analysis 15–25, Evaluation 5–15).
- **FAR** — where employee benefit plan statements, EPS, and ratios fall within Area I (the content is built; only the labels are affected).

## AUD content notes

AUD is now fully built. Nothing in it is flagged `needsReview`, but these points deserve a reviewer's eye:

- **Standards currency.** Content reflects AICPA standards in effect for 2026 audits, including SAS 142–146 (e.g., SAS 145 risk assessment with separate inherent and control risk), SQMS No. 1 and No. 2 (effective December 15, 2025), and SAS 134 report formats. Group audits (AU-C 600, revised by SAS 149 for later periods) and PCAOB QC 1000 are covered only at a summary level — confirm which versions the exam window tests.
- **Research excerpts** in AUD TBS are original paraphrases with section-level citations (e.g., "AU-C 505"), not quotations or paragraph numbers.
- **Specific rules worth a second check:** the AU-C 265 timing (communicate by the report release date, no later than 60 days after); the AICPA inherited-interest disposal window cited in `aud-tbs-u1-independence`; the conditions for negative confirmations; the DOL and GAO independence summaries in `aud-sec-pcaob-independence`.

## Tax-law currency (REG, TCP)

REG and TCP reflect **tax year 2025** law (see the sections above). Re-check the testing-window policy (the OBBBA
special policy and the six-month rule) before each exam window, and consider whether 2026 amounts (for example, the
$15,000,000 basic exclusion amount and the §1202 changes for stock issued after July 4, 2025) become testable.

## Suggested second-pass review

Every numeric answer key was recomputed independently, and the test suite proves every TBS answer key scores
100% against its own schema. A subject-matter reviewer's second pass is still worthwhile on:

- The FAR, AUD, REG, and TCP simulated exams (`content/{far,aud,reg,tcp}/exam-questions/`, `content/{far,aud,reg,tcp}/tbs/*-tbs-x*.json`).
- Judgment-heavy classification items: NFP contributions, subsequent-event type, and contingency disclosure (gain contingencies are keyed "disclose only").

## Changed in remediation (confirm): AUD rules and medium fixes

Items changed for `REMEDIATION_TASKS.md` P0-9 and P1-8. Changed keys are pinned by `tests/remediationContent.test.ts`.

| Item | Change | Authority |
|---|---|---|
| `aud-ev-06`, `aud-ev-chk2`, `aud-x3-04`, `aud-tbs-u6-confirmations` m2, `aud-evidence-assertions` lesson and flashcard, `aud-report-guide`, `aud-mnemonics` | PCAOB documentation-completion period 45 → **14 days** (keys unchanged; distractor and rationale text updated). | AS 1215 as amended by AS 1000 (PCAOB Rel. 2024-004) |
| `aud-ss-07`, `aud-x4-12`, `aud-ssars` lesson | A known departure in a review now leads to a qualified or adverse **conclusion** (SSARS 25), not "disclose the departure". Keys stay b, with rewritten text. | AR-C 90 as amended by SSARS 25 |
| `aud-professional-standards` lesson | Citation AS 1001/1015 → AS 1000. | AS 1000 |
| `far-lso-01` | Choice b rationale: $32,240 is finance-lease expense (26,000 + 6,240). | ASC 842-20-25 |
| `far-cont-02`, `far-tbs-u12-contingencies` t3, `far-contingencies` lesson | Gain-contingency disclosure "shall" be made (not "is allowed"). | ASC 450-30-50-1 |
| `far-tbs-u1-cash-flows` c4 | Van-for-note row relabelled as a hypothetical so it no longer contradicts the exhibit. | — |
| `far-dsec-10` | Price corrected to the annual-payment PV $105,154; key $1,581 → **$1,588**; distractors recomputed. | Arithmetic |
| `far-rev2-10` | Stem no longer says the license sells for $50,000 *and* the bundle for $56,000; $50,000 is now the list price. | ASC 606-10-32-34(c) |
| `far-tbs-u4-government-plans` | The city's plan follows GASB (fiduciary net position), not FASB ASC 962. Keys unchanged. | GASB 84 |
| `far-special-purpose` lesson | Cash-to-accrual revenue formula: + beginning unearned − ending unearned. | — |
| `far-tbs-x2-bonds` | Instructions say to use the PV factors provided. | — |
| `reg-c230-07` | Cites §10.34(d), not §10.22. | 31 CFR 10.34(d) |
| `reg-pb-03`, `reg-property-basis` lesson | Restated with the $19,000 2025 exclusion (basis $39,000, FMV $99,000); key $49,000 → **$48,000**. | IRC §1015(d)(6); Rev. Proc. 2024-40 |
| `reg-tbs-x4-individual` gi | Label "Total income (Form 1040, line 9)". | §61, §62 |
| `reg-x5-02` | Stem says there are no NOL or capital loss carryovers; rationale explains the carryforward rule. | IRC §170(b)(2)(D) |
| `reg-tbs-x5-research` p, s | 1065 and 1120-S due **March 16, 2026** (March 15 is a Sunday). | IRC §7503 |
| `reg-tbs-u7-partnership` se | Label says "before her §179 share"; explanation notes the Schedule SE reduction to 109,200. Key unchanged. | Form 1065 Sch. K line 14a |
| `tcp-cr2-01` d | Distractor now $12,500 (Q2 mid-quarter rate) with a correct rationale. | Rev. Proc. 87-57 tables |
| `tcp-tbs-x1-gift-retirement` bx | Label says "using the 2025 amount ($13,990,000)". | — |
| `tcp-tbs-u3-m1` | Book tax expense 195,720 (current 191,520 + deferred 4,200) and book net income 734,280, so the reconciliation ties; `re` → **1,734,280**. | ASC 740 |
| `tcp-sc2-01` | Form 2553 deadline key "March 15, 2025" → **"March 17, 2025"** (Saturday). | IRC §7503 |
| `aud-sa-04` | Audited value $3,500; projected misstatement → **$6,000** (no longer equal to a stem value). | AU-C 530 |
| `aud-tbs-x1-independence` s2 | Rationale addresses the facts (permitted tax service; no interest). | ET 1.295 |
| `aud-x1-04` c | "holds no more than 5%" matches the >5% rule. | ET 1.200 |
| `aud-using-others` lesson | SAS 149 terminology note added. | SAS 149 |

## New analysis-level simulations (P1-4, confirm)

New `review` TBS part: the candidate ticks each prepared amount that is wrong and enters the correct amount. Every row is scored, so flagging a correct row costs credit. All figures are fictional. Please confirm each key and explanation.

| Item | Blueprint task (paraphrased) | Authority |
|---|---|---|
| `far-tbs-u5-ar-review` | AR roll-forward from multiple sources; reconcile the subledger to the GL | ASC 310-10, 326-20 |
| `far-tbs-u5-inventory-review` | Inventory roll-forward; reconcile the perpetual subledger to the GL (FOB terms, consignment) | ASC 330-10 |
| `far-tbs-u6-ppe-rollforward` | PP&E roll-forward from source documents (installation, retirement, gain on sale) | ASC 360-10 |
| `far-tbs-u6-ppe-subledger` | Reconcile the fixed-asset register to the GL (repairs vs. capitalization) | ASC 360-10 |
| `far-tbs-u8-ap-recon` | Reconcile the AP subledger to the GL; unrecorded liabilities | ASC 405-10 |
| `far-tbs-u8-accruals-review` | Review an accrued-liabilities schedule (interest, warranty, vacation) | ASC 460-10, 710-10, 835-30 |
| `far-tbs-u1-statement-review` | Detect and correct discrepancies between the draft balance sheet, income statement and equity statement and the trial balance | ASC 210, 220, 320-10-35, 505 |
| `far-tbs-u1-cash-flow-review` | Detect and correct discrepancies in a draft statement of cash flows | ASC 230-10 |
| `far-tbs-u3-consolidation-review` | Detect and correct errors in consolidated amounts (upstream profit, intercompany balances, NCI) | ASC 810-10 |
| `far-tbs-u3-acquisition-review` | Acquisition-date consolidated amounts (full goodwill, NCI at fair value, unrecorded intangibles) | ASC 805-20, 805-30 |
| `far-tbs-u2-notes-review` | Compare the notes with the statements and support (debt maturities, tax note, interest paid) | ASC 470-10-50, 740-10-50, 230-10-50 |
| `reg-tbs-u4-gross-income-review` | Review Form 1040 gross income against source documents; resolve diagnostics | §§61, 85, 102, 103, 111, 402(g); pre-2019 alimony rules |
| `reg-tbs-u5-agi-review` | Review AGI and taxable income against source data; resolve diagnostics | §§162(l), 164, 199A, 221, 223, 404; 2025 standard deduction stated in the exhibit |
| `reg-tbs-u4-loss-review` | Review losses against source data; resolve loss-limitation diagnostics | §§165(d), 165(h)(5), 469(i), 1211(b), 1212(b) |
| `reg-tbs-u6-book-tax-review` | Find book-tax differences in a trial balance; check Schedule M-1 for completeness | §§162(f), 243, 264, 274; Form 1120 Sch. M-1/M-3 instructions |
| `reg-tbs-u7-1120s-review` | Review Form 1120-S classification; resolve diagnostics | §§1363, 1366, 1368; Rev. Rul. 91-26 |
| `reg-tbs-u7-1065-review` | Review Form 1065 classification; resolve diagnostics | §§702, 707(c), 1402(a)(13); Rev. Rul. 91-26 |
| `tcp-tbs-u5-s-basis-review` | Review S corporation stock and debt basis; loan repayment planning | §§1366(d), 1367; Reg. 1.1366-2, 1.1367-1(f), 1.1367-2 |
| `tcp-tbs-u4-partner-basis-review` | Review a partner's basis schedule; split the loss among the basis, at-risk and passive limits | §§465, 469, 704(d), 752 |
| `tcp-tbs-u7-disposition-review` | Review a disposition schedule's amount and character; resolve Form 4797/8824 diagnostics | §§1031, 1231, 1245, 1250, 1(h)(6) |
| `tcp-tbs-u5-aep-election` | Derive and compare distributions with and without the election to distribute AEP first | §§1362(d)(3), 1368(c), 1368(e)(3), 1375 |
| `tcp-tbs-u6-liquidation-compare` | Derive and compare liquidation results for a C corporation, an S corporation and a partnership | §§331, 336, 731, 732(b) |
| `tcp-tbs-u3-shareholder-review` | Review shareholder loan documents (imputed interest) and post-formation shareholder–corporation transactions | §§162(a)(1), 7872 |
| `aud-tbs-u6-ada-review` | Use data-analytics outputs to identify trends and notable items, and respond | AU-C 240.32, 500; AICPA Guide to Audit Data Analytics |
| `aud-tbs-u6-analytics-evaluation` | Evaluate and investigate analytical-procedure differences; final analytical procedures | AU-C 520.05–.07 |
| `aud-tbs-u6-sufficiency` | Conclude whether sufficient appropriate evidence has been obtained | AU-C 500, 501.16, 705 |
| `aud-tbs-u4-deficiency-evaluation` | Effect of misstatements on the ICFR assessment; impact of deficiencies on nature, timing and extent | AS 2201.62–.70; AU-C 265, 330 |
| `aud-tbs-u8-subsequent-review` | Determine whether subsequent events are properly reflected; dual-dating | AU-C 560; ASC 855 |
| `aud-tbs-u7-inventory-evaluation` | Evaluate test-count results and inventory held by others | AU-C 501.11–.12 |

## Indexed amounts now stated (P1-5, confirm)

The REG and TCP Blueprints say inflation-indexed amounts are not tested. Every item that required recalling one now states it: the stem for 38 MCQs, the instructions for 9 TBS. Keys are unchanged, except for the seven pure-recall items rewritten to apply the amount: `reg-te-pre1` (key $6,000), `reg-adj-01`, `reg-fs-05`, `reg-x4-03` (key $33,100), `tcp-gt-04` (key $9,990,000), `tcp-re-01` and `tcp-x1-17`. Please confirm the 2025 figures quoted. Twenty-six flashcards now teach the rule instead of the number. The ‡ rows in `reg-numbers.md` and `tcp-numbers.md` are marked "given on the exam".

## New topic coverage (P1-7, confirm)

| Module | Added | Authority |
|---|---|---|
| `far-intangibles` | Purchased software, internal-use software stages, cloud computing implementation costs; the old "tested in BAR" note is removed; MCQs `far-int-11`, `-12` | ASC 350-40; ASU 2018-15; ASU 2025-06 |
| `far-income-statement-oci` | Foreign-currency transaction gains and losses; ASU 2024-03 expense disaggregation; `far-iso-13`, `-14` | ASC 830-20; ASU 2024-03 |
| `far-debt-other` | Covenant calculations; the modification vs. extinguishment 10% test; debtor TDR accounting; `far-dbt-11` to `-13` | ASC 470-10-45-11, 470-50, 470-60 |
| `far-payables` | Exit and disposal liabilities and one-time termination benefits; `far-pay-12`, `-13` | ASC 420, 712 |
| `far-ratios` | EBITDA; budget-to-actual variances; `far-rat-12`, `-13` | — |
| `far-nfp-statements` | NFP statement of cash flows and liquidity notes; `far-nfs-11`, `-12` | ASC 230-10-45-14; ASU 2016-14 |
| `far-receivables` | ASU 2025-05 practical expedient; `far-rec-13` | ASU 2025-05 |
| `tcp-international` (new module) | Sourcing rules, ECI vs. FDAP withholding, permanent establishment, branch vs. subsidiary, CFC/Subpart F/GILTI, FTC limit; 12 MCQs and 6 flashcards | IRC §§245A, 861–865, 881, 882, 884, 901, 904, 951–957, 951A, 1442 |
| `tcp-c-corp-compliance` | NOL 80% limit and capital-loss utilization savings; `tcp-cc-11`, `-12` | §§172, 1211(a), 1212(a) |
| `tcp-formation-liquidation` | §311(b) property distributions by C and S corporations; `tcp-fl-13`, `-14` | §§301, 311(b), 312, 1367, 1368 |
| `tcp-individual-planning` | Investment risk, insurance, beneficiary designations; `tcp-ip-12`, `-13` | §101; SECURE Act 10-year rule |
| `tcp-partnership-formation` | Recourse/nonrecourse allocation, partner loans; `tcp-pf-13` | §752; Reg. 1.752-2, -3 |
| `tcp-deferral-transactions` | §1033 involuntary conversions; §267(c) constructive ownership; `tcp-dt-11`, `-12` | §§1033, 267 |
| `aud-government-compliance` (new module) | GAGAS engagements and reporting, single audits (2024 Uniform Guidance: $1,000,000 threshold, 40%/20% coverage, $25,000 questioned costs), AU-C 935, AT-C 315, ERISA plan audits and DOL independence; 12 MCQs (`aud-gov-*`) and 6 flashcards | GAGAS 2024; 2 CFR 200 Subpart F; AU-C 703, 935; AT-C 315; 29 CFR 2509.75-9 |
| `aud-data-analytics` | Relational data, measurement scales, data requests and cleaning, PCAOB technology-assisted analysis; `aud-da-13` to `-15` | AS 1105, AS 2301 (as amended 2024) |
| `aud-understanding-entity` | Economics (elasticity, business cycle, indicators); SOX §§301, 302, 404, 407, 906; `aud-ue-11` to `-13` | SOX |
| `aud-internal-control` | COSO objectives and inherent limitations; `aud-ic-12` | COSO 2013 |
| `aud-it-controls` | IT infrastructure, cloud services, SOC 1 type 2; `aud-itc-11` | AU-C 402; AS 2601 |
| `aud-evidence-assertions` | AS 2310 (revised) confirmation requirements; `aud-ev-12` | AS 2310 (2023) |
| `aud-quality-management` | PCAOB QC 1000 (effective December 15, 2026); `aud-qm-11` | QC 1000 |
| `aud-modified-opinions` | ICFR opinion and report form in an integrated audit; `aud-mo-11`, `-12` | AS 2201; AU-C 940 |
| `aud-professional-standards` | Auditor biases and skepticism; `aud-ps-11` | — |
| `reg-filing-status` | Decedent's final return, IRD; `reg-fs-11` | §§691, 6012(b), 6013(a)(2) |
| `reg-amt-other-taxes` | Regular-tax computation with given schedules and preferential rates; `reg-ot-11` | §1(h); Rev. Proc. 2024-40 (as amended by P.L. 119-21) |
| `reg-c-corp-income` | Corporate credits; general business credit limit and carryovers; `reg-cc-12` | §§38, 39, 901, 904 |
| `reg-preparer-penalties` | Tax return preparer definition; FBAR; `reg-pen-11`, `-12` | §7701(a)(36); 31 CFR 1010.350; 31 USC 5321 |
| `reg-contracts` | Discharge of contracts (performance, agreement, operation of law, breach); `reg-ct-11` | Restatement (Second) of Contracts; UCC 2-615 |

## Optional off-Blueprint material (P2-2, confirm)

Marked `optional` per `coverage-FAR.md` §(d) and `coverage-AUD.md` §(d). Optional material stays browsable, but it is left out of the default plan, readiness, mixed practice and diagnostics, and it is never on a mock exam (the validator enforces this). Learners can opt in under Settings.

- Modules: `far-conceptual-framework`, `far-benefit-plans`.
- Items: `far-gov-04`, `-05`, `-08` (GASB fund balance); `far-imp-04`, `-05`, `-08`, `far-int-09`, `far-x2-11` (goodwill); `far-sec-04` to `-07`, `-09`, `-10`, `far-x1-11` (segments); `far-x1-01`, `far-x1-18` (exam items in the optional modules); `aud-sp-07` (comfort letters).
- `far-mock-1`: the four optional exam items are replaced by in-scope items moved from the practice pool with the same key letter: `far-x1-01` → `far-scf-01`, `far-x1-18` → `far-iso-01`, `far-x1-11` → `far-eps-03`, `far-x2-11` → `far-rec-07`.
