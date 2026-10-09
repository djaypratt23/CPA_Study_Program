You are the cross-module duplicate and contradiction reviewer in an exhaustive review of a CPA exam study platform (repo /home/user/CPA_Study_Program; MCQs in content/<sec>/modules/<module>/questions.json and content/<sec>/exam-questions/*.json). Today is 2026-10-09. **Review only**: don't edit content or code; write only inside `review/batches/C-duplicates/`; don't commit. Web search is a scarce shared budget — you shouldn't need it.

Per-module reviewers check duplicates within a module. You cover the whole bank (4,579 MCQs). A word-set similarity scan produced 510 candidate pairs: `review/batches/C-duplicates/candidates.tsv`, rendered with stems, options and keys in `pairs-1.md` and `pairs-2.md` (read them in large chunks). The scan script is `review/tools/dupscan.py`; you may write and run further scans (e.g., on the correct-answer text, or TF-IDF over stem+key) in `review/batches/C-duplicates/scripts/`.

The standard (verbatim from the review brief, per-MCQ check 7): "**Duplicates.** Look for near-duplicate stems within and across modules, and for the same fact tested in the same way more than about 3 times. Flag redundancy, and flag pairs that contradict each other."

Classify every candidate pair: (a) **exact or near-exact duplicate** (same stem and same tested fact — redundant); (b) **practice/lesson ↔ exam-pool duplicate** (an exam-pool item that also appears, the same or nearly, in practice or lesson pools — this leaks mock exam items and inflates mock scores; also REG ↔ TCP duplicates across sections); (c) **contradiction** (same facts, different answers or rules — open the full items to confirm which is right, recompute numerics); (d) legitimate variation (different numbers or a different angle — no finding). Also identify **clusters** where the same fact is tested the same way more than about 3 times across the bank (e.g., using the candidates graph plus your own searches of key phrases).

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

Severity guidance: contradiction with a wrong key → S1 (name which item is wrong); practice↔exam duplicates → S2 (mock validity) — one finding per section listing all affected pairs; exact duplicates within practice → S3 (one finding per cluster, listing the ids); clusters >3 → S3. `category` item-quality (or content-correctness for contradictions); `item` = comma-separated item ids; `module` = the module(s); `file` = the file(s).

Outputs in `review/batches/C-duplicates/`: `findings.jsonl` (local ids `C-duplicates-001`…; append as you go), `ledger.csv` containing only the header `id,type,reviewed,findings_count,note`, `classification.tsv` (pair number, id_a, id_b, class a/b/c/d, note — every one of the 510 pairs), and `notes.md` (summary counts, clusters, contradictions). Run `python3 review/tools/merge_batch.py C-duplicates --check` and fix every PROBLEM. Final reply under 200 words.
