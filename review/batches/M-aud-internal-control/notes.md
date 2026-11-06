# M-aud-internal-control: reviewer notes

Scope: 48 manifest items: the lesson, 3 lesson MCQs, 27 practice MCQs, 7 exam MCQs, 6 flashcards and 4 TBS. All 48 were reviewed (`ledger.csv`, every row `reviewed = y`). There are 26 findings: S1 0, S2 4, S3 18, S4 4. `merge_batch.py --check` passes.

## (a) Blind answers vs. keys

I saved the blind answers (`blind-answers.csv`, 71 rows) before opening `items.json` or any TBS file. **All 37 MCQ keys and all 34 TBS cells match my blind answers.** I had flagged two of them as ambiguous during the blind pass:

| id | My answer | Key | Resolution |
|---|---|---|---|
| aud-x2-40 | a (flagged: (c) also defensible) | a | Key kept as the conventional answer, but the item is ambiguous. The lesson's own worked example says a bank reconciliation cannot catch a receipt that was never deposited, and the lesson lists mandatory vacations as a compensating control. Finding 006 (S2). |
| aud-tbs-x2-controls a5 | Accuracy (completeness arguable) | Accuracy | Key accepted. A subledger-to-GL reconciliation addresses mechanical accuracy (accuracy, valuation and allocation), and the e5 explanation says so consistently. No finding. |
| aud-ic-10 | a (noted the stem gives the clerk no cash custody) | a | Key is the only plausible option, but the stem is defective. Finding 010 (S3). |

## (b) Lesson design

- **Big idea → pre-question.** The big idea uses a segregation-of-duties fraud example, and pre-question `aud-ic-pre1` primes segregation of duties (custody vs. recording). It primes the right concept, but the second section rather than the opening section on the five components. That is acceptable.
- **Body.** The body has five sections:
  - the components table and the CRIME mnemonic;
  - segregation of duties, with a mermaid diagram and a worked example;
  - classifying deficiencies, with a decision flowchart and the AU-C 265.A11 indicators;
  - AU-C 265 communication;
  - the deficiency-to-response table, and COSO objectives and limitations.

  Everything stated is technically correct (AU-C 265 timing, the prohibition on a "no significant deficiencies" letter, the "no material weaknesses" letter for regulators, the MW indicators, COSO 2013 objectives and limitations). Nothing in the worked example needs computing; I checked its logic.
- **Takeaways.** The takeaway on documentation (narratives, flowcharts, questionnaires, walkthroughs) and the "17 principles" are never taught in the body.
- **Inline checks.** `aud-ic-chk1` (components) and `aud-ic-chk2` (MW indicator) fit the sections they follow.
- **Minutes.** The body is about 790 words and the front matter about 460. With 2 checks, 1 worked example and 2 diagrams, that is roughly 13–16 minutes, so `minutes: 18` is realistic.
- **Gaps (findings 001–005, 026):**
  - **Entity-level controls (S2).** These are the 2026 Blueprint's revised topic emphasis, and no AUD lesson teaches them.
  - **SAS 145 understanding of IC (S2).** Evaluating design and determining implementation, and identifying deficiencies from the component evaluation, are taught nowhere.
  - **PCAOB communication timing (S3).** The lesson omits that issuers must communicate before the auditor's report is issued.
  - **Response table (S3).** It ties the substantive response to the severity label rather than to reliance on the control.
  - **Terminology (S4).** The lesson does not give the AU-C 315 (SAS 145) component names.
- **Lesson–item alignment.** These items test material the lesson never teaches:
  - **Not taught in any AUD lesson:**
    - `aud-ic-13`: entity-level controls;
    - `aud-ic-20`, `aud-ic-25`, `aud-x2-15`: preventive vs. detective controls;
    - `aud-tbs-u4-controls`: blind receiving copy and cancellation of documents.
  - **Taught only in a later module:**
    - `aud-ic-15`: the ICFR "as of" date (aud-modified-opinions, unit u9);
    - `aud-ic-26`: tolerable deviation rate (aud-sampling, u6);
    - `aud-tbs-u4-controls`: application controls such as check digit, record count and limit test (aud-it-controls, the next module).
  - **Taught only in a takeaway line:** `aud-ic-06` (walkthrough).

  Finding 003 covers all of these.
- **Sequencing.** The prerequisites (planning, risk and materiality, understanding the entity) come earlier in unit u3/u4. Apart from `aud-ic-15`, `aud-ic-26` and the TBS application-control rows, the lesson relies on nothing taught later. The TBS `aud-tbs-u4-controls` and `aud-tbs-x2-controls` are also mapped to `aud-it-controls`, which mitigates the problem.

## (c) Practice design

- **Counts.** 27 practice MCQs, 7 exam-pool MCQs, 3 lesson MCQs, 6 flashcards and 4 TBS (3 practice, 1 exam). The count is adequate.
- **Difficulty.** The practice pool is evenly spread: 9 at difficulty 1, 9 at 2 and 9 at 3. The order is not easy-to-hard: difficulty-1 items 13, 21 and 23 come after difficulty-3 items 10, 11 and 14. Several difficulty-3 items are really recall (17, 18) or trivial by elimination (10, 24, 26, 27). The difficulty 1/2/3 counts are shuffled at run time, so order matters less.
- **Skill mix, as labeled.** Practice: R9/A9/An7/E2. Practice + exam: R13/A11/An8/E2 of 34, i.e. 38/32/24/6%. That looks inside the section bands, but only because of inflated labels.
- **Skill mix after my relabels (findings 007–008).** R18/A11/An5/E0, i.e. 53/32/15/0%. Remembering would be above the 30–40% band, and there would be no genuine evaluation item.
- **Redundancy.**
  - The MW definition is tested 3 times: aud-ic-02, aud-x2-29 and aud-cm-24, plus f3 and the glossary.
  - The detective-control fact is tested 3 times (20, 25, x2-15).
  - Control environment is tested twice (chk1, 16), and compensating controls twice (14, 17).
  - Four exam-pool items nearly duplicate practice items (finding 014), and aud-ic-11 duplicates the deficiency-evaluation TBS scenario (finding 015).
- **Answer cues.** Choices are shuffled at run time (`McqView` shuffleSeed), so key-letter skew (a = 15 of 34) does not matter. Length cues in `cues.md` were judged trivial, except aud-ic-10 (finding 010) and aud-ic-18's minimizing qualifiers (finding 011).

## (d) Items with no issues found

aud-ic-01, aud-ic-04, aud-ic-07, aud-ic-08, aud-ic-12, aud-x2-12, aud-x2-14, aud-ic-f1, aud-ic-f2, aud-ic-f4.

## (e) Needs expert verification

- **Finding 002 (medium confidence).** The exact AU-C 315 paragraph list of controls that require a design-and-implementation evaluation under SAS 145. I recalled it from memory; the reference sheet confirms only the SAS 145 effective date and the separate inherent/control risk assessment.
- **Finding 020.** Whether AU-C 265's application material links the 60-day limit to the AU-C 230 documentation completion date. I believe it does not; the explanation is imprecise either way.
- **Finding 024.** I am confident AS 2201 dropped the AS No. 2 "more than inconsequential" significant-deficiency threshold, but I could not fetch the AS 2201 Appendix A text to quote it.
- **Finding 006.** Whether an expert item writer would treat "owner reviews bank reconciliations" as uniquely best for the recording-plus-depositing risk.

## (f) Could not check

- Direct fetches of pcaobus.org and aicpa-cima.com are blocked. I used 1 of the 3 allowed web searches, which confirmed PCAOB AS 1305's "prior to the issuance of the auditor's report" timing (https://pcaobus.org/oversight/standards/auditing-standards/details/AS1305; https://www.cpajournal.com/2017/10/24/report-internal-control-deficiencies/). The other AU-C 265 and AS 2201 paragraph references are from memory, plus the reference sheet (marked from-memory there too).
- I did not run the app, because section 4 usability is reviewed separately. TBS scoring behavior was inferred from `src/content/schema.ts`: dropdown and docreview cells must match exactly, and review rows use a tolerance of 1. All keyed answers are among the options, so a perfect response should score 100%.
