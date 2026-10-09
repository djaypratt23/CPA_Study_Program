You are one reviewer in an exhaustive review of a CPA exam study platform (repo at /home/user/CPA_Study_Program). A student will rely on this material to pass a licensing exam, so treat every defect as one that matters. Today is 2026-10-07; the target is the **2026 CPA Exam**.

**This is a review, not a fix-up.** Do NOT edit content or code. Only create/change files inside `review/batches/G-REG/`. Do not commit or push.

## Your batch: G-REG — the REG final-review docs and glossary
- Final-review docs (4): `content/reg/review/reg-exam-day.md`, `content/reg/review/reg-formulas.md`, `content/reg/review/reg-mnemonics.md`, `content/reg/review/reg-numbers.md`
- Glossary: `content/glossary/reg.json` (33 entries; ledger ids are `gloss:REG:<term>`)
- Manifest of every id you must cover: `review/batches/G-REG/manifest.json`
- The lessons you check consistency against: `content/reg/modules/*/lesson.md` (and flashcards/questions as needed); section config `content/sections/reg.yaml`
- Verified reference sheets: `review/reference/tax-2025.md`, `review/reference/blueprint-notes.md` (if present)
- Prior decisions: `REVIEW.md`, `docs/BLUEPRINT_NOTES.md`

## Network
Direct page fetches are blocked by the egress proxy; the WebSearch tool works (mode "standard"). Cite URL + primary authority. If you can't verify, use `"confidence":"low"`, `"needs_verification": true`.

## What to do
1. Read every review doc in full. Check every rule, threshold, rate, formula, mnemonic and worked number (recompute with `python3`), its currency for the 2026 exam, and that it states the rule the same way the lessons do (grep the lessons for each key threshold/rate; list conflicts). Judge (high level) whether the docs cover the section's high-yield topics, and flag important gaps.
2. Read every glossary entry: definition correct, current, and consistent with how the lessons use the term (grep the term in the lessons); `moduleId` (if any) points to the right module.
3. Outputs inside `review/batches/G-REG/`: `findings.jsonl` (format below; local ids `G-REG-001`…; `item` = the doc id (file name without .md) or `gloss:REG:<term>`, comma-separated for several; `module` = the related module id or ""), `ledger.csv` (header `id,type,reviewed,findings_count,note`; one row per manifest id; `findings_count` must equal the number of findings whose `item` list includes the id), and `notes.md` (coverage assessment of the docs, consistency conflicts table, no-issue list, needs-verification list, anything not checked). Append findings as you go. When done, run `python3 review/tools/merge_batch.py G-REG --check` and fix every PROBLEM it reports.
4. Final reply under 200 words: counts by severity, top 3 findings, confirmation that the ledger covers every manifest id.

## Severity calibration (apply consistently)
- **S1 – Wrong**: wrong key; wrong number/rule in key, explanation of the key, lesson, flashcard, TBS answer; outdated law/standard presented as current; a TBS that scores a correct answer as wrong (e.g., tolerance 0 when rounding is ambiguous, or an accepted alternative answer marked wrong).
- **S2 – Misleading**: two defensible answers; missing fact needed to answer (tax year, filing status, method, date…); explanation wrong while key is right; distractor actually correct under a reasonable reading; skill badly mislabeled (two levels off, e.g., pure recall labeled analysis); lesson teaches a rule incompletely in a way that will mislead.
- **S3 – Weak**: answer cue; weak/implausible distractor; trap label doesn't match the misconception; thin or circular explanation; skill/difficulty off by one level; `calc` wrong; redundancy (same fact tested the same way >3 times); minor lesson gap/flow issue.
- **S4 – Suggestion**: optional improvements.
Use `category` from: content-correctness, item-quality, tbs, lesson, currency, coverage, flow, pedagogy. Be precise and evidence-based; don't pad with trivia, and don't hold back real issues. Low-confidence suspicions go in with `"confidence":"low"`.

## Review standards (verbatim from the review brief, sections 2–4; apply what concerns review docs and the glossary)

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

