# Notes — batch M-far-nfp-statements (FAR, `far-nfp-statements`)

Scope: 1 lesson, 3 lesson-pool MCQs, 28 practice MCQs, 1 exam MCQ (`far-x1-26`, on `far-mock-2`), 7 flashcards. No TBS in this batch.
Findings: 17 (S1 0, S2 1, S3 15, S4 1). Web searches used: 0 of 3. The reference sheet (`far-standards.md` row "ASC 958 NFP") and settled ASU 2016-14 / ASC 230 rules covered everything.

## (a) Blind vs. key

I answered all 32 MCQs blind (`blind-answers.csv`). **All 32 agree with the keys**, so there were no disagreements to resolve.

| id | my answer | key | resolution |
|---|---|---|---|
| (none) | — | — | 32/32 agree. Computations recomputed: nfs-03 30,000; nfs-06 720,000; nfs-12 160,000; nfs-19 +50,000; nfs-26 +90,000. |

## (b) Lesson design

- **Big idea.** It is clear and well motivated (no owners, accountability to donors). The truck example says the restriction is released "when it spends the money", which conflicts with the body's placed-in-service rule (finding 016).
- **Pre-question.** `far-nfs-pre1` (board-designated endowment → without donor restrictions) primes the module's most common classification trap. It does not prime the central mechanic, release by reclassification with expenses always in the without-restrictions class. A second pre-question on that would help.
- **Body.**
  - Recomputed the worked example (590,000 − 580,000 = +10,000; 150,000 − 90,000 = +60,000; total +70,000).
  - Recomputed the faded example (2,500,000; 1,150,000; 3,650,000). Both are correct.
  - The JE balances (200,000 / 200,000).
  - Statement table, two-class model, placed-in-service rule, joint-cost criteria, direct-method no-reconciliation rule and cash-flow classification (long-term restricted gifts are financing; ASC 230-10-45-21A donated financial assets) are all correct and current (ASU 2016-14, effective 2018; long testable).
- **Takeaways.** They are accurate. "Investment return net of external and direct internal investment expenses" appears only here, never in the body (finding 015).
- **Inline checks.** chk1 (release) and chk2 (expense analysis) are well placed.
- **Minutes (16).** The file is about 1,240 words including frontmatter, about 900 in the body. That is roughly 6–7 minutes of reading, plus about 8–10 minutes for the JE, worked and faded examples, the mermaid diagram, 2 checks and 1 pre-question. 16 is realistic.
- **Lesson–item alignment.** These items test material the lesson never teaches:
  - `far-nfs-09`: the rule that a restriction is released when both restricted and unrestricted resources are available (finding 014; the worked example's wording even suggests the opposite).
  - `far-nfs-20`, `far-nfs-24`, and the `far-nfs-08` explanation: UPMIFA classification of endowment return until appropriated (finding 015).
  - `far-nfs-17`, `far-nfs-23`: the term "quasi-endowment" (the lesson says only "board-designated endowment").
  - `far-nfs-05`, `far-nfs-28`, `fc6`: net investment return, which appears in the takeaways only.
  - `far-nfs-06`: an availability computation. The lesson describes liquidity only qualitatively (S4, finding 017).
  - `far-nfs-10`: "fund balances by fund" as a governmental concept (trivial, acceptable).
- **Sequencing.**
  - The module precedes `far-nfp-revenue`. The lesson, `far-nfs-01` (time-restricted gift) and `far-nfs-06` (pledge receivable) lightly assume contribution and pledge concepts taught in the next module. This is acceptable at this depth, but a one-line forward reference would help.
  - The prerequisite `far-cash-flows` (indirect method) comes earlier in the order. Good.

## (c) Practice design

- **Counts.** 28 practice MCQs plus 1 exam MCQ, which is adequate for the topic. About 8 of them are redundant (findings 005–009, 012).
- **Labeled difficulty** (practice + exam): 1 = 4, 2 = 11, 3 = 14.
- **Progression.** The "hard" tail (far-nfs-17, 20–28) is mostly one-fact recall labeled analysis/3. The apparent easy→hard progression is an artifact of the labels: the real difficulty peaks at nfs-06, -09 and -12 and then falls.
- **Skill mix.**
  - As labeled: analysis 13, application 12, remembering 4.
  - After findings 001 and 002: analysis 3 (nfs-06, -09, -12; about 10%), application 14, remembering 12 (about 41%).
  - The FAR targets are R&U 5–15%, Application 45–55% and Analysis 35–45%, so the module is recall-heavy and analysis-light.
  - The analysis-level NFP work currently lives only in the separate TBS (`far-tbs-u4-nfp`, `far-tbs-x1-nfp`, not in this batch). New analysis MCQs would help: correct a draft statement of activities, a liquidity table or a draft SCF.
- **Redundancy clusters:**
  - board designation: pre1, 17, 23, plus distractors in 01 and 08
  - liquidity: 14 and 27, which are verbatim duplicates
  - investment return: 05, 28
  - change in net assets without donor restrictions: 03, 19, 26
  - release: chk1, 16, x1-26, plus far-nfr-27 and far-x1-16
  - required statements: chk2, 10, 21, plus fc1
  - placed in service: nfs-02, far-nfr-12 and fc4 (cross-module; 2 MCQs; not filed separately)
- **Routing.** All items carry `moduleId: far-nfp-statements`, so misses route back to this lesson. The UPMIFA, quasi-endowment and both-available rules are not in it, so the routed learner will not find the answer there.

## (d) Items with no issues found

far-nfs-chk2, far-nfs-03, far-nfs-04, far-nfs-07, far-nfs-09 (item fine; the lesson gap is filed against the lesson), far-nfs-10, far-nfs-11, far-nfs-12, far-nfs-13, far-nfs-fc1, far-nfs-fc2, far-nfs-fc3, far-nfs-fc4, far-nfs-fc5, far-nfs-fc6, far-nfs-fc7.

## (e) Needs expert verification

- Exact ASC paragraph numbers, which are from memory. Each paragraph's content is settled; only its number is unconfirmed.
  - Placed-in-service: ASC 958-205-45-12.
  - The rule for expenses when both restricted and unrestricted resources are available: cited only as ASC 958-205-45.
  - UPMIFA endowment-return classification: ASC 958-205-45.
  - Expense analysis: ASC 958-720-45-15, as cited by far-nfs-13.
- Finding 013 (`far-nfs-06`): this finding has medium confidence. It assumes the unstated $300,000 of investments could include unappropriated endowment return or illiquid holdings. An expert may judge the stem's "of which $600,000 is perpetual endowment corpus" sufficient at CPA level.
- `far-nfs-chk2` says the expense analysis has "no direct counterpart for business entities". That is true for the 2026 window. ASU 2024-03 (PBE expense disaggregation, effective for annual periods beginning after 12/15/2026) will create a partial counterpart once it becomes testable (not before 2027). Not filed. Note that REVIEW.md says `far-income-statement-oci` already teaches ASU 2024-03, so a learner may notice the tension.

## (f) Not checked, and why

- No TBS files are in this batch. The NFP TBS (`far-tbs-u4-nfp`, `far-tbs-x1-nfp`) belong to other batches.
- I did not check app behavior (rendering of the mermaid, `je`, `worked` and `faded` blocks), because the app itself is reviewed separately.
- Across content, I checked the cross-module duplicates and contradictions against `far-nfp-revenue` questions, `far-exam-area1`, the glossary and `far-high-yield.md`. I found no rule contradictions, apart from the terminology issue in `far-nfs-18` (finding 003).
