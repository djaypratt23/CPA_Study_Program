# M-far-cash-flows: reviewer notes

The blind answers were saved in `blind-answers.csv` (83 rows) before I opened `items.json` or any TBS file.

## (a) Blind answers vs. keys

All 36 MCQ keys and all 46 TBS cells match my blind answers on substance. Three items need comment:

| id | My answer | Key | Resolution |
|---|---|---|---|
| far-scf-25 | d (510,000), **only after assuming the AR is gross** | d | The key is right for gross AR. The stem doesn't say gross or net, and the lesson's default is net AR, under which (a) 515,000 follows. Stem defect: finding 002 (S2). |
| far-tbs-u1-cash-flows `other.purch` | -100,000 (instructions: "enter decreases in cash as negative numbers") | +100,000, tolerance 0 | The amount agrees. The sign conflicts with the instructions, and the scoring is sign-sensitive, so a student who follows the instructions is marked wrong. Finding 001 (S1). |
| far-tbs-u1-cash-flow-review (17 review rows) | Same rows flagged, same corrected amounts | Same | Agree: CFO 225,000; CFI -115,000; CFF 80,000; net change 190,000, which ties to 75,000 → 265,000. |

## (b) Lesson design

- **Big idea:** clear, with a good accrual-vs-cash example (NI $2M, AR up $3M, so roughly $1M of operating cash used).
- **Pre-question (far-scf-pre1):** primes the most-tested classification trap, interest paid being operating. It's appropriate, but it nearly duplicates far-scf-14.
- **Body:** three buckets with a classification table, then the indirect method (worked example: 150,000 + 40,000 − 12,000 − 10,000 = 168,000 ✓; faded: 100,000 / −1,000 / 99,000 ✓), the direct method, disclosures, and draft review. The review-error table aligns well with the review TBS.
- **Weak spots:**
  - The receivable and bad-debt rules are incomplete in both the direct and indirect methods (finding 003, S2).
  - chk1 is placed before the indirect method is taught (finding 014).
  - The equity-method policy election is missing (finding 013).
  - Some ASU 2016-15 cases and the ASU 2023-09 disaggregation of income taxes paid are not covered (finding 018, S4).
- **Takeaways:** accurate and complete for what the body teaches.
- **Inline checks:** 2. chk2 is well placed.
- **`minutes: 20`:** about 1,340 words including frontmatter (roughly 1,100 in the body), 4 tables, a mermaid diagram, a worked and a faded example, 1 pre-question and 2 checks. That comes to about 8 min reading + 6–8 min for the examples + 2–3 min for questions, so 20 is realistic.
- **Items that test things the lesson never teaches (finding 015):**
  - far-scf-16: equity-method income and dividends, bond-discount amortization.
  - far-scf-18: dividends paid from dividends declared and the change in dividends payable.
  - far-scf-20: income taxes paid under the direct method, with deferred taxes.
  - far-tbs-u1-cash-flows: deriving depreciation, purchases and financing flows from comparative balance sheets.
  - far-scf-12(c): the stock split appears only as a distractor (minor).
- **Sequencing:** the module is 4th in unit 1. far-scf-16 relies on the equity method (unit 7) and bond amortization (unit 8); far-scf-20 relies on deferred taxes (unit 10). The lesson itself assumes nothing taught later. Only those items do.

## (c) Practice design

- **Counts:** 28 practice MCQs, 3 lesson MCQs, 5 exam MCQs, 3 TBS (2 practice, 1 exam) and 8 flashcards. That's ample for the module.
- **Labeled difficulty (practice pool):** 1: 6, 2: 10, 3: 12. The order is nominally easy to hard, with 02–10 mostly at 1–2 and 19–29 all at 3. But 22–29 are labeled 3 while being simple one-step items (finding 005), so the real progression flattens out at the end and the module has very few truly hard items: 13, 16, 20 and the review TBS.
- **Skill mix (practice + exam, as labeled):** R7 / A14 / An12, i.e. 21% / 42% / 36%. That looks close to the FAR target (5–15 / 45–55 / 35–45), but only because of mislabels. Judged on the Blueprint definitions it's about R8 / A22–23 / An2–3, so the module is heavily application and has almost no true analysis MCQs (far-scf-13, maybe far-scf-20). The review TBS (far-tbs-u1-cash-flow-review) is genuinely analysis.
- **Key letters (practice):** a 8, b 7, c 8, d 5. Balanced.
- **Redundancy:**
  - Five MCQs use the same indirect-CFO template; far-mock-2 carries three of them plus the x1 TBS (finding 011).
  - far-x1-30 is an exact clone of far-scf-24 (finding 010).
  - There are five near-duplicate pairs (finding 012).
- **Routing:** every item has `moduleId: far-cash-flows`, so misses route back to this lesson.

## (d) Items with no issues

far-scf-chk2, far-scf-05, far-scf-07, far-scf-08, far-scf-09, far-scf-10, far-scf-11, far-scf-13, far-scf-16, far-scf-20, far-scf-21, far-scf-fc1, far-scf-fc2, far-scf-fc3, far-scf-fc5, far-scf-fc6, far-scf-fc7, far-scf-fc8, far-tbs-u1-cash-flow-review.

far-scf-16 and far-scf-20 have correct keys. They appear in finding 015 only as evidence of the lesson gap.

## (e) Needs expert verification

- None of the findings depends on unverified law. All rest on ASC 230 / ASU 2016-15 / ASU 2016-18 rules that are long effective and stable, plus `review/reference/far-standards.md`. I used no web searches.
- Low priority: whether ASU 2023-09 also amended ASC 230-10-50-2. This only affects the wording suggested in finding 018 (S4). The lesson's current statement, that interest and income taxes paid are disclosed under the indirect method, remains correct.

## (f) Not checked

- The rendered UI for this module: app usability is reviewed separately.
- The Blueprint task-statement mapping (`review/blueprint-coverage.csv`) is produced elsewhere. The module's coverage of the SCF tasks (classify, indirect, direct, noncash disclosures, review and correct a draft) is otherwise adequate.
