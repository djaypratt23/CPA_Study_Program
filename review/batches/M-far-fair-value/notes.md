# Notes — M-far-fair-value (FAR, far-fair-value, unit far-u10, area FAR-III)

Reviewer pass completed 2026-10-30. 43 manifest ids, all reviewed (`ledger.csv`). 23 findings: 0 S1, 1 S2, 20 S3, 2 S4.

## (a) Blind vs. key

The blind answers (`blind-answers.csv`) were saved before items.json, the TBS file and cues.md were opened.

| id | my answer | key | resolution |
|---|---|---|---|
| all 34 MCQs (pre1, chk1, chk2, fv-01 to fv-28, x3-09, x3-19, x3-28) | — | — | **No disagreements.** Every blind answer matched the key. |
| far-tbs-u10-fair-value lvl/l1–l4 | L1, L2, L3, L2 | L1, L2, L3, L2 | Agree |
| far-tbs-u10-fair-value wheat/pp | 5.80 | 5.8 (tol 0.001) | Agree (Chicago is the principal market; 6.20 − 0.40) |
| far-tbs-u10-fair-value wheat/tot | 580,000 | 580,000 (tol 0) | Agree. Tolerance 0 is fine because the answer is exact; parseAmount accepts "$580,000". |
| far-tbs-u10-fair-value res | a (noting 35-6 would be the best cite) | a | Agree. The best-cite point is in finding 019. |

Every numeric distractor was reproduced in Python (see the findings for the mismatches):

- chk1 50/43/46: gross, net, and price less transaction costs (the reversed error)
- fv-02 95/87/97: X price less transport, Y net, Y gross
- fv-12 45/50/47: net, gross, reversed
- fv-13 42/36/35
- fv-19 45/50/48
- fv-22 94/98/92: 94 = B net = A price less transaction costs; 98 = B gross = A price less transport; 92 = A net. **The key 96 is also B price less transaction costs.**
- fv-23 96/92/100
- fv-10 450,000
- fv-11 96,000 (the average)

## (b) Lesson design

- **Big idea.** It is clear and correct: exit price, market-participant view, and the hierarchy as a measure of judgment.
- **Pre-question.** far-fv-pre1 primes the exit-price definition, which is the right concept to open with.
- **Body.** It runs definition → market and cost choice (worked example) → HBU → check → approaches table → hierarchy diagram → faded classification → FVO → check. Every worked number was recomputed: principal market 30 − 2 = 28; most advantageous nets A 25 vs. B 24 → A → 28; faded answers 1, 2, 3. All are correct.
- **Weakness.** In the worked example both scenarios land on Market A, so the "principal market beats a more advantageous market" case is never shown (finding 022).
- **Takeaways and inline checks.** The takeaways are accurate. chk1 (transport vs. transaction costs) and chk2 (FVO own-credit split) fit their sections.
- **Minutes.** About 1,000 words including the frontmatter, plus 5 blocks (worked, 2 checks, mermaid, faded with 3 inputs). Roughly 6–7 min of reading plus 5–7 min of interaction gives about 12–15 min, so 15 is realistic.
- **Accuracy.** No incorrect rule was found. One incompleteness: the Level 3 roll-forward is stated as universal, without the nonpublic exemption under ASU 2018-13 (finding 015).
- **Items that test something the lesson never teaches** (finding 016):
  - fv-10, fv-14: P × Q; blockage factor prohibited.
  - fv-07, fv-28: a liability is measured at its transfer price, not settlement, and the price reflects nonperformance risk.
  - TBS wheat/pp and res: the entity's normal market is presumed to be the principal market, and the principal market applies even if another market is more advantageous (35-5A, 35-6). The lesson implies the second point but never states it.
  - fv-08's "quantitative info about unobservable inputs" is covered.
- **Sequencing.** The lesson relies on OCI (far-income-statement-oci, Area I) and on the FVO and equity-method context (far-debt-securities and far-equity-investments, Area II), all taught earlier. Nothing depends on a later module. Earlier modules (investments, impairment, equity securities) use "fair value" before ASC 820 is formally taught here. They use it only at the definitional level, so this is acceptable, but a one-line forward reference in those lessons would help.
- **Currency.** No taxYear applies (FAR). ASC 820 and ASC 825 content is current, including ASU 2016-01 (own credit to OCI) and SOFR rather than LIBOR in the TBS. ASU 2026-03 (investment-company sale restrictions, eligible 2028) is correctly absent. ASU 2022-03 (sale restrictions not considered; PBE FY > 12/15/2023) is testable but absent (finding 020). The 2026 Blueprint's narrowing of FAR fair value scope is unresolved (finding 021).

## (c) Practice design

**Practice MCQs.** There are 28, plus 3 lesson MCQs, 3 exam-pool MCQs, 7 flashcards and 1 TBS.

- **Count.** The count is adequate, but there is heavy redundancy: about 14 distinct facts across 28 items (findings 011, 012, 013).
- **Difficulty as labeled.** d1 = 5, d2 = 9, d3 = 14.
  - The progression is loosely easy-to-hard by file order: fv-22 to fv-28 are all d3.
  - Most of the d3 labels sit on trivial recall items, so the "hard" end of the bank is not actually hard.
  - The only genuinely multi-step items are fv-02 and fv-22 (most-advantageous market), fv-23 and the TBS.
- **Skill mix of the practice pool, against the FAR target (R&U 5–15 / App 45–55 / Analysis 35–45):**

| | Remembering | Application | Analysis |
|---|---:|---:|---:|
| As labeled | 4 (14%) | 12 (43%) | 12 (43%) |
| After the relabels I propose (findings 001, 002) | 10 (36%) | 16 (57%) | 2 (7%) |

  The labeled mix looks on-target only because of inflated labels. The module is recall- and application-heavy with almost no real analysis. This may be acceptable if the 2026 FAR scope is limited to concepts and the hierarchy (finding 021), but the labels should be honest.
- **Missed-question routing.** All items carry moduleId far-fair-value, so a miss routes back to this lesson.
- **Exam pool.**
  - x3-09 and x3-19 are near-clones, and x3-09 is reused in mock 1 and mock 3 (finding 011).
  - x3-28 (HBU) is clean.

## (d) Items with no issues found

far-fv-pre1, far-fv-02, far-fv-03, far-fv-04, far-fv-05, far-fv-06, far-fv-07, far-x3-28, far-fv-fc1, far-fv-fc2, far-fv-fc4, far-fv-fc5, far-fv-fc6, far-fv-fc7.

Cue hints judged and not raised as findings:

- fv-03: the longest option is the term of art.
- fv-05: the key "Cost approach" echoes "replacement cost" in the stem. This is inherent in a definitional recall item.
- fv-06, chk2, fv-04: their absolutes are in distractors, but the distractors are wrong for substantive reasons.
- fv-17: the key is short, but so are the other options.

## (e) Needs expert verification

1. **Finding 021.** What the 2026 FAR Blueprint Area III.E fair value tasks say exactly, and whether measurement calculations (principal vs. most-advantageous market arithmetic, P × Q) moved to BAR. Two web searches confirmed a FAR/BAR ASC 820 realignment but not the task text; secondary sources disagree on "1 removed/1 added" vs. "2 removed/1 added".
2. **Finding 019.** ASC paragraph numbers, from memory: transport costs in 820-10-35-9C (vs. 35-9B); "even if a different market is more advantageous" in 820-10-35-6; FVO instrument-by-instrument and irrevocable in 825-10-25-2 (vs. 25-4, election dates). Direct FASB fetches are blocked.
3. **Finding 015.** The nonpublic-entity Level 3 roll-forward exemption, 820-10-50-2F (ASU 2018-13). This is from memory and high-probability.
4. **Finding 020.** Whether ASU 2022-03 falls in FAR or BAR scope under the 2026 split.

## (f) Could not check

- The primary AICPA Blueprint PDF and the FASB Codification text, because egress is blocked. Paragraph-level citations rest on memory, and the reference sheets mark ASC 820 as `from-memory`.
- I used 2 of the 3 allowed web searches; neither settled the 2026 task text.
- I did not run the app, which is out of scope for this batch. I checked TBS scoring by reading `src/lib/tbsScoring.ts`: there are 7 one-point cells, so a perfect response scores 100%, and parseAmount accepts commas and "$".
- Cross-module duplicate noted but not in this batch: far-bond-28 (far-bonds) is a near-verbatim copy of far-fv-15.
