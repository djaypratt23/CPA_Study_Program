# M-aud-risk-response: reviewer notes

Module `aud-risk-response` ("Further audit procedures: nature, timing & extent"), AUD-II, unit aud-u5. 42 manifest items: 1 lesson, 3 lesson MCQs, 27 practice MCQs, 3 exam MCQs, 6 flashcards, 2 TBS. All 42 are reviewed (see `ledger.csv`). Findings: **1 S1, 1 S2, 13 S3, 1 S4**.

## (a) Blind answers vs. keys

There are 49 blind rows: 33 MCQs and 16 TBS cells. The blind answers agreed with the key on 48 of them.

| id | My blind answer | Key | Resolution |
|---|---|---|---|
| aud-rr-19 | a (low confidence; flagged b as wrong in direction) | b | **The key is wrong (S1, finding 001).** By double entry, an overstated asset pairs with an overstated liability or revenue, or with an understated expense or other asset. So testing assets for overstatement indirectly tests credit-balance accounts for **over**statement, not understatement. Option (a), "asset accounts for understatement", is one of the indirectly tested directions. The item explanation teaches the reversed rule. |

All TBS rows matched. In r3: nature, timing, extent; then Yes, No, Yes. In u5: E/O, C, Cut-off, V/A, R&O; then substantive, ToC, substantive, ToC; then remaining-period procedures.

## (b) Lesson design

- **Big idea.** It is clear and well chosen ("which population contains the misstatement?"). The example of the search for unrecorded liabilities is good.
- **Pre-question.** There is only one (aud-rr-pre1). It primes the completeness/trace direction well. Nothing primes timing (interim vs. year-end) or extent. A second pre-question would help, e.g., "Receivables are high risk: confirm in October or at December 31?"
- **Body.** It has a toolbox table, a direction-of-testing diagram, a worked example, timing, substantive analytics and a reliability list. The rules are accurate. The worked example has no numbers to recompute; the only number-like example is "expected interest = average debt × rate", which is fine.
  - Minor point: the takeaway "Inquiry alone is never sufficient … to support a material assertion" overstates AU-C 500, which says inquiry alone "ordinarily" is not sufficient for assertions. That is acceptable for exam purposes, so no finding was raised.
- **Gaps (finding 012).**
  - Despite the title, there is no section on **extent** and no statement of the AU-C 330.07(b) persuasiveness principle. Both are taught only in the earlier aud-risk-materiality module.
  - Missing: evaluating results (unexpected misstatements → reassess; insufficient evidence → more work or a modified opinion), dual-purpose tests, the AU-C 330.20 closing-process procedures, and changing confirmation content for side agreements.
- **Takeaways.** They are accurate, but the "material class … regardless of the assessed RMM" wording may be the pre-SAS 145 form (finding 010, needs verification).
- **Inline checks.** chk1 (vouching purchases → occurrence) and chk2 (SAP suitability) are well placed and correct.
- **Minutes.** 16 is generous but acceptable. The file is about 820 words including the frontmatter; the body is about 550 words. With the diagram, a worked block and 3 questions, a realistic estimate is 10–13 minutes.
- **Lesson–item alignment.** These items test content this lesson never teaches:
  - **aud-rr-19** (directional testing): taught nowhere on the platform.
  - **aud-rr-14** (dual-purpose test): taught only in the *next* module, aud-tests-of-controls.
  - **aud-rr-20** (insufficient evidence → modify the opinion) and **aud-rr-26** (reassess risk after unexpected misstatements): not taught in this or any earlier lesson.
  - **aud-rr-27** and **TBS r3 q3** (overall responses): taught in aud-understanding-entity and aud-fraud-risk (earlier), not here.
  - **aud-rr-08, -12, -16, -22, aud-x2-21, aud-x2-33** (persuasiveness and extent): taught in aud-risk-materiality (earlier), not here.
  - **aud-rr-10, aud-rr-17, TBS r3 q2** (significant risk → tests of details): taught in aud-risk-materiality, not here.
  - **TBS r3 r1** (confirming terms or side agreements): not taught anywhere in this lesson.
- **Sequencing (finding 011).** The lesson and its items use the assertion categories (occurrence, existence, completeness, cut-off, valuation, rights) without defining them. The definitions first appear in aud-evidence-assertions, unit aud-u6 in AUD-III, which comes later. The AU-C 500 reliability factors and AU-C 520 analytics are likewise taught in full only in later modules.

## (c) Practice design

- **Counts.** 27 practice MCQs plus 3 exam MCQs plus 3 lesson MCQs is an adequate quantity. However, about 15 of the 30 practice and exam items cover only three facts: the interim rollforward, "higher RMM → more persuasive evidence", and "substantive procedures are always required" (finding 007). Several AU-C 330 requirements are untested: AU-C 330.20 closing-process procedures, AU-C 330.19 confirmations, and the factors that make interim testing inappropriate.
- **Difficulty spread (practice and exam).** 7 items at difficulty 1, 15 at difficulty 2, 8 at difficulty 3. All the difficulty-3 labels are inflated except perhaps aud-rr-19. After relabeling, almost nothing is genuinely hard.
- **Progression.** It runs roughly easy to hard only because items 24–27 carry difficulty 3. Earlier items alternate between 1 and 3 (01:1, 05:3, 06:1, 07:1, 13:3, 14:1, 17:3 …).
- **Skill mix.** As labeled, out of 30 practice and exam items: remembering 9 (30%), application 13 (43%), analysis 6 (20%), evaluation 2 (7%). The AUD Blueprint targets are remembering 30–40, application 30–40, analysis 15–25, evaluation 5–15. With the relabels I propose (findings 002 and 003), the mix becomes remembering 11 (37%), application 18 (60%), analysis 1 (3%), evaluation 0. This module, which is the natural home for "evaluate the sufficiency of evidence" tasks, has no genuine analysis or evaluation items. Add 3–4 scenario items: SAP expectation building and judging differences; deciding whether the evidence from interim plus rollforward is sufficient; responding to conflicting results.
- **Exam pool.** aud-x2-21 and aud-x2-33 are near-duplicates, and both are in `content/aud/exams/aud-mock-2.json`. aud-x2-21 is also in aud-mock-1.
- **TBS.**
  - r3 is a recall drill labeled analysis/15 min (findings 013 and 014).
  - u5 (10 dropdown rows, application, 20 min) is sound apart from the cue in part tim (finding 015). 20 minutes is somewhat generous; 12–15 would be realistic.
  - In both, scoring is one point per dropdown row (`src/lib/tbsScoring.ts`), so partial credit is fair and a perfect response scores 100%.

## (d) Items with no issues found

aud-rr-pre1, aud-rr-chk1, aud-rr-chk2, aud-rr-01, aud-rr-04, aud-rr-06, aud-rr-07, aud-rr-09, aud-rr-10, aud-rr-22, aud-rr-f1, aud-rr-f2, aud-rr-f3, aud-rr-f5, aud-rr-f6.

aud-rr-12 has no defect of its own; it is listed only as part of the redundancy cluster.

## (e) Needs expert verification

- **Finding 010.** Check the exact current text of AU-C 330.18 after the SAS 145 conforming amendments. Is it "irrespective of the assessed level of control risk … all relevant assertions related to each significant class …" or the older "irrespective of the assessed RMM … each material class"? Two searches did not return the paragraph text. One search summary (Thomson Reuters SAS 145 special report) described the change to relevant assertions of significant classes, tied to control risk. The keys are unaffected either way; only the rule statements in the lesson, f4, aud-rr-03, aud-rr-21, aud-x2-43 and TBS r3 q1 would need rewording. aud-understanding-entity ("Material items always get substantive procedures") would also be affected.
- **Paragraph numbers.** The AU-C 330 paragraph numbers cited in my findings (.19 confirmations, .20 closing process, .21 significant risks, .22 interim) are from memory, by analogy with ISA 330. aud-rr-15 cites AU-C 330.22 for interim testing, which is consistent with that.

## (f) Could not check

- The AICPA codification text (AU-C 330, 500, 520) could not be fetched because the proxy blocks it. Rules were checked against the reference sheet and long-standing standard content.
- No app or UI walkthrough was done; that is out of scope for this batch.
- Web searches used: 2 of 3, both on AU-C 330.18 wording.

Sources: [Thomson Reuters SAS 145 special report](https://tax.thomsonreuters.com/content/dam/ewp-m/images/tax/en/artworked-images/brand-updates-2025/sas-no-145-special-report.pdf); [Crawford SAS 145 update (SD Legislative Audit)](https://legislativeaudit.sd.gov/resources/IPAs/Crawford2-Auditing%20Standards%20Update%20SAS%20145%20and%20QM.pdf); [PCAOB archived AU 319/330](https://pcaobus.org/oversight/standards/archived-standards/details/AU319_107).
