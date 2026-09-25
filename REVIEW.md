# REVIEW — items needing a human check

Items flagged `needsReview: true` in content show a ⚠ **Needs review** badge in the app. `npm run validate`
prints the current count. Please confirm or correct each one, then remove the flag.

## Flagged content items

| Item | File | Why it's flagged |
|---|---|---|
| `far-ppe-10` (government donation of a building to a business entity) | `content/far/modules/far-ppe-acquisition/questions.json` | U.S. GAAP has little explicit guidance on how business entities account for government grants (ASU 2021-10 adds disclosures only). The keyed answer follows common review-course treatment (record the building at fair value, with contribution revenue or a gain); confirm it against current exam materials. |

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
| `aud-code-of-conduct` lesson, `aud-coc-07`, `aud-x1-05` | Referral fees are permitted with disclosure; commissions and contingent fees are prohibited only for audit, review, compilation (without an independence disclosure) and PFI-examination clients. | ET 1.510, 1.520 |

Still open: `far-ppe-10` (government grant to a business) awaits a decision on the treatment (D3); it keeps its
`needsReview` flag.

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
