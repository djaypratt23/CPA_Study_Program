# Notes: M-far-balance-sheet-equity

44 items: lesson, 3 lesson MCQs, 28 practice MCQs, 3 exam MCQs, 8 flashcards and 1 TBS. All were reviewed. 13 findings: S1 0, S2 1, S3 9, S4 3.

## (a) Blind answers compared with the keys

I wrote `blind-answers.csv` before opening `items.json` or the TBS file.

**There were no disagreements.** All 31 MCQ keys matched my blind answers:

- pre1 a, chk1 a, chk2 b
- 01 d, 02 a, 03 d, 04 d, 05 d, 06 d, 07 a, 08 d, 09 d, 10 d, 11 c, 12 a, 13 a, 14 a
- 15 b, 16 b, 17 c, 18 d, 19 a, 20 b, 21 a, 22 b, 23 c, 24 d, 25 a, 26 b, 27 c, 28 d
- x1-02 c, x1-19 a, x1-28 b

All 12 TBS review rows also matched. Flagged rows: ca 626,000; ta 1,636,000; cl 284,000; ibt 334,000; ni 253,000; reend 662,000; aoci 20,000. Unflagged rows: tl, gp, tax, rebeg, te. The trial balance foots to 4,125,000. Corrected total assets of 1,636,000 equal total liabilities (634,000) plus total equity (1,002,000).

| id | My answer | Key | Resolution |
|---|---|---|---|
| none | | | |

## (b) Lesson design

**Big idea.** Clear, with a good real-world example: whiskey whose operating cycle is longer than a year.

**Pre-question.** There is one, `far-bse-pre1` (a 20-month cycle and a 16-month receivable). It primes the central "longer of one year or the operating cycle" rule well. Its key is the longest option and repeats "operating cycle". That is a mild cue, and I judged it immaterial for a best-guess item.

**Body.**
- I recomputed every number and all are correct:
  - Worked working capital: 256,000 − 140,000 = 116,000.
  - T-account: 400,000 − 14,000 + 130,000 − 50,000 = 466,000.
  - Faded example: 22,500, then 797,500, then 927,500.
- The rules on covenant violations and offsetting are accurate.
- The discrepancy table is correct. In particular, an OCI item put in net income leaves total equity unchanged, and dividends treated as an expense leave ending retained earnings unchanged.

**Takeaways.** Accurate, and they line up with flashcards fc1–fc8.

**Inline checks.** chk1 and chk2 fit the sections they follow.

**Minutes.** The body is about 1,000 words, plus the worked example, the faded example, the T-account and 3 MCQs. 15 minutes is realistic.

**Lesson–item alignment gaps:**
- **Refinancing and sinking-fund exceptions.** `far-bse-20`, `far-bse-21`, `far-x1-02` and `far-x1-28` depend on them. The lesson never mentions refinancing (finding 001, S2).
- **Topics taught only in later modules** (finding 002):
  - property dividend at fair value: `far-bse-11`
  - small stock dividend at fair value: `far-bse-23`
  - treasury stock reissue: `far-bse-27`
  - bank overdrafts: `far-bse-15`, `far-bse-24`
  - current ratio: `far-bse-22`
  - equity securities' fair-value changes go to net income: `far-bse-26`

**Sequencing.** The module is second in FAR, after the optional conceptual framework module. The items above rely on far-debt-other (unit u8), far-equity (u8), far-cash (u5), far-ratios (u2) and far-equity-investments (u7). Otherwise the lesson stands on its own.

## (c) Practice design

**Counts.** 28 practice MCQs, 3 exam-pool MCQs and 1 TBS (analysis, 25 minutes). The count is adequate.

**Difficulty as labeled.** Practice items:
- 1: 5 items
- 2: 10 items
- 3: 13 items

Items 17–28 are all labeled 3, although most are single-rule items (finding 003).

**Progression.** Easy to hard only loosely. The hard-labeled items are bunched at the end, but those labels are inflated.

**Skill mix as labeled.** Practice and exam pools: remembering 5, application 14, analysis 12.

**Skill mix after correction.** Remembering about 6, application about 24, analysis about 1 (`far-bse-13`). The TBS is genuinely analysis-level.

**Against the FAR allocation.** The target is remembering 5–15%, application 45–55%, analysis 35–45%. Once relabeled, this module is application-heavy with almost no analysis-level MCQs (finding 013, S4).

**Redundancy:**
- `chk1` and `bse-14` are near-duplicates (finding 007).
- Across modules, the refinancing, current-ratio and overdraft items repeat items elsewhere (finding 008).

**Cues.** I judged the cues.md flags:
- **Real cues:** `far-x1-19` and `far-x1-28` (finding 009).
- **Not material:**
  - `bse-02`, `bse-10` and `bse-14`: the "longest key" differences are small.
  - The "absolutes" flags (e.g. "only", "all") are natural wording.
  - `bse-05`: the "(not credit)" qualifier is needed for the answer to be accurate.
  - `chk2`: "No effect" is necessarily short.

## (d) Items with no issues found

- Lesson MCQs: `far-bse-pre1`, `far-bse-chk2`
- Practice MCQs: `far-bse-01`, `far-bse-03`, `far-bse-04`, `far-bse-05`, `far-bse-06`, `far-bse-07`, `far-bse-08`, `far-bse-09`, `far-bse-10`, `far-bse-11`, `far-bse-12`, `far-bse-13`
- Exam MCQ: `far-x1-02`
- Flashcards: `far-bse-fc1` through `far-bse-fc8`

Two of these, `far-bse-11` and `far-bse-15`, are named in lesson finding 002 because the lesson doesn't support them. `far-bse-11` is listed above because the item itself is sound. `far-bse-15` is not, because it has its own finding (006).

## (e) Needs expert verification

- **Skill levels for debt-classification tasks.** The official 2026 FAR Blueprint representative tasks were not accessible. Finding 003 (confidence medium) uses the general skill definitions.
- **NCI scope.** The FAR vs. BAR placement of consolidation and noncontrolling-interest presentation is marked `conflict` in the reference sheet. That bears on `far-bse-12`, the lesson's NCI bullet and fc8. I treated NCI presentation within equity as basic FAR balance-sheet content.
- **ASC paragraph numbers cited from memory:** 210-10-45-12 (maturities paid from a noncurrent fund) and 470-10-45-15 (debt repaid before refinancing). Both rules are long settled.

## (f) What I could not check, and why

- **Web searches: none used.** All rules involved are long-settled ASC guidance. The reference sheet (ASUs through 2026-03) shows no final ASU on debt classification or balance-sheet classification. The 2026 currency of the ASC 470-10-45 rules therefore rests on that sheet.
- **Routing in the running app** (does a miss lead to this lesson?) was not exercised. App usability is reviewed separately. I inferred routing from the `moduleId` tags.
- **Currency.** No tax-year issues apply. Dates in the items (2025/2026, Year 1/Year 2) are internally consistent, and the lesson has no `taxYear` field, which is appropriate for FAR. All rules match standards effective for the 2026 exam:
  - CECL "allowance for credit losses"
  - non-credit AFS changes to OCI
  - equity securities through net income (ASU 2016-01)
