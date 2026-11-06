# M-aud-understanding-entity: reviewer notes

**Scope:** 43 items, all reviewed:

- the lesson
- 3 lesson MCQs
- 27 practice MCQs
- 6 exam MCQs
- 6 flashcards

There are no TBS files.

**Findings:** 18 in all. 1 is S2, 15 are S3 and 2 are S4. The details are in `findings.jsonl`.

## (a) Blind answers compared with the keys

Every one of the 36 blind answers matches the key: `pre1`, `chk1`, `chk2`, items `01` to `27`, and exam items `x2-09`, `-10`, `-11`, `-27`, `-39` and `-46`. None of the keys is wrong. Notes on the items where I had to check something:

| id | My answer | Key | Resolution |
|---|---|---|---|
| aud-ue-05 | b | b | The key is right. The explanation runs the stand-back (AU-C 315) together with AU-C 330.18. The exact AU-C 330.18 wording after SAS 145 is still unverified (F-011). |
| aud-ue-11 | d | d | 1.05 × 0.90 = 0.945, so revenue falls about 5.5%. Distractor (c), +10%, comes from a sign error on the 10% quantity change, so its `wrong-sign` label fits. Options (a) and (c) overlap (F-009). |
| aud-ue-20 | d | d | (d) is the best option offered, but the item uses the pre-SAS 145 framing (F-014). |
| aud-ue-02 | d | d | (c), "not assessed at all", is wrong because GAAS has control risk assessed at maximum, so RMM equals inherent risk. |

## (b) Lesson design

**Big idea.** It is clear and well chosen: learn the business, then place each risk on the inherent risk spectrum by its factors. The example matches the factors to assertions loosely, saying "occurrence" where it means accuracy (F-018, S4).

**Pre-question.** There is one, `aud-ue-pre1`, and it primes the inherent risk factors well. Nothing primes the difference between financial-statement-level and assertion-level risk, the economics section or the Sarbanes-Oxley section. A second pre-question on financial-statement-level versus assertion-level risk would help.

**Body.**
- What the auditor must understand: a table that matches the SAS 145 list.
- The inherent risk factors: a flowchart, followed by `chk1`.
- Levels of risk: a table.
- A worked example, Marlow, placing three accounts on the spectrum. No numbers need recomputing.
- `chk2`.
- Separate assessments and the stand-back.
- Economics.
- The Sarbanes-Oxley table.

The SAS 145 content is accurate and current. SAS 145 is effective for periods ending on or after Dec 15, 2023, so it is testable in 2026. The gaps:

1. The stand-back is run together with the AU-C 330.18 rule on substantive procedures (F-011).
2. The lesson cites PCAOB AS 2110 but never teaches how it differs from GAAS, including its definition of a significant risk (F-012).
3. The §404(b) row leaves out the exemption for emerging growth companies (F-016).
4. The elasticity rule is stated without absolute value (F-017).
5. The lesson lists "unemployment duration" as lagging and "employment" as coincident. `aud-ue-12` then calls "the unemployment rate" lagging, which is a common classification. The key is not affected; this is just a note.

**Takeaways.** All seven are accurate and line up with the body.

**Inline checks.** `chk1` and `chk2` are placed well, but `chk1` is duplicated by exam item `x2-27` (F-007).

**Minutes.** The lesson is about 1,000 words (446 in the frontmatter, 556 in the body), with 2 inline checks, 1 worked example, 1 diagram and 3 tables. The stated 15 minutes is realistic.

**Lesson–item alignment.** These items test material the lesson never teaches (F-013):

| Item | What it tests |
|---|---|
| `aud-ue-17` | Understanding the controls over a significant risk |
| `aud-ue-23` | Design and implementation of controls |
| `aud-ue-27` | Walkthroughs and implementation |
| `aud-ue-20`, `aud-ue-26` | The entity's risk assessment process |
| `aud-ue-19` | Business risk compared with risk of material misstatement |

The lesson also gives little support to:
- `aud-ue-08` and `aud-x2-11`, on sources of information about the industry and regulation. These can be answered by common sense.
- `aud-ue-16`, `aud-ue-21`, `aud-ue-22`, `aud-x2-39` and `aud-x2-46`, on risk assessment procedures and the team discussion. These are taught in the earlier module `aud-planning`, which is an acceptable prerequisite, but they repeat its items.

**Sequencing.** Design and implementation, and walkthroughs, are taught in `aud-internal-control`, the *next* module. So `aud-ue-17`, `aud-ue-23` and `aud-ue-27` depend on later content. "Business risk" is not taught in any AUD lesson, and the entity's risk assessment process (as the auditor evaluates it) is not taught in any either.

## (c) Practice design

**Item counts.** 27 practice MCQs, 6 exam MCQs and 3 lesson MCQs. That is enough.

**Difficulty**, practice and exam combined:

| Difficulty | Items |
|---|---|
| 1 | 11 |
| 2 | 14 |
| 3 | 8 |

All eight difficulty-3 items are back-half short-form items (`ue-19`, `-20`, `-24`, `-25`, `-26`, `-27`) or scenarios whose distractors are plainly irrelevant (`ue-09`, `-14`). Their real difficulty is 1–2 (F-001, F-002).

**Order.** Practice sessions are shuffled least-seen-first (`src/lib/quiz.ts`), so the order of the ids does not set an easy-to-hard progression. That is acceptable.

**Skill mix.**

| Skill | Labelled items | Share | Blueprint range |
|---|---|---|---|
| Remembering and understanding | 12 | 36% | 30–40% |
| Application | 13 | 39% | 30–40% |
| Analysis | 6 | 18% | 15–25% |
| Evaluation | 2 | 6% | 5–15% |

The labels look in range, but every analysis and evaluation label is overstated. Once corrected, the module has roughly 15 remembering, 18 application and **0 analysis or evaluation** items. Area II includes analysis tasks (II.B.1.3 and II.E.4) and an evaluation task (II.E.5). The fix is 2–3 genuine fact-pattern items (F-001).

**Calculation flag.** `calc` is false on all items, which is acceptable as written. It should be set to true if `ue-11` is rewritten with numeric options as F-009 proposes.

**Quality.**
- The front half (`01`–`15`) is solid. Its distractors are plausible and its explanations teach.
- The back half (`16`–`27`) is weak: the distractors are implausible, they carry "only/nothing" cues, and the explanations are circular (F-003, F-004).
- `ue-16` and `ue-21` are exact duplicates (F-005).
- Exam items duplicate lesson checks and items in `aud-planning` (F-005, F-006, F-007). Mock 3 includes both `aud-x2-04` and `aud-x2-46`.

**Routing back.** Every item carries `moduleId: aud-understanding-entity`, so a missed item routes back to this lesson. That is a poor fit for `ue-17`, `ue-23` and `ue-27`, which belong to `aud-internal-control`.

## (d) Items with no issues found

- `aud-ue-pre1`
- `aud-ue-01`, `-02`, `-03`, `-04`, `-06`, `-07`, `-08`, `-13`
- `aud-x2-11`
- flashcards `aud-ue-f1`, `-f2`, `-f3`, `-f4`, `-f6`

## (e) Needs expert verification

1. **The wording of AU-C 330.18 as amended by SAS 145 (F-011).** Does it require substantive procedures for "each material class of transactions, account balance, and disclosure", which is the ISA 330.18 wording, or "all relevant assertions related to each material class", which is the pre-SAS 145 AU-C wording? Or something else? The answer affects several AUD modules, which currently give three different versions:
   - `aud-risk-response`
   - `aud-risk-materiality`
   - the explanations of the `aud-x2` exam items
   - `aud-tbs-u5-estimates`
   - `aud-tbs-r3-risk-responses`

   Two web searches returned only the ISA and Australian equivalents:
   - https://www.charteredaccountants.ie/chariotindex/text/apb_isa_330_2010/41.html
   - https://cfrr.worldbank.org:443/sites/default/files/2020-02/AuditToT-5-09-1.pdf
   - https://www.grfcpa.com/wp-content/uploads/2022/08/Understanding-Whats-Next-for-SAS-No.-145-and-the-2022-Compliance-Supplement.pdf
2. **Whether the 2026 AUD Blueprint, Area II.B, tests microeconomics (F-015).** The microeconomics in question is elasticity, MR = MC and the classification of leading, coincident and lagging indicators. One secondary source says economics concepts moved from BEC to BAR and ISC: https://open-exam-prep.com/study-guides/cpa/exam-structure-licensure/cpa-evolution-model. The objective wording in the lesson looks as if it may have come from Blueprint text, so check the 2026 AUD and BAR PDFs. Confidence is low. REVIEW.md P1-7 records that this content was added on purpose.
3. **The PCAOB's significant-risk definition (F-012).** I quoted it from memory as AS 2110.A5: "a risk of material misstatement that requires special audit consideration". I am fairly confident of it.

## (f) What I could not check, and why

- **Primary texts.** I could not fetch AU-C 315, AU-C 330 or AS 2110, or the 2026 AUD and BAR Blueprint PDFs, because the egress proxy blocks them. I used all 3 web searches, so the items in (e) remain open.
- **TBS checks.** There are no TBS items in this batch.
- **The app.** I did not run it, which is outside the scope of this batch. Choice order is shuffled in `McqView` (`displayChoices`), so I did not analyse the distribution of key letters.
