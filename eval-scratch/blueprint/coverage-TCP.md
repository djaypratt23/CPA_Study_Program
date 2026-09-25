# TCP Blueprint coverage map

Evaluation of `content/tcp/` against the AICPA Uniform CPA Examination Blueprint for Tax Compliance and Planning (TCP), effective January 2026. The analysis is read-only. Representative tasks are paraphrased and shortened to 12 words or fewer. They are not quoted.

**Scope of evidence:** 19 lessons, 196 practice MCQs, 68 exam-pool MCQs, 57 lesson (pre/check) MCQs, 21 TBS (14 practice / 7 exam), 134 flashcards, 3 review sheets. Blueprint: 4 Areas, 25 topics, 98 tasks (24 R / 60 Ap / 14 An).

## Method and legend

- **Task status.** ✓ means the task is taught in a lesson and assessed by at least one item at or above its Blueprint skill. ◐ means partly covered: taught thinly or only a subset, or assessed only below the skill level. ✗ means not taught, or assessed without any teaching. Lesson pre/check MCQs count as assessment for task status but not in the item counts.
- **Genuine analysis.** An item counts as analysis only if it asks the learner to review a prepared schedule or documents for errors, or to derive and compare results under alternatives. This follows the Blueprint's analysis verbs, *review…to determine accuracy* and *derive…and compare*. A multi-step computation from source data counts as application, even when the repo labels it `analysis`.
- **Classification.** Each practice or exam MCQ and each TBS is assigned to the one topic it mainly assesses. A TBS goes to the topic of its dominant TCP-relevant rows. Items whose main content is REG-only material with no TCP topic are marked **OOS**: Schedule M-1/M-2/M-3, the Form 1120 due date, MACRS/§179/bonus/amortization computations, partnership separately-stated classification, and filing penalties. Items inside a topic's scope that match no representative task are flagged **off-task** in (d).
- **Depth bar for Full.** Either at least 20 practice MCQs, or at least 10 MCQs (practice + exam) plus at least 1 TBS (either pool). Rating order: Missing → Full → Thin (fewer than 5 mapped items, or fewer than 50% of tasks at ✓/◐) → Partial.
- Item ids omit the `tcp-` prefix in the tables.

## (a) Topic table

| Area | Group/Topic | # tasks (R/Ap/An) | Abbreviated tasks (skill, status) | Repo modules (count) | Lessons (sections) | Practice MCQ | Exam MCQ | TBS p/e | Rating | Gap note |
|---|---|---|---|---|---|---|---|---|---|---|
| I | **I.A** Individual GI/AGI/TI and estimated taxes | 10 (2/7/1) | R ✓ Equity compensation effects on taxable income<br>R ◐ Items entering AMTI<br>Ap ✗ Imputed interest on below-market loans; pay earned abroad<br>Ap ✓ Tax on child's unearned income<br>Ap ✓ Rate or law changes and income/expense timing<br>Ap ✗ Projected savings from FSAs and HSAs<br>Ap ✓ Itemize versus standard deduction<br>Ap ✓ Estimated payments to avoid underpayment penalty<br>Ap ✗ Savings from donating noncash property; choosing the property<br>An ◐ Year-end projection review with tax-minimizing options | individual-planning; stock-compensation (2) | Estimated tax; Timing and bunching; Surtaxes; Line up the dates; §83(b) | 22 | 9 | 1/1 | **Partial** | NIIT/Medicare surtax items (5) are off-task. Missing: §7872, foreign pay, FSA/HSA, noncash charity. |
| I | **I.B** Passive activity and at-risk limits | 4 (0/3/1) | Ap ✓ At-risk limit, incl. pass-through and rental losses<br>Ap ✓ Passive loss limit with netting<br>Ap ✓ Suspended losses freed on disposition<br>An ◐ Review basis schedules; split loss among the limits | passive-rental (1) | Four gates, in order; Vacation homes (§280A) | 10 | 5 | 1/0 | **Partial** | Vacation-home and EBL items (4) are off-task. No genuine analysis item. |
| I | **I.C** Gift taxation | 4 (2/2/0) | R ✓ Gift tax exclusions and deductions<br>R ✓ Unified transfer tax: exclusion, marital deduction, unified credit<br>Ap ✓ Compute taxable gifts<br>Ap ✓ Savings from gifting noncash property; shrink future estate | gift-tax (1) | From total gifts to taxable gifts; Basis of gifted property | 11 | 5 | 1/1 | **Full** | Meets bar. 5 items rely on recalled indexed amounts ($19,000; $13.99M). |
| I | **I.D** Personal financial planning | 7 (5/2/0) | R ✓ Pros and cons of IRAs, Roth, 401(k), annuities, employer plans<br>R ✗ Risks of stocks, corporate bonds, municipal bonds<br>R ✓ Funding higher education: QTPs, loans, grants, scholarships<br>R ✗ Insurance for risk: life, long-term care, umbrella<br>R ✗ Asset ownership form and beneficiary designations<br>Ap ◐ Schedule comparing retirement plan choices<br>Ap ✗ After-tax return on investment alternatives | retirement-education (1) | Traditional vs Roth; Early distributions; Education savings | 11 | 5 | 1/0 | **Thin** | Deep on retirement/education, absent on investments, insurance, ownership. |
| II | **II.A.1** C corp: NOL and capital loss utilization | 3 (1/2/0) | R ◐ NOL limits after an ownership change<br>Ap ✗ Compute C corp NOL and carryforward<br>Ap ◐ C corp capital loss use and carryback/carryforward | consolidated-returns; c-corp-compliance (2) | SRLY takeaway; M-1 capital-loss add-back only | 2 | 1 | 0/1 | **Thin** | No lesson on C corp NOL or capital loss rules. |
| II | **II.A.2** C corp: shareholder contributions and distributions | 5 (0/4/1) | Ap ✓ §351 contribution: shareholder gain, corporation basis<br>Ap ✗ Nonliquidating noncash distribution: gains and shareholder basis<br>Ap ✓ Liquidating distribution: gains and shareholder basis<br>Ap ✗ Cash distributions beyond current and accumulated E&P<br>An ✗ Review shareholder loan documents; imputed interest | formation-liquidation (1) | Formation planning; Getting money out | 7 | 2 | 0/1 | **Thin** | Formation and liquidation strong; property distributions and E&P ordering missing. |
| II | **II.A.3** C corp: consolidated returns | 2 (1/1/0) | R ✓ Consolidated return filing requirements<br>Ap ✓ Consolidated taxable income with intercompany eliminations | consolidated-returns (1) | Who can join; Consolidated taxable income | 9 | 2 | 1/0 | **Full** | Meets bar. |
| II | **II.A.4** C corp: international tax issues | 6 (5/1/0) | R ✗ Sourcing income of U.S. corporation abroad<br>R ✗ Sourcing for foreign corporation in U.S.; withholding<br>R ✗ Controlled foreign corporations and U.S. income<br>R ✗ Permanent establishment and triggering activities<br>R ✗ Foreign branch versus foreign subsidiary<br>Ap ✗ Compute U.S. and foreign source income | — (0) | — | 0 | 0 | 0/0 | **Missing** | Entire topic absent from lessons, items and flashcards. |
| II | **II.B.1** S corp: shareholder basis | 4 (0/3/1) | Ap ◐ Stock basis after noncash contribution with debt assumed<br>Ap ◐ Stock basis after noncash property distributions<br>Ap ✓ Debt basis from shareholder loans<br>An ◐ Review stock/debt basis schedules for accuracy | s-corp-compliance (1) | Stock basis and debt basis | 2 | 1 | 0/0 | **Thin** | Only 3 mapped MCQs; no basis TBS of its own. |
| II | **II.B.2** S corp: shareholder contributions and distributions | 4 (0/4/0) | Ap ◐ Noncash contribution: gain and S corp basis<br>Ap ✗ Noncash nonliquidating distribution: gains and basis<br>Ap ◐ S corp liquidating distribution<br>Ap ✗ Income allocation after a shareholder sells | s-corp-compliance; formation-liquidation (2) | Distributions from an S corporation with E&P | 2 | 0 | 1/0 | **Thin** | Cash AAA/E&P ordering well covered; noncash property absent. |
| II | **II.C.1** Partnership: partner basis | 4 (0/3/1) | Ap ✓ Basis after noncash contribution with debt assumed<br>Ap ✓ Basis after nonliquidating noncash distribution<br>Ap ◐ Recourse/nonrecourse debt and partner loans in basis<br>An ◐ Review partner basis schedule for accuracy | partnership-formation; partnership-operations; partnership-distributions (3) | Two bases; Liabilities (§752); Rolling basis forward; Current distributions | 7 | 2 | 1/1 | **Partial** | 9 MCQs + 2 TBS (u4-k1 mostly REG-style K-1 prep). |
| II | **II.C.2** Partnership and partner elections | 1 (1/0/0) | R ✓ Partnership elections: tax year, basis adjustment | partnership-operations; partnership-distributions (2) | Required tax year and §754 takeaways | 5 | 1 | 0/0 | **Partial** | Covered; 3 of 6 items are due dates/org costs (off-task). |
| II | **II.C.3** Partner–partnership transactions | 4 (0/4/0) | Ap ✓ Partner services and other partner–partnership transactions<br>Ap ✓ Noncash contribution: partner gain, partnership basis<br>Ap ✓ Nonliquidating noncash distribution: gain and property basis<br>Ap ✓ Liquidating distribution: gain/loss and property basis | partnership-formation; partnership-operations; partnership-distributions (3) | Services and other traps; Guaranteed payments; Current and liquidating distributions | 11 | 4 | 1/0 | **Full** | Meets bar. §707(a)/(b) partner sales not taught. |
| II | **II.C.4** Partnership ownership changes | 2 (0/2/0) | Ap ✓ Income allocation after a partner sells<br>Ap ✓ Inside basis adjustment after transfer (§743(b)) | partnership-distributions (1) | Selling an interest | 4 | 1 | 0/0 | **Partial** | Tasks covered; only 5 items, no TBS of its own. |
| II | **II.D.1** Trusts: types | 3 (3/0/0) | R ✓ Simple, complex and grantor trust traits<br>R ◐ Trust as conduit; grantor, trustee, beneficiary roles; corpus<br>R ✓ Revocable trust traits | trusts-estates (1) | Key takeaways; Complex trusts and planning | 5 | 1 | 0/0 | **Partial** | 4 of 6 items are filing/estate items (off-task). |
| II | **II.D.2** Trusts: income and deductions | 2 (0/2/0) | Ap ◐ Allocate items between income and corpus<br>Ap ✓ Accounting income, DNI, taxable income, distribution deduction | trusts-estates (1) | DNI: the ceiling and the character | 5 | 2 | 1/0 | **Partial** | 7 MCQs + 1 TBS; below depth bar. |
| II | **II.E.1** Exempt status: obtain and keep | 2 (2/0/0) | R ✓ §501(c)(3) qualification requirements<br>R ✓ Events that cost exempt status | exempt-organizations (1) | Which return?; §501(c)(3) takeaways | 6 | 1 | 0/0 | **Partial** | Covered; below depth bar. |
| II | **II.E.2** Unrelated business income | 1 (1/0/0) | R ✓ Types of unrelated business income | exempt-organizations (1) | Unrelated business taxable income | 4 | 1 | 0/0 | **Partial** | Covered; below depth bar (UBTI also in TBS u5 museum part). |
| III | **III.A** Formation and liquidation of entities | 4 (0/2/2) | Ap ◐ Entity-choice schedule of noncash property results<br>Ap ✓ Identify entity type from legal traits<br>An ✓ Derive and compare entity selection results<br>An ◐ Derive and compare liquidation results across entities | entity-choice; formation-liquidation (2) | Combined rate on $100; Default classification | 10 | 3 | 1/0 | **Partial** | Only topic with a genuine analysis TBS. |
| III | **III.B** Tax planning for C corporations | 5 (0/4/1) | Ap ✗ Savings from NOL and capital loss carryovers<br>Ap ✓ State and local planning: apportionment, location<br>Ap ◐ Rate or law changes and C corp timing<br>Ap ✓ C corp estimated payments to avoid penalty<br>An ◐ Post-formation shareholder–corporation transaction analysis | multistate; c-corp-compliance; formation-liquidation; cost-recovery (4) | Nexus; Apportionment; Estimated tax; Penalty taxes; Getting money out | 17 | 4 | 1/0 | **Partial** | AET/PHC/CAMT and sales-tax items (5) are off-task. |
| III | **III.C** Tax planning for S corporations | 4 (0/2/2) | Ap ✓ Projected built-in gain on planned disposition<br>Ap ✓ Consequences of terminating the S election<br>An ✗ Post-formation S corp transactions, loans and repayments<br>An ✗ Election to distribute AEP before AAA | s-corp-compliance (1) | Entity-level taxes; termination takeaways | 6 | 3 | 0/1 | **Partial** | Both analysis tasks missing; 4 eligibility items off-task. |
| III | **III.D** Tax planning for partnerships | 3 (0/2/1) | Ap ✓ Contributing appreciated or depreciated property<br>Ap ✓ Guaranteed payments and nonliquidating distributions<br>An ◐ Derive results of a proposed partnership transaction | partnership-formation; partnership-operations (2) | §704(c) example; Guaranteed payments | 3 | 0 | 0/0 | **Thin** | Only 3 items framed as planning; rules sit in II.C. |
| IV | **IV.A** Nontaxable dispositions | 2 (0/1/1) | Ap ◐ Like-kind and involuntary conversion gain and basis<br>An ◐ Review sales/exchanges: taxable or nontaxable? | deferral-transactions (1) | Like-kind exchanges | 3 | 1 | 1/0 | **Partial** | Like-kind solid; §1033 missing. |
| IV | **IV.B** Gain/loss amount, character and netting | 8 (0/6/2) | Ap ✓ Character of gain or loss on disposal<br>Ap ✓ §1231 gain and ordinary loss<br>Ap ✓ §1245 and §1250 recapture<br>Ap ✓ Unrecaptured §1250 gain<br>Ap ✓ §1244 stock loss<br>Ap ✓ Installment sale gain<br>An ◐ Review disposition schedule for amount and character<br>An ✗ Resolve diagnostic-check discrepancies on gains | asset-dispositions; deferral-transactions; formation-liquidation (3) | Character of gain; The lookback; Installment sales | 15 | 6 | 1/1 | **Partial** | Application strong; both analysis tasks unmet. |
| IV | **IV.C** Related party transactions | 4 (1/3/0) | R ✓ Who is a related party<br>Ap ◐ Direct/indirect ownership to test relatedness<br>Ap ✓ Resale to outsider of property from related party<br>Ap ✗ Imputed interest on related-party deals | deferral-transactions; formation-liquidation (2) | Related parties; §318 in redemptions | 3 | 1 | 0/0 | **Thin** | Only 4 items; imputed interest absent. |

**Rating counts:** Full 3 · Partial 14 · Thin 7 · Missing 1 (25 topics).

Full: I.C, II.A.3, II.C.3. Thin: I.D, II.A.1, II.A.2, II.B.1, II.B.2, III.D, IV.C. Missing: II.A.4.

## (b) Area totals

| Area (Blueprint weight) | Practice MCQ | Exam MCQ | TBS p/e | Tasks R / Ap / An | Covered at skill level R / Ap / An | Covered at level (total) | ◐ partial | ✗ none |
|---|---|---|---|---|---|---|---|---|
| I Individuals & PFP (30–40%) | 54 | 24 | 4/2 | 9 / 14 / 2 | 5/9 · 9/14 · 0/2 | 14/25 (56%) | 4 | 7 |
| II Entity compliance (30–40%) | 69 | 19 | 5/3 | 14 / 26 / 3 | 7/14 · 13/26 · 0/3 | 20/43 (47%) | 11 | 12 |
| III Entity planning (10–20%) | 36 | 10 | 2/1 | 0 / 10 / 6 | 0/0 · 7/10 · 1/6 | 8/16 (50%) | 5 | 3 |
| IV Property transactions (10–20%) | 21 | 8 | 2/1 | 1 / 10 / 3 | 1/1 · 7/10 · 0/3 | 8/14 (57%) | 4 | 2 |
| OOS (not TCP) | 16 | 7 | 1/0 | — | — | — | — | — |
| **All** | **196** | **68** | **14/7** | **24 / 60 / 14** | **13/24 · 36/60 · 1/14** | **50/98 (51%)** | **24** | **24** |

Share of the 180 mapped practice MCQs: Area I 30%, II 38%, III 20%, IV 12%. That is roughly in line with the Blueprint weights. Skill coverage is not: 1 of 14 analysis tasks is met at analysis level, while analysis carries 25–35% of the TCP exam.

## (c) Uncovered or under-skilled tasks

✗ = not covered (or assessed without teaching); ◐ = partial / below skill level.

**I.A Individual GI/AGI/TI and estimated taxes**
- ◐ [R] Items entering AMTI — Only the ISO spread (sc-03, x1-07); no other AMT items taught
- ✗ [Ap] Imputed interest on below-market loans; pay earned abroad — No §7872 or foreign earned income content anywhere
- ✗ [Ap] Projected savings from FSAs and HSAs — No FSA/HSA content
- ✗ [Ap] Savings from donating noncash property; choosing the property — Appreciated-property gifts appear only as a wrong option (x1-05)
- ◐ [An] Year-end projection review with tax-minimizing options — Only Ap-level single-choice items (ip-08, ip-09, x1-05) and an Ap TBS

**I.B Passive activity and at-risk limits**
- ◐ [An] Review basis schedules; split loss among the limits — x1-23 applies the order at Ap; no schedule review

**I.D Personal financial planning**
- ✗ [R] Risks of stocks, corporate bonds, municipal bonds — No investment content
- ✗ [R] Insurance for risk: life, long-term care, umbrella — No insurance content
- ✗ [R] Asset ownership form and beneficiary designations — No ownership/beneficiary content
- ◐ [Ap] Schedule comparing retirement plan choices — Only Roth-vs-traditional choice (re-10) and single-plan limits
- ✗ [Ap] After-tax return on investment alternatives — No after-tax yield/ROI content

**II.A.1 C corp: NOL and capital loss utilization**
- ◐ [R] NOL limits after an ownership change — SRLY only (cr-07); §382 not taught
- ✗ [Ap] Compute C corp NOL and carryforward — Not taught; one TBS row (x2-corporate) uses 80% limit
- ◐ [Ap] C corp capital loss use and carryback/carryforward — Carryback 3/forward 5 not taught; tested once (cc-10)

**II.A.2 C corp: shareholder contributions and distributions**
- ✗ [Ap] Nonliquidating noncash distribution: gains and shareholder basis — §311(b)/§301 property distributions absent
- ✗ [Ap] Cash distributions beyond current and accumulated E&P — Return-of-capital ordering not taught or tested
- ✗ [An] Review shareholder loan documents; imputed interest — No shareholder-loan or §7872 content

**II.A.4 C corp: international tax issues**
- ✗ [R] Sourcing income of U.S. corporation abroad — Not covered
- ✗ [R] Sourcing for foreign corporation in U.S.; withholding — Not covered
- ✗ [R] Controlled foreign corporations and U.S. income — Not covered
- ✗ [R] Permanent establishment and triggering activities — Not covered
- ✗ [R] Foreign branch versus foreign subsidiary — Not covered
- ✗ [Ap] Compute U.S. and foreign source income — Not covered

**II.B.1 S corp: shareholder basis**
- ◐ [Ap] Stock basis after noncash contribution with debt assumed — Generic §351 rules only; no S corp item
- ◐ [Ap] Stock basis after noncash property distributions — Cash distributions only
- ◐ [An] Review stock/debt basis schedules for accuracy — Basis computed (Ap), never reviewed

**II.B.2 S corp: shareholder contributions and distributions**
- ◐ [Ap] Noncash contribution: gain and S corp basis — Generic §351 only
- ✗ [Ap] Noncash nonliquidating distribution: gains and basis — No S corp property distribution content
- ◐ [Ap] S corp liquidating distribution — Generic §331/§336 only
- ✗ [Ap] Income allocation after a shareholder sells — Per-share/per-day tested (sc2-08) but not taught

**II.C.1 Partnership: partner basis**
- ◐ [Ap] Recourse/nonrecourse debt and partner loans in basis — Liability sharing generic; recourse vs nonrecourse and partner loans not taught
- ◐ [An] Review partner basis schedule for accuracy — Basis computed (Ap) in TBS, never reviewed

**II.D.1 Trusts: types**
- ◐ [R] Trust as conduit; grantor, trustee, beneficiary roles; corpus — Roles never explained

**II.D.2 Trusts: income and deductions**
- ◐ [Ap] Allocate items between income and corpus — Allocations are given, not decided; no principal-and-income rules

**III.A Formation and liquidation of entities**
- ◐ [Ap] Entity-choice schedule of noncash property results — Rates compared; noncash property not modeled by entity
- ◐ [An] Derive and compare liquidation results across entities — Only conceptual ec-09 (Ap)

**III.B Tax planning for C corporations**
- ✗ [Ap] Savings from NOL and capital loss carryovers — Not taught or tested
- ◐ [Ap] Rate or law changes and C corp timing — Conceptual only (cr2-09); no computation
- ◐ [An] Post-formation shareholder–corporation transaction analysis — fl-10 (cash redemption) only; no noncash property

**III.C Tax planning for S corporations**
- ✗ [An] Post-formation S corp transactions, loans and repayments — One-line lesson mention; no item
- ✗ [An] Election to distribute AEP before AAA — Not covered

**III.D Tax planning for partnerships**
- ◐ [An] Derive results of a proposed partnership transaction — Rules computed in II.C items; nothing compares options

**IV.A Nontaxable dispositions**
- ◐ [Ap] Like-kind and involuntary conversion gain and basis — §1033 involuntary conversions absent
- ◐ [An] Review sales/exchanges: taxable or nontaxable? — Eligibility recall only (dt-06, TBS dropdown)

**IV.B Gain/loss amount, character and netting**
- ◐ [An] Review disposition schedule for amount and character — TBS u7-form4797/x4-property prepare, not review
- ✗ [An] Resolve diagnostic-check discrepancies on gains — Not covered

**IV.C Related party transactions**
- ◐ [Ap] Direct/indirect ownership to test relatedness — §318 only in redemptions; §267(c) not taught
- ✗ [Ap] Imputed interest on related-party deals — No §7872/§483/§1274 content

## (d) Classification counts and out-of-scope items

**Totals.** All 264 practice and exam MCQs and all 21 TBS were classified, one topic each.

| | Practice MCQ | Exam MCQ | TBS practice | TBS exam |
|---|---|---|---|---|
| Mapped to a TCP topic | 180 | 61 | 13 | 7 |
| of which off-task (in topic scope, no matching task) | 23 | 7 | — | — |
| Out of scope (REG-only content) | 16 | 7 | 1 | 0 |
| **Total** | **196** | **68** | **14** | **7** |

Per-topic counts are in table (a), and the full id list is in the Appendix. Topics with **no TBS mapped**: II.A.4, II.B.1, II.C.2, II.C.4, II.D.1, II.E.1, II.E.2, III.D, IV.C. Topics with **no exam MCQ**: II.A.4, II.B.2, III.D.

**Out-of-scope items (24).** TCP's Blueprint does not cover this content. It belongs to REG.

| Content | Items | Where it belongs |
|---|---|---|
| Schedule M-1 / M-2 / M-3, Form 1120 due date | practice cc-01, cc-02, cc-03, cc-04, cc-05; exam x2-01, x2-02, x2-23; TBS u3-m1 (p) | REG V (book/tax differences, C corp returns) |
| MACRS, §179, bonus, listed property, §197/start-up amortization, §174A | practice cr2-01 – cr2-08, cr2-10; exam x4-08, x4-09, x4-10 | REG III (cost recovery) |
| Partnership special allocations; separately stated §1231 | practice po-08, po-11 | REG V (partnership OBI and separately stated items) |
| Form 1065 late-filing penalty | exam x2-24 | REG I (taxpayer penalties) |

Almost all of the `tcp-cost-recovery` module is REG material: its lesson, 9 of its 10 practice MCQs, all 3 of its exam MCQs and its 8 flashcards. Only cr2-09, electing out of bonus when rates will rise, maps to a TCP task (III.B timing). Two TBS were mapped to TCP topics even though most of their rows are REG-style. `u4-k1` builds Form 1065 ordinary income and K-1 amounts, and was mapped to II.C.1 for its basis row. `x2-corporate` covers M-1, the charitable limit and the DRD, and was mapped to II.A.1 for its NOL row. Cost-recovery rows also appear in `u7-exchange-installment` and `x4-property`.

**Off-task items (30: 23 practice, 7 exam)** are counted in their topic but match no representative task:
- **I.A:** ip-04, ip-05, ip-06, x1-02, x1-03 (NIIT / Additional Medicare surtaxes)
- **I.B:** pa-05 (excess business loss), pa-06, pa-10, x1-12 (§280A vacation homes)
- **II.C.2:** pf-07 (organization costs), pf-11, po-06 (Form 1065 due date)
- **II.C.3:** po-07 (limited partner SE tax)
- **II.D.1:** te-06, te-09 (Form 1041 due date / filing threshold); te-07, x2-19 (estate fiscal year — estates are not in the TCP Blueprint)
- **II.E.1:** eo-01 (Form 990 due date), eo-04 (private foundation excise tax), eo-06 (intermediate sanctions), x2-22 (Form 990-N)
- **III.B:** cc-07, cc-08, cc-09, x2-03 (PHC / accumulated earnings tax / corporate AMT); ms-01 (sales-tax nexus)
- **III.C:** sc2-01 (Form 2553 deadline), sc2-02, x2-14 (eligibility), sc2-09 (reasonable compensation)

**Skill-label audit.** The repo labels 27 MCQs (21 practice, 6 exam) and 15 of 21 TBS as `analysis`. Two of them meet the Blueprint-verb test for genuine analysis. `fl-10` computes a redemption against a dividend alternative and compares them. TBS `u6-entity-choice` computes tax under three entity alternatives and ranks them. The nearest misses are:
- `u7-form4797` and `x4-property`, which prepare a disposition schedule but never review a flawed one
- `u5-s-corp`, `x2-partnership` and `u4-k1`, which compute basis or AAA, with nothing to review
- `x1-individual`, a year-end projection with no options to weigh
- `x1-23`, which applies the loss-limit order

The analysis-labeled MCQs are mostly single-rule "which is best" choices, so they are application at most. By the repo's own labels, the practice MCQ mix is R 27% / Ap 63% / An 11%, and the exam pool is R 22% / Ap 69% / An 9%. The Blueprint targets R 5–15% / Ap 55–65% / An 25–35%. Remembering is over-weighted, and analysis is under-weighted even before the re-rating.

## (e) Inflation-indexed amounts and international tax

The TCP section assumptions say candidates will not be tested on their knowledge of inflation-indexed rates, amounts or limitations. They also say timing-dependent questions will state the timing. The repo's stems do generally state the year (2025) and use real dates, which is consistent with the timing assumption.

### Items whose correct answer requires recalling an indexed amount that the stem or exhibit does not give

| Item | Pool | Amount the learner must recall |
|---|---|---|
| tcp-ip-07 | practice | Kiddie-tax unearned-income threshold $2,700 |
| tcp-gt-01 | practice | Gift annual exclusion $19,000 |
| tcp-gt-04 | practice | Basic exclusion amount $13,990,000 (pure recall) |
| tcp-gt-10 | practice | 5 × $19,000 = $95,000 §529 five-year election |
| tcp-pa-05 | practice | Excess business loss threshold $626,000 (MFJ) |
| tcp-re-01 | practice | 401(k) deferral $23,500 + $7,500 catch-up |
| tcp-re-03 | practice | Roth phase-out $236,000–$246,000 (MFJ) and $7,000 IRA limit |
| tcp-te-03 | practice | Trust top-bracket threshold $15,650 |
| tcp-x1-04 | exam | Kiddie-tax threshold $2,700 |
| tcp-x1-13 | exam | Gift annual exclusion $19,000 |
| tcp-x1-17 | exam | 401(k) $23,500 + age 60–63 catch-up $11,250 |
| tcp-x4-08 | exam | §179 limit $2,500,000 and phase-out start $4,000,000 (indexed after 2025) |
| tcp-gt-chk1 | lesson | Gift annual exclusion $19,000 |
| tcp-re-chk1 | lesson | IRA deduction phase-out $79,000–$89,000 (and $7,000 limit) |
| tcp-cr2-chk1 | lesson | §179 $2,500,000 / $4,000,000 |
| TBS tcp-tbs-u2-retirement-education | practice | IRA deduction phase-out $79,000–$89,000 (Kara row); Roth phase-out for the Roth-eligibility dropdown |
| TBS tcp-tbs-u7-exchange-installment | practice | §179 $2,500,000 / $4,000,000 (§179 and bonus rows) |
| TBS tcp-tbs-x1-gift-retirement | exam | Annual exclusion $19,000 (son's gift) and basic exclusion $13,990,000 (remaining-exclusion row) |

**Count:**
- **MCQs: 15.** That is 8 practice and 4 exam (12 of 264, 4.5%) plus 3 lesson checks. Across all 321 MCQs, the rate is 4.7%.
- **TBS: 3 of 21.** Two are practice and one is exam.

The exam pool has 4 such MCQs and 1 such TBS, so the simulated exam asks for knowledge the real exam says it will not test. The fix is simple. Give the figure in the stem, as `tcp-tbs-u2-gift-709` already does with "2025 annual exclusion $19,000", or test the structure instead of the number.

**Borderline, not counted:**
- **tcp-gt-02:** rejecting a distractor needs the exclusion to exceed $15,000.
- **tcp-gt-03:** the Crummey amount of $19,000 appears in the stem, which effectively supplies the figure.
- **tcp-ip-10 and tcp-x1-22:** the P.L. 119-21 SALT cap ($40,000, 30% reduction above $500,000 MAGI, $10,000 floor) is a statutory schedule with 1% annual step-ups, not CPI indexing. It is still a year-specific figure the learner must recall.
- **tcp-ip-08 and tcp-x1-05:** the QCD limit of $108,000 exists but never binds.

**Correctly drilled non-indexed amounts (no issue):**
- NIIT and Additional Medicare thresholds
- The $150,000 AGI estimated-tax test and the $1,000 de minimis
- The $25,000 rental allowance and its $100,000–$150,000 phase-out
- AOTC/LLC phase-outs, §1244 limits, the pre-2025 §1202 $10M cap, fiduciary exemptions, and Form 990 thresholds

### Flashcards and review lines that drill indexed amounts

- **Flashcards: 11 of 134.**
  - tcp-ip-f5 (kiddie $2,700) and tcp-ip-f7 (QCD $108,000)
  - tcp-pa-f5 (EBL $313,000/$626,000)
  - tcp-gt-f1 ($19,000/$38,000) and tcp-gt-f3 (BEA $13,990,000)
  - tcp-re-f1 (IRA $7,000 + $1,000), tcp-re-f2 (401(k) $23,500/$7,500/$11,250), tcp-re-f3 (SEP maximum $70,000) and tcp-re-f4 (Roth phase-outs)
  - tcp-te-f4 (trust $15,650)
  - tcp-cr2-f2 (§179 $2.5M/$4M)
- **`content/tcp/review/tcp-numbers.md`: 16 of 50 table rows.**
  - Lines 18 (kiddie), 20 (QCD) and 22 (EBL)
  - Lines 28 (annual exclusion), 29 (noncitizen-spouse exclusion $190,000) and 30 (basic exclusion)
  - Lines 37 (IRA), 38 (401(k)), 39 (SIMPLE $16,500), 40 (§415(c)/SEP $70,000), 41 (IRA deduction phase-out), 42 (spousal phase-out) and 43 (Roth phase-out)
  - Line 61 (fiduciary top bracket)
  - Line 71 (§179) and line 78 (post-July 4, 2025 §1202 $15M cap / $75M assets, indexed from 2027)
  - Line 19 (SALT cap) is borderline.
- **Also:** `tcp-formulas.md` line 16 repeats the EBL thresholds. The key takeaways in 6 lessons (individual-planning, passive-rental, gift-tax, retirement-education, trusts-estates, cost-recovery) restate these figures.
- **What's missing:** `REVIEW.md` flags these figures for spot-checking only for accuracy. Nothing in the repo says the exam will not test them.

### International tax issues (Area II.A.4)

The Blueprint topic has 6 tasks (5 R, 1 Ap): sourcing for U.S. corporations abroad and for foreign corporations in the U.S. (with withholding), CFCs, permanent establishment, branch versus subsidiary, and computing U.S. and foreign-source income. The Blueprint introduction frames it as general sourcing and allocation concepts rather than specific foreign laws or treaties.

**Repo coverage: none. Rated Missing.** No lesson, MCQ, TBS, flashcard or review line addresses it. The only mentions of "foreign" are incidental:
- foreign corporations are not includible in a consolidated group (consolidated lesson, cr-01 distractor, flashcard cr-f2)
- foreign taxes are separately stated (partnership-operations lesson)
- foreign R&E is amortized over 15 years (cost-recovery lesson)

There is nothing on §861–§865 sourcing, CFC/subpart F/GILTI, permanent establishment, branch versus subsidiary, or withholding on U.S.-source payments to foreign persons (§1441/§1442/§1446). `docs/BLUEPRINT_NOTES.md` notes that one international task was removed in 2026, but `content/sections/tcp.yaml` has no international module at all. Area II carries 30–40% of the exam, and this is 1 of its 14 topics.

## Appendix: item-to-topic classification

| Topic | Practice MCQs | Exam MCQs | TBS (p/e) |
|---|---|---|---|
| I.A | ip-01, ip-02, ip-03, ip-04, ip-05, ip-06, ip-07, ip-08, ip-09, ip-10, ip-11, sc-01, sc-02, sc-03, sc-04, sc-05, sc-06, sc-07, sc-08, sc-09, sc-10, sc-11 | x1-01, x1-02, x1-03, x1-04, x1-05, x1-06, x1-07, x1-08, x1-22 | u1-estimates-surtaxes (p), x1-individual (e) |
| I.B | pa-01, pa-02, pa-03, pa-04, pa-05, pa-06, pa-07, pa-08, pa-09, pa-10 | x1-09, x1-10, x1-11, x1-12, x1-23 | u1-passive-options (p) |
| I.C | gt-01, gt-02, gt-03, gt-04, gt-05, gt-06, gt-07, gt-08, gt-09, gt-10, gt-11 | x1-13, x1-14, x1-15, x1-16, x1-24 | u2-gift-709 (p), x1-gift-retirement (e) |
| I.D | re-01, re-02, re-03, re-04, re-05, re-06, re-07, re-08, re-09, re-10, re-11 | x1-17, x1-18, x1-19, x1-20, x1-21 | u2-retirement-education (p) |
| II.A.1 | cc-10, cr-07 | x3-07 | x2-corporate (e) |
| II.A.2 | fl-01, fl-02, fl-04, fl-05, fl-06, fl-08, fl-09 | x3-04, x3-06 | x3-entity-planning (e) |
| II.A.3 | cr-01, cr-02, cr-03, cr-04, cr-05, cr-06, cr-08, cr-09, cr-10 | x2-04, x2-05 | u3-estimates-consolidated (p) |
| II.A.4 | — | — | — |
| II.B.1 | sc2-03, sc2-04 | x2-15 | — |
| II.B.2 | sc2-08, sc2-10 | — | u5-s-corp (p) |
| II.C.1 | pf-02, pf-08, pf-09, po-04, po-09, po-10, pd-01 | x2-06, x2-09 | u4-k1 (p), x2-partnership (e) |
| II.C.2 | pf-07, pf-11, po-05, po-06, pd-06 | x2-08 | — |
| II.C.3 | pf-01, pf-03, pf-04, pf-05, pf-10, po-01, po-07, pd-02, pd-03, pd-09, pd-10 | x2-07, x2-10, x2-11, x2-12 | u4-distributions-sale (p) |
| II.C.4 | pd-04, pd-05, pd-07, pd-08 | x2-13 | — |
| II.D.1 | te-01, te-05, te-06, te-07, te-09 | x2-19 | — |
| II.D.2 | te-02, te-03, te-04, te-08, te-10 | x2-18, x2-20 | u5-trust-exempt (p) |
| II.E.1 | eo-01, eo-02, eo-04, eo-06, eo-08, eo-10 | x2-22 | — |
| II.E.2 | eo-03, eo-05, eo-07, eo-09 | x2-21 | — |
| III.A | ec-01, ec-02, ec-03, ec-04, ec-05, ec-06, ec-07, ec-08, ec-09, ec-10 | x3-01, x3-02, x3-03 | u6-entity-choice (p) |
| III.B | cc-06, cc-07, cc-08, cc-09, ms-01, ms-02, ms-03, ms-04, ms-05, ms-06, ms-07, ms-08, ms-09, ms-10, fl-07, fl-10, cr2-09 | x2-03, x3-08, x3-09, x3-10 | u6-multistate-liquidation (p) |
| III.C | sc2-01, sc2-02, sc2-05, sc2-06, sc2-07, sc2-09 | x2-14, x2-16, x2-17 | x2-research (e) |
| III.D | pf-06, po-02, po-03 | — | — |
| IV.A | dt-04, dt-05, dt-06 | x4-05 | u7-exchange-installment (p) |
| IV.B | ad-01, ad-02, ad-03, ad-04, ad-05, ad-06, ad-07, ad-08, ad-09, ad-10, dt-01, dt-02, dt-03, dt-10, fl-03 | x4-01, x4-02, x4-03, x4-04, x4-07, x3-05 | u7-form4797 (p), x4-property (e) |
| IV.C | dt-07, dt-08, dt-09 | x4-06 | — |
| OOS | cc-01, cc-02, cc-03, cc-04, cc-05, po-08, po-11, cr2-01, cr2-02, cr2-03, cr2-04, cr2-05, cr2-06, cr2-07, cr2-08, cr2-10 | x2-01, x2-02, x2-23, x2-24, x4-08, x4-09, x4-10 | u3-m1 (p) |
