# REVIEW — items needing a human check

Items flagged `needsReview: true` in content show a ⚠ **Needs review** badge in the app. `npm run validate`
prints the current count. Please confirm or correct each one, then remove the flag.

## Flagged content items

| Item | File | Why it's flagged |
|---|---|---|
| `far-ppe-10` (government donation of a building to a business entity) | `content/far/modules/far-ppe-acquisition/questions.json` | U.S. GAAP has little explicit guidance on how business entities account for government grants (ASU 2021-10 adds disclosures only). The keyed answer follows common review-course treatment (record the building at fair value, with contribution revenue or a gain); confirm it against current exam materials. |

## REG — 2025 amounts from the One Big Beautiful Bill Act

REG reflects tax year 2025 law, including provisions of the One Big Beautiful Bill Act (P.L. 119-21) effective for
2025, which are testable from July 1, 2026. These items use amounts set by that law and are flagged `needsReview`
so you can confirm them against current IRS guidance and your review course:

| Item | What to confirm |
|---|---|
| `reg-fs-chk2`, `reg-fs-08`, `reg-x4-03` | 2025 standard deduction ($15,750 single; $31,500 MFJ; $23,625 HOH) |
| `reg-cr-chk1`, `reg-x4-16` | 2025 child tax credit of $2,200 per child (refundable up to $1,700) |
| `reg-id-chk1` | 2025 SALT cap of $40,000 (phase-down above $500,000 MAGI) |
| `reg-id-10` | Qualified tips deduction (up to $25,000; 2025–2028) |
| `reg-cr-09` | Residential clean energy credit ending for expenditures after 2025 |
| `reg-cc-08` | 100% bonus depreciation after January 19, 2025; §179 limit of $2,500,000 |
| TBS `reg-tbs-u4-gross-income`, `reg-tbs-u5-taxable-income`, `reg-tbs-x4-individual`, `reg-tbs-x4-family` | Standard deduction, child tax credit, and SALT amounts |

The REG lessons and the `reg-numbers` review sheet also cite the senior deduction ($6,000), the overtime and car
loan interest deductions, and the 2026 estate and gift exemption ($15,000,000). Inflation-indexed 2025 amounts not
changed by the law (IRA, HSA, AMT exemption, Social Security wage base, gift annual exclusion) come from IRS
revenue procedures and are worth a spot-check too.

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

REG reflects **tax year 2025** law (see the REG section above). The TCP sample module (partnership formation)
was chosen because the One Big Beautiful Bill Act didn't change its core rules. Before building the rest of TCP,
re-check the testing-window policy (the OBBBA special policy and the six-month rule), and consider whether 2026
amounts become testable during the learner's exam window.

## Suggested second-pass review

Every numeric answer key was recomputed independently, and the test suite proves every TBS answer key scores
100% against its own schema. A subject-matter reviewer's second pass is still worthwhile on:

- The FAR, AUD, and REG simulated exams (`content/{far,aud,reg}/exam-questions/`, `content/{far,aud,reg}/tbs/*-tbs-x*.json`).
- Judgment-heavy classification items: NFP contributions, subsequent-event type, and contingency disclosure (gain contingencies are keyed "disclose only").
