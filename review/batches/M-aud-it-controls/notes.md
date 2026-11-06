# M-aud-it-controls — reviewer notes

Module `aud-it-controls` (AUD-II, unit aud-u4). There are 42 items: 1 lesson, 3 lesson MCQs, 27 practice MCQs, 4 exam MCQs, 6 flashcards and 1 TBS. All 42 are reviewed (`ledger.csv`). There are 16 findings: S1 0, S2 3, S3 9, S4 4. `merge_batch.py --check` passes. I used one web search (benchmarking, AS 2201 App. B).

## (a) Blind vs key

**There are no disagreements.** My blind answers (`blind-answers.csv`) match the key on all 34 MCQs (3 lesson, 27 practice, 4 exam) and all 9 TBS rows. Two cases were close calls; I resolved both in the key's favour and recorded the residual issue as a finding:

| id | my answer | key | resolution |
|---|---|---|---|
| aud-tbs-r3-it-coso t6 | Manual control (noted that AS 2201.24 treats period-end financial reporting controls as entity-level) | Manual control | Key stands, because the option text "Entity-level (control environment)" rules out entity-level. The taxonomy problem is finding 012 (S3). |
| aud-itc-06 / aud-itc-13 | d / a | d / a | Correct under PCAOB benchmarking (AS 2201.B28–B33). Under AU-C 330.14 the answer is also right within the three-audit rotation. The missing framework and re-baselining limit are finding 004 (S3). |
| aud-itc-09 | b (180 = 9 × 20) | b | Agree. The divisible-by-9 rule is never taught, and slides also give multiples of 9 (finding 005). |
| aud-itc-07 | a | a | Agree. "Rejected items" could be read as input error handling (finding 015, S4, low confidence). |

## (b) Lesson design

- **Big idea.** It is clear and well chosen: ITGCs vs application controls, and why weak change control undermines automated controls, with a concrete payroll limit-test example.
- **Pre-question** (`aud-itc-pre1`). It primes the right concept, the ITGC vs application distinction from the first section. It nearly duplicates mock item `aud-x2-30`, though (finding 014).
- **Body.**
  - The two-layer table, the error→control matching table and the batch-totals worked example are accurate. I recomputed the example: record count 4, financial total 5,730, hash total 7,385. All are correct.
  - The flowchart on ITGCs and reliance is sound but presents benchmarking without its framework or limit (finding 004).
  - The infrastructure table is good. The cloud row needs the Type 1 vs Type 2 nuance and an AU-C 402 citation (finding 016).
- **Takeaways.** One misstates the SAS 145 scope ("for controls it plans to rely on"): finding 001 (S2). The others are accurate.
- **Inline checks.** `chk1` (access ITGC) and `chk2` (check digit) are both recall-level. No check covers the analysis objective (effect of ITGC deficiencies on reliance) or SAS 145; I suggest adding one.
- **Minutes.** The lesson runs about 980 words (frontmatter about 430, body about 550), with 4 tables, 1 worked example, 1 flowchart, 2 checks and 1 pre-question. About 12–15 minutes is realistic, so `minutes: 15` is OK.
- **Objectives.** Objective 4 (IT infrastructure) has no `task`. The 2026 Blueprint emphasis on entity-level controls is absent from this lesson and from all AUD lessons (finding 002, S2).
- **Lesson–item alignment.** These items test material the lesson never teaches:
  - `aud-itc-09`: the divisible-by-9 transposition/slide clue.
  - `aud-itc-15`: responding to a cybersecurity or ransomware incident.
  - `aud-itc-20`: CAATs (parallel simulation, ITF, test data, embedded audit modules). No AUD lesson teaches them.
  - `aud-itc-27`: carve-out and subservice organizations. No AUD lesson teaches this.
  - `aud-itc-11` and `aud-x2-41`: SOC 1 Type 1, SOC 2 and SOC 3 distinctions. They are only partly taught here and taught fully in later modules (`aud-using-others`, `aud-attestation`).

  The first four are finding 005. The SOC items are answerable from the lesson's "SOC 1 type 2" line.
- **Sequencing.**
  - The prerequisites `aud-understanding-entity` (SAS 145 risk assessment) and `aud-internal-control` (COSO, segregation of duties) come before this module, as they should.
  - The lesson and items lean on later modules: `aud-tests-of-controls` (prior-year evidence, one-instance testing; benchmarking also conflicts with it on the rotation rule, finding 004) and `aud-using-others` (SOC reports; carve-out not covered there either).
  - No hard dependency on a later module blocks understanding, except for item 27.

## (c) Practice design

- **Counts.** 27 practice MCQs, 4 exam MCQs, 3 lesson MCQs, 6 flashcards and 1 TBS. The MCQ count is ample for a 15-minute module.
- **Difficulty spread (practice).** d1: 8, d2: 9, d3: 10. Several d3 labels are inflated (18, 24–27), so the real spread is easier than labeled (findings 003 and 006).
- **Progression.** File order is not easy→hard: the d1–d3 items are interleaved. The final block (21–27) is the tersest and easiest content, yet it is mostly labeled d3, with the thinnest explanations and weakest distractors (findings 009 and 010).
- **Skill mix (practice + exam, 31 items).**

  | Skill | As labeled | As I would label | AUD target |
  |---|---|---|---|
  | Remembering | 9 (29%) | about 10 | 30–40% |
  | Application | 13 (42%) | about 18 | 30–40% |
  | Analysis | 7 (23%) | 3 (09, 15, 19) | 15–25% |
  | Evaluation | 2 (6%) | 0 | 5–15% |

  The module is heavy on recall and application, as suits an "understand ITGCs" topic. Rewriting two or three items as real analysis or evaluation items (e.g., given ITGC test results, which automated controls can still be relied on; the TBS Part r suggested in finding 013) would help the section-level mix.
- **Redundancy.** The rule "ITGC/change-management failure → automated controls unreliable → more substantive work" is tested four times (02, 19, 24, 26: finding 007). The near-duplicate pairs are 06/13, chk2/16, 04/x2-17, and pre1/x2-30 (an exam item repeating a pre-question) (finding 014). The cross-module pair x2-41 ~ aud-uo-chk2 is noted in 014.
- **Cues.** Real cues are 08, 10, 13, 19 and 24 (finding 008). I dismissed the cues.md flags on 03, 16 and 17 ("key much shortest", because the correct term is simply short), on 05, 07, 09 and 15 ("key longest", with marginal length differences), and on 06, 11 and 12 (a single absolute in one distractor).

## (d) Items with no issues

aud-itc-chk1, aud-itc-01, aud-itc-03, aud-itc-05, aud-itc-11, aud-itc-17, aud-itc-21, aud-x2-16, aud-itc-f1, aud-itc-f2, aud-itc-f3, aud-itc-f4, aud-itc-f5.

## (e) Needs expert verification

1. **Paragraph number** (finding 001). I cite AU-C 315.26 for the SAS 145 list of controls to identify (journal entries, significant risks, controls to be tested, other) and the chain to IT applications and general IT controls. The substance is from memory of SAS 145 and is high confidence; the paragraph number is medium confidence.
2. **AICPA exception for automated controls** (finding 004). Does AU-C 330 or the AICPA Risk Assessment guide recognize benchmarking of automated controls as an exception to the AU-C 330.14 "at least once every third audit" rule? I believe it does not, and the platform's own `aud-tests-of-controls` lesson applies the rule to all unchanged controls. I could not fetch the AICPA text.
3. **Blueprint task text** (finding 002). The exact 2026 Blueprint task text for "Control environment, IT general controls, and entity-level controls" (the two revised tasks) was not seen; the rename comes from `review/reference/blueprint-notes.md`.
4. **aud-itc-07** (finding 015). Is review of an exception report of rejected items better taught as an input or an output control? This is low confidence.

## (f) Could not check, and why

- I could not open the Blueprint PDF or the AICPA and PCAOB standard texts: the egress proxy blocks them. I relied on the reference sheets, one web search (Protiviti summary of AS 2201.B28–B33) and my own knowledge.
- I did not check app behaviour (miss routing back to the lesson, rendering of the mermaid flowchart or TBS scoring display); it is out of scope for this content batch.
- While checking its usage I ran `review/tools/dupscan.py`, which regenerates `review/batches/C-duplicates/candidates.tsv`. The regenerated file is byte-identical to the committed one (`git status` shows no change); only its timestamp changed. I made no other writes outside this folder, and I committed nothing.
