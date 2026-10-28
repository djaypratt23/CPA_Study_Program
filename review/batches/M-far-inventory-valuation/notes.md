# Notes — M-far-inventory-valuation (Inventory valuation, estimation & errors)

Reviewer pass dated 2026-10 against the 2026 FAR Blueprint. Blind pass saved first (`blind-answers.csv`), then keyed pass. 14 findings: S1 0, S2 1, S3 12, S4 1.

## (a) Blind vs. key

All 33 MCQ keys and all 8 TBS cells matched my blind answers. Nothing to resolve.

| id | my answer | key | resolution |
|---|---|---|---|
| far-iv-pre1, chk1, chk2 | c, a, b | c, a, b | agree |
| far-iv-01 … far-iv-28 | (see csv) | same | agree, all 28 |
| far-x2-04, far-x2-20 | d, a | d, a | agree (same question; see finding 003) |
| far-tbs-r3-lcnrv-review | A ok 50,000; B → 65,000; C → 40,000; D ok 26,000; tot 181,000; wd 19,000; q1 No; q2 Yes | same | agree |

## (b) Lesson design

- **Big idea → pre-question → body → takeaways → checks.** The big idea (you can't carry inventory above what you'll get for it) is clear and has a good concrete example. The one pre-question (far-iv-pre1) primes the right first concept: for FIFO, NRV matters and replacement cost doesn't. Nothing primes the estimation or error sections (S4, finding 014). The two inline checks (LCM, two-period error) fit their sections.
- **Accuracy.** I recomputed every number and all are correct:
  - LCM worked example: ceiling 52, floor 40; 42 / 50 / 40.
  - Faded fire loss: 490,000 / 110,000 / 95,000.
  - Retail table: 300,000 / 460,000 = 65.2% → 65,217, and 300,000 / 450,000 → 66,667.
  - The error table and the roll-forward formula are correct.
  - The rules match ASC 330-10-35 (as amended by ASU 2015-11), 330-10-35-14 (no reversal) and 270-10-45-6 (interim recoveries).
- **Currency.** Nothing about inventory measurement in ASC 330 has changed in the 2026 testing window. ASU 2024-03 (DISE) is not eligible until 1/1/2027 (`far-standards.md`). No `taxYear` is needed.
- **Minutes.** About 1,220 words including the frontmatter (about 950 in the body), plus 1 flowchart, 1 worked example with three cases, 1 faded example with three inputs, 3 tables and 2 checks. The 20 minutes is realistic.
- **Lesson–item alignment: items that test something this lesson never teaches** (finding 011):
  - far-iv-14 and far-iv-24 (loss on a purchase commitment). This is taught only in far-contingencies, a later FAR-III module.
  - far-iv-19 (employee discounts in the retail method).
  - far-iv-20 (freight-in in the retail method).
  - far-iv-28 (purchases and ending inventory both omitted).
  - Minor: far-iv-05(c)'s feedback cites the "FIFO retail method", which is never taught, and the IFRS reversal contrast in far-iv-07 and far-iv-27(a) appears only in flashcard fc3.
- **Not taught or tested anywhere in the module:** the write-down journal entry (finding 012).
- **Sequencing.** The lesson depends on far-inventory-cost for FOB terms, consignment and freight-in, and that module comes earlier. Its only dependency on a later module is the purchase-commitment items (above).

## (c) Practice design

- **Counts.** 28 practice MCQs, 2 exam MCQs, 3 lesson-pool MCQs, 6 flashcards and 1 practice TBS. Several other TBS also list this module: far-tbs-u5-inventory, far-tbs-u5-inventory-review and far-tbs-x2-receivables-inventory (none of them are in this batch). The count is adequate.
- **Labels now (practice + exam, 30 items):**
  - Skill: remembering 4, application 13, analysis 13.
  - Difficulty: 4 / 13 / 13 at levels 1 / 2 / 3.
- **Corrected skill labels** (findings 001 and 002): remembering 8 (02, 05, 10, 14, 18, 19, 20, 27), application 19, analysis 3 (08, 11, 28). That is 27% / 63% / 10%, against the section target of 5–15% / 45–55% / 35–45%. Commit 130ad50 ("round 4 analysis-level MCQs for the skill mix") labeled one-step items as analysis to hit the target. The module needs genuine FAR-II.C.5 analysis items, not relabels.
- **Difficulty after correction.** Level 3 is left with only 08, 11, 13 and 28. The apparent easy→hard progression (16–28 rated 3) is an artifact of the labels: 16–28 are as easy as 01–15.
- **Redundancy** (finding 008):
  - The middle-value LCM rule is tested 5 times.
  - The plain FIFO LCNRV computation is tested 6 times, counting the exam items.
  - far-x2-04 and far-x2-20 are the same question, both on mock 2 (finding 003).
  - 25/26 cue each other (finding 009).
  - The no-reversal rule appears in 07, 27, TBS q1 and fc3. That is acceptable.
- **Misses routing back to the lesson.** I did not check this in the app (app review is separate).

## (d) Items with no issues

far-iv-02, far-iv-06, far-iv-07, far-iv-08, far-iv-09, far-iv-10, far-iv-11, far-iv-fc1, far-iv-fc2, far-iv-fc3, far-iv-fc4, far-iv-fc5, far-iv-fc6.

All other keys are correct; their findings are S3/S4 quality issues only.

### Second pass: reproducing every distractor (coordinator request)

For every MCQ with numeric options (all pools), I reproduced each distractor's number from the stem in python. Where a number was hard to explain, I brute-forced 2–4-term combinations of the stem values. I then checked that each distractor's explanation and trap label describe the error that actually produces it.

**Distractors whose explanation names the wrong error.** These were added to finding 006, which now covers far-iv-04, -13 and -21:

| Item | Number | What actually produces it | Problem with the explanation |
|---|---|---|---|
| far-iv-13(d) | 175,000 | Gross profit 180,000 − salvage 5,000 | The explanation implies the 30% COGS-rate error, which gives 315,000 |
| far-iv-21(c) | 5,000 | Selling price − cost | "Deduct costs to sell" would lead to a $0 write-down, not 5,000 |
| far-iv-04(d) | 575,000 | 800,000 − 25% × sales | The true gross profit (180,000) would give 620,000 |

**Distractor numbers that are derivable after all.** These corrections were made to finding 005; the numbers are fine, but the feedback still doesn't explain them:

| Item | Number | Derivation |
|---|---|---|
| far-iv-25(c) | 17,500 | The purchases-only ratio, 70/100 × 25,000 |
| far-iv-26(c) | 15,000 | Only 90/150 × 25,000, which counts markups twice |

far-iv-17(c)'s 35,000 still has no derivation.

**Trap labels.** These were added to finding 007:

| Item | Change |
|---|---|
| chk1(b) | Floor taken although replacement cost is in range: label it wrong-rule |
| 03(a), 12(a), 23(a) | The same "replacement cost without bounds" error carries different labels; use one consistent label |
| 28(a), 28(b) | Each considers only one side of the omission: label them partial-computation |

**Everything else reproduced exactly as explained:**
- pre1, chk1(c, d), chk2, 01, 03, 06, 07, 09, 11, 12, 15, 16(b), 22, 23, 24, x2-04 and x2-20.
- TBS: all 8 explanations reproduce (B 75,000 is the selling price, as "ignored selling costs" says). C's explanation doesn't name the staff error (carried at NRV 62,000, above cost), but its rule and amount are right, so I raised no finding.

far-iv-04 has moved off the no-issues list.

## (e) Needs expert verification

1. **FAR-II.C.3 wording.** In `review/reference/blueprint-tasks.csv`, the task text ("... and prepare write-down entries") is `reconstructed`. Confirm it against the 2026 Blueprint PDF before you weigh finding 012.
2. **far-iv-24 (no finding raised; low confidence).** ASC 330-10-35-17 measures purchase-commitment losses "in the same way as are inventory losses". After ASU 2015-11, for a FIFO or average-cost buyer that arguably means against NRV, not the goods' "market price". The stem follows the traditional textbook treatment, as the exam does. An expert may prefer that the stem state the decline in the goods' NRV or name the cost method.
3. **The TBS time estimate** (finding 013) is my judgment of about 8–10 minutes.

## (f) Not checked, and why

- I used no web searches. Every rule here is long-settled ASC 330, and the reference sheet confirms no ASC 330 change in the window.
- I did not exercise the app UI for this module (usability is reviewed separately). I read the TBS scoring in `src/lib/tbsScoring.ts`: review rows need a flag plus the correct amount, and unflagged correct rows score. The scoring is fair, and a perfect response scores 100%.

### Cross-module observations (outside this batch — for the relevant reviewers)

- **content/far/modules/far-consolidations/lesson.md, line 101.** The downstream-sale worked example says "20,000 (25% markup on cost; 25% of the selling price)". With cost 60,000 and price 80,000, the markup on cost is 33⅓%; 25% is the gross profit on the selling price. This looks like an S1 for that module's batch.
- **content/far/modules/far-inventory-cost/questions.json, far-inv-28.** It tests the gross profit method, which is taught only in this later module (far-inventory-valuation). That is a sequencing issue. It is also labeled analysis/3 but is a one-step application, and has a "Not the computation." distractor (the same pattern as findings 002 and 005).
