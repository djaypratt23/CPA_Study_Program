# M-far-contingencies — reviewer notes

Scope: 44 items. The lesson, 3 lesson MCQs, 28 practice MCQs, 3 exam MCQs (in `far-exam-area3.json`), 7 flashcards and 2 TBS. The blind pass was saved to `blind-answers.csv` before `items.json`, the TBS JSON or `cues.md` was opened. Findings: 20 (S2: 3, S3: 13, S4: 4). Web searches used: 2 of 3.

## (a) Blind vs. key

| id | My answer | Key | Resolution |
|---|---|---|---|
| All 34 MCQs | — | — | All agree. |
| far-tbs-r3-contingencies (8 cells) | a Accrue, b Disclose, c Accrue, dd Accrue, e Disclose, f Neither; law 420,000; war 25,000 | Same | Agree. |
| far-tbs-u12-contingencies t1–t7, a1–a4, s1–s3 | Same as the key, but t5 was marked ambiguous in the blind pass | t5 "Disclose only" | **Key defensible but ambiguous.** It is right only under the ASC 460-10-25-1 parent/subsidiary/common-control exception from recognition. The exhibit doesn't establish that relationship, and the lesson, fc5 and far-cont-06 teach recognition at fair value. Logged as S2 (finding 002). |

There were no numeric disagreements. Every numeric distractor was reproduced in python:

| Item | Distractors reproduced |
|---|---|
| chk2 | 84,000,000 = 10,000 × 8,400 |
| -03 | 9,000 = 24,000 − 15,000; 14,000 = Year 2 expense; 24,000 = cumulative expense |
| -09 | 46,000 = 36,000 + 10,000; 26,000 = liability; 10,000 = cash basis |
| -18 | 80,000 = expected cost; 180,000 = 90,000 × 2; 20,000 = redeemed |
| -25 | 10,000; 3,000; 13,000 = 10,000 + 3,000 (rationale doesn't name this) |
| -26 | 20,000; 7,500; 42,500 = 85,000 × 0.50 (rationale doesn't name this) |
| -13 | 275,000 matches no plausible error |

## (b) Lesson design

**Big idea.** Clear: probable/possible/remote, plus the gain asymmetry. The recall-lawsuit example ($2M accrued, $3M more disclosed) is correct.

**Pre-question (pre1).** It is about a reasonably possible lawsuit, so it primes the central probability tier. Good.

**Body.** Probability grid and flowchart, ranges (worked: 600k/300k and 400k/500k; IFRS midpoint 650k), assurance warranties (faded: 60,000 expense, 38,000 liability, both correct), guarantees, gain contingencies, commitments.

**Inline checks.** chk1 tests probable but not estimable. chk2 tests the firm-purchase-commitment loss. Both fit the content.

**Takeaways.** Accurate overall, with two exceptions:
- Unasserted claims appear only in the takeaways, and their accrual case is missing (finding 013).
- The guarantee "apply ASC 450" wording predates CECL (finding 014).

**Minutes.** 16 minutes is realistic: about 840 words (roughly 5–6 minutes of reading), plus a worked example, a 2-step faded exercise, 2 checks and a diagram.

**Lesson–item alignment.** The lesson never teaches what these items test:
- far-cont-08 (a: general reserves; b: "probable" vs. more-likely-than-not)
- far-cont-14 (ASC 410-30 discounting)
- far-cont-15 (self-insurance; also TBS r3 row f)
- far-cont-18 and -26 (premium/coupon liabilities; taught in no FAR lesson)
- far-cont-20 (probable insurance recovery presented gross)
- far-cont-05 and -28 (unasserted claims, takeaway only)
- far-cont-17 (service-type warranty). This one is taught in the earlier far-revenue-contracts module, so it is acceptable.

**Sequencing.** The lesson points forward to Subsequent Events, the next module. far-cont-27 is covered by the lesson's "information after year-end" sentence. The two TBS lean heavily on ASC 855 (Type I/II events, the available-to-be-issued date) and route their results to far-contingencies (finding 016).

## (c) Practice design

**Counts.** 28 practice MCQs plus 3 exam MCQs, which is adequate, but about 8 of them test range accrual the same way (finding 007).

**Difficulty.**

| Difficulty | Count | Notes |
|---|---|---|
| 1 | 5 | |
| 2 | 16 | |
| 3 | 10 | All of far-cont-20 to -28. These are among the easiest items: one-step recall or arithmetic. |

The apparent easy-to-hard progression is an artifact of the labels; real difficulty is flat. The only items that are genuinely harder are -14 (niche rule) and -27 (contingency × subsequent events).

**Skill mix.**

| | Remembering | Application | Analysis |
|---|---|---|---|
| As labeled | 4 | 17 | 10 |
| After correction | 11 (35%) | 19 (61%) | 1 (3%) |
| FAR target | 5–15% | 45–55% | 35–45% |

The module has no real analysis MCQs (findings 003, 004, 005). Analysis is carried only by the two TBS.

**Answer-key letters.** c 11, d 10, a 5, b 5 (finding 019).

**Misses route back.** MCQs carry `moduleId` far-contingencies, which is fine. TBS routing is covered in finding 016.

## (d) Items with no issues found

far-cont-pre1, far-cont-chk1, far-cont-chk2, far-cont-02, far-cont-03, far-cont-05, far-cont-09, far-cont-10, far-cont-17, far-cont-fc1, far-cont-fc2, far-cont-fc5, far-cont-fc6, far-cont-fc7

## (e) Needs expert verification

- **Finding 014 (guarantees and CECL).** Confirm the current ASC 460-10-30-5 text and whether the separate ASC 326-20 liability for financial guarantees should be taught at FAR depth. The search results (Deloitte, CohnReznick, PwC) support the separate liability.
- **Finding 015 (premium/coupon model).** Confirm whether the 2026 FAR exam still tests the cost-based premium-liability model, or expects ASC 606 material-right treatment for premium offers.
- **Finding 017 (IFRS).** Confirm that IFRS is out of scope for the 2026 FAR exam. The reference sheet marks this from-memory/unverified.
- **Finding 002 (TBS t5).** The scope-exception paragraph letters within ASC 460-10-25-1 (parent/subsidiary and common control) are from memory. The existence of the exception is well established.

## (f) Could not check

- **Official Blueprint wording.** The representative-task wording for FAR-III.B is reconstructed in `blueprint-tasks.csv`. The official PDF was blocked, so the skill-level mapping relies on the reconstructed tasks.
- **App behavior.** I did not drive the app to see whether the two unit TBS appear before far-subsequent-events is completed. Finding 016 is based on the code path (`src/db/actions.ts`) and the module order, not on observation.
- **Primary text.** ASC paragraph text was not fetched (the proxy blocks fasb.org). Citations come from my knowledge, the reference sheets and the two searches.
