You are the learning-flow and learning-logic reviewer in an exhaustive review of a CPA exam study platform at /home/user/CPA_Study_Program (React 19 + Vite; content in content/, pure logic in src/lib, persistence in src/db, pages in src/pages). Today is 2026-10-07; the target is the 2026 CPA Exam. Assume a working adult with 300–400 study hours per section.

**Review only.** Do not modify any file outside `review/`; outputs go to `review/batches/L-logic-flow/` (put any scripts in `review/batches/L-logic-flow/scripts/`; you may run them with `npx tsx`, importing from src/lib and scripts/load-content.ts). Don't commit or push. Other reviewers cover per-module lesson/item quality and the live UI; you cover the platform-level learning design and the algorithms.

Read first: README.md, PLAN.md, REVIEW.md, docs/BLUEPRINT_NOTES.md, content/sections/*.yaml, src/content/schema.ts and build.ts, every file in src/lib (srs, mastery, analytics/readiness, planner, quiz, quizScoring, examScoring, examClock, pacing, studyState, tbsScoring, cardQueue, itemStats, search), src/db/actions.ts and quizzes.ts, and the pages that use them (Dashboard, Planner, Analytics, ReviewQueue, PracticeStart/Builder, QuizPlayer, ExamHome/ExamPlayer, ModulePage, Flashcards). Read the tests in tests/ for the intended behaviour.

Your scope (verbatim from the brief, section 3):
## 3. Learning flow and pedagogy

Evaluate how a real candidate experiences the material. Assume a working adult with 300–400 study hours per section.

- **Sequencing.** Module order and prerequisites make sense, and nothing relies on a concept that's taught later. Check the prerequisite graph in the content metadata against what each lesson actually assumes.
- **Lesson design.** Assess the big idea first, then the pre-questions, then the body, then the key takeaways and the inline questions. Look at:
  - whether pre-questions prime the right concept
  - whether the lesson length (the `minutes` value) is realistic
  - whether each lesson covers what its practice items test (lesson–item alignment: items shouldn't test material the lesson never teaches)
- **Practice design.**
  - Are the MCQ counts per module, and the difficulty spread within modules, adequate?
  - Do practice items progress from easy to hard?
  - Do misses route the learner back to the right lesson?
- **Spaced repetition and review.** Assess whether the scheduling (`src/lib`) is sound for exam prep: intervals, how lapses are handled, and how confidence ratings ("Guess", "Unsure", "Confident") are used.
- **Readiness and mastery.** Read the readiness and mastery calculations and judge whether they are a defensible predictor of exam performance:
  - their inputs and weighting
  - how they handle small samples and lucky guesses
  - what they show a user before the user has enough data
- **The study planner.** Given a target exam date and weekly hours, does the plan cover everything with enough review and mock time? Test a few realistic and edge-case scenarios.
- **Mock exams.** Compare the forms to the real exam:
  - structure (testlets), item counts, the MCQ-to-TBS split and time limits per section
  - difficulty
  - scoring and the scaled-score approximation
  - the review experience after a mock
- **Final review.** Do the final-review docs cover the high-yield topics per section?
- **Motivation and clarity.** Does the platform always make the next step obvious (dashboard, "Continue lesson", study plan)?

Specifically: (1) Sequencing — build the prerequisite graph from the section YAML order (and any prerequisite metadata) and check each lesson's assumptions against what came before (sample the lesson bodies; per-module reviewers check this too, you check the structure). (2) Spaced repetition — evaluate the FSRS parameters (desired retention, max interval vs. a fixed exam date, learning steps), lapse handling, how Guess/Unsure/Confident map to ratings, whether correct guesses are requeued, whether intervals can overshoot the exam date, card vs. question scheduling. Write small simulations. (3) Readiness/mastery — inputs, weights, thresholds (≥80% on ≥2 days, ≥3 items/day), small-sample handling (confidence intervals? priors?), lucky guesses, optional content, what's shown before enough data; simulate a random guesser (25%), a 60% learner and an 85% learner and report what readiness/mastery shows them over time. (4) Planner — run the planner for realistic and edge scenarios (exam in 4, 8, 12, 16 weeks; 5, 10, 20 hrs/week; already partially complete; exam tomorrow; exam date in the past; multiple sections) and check coverage of every in-scope module, review time, mock exam time and the final-review window; compute hours required (sum of lesson minutes + practice time estimates + TBS + mocks) vs. hours available and see what the plan does when they don't fit. (5) Mock exams — compare the 12 forms (content/*/exams/*.json) with the real exam: testlet structure, item counts, MCQ/TBS split, time limits per section, area and skill distribution of items on each form vs. Blueprint weights, difficulty mix, reuse across forms (forms 2 and 3 reuse half of form 1's MCQs — judge the effect), scoring and the scaled-score approximation in src/lib/examScoring.ts (is the mapping defensible? is the caveat clear?), the post-mock review experience (code-level). (6) Misses routing back to lessons; error log; recommendations. (7) Practice design at platform level: MCQ counts per module, difficulty spread and easy→hard progression (compute per module from the content), skill-mix vs. Blueprint per section (compute; the validator only warns), key-letter balance. (8) Final-review docs coverage of high-yield topics (read content/*/review/*.md) — high level only; another reviewer checks their accuracy. (9) Motivation and clarity — from the code: is the next step always obvious (dashboard, Continue lesson, study plan)?

## Findings format and severity (verbatim from the brief)
## 5. Severity and the finding format

Classify every finding:

| Severity | Meaning |
|---|---|
| **S1 – Wrong** | A wrong key, a wrong number or rule, outdated law presented as current, a TBS that scores a correct answer as wrong, or a broken core journey. A student would learn something false or be blocked. |
| **S2 – Misleading** | The item is ambiguous or has more than one defensible answer, an explanation is wrong while the key is right, an important fact is missing from a stem, a Blueprint gap exists, a skill level is badly mislabeled, or a significant usability or accessibility barrier exists. |
| **S3 – Weak** | A cue, a poor distractor, a thin explanation, redundancy, a minor flow issue, or a cosmetic or UX friction. |
| **S4 – Suggestion** | Optional improvements. |

Write one JSON object per line to `review/findings.jsonl`:
```json
{"id":"F-0001","severity":"S1","category":"content-correctness|item-quality|tbs|lesson|currency|coverage|flow|pedagogy|usability|accessibility|performance",
 "section":"FAR","module":"far-bonds","item":"far-bo-12","file":"content/far/modules/far-bonds/questions.json",
 "issue":"Key (b) uses straight-line amortization; the stem requires the effective interest method.",
 "evidence":"Recomputed: 91,889 × 4% = 3,676 interest expense; the keyed 3,378 matches straight-line.",
 "source":"ASC 835-30-35-2",
 "fix":"Change the key to (a) $3,676, and update the explanation for (b) to say it's the straight-line amount.",
 "confidence":"high|medium|low"}
```
Every S1 and S2 finding must have evidence (a computation, a citation or a screenshot) and a concrete proposed fix. Low-confidence findings go in a separate "needs expert verification" list rather than being stated as errors.

Write findings to `review/batches/L-logic-flow/findings.jsonl` (local ids `L-logic-flow-001`…; `category` flow or pedagogy (or coverage for skill/area mix); `section` FAR/AUD/REG/TCP or "ALL"; `module` "" unless specific; `item` the function or exam form id, e.g. "src/lib/srs.ts:schedule" or "far-mock-2"; `file` the source file; evidence = your simulation output or computation). Every S1/S2 needs evidence and a concrete fix. Also write `ledger.csv` containing only the header `id,type,reviewed,findings_count,note`, and `notes.md` with your full assessment (one section per numbered topic above, with tables: per-section skill mix vs. Blueprint, per-form area/skill mix, simulation results, planner scenarios). Run `python3 review/tools/merge_batch.py L-logic-flow --check` at the end and fix any PROBLEM it reports.

Final reply (under 200 words): counts by severity and the top 5 issues in one line each.
