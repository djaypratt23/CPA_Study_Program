# M-far-intangibles: reviewer notes

Scope: the lesson, 3 lesson MCQs, 29 practice MCQs, 2 exam MCQs and 6 flashcards (41 ids). The batch has no TBS. There are 18 findings: S1 0, S2 5, S3 11, S4 2.

## (a) Blind answers vs. keys

All 34 MCQ blind answers match the keys.

| id | My answer | Key | Resolution |
|---|---|---|---|
| far-int-01 | d | d | Agree on the key. In the blind pass I flagged that (b) $162,000, which capitalizes the logo design costs, is defensible under textbook treatment (Kieso), and that the stem never states an intent to renew. Recorded as finding 001 (S2, medium confidence). |
| All other MCQs | = key | — | No disagreement. Every numeric distractor was reproduced in Python. The ones I could not reproduce, or whose rationale names the wrong error, are in findings 010 and 011. |

## (b) Lesson design

- **Big idea.** It is clear and well chosen: purchased intangibles are recognized and internal ones are expensed, and amortization depends on whether the life is finite. The beverage-trademark example lands the idea.
- **Pre-question.** There is one, far-int-pre1: an internally built brand gives $0. It primes the central "purchased vs. internally developed" distinction well. Nothing primes the goodwill residual or software, but one pre-question is enough for a 16-minute lesson.
- **Body.**
  - The acquisition table, the finite/indefinite flowchart and the asset table are accurate.
  - Worked example 1 recomputes: 180,000 ÷ 12 = 15,000; carrying amount 150,000 + 24,000 = 174,000; ÷ 10 = 17,400.
  - The goodwill faded example recomputes: 3,100,000 − 900,000 = 2,200,000, so goodwill is 300,000; at a $2,000,000 price, −200,000, a bargain-purchase gain.
  - The cloud-computing example recomputes: 20,000 + 30,000 = 50,000 expensed; 150,000 capitalized; ÷ 5 = 30,000; total expense 90,000.
  - The ASU 2025-06 note is current: effective for annual periods beginning after 12/15/2027, testable from 1/1/2028, so the stage model is still the tested rule.
  - Minor issues: data conversion is placed in the post-implementation stage (finding 017), and the citations list is incomplete (finding 018).
- **Takeaways.** Accurate. "Goodwill is not amortized by public companies" hints at the private-company alternative without teaching it (finding 008).
- **Inline checks.** chk1 (shorter of legal and useful life) and chk2 (purchased vs. expensed costs) fit their sections.
- **Minutes.** 16 is realistic. The body is about 1,000 words and the frontmatter text shown (big idea, takeaways) about 370, roughly 7 minutes of reading. Add 1 mermaid chart, 2 worked examples, 1 faded example with 3 inputs, 2 checks and 1 pre-question, about 8–9 minutes.
- **Lesson–item alignment.** These items test things the lesson never teaches:
  - far-int-17, -18, -25 and far-x2-22: software to be sold (ASC 985-20), technological feasibility and greater-of amortization (finding 006)
  - far-int-19: IPR&D acquired in a business combination (finding 006)
  - far-int-28: R&D equipment with alternative future uses (finding 006)
  - far-int-16, -27, -09 and far-x2-11: the private-company goodwill alternative, reporting-unit testing and the one-step impairment. These are taught in the earlier far-impairment module but routed here (finding 008).
  - far-int-21: asset-acquisition relative fair value. Taught in the earlier far-ppe-acquisition module, which is acceptable.
- **Sequencing.** Prerequisites are satisfied. far-impairment comes before far-intangibles in unit far-u6, and the lesson defers to it correctly. Nothing relies on a later module.

## (c) Practice design

- **Count.** 29 practice MCQs plus 2 exam items, which is adequate. In-scope finite-lived coverage is thinner once the BAR-scope items are set aside (findings 004, 005, 007).
- **Difficulty as labeled** (practice + exam): 1 = 8, 2 = 9, 3 = 14. Every item from far-int-18 to -29 carries difficulty 3 and skill analysis, whatever its content (findings 002, 003). On my judgment, most of 22–29 are difficulty 1.
- **Progression.** The order is not easy-to-hard. 02 (difficulty 3) comes second, and difficulty-1 recall items (12, 13, 14, 16) sit between calculation items.
- **Skill mix.**

  | | Remembering | Application | Analysis |
  |---|---|---|---|
  | As labeled | 8 (26%) | 10 (32%) | 13 (42%) |
  | Re-labeled by this review | 12 (39%) | 17 (55%) | 2 (6%) |
  | FAR target | 5–15% | 45–55% | 35–45% |

  The module is recall-heavy, and the labels hide that. It needs genuine analysis items, such as an intangibles roll-forward or reconciling an amortization schedule.
- **Redundancy.** 20/23 and 10/15 are near-clones. No item tests carrying amount at a date, a change in estimated life, or purchased-software or cloud-computing amortization (finding 014).

## (d) Items with no issues found

far-int-pre1, far-int-chk1, far-int-02, far-int-08, far-int-14, far-int-fc1, far-int-fc3.

## (e) Needs expert verification

- **far-int-01 (finding 001).** Do current CPA-review and textbook authorities capitalize the design costs of an internally developed trademark? The search results conflict. The proposed fix removes the ambiguity either way.
- **FAR vs. BAR placement (findings 004, 005, 007).** Where do goodwill, business combinations, indefinite-lived intangibles, R&D and internally developed software belong? The reference sheets say BAR: blueprint-notes II.F reads "Finite-lived only". docs/BLUEPRINT_NOTES.md lists "intangibles (incl. goodwill)" in FAR Area II, and REVIEW.md P1-7 deliberately re-added software as FAR. This needs the official 2026 FAR and BAR Blueprint PDFs.

## (f) Not checked, and why

- **Official Blueprint task wording for FAR Area II.F and BAR.** The AICPA PDFs are blocked by the egress proxy. Two web searches were used (scope and the trademark-design question); one of the 3 budgeted searches is unused.
- **App behavior.** Miss routing in the UI, and how optional items are excluded from far-mock-2, were not run. They were inferred from moduleId and from REVIEW.md P2-2. Usability is reviewed separately.
- **ASC paragraph numbers** in the fixes are from memory, not re-read in the Codification. Examples: 350-40 data conversion, 985-20-35-1, 350-30-35-17A.
