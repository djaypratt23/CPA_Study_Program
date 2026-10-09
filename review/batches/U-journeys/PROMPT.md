You are the usability reviewer (journeys 1–8) in an exhaustive review of a CPA exam study platform at /home/user/CPA_Study_Program (React 19 + Vite PWA, HashRouter, IndexedDB via Dexie; pages in src/pages, components in src/components). Today is 2026-10-07.

**Review only.** Do not modify any file outside `review/`. Write screenshots to `review/screens/` (prefix every file name with `uj-`), and your outputs to `review/batches/U-journeys/`. Don't commit or push. Don't add dependencies to the repo's package.json: Playwright is installed globally (`/opt/node22/lib/node_modules/playwright`; set NODE_PATH or require it by absolute path) and Chromium is at `/opt/pw-browsers` (PLAYWRIGHT_BROWSERS_PATH is set; if needed launch with executablePath under /opt/pw-browsers/chromium-1194). Never run `playwright install`. Put any helper scripts in `review/batches/U-journeys/scripts/`. Another reviewer covers accessibility and performance (journeys 9–10) on port 4174 — you use port **4173**.

Setup: `dist/` was already built at HEAD by the baseline `npm run check` — do not rebuild it (another reviewer serves the same dist). Run `npx vite preview --port 4173 --strictPort` in the background. Use a fresh browser context per journey where a first visit matters. Drive both a desktop viewport (1366×900) and a phone viewport (390×844, isMobile, hasTouch). Capture console errors and page errors for every journey (record them in notes).

Walk these journeys end to end and record friction, bugs and console errors (verbatim from the brief):
1. A first visit, onboarding, choosing sections and the exam date, and the first dashboard.
2. Opening the course, reading a full lesson (including inline questions, highlights and notes), and marking it complete.
3. Practicing a module, a mixed set and a review queue session. Include right and wrong answers, confidence ratings, flagging and explanations.
4. Flashcard sessions.
5. A full TBS of each part kind: numeric, dropdown, journal, docreview, research and review. Check the scoring display.
6. A full mock exam. Check timing, navigation between testlets, the flag-for-review tool, the calculator and other exam tools, submission, scoring and review.
7. The study planner, analytics, search, glossary, notes, settings, and data export and import.
8. Behavior when offline or installed as a PWA, reload in the middle of a session, and the update prompt.

For each, actually do it: e.g. answer MCQs right and wrong, use each confidence rating, flag, read explanations; complete a TBS of each part kind (numeric, dropdown, journal, docreview, research, review — find TBS ids with those kinds via `grep -l '"kind": "journal"' content/*/tbs/*.json` etc.) including a deliberately perfect response (it must score 100%) and a partially wrong one; run a full mock exam (you may answer quickly, but exercise timing display, testlet navigation and locking, flag-for-review, calculator and other tools, the break, submission, scoring and the review screen); planner with a few exam dates/hours (including edge cases: exam date tomorrow, exam date in the past, 1 hour/week, 60 hours/week); export then import data (check round-trip); go offline (context.setOffline(true)) after first load and reload; reload mid-quiz, mid-TBS and mid-mock and check what's preserved; look for the update prompt behaviour (src/components/UpdatePrompt.tsx — read the code to judge it even if you can't trigger it).

Read the relevant page/component code when something looks wrong so you can name the file/component.

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

Write findings to `review/batches/U-journeys/findings.jsonl` (one JSON per line; local ids `U-journeys-001`…; `category` usability; `section` the exam section or "ALL"; `module` "" unless specific; `item` the route or component, e.g. "#/exam/far-mock-1" or "src/pages/ExamPlayer.tsx"; `file` the source file; `evidence` must name the screenshot path(s) and reproduction steps; include "expected" and "observed" in `issue` or as extra fields `expected`/`observed`/`steps`). Every S1/S2 needs a screenshot, steps and a concrete fix. Also write `review/batches/U-journeys/ledger.csv` containing only the header line `id,type,reviewed,findings_count,note` (this batch has no content items), and `notes.md` with: per-journey narrative (what you did, what worked, what didn't), console errors seen, and anything you couldn't test and why. Run `python3 review/tools/merge_batch.py U-journeys --check` at the end and fix any PROBLEM it reports.

Final reply (under 200 words): counts by severity, the top 5 issues in one line each.
