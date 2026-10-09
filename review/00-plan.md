# Review plan — CPA Study Program (2026 CPA Exam)

_Started 2026-10-07 on commit `cad754b` (branch `claude/new-session-q62va9`). This is a review only: nothing outside `review/` is changed._

## Baseline

`npm run check` (lint → typecheck → tests → content validation → vite build) passed on the starting commit:
19 test files, **491 tests passed**; `Content OK` with **0 validation errors and 0 warnings**; the Vite build succeeded
(one CSS optimisation warning and the chunk-size warning). Log kept in the session scratchpad.
`npm run item-stats` needs learner backup files and there are none in the repo, so item statistics (p-values,
discrimination) could not be computed. The review relies on content analysis instead.

## Inventory

Counts from `review/ledger.csv` (one row per reviewable item, 5,854 rows). TBS are counted under the first module in their `moduleIds`.

| Section | Lessons | Practice MCQs | Lesson MCQs | Exam-pool MCQs | Flashcards | Practice TBS | Exam TBS | Exam forms | Review docs | Glossary | Total |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| FAR | 37 | 1,015 | 111 | 104 | 255 | 46 | 14 | 3 | 4 | 38 | 1,627 |
| AUD | 33 | 892 | 98 | 156 | 200 | 46 | 14 | 3 | 4 | 32 | 1,478 |
| REG | 27 | 918 | 81 | 148 | 166 | 44 | 16 | 3 | 4 | 33 | 1,440 |
| TCP | 19 | 864 | 56 | 136 | 132 | 46 | 14 | 3 | 4 | 35 | 1,309 |
| **All** | **116** | **3,689** | **346** | **544** | **753** | **182** | **58** | **12** | **16** | **138** | **5,854** |

### Per module

| Section | Module | Opt | Lesson min | Practice | Lesson Qs | Exam Qs | Cards | TBS (primary) |
|---|---|---|---:|---:|---:|---:|---:|---:|
| FAR | far-conceptual-framework | opt | 15 | 12 | 3 | 1 | 9 | 0 |
| FAR | far-balance-sheet-equity |  | 15 | 28 | 3 | 3 | 8 | 1 |
| FAR | far-income-statement-oci |  | 18 | 28 | 3 | 5 | 8 | 2 |
| FAR | far-cash-flows |  | 20 | 28 | 3 | 5 | 8 | 3 |
| FAR | far-notes-disclosures |  | 12 | 28 | 3 | 2 | 8 | 1 |
| FAR | far-ratios |  | 18 | 28 | 3 | 4 | 8 | 2 |
| FAR | far-sec-segments |  | 16 | 34 | 3 | 2 | 8 | 0 |
| FAR | far-eps |  | 20 | 28 | 3 | 5 | 8 | 2 |
| FAR | far-consolidations |  | 20 | 28 | 3 | 4 | 7 | 5 |
| FAR | far-special-purpose |  | 14 | 28 | 3 | 1 | 7 | 1 |
| FAR | far-nfp-statements |  | 16 | 28 | 3 | 1 | 7 | 0 |
| FAR | far-nfp-revenue |  | 18 | 28 | 3 | 2 | 7 | 2 |
| FAR | far-government |  | 16 | 31 | 3 | 3 | 7 | 3 |
| FAR | far-benefit-plans | opt | 13 | 10 | 3 | 1 | 6 | 0 |
| FAR | far-cash |  | 14 | 28 | 3 | 2 | 6 | 1 |
| FAR | far-receivables |  | 18 | 28 | 3 | 4 | 7 | 2 |
| FAR | far-inventory-cost |  | 20 | 28 | 3 | 2 | 8 | 2 |
| FAR | far-inventory-valuation |  | 20 | 28 | 3 | 2 | 6 | 1 |
| FAR | far-ppe-acquisition |  | 18 | 28 | 3 | 4 | 7 | 4 |
| FAR | far-depreciation |  | 20 | 28 | 3 | 3 | 7 | 0 |
| FAR | far-impairment |  | 16 | 31 | 3 | 2 | 6 | 1 |
| FAR | far-intangibles |  | 16 | 29 | 3 | 2 | 6 | 0 |
| FAR | far-debt-securities |  | 18 | 28 | 3 | 3 | 6 | 2 |
| FAR | far-equity-investments |  | 20 | 28 | 3 | 2 | 7 | 2 |
| FAR | far-payables |  | 14 | 28 | 3 | 2 | 5 | 2 |
| FAR | far-bonds |  | 20 | 28 | 3 | 2 | 6 | 2 |
| FAR | far-debt-other |  | 16 | 28 | 3 | 2 | 5 | 0 |
| FAR | far-equity |  | 20 | 28 | 3 | 3 | 7 | 2 |
| FAR | far-revenue-contracts |  | 18 | 28 | 3 | 4 | 6 | 2 |
| FAR | far-revenue-measurement |  | 20 | 28 | 3 | 5 | 8 | 2 |
| FAR | far-income-taxes |  | 20 | 28 | 3 | 5 | 8 | 3 |
| FAR | far-fair-value |  | 15 | 28 | 3 | 3 | 7 | 1 |
| FAR | far-leases-finance |  | 20 | 28 | 3 | 3 | 7 | 3 |
| FAR | far-leases-operating |  | 18 | 28 | 3 | 2 | 6 | 2 |
| FAR | far-accounting-changes |  | 16 | 28 | 3 | 3 | 6 | 2 |
| FAR | far-contingencies |  | 16 | 28 | 3 | 3 | 7 | 2 |
| FAR | far-subsequent-events |  | 12 | 28 | 3 | 2 | 5 | 0 |
| AUD | aud-code-of-conduct |  | 18 | 27 | 3 | 9 | 7 | 4 |
| AUD | aud-sec-pcaob-independence |  | 16 | 27 | 3 | 8 | 6 | 1 |
| AUD | aud-professional-standards |  | 14 | 27 | 3 | 6 | 6 | 1 |
| AUD | aud-quality-management |  | 14 | 27 | 3 | 4 | 6 | 1 |
| AUD | aud-engagement-acceptance |  | 15 | 27 | 3 | 5 | 6 | 3 |
| AUD | aud-planning |  | 16 | 27 | 3 | 6 | 6 | 2 |
| AUD | aud-risk-materiality |  | 18 | 27 | 3 | 8 | 8 | 4 |
| AUD | aud-understanding-entity |  | 15 | 27 | 3 | 6 | 6 | 0 |
| AUD | aud-internal-control |  | 18 | 27 | 3 | 7 | 6 | 4 |
| AUD | aud-it-controls |  | 15 | 27 | 3 | 4 | 6 | 1 |
| AUD | aud-fraud-risk |  | 17 | 27 | 3 | 6 | 6 | 1 |
| AUD | aud-risk-response |  | 16 | 27 | 3 | 3 | 6 | 2 |
| AUD | aud-tests-of-controls |  | 14 | 27 | 3 | 3 | 6 | 1 |
| AUD | aud-specific-risks |  | 17 | 27 | 3 | 3 | 6 | 2 |
| AUD | aud-evidence-assertions |  | 17 | 27 | 3 | 8 | 6 | 3 |
| AUD | aud-sampling |  | 18 | 27 | 3 | 8 | 6 | 2 |
| AUD | aud-data-analytics |  | 14 | 27 | 3 | 4 | 6 | 3 |
| AUD | aud-revenue-receivables |  | 17 | 27 | 3 | 6 | 6 | 1 |
| AUD | aud-inventory-ppe |  | 17 | 27 | 3 | 6 | 6 | 2 |
| AUD | aud-cash-investments |  | 15 | 27 | 3 | 4 | 6 | 2 |
| AUD | aud-liabilities-equity |  | 16 | 27 | 3 | 5 | 6 | 2 |
| AUD | aud-using-others |  | 17 | 27 | 3 | 4 | 6 | 1 |
| AUD | aud-subsequent-events |  | 16 | 27 | 3 | 4 | 6 | 3 |
| AUD | aud-going-concern |  | 15 | 27 | 3 | 3 | 6 | 1 |
| AUD | aud-written-representations |  | 15 | 27 | 3 | 2 | 6 | 1 |
| AUD | aud-unmodified-opinion |  | 15 | 27 | 3 | 4 | 5 | 1 |
| AUD | aud-modified-opinions |  | 16 | 27 | 3 | 5 | 6 | 3 |
| AUD | aud-report-paragraphs |  | 16 | 27 | 3 | 4 | 6 | 1 |
| AUD | aud-communications |  | 13 | 27 | 3 | 2 | 6 | 1 |
| AUD | aud-special-reports |  | 17 | 28 | 3 | 2 | 6 | 0 |
| AUD | aud-attestation |  | 16 | 27 | 3 | 2 | 6 | 1 |
| AUD | aud-ssars |  | 16 | 27 | 3 | 3 | 6 | 3 |
| AUD | aud-government-compliance |  | 20 | 27 | 2 | 2 | 6 | 2 |
| REG | reg-circular-230 |  | 16 | 36 | 3 | 6 | 6 | 2 |
| REG | reg-preparer-penalties |  | 15 | 34 | 3 | 8 | 6 | 3 |
| REG | reg-irs-procedures |  | 15 | 34 | 3 | 6 | 6 | 2 |
| REG | reg-accountant-liability |  | 16 | 36 | 3 | 4 | 6 | 1 |
| REG | reg-agency |  | 14 | 33 | 3 | 6 | 6 | 0 |
| REG | reg-contracts |  | 18 | 33 | 3 | 8 | 6 | 3 |
| REG | reg-debtor-creditor |  | 18 | 33 | 3 | 7 | 6 | 4 |
| REG | reg-federal-regulation |  | 17 | 42 | 3 | 5 | 6 | 1 |
| REG | reg-business-structures |  | 16 | 33 | 3 | 4 | 6 | 0 |
| REG | reg-property-basis |  | 18 | 35 | 3 | 5 | 8 | 2 |
| REG | reg-cost-recovery |  | 20 | 33 | 3 | 6 | 8 | 4 |
| REG | reg-capital-gains |  | 20 | 39 | 3 | 2 | 6 | 2 |
| REG | reg-nontaxable-exchanges |  | 19 | 42 | 3 | 1 | 6 | 1 |
| REG | reg-filing-status |  | 16 | 33 | 3 | 6 | 6 | 2 |
| REG | reg-gross-income |  | 19 | 33 | 3 | 9 | 6 | 3 |
| REG | reg-business-rental-income |  | 19 | 36 | 3 | 5 | 6 | 4 |
| REG | reg-adjustments |  | 15 | 33 | 3 | 4 | 6 | 5 |
| REG | reg-itemized-deductions |  | 20 | 34 | 3 | 6 | 6 | 1 |
| REG | reg-individual-credits |  | 18 | 34 | 3 | 5 | 6 | 2 |
| REG | reg-amt-other-taxes |  | 18 | 38 | 3 | 5 | 6 | 1 |
| REG | reg-c-corp-income |  | 20 | 33 | 3 | 19 | 6 | 6 |
| REG | reg-state-local-tax |  | 15 | 34 | 3 | 4 | 6 | 2 |
| REG | reg-corp-distributions | opt | 18 | 15 | 3 | 0 | 6 | 0 |
| REG | reg-corp-formation-liquidation | opt | 19 | 15 | 3 | 0 | 6 | 0 |
| REG | reg-partnerships |  | 20 | 37 | 3 | 8 | 6 | 3 |
| REG | reg-s-corporations |  | 18 | 36 | 3 | 8 | 6 | 5 |
| REG | reg-trusts-exempt |  | 17 | 44 | 3 | 1 | 6 | 1 |
| TCP | tcp-individual-planning |  | 20 | 46 | 3 | 13 | 7 | 3 |
| TCP | tcp-stock-compensation |  | 18 | 45 | 3 | 8 | 7 | 2 |
| TCP | tcp-passive-rental |  | 20 | 44 | 3 | 10 | 7 | 3 |
| TCP | tcp-gift-tax |  | 20 | 44 | 3 | 9 | 7 | 4 |
| TCP | tcp-retirement-education |  | 20 | 45 | 3 | 8 | 8 | 3 |
| TCP | tcp-c-corp-compliance |  | 20 | 50 | 3 | 4 | 7 | 5 |
| TCP | tcp-consolidated-returns |  | 15 | 44 | 3 | 5 | 6 | 1 |
| TCP | tcp-international |  | 20 | 48 | 2 | 2 | 6 | 1 |
| TCP | tcp-partnership-formation |  | 20 | 44 | 3 | 4 | 8 | 3 |
| TCP | tcp-partnership-operations |  | 20 | 46 | 3 | 5 | 7 | 2 |
| TCP | tcp-partnership-distributions |  | 20 | 44 | 3 | 7 | 7 | 3 |
| TCP | tcp-s-corp-compliance |  | 20 | 44 | 3 | 6 | 7 | 5 |
| TCP | tcp-trusts-estates |  | 20 | 44 | 3 | 5 | 7 | 3 |
| TCP | tcp-exempt-organizations |  | 18 | 47 | 3 | 4 | 7 | 2 |
| TCP | tcp-entity-choice |  | 20 | 45 | 3 | 6 | 7 | 3 |
| TCP | tcp-formation-liquidation |  | 20 | 45 | 3 | 15 | 7 | 5 |
| TCP | tcp-multistate |  | 18 | 47 | 3 | 5 | 7 | 1 |
| TCP | tcp-asset-dispositions |  | 20 | 46 | 3 | 9 | 6 | 6 |
| TCP | tcp-deferral-transactions |  | 20 | 46 | 3 | 11 | 7 | 5 |

## How the work is batched

| Batch | Scope | Count |
|---|---|---|
| `M-<module>` | One module: its lesson, every MCQ whose `moduleId` is the module (lesson, practice **and** exam pools), its flashcards, and every TBS whose first `moduleIds` entry is the module | 116 |
| `G-<SEC>` | Glossary entries and final-review docs for one section | 4 |
| `X-<SEC>` | The section's mock exam forms (structure, blueprint mix, realism) | 4 |
| `U-journeys` | Usability journeys 1–8 in the built app (Playwright, desktop 1366×900 and phone 390×844) | 1 |
| `U-a11y-perf` | Accessibility (axe-core, keyboard, screen-reader semantics, contrast, reduced motion, zoom) and performance (Fast 3G, long sessions) | 1 |
| `L-logic-flow` | Learning flow and algorithms: sequencing, FSRS scheduling, readiness and mastery, planner scenarios, mock realism and scoring, routing of misses | 1 |
| Cross-cutting (orchestrator) | Near-duplicate and contradiction scan across modules; consistency of key thresholds across all content; Blueprint coverage mapping (`blueprint-coverage.csv`) | — |

**Per-module procedure** (each `M-` batch is one subagent; the full instructions, including sections 2–4 of the review brief
verbatim, are in `review/batches/<batch>/PROMPT.md`):

1. Read the lesson and recompute every worked example.
2. **Blind pass.** Answer every MCQ and every TBS row from `blind.md`, which has no keys or explanations, computing every
   numeric item independently. Saved to `blind-answers.csv` before the key is opened.
3. **Keyed pass.** Compare with the keys, then apply every per-MCQ, per-TBS, flashcard and lesson check from the brief.
4. Currency check against the reference sheets in `review/reference/`, and web search for anything they don't settle.
5. Outputs: `findings.jsonl`, `ledger.csv` (every manifest id), and `notes.md` (blind/key disagreements, lesson design,
   practice design, no-issue list, needs-verification list). Self-validated with `review/tools/merge_batch.py <batch> --check`.

**Merging and resumability.** `review/tools/merge_batch.py <batch>` validates a finished batch, appends its findings to
`review/findings.jsonl` with global `F-` ids and updates `review/ledger.csv`. Merged batches are listed in
`review/batches/_merged.txt`. After a context reset, read `_merged.txt` and the ledger, then continue with the first batch
that has unreviewed rows. `review/tools/setup_batches.py` rebuilds the packets but never overwrites an existing ledger.

**Spot-checks.** For every module batch, the orchestrator independently re-verifies a random 10% (at least 3) of the items the
subagent reported as having no issues, recomputing numeric items. The results are recorded in
`review/batches/<batch>/spotcheck.md`. If the spot-check finds a miss, the batch is re-run (or the missed defect class is
re-reviewed across the batch) and merged again; the earlier findings move to `_superseded.jsonl`.

**Aids given to every reviewer.** `cues.md` lists heuristic answer-cue flags (key longest or shortest, absolutes only in
distractors, all/none-of-the-above, stem-word overlap), near-duplicate stems within the module, and the module's skill,
difficulty, key-letter and `calc` distribution. These are hints only; the reviewer judges each one.

**Waves.** About 12–16 module agents run at a time, in Blueprint order: FAR, then AUD, REG and TCP. The REG and TCP waves start
only after the tax reference sheet is in place.

## Authoritative sources

The target is the **2026 CPA Exam**, as of today (2026-10-07):

- **Blueprints:** AICPA *Uniform CPA Examination Blueprints* effective January 1, 2026, and the *Summary of Changes*. They
  set coverage, area weights and skill levels per task. → `review/reference/blueprint-notes.md`, `review/reference/blueprint-tasks.csv`
- **Testing policy:** the AICPA rule that a new accounting or auditing pronouncement is eligible for testing six months after
  its effective date, or six months after its issuance date if early application is permitted. Federal tax legislation
  follows the six-month rule, and the Board of Examiners' OBBBA policy makes 2024–2025 OBBBA provisions testable from July 1, 2026.
- **FAR:** FASB ASC, including ASUs through 2025 (2023-07, 2023-08, 2023-09, 2024-03 and 2025-01, 2025-05, 2025-06 and others);
  GASB Statements (including 101–104); NFP reporting under ASU 2016-14 and ASU 2018-08. → `review/reference/far-standards.md`
- **AUD:** AICPA SASs (AU-C, including SAS 142–149), SQMS 1 and 2, SSARS (including SSARS 25), SSAEs (AT-C), the AICPA
  Code of Professional Conduct; PCAOB standards (AS 1000, AS 2310, the 2024 technology amendments, QC 1000 and its effective
  date); SEC and SOX independence rules; GAGAS 2024; the Uniform Guidance (2 CFR 200, 2024 revision: $1,000,000 single
  audit threshold); and DOL/ERISA independence. → `review/reference/aud-standards.md`
- **REG and TCP:** the Internal Revenue Code as amended through P.L. 119-21 (OBBBA); Rev. Proc. 2024-40 and the IRS
  OBBBA-revised 2025 amounts; 2026 amounts (Rev. Proc. 2025-32) where the content mentions 2026; Treasury Regulations;
  Circular 230 (31 CFR Part 10); the AICPA SSTS; and for business law, the UCC, the Restatements, the Bankruptcy Code and
  the federal statutes named in the REG Blueprint. → `review/reference/tax-2025.md`

**Access limitation.** The environment's egress policy blocks direct fetches from irs.gov, aicpa-cima.com, pcaobus.org,
fasb.org, gasb.org and most other sites, including review-provider sites. Web search works, so facts are verified
through search results that quote or cite the primary authority, and each reference sheet records the URL and the
authority it reports. Anything that can't be confirmed this way is marked `needs-verification` and not stated as an
error.

## Severity and format

As in the brief (S1 Wrong, S2 Misleading, S3 Weak, S4 Suggestion). One JSON object per line in `review/findings.jsonl`.
Low-confidence findings are listed separately in the report as "needs expert verification".
