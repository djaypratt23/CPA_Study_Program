You are the accessibility and performance reviewer (journeys 9–10) in an exhaustive review of a CPA exam study platform at /home/user/CPA_Study_Program (React 19 + Vite PWA, HashRouter, IndexedDB via Dexie, Tailwind v4; pages in src/pages, components in src/components). Today is 2026-10-07.

**Review only.** Do not modify any file outside `review/`. Screenshots go to `review/screens/` (prefix every file name with `ua-`); outputs to `review/batches/U-a11y-perf/`. Don't commit or push. Don't add dependencies to the repo's package.json: Playwright is installed globally (`/opt/node22/lib/node_modules/playwright`; require by absolute path or set NODE_PATH) and Chromium is in `/opt/pw-browsers` (never run `playwright install`). For axe-core, install it into a scratch folder outside the repo, e.g. `mkdir -p /tmp/claude-0/ux && cd /tmp/claude-0/ux && npm init -y && npm i axe-core @axe-core/playwright` (registry.npmjs.org is reachable), and inject it. Put helper scripts in `review/batches/U-a11y-perf/scripts/`. Another reviewer covers journeys 1–8 on port 4173 — you use port **4174**: `dist/` was already built at HEAD by the baseline check — do not rebuild it; run `npx vite preview --port 4174 --strictPort` in the background.

Your scope (verbatim from the brief):
9. Accessibility: keyboard-only navigation, focus order, screen reader labels and live regions, color contrast in light and dark mode, reduced motion and font scaling. Run an automated check such as axe-core, plus a manual keyboard pass.
10. Performance: first load and section load on a throttled connection (Fast 3G profile), and responsiveness during long sessions.

Do it thoroughly: run axe on every main route (dashboard/onboarding, course, a module lesson with inline questions, quiz player in tutor and test modes incl. after reveal, flashcards, a TBS of each part kind — numeric, dropdown, journal, docreview, research, review — exam home and exam player incl. calculator and break screens, planner, analytics, search, glossary, notes, settings, final review) in light and dark mode (check how the app toggles theme: settings and/or prefers-color-scheme emulation) at desktop (1366×900) and phone (390×844) sizes; do a manual keyboard-only pass of the core flows (tab order, visible focus, skip link, modal focus traps, Escape, keyboard shortcuts A–D / 1–3 / arrows in quiz and exam, the spreadsheet/calculator); check screen-reader semantics (landmarks, headings, labels on inputs and icon buttons, aria-live for timers/feedback/score, role of choice lists, dialog semantics) by reading the accessibility tree (page.accessibility.snapshot or ariaSnapshot) and the code; contrast in both themes; prefers-reduced-motion emulation; 200% text zoom / font scaling (no clipped text, no horizontal scroll at 390px). Performance: first load and a section/lesson load on a throttled connection (CDP Network.emulateNetworkConditions with Fast 3G: ~1.6 Mbps down, 750 Kbps up, 150 ms RTT; plus 4× CPU throttling), report bytes transferred, JS bundle sizes (inspect dist/assets), time to first render and to interactive content; and responsiveness during a long session (e.g., answer 100+ questions in a row or open many lessons; watch for growing memory, slow renders, long tasks > 50 ms via PerformanceObserver).

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

Write findings to `review/batches/U-a11y-perf/findings.jsonl` (local ids `U-a11y-perf-001`…; `category` accessibility or performance; `section` "ALL" unless specific; `item` the route or component; `file` the source file; `evidence` must name screenshot path(s), the axe rule id(s) and node selectors or the measured numbers; include expected/observed/steps). Every S1/S2 needs evidence and a concrete fix. Group repeated instances of one axe rule into one finding listing the routes. Also write `ledger.csv` containing only the header `id,type,reviewed,findings_count,note`, and `notes.md` with the axe summary table per route/theme/viewport, the keyboard pass narrative, performance measurements, and anything you couldn't test and why. Run `python3 review/tools/merge_batch.py U-a11y-perf --check` at the end and fix any PROBLEM it reports.

Final reply (under 200 words): counts by severity, the top 5 issues in one line each.
