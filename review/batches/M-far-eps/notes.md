# M-far-eps — reviewer notes

Scope: 47 manifest items (1 lesson, 3 lesson MCQs, 28 practice MCQs, 5 exam MCQs, 8 flashcards, 2 TBS). Blind answers saved to `blind-answers.csv` before `items.json`, `cues.md` or the TBS files were opened. Findings: 12 in total (S1 0, S2 1, S3 10, S4 1).

## (a) Blind vs. key

All 35 MCQ keys and all 17 TBS cells (11 in `far-tbs-u2-eps`, 6 in `far-tbs-x1-eps`) **matched my blind answers**. There were no disagreements to resolve.

| id | my answer | key | resolution |
|---|---|---|---|
| (none) | — | — | All keys agree. Every number was recomputed in python (see `blind-answers.csv`). |

Recomputed checkpoints:
- far-x1-07: 940,000 / 269,500 = 3.4879, rounds to 3.49.
- far-x1-08: 545,000 / 120,000 = 4.54.
- far-tbs-u2-eps: weighted average 190,500. Basic 775,000 / 190,500 = 4.0682, rounds to 4.07. Options add 5,000 shares; interest add-back 60,000. EPS after options is 3.964, which is above the bonds' 3.00 incremental EPS, so the bonds are dilutive. Diluted 835,000 / 215,500 = 3.8747, rounds to 3.87.
- far-tbs-x1-eps: weighted average 440,000; income 1,150,000; basic 2.6136, rounds to 2.61. Options add 10,000 shares; interest add-back 47,400 (1.185 per share). Diluted 1,197,400 / 490,000 = 2.4437, rounds to 2.44.
- Every distractor number was also reproduced. Rationales that do not reproduce their number are in finding 004.

## (b) Lesson design (`far-eps`)

- **Big idea:** clear and well motivated. The $10M / 10M-share example works. "Worst case" is a fair gloss on diluted EPS, given that the lesson later adds that only dilutive securities count.
- **Pre-question (pre1):** primes the retroactive treatment of stock splits, which is a good counter-intuitive hook. The body teaches it, the worked example applies it, and it is a key takeaway. Its labels (application, calc) are appropriate.
- **Body:** technically correct throughout. I recomputed the worked example (200,000 + 30,000 − 2,500 = 227,500) and every step of the faded example (440,000; 2.20; 5,000; 37,500 at 1.25 per share, dilutive; 477,500 / 235,000 = 2.03). The preferred-dividend table, the treasury stock method formula with the average price, the if-converted table, the ranking flowchart and the presentation bullets all agree with ASC 260. The faded-step tolerances are fine: schema default 0.5 for whole-number answers, 0.01 for EPS.
- **Takeaways:** accurate and match the body.
- **Inline checks:** chk1 (noncumulative, undeclared) and chk2 (antidilutive convertible preferred) fit their placement.
- **Minutes:** about 726 words of body text, plus a timeline, worked example, flowchart, 5-step faded example and 3 inline questions. 20 minutes is realistic, perhaps slightly generous.
- **Gaps (finding 007):** no control number (income from continuing operations), no loss rule, no contingently issuable shares. The treasury stock method also omits unrecognized compensation cost (S4, finding 012, via the TBS). There is no worked or faded example of a security issued or converted mid-year.
- **Lesson–item alignment.** Items that test something the lesson never teaches:
  - **far-eps-14**: control number / loss from continuing operations.
  - **far-eps-15**: contingently issuable shares.
  - **far-eps-07**: partly. The scope "or filing to become public" is not in the lesson, which says only "public entities".
  - **far-eps-11**: partly. Choice (c)'s rationale says "cash flow per share not permitted", which the lesson does not mention; minor.
  - far-eps-21 (business-combination shares weighted from the acquisition date) follows from the general weighting rule, so that is acceptable.
- **Sequencing (finding 008):** EPS sits in far-u2, but treasury stock, stock dividends and splits, and cumulative preferred are taught in far-equity (far-u8, later). Convertible bonds are taught nowhere else. No prerequisite metadata exists in the schema; the module order in `far.yaml` is the only sequencing signal.

## (c) Practice design

- **Counts:** 28 practice MCQs, 5 exam MCQs, 3 lesson MCQs, 1 practice TBS and 1 exam TBS. The volume is ample for one module.
- **Labeled difficulty (practice):** 1 ×3, 2 ×11, 3 ×14. The real spread is easier. Items 22–29 are one-step computations tagged difficulty 3 (finding 002). Item order is not easy→hard: remembering items 07, 11 and 12 sit at positions 6, 11 and 12, and the easiest computations come last.
- **Labeled skill (practice):** remembering 3, application 12, analysis 13 (46%). After the relabels in findings 001 and 002, the split is roughly remembering 6, application 18, analysis 4 (about 14%). Genuine analysis items are scarce compared with the FAR Blueprint's 35–45%. Finding 006 proposes multi-security, mid-year and conversion scenarios.
- **Redundancy (finding 005):** six later items duplicate earlier ones. Item 27 duplicates the lesson's faded example numbers.
- **Explanations:** items 01–16 and the exam items are good: rule, computation and a reproduced distractor error. Items 17–29 are thin (finding 003).
- **Answer-letter balance:** practice a8 / b8 / c6 / d6, which is fine.
- **Exam pool:** the five MCQs are solid, realistic and well explained.
- **TBS:** both are correct, internally consistent and fairly scored, with per-row credit (`src/lib/tbsScoring.ts`). Exact-integer share rows use tolerance 0 in u2 and the default of 1 in x1; EPS rows use 0.01. Rounding is unambiguous in both. Minutes (20 each) are realistic, and "application" is a fair skill label. far-tbs-u2-eps has a dropdown option ("Not applicable") that is never correct, which is acceptable as a distractor.
- **Cross-module consistency:** EPS statements in far-subsequent-events (retroactive splits after year-end), far-income-statement-oci (far-iso-21, discontinued-operations EPS on the face or in the notes), far-equity ("treasury shares excluded from EPS"), the glossary, far-formulas.md and far-high-yield.md all agree with this module. No conflicts were found.

## (d) Items with no issues found

far-eps-pre1, far-eps-chk1, far-eps-chk2, far-eps-03, far-eps-05, far-eps-07, far-eps-11, far-eps-12, far-eps-13, far-eps-14, far-eps-19, far-x1-07, far-x1-22, far-tbs-x1-eps, far-eps-fc1, far-eps-fc2, far-eps-fc3, far-eps-fc4, far-eps-fc5, far-eps-fc6, far-eps-fc7, far-eps-fc8.

Minor observations that did not merit findings:
- far-eps-14 and far-eps-15 test content outside the lesson; this is reported against the lesson in finding 007.
- fc7 combines two facts (antidilution and sequencing), but it is still clear.
- In far-eps-13 and far-eps-16, the item-level explanation omits numbers that the correct choice's rationale gives.

## (e) Needs expert verification

1. **FAR vs. BAR placement of EPS (module scope).** `review/reference/far-standards.md` §1c marks EPS as `conflict`: Becker lists "public company reporting" as moved to BAR. My one search found only secondary sources placing EPS in FAR Area I ("Public company reporting topics"): https://eduyush.com/blogs/cima/earnings-per-share-basic-diluted-cpa-far-guide and https://www.superfastcpa.com/?p=93561 (FAR practice questions on basic and diluted EPS). My own recollection of the 2024+ FAR Blueprint also lists EPS under Area I public company reporting topics. I therefore did not raise a scope finding. If the official 2026 Blueprint PDF puts EPS only in BAR, the whole module should be marked `optional`.
2. **ASU 2025-12** (Codification Improvements, issued 12/17/2025) clarifies diluted EPS when there is a loss from continuing operations. Per the reference sheet it becomes eligible for testing on 1/1/2027, so it is not tested in 2026. far-eps-14 reflects current ASC 260-10-45-18 to 45-20, and its key should be unaffected. Someone with the ASU text should confirm the clarification does not change the answer, and decide whether to add a "coming in 2027" note.
3. **ASC paragraph numbers** cited in findings were given from memory: 260-10-45-29 (unrecognized compensation cost in assumed proceeds) and 260-10-45-48 (contingently issuable shares; this one is also cited by item 15 itself). The rules are long-settled; only the paragraph pins should be confirmed.

## (f) Could not check

- The official AICPA 2026 FAR Blueprint PDF (fetch blocked), so representative-task wording and skill levels for EPS were not seen first-hand.
- In-app rendering of the lesson blocks and TBS (app usability is reviewed separately).
- Search budget: 1 of 3 searches used.
