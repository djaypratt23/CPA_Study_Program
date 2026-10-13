# Notes — M-far-income-statement-oci (Income statement, OCI & discontinued operations)

47 items reviewed (1 lesson, 3 lesson MCQs, 28 practice MCQs, 5 exam MCQs, 8 flashcards, 2 TBS). 25 findings: S1 0, S2 3, S3 17, S4 5.

## (a) Blind vs key

I answered every MCQ and every TBS cell before opening the keys (`blind-answers.csv`). **Every blind answer matched the key**: all 36 MCQs, the 7 numeric and 4 docreview cells plus the research choice of `far-tbs-u1-income-statement`, and the 8 review rows and 3 dropdowns of `far-tbs-x1-statement-review`.

| id | My answer | Key | Resolution |
|---|---|---|---|
| far-iso-15 | c (flagged in the blind pass: (a) defensible) | c | Kept as **S2 ambiguity** (finding 002). Under ASC 220's gross presentation, the reclassification adjustment equals the full $10,000 realized gain, and the $2,000 that arose this year is a separate holding gain. The key, $8,000, is the *net* OCI change. Fix: ask for the net effect on OCI, or state that the security was not remeasured before the sale. |
| far-tbs-u1-income-statement `oi` | 440,000 (noted that 380,000 is defensible) | 440,000 | Key follows the lesson's convention. Tolerance 0 with no instruction on where the unusual loss goes → S3 (finding 020). |
| far-tbs-x1-statement-review `cogs`/`opex` | 1,480,000 / 480,000 | same | The alternative placement of the NRV write-down is scored wrong → S4 (finding 021). |

Recomputations, all of which agree with the keys:
- **iso-03:** (80,000 − 200,000) × 0.79 = −94,800.
- **iso-04:** 2,000,000 − 1,800,000 = 200,000.
- **iso-12:** 350,000 + 70,000 = 420,000.
- **iso-13:** 200,000 × (1.05 − 1.08) = −6,000.
- **iso-18:** 375,000.
- **iso-19:** 97,500.
- **iso-22:** 225,000.
- **iso-23:** 0.
- **iso-25:** 107,000.
- **iso-27:** 150,000.
- **iso-28:** 100,000.
- **iso-01:** 150,000.
- **x1-03:** 375,000.
- **TBS u1:** 960,000; 440,000; 340,000; 255,000; −150,000; 105,000; 117,000.
- **TBS x1:** 1,480,000; 480,000; 0; 440,000; 92,400; 31,600; 316,000.

I checked every distractor number as well. One does not match its explanation: iso-18 (d) 345,000 should be 355,000 (finding 007).

## (b) Lesson design

- **Big idea → body.** The big idea is clear: separate recurring from non-recurring results, then add OCI. Body order: multiple-step format → unusual items (check 1) → discontinued-operations decision tree, worked example → OCI (PUFF), reclassification, faded statement build (check 2) → FX transactions, worked example → ASU 2024-03. The flow is logical.
- **Worked numbers.** All recomputed correctly:
  - Format table: 85,000.
  - Summit: (200,000) + (150,000) = (350,000) × 0.75 = (262,500).
  - Crane: 320,000 / 150,000 / 100,000 / 75,000 / 87,000.
  - Euro payable: 110,000; loss 5,000; gain 3,000.
- **Pre-questions.** There is one, `far-iso-pre1` (earthquake → separate line). It primes unusual items only, not discontinued operations or OCI, which are the lesson's core (S4, finding 023).
- **Inline checks.** `chk1` (what belongs in operating income) and `chk2` (reclassification) are well placed. Both fit the material they follow.
- **Minutes.** The stated 18 is realistic. The lesson has about 1,180 body words plus about 420 frontmatter words (objectives, big idea, takeaways), 2 worked blocks, 1 faded block with 5 inputs, a mermaid tree and 3 questions. Estimate: about 11 min reading + 3 min faded + 3–4 min questions ≈ 17–18 min.
- **Key takeaways.** Accurate and complete for the core topics.
- **Currency.** ASU 2024-03 is taught as a current requirement, but it is not testable until 1/1/2027 (S2, finding 001). The "effective portion" wording in fc6 and the iso-05 explanation predates ASU 2017-12 (finding 017).
- **Lesson–item alignment.** These items test material the lesson never teaches:
  - `far-iso-29`: ASC 420 one-time termination benefits. It belongs in far-payables, unit u8 (finding 014).
  - `far-iso-20`: CTA reclassified on sale of a foreign subsidiary. This is BAR-scope translation (finding 015).
  - `far-iso-21`: per-share amounts for discontinued operations. EPS is taught later, in far-eps (finding 016).
  - `far-iso-15`: a reclassification when part of the gain arose this year. The lesson covers only the simple case.
  - Partial gaps: `far-iso-11` (the per-component tax disclosure is in the key, but the lesson mentions only the "single tax line") and `far-iso-10` (held-for-sale recoveries, mentioned only in a distractor explanation). Both are minor.
- **Sequencing.** The lesson and items assume these concepts, all taught in later modules:
  - AFS, trading and equity securities: far-debt-securities and far-equity-investments, unit u7.
  - Held-for-sale measurement: far-impairment, u6.
  - Intraperiod tax allocation: far-income-taxes, u10.
  - EPS: far-eps, u2.

  The lesson states each rule in a line, which is enough to answer the items, but it has no forward links (S4, finding 025). Pension (no FAR module is built), cash-flow hedges and translation (both BAR) appear only as OCI list entries, which is appropriate.

## (c) Practice design

- **Counts.** 28 practice MCQs, 3 lesson MCQs, 5 exam MCQs, 1 practice TBS and 1 exam TBS. That is adequate for the module's weight.
- **Difficulty as labeled.** 1: 8, 2: 13, 3: 12 across practice and exam items. As corrected, most of the twelve "3"s are 1s or 2s, so the true spread is heavily easy and medium.
- **Progression.** There is no easy-to-hard progression. iso-02 (labeled 3) comes first, the recall items iso-05, -07, -10, -11 and -14 sit in the middle, and the late block iso-19 to iso-29 is uniformly labeled analysis/3 regardless of content. That looks like a batch-generated set with default labels (findings 003, 004, 005).
- **Skill mix.**
  - As labeled: remembering 8, application 14, analysis 11, so analysis is 33%. FAR targets are R&U 5–15%, application 45–55%, analysis 35–45%.
  - As corrected: remembering about 13 (39%), application about 20 (61%), analysis about 0 among the MCQs. This module's real analysis content is carried by the two TBS, both labeled analysis, which is reasonable.
  - Recommendation: add one or two genuine analysis MCQs, e.g. derive discontinued operations and continuing-operations tax from a segment trial balance, or evaluate a draft statement.
- **Redundancy.**
  - Unusual items: tested 4 times the same way (finding 012).
  - "Which item is OCI": tested 3 times; x1-04 and x1-20 are near-copies (finding 011).
  - Disc ops = (operating result + disposal loss) × (1 − t): tested 4 or more times (finding 013).
  - Exam items pre-exposed by practice items: x1-29 = iso-02, and iso-01 ≈ iso-27 (finding 010).
- **Routing.** iso-29 sends misses to the wrong lesson (finding 014). iso-20 and iso-21 send misses to a lesson that doesn't cover them.

## (d) Items with no issues

far-iso-chk1, far-iso-04, far-iso-06, far-iso-08, far-iso-09, far-iso-10, far-iso-11, far-iso-12, far-iso-13, far-iso-fc1, far-iso-fc2, far-iso-fc3, far-iso-fc4, far-iso-fc5, far-iso-fc7, far-iso-fc8.

## (e) Needs expert verification

1. **far-iso-15 (finding 002).** I could not obtain the exact ASC 220-10-55 illustration text. A search for it (query on reclassification adjustment / FAS 130 illustration) returned only secondary results, with no codification text. My from-memory reading of the FAS 130 Appendix B example: in the year of sale, the holding gain or loss arising during the period is shown separately, and the reclassification equals the full realized gain. Confirm this against the codification.
2. **Scope of foreign-currency *transactions* (ASC 830-20) in FAR 2026.** This affects the lesson's FX section and far-iso-13. Translation is BAR (far-standards §1c, verified). I could not confirm where transactions sit. My search (query: 2026 blueprint foreign currency FAR vs BAR) found conflicting secondary summaries: one 2026 FAR syllabus guide lists "foreign currency transactions and translation" under Select Transactions, while another omits it. Neither quotes the AICPA text. I have not raised a finding. Confirm against the official 2026 FAR Blueprint PDF.
3. **far-iso-21 (EPS) scope.** Placement of EPS in FAR vs BAR is marked `conflict` in far-standards §1c. The item is correct under ASC 260-10-45-3 either way.
4. **far-iso-26 (finding 019, low confidence).** Whether the "next annual report" distractor is defensible depends on the entity's interim reporting.

## (f) Not checked, and why

- I did not run the app, so I did not see how the TBS scoring UI handles tolerance 0, the review-part tick logic, or whether a perfect TBS scores 100%. The JSON structure is consistent with the schema, and the batch check passed.
- I could not read the official AICPA 2026 FAR Blueprint representative tasks or their skill levels (the site is blocked). The skill judgments rest on the Blueprint's skill definitions and on comparison with equivalent items.
- I used 2 of the 3 allowed web searches; neither settled its question (see (e)). I could not access primary FASB codification text.
