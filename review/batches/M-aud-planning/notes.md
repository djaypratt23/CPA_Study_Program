# M-aud-planning — reviewer notes

Module `aud-planning` (AUD-II, unit aud-u3). 45 items: lesson, 3 lesson MCQs, 27 practice MCQs, 6 exam MCQs, 6 flashcards, 2 practice TBS. 24 findings: S1 0, S2 3, S3 18, S4 3. No web searches were used; the reference sheets and the AU-C text I know well enough settled every point. Uncertain points are listed in (e).

## (a) Blind answers vs. keys

All 36 MCQs and all 16 TBS cells (9 in r3, 7 in u3) matched the keys on the blind pass, so there are no disagreements to resolve.

| id | my answer | key | resolution |
|---|---|---|---|
| (none) | — | — | All keys match. aud-tbs-u3-analytics `dsi` = 91.25. Rounding half-up gives 91.3 and banker's rounding gives 91.2; the ±0.1 tolerance accepts both (`withinTolerance` adds 1e-9). |

Notes from the blind pass that became findings: the aud-pl-08 stem's "about 10%" conflicts with its own drivers, which give 13.3% (finding 005). The aud-pl-03 distractors 40 and 73 cannot be reproduced from the stem (006). aud-pl-15 uses SAS 149 terms (001).

## (b) Lesson design

- **Big idea → pre-question → body → takeaways → checks.** The big idea is clear, and its example (margin 30% → 35% while competitors fell) ties to the worked example. There is one pre-question (aud-pl-pre1: which document is more detailed). It primes strategy vs. plan well. The analytics half of the lesson, which carries the module's only analysis-level objective, is not primed (finding 024). There are two inline checks: chk1 (strategy vs. plan) and chk2 (risk assessment procedures). The faded example works as an analytics check.
- **Technical accuracy.** All worked numbers were recomputed:
  - GM 35.0% / 30.0%
  - DSO 50.0 / 36.4
  - faded example: 20,000 → 50 days, and 18,000 → 30 days

  The inventory-turnover step compares an average-inventory basis (3.6) with a year-end basis (4.0) (finding 018). The lesson implies that only the plan, not the strategy, is updated during the audit (finding 019). Everything else checks:
  - preliminary activities (AU-C 300.06)
  - the strategy/plan contents (AU-C 300.08–.09)
  - risk assessment procedures (AU-C 315)
  - the team discussion, including fraud and partner participation
  - analytics required at the planning and final stages, and optional as substantive procedures (AU-C 315 / 520.06)
  - TCWG told the planned scope, timing and significant risks (AU-C 260.11)
- **Currency.** The lesson states nothing that is outdated. It does not discuss SAS 145 itself; aud-understanding-entity and aud-risk-materiality cover it. Citations: AU-C 300, 315, 520, 260; AS 2101, 2110. They are correct, and AS 2110 is the right PCAOB pairing. No `taxYear` applies (AUD).
- **Minutes.** About 950 words (≈5–6 min reading), plus a 4-step worked block, a 3-step faded block, a pre-question and 2 checks. 16 minutes is realistic.
- **Lesson–item alignment.** These items test material the lesson never teaches:
  - aud-pl-21, aud-pl-22, aud-pl-24, aud-pl-26: materiality. Taught in aud-risk-materiality, the *next* module.
  - aud-pl-27: misstatements approaching materiality (AU-C 450). Taught in aud-risk-materiality / completion.
  - aud-pl-15: group audits and component materiality. Taught in aud-using-others (aud-u8, later).
  - aud-pl-18: interim substantive testing. Taught in aud-risk-response (aud-u5, later).
  - aud-pl-17: opening balances (AU-C 510). Taught in aud-engagement-acceptance (earlier), so it is acceptable as a prerequisite, but this lesson does not cover it.
  - aud-tbs-r3-substantive-analytics: thresholds and investigating differences in substantive analytics. Taught in aud-data-analytics and aud-risk-response (later) (finding 014).
  - aud-tbs-u3-analytics: days in inventory and allowance coverage are not shown in the lesson, though both are easy to derive (finding 024).
- **Sequencing.** Seven of the 27 practice items (26%) rely on later modules (finding 010, S2). Nothing in the lesson body relies on a later concept.

## (c) Practice design

- **Counts.** 27 practice + 3 lesson + 6 exam MCQs, 6 flashcards, 2 TBS. The count is adequate, but about 30% of the pool is off-module or duplicated (findings 010, 011, 012). The strategy-vs.-plan fact alone appears in 7 MCQs.
- **Difficulty spread (practice).** d1 = 6, d2 = 9, d3 = 12. Several d3 labels are inflated (pl-24, a multiplication with the rate given; pl-25, a near-giveaway).
- **Progression.** There is no easy→hard order. The difficulties by item run 1,3,2,3,1,1,1,3,2,2,3,3,1,2,3,2,2,2,3,3,2,1,2,3,3,3,3, so items 01–07 jump between d1 and d3.
- **Skill mix (practice + exam, 33 items).**
  - As labelled: R 39%, Ap 21%, An 33%, E 6%.
  - After my corrections (findings 002, 003): about R 52%, Ap 21%, An 27%, E 0%.
  - Blueprint: R 30–40, Ap 30–40, An 15–25, E 5–15.

  The module is recall-heavy. Application is under-represented, and there is no genuine evaluation item. Area II has an "evaluate whether risk assessments and planned responses remain appropriate" task (AUD-II.E.5) that this module could serve: for example, new information arrives mid-audit and the candidate chooses among plausible strategy/plan revisions.
- **Cues.** In 15 of 39 MCQs the key is the longest option (38%, against 25% by chance). That is a mild pattern only, and I did not raise it as a finding. The absolute/hedge and overlap cues are in finding 008, and the implausible distractors in finding 009.
- **Mock exposure.** aud-mock-3 puts aud-x2-04 and aud-x2-46 (same fact, same key) in one testlet. aud-x2-39 on that mock repeats lesson check aud-pl-chk2 (finding 013).

## (d) Items with no issues

aud-pl-pre1, aud-pl-chk1, aud-pl-02, aud-pl-04, aud-pl-05, aud-pl-06, aud-pl-07, aud-pl-10, aud-x2-03, aud-x2-24, aud-pl-f1, aud-pl-f2, aud-pl-f3, aud-pl-f4, aud-pl-f5, aud-pl-f6.

The keys of every other MCQ and every TBS cell are also correct. Their findings concern labels, distractors, explanations, alignment or duplication.

## (e) Needs expert verification

- Finding 001: the paragraph number of the extant AU-C 600 rule ("component materiality lower than group materiality", which I give as AU-C 600.22) is from memory. The SAS 149 date and its testability from 2027 come from the reference sheet (verified, and derived from the policy).
- Finding 020: the wording of the AU-C 450 application guidance on misstatements approaching materiality is from memory. AU-C 450.08(b) itself is solid.
- Finding 019: the cite PCAOB AS 2101.15 (changes to the strategy and plan) is from memory.
- Finding 023: the AUD-II.A.2 task text ("direction, supervision and review") is a reconstructed Blueprint row, not verbatim.
- Finding 017: whether "Inventory — valuation" is a defensible alternative for row k1 is a judgment call. I keep Revenue — occurrence as the best answer.

## (f) Not checked, and why

- The app (rendering of these items, scoring display) was not checked. Usability is reviewed separately, and this batch is content-only.
- The official 2026 Blueprint PDF is unreachable, so the coverage and skill judgments use `review/reference/blueprint-notes.md` and `blueprint-tasks.csv`, which are reconstructed.
- No web searches were needed, so none of the shared budget was used.
