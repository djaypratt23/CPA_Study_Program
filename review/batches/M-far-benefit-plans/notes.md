# M-far-benefit-plans — reviewer notes

Scope: lesson `far-benefit-plans`, 13 MCQs (1 pre, 2 checks, 10 practice), 1 exam item (`far-x1-18`), 6 flashcards. No TBS.
Findings: 11 (S1 0, S2 1, S3 7, S4 3).

## (a) Blind vs. key

| id | my answer | key | resolution |
|---|---|---|---|
| far-ebp-pre1 | d | d | agree |
| far-ebp-chk1 | c | c | agree |
| far-ebp-chk2 | d | d | agree (key wording "actuarial value" imprecise; finding 004) |
| far-ebp-01 | a | a | agree |
| far-ebp-02 | b | b | agree; 8,800,000; distractors 9,740,000 (no deductions), 8,840,000 (no admin), 8,160,000 (no investment income), all rationales correct |
| far-ebp-03 | c | c | agree |
| far-ebp-04 | a | a | agree; (b) rationale misdefines the PBO (finding 001) |
| far-ebp-05 | b | b | agree |
| far-ebp-06 | d | d | agree; 300,000 − 450,000 = (150,000) |
| far-ebp-07 | b | b | agree |
| far-ebp-08 | a | a | agree; 5,405,000. (d) 5,185,000 = 5,200,000 − 15,000 (both receivables omitted), not "loans subtracted" (= 5,045,000) (finding 002) |
| far-ebp-09 | b | b | agree |
| far-ebp-10 | c | c | agree |
| far-x1-18 | d | d | agree |

No key disagreements.

## (b) Lesson design

- **Big idea:** clear (the plan is its own reporting entity; "how much is in the pot and why did it change"). Good framing.
- **Pre-question** (`far-ebp-pre1`, participant loans): primes a classic misconception (loans as investments) that the lesson then answers in the measurement table and key takeaways. It primes a narrow point rather than the big idea; acceptable.
- **Body:** DC vs. DB table → statement of net assets (measurement table) → worked statement of changes → check → DB accumulated plan benefits (categories, change factors, beginning/end date) → faded example → check. Logical order. Worked numbers recomputed: 4,800,000 + 3,000,000 − 3,300,000 = 4,500,000; ending 34,500,000. Faded: 535,000; −240,000; 11,760,000. All correct.
- **Technical currency:** consistent with current ASC 960/962 — fully benefit-responsive contracts at contract value (ASU 2015-12), participant loans as notes receivable at unpaid principal plus accrued unpaid interest (ASU 2010-25). No ASU issued 2023–2026 changes plan reporting for the exam window (ASU 2025-10 excludes certain EBPs; not effective). No `taxYear` needed.
- **Gaps:** no statement that a cash flow statement is not required (encouraged only) and no comparative-statement rule when benefit info is as of the beginning of the year, though items rely on both (finding 007). Net-depreciation classification is inconsistent with chk1 (finding 011).
- **Minutes:** ~930 words incl. frontmatter shown in the UI (561 in the body), 1 worked block, 1 faded block (3 inputs), 3 inline MCQs → about 12–14 minutes. `minutes: 13` is realistic.
- **Lesson–item alignment:** items testing something the lesson never teaches: `far-ebp-01`(b) / `far-x1-18`(a) cash-flow-statement exemption; `far-ebp-10` explanation's comparative-statement rule; `far-ebp-04`(b) and `far-ebp-09`(a) refer to the ASC 715 PBO / funded status (only in distractor rationales; no employer-pension module exists in the platform).
- **Sequencing:** relies only on "fair value" as a concept (taught later in `far-fair-value`, FAR-III); no measurement mechanics are needed, so no real prerequisite problem.
- **Scope:** `optional: true` is the right call for FAR — the topic is BAR Area II under the 2026 Blueprints — but docs/BLUEPRINT_NOTES.md still claims it is FAR Area I (finding 008).

## (c) Practice design

- 10 practice MCQs + 1 exam MCQ; 3 lesson-pool MCQs; 6 flashcards.
- Skill (practice + exam): remembering 7, application 4, analysis 0. Difficulty: 1 ×7, 2 ×4, 3 ×0. Order not easy→hard. FAR target R 5–15 / App 45–55 / An 35–45 — the module is far more recall-heavy (excluded from the mix as optional, but BAR tests this topic at application level). Finding 009.
- Key letters a3 b4 c2 d2 — balanced.
- Redundancy: "required statements" tested by far-ebp-01, far-x1-18, far-ebp-chk2 + fc1/fc2 (borderline, not >3 MCQs). Accumulated-benefits basis: far-ebp-04 + fc6. Participant loans: pre1, fc4, ebp-08. No contradictions found between items, flashcards and lesson except the net-depreciation classification (011).
- Cues judged: real cues in far-ebp-06 (only numeric option) and far-ebp-10 (absolutes only in distractors); far-ebp-chk2 mild. Other cues.md flags (key longest/shortest for pre1, 01, 03, 04, 05, 07, 09) judged not meaningful (length differences small or natural).

## (d) Items with no issues

far-ebp-pre1, far-ebp-01, far-ebp-02, far-ebp-03, far-ebp-07, far-ebp-09, far-ebp-fc1, far-ebp-fc2, far-ebp-fc3, far-ebp-fc4, far-ebp-fc5, far-ebp-fc6.

## (e) Needs expert verification

- Finding 008: exact AICPA 2026 BAR/FAR Blueprint wording for "Financial statements of employee benefit plans" (secondary sources only; official PDF not reachable).
- Lesson insight "plans do not separate [realized and unrealized] on the face": my recollection is that GAAP/the AICPA EBP Guide says realized and unrealized amounts are combined as net appreciation (depreciation) and *need not* be separated; whether separate presentation is prohibited or merely not required was not verified. The items are safe either way (far-ebp-06(c) says "as required", which is wrong under both readings). Not logged as a finding.
- far-ebp-10 explanation "if as of the beginning, prior-year net assets are also presented": consistent with ASC 960-205-45 as I recall it (prior-year statements of net assets and changes); exact paragraph not re-verified.

## (f) Could not check

- Primary sources (ASC text, AICPA Blueprint PDF) could not be fetched; ASC citations are from knowledge. One web search used (BAR placement).
- App rendering of this module not exercised (usability is reviewed separately); confirmed the Course page shows the "Optional · outside the 2026 Blueprint" chip (src/pages/Course.tsx:85) and that far-x1-18 is not on far-mock-1/2/3.
