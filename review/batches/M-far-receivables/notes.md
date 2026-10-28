# M-far-receivables — reviewer notes

Scope: lesson `far-receivables`, 35 MCQs (3 lesson, 28 practice, 4 exam), 7 flashcards, 2 TBS. Blind answers are in `blind-answers.csv`, findings in `findings.jsonl` (21: S1 0, S2 4, S3 12, S4 5), and the ledger in `ledger.csv` (all 45 manifest ids, all reviewed).

## (a) Blind vs. key

All 35 MCQ keys and all 20 TBS cells agree with my blind answers. There are no S1 key errors. A follow-up pass re-derived every numeric distractor from its stem; far-rec-01(c) and far-rec-05(b) explanations misstate their derivation (findings 006 and 011 extended).

| id | My answer | Key | Resolution |
|---|---|---|---|
| (all MCQs) | = key | — | Agree. The closest call was `far-rec-29`: net AR decreases by 1,500, because the reinstatement nets to zero and the collection lowers gross AR while the allowance stays higher. The key (d) is right. |
| far-tbs-u5-ar-review rf.rec / rf.coll | 1,500 / −2,051,300 | 1,500 / −2,051,300 | Agree. However, a second reading (recovery booked Dr Cash / Cr Allowance, so AR is untouched) also ties to the 393,800 GL and is scored wrong on 2 of 14 cells. See finding 001 (S2). |
| far-tbs-x2-receivables-inventory | 26,000 / 8,000 / 18,000 / 434,000 / 83,000 / 7,000 | same | Agree. |

## (b) Lesson design

- **Big idea.** Clear and correct. The "what" (an allowance down to expected collections, from day one), the "why" (incurred-loss criticism after 2008) and the distributor example all prime CECL well.
- **Pre-question (`far-rec-pre1`).** It primes the most common misconception, that a write-off reduces net AR or creates expense, and the write-offs section resolves it. It does not prime the balance-sheet plug, which is the core computation. A second pre-question on the debit-balance plug, or on "when is the allowance first recorded?", would cover the main objective.
- **Body flow.** T-account (plug) → CECL aging worked example → check → write-off/recovery JE → transfers table and faded factoring example → check → roll-forward and reconciliation (the analysis objective) → ASU 2025-05. The order is logical. Every worked number recomputes: 30,000; 28,300 / 19,300 / 571,700; 6,000 / 10,000 / 184,000 / 10,000, with the JE balanced at 204,000.
- **Takeaways.** They match the body for the allowance, write-offs and transfers. They omit the reconciliation rules (adjust the wrong record; a duplicated payment understates the subledger) and ASU 2025-05.
- **Inline checks.** There are only two (plug, effective control). The reconciliation and ASU 2025-05 objectives have none (finding 019, S4).
- **`minutes: 18`.** About 971 body words plus about 405 frontmatter words (big idea, takeaways) gives roughly 9 minutes of reading. Add the worked example (about 3), the faded example (about 4) and the pre-question plus two checks (about 3), and the total is about 19 minutes. Realistic.
- **Lesson–item alignment.** These items test material the lesson never teaches:
  - Notes receivable: `far-rec-09` (PV of a noninterest-bearing note), `far-rec-14` (interest accrual), `far-rec-18` and `far-rec-26` (discounting a note at a bank), and `far-rec-fc7`. Finding 003 (S2).
  - Percentage-of-sales method: `far-rec-27`. Finding 004 (S2).
  - Minor: `far-x2-26(b)` "general assignment". The lesson's table says only "Pledging / assigning", which is enough.
- **Sequencing.** The ASU 2025-05 section relies on ASC 606 "contract assets", which are taught later in far-u9 and never defined here (finding 015). `far-rec-09` uses a PV factor; the factor is given, so it does not depend on the later bonds module. Nothing else relies on later modules. The prerequisite `far-cash` is not needed for this content.
- **Terminology.** The legacy terms "bad debt expense" and "allowance for doubtful accounts" are never mentioned, although other FAR modules use them (finding 017, S4).

## (c) Practice design

- **Counts.** 28 practice, 4 exam and 3 lesson MCQs, 2 TBS and 7 flashcards. That is adequate for the module's weight.
- **Topic spread (practice and exam).**
  - Allowance computations: 9 (rec-01, -03, -17, -20, -22, -23, -27, x2-02, x2-19)
  - Transfers and factoring: 8 (rec-07, -08, -10, -15, -19, -25, -28, x2-26)
  - Write-offs and recoveries: 5 (rec-04, -05, -21, -24, -29)
  - CECL concepts: 4 (rec-02, -11, -13, -16)
  - Notes receivable: 4
  - Direct write-off: 1
  - Subledger reconciliation: 1 (rec-12)

  Redundancy: write-off "no effect" is tested 4 times (finding 007); rec-19 and rec-25 share identical facts (finding 008); the debit-balance plug appears 3 times (finding 021). The roll-forward and reconciliation objective has only one MCQ, plus the review TBS.
- **Difficulty as labeled.** d1: 6, d2: 13, d3: 13. Real difficulty is lower: rec-21, -23, -24 and -28 are labeled 3 but are among the easiest. The labels rise with item number, but the actual difficulty does not progress from easy to hard. The genuinely hardest items are rec-12, rec-15, rec-18, rec-26 and rec-29.
- **Skill mix.** As labeled (practice and exam): remembering 6, application 14, analysis 12 (19 / 44 / 38%). As corrected in finding 002: remembering 9, application 22, analysis 1 (28 / 69 / 3%). The FAR targets are 5–15 / 45–55 / 35–45. Analysis-level coverage here really comes from `far-tbs-u5-ar-review` (labeled analysis, which is correct) and from `far-rec-12`. The module needs 3–4 genuine analysis MCQs and fewer recall items.
- **Routing.** Each item carries `moduleId: far-receivables`, so misses map back to this lesson. Except for the notes-receivable and percentage-of-sales items, the lesson contains what is needed.
- **TBS.** `far-tbs-u5-ar-review` is a good analysis-level simulation: realistic roll-forward errors, a counter-intuitive duplicate-payment row, and a sensible 20 minutes. It has the recovery-policy ambiguity (001) and the blank-response-scores-50% issue (020). `far-tbs-x2-receivables-inventory` is a correct but light application TBS: 6 cells for 20 minutes (finding 014).

## (d) Items with no issues found

far-rec-02, far-rec-06, far-rec-12, far-rec-13, far-rec-15, far-x2-02, far-rec-07, far-rec-fc1, far-rec-fc2, far-rec-fc3, far-rec-fc4, far-rec-fc5, far-rec-fc6.

## (e) Needs expert verification

1. **Finding 004.** Whether a percentage-of-sales (income-statement) estimate is acceptable under CECL without a year-end true-up of the allowance to expected losses on outstanding receivables. The secondary sources found (Cohen & Co. https://cohenco.com/knowledge-center/insights/december-2023/what-current-expected-credit-loss-cecl-means-for-trade-receivables ; Blue & Co. https://www.blueandco.com/application-of-cecl-to-accounts-receivable/ ; Eide Bailly https://www.eidebailly.com/insights/articles/2023/6/cecl-for-non-financial-institutions) describe aging and loss-rate methods. None explicitly prohibits percentage-of-sales.
2. **Finding 016.** Whether the 2026 FAR Blueprint Area II.B (Trade receivables) includes a presentation/disclosure task. The Blueprint text was not seen; the search returned nothing usable.
3. **Paragraph citations from memory.** ASC 326-20-35-8 (write-offs and recoveries), 326-20-55-37 (Example 5, aging) and 860-10-40-24 (repurchase agreements). The rules are settled; only the paragraph numbers are unverified.
4. **ASU 2025-05 details.** Taken from `review/reference/far-standards.md` §2c (verified there): testable from 4/1/2026, and the lesson's description is consistent with it.

## (f) Not checked, and why

- **In-app rendering.** I did not check how these items render, the routing UI, or the TBS input sign handling (for example, whether a positive 2,051,300 is accepted for "coll"). The app is reviewed separately, and the brief limits me to this batch's content.
- **Primary ASC and Blueprint text.** fasb.org and aicpa-cima.com fetches are blocked. I used 2 of the 3 searches and kept the third unused.
- **`far-inventory-valuation` half of the x2 TBS.** I recomputed it (83,000 and 7,000 are correct), but that module's lesson and items belong to another batch.
