# M-far-depreciation — reviewer notes

Scope: 42 items (lesson, 3 lesson MCQs, 28 practice MCQs, 3 exam MCQs, 7 flashcards; no TBS). Blind answers were saved in `blind-answers.csv` before `items.json` and `cues.md` were opened. 21 findings: S1 0, S2 2, S3 12, S4 7. No web searches were used: every rule involved is long-settled GAAP covered by the reference sheets or by solid knowledge.

## (a) Blind vs key

All 34 MCQ keys match my blind answers. There are no key disagreements.

| id | my answer | key | resolution |
|---|---|---|---|
| all 34 MCQs | — | — | Agree |
| far-dep-17 | c (8,000) | c | Agree. But the stem's "partial-year convention" leaves (d) 16,000 (half-year) and (a) 32,000 (full year) defensible, and no fiscal year-end is given → S2 (finding 001). |
| far-dep-18 | d (200,000) | d | Agree. "Remaining reserves revised to 500,000" is clear. Option (a)'s "the midpoint" tag is a stray cue (finding 012). |
| far-dep-28 | d (1,333) | d | Agree. The salvage floor binds in Year 2. |

## (b) Lesson design

- **Big idea.** Sound: cost allocation, not valuation. Its example ($90,000 mower, $10,000 salvage, 5 years → $16,000) is the same asset the method table uses, which ties the lesson together.
- **Pre-question.** There is one, far-dep-pre1 (DDB Year 1). It primes the DDB "ignore salvage in the base" trap well. Nothing primes disposals or exchanges (S4, finding 021).
- **Body.** I recomputed every number and all are correct:
  - Method table: SL 16,000; DDB 36,000 / 21,600; SYD 26,667 / 21,333; units of production $0.40 × 45,000 = 18,000.
  - April 1 proration: 12,000.
  - Change-in-estimate worked example: 72,000 → 64,000 → 16,000.
  - Disposal JE balances: 15,000 + 32,000 + 3,000 = 50,000.
  - Faded exchange: 30,000 / 6,000 / 46,000 / 40,000.
  - Flowchart: proportional gain = boot ÷ total consideration received, and boot of 25% or more makes the exchange monetary. Both match ASC 845-10-25-6 and 30-6.
  - I checked the DDB partial-year shortcut algebraically: rate × beginning carrying amount gives the same result as allocating by depreciation year, so dep-15 and dep-17 are consistent with the lesson.
- **Gaps:**
  - Composite/group depreciation, leasehold-improvement amortization and the half-year convention are tested but never taught (S3, finding 007).
  - Restoration costs in the depletion base lack the ARO fair-value (PV) qualifier, which conflicts with the far-ppe-acquisition lesson (S3, finding 008).
  - The other ASC 845-10-30-3 exceptions are missing (S4, finding 018).
  - Two citations are imprecise (ASC 932 vs 930; ASC 250-10-45-17 vs 45-18 to 45-20), and the preferability requirement is never mentioned (S4, finding 017).
- **Key takeaways.** Accurate. "(and changes in depreciation method) are changes in estimate" is loose wording, but the worked-example insight gives the precise "estimate effected by a change in principle".
- **Inline checks.** chk1 (SYD) and chk2 (exchange without commercial substance) sit at the right points. chk1 is a verbatim duplicate of dep-16 (finding 004).
- **Minutes.** The frontmatter is about 406 words and the body about 871. With 2 checks, the pre-question, a 4-input faded block, a worked example, a flowchart and the roll-forward table, 20 minutes is realistic.
- **Lesson–item alignment.** These items test material the lesson does not teach:
  - far-dep-14 and far-dep-26 (composite method)
  - far-dep-19 (leasehold improvements)
  - far-dep-15 (half-year convention; only partly taught)
  - far-dep-06 distractors (FIFO→average and error correction are taught later, in far-accounting-changes, unit 12; the key itself is taught here)
  - far-dep-20 (fully depreciated assets in use; only implied by "never depreciate below salvage")

  In the other direction, the lesson teaches several things no MCQ tests: SYD depreciation years that straddle fiscal years, the 25% boot rule, and objective 4 (roll-forward and register reconciliation, tested only in TBS from another batch) (finding 020).
- **Sequencing.** The lesson relies only on far-ppe-acquisition (the prior module), so it does not depend on anything taught later. There is one cross-module oddity: far-ppe-24, far-ppe-25 and far-x2-34 (far-ppe-acquisition) test nonmonetary exchanges, which are taught only here, one module *later*. That belongs to the far-ppe-acquisition batch; it is noted here for the merger.

## (c) Practice design

- **Counts.** 28 practice, 3 exam and 3 lesson MCQs. That is ample for the module's weight within FAR-II.
- **Labeled difficulty (practice + exam).** 1: 3, 2: 16, 3: 12. Labeled skill: remembering 2, application 19, analysis 10.
- **Labels are inflated.** dep-20 to dep-28 carry analysis/3 for one-step computations (finding 003), and dep-26 is recall labeled analysis (S2, finding 002). After correction the pool is roughly remembering 4, application 25, analysis 2. That is reasonable for a computational module, but it gives very little analysis-level practice against FAR's 35–45% target. Analysis-level work for PP&E sits in the two u6 TBS (roll-forward, subledger). Adding 1–2 analysis MCQs (e.g., error-in-schedule, register-to-GL) would help.
- **Progression.** The order is not easy → hard: dep-10 is difficulty 3, dep-11 difficulty 1, and dep-21 to dep-28 are labeled 3 but are the simplest items.
- **Redundancy:**
  - Exchange with commercial substance plus cash paid is tested 4 times across modules, plus the faded example (finding 006).
  - Change in useful life or salvage is tested by dep-04, dep-13 and dep-27, plus far-chg-24 and the worked example. That is borderline and not flagged separately.
  - DDB Year 2 basics: dep-21 = x2-28 (duplicate), plus x2-08.
- **Duplicates.** chk1 = dep-16; dep-14 ≈ dep-26; x2-28 = dep-21; x2-09 = the lesson's faded example (findings 004 and 005).
- **Cues judged:**
  - dep-08: key longest and uses absolutes. A real cue (finding 014).
  - dep-05: "key shortest" is not material (10 vs 14–15 characters), but the wording is awkward (S4, finding 015).
  - dep-14: key longest. Mild, because (d) is nearly as long. Not flagged.
  - dep-06, dep-07, dep-10, x2-09: the "absolutes in distractors" hints ("for all contracts", "no gain or loss", "None ($0)") are not real absolutes. Not flagged.
- **Currency.** FAR, no tax year; the lesson has no `taxYear`, correctly. No ASU in the 2026 window changes depreciation, depletion, disposals or ASC 845 exchanges. ASU 2024-03 (DISE) is not testable until 2027. ASU 2023-01 (common-control leasehold improvements) is testable and relevant to dep-19 (S4, finding 016). dep-06(d) uses superseded ASC 605-35 completed-contract/POC terminology (S3, finding 009).

## (d) Items with no issues

far-dep-chk2, far-dep-01, far-dep-04, far-dep-09, far-dep-10, far-x2-08, far-dep-fc1, far-dep-fc2, far-dep-fc3, far-dep-fc4, far-dep-fc6.

## (e) Needs expert verification

- Finding 001 (dep-17, medium): whether "partial-year convention" would reasonably be read as the half-year convention. I rate it a real ambiguity, because the stem names no convention.
- Finding 008 (medium): whether to require "PV of ARO" wording in depletion-base items. Classic CPA items sometimes still say "estimated restoration costs" while meaning the recognized ARO amount.
- Finding 017 (medium): exact ASC 250-10-45 paragraph numbers for method changes and preferability (45-18 to 45-20, from memory).

## (f) Not checked

- The app rendering of this module (usability is reviewed separately).
- The u6 PP&E TBS (`far-tbs-u6-ppe.json`), which is in another batch.
- The Blueprint FAR-II.D representative-task wording: not available verbatim in the reference sheets, so task-level coverage is judged against the lesson objectives' paraphrased tasks.
