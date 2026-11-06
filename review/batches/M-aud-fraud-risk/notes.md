# M-aud-fraud-risk — reviewer notes

Module `aud-fraud-risk` (AUD-II, unit aud-u4). 44 items: 1 lesson, 3 lesson MCQs, 27 practice MCQs, 6 exam MCQs, 6 flashcards, 1 TBS. 18 findings: S1 1, S2 3, S3 13, S4 1.

## (a) Blind vs. key

My blind answer matched the key on all 36 MCQs and all 16 TBS cells (`blind-answers.csv`). Agreement on the key did not settle every item:

| id | my answer | key | resolution |
|---|---|---|---|
| aud-x2-18 | b (and I flagged a) | b | (a) "excessive interest in maintaining the stock price" is listed under **attitudes/rationalizations** in AU-C 240 App. A and AS 2401.85, so the item has two correct answers → S1 (finding 001). |
| aud-fr-16 | d (noted b is arguable) | d | The key is defensible under App. A ("disregard for internal control … by overriding existing controls"). But the stem's "repeatedly overrides" fits opportunity (AU-C 240.A1), and the lesson diagram puts "override" under Opportunity → S2 (002). |

## (b) Lesson design

- **Big idea.** Clear and accurate: two fraud types, the triangle, two presumed risks, and why fraud needs special procedures. The CFO covenant example ties the triangle to journal-entry testing well.
- **Pre-question.** `aud-fr-pre1` primes the most-tested fact (management override can't be rebutted, revenue can). Good priming, though `aud-x2-31` on mock 2 is the same question (finding 007).
- **Body.** Accurate but thin: 505 body words, one table, one diagram, one worked selection example and two inline checks.
  - The communication-to-TCWG rule follows AS 2401.79 and leaves out the AU-C 240.40 categories: management (not just senior), and employees with significant roles in internal control (S2, finding 003). The platform's own written-representations lesson and the rep-letter TBS state the AU-C version.
  - No risk-factor examples table, no skepticism or inquiry section, no overall responses beyond the takeaways, no evaluation-of-evidence section and no documentation section (S3, finding 015).
  - The worked JE-selection example has no numbers to recompute, and its logic is correct.
- **Takeaways.** Accurate apart from the same incomplete TCWG rule. They introduce inquiries and the overall responses, which the body never teaches.
- **Inline checks.** chk1 (triangle) and chk2 (override procedure) sit right after the relevant sections. Neither checks the communication section; adding one there would help.
- **Minutes (17).** About 900 words including frontmatter, 3 MCQs and 1 worked block: about 10–12 minutes as written. 17 would be right after the content additions recommended in finding 015.
- **Lesson–item alignment.** These items test content the lesson never teaches:
  - aud-fr-02 and TBS f2: domination by one person, ineffective board oversight
  - aud-fr-11 b and aud-fr-16: disregard for controls as attitude
  - aud-x2-18: stock-price interest
  - aud-fr-14: living beyond means
  - aud-fr-19: inconsistent inquiry responses
  - aud-fr-07: unpredictability examples, which appear only in a takeaway
  - aud-fr-10: the inquiry parties, which appear only in a takeaway
  - aud-fr-24: DSO red flags (taught earlier, in aud-planning, so acceptable)
  - aud-fr-25: lapping, kiting and channel stuffing (taught later, in aud-revenue-receivables; finding 016)
- **Sequencing.** The brainstorming discussion and DSO are taught earlier, in aud-planning. Successor-auditor communications come earlier too (engagement acceptance). Lapping is the only later-module dependency. "Significant unusual transactions" and accounting estimates are defined well enough here for this lesson's purposes.
- **Currency.** AU-C 240 and AS 2401 are the 2026 testable standards. SAS 151 (approved Aug 2026, effective for periods ending on or after Dec 15, 2028) is not testable in 2026, so an optional note is suggested (S4, finding 018). The lesson has no `taxYear`, which is correct for AUD.

## (c) Practice design

- **Counts.** 27 practice + 3 lesson + 6 exam MCQs, 6 flashcards and 1 TBS: adequate for the module.
- **Difficulty (practice).** d1 = 7, d2 = 9, d3 = 11. Difficulty 3 is inflated: most d3 items (13, 18, 19, 20, 26, 27) are easy because of implausible or absolute distractors (findings 004, 008, 009). Practice order is shuffled by `src/lib/quiz.ts`, so file order doesn't matter.
- **Skill mix (practice + exam, 33).** As labelled: remembering 9, application 12, analysis 7, evaluation 5. As I would label them: remembering 11, application about 19, analysis about 3–4, evaluation 0. So the module's real mix is recall and application, with no genuine evaluation item even though lesson objective 3 is at evaluation level. Section-level targets (R 30–40, A 30–40, An 15–25, E 5–15) depend on these labels, so the mislabels overstate the higher-order coverage (findings 004 and 005).
- **Redundancy.**
  - The override-procedure question appears 4 times (finding 006), plus the TBS resp part and flashcard f3.
  - pre1 = x2-31, and 04 = 26 (finding 007).
  - Senior-management → TCWG appears 3 times (05, 13, 27), plus flashcard f4. That is at the threshold, so it is not flagged separately.
- **TBS.** All 16 cells recomputed and correct: tri f1 I, f2 O, f3 A, f4 O, f5 I, f6 O; type t1 FFR, t4 MoA, t5 FFR, t6 MoA; resp r1, r2, r4 required and r3, r5 not; research = a.
  - Scoring is cell-based with equal weights, and a perfect response scores 100%.
  - The exhibits are complete and consistent.
  - Findings: the research citation display (017) and skill/minutes (005).

## (d) Items with no issues found

aud-fr-chk1, aud-fr-01, aud-fr-07, aud-fr-11, aud-fr-14, aud-fr-21, aud-x2-32, aud-x2-42, aud-fr-f1, aud-fr-f2, aud-fr-f3, aud-fr-f4, aud-fr-f5, aud-fr-f6.

## (e) Needs expert verification

- **aud-x2-18 (S1).** The classification of the stock-price factor as attitude/rationalization. I am confident it is listed there in AU-C 240 App. A and AS 2401.85. A search confirmed it in the AUASB copy of the ISA-based appendix. One secondary study guide classed it as incentive, so confirm against the AICPA text.
- **aud-fr-13.** The paragraph numbers AU-C 240.39 (management) and .40 (TCWG) are from memory (finding 014, `needs_verification`).
- **Finding 003.** The AU-C 240.40 wording is from memory. A secondary search result agreed ("employees with significant control roles"), and so do the platform's own rep-letter TBS and written-representations lesson.

## (f) Not checked, and why

- I used 2 of the 3 allowed web searches, both on finding 001 and finding 003. Direct fetches of aicpa-cima.com and pcaobus.org are blocked, so I could not read the AICPA codified AU-C 240 text.
- The exact 2026 Blueprint task statements for Area II.E were not available (the reference sheet gives group names only), so skill judgments use the Blueprint's general skill definitions.
- I did not run the app (this batch reviews content only). I checked the TBS research-result display from code (`src/lib/tbsScoring.ts`, `src/components/TbsView.tsx`), not from a screenshot.

Sources from web search:
- https://standards.auasb.gov.au/node/2056 (Examples of Fraud Risk Factors: attitudes/rationalisations include excessive interest in the stock price or earnings trend)
- https://open-exam-prep.com/study-guides/cpa-aud/fraud-laws-specialists/fraud-risk-auditor-responses (secondary: communication to TCWG includes employees with significant control roles)
