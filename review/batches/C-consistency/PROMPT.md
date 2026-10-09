You are the cross-platform consistency reviewer in an exhaustive review of a CPA exam study platform (repo /home/user/CPA_Study_Program; all content under content/: lessons content/<sec>/modules/<m>/lesson.md, MCQs questions.json and exam-questions/*.json, flashcards.json, TBS content/<sec>/tbs/*.json, review docs content/<sec>/review/*.md, glossary content/glossary/*.json). Today is 2026-10-09; the target is the 2026 CPA Exam. **Review only**: don't edit content or code; write only inside `review/batches/C-consistency/`; don't commit.

The standard (verbatim from the review brief): "**Consistency.** No two places in the platform state the same rule differently. Search for each key threshold and rate across all content, and list the conflicts. Examples include the 2025 SALT cap, the §179 limits, the gift exclusion, materiality benchmarks and the lease classification criteria."

Reference sheets researched for this review (use them as the yardstick for what is current): `review/reference/tax-2025.md`, `review/reference/aud-standards.md`, `review/reference/far-standards.md`. Web search is a scarce shared budget: at most 5 searches in total, only for conflicts the sheets can't settle.

Method: for each key threshold, rate, limit, period or rule below (and any others you notice recurring), grep ALL content (lessons, MCQ stems/choices/explanations, flashcards, TBS exhibits/explanations, review docs, glossary) for every place it is stated, extract the stated value and the tax year/standard it is attributed to, and list every inconsistency (two places stating it differently, or a place stating an outdated value as current). Write scripts in `review/batches/C-consistency/scripts/` as needed (json-aware searches are better than raw grep for questions).

Checklist (at minimum): **Tax** — 2025 and 2026 standard deduction by status and the additional amount for 65+/blind; senior deduction; SALT cap and its phase-down/floor (2025 vs 2026); §179 limit and phase-out threshold; bonus depreciation % and the January 19, 2025 date; luxury auto limits; gift annual exclusion; basic exclusion amount (2025 3.99M; 2026 5M); GST; child tax credit and refundable portion; credit for other dependents; dependent care credit rates; AOTC/LLC; capital gains rate breakpoints; NIIT and additional Medicare thresholds; SE tax rates and the Social Security wage base; IRA/Roth/401(k)/catch-up/SIMPLE/HSA limits; kiddie tax threshold; QBI thresholds and phase-in ranges; excess business loss thresholds; §163(j) (EBITDA vs EBIT); NOL 80% limit and carryback rules; corporate DRD percentages; charitable deduction limits (individual 60/50/30/20%, corporate 10%, 2026 floors); estimated-tax safe harbors (100%/110%, 50,000); statute of limitations (3 years, 6 years for >25% omission, 7 years bad debt/worthless securities); penalty rates (failure to file/pay, accuracy-related 20%, fraud 75%, preparer penalties §6694/§6695 amounts); §121 exclusion; like-kind (real property only); §1202 rules; FBAR; Form 1099-K/1099-NEC thresholds; RMD age; QCD limit; trust top bracket threshold; AMT exemptions; Circular 230 rules (contingent fees, §10.34, conflicts). **Audit** — materiality benchmarks and percentages; documentation completion (AICPA 60 days; PCAOB 14 days since AS 1000) and retention (5 vs 7 years); AU-C 265 communication timing; going-concern look-ahead period; engagement partner rotation (5 years lead/concurring, 7 years other) and cooling-off (1 year); independence rules (inherited interests, loans, contingent fees/commissions/referral fees); single audit threshold (,000,000) and major program percentages; questioned-costs threshold; GAGAS CPE (80/24); sampling rules of thumb; negative confirmation conditions; SQMS/QC 1000 effective dates; KAM/CAM applicability. **FAR** — lease classification criteria and 75%/90% bright lines; short-term lease 12 months; LCNRV vs LCM; goodwill impairment test steps; capitalized interest; debt modification 10% test; NFP net asset classes; modified accrual 60-day availability; GASB 54 fund balance order; EPS rules (treasury stock method, if-converted); materiality in subsequent events; contingency recognition (probable, range minimum); ASC 855 evaluation date; ASU effective dates cited in lessons.

Findings format and severity (verbatim from the brief):
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

Use one finding per conflicting rule (list every place: `item` = comma-separated item ids/module ids/doc ids; `file` = the files; `evidence` = the conflicting statements quoted with locations; `fix` = which is right, citing the reference sheet). An outdated value presented as current → S1; two places disagreeing where one is right → S1 for the wrong place (name it); inconsistent wording that could mislead → S2/S3. `category` content-correctness or currency.

Outputs in `review/batches/C-consistency/`: `findings.jsonl` (local ids `C-consistency-001`…; append as you go), `ledger.csv` containing only the header `id,type,reviewed,findings_count,note`, and `notes.md` with a table: threshold → value(s) found → count of places → consistent? → reference value. Run `python3 review/tools/merge_batch.py C-consistency --check` and fix every PROBLEM. Final reply under 200 words.
