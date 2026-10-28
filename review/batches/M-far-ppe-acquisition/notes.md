# Notes — M-far-ppe-acquisition (PP&E: acquisition cost & capitalized interest)

Reviewer pass: blind answers saved first (`blind-answers.csv`, 35 MCQs plus 46 TBS cells), then the keyed comparison. 15 findings: S1 0, S2 1, S3 11, S4 3.

## (a) Blind vs key disagreements

None. All 35 MCQ keys matched my blind answers. All 46 TBS cells matched too: rollforward 11, subledger 9, u6-ppe 15, x2-ppe 11. The table lists the items where I checked an alternative reading before agreeing.

| id | my answer | key | resolution |
|---|---|---|---|
| far-ppe-18 | b (loss) | b | Agree. A building the company has used: its carrying amount and the demolition cost are a loss. Only a building acquired to be razed goes to land. |
| far-ppe-21 | a 106,000 | a | Agree. Repairs of damage in transit are abnormal costs and are expensed. |
| far-ppe-10 | a | a | Agree. ASC 958-605-15-2 brings business entities into scope, and the donor is a private foundation, not a government. ASU 2025-10 (Topic 832, government grants) is not eligible until 2029. |
| far-tbs-u6-ppe ddb2 | 44,444 (rate × book value) | 44,444 (depreciation-year allocation) | The two methods are mathematically identical for DDB. Only the explanation's rounded addends are off (finding 012). |
| far-tbs-u6-ppe-rollforward fx.inst | +18,000 | +18,000 | Agree. The exhibit says the 402,000 of depreciation already includes the installation. |

### Distractor-reproduction pass (added before merge)

I reproduced every numeric distractor from its stem in python. That covers 20 MCQs: chk1, ppe-01, 02, 04, 05, 07, 09, 12, 13, 17, 21, 22, 23, 24, 25, 28, x2-06, x2-07, x2-21 and x2-34. I also reproduced every figure in the TBS explanations. Results:

- **New defect: far-x2-06 d.** The option is $1,005,000, but its explanation ('omits the legal fees') describes $1,045,000. The option's figure actually comes from omitting the demolition cost while still deducting the salvage. I added it to finding 004.
- **Trap labels:** two inconsistent labels for identical errors (ppe-21 c and ppe-22 a). Added to finding 004.
- **TBS explanation rounding:** the syd1 explanation shows 41,143 ÷ 2 = 20,571, which as displayed would round to 20,572. Added to finding 012.
- **Everything else** reproduces exactly as its explanation states, apart from the 'Not the computation.' cases already covered in finding 003.

## (b) Lesson design

- **Big idea:** clear and concrete. The bakery oven example is right: 60,000 + 2,000 + 3,000 = 65,000. The "why" (matching cost to benefit) is well chosen.
- **Pre-question (pre1):** primes demolition-as-land-cost. That is a good trap to prime, but it is the only pre-question. Nothing primes capitalized interest, the hardest computation in the lesson. Suggestion: add a second pre-question asking whether all interest during construction is capitalized.
- **Body:**
  - The cost table, the demolition trap box, the lump-sum table (270/540/90 thousand, recomputed), the brief ARO note, and the capitalized-interest flowchart are all correct.
  - Worked example: WAAE 850,000; avoidable 40,000 + 35,000 = 75,000; actual 240,000; expense 165,000. All correct.
  - Faded example: 1,100,000; 99,000; 270,000; 99,000. All correct.
  - The after-service table is correct.
- **Takeaways:** accurate. The cap at actual interest and the three start conditions are both stated.
- **Inline checks:**
  - chk1 sits after the cost table, but it tests "repair of self-inflicted installation damage → expense". The table does not quite teach that; it says only "Repairs after the asset is in use" (finding 010).
  - chk2 is well placed.
- **Minutes:**
  - Content: about 760 body words and about 300 reader-facing frontmatter words. On top of that come two tables of costs, a lump-sum table, a mermaid chart, one worked and one faded example (four inputs), and two checks.
  - At about 200 wpm for the reading plus about 6–8 minutes for the examples and checks, the 18 minutes stated is realistic.
- **Lesson–item alignment.** These items test things the lesson never teaches:
  - far-ppe-13: self-constructed asset costs (incremental overhead, abnormal rework).
  - far-ppe-10: donated assets.
  - far-ppe-17: stock issued for an asset (taught later, in far-equity).
  - far-ppe-19: interest earned on unspent borrowings.
  - far-ppe-chk1, far-ppe-21 and far-tbs-x2-ppe x5: repairs of damage in transit or during installation.
  - far-ppe-06: when capitalization ends.
  - far-ppe-09: derecognition loss on a replaced component (only half-taught).
  - far-ppe-24, far-ppe-25 and far-x2-34: nonmonetary exchanges. These are taught in the next module, far-depreciation (finding 009).
  - TBS rows: depreciation methods (u6-ppe dep part, x2-ppe d/cv/d4), disposals and gains (rollforward, subledger), and impairment (x2-ppe im). All are taught in later unit-u6 modules (finding 015).
- **Sequencing:** the lesson itself relies on nothing taught later. Only items and TBS reach forward, as listed above. The prerequisites (u5 modules) are not needed.

## (c) Practice design

- **Counts:**
  - 28 practice MCQs, 4 exam-pool MCQs and 3 lesson MCQs.
  - 3 practice TBS and 1 exam TBS. Two of the practice TBS are analysis-level review TBS, which cover Blueprint FAR-II.D.6 (rollforward reconciliation), a strength.
  - 7 flashcards.
  - The MCQ count is adequate, but about 10 items are redundant (findings 006 and 007).
- **Difficulty spread:**
  - As labeled (practice + exam): difficulty 1 ×4, 2 ×16, 3 ×12.
  - Ten of the twelve "3"s (ppe-18 to 28) are one-step items. After relabeling, only ppe-09 and ppe-13 are genuinely hard, so the module lacks hard multi-step MCQs. Examples of what is missing: WAAE plus interest in one item, a binding cap, a computed weighted-average rate, a mixed classification with many costs (finding 008).
  - The numbering only looks like an easy-to-hard progression: the late items are labeled hard, not written hard. The quiz builder serves items least-seen-first anyway.
- **Skill mix:**
  - As labeled (practice + exam, 32 items): remembering 3, application 18, analysis 11 (34%).
  - After the corrections in findings 001 and 002, the split is about remembering 7, application 24, analysis 1.
  - The FAR allocation (remembering 5–15%, application 45–55%, analysis 35–45%) is a section-level target. This module's MCQs supply recall and application, and analysis comes from the two review TBS. The analysis share currently reported for this module is overstated by about 10 items.
- **Routing:** the exchange items route to the wrong lesson (finding 009). TBS attempts are attributed to this module even when the missed rows test depreciation or impairment (finding 015).

## (d) Items with no issues found

far-ppe-pre1, far-ppe-chk1, far-ppe-chk2, far-ppe-01, far-ppe-02, far-ppe-03, far-ppe-04, far-ppe-05, far-ppe-07, far-ppe-08, far-ppe-11, far-ppe-14, far-ppe-16, far-x2-07, far-ppe-fc1, far-ppe-fc3, far-ppe-fc4, far-ppe-fc5, far-ppe-fc6, far-ppe-fc7.

Two of these appear in other findings' evidence as cross-references, not as defects: chk1 in the lesson-alignment finding, and ppe-14 and ppe-08 in the redundancy finding.

## (e) Needs expert verification

- **far-ppe-17 (finding 013, low confidence).** Since ASU 2018-07, ASC 718 covers shares issued to nonemployees for goods, measured at the grant-date fair value of the equity instruments. Does that make "fair value of stock or asset, whichever is more clearly evident" outdated wording for PP&E acquired with stock? The key is unaffected. far-equity/lesson.md uses the same wording, so the decision is platform-wide. Search source: https://dart.deloitte.com/USDART/home/publications/archive/deloitte-publications/heads-up/2018/fasb-simplifies-accounting-for-share-based (confirms the scope expansion and the measurement basis; it does not mention PP&E).
- **far-ppe-10 (finding 014, medium confidence).** The full list of exclusions in ASC 958-605-15-6 is from memory.
- **ASC 835-20-30-10/30-11 (interest earned not offset; tax-exempt exception).** Paragraph numbers are from memory. The rule itself is long-settled.

## (f) Could not check / out of scope

- I did not run the app. TBS scoring was checked by reading `src/lib/tbsScoring.ts`:
  - Review rows score only when correctly flagged and corrected, or correctly left unflagged.
  - A perfect response scores 100%, and flagging everything is not rewarded.
  - Rollforward cells gend, aend and net depend on earlier cells, so one error cascades. That is normal for exam simulations, and no follow-through credit is given.
- **Cross-batch consistency note (not filed as a finding; outside this batch's items).** `content/far/review/far-formulas.md` line 34 gives avoidable interest as "WAAE × rate (specific borrowing first, then weighted rate on other debt)" and omits the cap at actual interest. The lesson, fc4 and the items all state the cap. The reviewer of far-formulas.md should check this.
- **Web search:** 1 of 3 used.
