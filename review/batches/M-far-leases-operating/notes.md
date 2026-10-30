# Notes — M-far-leases-operating (Leases II: operating leases & special issues)

Reviewer pass dated 2026-10-30. 42 manifest items reviewed: 1 lesson, 33 MCQs, 6 flashcards, 2 TBS. There are 24 findings: 0 S1, 6 S2, 16 S3, 2 S4.

## (a) Blind vs. key

I answered every MCQ and every TBS cell before opening `items.json` and the TBS files (see `blind-answers.csv`). **Every key matched my blind answer:** all 33 MCQs, all 10 numeric TBS rows, 3 dropdowns and 1 research choice. There were no disagreements to resolve. The items where my blind answer needed an assumption the stem doesn't state are below.

| id | my answer | key | resolution |
|---|---|---|---|
| far-lso-16 | c ($86,000) | c | Agree, but only by assuming the payments are level (the straight-line cost is then $20,000). The stem gives neither the term nor the payment pattern, and $100,000 doesn't match level $20,000 payments at 6% over a whole number of years. Finding 002 (S2). |
| far-lso-17 | d ($50,000) | d | Agree, but only by assuming the transfer is a sale and the leaseback is operating. If the leaseback were a finance lease, c ($0) would be right. Finding 003 (S2). |
| far-lso-23 | c ($124,342) | c | Agree. Payment timing (arrears) is only stated in far-lso-21 ("Using the operating lease above"). Finding 013. |
| far-tbs-u11 / x3 | all rows | same | Recomputed: u11 cost 46,000; interest 9,503; liability 127,889; amortization 36,497; ROU 121,889. x3: 210,618; 215,618; 51,000; 173,255; 177,255. All within tolerance. |

## (b) Lesson design

- **Big idea → pre-question.** The big idea (on the balance sheet, but with a rent-like straight-line cost; the ROU asset is the plug) is clear and correct. Pre-question `far-lso-pre1` primes exactly that concept. It is labelled `application` but is a recall guess (finding 007).
- **Body.** The operating-vs-finance table, the escalating-payments worked example and the sale-leaseback faded example all recompute correctly:
  - 223,255; 173,255 × 6% = 10,395; 183,650 / 183,650 / 178,604; finance expense 55,046.
  - 271,439; interest 13,572; liability 195,011; ROU 185,011; a 10,000 accrued-rent gap.
  - Gain 200,000; ROU and liability 300,000.
- **Gaps in the body:**
  - There is no `je` block, although objective 1 is "Prepare lessee journal entries" (finding 020).
  - The "operating because the life is 10 years" shortcut skips the other OWNES tests (finding 019).
  - "Special issues" covers only uneven payments and sale-leaseback. Modifications are never taught, and impairment appears only as a one-line takeaway (finding 021).
  - The sale-leaseback section is probably BAR scope (finding 005, needs verification).
- **Takeaways.** Accurate. The impairment takeaway could add "still presented as a single lease cost" (see finding 012).
- **Inline checks.** chk1 (the plug) fits the first section. chk2 tests sale-leaseback (scope question, finding 005).
- **Minutes.** The lesson is about 980 words, plus 2 diagrams, 1 worked example, 1 faded example (2 inputs), 1 pre-question and 2 checks. That's roughly 7–8 minutes of reading and 8–10 minutes of exercises, so **18 minutes is realistic.**
- **Lesson–item alignment.** These items test material the lesson never teaches:
  - Lessor accounting: far-lso-13, -18, -20, -25, -26. This is also out of FAR scope (finding 004).
  - Lease modifications: far-lso-19. Taught in neither lease lesson.
  - Post-impairment cost pattern: far-lso-08. Takeaway only.
  - These are taught only in the prerequisite Leases I, which is acceptable because it comes earlier: short-term exemption (far-lso-24), index-based and performance-based variable payments (far-lso-15, -28), incentives and IDC effects (far-lso-09, -27).
  - Disclosures (far-lso-06) appear only in the presentation table, which is adequate.
- **Sequencing.** The module correctly follows `far-leases-finance` (unit far-u11) and reuses its example. Nothing relies on a later module. The time-value factors come from earlier material.

## (c) Practice design

- **Counts.** 28 practice MCQs, 2 exam MCQs, 3 lesson MCQs, 6 flashcards, 1 practice TBS and 1 exam TBS. The count is adequate. The mix is not:
  - 5 lessor items are outside FAR scope.
  - 3–4 sale-leaseback items are probably BAR.
  - 5 items repeat "straight-line cost of escalating payments" (finding 015).
- **Difficulty spread** (practice + exam, from cues.md): 1 = 3, 2 = 9, 3 = 18. Difficulty 3 is applied to one-step and recall items (finding 008).
- **Progression is not easy → hard.** Items 01–17 alternate between 1, 2 and 3, and 18–28 are a solid block of "3" items that are mostly single-rule recall.
- **Skill mix.** As labelled: analysis 17/30 (57%), application 11, remembering 2. Re-judged against the Blueprint definitions: about 12 remembering, 14 application and 4 analysis (lso-02, -05, -07, -11).
  - FAR's allocation is R&U 5–15%, Application 45–55%, Analysis 35–45%.
  - This module is therefore heavily over-weighted to recall and short of real analysis.
  - The analysis labels added in commit 130ad50 overstate the section-level analysis share (findings 006 and 007).
  - No MCQ or TBS in the module asks for an operating-lease journal entry.
- **Routing.** All items carry `moduleId: far-leases-operating`, so misses route back to this lesson. For the lessor items that is the wrong lesson (it doesn't teach lessor accounting).

## (d) Items with no issues found

far-lso-02, far-lso-06, far-lso-09, far-lso-11, far-lso-fc1, far-lso-fc2, far-lso-fc6.

## (e) Needs expert verification

- **Finding 005 (confidence medium):** is sale-leaseback (seller-lessee) tested in FAR 2026 or only in BAR?
  - The reference sheet (Becker/JofA list, `verified`) says BAR.
  - The repo's docs/BLUEPRINT_NOTES.md lists only lessor accounting as moved.
  - One web search didn't surface the AICPA Blueprint text. Check the FAR Area III.F "Lessee accounting" and BAR Area II lease representative tasks in the 2026 Blueprint PDF.
- **Lease modifications (far-lso-19):** confirm whether lessee modification/remeasurement is a FAR III.F task, or BAR. If it is BAR, mark it optional as well.

## (f) Could not check / out of batch

- I couldn't read the official AICPA 2026 Blueprint PDF (egress blocked; search returned only prep sites). I used one of the 3 allowed searches.
- Outside this batch, for the cross-module consistency pass: `content/far/review/far-formulas.md` gives "Operating lease cost = Total payments ÷ lease term". That omits the IDC and incentive adjustments taught in this lesson, its takeaways and far-lso-09 / fc1.
- Cross-module duplicate: far-lsf-08 ≈ far-lso-24 (finding 016).
- I didn't run the app (usability is reviewed separately).
