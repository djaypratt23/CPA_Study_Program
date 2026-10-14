# M-far-ratios — reviewer notes

Module `far-ratios` (FAR-I, unit far-u2). 46 items: 1 lesson, 3 lesson MCQs, 28 practice MCQs, 4 exam MCQs, 8 flashcards, 2 TBS.
Findings: 13 (S1 0, S2 0, S3 12, S4 1). One finding is low confidence and needs verification (segment scope).

## (a) Blind vs. key

All 36 MCQ blind answers matched the keys. All TBS cells matched too: r3 review rows (cr 2.00 ok; qr 1.00 error; it 6.50 error; rt 12.00 ok; roe 15.0 ok; de 0.69 error), r3 dropdowns (Increase / Decrease / No effect / Decrease), u2 ratios (1.67, 0.80, 18.3, 8.00, 20, 1.50), u2 segments (R, R, R, R, Not) and u2 research (b).

| id | my answer | key | resolution |
|---|---|---|---|
| — | — | — | No disagreements. |

One near-miss: u2 `dso` = 365 ÷ 20 = 18.25, so a candidate could round it to 18.2 or 18.3. The tolerance is 0.1, and the scorer adds 1e-9 (`src/lib/tbsScoring.ts:76`), so both values are accepted. No finding.

## (b) Lesson design

- **Big idea.** Good. The four families each come with a framing question, and the ROA example is correct (5/50 = 10%, 5/200 = 2.5%).
- **Pre-questions.** There is one (`far-rat-pre1`), and it primes the equal-change rule, which is the module's main analysis idea. Nothing primes DuPont or EBITDA/variances. That is acceptable but thin (S4-level, not filed).
- **Body.** All computations recompute correctly:
  - Worked example: CR 1.6, QR 0.8, AR turnover 20 and 18.25 days, inventory turnover 6 and 60.8 days.
  - Faded example: 1.5; 250/150 = 1.67; 0.05, 1.5, 2 and 0.15.
  - Variance table: +40 F, −30 U, +10 F.
  - The EBITDA definition is correct and is labeled non-GAAP.
- **Gaps** (findings 008 and 009):
  - Working capital is never defined.
  - One-sided changes and swaps within current assets are not taught.
  - The DPO formula is missing.
  - The ROE line mixes the total and common bases.
- **Key takeaways** match the body.
- **Inline checks.** chk1 sits after Activity and chk2 after DuPont, which is good placement.
- **Minutes.** 18 is realistic: about 1,240 words (about 6 minutes of reading) plus a 4-step worked example, a 6-step faded example, 3 MCQs and a flowchart.
- **Citations.** CON 8 Ch. 1 and S-K Item 303 are fine. An optional addition would be SEC Regulation G and S-K Item 10(e) for EBITDA as a non-GAAP measure (not filed).
- **Lesson–item alignment.** These items test things the lesson doesn't teach:
  - working capital: far-x1-09, far-rat-20
  - one-sided or within-current-asset transaction effects: far-rat-04, far-rat-08, far-rat-20, far-x1-24 (c)/(d), far-tbs-r3 t3/t4
  - dividend yield and retention ratio (rationales only): far-rat-10, far-rat-19
  - DPO (given, not computed): far-rat-06
  - segments and related parties: far-tbs-u2-analysis parts `seg` and `rp`, which belong to other modules (finding 012)
- **Sequencing.**
  - EPS is taught later (far-eps), but the items give EPS directly, so there is no dependency.
  - The u2 TBS relies on far-sec-segments, which comes after this module, and the app attributes the TBS to far-ratios (finding 012).
  - far-bse-22 (balance-sheet module, earlier) already tests the current-ratio effect of paying AP before this lesson teaches it.
- **Blueprint scope.** One web search was used. SuperfastCPA's FAR task-titled tutorials ("Calculating Performance Metrics", "Calculating Variances Between Budget and Actual Results", "Identifying Appropriate Ratios for a Specified Type of Analysis") support EBITDA and budget-to-actual variances as FAR Area I tasks, consistent with REVIEW.md P1-7. Sources: https://www.superfastcpa.com/far-cpa-practice-questions-explained-calculating-variances-between-budget-and-actual-results/ and https://www.superfastcpa.com/?p=94074. This is secondary, not the AICPA PDF.

## (c) Practice design

- **Counts.** 28 practice MCQs, 4 exam MCQs and 2 TBS is adequate for this topic.
- **Coverage.** The four ratio families, DuPont, EBITDA (1 item), budget variance (1 item) and transaction effects are all covered. There are no flexible-budget, asset-turnover-standalone, book-value-per-share or "which ratio fits this analysis" items.
- **Redundancy.**
  - Inventory turnover: 5 MCQs, and far-x1-36 duplicates far-rat-22 (finding 001).
  - Paying AP above 1: 5+ items (finding 003).
  - far-rat-18 to -28 largely clone earlier items (finding 002).
- **Difficulty spread** (practice + exam): d1 1, d2 16, d3 15. Many of the d3 items are one-step computations (far-rat-21 to -28), so true difficulty is skewed easier than labeled. Practice order does not run easy to hard: the d1 item (far-rat-14) sits at position 14, and the simplest items (far-rat-24, -28) are labeled d3 at the end.
- **Skill mix.**
  - As labeled: application 16, analysis 15, remembering 1.
  - After the relabeling in finding 004: application 24, analysis 7, remembering 1.
  - FAR targets are R 5–15%, App 45–55%, Analysis 35–45%. This module is computation-centric, and FAR analysis share normally comes mainly from TBS (r3 is labeled analysis). The module would still benefit from 2–3 genuine analysis MCQs (finding 004 fix).
- **Labels.** Calc flags are all correct. One inconsistency: far-x1-24 (application/2) tests the same reasoning as far-x1-09, far-rat-26 and far-rat-pre1 (analysis). This is noted but not filed separately.
- **Answer cues** (cues.md):
  - "must" in far-rat-11 (c) is a mild absolute-only-in-distractor cue. The key is still clearly best, so it was not filed.
  - far-rat-14 "key much shortest" is not a real cue, since all options are short formulas.
  - far-rat-20 (c)/(d) are overlapping "no effect" options (finding 007).
  - Key letters are balanced (a 8, b 11, c 7, d 6).
- **Flashcards.** fc1–fc8 are correct and atomic. Missing cards: working capital, EBITDA, the variance sign convention, debt ratio, and P/E with payout.

## (d) Items with no issues found

far-rat-pre1, far-rat-chk1, far-rat-chk2, far-rat-01, far-rat-02, far-rat-03, far-rat-04, far-rat-05, far-rat-06, far-rat-08, far-rat-09, far-rat-10, far-rat-11, far-rat-12, far-rat-13, far-rat-14, far-rat-15, far-rat-fc1, far-rat-fc2, far-rat-fc3, far-rat-fc4, far-rat-fc5, far-rat-fc6, far-rat-fc7, far-rat-fc8.

(far-rat-01, -03, -10 and -15 are the originals that the clones in finding 002 repeat. The defect sits in the clones, not in these items.)

## (e) Needs expert verification

- **Finding 011.** Is segment reporting (ASC 280 quantitative tests) tested in 2026 FAR or only in BAR? The reference sheet marks it `conflict`. The answer affects part `seg` of far-tbs-u2-analysis and the far-sec-segments module.
- **FAR Area I task wording** for ratios and performance metrics, which affects the skill labels in finding 004. The official AICPA PDF was not seen. The skill judgments use the Blueprint's general skill definitions.

## (f) Not checked

- The app UI was not run, per the batch scope: TBS rendering, the review-part flag UI and miss routing in practice. The routing claim in finding 012 comes from reading `src/db/actions.ts`, not from observation.
- Only one cross-module consistency search was run (formula sheet `content/far/review/far-formulas.md`; far-bse-22; far-debt-other covenant table). Formulas there are consistent with this lesson (D/E = total liabilities ÷ total equity; quick ratio components; inventory turnover with COGS).
