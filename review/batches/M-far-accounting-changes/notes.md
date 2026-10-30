# Notes: M-far-accounting-changes (FAR, far-u12, Area III.A)

Reviewer pass on 2026-10-30. Blind answers are in `blind-answers.csv`, saved before any key was opened. There are 17 findings in `findings.jsonl` (S1 0, S2 3, S3 11, S4 3).

## (a) Blind vs. key

All 34 MCQ keys matched my blind answers. So did every TBS cell: both dropdown sets (12 rows), all 7 numeric rows, and both journal entries.

| id | my answer | key | resolution |
|---|---|---|---|
| (none) | | | No disagreements. Arithmetic re-checked in python: 37,500; 6,000; 60,000; 79,000; 15,800; 36,000; 12,000 (DDB→SL); 17,778 (SYD 8/36); 12,000; 28,000; 164,000; 30,800; 60,000; 120,000; 64,000; 16,000; 1,324,000. Both journal entries balance (40,000 = 40,000; 80,000 = 16,000 + 64,000). |

Nuances I noted in the blind pass that became findings:
- far-chg-26: the scenario, beginning to consolidate a former equity-method investee, is normally a business combination.
- far-chg-23 and far-x3-29: which date's retained earnings is adjusted.
- far-tbs-u12 r4: "new buildings" wording.

## (b) Lesson design

- **Big idea → pre-question → body → takeaways → checks.** The big idea (comparability: principles retrospective, estimates prospective, errors restated) is clear and well motivated. The pre-question far-chg-pre1 primes estimate-vs-principle, the central distinction, though it duplicates practice item far-chg-15. The two inline checks hit the two key traps: non-GAAP→GAAP is an error, and principle changes are retrospective. The six takeaways match the table.
- **Accuracy.** The worked example (50,000 × 0.75 = 37,500; 8,000 × 0.75 = 6,000) and the faded example (−30,000; 40,000) are correct.
  - The faded example's tax entry needs a stated assumption (S4).
  - The table's "completed-contract policy change under a new standard's transition" example is misleading: new-ASU transition rules are missing (S2).
  - The flowchart has no path for a change in reporting entity (S4).
- **Minutes.** The file is about 950 words, with about 600 words of prose plus 1 table, 1 flowchart, 1 worked example, 1 faded example, 2 checks and 1 pre-question. At 16 minutes that is realistic, perhaps slightly generous.
- **Lesson–item alignment.** These items test content the lesson never teaches:
  - far-chg-08, far-chg-14, far-chg-28: impracticability → earliest date practicable or prospective, and the LIFO base layer. The lesson only mentions this in a takeaway.
  - far-chg-04(b) and far-chg-26: a business combination is not a change in reporting entity.
  - far-chg-18: correcting entry with the current year still open.
  - far-chg-19, far-chg-22, far-chg-24, far-x3-13 and the TBS depreciation rows: the computations after a change in estimate or method are not shown in this lesson. They are taught in the prerequisite far-depreciation lesson ("Changes in estimate" worked example), so this is acceptable.
  - far-chg-06, far-chg-13, far-chg-25: inventory error mechanics are taught in the prerequisite far-inventory-valuation. This lesson mentions counterbalancing only briefly.
- **Sequencing.** The lesson relies on inventory cost flows (u5), depreciation (u6), net-of-tax and deferred taxes (far-income-taxes, u10) and consolidation concepts (u3). All of these come earlier in far.yaml, and nothing depends on a later module.

## (c) Practice design

- **Counts.** 28 practice MCQs, 3 exam MCQs, 3 lesson MCQs, 2 practice TBS and 6 flashcards. That is ample for a ~5% Blueprint topic.
- **Difficulty (practice).** 1: 5, 2: 7, 3: 16. This is inflated (finding 006). Progression is roughly easy→hard: items 19–28 are all difficulty 3, but some of them (26, 27, 28) are among the easiest items in the module.
- **Skill mix (practice + exam, as labeled).** R 4, App 13, Ana 14, which looks like 13 / 42 / 45% against FAR's targets of 5–15 / 45–55 / 35–45%. As relabeled in findings 004 and 005, it is about R 9 / App 17 / Ana 5. Real analysis-level coverage (FAR-III.A.5, "detect, investigate, correct errors") is thin: only far-chg-06, far-chg-09, far-chg-18, far-chg-23 and far-chg-25 qualify, and neither TBS has a review or docreview part.
- **Redundancy.** Several near-duplicate pairs (finding 010): cash→GAAP is tested 6 times, counterbalancing inventory 5 times including far-inventory-valuation, and the useful-life computation 7 times including far-depreciation. Gaps that the freed slots could cover: new-ASU transition provisions, change-in-estimate disclosure, partial impracticability, and EPS restatement disclosure.
- **The two TBS overlap heavily.** Both classify the same five change types and both compute a useful-life revision. Consider giving one of them a review part (a prepared restatement schedule) for analysis-level work.
- **Routing.** Misses route back via moduleId `far-accounting-changes` on every item. The app behaviour itself was not exercised (reviewed separately).

## (d) Items with no issues found

far-chg-chk2, far-chg-01, far-chg-02, far-chg-03, far-chg-04, far-chg-05, far-chg-06, far-chg-08, far-chg-09, far-chg-11, far-chg-12, far-chg-18, far-chg-20, far-x3-13, far-x3-21, far-chg-fc1, far-chg-fc2, far-chg-fc3, far-chg-fc4, far-chg-fc5.

I judged these cues.md flags not material:
- far-chg-05: the key repeats "3%"/"current", but distractors (a) and (c) are plausible.
- far-chg-06 and far-chg-13: the key is shortest ("No entry is required" / "None").
- far-chg-chk2, far-chg-11, far-chg-24, far-chg-25, far-chg-27, far-chg-28: the key is longest only marginally.
- Absolutes appear only in "no adjustment" or "disclose only" distractors, which is the standard wrong-rule form.

## (e) Needs expert verification

- **far-chg-26 (finding 003, medium confidence).** I am confident of the ASC 250-10-20 exclusion (business combination and VIE consolidation are not reporting-entity changes). An expert should confirm the preferred rewrite.
- **far-tbs-u12-changes r4 (finding 015, low).** Is applying DDB only to newly acquired buildings an accounting change at all? The key is the best option offered either way.
- **far-chg-16 and far-chg-27 (no finding filed).** The classic exam answer, cash basis → GAAP = error correction, is kept. However, far-special-purpose teaches cash basis as an acceptable special purpose framework. If the prior statements were properly labeled SPF statements, a switch to GAAP is a change in framework, not an "error in previously issued financial statements". far-chg-16 says "for its first audited statements", meaning no previously issued GAAP statements. An expert may want the stem to say the prior statements purported to be GAAP.
- **ASC paragraph numbers.** I cited these from memory: 250-10-45-3, 45-5, 45-6/45-7, 45-8, 45-17 to 45-20, 45-21, 45-23, 50-1, and 805-10-25-9/25-10. The reference sheet marks ASC 250 as `from-memory` too. No web searches were used.

## (f) Not checked, and why

- **App behaviour.** I did not check the rendering of the mermaid, worked, faded and check blocks, the TBS UI, or miss routing. The app is reviewed separately.
- **Web search.** None was needed. ASC 250 has had no amendments in the 2026 testing window (reference sheet Part 2 lists none), and the reference sheet covers the rest.
- **taxYear.** None is set and none is needed: this is FAR, and the items use generic 21% and 25% rates.
