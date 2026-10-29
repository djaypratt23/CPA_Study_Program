# M-far-impairment — reviewer notes

Module `far-impairment` (FAR-II, unit far-u6): 44 items (1 lesson, 3 lesson MCQs, 31 practice MCQs, 2 exam MCQs, 6 flashcards, 1 TBS). 19 findings: S1 0, S2 2, S3 14, S4 3. Web searches used: 2 of 3.

## (a) Blind vs. key

All 36 MCQ keys and all 7 TBS cells matched my blind answers (`blind-answers.csv`). There were no disagreements.

| id | my answer | key | resolution |
|---|---|---|---|
| all 36 MCQs | = key | = blind | agree |
| far-tbs-u6-impairment eq / bl / rl / tn / gw | 350,000 / 0 / 80,000 / 0 / 800,000 | same | agree |
| far-tbs-u6-impairment je | Dr Impairment loss 350,000; Dr Acc. dep. 600,000; Cr Equipment 950,000 | same | agree (balances 950,000 = 950,000) |
| far-tbs-u6-impairment res | b (ASC 360-10-35-17) | b | agree |

I reproduced every numeric distractor in python. Rationales that name the wrong error, or none: far-imp-13(d), finding 005, where no rule-based error produces $200,000. The "Not the computation." explanations are in finding 004. Trap-label mismatches are in finding 006.

## (b) Lesson design

- **Big idea:** clear ("undiscounted cash flows decide WHETHER, fair value decides HOW MUCH"). The example is realistic.
- **Pre-question:** far-imp-pre1 primes the most important trap (recoverable despite FV < CA). Good. There is only one, with none for held for sale or goodwill. That is acceptable.
- **Body:** a mermaid "which test" map, held-and-used indicators, a worked two-step example (recomputed: 900,000 > 850,000, so not recoverable; loss = 200,000), a trap callout, a short indefinite-lived section, a goodwill section with a faded example (recomputed: 600,000; 600,000; capped at 1,200,000), the private-company alternative, and a reversal table.
- **Gaps:**
  - There is no held-for-sale body section (classification criteria, worked write-down or recovery).
  - Asset groups and pro-rata allocation are not covered (far-imp-17).
  - Abandonment is not covered (far-imp-21). See finding 013.
  - "Public business entities (ASU 2017-04)" understates the scope of ASU 2017-04 (finding 014).
  - The IFRS "common comparison question" note is outdated (finding 015).
- **Takeaways and inline checks:** the takeaways are accurate and match the body. chk1 (with a PV distractor) and chk2 (reversals) are good placements. chk2 has a length/qualifier cue (finding 007).
- **Minutes:** the lesson is about 620 body words plus about 380 frontmatter words, 1 worked and 1 faded block (3 inputs), 2 checks, 1 pre-question and 1 diagram. 16 minutes is realistic.
- **Lesson–item alignment:** these items test material the lesson never teaches:
  - far-imp-17: group loss allocation.
  - far-imp-21: an asset to be abandoned.
  - Held-for-sale items far-imp-06, -12, -26 and -28 are supported only by the takeaways, flowchart and table.

  Everything else is taught.
- **Sequencing:** the lesson relies on goodwill, reporting units and indefinite-lived intangibles, which are defined only in the next module, far-intangibles (finding 016).
- **Scope:** about half of the lesson and its items (indefinite-lived intangibles and goodwill) is BAR content and mostly not marked optional (finding 001).

## (c) Practice design

- **Counts:** 31 practice MCQs, 2 exam MCQs and 1 practice TBS. That is adequate, even heavy, for a single PP&E topic.
- **Difficulty (practice + exam, 33 items):** d1 9, d2 11, d3 13. The order runs easy to hard by label, but not in substance: items 22–31 are all labeled analysis/3, yet several are trivial (27 "No reversal"; 31 "200,000 − 170,000").
- **Skill mix as labeled:** R 9 (27%), A 13 (39%), An 11 (33%).
- **Skill mix after my relabeling (findings 002 and 003):** R 14 (42%), A 19 (58%), An 0.
- **Against FAR targets (R 5–15%, A 45–55%, An 35–45%):** the module is recall-heavy and has no genuine analysis-level item. The TBS is application.
- **Redundancy:**
  - Held-and-used two-step: 8 MCQs (finding 009). far-x2-10 is a clone of far-imp-24 (finding 010).
  - Goodwill cap: 6 MCQs (finding 011).
  - No-reversal: 11 and 27 (finding 012).
- **Routing:** the TBS lists far-impairment first in moduleIds, so misses route back here. That is correct.

## (d) Items with no issues found

far-imp-pre1, far-imp-chk1, far-imp-02, far-imp-06, far-imp-08, far-imp-09, far-imp-10, far-imp-12, far-imp-fc1, far-imp-fc2, far-imp-fc5.

The TBS arithmetic, JE and research key are all correct. Its only findings concern scope (001) and the design of its research distractors (017).

## (e) Needs expert verification

- **Finding 001 (FAR vs. BAR scope of goodwill and indefinite-lived intangibles).** The reference sheet marks this `conflict`: Becker and the blueprint notes say BAR, while docs/BLUEPRINT_NOTES.md says FAR "intangibles (incl. goodwill)". My search found BAR-labeled goodwill-impairment material (SuperfastCPA, BAR content area 2) and FAR-labeled finite-lived material, but not the AICPA PDF. The P2-2 decision already treats goodwill as off-Blueprint, so at minimum the flags must be made consistent.
- **Finding 015 (IFRS no longer tested).** Supported by the Journal of Accountancy (Nov 2020) and Surgent (July 2021 Blueprint). The AICPA PDF was not seen directly.

## (f) Not checked

- I did not check the app rendering of `$     0` (far-x2-29, finding 018) in a browser. The finding rests on default HTML whitespace collapsing.
- Item statistics (p-values) are unavailable because the repo has no learner data.
- I did not read the exact ASC paragraph text, since fasb.org is blocked. The paragraph numbers cited by the items (360-10-35-17, -20, -28, -43, 45-4; 350-20-35-3A, -8, -28) agree with my knowledge of the Codification.
