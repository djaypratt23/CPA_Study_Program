# Notes — M-aud-sec-pcaob-independence

## (a) Blind answers vs. keys

All 38 MCQs (3 lesson, 27 practice, 8 exam) and all 11 TBS cells matched the key on the blind pass, so there are **no disagreements**.

| id | my answer | key | resolution |
|---|---|---|---|
| (none) | — | — | All keys agree. For aud-spi-26 the key (c) agrees with my answer, but the stem measures the wrong interval (finding 007). |

## (b) Lesson design

- **Big idea → pre-question → body → takeaways → checks.** The big idea is clear: issuer rules sit on top of the AICPA Code, and GAO and DOL each have their own frameworks.
  - The single pre-question (aud-spi-pre1, internal audit outsourcing) primes the prohibited-services concept well. No pre-question primes rotation or cooling-off, which the objectives treat as application-level. Consider a second pre-question on cooling-off.
  - The two inline checks (chk1 services; chk2 rotation) are placed right after the matching sections.
  - The timeline and worked example are good, but the worked example's cooling-off measurement is wrong (finding 001).
- **Minutes.** The lesson is about 1,140 words including frontmatter, roughly 800 in the body, plus one table, one timeline, one worked example and three questions. That is about 10–12 minutes, so the 16 minutes in `minutes` is slightly generous but acceptable.
- **Accuracy.** These parts are correct: the four principles, the prohibited-services list, Rules 3521–3524 and 3526, and rotation (5/5 and 7/2). These parts are not:
  - The cooling-off anchor is wrong (S2, finding 001).
  - The DOL summary is incomplete and conflicts with aud-government-compliance (finding 009).
  - Rule 3525 is missing (finding 010).
  - SEC relationship rules are missing (finding 011).
- **Items testing material the lesson never teaches:** aud-spi-11 (SOX §301), -12 (pre-approval through detailed policies), -15 (PCAOB inspection frequency), -17 (§407), -18 (404(b)), -19 and -25 (partner compensation, Rule 2-01(c)(8)), -20 (Form AP). The acronym "SKE" in aud-x1-09 and aud-spi-06 is also never introduced.
- **Sequencing.** The lesson does not rely on later modules for its own content. Its items do, though:
  - §404(b) and §407 are taught only in aud-understanding-entity (aud-u4).
  - The 3-year PCAOB inspection cycle is taught only in aud-quality-management (aud-u2).
  - Form AP and the partner-compensation rule are taught nowhere.

  The GAO and DOL basics introduced here are expanded later in aud-government-compliance (aud-u10), which is fine as a forward reference.

## (c) Practice design

- **Counts:** 27 practice MCQs, 8 exam MCQs, 3 lesson MCQs, 6 flashcards and 1 TBS. Volume is adequate.
- **Difficulty spread** (practice + exam): 17 items at difficulty 1, 11 at 2, 7 at 3. Items 24–27 are labeled difficulty 3 but are among the easiest in the module, so the true spread is about 21 / 12 / 2.
- **Order:** there is no clear easy-to-hard progression. The hardest scenario items (03, 09) come early, and trivial one-liners (21–27) come last with inflated labels.
- **Skill mix** (labels, per cues.md): remembering 19, application 10, analysis 4, evaluation 2. After the relabels in findings 002 and 003 it is roughly remembering 26, application 9, analysis 0, evaluation 0. A recall-heavy mix is defensible for an Area I independence module, but analysis and evaluation should not be claimed. The TBS (application) is the only multi-fact exercise.
- **Redundancy:** four practice pairs are near-identical (finding 004), and the lead-partner 5-year rule appears in six or more places. Coverage gaps: SEC financial, employment and business relationships; application-level GAO and DOL items (finding 011).

## (d) Items with no issues found

aud-spi-pre1, aud-spi-chk1, aud-spi-01, aud-spi-03, aud-spi-04, aud-spi-05, aud-spi-07, aud-spi-08, aud-spi-09, aud-spi-10, aud-spi-23, aud-x1-06, aud-x1-07, aud-x1-19, aud-x1-20, aud-x1-27, aud-spi-f1, aud-spi-f3, aud-spi-f4, aud-spi-f5, aud-spi-f6.

## (e) Needs expert verification

- **Finding 001.** The exact codified wording of Rule 2-01(c)(2)(iii)(B), including the "fiscal period that included the date of initial employment" language and the 10-hour exclusion. The search confirmed the look-back from the start of audit procedures (deemed to begin the day after the prior 10-K is filed), but only through secondary sources (PwC Viewpoint FAQ, Paul Weiss 2003 memo).
- **Finding 009.** The full list of impairments in the DOL bulletin (29 CFR 2509.75-9), which was checked against the reference sheet and memory, not the eCFR text.
- **Finding 011.** Whether the 2026 AUD Blueprint's SEC/PCAOB task statements reach SEC loan and family-relationship rules at application level.

## (f) Not checked, and why

- The primary text of Rule 2-01, PCAOB Rules 3521–3526 and GAGAS 2024 chapter 3 could not be fetched, because the egress proxy blocks sec.gov, pcaobus.org and gao.gov. I used one WebSearch query (cooling-off measurement); the reference sheets and my own knowledge covered the rest.
- **Currency:** I found no SEC, PCAOB or DOL independence-rule change effective in 2026 that affects these items. GAGAS 2024 (effective for periods beginning on or after Dec 15, 2025) is testable from Jan 2026; the lesson's GAO statements are consistent with it. QC 1000 is not used in this module.
- The app UI was not exercised; per PROMPT.md, it is reviewed separately.
