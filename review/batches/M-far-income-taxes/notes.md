# M-far-income-taxes: reviewer notes

Scope: 48 items (1 lesson, 3 lesson MCQs, 28 practice MCQs, 5 exam MCQs, 8 flashcards, 2 practice TBS, 1 exam TBS). I worked every item blind first (`blind-answers.csv`), then compared against the keys. Findings: 19 in total (S1 0, S2 3, S3 11, S4 5).

## (a) Blind vs. key

All 33 MCQ keys and every TBS cell matched my blind answers. There were no disagreements.

| id | my answer | key | resolution |
|---|---|---|---|
| all 33 MCQs | — | — | agree |
| far-tbs-r3-deferred-tax (6 numeric rows + JE) | 455,000 / 113,750 / 15,000 / 5,000 / 123,750 / 24.75; JE Dr ITE 123,750, Dr DTA 5,000, Cr ITP 113,750, Cr DTL 15,000 | same | agree |
| far-tbs-u10-income-taxes (6 dropdown + 6 numeric + JE) | P, P, DTL, DTA, DTA, DTL; 1,365,000 / 286,650 / 63,000 / 23,100 / 23,100 / 309,750; JE 309,750 + 18,900 = 286,650 + 42,000 | same | agree |
| far-tbs-x3-income-taxes (6 numeric) | 860,000 / 180,600 / 12,600 / 6,300 / 186,900 / 20.77 | same | agree |

One near-disagreement is about format, not content. I would have written the JE with a single expense line, but the lesson teaches the split current/deferred form, and the scorer gives that correct form only 3 of 5 cells (finding 002; simulated with `scoreJournal`).

## (b) Lesson design

- **Big idea → body.** The big idea (book vs. tax timing; an example DTL of 60,000 × 21% = 12,600) is clear and correct. Body order: temporary/permanent table → check → balance-sheet approach (flowchart, worked example, JE) → rates/VA/NOL/UTP → faded rate-change example → presentation → check. That order is logical.
- **Recomputed.** Worked: TI 760,000; current 159,600; DTL 12,600, DTA 6,300; deferred 6,300; total 165,900 (20.74%); JE balances at 172,200. Faded: 400,000 × 25% = 100,000; 100,000 − 42,000 = 58,000. All correct.
- **Pre-questions.** There is only one (far-tax-pre1, muni interest = permanent). It primes the first section correctly, but nothing primes rate remeasurement, the VA or UTPs (finding 018).
- **Minutes.** The lesson runs about 1,230 words (457 frontmatter, 771 body), plus a worked block, a faded block, a JE, a flowchart and 3 inline MCQs. That's about 6 minutes of reading and 10–12 minutes of interaction, so the stated 20 minutes is realistic.
- **Takeaways.** Accurate. The "total tax expense" takeaway and fc3 omit the VA term (finding 019).
- **Lesson–item alignment.** These items test material the lesson never teaches:
  - far-tax-14: classification of interest and penalties (ASC 740-10-45-25), not in the lesson.
  - far-tax-20: deferred taxes on nondeductible goodwill (ASC 805-740), not in the lesson and BAR scope.
  - far-tax-08, -19, -26: the cumulative-probability measurement of a UTP. The lesson states the rule only in words, with no table or example.
  - far-tax-28: the 80% NOL deduction computation. The rule is taught but not demonstrated (acceptable).
- **Sequencing.** The lesson relies on equity-method income (far-equity-investments, unit u7), discontinued operations and OCI (far-income-statement-oci, unit u1), and installment sales. All of these come earlier or are general knowledge, and nothing relies on a later module. Contingencies (later) aren't needed.
- **Citations.** ASC 740-10-25-6 / 30-7 (UTP), 740-10-45-4 (noncurrent, ASU 2015-17), 740-10-50-12 (rate reconciliation, ASU 2023-09), and IRC §11(b) and §172 are all correct. `taxYear: '2025'` matches x3's 2025 facts and the 21% rate, and the post-2017 NOL rules are current for the 2026 exam.

## (c) Practice design

- **Counts.** 28 practice MCQs (plus 3 lesson and 5 exam MCQs), 2 practice TBS, 1 exam TBS. The count is adequate.
- **Difficulty as labeled.** d1 5, d2 10, d3 13. In reality, far-tax-21 to -28 (labeled d3, analysis) are the easiest items in the module, so the easy-to-hard progression is inverted at the end of the set (finding 004).
- **Skill mix (practice + exam, 33 items).**
  - As labeled: application 15 (45%), remembering 4 (12%), analysis 14 (42%). That looks in range against FAR's 45–55 / 5–15 / 35–45.
  - After correcting the mislabels (findings 003, 004): remembering 7 (21%), application 21 (64%), analysis 5 (15%; items 08, 17, 19, 26, x3-06).
  - So the module lacks genuine analysis-level work (finding 013).
- **Redundancy.** Four clusters cover about 18 of 28 practice items (finding 009). The three TBS are all a one-year basic provision with no beginning VA, rate change or UTP, and x3 clones the lesson's worked example (finding 014).
- **Self-containment.** far-tax-02 depends on far-tax-01, and practice sets are shuffled (src/lib/quiz.ts) (finding 001). far-tax-25 reveals far-tax-24's key (finding 007).
- **Routing.** All items carry `moduleId: far-income-taxes`, so misses route back to this lesson.

## (d) Items with no issues found

far-tax-pre1, far-tax-04, far-tax-05, far-tax-10, far-tax-12, far-tax-15, far-tax-17, far-tax-18, far-tax-fc1, far-tax-fc2, far-tax-fc4, far-tax-fc5, far-tax-fc6, far-tax-fc7, far-tax-fc8.

Notes on some of these:
- far-tax-05 appears in finding 009's evidence as a cluster member, but nothing in it needs a fix.
- far-tax-15: the key repeats the stem's words ("discontinued operations"). I judged this not a material cue, since the other options are plausible locations.
- far-tax-17 and far-x3-06 (scheduled reversal at two rates) are labeled analysis/3. I'd call them application/2, but that's borderline, so I didn't flag far-tax-17. far-x3-06 is flagged only for its distractor rationale.

## (e) Needs expert verification

- **Finding 002 severity.** Under the strict calibration ("a TBS that scores a correct answer as wrong … accepted alternative marked wrong"), finding 002 could be S1. I rated it S2 (medium confidence) because the TBS account list offers only one "Income tax expense" account, so a single line is the expected form. An expert should decide whether two same-account lines must be accepted.
- **Finding 010 scope.** Whether deferred taxes on acquired goodwill are strictly BAR: the reference sheet marks goodwill placement as a `conflict` (Becker says BAR; the repo notes say FAR Area II). Business combinations are verified as BAR.
- **Finding 017.** The §101(j) nuance is a REG point. For FAR the permanent-difference treatment stands; only the explanation's absolute wording is at issue.

## (f) Could not check

- I used no web searches. Every ASC and IRC rule relied on is long-settled (ASC 740-10-30-7, 45-4, 45-25, 35-4; ASC 805-740-25-9; IRC §172(a)(2)), and ASU 2023-09 is covered as `verified` in review/reference/far-standards.md. I couldn't open the primary FASB text (blocked), so paragraph numbers are from memory.
- I couldn't see the official 2026 FAR representative-task wording for Area III.D, so the coverage judgments in finding 013 are based on group-level topics.
- I didn't run the app UI; the batch is content-only. The journal-scoring behavior was confirmed by running `src/lib/tbsScoring.ts` with `tsx`.
