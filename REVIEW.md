# REVIEW — items needing a human check

Items flagged `needsReview: true` in content show a ⚠ **Needs review** badge in the app. `npm run validate`
prints the current count. Please confirm or correct each one, then remove the flag.

## Flagged content items

| Item | File | Why it's flagged |
|---|---|---|
| `far-ppe-10` (government donation of a building to a business entity) | `content/far/modules/far-ppe-acquisition/questions.json` | U.S. GAAP has little explicit guidance on how business entities account for government grants (ASU 2021-10 adds disclosures only). The keyed answer follows common review-course treatment (record the building at fair value, with contribution revenue or a gain); confirm it against current exam materials. |

## Blueprint facts still marked "verify"

The official AICPA Blueprint PDFs could not be reached from the build environment, so these figures come
from multiple secondary sources (details in `docs/BLUEPRINT_NOTES.md`). Check them against the official PDF
before building out each section:

- **REG** — TBS split per testlet (configured 2/3/3); the Area II–III weights and skill ranges.
- **TCP** — the Area III–IV weights and skill ranges.
- **AUD** — skill ranges (configured R&U 30–40, Application 30–40, Analysis 15–25, Evaluation 5–15).
- **FAR** — where employee benefit plan statements, EPS, and ratios fall within Area I (the content is built; only the labels are affected).

## AUD content notes

AUD is now fully built. Nothing in it is flagged `needsReview`, but these points deserve a reviewer's eye:

- **Standards currency.** Content reflects AICPA standards in effect for 2026 audits, including SAS 142–146 (e.g., SAS 145 risk assessment with separate inherent and control risk), SQMS No. 1 and No. 2 (effective December 15, 2025), and SAS 134 report formats. Group audits (AU-C 600, revised by SAS 149 for later periods) and PCAOB QC 1000 are covered only at a summary level — confirm which versions the exam window tests.
- **Research excerpts** in AUD TBS are original paraphrases with section-level citations (e.g., "AU-C 505"), not quotations or paragraph numbers.
- **Specific rules worth a second check:** the AU-C 265 timing (communicate by the report release date, no later than 60 days after); the AICPA inherited-interest disposal window cited in `aud-tbs-u1-independence`; the conditions for negative confirmations; the DOL and GAO independence summaries in `aud-sec-pcaob-independence`.

## Tax-law currency (REG, TCP)

The sample modules reflect **tax year 2025** law. Their topics (property basis, partnership formation) were
chosen because the One Big Beautiful Bill Act did not change their core rules. Before building the remaining
tax modules, re-check the testing-window policy (the OBBBA special policy and the six-month rule) and any
inflation-indexed amounts.

## Suggested second-pass review

Every numeric answer key was recomputed independently, and the test suite proves every TBS answer key scores
100% against its own schema. A subject-matter reviewer's second pass is still worthwhile on:

- The FAR and AUD simulated exams (`content/{far,aud}/exam-questions/`, `content/{far,aud}/tbs/*-tbs-x*.json`).
- Judgment-heavy classification items: NFP contributions, subsequent-event type, and contingency disclosure (gain contingencies are keyed "disclose only").
