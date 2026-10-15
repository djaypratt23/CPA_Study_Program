# Notes: M-far-sec-segments (FAR, `far-sec-segments`)

There are 19 findings: S1 0, S2 3, S3 12, S4 4. `ledger.csv` has a row for all 48 manifest ids, and all are marked reviewed (`y`). `merge_batch.py --check` reports no problems.

## (a) Blind answers vs. keys

All 39 MCQs (3 lesson, 34 practice, 2 exam) matched the key in the blind pass. No MCQ has a wrong key.

| id | my answer | key | resolution |
|---|---|---|---|
| (none) | — | — | All 39 agree. far-sec-32 holds only if the entity is assumed to be public (finding 004). |

I recomputed every number:
- far-sec-05: threshold 740; P, Q and R pass.
- far-sec-06: threshold 110,000.
- far-sec-07: 70%.
- far-sec-10: threshold 10.
- far-sec-16: threshold 85.
- far-sec-21: threshold 100; A and B pass.
- far-sec-27: revenue 9%; profit threshold 40,000.
- far-sec-28: 70%.
- far-sec-32: 12%.

## (b) Lesson design

- **Big idea.** It is clear and motivating: the four-reports cadence, and segments seen "through the eyes of management", with the cloud/hardware example.
- **Pre-question.** `far-sec-pre1` (the 10-K covers Q4) primes only the SEC half. Nothing primes the segment half, which is the computational core of the lesson. Suggestion: add a pre-question such as "A segment has a loss. Can it still be reportable?"
- **Body.** The deadline tables are correct for 2026:
  - 10-K: 60 / 75 / 90 days.
  - 10-Q: 40 / 40 / 45 days.
  - 8-K: 4 business days.
  - Filer thresholds: $700M and $75M floats, with the SRC revenue carve-out.
- **Recomputed blocks.**
  - Worked example: profits 1,450,000; losses 680,000; threshold 145,000; A–D pass and E fails. Correct.
  - Faded example: revenue threshold 100; asset threshold 400; Z passes at exactly 10%, so all 4 are reportable. Correct.
- **ASU 2023-07 content.** Significant segment expenses, CODM title, single-segment entities and interim disclosures are all current. The ASU is eligible for testing from 7/1/2024.
- **Gaps (findings 014, 015).**
  - Aggregation criteria, CODM-as-function, management-designated segments, prior-year significance and restatement, the 10-segment limit, and "other segment items".
  - On the SEC side: SRC and EGC, years of audited statements, SOX 404(b) by filer status, and the structure of the 10-K/10-Q items.
- **Customer identity (finding 005).** The lesson, fc8, chk2 and far-sec-32 say "not" where the rule is "need not".
- **Takeaways and inline checks.** The takeaways are accurate. chk1 (deadlines) and chk2 (major customer) sit at the right points. No inline check covers the 10% or 75% tests; the faded example partly fills that role.
- **Minutes.** About 1,290 words (423 in the frontmatter, 866 in the body), 2 tables, a flowchart, a worked example, a faded exercise and 2 checks. That is roughly 12–16 minutes, so the stated 16 is realistic.
- **Lesson–item alignment.** These items test content the lesson does not teach:
  - far-sec-24 and far-sec-34: aggregation criteria.
  - far-sec-25: the CODM is identified by function.
  - far-sec-08 (d): the EGC definition. This is only in a distractor explanation, so it is minor.
- **Sequencing.** Nothing relies on a later module. EPS comes next (`far-eps`) and is not assumed here. "Consolidated revenue" assumes a basic understanding of consolidation; `far-consolidations` comes later, but no elimination mechanics are needed.
- **Glossary.** "Reportable segment" in `content/glossary/far.json` matches the lesson.
- **Citations.** The lesson cites Rules 13a-1 and 13a-13 for the deadlines; the day counts are actually in the Forms' General Instructions (S4, finding 017).

## (c) Practice design

- **Counts.** 34 practice MCQs, 2 exam MCQs, 3 lesson MCQs and 8 flashcards. That is ample for a module of this size; it is over-supplied with near-duplicates (finding 013).
- **Difficulty.**
  - As labeled: 1/2/3 = 12/12/12.
  - Actual: about 25 items are difficulty 1 and about 11 are difficulty 2, with essentially no true difficulty-3 item.
  - Items 27–34 are all labeled analysis/3, but most are one-step recall or apply.
  - The apparent easy-to-hard progression from items 01 to 34 is an artifact of the labels, not of the content.
- **Skill mix.**
  - As labeled: R 12, A 14, An 10 (33% analysis).
  - Corrected: about R 21, A 15, An 0.
  - FAR targets are R 5–15%, A 45–55% and An 35–45%. This module is heavily recall-oriented, which is understandable for SEC deadlines but leaves the module with no analysis practice (findings 002, 003, 019).
  - The segment TBS `far-tbs-u2-analysis` (outside this batch) provides the only multi-test exercise.
- **Routing.** Every item's `moduleId` is `far-sec-segments`, so a miss routes back to this lesson.
- **Scope.** The `optional` flags are inconsistent (finding 001). 7 segment items are flagged off-Blueprint, while 18 equivalent items, the lesson, the flashcards, the TBS and the mock item far-x1-27 remain in scope.

## (d) Items with no issues

far-sec-chk1, far-sec-01, far-sec-02, far-sec-03, far-sec-08, far-sec-11, far-sec-12, far-sec-13, far-sec-14, far-sec-17, far-sec-20, far-x1-27, far-sec-fc1, far-sec-fc2, far-sec-fc3, far-sec-fc4, far-sec-fc5, far-sec-fc6, far-sec-fc7.

## (e) Needs expert verification

1. **Finding 001.** Is segment reporting in the 2026 FAR Blueprint, and at what depth?
   - The FAR Area I group title includes "segment reporting".
   - Becker places "disclosures for reportable segments" in BAR.
   - Two web searches (superfastcpa.com, cpacredits.com, eduyush.com, accounting.uworld.com) put public company reporting in FAR Area I but did not show the segment task wording.
   - This needs checking against the official Blueprint PDF.
2. **Finding 015.** Does the FAR group "U.S. SEC reporting requirements" extend to SRC/EGC, 404(b) and the 10-K/10-Q item structure?
3. **Finding 016.** Release 33-10890 amended S-K Item 302(a); this is from memory but consistent with my knowledge.
4. **Finding 009.** The ASC 280-10-50-26A paragraph number for significant segment expenses is from memory.

## (f) Not checked

- The official AICPA 2026 FAR Blueprint PDF and the primary FASB and SEC texts. Fetches are blocked, so ASC and Reg S-K/S-X wording is from my own knowledge.
- I used 2 of the 3 allowed web searches.
- `far-tbs-u2-analysis` (it lists this module in its `moduleIds`) belongs to another batch. I read it only to confirm that segment tests are in scope there.
