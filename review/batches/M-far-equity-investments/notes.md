# Notes — M-far-equity-investments (Equity securities & the equity method)

Reviewer pass: blind answers saved first (`blind-answers.csv`), then keyed pass against `items.json` and both TBS files. 18 findings: 0 S1, 2 S2, 14 S3, 2 S4.

## (a) Blind vs. key

All 33 MCQ keys and all 20 TBS cells matched my blind answers. There were no disagreements to resolve.

| id | my answer | key | resolution |
|---|---|---|---|
| (all 33 MCQs) | = key | = key | Agree. Keys confirmed against ASC 321/323. |
| far-tbs-r3-equity-method (n, j, d) | 120,000 / 3,000 / 117,000 / 90,000 / 987,000; Dr Inv 117,000 / Cr Equity in earnings 117,000; EM, FV-NI, Consolidation, FV-NI | same | Agree. The journal part rejects the two-entry gross-plus-amortization alternative (finding 015). |
| far-tbs-u7-equity (model, eq) | FV-NI, EM, EM, Consolidation, MA; 500,000 / 100,000 / 262,500 / 2,637,500 | same | Agree |

Near-misses I noted in the blind pass and then confirmed in the keyed pass:
- far-eq-14 (c): the item's own rationale admits this option is right if the investor holds other investments in the investee (finding 007).
- far-eq-09 (a): true for a private company using the ASU 2014-02 alternative (finding 008).
- far-eq-23: the key leaves out the observable-price-change adjustment (finding 012).

## (b) Lesson design

- **Big idea.** Clear and well motivated: influence determines the model, and the dividend-management rationale explains why the equity method exists. The example (0.1% pension fund holding vs. 35% automaker stake) is good.
- **Pre-questions.** There is only one (far-eq-pre1). It primes FV-NI, which is fine, but nothing primes the equity method, which is the bulk of the lesson (finding 018).
- **Body.** I recomputed every number:
  - Mermaid classification chart: fine.
  - T-account: 600,000 + 120,000 − 30,000 − 6,000 = 684,000. Correct.
  - Worked example: excess 150,000 = 60,000 equipment + 90,000 goodwill; income 114,000; ending balance 684,000. Correct.
  - Faded example: 100,000 / 6,000 / 94,000 / 870,000. Correct.
  - The rules on presumptions, measurement alternative, OCI pickup, the zero floor and ASU 2016-07 prospective application are all correct and current.
- **Takeaways.** Accurate, but the basis-difference takeaway (#4) omits that inventory is expensed when sold and land is not depreciated (finding 014).
- **Inline checks.** Two (chk1 on the measurement alternative, chk2 on dividends). Both are correct. chk2 is a near-verbatim copy of far-eq-13.
- **Minutes (20).** The lesson is about 1,065 words (669 in the body) plus one worked block, a faded block with 4 inputs, 2 checks and 1 pre-question. That comes to roughly 7 minutes of reading plus 10–12 minutes of interaction, so 20 minutes is realistic.
- **`taxYear`.** Not applicable (FAR). Every standard cited is current for 2026:
  - ASU 2016-01 (ASC 321)
  - ASU 2016-07
  - ASU 2020-01 (implicit)

  Nothing post-2025 affects this module. ASU 2025-07's ASC 321 interaction is BAR and not testable until 2027. ASU 2023-02 (proportional amortization) has been testable since 2024 but is not mentioned; it is low-yield (my suggestion only, not filed as a finding).
- **Lesson–item alignment.** The following items test material the lesson never teaches (finding 013):
  - far-eq-09: equity-method goodwill is not separately tested; the whole investment is.
  - far-eq-17: OTT impairment of an equity-method investment, with no reversal.
  - far-eq-18: discontinuing the equity method when influence is lost.
  - far-eq-28: gain on a partial sale.
  - far-tbs-u7-equity row `inc`: an inventory basis difference expensed when the inventory is sold. The lesson says only "amortized/depreciated" (finding 014).
- **Sequencing.** The prerequisites (debt securities, the preceding module in u7) are fine. This lesson relies on nothing taught later. In the other direction, `far-consolidations` (unit u3, taught much earlier) refers to "the parent's equity-method ... income" before the equity method is taught here. That belongs to the consolidations batch, but it is worth cross-checking.

## (c) Practice design

- **Counts.** 28 practice MCQs, 2 exam MCQs, 3 lesson MCQs, 7 flashcards and 2 TBS. That is ample volume, but redundancy is high: the 28 MCQs cover about 12 distinct facts (finding 010).
- **Difficulty spread (practice).** 1: 4, 2: 10, 3: 14. Many of the difficulty-3 items are one-step (eq-21, -22, -26, -27, -28).
- **Progression.** The order is not easy to hard. eq-01 (labeled difficulty 3, really difficulty 1) comes first; difficulty-1 items are scattered through positions 6–13; positions 20–28 are all labeled difficulty 3 but are among the simplest items in the set.
- **Skill mix (practice + exam, n = 30), as labeled.** Remembering 4 (13%), application 12 (40%), analysis 14 (47%).
- **Skill mix after the relabels I propose (findings 001 and 002).** Remembering about 11, application about 18, analysis about 1 (eq-10).
  - The reconstructed Blueprint tasks for FAR-II.E.3 are R&U and Application only, so analysis-level skill for FAR should come from other areas and TBS.
  - The current labels overstate this module's contribution to the FAR analysis band (35–45%).
- **Topics still missing.** No MCQ or TBS covers:
  - upstream intra-entity sales
  - investee preferred stock
  - measurement-alternative impairment
  - a journal entry or computation for a change to or from the equity method (FAR-II.E.3.3)
- **TBS.**
  - **r3.** 20 minutes for 11 cells (5 numeric, 2 journal lines, 4 dropdowns) is realistic and the application label is right. The journal-entry ambiguity is finding 015 (S2) and the vague d2 row is finding 016.
  - **u7.** 18 minutes for 9 cells is realistic and the application label is right. It has no issues of its own.
  - **Scoring.** One point per cell. Integer keys with tolerance 0 (numeric rows) or the default ±1 (journal). A perfect response scores 100%.
- **Miss routing.** Every item has `moduleId` far-equity-investments, so misses route back to this lesson.

## (d) Items with no issues

far-eq-pre1, far-eq-02, far-eq-03, far-eq-05, far-eq-10, far-eq-18, far-eq-fc1, far-eq-fc2, far-eq-fc3, far-eq-fc5, far-eq-fc6, far-eq-fc7, far-tbs-u7-equity.

far-eq-18 is correct as an item. It is tied to the lesson gap (finding 013), but that finding is recorded against the lesson.

## (e) Needs expert verification

- **ASC paragraph numbers.** These were cited from memory and should be confirmed against the Codification: 323-10-35-23 to 35-26 (losses against other investments), 323-10-35-35/36 (sale and discontinuance), 350-20-35-59 (equity-method goodwill not separately tested), 825-10-25-4 (FVO election dates) and 321-10-35-1A (ASU 2020-01). The rules themselves are long-settled.
- **ASU 2014-02 and equity-method goodwill.** The private-company alternative's extension to equity-method goodwill (behind finding 008) was confirmed via search summaries (Baker Tilly / Moss Adams descriptions of ASU 2014-02), not the ASU text.
- **Severity of finding 015.** Whether the two-entry journal response should count as an "accepted alternative" (S1 under the calibration) or as prompt ambiguity (S2, as filed) is a judgement call for the TBS owner.

## (f) Could not check

- **The app.** Not run (usability is reviewed separately), so I did not confirm how practice order is actually presented. It may shuffle, which would make the progression point moot.
- **Blueprint task text.** The FAR-II.E task wording is "reconstructed" in `review/reference/blueprint-tasks.csv`, so the skill-level arguments in findings 001 and 002 rest on that reconstruction plus the Blueprint's general skill definitions.
- **Web searches.** I used 2 of the 3 allowed. The first (Deloitte roadmap) was inconclusive; the second confirmed the ASU 2014-02 scope.
