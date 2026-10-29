# Notes: M-far-revenue-contracts (Revenue I: contracts & performance obligations)

Reviewer pass on 2026-10-07 for the 2026 FAR exam. The batch has 44 items: 1 lesson, 3 lesson MCQs, 28 practice MCQs, 4 exam MCQs, 6 flashcards and 2 TBS.

There are 24 findings: S1 0, S2 4, S3 17, S4 3. No answer key is wrong.

## (a) Blind answers vs. keys

All 35 MCQ keys and all 19 TBS rows match my blind answers (`blind-answers.csv`). I flagged two items in the blind pass as having a second defensible answer. Both became findings.

| id | My answer | Key | Resolution |
|---|---|---|---|
| far-rev1-20 | c, but (a) also defensible | c | "How **may** it treat" the shipping? Without the ASC 606-10-25-18B election, shipping after control transfers is a promised service, so (a) "separate obligation" is also permitted. Finding 001 (S2): reword the stem around the election. |
| far-rev1-chk1 | b, but (a) defensible under 25-7(c) | b | The goods were already shipped and the deposit is nonrefundable. If the company has no further obligation, 606-10-25-7(c) (ASU 2016-12) allows the revenue. The stem never says whether obligations remain. Finding 002 (S2). |
| far-rev1-13 | c (assumes goods SSP = 100,000) | c | The key is right, but the stem omits the goods' SSP. Finding 016 (S3). |
| far-rev1-26 | b (assumes no prior-period profit) | b | The key is right only for the first period. Finding 015 (S3). |
| All other MCQs and TBS rows | same as key | same | Agree. TBS u9: 3 / assurance / over time; 1,080,000, 270,000, 450,000, 1,406,250, 393,750; 13,000, 73,000. TBS x3: S/S/S/Not; 96,000, 16,000, 32,000, 120,000, 24,000. |

## (b) Lesson design

**Big idea.** The transfer-of-control principle is clear. The gym example shows a bundle split well.

**Pre-question.** There is one, far-rev1-pre1, on what triggers revenue: transfer of control vs. risks and rewards. It primes the core concept well, and its risks-and-rewards distractor is correctly labeled `outdated-rule`. Nothing primes Step 1 (the contract criteria) or principal vs. agent.

**Body.**
- Step 1: the five criteria, the liability treatment, and contract combination. The "criteria not met" rule is incomplete: it is missing 25-7(c), the nonrefundable condition on termination, and reassessment (finding 003).
- Step 2: the distinct flowchart and an examples table. The table row for a dealer selling a car with a manufacturer warranty conflicts with chk2's rationale (finding 020).
- Principal vs. agent: the current three indicators are correct (post-ASU 2016-08). The worked example recomputes to 300 − 255 = 45 net.
- Missing entirely: contract modifications and the shipping-and-handling election. Both are Step 1–2 topics, and four items test them.

**Takeaways.** Accurate. They mirror the body.

**Inline checks.** chk1 covers Step 1 but has a stem gap (002). chk2 tests warranties but sits after the principal-vs-agent example. No check covers principal vs. agent, combination or the material right (finding 022).

**Minutes.** The file is about 990 words with frontmatter, about 700 in the body. It has 2 diagrams, 1 table, 1 worked example and 3 MCQs. I estimate 12–16 minutes, so `minutes: 18` is realistic and slightly generous.

**Objectives.** The principal-vs-agent objective is labeled analysis and has no task (finding 021).

**Lesson–item alignment.** These items test material this lesson never teaches:
- Taught in no revenue lesson (finding 004):
  - rev1-12, rev1-18, rev1-22: contract modifications
  - rev1-20: shipping-and-handling election
  - rev1-14, rev1-28: bill-and-hold criteria
  - rev1-16: consignment revenue timing; far-inventory-cost covers only ownership
  - rev1-17: repurchase agreements
  - rev1-19: customer acceptance clauses
  - rev1-15: functional vs. symbolic licenses
- Taught only in the next module, far-revenue-measurement (finding 005):
  - rev1-13 (allocation of a material right), rev1-21 and far-x3-16 (relative-SSP allocation), rev1-24 (returns), rev1-25 (cost-to-cost), rev1-26 (loss provision), rev1-27 (contract costs, ASC 340-40)
- The TBS cover both modules (`moduleIds` lists both), which is fine. far-tbs-u9-bundle's variable-consideration part relies on Revenue II.

**Sequencing.** The section YAML orders far-revenue-contracts before far-revenue-measurement. The lesson itself relies on nothing taught later. The item pool does: 7 items need Revenue II (finding 005). Consignment and bill-and-hold ownership are touched in far-inventory-cost (unit u5, earlier), but the revenue rules are not.

## (c) Practice design

**MCQ count.** 28 practice MCQs, which is adequate in number. About 7 belong to Revenue II, and about 4 are near-duplicates: 12/22, 14/28, chk2/11, and the principal-vs-agent cluster (findings 011, 012). That leaves about 17 distinct Step 1–2 items.

**Difficulty spread** (practice pool): 1 = 4, 2 = 13, 3 = 11. Items 17–28 are all labeled 3, but most are one-step recall or one-step arithmetic. The labels look bulk-assigned (findings 006, 007). Real difficulty is mostly 1–2, so the module has almost no genuinely hard Step 1–2 items: no mixed-indicator principal/agent case, no modification computation, no distinct-in-context judgment with conflicting facts.

**Progression.** The order is 1, 2, 3, 2, 1, 2, 3, 2, 3, 2, 1, 2, 3, 2, 1, 2, then 3 × 12. There is no easy-to-hard progression. The end of the list is "hard" only by label.

**Skill mix** (practice + exam, 32 MCQs, as labeled): remembering 2 (6%), application 16 (50%), analysis 14 (44%). That matches the FAR section allocation (R&U 5–15 / App 45–55 / An 35–45). But FAR Area III.C revenue is R&U and Application only, with analysis-level revenue in BAR. My relabeling (findings 006, 007) gives roughly remembering 13, application 19, analysis 0. A module of this kind should be mostly application. It also suggests the section-level analysis share is overstated wherever this labeling pattern recurs.

**TBS.** Both are application-level. Minutes are 20 (u9, 10 rows) and 25 (x3, 9 simpler rows). 25 is generous but acceptable. Scoring is per row; all tolerances are 0 or 1 on exact integer answers, which is fine. Dropdowns each have one correct option and plausible alternatives. There is no JE, docreview or research part, so those checks don't apply.

**Routing.** Misses on items in findings 004 and 005 route to this lesson, which doesn't teach the rule tested.

## (d) Items with no issues found

far-rev1-pre1, far-rev1-01, far-rev1-02, far-rev1-08, far-rev1-fc1, far-rev1-fc2, far-rev1-fc3, far-rev1-fc4, far-rev1-fc5, far-rev1-fc6.

Every other item has at least one finding, mostly S3 label or rationale issues. Keys and TBS answers are all correct.

## (e) Needs expert verification

- **Blueprint skill scope for revenue.** The claim that FAR Area III.C revenue is tested only at R&U and Application, with analysis-level revenue in BAR, comes from `review/reference/blueprint-notes.md`, where the task text is reconstructed. One web search (UWorld and ipassthecpaexam summaries) confirmed the FAR skill allocation (5–15 / 45–55 / 35–45) but not the per-group skill levels. This affects the rationale for findings 006, 007 and 021, but not the core mislabel: pure recall labeled analysis is wrong under any reading.
- **far-rev1-chk1 (finding 002).** Whether the AICPA would accept the 25-7(c) reading. I'm confident the 25-7(c) event exists; the medium confidence is about how candidates would read "ships goods".
- **far-rev1-05 (finding 019).** That ASU 2016-08 removed the "commission" and "credit risk" indicators from 606-10-55-39. This is from memory and not re-verified by search. Confidence medium.

## (f) Not checked, and why

- I did not run the app. Usability is reviewed separately per the brief, so I didn't verify how lesson-check placement, item routing or TBS scoring render.
- I didn't fact-check the far-revenue-measurement items (another batch). I used them only to spot duplicates and alignment gaps.
- The web search budget was limited to 3; I used 1. I did not search FASB primary text. ASC paragraph citations (606-10-25-7, 25-12/13, 25-18B, 55-39, 55-58C, 55-68, 55-83, 55-86; 605-35-25-46; 340-40-25-1) are from my own knowledge.

Sources used: https://accounting.uworld.com/cpa-review/cpa-exam/blueprints ; https://ipassthecpaexam.com/cpa-far-exam/ (FAR skill allocation only).
