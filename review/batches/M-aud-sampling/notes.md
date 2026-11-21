# M-aud-sampling — reviewer notes

Module `aud-sampling` (AUD-III, unit aud-u6). 47 manifest items: lesson, 3 lesson MCQs, 27 practice MCQs, 8 exam MCQs, 6 flashcards, 2 TBS. All 47 were reviewed (ledger.csv).

Process note: the first copy of `blind-answers.csv` was lost in the container restart. It was re-saved from the same blind-pass work **before** `items.json`, the TBS JSON or `cues.md` were opened.

## (a) Blind vs. key disagreements

| id | my answer | key | resolution |
|---|---|---|---|
| — | — | — | **None.** All 38 MCQ keys and all 20 TBS rows (u6: 12, x4: 8) match my blind answers. |

These items need no investigation, but their data is suspect or their rationales are wrong even though the keys are right:
- **aud-sa-17.** The key is right (7.8 − 2.0 = 5.8%), but a 7.8% upper limit for 2 deviations in 100 matches no table value: binomial 10% → 5.2, 5% → 6.2, 1% → 8.1. See finding 009.
- **aud-sa-10.** The key is right, but the rationales for (c) and (d) are swapped. See finding 001.

Statistical-table values were checked with an exact one-sided binomial bound, computed in python:
- 2 in 60 at 5%: 10.12, which rounds to the AICPA table's 10.2 (lesson). ✓
- 3 in 80: 9.41, table 9.5 (aud-sa-02). ✓
- 2 in 100: 6.16, table 6.2 (TBS u6). ✓
- 3 in 75: 10.01, table 10.1 (TBS x4). ✓
- 3 in 60: 12.4 (aud-sa-24 states 12%, which is acceptable as rounded data).

## (b) Lesson design

**Big idea.** Clear and accurate. It contrasts a rate (attribute sampling) with dollars (variables sampling/MUS) and explains why sampling risk matters. The example (2 of 60, 3.3%) is correct.

**Pre-questions.** There is only one, `aud-sa-pre1` (incorrect acceptance → inappropriate unmodified opinion). It primes the first section, sampling risk, well. Nothing primes sample-size factors or MUS projection. A second pre-question on MUS projection would be a suggestion only; it is not filed as a finding.

**Body.** The body has three sections.
- **Risk table.** Correct.
- **Attribute factor table and worked evaluation.** Recomputed: 2/60 = 3.3%, 10.2 − 3.3 = 6.9%, and 10.2% > 7% means no reliance. ✓
- **MUS section.** Worked example recomputed: interval 30,000; A 25% → 7,500; B ≥ interval → 3,000; C 5% → 1,500; total 12,000. ✓ Faded example recomputed: 30,000 / 0.25 / 7,500. ✓ However, the faded example repeats the worked numbers (finding 014).

**Takeaways.** All seven are accurate.

**Inline checks.** chk1 (efficiency risk in tests of controls) and chk2 (item above the interval) are both correct and well placed.

**Minutes.** The `minutes: 18` value is realistic-to-generous for what the lesson contains now: about 830 words (about 4 minutes of reading), plus 2 worked examples, 1 faded example and 2 checks (about 8–10 minutes). It is too short for the content the lesson *should* contain (finding 003).

**Lesson–item alignment.** These items test things the lesson never teaches (finding 003):
- **aud-sa-09:** when to use ratio vs. difference vs. MPU. The lesson only names the methods.
- **aud-sa-11:** advantages of statistical sampling.
- **aud-sa-13:** the MUS sample-size formula and the "confidence factor".
- **aud-sa-15:** haphazard selection.
- **aud-sa-18:** systematic selection.
- **aud-sa-19:** stratification.
- **aud-sa-20:** projecting misstatements in nonstatistical samples.
- **aud-x3-30:** substantive (variables) sample-size factors: tolerable misstatement, RMM, expected misstatement and risk of incorrect acceptance. Objective 2 promises these, but only the attribute table is given.
- **aud-sa-08 (partly):** its rationale relies on the AU-C 530.13 anomaly rule, which is not taught. The lesson insight does mention that intentional deviations matter qualitatively.
- **aud-sa-10 and aud-sa-26 (partly covered):** basic precision and incremental allowance appear only in one worked-example insight sentence.

**Sequencing.** No forward dependencies. `aud-tests-of-controls` (aud-u5) and `aud-risk-materiality` (tolerable misstatement and performance materiality, aud-u3) both come earlier in the YAML. The lesson declares no prerequisites, and none are needed beyond those modules.

**Currency.** AUD has no `taxYear` to check. AU-C 530, the AICPA Audit Sampling guide and PCAOB AS 2315 are cited, and to my knowledge none has changed in substance for the 2026 exam. SAS 142 changed AU-C 500, not the sampling concepts. The PCAOB's 2024 technology-assisted-analysis amendments touched AS 1105 and AS 2301, not AS 2315. No dates, thresholds or dollar amounts are version-sensitive.

## (c) Practice design

**MCQ count.** There are 27 practice MCQs, which is adequate in number, but about 7 of them (aud-sa-21 to aud-sa-27) are terse clones of earlier items (finding 006). Effective coverage is therefore about 20 distinct items, concentrated on these points:
- risk ↔ effectiveness/efficiency
- the direction of the tolerable rate's effect
- MUS projection below the interval

**Difficulty, as labeled (practice).** 7 × d1, 9 × d2, 11 × d3. Many d3 labels are inflated (aud-sa-24 to aud-sa-27, aud-sa-17 and aud-sa-14 are one-step items), so the true spread is roughly 12 / 12 / 3.

**Progression.** The file order is not easy→hard: 2,2,1,2,2,2,1,3,1,3,1,2,3,3,1,2,3,2,3,3,1,2,1,3,3,3,3. Ordering may be randomized by the app, which is reviewed separately.

**Skill mix vs. Blueprint (AUD).** Blueprint targets: R 30–40%, App 30–40%, An 15–25%, Ev 5–15%.

| | Remembering | Application | Analysis | Evaluation |
|---|---|---|---|---|
| Labeled (practice + exam, 35) | 10 (29%) | 15 (43%) | 7 (20%) | 3 (9%) |
| After my relabeling (findings 004/005) | ~14 (40%) | ~21 (60%) | 0 | 0 |

The module has no genuine analysis or evaluation MCQ. The lesson objective "Evaluate the results of audit sampling" (analysis) is tested only at application level. The two TBS are labeled application, which is correct.

**TBS.**
- **aud-tbs-u6-sampling.** 25 minutes for 12 rows is slightly generous but OK.
- **aud-tbs-x4-sampling.** 20 minutes for 8 simple rows; about 12–15 minutes would be realistic.
- **Tolerances.** 0.05 on percentages and 0 on exact-integer dollar rows is appropriate, because there is no rounding ambiguity.
- **Scoring.** The total rows (tot, t) double-penalize an earlier row error. That is a common design and not flagged.

**Flashcards.** All 6 (f1–f6) are correct and atomic. There is no card for the "item at or above the interval → actual misstatement" rule or for selection methods. That is optional.

## (d) Items with no issues found

aud-sa-chk1, aud-sa-chk2, aud-sa-01, aud-sa-02, aud-sa-03, aud-sa-04, aud-sa-05, aud-sa-07, aud-sa-09, aud-sa-15, aud-sa-16, aud-sa-18, aud-x3-05, aud-x3-06, aud-x3-07, aud-x3-08, aud-x3-30, aud-x3-43, aud-x3-44, aud-sa-f1, aud-sa-f2, aud-sa-f3, aud-sa-f4, aud-sa-f5, aud-sa-f6.

aud-sa-16, aud-x3-05 and aud-x3-07 belong to the redundancy clusters in finding 006. They are fine themselves; the fix is to replace the clones aud-sa-21 to aud-sa-27.

## (e) Needs expert verification

- **Finding 005 (S3).** The skill-level suggestions for aud-sa-08 (evaluation → analysis/application) and aud-sa-20 are judgment calls; confidence is medium.
- **Finding 009.** That 7.8% is "unrealistic" rests on the standard AICPA 5% and 10% tables and the exact binomial. The item states no risk level, so an unusual firm table cannot be excluded. Confidence is medium.
- **Blueprint task statements.** The exact wording and skill levels for the 2026 AUD Blueprint Area III group C ("Sampling techniques") could not be confirmed. One web search returned only secondary study sites, e.g. https://open-exam-prep.com/study-guides/cpa/aud-risk-controls-evidence/sampling-analytics-and-estimates, which places sampling in Area III (30–40%). The skill-level judgments in findings 004 and 005 therefore use the generic Blueprint skill definitions.

## (f) Could not check / cross-module observations

**Not checked.**
- Primary text of AU-C 530 and AS 2315, which can't be fetched. Paragraph references (.12 investigate nature and cause; .13 anomalies; .14 projection; .15 evaluation) are from memory and were not web-verified, to conserve the shared search budget.
- How the app orders practice items, and miss routing. Both belong to the app review.

**Cross-module observation for the coordinator** (not filed, because the item is outside this batch). `content/aud/tbs/aud-tbs-x12-control-deviations.json`, control B, gives an upper deviation rate of **10.3%** for 2 deviations in 60. This lesson and the AICPA 5% table give **10.2%** for the same sample (exact binomial 10.12). x12 states no risk level ("firm's evaluation tables"). Its conclusion (exceeds the 7% tolerable rate) is unaffected, but the platform states two different table values for one sample. The other x12 values (0/60 → 4.9%, 1/50 → 9.2%) match the AICPA table.

**Consistency.** These all agree with the lesson's rules:
- `content/aud/review/aud-high-yield.md` (sampling line)
- the AUD glossary entries "Monetary unit sampling (MUS)" and "Tainting"
- `aud-tests-of-controls` question at about line 604 (inverse relation of sample size to acceptable risk)
- aud-exam-area2 explanation at line 1540
