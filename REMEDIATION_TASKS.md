# Remediation tasks for the CPA Study Program

This is a hand-off for an implementing agent. It lists every correction from [`EVALUATION.md`](EVALUATION.md) (evaluated 2026-09-23 to 2026-09-25 at commit `d5f0596`) as an actionable task: what to change, where, and how to prove it's done. The evidence behind each task is in `EVALUATION.md` (the § references) and in `eval-scratch/`.

---

## 0. Read this first

**Repo facts**
- The app is a React 19 + TypeScript + Vite PWA with no backend. Progress is stored in IndexedDB via Dexie.
- **All study content is data** under `content/`. It is validated by Zod schemas in `src/content/schema.ts` and by cross-reference and coverage rules in `src/content/build.ts`.
- **Gate:** `npm run check` runs lint, typecheck, then build. The build runs `vitest`, then `npm run validate`, then `vite build`. CI runs the same steps on every push; see `.github/workflows/ci.yml`.
- **Deploys:** a push to `main` deploys to production on Cloudflare Pages and GitHub Pages. **Do not push to `main`.** Work on a branch and open a PR.
- **Content rules the validator enforces:**
  - 4 choices per MCQ, each with an explanation.
  - Every distractor names a `trap`, and the correct choice has none.
  - Journal entries balance.
  - Dropdown and doc-review answers must be among the options.
  - `full` sections need at least 10 practice MCQs and 5 flashcards per module, 2 practice TBS per unit, and an exam form that matches the YAML testlets.
- **Uncertain content:** set `"needsReview": true` with a `reviewNote`, and list the item in `REVIEW.md`.

**Ground rules for this work**
1. **Keep to the list.** Change only what a task specifies. For each changed answer key, add the authority to the item's explanation and add a line to `REVIEW.md` under a new heading, "Changed in remediation (confirm)".
2. **Keep AICPA Blueprint text out of the repo.** Use short paraphrases only; the Blueprint PDFs are AICPA copyright. The Blueprint-derived task lists are already in `eval-scratch/blueprint/coverage-<SEC>.md`.
3. **Add regression tests.** Every engine change needs one in `tests/`. The existing suite includes a test proving every TBS answer key scores 100% against its own schema, and it must stay green.
4. **Run the gate.** Run `npm run check` before every push. For content-cue work, also run `npx tsx eval-scratch/content/testwise.ts` (§3.6 metric).
5. **Split the work.** Use one PR per workstream (the suggested batching is in §5).

**Decisions a human must make.** These tasks are marked **[DECISION]**; don't guess.
- **D1:** the REG/TCP re-scope approach (task P0-8).
- **D2:** whether to add a 2026 tax-law layer or date every stem as 2025 (task P1-6). This depends on the AICPA New Pronouncements policy, which hasn't been verified.
- **D3:** the accounting treatment for `far-ppe-10` (government grant to a business; ASU 2025-10).
- **D4:** whether missed mock-exam items enter the spaced-review queue at all, or only after the learner finishes their final mock (task P0-7).
- **D5:** confirm the exam format (MCQ and TBS counts, testlet split, time, weighting) from the AICPA exam-format page. It is not in the Blueprints (task P0-10).

---

## 1. P0: fix before anyone relies on scores

### P0-1 Six Critical answer-key defects [S]

Evidence is in EVALUATION.md §3.7, and the arithmetic is Verified by `eval-scratch/content/*-audit/` scripts.

| Item | File | Change | Authority |
|---|---|---|---|
| `reg-x2-08` (**in the REG mock**) | `content/reg/exam-questions/reg-exam-areas1-3.json` (about lines 638–664) | Change `answer` from `d` to **`a`** (the March 1 filer). The possessory party's interest could not attach, and so could not be perfected, until value was given on March 5, which is after the March 1 filing. **Rewrite:** choice a's explanation as the correct rationale, and remove its `trap`; choice d's explanation to "Possession on Feb 15 can't perfect before attachment; value was given Mar 5", with `trap: "wrong-rule"`; and the overall explanation. | UCC 9-203(b), 9-308(a), 9-322(a)(1) |
| `reg-tbs-u6-corporate-ti` | `content/reg/tbs/reg-tbs-u6-corporate-ti.json` | The charitable base is after the NOL **carryforward**; only carrybacks are ignored. **New keys:** `ch` 44,200 (10% × (542,000 − 100,000); 5,800 carries forward); `ti` **358,800**; `tax` **75,348**. **Update explanations:** `drd` (the limit check now uses 65% × 497,800), `nol` (80% × 458,800 = 367,040, which doesn't bind), `ti`, `tax`. `pre` (542,000) and `drd` (39,000) are unchanged. | IRC §170(b)(2)(D); the repo's own `reg-c-corp-income/lesson.md:33` agrees |
| `tcp-tbs-x2-corporate` (**in the TCP mock**) | `content/tcp/tbs/tcp-tbs-x2-corporate.json` | Same error. **New keys:** `ch` **45,000** (10% × (650,000 − 200,000); carryforward **25,000**, which also fixes the "5,000" in the explanation); `m1` (line 28) **605,000**; `ti` **372,500**; `tax` **78,225**. **Explanation updates:** `nol` (80% × 572,500 = 458,000, full 200,000 allowed). `drd` 32,500 is unchanged. | IRC §170(b)(2)(D) |
| `tcp-tbs-u2-retirement-education` row `d3` | `content/tcp/tbs/tcp-tbs-u2-retirement-education.json` (about line 98) | Leo is 50 in 2025, so he was born around 1975 and his RMD age is **75**. Add `"75"` to the options and key it. Explanation: "Born 1960 or later → 75 (SECURE 2.0 §107)." | IRC §401(a)(9)(C)(v) |
| `far-tbs-u8-bonds` | `content/far/tbs/far-tbs-u8-bonds.json` | Keys disagree with the exhibit's own factors. **New keys:** `p` **1,837,774**; `c1` **1,851,285**; `i2` **74,051**. `i1` 73,511 and the June 30 journal entry are unchanged. Add "Use the present value factors provided" to the instructions. **Optional, for consistency:** the Year-3 stem carrying amount becomes **1,895,147**; `ca` becomes **947,574**; `gl` becomes **−22,426**. | Arithmetic (Verified) |
| `far-nd-08` | `content/far/modules/far-notes-disclosures/questions.json` (about line 333) | No choice is correct. The loss of any customer in the near term is *always* considered at least reasonably possible, so a 45%-of-revenue customer concentration must be disclosed. **Rewrite:** make the correct choice "Yes — the near-term loss of any customer is always deemed at least reasonably possible", and turn the current key into a `wrong-rule` distractor. Also add the rule to `far-notes-disclosures/lesson.md` (about line 92) and to a flashcard. | ASC 275-10-50-18, -50-20 |

**Acceptance:**
- `npm run check` is green.
- A new test, `tests/remediationKeys.test.ts`, asserts each corrected key and that a perfect response scores 100%.
- The six items are listed in `REVIEW.md` under "Changed in remediation".

### P0-2 High-severity content items [S–M]

| Item | File | Change |
|---|---|---|
| `aud-wr-10` | `content/aud/modules/aud-written-representations/questions.json:413` | The dollar amounts in the stem were stripped. Restore them, e.g. "uncorrected misstatements total **$40,000**; materiality is **$100,000**". The key `b` stays. |
| `far-ppe-10` **[DECISION D3]** | `content/far/modules/far-ppe-acquisition/questions.json:406` | The treatment is unsettled (ASC 958-605 excludes government-to-business transfers; ASU 2025-10). Either rewrite it to a settled fact pattern, or align it to ASU 2025-10 once it is confirmed testable. Keep `needsReview` until then. |
| `far-tbs-u7-equity` row `m5` | `content/far/tbs/far-tbs-u7-equity.json:26` | Only "measurement alternative" is accepted, but FV-NI is the default. Add "Glenco elected the measurement alternative" to the exhibit, or re-key the row to fair value through net income. |
| `far-lso-07` | `content/far/modules/far-leases-operating/questions.json:304` | Ambiguous. Add payment-pattern facts (e.g., rent-free first months) so the accrued-rent explanation follows, and change choice c's explanation so it doesn't call impairment "a possible cause". |
| `tcp-tbs-u3-estimates-consolidated` | `content/tcp/tbs/tcp-tbs-u3-estimates-consolidated.json:17` | The exhibit says "expects $600,000 of 2025 tax (consolidated)", but part c computes $147,000. Make part e self-contained, e.g. prompt "For this part only, assume Pine's expected 2025 tax is $600,000 and ignore part c", or redesign so the facts agree. |
| `tcp-tbs-x4-property` row `dep` | `content/tcp/tbs/tcp-tbs-x4-property.json:74` | Tolerance 0 rejects the IRS table result (79,287) and the unrounded 79,166.67. Either set tolerance to about 150, or add "compute with the mid-month formula, not the tables" and set tolerance 1. |
| `tcp-tbs-u6-multistate-liquidation` rows `eq`, `dw` | `content/tcp/tbs/tcp-tbs-u6-multistate-liquidation.json:31, 45` | Add "(without throwback)" to the labels. The percent-format issue is fixed in P0-3. |
| `aud-tbs-u3-analytics` row `k1` | `content/aud/tbs/aud-tbs-u3-analytics.json:61` | "Cost of sales — completeness" is also defensible. Add a fact that rules it out (e.g., inventory counts and cutoff tested clean), or re-key. |
| AUD Code of Conduct lesson | `content/aud/modules/aud-code-of-conduct/lesson.md:36, 142` | Referral fees require **disclosure**; *commissions* are prohibited for certain attest clients (ET 1.520). Contingent fees are prohibited only for audit, review, compilation (without an independence-impairment disclosure) and PFI-examination clients (ET 1.510). Fix any matching flashcards and items. |

**Acceptance:** `npm run check` is green, and each item is noted in `REVIEW.md`.

### P0-3 TBS scoring fairness [S]

Evidence: EVALUATION.md T-H1, T-H2 and T-H7; `eval-scratch/engine/tbsScoring.test.ts`.

1. **Percent input.**
   - In `src/lib/tbsScoring.ts` `parseAmount` (lines 41–56), accept a trailing `%` (`"25%"` → 25), the Unicode minus `−` (U+2212), and `$(1,000)`.
   - Do **not** accept `0.25` for a `25` key.
   - Add an optional `unit: "$" | "%" | "x" | "years" | "days"` to numeric rows in `src/content/schema.ts`. Render it as an input adornment in `src/components/TbsView.tsx` (the hint at line 175 currently says "Enter whole dollars").
   - Set `unit: "%"` on the 15 real percent cells:
     - `aud-tbs-u3-analytics`: gm, alw
     - `aud-tbs-u3-risk-materiality`: dr
     - `aud-tbs-u6-sampling`: sr, al
     - `aud-tbs-x3-risk`: dr
     - `aud-tbs-x4-sampling`: sr, al
     - `far-tbs-u2-analysis`: roe
     - `reg-tbs-u2-bankruptcy`: pct
     - `tcp-tbs-u6-multistate-liquidation`: eq, dw, ss
     - `tcp-tbs-u7-exchange-installment`: gp
     - `tcp-tbs-x3-entity-planning`: pct
2. **Journal-entry hedging.** In `scoreJournal` (about line 170), the line `if (part.lines.some(e => e.account === l.account)) return` lets candidates list every account on both sides at no cost.
   - Penalize every unmatched non-blank line.
   - To avoid double penalties, skip the penalty only when that same line is the one that produced a wrong expected-cell result.
   - Duplicated correct lines must also cost credit.
3. **Negative amounts on iOS.**
   - Files: `TbsView.tsx:167, 238, 248` and `LessonBlocks.tsx:75`, which use `inputMode="decimal"`. The iOS decimal keypad has no "−" or "(", so negatives can't be entered.
   - Fix: use `inputMode="text"` with `pattern` validation, or add a ± toggle.

**Acceptance.** Tests in `tests/tbsScoring.test.ts` prove:
- `"25%"` scores correctly for a `%` row;
- the both-sides hedged journal entry scores below 100%;
- duplicate lines are penalized;
- all existing TBS still score 100% with perfect responses.

### P0-4 Data safety [S–M]

Evidence: EVALUATION.md T-C1, T-H5 and T-M10.

1. **`importBackup`** (`src/db/index.ts:93-104`):
   - Validate with Zod per table, and check `version === 1`.
   - Reject rows with missing required fields.
   - Tables missing from the file must be **kept, not cleared**, unless the user chooses "replace everything".
2. **`SettingsPage.tsx`** (lines 27–34 and 143):
   - Before importing, show a confirmation with the row counts per table.
   - Auto-download a backup of the current data first.
3. **Root error boundary** in `src/App.tsx`, with "Export data" and "Reset app" actions. Also guard `getSection(...)!` in `Dashboard.tsx:25` and `Analytics.tsx:17` (fall back to the first section).
4. **Persistent storage.** Call `navigator.storage.persist()` at onboarding and show the result in Settings.
5. **IndexedDB unavailable** (`App.tsx:56`, private mode): show an explanatory message instead of "Loading…" forever.

**Acceptance:** tests in `tests/db.test.ts` show that an empty, partial or malformed backup does not wipe or corrupt data. The repro scripts `eval-scratch/ui/errors.mjs` no longer produce a blank screen.

### P0-5 Service-worker updates [S]

Evidence: EVALUATION.md T-H4.

- In `vite.config.ts:46`, switch `registerType: 'autoUpdate'` to `'prompt'`.
- In `src/main.tsx`, show a "New version — reload" toast, and never auto-reload while on `/exam`, `/quiz` or `/tbs`.
- Make the notes fields (`ModulePage.tsx:229`, `McqView.tsx:108`) save on a debounced change, not only on blur.

**Acceptance:** `eval-scratch/ui/swupdate.mjs` shows no data loss.

### P0-6 Remove answer cues [S engine + L content]

Evidence: EVALUATION.md §3.6 and T-M14.

1. **Engine.** Shuffle MCQ choices per session with the seeded RNG (`src/lib/random.ts`), in quiz, review and exam.
   - Display letters A–D map to the stored choice ids. Attempts keep storing the original id.
   - The A–D hotkeys follow display order.
   - Files: `src/components/McqView.tsx:131`, `src/pages/QuizPlayer.tsx`, `src/pages/ExamPlayer.tsx`.
2. **Validator** (`src/content/build.ts`): add a cue lint per section and pool.
   - The correct choice may be the unique longest in at most 35% of items.
   - The mean length ratio of the correct choice to the average distractor must be at most 1.25.
   - Each key letter must fall between 18% and 32% of the pool.
   - Start as a warning, then make it an error once the content passes.
3. **Content.** Rewrite distractors to parallel length and specificity, **AUD first** (currently 77.6% of practice and 82.7% of mock items are answerable by picking the longest choice), then REG, TCP and FAR. Avoid hedge-vs-absolute patterns (one hedged choice against "always" and "never").

**Acceptance:** `npx tsx eval-scratch/content/testwise.ts` shows the "longest choice" score at or below 35% for every section and pool, and the lint passes as an error-level rule.

### P0-7 Exam realism (engine) [M]

Evidence: EVALUATION.md T-M1, T-M5, T-M7, T-M8 and UI M9.

1. **Wall-clock timer.** In `src/pages/ExamPlayer.tsx:64-79`, store `endsAt` and derive the remaining time from `Date.now()`.
   - "Pause & exit" must not stop the clock; only the scheduled break pauses it.
   - Persist state on `pagehide` and `visibilitychange`.
   - Apply the same approach to timed practice sets, and make them auto-submit at 0 (`QuizPlayer.tsx:69, 122`).
2. **Test-mode score.** Divide by *all* items, not just answered ones (`QuizPlayer.tsx:203-211`), and show skipped items.
3. **Mock time data.** Record per-item `timeMs` for mock MCQs; they currently record `timeMs: 0` (`ExamPlayer.tsx:52`).
4. **Mock/practice separation [DECISION D4].** Mock items must not enter practice review or mastery. Stop `recordMcqAttempt` from scheduling SRS for `mode: 'exam'`, or defer it. Exclude exam-mode attempts from practice accuracy and mastery. Remove "Missed questions were added to your spaced review queue" (`ExamPlayer.tsx:305`) accordingly.
5. **Hide skill chip.** Don't show the skill-level chip in exam mode.
6. **Area breakdown.** In `src/lib/examScoring.ts:27,33`, weight the per-area breakdown by the MCQ/TBS weighting, or report MCQ and TBS separately per area.

**Acceptance:** new tests cover the timer (with a mocked `Date.now`), test-mode scoring, per-area weighting, and the exclusion of exam attempts from SRS and mastery.

### P0-8 Re-scope REG and TCP to the 2026 Blueprints [M–L] [DECISION D1]

Evidence: EVALUATION.md §3.2 point 2, §3.3(b), and `eval-scratch/blueprint/coverage-{REG,TCP}.md`.

- **Out of scope in REG.** 91 of 323 REG MCQs (28%) are TCP-scope or otherwise off the REG References. The REG mock has 19 of 72 MCQs and 1 of 8 TBS out of scope.
- **Missing from REG.** REG lacks cost recovery (III.B) and SALT nexus/apportionment (V.B.2).

**Move REG → TCP** (or mark as REG-optional), with item ids in `coverage-REG.md` §(d): AMT; passive-activity and at-risk rules; gift tax; like-kind and §1033 exchanges; §1231/1245/1250; installment sales; E&P and corporate distributions; redemptions; liquidations; trusts; UBTI and exempt status; kiddie tax. Mostly affected modules: `reg-corp-distributions`, `reg-corp-formation-liquidation`, `reg-nontaxable-exchanges`, `reg-amt-other-taxes`.

**Move TCP → REG:** the `tcp-cost-recovery` computations (MACRS, §179, bonus, amortization) and the Schedule M-1/M-3 items (ids are in `coverage-TCP.md` §(d)).

**Add to REG:**
- MACRS, bonus and §179 computation (III.B);
- nexus, apportionment, UDITPA and P.L. 86-272 (V.B.2);
- ACA employer and qualified-health-plan items, worker classification and the FCPA (II.D);
- S-corp ordinary income and separately stated items (V.C.2);
- state boards of accountancy (I.B).

**Update:**
- `content/sections/{reg,tcp}.yaml` (the unit and module lists);
- `docs/BLUEPRINT_NOTES.md`;
- the REG mock (`content/reg/exams/reg-mock-1.json`), replacing off-scope items with in-scope exam-pool items;
- the TCP mock.

**Acceptance:** re-running the mapping method in `coverage-REG.md` finds 0 out-of-scope items in the REG mock and at most 5% in REG practice. `npm run validate` passes with both sections `full`.

### P0-9 Stale AUD rules [S–M]

Evidence: EVALUATION.md §3.7 and §3.8.

1. **PCAOB documentation-completion period: 45 days → 14 days.** AS 1215 as amended by AS 1000 phases this in for fiscal years beginning on or after 12/15/2024 at firms issuing more than 100 issuer audit reports, and on or after 12/15/2025 at other firms. Update:
   - `aud-ev-06` (`aud-evidence-assertions/questions.json:275`, explanations at 288 and 304);
   - `aud-ev-chk2` (line 71);
   - `aud-evidence-assertions/lesson.md:35, 92` and its flashcards (line 30);
   - `aud-tbs-u6-confirmations.json:87` (explanation at 95);
   - `aud-x3-04` choice d (`exam-questions/aud-exam-area3.json:132`);
   - `review/aud-report-guide.md:38`;
   - `review/aud-mnemonics.md:17`.
2. **SSARS 25.** A known departure in a review is a qualified or adverse conclusion, not "disclose the departure". Update `aud-ssars/lesson.md:35`, `aud-ss-07` (`aud-ssars/questions.json:309`) and `aud-x4-12` (`exam-questions/aud-exam-area4.json:388`).
3. **AS 1000.** In `aud-professional-standards/lesson.md:38`, replace the superseded AS 1001/AS 1015 citations with AS 1000.

**Acceptance:** `grep -rn "45 days\|45-day" content/aud` returns only historical or explicitly labelled references, and `npm run check` is green.

### P0-10 Confirm exam format and testing policies [S] [DECISION D5]

This needs network access to aicpa-cima.com, which the evaluation couldn't reach.
- Confirm the MCQ and TBS counts, testlet split (REG TBS 2/3/3), time and weighting against `content/sections/*.yaml`.
- Confirm the "CPA Exam Policy on New Pronouncements" and the OBBBA special policy.
- Record them in `docs/BLUEPRINT_NOTES.md`.

---

## 2. P1: make the signals trustworthy and close coverage gaps

### P1-1 Readiness v2 and mastery [M]

Evidence: EVALUATION.md T-H3, T-M6, §4.

- **TBS in readiness.** `src/lib/studyState.ts:136` and `src/lib/analytics.ts:168-230` use MCQs only. Blend TBS performance using the section's MCQ/TBS weighting.
- **Accuracy basis.** Use first-attempt accuracy on items unseen before; don't count repeats.
- **Mocks.** Exclude mock attempts from practice accuracy, and use them only in the mock blend.
- **One scale.** Put readiness on the same scale as the mock's `approxScaledScore` (65% raw → 75), and show an uncertainty band.
- **Mastery** (`src/lib/mastery.ts:26-27`): require at least 3 **distinct** items per qualifying day, and exclude `review` mode.

**Acceptance:** tests show repeats don't inflate readiness, TBS results move readiness, and one repeated question can't produce "mastered".

### P1-2 Engine robustness [S–M]

Evidence: EVALUATION.md T-M2, T-M3, T-M4.

- **Double submissions.** Add in-flight guards and disable the submit buttons (`QuizPlayer.tsx:65-107, 170`; `ExamPlayer.tsx:44-61, 92-96`; `TbsPage.tsx:50-55`). Make attempts idempotent on `(sessionId, itemId)`.
- **Transactions.** Record the whole exam in one Dexie transaction together with `finishedAt`.
- **Stale snapshots.** Replace whole-array `testlets` writes with key-path updates (`testlets.${i}.mcqAnswers.${id}`), or modify them inside a transaction (`ExamPlayer.tsx:86-89`, `QuizPlayer.tsx:71-72`).
- **Tab lock.** Add a single-tab lock for exams using BroadcastChannel.
- **Clock skew.** In `src/lib/srs.ts:49-51`, clamp the review time to be no earlier than `last_review`. Write the attempt and the SRS update in one transaction (`src/db/actions.ts:43-44`).

**Acceptance:** the repros in `eval-scratch/engine/srsDb.test.ts` (clock skew, double submission) and `eval-scratch/ui/exam.mjs` (answer loss on fast navigation) no longer fail.

### P1-3 Validator hardening [S]

In `src/content/schema.ts` and `src/content/build.ts`, add checks for:
- duplicate TBS part and row ids;
- a doc-review segment carrying both `text` and `id` (use a discriminated schema);
- exam weights of 0, or negative;
- allocation min > max;
- `breakAfterTestlet` beyond the last testlet;
- duplicate exam-form ids;
- the same item twice in a form;
- a TBS whose unit or modules belong to another section;
- an explicit `tolerance` required on non-integer numeric answers.

Also add a **skill-mix report** comparing each section's actual skill mix with the YAML `skillAllocation` (warning level), and an optional `blueprint: ["II.B", …]` topic tag on modules, so coverage can be checked automatically (see P1-7).

**Acceptance:** fixtures in `tests/content.test.ts` cover each rule (see `eval-scratch/engine/contentBuild.test.ts` for the current gaps).

### P1-4 Analysis-level simulations [L]

Evidence: EVALUATION.md §3.2 point 1, §3.4, §3.5.

Only 22 of the Blueprints' 70 analysis and evaluation tasks are covered at level (FAR 7/19, AUD 14/23, REG 0/14, TCP 1/14). The Blueprint's analysis tasks are mostly *review a schedule, return or statement against supporting documentation and source data, and fix the discrepancies* (REG adds *resolve automated diagnostic flags*).

1. **Engine.** Add a TBS part kind, e.g. `review`: an exhibit table of prepared amounts plus source documents. The candidate flags the erroneous rows and enters corrected amounts, scored per row.
   - Files: `schema.ts`, `TbsView.tsx`, `tbsScoring.ts`, plus tests.
2. **Content.** At least 2 per unit where the Blueprint has analysis tasks:
   - **FAR:** subledger-to-GL reconciliations and roll-forwards for receivables, inventory, PP&E and payables; statement-to-source-data discrepancy tasks for the balance sheet, income statement, equity, cash flows and consolidations.
   - **REG:** reviewing a depreciation schedule against source data and diagnostic checks; reviewing individual and entity returns against source documents.
   - **TCP:** reviewing basis schedules; reviewing the Form 4797 netting; comparing planning alternatives.
   - **AUD:** interpreting analytics output (exception reports, visualizations); evaluating analytical-procedure differences; concluding on sufficiency of evidence; judging the effect of deficiencies on the nature, timing and extent of procedures.
3. **MCQs.** Add analysis-level MCQs, and relabel over-labelled items. The label audit is in `coverage-*.md` §(d); repo "analysis" labels are mostly computation.

**Acceptance:** re-mapping shows at least 70% of analysis and evaluation tasks covered at level in each section.

### P1-5 Inflation-indexed amounts [M]

Evidence: EVALUATION.md §3.8. The REG and TCP Blueprints state that indexed amounts aren't tested.

- **Items.** State the figure in the stem or exhibit for every item that currently requires recalling it. That is REG 20 MCQs and 5 TBS, and TCP 15 MCQs and 3 TBS; the exact ids are in `eval-scratch/blueprint/coverage-REG.md` §(e) and `coverage-TCP.md` §(e). Example of the target style: `tcp-tbs-u2-gift-709`.
- **Review sheets.** Re-purpose the indexed-amount rows (REG 14/37, TCP 16/50) of `content/{reg,tcp}/review/*-numbers.md` into a "given on the exam; don't memorize" note, and refocus the sheets on statutory rules.
- **Flashcards.** Retire or rewrite the indexed-amount flashcards (REG 15, TCP 11).

**Acceptance:** a re-scan finds no item that requires recalling an unstated indexed amount.

### P1-6 Tax currency [M] [DECISION D2]

- **Date stems.** Date every tax stem ("in 2025"). Stems that currently change answer under 2026 law: `reg-cr-01` (`reg-individual-credits/questions.json:111`) and `reg-id-02`.
- **RMD age 75** (born 1960+). Fix `tcp-numbers.md:44`, `tcp-retirement-education/lesson.md:35, 107`, the related flashcards, and `tcp-ip-08`, where age 72 has no RMD in 2025; use 74.
- **§529 K-12.** Broadened after July 4, 2025, with a $20,000 cap from 2026. Fix `tcp-numbers.md:45` and `tcp-retirement-education/lesson.md:36, 107`.
- **2026 statutory changes** (if D2 says so). Add the 0.5%/1% charitable floors, the non-itemizer charitable deduction, the 50% dependent-care credit rate, and the §1202 tiers for stock issued after July 4, 2025.

### P1-7 Blueprint topic gaps [L]

Evidence: EVALUATION.md §3.2 point 3. The full uncovered-task lists are in `coverage-<SEC>.md` §(c).

- **AUD:**
  - single audits under the Uniform Guidance (II.G.4, III.E.6);
  - compliance audits (AU-C 935) and compliance attestation (AT-C 315);
  - GAGAS engagements and reporting (I.C.2, IV.E.5);
  - ERISA plan audits and DOL independence;
  - data structure and preparation (III.A.1);
  - ICFR integrated-audit reporting;
  - economics (supply and demand, business cycles);
  - SOX governance; limitations of controls; IT infrastructure;
  - PCAOB AS 2310 (confirmations), QC 1000, technology-assisted analysis, and SAS 149 terminology.
- **TCP:**
  - international tax (II.A.4, 6 tasks);
  - imputed interest and below-market loans;
  - C-corp NOL (80% limit) and capital-loss utilization;
  - §311(b) noncash distributions for C and S corporations;
  - personal financial planning (investment risk, insurance, beneficiary designations);
  - S-corp planning analyses;
  - partnership recourse and nonrecourse debt allocation;
  - §1033; §267(c).
- **FAR:**
  - **purchased software and cloud computing (II.F)**; the intangibles lesson wrongly defers these to BAR, so fix that text;
  - foreign-currency transaction gains and losses (I.A.2);
  - debt covenant calculations (II.H.2);
  - exit and disposal liabilities (II.G);
  - debt modification and extinguishment, and TDR;
  - budget-to-actual and EBITDA metrics;
  - not-for-profit cash-flow and notes tasks;
  - ASU 2024-03 (DISE) and ASU 2025-05 (CECL practical expedient).
- **REG:** see P0-8. Also the decedent's final return, regular-tax computation, C-corp credits, FBAR, the preparer definition, and contract discharge.

**Acceptance:** re-mapping shows 0 Missing topics and at most 10% Thin topics per section.

### P1-8 Medium content fixes [S]

Evidence: EVALUATION.md §3.7.

- **FAR:**
  - `far-lso-01`: choice b explanation ($32,240 is finance-lease expense).
  - `far-cont-02`, `far-tbs-u12-contingencies` t3, `far-contingencies/lesson.md:32, 110`: gain-contingency disclosure "shall" be made, not "is allowed".
  - `far-tbs-u1-cash-flows` row c4: its van-for-note fact contradicts the exhibit.
  - `far-dsec-10`: the price is semiannual but the stem says annual.
  - `far-rev2-10`: contradictory stem wording.
  - `far-tbs-u4-government-plans`: a governmental plan follows GASB, not ASC 962.
  - `far-special-purpose/lesson.md:30`: the unearned-revenue formula is garbled.
  - `far-tbs-x2-bonds`: add "Use the present value factors provided".
- **REG:**
  - `reg-c230-07`: cite §10.34(d), not §10.22.
  - `reg-pb-03` and `reg-property-basis/lesson.md:106`: the 2025 gift exclusion is $19,000.
  - `reg-tbs-x4-individual:33`: label "Total income", not "Gross income".
  - `reg-x5-02`: the charitable base wording ("before … NOL").
  - `reg-tbs-x5-research`: March 16, 2026 due date (§7503).
  - `reg-tbs-u7-partnership`: the SE label.
- **TCP:**
  - `tcp-cr2-01`: choice d's rationale.
  - `tcp-tbs-x1-gift-retirement` bx: specify "using the 2025 amount".
  - `tcp-tbs-u3-m1`: the book tax expense doesn't reconcile.
  - `tcp-sc2-01`: the Form 2553 date falls on a weekend.
- **AUD:**
  - `aud-sa-04`: the projected misstatement equals the stem's audited value; change the numbers.
  - `aud-tbs-x1-independence` s2: the explanation is irrelevant to the facts.
  - `aud-x1-04`: "more than 5%" wording.
  - `content/aud/modules/aud-using-others/lesson.md:108`: SAS 149 terminology.
- **Low-priority nits:** in the `*-audit` reports under `eval-scratch/content/`.

### P1-9 More mock forms [L]

Add at least 2 more forms per section (the validator already enforces testlet structure). They should be built from the corrected, de-cued, re-scoped exam pool, with no overlap with practice items.

### P1-10 Exam tools and pacing [M]

Evidence: UI M9, §4.

- **Tools.** Add highlight and strikeout on stems and choices, a spreadsheet tool, and search over the bundled research excerpts.
- **Pacing.** After each set, show time per item against a target. Track testlet pacing in the mock.

### P1-11 Accessibility and mobile [S–M]

Evidence: T-H6, T-M9, T-M11, T-L6, T-L7.

- **Skip link** (`Layout.tsx:69`, href `#main` under HashRouter): make it a button that focuses `<main tabIndex=-1>`.
- **Calculator** (`Calculator.tsx:66-76`): move focus in and back out correctly.
- **Live regions.** Add persistent live regions for answer feedback (`McqView.tsx:117-128`).
- **Flashcards** (`FlashcardPlayer.tsx:40-46, 70`): fix the aria-label hiding the card text, and stop ratings firing while a `<select>` is focused.
- **Choice buttons** (`McqView.tsx:130-141`): follow the ARIA radio pattern.
- **Mobile journal-entry grid** (`TbsView.tsx:214`, 544 px wide at 390 px): stack the columns.
- **Visual and layout:**
  - tap targets of at least 24 px;
  - fix the axe contrast violations;
  - sr-only h1s on the quiz and flashcard pages;
  - glossary `<dl>` structure;
  - reduced motion (`TbsPage.tsx:54`);
  - dashboard overflow at 320 px (`Dashboard.tsx:106, 148`).

**Acceptance:** `eval-scratch/ui/axe.mjs` reports 0 violations, and `kbd.mjs` and `skiplink.mjs` pass.

### P1-12 Tests for untested critical paths [M]

Evidence: EVALUATION.md §2.8.

Add tests for:
- `scoreExam` and `weightedPercent`;
- the ExamPlayer timer, break, auto-finish and resume;
- `buildQuiz`, `buildMasteryCheck`, `historyByItem`, `shuffle`;
- `buildCardQueue`;
- `computeStudyState`;
- the date and time-zone helpers;
- `importBackup` with bad input.

Port the relevant cases from `eval-scratch/engine/*.test.ts` into `tests/`.

### P1-13 Adaptive plan and mastery gating [M]

- **Diagnostic.** Add a 40–60 item stratified diagnostic at onboarding.
- **Planner** (`src/lib/planner.ts`): order work by (Blueprint Area weight × weakness) instead of fixed course order.
- **Mastery gating.** Gate, or at least warn, before new units when the prerequisites aren't mastered.
- **Remediation.** When a mastery check fails, route the learner to that trap's explanations, the faded examples and the flashcards, then retest on *new* items.

### P1-14 Content QA tooling [M]

- **Item statistics** from attempts: p-value, discrimination and distractor rates (new `src/lib/itemStats.ts`).
- **Issue reporting.** Add a learner "Report an issue" link on each item, e.g. a prefilled GitHub issue URL.

---

## 3. P2: polish and scale

| ID | Task | Files |
|---|---|---|
| P2-1 | **Performance.** Split content per section with a lazy `import.meta.glob`. Validate at build time, not runtime, so yaml and zod drop out of the client bundle. Load only the mermaid flowchart renderer, not the elk chunk. Target: Lighthouse mobile ≥ 80 (currently 44). | `src/content/index.ts`, `vite.config.ts`, `src/components/Mermaid.tsx` |
| P2-2 | **Mark off-Blueprint modules optional,** out of the default plan and mocks. FAR: conceptual framework, employee benefit plans, segment reporting, goodwill (38 MCQs). AUD: comfort letters (`aud-sp-07`). | `content/sections/far.yaml`, `src/lib/planner.ts` |
| P2-3 | **Friction.** Auto-advance after feedback; chain flashcards into due questions; "next task" from the results screen; keep controls above the fold on mobile. | `QuizPlayer.tsx`, `ReviewQueue.tsx`, `Dashboard.tsx`, `FlashcardPlayer.tsx` |
| P2-4 | **Security headers.** CSP with a hash for the inline theme script in `index.html`, `nosniff`, `frame-ancestors`, referrer policy. Add a `package.json` override `"lodash-es": "^4.18.1"` to clear the npm audit findings. | `public/_headers`, `index.html`, `package.json` |
| P2-5 | **Small fixes.** Time-zone fixes (`actions.ts:97-98`, `ExamHome.tsx:86`). Planner edge cases: exam today or past, 5-digit years, the mock booked on a short day (`planner.ts:165, 205-207`). Deck `newCardsPerDay` (`Flashcards.tsx:50-53`). Double grade key (`FlashcardPlayer.tsx:30-35`). Due review sorted by `due` (`PracticeStart.tsx:59`). Route key for TBS pages (`TbsPage.tsx:22-34`). `lastLocation` "Continue" link (`actions.ts:163`). TBS timer persistence (`TbsPage.tsx:48`). | as listed |
| P2-6 | **Optional sync or cloud backup;** CSV export of attempts. | `src/db/*`, `SettingsPage.tsx` |
| P2-7 | **Exam-day orientation content:** scheduling, check-in, testlet rhythm, pretest items, score release. | `content/*/review/` |
| P2-8 | **Bank expansion** toward at least 1,000 MCQs and 60 TBS per section, with a difficulty spread. Today almost every item is difficulty 2. | `content/**` |

---

## 4. Definition of done (whole program)

- `npm run check` is green, and CI is green on the PR.
- Every remediated key has a regression test and a `REVIEW.md` entry.
- `eval-scratch/content/testwise.ts`: the longest-choice score is at most 35% for every section and pool.
- Re-running the Blueprint mapping (method in `eval-scratch/blueprint/coverage-*.md`, extractor `eval-scratch/blueprint/extract.py`) shows:
  - 0 Missing topics;
  - at least 70% of analysis and evaluation tasks covered at level;
  - at most 5% of items out of scope per section;
  - 0% out of scope in the mocks.
- The engine repro suite `npx vitest run --config eval-scratch/vitest.config.ts eval-scratch/engine` passes, with the "bug-demonstrating" assertions flipped to expect the fixed behavior.

## 5. Suggested PR batching

1. **PR A (content, small):** P0-1 and P0-2.
2. **PR B (engine):** P0-3.
3. **PR C (engine):** P0-4 and P0-5.
4. **PR D (engine + lint):** P0-6 parts 1–2.
5. **PR E (engine):** P0-7.
6. **PR F (content):** P0-9 and P1-8.
7. **PR G (engine):** P1-1, P1-2, P1-3, P1-12.
8. **PR H (a11y):** P1-11.

Content epics, one PR per section each:
- P0-6 part 3 (de-cue, AUD first);
- P0-8 (re-scope; needs D1);
- P1-4, P1-5, P1-6, P1-7, P1-9, P1-10, P1-13, P1-14;
- then P2.
