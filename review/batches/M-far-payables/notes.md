# M-far-payables — reviewer notes

Module `far-payables` (FAR-II, unit far-u8). There are 41 items: lesson, 3 lesson MCQs, 28 practice MCQs, 2 exam MCQs, 5 flashcards and 2 TBS. I did the blind pass before opening any key (`blind-answers.csv`). There are 18 findings: 0 S1, 2 S2, 10 S3 and 6 S4.

## (a) Blind vs. key

All 33 MCQ keys matched my blind answers. So did every computed TBS cell: accruals-review wage 42,000, interest 9,000, vacation 18,300, warranty 29,500, utilities 6,200, total 105,000, warranty expense 48,000, interest expense 36,000; AP recon 684,250 / −3,600 / +12,400 / 693,050 / 670,800 / +9,850 / +12,400 / 693,050.

| id | my answer | key | resolution |
|---|---|---|---|
| far-tbs-u8-ap-recon d4 | Subledger only (I noted it was ambiguous against the lesson's "Neither total") | Subledger only | The key is right: the vendor accounts in the subledger must be corrected. But the lesson's table wording points to "Neither record" (finding 011). |
| far-tbs-u8-ap-recon d3 | Both records (I noted that a GL-only accrual is an alternative) | Both records | The key fits the exhibit and the lesson. The open-invoice premise is unstated (S4, low confidence, finding 014). |

There were no other disagreements. I reproduced every numeric distractor in python. Distractors whose rationale names the wrong error, or no error, are in finding 003.

## (b) Lesson design

- **Big idea → pre-questions → body → takeaways → checks.** The big idea is clear: accrue what has been incurred but not yet paid, shown with a $40,000 year-end wage example. There is only one pre-question (pre1, sales tax), and it primes a minor topic rather than the accrual idea or the reconciliation/completeness idea (finding 016). The body flows well. It has a gross/net table, an accruals check (chk1), a sales-tax worked example, a payroll JE, compensated absences, a bonus faded example, a check (chk2), an AP reconciliation table with accrual-review heuristics, and ASC 420. The takeaways match the body.
- **Recomputed.** The worked figures are right: 212,000/1.06 = 200,000 (tax 12,000); the JE balances, 100,000 = 15,000 + 7,650 + 77,350; B = 55,000/1.1 = 50,000. The gross/net entries are correct (perpetual inventory). The compensated-absence criteria and the sick-pay exception match ASC 710-10-25-1 and 25-7. The ASC 420 rules are correct: communication date vs. ratable recognition, and contract termination when terminated. The cease-use row and some citations are missing (finding 017).
- **Minutes.** The file is about 1,180 words (about 790 in the body), plus 2 checks, 1 worked block, 1 faded block, 1 JE and 3 tables. At 14 minutes that is realistic.
- **Items that test material the lesson never teaches:**
  - far-pay-18: supplier finance disclosures, taught nowhere on the platform (finding 002).
  - far-pay-19 and far-pay-25: gift-card breakage, taught nowhere on the platform (finding 002).
  - far-pay-14 and far-pay-16: contract liabilities and unearned revenue. These are taught later, in far-revenue-measurement.
  - far-pay-20 and far-pay-09(c): refundable deposits.
  - far-pay-09 and far-pay-28: dividends payable and stock dividend distributable. These are taught later in far-equity; "stock dividend distributable" appears in no lesson.
  - far-pay-05: bonus after both bonus and tax. The lesson and fc5 show only the before-tax form (finding 009).
- **Sequencing.** far-payables is the first module of unit 8. Items 14, 16, 19 and 25 depend on ASC 606 contract-liability and breakage concepts from unit 9, which comes later. Items 09 and 28 depend on dividend accounting from far-equity, later in the same unit. far-balance-sheet-equity (unit 1) does mention dividends payable and unearned revenue as current liabilities, which partly mitigates this. The lesson itself relies on nothing taught later.

## (c) Practice design

- **MCQ count.** There are 28 practice MCQs, 2 exam MCQs and 3 lesson MCQs. That is adequate.
- **Difficulty as labeled.** 1 = 4, 2 = 15, 3 = 11. The order does not progress: items 01–18 mix 1s and 2s, and items 19–28 are all labeled 3. Most of the 3s are one-step calculations (finding 006). Corrected, the spread would be about eleven 1s, sixteen 2s and three 3s (05, 11 and 19 or 25), which is too easy for the exam.
- **Skill mix as labeled.** Remembering 3, application 16, analysis 11 (37% analysis). Corrected (findings 001 and 006), it would be about remembering 6, application 22 and analysis 2 (05 and 11). The Blueprint calls for 35–45% analysis. Here the module's analysis coverage comes only from the two review TBS, which are genuine analysis tasks: reconcile, and detect and correct.
- **Redundancy.**
  - Sales-tax back-out is tested 4 times (finding 008).
  - Employer payroll tax expense is tested 3 times, and 17 and 22 are verbatim duplicates. chk1 and 21 are also verbatim duplicates (finding 007).
  - Gross/net discounts are tested 3 times (01, 08, 27), and far-inv-27, outside this batch, duplicates far-pay-01.
  - One-time termination benefits are also tested in far-iso-29, outside this batch, consistently with far-pay-12.
- **Item-level explanations.** The far-pay-19–28 block has a pattern of thin explanations: "Not the computation.", and no worked computation at item level (findings 003 and 012).

## (d) Items with no issues

far-pay-01, far-pay-04, far-pay-06, far-pay-07, far-pay-08, far-pay-10, far-pay-11, far-pay-12, far-pay-13, far-pay-15, far-pay-fc1, far-pay-fc2, far-pay-fc3, far-pay-fc4, far-pay-fc5.

These items have minor points I chose not to write up as findings:
- far-pay-12 assumes all 50 employees stay to March 31.
- far-pay-12(c), 100,000, is the 3/9 arithmetic exactly as its rationale says, but nothing in the stem suggests 9 months.
- The cues flagged on 04, 06, 09, 10 and 11 (key longest or shortest) are not real cues: the options are similar in length and form.

## (e) Needs expert verification

- The 2026 Social Security wage base of $184,500 is from memory. It is cited only as context in finding 013 and isn't needed by any key.
- Finding 014 (low confidence): whether received-not-invoiced goods belong in the vendor open-invoice subledger or only in a GL accrual. It depends on practice; the TBS keys "Both records".

## (f) Not checked

- I used no web searches; the reference sheets and the ASC rules I know were enough.
- I did not run the app, so routing from a missed item back to the lesson is untested.
- I did not check items in other modules beyond the duplicate and consistency greps: breakage, supplier finance, sales tax, payroll, bonus and termination benefits.
