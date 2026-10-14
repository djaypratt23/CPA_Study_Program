# L-logic-flow — learning flow and learning logic

Reviewer scope: section 3 of the brief (platform-level learning design and the algorithms). Per-module lesson and item
quality and the live UI are covered by other batches. Everything below is from reading the code and content and from
scripts in `scripts/` that run the app's own pure functions (`computeStudyState`, `generatePlan`, `buildQuiz`,
`buildMasteryCheck`, `buildDiagnostic`, `scoreExam`, `review`) against the real content bundle. Re-run any script with
`npx tsx review/batches/L-logic-flow/scripts/<name>.ts`; saved outputs are the `*.out.txt` files.

Findings: 33 in `findings.jsonl` (S1 1 · S2 10 · S3 18 · S4 4).

## Summary

The platform's skeleton is sound: concept-first lessons with pre-questions and embedded checks, per-choice
explanations with named traps, interleaved mixed sets, confidence ratings, FSRS, mastery checks spaced across days,
a stratified diagnostic, a four-hour mock with testlets, the optional break and locked testlets, and a self-replanning
schedule. The exam structure (item counts, testlets, TBS split, 4-hour clock, break after testlet 3, 50/50 weighting)
matches the 2026 Blueprints for all four sections.

The weaknesses are in the logic that tells a learner where they stand and what to do next:

1. **Readiness can say "Likely ready" at a quarter of the syllabus** (S1). Any tutor/test answer marks a module
   "studied", so the recommended diagnostic sets coverage to ~100% and removes the penalty for unstudied material.
2. **Mastery is reachable by luck** (S2): two ≥80% days on 3–5 items, ever, with daily retries. A fixed-60% learner
   ends with 20–26 of 35 FAR modules "mastered".
3. **The planner stalls weak learners** (S2): failed mastery checks come back daily, unspaced, ahead of all later
   lessons; a struggling learner stops getting new material while the status says "On track".
4. **The planner's hours model is ~35–45 h per section** (S2), so "On track" appears for 60-hour FAR plans.
5. **Adaptive ordering ignores prerequisites** (S2): a new AUD learner starts with sampling and substantive procedures,
   a new REG learner with C corporations and partnerships, before materiality/risk or basis.
6. **Mocks are easier and lower-level than the real exam** (S2): almost no hard or Analysis-level MCQs, forms 2–3 reuse
   half of form 1, and the TBS time budgets do not fit the clock.
7. **"Unsure" answers never graduate** in FSRS (S2): Hard on a learning step repeats the step.

## 1. Sequencing and prerequisites

- There is **no prerequisite metadata** anywhere (schema `ModuleRef`/`UnitConfig` have none); the only sequencing
  signal is YAML order (= Blueprint order).
- **Adaptive reordering** (`orderUnits` with `unitPriority = area midpoint × weakness`, weakness 0.5 with no data)
  reorders untouched units for every new learner whenever area weights differ:

| Section | New-learner unit order (from `scripts/planner.ts`) | Effect |
|---|---|---|
| FAR | u1 → u12 (course order; I and II tie at 35, III 30) | unchanged |
| AUD | u6 → u7 → u8 (Area III) → u3 → u9 (IV) → u4 → u5 (II) → u1 → u2 (I) → u10 | evidence, sampling, cycles and reports before ethics, materiality, risk assessment, internal control |
| REG | u6 → u7 (V) → u4 → u5 (IV) → u2 (II) → u1 (I) → u3 (III) | corporations, partnerships, S corps before individuals; property basis/cost recovery/capital gains last |
| TCP | u1 → u7 (course order; I and II tie) | unchanged |

  Lesson evidence of dependence: `aud-sampling` uses tolerable misstatement and risk of overreliance (taught in
  `aud-risk-materiality`, `aud-tests-of-controls`); `reg-partnerships` uses outside basis, §1231 and §179;
  `reg-c-corp-income` uses capital-loss and cost-recovery rules (REG-III).
- **FAR course order itself** puts Area I capstones first: EPS (if-converted, treasury stock method), consolidations
  (equity method, goodwill), cash flows (finance leases, deferred tax, impairment) and OCI (AFS) before bonds, equity
  investments, intangibles, leases and income taxes (units 6–11). AUD, REG (static order) and TCP static orders are
  pedagogically reasonable.
- The planner's "lesson fits in ≥15 minutes" rule lets a short lesson from the next unit jump ahead of a longer one in the
  current unit (FAR day 1 at 43 min/day: balance sheet → notes (u2) → then income statement (u1) next day). Minor.
- `unmasteredPrerequisites` is a soft warning when starting a new unit with unmastered studied modules — a good idea,
  but it is "studied elsewhere", not real prerequisites.

## 2. Spaced repetition (FSRS)

Parameters (`src/lib/srs.ts`): ts-fsrs 5.4.2, `request_retention 0.9`, `maximum_interval 365`, fuzz off, default
learning steps `1m, 10m`, relearning `10m`, short-term on. One scheduler for flashcards and questions.

Confidence → grade: wrong or Guess → Again; correct + Unsure → Hard; correct + Confident → Good (never Easy).
Questions enter the queue only if missed, guessed or unsure (`needsRequeue`); thereafter every answer in tutor/test/review
updates them. Mock answers stay out unless the learner opts in (D4). Correct guesses are requeued like misses — good.

Simulated paths (`scripts/srs.ts`):

| Path | Intervals after each answer | Predicted recall on day 56 |
|---|---|---|
| missed, then Confident ×6 | 1m, 10m, 1d, 2d, 7d, 19d, 48d | 0.935 (next due day 77) |
| missed, then Unsure-correct ×6 | 1m, 6m, 6m, 6m, 6m, 6m, 6m (never graduates) | 0.42 |
| correct Guess, then Confident ×5 | 1m, 10m, 1d, 2d, 7d, 19d | 0.83 |
| Unsure first, then Confident ×5 | 6m, 10m, 1d, 5d, 17d, 51d | 0.927 |
| missed, Confident ×3, lapse, Confident ×3 | 1m, 10m, 1d, 2d, 10m, 1d, 2d, 4d | 0.67 if not reviewed again |
| lucky Guess every time | 1m forever | — |

| Exam in | Reviews of a missed item answered Confidently when due | Last review | Next due | Recall on exam day |
|---|---|---|---|---|
| 28 d | 5 | day 10 | day 29 | 0.904 |
| 56 d | 6 | day 29 | day 77 | 0.935 |
| 84 d | 7 | day 77 | day 188 | 0.991 |

Assessment:
- Intervals overshooting the exam are **not harmful by construction** (due = when recall falls to 0.90), but nothing
  targets higher recall in the final window (S4).
- **Unsure never graduates** (S2): Hard on a learning step repeats the step; the item returns minutes later after every
  review session, i.e. massed rather than spaced practice. Same for flashcards rated Hard while learning.
- **Learning steps 1m/10m** make a missed question "due" immediately; the first two re-asks happen minutes after reading
  the explanation and count as successful reviews (S3). Lesson pre-questions — guesses before reading — are also
  scheduled.
- Lapse handling is standard FSRS (stability falls to ~4 d). Card vs question scheduling: re-answering the identical MCQ
  measures recognition of four fixed choices, so question stability is probably optimistic; FSRS default weights are
  population-trained on flashcards and never personalised (noted, no finding).
- Planner review time: today `ceil(due × 0.5)` minutes capped at 30% of capacity; future days a flat 15%. Reasonable.

## 3. Readiness and mastery

**Mastery** (`computeMastery`): ≥80% on mixed retrieval on ≥2 different days, ≥3 distinct items per day, guesses count
wrong, review/mock answers excluded; "slipping" if the latest qualifying-size day after mastery is <60%.

| True accuracy | P(5-item day qualifies, ≥4/5) | P(3-item day, 3/3) | P(mastered within 5 / 10 / 20 daily checks) |
|---|---|---|---|
| 0.25 | 0.016 | 0.016 | 0.00 / 0.01 / 0.04 |
| 0.54 (60% with 10% of right answers marked Guess) | 0.241 | 0.157 | 0.35 / 0.74 / 0.97 |
| 0.60 | 0.337 | 0.216 | 0.55 / 0.90 / 1.00 |
| 0.85 | 0.835 | 0.614 | 1.00 / 1.00 / 1.00 |

Wilson 95% lower bounds: 4/5 → 0.38, 3/3 → 0.44, 8/10 → 0.49. No prior, no interval, no expiry of qualifying days.

**Readiness** (`areaReadiness`, `overallReadiness`): per area, estimate = coverage × accuracy + (1 − coverage) × 0.30,
accuracy = last 60 first-attempt MCQs (guesses wrong) blended 50/50 with the last 10 TBS when any exist; areas weighted by
Blueprint midpoints; overall null until ≥15 first attempts and every area has an estimate (n ≥ 5 or coverage 0); a
finished mock is blended 50/50 and counted as 60 items; band = binomial ±1.96 se mapped through the 65%→75 rule; labels
≥75 Likely ready, ≥70 Borderline, ≥60 Building.

Inputs and weighting are defensible in outline (first attempts only, Blueprint weights, conservative prior for unstudied
material, explicit "not enough data" state). Problems: coverage counts any touched module (S1); the label ignores the band
(S3); the band ignores model and mapping uncertainty (S3); honest guess labels lower the estimate while unlabelled
test-mode/mock answers count fully (S3); one thin area nulls the whole estimate (S3); evidence is mostly immediate
post-lesson practice with no retention term (S3). Also noted (no separate finding): when no TBS has been attempted in an
area, its accuracy is MCQ-only, which usually overstates the TBS half of the score.

**Simulations** (`scripts/learners.ts`; learner follows the app's own daily plan through the real code; FAR, 10 h/week,
exam in 12 weeks; accuracy 0.30 before a module's lesson, fixed profile accuracy after; the 60% and 85% learners mark some
answers Unsure/Guess; review-queue work skipped because it never feeds readiness or mastery; TBS ≈ 0.85 × p).

With the dashboard's recommended diagnostic first:

| Week | Honest guesser (25%, clicks Guess) | Overconfident guesser (25%, clicks Confident) | 60% learner | 85% learner |
|---|---|---|---|---|
| after diagnostic | 12 [1–22] Early · lessons 0% | 38 [21–54] Early | 46 [29–64] Early | 46 [29–64] Early |
| 1 | 16 · lessons 23% · 0 mastered | 36 · 23% | 61 Building · 20% · 0 | **80 [76–84] Likely ready · 26% · 1** |
| 2 | 16 · 26% | 38 · 26% | 60 · 29% · 2 | 82 Likely ready · 49% · 7 |
| 4 | 16 · 26% (plan = 8 mastery checks, 0 lessons) | 38 · 26% | 62 · 43% · 6 | 83 · 86% · 24 |
| 8 | 16 · 26% | 38 · 26% | 61 · 80% · 17 | 83 · 100% · 28 |
| 12 (after mock) | 18 · 26% · 0 | 29 · 26% · 0 | 64 [57–70] Building · 100% · **26/35** | 83 [79–86] · 100% · 30/35 |

Without the diagnostic (same learners):

| Week | Honest guesser | Overconfident guesser | 60% learner | 85% learner |
|---|---|---|---|---|
| 1 | 29 · 23% | 32 · 23% | 40 Early · 23% · 0 | 52 Early · 31% · 2 |
| 3 | 28 · 26% | 31 · 26% | 47 · 46% · 7 | 69 Building · 69% · 18 |
| 4 | 28 · 26% | 31 · 26% | 48 · 57% · 10 | 79 Likely ready · 91% · 24 |
| 8 | 28 · 26% | 31 · 26% | 63 Building · 100% · 22 | 83 · 100% · 28 |
| 12 | 30 · 26% | 31 · 26% | 60 · 100% · 20/35 | 84 · 100% · 33/35 |

At 5 h/week (no diagnostic): the 60% learner reaches 74% of lessons by the exam, readiness disappears again in week 8
("Not enough data yet", Area II n<5 after its first lesson), ends at 62; the 85% learner finishes lessons and shows 86.
REG (10 h/week, with diagnostic): readiness is "Not enough data yet" until week 8 (60%) / week 4 (85%), and for all 12 weeks
for both guessers (REG-III got 4 diagnostic items). 60% REG learner ends with 14–17 of 25 modules "mastered".

What is shown before enough data: "—", "Not enough data yet" and a request for 15 new questions across every area; area
bars show "—" until n ≥ 5. That copy is good; it is just wrong about the reason in the REG case.

## 4. Study planner

Planner model per in-scope module: lesson `minutes` + one 15-min practice set + two 10-min mastery checks (spaced 2 and
5 days); 15 min per remaining practice TBS per unit; one 4-hour mock in the final-review window (20% of days, 3–14);
light review the day before; spare time → mixed practice (final window: half mixed, half final notes).

Hours (`scripts/planner.ts`):

| Section | In-scope modules | Lesson h | Planner's whole-course model | One pass through app content* |
|---|---|---|---|---|
| FAR | 35 | 10.1 | 46.0 h | 91.5 h |
| AUD | 33 | 8.8 | 43.6 h | 86.1 h |
| REG | 25 | 7.3 | 36.9 h | 83.5 h |
| TCP | 19 | 6.2 | 32.7 h | 85.5 h |

\*lessons + every practice MCQ at 2.5 min with explanation + practice TBS at 1.5× suggested minutes + 3 mocks + 3 two-hour
mock reviews. Brief's target: 300–400 h per section.

Scenarios (exam dates from 2026-10-09; hours spread evenly over 7 days):

| Scenario | Status message | New-learning need vs available | Lessons never scheduled | Mock |
|---|---|---|---|---|
| FAR 4 wk, 5 h/wk | Behind ~28 h; add ~542 min/wk | 42.0 vs 13.7 h | 21/35 | day 23, 4 h on a 43-min day (flagged) |
| FAR 4 wk, 10 h/wk | Behind ~15 h | 42.0 vs 27.0 | 7/35 | day 23 |
| FAR 4 wk, 20 h/wk | On track; 6-day final review | 42.0 vs 53.6 | 0 | day 23 |
| FAR 8 wk, 5 h/wk | Behind ~14 h | 42.0 vs 27.9 | 7/35 (6 lessons inside final window) | first final-review day |
| FAR 8 wk, 10 h/wk | On track; 11-day final review | 42.0 vs 55.0 | 0 | first final-review day |
| FAR 12 wk, 5 h/wk (60 h total) | **On track**; 14-day final review | 42.0 vs 43.3 | 0 | first final-review day |
| FAR 16 wk, 20 h/wk | On track; 209 h of "mixed practice" | 42.0 vs 237.3 | 0 | one only |
| REG 4 wk, 10 h/wk | Behind ~6 h | 32.9 vs 27.0 | 0 (5 in final window) | day 23 |
| REG 12 wk, 5 h/wk | On track | 32.9 vs 43.3 | 0 | one only |
| FAR exam tomorrow | "too close… focus on review" | — | all | none; "Light review" today |
| FAR exam in 4 days | "too close" | 42.0 vs 1.4 | 32/35 | **4-h mock on day 2** |
| FAR exam date passed | "has passed — set your next date" | rolling 28-day plan | — | none |
| FAR no date | "Set an exam date…" | rolling 28-day plan | 5/35 in 28 days | none |
| FAR half done, 6 wk, 10 h/wk | On track | 37.2 vs 41.6 | 0 | first final-review day |
| FAR 6 wk + AUD 14 wk, 10 h/wk | each plan schedules 9.8 h in week 1 | — | — | double-booked |

Strengths: honest "behind by X hours" messages, the four-hour flag on a short mock day, the exam-day and past-date
handling, automatic replanning, practice right after each lesson and spaced mastery checks. Weaknesses: the hours model
(S2), failed mastery checks starving later lessons with an optimistic status (S2), one mock and no review block, mock still
scheduled when far behind or days away (S3), no cross-section budget (S3), TBS budgeted at 15 min vs 19–22 suggested.

## 5. Mock exams

Structure matches the Blueprint for all 12 forms (validator-enforced): FAR 25/25 MCQ + 2/3/2 TBS; AUD 39/39 + 2/3/2; REG
36/36 + 2/3/3; TCP 34/34 + 2/3/2; 240 minutes; optional 15-minute break after testlet 3 that stops the clock; locked
testlets; no confidence prompt or skill chip; choices shuffled per session (so key-letter imbalance on individual forms,
e.g. reg-mock-3 15/16/25/16, carries no cue).

Per form (`scripts/forms.ts`; area % = share of MCQs; "weighted" = 50% MCQ share + 50% TBS share; skill order
R/Ap/An/Ev; difficulty easy/medium/hard among MCQs):

| Form | MCQ area % | TBS by area | Weighted area % | Weighted skill % (R/Ap/An/Ev) | MCQ difficulty | Shared with form 1 | Σ TBS minutes vs time left after MCQs @90 s |
|---|---|---|---|---|---|---|---|
| far-mock-1 | 36/34/30 | 3/2/2 | 39/31/29 | 6/78/16/0 | 6/34/10 | — | 180 vs 165 |
| far-mock-2 | 36/34/30 | 3/2/2 | 39/31/29 | 9/78/13/0 | 9/34/7 | 25/50 | 160 vs 165 |
| far-mock-3 | 36/34/30 | 3/2/2 | 39/31/29 | 10/80/10/0 | 10/37/3 | 25/50 | 170 vs 165 |
| FAR Blueprint | 30–40/30–40/25–35 | | | 5–15/45–55/35–45/— | | | |
| aud-mock-1 | 21/29/35/15 | 1/2/2/2 | 17/29/32/22 | 23/54/16/8 | 36/38/4 | — | 150 vs 123 |
| aud-mock-2 | 21/31/33/15 | 1/2/2/2 | 17/30/31/22 | 26/45/8/21 | 41/36/1 | 39/78 | 150 vs 123 |
| aud-mock-3 | 21/28/36/15 | 1/2/2/2 | 17/28/32/22 | 23/47/8/22 | 36/39/3 | 39/78 | 145 vs 123 |
| AUD Blueprint | 15–25/25–35/30–40/10–20 | | | 30–40/30–40/15–25/5–15 | | | |
| reg-mock-1 | 15/19/10/28/28 | 1/1/2/2/2 | 14/16/17/26/26 | 16/84/0/0 | 23/49/0 | — | 195 vs 132 |
| reg-mock-2 | 17/19/8/28/28 | 1/1/2/2/2 | 15/16/17/26/26 | 19/74/6/0 | 28/44/0 | 36/72 | 200 vs 132 |
| reg-mock-3 | 14/19/11/28/28 | 1/1/3/2/1 | 13/16/24/26/20 | 15/78/6/0 | 22/50/0 | 36/72 | 180 vs 132 |
| REG Blueprint | 10–20/15–25/5–15/22–32/23–33 | | | 25–35/35–45/25–35/— | | | |
| tcp-mock-1 | 35/31/19/15 | 2/3/1/1 | 32/37/17/14 | 10/90/0/0 | 14/40/14 | — | 190 vs 138 |
| tcp-mock-2 | 35/32/18/15 | 2/3/1/1 | 32/38/16/14 | 10/75/14/0 | 14/40/14 | 34/68 | 180 vs 138 |
| tcp-mock-3 | 35/29/21/15 | 2/3/1/1 | 32/36/17/14 | 14/86/0/0 | 19/37/12 | 34/68 | 180 vs 138 |
| TCP Blueprint | 30–40/30–40/10–20/10–20 | | | 5–15/55–65/25–35/— | | | |

Exam-pool TBS are smaller than practice TBS but budgeted longer: scored cells/minutes per cell — FAR exam 8.5 cells,
2.77 min/cell vs practice 10.9, 1.80; REG exam 7.1, 3.33 vs 8.1, 2.63 — so the overrun is mostly inflated `minutes`.
Each form leaves 1–5 in-scope modules untested, which is fine for a 50–78-item form.

Assessment:
- Area mix by MCQ is within ±5 points everywhere (tested); with TBS weight, REG-III (17–24%) and AUD-IV (22%) run high and
  reg-mock-3 REG-V low (20%) (S3).
- Skill mix: Analysis is badly under-represented on every form (S2).
- Difficulty: exam-pool MCQs are far easier than practice; REG forms have no hard MCQs (S2). The real exam's MCQ testlets
  are multistage (testlet 2 medium or difficult); these forms are static.
- Reuse: forms 2–3 reuse 50% of form 1's MCQs (S2); four exam items are near-clones of practice items (S3).
- Scoring: `scoreExam` averages MCQ % and TBS % (each TBS equal), weights 50/50, unanswered = 0, then 65% → 75 piecewise
  linear. As a rule of thumb this is defensible and the caveat on the results page is clear and honest; it is not
  defensible on forms this easy, and the dashboard readiness reuses the scale without the caveat.
- Post-mock review: score, MCQ/TBS split, per-area table, pacing by testlet, every item with explanations, opt-in "add
  missed to review", error tagger on misses. Missing: link from misses to lessons/modules, a missed-only filter, flagged
  items highlighted, and the mock feeding Analytics/recommendations (S3).

## 6. Misses, the error log and recommendations

- Tutor mode reveals the key, per-choice explanations with trap labels and an "Why did you miss it?" tagger (also on
  lucky guesses); tags feed the error log, Analytics' "most common miss" advice and each module's top cause in the
  recommendations. Good design.
- Misses never link to the lesson that teaches the item, and mixed/review sets don't name the module (S3).
- A failed mastery check shows a good remediation panel (traps that caught you; rework worked/faded examples; flashcards;
  retest on unseen items) — but the planner doesn't schedule that remediation and just repeats the check tomorrow (S2).
- `weakestModules` ranks slipping (0.9), low accuracy over the last 20 non-lesson, non-exam answers, lesson-done-but-
  unpracticed, then unconfirmed mastery; unstudied modules are excluded. Reasonable; the 20-answer window includes
  review-queue answers (by definition previously missed items), which skews weak modules lower — acceptable. Mock misses
  are excluded (S3).

## 7. Practice design

Per section (`scripts/stats.ts`, `scripts/practice.ts`):

| Section | In-scope practice MCQs / module (min–max) | Difficulty easy/med/hard | Practice keys a/b/c/d | Calc share | Practice TBS (exam) |
|---|---|---|---|---|---|
| FAR | 28–34 (mean 27.4 incl. optional) | 17/38/45% | 254/257/254/250 | 49.5% | 46 (14) |
| AUD | 27–28 | 27/40/32% | 226/225/223/218 | 3.3% | 46 (14) |
| REG | 33–44 | 23/37/40% | 234/231/227/226 | 27.6% | 44 (16) |
| TCP | 44–50 | 13/43/44% | 223/219/212/210 | 40.3% | 46 (14) |

Counts per module are ample (27–50) and flat across modules regardless of Blueprint weight. Every in-scope module has
easy and hard items. Difficulty is never used by any set builder, so there is no easy→hard progression (S3). Key letters
are balanced and choices are shuffled per session in practice and mocks (lesson checks keep authored order; their keys
are balanced too).

Skill mix vs Blueprint (share of items):

| Section | Pool | Remembering | Application | Analysis | Evaluation | Blueprint |
|---|---|---|---|---|---|---|
| FAR | practice MCQ (1,015) | 14.7 | **43.9** | 41.4 | — | 5–15 / 45–55 / 35–45 |
| FAR | exam MCQ (104) | **21.2** | **70.2** | **8.7** | — | |
| FAR | TBS (60) | 0 | 38 | 22 | — | |
| AUD | practice MCQ (892) | 31.1 | 37.3 | 21.5 | 10.1 | 30–40 / 30–40 / 15–25 / 5–15 |
| AUD | exam MCQ (156) | **49.4** | **48.7** | **1.3** | **0.6** | |
| AUD | TBS (60) | 0 | 21 | 22 | 17 | |
| REG | practice MCQ (918) | 25.7 | **34.3** | **40.0** | — | 25–35 / 35–45 / 25–35 |
| REG | exam MCQ (148) | 35.1 | **64.9** | **0.0** | — | |
| REG | TBS (60) | 0 | 41 | 18 | **1** (reg-tbs-r3-circular230) | |
| TCP | practice MCQ (864) | 13.0 | 55.8 | 31.3 | — | 5–15 / 55–65 / 25–35 |
| TCP | exam MCQ (136) | **24.3** | **75.7** | **0.0** | — | |
| TCP | TBS (60) | 0 | 38 | 21 | **1** (tcp-tbs-r3-planning) | |

Lesson-pool MCQs (pre-questions and checks) lean to Remembering/Application, which suits their purpose.

## 8. Final-review docs (high level)

| Section | Docs | Coverage |
|---|---|---|
| FAR | exam-day, formulas, high-yield by area, mnemonics | Good: all three areas; missing special purpose frameworks and related parties (S4) |
| AUD | exam-day, high-yield by area, report guide, mnemonics | Good: all four areas; missing data analytics, GAGAS/single audit (S4) |
| REG | exam-day, numbers, computation roadmap, mnemonics | **No high-yield doc; REG-I and REG-II largely absent; no SALT; roadmap leans on TCP-scope topics** (S2) |
| TCP | exam-day, numbers, formulas, mnemonics | No high-yield doc; nothing on international, consolidated returns, entity choice (S3) |

Accuracy of these docs is another reviewer's job.

## 9. Motivation and clarity — is the next step obvious?

- Dashboard: one large "next step" button (resume exam → resume set → continue lesson → plan's first task → next lesson
  → mixed practice), today's plan with links and minutes, a plan-status line, progress, readiness and weakest areas; a
  diagnostic card for new users. Results pages offer "Next: …" from the same logic. Mostly excellent.
- Issues: "Continue lesson" can hijack the main button after merely opening a lesson (S3); the "Study next" fallback uses
  course order, not the plan's; "Final review notes: weakest areas first" routes to a generic doc list (not
  personalised); the mock task routes to a list of three forms with no recommendation; the plan status can read "On
  track" while a learner is looping on failed mastery checks (S2).
- Lessons: objectives with skill chips → warm-up pre-question → big idea → body with embedded checks, worked and faded
  examples → takeaways → "Mark complete & practice" → later "Mastery check". The flow is clear and well-motivated.
  Lesson `minutes` are realistic (stated ≥ estimated reading time: medians 0.62–0.82); total lesson depth is modest
  (6–10 hours per section) (S3).

## Needs expert verification (medium/low confidence)

- Whether the 2026 exam still uses multistage MCQ testlets (testlet 2 medium or difficult) — used as context in the mock
  difficulty finding.
- Realistic per-TBS times on the real exam (the TBS-minutes finding uses the clock arithmetic, ~16.5 min per REG TBS).
- The 300–400 h benchmark is the brief's assumption; per-section targets (e.g. AUD/REG ~300, TCP ~250) are suggestions.
- How much each FAR Area I lesson actually depends on later units (per-module reviewers to confirm).
- The difficulty tags themselves are author-assigned; the "mocks are easier" finding relies on them.

## Files

- `findings.jsonl` — 33 findings. `ledger.csv` — header only (manifest has no items).
- `scripts/` — stats, forms, practice, lessons, misc (content analyses); planner, planner-day1 (scenarios); learners
  (readiness/mastery simulation: `npx tsx …/learners.ts FAR 12 10 [nodiag]`); srs (FSRS paths); write_findings.py.
