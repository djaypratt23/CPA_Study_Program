# M-far-inventory-cost — reviewer notes

Module `far-inventory-cost` ("Inventory cost flow methods", FAR-II, unit far-u5). 44 manifest items: 1 lesson, 3 lesson MCQs, 28 practice MCQs, 2 exam MCQs, 8 flashcards, 2 TBS. Findings: 25 in total (S1 0, S2 3, S3 18, S4 4). In these notes, "F-0NN" means finding `M-far-inventory-cost-0NN` in `findings.jsonl`.

## (a) Blind vs. key

I answered every item blind (`blind-answers.csv`) before opening `items.json` or the TBS files: 31 MCQs, plus 26 TBS cells (14 review rows and 12 cells in the cost, valuation and memo parts).

| id | my answer | key | resolution |
|---|---|---|---|
| — | — | — | **No disagreements.** All 31 MCQ keys and all 26 TBS cell answers match my blind answers. |

These keys were confirmed independently (every number recomputed in Python):
- 01 8,450; 02 9,550; 03 7,863; 04 1,400; 07 91,000; 13 1,250; 14/26 122,000; 16 1,950; 21 1,950; 22 1,783; 23 1,600; 24 88,000; 25 52,000; 27 $200 discounts lost; 28 40,000; x2-03 2,100; x2-27 3,400.
- Review TBS: frt 42,500; book 543,200; shr −12,500; git 7,300; adj 543,200.
- Brook TBS: ga 30,300; fe 8,400; le 6,800; lc 23,500; wa 7,575; res 1,600; v1 $16.50; v2 $16.20; v3 No.

The keyed pass found problems in the distractor rationales instead:
- far-inv-16 (a) and (b) misstate the FIFO and LIFO results: they are 2,250 and 1,650, not 2,400 and 1,500 (S2).
- far-inv-10 (d) teaches that an inventory error "doubles" over two years. It actually counterbalances to zero (S2).
- far-inv-13 (b) says $1,200 is the periodic average. The periodic average is 1,160; $1,200 is the simple average of the unit costs (S3).

## (b) Lesson design

- **Big idea → pre-question.** Strong. The gas-station example and the rising-price framing set up the key FIFO/LIFO comparison. The pre-question (`far-inv-pre1`, highest income under rising prices) primes exactly that idea.
- **Body.** The ownership table, the cost inclusions, one shared data set worked three ways (all four numbers recomputed: FIFO 3,100/5,000; LIFO 2,650/5,450; WA 2,893/5,207), LIFO details, and a faded dollar-value LIFO example (120,000 / 122,000 / 110,000 / 111,000, all correct, including the decrement taken from the Year 2 layer at 1.10). Clear and accurate overall. Gaps:
  - Specific identification is never taught (F-016).
  - Perpetual LIFO and moving average are described but never worked (F-019).
  - The exclusions sentence can be read as excluding all spoilage (F-018).
- **Takeaways.** Accurate except #7: "LIFO users must use LIFO for tax and book" overstates the conformity rule (F-017).
- **Inline checks.** chk1 (ownership) is well placed, but its stem is self-contradictory (F-013). chk2 tests the LIFO reserve but sits after the dollar-value LIFO section. There is no check on the periodic computations (F-019).
- **`minutes: 20`.** Realistic. About 650 body words plus the frontmatter takeaways (about 375 words), one worked example, one 4-step faded example and 3 MCQs: roughly 5 minutes reading, 3 for the worked example, 5–7 for the faded steps and 3–4 for the checks.
- **Lesson–item alignment.** Items that test something the lesson never teaches:
  - `far-inv-19`: specific identification.
  - `far-inv-10`: inventory-error effects (taught in far-inventory-valuation, the next module).
  - `far-inv-28`: gross profit method (far-inventory-valuation).
  - `far-inv-27`: net method / purchase discounts lost (taught in far-payables, unit u8, much later). It duplicates that lesson's exact $10,000, 2/10 n/30, $200 example.
  - `far-tbs-u5-inventory` part val (LCNRV/LCM) and `far-tbs-u5-inventory-review` (roll-forward and shrinkage) rely on far-inventory-valuation. That is acceptable because both TBS list that module in `moduleIds`.
  - Partly taught: `far-inv-04` (perpetual LIFO) and `far-inv-13` (moving average) are described only in bullets.
- **Sequencing.** The prerequisites (far-cash, far-receivables) are not needed. Nothing in the lesson relies on a later module. Items 10, 27 and 28 do (F-015), and misses route them back to this lesson.

## (c) Practice design

- **Count.** 28 practice MCQs, plus 3 lesson MCQs, 2 exam MCQs and 2 TBS. Enough items, but heavily redundant:
  - Nine periodic FIFO/LIFO/average computations, in two near-identical three-item sets (F-007).
  - An exact duplicate pair, 14/26, which also matches the lesson's faded example (F-006).
  - Seven ownership items (F-008).
  - Two mirror recall pairs, 05/15 and 09/20 (F-009).
  - Three items that belong to other modules (F-015).
  - Not covered: specific identification calculations, perpetual FIFO, a multi-year dollar-value LIFO decrement as a practice item, and change in the LIFO reserve.
- **Difficulty spread.** d1: 4, d2: 11, d3: 13. In file order it runs roughly easy to hard: items 21–28 are all difficulty 3, mostly because of inflated labels (F-005). Sessions are shuffled in `src/lib/quiz.ts` anyway, so file order is cosmetic.
- **Skill mix.** As labeled: R 3, App 12, Analysis 13 (46% analysis). As judged:
  - R about 5: 05, 09, 15, 18, 20.
  - App about 22.
  - Analysis 1: far-inv-10.

  F-004 (S2) covers 18 and 20; F-005 (S3) covers the rest. FAR's 35–45% analysis target has to come from the review TBS (genuinely analysis level) and from other modules. A cost-flow module is naturally application-heavy, so the fix is honest labels rather than forced analysis items.
- **Exam pool.** Two items, both periodic FIFO, and both are in far-mock-3 (F-023).
- **Key balance.** Even (7/7/7/7 in practice).

## (d) Items with no issues found

- `far-inv-07`
- `far-inv-fc1`, `far-inv-fc2`, `far-inv-fc3`, `far-inv-fc4`, `far-inv-fc5`, `far-inv-fc6`, `far-inv-fc7`, `far-inv-fc8`. All 8 flashcards are correct, atomic and consistent with the lesson. fc8 states LIFO conformity in the correct direction.

Items whose only finding is redundancy or labels (the key, stem and explanations are otherwise sound): `far-inv-01`, `-02`, `-03`, `-12`, `far-x2-03`.

## (e) Needs expert verification

- F-018 (spoilage wording). I am relying on my memory of the ASC 330-10-30-7 text ("abnormal amounts of idle facility expense, freight, handling costs, and wasted material (spoilage)"). I couldn't fetch the ASC.
- F-005 / F-004 (skill levels). These depend on the reconstructed Blueprint task text (`blueprint-tasks.csv` rows FAR-II.C.1–C.5 are `reconstructed`, not verified).
- IFRS. The lesson bullet "IFRS prohibits LIFO", the far-inv-09 (a) distractor and fc8 are factually correct. The reference sheet says IFRS is believed not tested since 2024 (`from-memory/unverified`). I didn't raise a finding, but the expert may want to confirm scope.
- F-021 (review-TBS scoring floor). This is partly a platform-wide design choice in `scoreReview`; the lead should decide whether it is a content or an app issue.

## (f) Not checked, and why

- **No web searches used (0 of 3).** Every rule in this module is long-settled GAAP (ASC 330) or IRC §472, and none is affected by any 2023–2026 ASU on the reference sheet. ASU 2024-03 (DISE) mentions inventory purchases but is not testable until 1/1/2027. LIFO conformity (§472(c)) is believed unchanged by P.L. 119-21. I didn't confirm that against the Act's text, but the risk is low.
- **Currency.** The lesson has no `taxYear`, which is correct for a GAAP module. The only tax rule is LIFO conformity, which has no year-dependent amount.
- **The app was not run.** Per PROMPT.md, the app is reviewed separately. I read the scoring code (`src/lib/tbsScoring.ts`) only to judge TBS partial credit.
