# M-aud-tests-of-controls: reviewer notes

Module `aud-tests-of-controls` (AUD, unit aud-u5, area AUD-II). 41 items: lesson, 3 lesson MCQs, 27 practice MCQs, 3 mock MCQs, 6 flashcards, 1 exam TBS. 16 findings: S1 1, S2 2, S3 11, S4 2.

## (a) Blind answers compared with the keys

I answered all 33 MCQs and every TBS cell blind (`blind-answers.csv`). **Every blind answer matched the key**, so the table below has no disagreements to resolve.

| id | my answer | key | resolution |
|---|---|---|---|
| aud-toc-pre1, chk1, chk2 | d, c, d | d, c, d | agree |
| aud-toc-01 … 27 | a c d a b b b c b a b c d a b c d a b c a b c d a b c | same | agree |
| aud-x2-22, 34, 44 | b, c, a | b, c, a | agree |
| TBS x12 `sdr` / `asr` | 3.33 / 6.97 | 3.33 / 6.97 | Agree. However, the equally correct 3.3 / 7.0 is scored wrong (finding 001). |
| TBS x12 `a`, `b`, `c`, `cq` | Rely; Do not rely; Within; Weigh its nature… | same | agree |

I checked the TBS upper deviation rates against the AICPA Audit Sampling evaluation table at 5% risk of overreliance. With n = 60, 0 deviations gives 4.9% and 2 deviations gives 10.3%. With n = 50, 1 deviation gives 9.2%. The exhibit is internally consistent.

## (b) Lesson design

**Big idea.** It is clear and correct (AU-C 330.08). The credit-memo example is good.

**Pre-question.** `aud-toc-pre1` asks whether inquiry alone is enough. It primes the right concept, the procedures table and takeaway 2, but only one of the lesson's three objectives. A second pre-question on prior-year or rotation evidence would prime objective 3.

**Body.** It has four parts:
- a mermaid decision tree for when tests are required, which is correct and matches SAS 145 (no testing means control risk is at maximum);
- a table of procedures by control type, which is correct;
- a design-versus-operation note;
- a worked example on prior-year evidence, which is correct against AU-C 330.13–.15.

It has no section on the extent of testing or on evaluating deviations (finding 011). It also has no PCAOB contrast, even though it cites AS 2201 (finding 002).

**Takeaways.** All six are accurate under GAAS. The rotation takeaway needs an "AICPA/nonissuer" qualifier.

**Inline checks.** `chk1` covers the decision tree and `chk2` covers significant risks. Both are well placed.

**Minutes.** The page has about 322 body words and 369 frontmatter words (big idea and takeaways), plus a diagram, a table, a worked block and 3 MCQs. That reads in about 8–10 minutes, so `minutes: 14` is generous. It would be realistic once the missing extent/evaluation section is added.

**Lesson–item alignment.** These items test material the lesson never teaches:
- aud-toc-15 and -16: sample-size drivers.
- aud-toc-17: precision of management review controls.
- aud-toc-18: IPE reliability.
- aud-toc-20: AU-C 330.16.
- aud-toc-24: annual controls.
- aud-toc-09, -12 and -27: evaluating deviations (cause, fraud, systemic).
- aud-x2-44 and TBS x12: upper deviation rate versus tolerable rate, and the allowance for sampling risk.

aud-toc-19 (test of one) is only touched on, in a single table row ("Test the configuration once"); aud-it-controls covers it more fully.

**Sequencing.** These prerequisites come earlier and are fine: aud-risk-response (interim timing, dual-purpose tests), aud-it-controls (ITGCs, benchmarking) and aud-internal-control (walkthroughs). The attribute-sampling evaluation used by aud-toc-15, aud-x2-44 and the TBS is taught only in **aud-sampling**, which comes later (aud-u6, Area III).

## (c) Practice design

**Counts.** 27 practice MCQs, 3 lesson MCQs, 3 mock MCQs, 6 flashcards and 1 TBS (mock pool). The count is adequate.

**Difficulty as labelled.** 1: 5, 2: 12, 3: 10. In substance, items 14–27 are the easiest in the set: short stems with absurd distractors. Yet 10 of them are labelled difficulty 3, so the easy-to-hard progression is effectively inverted.

**Skill mix as labelled (practice).** R 18.5%, A 44.4%, An 22.2%, E 14.8%. The Blueprint ranges are R 30–40, A 30–40, An 15–25, E 5–15.

**Skill mix after my relabels (findings 003 and 004).** R about 37%, A about 56%, An about 7%, E 0%. The module has no genuine analysis or evaluation items. For example, it never asks the learner to evaluate deviation results and choose the substantive response, or to judge the severity of a deficiency. Only TBS x12 gets close.

**Routing.** The items carry `moduleId: aud-tests-of-controls`, so misses route back to this lesson. Some of the content they test is not in this lesson, though (see (b)).

**Other patterns.** Distractor quality drops sharply from item 14 onward, with implausible options and "Only…/always/never" absolutes (findings 006 and 007). Trap labels misuse `partial-computation` (finding 005).

## (d) Items with no issues

aud-toc-pre1, aud-toc-chk2, aud-toc-01, aud-toc-02, aud-toc-04, aud-toc-05, aud-toc-06, aud-toc-07, aud-toc-08, aud-toc-11, aud-toc-23, aud-toc-f1, aud-toc-f2, aud-toc-f4, aud-toc-f5, aud-toc-f6.

## (e) Needs expert verification

**Finding 002 (PCAOB annual testing).** A 2005 SEC-hosted statement supports the rule that each year stands on its own under AS 2201 and that rotation was rejected (https://sec.gov/news/press/4-497/lee033105.pdf). The paragraph cites AS 2201.57–.61 and .B28–.B33 are from memory. Whether AS 2301 alone (a financial-statement-only audit of an issuer) permits any rotation was not verified.

**Finding 016 (area placement).** It is not settled whether the 2026 Blueprint puts the performance of tests of controls in Area III (row AUD-III.D.1.1 is `uncertain`). The finding is low confidence.

**AU-C 330 paragraph numbers.** The numbers cited (.08, .10, .12–.17) are from memory. They mirror ISA 330.

## (f) Not checked, and why

- I did not run the app or screenshots. Usability is reviewed separately.
- I used only one of the three allowed web searches. It did not return AS 2201 text, so the PCAOB paragraph numbers stay from memory.
- I checked cross-module duplicates only against AUD module and exam stems, using a keyword search (findings 012 and 013). Outside this batch, `content/aud/review/aud-high-yield.md` line 27 repeats the overstated "significant-risk controls must be tested every year". It also says "every third year" where the rule is "audit". This is noted in finding 008's evidence for the owning batch.
