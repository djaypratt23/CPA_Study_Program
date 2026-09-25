# EVALUATION: CPA Study Program (AUD, FAR, REG, TCP)

- **Evaluated on:** 2026-09-23.
- **Commit:** `d5f0596` on `claude/cpa-platform-evaluation-0fch8b`, the same tree as `main` at the time.
- **Scope:** read-only. No application code was changed, and nothing was committed or pushed.
- **Scratch work:** under `eval-scratch/`. See [Appendix A](#appendix-a--how-to-rerun-the-scratch-work).

**Evidence labels**
- **Verified:** reproduced by a script or test in `eval-scratch/`, or confirmed arithmetically from the item's own data.
- **Inferred:** from reading the code or content, or from subject-matter knowledge.
- **BLOCKED:** could not be done because the required source could not be reached.

> **Sources.**
> - **Blueprints (Verified).** You supplied the four AICPA *Uniform CPA Examination Blueprints* PDFs (AUD, FAR, REG, TCP) on 2026-09-25. They were approved by the Board of Examiners on **Aug. 18, 2025**, with an **effective date of January 2026**. They are the primary source for §3.1–3.5. Their text and extracted structure are kept outside the repo, and only derived counts and abbreviated task labels appear here.
> - **Still unreachable.** Every other primary source stayed egress-blocked (`EGRESS_BLOCKED` or HTTP 403). That covers aicpa-cima.com (the exam-format and testing-policy pages), irs.gov, asc.fasb.org, fasb.org, gasb.org, pcaobus.org, sec.gov, ecfr.gov, congress.gov, uscode.house.gov and law.cornell.edu. I retried across about five hours on 2026-09-23 and again on 2026-09-24.
> - **Consequences:**
>   - The **exam format** (MCQ and TBS counts, testlets, time, score weighting) and the **testing-eligibility policies** are still unverified. The Blueprints don't state them.
>   - All **authority** checks in the accuracy audit remain **Inferred**, from the reviewers' subject knowledge. **Arithmetic** checks are Verified by script.
>   - [Appendix B](#appendix-b--what-to-confirm-once-primary-sources-are-reachable) lists what is left to confirm.

---

## 1. Executive summary

### Scorecard

| Dimension | Grade | One-line basis |
|---|---|---|
| **Technical** | **B−** | Clean, content-as-data design with pure, well-tested scoring. But backup import can wipe or brick all local data, TBS scoring has two exploitable or unfair rules (journal-entry hedging, `%` input), and the exam clock is tick-based and can be paused indefinitely. |
| **Content** | **D+** | Sampled answer keys are mostly right (0–3% Critical/High in FAR/AUD/REG samples; TCP 10% because of TBS issues). But against the official 2026 Blueprints:<br>• **Tasks:** only **64% of representative tasks** are covered at their skill level, and only **31% of analysis and evaluation tasks**.<br>• **REG scope:** REG is built on the pre-2026 scope; 28% of its MCQs are TCP or unreferenced material, and it lacks MACRS and SALT.<br>• **Missing topics:** 7 Blueprint topics are Missing.<br>• **Answer keys:** **6 Critical wrong keys** exist across the bank, 2 of them in mock exams.<br>• **Answer cues:** the **AUD MCQ bank is compromised by answer-length cues**; always picking the longest choice scores **82.7%** on the AUD mock.<br>• **Depth:** every module is thin, at 10–12 practice MCQs. |
| **Study efficiency** | **C** | The learning-science design is excellent on paper: retrieval first, FSRS, interleaving, confidence ratings, per-choice explanations, a planner working back from the exam date. But the signals that drive it are inflated: cue-answerable items, readiness that ignores TBS (50% of the score) and counts repeats, and one reusable mock per section. About 11% of practice (28% in REG) goes to off-Blueprint topics, and REG and TCP drill inflation-indexed figures the Blueprint says aren't tested. There is no adaptive diagnostic, no weakness- or blueprint-weighted routing, and no mastery gate. |
| **Completeness** | **D** | About 200–380 practice MCQs and 14–24 practice TBS per section, against roughly 1,500 MCQs and 80+ TBS per section at commercial reviews. One mock per section. About 6–11 hours of lesson reading and 21–38 planned hours per section, against the 70–120 hours per section commonly recommended. No spreadsheet, literature or highlight tools in the exam; no sync; no content-QA analytics. |

### Verdict

This is a thoughtfully engineered, learning-science-literate study app with a solid core. Content is pure data validated by Zod, and the scoring, readiness and FSRS math check out on the normal path. Lint, types, tests and the build are all green. It is **not yet a substitute for a commercial review, and it should not be trusted as a readiness signal in its current form.**

Four problems dominate:
1. **Answer keys.** Six wrong answer keys, two of them on simulated exams, would teach wrong rules or mark correct work wrong.
2. **Blueprint alignment.** The Area and skill allocations match the 2026 Blueprints exactly. But the content doesn't:
   - **The skill that matters most is untrained.** Two-thirds of analysis and evaluation tasks have no practice at level. These are mainly reviewing statements, schedules and returns against source data and resolving discrepancies.
   - **REG covers the wrong material.** It teaches TCP topics while missing its own cost-recovery and SALT tasks.
   - **Topics are missing.** Single audits, data preparation, international tax and state boards are absent.
3. **Exam realism.** The AUD MCQ bank can largely be answered without subject knowledge (by choosing the longest choice). There is a single, reusable mock form per section, and its missed items are fed back into practice. The REG mock is 25% off-Blueprint.
4. **Data safety.** All progress lives only in the browser's IndexedDB. A one-click backup import with no confirmation, together with the lack of an error boundary, can erase or brick it.

The platform's architecture makes all of these fixable without re-engineering. The largest costs are content: re-scoping REG and TCP, writing analysis-level source-data simulations, and bringing each section's bank to roughly 4–5× its current size with more simulated exam forms.

### Key numbers (Verified unless noted)

| | FAR | AUD | REG | TCP |
|---|---|---|---|---|
| Modules (lessons) | 37 | 32 | 25 | 19 |
| Practice / lesson / exam-pool MCQs | 384 / 111 / 50 | 323 / 96 / 78 | 251 / 75 / 72 | 196 / 57 / 68 |
| Practice / exam TBS | 24 / 7 | 20 / 7 | 14 / 8 | 14 / 7 |
| Flashcards | 254 | 194 | 152 | 134 |
| Mock exam forms | 1 | 1 | 1 | 1 |
| "Pick the longest choice" score on the mock's MCQs | 32.0% | **82.7%** | 50.9% | 53.8% |
| Sample Critical/High error rate (MCQ+TBS) | 0/28 (0%) | 0/29 (0%) | 1/30 (3.3%) | 3/29 (10.3%) |
| Critical wrong keys found bank-wide | 2 | 0 (1 corrupted stem, High) | 2 | 2 |
| Planner-scheduled new-learning hours | 38.2 h | 32.1 h | 25.4 h | 20.7 h |
| Blueprint tasks covered at skill level (Inferred mapping) | 84/113 (74%) | 95/147 (65%) | 68/105 (65%) | 50/98 (51%) |
| Analysis + evaluation tasks covered at level | 7/19 | 14/23 | **0/14** | 1/14 |
| MCQs with no Blueprint topic in the section | 38 (9%) | 1 | **91 (28%)** | 23 (9%) |
| Area and skill allocations vs Blueprint | identical | identical | identical | identical |

---

## 2. Technical findings

### 2.1 Architecture summary (Phase 0)

The app is a static single-page PWA with no backend and no authentication. It is built with React 19, TypeScript and Vite 8, styled with Tailwind v4, and uses `vite-plugin-pwa` for offline use and `HashRouter` for routing. It deploys to Cloudflare Pages, with a GitHub Pages mirror, from `.github/workflows/ci.yml`.

**Content** lives only in data files under `content/`:
- **Section blueprints:** `sections/<sec>.yaml` holds the exam format, weights, skill targets, and Areas → Units → modules.
- **Per module:** `lesson.md` (YAML frontmatter plus Markdown with structured fenced blocks), `questions.json` and `flashcards.json`.
- **Section-level:** `tbs/*.json`, `exam-questions/*.json`, `exams/*.json` (mock forms), `review/*.md` and `glossary/*.json`.

`src/content/index.ts` loads every file eagerly at build time with `import.meta.glob(..., {eager:true, query:'?raw'})`. It then runs `buildContent` (`src/content/build.ts`): Zod schemas (`src/content/schema.ts`), cross-references and coverage rules. The same function is the CI gate, `npm run validate`. The whole corpus is inlined into the main JS chunk: 4.35 MB minified and 0.96 MB gzipped, of which content is 79%.

**The engine** is a set of pure functions in `src/lib`:
- `quiz.ts`: set building and interleaving.
- `tbsScoring.ts`: cell-level partial credit.
- `examScoring.ts`: MCQ/TBS weighting and an approximate scaled score.
- `analytics.ts`: readiness.
- `mastery.ts`, `srs.ts` (ts-fsrs), `cardQueue.ts` and `planner.ts`.
- `studyState.ts`: derives the dashboard.

**Persistence** is Dexie/IndexedDB, with 10 tables: settings, attempts, srs, errors, itemMeta, moduleProgress, highlights, and quiz, TBS and exam sessions (`src/db`). All derived state (plan, mastery, readiness) is recomputed from raw attempts on every change via `useLiveQuery`. Backup is a manual JSON export and import.

### 2.2 Build, test, lint and type check (Phase 0) — Verified

| Command | Result |
|---|---|
| `npm ci` | OK. Node 22.22.2. |
| `npm run lint` | Pass, with 0 problems. |
| `npm run typecheck` | Pass. |
| `npm test` | **52/52 pass** across 7 files, in 1.5 s. |
| `npm run validate` | "Content OK". It reports 24 `needsReview` items. |
| `npm run build:app` | Pass. It warns that chunks exceed 500 kB. |
| `npm audit` | **5 high.** All come from `lodash-es` ≤4.17.23 via chevrotain via mermaid 12, and the same 5 appear with `--omit=dev`. See T-L8: the vulnerable paths are not reachable in the shipped app. |

Nothing failed. Logs are in `eval-scratch/logs/`.

### 2.3 Architecture and data model: is content separated from the engine?

**Yes, and this is the strongest part of the codebase.** New questions, modules, TBS, flashcards, glossary terms, review sheets, mock-exam forms, and blueprint areas, allocations or skill targets are all added as data with **no code change**. The validator enforces several rules:
- Every distractor must name a trap.
- Journal entries must balance.
- Dropdown answers must be among the options.
- "Full" sections must meet coverage minimums.

Limits (Inferred):

- **Code changes still required for some additions.** A new section ID needs code (it's an enum in `schema.ts:11`), and so do new TBS response types (multi-select, spreadsheet, written response) and new MCQ shapes (more or fewer than 4 choices, "select all").
- **Targets are never enforced.** Blueprint allocation ranges and skill targets live in YAML, but no check compares the content's actual Area or skill distribution against them (§3.3–3.4). Modules are also not mapped to Blueprint Groups or Topics, which is how REG drifted onto the pre-2026 scope unnoticed (§3.2).
- **Validator gaps** (engine track F15, Verified in `eval-scratch/engine/contentBuild.test.ts`). The validator does **not** catch:
  - duplicate TBS part or row IDs (which make 100% impossible);
  - a `{0,0}` exam weighting (which gives NaN scores);
  - allocation min > max;
  - a break index past the last testlet;
  - duplicate exam-form IDs;
  - the same item twice in a testlet;
  - the implicit `tolerance: 1` on non-integer answers.

  None of these is present in today's content (Verified).
- **No lint for answer cues.** There is no validator rule for answer-letter balance or choice-length cues, which is how the §3.6 problem got in.

### 2.4 Findings sorted by severity

"Engine" findings come from `eval-scratch/engine/*.test.ts`, "UI" findings from the Playwright scripts in `eval-scratch/ui/`, and "Main" from the lead reviewer.

#### Critical

| ID | V/I | Finding | Location | Evidence / repro | Fix |
|---|---|---|---|---|---|
| **T-C1** | Verified | **Backup import can silently erase or brick all progress.** Import replaces every table in one step, with no confirmation, no schema or version validation, and no automatic pre-import export. A partial or older backup clears the tables it doesn't contain. `{"app":"cpa-study-program","tables":{}}` wipes everything. A backup with `activeSection:"XYZ"` or `examDates:null` produces a **permanent blank screen** on `/`, `/review`, `/analytics` and `/settings`, because there is no error boundary and `getSection(...)!` is non-null-asserted. The only recovery is clearing site data, which loses everything. All data exists only on this device. | `src/db/index.ts:93-104`; `src/pages/SettingsPage.tsx:27-34, 143`; `src/pages/Dashboard.tsx:25`, `Analytics.tsx:17`; no `ErrorBoundary` anywhere in `src/` | `eval-scratch/engine/srsDb.test.ts` ("backup import" block); `eval-scratch/ui/errors.mjs` with screenshots `ui/shots/err-backup-*.png` | Zod-validate the backup and check `version`. Show a confirmation with row counts. Export the current data automatically first. Decide explicitly how missing tables are handled. Add a root error boundary with Export and Reset. Guard `getSection`. |

#### High

| ID | V/I | Finding | Location | Evidence / repro | Fix |
|---|---|---|---|---|---|
| T-H1 | Verified | **Journal-entry hedging scores 100%.** Entering every expected account on *both* the debit and credit sides, or duplicating correct lines, earns full credit with no penalty cells. This inflates TBS and mock scores. | `src/lib/tbsScoring.ts:170` (`if (part.lines.some(e => e.account === l.account)) return`) | `eval-scratch/engine/tbsScoring.test.ts` "HEDGING EXPLOIT" | Penalize every unmatched non-blank line, or at most one penalty per account and side. |
| T-H2 | Verified | **A percent typed with "%" is marked wrong.** `parseAmount('2%')` returns `null`, and `0.25` fails against a key of `25`. This affects 15 real cells in 10 TBS, including the **mock-exam** TBS `aud-tbs-x3-risk`, `aud-tbs-x4-sampling` and `tcp-tbs-x3-entity-planning`. The UI hint says "Enter whole dollars". | `src/lib/tbsScoring.ts:41-56`; `src/components/TbsView.tsx:175` | `eval-scratch/engine/tbsScoring.test.ts` "percent-labelled numeric rows" | Strip a trailing `%`. Declare a unit per row (`$`, `%`, ratio) and show it next to the input. Accept U+2212 (−) and `$(1,000)`. |
| T-H3 | Verified | **Readiness ignores TBS, which are 50% of the exam score, and counts repeats.** The readiness estimate uses MCQ attempts only. Every repeat of the same item counts: 20 answers to one question make n=20. Mock-exam MCQs count both as attempts and through the 50% mock blend. The label "Likely ready" is triggered at ≥75% raw, while the mock's own mapping treats 65% raw as scaled 75, so the two scales are inconsistent. | `src/lib/studyState.ts:136`; `src/lib/analytics.ts:179, 195-211`; `src/lib/examScoring.ts` | Engine track, `scoringAnalytics.test.ts` (repeat counting); the TBS exclusion is from reading the code | Blend TBS performance by weighting. Use first-attempt or distinct-item accuracy. Exclude mock items from practice accuracy. Put readiness on a single scale. |
| T-H4 | Verified | **A new deploy force-reloads open tabs mid-task.** With `registerType:'autoUpdate'`, the service worker reloads the page about 5 s after a new version lands. Notes that save only on blur were lost (`""` after the reload). The reload also interrupts quizzes, flashcards and exams, though their state is persisted. | `vite.config.ts:46`; `src/main.tsx:7`; `ModulePage.tsx:229`, `McqView.tsx:108` | `eval-scratch/ui/swupdate.mjs` | Use `registerType:'prompt'` with a "reload" toast, never auto-reload on `/exam`, `/quiz` or `/tbs`, and save notes on a debounced change. |
| T-H5 | Inferred | **Local-only storage never asks to be persistent.** There is no `navigator.storage.persist()` call. Browsers may evict IndexedDB under storage pressure. Safari's 7-day cap on script-writable storage applies to sites not added to the home screen. There is no sync, so an eviction is permanent data loss. | grep of `src/` shows no `storage.persist` | Code search | Call `navigator.storage.persist()` at onboarding, show the persistence status in Settings, nudge regular exports, and consider an optional sync. |
| T-H6 | Verified | **The "Skip to content" link navigates to Home from every page.** `href="#main"` is interpreted by the HashRouter as a route, and the catch-all redirects to `/`. | `src/components/Layout.tsx:69` | `eval-scratch/ui/skiplink.mjs` | Use a button that focuses `<main tabIndex=-1>`. |
| T-H7 | Inferred | **iPhone users can't enter negative TBS amounts.** Inputs use `inputMode="decimal"`, and the iOS decimal keypad has no "−" or "(". Fourteen of 436 numeric TBS cells, and 6 faded-example steps, expect negatives. | `TbsView.tsx:167, 238, 248`; `LessonBlocks.tsx:75` | Content scan; keypad behaviour not tested on a device | Use `inputMode="text"` with a pattern, or add a ± toggle. |

#### Medium

| ID | V/I | Finding | Location | Evidence | Fix |
|---|---|---|---|---|---|
| T-M1 | Verified | **The exam clock is tick-based and can be paused indefinitely.** It decrements 1 s per `setInterval` and is saved every 5 s. "Pause & exit" stops it with no limit, and background-tab throttling or main-thread stalls slow it: an 8 s stall moved the clock only 2 s. This undermines pacing practice. | `src/pages/ExamPlayer.tsx:64-79, 119-121` | `eval-scratch/ui/exam.mjs` | Store `endsAt` and derive the remaining time from `Date.now()`. Allow only the scheduled break. Persist on `pagehide`. |
| T-M2 | Verified | **An exam answer is lost if you select and immediately navigate** (2/2 at 0 ms on desktop; 10 ms on mobile emulation). Patches rebuild the whole testlet array from a stale live-query snapshot, and two tabs overwrite each other's state and clock. | `ExamPlayer.tsx:86-89, 226-240`; `QuizPlayer.tsx:71-72`; `McqView.tsx:67` | `eval-scratch/ui/exam.mjs`, `hotkey-race.mjs` | Update key paths (`testlets.${i}.mcqAnswers.${id}`) or modify inside a transaction, and add a single-tab lock. |
| T-M3 | Verified | **The FSRS scheduler throws when the clock moves backwards** by a day boundary (`Invalid delta_t "-1"`). The attempt row is written first, so each retry adds an orphan attempt, and **the exam cannot be finished**. | `src/lib/srs.ts:49-51`; `src/db/actions.ts:43-44` | `eval-scratch/engine/srsDb.test.ts` "CLOCK SKEW" | Clamp `now` to be no earlier than `last_review`, and write the attempt and the SRS update in one transaction. |
| T-M4 | Verified at the DB layer | **Double submissions record attempts twice.** A double click, a resubmit after a crash in `finish()`, or a race with the timer's auto-finish can each do it. This inflates analytics and SRS reviews. | `QuizPlayer.tsx:65, 75-107, 170`; `ExamPlayer.tsx:44-61, 92-96`; `TbsPage.tsx:50-55` | `eval-scratch/engine/srsDb.test.ts` "not idempotent" | Add an in-flight guard, record the exam in one transaction, and give attempts an idempotency key of (sessionId, itemId). |
| T-M5 | Verified | **Test-mode scores divide by the number answered, and "Timed" sets never time out.** One correct answer out of 20, then submit, shows 100% ("1 of 1 correct"). | `src/pages/QuizPlayer.tsx:203-211, 69, 122` | Code read; engine track | Divide by all items, and auto-submit at 0. |
| T-M6 | Verified | **Mastery can be earned by repeating one question.** One item answered 3× on each of 2 days (review mode, mixed) is enough to be "mastered". | `src/lib/mastery.ts:26-27` | `eval-scratch/engine/scoringAnalytics.test.ts` | Require at least 3 *distinct* items per day and exclude review mode. |
| T-M7 | Verified | **The exam's "By blueprint area" breakdown ignores the 50/50 MCQ/TBS weighting.** With every MCQ right and every TBS blank, areas show 86–90% while the weighted score is 50%. | `src/lib/examScoring.ts:27, 33` | `eval-scratch/engine/scoringAnalytics.test.ts` | Weight each area's share, or report MCQ and TBS separately. |
| T-M8 | Inferred | **The one mock form per section contaminates itself.** Missed mock MCQs go into the SRS queue and are served in "Review" sessions, and a retake shows the identical form. Mock attempts are recorded with `timeMs: 0`, so there are no pacing analytics for mocks. | `ExamPlayer.tsx:52, 305`; `PracticeStart.tsx:59`; `ExamHome.tsx:15-20` | Code read | Keep mock items out of the SRS queue until final review, track time per item, and add forms. |
| T-M9 | Verified | **Calculator is not usable from the keyboard as-is.** Focus stays on the toggle, Enter closes the calculator, and its keys are 35 Tabs away. **Flashcard text is hidden from screen readers** (an aria-label overrides it), and ratings fire while a `<select>` is focused. **Answer feedback isn't announced**, and focus drops to `<body>`. | `Calculator.tsx:66-76`; `FlashcardPlayer.tsx:40-46, 70`; `McqView.tsx:117-128` | `eval-scratch/ui/kbd.mjs` | Manage focus, use persistent live regions, and use shared hotkeys. |
| T-M10 | Verified | **With IndexedDB unavailable** (private mode or blocked storage), the app shows "Loading…" forever. | `src/App.tsx:56` | `eval-scratch/ui/errors.mjs` | Catch the Dexie open error and explain it. |
| T-M11 | Verified | **The journal-entry grid runs off-screen at 390 px** (544 px inside a 324 px card), and exhibits are separate tabs on mobile. | `TbsView.tsx:214, 70-94` | `eval-scratch/ui/shots/m390-journal-grid.png` | Stack debit and credit on narrow screens, and add an exhibit drawer. |
| T-M12 | Verified | **All four sections' content is parsed and Zod-validated on every launch.** That is a 502 ms long task on desktop and 2.2 s at 4× CPU. Lighthouse mobile performance is 44 (FCP 6.5 s, TTI 7.4 s). | `src/content/index.ts:9-15` | `eval-scratch/ui/perf.mjs`, `out/lighthouse-mobile.json` | Split content per section with a lazy glob, validate at build time, and drop yaml and zod from the runtime (about 182 KB). |
| T-M13 | Verified | **The onboarding promises "your spot is saved automatically", but lesson and TBS positions are lost on reload.** `lastLocation` is written but never read, and TBS elapsed time is saved only on answer changes. | `src/db/actions.ts:163`; `TbsPage.tsx:48` | `eval-scratch/ui/flows.mjs` | Use `lastLocation` for "Continue", and persist elapsed time periodically. |
| T-M14 | Verified | **Answer choices are never shuffled.** Authored order is fixed, and the practice-pool key distribution is a 293 / **b 430** / c 244 / **d 187**. Combined with the length cue in §3.6, test-wise guessing inflates every score. | `src/components/McqView.tsx:131` | `eval-scratch/engine/contentProbe.test.ts`; `eval-scratch/content/testwise.ts` | Shuffle per session with the seeded RNG, mapping display letters to IDs. See also the §6 P0 content fix. |

#### Low

| ID | V/I | Finding | Location | Evidence |
|---|---|---|---|---|
| T-L1 | Verified | The error log's "one cause per item per day" compares a UTC date with the local day, so duplicate tags appear for 4–14 h/day depending on time zone. | `src/db/actions.ts:97-98` | `eval-scratch/engine/tz.test.ts` → `tzCases.test.ts` |
| T-L2 | Verified | Past exam dates are shown as the UTC date. | `src/pages/ExamHome.tsx:86` | same |
| T-L3 | Verified | Planner edge cases: an exam today or in the past is treated as "no date"; an exam tomorrow asks for about 3,850 min/week; a mock is booked on a 60-minute day; a 5-digit year is accepted; there is no horizon cap. | `src/lib/planner.ts:165, 205-207` | `eval-scratch/engine/planner.test.ts` |
| T-L4 | Verified | Deck study ignores `newCardsPerDay`. A double grade key rates two cards. Due-question review takes the first 25 by key, not the most overdue. A missing test-mode confidence is recorded as "unsure". | `Flashcards.tsx:50-53`; `FlashcardPlayer.tsx:30-35`; `PracticeStart.tsx:59-66`; `QuizPlayer.tsx:97` | engine track |
| T-L5 | Inferred | TBS page state leaks between `/tbs/a` and `/tbs/b` when only the route parameter changes. | `TbsPage.tsx:22-34` | code read |
| T-L6 | Verified | axe-core: 9 violations (13 nodes) in light theme and 11 (17 nodes) in dark. They are color-contrast (2.87–4.43:1 on flashcard grade labels, the dashboard and mermaid dark mode), `page-has-heading-one` (quiz, flashcards), `heading-order` (TBS), landmark rules (module) and `definition-list` (glossary). Lighthouse a11y is 100. | various | `eval-scratch/ui/out/axe-summary.json` |
| T-L7 | Verified | Horizontal scroll at 320 px or 140% text on the dashboard. Tap targets under 24 px (43 practice-builder checkboxes at 13–16 px). Smooth scroll ignores reduced-motion. Choice buttons don't follow the ARIA radio pattern. | `Dashboard.tsx:106,148`; `TbsPage.tsx:54`; `McqView.tsx:130-141` | `ui/responsive.mjs`, `overflow320.mjs` |
| T-L8 | Verified | `npm audit`: 5 high, from lodash-es `_.template` code injection and `_.unset`/`_.omit` prototype pollution via chevrotain via mermaid. **Not reachable:** chevrotain imports none of those functions, no dist chunk contains `lodash.templateSources`, and mermaid input is static bundled content. | `package.json` | `ui/out/npm-audit*.json` |
| T-L9 | Inferred | No CSP, `nosniff`, `frame-ancestors` or referrer policy. The GitHub Pages mirror ignores `_headers`, and the inline theme script in `index.html` would need a hash. Low risk, since there is no backend. | `public/_headers`; `index.html:11-18` | code read |
| T-L10 | Verified | Mermaid fetches a 1.39 MB `elk` chunk it doesn't need. Numeric inputs accept any text, and the "0" placeholder looks like an entered value. `PracticeStart` doesn't react to URL changes after mount. | `ui/offline.mjs`, `routes.mjs`; `TbsView.tsx:170` | — |

### 2.5 Math verified correct (Verified: `eval-scratch/engine/`, 119 tests passing)

- **Shuffle and sampling:** Fisher–Yates with mulberry32 is unbiased (χ² = 28.2 against a p=.001 critical value of 49.7 over 240k shuffles), and seeds reproduce. `buildQuiz`, `buildMasteryCheck` and `interleave` produce no duplicates, respect the counts and prefer the least-seen items. Empty states return `[]` without crashing.
- **TBS scoring:** 20,000 adversarial fuzz cases never produced earned > possible, a non-finite result, or a percent outside [0, 1]. Journal-entry order doesn't matter, and swapped Dr/Cr earns 0.
- **`scoreExam`:** a hand-computed case (30/50 MCQ, 3/7 TBS) gives weighted 0.5143 and scaled 59, exactly. Unanswered items count as 0.
- **`approxScaledScore`:** 65% maps to 75 and 100% to 99; it is monotonic and clamped.
- **Readiness:** a hand example (coverage 0.5 × accuracy 0.8 + 0.5 × 0.3) with blueprint-midpoint weights comes out exact. The 50/50 mock blend is correct, and empty data produces no NaN.
- **Mastery:** the thresholds are exact (80% qualifies, 7/9 does not; the 60% "slipping" boundary behaves correctly).
- **FSRS:** the grade mapping is wrong or guess → Again, unsure → Hard, confident → Good. Memory state is per item, and the new-card allowance never goes negative.
- **Dates:** exact for every day of 2024–2028 in 8 time zones, including DST edge cases (Santiago midnight DST, Lord Howe's 30-minute DST).

### 2.6 Security summary

- **Auth and secrets:** there is no authentication or backend by design. No secrets were found in the working tree or across the 47-commit history. **Verified.**
- **XSS:** react-markdown runs without rehype-raw, so raw HTML is not rendered. Mermaid uses `securityLevel:'strict'` (`Mermaid.tsx:13`). A malicious backup carrying `<script>`, `<img onerror>` and `javascript:` links in notes and highlights rendered as plain text. **Verified** (`ui/out/backup-xss.json`).
- **Injection and import:** the import is transactional, so a thrown import rolls back. But the lack of schema validation leads to T-C1.
- **Dependencies:** see T-L8. **Headers:** see T-L9.

### 2.7 Performance, accessibility and mobile (numbers)

| Metric | Value (Verified, `eval-scratch/ui/out/`) |
|---|---|
| Main chunk | 4.35 MB raw / 0.96 MB gzip; content is 79% (FAR 1.23 MB, AUD 1.05 MB, REG 0.75 MB, TCP 0.63 MB) |
| Lighthouse mobile / desktop performance | 44 / 89 |
| Cold load, Slow-4G + 4× CPU | first h1 at 8.0 s |
| PWA precache | 77 entries, 6.2 MB |
| axe violations (18 pages × 2 themes) | 9 light / 11 dark (see T-L6); Lighthouse a11y 100 |
| Keyboard | A–D, 1–3 and ←/→ work and do not fire while typing. A TBS can be submitted by keyboard alone. Problems: T-H6, T-M9. |
| 200% zoom | no horizontal scroll on 12 pages |

### 2.8 Test coverage: critical paths with no existing test (compared with `tests/*.test.ts`)

Untested:
- `scoreExam` and `weightedPercent`.
- ExamPlayer's timer, break, auto-finish and resume.
- Quiz, TBS and exam persistence and resume.
- `buildQuiz`, `buildMasteryCheck`, `historyByItem`, `shuffle`.
- `buildCardQueue` and its new-per-day limit.
- `computeStudyState`, which wires readiness together.
- All date and time-zone helpers.
- `logError`, `reviewQuestionItem`, `reviewFlashcard`.
- `importBackup` with malformed, partial or empty input (only a round-trip and "not a backup" are tested).
- Journal-entry hedging, percent input, clock skew and double submission.
- Any UI or end-to-end test.

What is tested: the SRS basics, TBS scoring basics and the "every TBS key scores 100%" test, planner basics, mastery, analytics and the content build.

---

## 3. Content coverage

### 3.1 Blueprint and exam format

**Source:** the AICPA *Uniform CPA Examination Blueprints* you supplied (approved Aug. 18, 2025; **effective January 2026**). The structure was extracted by `eval-scratch/blueprint/extract.py`. Each task's skill level is read from the PDF's checkmark columns, by rendering each page and probing the columns for ink.
- **Result:** all 463 representative tasks resolved to exactly one skill.
- **Visual check:** AUD p.20 matched exactly.

#### Allocations: Blueprint vs the repo's YAML (Verified)

| Section | Area allocations (Blueprint) | Skill allocation R&U / App / Analysis / Eval (Blueprint) | Repo YAML |
|---|---|---|---|
| FAR | I 30–40 · II 30–40 · III 25–35 | 5–15 / 45–55 / 35–45 / – | **Identical** (titles too) |
| AUD | I 15–25 · II 25–35 · III 30–40 · IV 10–20 | 30–40 / 30–40 / 15–25 / 5–15 | **Identical** |
| REG | I 10–20 · II 15–25 · III 5–15 · IV 22–32 · V 23–33 | 25–35 / 35–45 / 25–35 / – | **Identical** |
| TCP | I 30–40 · II 30–40 · III 10–20 · IV 10–20 | 5–15 / 55–65 / 25–35 / – | **Identical** |

The repo's `docs/BLUEPRINT_NOTES.md` "verify" flags on allocations and skill ranges (REG II–III, TCP III–IV, AUD skills) are now **resolved: correct**. The comparisons in §3.3–3.4 therefore stand against the official ranges.

#### Blueprint structure and representative-task skill mix (Verified)

The Blueprint says the number of tasks does not indicate weight. The score weights are the allocations above.

| Section | Area (allocation) | Groups | Topics | Tasks | R&U | App | Analysis | Eval |
|---|---|---|---|---|---|---|---|---|
| FAR | I. Financial Reporting (30–40%) | 6 | 16 | 47 | 10 | 30 | 7 | 0 |
| FAR | II. Select Balance Sheet Accounts (30–40%) | 9 | 12 | 40 | 7 | 24 | 9 | 0 |
| FAR | III. Select Transactions (25–35%) | 7 | 7 | 26 | 10 | 13 | 3 | 0 |
| **FAR** | **Total** | | | **113** | 27 (24%) | 67 (59%) | 19 (17%) | 0 (0%) |
| AUD | I. Ethics, Professional Responsibilities and General Principles (15–25%) | 7 | 13 | 29 | 18 | 11 | 0 | 0 |
| AUD | II. Assessing Risk and Developing a Planned Response (25–35%) | 7 | 17 | 50 | 16 | 28 | 5 | 1 |
| AUD | III. Performing Further Procedures and Obtaining Evidence (30–40%) | 8 | 17 | 44 | 8 | 19 | 12 | 5 |
| AUD | IV. Forming Conclusions and Reporting (10–20%) | 5 | 13 | 24 | 18 | 6 | 0 | 0 |
| **AUD** | **Total** | | | **147** | 60 (41%) | 64 (44%) | 17 (12%) | 6 (4%) |
| REG | I. Ethics, Professional Responsibilities and Federal Tax Procedures (10–20%) | 4 | 9 | 19 | 12 | 7 | 0 | 0 |
| REG | II. Business Law (15–25%) | 5 | 9 | 28 | 17 | 11 | 0 | 0 |
| REG | III. Federal Taxation of Property Transactions (5–15%) | 2 | 2 | 10 | 0 | 8 | 2 | 0 |
| REG | IV. Federal Taxation of Individuals (22–32%) | 6 | 6 | 23 | 4 | 13 | 6 | 0 |
| REG | V. Federal Taxation of Entities (including tax preparation) (23–33%) | 6 | 10 | 25 | 6 | 13 | 6 | 0 |
| **REG** | **Total** | | | **105** | 39 (37%) | 52 (50%) | 14 (13%) | 0 (0%) |
| TCP | I. Tax Compliance and Planning for Individuals and Personal Financial Planning (30–40%) | 4 | 4 | 25 | 9 | 14 | 2 | 0 |
| TCP | II. Entity Tax Compliance (30–40%) | 5 | 14 | 43 | 14 | 26 | 3 | 0 |
| TCP | III. Entity Tax Planning (10–20%) | 4 | 4 | 16 | 0 | 10 | 6 | 0 |
| TCP | IV. Property Transactions (disposition of assets) (10–20%) | 3 | 3 | 14 | 1 | 10 | 3 | 0 |
| **TCP** | **Total** | | | **98** | 24 (24%) | 60 (61%) | 14 (14%) | 0 (0%) |

#### Exam format: still unverified

The Blueprints do **not** state MCQ or TBS counts, testlet structure, time, or MCQ/TBS score weighting. The repo's figures, below, still need the AICPA exam-format page (Appendix B). Each mock form matches its YAML exactly (Verified: `npm run validate`).

| Section | Repo: MCQs (testlets) | Repo: TBS (testlets 3/4/5) | Repo: time / weight |
|---|---|---|---|
| FAR | 50 (25+25) | 7 (2/3/2) | 240 min; 50/50 |
| AUD | 78 (39+39) | 7 (2/3/2) | 240 min; 50/50 |
| REG | 72 (36+36) | 8 (2/3/3) | 240 min; 50/50 |
| TCP | 68 (34+34) | 7 (2/3/2) | 240 min; 50/50 |

#### Blueprint statements that change how this platform should be judged (Verified; quoted in substance)

1. **REG and TCP: indexed amounts aren't tested.** Candidates "will not be tested on their knowledge of specific tax rate percentages, amounts or limitations that are indexed to inflation". Wages are assumed to exclude overtime and tips unless stated. TCP adds that timing-dependent questions will state the timing (e.g., real dates). Otherwise the current year and the most recent law apply, "in accordance with the timing specified in the CPA Exam Policy on New Pronouncements". The Blueprints cite that policy but don't reproduce it. Implications for the repo are in §3.8 and §4.
2. **All four: data and technology.** Assessments incorporate verifying the **completeness and accuracy of source data**. AUD adds using the **outputs of data analytic techniques**; REG adds reviewing the **outputs of automated validation checks and diagnostic tools**.
   - FAR has three analysis tasks to "detect, investigate and correct discrepancies" by agreeing statements to supporting documentation **including the source data**.
   - Repo coverage (grep, Verified): "source data" appears in **1** AUD file and **0** FAR, REG or TCP files; "diagnostic" or "validation check" appears in **0**.
3. **All four: applied research using excerpts** of source material (ASC; AU-C/AT-C/AR-C; IRC and Treasury Regulations), to identify issues, analyze facts and determine responses. The repo's `research` part matches this design. But REG and TCP have **1 research TBS each and no document-review TBS** (§3.5).
4. **AUD scope:**
   - Audits of **ERISA employee benefit plans** are eligible "in each group and topic" of Areas I–III, and DOL independence is in Area I.
   - **Single audits under the Uniform Guidance** (Areas II and III), **compliance audits**, **GAO Government Auditing Standards**, **SOC 1** reports, and AICPA **quality management** standards (the References) are all in scope.
   - Questions state issuer vs nonissuer and the engagement type.
5. **FAR scope:**
   - Questions assume a for-profit business entity under U.S. GAAP unless they say otherwise.
   - State and local government is limited to **concepts**: measurement focus, basis of accounting, and the purpose of funds.
   - Investments cover financial assets at fair value and at amortized cost, and equity-method investments.
   - Intangibles focus on **finite-lived** assets.
   - Leases are **lessee only**.
   - Area I includes foreign-currency transaction gains and losses.
   - **Crypto assets are not mentioned**, so the earlier "crypto gap" (§3.8) is low priority.

### 3.2 Coverage matrices (Blueprint Area → Group/Topic → representative tasks → repo content)

**Method.**
- **Mapping:** four mapping passes, one per section, took the verified Blueprint structure (§3.1) and assigned **every** practice and exam MCQ and every TBS to the one Blueprint topic it mainly assesses. Each representative task was then judged as taught and assessed at its Blueprint skill level (✓), or not.
- **Analysis credit:** an item earned analysis or evaluation credit only if it genuinely required it (reviewing a schedule against source data, reconciling, comparing alternatives). A multi-step computation counts as application even when the repo labels it "analysis".
- **Rating rubric:**
  - **Full:** every task covered at its level, and at least 20 practice MCQs, or at least 10 MCQs plus at least 1 TBS, mapped to the topic.
  - **Partial:** at least 50% of tasks covered (any level), or full coverage below the depth or skill bar.
  - **Thin:** some coverage but under 50% of tasks, or fewer than 5 items.
  - **Missing:** nothing.
- **Evidence level:** the Blueprint side is **Verified**. The item-to-topic mapping is reviewer judgment (**Inferred**, medium-high confidence). Borderline calls are documented in `eval-scratch/blueprint/coverage-<SEC>.md`, which also lists every representative task, abbreviated, with ✓/✗.

#### Summary

| | FAR | AUD | REG | TCP | All |
|---|---|---|---|---|---|
| Blueprint topics: Full / Partial / Thin / Missing | 10 / 18 / 7 / 0 | 4 / 23 / 29 / 4 | 2 / 15 / 17 / 2 | 3 / 14 / 7 / 1 | 19 / 70 / 60 / 7 (156) |
| Representative tasks covered at their skill level | 84 / 113 (74%) | 95 / 147 (65%) | 68 / 105 (65%) | 50 / 98 (51%) | **297 / 463 (64%)** |
| … R&U tasks | 24 / 27 | 44 / 60 | 29 / 39 | 13 / 24 | 110 / 150 |
| … Application tasks | 53 / 67 | 37 / 64 | 39 / 52 | 36 / 60 | 165 / 243 |
| … **Analysis + Evaluation tasks** | **7 / 19** | **14 / 23** (An 12/17, E 2/6) | **0 / 14** | **1 / 14** | **22 / 70 (31%)** |
| Practice + exam MCQs with **no Blueprint topic** | 38 / 434 (9%) | 1 / 401 (0.2%) | **91 / 323 (28%)**, incl. 19 of the mock's 72 | 23 / 264 (9%), plus 30 in-topic but matching no task | 153 / 1,422 (11%) |

**What the matrices show:**

1. **Analysis is the weakest dimension in every section.** Analysis carries 35–45% of the score in FAR and 25–35% in REG and TCP (Blueprint allocations). Most Blueprint analysis tasks, and the evaluation tasks in AUD, are of one kind: *review a schedule, return or statement against supporting documentation and **source data**, resolve discrepancies, or respond to automated diagnostic output*. The repo has essentially none of this. "Source data" appears in 1 file bank-wide, and "diagnostic" in none (§3.1).

2. **The REG/TCP split follows the pre-2026 scope, not the 2026 Blueprints** (topic placement Verified against the Blueprint text).
   - **REG contains TCP material.** It drills AMT, passive-activity and at-risk rules, gift tax, like-kind and §1033 exchanges, §1231/1245/1250, installment sales, E&P and corporate distributions, redemptions, liquidations, trusts and UBTI. All of these are **TCP** tasks in 2026.
   - **REG misses its own topics.** It lacks **MACRS, bonus and §179 cost recovery (III.B)**, **state nexus and apportionment (V.B.2, Missing)**, the ACA, worker classification and the FCPA (II.D), and the S-corp ordinary-income computation.
   - **TCP contains REG material.** Its cost-recovery module and its Schedule M-1/M-3 items are REG tasks.
   - **Consequences.** A REG candidate spends about 28% of MCQ practice, and faces 25% of the REG mock, on content the REG exam doesn't test. REG Area V is under-weighted (§3.3).

3. **Section-specific gaps** (full lists in the coverage files):
   - **FAR:**
     - Subledger-to-GL reconciliations and roll-forwards for receivables, inventory, PP&E and payables (4 analysis tasks).
     - Discrepancy detection against source data for every statement (5 analysis tasks).
     - Error-correction tasks for cash flows, consolidations and the NFP statements.
     - Foreign-currency transaction gains and losses.
     - **Purchased software and cloud computing (II.F).** The repo's intangibles lesson wrongly defers it to BAR.
     - Exit and disposal liabilities; debt modification and TDR; covenant calculations; budget-to-actual and EBITDA.
     - **Out of scope** (no Blueprint topic): the conceptual-framework module, the employee-benefit-plan module, segment reporting and goodwill (38 MCQs).
   - **AUD:**
     - **Single audits and compliance audits** (II.G.4, III.E.6 and IV.E.5 are Missing).
     - Data structure and preparation (III.A.1, Missing).
     - ICFR integrated-audit reporting.
     - Economics (supply and demand, business cycles).
     - 4 of 6 evaluation tasks.
     - Interpreting real analytics outputs.
     - GAO/DOL independence application; ERISA plan audits (lesson-level only).
     - SOX governance; compliance attestation (AT-C 315).
   - **REG:** as in point 2. Also the decedent's final return, individual tax computation (no item computes regular tax), C-corp credits, state boards of accountancy (I.B, Missing), FBAR and preparer definition, and contract discharge.
   - **TCP:**
     - **International tax (II.A.4, Missing, 6 tasks).**
     - Imputed interest and below-market loans.
     - C-corp NOL (80% limit) and capital-loss utilization.
     - Noncash property distributions (§311(b)) for C and S corporations.
     - Personal financial planning (investment risk, insurance, beneficiary designations).
     - S-corp planning analyses.
     - Partnership recourse and nonrecourse debt allocation.
     - §1033 involuntary conversions; §267(c) attribution.

#### FAR matrix — ratings: Full 10, Partial 18, Thin 7

| Area | Group/Topic | Tasks (R/Ap/An/E) | Covered at level | Repo modules | Practice MCQ | Exam MCQ | TBS p/e | Rating |
|---|---|---|---|---|---|---|---|---|
| I | I.A.1 Balance sheet/Statement of financial position | 3 (0/2/1/0) | 2 | balance-sheet-equity, debt-other | 9 | 1 | 0/0 | Partial |
| I | I.A.2 Income statement/Statement of profit or loss | 4 (0/3/1/0) | 2 | income-statement-oci | 6 | 1 | 1/0 | Partial |
| I | I.A.3 Statement of comprehensive income | 2 (2/0/0/0) | 2 | income-statement-oci, balance-sheet-equity | 5 | 1 | 0/0 | Partial |
| I | I.A.4 Statement of changes in equity | 3 (0/2/1/0) | 2 | balance-sheet-equity | 2 | 0 | 0/0 | Thin |
| I | I.A.5 Statement of cash flows | 4 (0/2/2/0) | 2 | cash-flows | 12 | 2 | 1/1 | Partial |
| I | I.A.6 Consolidated financial statements (including wholly-owned subsid | 3 (0/2/1/0) | 1 | consolidations, intangibles | 14 | 2 | 1/1 | Thin |
| I | I.A.7 Notes to financial statements | 2 (0/1/1/0) | 2 | notes-disclosures | 11 | 1 | 0/0 | Partial |
| I | I.B.1 Statement of financial position | 3 (1/2/0/0) | 2 | nfp-statements | 2 | 0 | 0/0 | Thin |
| I | I.B.2 Statement of activities | 4 (1/3/0/0) | 3 | nfp-statements, nfp-revenue | 6 | 1 | 1/0 | Partial |
| I | I.B.3 Statement of cash flows | 3 (1/2/0/0) | 1 | nfp-statements | 1 | 0 | 0/0 | Thin |
| I | I.B.4 Notes to the financial statements | 1 (0/1/0/0) | 0 | nfp-statements | 1 | 0 | 0/0 | Thin |
| I | I.C.1 Measurement focus and basis of accounting | 1 (1/0/0/0) | 1 | government | 3 | 1 | 0/0 | Thin |
| I | I.C.2 Purpose of funds | 1 (0/1/0/0) | 1 | government | 4 | 0 | 1/0 | Partial |
| I | I.D Public Company Reporting Topics | 3 (2/1/0/0) | 2 | sec-segments, eps | 16 | 2 | 1/0 | Partial |
| I | I.E Special Purpose Frameworks | 4 (1/3/0/0) | 4 | special-purpose | 10 | 1 | 1/0 | Full |
| I | I.F Financial Statement Ratios and Performance Metrics | 6 (1/5/0/0) | 5 | ratios | 11 | 2 | 1/0 | Partial |
| II | II.A Cash and cash equivalents | 3 (0/1/2/0) | 3 | cash | 10 | 1 | 1/0 | Full |
| II | II.B Trade receivables | 4 (0/2/2/0) | 2 | receivables | 11 | 1 | 0/0 | Partial |
| II | II.C Inventory | 4 (0/2/2/0) | 2 | inventory-cost, inventory-valuation | 19 | 2 | 1/0 | Partial |
| II | II.D Property, plant and equipment | 7 (0/5/2/0) | 4 | ppe-acquisition, depreciation, impairment, income-statement- | 26 | 5 | 2/1 | Partial |
| II | II.E.1 Financial assets at fair value | 4 (1/3/0/0) | 4 | debt-securities, equity-investments, fair-value | 5 | 1 | 0/0 | Partial |
| II | II.E.2 Financial assets at amortized cost | 3 (1/2/0/0) | 2 | debt-securities | 7 | 1 | 1/0 | Partial |
| II | II.E.3 Equity method investments | 2 (1/1/0/0) | 2 | equity-investments | 9 | 1 | 1/0 | Full |
| II | II.F Intangible assets | 3 (1/2/0/0) | 2 | intangibles, impairment | 8 | 0 | 0/0 | Partial |
| II | II.G Payables and accrued liabilities | 4 (1/2/1/0) | 2 | payables, ppe-acquisition | 11 | 1 | 0/0 | Partial |
| II | II.H.1 Notes and bonds payable | 4 (2/2/0/0) | 2 | bonds, debt-other | 16 | 2 | 1/1 | Partial |
| II | II.H.2 Debt covenant compliance | 1 (0/1/0/0) | 0 | debt-other, balance-sheet-equity | 2 | 0 | 0/0 | Thin |
| II | II.I Equity | 1 (0/1/0/0) | 1 | equity | 11 | 1 | 1/0 | Full |
| III | III.A Accounting changes and error corrections | 2 (0/1/1/0) | 2 | accounting-changes, depreciation, inventory-valuation | 12 | 1 | 1/0 | Full |
| III | III.B Contingencies and commitments | 3 (1/1/1/0) | 3 | contingencies | 10 | 1 | 1/0 | Full |
| III | III.C Revenue recognition | 7 (3/4/0/0) | 7 | revenue-contracts, revenue-measurement, nfp-revenue | 30 | 5 | 2/2 | Full |
| III | III.D Accounting for income taxes | 5 (2/3/0/0) | 5 | income-taxes | 10 | 3 | 1/0 | Full |
| III | III.E Fair value measurements | 2 (1/1/0/0) | 2 | fair-value | 9 | 1 | 1/0 | Full |
| III | III.F Lessee accounting | 4 (2/2/0/0) | 4 | leases-finance, leases-operating | 21 | 3 | 2/1 | Full |
| III | III.G Subsequent events | 3 (1/1/1/0) | 3 | subsequent-events | 10 | 1 | 0/0 | Partial |

#### AUD matrix — ratings: Full 4, Partial 23, Thin 29, Missing 4 (plus 1 out-of-scope row)

| Area | Group/Topic | Tasks (R/Ap/An/E) | Covered at level | Repo modules | Practice MCQ | Exam MCQ | TBS p/e | Rating |
|---|---|---|---|---|---|---|---|---|
| I | I.A.1 AICPA Code of Professional Conduct | 4 (1/3/0/0) | 3 | code-of-conduct, sec-pcaob-independence | 11 | 5 | 1/1 | Partial |
| I | I.A.2 SEC and PCAOB requirements | 2 (1/1/0/0) | 2 | communications, sec-pcaob-independence | 9 | 3 | 1/0 | Full |
| I | I.A.3 GAO and DOL requirements | 4 (2/2/0/0) | 2 | sec-pcaob-independence | 2 | 1 | 0/0 | Thin |
| I | I.B Professional skepticism and professional judgment | 2 (2/0/0/0) | 1 | professional-standards | 2 | 1 | 0/0 | Thin |
| I | I.C.1 Audit engagements | 1 (1/0/0/0) | 1 | professional-standards | 5 | 2 | 0/0 | Partial |
| I | I.C.2 Engagements under GAO Government Auditing Standards | 1 (1/0/0/0) | 0 | professional-standards | 1 | 0 | 0/0 | Thin |
| I | I.C.3 Other engagements | 1 (1/0/0/0) | 1 | attestation, professional-standards, ssars | 3 | 0 | 0/0 | Thin |
| I | I.D.1 Preconditions for an engagement | 1 (1/0/0/0) | 1 | attestation, engagement-acceptance, modified-opinions, profe | 6 | 1 | 0/0 | Partial |
| I | I.D.2 Terms of engagement and the engagement letter | 4 (2/2/0/0) | 3 | engagement-acceptance, professional-standards, ssars | 10 | 1 | 1/0 | Partial |
| I | I.E Requirements for engagement documentation | 3 (2/1/0/0) | 2 | evidence-assertions | 3 | 1 | 0/0 | Thin |
| I | I.F.1 Planned scope and timing of an engagement | 2 (1/1/0/0) | 1 | communications, planning | 10 | 1 | 0/0 | Partial |
| I | I.F.2 Internal control related matters | 2 (1/1/0/0) | 1 | internal-control | 3 | 1 | 0/0 | Thin |
| I | I.G Audit and assurance quality | 2 (2/0/0/0) | 2 | quality-management, written-representations | 11 | 2 | 1/0 | Full |
| II | II.A.1 Overall engagement strategy | 1 (1/0/0/0) | 1 | planning | 1 | 1 | 0/0 | Thin |
| II | II.A.2 Engagement plan | 2 (0/2/0/0) | 0 | planning | 1 | 0 | 0/0 | Thin |
| II | II.B.1 External factors | 3 (2/1/0/0) | 1 | understanding-entity | 2 | 1 | 0/0 | Thin |
| II | II.B.2 Internal factors | 2 (1/1/0/0) | 1 | planning, understanding-entity | 1 | 1 | 0/0 | Thin |
| II | II.C.1 COSO Internal Control – Integrated Framework | 2 (2/0/0/0) | 1 | internal-control | 2 | 1 | 0/0 | Thin |
| II | II.C.2 Control environment, entity-level controls and IT general contr | 2 (1/1/0/0) | 1 | internal-control, it-controls | 4 | 1 | 0/0 | Partial |
| II | II.C.3 Business processes and the design of internal controls, includi | 7 (0/5/1/1) | 3 | internal-control, it-controls, tests-of-controls | 10 | 3 | 1/1 | Partial |
| II | II.C.4 Implications of an entity using a service organization | 3 (1/2/0/0) | 3 | attestation, using-others | 5 | 1 | 0/0 | Partial |
| II | II.C.5 Limitations of controls and risk of management override | 2 (1/1/0/0) | 1 | frrisk | 1 | 1 | 0/0 | Thin |
| II | II.D.1 For the financial statements as a whole | 3 (1/2/0/0) | 2 | risk-materiality | 3 | 2 | 1/0 | Partial |
| II | II.D.2 Tolerable misstatement and performance materiality | 2 (1/1/0/0) | 2 | risk-materiality | 1 | 0 | 0/0 | Thin |
| II | II.E Assessing and responding to risks of material misstatement (fraud | 11 (0/7/4/0) | 10 | data-analytics, frrisk, planning, revenue-receivables, risk- | 36 | 9 | 2/1 | Partial |
| II | II.F Planning for and using the work of others | 3 (1/2/0/0) | 3 | using-others | 7 | 1 | 0/0 | Partial |
| II | II.G.1 An entity’s compliance with laws and regulations | 4 (2/2/0/0) | 2 | specific-risks | 3 | 0 | 0/0 | Thin |
| II | II.G.2 Accounting estimates | 1 (1/0/0/0) | 1 | specific-risks | 1 | 0 | 0/0 | Thin |
| II | II.G.3 Related parties and related party transactions | 1 (0/1/0/0) | 1 | specific-risks | 4 | 1 | 0/0 | Partial |
| II | II.G.4 Uniform Guidance for single audits | 1 (1/0/0/0) | 0 | — | 0 | 0 | 0/0 | Missing |
| III | III.A.1 Requesting, preparing and transforming data | 4 (2/2/0/0) | 0 | data-analytics | 0 | 0 | 0/0 | Missing |
| III | III.A.2 Reliability of data and information | 1 (0/1/0/0) | 1 | data-analytics | 2 | 1 | 0/0 | Thin |
| III | III.A.3 Data analytics | 2 (0/1/1/0) | 1 | data-analytics | 7 | 1 | 0/0 | Partial |
| III | III.B Sufficient appropriate evidence | 3 (0/1/1/1) | 2 | evidence-assertions, risk-response | 3 | 1 | 0/0 | Thin |
| III | III.C Sampling techniques | 4 (2/2/0/0) | 4 | sampling | 10 | 4 | 1/1 | Full |
| III | III.D.1 Test of controls and test of details | 7 (0/4/3/0) | 4 | cash-investments, evidence-assertions, inventory-ppe, liabil | 30 | 7 | 2/1 | Partial |
| III | III.D.2 Analytical procedures | 4 (0/1/2/1) | 2 | data-analytics, inventory-ppe, planning, risk-response, writ | 7 | 0 | 0/0 | Partial |
| III | III.D.3 External confirmations | 2 (0/1/1/0) | 2 | cash-investments, evidence-assertions, liabilities-equity, r | 9 | 3 | 1/0 | Full |
| III | III.E.1 Accounting estimates | 3 (0/1/1/1) | 3 | cash-investments, inventory-ppe, specific-risks, using-other | 3 | 0 | 1/0 | Thin |
| III | III.E.2 Investments in securities | 2 (1/1/0/0) | 2 | cash-investments | 3 | 1 | 0/0 | Thin |
| III | III.E.3 Inventory and inventory held by others | 1 (0/0/0/1) | 0 | inventory-ppe, revenue-receivables | 7 | 2 | 1/0 | Partial |
| III | III.E.4 Litigation, claims and assessments | 1 (0/1/0/0) | 1 | liabilities-equity | 3 | 0 | 0/0 | Thin |
| III | III.E.5 An entity’s ability to continue as a going concern | 1 (1/0/0/0) | 1 | going-concern | 4 | 1 | 1/0 | Partial |
| III | III.E.6 Uniform Guidance for single audits | 1 (0/1/0/0) | 0 | — | 0 | 0 | 0/0 | Missing |
| III | III.F Misstatements and internal control deficiencies | 4 (0/1/2/1) | 2 | internal-control, risk-materiality, written-representations | 4 | 0 | 0/0 | Thin |
| III | III.G Written representations | 1 (1/0/0/0) | 1 | subsequent-events, written-representations | 8 | 1 | 0/0 | Partial |
| III | III.H Subsequent events and subsequently discovered facts | 3 (1/1/1/0) | 1 | subsequent-events, written-representations | 8 | 2 | 1/0 | Partial |
| IV | IV.A Reporting on audit engagements | 6 (4/2/0/0) | 4 | communications, going-concern, liabilities-equity, modified- | 30 | 7 | 2/2 | Partial |
| IV | IV.B.1 Examination or review engagements | 2 (1/1/0/0) | 0 | attestation, special-reports | 2 | 0 | 1/0 | Thin |
| IV | IV.B.2 Agreed-upon procedures engagements | 2 (1/1/0/0) | 1 | attestation | 1 | 1 | 0/0 | Thin |
| IV | IV.C.1 Preparation engagements | 1 (1/0/0/0) | 1 | ssars | 2 | 0 | 0/0 | Thin |
| IV | IV.C.2 Compilation engagements | 2 (1/1/0/0) | 2 | ssars | 2 | 1 | 0/0 | Thin |
| IV | IV.C.3 Review engagements | 2 (1/1/0/0) | 2 | ssars | 4 | 1 | 1/0 | Partial |
| IV | IV.D Reporting on compliance | 2 (2/0/0/0) | 1 | special-reports | 1 | 0 | 0/0 | Thin |
| IV | IV.E.1 Comparative statements and consistency between periods | 1 (1/0/0/0) | 0 | report-paragraphs, special-reports, unmodified-opinion | 6 | 1 | 0/0 | Partial |
| IV | IV.E.2 Other information in documents with audited statements | 1 (1/0/0/0) | 1 | report-paragraphs | 1 | 0 | 0/0 | Thin |
| IV | IV.E.3 Review of interim financial information | 1 (1/0/0/0) | 1 | special-reports | 1 | 0 | 0/0 | Thin |
| IV | IV.E.4 Supplementary information | 1 (1/0/0/0) | 1 | report-paragraphs | 1 | 0 | 0/0 | Thin |
| IV | IV.E.5 Additional reporting under GAO Government Auditing Standards | 2 (2/0/0/0) | 0 | — | 0 | 0 | 0/0 | Missing |
| IV | IV.E.6 Special-purpose frameworks | 1 (1/0/0/0) | 1 | report-paragraphs, special-reports | 5 | 1 | 0/0 | Partial |
| — | Out of scope (no Blueprint topic) | — () | 0 | special-reports | 1 | 0 | 0/0 | — |

#### REG matrix — ratings: Full 2, Partial 15, Thin 17, Missing 2

| Area | Group/Topic | Tasks (R/Ap/An/E) | Covered at level | Repo modules | Practice MCQ | Exam MCQ | TBS p/e | Rating |
|---|---|---|---|---|---|---|---|---|
| I | A.1 Circular 230 practice rules | 2 (1/1/0) | 2 | circular-230 | 7 | 2 | 0/0 | Partial |
| I | A.2 IRC/regs on tax return preparers | 3 (2/1/0) | 2 | preparer-penalties, circular-230 | 3 | 1 | 0/0 | Thin |
| I | B Licensing & disciplinary systems | 1 (1/0/0) | 0 | — | 0 | 0 | 0/0 | Missing |
| I | C.1 Audits, appeals, judicial process | 2 (2/0/0) | 2 | irs-procedures | 9 | 2 | 1/0 | Full |
| I | C.2 Substantiation & disclosure | 4 (2/2/0) | 3 | preparer-penalties, itemized-deductions | 3 | 1 | 0/0 | Thin |
| I | C.3 Taxpayer penalties | 2 (1/1/0) | 2 | preparer-penalties | 5 | 1 | 1/1 | Partial |
| I | C.4 Authoritative hierarchy | 1 (1/0/0) | 1 | irs-procedures | 1 | 1 | 0/0 | Thin |
| I | D.1 Common-law duties & liabilities | 2 (1/1/0) | 2 | accountant-liability | 5 | 1 | 0/0 | Partial |
| I | D.2 Privileged communications | 2 (1/1/0) | 1 | accountant-liability | 2 | 0 | 0/0 | Thin |
| II | A.1 Authority of agents/principals | 2 (1/1/0) | 2 | agency | 5 | 2 | 0/0 | Partial |
| II | A.2 Duties & liabilities | 2 (1/1/0) | 2 | agency | 5 | 1 | 0/0 | Partial |
| II | B.1 Contract formation | 3 (1/2/0) | 3 | contracts | 5 | 3 | 1/0 | Partial |
| II | B.2 Performance & discharge | 4 (2/2/0) | 2 | contracts | 2 | 0 | 0/0 | Thin |
| II | B.3 Breach & remedies | 3 (1/2/0) | 2 | contracts | 3 | 1 | 0/0 | Thin |
| II | C Debtor-creditor relationships | 4 (3/1/0) | 4 | debtor-creditor | 8 | 2 | 1/1 | Full |
| II | D Federal laws (emp. tax, health plans, bankruptcy, worker class., FCP | 6 (5/1/0) | 3 | federal-regulation, debtor-creditor, agency | 3 | 1 | 0/0 | Thin |
| II | E.1 Entity selection, formation, termination | 2 (2/0/0) | 2 | business-structures | 2 | 0 | 0/0 | Thin |
| II | E.2 Owner/management rights & duties | 2 (1/1/0) | 2 | business-structures | 7 | 2 | 0/0 | Partial |
| III | A Basis of assets | 5 (0/5/0) | 3 | property-basis, business-rental-income | 9 | 1 | 0/0 | Partial |
| III | B Cost recovery | 5 (0/3/2) | 1 | c-corp-income, business-rental-income | 1 | 0 | 0/0 | Thin |
| IV | A Gross income | 6 (0/4/2) | 3 | gross-income, capital-gains, property-basis, nontaxable-exch | 16 | 5 | 1/1 | Partial |
| IV | B Pass-through items on individual return | 1 (0/1/0) | 1 | partnerships, s-corporations | 1 | 1 | 0/0 | Thin |
| IV | C Adjustments & deductions (AGI, TI) | 5 (0/3/2) | 3 | adjustments, itemized-deductions, filing-status, business-re | 25 | 8 | 2/1 | Partial |
| IV | D Loss limitations | 5 (0/3/2) | 3 | capital-gains, business-rental-income, property-basis, partn | 5 | 2 | 0/0 | Partial |
| IV | E Filing status | 3 (2/1/0) | 3 | filing-status | 7 | 2 | 0/0 | Partial |
| IV | F Computation of tax & credits | 3 (2/1/0) | 2 | individual-credits, amt-other-taxes | 17 | 3 | 1/1 | Partial |
| V | A Book vs. tax differences | 4 (0/2/2) | 2 | c-corp-income | 1 | 1 | 0/0 | Thin |
| V | B.1 C-corp taxable income, tax, credits | 3 (0/3/0) | 2 | c-corp-income, capital-gains | 8 | 4 | 1/1 | Partial |
| V | B.2 State and local tax | 3 (2/1/0) | 0 | — | 0 | 0 | 0/0 | Missing |
| V | C.1 S-corp eligibility & election | 3 (2/1/0) | 3 | s-corporations | 2 | 1 | 0/0 | Thin |
| V | C.2 S-corp OBI & separately stated items | 4 (0/2/2) | 1 | s-corporations | 3 | 1 | 1/0 | Thin |
| V | C.3 S-corp shareholder basis | 2 (0/2/0) | 1 | s-corporations | 3 | 1 | 0/1 | Partial |
| V | D.1 Partnership OBI & separately stated items | 3 (0/1/2) | 1 | partnerships | 3 | 1 | 1/0 | Thin |
| V | D.2 Partner basis | 1 (0/1/0) | 1 | partnerships | 2 | 1 | 0/0 | Thin |
| V | E Limited liability companies | 1 (1/0/0) | 1 | business-structures | 1 | 0 | 0/0 | Thin |
| V | F Tax-exempt organizations | 1 (1/0/0) | 0 | trusts-exempt | 0 | 0 | 0/0 | Thin |

#### TCP matrix — ratings: Full 3, Partial 14, Thin 7, Missing 1

| Area | Group/Topic | Tasks (R/Ap/An/E) | Covered at level | Repo modules | Practice MCQ | Exam MCQ | TBS p/e | Rating |
|---|---|---|---|---|---|---|---|---|
| I | I.A Individual GI/AGI/TI and estimated taxes | 10 (2/7/1) | 5 | individual-planning; stock-compensation (2) | 22 | 9 | 1/1 | Partial |
| I | I.B Passive activity and at-risk limits | 4 (0/3/1) | 3 | passive-rental (1) | 10 | 5 | 1/0 | Partial |
| I | I.C Gift taxation | 4 (2/2/0) | 4 | gift-tax (1) | 11 | 5 | 1/1 | Full |
| I | I.D Personal financial planning | 7 (5/2/0) | 2 | retirement-education (1) | 11 | 5 | 1/0 | Thin |
| II | II.A.1 C corp: NOL and capital loss utilization | 3 (1/2/0) | 0 | consolidated-returns; c-corp-compliance (2) | 2 | 1 | 0/1 | Thin |
| II | II.A.2 C corp: shareholder contributions and distributions | 5 (0/4/1) | 2 | formation-liquidation (1) | 7 | 2 | 0/1 | Thin |
| II | II.A.3 C corp: consolidated returns | 2 (1/1/0) | 2 | consolidated-returns (1) | 9 | 2 | 1/0 | Full |
| II | II.A.4 C corp: international tax issues | 6 (5/1/0) | 0 | — (0) | 0 | 0 | 0/0 | Missing |
| II | II.B.1 S corp: shareholder basis | 4 (0/3/1) | 1 | s-corp-compliance (1) | 2 | 1 | 0/0 | Thin |
| II | II.B.2 S corp: shareholder contributions and distributions | 4 (0/4/0) | 0 | s-corp-compliance; formation-liquidation (2) | 2 | 0 | 1/0 | Thin |
| II | II.C.1 Partnership: partner basis | 4 (0/3/1) | 2 | partnership-formation; partnership-operations; partnership-d | 7 | 2 | 1/1 | Partial |
| II | II.C.2 Partnership and partner elections | 1 (1/0/0) | 1 | partnership-operations; partnership-distributions (2) | 5 | 1 | 0/0 | Partial |
| II | II.C.3 Partner–partnership transactions | 4 (0/4/0) | 4 | partnership-formation; partnership-operations; partnership-d | 11 | 4 | 1/0 | Full |
| II | II.C.4 Partnership ownership changes | 2 (0/2/0) | 2 | partnership-distributions (1) | 4 | 1 | 0/0 | Partial |
| II | II.D.1 Trusts: types | 3 (3/0/0) | 2 | trusts-estates (1) | 5 | 1 | 0/0 | Partial |
| II | II.D.2 Trusts: income and deductions | 2 (0/2/0) | 1 | trusts-estates (1) | 5 | 2 | 1/0 | Partial |
| II | II.E.1 Exempt status: obtain and keep | 2 (2/0/0) | 2 | exempt-organizations (1) | 6 | 1 | 0/0 | Partial |
| II | II.E.2 Unrelated business income | 1 (1/0/0) | 1 | exempt-organizations (1) | 4 | 1 | 0/0 | Partial |
| III | III.A Formation and liquidation of entities | 4 (0/2/2) | 2 | entity-choice; formation-liquidation (2) | 10 | 3 | 1/0 | Partial |
| III | III.B Tax planning for C corporations | 5 (0/4/1) | 2 | multistate; c-corp-compliance; formation-liquidation; cost-r | 17 | 4 | 1/0 | Partial |
| III | III.C Tax planning for S corporations | 4 (0/2/2) | 2 | s-corp-compliance (1) | 6 | 3 | 0/1 | Partial |
| III | III.D Tax planning for partnerships | 3 (0/2/1) | 2 | partnership-formation; partnership-operations (2) | 3 | 0 | 0/0 | Thin |
| IV | IV.A Nontaxable dispositions | 2 (0/1/1) | 0 | deferral-transactions (1) | 3 | 1 | 1/0 | Partial |
| IV | IV.B Gain/loss amount, character and netting | 8 (0/6/2) | 6 | asset-dispositions; deferral-transactions; formation-liquida | 15 | 6 | 1/1 | Partial |
| IV | IV.C Related party transactions | 4 (1/3/0) | 2 | deferral-transactions; formation-liquidation (2) | 3 | 1 | 0/0 | Thin |

The earlier *depth* observation still holds: every repo module has 10–12 practice MCQs, so even "Full" topics are drilled far less than in a commercial bank (§5).

### 3.3 Weighting: content distribution vs the Blueprint allocation ranges

The allocation ranges are the official Blueprint ranges, Verified identical to the repo YAML (§3.1). The distribution is measured two ways.

**(a) By the repo's own Area tags.** Each module is filed under an Area in `content/sections/*.yaml`. Out-of-range values are **bold**. Source: `eval-scratch/content/inventory.md`.

| Section | Area | Blueprint range | Practice MCQ share | Exam-pool MCQ share | Lesson minutes share |
|---|---|---|---|---|---|
| FAR | I | 30–40% | 39.6% | 36.0% | 36% |
| FAR | II | 30–40% | 36.7% | 34.0% | 39% |
| FAR | III | 25–35% | **23.7% (under)** | 30.0% | 24% |
| AUD | I | 15–25% | 15.8% | 20.5% | 15% |
| AUD | II | 25–35% | 28.5% | 29.5% | 29% |
| AUD | III | 30–40% | 34.1% | 34.6% | 35% |
| AUD | IV | 10–20% | **21.7% (over)** | 15.4% | 21% |
| REG | I | 10–20% | 15.9% | 15.3% | 14% |
| REG | II | 15–25% | 19.9% | 19.4% | 19% |
| REG | III | 5–15% | 12.4% | 9.7% | 13% |
| REG | IV | 22–32% | 27.9% | 27.8% | 28% |
| REG | V | 23–33% | 23.9% | 27.8% | 26% |
| TCP | I | 30–40% | **27.6% (under)** | 35.3% | 27% |
| TCP | II | 30–40% | **41.8% (over)** | 35.3% | 41% |
| TCP | III | 10–20% | 15.3% | 14.7% | 16% |
| TCP | IV | 10–20% | 15.3% | 14.7% | 16% |

By its own tags, the repo looks well weighted. The mock forms sit inside every range, and the practice banks drift only slightly in FAR-III, AUD-IV, TCP-I and TCP-II, because every module has the same ~10 MCQs.

**(b) By Blueprint topic** (§3.2 mapping; in-scope practice + exam MCQs; out-of-scope items excluded). This is the view that matters:

| Section | Area | Blueprint range | In-scope MCQ share | Note |
|---|---|---|---|---|
| FAR | I / II / III | 30–40 / 30–40 / 25–35 | 32% / 38% / 30% | In range. Another 38 MCQs (9%) have no Blueprint topic. |
| AUD | I / II / III / IV | 15–25 / 25–35 / 30–40 / 10–20 | 24% / 26% / 33% / 17% | In range |
| REG | I | 10–20 | 19% | In range |
| REG | II | 15–25 | 22% | In range |
| REG | III | 5–15 | **4.7% (under)** | Cost recovery (MACRS, §179, bonus) is essentially untested |
| REG | IV | 22–32 | **39.7% (over)** | |
| REG | V | 23–33 | **14.2% (under)** | Entities, including SALT nexus and apportionment and S-corp income |
| REG | (none) | — | **28% of all REG MCQs** | TCP-scope or unreferenced topics |
| TCP | I / II / III / IV | 30–40 / 30–40 / 10–20 / 10–20 | 30% / 38% / 20% / 12% (practice) | In range. 23 MCQs (9%) are REG-scope. |

**REG is materially mis-weighted** against the real Blueprint, and its mock exam inherits the problem: 19 of 72 MCQs and 1 of 8 TBS are outside REG scope. The repo's own tags hide this because TCP-scope modules are filed under REG Areas III–V.

### 3.4 Skill levels (vs the Blueprint skill allocations; Verified identical to the YAML)

Label shares below are for practice MCQs. Source: `eval-scratch/content/inventory.md`.

| Section | Blueprint allocation R&U / App / Analysis / Eval | Labeled practice MCQ R&U / App / Analysis / Eval | Auditor relabel of the 25-item sample | Verdict |
|---|---|---|---|---|
| FAR | 5–15 / 45–55 / 35–45 / — | **26.6** / 59.9 / **13.5** / 0 | **R&U 52% / App 48% / Analysis 0%.** 10 of 22 items labeled App/Analysis are really recall. | **Mostly recall; analysis essentially absent from MCQs** |
| AUD | 30–40 / 30–40 / 15–25 / 5–15 | **44.9** / 42.4 / **7.1** / 5.6 | **R&U 56% / App 44% / Analysis 0 / Eval 0.** 5 of 16 labeled App+ are recall; none of the 5 labeled Analysis or Evaluation really is. | **Mostly recall** |
| REG | 25–35 / 35–45 / 25–35 / — | **39.8** / 56.6 / **3.6** / 0 | 5 of 25 relabeled one level down (4 App→R&U, 1 Analysis→App). The 72 exam-pool MCQs contain **0** Analysis items. | **Recall-heavy; analysis only in TBS** |
| TCP | 5–15 / 55–65 / 25–35 / — | **26.5** / 62.8 / **10.7** / 0 | **R&U 20% / App 76% / Analysis 4%** (1 of 25) | **Analysis far under target** |

**Labels vs reality for the TBS.** By label, TBS carry the analysis load: FAR 52% analysis, AUD 30% analysis and 15% evaluation, REG 45% analysis, TCP 71% analysis. But the Blueprint mapping (§3.2) applied the Blueprint's own definition of analysis, which is examining interrelationships to find causes and support inferences, e.g. reviewing schedules against source data or resolving discrepancies. By that test, most "analysis" TBS are multi-step computations, i.e. **application**:
- **REG:** 0 of 10 analysis-labelled TBS, and 0 of 9 analysis-labelled MCQs, genuinely require analysis.
- **TCP:** 2 of 42 analysis-labelled items do.
- **AUD:** about 19 of 48 analysis- or evaluation-labelled MCQs do.

**Blueprint tasks covered at level.** Only **22 of the Blueprint's 70 analysis and evaluation tasks (31%)** are covered at level:

| Section | Analysis/evaluation tasks covered |
|---|---|
| FAR | 7 / 19 |
| AUD | 14 / 23 |
| REG | 0 / 14 |
| TCP | 1 / 14 |

These skill levels carry 35–45% (FAR), 20–40% (AUD) and 25–35% (REG, TCP) of the score. Across all four sections, the platform trains mostly recall and routine application. It does not train the review-and-reconcile analysis the exam weights most heavily. Practice MCQ difficulty is also flat: FAR 384/384 items are difficulty 2, and REG 249/251.

### 3.5 Question formats: MCQ vs TBS mix and TBS types

| Section | Practice MCQ : practice TBS | TBS parts: numeric / dropdown / journal / doc-review / research |
|---|---|---|
| FAR | 384 : 24 | 36 / 24 / 13 / 4 / 7 |
| AUD | 323 : 20 | 11 / 47 / 0 / 6 / 6 |
| REG | 251 : 14 | 27 / 21 / 0 / **0** / **1** |
| TCP | 196 : 14 | 28 / 24 / 0 / **0** / **1** |

What the formats get right and wrong. The Blueprint statements are Verified. TBS response formats beyond what the Blueprints say remain Inferred, because the AICPA exam-format pages were not fetched.
- **Supported types:** the engine supports numeric, dropdown, journal-entry, document-review (replacement wording) and research (choose-the-excerpt) parts.
- **Applied research (Verified).** All four Blueprints assess "applied research … reviewing and using excerpts of source materials" (ASC; AU-C/AT-C/AR-C; IRC and Treasury Regulations) to identify issues, analyze facts and determine responses. The repo's `research` part is the right design. But **REG and TCP have one research TBS each and no document-review TBS**, and FAR has 7 and 4, AUD 6 and 6.
- **Data and technology (Verified).** All four Blueprints assess verifying the completeness and accuracy of **source data**; REG adds **reviewing automated validation and diagnostic output**, and AUD adds **interpreting data-analytics outputs**. Many of the Blueprint's analysis-level tasks are exactly this: review a schedule, return or statement against source data and resolve the discrepancies. **No TBS or MCQ in the repo presents source data to reconcile or a diagnostic report to resolve** (§3.1, §3.2).
- **No spreadsheet-style response.** No TBS uses one, and the exam tools lack a spreadsheet (UI M9).
- **TBS density.** Each TBS has 4–16 gradable cells (median 9–10). That is in line with real TBS, but 14–24 practice TBS per section is very few (§5).

### 3.6 Answer-cue audit: a validity problem, not a style issue (Verified)

`eval-scratch/content/testwise.ts` scores two strategies that ignore the content entirely:

| Section | Pool | n | "Always pick the longest choice" (ties split) | Most frequent key letter |
|---|---|---|---|---|
| FAR | practice / exam | 384 / 50 | 41.2% / 32.0% | b 33.6% / 28.0% |
| **AUD** | **practice / exam** | 323 / 78 | **77.6% / 82.7%** | b 39.0% / 25.6% |
| REG | practice / exam | 251 / 72 | 48.7% / 50.9% | b 39.8% / 25.0% |
| TCP | practice / exam | 196 / 68 | 44.2% / 53.8% | b 38.3% / 25.0% |

- **Length ratio:** the correct choice averages **2.13×** the mean distractor length in AUD, 1.78× in REG, 1.42× in TCP and 1.31× in FAR.
- **AUD sample:** the auditor judged **17 of 25** sampled AUD items answerable by cues alone (length, specificity, hedging, or absolutes like "never/always" in distractors).
  - **aud-uo2-02:** the key is 151 characters against at most 65 for any distractor, and it is the only choice that isn't an absolute.
  - **aud-cm-05:** the distractors are "Always", "Never" and "Only at the client's request".
- **Consequences:** chance is 25%. A candidate who never reads the AUD choices scores above the pass-equivalent on the MCQ half of the AUD mock. Practice accuracy, mastery, readiness and the mock score are therefore all inflated for AUD, and to a lesser degree for REG and TCP. Choices are also never shuffled (T-M14).

**Severity: Critical for AUD** (it invalidates the section's assessment signal). **High for REG and TCP.**

### 3.7 Accuracy audit (Phase 2 step 6)

- **Sample:** stratified random, seed `20260923`, drawn by `eval-scratch/content/sample.ts` and listed in `eval-scratch/content/sample-ids.md`. Each section has 25 MCQs (proportional by Area, with at least 2 per Area, and stratified by practice/exam pool) plus one TBS per Area.
- **How keys were checked:** every sampled key was recomputed by script (`eval-scratch/content/*-audit/`).
- **Out-of-sample scan:** the auditors also scanned the **full** bank. Issues found that way are listed separately and are **not** counted in the sample rates.
- **Evidence status:** authority checks are **Inferred**, because primary sources were blocked. Arithmetic and self-consistency checks are **Verified**.

#### Error rates (items with a Critical or High issue, divided by items sampled)

| Section | MCQ | TBS | Combined | 95% upper bound (combined) | Notes |
|---|---|---|---|---|---|
| FAR | 0/25 (0%) | 0/3 (0%) | **0/28 (0%)** | ≈ 10.7% | 6 sampled items have Medium or Low issues |
| AUD | 0/25 (0%) | 0/4 (0%) | **0/29 (0%)** | ≈ 10.3% | 17/25 cue-answerable (§3.6); 3 Medium issues |
| REG | 0/25 (0%) | 1/5 (20%) | **1/30 (3.3%)** | ≈ 17% | The 1 is a Critical wrong key |
| TCP | 0/25 (0%) | 3/4 (75%) | **3/29 (10.3%)** | ≈ 27% | 0 wrong keys; 3 High issues (exhibit contradiction, `%`/throwback ambiguity, zero tolerance) |

Bank-wide, the auditors found **6 Critical defects**, 2 of which appear in mock exams (`reg-x2-08`, `tcp-tbs-x2-corporate`).

#### Every wrong or ambiguous item found

Critical and High issues are listed first; "(S)" marks an item from the sample.

| Sev | Item | File:line | Problem | Correct treatment | Authority | Label |
|---|---|---|---|---|---|---|
| **Critical** | `reg-x2-08` (**REG mock**) | `content/reg/exam-questions/reg-exam-areas1-3.json:638-664`; `exams/reg-mock-1.json:43` | Keys the party that "perfected by possession Feb 15 but lent Mar 5" over the Mar 1 filer. | A security interest can't be perfected before it attaches, and attachment requires value (Mar 5). The **Mar 1 filer (a)** has priority. | UCC 9-203(b), 9-308(a), 9-322(a)(1) | Inferred |
| **Critical** | `reg-tbs-u6-corporate-ti` (S) | `content/reg/tbs/reg-tbs-u6-corporate-ti.json:39-67` | Applies the 10% charitable limit *before* the $100,000 NOL carryforward. | Base 442,000 → limit **44,200** (carry 5,800); TI **358,800**; tax **75,348**. Three cells mark correct answers wrong. The repo's own lesson (`reg-c-corp-income/lesson.md:33`) states the rule correctly. | IRC §170(b)(2)(D) | Verified (arithmetic) / Inferred (rule) |
| **Critical** | `tcp-tbs-x2-corporate` (**TCP mock**) | `content/tcp/tbs/tcp-tbs-x2-corporate.json:37-72`; `exams/tcp-mock-1.json:94` | Same error with a $200,000 NOL carryforward. | ch **45,000**; M-1 **605,000**; TI **372,500**; tax **78,225**; carryforward 25,000 | IRC §170(b)(2)(D) | Verified (arithmetic) / Inferred (rule) |
| **Critical** | `tcp-tbs-u2-retirement-education` row d3 | `content/tcp/tbs/tcp-tbs-u2-retirement-education.json:98` | "Leo's RMDs begin at age" is keyed 73. Leo is 50 in 2025. | Born 1960 or later, so **75**, which is not among the options. | IRC §401(a)(9)(C)(v) (SECURE 2.0 §107) | Inferred |
| **Critical** | `far-tbs-u8-bonds` rows p, c1 | `content/far/tbs/far-tbs-u8-bonds.json:21, 23` | The keys 1,837,782 and 1,851,293 have tolerance 5, but the exhibit's own factors give **1,837,774** and **1,851,285**. The explanation itself sums to 1,837,774. | Change the keys, or raise the tolerance to at least 10. | Internal arithmetic | **Verified** |
| **Critical** | `far-nd-08` | `content/far/modules/far-notes-disclosures/questions.json:333` | Keys "No disclosure" for a 45%-of-revenue customer because loss is "not reasonably possible". | The near-term loss of any customer is *always* deemed at least reasonably possible, so disclosure is required. No choice is correct, so the item needs rewriting. The lesson omits the rule (`lesson.md:92`). | ASC 275-10-50-18, -50-20 | Inferred |
| High | `aud-wr-10` | `content/aud/modules/aud-written-representations/questions.json:413` | Stem reads "misstatements total **0,000**; materiality is **00,000**". The dollar amounts were stripped, so the item is unanswerable as written. This is the only instance in the bank (Verified by regex scan). | Restore the amounts. | — | **Verified** |
| High | `far-ppe-10` (already flagged `needsReview`) | `content/far/modules/far-ppe-acquisition/questions.json:406` | A government-donated building is keyed as an immediate gain. | Unsettled. ASC 958-605 excludes government-to-business transfers, and ASU 2025-10 (government grants) may make the deferred-income or cost-reduction choice defensible. | ASC 958-605-15-6; ASC 832 | Inferred |
| High | `far-tbs-u7-equity` row m5 | `content/far/tbs/far-tbs-u7-equity.json:26` | Only "measurement alternative" is accepted. | FV-NI is the default, and the exhibit doesn't state the election, so accept both or state the election. | ASC 321-10-35-1, -2 | Inferred |
| High | `far-lso-07` | `content/far/modules/far-leases-operating/questions.json:304` | The ROU asset < liability gap is keyed as accrued rent, but the stem gives no payment pattern, and choice c's own explanation calls impairment "a possible cause". | Add payment facts. | ASC 842-20-35 | Inferred |
| High | `tcp-tbs-u3-estimates-consolidated` (S) | `content/tcp/tbs/tcp-tbs-u3-estimates-consolidated.json:17` | Exhibit says $600,000 expected tax, while part c computes $147,000 current-year tax. | Make the exhibit consistent; a defensible 25% × 147,000 answer is marked wrong. | IRC §6655 | Verified (self-contradiction) |
| High | `tcp-tbs-u6-multistate-liquidation` (S) rows eq, dw, ss | `content/tcp/tbs/tcp-tbs-u6-multistate-liquidation.json:31, 45, 52` | Percent rows reject "25%" (T-H2), and only one row mentions throwback. | Label "without throwback" and fix the parser. | — | Verified (parser) |
| High | `tcp-tbs-x4-property` (S) row dep | `content/tcp/tbs/tcp-tbs-x4-property.json:74` | Tolerance 0 on 79,167. The IRS table rate gives 79,287, and the unrounded 79,166.67 is also marked wrong. | Tolerance about ±150, or state "do not use tables". | Pub. 946 Table A-7a | Verified (parser) / Inferred |
| High | Percent rows in `tcp-tbs-u7-exchange-installment` (gp) and `tcp-tbs-x3-entity-planning` (pct), plus the 8 other TBS in T-H2 | see T-H2 | Correct `%` answers are marked wrong. | Parser fix. | — | Verified |
| High (lesson) | AUD Code of Conduct lesson | `content/aud/modules/aud-code-of-conduct/lesson.md:36, 142` | Says referral fees are *prohibited* for attest clients. | Referral fees require disclosure; *commissions* are prohibited for certain attest clients. | ET 1.520.001 | Inferred |
| Med–High | PCAOB documentation-completion period taught as **45 days** | `aud-ev-06` (evidence-assertions/questions.json:275), `aud-ev-chk2` (:71), `aud-tbs-u6-confirmations.json:87`, `aud-x3-04` rationale (`exam-questions/aud-exam-area3.json:132`), `evidence-assertions/lesson.md:35, 92`, flashcards `:30`, `review/aud-report-guide.md:38`, `review/aud-mnemonics.md:17` | Superseded. | **14 days**, phased in for fiscal years beginning on or after 12/15/2024 and 12/15/2025 depending on firm size. | AS 1215 as amended (PCAOB Rel. 2024-004) | Inferred |
| Medium | `aud-ss-07`, `aud-x4-12`; `aud-ssars/lesson.md:35` | `aud-ssars/questions.json:309`; `exam-questions/aud-exam-area4.json:388` | Pre-SSARS 25 "disclose the departure" model for reviews. | Qualified or adverse conclusion. | AR-C 90 as amended by SSARS 25 | Inferred |
| Medium | `aud-tbs-u3-analytics` k1 | `content/aud/tbs/aud-tbs-u3-analytics.json:61` | "Cost of sales — completeness" is also defensible (the explanation concedes it). | Add a fact that rules it out. | AU-C 520 | Inferred |
| Medium | `aud-x3-04` (S), `aud-sa-04` (S), `aud-tbs-x1-independence` s2 (S) | `aud-exam-area3.json:108`; `aud-sampling/questions.json:208`; `aud-tbs-x1-independence.json:33` | Stale 45-day rationale; the projection equals the stem's audited value (design flaw); covered-member rationale is irrelevant. | — | AS 1215; AU-C 530; ET 0.400.12 | Inferred |
| Medium | `far-lso-01` (S) | `far-leases-operating/questions.json:115` | Choice b's rationale is mis-explained ($32,240 is finance-lease expense). | — | ASC 842-20-25 | Verified (arithmetic) |
| Medium | `far-cont-02` (S), `far-tbs-u12-contingencies` t3, `far-contingencies/lesson.md:32, 110` | — | Says gain-contingency disclosure is "allowed". | Adequate disclosure **shall** be made. | ASC 450-30-50-1 | Inferred |
| Medium | `far-tbs-u1-cash-flows` (S) row c4 | `far-tbs-u1-cash-flows.json:57` | The row's van-for-note fact contradicts the exhibit. | — | — | Verified |
| Medium | `far-tbs-x2-bonds` (**FAR mock**) rows p, cv1 | `content/far/tbs/far-tbs-x2-bonds.json` (instructions and `amt` part) | The keys follow the exhibit's rounded PV factors (478,960; 482,698), with tolerance 2. The instructions never say to use those factors, so the exact present value (478,938, then 482,674) is marked wrong on 2 cells. Found by the lead reviewer while re-running `far-audit/recompute.py`, which prints both values. | Add "Use the present value factors provided", or widen the tolerance to about ±30. | Internal arithmetic | Verified |
| Medium | `far-dsec-10`; `far-rev2-10`; `far-tbs-u4-government-plans`; `far-special-purpose/lesson.md:30` | see the FAR audit | Annual vs semiannual price mismatch (key still closest); contradictory stem wording; governmental plan cited under ASC 962 instead of GASB; garbled unearned-revenue formula. | — | — | Verified / Inferred |
| Medium | `reg-c230-07` (S), `reg-pb-03` (S) | `reg-circular-230/questions.json:322`; `reg-property-basis/questions.json:179` | Cites §10.22 instead of §10.34(d); implies a $20,000 gift exclusion (2025 is $19,000; key internally consistent). | — | 31 CFR 10.34(d); Rev. Proc. 2024-40 | Inferred |
| Medium | `reg-tbs-x4-individual` | `reg-tbs-x4-individual.json:33` | "Gross income" keyed as total income after the capital loss. | Relabel as "Total income". | §61 / §62 | Inferred |
| Medium | Year-less tax stems `reg-cr-01`, `reg-id-02` | `reg-individual-credits/questions.json:111`; `reg-itemized-deductions` | Answers change under 2026 law. | Add "2025". | P.L. 119-21 | Inferred |
| Medium | `tcp-cr2-01` (S); `tcp-ip-08`; `tcp-tbs-x1-gift-retirement` bx; RMD-75 and §529 gaps in lessons and review | `tcp-cost-recovery/questions.json:131`; `tcp-individual-planning/questions.json:350`; `tcp-tbs-x1-gift-retirement.json:52`; `tcp-retirement-education/lesson.md:35-36, 107`; `tcp-numbers.md:44-45` | Mis-explained distractor; an RMD at age 72 (none exists in 2025); ambiguous "after 2025" exclusion; RMD age 75 omitted; §529 K-12 framing stale. | — | §401(a)(9); §529 as amended | Inferred |
| Low | about 15 items | see `eval-scratch/content/*-audit/` reports | Mislabelled trap types, wording nits, weekend due dates (§7503), "as amended" citation wording. | — | — | — |

### 3.8 Currency

**Testing policy: still unverified.** The REG and TCP Blueprints defer to the "CPA Exam Policy on New Pronouncements" for timing but don't reproduce it, and aicpa-cima.com stayed blocked. As the auditors applied it:
- **New tax legislation:** testable in the calendar quarter beginning six months after the later of enactment or the effective date.
- **OBBBA (P.L. 119-21, enacted July 4, 2025):** under a special AICPA policy, provisions effective in 2024–2025 are testable on REG and TCP from **July 1, 2026**, and later provisions follow the standard rule. The repo states the same (`docs/BLUEPRINT_NOTES.md:102-108`).
- **New accounting and auditing pronouncements:** the auditors found secondary reports of a **revised** policy. Under it, a pronouncement is testable from the later of (a) the first quarter after its earliest mandatory effective date or (b) the first quarter beginning six months after issuance, so early adoption no longer accelerates testing. This is corroborated only by web-search snippets and needs confirming.

**REG (tax year 2025):**
- **Figures:** every figure in `content/reg/review/reg-numbers.md` and the bank-wide 2025 amounts check out: OBBBA standard deduction $15,750/$31,500/$23,625, senior $6,000, CTC $2,200/$1,700, SALT $40,000 with the $500k phase-down, tips/overtime/car-loan deductions, §179 $2.5M/$4M, 100% bonus after Jan 19 2025, AMT, HSA, IRA/401(k), wage base $176,100, gift $19,000 and BEA $13.99M. (Inferred.)
- **2024 amounts:** appear only as labelled distractors. No expired provisions are presented as current, and no 2026-effective provision is tested.
- **All 13 REG `needsReview` items confirmed correct.** (Inferred.)

**TCP (tax year 2025):**
- **Figures:** `content/tcp/review/tcp-numbers.md` checks out except for these:
  - **RMD age.** Line 44 gives 73 only, omitting 75 for anyone born 1960 or later. That omission causes the Critical `tcp-tbs-u2` key error.
  - **§529 K-12 (line 45).** It is framed as "tuition" only. OBBBA broadened qualified K-12 expenses after July 4, 2025 and raises the cap to $20,000 from 2026.
- **All TCP `needsReview` items confirmed.** (Inferred.)

**Inflation-indexed amounts are not tested (Blueprint, Verified).** The REG and TCP Blueprints state that candidates "will not be tested on their knowledge of specific tax rate percentages, amounts or limitations that are indexed to inflation". So the platform's investment in memorizing indexed figures is mostly wasted study time, and items that *require recalling* such a figure test untested knowledge. From the §3.2 mapping (Inferred, item-by-item reading):

| | REG | TCP |
|---|---|---|
| MCQs whose answer requires recalling an indexed amount not given in the stem | **20** (12 practice, 4 exam, 4 lesson), plus 3 borderline. E.g. `reg-x4-03` MFJ standard deduction; `reg-adj-01` HSA; `reg-ot-03` AMT exemption and phase-out; `reg-ot-07` SS wage base; `reg-te-01`/`reg-x5-19` gift exclusion | **15** (8 practice, 4 exam, 3 lesson). E.g. `tcp-gt-04` basic exclusion; `tcp-re-01` 401(k) limits; `tcp-re-03` Roth phase-out; `tcp-te-03` trust bracket; `tcp-x4-08` §179 |
| TBS requiring such recall | **5** (`u4-gross-income`, `u5-credits-amt`, `u5-taxable-income`, `u7-s-corp-gifts`, `x4-individual`) | **3** (`u2-retirement-education`, `u7-exchange-installment`, exam `x1-gift-retirement`) |
| Flashcards drilling indexed amounts | 15 of 152 | 11 of 134 |
| Review-sheet rows (`*-numbers.md`) drilling indexed amounts | 14 of 37 | 16 of 50 |

- **Fix.** State the figure in the stem or exhibit, as `tcp-tbs-u2-gift-709` already does. Re-purpose the "numbers" sheets toward statutory, non-indexed rules and thresholds.
- **Consequence for the currency findings.** Most "stale amount" risk is moot for exam scoring. What still matters is **statutory rule changes**, e.g. the OBBBA 0.5% individual and 1% corporate charitable floors, the non-itemizer charitable deduction, the 50% dependent-care credit rate, §529 K-12 scope, §1202 tiers, and RMD age 75. None of these is indexed.
- **Overtime and tips:** the wages assumption is not violated anywhere (REG mapping).

**Tax-currency risk to decide.** Under the general six-month rule, OBBBA provisions effective January 1, 2026 plausibly became testable on July 1, 2026, which is *this* window. Both tax sections are pinned to 2025 and don't teach the **statutory** 2026 changes above. Trump-account contributions (from July 4, 2026) would not yet be testable. Confirm against the AICPA New Pronouncements policy, then either add a 2026 layer or date every stem. The TCP Blueprint already says timing-dependent questions will state their timing.

**FAR:** no superseded guidance found; there are no ASC 840 references and no incurred-loss or OTTI misuse. (Inferred.) The standards-currency gaps, re-scoped against the Blueprint:
- **Relevant:** ASU 2024-03 expense disaggregation (income statement, I.A.2); the ASU 2025-05 CECL practical expedient (trade receivables, II.B); ASU 2023-09 cash taxes paid (income taxes, III.D).
- **Low priority:** ASU 2023-08 crypto, since the FAR Blueprint doesn't mention crypto assets; GASB 101/102/103/104, since FAR tests only government *concepts* such as measurement focus, basis and funds; and ASU 2025-10 government grants.
- **Scope error:** purchased software and cloud computing are FAR II.F tasks, but the repo defers them to BAR.

**AUD:** content reflects SAS 142–146 and SQMS 1/2, but has these stale or missing points (Inferred):
- **Stale:** the PCAOB 45-day rule, now 14 days (about 10 places); the pre-SSARS 25 review reporting; the AS 1000 lesson citing the superseded AS 1001/1015; the referral-fee error.
- **Missing:** AS 2310 (effective June 15, 2025), technology-assisted analysis (Dec 15, 2025), AS 2101/1201 other-auditor amendments, QC 1000 (deferred to Dec 15, 2026), SAS 149 terminology, and compliance audits / Single Audit. Single audits under the Uniform Guidance, compliance audits, GAGAS and ERISA plan audits are **explicitly in the AUD Blueprint** (Verified), so these are coverage gaps, not just currency ones (§3.2).

---

## 4. Study-efficiency assessment (score gained per hour)

| Practice | Rating | Evidence | How to improve |
|---|---|---|---|
| Retrieval as the primary activity | **Partial** | Pre-questions before the "big idea" (`ModulePage.tsx:125-135`), 226 embedded `check` blocks across 113 lessons, practice immediately after each lesson, and a planner mix heavy in practice and mastery checks. But each module has only about 10 practice MCQs, so retrieval soon becomes re-recognition of the same items. | Make practice the default landing activity, with the lesson as reference. Expand to 30–40 MCQs per module. |
| Spaced repetition with a real algorithm | **Does** (with flaws) | FSRS via ts-fsrs, with per-item memory state (`src/lib/srs.ts`), for flashcards and for missed, guessed or unsure MCQs. Correct guesses are requeued. Flaws: clock skew throws (T-M3), mock items leak into the queue (T-M8), and confident-correct items never enter it. | Schedule all practiced items. Clamp time. Keep mock items out. |
| Adaptive diagnostic weighted by blueprint allocation | **Doesn't** | No diagnostic or placement test exists (grep finds no "diagnostic" or "placement"). The planner queue is fixed course order (`planner.ts:102-150`). Recommendations rank weak modules but aren't blueprint-weighted and don't reshape the plan. | Add a 40–60 item stratified diagnostic. Order the plan by (1 − estimated mastery) × Area weight. |
| Interleaving | **Does** | Mixed sets and mastery checks are interleaved so the same module never appears twice in a row (`quiz.ts:58-75`, Verified optimal in 300 cases). The planner schedules cumulative mixed practice. | — |
| Immediate feedback explaining every wrong choice | **Does** | The schema forces an explanation for every choice and a named trap for every distractor (`schema.ts:194-230`). Tutor mode reveals them immediately. | Fix the mis-explained distractors in §3.7. |
| Mastery thresholds and remediation loops | **Partial** | Mastery means ≥80% on ≥3 mixed items on 2 separate days, with guesses counted wrong (`mastery.ts`). But it **does not gate progress**: the next lesson is always available, and the planner schedules the next lessons regardless. Mastery can be gamed by repetition (T-M6). A failed check simply reschedules, with no targeted remediation beyond advice text. TBS count as "done" once submitted, at any score. | Gate new units on mastery of their prerequisites, or at least warn. Route failures to the missed traps' explanations, faded examples and flashcards, then retest on new items. |
| Time per question and pacing feedback | **Partial** | Per-item time is recorded in practice. Analytics shows the average against an "exam pace" hint (`Analytics.tsx:43`). The TBS timer warns past the TBS minutes. But there is no per-question pacing feedback during or after a set, mock items record `timeMs: 0`, and "Timed" sets never time out (T-M5). | Show per-item time against a target on the results screen. Enforce timed sets. Track testlet pacing in the mock. |
| Full-length simulated exams matching format, timing, tools and interface | **Partial** | Five testlets, a 4-hour clock, the optional break, locked testlets, flags and a calculator (Verified). But there is **1 form per section**; the clock can be paused indefinitely and is tick-based (T-M1); and there is no spreadsheet, literature search, highlight or strikeout, while the skill chip is shown (UI M9). Mocks are also cue-exploitable (§3.6). | At least 3 forms per section, a wall-clock timer, the real-exam tools, and hidden metadata. |
| Readiness analytics predicting the score, weighted by blueprint | **Partial** | Blueprint-midpoint-weighted per Area, with an honest "not enough data" state (`analytics.ts:195-230`). But it is MCQ-only (TBS are half the score), counts repeats and mock items, and uses a different scale than the mock's 65%→75 mapping (T-H3). | A calibrated model on first-attempt accuracy of *unseen* items plus TBS, with an uncertainty band. |
| Study plan working back from the exam date and weekly hours | **Does** | `planner.ts` uses minutes per weekday, a final-review window (20% of days, 3–14), mastery spacing (2 and 5 days), mock placement and honest "behind by X hours" messaging. Edge cases are in T-L3. It plans one section at a time, and its total (21–38 h per section) is far below typical need (§5). | Add weakness weighting and a realistic hours model. |
| Blueprint alignment of study time | **Partial** | Allocations and skill targets match the Blueprint (§3.1), but study time leaks off-Blueprint. About **11% of all MCQs (28% in REG)** assess topics with no Blueprint home in that section, so the planner schedules those modules like any other (e.g., FAR conceptual framework and benefit plans; REG's TCP-scope modules). REG and TCP also drill inflation-indexed figures the exam won't test (§3.8). And **69% of analysis and evaluation tasks** — the highest-weighted skills — have no practice at level (§3.4). | Map each module to Blueprint topics in the YAML and flag out-of-scope modules as optional. Weight planner time by (Blueprint weight × gap). Replace indexed-amount drills with stated-figure application items. |
| Friction (typical day-2 session) | **Moderate** | For 9 cards and 14–15 MCQs plus opening a lesson: **desktop 26 non-study inputs** (10 clicks + 13 → keys + 3 scrolls, about 19 s); **mobile 36** (22 taps + 14 scrolls, about 38 s). App wait time is about 1.4 s in total (`eval-scratch/ui/friction.mjs`). On mobile the confidence and Next buttons are usually below the fold. | Auto-advance after feedback. Chain cards into due questions. Start the next plan task from the results screen. Keep controls above the fold on mobile. |

**Net effect.** The design gets most of the learning-science mechanics right. But efficiency depends on accurate signals, and here those signals are inflated: cue-answerable AUD items, readiness that ignores TBS, repeats counted as mastery, and a reused mock. A learner could reach "mastered" and "likely ready" while under-prepared, which is the costliest failure for score gained per hour.

---

## 5. Completeness gap list (vs a full commercial review)

Commercial reference points come from web-search summaries of vendor pages and are approximate (Inferred):
- **Becker:** "9,000+ MCQs and 900+ TBS".
- **UWorld/Roger:** "9,000+ MCQs, 500+ TBS, 2 mocks per core section and 1 per discipline".
- **Study time:** commonly cited guidance is 70–120 h per section.

Sources: [Becker FAR guide](https://www.becker.com/blog/cpa/the-complete-guide-to-the-far-cpa-exam), [UWorld practice exams](https://accounting.uworld.com/cpa-review/cpa-courses/features/practice-exams/), [Universal CPA Review study hours](https://www.universalcpareview.com/how-many-hours-to-study-for-the-cpa-exam/).

| Gap | Current | Commercial norm (approx.) | Status |
|---|---|---|---|
| MCQ bank per section (practice + exam) | FAR 434, AUD 401, REG 323, TCP 264 | about 1,500 | **Missing ~70–80%** |
| TBS per section | FAR 31, AUD 27, REG 22, TCP 21 | about 80–150 | **Missing ~70–85%** |
| Simulated exams | 1 per section, reused, with items leaking into practice | 2+ per core section, final-review mocks | **Thin** |
| Lesson depth | 6–11 h reading per section (16k–38k words); 21–38 h planned | 70–120 h of study, video lectures | **Thin**; no video or audio |
| Flashcards | 134–254 per section, FSRS | Present | OK |
| Final review | 3 short sheets per section (5,114 words in total across all 12) | Condensed notes, final-review course | **Thin** |
| Glossary | 32–38 terms per section | — | Thin |
| Search, bookmarks (flags), notes, highlights | Present (Search, Notes and highlight pages; per-item flags and notes) | Present | OK |
| Progress export | JSON backup only; unsafe import (T-C1) | Cloud sync | **Broken or partial** |
| Offline and mobile | PWA works offline (Verified), installable; mobile TBS journal grid overflows (T-M11); iOS negatives (T-H7) | Native apps | Partial |
| Onboarding | Present, with a walkthrough, exam date and weekly hours | Present | OK (except the T-M13 promise) |
| Content authoring and QA tooling | Zod validator, CI gate, `needsReview` flags, `REVIEW.md`, answer-letter rebalancing script | Item analytics (p-value, discrimination), SME review workflow, learner "report an issue" | **Partial.** No item statistics, no issue reporting, no cue lint, no skill-mix enforcement. |
| **Blueprint topic coverage** (§3.2) | 297/463 representative tasks (64%) covered at skill level; 7 Blueprint topics Missing: AUD single audits ×2, AUD data preparation, AUD GAGAS reporting, REG state boards, REG SALT nexus/apportionment, TCP international tax | Full-blueprint coverage | **Partial** |
| **Analysis-level practice** (review against source data, reconcile, resolve diagnostics) | 22/70 analysis and evaluation tasks covered (FAR 7/19, AUD 14/23, REG 0/14, TCP 1/14); no source-data or diagnostic-review simulations at all | Core of commercial TBS banks | **Missing** |
| **Section scoping** | REG built on pre-2026 scope: 28% of REG MCQs are TCP or unreferenced material, and REG III.B cost recovery and V.B.2 SALT are nearly absent; TCP carries REG cost-recovery and M-1 items; FAR teaches out-of-scope EBP, segments, goodwill and the conceptual framework, and defers in-scope software/cloud to BAR | Scoped to the current Blueprint | **Incoherent** |
| Adaptive engine or diagnostic | None | Adaptive study path (e.g., SmartPath) | **Missing** |
| Exam-day readiness: spreadsheet tool, authoritative-literature search, highlight/strikeout, testlet pacing, the real interface | Calculator, flags, locked testlets, break | Replica of the Prometric interface | **Partial** (UI M9) |
| Exam-day readiness: check-in, NTS and scheduling rules, the 30-minute testlet rhythm, handling unscored pretest items, score-release timing | Not covered | Covered in course materials | **Missing** |
| BAR and ISC (alternative disciplines) | Schema only | Full | Out of scope (the learner chose TCP) |

**Things that don't make sense or are incoherent:**
- **"Likely ready" and the mock use different scales** (T-H3). Readiness says "Likely ready" at 75% raw, while the mock treats 65% raw as passing.
- **The mock teaches its own answers.** Missed mock items reappear in daily review, so retaking the same form measures recall of its answer key (T-M8).
- **Unkept promise.** Onboarding says "your spot is saved automatically" (T-M13).
- **"Timed" practice sets never end** (T-M5).
- **Exam-realism settings are too generous.** The exam can be paused indefinitely (T-M1), and the skill level is shown during the exam.

---

## 6. Remediation roadmap

Effort: **S** is under 1 day, **M** is 1–5 days, **L** is more than 1 week. Wrong keys and exam-realism gaps come first.

### P0: fix before relying on scores

| # | Item | Effort | Files |
|---|---|---|---|
| 1 | **Fix the 6 Critical answer keys**: `reg-x2-08` (and its rationale), `reg-tbs-u6-corporate-ti`, `tcp-tbs-x2-corporate`, `tcp-tbs-u2-retirement-education` d3, `far-tbs-u8-bonds` p/c1, `far-nd-08`. Add a regression test that each is keyed as corrected. | S | `content/reg/exam-questions/reg-exam-areas1-3.json`, `content/reg/tbs/reg-tbs-u6-corporate-ti.json`, `content/tcp/tbs/tcp-tbs-x2-corporate.json`, `content/tcp/tbs/tcp-tbs-u2-retirement-education.json`, `content/far/tbs/far-tbs-u8-bonds.json`, `content/far/modules/far-notes-disclosures/{questions.json,lesson.md}` |
| 2 | **Fix High content items**: `aud-wr-10` stem; `far-ppe-10`, `far-tbs-u7-equity` m5, `far-lso-07`; `tcp-tbs-u3-estimates-consolidated` exhibit; `tcp-tbs-x4-property` tolerance; the u6 throwback label; the AUD referral-fee lesson; `aud-tbs-u3-analytics` k1. Also tell candidates to "use the factors provided" in `far-tbs-x2-bonds` and `far-tbs-u8-bonds`. | S–M | the files listed in §3.7 |
| 3 | **Remove answer cues.** Rewrite AUD distractors to parallel length and specificity (about 400 items), then REG and TCP. Add a validator rule: correct-choice length at most about 1.25× the longest distractor for most of each pool, plus key-letter balance per pool. Shuffle choices at display with the seeded RNG, mapping display letters to IDs. | L (content) + S (lint, shuffle) | `content/aud/**/questions.json`, `content/aud/exam-questions/*`; `src/content/build.ts` or `schema.ts`; `src/components/McqView.tsx`, `QuizPlayer.tsx`, `ExamPlayer.tsx` |
| 4 | **TBS scoring fairness**: accept `%` and U+2212, declare a unit per row, penalize journal-entry hedging and duplicate lines, and allow negative entry on iOS. | S | `src/lib/tbsScoring.ts:41-56, 160-180`; `src/components/TbsView.tsx:167-175, 238, 248`; `src/components/LessonBlocks.tsx:75`; `tests/tbsScoring.test.ts` |
| 5 | **Exam realism**: a wall-clock deadline timer, pause limited to the scheduled break, per-item time, mock items kept out of SRS and readiness, the skill chip hidden, and **2+ additional forms per section** (P1 for the forms' content). | M (engine) | `src/pages/ExamPlayer.tsx`, `src/lib/examScoring.ts`, `src/db/actions.ts`, `src/pages/PracticeStart.tsx:59`, `src/components/McqView.tsx` |
| 6 | **Data safety**: Zod-validate the backup with a version check, confirm with counts, and auto-export before import. Add a root error boundary and guard `getSection`. Call `navigator.storage.persist()`. Explain when IndexedDB is unavailable. | S–M | `src/db/index.ts:93-104`, `src/pages/SettingsPage.tsx`, `src/App.tsx`, `src/pages/Dashboard.tsx`, `src/pages/Analytics.tsx`, `src/main.tsx` |
| 7 | **Service worker**: prompt before updating and never auto-reload mid-task; save notes on a debounced change. | S | `vite.config.ts:46`, `src/main.tsx`, `src/pages/ModulePage.tsx:229`, `src/components/McqView.tsx:108` |
| 8 | **Re-scope REG and TCP to the 2026 Blueprints** (exam realism). Move TCP-scope content (AMT, passive and at-risk, gift tax, like-kind and §1033, §1231/1245/1250, installment sales, E&P and distributions, redemptions and liquidations, trusts, UBTI) out of REG practice and the REG mock, and into TCP. Move cost recovery and Schedule M-1/M-3 from TCP into REG. Add REG **MACRS, bonus and §179 (III.B)**, **SALT nexus and apportionment (V.B.2)**, ACA, worker classification and FCPA (II.D), and S-corp ordinary income. Rebuild the REG mock so 0% is off-Blueprint. Then confirm the exam format (MCQ/TBS counts and timing) and the New Pronouncements policy on the AICPA site, since neither is in the Blueprints. | M–L | `content/sections/{reg,tcp}.yaml`, `content/reg/modules/{reg-corp-distributions,reg-corp-formation-liquidation,reg-nontaxable-exchanges,reg-amt-other-taxes,…}`, `content/tcp/modules/tcp-cost-recovery`, `content/{reg,tcp}/exams/*`, `docs/BLUEPRINT_NOTES.md` |
| 9 | **Stale AUD rules**: PCAOB 14-day documentation completion (about 10 places), SSARS 25 modified conclusions, and AS 1000 citations. | S–M | `content/aud/modules/{aud-evidence-assertions,aud-ssars,aud-professional-standards,aud-code-of-conduct}/*`, `content/aud/tbs/aud-tbs-u6-confirmations.json`, `content/aud/review/*` |

### P1: make the signals trustworthy and close the depth gap

| # | Item | Effort | Files |
|---|---|---|---|
| 10 | **Readiness v2**: include TBS by weighting, use first-attempt accuracy on unseen items, exclude mocks from practice, use one scale with the mock mapping, and show an uncertainty band. **Mastery**: require distinct items and exclude review mode. | M | `src/lib/analytics.ts`, `src/lib/studyState.ts`, `src/lib/mastery.ts`, `src/lib/examScoring.ts` |
| 11 | **Analysis-level practice**: build review-and-reconcile simulations of the kind the Blueprints describe. Examples: agree statements and schedules to source data and fix the discrepancies (FAR I.A, II.B–II.G roll-forwards and subledger reconciliations); review a depreciation schedule or return against source data and resolve diagnostic-check flags (REG III.B, IV, V; TCP I.B, IV.B); interpret audit data-analytics outputs and evaluate differences (AUD III.A, III.D.2). This probably needs a new TBS part type, e.g. flag-and-correct rows in an exhibit table. Also write analysis-level MCQs, relabel over-labelled items (§3.4), and add a validator check of the skill mix against the YAML targets. | L | `src/content/schema.ts`, `src/components/TbsView.tsx`, `src/lib/tbsScoring.ts`, `content/*/tbs/`, `content/*/modules/*/questions.json`, `src/content/build.ts` |
| 12 | **Bank expansion** toward at least 1,000 MCQs and 60 TBS per section, including doc-review and research TBS for REG and TCP, and 2 more mock forms per section. Include a difficulty spread (today almost everything is difficulty 2). | L | `content/**` |
| 13 | **Adaptive diagnostic plus weakness × blueprint-weighted planning.** Gate or warn on mastery before new units. Add remediation loops routed by trap and error cause. | M | `src/lib/planner.ts`, `src/lib/studyState.ts`, `src/pages/Onboarding.tsx`, new `src/lib/diagnostic.ts` |
| 14 | **Tax currency and indexed amounts**: state the figure in every item that currently requires recalling an inflation-indexed amount (REG 20 MCQs + 5 TBS; TCP 15 MCQs + 3 TBS; lists in `eval-scratch/blueprint/coverage-{REG,TCP}.md` §e). Re-purpose the `*-numbers.md` sheets and flashcards toward statutory rules. Date every tax stem. Add the 2026 **statutory** OBBBA changes if they are confirmed testable. Fix RMD age 75 and §529. | M | `content/reg/**`, `content/tcp/**` (notably `review/*-numbers.md`, `tcp-retirement-education`, `reg-individual-credits`, `reg-itemized-deductions`) |
| 15 | **Blueprint topic gaps**: **AUD** single audits under the Uniform Guidance, compliance audits (AU-C 935, AT-C 315), GAGAS engagements and reporting, ERISA plan audits, data structure and preparation (III.A.1), ICFR reporting, economics, and SOX governance. **TCP** international tax (II.A.4), imputed interest, C-corp NOL and capital-loss rules, §311(b) and noncash distributions, personal financial planning, and §1033. **FAR** software and cloud computing (II.F; currently deferred to BAR), foreign-currency transactions, covenant calculations, exit costs, debt modification and TDR, and ASU 2024-03 / 2025-05. **AUD** standards updates: AS 2310, QC 1000, technology-assisted analysis, SAS 149. | L | new modules under `content/{aud,tcp,far}/modules/`, `content/sections/*.yaml` |
| 16 | **Exam tools**: highlight and strikeout, a spreadsheet, and literature search over the bundled excerpts. Add pacing feedback per item and per testlet, and enforce timed practice sets. | M | `src/pages/ExamPlayer.tsx`, `src/components/{TbsView,McqView,Calculator}.tsx`, `src/pages/QuizPlayer.tsx` |
| 17 | **Engine robustness**: double-submit guards and idempotent attempts, key-path updates and a single-tab lock, clamping FSRS time, and test-mode scoring over all items. | S–M | `src/pages/{QuizPlayer,ExamPlayer,TbsPage}.tsx`, `src/db/actions.ts`, `src/lib/srs.ts` |
| 18 | **Accessibility and mobile**: skip link, calculator focus, live regions, flashcard semantics, the journal-entry grid on mobile, tap targets and contrast. | S–M | `src/components/{Layout,Calculator,McqView,FlashcardPlayer,TbsView}.tsx`, `src/index.css`, `src/pages/Dashboard.tsx` |
| 19 | **QA tooling**: per-item statistics from attempts (p-value, discrimination, distractor selection rates), a learner "report an issue" link, and validator additions (T-M14 / F15 gaps). | M | new `src/lib/itemStats.ts`, `src/components/McqView.tsx`, `src/content/build.ts`, `scripts/` |
| 20 | **Tests** for the untested critical paths in §2.8, especially `scoreExam`, ExamPlayer timer and resume, and `importBackup`. | M | `tests/` |

### P2: polish and scale

| # | Item | Effort | Files |
|---|---|---|---|
| 21 | **Performance**: split content per section (non-eager glob), validate at build and not at runtime, drop yaml and zod from the client, and load only the needed mermaid renderer. | M | `src/content/index.ts`, `vite.config.ts`, `src/components/Mermaid.tsx` |
| 22 | **Friction**: auto-advance, chaining cards into questions, "next task" from results, and keeping controls above the fold on mobile. | S | `src/pages/{QuizPlayer,ReviewQueue,Dashboard}.tsx`, `src/components/FlashcardPlayer.tsx` |
| 23 | **Optional sync or cloud backup**; CSV export of attempts. | M–L | `src/db/*`, `src/pages/SettingsPage.tsx` |
| 24 | **Security headers** (CSP with a script hash, nosniff, frame-ancestors) and a `lodash-es` override. | S | `public/_headers`, `index.html`, `package.json` |
| 25 | **Time-zone and planner edge cases** (T-L1–T-L3), deck `newCardsPerDay`, and the TBS route key. | S | `src/db/actions.ts`, `src/pages/ExamHome.tsx`, `src/lib/planner.ts`, `src/pages/{Flashcards,TbsPage}.tsx`, `src/App.tsx` |
| 26a | **Mark off-Blueprint modules as optional** and keep them out of the default plan and mocks. FAR: conceptual framework, employee benefit plans, segment reporting and goodwill (38 MCQs). AUD: comfort letters. Or map them to BAR if that section is built. | S | `content/sections/far.yaml`, `src/lib/planner.ts` |
| 26 | **Exam-day orientation module**: NTS and scheduling, check-in, the testlet rhythm, pretest items and score release. | S | new `content/*/review/*.md` |

---

## Appendix A: how to rerun the scratch work

All paths are relative to the repo root. `eval-scratch/` is untracked. `eval-scratch/ui/node_modules` (212 MB) and the two build copies can be deleted and reinstalled.

| What | Command | Output |
|---|---|---|
| Content inventory (counts by section, Area, skill, format, letters, cue stats, duplicates) | `npx tsx eval-scratch/content/inventory.ts` | `eval-scratch/content/inventory.{md,json}` |
| Answer-cue ("test-wise") audit | `npx tsx eval-scratch/content/testwise.ts` | stdout; saved as `eval-scratch/content/testwise.md` |
| Stratified audit sample (seeded) | `npx tsx eval-scratch/content/sample.ts 20260923` | `eval-scratch/content/sample-{far,aud,reg,tcp}.json`, `sample-ids.md` |
| Repo-structure depth tables (module and unit level; superseded for coverage by the Blueprint matrices below) | `npx tsx eval-scratch/content/matrix.ts > eval-scratch/content/matrix.md` and `npx tsx eval-scratch/content/matrix-units.ts > eval-scratch/content/matrix-units.md` | module-level and unit-level tables |
| TBS self-consistency check | `python3 eval-scratch/content/tbs-selfcheck.py` | stdout. Its 4 current hits are regex false positives; the FAR bond error was found by recomputation. |
| Per-section accuracy audits (recompute scripts and dumps) | `python3 eval-scratch/content/far-audit/recompute.py`, `python3 eval-scratch/content/reg-audit/recompute_sample.py`, `python3 eval-scratch/content/reg-audit/recompute_outside.py`, `python3 eval-scratch/content/tcp-audit/recompute.py` | stdout; `tcp-audit/recompute-output.txt`; the AUD dumps are in `aud-audit/` |
| Planner hours per section | `npx tsx eval-scratch/efficiency/plan-hours.ts` | `eval-scratch/efficiency/plan-hours.txt` |
| Engine and math test suite (119 tests) | `npx vitest run --config eval-scratch/vitest.config.ts eval-scratch/engine` | Add `--reporter=verbose` for the measurements. The time-zone suite spawns runs under 8 `TZ` values. |
| One time zone directly | `TZ=Pacific/Kiritimati TZ_CHILD=1 npx vitest run --config eval-scratch/vitest.config.ts eval-scratch/engine/tzCases.test.ts` | — |
| UI, accessibility, performance, security scripts | `cd eval-scratch/ui && npm install`; then from the repo root `npm run build:app && npx vite preview --port 4173 --strictPort &`; then in `eval-scratch/ui`: `node flows.mjs` (run first; it creates `out/backup-export.json`), `node exam.mjs`, `node axe.mjs`, `node kbd.mjs`, `node skiplink.mjs`, `node hotkey-race.mjs`, `node responsive.mjs`, `node overflow320.mjs`, `node routes.mjs`, `node errors.mjs`, `node friction.mjs`, `node perf.mjs`, `node offline.mjs`, `node swupdate.mjs`. Prefix with `VP=mobile` for 390 px. Stop the server afterwards with `pkill -f "vite preview"`. | `eval-scratch/ui/out/*.json`, `eval-scratch/ui/shots/*.png` |
| Lighthouse | `CHROME_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome npx lighthouse http://localhost:4173/ --chrome-flags="--headless=new --no-sandbox" --only-categories=performance,accessibility,best-practices --output=json --output-path=eval-scratch/ui/out/lighthouse-mobile.json` (add `--preset=desktop` for desktop) | `eval-scratch/ui/out/lighthouse-*.json` |
| Blueprint extraction (Area → Group → Topic → tasks, with skill levels read from the PDF checkmarks) | `python3 eval-scratch/blueprint/extract.py <dir containing CPA_Blueprint___*.pdf> <out-dir>`, then `python3 eval-scratch/blueprint/outline.py <out-dir>` and `python3 eval-scratch/blueprint/skillmix.py <out-dir>`. Needs poppler-utils (`apt-get install poppler-utils`). Keep `<out-dir>` outside the repo, since the Blueprint text is AICPA copyright. | `<out-dir>/{FAR,AUD,REG,TCP}.json`; `eval-scratch/blueprint/skillmix.md` |
| Repo export used for Blueprint mapping | `npx tsx eval-scratch/blueprint/repo-items.ts` | `eval-scratch/blueprint/repo-items-<SEC>.json` |
| Blueprint coverage matrices (reviewer mapping; full task lists with ✓/✗, item classification, indexed-amount lists) | Read `eval-scratch/blueprint/coverage-{FAR,AUD,REG,TCP}.md`. To condense them for the report: `python3 eval-scratch/blueprint/condense.py FAR AUD REG TCP` | `eval-scratch/blueprint/condensed.md` |
| Phase 0 logs | `npm run lint`, `npm run typecheck`, `npx vitest run`, `npm run validate`, `npm run build:app`, `npm audit` | `eval-scratch/logs/*.log` |

## Appendix B: what to confirm once primary sources are reachable

The Blueprint PDFs you supplied settled the Blueprint questions (§3.1). Three things remain. Allow `www.aicpa-cima.com`, `www.irs.gov`, `asc.fasb.org`, `gasb.org`, `pcaobus.org`, `www.ecfr.gov` and `www.law.cornell.edu` in the environment's network settings, then check:

1. **The exam format.** It isn't in the Blueprints. Confirm MCQ and TBS counts per section, the testlet split (especially REG TBS 2/3/3), time, and the MCQ/TBS score weighting against `content/sections/*.yaml`.
2. **The testing policies.** Confirm the "CPA Exam Policy on New Pronouncements", which the REG and TCP Blueprints cite but don't reproduce, including whether the revised pronouncement policy applies. Also confirm the OBBBA special policy, and whether January-1-2026 statutory provisions are testable from July 1, 2026.
3. **The Inferred authority checks in §3.7.** In particular: UCC 9-322 (`reg-x2-08`), IRC §170(b)(2)(D) (the two charitable-limit TBS), §401(a)(9)(C)(v) (RMD age 75), ASC 275-10-50-20 (`far-nd-08`), ASC 450-30-50-1, ET 1.520 (referral fees), AS 1215 as amended (14 days), AR-C 90 (SSARS 25), and Rev. Proc. 2024-40 / Notice 2024-80 for the 2025 amounts.
