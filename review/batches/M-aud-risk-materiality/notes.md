# M-aud-risk-materiality: reviewer notes

Scope: 51 items. These are 1 lesson, 3 lesson MCQs, 27 practice MCQs, 8 exam MCQs, 8 flashcards, and 4 TBS (2 practice, 2 exam). All 51 were reviewed (ledger.csv). There are 22 findings: S1 0, S2 3, S3 16, S4 3.

## (a) Blind vs. key

The blind pass was done before opening any key (blind-answers.csv: 35 MCQ rows and 43 TBS rows).

| id | my answer | key | resolution |
|---|---|---|---|
| All 35 MCQs | — | — | All agree |
| All 4 TBS (35 numeric and dropdown cells) | — | — | All agree |

No disagreements. Points I flagged during the blind pass that became findings:
- **u3 a2 vs. a3.** The two rows' RMM are not distinguishable from the exhibit (finding 016).
- **x8 c5 vs. rm-12.** The two items reach opposite conclusions for aggregates that approach materiality (finding 018).
- **x8 c4.** The options overlap: the item is both factual and clearly trivial (finding 021).

Numeric distractors reproduced in python:
- **rm-02, rm-05 and x2-05:** every distractor maps to its named error.
- **rm-14 (c) 120,000, rm-25 (c)/(d) and x2-25 (c) 150,000:** the rationale does not name the error that produces the number (finding 008).

## (b) Lesson design

- **Big idea:** clear and well chosen (reasonable assurance, the risk model and materiality). The materiality definition is looser than the SAS 138 wording (finding 019).
- **Pre-questions:** there is one (pre1, which risk the auditor controls). It primes the first half well; nothing primes materiality or AU-C 450 (finding 022).
- **Body:** a mermaid diagram of the model, a component table, a worked DR example (1.00 × 0.50 → 10%), a faded DR example (0.80 × 0.25 = 0.20 → 25%), a nature/timing/extent table, a significant-risk paragraph, a worked materiality example (2,000,000 → 100,000 / 75,000 / 5,000), qualitative factors and AU-C 450 evaluation. I recomputed every number; all are correct.
- **Takeaways:** accurate, except the clearly-trivial takeaway, which states an absolute (finding 001, S2).
- **Inline checks:** chk1 and chk2 are both appropriate.
- **Citations:** AU-C 200, 315/330, 320 and 450, and AS 1101/2105. All are current.
- **Currency:** SAS 145 language is used (separate IR and CR; inherent risk factors). Nothing in the module depends on SAS 149, QC 1000 or SAS 150/151, so no testability-date issue arises.
- **Minutes:** the stated 18 is slightly generous. The lesson is about 1,120 words including frontmatter (about 640 in the body), with 2 checks, 1 faded example and 1 pre-question, which I estimate at 12–15 minutes. Not flagged.
- **Lesson–item alignment.** These items test material the lesson never teaches (finding 004, S2, and finding 005):
  - Materiality benchmark choice: rm-18, rm-19, x2-06. Not taught anywhere in AUD.
  - Specific (lower) materiality for particular classes (AU-C 320.10): rm-13, x2-07. Not taught anywhere in AUD.
  - Tolerable misstatement: rm-20, rm-25. Only named in the lesson; taught later in aud-sampling.
  - Factual, judgmental and projected misstatements: x8 c1–c3. Not taught anywhere in AUD.
  - The estimate-range misstatement rule: x8 `war`. Taught later in aud-specific-risks.
  - An understanding of internal control is always required: rm-09. Taught later in aud-internal-control.
  - Controls over significant risks are tested in the current period: rm-27. Taught later in aud-tests-of-controls.
  - The definition of significant risk and the inherent risk spectrum: x2-26. Taught later in aud-understanding-entity.
  - Fraud risk factors and management override: x3 `rk` and `fac`. Taught later in aud-fraud-risk; x3's moduleIds include that module.
  - Direct-effect laws (AU-C 250): x3 `law`. Taught later in aud-specific-risks.
- **Sequencing:** the lesson's prerequisite is aud-planning (16 min), and the lesson relies on nothing taught there. It does use "significant risk" before aud-understanding-entity defines it (finding 005).

## (c) Practice design

- **Counts:** 27 practice MCQs and 2 practice TBS, plus 8 exam MCQs and 2 exam TBS. That is ample volume, but redundant:
  - RMM ↑ → DR ↓ is tested 5 times (finding 013).
  - The pre-question and checks reappear verbatim in practice (finding 014).
  - "Clearly trivial need not be accumulated" is tested 3 times (finding 015).
- **Difficulty as labeled:** 1 ×10, 2 ×18, 3 ×7. Progression: the practice order does not run easy to hard. The difficulty-3 items cluster at rm-24 to rm-27, and they are actually the easiest recall items (finding 002). rm-21 to rm-23 (difficulty 1–2) follow the difficulty-3 items rm-12, rm-14 and rm-19.
- **Skill mix (practice + exam, 35 items):**
  - As labeled: R 11, A 17, An 4, E 3 (31/49/11/9%).
  - As this review would relabel them (findings 002 and 003): R 20, A 14, An 0, E 1 (57/40/0/3%).
  - Blueprint AUD targets: R 30–40, A 30–40, An 15–25, E 5–15.
  - The module has essentially no genuine analysis-level MCQs, although Area II is a judgment-heavy area. The only higher-order work is in the TBS: x3 (analysis) and x8 c5 (evaluation). The fix in finding 002 suggests new items.
- **Routing:** misses on rm-09, rm-27 and x2-26, and on parts of x3 and x8, route to lessons that do not teach the rule (findings 005 and 006).
- **Exam pool independence:** x2-25, x3 and x8 reuse figures from the lesson or the practice TBS (finding 007).

## (d) Items with no issues found

aud-rm-02, aud-rm-03, aud-rm-04, aud-rm-05, aud-rm-06, aud-rm-07, aud-rm-08, aud-rm-12, aud-x2-05, aud-rm-f1, aud-rm-f2, aud-rm-f3, aud-rm-f4, aud-rm-f6, aud-rm-f7, aud-rm-f8.

aud-rm-12 itself is correct; finding 018 asks for x8 to be reconciled with it.

Cue-tool flags I judged not to be real cues: pre1, rm-03, rm-07, rm-09 and rm-13 ("key longest", by 1–7 characters only); rm-10, rm-15 and x2-26 (a single absolute in one distractor); rm-21 and x2-37 (the key is a short technical term). The flags on rm-17 and rm-27 are real, and finding 011 covers them.

## (e) Needs expert verification

- **Finding 019 (SAS 138 wording of AU-C 320.02).** The search confirmed via the AICPA page that SAS 138 aligns the description with the judicial standard. The exact "substantial likelihood … influence the judgment made by a reasonable user" text is from memory.
- **Finding 020 (SAS 145 terminology for rm-09 option d).** From memory; low impact.
- **Finding 012 (x2-06 (a), whether volatility can raise materiality).** This is a judgment call. Medium confidence.
- **AU-C 240.** I confirmed from memory that management override is treated as a significant risk (x3 r3) and that significant subjective estimates are an "opportunity" factor (x3 f2). No finding was raised. AU-C 240 is superseded by SAS 151 only for periods ending on or after Dec 15, 2028, so it is not relevant to the 2026 exam.

## (f) Not checked, and why

- **The app (sections 3–4 of the brief):** the app is reviewed separately. I only read `TbsView.tsx` to confirm how "%" rows are keyed (percent points; 0.25 is scored wrong, which supports finding 022).
- **Blueprint coverage CSV:** outside batch scope. Area II.D (materiality, tolerable misstatement and PM) has items, but its lesson coverage is thin (finding 004).
- **Web search:** I used 1 of the 3 allowed searches, to confirm the AU-C 450 clearly-trivial "size, nature, or circumstances" and "if uncertain, not clearly trivial" language and the purpose of SAS 138. The sources were secondary study guides, the ISA 450 text and the AICPA SAS 138 download page.
