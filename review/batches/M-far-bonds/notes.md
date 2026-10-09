# M-far-bonds — reviewer notes

Scope: 42 items (lesson, 3 lesson MCQs, 28 practice MCQs, 2 exam MCQs, 6 flashcards, 2 TBS). Every item was reviewed; findings are in `findings.jsonl` (19: 0 S1, 2 S2, 14 S3, 3 S4).

**Process note.** `cues.md` lists the key letter for seven items (01, 06, 08, 09, 10, 13, 28). It is meant to be read during the blind pass, so those seven keys were visible before blind answering. My blind answers for them were derived independently (see `blind-answers.csv`), but the cue file should not carry keys in future batches.

## (a) Blind vs. key

**All 33 MCQ keys and all TBS cells agree with my blind answers.** The table below lists the places where the blind pass raised a concern that the keyed pass had to resolve.

| id | my answer | key | resolution |
|---|---|---|---|
| far-bond-14 | c (1,067,598) | c | Key correct given the stated price. Blind note: 1,081,109 is a 5-year **semiannual** price, but the stem says annual → finding 005 (S3). |
| far-bond-25 | a (8,649) | a | Same pattern: 108,111 is the semiannual price → finding 005. |
| far-x2-24 | a (57,441) | a | Same pattern: 957,355 = 0.7441/8.5302 semiannual factors → finding 005. |
| far-bond-05 | a | a | Key correct; "net of a $5,000 discount" wording is imprecise (premium + DIC) → finding 012. |
| far-tbs-u8-bonds ext.ca / ext.gl | 947,574 or 947,573; −22,426 or −22,427 | 947,574; −22,426 (tol 1) | The ±1 tolerance accepts both roundings of 947,573.5. No issue. |
| far-tbs-x2-bonds (all) | 478,960 / 28,738 / 482,698 / 28,962; Discount / Increases / Greater | same | Agree. |

## (b) Lesson design (far-bonds)

**Arc.** The big idea (market rate sets the price; the coupon only sets the cash) is clear and well chosen. The utility example ties to the worked example: 875,378 price, 124,622 discount, 924,622 total expense ≈ "924,600". The arc runs: pre-question → pricing worked example → check → amortization table and JE → faded premium example → issuance costs and between-dates → check. The takeaways match the body.

**Recomputation.** Every number is correct:
- pricing: 376,889 + 498,489 = 875,378
- schedule: 43,769 / 3,769 / 879,147; 43,957 / 3,957 / 883,104
- faded premium: 519,964 (exact 519,963.55); 41,597; 3,403; 516,561; 41,325
- between-dates: 6,000 collected; 18,000 coupon; net 12,000

Minor: the two worked components don't reproduce from the displayed 5-decimal factors (S4, finding 017).

**Pre-question.** far-bond-pre1 (6% stated vs. 7% market) primes exactly the discount/premium concept the big idea opens with. Good.

**Minutes.** 20 is realistic. The file is about 887 words (about 700 of body), with 1 worked example (4 steps), a 3-row table, 1 JE, a 4-input faded example, 2 checks and 1 pre-question: roughly 15–20 minutes.

**Lesson–item alignment.** Items that test material this lesson never teaches:
- far-bond-15 (ASU 2020-06 convertible debt), far-bond-26 (conversion, book value method), far-bond-27 (detachable warrants): taught in **no** FAR lesson (finding 001, S2).
- far-bond-23 (call/extinguishment): taught in far-debt-other, the next module (finding 003).
- far-bond-28 (FVO own credit → OCI): taught in far-fair-value, a much later module (finding 003).
- far-bond-18 (zero-coupon): not taught, but derivable from the interest method (finding 016).
- far-bond-09 (year-end accrual on annual-coupon bonds): no bond accrual example in the lesson, but derivable from far-payables (finding 016).
- far-bond-07 and far-bond-10 (straight-line computation and its pattern vs. effective interest): the lesson only states that straight-line is allowed when not materially different; the computation and the early-year comparison are not shown. Derivable, so no separate finding.
- far-tbs-u8-bonds part `ext` (extinguishment): taught in far-debt-other. The TBS is tagged to both modules, so this is acceptable.

**Sequencing.** The lesson relies only on present-value mechanics and accrual basics, which earlier modules use (far-debt-securities, far-payables). Its own items, however, reach forward into far-debt-other and far-fair-value (above).

**Other lesson gaps (finding 016):**
- no issuance JE
- no year-end adjusting entry with partial-period amortization
- no debt-issuance-cost computation (effective rate rises)
- no zero-coupon mention

Metadata: the third objective has no `task`, and citations are topic-level only (finding 018).

## (c) Practice design

**Counts.** 28 practice MCQs, 2 exam MCQs, 3 lesson MCQs, 6 flashcards, 1 practice TBS, 1 exam TBS. That is ample for one module.

**Difficulty (practice):**
- 1 = 5 (03, 08, 11, 13, 15)
- 2 = 11 (01, 02, 04, 05, 06, 07, 09, 12, 16, 18, 20)
- 3 = 12 (10, 14, 17, 19, 21–28)

Items 21–28 are all labeled analysis/3 regardless of content, which looks like a bulk default. Most "difficulty 3" items are one-step computations (finding 004). Practice sessions are shuffled (`src/lib/quiz.ts`), so file order doesn't create an easy→hard progression. The chained items (01→02, 16→17, 21→22) break under shuffling (finding 006).

**Skill mix (practice + exam, n = 30):**

| Skill | As labeled | Realistic | FAR target |
|---|---|---|---|
| Remembering | 5 (17%) | 7 (23%) | 5–15% |
| Application | 14 (47%) | ~22 (73%) | 45–55% |
| Analysis | 11 (37%) | ~1 (3%; far-bond-10) | 35–45% |

The labeled mix appears to meet the target; the realistic one does not. The module needs genuinely multi-step items: year-end accruals with partial-period amortization, two-period schedules, DIC effective rate, method-comparison effects (findings 004, 015).

**Redundancy:**
- far-bond-12 and far-bond-24 are near-duplicates (finding 014).
- First-period-expense and carrying-amount-after-one-payment drills appear 4× each in practice (finding 015).

**Routing.** All items carry `moduleId: far-bonds`, so misses route back to this lesson. For 15, 23, 26, 27 and 28 that lesson doesn't contain the rule (findings 001, 003).

## (d) Items with no issues

far-bond-pre1, far-bond-chk1, far-bond-chk2, far-bond-03, far-bond-07, far-bond-08, far-bond-09, far-bond-10, far-bond-11, far-bond-13, far-bond-fc1, far-bond-fc2, far-bond-fc3, far-bond-fc4, far-bond-fc5, far-bond-fc6.

(Both TBS recompute fully and score fairly. Their only finding is the S4 design/time-estimate suggestion.)

## (e) Needs expert verification

- **Finding 001.** Exact 2026 FAR Blueprint wording for convertible debt, debt with detachable warrants, and induced conversions. My one search did not surface the debt representative tasks: https://accounting.uworld.com/cpa-review/cpa-exam/changes/2024-cpa-evolution/ and https://dlcp.dc.gov/sites/default/files/dc/sites/DLCP/publication/attachments/Uniform%20CPA%20Examination%20Blueprints%202.5.24.pdf (2024 Blueprint copy, not fetched).
  - The lesson-alignment gap stands either way: the items are non-optional and no lesson teaches the rules.
  - The reference sheet (Part 2) lists ASU 2024-04 as testable from 1/1/2026, from a `verified` row.
- **Currency.** No issues found:
  - ASU 2015-03 (DIC presentation)
  - ASU 2016-01 / ASC 825-10-45-5 (FVO own credit → OCI)
  - ASU 2020-06 (effective for all entities by FY > 12/15/2023)
  - ASC 835-30-35-4 (straight-line allowed only if not materially different)
  - extinguishment gain/loss reported in continuing operations (no extraordinary items)

  All are current for the 2026 exam. The paragraph-level citations (835-30-45-1A, 835-30-45-3, 470-20-25-2, 470-20-40-4) are from memory and not re-verified against the Codification.

## (f) Could not check

- **App rendering.** I didn't run the app (the batch scope is content). Lesson block rendering and TBS UI were not exercised. Scoring logic for journal and numeric parts was read in `src/lib/tbsScoring.ts`: tolerances apply, line order doesn't matter, and extra lines are penalized.
- **Primary sources.** Direct reads of the AICPA Blueprint PDF and the FASB Codification were not possible (egress blocked). One web search was used, within the 3-search budget.
