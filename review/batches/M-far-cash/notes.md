# M-far-cash — reviewer notes

Module `far-cash` (FAR-II, unit far-u5): 1 lesson, 3 lesson MCQs, 28 practice MCQs, 2 exam MCQs, 6 flashcards, 1 TBS (41 items).
Findings: 20 (S1: 1, S2: 3, S3: 11, S4: 5). No web searches were used; the reference sheets and the ASC settled every point.

## (a) Blind pass vs. key

All 33 MCQ keys and all 13 TBS cells matched my blind answers. There were no key disagreements. The table lists the cells where my blind pass found a problem even though the number agreed.

| id | my answer | key | resolution |
|---|---|---|---|
| far-tbs-u5-cash-receivables rec/ck | +360 (typed as the label says, "enter + or −") | 360 | The number agrees, but `parseAmount('+360')` returns null, so the typed answer scores wrong → M-far-cash-001 (S1) |
| far-tbs-u5-cash-receivables cl/net | 544,050 (marked ambiguous; 545,250 if the NSF receivable is not in the aging) | 544,050 | The key relies on an assumption that appears only in the explanation → M-far-cash-002 (S2) |
| far-cash-13 | c (3,840) | c | The key is right, but I could answer only because I had just done far-cash-12. Practice pools are shuffled → M-far-cash-003 (S2) |
| all other MCQs | = key | = key | agree |

## (b) Lesson design (`content/far/modules/far-cash/lesson.md`)

- **Big idea.** Clear and concrete: cash means spendable now, and the reconciliation proves the book balance. The bounced-check example is good.
- **Pre-questions.** There is only one (pre1, a 6-month T-bill). It primes the "original maturity to the holder" trap well. Nothing primes the reconciliation half (which side an item goes on, and which items need entries) → M-far-cash-017 (S4).
- **Body.**
  - The inclusion/exclusion table is correct, and so is the maturity trap box (it matches the ASC 230-10-20 example).
  - The bank/book flowchart is correct.
  - Worked example, recomputed: 46,200 + 5,600 − 7,300 = 44,500 = 44,880 + 1,050 − 40 − 760 − 630. The 630 error is divisible by 9, which is consistent with a transposition.
  - Faded example, recomputed: 28,400 + 3,100 − 4,250 = 27,250 = 27,555 + 45 − 30 − 500 + 180. The net book entry is −305. All of these are correct.
  - The JE block is balanced (800 = 760 + 40).
- **Gaps.**
  - Several tested topics are never taught: imprest petty cash, unmailed checks, the DIT/OC roll-forward, compensating balances classified by loan term, and foreign-currency cash. Overdrafts appear in the takeaways only → M-far-cash-004 (S2).
  - The adjusting-entries section omits the note-collection entry and the book-error correction entry → M-far-cash-014 (S3).
  - There are minor precision and citation gaps (the cash-equivalent policy election under ASC 230-10-45-6, and the "maturity" of money market funds) → M-far-cash-018 (S4).
- **Takeaways.** Accurate:
  - Restricted cash is included in SCF totals (ASU 2016-18).
  - Overdrafts are offset only with a right of setoff.
  - Only book-side items need entries.
- **Inline checks.** chk1 tests the cash-equivalent total and chk2 tests which items need entries. Both are well placed.
- **`minutes: 14`.** The lesson has about 980 words including the frontmatter (about 630 in the body). That is roughly 5–6 minutes of reading, plus 4–5 minutes for the faded example (4 inputs), 2–3 minutes for three MCQs and a minute for the diagram, so 14 minutes is realistic. Adding the missing sections (M-004/M-014) would justify about 18 minutes.
- **Sequencing.** `far-cash-flows` (u1) precedes this module, so the restricted-cash-in-SCF takeaway rests on earlier material. The lesson needs nothing from a later module. The TBS does: its credit-loss part comes from `far-receivables` → M-far-cash-015 (S3).
- **Items testing what the lesson never teaches.**
  - far-cash-11, 17, 25: petty cash
  - far-cash-19: unmailed checks
  - far-cash-20: foreign-currency cash (also BAR scope → M-far-cash-013)
  - far-cash-26, 27: DIT/OC roll-forward
  - far-cash-05, 24: compensating balance classified current or noncurrent by loan term
  - far-cash-04, 15: overdrafts, in the takeaways only
  - TBS part cl: CECL aging, taught in the next module

## (c) Practice design

- **Counts.** 28 practice MCQs, 3 lesson MCQs, 2 exam MCQs and 1 TBS. That is ample for a single-group module; the problem is redundancy, not too few items.
- **Difficulty labels (practice).** Difficulty 1: 2 items, 2: 14 items, 3: 12 items. The file runs roughly easy to hard (01–16 are mostly difficulty 2; 17–28 are all difficulty 3), but the app shuffles sets, so file order has little effect. Several difficulty-3 labels are inflated (17/25 is $500 − $70) → M-far-cash-008.
- **Skill mix (practice).**
  - As labelled: remembering 1 (4%), application 16 (57%), analysis 11 (39%).
  - My judgment: remembering about 1, application about 23, analysis about 4 (13, 22, 26, 27), or about 14% analysis against the FAR target of 35–45%. The TBS adds analysis-level work. → M-far-cash-008 (labels) and M-far-cash-020 (add genuine analysis items).
- **Redundancy.**
  - 17 and 25 are identical (M-005).
  - 08 and 28 are identical (M-006).
  - The bank-side computation appears at least 5 times (02, 18, 21, x2-01, x2-18) (M-007).
  - Cash-equivalent totals (chk1, 01, 23) and maturity-to-holder items (pre1, 06, 14, 23) are within tolerance.
- **Key-letter balance (practice + exam).** a 9, b 4, c 7, d 10. "b" is somewhat underused (13%); worth rebalancing when items are rewritten. I did not raise a separate finding.
- **Routing.** Every MCQ carries `moduleId: far-cash`, so a miss routes back to this lesson. The TBS attempt is credited to `moduleIds[0]` = far-cash even for its credit-loss cells (M-015).
- **Exam pool.** x2-01 and x2-18 are realistic CPA-style items ("Fenn Co."). x2-18(d) has a rationale that does not match its number (M-010).

## (d) Items with no issues found

far-cash-pre1, far-cash-chk1, far-cash-03, far-cash-06, far-cash-10, far-cash-11, far-cash-14, far-cash-15, far-cash-16, far-cash-fc1, far-cash-fc2, far-cash-fc3, far-cash-fc4, far-cash-fc5, far-cash-fc6.

(far-cash-11 is still listed in the lesson-gap finding M-004 as content the lesson never teaches. That finding is attached to the lesson, not to the item.)

## (e) Needs expert verification

- **M-far-cash-013.** Whether foreign-currency measurement of a cash balance is FAR or BAR under the 2026 Blueprints. The reference sheet places foreign-currency transactions and remeasurement in BAR, citing secondary sources (UWorld, SuperfastCPA); confidence is medium.
- **M-far-cash-008 / M-020.** Skill-level calls (application vs. analysis) are judgment calls against the Blueprint verbs. The reference sheet's task text is reconstructed, not verbatim.
- **M-far-cash-016.** Whether the real exam's JE scoring accepts a gross Cash presentation. This is a suggestion only.

## (f) Could not check / limits

- **The +360 parse failure (M-001)** was confirmed by reading `src/lib/tbsScoring.ts` and running an identical copy of `parseAmount` under node. I did not reproduce it in the running app; the app's UI is reviewed separately. The input's `pattern` attribute may also flag "+360" as invalid on screen, which I did not see.
- **No web searches were needed.** The ASC rules involved (ASC 230-10-20, 230-10-45-6, 210-10-45-4, 210-20-45-1, 210-10-S99-2 / Reg S-X 5-02.1, 326-20, 830-20-35-2) are long settled, and the reference sheets confirm CECL and ASU 2016-18 as current. No tax year applies, and nothing in the module is affected by ASUs issued in 2023–2026. The ASU 2025-05 CECL expedient for current AR, testable from 4/1/2026, does not conflict with the TBS.
