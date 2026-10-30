# M-far-leases-finance — reviewer notes

Scope: 45 items (lesson, 3 lesson MCQs, 28 practice MCQs, 3 exam MCQs, 7 flashcards, 3 TBS). Findings: 16 (S1 0, S2 3, S3 10, S4 3). No web searches used. ASC 842 lessee rules are settled, and no ASU affecting them is testable in 2026 (ASU 2025-12's lessor disclosure items are not testable until 2027).

## (a) Blind vs key

All 31 MCQ keys matched my blind answers. Every TBS cell matched my blind computation.

| id | my answer | key | resolution |
|---|---|---|---|
| far-lsf-12 | b (flagged: d defensible) | b | Key is acceptable only on the "gross PV before the day-1 payment" reading. ASC 842-20-30-1 measures the liability at PV of payments *not yet paid* = 133,651 (d). The item explanation itself says "remaining payments". S2 finding 002. |
| far-tbs-u11-finance-lease am | 108,730 (108,729 also possible) | 108,730, tol 2 | Tolerance 2 covers both rounding paths. No issue. |
| all other MCQs / TBS cells | = key | — | Agree. |

Blind answers are in `blind-answers.csv`, saved before items.json was opened.

## (b) Lesson design

**Big idea.** It is clear and well motivated, with a good trucking example. One overstatement: "classification only changes the income statement" (finding 013).

**Pre-question.** There is one pre-question (pre1, which leases are on the balance sheet). It primes the big idea well. Nothing primes the classification criteria or the measurement mechanics; a second pre-question (e.g., "what discount rate…") would help.

**Body.** The body runs: is there a lease → OWNES flowchart → measurement (lease payments, discount rate) → worked annuity-due example + JE → amortization period → faded arrears example → presentation. I recomputed every number:
- Worked example: 50,000 × 4.46511 = 223,255; interest 173,255 × 6% = 10,395; amortization 44,651; total 55,046.
- Faded example: 30,000 × 3.31213 = 99,364; interest 7,949; amortization 99,364/6 = 16,561; ending liability 77,313.

All are correct, and the citations (842-10-15, 842-10-25-2, 842-20-30, 842-20-25-5/35-8) are right.

**Gaps** (finding 012):
- The lease term (renewal and termination options) is never defined.
- The ROU asset build-up (IDC, incentives, prepaid payments) appears only in the takeaways.
- The risk-free election is not described as "by class of asset / non-PBE".

**Labeling** (finding 016). The worked step labels the gross PV as "lease liability at commencement", which feeds the far-lsf-12 ambiguity.

**Takeaways and inline checks.** The takeaways are accurate. Inline checks chk1 (classification) and chk2 (cash flows) sit in the right places. There is no inline check on measurement, but the faded block covers it.

**Minutes.** 20 is realistic: about 1,160 words (about 6 minutes of reading), plus a mermaid diagram, a 5-step worked example, a 4-input faded example and 3 MCQs.

**Lesson–item alignment.** Items that test something the lesson never teaches:
- far-lsf-14, -27, -28 and far-tbs-r3-sales-type-lease: lessor / sales-type accounting, not taught at all and BAR scope (finding 001).
- far-x3-12 (d) and far-tbs-u11 Lease B: the lease-term rule.
- far-lsf-15: "by class of asset".
- far-lsf-03, -13 and far-tbs-x3-lease r/je: the ROU build-up, taught only in the takeaways.
- far-lsf-01 (c) and far-x3-12 (a): use the ASC 840 term "executory costs" (finding 014).

**Sequencing.** The lesson needs PV of an ordinary annuity and an annuity due, which far-bonds (unit 8) teaches earlier. Nothing in it depends on a later module. Leases II compares finance and operating leases, which is the right order.

## (c) Practice design

- **Counts.** 28 practice MCQs, 3 exam MCQs, 2 practice TBS and 1 exam TBS. That is adequate.
- **Difficulty spread (keyed).** 1: 4, 2: 15, 3: 12. Items progress by label (01–15 mostly 2, 16–28 mostly 3), but much of the 16–28 block is single-step arithmetic or duplicates of 01–15 (findings 004 and 008), so actual difficulty does not rise.
- **Skill mix (keyed, practice + exam).** Application 17, analysis 11, remembering 3. After correction (finding 004), roughly application 23–24, remembering 6 and analysis 1–2 (only far-lsf-10, perhaps lsf-25). FAR targets analysis at 35–45%. This module has almost no genuine analysis items. Suggested additions: compare finance vs operating effects on the statements and ratios, classify with interacting criteria (e.g., an RVG pushing the PV test over 90%), or identify an error in a lessee's entries.
- **Redundancy and chains.**
  - Duplicate pairs: 09/26, 05/16, 03/13.
  - A four-item chain on one lease (18/21/22/23) with answer leakage (finding 009).
  - Eight items compute a lease liability or interest.
- **Lessor items.** These should be optional or moved to BAR (finding 001). If they are removed, the module keeps 25 practice MCQs.

## (d) Items with no issues found

far-lsf-pre1, far-lsf-chk1, far-lsf-02, far-lsf-03, far-lsf-04, far-lsf-06, far-lsf-07, far-lsf-08, far-lsf-09, far-lsf-10, far-lsf-19, far-lsf-20, far-x3-27, far-lsf-fc1, far-lsf-fc2, far-lsf-fc3, far-lsf-fc4, far-lsf-fc5, far-lsf-fc6, far-lsf-fc7.

far-lsf-03, -05 and -09 are the originals of the duplicate pairs; finding 008 is filed against the duplicates. far-lsf-05 has a distractor-rationale finding (005).

The TBS answer keys are all correct: far-tbs-u11-finance-lease has only an S4 label note, and far-tbs-r3 is correct but out of scope.

## (e) Needs expert verification

- **Lessor scope.** Whether any lessor content stays testable on 2026 FAR. The sources here (Becker/JofA lists, the repo's own BLUEPRINT_NOTES) all say lessor accounting is BAR and FAR III.F is "Lessee accounting". I did not see the official Blueprint PDF.
- **Skill levels.** The exact Blueprint skill level for lease-classification tasks (finding 004 is medium confidence; I judged the classification items as application).

## (f) Not checked, or outside this batch

- **Mock-form design.** far-mock-1 and far-mock-2 share about 29 item ids, including far-x3-10, far-x3-12 and far-tbs-x3-lease. That is a systemic mock-assembly issue across batches; I noted it in findings 011 and 015 only for my items. The mock reviewer should take it up.
- **App behavior.** I did not run the app, so I have not checked lesson rendering, faded-block tolerance UI or TBS scoring display. I checked the scoring code: journal tolerance defaults to 1 and numeric to 1, which is adequate for these keys.
- **far-leases-operating.** It also contains lessor and sale-leaseback (BAR) items. That is another batch.
