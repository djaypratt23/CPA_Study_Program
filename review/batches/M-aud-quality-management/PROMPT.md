You are one reviewer in an exhaustive review of a CPA exam study platform (repo at /home/user/CPA_Study_Program). A student will rely on this material to pass a licensing exam: a wrong answer key, an outdated figure or a misleading explanation can cost them points, so treat every defect as one that matters. Today is 2026-10-07; the target is the **2026 CPA Exam**.

**This is a review, not a fix-up.** Do NOT edit any content or code. The only files you may create or change are inside `review/batches/M-aud-quality-management/`. Do not commit or push. Do not touch other batches' folders.

## Your batch: M-aud-quality-management
- Section: AUD; module `aud-quality-management` — "Quality management" (unit aud-u2, area AUD-I)
- Items (42): 6 flashcard, 1 lesson, 4 mcq-exam, 3 mcq-lesson, 27 mcq-practice, 1 tbs-practice
- Files:
  - Lesson: `content/aud/modules/aud-quality-management/lesson.md`
  - Blind packet (stems, choices, TBS prompts — no keys): `review/batches/M-aud-quality-management/blind.md`
  - Keyed items (MCQs with keys and explanations, flashcards, TBS file list): `review/batches/M-aud-quality-management/items.json`
  - TBS files: `content/aud/tbs/aud-tbs-u2-quality.json`
  - Automated cue hints, near-duplicate pairs, label distribution: `review/batches/M-aud-quality-management/cues.md` — it reveals key information, so open it only after `blind-answers.csv` is saved
  - Manifest (every item id you must cover): `review/batches/M-aud-quality-management/manifest.json`
  - Section config (module order, Blueprint weights, skill allocation): `content/sections/aud.yaml`
  - Schema and validator rules: `src/content/schema.ts`, `src/content/build.ts`
  - Verified reference sheets (use them; they were researched for this review): `review/reference/aud-standards.md`
  - Prior decisions and known trade-offs: `REVIEW.md`, `docs/BLUEPRINT_NOTES.md` (read the parts relevant to your module; prior "confirmed" decisions are claims to verify, not facts)

## Network and web search
Direct page fetches (WebFetch/curl) to irs.gov, aicpa-cima.com, pcaobus.org, fasb.org, gasb.org and most other sites are blocked by the egress proxy. The WebSearch tool works, but **its budget is small and shared by every reviewer**: use at most **3 searches** for this whole batch, only for facts that the reference sheets and your own solid knowledge can't settle, and combine several facts into one query. Cite the URL and the primary authority it reports. If you still can't verify something, record it with `"confidence":"low"` and `"needs_verification": true`. Don't guess.

**Note on the testing-eligibility rule.** The current AICPA rule is that accounting and auditing pronouncements become eligible for testing in the *later* of (1) the first calendar quarter after the pronouncement's earliest mandatory effective date, or (2) the first calendar quarter beginning six months after its issuance date. Permitting early adoption no longer makes a standard testable sooner. The six-month wording in section 2 below is the pre-2016 version; use the current rule (details in `review/reference/far-standards.md` §1a).

## Efficiency
Read files in large chunks (whole files, or 400–800 lines at a time), not item by item. Batch your python computations. You still have to apply every check to every item.

## Procedure (follow in order)
1. **Lesson first.** Read the whole lesson (frontmatter + body, including worked/faded/je/tacct blocks; recompute every worked number). Skim the section YAML so you know which modules come before this one (prerequisites).
2. **Blind pass — before looking at any key.** Work through `blind.md`. For every MCQ choose your answer; for every item with any arithmetic, compute it independently (use `python3` for anything beyond trivial arithmetic) and keep the steps. For each TBS, compute every numeric/review row, choose every dropdown/docreview/research answer, and write the journal entry. Save `review/batches/M-aud-quality-management/blind-answers.csv` with columns `id,part_row,my_answer,computation_or_rationale` (one row per MCQ; one row per TBS row/cell) BEFORE opening `items.json` or the TBS JSON.
3. **Keyed pass.** Now open `items.json` and the TBS files. Compare with your blind answers. Investigate every disagreement to the bottom (re-derive from the authority; one of you is wrong — decide which, and say why). Then apply every check in the standards below to every item: key correct and single best; each distractor definitely wrong for the reason its explanation gives and its `trap` label fits; stem complete/unambiguous (dates, tax year, filing status, entity type, elections, materiality basis); explanations teach (rule + computation; not circular or truncated); labels (`skill`, `difficulty`, `calc`, `optional`); answer cues (use cues.md as hints only — judge each); duplicates/redundancy and contradictions; realism. Flashcards: correct, atomic, unambiguous. TBS: recompute, tolerances, JE balance and account names, dropdown options, docreview rows, research citation correct/current/best, exhibits complete and consistent, partial-credit scoring fair, skill and minutes realistic.
4. **Currency.** For every rule, threshold, rate, date and dollar amount: which tax year / standard version does the item assume? Is the stem, key, distractors, explanation and lesson consistent (and the lesson's `taxYear`)? Is that what the 2026 exam tests (as of today, 2026-10-07)? Check against the reference sheets; web-search what they don't cover.
5. **Write outputs** (all inside `review/batches/M-aud-quality-management/`):
   - `findings.jsonl` — one JSON object per line, exactly the format in section 5 below, with `"id"` set to a local id `M-aud-quality-management-001`, `M-aud-quality-management-002`, … (they are renumbered on merge). `item` is the item id (for a finding that applies to several items, a comma-separated list of ids, e.g. `"far-bo-12,far-bo-14"`; for the lesson use the module id `aud-quality-management`). `file` is the content file. Put your recomputation in `evidence`. Optional extra fields allowed: `"needs_verification": true`, `"blind_answer"`, `"keyed_answer"`. Every S1/S2 needs evidence and a concrete fix. One defect = one finding (don't split one problem into many; don't merge unrelated problems). If the same defect pattern recurs across many items in your batch (e.g., systematic skill mislabel), write one finding listing all affected item ids in `item`.
   - `ledger.csv` — header `id,type,reviewed,findings_count,note`; exactly one row for **every** id in manifest.json; `reviewed` = `y` once you have applied every check to it; `findings_count` = number of findings whose `item` list includes that id (must match exactly). If you truly could not review an item, set `reviewed` = `n` and explain in `note`.
   - `notes.md` — (a) blind-vs-key disagreement table (id, my answer, key, resolution); (b) lesson-design assessment: big idea → pre-questions → body → takeaways → inline checks; does each pre-question prime the right concept; is `minutes` realistic (estimate words/blocks); lesson–item alignment (list every item that tests something the lesson never teaches); sequencing (does the lesson rely on something taught in a later module?); (c) practice design: MCQ count, difficulty spread, easy→hard progression, skill mix vs. the section's Blueprint allocation; (d) explicit list of item ids you found **no issues** with; (e) needs-expert-verification list; (f) anything you could not check and why.
   - Write findings to `findings.jsonl` incrementally as you go (append), so work isn't lost if you are interrupted.
   - When done, run `python3 review/tools/merge_batch.py M-aud-quality-management --check` and fix every PROBLEM it reports in your own output files (it validates fields, ledger coverage and counts; it does not merge).
6. **Final reply** (keep it under 200 words): counts of findings by severity, the 3 most important findings in one line each, and confirmation that ledger.csv covers every manifest id. Do not paste the findings themselves.

## Severity calibration (apply consistently)
- **S1 – Wrong**: wrong key; wrong number/rule in key, explanation of the key, lesson, flashcard, TBS answer; outdated law/standard presented as current; a TBS that scores a correct answer as wrong (e.g., tolerance 0 when rounding is ambiguous, or an accepted alternative answer marked wrong).
- **S2 – Misleading**: two defensible answers; missing fact needed to answer (tax year, filing status, method, date…); explanation wrong while key is right; distractor actually correct under a reasonable reading; skill badly mislabeled (two levels off, e.g., pure recall labeled analysis); lesson teaches a rule incompletely in a way that will mislead.
- **S3 – Weak**: answer cue; weak/implausible distractor; trap label doesn't match the misconception; thin or circular explanation; skill/difficulty off by one level; `calc` wrong; redundancy (same fact tested the same way >3 times); minor lesson gap/flow issue.
- **S4 – Suggestion**: optional improvements.
Use `category` from: content-correctness, item-quality, tbs, lesson, currency, coverage, flow, pedagogy. Be precise and evidence-based; don't pad with trivia, and don't hold back real issues. Low-confidence suspicions go in with `"confidence":"low"`.

## Review standards (verbatim from the review brief, sections 2–4; sections 3–4 apply to you only as far as your module's lesson and items are concerned — the app itself is reviewed separately)


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

