# M-far-debt-other — reviewer notes

Scope: 39 items. That is the lesson `far-debt-other`, 3 lesson MCQs, 28 practice MCQs, 2 exam MCQs (`far-x2-16`, `far-x2-32`) and 5 flashcards. There are no TBS. I used no web searches: every rule involved is long-settled ASC guidance, or is covered by `review/reference/far-standards.md`.

Findings: 25 in total (0 S1, 3 S2, 14 S3, 8 S4).

## (a) Blind vs. key

All 33 MCQ keys matched my blind answers (`blind-answers.csv`), so there were no key disagreements to resolve.

| id | my answer | key | resolution |
|---|---|---|---|
| all 33 MCQs | — | — | Agree. Every numeric key reproduced in python (PVs, effective interest, extinguishment gains, EBITDA 3.1, the 12% modification test, TDR gains, the relative-FV warrant allocation). |

Things I noticed during the blind pass that became findings:

- dbt-02 and dbt-24 print the keys of dbt-01 and dbt-23 (finding 007).
- dbt-13 (b) can only be produced with an unstated rate (006).
- dbt-22 never states that the debtor is in financial difficulty (015).
- dbt-24 has a rounding mismatch (024).

The keyed pass then found these explanation and label problems:

- dbt-28 (b): its rationale "disclosure is for remote cases" is wrong (001, S2).
- dbt-04 (a): its rationale names the wrong error (005).
- Distractors without a derivation (006), thin explanations (013) and trap labels that don't fit (014).

## (b) Lesson design

- **Big idea.** Clear and correct: record at PV, classify by due date, and recognize a gain or loss on payoff. The trucking refinancing example primes the classification section well.
- **Pre-question** (`far-dbt-pre1`). It primes refinancing, which is the most-tested trap, but not the PV-note section that opens the lesson. That is acceptable for one pre-question. Two of its distractors are weak ("Split 50/50", "Disclosed only"). It also duplicates far-bse-21 and far-x1-28 (finding 010).
- **Body.**
  - Accurate overall. The worked PV example is right except for a $1 inconsistency between the factor and the product (018). The faded call example (970,000 − 1,020,000 = −50,000) is correct.
  - Classification rules are incomplete (017): intent, equity securities as refinancing, the conditions for a qualifying agreement, and the "or operating cycle" wording are missing.
  - The modification/TDR section leaves out lender fees in the 10% test, third-party costs and equity-settled TDRs (019).
- **Key takeaways.** Correct and consistent with the body. The "not extraordinary" wording is right (ASU 2015-01).
- **Inline checks.**
  - chk1 (the $350,000 agreement cap) is good.
  - chk2 tests extinguishment but sits after the Disclosures section.
  - The covenant, modification and TDR sections, added in P1-7, have no checks (021).
- **Minutes (16).** The file is about 1,270 words including frontmatter (about 940 of body). It has one worked block, one faded block, a mermaid flowchart, one table and two checks. Reading takes about 6–7 minutes and the blocks and checks about 6–8, so 16 is realistic.
- **Lesson–item alignment.** These items test material the lesson never teaches, and no other FAR lesson teaches it either (finding 002, S2):
  - far-dbt-14: detachable warrants
  - far-dbt-15: convertible debt at issuance
  - far-dbt-19: conversion, book-value method
  - far-dbt-26: in-substance defeasance and derecognition
  - far-dbt-27: line-of-credit costs
  - far-dbt-28: subjective acceleration clause

  Partly taught elsewhere, which is acceptable:
  - far-dbt-20: current portion of installment debt (far-balance-sheet-equity)
  - far-dbt-10: working-capital effect (far-balance-sheet-equity)
  - far-dbt-08: a market-rate note is recorded at face (implied by the lesson's "no stated or unreasonably low rate" condition)
- **Sequencing.** The lesson depends on bond premium/discount and issuance costs and on PV mechanics, both taught in far-bonds, the preceding module in far-u8. Working capital comes from far-balance-sheet-equity (FAR-I, earlier). Nothing depends on a later module.
- **Currency.** The module has no `taxYear` (not applicable). Every rule matches what the 2026 exam tests:
  - ASU 2015-01: no extraordinary items
  - ASU 2015-03 and 2015-15: issuance costs and line-of-credit costs
  - ASU 2020-06: convertibles
  - ASU 2022-02: creditor TDR removed; debtor ASC 470-60 retained

  Not covered: ASU 2024-04 on induced conversions, which is testable from 1/1/2026 (023, S4). No pending ASU changes ASC 470-10 classification; the FASB debt-classification project produced no ASU through 2026-03 per the reference sheet.

## (c) Practice design

- **Count.** 28 practice MCQs, which is adequate in number. Difficulty as labeled is 1: ×2, 2: ×14, 3: ×12. Many of the 3s are inflated (003, 004).
- **Progression.**
  - Roughly topical (PV notes, then classification, extinguishment, covenants, modification/TDR, convertibles) rather than easy to hard. That matters little, because practice sets are shuffled (src/lib/quiz.ts).
  - The shuffling is exactly why the "Using the previous facts" items are a problem (007).
- **Skill mix.**
  - As labeled: remembering 2 / application 14 / analysis 12 (7% / 50% / 43%). That looks on target against the FAR allocation of 5–15 / 45–55 / 35–45.
  - The labels are inflated. Relabeled: about 5 / 22 / 1 (18% / 79% / 4%).
  - Only dbt-10 is plausibly analysis-level (025).
- **Redundancy.**
  - Extinguishment gain/loss is tested in 5 MCQs, plus the faded example and fc4. far-x2-16 and far-x2-32 are both on far-mock-3 with the same $980,000 carrying amount (009).
  - Within the module: dbt-01/02 ≈ dbt-23/24, and dbt-16 ≈ dbt-22 (008).
  - Across modules: duplicates of far-bonds and far-balance-sheet-equity items (010).
- **Topics with no items at all:**
  - a note with an unreasonably low (non-zero) stated rate
  - notes issued for cash plus rights or privileges
  - a TDR settled by granting equity
  - refinancing via equity securities
  - an agreement whose available amount fluctuates
  - induced conversion
- **Routing.** Misses route to this lesson. For the six untaught items, the lesson has nothing to show.

## (d) Items with no issues found

far-dbt-chk1, far-dbt-08, far-dbt-11, far-dbt-12, far-dbt-20, far-dbt-fc1, far-dbt-fc3, far-dbt-fc4, far-dbt-fc5.

## (e) Needs expert verification

- **Finding 002, S2.** Whether convertible debt and debt with detachable warrants remain FAR 2026 Area II "Debt" content. Stock compensation moved to BAR, but not debt. I believe they are FAR, but I did not see the representative task text.
- **Findings 003 and 004.** Skill relabels follow the Blueprint's definitions as I read them. Medium confidence: dbt-03 and dbt-16 could be argued as analysis.
- **ASC paragraph numbers in fixes** were cited from memory and not re-read:
  - 470-50-40-12, 40-17 and 40-18
  - 470-60-15-5 and 35-4
  - 470-20-25-13 and 40-13 to 40-17
  - 835-30-S45-1

  The rules themselves are standard.

## (f) Not checked

- The app rendering of this module, i.e. the usability journeys, which are reviewed separately.
- The `far-tbs-u8-bonds` TBS, which is outside this batch, though it may also test extinguishment.
- The AICPA Blueprint PDF itself: the debt representative tasks were not available in the reference sheets, and direct fetches are blocked.
