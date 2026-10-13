#!/usr/bin/env python3
"""Writes review/batches/L-logic-flow/findings.jsonl from the list below (re-run after edits)."""
import json, os
OUT = os.path.join(os.path.dirname(__file__), '..', 'findings.jsonl')
F = []
def f(severity, category, section, item, file, issue, evidence, source, fix, confidence, module=''):
    F.append(dict(id=f'L-logic-flow-{len(F)+1:03d}', severity=severity, category=category, section=section, module=module,
                  item=item, file=file, issue=issue, evidence=evidence, source=source, fix=fix, confidence=confidence))

# ---------- Readiness / mastery ----------
f('S1', 'flow', 'ALL', 'src/lib/analytics.ts:areaReadiness', 'src/lib/analytics.ts',
  'Readiness treats every module the diagnostic (or any single tutor/test answer) touched as "studied", so coverage jumps to ~100% and the unstudied-material penalty disappears. A learner who takes the dashboard\'s recommended diagnostic and then studies normally is told "Likely ready" (≈80) after one week with 26% of FAR lessons done. The code contradicts its own doc comment ("coverage: share of the area\'s modules studied (lesson done)").',
  'scripts/learners.ts (FAR, 10 h/wk, real computeStudyState): 85% learner WITH diagnostic → end of week 1: lessons 26%, readiness 80 [76–84] "Likely ready"; the same learner WITHOUT the diagnostic → week 1: 52 "Early stage", week 3: 69 "Building", "Likely ready" only at week 4 with 91% of lessons. Cause: areaReadiness counts a module as studied when `lessonDone || status !== "not-started"`, and computeMastery sets status "learning" after any tutor/test attempt; buildDiagnostic samples ~1 item from nearly every module, so coverage ≈ 1 and estimate = accuracy on the few modules actually studied.',
  'src/lib/analytics.ts areaReadiness (coverage), src/lib/mastery.ts computeMastery (status), src/lib/quiz.ts buildDiagnostic',
  'Compute coverage from lessonDone only (as documented), or from modules with ≥5 non-diagnostic practice answers; exclude diagnostic sessions (purpose "diagnostic") from mastery status. Better: estimate per module (studied → shrunken module accuracy; unstudied → 0.30) and weight modules within the area, so accuracy on 3 studied modules cannot stand in for 12. Add a regression test: diagnostic + 2 lessons must not raise readiness above the no-diagnostic value by more than the diagnostic evidence warrants.',
  'high')
f('S2', 'pedagogy', 'ALL', 'src/lib/mastery.ts:computeMastery', 'src/lib/mastery.ts',
  '"Mastered" is reached by chance: two qualifying days (≥80% on ≥3 items) at any time ever, with failed mastery checks retried daily by the plan, so a learner whose true accuracy is 60% ends up with most modules "mastered". Qualifying days never expire, and a 3-item day needs 3/3 while a 5-item day needs 4/5 — tiny samples with no interval or prior.',
  'Binomial: P(day qualifies | 5 own items, p) = 0.016 (p=.25), 0.337 (p=.60), 0.835 (p=.85); with daily retries P(two qualifying days within 10 checks) = 0.90 at p=.60. Wilson 95% lower bound of 4/5 is 0.38, of 3/3 is 0.44. Simulation (scripts/learners.ts, FAR 10 h/wk, fixed 60% accuracy incl. 10% of right answers marked Guess): 20–26 of 35 modules show "Mastered" by exam week; REG 60% learner 14–17/25.',
  'src/lib/mastery.ts (MASTERY_THRESHOLD, MASTERY_DAYS, MIN_ITEMS_PER_DAY); src/lib/planner.ts buildQueue (re-adds checks daily)',
  'Base mastery on the module\'s recent delayed-retrieval record instead of best days: e.g. the last 10 distinct non-lesson items answered ≥1 day after the lesson, Wilson/Beta lower bound ≥0.65 (≈8/10 or 9/10), with the two most recent mastery checks both ≥80% and ≥5 own items each; expire qualifying days older than ~21 days. Space retries (see the planner finding) so a pass cannot come from repetition of the same items on consecutive days.',
  'high')
f('S2', 'flow', 'ALL', 'src/lib/planner.ts:buildQueue', 'src/lib/planner.ts',
  'Failed mastery checks are re-added every day with no spacing and no remediation step, and because the queue is ordered unit by unit, all of them are scheduled before any lesson of a later unit. A struggling learner\'s plan becomes the same failing checks every day and new material stops; the status line still says "On track" because the plan assumes each check passes first time.',
  'scripts/learners.ts (FAR, 10 h/wk, exam in 12 wk): random guesser — day 28 and day 56 plans are "8 mastery checks, 0 lesson tasks"; lessons stop at 26% from week 2 to the exam; day-28 status "On track: new material finishes by 2026-12-12". 60% learner at 5 h/wk reaches only 74% of FAR lessons by exam day (85% learner: 100%). REG guesser: lessons stop at 32%.',
  'src/lib/planner.ts buildQueue / readyOn (a mastery item with no `after` and no lastMasteryDay is ready immediately)',
  'Track the last mastery-check attempt per module (pass or fail) and pass it to the planner: after a failed check, schedule a remediation task (rework faded example + flashcards) and set notBefore = last attempt + 2 days for the retry. Cap mastery retries per day (e.g. 2) and never let retries of earlier units block first-pass lessons when the projected finish is after the final-review start. Count expected retries in requiredMinutes so the status is honest.',
  'high')
f('S2', 'flow', 'AUD', 'src/lib/planner.ts:orderUnits', 'src/lib/studyState.ts',
  'With no data at all, the adaptive unit order (area weight × default weakness 0.5) reorders AUD and REG for a new learner: AUD starts with Area III evidence, sampling and substantive procedures before ethics, planning, materiality, risk assessment and internal control; REG starts with C corporations and flow-through entities before individual taxation and property basis (REG-III comes last). There is no prerequisite metadata in the schema, so the reorder cannot respect dependencies, and lessons then rely on concepts taught later.',
  'scripts/planner.ts: AUD new-learner unit order aud-u6 → u7 → u8 → u3 → u9 → u4 → u5 → u1 → u2 → u10; REG reg-u6 → u7 → u4 → u5 → u2 → u1 → u3 (FAR and TCP keep course order only because area weights tie). Day-1 next action: AUD "Lesson: Sufficient appropriate evidence & assertions"; REG "Lesson: C corporation taxable income". Dependencies: aud-sampling lesson uses tolerable misstatement and risk of overreliance (taught in aud-risk-materiality u3, aud-tests-of-controls u5); reg-partnerships uses outside basis, §1231 and §179; reg-c-corp-income uses capital-loss and cost-recovery rules (reg-capital-gains, reg-cost-recovery, both u3).',
  'src/lib/studyState.ts unitPriority (weakness 0.5 when no estimate); src/lib/planner.ts orderUnits; src/content/schema.ts ModuleRef (no prerequisites field)',
  'Apply priority ordering only after a diagnostic or ≥5 answers per area, and only among units whose prerequisites are done. Add `prerequisites: [unitId|moduleId]` to UnitConfig/ModuleRef (e.g. aud-u6 after aud-u3, aud-u5; reg-u6/u7 after reg-u3, reg-u4) and topologically sort with priority as the tie-breaker. Until then, keep course order for untouched units.',
  'high')
f('S2', 'flow', 'REG', 'src/lib/planner.ts:orderUnits', 'content/sections/reg.yaml',
  'REG-specific consequence of the adaptive order: property basis, cost recovery and capital gains (REG-III, weight 10%) are the last unit for every new learner, yet partnership, S corporation and C corporation lessons (scheduled first) depend on them.',
  'scripts/planner.ts: REG unit order ends with reg-u3 (REG-III); grep of reg-c-corp-income lesson: "net capital loss", "Cost recovery for 2025: §179 … bonus depreciation"; reg-partnerships: "outside basis = cash + basis of property − liabilities relieved", "§1231 items, §179 expense".',
  'src/lib/studyState.ts unitPriority',
  'Pin reg-u3 (and reg-u4) before reg-u6/reg-u7 via prerequisites, as in the previous finding.',
  'high', module='')

# ---------- Mock exams ----------
f('S2', 'coverage', 'ALL', 'far-mock-1,far-mock-2,far-mock-3,aud-mock-1,aud-mock-2,aud-mock-3,reg-mock-1,reg-mock-2,reg-mock-3,tcp-mock-1,tcp-mock-2,tcp-mock-3', 'content/*/exams/*.json',
  'Every mock form tests far less Analysis than the Blueprint: the exam-pool MCQs are almost all Remembering/Application, so a form\'s score-weighted skill mix misses the Analysis range in all four sections. The validator only checks the pooled practice+exam+TBS mix, so it passes.',
  'scripts/forms.ts, score-weighted (MCQ share × 50% + TBS share × 50%) Remembering/Application/Analysis/Evaluation: FAR forms 6/78/16/0, 9/78/13/0, 10/80/10/0 vs Blueprint R 5–15, Ap 45–55, An 35–45; REG 16/84/0/0, 19/74/6/0, 15/78/6/0 vs R 25–35, Ap 35–45, An 25–35; TCP 10/90/0/0, 10/75/14/0, 14/86/0/0 vs R 5–15, Ap 55–65, An 25–35; AUD 23/54/16/8, 26/45/8/21, 23/47/8/22 vs R 30–40, Ap 30–40, An 15–25, Ev 5–15. Exam-pool MCQ Analysis share: FAR 8.7%, AUD 1.3%, REG 0%, TCP 0% (practice pools 41%, 22%, 40%, 31%).',
  'content/sections/*.yaml skillAllocation; src/content/build.ts skill-mix warning (pooled)',
  'Write analysis-level exam MCQs (multi-step computations, interpreting exhibits) so each form\'s weighted mix lands in range — e.g. FAR ≈ 15 of 50 MCQs at Analysis plus 3 Analysis TBS; REG/TCP ≈ 15–20 Analysis MCQs per form; AUD ≈ 10. Add a per-form validator check (score-weighted, ±5 points) next to the per-area check in tests/mockForms.test.ts.',
  'high')
f('S2', 'pedagogy', 'ALL', 'far-mock-1,far-mock-2,far-mock-3,aud-mock-1,aud-mock-2,aud-mock-3,reg-mock-1,reg-mock-2,reg-mock-3,tcp-mock-1,tcp-mock-2,tcp-mock-3', 'content/*/exam-questions/*.json',
  'Mock MCQs are much easier than the practice bank (by the content\'s own difficulty tags), and the forms are static. The real exam\'s second MCQ testlet is medium or difficult depending on performance on the first. Scored with the 65% → 75 rule of thumb, the mocks overstate readiness, and readiness blends the latest mock 50/50.',
  'scripts/stats.ts / forms.ts — difficulty 1/2/3 in exam pools: FAR 22/72/10 (10% hard), AUD 77/75/4 (3%), REG 52/96/0 (0%), TCP 33/77/26 (19%); practice pools are 45%, 32%, 40%, 44% hard. Per form: reg-mock-1/2/3 have 0 hard MCQs; aud-mock-2 has 1 of 78; far-mock-3 has 3 of 50.',
  'AICPA, CPA Exam scoring (multistage testing: testlet 1 medium, testlet 2 medium or difficult); src/lib/analytics.ts approxScaledScore',
  'Rebalance each form to a realistic mix (e.g. testlet 1 ≈ 25/50/25 easy/medium/hard, testlet 2 ≈ 10/45/45) and/or make testlet 2 adaptive (pick a harder testlet when testlet-1 ≥ 60%). Until then, show the form\'s difficulty mix on the results page and weight raw items by difficulty before the scaled-score mapping, or raise the pass anchor for these forms.',
  'medium')
f('S2', 'pedagogy', 'ALL', 'far-mock-2,far-mock-3,aud-mock-2,aud-mock-3,reg-mock-2,reg-mock-3,tcp-mock-2,tcp-mock-3', 'content/*/exams/*.json',
  'Forms 2 and 3 each reuse half of form 1\'s MCQs, but nothing tells the learner, and the results page says mock items stay out of review "so later mocks stay fresh". After reviewing form 1\'s explanations, a learner\'s form-2 score is inflated, and readiness uses the latest mock.',
  'scripts/forms.ts: shared with form 1 — FAR 25/50 on each later form, AUD 39/78, REG 36/72, TCP 34/68. Illustration: true accuracy 65% on new items and 90% on reviewed items → form-2 MCQ 77.5% instead of 65%; with TBS at 65% the weighted score rises 65% → 71% and approxScaledScore 75 → 78; readiness (50% mock blend) moves ~+3 points from recognition alone.',
  'src/pages/ExamPlayer.tsx ExamResults ("kept out of spaced review so later mocks stay fresh"); src/lib/studyState.ts lastMock blend',
  'Either build forms 2–3 from fresh items (≈50 more FAR exam MCQs, 78 AUD, 72 REG, 68 TCP), or mark reused items, report a "fresh items only" score next to the total, and blend only fresh-item performance into readiness. On ExamHome, say which forms overlap and recommend taking form 1 last if only one is used for readiness.',
  'high')
f('S2', 'pedagogy', 'ALL', 'reg-mock-1,reg-mock-2,reg-mock-3,tcp-mock-1,tcp-mock-2,tcp-mock-3,aud-mock-1,aud-mock-2,aud-mock-3', 'content/*/tbs/*-tbs-x*.json',
  'The simulations on each form are budgeted (their own `minutes`) for more time than the 4-hour clock leaves after the MCQs at the app\'s 90-second pace, so the pacing targets on the results page add up to more than 240 minutes and a candidate who follows them runs out of time.',
  'scripts/forms.ts: suggested TBS minutes vs time left after MCQs at 90 s — REG 195/200/180 vs 132 (72 MCQs = 108 min; total 303–308 min); TCP 190/180/180 vs 138; AUD 150/150/145 vs 123; FAR 180/160/170 vs 165. Real-exam arithmetic for REG: 132 min ÷ 8 TBS ≈ 16.5 min per TBS.',
  'src/lib/pacing.ts MCQ_TARGET_MS; src/pages/ExamPlayer.tsx pacing targets',
  'Calibrate exam-pool TBS `minutes` so each form fits (e.g. REG ≈ 16 min, TCP/AUD ≈ 18–20, FAR ≈ 23), trimming parts where a TBS is genuinely longer than a real one; compute the results-page targets as the clock share actually available (remaining time ÷ TBS count) and add a validator check that MCQ×1.5 + Σ TBS minutes ≤ durationMinutes.',
  'medium')

def write():
    with open(OUT, 'w') as fh:
        for x in F: fh.write(json.dumps(x, ensure_ascii=False) + '\n')
    print('wrote', len(F), 'findings')
