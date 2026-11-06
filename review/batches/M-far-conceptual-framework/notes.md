# Notes: M-far-conceptual-framework

There are 26 items: 1 lesson, 3 lesson MCQs, 12 practice MCQs, 1 exam MCQ and 9 flashcards. There are no TBS. Findings: 0 S1, 1 S2, 7 S3, 7 S4.

## (a) Blind vs. key

All 16 MCQ blind answers match the keys.

| id | my answer | key | resolution |
|---|---|---|---|
| far-cf-pre1 | a | a | agree |
| far-cf-chk1 | a | a | agree |
| far-cf-chk2 | d | d | agree |
| far-cf-01 | a | a | agree |
| far-cf-02 | c | c | agree |
| far-cf-03 | d | d | agree |
| far-cf-04 | d | d | agree |
| far-cf-05 | a | a | agree |
| far-cf-06 | d | d | agree |
| far-cf-07 | c | c | agree |
| far-cf-08 | d | d | agree |
| far-cf-09 | d | d | agree |
| far-cf-10 | a | a | agree |
| far-cf-11 | c | c | agree |
| far-cf-12 | d | d | agree |
| far-x1-01 | a | a | agree |

No item needs arithmetic. `calc` is false everywhere, and that is correct.

## Scope verdict: should the module be `optional: true`?

**Mostly yes.** The conceptual framework and standard setting are not a group in the 2024–2026 FAR Blueprint.

- `review/reference/blueprint-notes.md` lists six **verified** FAR Area I group names: A for-profit, B NFP, C state and local government concepts, D public company, E special purpose frameworks, F ratios. None of them is a conceptual-framework or standard-setting group. That group existed only in the pre-2024 Area I ("Conceptual Framework, Standard-Setting and Financial Reporting").
- One web search found a secondary 2024 CPA Evolution summary that says "1.1 Conceptual Framework — No longer tested; replaced with FAR Overview" (scribd.com/document/715108309). The contrary hits were a WallStreetMojo table with the pre-2024 area title and a low-quality 2026 prep guide. Neither is authoritative.
- Conflict to resolve: `review/reference/far-standards.md` §1c lists "Conceptual framework and standard setting | Yes (FAR Area I)". Its sources only support the CON 8 chapter dates, not where the topic sits in the Blueprint. I believe that row is wrong on placement. Whoever owns the reference sheet should check it against the Blueprint PDF.
- **However**, the module also holds two in-scope topics that are taught nowhere else (finding 001, S2):
  - ASC 205-40 going concern. The in-scope items far-nd-12, -13, -17 and -24 test it, but the far-notes-disclosures lesson never mentions it.
  - Codification citation structure, which candidates need for the research parts of 7 in-scope FAR TBS.

  Those sections should move to in-scope places.

## (b) Lesson design

- **Big idea.** It is clear, with a good concrete example (an engineering team is not an asset). The "constitution vs. laws" framing works.
- **Pre-question.** There is one (pre1, a board plan for a factory). It primes the elements definitions, the most transferable concept. Nothing primes standard setting or Codification navigation, which is acceptable for a 15-minute lesson.
- **Body.**
  - Technically accurate throughout. These points were checked and are correct:
    - FAF, FASB, GASB, SEC and PCC roles; FASAB being separate
    - ASU not authoritative
    - the ASC 105-10-05-2 analogy-first rule and the 105-10-05-3 list of nonauthoritative sources
    - the topic ranges and section numbers (-05 through -65)
    - 842-20-25-1 (recognition at commencement)
    - the CON 8 Ch. 1 primary users
    - the Ch. 3 qualitative characteristics, materiality as an entity-specific part of relevance, the free-from-error meaning, and conservatism excluded
    - the Ch. 4 asset and liability definitions
    - the Ch. 5 recognition criteria
    - the ASC 205-40 one-year-after-issuance period
  - Gaps:
    - The qualitative-characteristic components are never defined (finding, S3).
    - The Ch. 5 citation is missing, and derecognition and Ch. 6 measurement are absent (S4).
    - "Revenues when earned" is pre-ASC 606 wording (S4).
- **Takeaways.** Five; accurate and aligned with the body.
- **Inline checks.** chk1 covers the hierarchy and chk2 covers neutrality. Nothing checks Codification navigation or the elements (S4).
- **Minutes.** The file is about 1,570 words, roughly 1,350 in the body, plus 2 mermaid diagrams, 5 tables and 3 questions. 15 minutes is realistic, perhaps slightly tight.
- **`taxYear`.** Not applicable (FAR) and correctly absent.
- **Lesson–item alignment.** Items that test something the lesson does not teach:
  - far-cf-04: the meaning of confirmatory value. The term appears only as a diagram label.
  - far-cf-10: that public business entities may not elect PCC alternatives. This is only implied ("alternatives for private companies").
  - far-cf-08 (b): qualitative factors in materiality. The lesson says "entity-specific" but never mentions "nature".
  - far-cf-06 (c): internally generated reputation. This is inferable from the asset definition and the big-idea example.

  Everything else is taught.
- **Sequencing.** This is the first FAR module and relies on nothing taught later. It mentions examples from later modules (leases, goodwill, ASC 606) only as illustrations.

## (c) Practice design

- **Counts.** 12 practice MCQs, 3 lesson MCQs, 1 exam MCQ and 9 flashcards. Adequate for an optional, concept-only module.
- **Difficulty (practice).** d1 ×6, d2 ×5, d3 ×1. The only d3 item, far-cf-11, is overstated and should be d2. The file order is not easy-to-hard, but `buildQuiz` shuffles practice sets, so file order does not matter.
- **Skill mix (practice plus exam).** 7 remembering, 5 application, 1 analysis, which is 54% remembering against a FAR target of 5–15%. That is expected for this subject. Because the module is optional and excluded from readiness, the skew does not affect section mix targets. The one analysis label is wrong (it should be application).
- **Misses route to the lesson.** The routing is fine: moduleId is far-conceptual-framework for every item. far-tbs-u1-income-statement lists this optional module as a second moduleId. A default-path learner would therefore be pointed at an optional lesson; this is minor.

## (d) Items with no issues found

far-cf-pre1, far-cf-chk1, far-cf-chk2, far-cf-01, far-cf-02, far-cf-04, far-cf-05, far-cf-07, far-cf-12, far-cf-fc1, far-cf-fc4, far-cf-fc5, far-cf-fc6, far-cf-fc7, far-cf-fc9.

The lesson-alignment gap behind far-cf-04 is filed against the lesson. far-cf-fc3 and far-cf-fc8 are correct, and are listed only in the coverage finding because they are in-scope content housed in an optional module.

## (e) Needs expert verification

- **Where the conceptual framework sits in the 2026 FAR Blueprint.** I believe it is absent; the far-standards.md row conflicts. Check the AICPA Blueprint PDF.
- **Ordering of nonauthoritative sources.** The lesson says nonauthoritative sources are consulted with "Concepts Statements first among them". The current ASC 105-10-05-3 list does not appear to rank sources (practice is listed first). The "more influential" language is from SAS 69 and SFAS 162. Low confidence; not filed.
- **SEC staff guidance as "authoritative".** The lesson table lists "staff guidance" (SABs) as authoritative for registrants, and the chk1 (c) explanation agrees. ASC 105-10-05-1 names only SEC rules and interpretive releases as authoritative GAAP and describes SABs as staff views. Low confidence and minor exam impact; not filed.
- **Research tasks in the 2026 FAR exam.** My understanding is that they remain in FAR. The platform assumes this too, with 7 FAR TBS that have research parts. Not re-verified here.
- **PCAOB AS 2415 period.** That it still uses "one year beyond the date of the financial statements being audited" (finding 011) comes from memory. No PCAOB going-concern standard was found that replaces it.

## (f) Not checked, and why

- The app UI: how optional modules and badges appear, and the Settings opt-in. Out of scope for this batch; the app is reviewed separately.
- The research TBS files themselves (other batches). I looked at them only to confirm that they exist and what they depend on.
- The official 2026 Blueprint PDF. The proxy blocks it. One of the three allowed searches was used.
