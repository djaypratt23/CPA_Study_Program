You are one reviewer in an exhaustive review of a CPA exam study platform (repo at /home/user/CPA_Study_Program). A student will rely on this material to pass a licensing exam: a wrong answer key, an outdated figure or a misleading explanation can cost them points, so treat every defect as one that matters. Today is 2026-10-07; the target is the **2026 CPA Exam**.

**This is a review, not a fix-up.** Do NOT edit any content or code. The only files you may create or change are inside `review/batches/{BATCH}/`. Do not commit or push. Do not touch other batches' folders.

## Your batch: {BATCH}
- Section: {SECTION}; module `{MODULE}` — "{TITLE}" (unit {UNIT}, area {AREA}){OPTIONAL}
- Items ({NITEMS}): {COUNTS}
- Files:
  - Lesson: `{LESSON}`
  - Blind packet (stems, choices, TBS prompts — no keys): `review/batches/{BATCH}/blind.md`
  - Keyed items (MCQs with keys and explanations, flashcards, TBS file list): `review/batches/{BATCH}/items.json`
  - TBS files: {TBSFILES}
  - Automated cue hints, near-duplicate pairs, label distribution: `review/batches/{BATCH}/cues.md` — it reveals key information, so open it only after `blind-answers.csv` is saved
  - Manifest (every item id you must cover): `review/batches/{BATCH}/manifest.json`
  - Section config (module order, Blueprint weights, skill allocation): `content/sections/{SECLOWER}.yaml`
  - Schema and validator rules: `src/content/schema.ts`, `src/content/build.ts`
  - Verified reference sheets (use them; they were researched for this review): {REFS}
  - Prior decisions and known trade-offs: `REVIEW.md`, `docs/BLUEPRINT_NOTES.md` (read the parts relevant to your module; prior "confirmed" decisions are claims to verify, not facts)

## Network and web search
Direct page fetches (WebFetch/curl) to irs.gov, aicpa-cima.com, pcaobus.org, fasb.org, gasb.org and most other sites are blocked by the egress proxy. The WebSearch tool works, but **its budget is small and shared by every reviewer**: use at most **3 searches** for this whole batch, only for facts that the reference sheets and your own solid knowledge can't settle, and combine several facts into one query. Cite the URL and the primary authority it reports. If you still can't verify something, record it with `"confidence":"low"` and `"needs_verification": true`. Don't guess.

**Note on the testing-eligibility rule.** The current AICPA rule is that accounting and auditing pronouncements become eligible for testing in the *later* of (1) the first calendar quarter after the pronouncement's earliest mandatory effective date, or (2) the first calendar quarter beginning six months after its issuance date. Permitting early adoption no longer makes a standard testable sooner. The six-month wording in section 2 below is the pre-2016 version; use the current rule (details in `review/reference/far-standards.md` §1a).

## Efficiency
Read files in large chunks (whole files, or 400–800 lines at a time), not item by item. Batch your python computations. You still have to apply every check to every item.

## Procedure (follow in order)
1. **Lesson first.** Read the whole lesson (frontmatter + body, including worked/faded/je/tacct blocks; recompute every worked number). Skim the section YAML so you know which modules come before this one (prerequisites).
2. **Blind pass — before looking at any key.** Work through `blind.md`. For every MCQ choose your answer; for every item with any arithmetic, compute it independently (use `python3` for anything beyond trivial arithmetic) and keep the steps. For each TBS, compute every numeric/review row, choose every dropdown/docreview/research answer, and write the journal entry. Save `review/batches/{BATCH}/blind-answers.csv` with columns `id,part_row,my_answer,computation_or_rationale` (one row per MCQ; one row per TBS row/cell) BEFORE opening `items.json` or the TBS JSON.
3. **Keyed pass.** Now open `items.json` and the TBS files. Compare with your blind answers. Investigate every disagreement to the bottom (re-derive from the authority; one of you is wrong — decide which, and say why). Then apply every check in the standards below to every item: key correct and single best; each distractor definitely wrong for the reason its explanation gives and its `trap` label fits; stem complete/unambiguous (dates, tax year, filing status, entity type, elections, materiality basis); explanations teach (rule + computation; not circular or truncated); labels (`skill`, `difficulty`, `calc`, `optional`); answer cues (use cues.md as hints only — judge each); duplicates/redundancy and contradictions; realism. Flashcards: correct, atomic, unambiguous. TBS: recompute, tolerances, JE balance and account names, dropdown options, docreview rows, research citation correct/current/best, exhibits complete and consistent, partial-credit scoring fair, skill and minutes realistic.
4. **Currency.** For every rule, threshold, rate, date and dollar amount: which tax year / standard version does the item assume? Is the stem, key, distractors, explanation and lesson consistent (and the lesson's `taxYear`)? Is that what the 2026 exam tests (as of today, 2026-10-07)? Check against the reference sheets; web-search what they don't cover.
5. **Write outputs** (all inside `review/batches/{BATCH}/`):
   - `findings.jsonl` — one JSON object per line, exactly the format in section 5 below, with `"id"` set to a local id `{BATCH}-001`, `{BATCH}-002`, … (they are renumbered on merge). `item` is the item id (for a finding that applies to several items, a comma-separated list of ids, e.g. `"far-bo-12,far-bo-14"`; for the lesson use the module id `{MODULE}`). `file` is the content file. Put your recomputation in `evidence`. Optional extra fields allowed: `"needs_verification": true`, `"blind_answer"`, `"keyed_answer"`. Every S1/S2 needs evidence and a concrete fix. One defect = one finding (don't split one problem into many; don't merge unrelated problems). If the same defect pattern recurs across many items in your batch (e.g., systematic skill mislabel), write one finding listing all affected item ids in `item`.
   - `ledger.csv` — header `id,type,reviewed,findings_count,note`; exactly one row for **every** id in manifest.json; `reviewed` = `y` once you have applied every check to it; `findings_count` = number of findings whose `item` list includes that id (must match exactly). If you truly could not review an item, set `reviewed` = `n` and explain in `note`.
   - `notes.md` — (a) blind-vs-key disagreement table (id, my answer, key, resolution); (b) lesson-design assessment: big idea → pre-questions → body → takeaways → inline checks; does each pre-question prime the right concept; is `minutes` realistic (estimate words/blocks); lesson–item alignment (list every item that tests something the lesson never teaches); sequencing (does the lesson rely on something taught in a later module?); (c) practice design: MCQ count, difficulty spread, easy→hard progression, skill mix vs. the section's Blueprint allocation; (d) explicit list of item ids you found **no issues** with; (e) needs-expert-verification list; (f) anything you could not check and why.
   - Write findings to `findings.jsonl` incrementally as you go (append), so work isn't lost if you are interrupted.
   - When done, run `python3 review/tools/merge_batch.py {BATCH} --check` and fix every PROBLEM it reports in your own output files (it validates fields, ledger coverage and counts; it does not merge).
6. **Final reply** (keep it under 200 words): counts of findings by severity, the 3 most important findings in one line each, and confirmation that ledger.csv covers every manifest id. Do not paste the findings themselves.

## Severity calibration (apply consistently)
- **S1 – Wrong**: wrong key; wrong number/rule in key, explanation of the key, lesson, flashcard, TBS answer; outdated law/standard presented as current; a TBS that scores a correct answer as wrong (e.g., tolerance 0 when rounding is ambiguous, or an accepted alternative answer marked wrong).
- **S2 – Misleading**: two defensible answers; missing fact needed to answer (tax year, filing status, method, date…); explanation wrong while key is right; distractor actually correct under a reasonable reading; skill badly mislabeled (two levels off, e.g., pure recall labeled analysis); lesson teaches a rule incompletely in a way that will mislead.
- **S3 – Weak**: answer cue; weak/implausible distractor; trap label doesn't match the misconception; thin or circular explanation; skill/difficulty off by one level; `calc` wrong; redundancy (same fact tested the same way >3 times); minor lesson gap/flow issue.
- **S4 – Suggestion**: optional improvements.
Use `category` from: content-correctness, item-quality, tbs, lesson, currency, coverage, flow, pedagogy. Be precise and evidence-based; don't pad with trivia, and don't hold back real issues. Low-confidence suspicions go in with `"confidence":"low"`.

## Review standards (verbatim from the review brief, sections 2–4; sections 3–4 apply to you only as far as your module's lesson and items are concerned — the app itself is reviewed separately)

