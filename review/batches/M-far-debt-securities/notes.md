# M-far-debt-securities: reviewer notes

Scope: 43 manifest items (1 lesson, 3 lesson MCQs, 28 practice MCQs, 3 exam MCQs, 6 flashcards, 2 practice TBS). Every item was reviewed (ledger `reviewed = y`). Findings: 0 S1, 1 S2, 14 S3, 3 S4. No web searches were used.

## (a) Blind answers vs. keys

All 34 blind MCQ answers match the keys. All 18 TBS cells match too: Bond C 8,810 / 1,310 / 148,140, review rows r1–r5, Lakeshore 26,103 / 6,103 / 379,005 / 26,530 / 385,535, the four dropdowns, and JE Dr FVA 5,470 / Cr OCI 5,470.

| id | my answer | key | resolution |
|---|---|---|---|
| (none) | — | — | No disagreements. Note: my blind rationale cited ASC 320-10-35-10 sub-letters loosely. Transfers *into trading* are 35-10(b), and HTM→AFS is 35-10(c); this did not affect any answer. |

All numeric distractors were reproduced in Python. Mismatched rationales or traps are in finding 003: dsec-05 (c), -16 (c), -18 (b), -24 (b) and -26 (d).

## (b) Lesson design

- **Big idea.** The big idea is clear: intent drives measurement. The insurer vs. hedge-fund example works.
- **Pre-question.** There is one pre-question, far-dsec-pre1 (AFS gain → OCI). It primes the module's central distinction well. A second pre-question on discount vs. premium would prime the effective-interest half.
- **Body: verified.** All numbers were recomputed and are correct:
  - the three-bucket table
  - the effective-interest worked example (PV 92,015.58; 7,361 / 1,361 / 93,376; 7,470 / 1,470 / 94,846)
  - the journal entry (balanced)
  - the AFS fair-value illustration (95,000 − 93,376 = 1,624 to OCI)
  - the faded premium example (18,682 / 1,318 / 206,262 / 3,262). The default 0.5 tolerance accepts unrounded entries.
  - the sale and credit-loss rules (ASC 326-20 / 326-30, including the intent-to-sell and MLTN write-down)
- **Body: problem.** The faded example's $207,580 price is not a PV for any term (finding 016).
- **Takeaways.** The six key takeaways are accurate.
- **Inline checks.** chk1 tests the ASC 320-10-25-4 HTM disqualifier, which the body never states. chk2 tests the credit/non-credit split, which the body does teach.
- **Minutes.** The body is about 650 words plus a worked block, a JE, a 4-step faded block and 2 checks. That is about 4–5 min reading, 4–5 min faded and 2–3 min checks, or 11–13 min in total. `minutes: 18` is generous but acceptable.
- **Lesson–item alignment.** These items test content the lesson never teaches:
  - far-dsec-chk1: HTM disqualified by possible sales for interest-rate or liquidity reasons
  - far-dsec-17, far-dsec-25: transfers between categories (ASC 320-10-35-10). Finding 013.
  - far-dsec-14: credit loss measured as AC − PV of expected cash flows. Finding 014.
  - far-dsec-08 and far-tbs-u7-debt-securities (JE): the valuation-account adjustment is the change from the existing balance to the required balance. Finding 015.
  - far-dsec-06, far-dsec-20: the fair value option appears as a distractor only. The lesson never mentions the FVO; this is minor.
  - far-dsec-15: the sale of a trading security is not shown, but it is derivable from FV-NI. This is acceptable.
- **Sequencing.** This module (u7) comes before Bonds payable (u8). The lesson assumes PV pricing but gives prices instead of deriving them, so it does not depend on later content. dsec-10's explanation uses PV factors (2.5771, 0.7938) that are taught later in far-bonds. That is acceptable because the item doesn't require them. Equity securities are deferred to the next module (far-equity-investments) and flagged correctly.
- **Currency.** All items assume CECL (ASU 2016-13, effective for all entities for fiscal years beginning after 12/15/2022) and post-ASU 2016-01 classification, which is what the 2026 exam tests. OTTI is correctly presented as an outdated rule (dsec-09 b). No 2025–2026 ASU changes this module: ASU 2025-05 covers current AR and contract assets, and ASU 2025-08 covers purchased loans and is not eligible until 2027. FAR has no `taxYear`, which is fine.
- **Consistency.** The glossary (AFS, HTM, OCI), the far-income-statement-oci reclassification material, far-balance-sheet-equity and far-high-yield.md all agree with this module. I found no conflicts.

## (c) Practice design

- **Count.** There are 28 practice MCQs, 3 exam MCQs and 2 TBS. That is adequate for a 2-module unit.
- **Difficulty labels.** The labels are 1: 4, 2: 14 and 3: 13, but they are inflated:
  - dsec-21, -22, -23 and -28 are difficulty-3 items that are really difficulty 1.
  - Items 16–28 are all labeled difficulty 3, but most are one-rule recall items.
  - In substance, the order runs from computation items (02, 03, 10, 13) to recall items (16–28). That is the reverse of easy → hard.
- **Skill mix.**
  - As labeled (practice + exam): application 15, analysis 12, remembering 4.
  - After the relabels in findings 001–002: about 14 remembering, 17 application and essentially no MCQ that requires analysis.
  - Section target: R&U 5–15%, Application 45–55%, Analysis 35–45%.
  - Analysis-level work exists only in TBS r3 (review/correct). The module needs multi-step analysis MCQs (finding 009).
- **Redundancy.** Each of these facts is tested 3–5 times: trading → NI, AFS → OCI, HTM at amortized cost, and AFS sale gain = proceeds − AC (finding 009). The exam item x2-12 reuses practice item dsec-13's bond (finding 010).
- **TBS.**
  - u7 (application, 18 min, 10 cells + JE): realistic and correct.
  - r3 (analysis, 20 min, 8 cells): correct, but missing acquisition dates (finding 012). The 20 minutes is slightly long for 8 cells.
  - Scoring (src/lib/tbsScoring.ts): one point per cell, default tolerance 1. A review row in error scores only when it is flagged and the amount corrected, and correct rows must be left unflagged. A perfect response scores 100%. Unrounded entries (for example, 385,535.85 or 5,469.15) fall within tolerance.

## (d) Items with no issues found

far-dsec-pre1, far-dsec-chk1 (item itself; its lesson support is covered by finding 013), far-dsec-01, far-dsec-06, far-dsec-07, far-dsec-08, far-dsec-10, far-dsec-fc2, far-dsec-fc3, far-dsec-fc4, far-dsec-fc5, far-tbs-u7-debt-securities.

## (e) Needs expert verification

- These ASC paragraph references in the findings' `source` fields are cited from memory (no fetch possible): 320-10-25-4 / 25-6, 320-10-35-10(a)–(d), 320-10-35-12, 326-30-35-6 / 35-7 / 35-10 / 35-12 and 220-10-45-15. The rules themselves are standard. The exact sub-paragraph numbers should be confirmed before they are cited in content.
- Blueprint task wording (FAR-II.E.*) is reconstructed (see review/reference/blueprint-notes.md), so the skill-level judgments rest on the Blueprint's general skill definitions.

## (f) Not checked

- I did not check rendering of this module in the app (sections 3–4 of the brief are reviewed separately).
- I did not check items in other modules beyond a consistency scan for HTM/AFS/trading/OTTI wording. The one OTTI mention outside this module (equity-method impairment in far-equity-investments) is correct for ASC 323.
