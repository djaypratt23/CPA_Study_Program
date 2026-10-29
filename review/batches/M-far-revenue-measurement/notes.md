# Notes: M-far-revenue-measurement (Revenue II: price, allocation & timing)

Reviewer pass on 2026-10-07 (review date). I wrote the blind answers (`blind-answers.csv`) before opening any key. There are 23 findings: S1 0, S2 4, S3 16, S4 3. No web searches were used. All authority is ASC 606 / 605-35 / 340-40 as it stands now (no ASU affecting these items is eligible in 2026: ASU 2025-04 and 2025-07 are not testable until 2027 and are BAR anyway).

## (a) Blind answers vs. keys

All 36 MCQ keys and all 9 numeric TBS cells match my blind answers. The only disagreement is in a TBS dropdown.

| id | my answer | key | resolution |
|---|---|---|---|
| far-tbs-r3-revenue-allocation / d.d2 (Installation) | Over time (either defensible) | Point in time | **Both defensible. The key's rationale (short duration) is not a criterion.** Installation on equipment the customer already controls meets 606-10-25-27(b). The amount is identical either way, but the row scores a correct application of the standard as wrong. Finding 004 (S2). |
| every other MCQ / TBS cell | same as key | — | Agree. Every numeric distractor was reproduced in python. Wrong distractor rationales: far-rev2-07(b) (finding 005), far-rev2-15(a) not derivable (006), far-rev2-16(b)/(c) (007), and the 20–28 block (008). |

Both TBS were recomputed:
- **r3:** 810,000 / 90,000 / 180,000; Year-1 revenue 922,500; contract liability 157,500.
- **u9:** Year-1 revenue 4,000,000; gross profit 1,000,000 / (1,500,000) / +100,000.

Both TBS have exact integer answers, so tolerance 0 is safe.

## (b) Lesson design

- **Big idea → pre-question → body → takeaways → checks.** The big idea is clear and the warehouse example is apt. There is only one pre-question (`far-rev2-pre1`, bundle allocation). It primes Step 4 only; nothing primes variable consideration or over-time recognition, which are two-thirds of the lesson. Its option (d) duplicates (a) (finding 020). The two inline checks fit their sections: chk1 tests expected value vs. most likely amount, and chk2 tests the third over-time criterion.
- **Technical accuracy.** Every worked number recomputes:
  - expected value 15,000 → transaction price 115,000; most likely amount 130,000
  - returns: revenue 47,500, refund liability 2,500, return asset 1,500, COGS 28,500
  - faded example: 1,200 / 640 / 200
  - cost-to-cost: 30% → revenue 1.5M, gross profit 0.3M; then 80% → Year-2 revenue 2.5M, gross profit 0.9M
- **Main defect: the constraint is worded as "a significant reversal is not probable".** That wording lowers the bar compared with ASC 606-10-32-11 ("probable that a significant reversal will not occur"). The same wording appears in the flashcard and in two items (finding 001, S2).
- Citations are correct and current. The 605-35-25-45 onward loss guidance was retained after ASU 2014-09.
- **Minutes (20) are realistic.** The lesson is about 1,190 words (≈6 min of reading), plus 2 worked examples, 1 faded example with 3 inputs, a flowchart and 3 questions, which comes to about 15–22 min.
- **Lesson–item alignment.** These items test material the lesson never teaches:
  - `far-rev2-20` (sales-based royalty exception) and `far-rev2-28` (functional IP → point in time). Licenses are taught in **neither** revenue lesson (finding 014).
  - `far-rev2-26`: option/material-right SSP (likelihood of exercise, incremental discount) is not taught here (finding 015). Revenue I only says a material right is a separate obligation.
  - `far-rev2-12`, `far-rev2-22`: the advance-payment financing component (accrete interest expense; revenue > cash) is not shown (finding 015).
  - `far-rev2-07`, `far-tbs-u9-construction` y2/y3: the mechanics of the loss year (loss + reversal of prior profit) and the later true-up are asserted, not shown (finding 015).
  - `far-rev2-27` (extended warranty) and `far-rev2-08` (commissions) are taught in Revenue I or this lesson, but they duplicate Revenue I items (finding 013).
- **Sequencing.** No forward dependencies. The lesson relies on Revenue I (material rights, warranties, distinct POs), present-value mechanics (bonds, unit 8, earlier) and receivables. All of these come earlier in the module order.
- The lesson objective 3 skill is "analysis". Per the Blueprint, FAR revenue is tested at R&U/Application only (finding 003).

## (c) Practice design

- **MCQ count.** 28 practice, 5 exam-pool and 3 lesson MCQs, plus 2 TBS. The count is adequate for a high-weight topic.
- **Difficulty spread (practice, as labeled).** d1: 1, d2: 15, d3: 12. Items 01–19 are almost all d2. Then 20–28 are a block that is uniformly analysis/d3, regardless of content. Several of those are one-fact recall items (finding 002), so the apparent easy→hard progression is an artifact of the labels. Only one item is labeled d1. After relabeling, the module would have a reasonable set of d1 recall items (20, 23, 24, 27).
- **Skill mix (practice + exam, as labeled).** Application 21, analysis 12, remembering 0. The analysis share (36%) matches the section's 35–45% target only on paper. The Blueprint puts FAR revenue at R&U/Application, and most of the "analysis" items are recall or routine calculation (findings 002 and 003). No item is labeled remembering, although five are pure recall.
- **Redundancy.**
  - Three exact within-module duplicate pairs: 12/22, 13/23, 17/24 (finding 011).
  - Three practice items duplicate Revenue I: 08, 27, 28 (finding 013).
  - Four exam-pool items replicate study material (finding 012): x3-03 = pre1; x3-05 = the lesson's worked example; x3-17 = far-rev1-24; x3-04 ≈ far-rev2-01.
  - "Binary bonus → most likely amount" is tested by 01, 21 and x3-04, plus a lesson example and fc1. That is at the limit, and acceptable.
  - The returns rule is tested by 03, x3-17 and far-rev1-24, plus a lesson example.
- **TBS.** r3 is structurally a copy of far-tbs-u9-bundle's Contract 1, and the module has no journal-entry TBS part (finding 018). u9-construction is sound: a good loss-year design, the research excerpt is the best citation, and 18 minutes is generous but fine.
- **Routing misses to the lesson.** Not checked; this is the app review's scope.

## (d) No issues found

`far-rev2-chk1`, `far-rev2-02`, `far-rev2-04`, `far-rev2-05`, `far-rev2-06`, `far-rev2-09`, `far-rev2-10`, `far-rev2-14`, `far-rev2-18`, `far-x3-25`, `far-rev2-fc1`, `far-rev2-fc3`, `far-rev2-fc4`, `far-rev2-fc5`, `far-rev2-fc6`, `far-rev2-fc7`, `far-tbs-u9-construction`.

## (e) Needs expert verification

- **Finding 004 (installation over time vs. point in time).** I am confident that 606-10-25-27(b) supports "over time" for installation on customer-controlled equipment. Whether the platform should accept "point in time" as well is a policy call. Confidence medium.
- **Finding 003 (analysis labels).** This rests on the reconstructed Blueprint note that FAR revenue is R&U/Application only. The official PDF was not fetched (see the caveats in review/reference/blueprint-notes.md). Confidence medium.
- **Finding 009 (far-rev2-26).** The paragraph numbers for ASC 606 Example 49 (the discount voucher) are from memory. The rule in 606-10-55-44 is not in doubt.

## (f) Could not check

- App behavior (routing of misses, rendering of the faded/mermaid blocks, TBS scoring display). Out of scope for this batch.
- Exact Blueprint task wording for FAR-III.C. The official PDF is blocked; the reconstructed CSV was used.
