# REG coverage vs. AICPA CPA Exam Blueprint (effective January 2026)

Read-only evaluation of `content/reg/` (25 modules, 251 practice MCQs, 72 exam-pool MCQs, 75 lesson-check MCQs, 22 TBS, 152 flashcards, 3 review sheets) against the 2026 REG Blueprint: 5 Areas, 36 Groups/Topics, 105 representative tasks (39 Remembering & Understanding, 52 Application, 14 Analysis, 0 Evaluation). The task text below is abbreviated; it is not the Blueprint's wording.

## Method and conventions

- **Classification.** Each practice MCQ, exam MCQ and TBS is assigned to the one Blueprint topic it mainly assesses. A mixed TBS goes to its main in-scope topic when at least about 40% of its rows are in scope. Rows on other topics still count as secondary evidence when a task is judged.
- **Out of scope (OOS).** An item is OOS when its main content is (a) placed in the 2026 **TCP** Blueprint and not REG (AMT, kiddie tax, passive-activity/at-risk, gift tax, trusts, UBTI/exempt status, E&P and distributions, §351, redemptions, liquidations, §1231/§1245/§1250/§1244, like-kind/§1033/installment, §267 related parties, partnership property distributions or sale of an interest, S-corp BIG tax or sale-year allocation), or (b) based on an authority not in the REG References (Securities Acts of 1933 and 1934, FLSA, ERISA, FMLA, COBRA, workers' compensation, AICPA SSTS).
- **Taught** means a lesson section or key takeaway explains the task. A lesson-check MCQ counts as teaching, not assessment.
- **Assessed** means at least one practice/exam MCQ or TBS row at or above the task's skill level. The repo's own skill tags were re-checked. None of the 9 MCQs and none of the 10 TBS that the repo tags "analysis" requires reviewing a prepared return or schedule against source data, or resolving diagnostic-check output. All are single- or multi-step computations, so all count as Application.
- **Ratings** follow the brief. Where Thin and Partial overlap, **fewer than 5 mapped items → Thin** is applied first. Full also requires every task ✓.
- Legend: **✓** means taught and assessed at the Blueprint skill level. **✗** means not taught, not assessed, or assessed only below the level. R = Remembering, Ap = Application, An = Analysis.

## (a) Topic table

| Area | Group/Topic | # tasks (R/Ap/An) | Abbreviated tasks | Repo modules | Lessons | Practice MCQ | Exam MCQ | TBS p/e | Rating | Gap note |
|---|---|---|---|---|---|---|---|---|---|---|
| I | A.1 Circular 230 practice rules | 2 (1/1/0) | R Recall Circ. 230 practice rules ✓; Ap Apply Circ. 230 to scenario ✓ | circular-230 | Who may practice; Key duties; Contingent fees | 7 | 2 | 0/0 | Partial | Fully taught. 9 MCQs and no TBS of its own (Circ. 230 rows sit in u1-penalties and x1-procedures). 4 more items test SSTS, which is not in the References |
| I | A.2 IRC/regs on tax return preparers | 3 (2/1/0) | R Recall who is a tax return preparer ✗; R Recall preparer-penalty situations ✓; Ap Apply preparer penalties ✓ | preparer-penalties, circular-230 | Preparer penalties | 3 | 1 | 0/0 | Thin | No definition of a return preparer (signing or non-signing). Only 4 mapped MCQs; §6694 rows appear in u1/x1 TBS |
| I | B Licensing & disciplinary systems | 1 (1/0/0) | R State boards of accountancy role/authority ✗ | — | — | 0 | 0 | 0/0 | **Missing** | No UAA or state-board content anywhere |
| I | C.1 Audits, appeals, judicial process | 2 (2/0/0) | R Explain audit and appeals process ✓; R Explain judicial levels for tax disputes ✓ | irs-procedures | Path of a dispute; Statutes of limitations | 9 | 2 | 1/0 | **Full** | Strong. Statute-of-limitations drill goes beyond the task |
| I | C.2 Substantiation & disclosure | 4 (2/2/0) | R Disclosure rules for return positions ✓; R Foreign bank account (FBAR) reporting ✗; Ap Identify when disclosure required ✓; Ap Judge substantiation sufficiency ✓ | preparer-penalties, itemized-deductions | Standards for return positions (substantiation only in a charitable takeaway) | 3 | 1 | 0/0 | Thin | FBAR not taught. Substantiation covers only charitable $250/$5,000 rules (id-09) |
| I | C.3 Taxpayer penalties | 2 (1/1/0) | R Taxpayer penalty situations ✓; Ap Identify taxpayer penalties ✓ | preparer-penalties | Taxpayer penalties | 5 | 1 | 1/1 | Partial | Good depth (FTF/FTP/accuracy/fraud). Only 6 MCQs |
| I | C.4 Authoritative hierarchy | 1 (1/0/0) | R Hierarchy of tax authority ✓ | irs-procedures | Sources of tax authority | 1 | 1 | 0/0 | Thin | Taught well. Only 2 items (irs-09, x1-09) |
| I | D.1 Common-law duties & liabilities | 2 (1/1/0) | R Preparer common-law duties/liabilities ✓; Ap Identify common-law violations ✓ | accountant-liability | Common law liability; Third-party negligence | 5 | 1 | 0/0 | Partial | Framed around auditors (Ultramares/§552). Only al-09 is a tax-preparer case. 4 securities-law items in this module (al-02, al-03, al-08, x1-11) are OOS |
| I | D.2 Privileged communications | 2 (1/1/0) | R Privileged-communication rules ✓; Ap Identify privileged tax communications ✗ | accountant-liability | Working papers and privilege | 2 | 0 | 0/0 | Thin | §7525 taught. Only 2 recall items and no scenario item |
| II | A.1 Authority of agents/principals | 2 (1/1/0) | R Types of agent authority ✓; Ap Whether agency exists ✓ | agency | Types of authority; Termination | 5 | 2 | 0/0 | Partial | Solid. Apparent-authority rows also in u2/x2 TBS |
| II | A.2 Duties & liabilities | 2 (1/1/0) | R Agent/principal duties and liabilities ✓; Ap Identify duty or liability ✓ | agency | Liability on contracts; Liability for torts | 5 | 1 | 0/0 | Partial | Solid. Below the 10-MCQ depth bar |
| II | B.1 Contract formation | 3 (1/2/0) | R Formation elements ✓; Ap Valid contract formed? ✓; Ap Identify contract types ✓ | contracts | Formation; Is it enforceable?; Defenses | 5 | 3 | 1/0 | Partial | Unilateral/bilateral and express/implied types not taught. Only written vs. oral (statute of frauds) |
| II | B.2 Performance & discharge | 4 (2/2/0) | R Performance-obligation rules ✓; R Ways contracts are discharged ✗; Ap Whether contract discharged ✗; Ap Whether performance fulfilled ✓ | contracts | Performance and remedies | 2 | 0 | 0/0 | Thin | Discharge by agreement or operation of law (novation, accord, impossibility) is absent |
| II | B.3 Breach & remedies | 3 (1/2/0) | R Remedies for breach ✓; Ap Identify breach situations ✗; Ap Identify available remedy ✓ | contracts | Performance and remedies | 3 | 1 | 0/0 | Thin | Breach identification is tested only at recall level (ct-09) |
| II | C Debtor-creditor relationships | 4 (3/1/0) | R Debtor/creditor/guarantor rights ✓; R Bankruptcy rights and distribution ✓; R Secured vs. unsecured; perfection ✓; Ap Identify rights in scenario ✓ | debtor-creditor | Secured transactions; Bankruptcy; Suretyship | 8 | 2 | 1/1 | **Full** | Strongest business-law topic |
| II | D Federal laws (emp. tax, health plans, bankruptcy, worker class., FCPA) | 6 (5/1/0) | R ACA plans, mandates, premium tax credit ✗; R Employer/employee employment taxes ✓; R Employee vs. contractor factors ✗; R Bankruptcy types and discharge ✓; R FCPA anti-bribery ✗; Ap Identify compliance issues ✓ | federal-regulation, debtor-creditor, agency | Employment laws; Bankruptcy | 3 | 1 | 0/0 | Thin | The module spends its time on OOS securities/FLSA/ERISA/COBRA/FMLA (11 items). ACA, worker classification and FCPA are untaught |
| II | E.1 Entity selection, formation, termination | 2 (2/0/0) | R Formation and termination of entities ✓; R Entities' legal characteristics ✓ | business-structures | Comparing entities; Corporations; Fundamental changes | 2 | 0 | 0/0 | Thin | Taught well. Only 2 mapped items; dissolution/winding-up is thin |
| II | E.2 Owner/management rights & duties | 2 (1/1/0) | R Owner/management rights and duties ✓; Ap Identify them in scenario ✓ | business-structures | Partners' rights; Corporations; Fundamental changes | 7 | 2 | 0/0 | Partial | Solid. Below the depth bar |
| III | A Basis of assets | 5 (0/5/0) | Ap Basis of purchased business asset ✓; Ap Basis of converted personal-use asset ✗; Ap Basis of gifted or inherited property ✓; Ap Wash-sale replacement stock basis ✓; Ap Intangibles basis (organization, start-up, loan costs) ✗ | property-basis, business-rental-income | Core equation; Basis by acquisition; Gift tax adj.; Loss disallowance | 9 | 1 | 0/0 | Partial | Conversion is tested (pb-09) but not in the lesson, only in a flashcard. Organization and loan costs are untaught; start-up costs appear only in a lesson check |
| III | B Cost recovery | 5 (0/3/2) | Ap MACRS with recovery period/convention ✗; Ap Bonus/§179 eligibility ✓; Ap Amortize intangibles ✗; An Review depreciation schedule vs. source ✗; An Resolve depreciation diagnostics ✗ | c-corp-income, business-rental-income | none (one C-corp takeaway line) | 1 | 0 | 0/0 | Thin | **No MACRS content at all.** Amortization appears only in a lesson check; no Analysis coverage |
| IV | A Gross income | 6 (0/4/2) | Ap GI inclusions (wages, interest, GPs, fringes, retirement, punitive) ✓; Ap Capital gains incl. gift, inherited, crypto; LT/ST ✓; Ap GI exclusions ✓; Ap Decedent's year-of-death income ✗; An Review 1040 gross income vs. source ✗; An Resolve GI diagnostics ✗ | gross-income, capital-gains, property-basis, nontaxable-exchanges (§121) | Included or excluded?; Fringe benefits; SS benefits; COD; Netting | 16 | 5 | 1/1 | Partial | Depth is ample. No decedent final-return, virtual-currency or retirement-distribution content; no Analysis |
| IV | B Pass-through items on individual return | 1 (0/1/0) | Ap Report K-1 ordinary and separately stated items ✓ | partnerships, s-corporations | Ordinary vs. separately stated; Pro rata allocation | 1 | 1 | 0/0 | Thin | Covered only by pt-05, x5-15 and K-1 rows inside u7-partnership |
| IV | C Adjustments & deductions (AGI, TI) | 5 (0/3/2) | Ap Adjustments (retirement, HSA, SE) ✓; Ap Itemized (medical, QRI, casualty, taxes) ✓; Ap QBI deduction ✓; An Review 1040 AGI/TI vs. source ✗; An Resolve AGI/TI diagnostics ✗ | adjustments, itemized-deductions, filing-status, business-rental-income | Above/below the line; IRA phase-out; Itemized limits; QBI; OBBBA deductions | 25 | 8 | 2/1 | Partial | Deepest topic, and would be Full except for the 2 Analysis tasks. Heavy drill on indexed limits (see e) |
| IV | D Loss limitations | 5 (0/3/2) | Ap Capital loss netting/carryforward ✓; Ap Pass-through business loss with basis ✓; Ap Hobby, wash-sale, personal-use losses ✓; An Review 1040 losses vs. source ✗; An Resolve loss diagnostics ✗ | capital-gains, business-rental-income, property-basis, partnerships | Netting; Loss limitations in order | 5 | 2 | 0/0 | Partial | The lesson on this group is mostly passive-activity content (TCP). Personal-use asset loss is thin |
| IV | E Filing status | 3 (2/1/0) | R Filing statuses ✓; R Dependent relationships ✓; Ap Identify filing status ✓ | filing-status | Filing status decision; QC vs. QR | 7 | 2 | 0/0 | Partial | Complete. 9 MCQs; status rows also in u4/x4 TBS |
| IV | F Computation of tax & credits | 3 (2/1/0) | R Refundable vs. nonrefundable credits ✓; R Estimated-tax safe harbors ✓; Ap Tax liability from TI incl. NIIT ✗ | individual-credits, amt-other-taxes | Family credits; Education credits; SE tax; Other taxes | 17 | 3 | 1/1 | Partial | No item computes regular tax from TI; NIIT appears only in a lesson check. 5 AMT/kiddie items are OOS |
| V | A Book vs. tax differences | 4 (0/2/2) | Ap Permanent vs. temporary (M-3) ✓; Ap Calculate M-1/M-3 differences ✓; An Review TB for book-tax differences ✗; An Review C-corp TB for M-1/M-3 accuracy ✗ | c-corp-income | From book income to taxable income | 1 | 1 | 0/0 | Thin | M-3 never mentioned. The book-tax work is embedded in u6/x5 Form 1120 TBS, which use a pre-sorted list, not a trial balance |
| V | B.1 C-corp taxable income, tax, credits | 3 (0/3/0) | Ap C-corp taxable income ✓; Ap C-corp NOL/capital loss and limits ✓; Ap C-corp allowable credits ✗ | c-corp-income, capital-gains | Special corporate deductions | 8 | 4 | 1/1 | Partial | Would be Full except for credits (general business, R&D, etc.), which are untaught |
| V | B.2 State and local tax | 3 (2/1/0) | R Nexus concept ✗; R Apportionment/allocation concept ✗; Ap Apportioned state taxable income ✗ | — | — | 0 | 0 | 0/0 | **Missing** | No nexus, UDITPA or P.L. 86-272 content |
| V | C.1 S-corp eligibility & election | 3 (2/1/0) | R Eligible S-corp shareholders ✓; R S-corp eligibility requirements ✓; Ap S election termination ✓ | s-corporations | Eligibility checklist | 2 | 1 | 0/0 | Thin | Taught well. Only 3 MCQs (plus 3 TBS rows in u7) |
| V | C.2 S-corp OBI & separately stated items | 4 (0/2/2) | Ap S-corp OBI and separately stated ✗; Ap Current-year AAA impact ✓; An Review 1120-S classification ✗; An Resolve 1120-S diagnostics ✗ | s-corporations | Pro rata allocation; Distributions | 3 | 1 | 1/0 | Thin | No S-corp OBI computation. AAA appears only in a distribution-ordering chart and one TBS row |
| V | C.3 S-corp shareholder basis | 2 (0/2/0) | Ap Stock basis (operations, contributions, distributions) ✓; Ap Debt basis after loan repayment ✗ | s-corporations | Pro rata allocation and basis | 3 | 1 | 0/1 | Partial | Debt-basis restoration/repayment gain not taught |
| V | D.1 Partnership OBI & separately stated items | 3 (0/1/2) | Ap Partnership OBI and separately stated incl. GPs ✓; An Review Form 1065 classification ✗; An Resolve 1065 diagnostics ✗ | partnerships | Ordinary income vs. separately stated | 3 | 1 | 1/0 | Thin | Application is well covered (u7-partnership); Analysis not |
| V | D.2 Partner basis | 1 (0/1/0) | Ap Partner basis (ops, cash, distributions, liabilities) ✓ | partnerships | Outside basis; Distributions | 2 | 1 | 0/0 | Thin | Covered, with basis rows in u7. Only 3 mapped MCQs; 4 items stray into TCP (property distributions, §751) |
| V | E Limited liability companies | 1 (1/0/0) | R LLC tax classification options ✓ | business-structures | Comparing entities (tax row) | 1 | 0 | 0/0 | Thin | Only the default classification is taught; the check-the-box election to be taxed as a corporation is not |
| V | F Tax-exempt organizations | 1 (1/0/0) | R Types of tax-exempt organizations ✗ | trusts-exempt | Tax-exempt orgs and UBTI | 0 | 0 | 0/0 | Thin | Teaches only 501(c)(3) plus UBTI (TCP). All 4 exempt-org items are UBTI/status (OOS) |

**Rating counts (36 topics): Full 2 · Partial 15 · Thin 17 · Missing 2.**

## (b) Area totals

In-scope mapped items only. OOS items are listed in (d).

| Area (Blueprint weight) | Practice MCQ | Exam MCQ | TBS p/e | Tasks R / Ap / An (total) | Covered at skill: R / Ap / An (total) | % tasks covered |
|---|---|---|---|---|---|---|
| I Ethics, responsibilities, procedures (10–20%) | 35 | 9 | 2/1 | 12 / 7 / 0 (19) | 9 / 6 / 0 (15) | 79% |
| II Business law (15–25%) | 40 | 12 | 2/1 | 17 / 11 / 0 (28) | 13 / 9 / 0 (22) | 79% |
| III Property transactions (5–15%) | 10 | 1 | 0/0 | 0 / 8 / 2 (10) | 0 / 4 / 0 (4) | 40% |
| IV Individuals (22–32%) | 71 | 21 | 4/3 | 4 / 13 / 6 (23) | 4 / 11 / 0 (15) | 65% |
| V Entities (23–33%) | 23 | 10 | 3/2 | 6 / 13 / 6 (25) | 3 / 9 / 0 (12) | 48% |
| **In-scope total** | **179** | **53** | **11/7** | **39 / 52 / 14 (105)** | **29 / 39 / 0 (68)** | **65%** |
| Out of scope | 72 | 19 | 3/1 | — | — | — |
| **All items** | **251** | **72** | **14/8** | | | |

Weighting check: of the 232 in-scope MCQs, Area V gets 14% against a 23–33% Blueprint weight, and Area IV gets 40% against 22–32%. Most "entity" content in the repo (E&P, §351, liquidations, gifts, trusts, UBTI) belongs to TCP. Area III gets 5%, with no TBS.

## (c) Uncovered or under-skilled tasks (37 of 105)

**Analysis tasks, 14 of 14 uncovered.** No item asks the candidate to review a prepared return or schedule against source documents, or to resolve automated diagnostic or validation flags. The Blueprint introduction frames these as central to REG.
1. III.B An: Review depreciation/amortization schedule vs. source data
2. III.B An: Resolve depreciation diagnostic-check discrepancies
3. IV.A An: Review Form 1040 gross income vs. source data
4. IV.A An: Resolve gross-income diagnostic discrepancies
5. IV.C An: Review Form 1040 AGI/TI vs. source data
6. IV.C An: Resolve AGI/TI diagnostic discrepancies
7. IV.D An: Review Form 1040 losses vs. source data
8. IV.D An: Resolve loss-limitation diagnostic discrepancies
9. V.A An: Review adjusted trial balance to find book-tax differences. The u6/x5 Form 1120 TBS come closest, but they give a pre-sorted list of differences.
10. V.A An: Review C-corp trial balance for M-1/M-3 completeness
11. V.C.2 An: Review Form 1120-S item classification
12. V.C.2 An: Resolve Form 1120-S diagnostic discrepancies
13. V.D.1 An: Review Form 1065 item classification. The u7-partnership TBS asks for classification by computation only.
14. V.D.1 An: Resolve Form 1065 diagnostic discrepancies

**Application tasks: 13 uncovered or under-skilled**
15. I.D.2 Ap: Identify privileged tax communications. Only recall items exist (al-04, al-05).
16. II.B.2 Ap: Identify whether a contract was discharged. Not taught, no items.
17. II.B.3 Ap: Identify breach situations. Only a recall item (ct-09); the cure check (ct-chk2) is a lesson check.
18. III.A Ap: Basis of converted personal-use asset. Assessed by pb-09 and flashcard pb-f8, but not in the lesson.
19. III.A Ap: Basis of intangibles. Organization and loan costs untaught; start-up costs only in lesson check bri-chk1.
20. III.B Ap: MACRS depreciation (recovery period, convention). Neither taught nor assessed; u6 gives MACRS as a number.
21. III.B Ap: Amortization of intangibles. §195 180-month rule appears only in bri-chk1; no §197/§248.
22. IV.A Ap: Decedent's income in year of death. Not taught, no items.
23. IV.F Ap: Tax liability from TI including NIIT. NIIT only in lesson check ot-chk2; no rate-schedule computation.
24. V.B.1 Ap: C-corporation credits. Not taught, no items.
25. V.B.2 Ap: Apportioned state taxable income. Not taught, no items.
26. V.C.2 Ap: S-corp OBI and separately stated items. Only the pass-through concept is taught; no S-corp computation.
27. V.C.3 Ap: Debt basis after loan repayment. Only debt-basis creation is taught (sc-02, the guarantee item).

**Remembering tasks: 10 uncovered**
28. I.A.2 R: Who is a tax return preparer (definition not taught)
29. I.B R: State boards of accountancy (topic Missing)
30. I.C.2 R: FBAR / foreign-account reporting. c230-06 touches a foreign-account return question only via SSTS.
31. II.B.2 R: Ways a contract is discharged
32. II.D R: ACA qualified health plans, employer mandate, premium tax credit. Only a "PTC is refundable" line.
33. II.D R: Employee vs. independent-contractor factors. Only one insight line in the agency lesson.
34. II.D R: FCPA anti-bribery
35. V.B.2 R: Nexus concept
36. V.B.2 R: Apportionment and allocation concept
37. V.F R: Types of tax-exempt organizations. Only 501(c)(3) is described.

**Marked ✓ but thin (watch list):** I.C.2 substantiation (charitable only, 1 item) · II.B.1 contract types (written/oral only) · II.D compliance scenario (only FUTA fr-05 and the TBS preference rows) · III.B bonus/§179 (one takeaway line, 1 item: cc-08) · IV.A capital gains (no virtual currency) · IV.A inclusions (no retirement-plan distributions) · V.C.2 AAA (one TBS row) · V.E LLC (default only) · I.D.1 (auditor-oriented framing).

## (d) Classification counts and out-of-scope items

| Pool | Total | In scope | Out of scope | OOS share |
|---|---|---|---|---|
| Practice MCQ | 251 | 179 | 72 | 28.7% |
| Exam-pool MCQ | 72 | 53 | 19 | 26.4% |
| TBS (practice/exam) | 14/8 | 11/7 | 3/1 | 18% |
| Mock exam `reg-mock-1` | 72 MCQ + 8 TBS | 53 + 7 | 19 + 1 | 25% |

Out-of-scope practice/exam MCQs by reason (ids without the `reg-` prefix):

| Reason | # | Items |
|---|---|---|
| TCP: E&P and corporate distributions | 12 | ep-01…07, ep-09, ep-10, x5-06, x5-07, x5-08 |
| TCP: §351, redemptions, liquidations | 13 | fl-01…fl-10, x5-09, x5-10, x5-11 |
| TCP: like-kind, §1033, installment, §1031(f) | 10 | nt-01…05, nt-07, nt-08, nt-10, x3-06, x3-07 |
| TCP: §1231/§1245/§1250/§291/§1244 | 8 | cg-04…08, cg-10, x3-04, x3-05 |
| TCP: AMT and ISOs | 5 | ot-01, ot-02, ot-03, ot-09, x4-20 |
| TCP: gift tax | 5 | te-01, te-02, te-05, te-10, x5-19 |
| TCP: passive activity / real-estate professional | 4 | bri-05, bri-07, bri-09, x4-09 |
| TCP: partnership property distributions, sale of interest, §751 | 4 | pt-04, pt-06, pt-07, x5-14 |
| TCP: UBTI / loss of exempt status | 4 | te-06, te-07, te-09, x5-20 |
| TCP: trusts | 3 | te-03, te-04, te-08 |
| TCP: S-corp BIG tax, sale-year allocation | 2 | sc-03, sc-06 |
| TCP: kiddie tax; related-party resale | 2 | ot-04; pb-04 |
| Not in REG References: 1933/1934 Securities Acts (incl. §11, 10b-5) | 10 | al-02, al-03, al-08, fr-01, fr-02, fr-03, fr-04, fr-09, x1-11, x2-11 |
| Not in REG References: FLSA, ERISA, workers' comp, COBRA, FMLA | 5 | fr-06, fr-07, fr-08, fr-10, x2-12 |
| Not in REG References: AICPA SSTS | 4 | c230-06, c230-08, c230-10, x1-03 |

- **OOS TBS:** u3-exchanges (like-kind/§1033/installment), u3-property-sales (§1231/recapture), u6-distributions-formation (§351/E&P/redemption), x3-property (§1231/like-kind).
- **Mixed TBS kept in scope:** u1-procedures (§11 rows), u4-schedule-c-rental (passive-loss rows), u5-credits-amt (AMT rows), u7-s-corp-gifts (gift rows), x2-business-law (Rule 504 row), x5-flowthrough (Leo §751 rows), x5-research (1041/990 dates).
- **OOS modules:** 3 of 25 are almost wholly outside REG (`reg-corp-distributions`, `reg-corp-formation-liquidation`, `reg-nontaxable-exchanges`, apart from the §121 content). About half of `reg-federal-regulation`, `reg-trusts-exempt`, `reg-capital-gains` and `reg-amt-other-taxes` is also outside REG.
- **Judgment calls:**
  - Items on the §121 home-sale exclusion (nt-06, nt-09, nt-chk2, x5-research) are counted in IV.A as an exclusion.
  - SE tax is counted in IV.F.
  - The deductible half of SE tax and Schedule C expenses are counted in IV.C.
  - The LLC default-classification item bs-10 is counted in V.E.
  - Charitable-appraisal substantiation (id-09) is counted in I.C.2.
  - Treating passive-activity/AMT/kiddie tax as out of scope follows the TCP Blueprint's explicit placement.

## (e) Indexed-amount analysis

The REG section assumptions say candidates are not tested on inflation-indexed rates, amounts or limits. Items below require **recall** of such an amount that the stem or exhibit does not supply. "Borderline" covers the OBBBA child tax credit ($2,200, indexed only from 2026) and the SALT cap ($40,000 on a fixed 1%/yr schedule, not CPI-indexed).

**MCQs: 20 clear (4 lesson, 12 practice, 4 exam) + 3 borderline**

| Item | Pool | Amount the candidate must recall |
|---|---|---|
| adj-chk1 | lesson | Educator-expense cap $300 |
| adj-chk2 | lesson | Student-loan interest phase-out $85,000–$100,000 |
| fs-chk2 | lesson | Standard deduction $15,750 + $2,000 age-65 add-on |
| te-pre1 | lesson | Gift annual exclusion $19,000 |
| adj-01 | practice | HSA family limit $8,550 |
| adj-02 | practice | IRA limit $7,000 + $1,000 catch-up |
| adj-05 | practice | IRA active-participant MFJ phase-out $126,000–$146,000 |
| adj-09 | practice | IRA active-participant single phase-out $79,000–$89,000 |
| ot-03 | practice | AMT exemption $88,100; phase-out start $626,350 |
| ot-04 | practice | Kiddie-tax threshold $2,700 |
| ot-07 | practice | Social Security wage base $176,100 |
| fs-05 | practice | Qualifying-relative gross-income limit $5,200 |
| fs-06 | practice | Dependent standard deduction $1,350 / earned + $450 |
| fs-08 | practice | MFJ standard deduction $31,500 + 2 × $1,600 |
| te-01 | practice | Gift annual exclusion $19,000 |
| te-05 | practice | Gift annual exclusion $19,000 (× 2, split) |
| x4-02 | exam | Qualifying-relative gross-income limit $5,200 |
| x4-03 | exam | MFJ standard deduction $31,500 (pure recall) |
| x4-12 | exam | IRA single active-participant phase-out $79,000–$89,000 |
| x5-19 | exam | Gift annual exclusion $19,000 |
| *cr-chk1, x4-16* | lesson, exam | *Borderline: CTC $2,200 per child* |
| *id-chk1* | lesson | *Borderline: SALT cap $40,000 (answer changes under a $10,000 cap)* |

Implicit, not counted: id-chk2 assumes TI of $70,000 is below the QBI threshold without saying so.

Of the 16 clear practice/exam MCQs, 5 (ot-03, ot-04, te-01, te-05, x5-19) are also out of scope for REG. They drill untested amounts on untested topics.

**TBS: 5 clear (4 practice, 1 exam) + 1 borderline**
- u4-gross-income: HOH standard deduction $23,625 (dropdown row).
- u5-credits-amt: AMT exemption $88,100 drives the TMT and AMT rows. The stem says the exemption isn't phased out but gives no amount.
- u5-taxable-income: The itemize-or-standard decision needs the MFJ $31,500. SALT $40,000 and CTC $2,200 are borderline.
- u7-s-corp-gifts: Gift annual exclusion $19,000.
- x4-individual: Educator cap $300 drives AGI and later rows. The stem does supply the $31,500 standard deduction.
- Borderline: x4-family (CTC $2,200 rows).

Four TBS carry the repo's own `needsReview` flag for OBBBA amounts.

**Flashcards: 15 of 152 (10%) drill indexed amounts, plus 1 borderline.**
- adj-f1 (IRA limit), adj-f2 (IRA phase-outs), adj-f3 (HSA), adj-f4 (student-loan phase-out), adj-f5 (educator $300)
- ot-f2 (SS wage base), ot-f5 (AMT exemption), ot-f6 (kiddie $2,700)
- fs-f4 ($5,200), fs-f5 (standard deduction), fs-f6 (dependent standard deduction)
- id-f6 (QBI thresholds $197,300/$394,600), cr-f1 (refundable CTC $1,700)
- te-f1 (gift exclusion), te-f2 (lifetime exemption $13.99M)
- Borderline: id-f2 (SALT cap).

**Review sheet `review/reg-numbers.md`: 14 of 37 table rows drill indexed amounts, plus 1 borderline.**
- Standard deduction; additional 65+/blind amounts; qualifying-relative $5,200; dependent standard deduction
- CTC refundable $1,700; QBI threshold; IRA limits and phase-outs; HSA; student-loan phase-out
- SS wage base; AMT exemption and phase-out; kiddie threshold; gift exclusion and lifetime exemption; §179 $2.5M/$4M
- Borderline: SALT cap.

The adjustments, filing-status, AMT and gift lessons also teach these figures in their tables.

**Overtime/tips assumption.** No item treats tips or overtime as part of wages without saying so. The one tips item (id-10) states the tips explicitly, which is consistent with the Blueprint assumption. The only FLSA overtime item (fr-10) is out of scope anyway.

**Confidence.** Counts are high confidence. Topic classification is medium-high: it is a single-rater judgment, and the boundary calls (PAL/AMT/kiddie/§1231 as TCP; SSTS and securities as outside the References; primary topic of mixed TBS) are documented above. Task-level ✓/✗ is medium. Where a call was close (thin teaching, one item), the task was given ✓ and listed on the watch list.
