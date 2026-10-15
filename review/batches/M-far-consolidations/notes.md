# M-far-consolidations: reviewer notes

The module covers consolidated statements and intercompany eliminations (FAR-I, unit far-u3). It has 48 items: the lesson, 3 lesson MCQs, 28 practice MCQs, 4 exam MCQs, 7 flashcards, 4 practice TBS and 1 exam TBS. There are 17 findings: S1 = 3, S2 = 2, S3 = 11, S4 = 1.

## (a) Blind answers vs. keys

All 35 MCQ keys match my blind answers, and every TBS numeric and review row and dropdown matches my blind computation. The only disagreement was the format of one TBS journal entry.

| id | My blind answer | Key | Resolution |
|---|---|---|---|
| far-tbs-r3-consolidation / j | One combined entry: Dr Sales 100,000; Cr COGS 90,000; Cr Inventory 10,000 | Four lines: Dr Sales 100,000; Cr COGS 100,000; Dr COGS 10,000; Cr Inventory 10,000 | Both entries are economically right. The prompt says "(combined)", and the sibling simulation far-tbs-u3-consolidation keys the net form for "one combined entry". Running the real scorer, the net entry earns 6/8. This is a scoring defect (finding 003, S1). |
| All other MCQs and TBS rows | Same as key | — | Agreed. I recomputed every one; see blind-answers.csv. |

The labels and explanations, as opposed to the keys, were wrong in several places:
- Wrong distractor rationales on con-16 (c) and x1-23 (c).
- A lesson arithmetic error: "25% markup on cost" should be 33 1/3%.

## (b) Lesson design (`far-consolidations`)

**Big idea.** It is clear and well motivated (an entity cannot profit from itself), and the tire example is concrete.

**Pre-question (far-con-pre1).** It primes the central rule that 100% of intercompany sales are eliminated regardless of ownership. It is a good primer. The only flaw is that it is labeled application when it is recall; it sits in the lesson pool, so it does not count toward the skill mix.

**Body.** The flow is sound: when to consolidate, the mechanics diagram, then three elimination types (loan with a JE, inventory with a worked example, PP&E with a faded example), then NCI, then a review checklist. Every worked and faded number is recomputed and correct (gain 20,000; depreciation 18,000 vs 14,000; excess 4,000; remaining 16,000; carrying amounts 72,000 vs 56,000), with one exception:
- **Wrong:** the downstream worked example labels 20,000/60,000 a "25% markup on cost". It is 33 1/3% (finding 001).
- **Outdated:** the "control is temporary" consolidation exception was removed by SFAS 144 in 2001 (finding 002).
- **Imprecise:** the dividend-elimination memo (finding 016).

**Takeaways.** Accurate. **Inline checks.** chk1 tests the unrealized-profit rule on an upstream sale, a good contrast with the downstream example. chk2 tests NCI attribution.

**`minutes: 20`.** Realistic. The body is about 914 words plus the frontmatter takeaways, one worked example (4 steps), one faded example (5 inputs), a JE block, a mermaid diagram and 2 checks. That is roughly 6–7 minutes of reading and 10–12 minutes of working.

**Lesson–item alignment.** These items test material the lesson never teaches:
- far-con-13: VIE primary beneficiary. The lesson says this is BAR.
- far-con-15: remeasuring a previously held interest in a step acquisition.
- far-con-18, far-con-27, and far-tbs-u3-acquisition-review acq a1: acquisition-related costs are expensed.
- far-tbs-u3-acquisition-review acq a2: equity-issuance costs reduce APIC.
- far-con-19: a change in ownership without loss of control is an equity transaction.
- far-con-20: the deconsolidation gain.
- far-con-22: the bargain-purchase gain. It is taught only in far-intangibles, which comes later (u6).
- far-con-06: dividends paid to outside shareholders reduce the NCI. The lesson is silent on this.
- far-con-16, far-con-21, far-x1-13, far-x1-23: the full-goodwill formula. The lesson states it only in the review checklist, with no worked example. The full treatment is in far-intangibles (later).

Findings 004 and 015 cover these.

**Sequencing.** The lesson relies on concepts taught in later modules:
- the equity method (far-equity-investments, u7)
- goodwill and the bargain-purchase gain (far-intangibles, u6)
- fair value (far-fair-value, u10)

No prerequisite metadata exists to flag this (finding 015).

## (c) Practice design

**Counts.** 28 practice MCQs, 4 exam MCQs and 5 TBS. That is ample for one module; the last 8 practice items (con-21 to con-28) mostly duplicate earlier items (finding 010).

**Keyed difficulty (practice + exam, 32 items).** 1 = 4, 2 = 12, 3 = 16. Half are labeled "3", including the easiest recall items (con-24, con-27, con-28). The true spread is roughly 1 = 11, 2 = 19, 3 = 2.

**Progression.** The order is not easy to hard: 1, 2, 2, 2, 2, 3, 3, 2, 1, 2, 2, 3, 1, 1, 3, 2, 3, 2, then 3 × 10. The final block of "difficulty 3" items is mostly simple.

**Skill mix vs. the FAR Blueprint (remembering 5–15 / application 45–55 / analysis 35–45).**
- As keyed, the module is remembering 12.5% / application 40.6% / analysis 46.9%.
- Re-labeled per the Blueprint definitions (findings 005, 006), it is about remembering 34% / application 59% / analysis 6%.
- The module's real analysis-level work is in the two review TBS (consolidation-review and acquisition-review), which are well built and correctly labeled analysis. The MCQ pool, however, overstates analysis and has too much recall.

**Answer-key letters.** a 6, b 6, c 9, d 11. This is acceptable; there is a slight lean to d.

**Cues (judged from cues.md).**
- con-06: a real cue. The key is the only non-numeric and longest option (finding 007).
- chk2: the key is the longest option. Judged minor; the distractors are plausible misconceptions in a lesson check.
- con-01, con-04, con-08, con-13, x1-13: the absolute and "both" flags are natural wording, not cues.

## (d) Items with no issues

- **Lesson MCQs:** far-con-pre1, far-con-chk1
- **Practice MCQs:** far-con-01, far-con-02, far-con-03, far-con-05, far-con-08, far-con-09, far-con-10, far-con-11, far-con-14
- **Exam MCQ:** far-x1-13
- **Flashcards:** far-con-fc1, far-con-fc2, far-con-fc3, far-con-fc4, far-con-fc5, far-con-fc6, far-con-fc7
- **TBS:** far-tbs-u3-consolidation-review, far-tbs-u3-consolidation, far-tbs-x1-consolidation

## (e) Needs expert verification

1. **FAR vs. BAR scope of business-combination topics** (finding 004, `needs_verification`). The reference sheet marks business combinations and VIEs as BAR (verified via Becker/JofA) and FAR "basic" consolidation as `conflict`. One web search returned secondary summaries quoting the FAR consolidation tasks: "prepare consolidated financial statements (adjustments and/or eliminations) from supporting documentation" and "detect, investigate and correct discrepancies … agreeing consolidated amounts to supporting documentation". That supports keeping the eliminations, NCI and review content in FAR. It does not support keeping VIE, step-acquisition, deconsolidation and ownership-change items. Confirm against the official 2026 FAR and BAR Blueprint PDFs. Sources:
   - [eduyush FAR consolidation guide](https://eduyush.com/blogs/cima/consolidated-financial-statements-cpa-far-guide)
   - [SuperfastCPA FAR consolidation questions](https://www.superfastcpa.com/far-cpa-practice-questions-explained-preparing-consolidated-financial-statements/)
   - [another71 forum: AICPA task wording](https://forum.another71.com/forum/far-cpa-exam/review/topic/potential-far-simulation-topics-straight-from-the-aicpa/page/6)
   - [UWorld: FAR topics everyone says to skip](https://accounting.uworld.com/blog/cpa-review/far-topics-everyone-says-to-skip/)
2. **Acquisition-date full goodwill and NCI at fair value** (far-con-16, far-con-21, far-x1-13, far-x1-23, far-tbs-u3-acquisition-review, the far-tbs-x1-consolidation goodwill row). The platform treats acquisition-date goodwill measurement as FAR: far-intangibles teaches it and it is not optional, while only goodwill *impairment* items are optional. I did not file a finding, because the FAR task covers consolidated statements "including noncontrolling interests". If the official Blueprint places all acquisition-date measurement in BAR, these items should become optional.
3. **The removal of the temporary-control exception** (finding 002) rests on my own knowledge of SFAS 144 (2001) and ASC 810-10-15-10, at high confidence. I did not re-verify it by search, to save the shared search budget.

## (f) Could not check, and why

- **The official AICPA 2026 Blueprint PDFs.** Direct fetches are blocked, so the skill levels and scope are judged from the reference sheets and one search.
- **App behaviour** (whether a miss routes back to the lesson, review-queue scheduling, how practice items are ordered in the UI). Out of scope for this batch; the app is reviewed separately.
- **Mock-form construction.** Seen in passing and not filed, because it is app/exam-form level. far-mock-1 shares 29 of 57 items with far-mock-2 and 28 with far-mock-3. far-x1-13 and far-tbs-x1-consolidation each appear on both mock-1 and mock-3. On mock-1 and mock-3, goodwill and unrealized inventory profit are each tested twice (MCQ + TBS).
- **Where I used the code.** I checked TBS scoring with the real scorer (`npx tsx` on `src/lib/tbsScoring.ts`) only for the alternative journal formats. I verified every other TBS cell by recomputation and by reading the scoring logic (review rows, 1-point cells, the extra-line penalty). A perfect response scores 100% on all 5 TBS: every key is internally consistent, every JE balances, and every dropdown answer is among its options.
