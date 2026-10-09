## 2. Content correctness

### Authoritative sources and currency

The exam is the **2026 CPA Exam** (Core: FAR, AUD, REG; Discipline: TCP). Check against:

- **The AICPA 2026 Uniform CPA Examination Blueprints.** Use them for coverage, the content area weights, and the skill levels expected per task.
- **FAR:** the FASB ASC, including ASUs effective for the testing window. The AICPA's eligibility rule is that new pronouncements are tested starting 6 months after their effective date, or 6 months after their issuance date if early application is permitted. Also check GASB statements for government, and NFP standards under ASU 2016-14.
- **AUD:** AICPA SAS (the AU-C sections, including recently effective ones), SSARS, SSAEs, SQMS 1 and 2 and the Code of Professional Conduct. Also check PCAOB standards, including recent amendments and the effective date of QC 1000, SEC and SOX independence rules, GAGAS (the Yellow Book) and the Uniform Guidance (including the 2024 revisions, such as the $1,000,000 single audit threshold).
- **REG and TCP:** the Internal Revenue Code as amended through the law the Blueprint tests, including the 2025 reconciliation act (OBBBA) changes. Inflation-adjusted amounts must match the stated tax year. Also check Circular 230, and the business law topics the REG Blueprint lists.

For each item, determine which tax year or standard version it assumes. Then check that it is internally consistent: stem, key, distractors, explanation and lesson must all agree. Check that the lesson's `taxYear` frontmatter matches. Finally, check that the assumed year is what the 2026 exam tests.

Where your own knowledge may be out of date, verify with web search against primary sources: IRS revenue procedures, FASB and PCAOB sites, and AICPA publications. Cite the source in the finding. If you can't verify something, mark it `needs-verification` and don't guess.

### Per-MCQ checks (every item)

1. **The key is correct**, and it is the single best answer. No other option is also defensible.
2. **Every distractor is definitely wrong** for the reason its explanation gives. Its `trap` label matches the misconception it models.
3. **The stem is complete and unambiguous.** It gives every fact needed (dates, tax year, entity type, filing status, elections, the materiality basis), with nothing missing and no contradictions. It also asks clearly what's wanted ("deductible", "taxable", "recognized" and "realized" are not interchangeable).
4. **The explanations teach.** The item-level explanation and the correct-choice explanation state the rule and show the computation. Explanations aren't circular ("Correct. This is correct.") or truncated.
5. **The labels are accurate:**
   - `skill`: remembering, application, analysis or evaluation, judged by the Blueprint's definitions.
   - `difficulty`: 1–3.
   - `calc`: set only for items that need a computation.
   - `optional` scope.
   - Mislabeled skill levels matter, because the Blueprint skill-mix targets depend on them.
6. **There are no answer cues.** Watch for:
   - the key being the longest or shortest option, or the only one with qualifiers
   - grammatical mismatches between the stem and an option
   - absolutes in the distractors only
   - "all of the above"
   - options that overlap or contain each other
   - a key that repeats words from the stem
   - one item revealing the answer to another
7. **Duplicates.** Look for near-duplicate stems within and across modules, and for the same fact tested in the same way more than about 3 times. Flag redundancy, and flag pairs that contradict each other.
8. **Realism.** The item looks like what the exam actually asks: CPA-level phrasing, plausible numbers, no trivia outside the Blueprint.

### Per-TBS checks (every simulation)

- Recompute every numeric answer and confirm the tolerances are sensible.
- Confirm that journal entries balance, and that the account names and amounts are correct.
- Confirm that dropdown options include one correct answer and plausible wrong ones.
- For document-review parts, check that each flagged and unflagged row is correct.
- For research parts, check that the citation (an ASC paragraph, AU-C section or IRC section) is correct, current, and the best answer.
- Check that the exhibits contain every fact needed, with no stray contradictions.
- Check the scoring model: partial credit is fair, and a perfect response scores 100%.
- Check that the skill level is accurate and that the time estimate is realistic.

### Lessons, flashcards, glossary and review docs (every one)

- **Technical accuracy.** Check every rule, threshold, example and worked computation, recomputing as you go.
- **Currency.** Check the tax year, the standards in effect, and any "new for 2026" notes.
- **Citations.** Confirm that each citation points to the right authority.
- **Flashcards.** Each front-and-back pair is correct, atomic and unambiguous.
- **Glossary.** Definitions are correct and consistent with how the lessons use each term.
- **Consistency.** No two places in the platform state the same rule differently. Search for each key threshold and rate across all content, and list the conflicts. Examples include the 2025 SALT cap, the §179 limits, the gift exclusion, materiality benchmarks and the lease classification criteria.

### Coverage against the Blueprint

Map every Blueprint task statement (area → group → topic → task) to the lessons, MCQs and TBS that cover it, and produce `review/blueprint-coverage.csv`. Flag:
- tasks with no lesson or no items
- tasks covered only at the wrong skill level
- content that falls outside the Blueprint but isn't marked `optional`
- areas whose share of items is far from the Blueprint weight ranges

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

## 4. Usability (use the real app)

Build the app and run it: `npm run build`, then `npx vite preview`. Drive it with Playwright, using Chromium at `/opt/pw-browsers` if present. Use both a desktop viewport and a phone viewport (about 390×844). Take screenshots to `review/screens/` for every finding.

Walk these journeys end to end, and record any friction, bugs or console errors:

1. A first visit, onboarding, choosing sections and the exam date, and the first dashboard.
2. Opening the course, reading a full lesson (including inline questions, highlights and notes), and marking it complete.
3. Practicing a module, a mixed set and a review queue session. Include right and wrong answers, confidence ratings, flagging and explanations.
4. Flashcard sessions.
5. A full TBS of each part kind: numeric, dropdown, journal, docreview, research and review. Check the scoring display.
6. A full mock exam. Check timing, navigation between testlets, the flag-for-review tool, the calculator and other exam tools, submission, scoring and review.
7. The study planner, analytics, search, glossary, notes, settings, and data export and import.
8. Behavior when offline or installed as a PWA, reload in the middle of a session, and the update prompt.
9. Accessibility: keyboard-only navigation, focus order, screen reader labels and live regions, color contrast in light and dark mode, reduced motion and font scaling. Run an automated check such as axe-core, plus a manual keyboard pass.
10. Performance: first load and section load on a throttled connection (Fast 3G profile), and responsiveness during long sessions.

For each issue, record what you expected and what you saw, the steps to reproduce, a screenshot, and the affected file or component if you can find it.
