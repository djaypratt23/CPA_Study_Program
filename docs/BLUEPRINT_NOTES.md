# CPA Exam Blueprint Notes

_Researched: 2026-09-22. Applies to the **Uniform CPA Examination Blueprints effective January 1, 2026**._

The app is structured around these notes. Every number below lives as data in
`content/sections/<section>.yaml`, so a blueprint update means editing YAML, not code.

## How this was researched (and its limits)

- The AICPA's own site (aicpa-cima.com) and the Blueprint PDF host could **not be fetched** from the build
  environment (network policy blocked them). Figures were therefore cross-checked across several
  independent secondary summaries of the 2026 Blueprints (UWorld/Roger, Becker, Gleim, Kesler, CPA Exam
  Guide, AICPA-derived summaries of the "Summary of Changes effective 01/01/2026", and state-board material).
- Where two or more sources agreed, the value is recorded as **confirmed (secondary)**. Anything resting on a
  single source or on inference is marked **verify**.
- **Action for the learner/maintainer:** download the official PDF at
  <https://www.aicpa-cima.com/resources/download/learn-what-is-tested-on-the-cpa-exam> and confirm the
  items marked _verify_. If anything differs, edit the section YAML.

## Exam model (all sections)

| Item | Value | Status |
|---|---|---|
| Core sections | AUD, FAR, REG | confirmed |
| Discipline sections (pick one) | BAR, ISC, TCP | confirmed |
| Length | 4 hours per section | confirmed |
| Testlets | 5: two MCQ testlets, then three TBS testlets | confirmed |
| Optional standardized break | After testlet 3; does not count against exam time (15 minutes) | confirmed (duration: verify) |
| Passing score | 75 (scale 0–99) | confirmed |
| Skill levels | Remembering & Understanding, Application, Analysis, Evaluation | confirmed |
| Scoring | Item response theory; includes unscored pretest items; no public raw→scaled conversion | confirmed |
| Blueprint effective date | 2026-01-01 | confirmed |

2026 changes were described by the AICPA as refinements (updated references, clarified representative
tasks) that do "not significantly change the nature or scope" of testable content. FAR: one Area I
representative task was replaced to clarify the scope of ASC 820 fair value testing.

## Per-section structure

| Section | MCQs (testlets 1–2) | TBS (testlets 3/4/5) | Weight MCQ/TBS | Status |
|---|---|---|---|---|
| AUD | 78 (39 + 39) | 7 (2/3/2) | 50/50 | confirmed |
| FAR | 50 (25 + 25) | 7 (2/3/2) | 50/50 | confirmed |
| REG | 72 (36 + 36) | 8 (2/3/3) | 50/50 | MCQ & weight confirmed; TBS split verify |
| BAR | 50 (25 + 25) | 7 (2/3/2) | 50/50 | confirmed |
| ISC | 82 (41 + 41) | 6 (2/2/2) | 60/40 | MCQ & weight confirmed; TBS split verify |
| TCP | 68 (34 + 34) | 7 (2/3/2) | 50/50 | confirmed |

### Content areas and skill allocations

**FAR** — Area I Financial Reporting 30–40% · Area II Select Balance Sheet Accounts 30–40% · Area III Select
Transactions 25–35%. Skills: R&U 5–15%, Application 45–55%, Analysis 35–45%. _(confirmed)_

- Area I: conceptual framework & standard setting; general-purpose financial statements for business
  entities (balance sheet, income statement, comprehensive income, equity, cash flows, notes, **basic**
  consolidations); public company reporting (10-K/10-Q/8-K, EPS, segments); financial statements of
  employee benefit plans; special purpose frameworks; not-for-profit financial statements; state & local
  government concepts (at a lighter level than BAR); ratios and performance metrics.
- Area II: cash & equivalents; trade receivables; inventory; PP&E; investments; intangibles (incl. goodwill);
  payables & accrued liabilities; debt; equity.
- Area III: accounting changes & error corrections; contingencies & commitments; revenue recognition;
  income taxes; fair value measurement; **lessee** accounting; subsequent events.
- Moved to BAR in 2024 (and therefore _not_ built as FAR content): business combinations (acquisition method),
  complex consolidations (VIEs, NCI detail, foreign currency), derivatives & hedging, **lessor** accounting,
  stock compensation, and most state & local government fund mechanics. _(confirmed)_
- _Verify:_ exact placement of employee benefit plan statements, EPS, and ratios within Area I (sources
  agree they are in FAR Area I; wording of representative tasks not seen first-hand). Defined benefit
  pension **employer** accounting is not listed in any FAR 2026 summary reviewed and is not built here.

**AUD** — I Ethics, Professional Responsibilities & General Principles 15–25% · II Assessing Risk & Developing
a Planned Response 25–35% · III Performing Further Procedures & Obtaining Evidence 30–40% · IV Forming
Conclusions & Reporting 10–20%. Skills: R&U 30–40%, Application 30–40%, Analysis 15–25%, Evaluation 5–15%.
_(areas confirmed; skill ranges verify)_

**REG** — I Ethics, Professional Responsibilities & Federal Tax Procedures 10–20% · II Business Law 15–25% ·
III Federal Taxation of Property Transactions 5–15% · IV Federal Taxation of Individuals 22–32% · V Federal
Taxation of Entities (incl. tax preparation) 23–33%. Skills: R&U 25–35%, Application 35–45%, Analysis
25–35%. _(areas I, IV, V confirmed; II, III and skills verify)_

**TCP** — I Tax Compliance & Planning for Individuals and Personal Financial Planning 30–40% · II Entity Tax
Compliance 30–40% · III Entity Tax Planning 10–20% · IV Property Transactions (disposition of assets)
10–20%. Skills: R&U 5–15%, Application 55–65%, Analysis 25–35%. _(areas I–II confirmed; III–IV and skills
verify)_. 2026 change: one international-tax representative task removed.

**BAR** — I Business Analysis 40–50% · II Technical Accounting & Reporting 35–45% · III State & Local
Governments 10–20%. _(confirmed)_ Not built in Phase 1 (learner chose TCP).

**ISC** — I Information Systems & Data Management 35–45% · II Security, Confidentiality & Privacy 35–45% ·
III Considerations for SOC Engagements 15–25%. _(verify)_ Not built in Phase 1.

## Research-type tasks

Since 2024 the stand-alone "search the Codification and enter the citation" research TBS is gone. Research
skills are assessed by having candidates **review excerpts of authoritative literature** (FASB ASC, AU-C /
PCAOB AS, IRC and Treasury Regulations) inside a TBS and apply them. The app mirrors this with a `research`
TBS part: the learner reads several original paraphrased excerpts and selects the one that governs the
situation. Excerpts in this app are paraphrases written for study, **not** quotations of copyrighted
standards.

## Federal tax legislation (REG and TCP)

- **Standard AICPA policy:** federal tax legislation is eligible for testing in the calendar quarter
  beginning **six months after its enactment date or its effective date, whichever is later**
  (the "six-month rule"). _(verify current wording in the Blueprint introduction)_
- **One Big Beautiful Bill Act (OBBBA, P.L. 119-21, signed July 4, 2025):** the Board of Examiners approved
  a special policy on 2025-09-18 — OBBBA provisions with effective dates in **2024 and 2025 are testable
  on REG and TCP beginning July 1, 2026**. OBBBA provisions effective in **2026 or later** follow the
  standard six-month rule. _(confirmed across multiple sources)_
- **App policy:** each tax module states the tax year it reflects in its frontmatter (`taxYear`) and the
  section YAML (`taxYear`, `taxNote`). Phase-1 tax sample modules cover topics (property basis, partnership
  formation) whose core rules were **not changed by OBBBA**, and reflect **tax year 2025** law as testable
  from July 1, 2026. Any dollar thresholds that OBBBA changed are avoided in Phase-1 items or flagged
  `needsReview`.

## Sources consulted

- AICPA & CIMA, "Learn what is tested on the CPA Exam" (Blueprint download page) and "Summary of revisions
  to the Uniform CPA Examination Blueprints effective 01/01/2026" (via mirrored copies/summaries)
- UWorld Roger CPA Review — 2026–2027 Blueprints, FAR/REG/TCP/BAR/AUD section pages
- Becker — "CPA Exam Blueprint", "Complete Guide to the 2026 AUD/REG CPA Exam"
- Gleim — "How the AICPA will roll the Big Beautiful Bill into the CPA Exam"
- CPA Exam Guide, Kesler CPA Review, Universal CPA Review, FreeFellow, King of the Curve — 2026 section guides
- The CPA Journal — "An Accounting Educator's Roadmap to Task-Based Simulations" (2025)
