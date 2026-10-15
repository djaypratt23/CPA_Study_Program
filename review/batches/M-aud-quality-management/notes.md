# M-aud-quality-management — reviewer notes

Scope: 42 manifest ids (lesson, 3 lesson MCQs, 27 practice MCQs, 4 exam MCQs, 6 flashcards, 1 TBS). Blind answers were saved to `blind-answers.csv` before `items.json`, the TBS file or `cues.md` were opened. 16 findings: S1 1, S2 3, S3 10, S4 2. The batch `--check` passes.

## (a) Blind vs. key disagreements

All 34 MCQ keys matched my blind answers. The disagreements and flagged agreements are below.

| id | my answer | key | resolution |
|---|---|---|---|
| aud-qm-13 | (c), by elimination and flagged | (c) | The key is the only workable option, but it states an ISQM 1 rule. SQMS No. 1 has no listed-entity trigger; it requires EQ reviews where law or regulation requires them and where the firm decides. Finding 001 (S1, medium confidence, needs verification). |
| aud-tbs-u2-quality comp-p1 | Resources (Governance defensible) | Governance and leadership | Both answers are defensible. SQMS 1 par. 32(b) places compensation and incentives under Resources, and governance (par. 28) covers culture and financial priorities. The dropdown accepts only one answer. Finding 003 (S2). |
| all other TBS cells (p2–p7, r1–r4, res) | same as key | — | Agree. Kerr was the engagement partner in Year −1, so three years have passed by Year 3 and the two-year cooling-off is met. |

## (b) Lesson design

- **Big idea.** It is clear: a risk-based system instead of a checklist. The construction-firm example shows objective → risk → response well.
- **Pre-questions.** There is only one, `aud-qm-pre1`. It primes component classification ("which component covers taking on a client"), which matches the first section. Nothing primes EQ-reviewer eligibility, the order objectives → risks → responses, or peer review vs. PCAOB inspection (finding 016, S4).
- **Body.** It covers the eight components (diagram and table), EQ reviews (with a correct worked example: Diaz served Years 1–4 and becomes eligible in Year 7), the engagement partner's role, external monitoring, and QC 1000. It is accurate apart from the following:
  - QC 1000 currency: the Sep 2026 PCAOB amendments would change the Sep 30 evaluation date and the external QC function (finding 005, S2).
  - QC 1000 is not testable until Jan 2027 (finding 006).
  - EQ-review completion is described as "release" vs. "date" inconsistently (finding 007, needs verification).
  - Peer-review types are stated narrowly (finding 015).
- **Takeaways.** These are accurate: eight components, the risk-based process, annual evaluation, the 2-year cooling-off, AU-C 220, and inspection frequencies.
- **Inline checks.** `chk1` (process order) and `chk2` (150 issuers → annual) are well placed after their sections.
- **Minutes.** The value is 14. The lesson has about 675 body words and 437 frontmatter words, plus 2 checks, 1 worked example, a diagram and two tables. That is about 9–12 minutes of reading plus the checks, so 14 is realistic.
- **Items testing what the lesson doesn't teach** (finding 013):
  - `aud-x1-22`: CEO or managing partner holds ultimate responsibility.
  - `aud-qm-18`: network requirements and services.
  - `aud-qm-14`: the three evaluation conclusions, including "severe and pervasive".
  - `aud-qm-27`: prompt action and communication when the system fails.

  `aud-qm-13` contradicts the lesson; the lesson is right.
- **Sequencing.** No forward dependencies. The SEC 5-year time-out mentioned in the `aud-qm-02` and `aud-x1-30` distractor explanations is taught earlier, in `aud-sec-pcaob-independence` (unit 1). Acceptance and continuance is covered only at the component level here; the detail comes in the next module, `aud-engagement-acceptance`, which is appropriate.

## (c) Practice design

- **Counts.** 27 practice MCQs, 3 lesson MCQs, 4 exam MCQs, 6 flashcards and 1 TBS. That is ample for a single Area I topic.
- **Difficulty (practice).** Nine at difficulty 1, ten at 2 and eight at 3. All eight difficulty-3 items except `aud-qm-10` are short recall items, so the real spread is closer to 1–2.
- **Progression.** It runs roughly easy to hard by label. In substance, though, `qm-14` to `qm-27` are as easy as `qm-01` to `qm-12`, and difficulty does not rise.
- **Skill mix.** Practice and exam MCQs are labeled R 14, A 10, An 4, E 3. Every analysis and evaluation item is a recall item (findings 008 and 009). Relabelled, the mix is about R 19, A 12, An 0, E 0. Against the AUD allocation (R 30–40, A 30–40, An 15–25, E 5–15), the module has no genuine higher-order items. That is acceptable for an Area I recall topic, but the labels should not imply otherwise. The TBS is application-level, which is correct.
- **Redundancy.** Four clusters (finding 011):
  - cooling-off: tested 3 times;
  - EQ disagreement and release: 3 times, and practice `qm-26` nearly copies exam `x1-14`;
  - root cause: 4 times;
  - annual evaluation: 2 times.

  Meanwhile, independence confirmations, roles, service providers, EQ review documentation, peer-review ratings and AS 1220 are untested.
- **Key letters (practice and exam).** b 12, a 8, c 6, d 5. The skew is mild and not significant (χ² ≈ 3.7, df 3), so there is no finding.
- **Cross-module overlap.**
  - `aud-qm-chk2` and `f5` overlap with `aud-spi-15` (PCAOB inspection frequency), which is fine.
  - The truncated explanation "Correct. SQMS No." also appears in `aud-wr-07`, which belongs to another batch.
  - The glossary entry "Engagement quality review" uses the "before the report is released" wording (see finding 007).
- **TBS.**
  - 12 equally weighted cells, and a perfect response scores 100%.
  - Answers are option-only, so there are no tolerances to check.
  - The research part is choose-the-excerpt, with section-level citations. REVIEW.md accepts that design trade-off.
  - 20 minutes is generous for 12 dropdown cells; about 12–15 would be realistic, but it's not flagged.

## (d) Items with no issues found

aud-qm-pre1, aud-qm-chk2, aud-qm-01, aud-qm-04, aud-qm-06, aud-qm-07, aud-qm-09, aud-qm-12, aud-qm-19, aud-x1-22 (the alignment gap is charged to the lesson), aud-qm-f1, aud-qm-f2, aud-qm-f3, aud-qm-f5.

## (e) Needs expert verification

1. **SQMS No. 1 par. 34(f): listed entities.** Confirm that the AICPA text omits ISQM 1's listed-entity EQ review trigger (finding 001). Search results supported a two-trigger rule, but the standard's text was not seen.
2. **EQ review completion: "date" or "release".** Confirm whether SQMS No. 2 / SAS 146 uses "date" (as ISQM 2 / ISA 220 Revised do) or keeps "release" (as extant QC 10 / AU-C 220 did) (finding 007, low confidence).
3. **QC 1000 amendments.** Check whether the SEC has approved the Sep 9, 2026 amendments (External QC Function rescinded; evaluation date chosen by the firm) (finding 005).
4. **TBS row p1.** Confirm how a CPA-exam grader would classify "partner compensation tied to quality" under SQMS 1. I read par. 32(b) as Resources (finding 003).

## (f) Could not check

- I used all 3 web searches. Direct fetches of the AICPA, PCAOB and SQMS texts were blocked, so paragraph numbers for SQMS 1 and 2 are from memory (par. 28, 32(b), 34(f) and 53–56 follow ISQM 1 numbering, which SQMS 1 tracks).
- I did not run the app (usability is reviewed separately), so I did not check how the TBS dropdowns render or how lesson checks route.

Sources from the web searches:

- [open-exam-prep.com: SQMS 2 study guide](https://open-exam-prep.com/study-guides/cpa-aud/quality-management/sqms-2-engagement-quality-reviews)
- [open-exam-prep.com: SAS 146 study guide](https://open-exam-prep.com/study-guides/cpa-aud/quality-management/sas-146-engagement-quality)
- [AICPA SQMS 2 PDF (search hit, not fetched)](https://a-us.storyblok.com/f/1015104/x/f1fd138690/aicpa-sqms-2.pdf)
- [IAASB/CPA Canada basis for conclusions on EQCR timing](https://www.bccpa.ca/CPABC/media/PDFs/News_Views_KB/practice_management/quality_control/basis_for_conclusions_csqc1.pdf)
