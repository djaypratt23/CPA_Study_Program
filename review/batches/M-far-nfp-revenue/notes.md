# M-far-nfp-revenue: reviewer notes

Module `far-nfp-revenue` covers not-for-profit contributions and revenue (FAR-I, unit far-u4). There are 43 items: the lesson, 3 lesson MCQs, 28 practice MCQs, 2 exam MCQs, 7 flashcards and 2 TBS. There are 19 findings: S1 0, S2 1, S3 16, S4 2.

## (a) Blind answers compared with the keys

I matched every key in the blind pass: all 33 MCQs and all 19 TBS cells (5 dropdown and 5 numeric in u4; 7 dropdown, 2 numeric and 1 research in x1). No item has a wrong key.

| id | My answer | Key | Resolution |
|---|---|---|---|
| far-nfr-26 | b (exact PV is 81,697.44, so I would key $81,697) | b ($81,698) | The keyed option is the right one; no other choice is close. The key's text is $1 off the exact figure because it was computed with the factor 2.72325 and rounded up. Logged as finding 013 (S3), along with the missing computation and the unstated payment timing. |
| far-nfr-13 | c (assumes the NFP is the remainder beneficiary) | c | The key is correct on that assumption, but the stem never states it. Logged as finding 008. |

## (b) Lesson design assessment

- **Big idea.** It is clear and well chosen. It contrasts an unconditional multi-year pledge (recorded now, at PV) with a conditional one (recorded later), and the "why" (overstated resources) makes the point stick.
- **Pre-question (`far-nfr-pre1`).** It primes the right concept: a matching barrier plus a lapse means $0. There is only one pre-question; a second one on contributed services would prime the other half of the lesson.
- **Body.**
  - Step 1 has a flowchart for contribution vs exchange vs agency, plus a worked membership split.
  - Step 2 explains barrier plus right of return, with a table and a callout on restrictions versus conditions.
  - Step 3 covers measurement and timing, with a worked PV pledge. I recomputed it: 100,000/1.05 = 95,238; 100,000/1.05² = 90,703; total 185,941; Year 2 accretion 185,941 × 5% = 9,297. It's all correct.
  - The special-contributions section covers services, gifts in kind (ASU 2020-07) and collections (including direct care under ASU 2019-03).
  - The faded example recomputes to 40,000 + 6,000 + 3,000 = 49,000, of which 40,000 is with donor restrictions. That's correct.
- **Key takeaways.** All six are accurate and current: ASU 2018-08, ASU 2016-14 net asset classes, ASU 2020-07, and the collections criteria.
- **Inline checks.** chk1 (restriction vs condition) and chk2 (contributed services) are well placed and correct.
- **Minutes.** The lesson is about 1,100 words including frontmatter, plus one diagram, one worked example, one faded example (two inputs) and three MCQs. That's about 6 minutes of reading and 6–8 minutes of interaction, so the stated 18 minutes is somewhat generous but realistic for a careful first pass.
- **Lesson–item alignment.** These items test things the lesson never teaches:
  - far-nfr-02: variance power and financially interrelated entities. The lesson says only "passing it through with no discretion".
  - far-nfr-13: split-interest agreements (a trustee's CRAT). Nothing in any FAR lesson covers this.
  - far-nfr-14: underwater endowment deficiencies. This isn't taught in this lesson or in far-nfp-statements.
  - far-nfr-21: why a promise due next year isn't discounted (the net-realizable-value allowance for amounts due within one year). The lesson says only "future years → PV".
  - far-nfr-12, far-nfr-27 and far-x1-16: placed-in-service release, releases when restricted cash is spent, and the change in net assets with donor restrictions. These are taught in far-nfp-statements, not here, yet they are tagged to this module, so a miss routes the learner to the wrong lesson (finding 010).
  - Special-event ticket splits (far-nfr-19, 25) aren't explicitly taught. The membership-dues split carries over directly, so this is acceptable.
- **Sequencing.** far-nfp-statements comes before this module in `far.yaml`, so net-asset classes and releases are taught first, and the lesson's use of "net assets with donor restrictions" is supported. Present-value mechanics are assumed; they are taught in far-bonds, which is later in the order (FAR-II). That is a minor dependency, since PV is basic and the worked example shows the arithmetic. Nothing else relies on a later module.

## (c) Practice design

- **Count.** 28 practice MCQs, which is ample. Practice difficulty is d1 2, d2 13, d3 13. As labeled, the skills are application 15, analysis 11 and remembering 2.
- **Difficulty progression.** It isn't easy-to-hard. 01–08 are d2, 09–10 are d3, then d2 again, and every item from 21 to 28 is d3. The d3 items are not actually harder: 24 is identical to 18 (d2), and 27 and 28 are single-fact recall.
- **Skill mix.** The 12 analysis labels are inflated (finding 001, S2). Corrected, the module is roughly remembering 6, application 24 and analysis 0 across the 30 practice and exam MCQs. That's appropriate for this topic, whose Blueprint tasks are R&U and Application (FAR-III.C.5/6, FAR-I.B.2.3). The section's 35–45% analysis share has to come from other modules or from TBS. With the inflated labels, the platform overstates FAR analysis coverage.
- **Redundancy.**
  - The matching-gift barrier is tested in pre1, 17, 22 and x1-34, both TBS, and the lesson twice.
  - General volunteers not being recognized is tested in 18, 24, chk2, 08 and both TBS.
  - The exchange/contribution split is tested in 01, 19 and 25 (plus 28 and u4 item 7). That's at the threshold, so I haven't logged it separately.
  - Two practice/exam pairs are near-identical: 17 and x1-34, and the u4 and x1 TBS.
- **Untested sub-concepts worth adding.** The "create or enhance nonfinancial assets" prong on its own; cash received on a conditional grant later earned; journal entries; an agency transfer with variance power; contributed use of facilities under a multi-year promise; intentions to give (bequest intentions not recognized); and the allowance for uncollectible pledges.

## (d) Items with no issues found

far-nfr-chk1, far-nfr-chk2, far-nfr-01, far-nfr-04, far-nfr-06, far-nfr-15, far-nfr-fc1, far-nfr-fc2, far-nfr-fc3, far-nfr-fc4, far-nfr-fc5, far-nfr-fc6, far-nfr-fc7.

## (e) Needs expert verification (low risk; not logged as errors)

- **Paragraph numbers.** I couldn't confirm these without Codification access:
  - The x1 research distractors: ASC 958-605-25-8 (unconditional promises recognized when received), 958-605-25-13 (a conditional promise recognized when the barriers are overcome) and 958-210-45-9 (board designations). They are distractors, but if the numbers are wrong they teach a wrong mapping. The key, 958-605-25-16, is correct.
  - Item-explanation citations: ASC 958-205-45-12 (placed in service, far-nfr-12), 958-205-45-22 (underwater endowments, far-nfr-14) and 958-605-25-19 (collections, far-nfr-11). I believe these are right.
  - The net-realizable-value allowance for promises due within one year is in ASC 958-605-30; I cited the Subtopic, not a paragraph.
- **Terminology.** The lesson, fc5 and pre1 say conditions are "substantially met", while ASU 2018-08 frames recognition as "when the barrier is overcome". Both phrasings appear in current prep material, and the substance is the same. I haven't logged this.

## (f) What I could not check, and why

- I didn't use any web searches. Everything here is long-settled ASC 958 guidance: ASU 2016-14, 2018-08, 2019-03 and 2020-07, all effective and testable well before 2026. No ASU from 2023 to 2026 in `review/reference/far-standards.md` changes ASC 958-605, and ASU 2025-10 (government grants) excludes NFPs. The currency check passes: no item assumes a superseded rule, and far-nfr-14(a) correctly labels the pre-2016-14 treatment as outdated.
- I didn't verify the in-app behaviour (miss routing, TBS scoring display) in the running app. That falls under the usability review.
- **Scoring.** The u4 chgu cell depends on contrib, so one error costs two points. That's typical of real TBS design, so I haven't logged it. Both TBS score 100% when the keys are entered: they have one point per cell and integer answers with tolerance 0, and no rounding is involved.
