# FAR standards currency — reference sheet for reviewers (2026 CPA Exam)

Prepared 2026-10-07 for reviewers of FAR content. Covers the AICPA rule on when new pronouncements become testable, the 2026 FAR/BAR scope split, FASB ASUs 2023-01 through 2026-03, key ASC rules, and GASB Statements 96–105.

## How to read this sheet

**Status labels**

| Label | Meaning |
|---|---|
| `verified` | Confirmed in this pass by search results from a Big-4 or firm publication (Deloitte DART, KPMG, RSM, BDO, Crowe, Grant Thornton and similar), the Journal of Accountancy, or the AICPA, all citing the FASB, GASB or AICPA. |
| `partial` | The core fact (dates, main requirement) is verified. Some detail in the cell is `from-memory`. |
| `from-memory` | The author's own knowledge. Not re-confirmed in this pass. |
| `unverified` | Could not be confirmed, or sources were thin. |
| `conflict` | Sources disagree. Check the official AICPA Blueprint or FASB/GASB text before relying on it. |

**Limits of this pass**

- Direct fetches of fasb.org, gasb.org and aicpa-cima.com were blocked. Every `verified` fact comes from search-result text, not from reading the primary document. Before treating a row as final, open the primary source (the FASB ASU PDF, the GASB Statement, the AICPA Blueprint PDF).
- The search budget ran out partway through. Part 3 (key ASC rules), Part 5 (fund balance and modified accrual) and some GASB 103/105 details are therefore `from-memory`. These are long-settled GAAP rules with low risk, but they are not re-verified here.

**Date convention**

- "FY > 12/15/2025" means fiscal years (annual periods) beginning after December 15, 2025.
- "PBE" means public business entity.

---

## 1. AICPA testability rule and 2026 FAR scope

### 1a. The rule (current wording)

| Item | Finding | Source | Status |
|---|---|---|---|
| Current rule | "Changes in accounting and auditing pronouncements are eligible to be tested on the Uniform CPA Examination in the **later of**: (1) the **first calendar quarter beginning after the pronouncement's earliest mandatory effective date, regardless of entity type** or (2) the **first calendar quarter beginning six (6) months after the pronouncement's issuance date**." | https://www.aicpa-cima.com/resources/article/learn-what-is-tested-on-the-cpa-exam ; https://www.surgent.com/blog/cpa-exam-policy-on-new-pronouncements/ | `verified` |
| Wording in the task brief (outdated) | The brief's version ("six months after the effective date, or six months after issuance if early application is permitted") is the **pre-2016 rule**. The current rule took effect with the testing window beginning **April 1, 2016** and applies to pronouncements issued after July 1, 2015. **Permitting early adoption no longer makes a standard testable sooner.** | Same as above | `verified` |
| How this sheet applies the rule | (A) = first quarter start after the earliest mandatory effective date. "FY > 12/15/2025" is read as effective 12/16/2025, so (A) = 1/1/2026. The earliest date usually belongs to PBEs. (B) = first quarter start on or after issuance date + 6 months. **Eligible from = later of (A) and (B).** "Eligible in 2026" means that date falls on or before 10/1/2026. | Applied by this author | Interpretation |
| Concepts Statements | They have no effective date, so only test (B) applies. The AICPA text refers to "accounting and auditing pronouncements". Applying it to nonauthoritative Concepts Statements is this author's reading. | — | Interpretation |
| Superseded guidance | Until a new pronouncement becomes eligible, the existing guidance is what the exam tests. Example: ASC 350-40's project-stage model for internal-use software stays testable until ASU 2025-06 becomes eligible on 1/1/2028. | — | `from-memory` |

### 1b. 2026 Blueprint (effective 1/1/2026) — what changed

| Item | Finding | Source | Status |
|---|---|---|---|
| Nature of the 2026 changes | The Board of Examiners approved them on 8/18/2025. They are targeted refinements: updated references and clarified representative tasks. The structure and format of the exam are unchanged. | https://atlascpaindex.com/news/cpa-exam-blueprint-changes-2026 ; https://www.dokoblog.com/wp-content/uploads/2025/10/Summary-of-Changes-to-the-Exam-Blueprints-effective-01012026.pdf (copy of the AICPA summary) | `verified` (secondary) |
| Fair value (ASC 820) scope between FAR and BAR | Changes were made to align ASC 820 testing between FAR and BAR. One secondary source says FAR **removed two** fair-value representative tasks and **added one**. BAR Area I swapped one task. `docs/BLUEPRINT_NOTES.md` says FAR replaced **one** Area I task. | Same as above | `conflict` (count) |
| FAR format | 50 MCQs and 7 TBS, weighted 50/50. Areas: I Financial Reporting 30–40%, II Select Balance Sheet Accounts 30–40%, III Select Transactions 25–35%. | https://accounting.uworld.com/cpa-review/cpa-exam/blueprints/ ; repo `docs/BLUEPRINT_NOTES.md` | `verified` |

### 1c. FAR vs BAR scope (CPA Evolution split, carried into the 2026 Blueprint)

Becker and the Journal of Accountancy list these former FAR topics as **moved to BAR**:

- indefinite-lived intangible assets, including goodwill
- internally developed software
- analysis-level revenue recognition tasks
- stock compensation
- R&D costs
- business combinations
- consolidated financial statements
- derivatives and hedge accounting
- leases: **sale-leaseback and lessor** accounting
- public company reporting, Regulation S-X/S-K and XBRL
- disclosures for reportable segments
- financial statements of employee benefit plans
- governmental: the financial section of the ACFR, deriving government-wide statements and reconciliations, and "typical items and specific types of transactions and events"

Sources:

- https://www.becker.com/cpa-review/exam-content
- https://www.journalofaccountancy.com/newsletters/academic-update/cpa-evolution-and-the-cpa-exam-information-and-insights-for-accounting-academics

The table below covers each topic. "FAR 2026?" says whether FAR still tests it.

| Topic | FAR 2026? | Notes | Source | Status |
|---|---|---|---|---|
| Business combinations (acquisition method), JV formation (ASU 2023-05), acquirer in VIE deals (ASU 2025-03) | No (BAR) | — | Becker list above | `verified` |
| Consolidations: VIEs, NCI detail, foreign currency translation | No (BAR) | Whether FAR keeps any "basic consolidation" content is disputed. The repo's notes say FAR tests "basic" consolidations; the Becker/JofA list moves "consolidated financial statements" to BAR. | Becker list ; https://eduyush.com/blogs/cima/bar-cpa-exam-guide | `verified` (BAR) / `conflict` (FAR basic consolidations) |
| Derivatives and hedging (incl. ASU 2025-07 and 2025-09) | No (BAR) | — | Becker list | `verified` |
| Lessor accounting **and sale-leaseback** | No (BAR) | FAR keeps lessee accounting. | Becker list | `verified` |
| Stock compensation (incl. ASU 2024-01 and 2025-04) | No (BAR) | — | Becker list | `verified` |
| Goodwill and indefinite-lived intangibles | No (BAR, per Becker) | The repo's notes place "intangibles (incl. goodwill)" in FAR Area II. | Becker list | `conflict` |
| Internally developed or internal-use software (ASU 2025-06) | No (BAR) | — | Becker list | `verified` |
| R&D costs | No (BAR) | — | Becker list | `verified` |
| Segment reporting (ASC 280 / ASU 2023-07) | Probably **No** (BAR) | Becker lists "disclosures for reportable segments" as BAR, and BAR prep sites title tasks that way (https://www.superfastcpa.com/bar-cpa-exam-understanding-the-financial-statement-note-disclosure-requirements-for-reportable-segments/). The repo's notes place segments in FAR Area I. | Becker list | `conflict` |
| EPS (ASC 260) | Unclear | One secondary source says FAR Area I "public company reporting topics" (https://eduyush.com/blogs/cima/earnings-per-share-basic-diluted-cpa-far-guide). Becker lists "public company reporting" as moved to BAR. | — | `conflict` |
| Employee benefit **plan** financial statements (ASC 960/962/965) | Probably **No** (BAR) | Becker list, plus BAR prep task titles (https://www.superfastcpa.com/bar-cpa-exam-understanding-the-required-financial-statements-for-a-defined-benefit-pension-plan-and-a-defined-contribution-pension-plan/). The repo's notes place these in FAR Area I. | — | `conflict` |
| Defined benefit pension **employer** accounting (ASC 715) | Not found in any FAR 2026 summary | Prep sites still teach it, but none ties it to a 2026 FAR representative task. Treat it as low priority until the official Blueprint is checked. | repo `docs/BLUEPRINT_NOTES.md` | `unverified` |
| Conceptual framework and standard setting | Yes (FAR Area I) | Concepts Statement 8 Ch. 5 (Recognition and Derecognition, issued **8/30/2023**) is eligible from 4/1/2024. **Ch. 6 (Measurement) was issued 7/12/2024, not December 2024**, and is eligible from 4/1/2025. Both fall within the 2026 window. | https://www.journalofaccountancy.com/news/2024/jul/fasb-issues-new-chapter-of-conceptual-framework.html ; https://www.journalofaccountancy.com/news/2023/sep/fasb-issues-new-chapter-of-conceptual-framework ; https://www.cpapracticeadvisor.com/2024/07/15/fasbs-conceptual-framework-completed-with-last-chapter/107966/ | `verified` (dates) |
| Not-for-profit (ASC 958) financial statements | Yes (FAR Area I) | — | repo notes; UWorld | `partial` |
| State and local government | **FAR: foundational only** — concepts, measurement focus and basis of accounting, fund types, format and content of government-wide and fund statements at a lower skill level | **BAR:** ACFR financial section, deriving government-wide statements and the reconciliations, specific transactions (capital assets, long-term liabilities, interfund activity, nonexchange revenue, budgetary and encumbrance entries) | Becker list ; https://www.superfastcpa.com/bar-cpa-exam-how-to-prepare-a-schedule-to-reconcile-fund-balances-in-the-governmental-financial-statements-to-net-position-in-government-wide-statements/ ; https://accounting.uworld.com/cpa-review/cpa-exam/blueprints/ | `partial` (the exact FAR representative-task wording was not seen) |
| IFRS | Believed not tested since the 2024 Blueprints | — | — | `from-memory` / `unverified` |

---

## 2. FASB ASUs, 2023-01 to 2026-03

For each ASU, the "Eligible for 2026?" column applies the rule in Part 1a, using (A) the effective-date test and (B) the issuance + 6 months test. "BAR" in the Topic column means the topic is outside FAR scope (Part 1c).

### 2a. 2023 ASUs

| Pronouncement | Topic | Issued | Effective (PBE / other) | Early adoption? | Eligible for 2026 CPA testing? | Source URL | Status |
|---|---|---|---|---|---|---|---|
| ASU 2023-01 | Leases (842), common-control arrangements. Leasehold improvements in common-control leases are amortized over their useful life **to the common-control group**, regardless of lease term. Private companies get a practical expedient to use the written terms. | 3/27/2023 | All entities: FY > 12/15/2023 | Yes | **Yes**, from 1/1/2024 | https://dart.deloitte.com/USDART/home/publications/deloitte/heads-up/2023/fasb-asu-guidance-common-control-lease ; https://rsmus.com/insights/financial-reporting/fasb-issues-asu-on-leases-between-entities-under-common-control.html | `verified` |
| ASU 2023-02 | Equity method (323). Proportional amortization method extended beyond LIHTC to other tax-credit programs, elected program by program. | 3/2023 (exact date `from-memory`: 3/29/2023) | PBE: FY > 12/15/2023 / Other: FY > 12/15/2024 | Yes | **Yes**, from 1/1/2024 | https://www.bdo.com/getattachment/24d5b8d0-1634-4fdb-af4a-543577b892e0/2024-BDO-Annual-Nonprofit-Accounting-Auditing-Update-FINAL.pdf?lang=en-US | `partial` |
| ASU 2023-05 | Joint venture formations (805-60). A new JV measures its net assets at fair value on formation. **BAR.** | 8/2023 (`from-memory`) | JVs formed on or after 1/1/2025 (prospective) | Yes | **Yes**, from 4/1/2025 at the latest | https://dart.deloitte.com/USDART/home/publications/deloitte/heads-up/2023/fasb-asu-joint-venture-formations ; https://bdo.com/insights/assurance/new-accounting-for-joint-venture-formations | `verified` |
| ASU 2023-06 | Disclosure improvements: 14 of 27 SEC-referred items added to the Codification. **Each amendment takes effect only when the SEC removes its own version of that requirement.** If the SEC has not done so by **6/30/2027**, the amendment is removed and never takes effect. | 10/2023 | SEC registrants: the date the SEC removal takes effect / Others: two years later | No (for SEC registrants) | **No** for any item whose SEC removal has not taken effect. Whether the SEC has acted on any item is `unverified`. | https://dart.deloitte.com/USDART/home/publications/deloitte/heads-up/2023/fasb-approves-changing-usgaap-presentation-disclosure-requirements ; https://rsmus.com/insights/financial-reporting/fasb-adopts-certain-sec-recommended-disclosure-updates.html | `partial` |
| ASU 2023-07 | Segment reporting (280). Significant segment expenses regularly provided to the CODM, "other segment items", segment disclosures in interim periods, the CODM's title. Single-segment entities also apply it (`from-memory`). **Likely BAR.** | 11/27/2023 | Public entities: FY > 12/15/2023; interim periods in FY > 12/15/2024 / Not applicable to entities outside ASC 280 | Yes | **Yes**, from 7/1/2024 | https://www.aicpa-cima.com/resources/download/cpea-alert-asu-2023-07-reportable-segment-disclosures | `verified` |
| ASU 2023-08 | Crypto assets (350-60). Measured at **fair value through net income** and presented separately from other intangibles. Previously cost less impairment. | 12/13/2023 | All entities: FY > 12/15/2024 | Yes | **Yes**, from 1/1/2025 | https://dart.deloitte.com/USDART/home/publications/deloitte/heads-up/2023/fasb-issues-asu-crypto-assets | `verified` |
| ASU 2023-09 | Income tax disclosures (740). **PBEs:** a tabular rate reconciliation in both percentages and amounts, using **8 specified categories**. Items at or above **5%** of (pretax income × the statutory rate) are broken out separately. **All entities:** income taxes paid, disaggregated by federal, state and foreign, and by individual jurisdictions at or above 5% of total taxes paid. Non-PBEs give a qualitative description of reconciling items (`from-memory`). | 12/2023 (`from-memory`: 12/14/2023) | PBE: annual periods > 12/15/2024 / Other: annual periods > 12/15/2025 | Yes | **Yes**, from 1/1/2025 | https://rsmus.com/insights/financial-reporting/fasb-issues-final-standard-on-income-tax-disclosures.html ; https://dart.deloitte.com/USDART/home/publications/deloitte/heads-up/2025/income-tax-disclosure-considerations-related-adoption-asu-2023-09 | `verified` |

The 8 rate-reconciliation categories in ASU 2023-09:

1. State and local income tax, net of the federal effect
2. Foreign tax effects
3. Effect of changes in tax laws or rates enacted in the period
4. Effect of cross-border tax laws
5. Tax credits
6. Changes in valuation allowances
7. Nontaxable or nondeductible items
8. Changes in unrecognized tax benefits

### 2b. 2024 ASUs and ASU 2025-01

| Pronouncement | Topic | Issued | Effective (PBE / other) | Early adoption? | Eligible for 2026 CPA testing? | Source URL | Status |
|---|---|---|---|---|---|---|---|
| ASU 2024-01 | Profits interests (718). Adds an illustrative example with four fact patterns showing whether a profits-interest award falls under ASC 718 or ASC 710. **BAR** (stock compensation). | 3/2024 (`from-memory`: 3/21/2024) | PBE: annual periods > 12/15/2024 / Other: annual periods > 12/15/2025 | Yes | **Yes**, from 1/1/2025 | https://www.ksmcpa.com/insights/accounting-standards-update-4-23-24/ ; https://dart.deloitte.com/USDART/home/publications/deloitte/financial-reporting-checklists/gaap-checklist-q1-2024-quarterly-update | `verified` |
| ASU 2024-02 | Codification improvements. Removes references to Concepts Statements, separating authoritative from nonauthoritative literature. | 3/2024 (`from-memory`) | PBE: FY > 12/15/2024 / Other: FY > 12/15/2025 | Yes | **Yes**, from 1/1/2025 | same as ASU 2024-01 | `verified` |
| ASU 2024-03 | DISE (220-40). **PBEs only.** In the notes, break each relevant expense caption into: purchases of inventory, employee compensation, depreciation, intangible asset amortization, and DD&A for oil and gas or other depletion. Also disclose total selling expenses and, annually, the entity's definition of selling expenses. | 11/4/2024 | PBE: annual periods > 12/15/2026; interim periods within annual periods > 12/15/2027 / Not required for other entities | Yes | **No.** Eligible from **1/1/2027**. | https://kpmg.com/kpmg-us/content/dam/kpmg/frv/pdf/2024/defining-issues-fasb-asu-disaggregation-of-income-statement-expenses.pdf ; https://dart.deloitte.com/USDART/home/publications/deloitte/accounting-spotlight/2025/asu-2024-03-faq-disaggregation-income-statement-expense | `verified` |
| ASU 2025-01 | Clarifies the DISE effective date: **annual periods beginning after 12/15/2026**, and interim periods within annual periods beginning after 12/15/2027. Fixes a reading under which non-calendar-year PBEs would first adopt in an interim period. | 1/2025 (reported 1/6/2025) | Same as ASU 2024-03 | Yes | **No.** Eligible from **1/1/2027**. | https://www.cpapracticeadvisor.com/2025/01/06/fasb-clarifies-interim-effective-date-of-disaggregation-standard-for-some-public-companies/153971/ | `verified` |
| ASU 2024-04 | Induced conversions of convertible debt (470-20). Clarifies when a settlement on terms other than the original ones counts as an induced conversion. Applies to instruments with cash conversion features (`from-memory`). | 11/2024 (`from-memory`: 11/26/2024) | All entities: annual periods > 12/15/2025 | Yes, if the entity has adopted ASU 2020-06 | **Yes**, from 1/1/2026 | https://dart.deloitte.com/USDART/home/publications/deloitte/heads-up/2024/fasb-issues-final-standard-induced-conversions-convertible-debt-instruments ; https://rsmus.com/insights/financial-reporting/summary-of-accounting-standards-update-asu-2024-04.html | `verified` |

### 2c. ASUs 2025-02 to 2025-12

| Pronouncement | Topic | Issued | Effective (PBE / other) | Early adoption? | Eligible for 2026 CPA testing? | Source URL | Status |
|---|---|---|---|---|---|---|---|
| ASU 2025-02 | Removes SEC SAB Topic 5.FF (crypto safeguarding obligations) from ASC 450-10-S99 after SAB 122 rescinded SAB 121. SEC material only. | 3/2025 | Effective on issuance (`from-memory`) | n/a | **Yes**, from 10/1/2025, but of minimal FAR relevance | https://dart.deloitte.com/USDART/home/news/all-news/2025/mar/fasb-asu-2025-02 | `partial` |
| ASU 2025-03 | Identifying the accounting acquirer when the legal acquiree is a VIE (805/810). The primary beneficiary is no longer automatically the acquirer: apply the ASC 805-10-55-12 to 55-15 factors, so a reverse acquisition is possible. **BAR.** | 5/12/2025 | All entities: annual periods > 12/15/2026 (prospective) | Yes | **No.** Eligible from 1/1/2027. | https://dart.deloitte.com/USDART/home/publications/deloitte/heads-up/2025/fasb-asu-2025-03-identifying-acquirer-business-combination-variable-interest-entity-vie-asc-805 | `verified` |
| ASU 2025-04 | Share-based consideration payable to a customer (606/718). The "performance condition" definition now covers vesting based on customer purchases. Removes the forfeiture-as-they-occur election for customer awards. The ASC 606 variable-consideration constraint does not apply. **BAR.** | 5/2025 (reported 5/15/2025) | All entities: annual periods > 12/15/2026 | Yes | **No.** Eligible from 1/1/2027. | https://rsmus.com/insights/financial-reporting/fasb-issues-guidance-on-share-based-consideration-issued-to-a-customer.html | `verified` |
| **ASU 2025-05** | **Credit losses on current AR and current contract assets from ASC 606 transactions (326-20).** (1) A **practical expedient for all entities**: when developing reasonable and supportable forecasts, **assume current conditions as of the balance sheet date do not change for the remaining life of the asset**. Historical loss data is still adjusted for current-condition and asset-specific differences. (2) **Entities other than PBEs** that elect the expedient may also make an **accounting policy election to consider collection activity after the balance sheet date** when estimating credit losses. | 7/30/2025 | All entities: annual periods > 12/15/2025, plus interim periods within them | Yes (FS not yet issued or available for issuance) | **Yes, from 4/1/2026.** (A) = 1/1/2026; (B) = 4/1/2026. **Not testable in Q1 2026.** | https://dart.deloitte.com/USDART/home/publications/deloitte/heads-up/2025/fasb-amends-guidance-on-the-measurement-of-credit-losses-for-accounts-receivable ; https://www.aicpa-cima.com/resources/article/asu-2025-05-improvements-to-accounting-for-credit-losses ; https://www.grantthornton.com/insights/articles/audit/2025/snapshot/august/measuring-credit-losses | `verified` (prospective transition) |
| ASU 2025-06 | Internal-use software (350-40). **Removes all references to project stages.** Capitalization starts when (1) management has authorized and committed to funding the project and (2) it is **probable the project will be completed** and the software used as intended (the "probable-to-complete" threshold). Detail on "significant development uncertainty" and the website-cost subtopic is `from-memory`. **BAR.** | 9/18/2025 | All entities: annual periods > 12/15/2027 | Yes | **No.** Eligible from 1/1/2028. The **stage model is still the tested rule**. | https://www.crowe.com/insights/take-into-account/fasb-revises-internal-use-software-cost-guidance ; https://www.pkfod.com/insights/fasbs-internal-use-software-guidance-what-companies-need-to-know/ | `verified` (core) |
| ASU 2025-07 | Derivatives scope refinements (815): new scope exception for non-exchange-traded contracts whose underlying is based on the operations or activities of one party. Also clarifies that **share-based noncash consideration from a customer** is accounted for under ASC 606 first, before ASC 815 or ASC 321. **BAR.** | 9/2025 | All entities: annual periods > 12/15/2026 | Yes | **No.** Eligible from 1/1/2027. | https://kpmg.com/us/en/frv/reference-library/2025/fasb-issues-asu-derivative-scope-refinements.html ; https://dart.deloitte.com/USDART/home/publications/deloitte/heads-up/2025/fasb-derivatives-scope-refinements-share-based-payments | `verified` |
| ASU 2025-08 | Purchased loans (326). The **gross-up approach** is extended to "purchased seasoned loans": loans acquired in a business combination, or more than 90 days after origination by a buyer not involved in origination. This removes the day-1 credit loss expense. | 11/12/2025 | Annual and interim periods in FY > 12/15/2026 (prospective) | Yes | **No.** Eligible from 1/1/2027. | https://dart.deloitte.com/USDART/home/publications/deloitte/heads-up/2025/fasb-asu-2025-08-accounting-purchased-loans | `verified` |
| ASU 2025-09 | Hedge accounting improvements (815), in 5 areas: similar-risk assessment for cash flow hedges, choose-your-rate debt, nonfinancial forecasted transactions, net written options, dual hedges. **BAR.** | 11/25/2025 | PBE: annual periods > 12/15/2026 / Other: annual periods > 12/15/2027 (non-PBE date from one secondary source only) | Yes, on or after 11/25/2025 | **No.** Eligible from 1/1/2027. | https://dart.deloitte.com/USDART/home/publications/deloitte/heads-up/2025/fasb-amends-guidance-hedge-accounting ; https://rsmus.com/insights/financial-reporting/fasb-issues-asu-hedge-accounting-improvements.html | `verified` (PBE) / `unverified` (non-PBE) |
| ASU 2025-10 | **New Topic 832: government grants received by business entities. This is new recognition guidance; before it, U.S. GAAP had none.** A grant is a transfer of a monetary asset or tangible nonmonetary asset from a government, other than in an exchange. NFPs and certain employee benefit plans are excluded. The recognition model (`from-memory`, modeled on IAS 20): recognize when it is probable the entity will comply with the conditions and the grant will be received. Asset grants use either a deferred-income or a cost-reduction approach; income grants are recognized systematically as the related costs are incurred. | 12/4/2025 | PBE: FY > 12/15/2028 / Other: FY > 12/15/2029 | Yes | **No.** Eligible from 1/1/2029. | https://www.stout.com/en/insights/commentary/asu-2025-10-government-grants ; https://www.citrincooperman.com/In-Focus-Resource-Center/Financial-Accounting-Standards-Board-Issues-New-Guidance-for-Government-Grants | `verified` (scope, dates) / `from-memory` (model) |
| ASU 2025-11 | Interim reporting (270), narrow scope. Defines when ASC 270 applies, lists the interim disclosures required by other Topics, and adds a principle: disclose events since the last annual period that have a material impact. It neither expands nor reduces existing interim disclosures. | 12/8/2025 | PBE: interim periods within annual periods > 12/15/2027 / Other: > 12/15/2028 | Yes | **No.** Eligible from 1/1/2028. | https://dart.deloitte.com/USDART/home/publications/deloitte/heads-up/2025/fasb-asu-2025-11-interim-reporting-asc-270 | `verified` |
| ASU 2025-12 | Codification improvements covering 33 issues. Includes a clarification of **diluted EPS when there is a loss from continuing operations** (applied retrospectively), lease receivable disclosures for sales-type and direct financing leases, and the reference amount for beneficial interests. | 12/17/2025 | All entities: annual (and interim) periods > 12/15/2026 | Yes | **No.** Eligible from 1/1/2027. | https://dart.deloitte.com/USDART/home/news/all-news/2025/dec/fasb-makes-codification-improvements ; https://arch.bdo.com/2025-Codification-Improvements ; https://kpmg.com/kpmg-us/content/dam/kpmg/frv/pdf/2026/asu-effective-dates.pdf | `verified` |

### 2d. 2026 ASUs (through 10/7/2026)

| Pronouncement | Topic | Issued | Effective (PBE / other) | Early adoption? | Eligible for 2026 CPA testing? | Source URL | Status |
|---|---|---|---|---|---|---|---|
| ASU 2026-01 | Equity (505). **Paid-in-kind dividends** on equity-classified preferred stock are initially measured at the **stated PIK dividend rate**. Transition is prospective, or a cumulative-effect adjustment to retained earnings. | 4/2026 | All entities: annual periods > 12/15/2026 | Yes | **No.** Eligible from 1/1/2027. | https://kpmg.com/us/en/frv/reference-library/2026/fasb-issues-final-asu-pik-dividends-equity-classified-preferred-stock.html ; https://storage.fasb.org/ASU%202026-01.pdf | `verified` |
| ASU 2026-02 | **New Topic 818: environmental credits and environmental credit obligations.** Covers recognition, measurement, presentation and disclosure. Retrospective transition with a cumulative-effect adjustment. | 5/19/2026 | PBE: annual periods > 12/15/2027 / Other: one year later | Yes | **No.** Eligible from 1/1/2028. | https://arch.bdo.com/Environmental-Credit-Guidance-Established-Under-ASC-818 ; https://uniqus.com/fasbs-accounting-standards-update-asu-2026-02/ | `verified` |
| ASU 2026-03 | Fair value (820). **Investment companies (ASC 946)** must reflect contractual sale restrictions (lock-ups) on equity securities as a discount and disclose it. This is a narrow exception to ASU 2022-03, under which such restrictions are ignored; ASU 2022-03 still applies to everyone else. | 9/9/2026 | All investment companies: FY > 12/15/2027 | Yes, any date after 9/9/2026 | **No.** Eligible from 1/1/2028. | https://dart.deloitte.com/USDART/home/publications/deloitte/heads-up/2026/fasb-asu-contractual-sale-restrictions ; https://kpmg.com/us/en/frv/reference-library/2026/fasb-asu-investment-company-fair-value-reporting.html | `verified` |
| Other 2026 ASUs | Deloitte's Q2 2026 roundup lists only the environmental-credit and PIK-dividend ASUs. Its Q3 2026 roundup lists only ASU 2026-03. Proposals still open include codification improvements, cash-equivalent disclosures and digital assets, and mortgage servicing rights. | — | — | — | — | https://dart.deloitte.com/USDART/home/publications/deloitte/accounting-roundup/2026/q2 ; https://dart.deloitte.com/USDART/home/publications/deloitte/accounting-roundup/2026/q3 | `verified` through Q3 2026. Anything issued after 9/30/2026 is not captured. |

### 2e. Earlier ASUs that often make older FAR material wrong

All rows in this table are `from-memory`. Check before relying on them.

| Pronouncement | What changed | Effective | Status |
|---|---|---|---|
| ASU 2020-06 | Convertible debt: removes the beneficial conversion feature and cash-conversion separation models. **Diluted EPS uses the if-converted method for convertibles**; the treasury stock method is no longer used for them. | PBE (non-SRC): FY > 12/15/2021; others: FY > 12/15/2023 | `from-memory` |
| ASU 2016-13 / ASU 2019-10 | CECL. Effective for private companies and NFPs for FY > 12/15/2022, so it now applies to all entities. | — | `from-memory` |
| ASU 2022-02 | Removes TDR recognition and measurement for **creditors** (ASC 310-40) and adds disclosures on modifications for borrowers in financial difficulty. **Debtors still apply ASC 470-60.** | With CECL adoption (FY > 12/15/2022) | `from-memory` |
| ASU 2022-03 | Contractual sale restrictions are not considered in the fair value of an equity security, and are disclosed. | PBE: FY > 12/15/2023 | `from-memory` |
| ASU 2022-04 | Supplier finance program disclosures; the rollforward was required one year later. | FY > 12/15/2022 | `from-memory` |
| ASU 2021-09 | Non-PBE lessees may elect the risk-free rate **by class of underlying asset**, not entity-wide. | — | `from-memory` |
| ASU 2020-07 | NFP gifts in kind: presented as a separate line item, with disclosures. | — | `from-memory` |

---

## 3. Key ASC rules often tested (2026 currency check)

Every row in this part is `from-memory`. The search budget ran out before these could be re-verified. These are long-settled rules, and the ASUs in Part 2 that change them are noted in the "2026 change?" column.

| Rule | Current requirement | 2026 change? | Status |
|---|---|---|---|
| **Lease classification** (ASC 842-10-25-2) | A lease is a **finance** lease for the lessee (sales-type for the lessor) if it meets any one of 5 criteria: (a) ownership transfers by the end of the term; (b) a purchase option the lessee is reasonably certain to exercise; (c) the term is a **major part** of remaining economic life (not applied if commencement falls at or near the end of economic life); (d) the PV of lease payments plus any residual value guaranteed by the lessee, not already in the payments, is at least **substantially all** of fair value; (e) the asset is so specialized it has no alternative use to the lessor. ASC 842-10-55-2 gives "one reasonable approach": **75% or more = major part**, **90% or more = substantially all**, last 25% of life = "at or near the end". | None. Lessor and sale-leaseback are BAR. | `from-memory` |
| Short-term lease exemption | Policy election by class of underlying asset: lease term **12 months or less** at commencement, with no purchase option reasonably certain of exercise. Expense straight-line; no ROU asset or liability. | None | `from-memory` |
| Lessee discount rate | Rate implicit in the lease if readily determinable; otherwise the incremental borrowing rate. **Non-PBE lessees** may elect a **risk-free rate by class of underlying asset** (ASU 2021-09), but must still use the implicit rate when it is readily determinable. | None | `from-memory` |
| Operating lease (lessee) | A single lease cost, generally **straight-line** over the term. ROU asset amortization is the plug: straight-line cost minus interest accretion on the liability. Finance lease: separate interest plus amortization, which front-loads expense. | None | `from-memory` |
| ASC 842 effective dates | PBE: FY > 12/15/2018. Private companies and most NFPs: FY > 12/15/2021 (ASU 2020-05). NFP conduit bond obligors: FY > 12/15/2019. The same model applies to NFPs. | None | `from-memory` |
| **CECL** (ASC 326-20) | Lifetime expected credit losses on financial assets at amortized cost (receivables, loans, HTM debt securities, net investment in leases, contract assets), recorded through an allowance and based on historical, current and reasonable-and-supportable-forecast information. AFS debt securities (326-30) use an allowance limited by a fair-value floor; "OTTI" no longer applies to them. | **ASU 2025-05 expedient testable from 4/1/2026** (Part 2c). ASU 2025-08 not until 2027. | `from-memory` |
| ASC 606 five steps | (1) Identify the contract. (2) Identify performance obligations. (3) Determine the transaction price. (4) Allocate it. (5) Recognize revenue when or as each obligation is satisfied. | ASU 2025-04 and 2025-07 not until 2027 (both BAR) | `from-memory` |
| ASC 740 | Deferred tax assets and liabilities are all **noncurrent** (ASU 2015-17) and measured at enacted rates. **Valuation allowance** if it is **more likely than not** (over 50%) that some portion will not be realized. **Uncertain tax positions** use two steps: (1) recognize if more likely than not to be sustained on technical merits; (2) measure at the largest amount more than 50% likely to be realized. | **ASU 2023-09 disclosures are testable** (Part 2a) | `from-memory` |
| ASC 820 | Exit price; principal (or most advantageous) market; highest and best use for nonfinancial assets. Level 1: quoted prices for identical items in active markets. Level 2: other observable inputs. Level 3: unobservable inputs. | The 2026 Blueprint re-scoped fair-value tasks between FAR and BAR. ASU 2026-03 is not until 2028. | `from-memory` |
| ASC 450 contingencies | Accrue a loss if it is **probable and reasonably estimable**. For a range, accrue the best estimate; if no amount in the range is better, accrue the **minimum**. Disclose if reasonably possible, or if probable but not estimable. Remote: generally no disclosure, except guarantees. **Gain contingencies are not recognized**; disclose with care to avoid misleading implications. | None | `from-memory` |
| ASC 855 subsequent events | **SEC filers** (and conduit bond obligors) evaluate through the date the statements are **issued**. **Other entities** evaluate through the date they are **available to be issued** and must disclose that date. SEC filers do not disclose it. Recognized events relate to conditions existing at the balance-sheet date; nonrecognized events relate to conditions arising after it (disclosed if material). | None. Compare GASB 105 for governments (Part 4). | `from-memory` |
| ASC 250 | Change in principle: retrospective, unless impracticable. Change in estimate: prospective. **Change in depreciation method = change in estimate effected by a change in principle**, applied prospectively. Change in reporting entity: retrospective. Error correction: restatement, with a prior-period adjustment to opening retained earnings. | None | `from-memory` |
| ASC 330 inventory | **LCNRV** for FIFO and average cost (ASU 2015-11). **LCM** for **LIFO and the retail inventory method**: replacement cost, capped at NRV and floored at NRV minus normal profit. | None | `from-memory` |
| ASC 350 goodwill | **Single step** since ASU 2017-04: impairment = reporting unit's carrying amount minus its fair value, limited to the goodwill allocated. An optional qualitative screen ("step zero") comes first. **Private-company and NFP alternative:** amortize straight-line over **10 years, or less** if a shorter life is more appropriate, and test only on a triggering event. **May be BAR scope** (Part 1c). | None. ASU 2025-06 (software) not until 2028. | `from-memory` |
| ASC 360 impairment (held and used) | **Step 1, recoverability:** carrying amount compared with **undiscounted** future cash flows. **Step 2:** loss = carrying amount minus **fair value**. No reversal. Held for sale: lower of carrying amount and fair value less cost to sell, no depreciation, and later recoveries allowed up to cumulative losses recognized. | None | `from-memory` |
| Capitalized interest (ASC 835-20) | Applies to qualifying assets built for the entity's own use, or as discrete projects for sale or lease. Amount = avoidable interest on weighted-average accumulated expenditures, using the specific borrowing rate first and then the weighted-average rate on other debt, **capped at actual interest incurred**. Not for routinely manufactured inventory or assets already in use. Capitalization starts when expenditures, activities and interest are all under way. | None | `from-memory` |
| Debt issuance costs | Presented as a **direct deduction from the debt's carrying amount** (ASU 2015-03) and amortized to interest expense by the effective-interest method. Line-of-credit costs may be shown as an asset (ASU 2015-15). | None | `from-memory` |
| ASC 470-50 10% test | If the PV of cash flows under the new terms (discounted at the **original** effective rate) differs by **10% or more** from the PV of the remaining original cash flows, the change is an **extinguishment**: new debt at fair value, with a gain or loss. Otherwise it is a **modification**: a new effective rate applied prospectively. | ASU 2024-04 (induced conversions) testable 2026 | `from-memory` |
| TDRs | **Creditor** TDR accounting was eliminated by ASU 2022-02, replaced by disclosures on modifications for borrowers in financial difficulty. **Debtors still use ASC 470-60:** with a creditor concession and debtor financial difficulty, recognize a gain if the future undiscounted cash flows are less than the carrying amount; asset transfers and equity grants are measured at fair value. | None | `from-memory` |
| Equity method (ASC 323) | Significant influence is presumed at 20–50%. The investment increases by the investor's share of income and decreases by dividends. Basis differences are allocated to undervalued assets (and depreciated) and to equity-method goodwill (neither amortized nor separately tested). Impairment if a decline is "other than temporary". **No retroactive adjustment when an investment becomes equity method** (ASU 2016-07). | ASU 2023-02 testable | `from-memory` |
| ASC 321 equity securities | Measured at fair value through net income; **there is no AFS category for equity securities** (ASU 2016-01). **Measurement alternative** for equity without a readily determinable fair value: cost minus impairment, adjusted up or down for observable price changes in orderly transactions for identical or similar securities of the same issuer. Impairment uses a qualitative assessment and a write-down to fair value. | None | `from-memory` |
| ASC 230 cash flows | U.S. GAAP: interest paid, interest received and dividends received are **operating**; dividends paid are **financing**. ASU 2016-15 settles 8 specific cases, e.g. debt prepayment costs are financing; on a zero-coupon settlement, accreted interest is operating and principal is financing. **Restricted cash is included in beginning and ending cash** (ASU 2016-18). Supplemental disclosures: interest paid (net of capitalized interest) and income taxes paid, the latter **disaggregated by jurisdiction under ASU 2023-09**. | ASU 2023-09 testable | `from-memory` |
| ASC 958 NFP | ASU 2016-14: **two net asset classes**, with and without donor restrictions. Qualitative and quantitative **liquidity and availability** disclosures. **Expenses by both nature and function** in one location. Investment return shown net of external and direct internal investment expenses. Placed-in-service approach for long-lived asset restrictions, unless the donor specifies otherwise. ASU 2018-08: **contribution vs exchange** turns on commensurate value. A **conditional contribution** needs **both a barrier and a right of return** of assets (or right of release); it is recognized when the barrier is overcome. ASU 2020-07: gifts in kind. | ASU 2025-05 policy election is available to NFPs, since they are not PBEs | `from-memory` |

---

## 4. GASB Statements 96–105

For each Statement, the "Eligible for 2026?" column applies the rule in Part 1a. "FY > 6/15/2025" means fiscal years beginning after June 15, 2025. The last column says how each Statement changes what is commonly taught.

### 4a. Statements 96–102

| Pronouncement | Topic | Issued | Effective | Early adoption? | Eligible for 2026 CPA testing? | Source URL | Status | Change to commonly taught rules |
|---|---|---|---|---|---|---|---|---|
| GASB 96 | Subscription-based IT arrangements (SBITAs) | 5/2020 | FY > 6/15/2022 | Encouraged | **Yes**, from 7/1/2022 | (not re-searched) | `from-memory` | Government recognizes a subscription asset (intangible right-to-use) and a subscription liability, mirroring GASB 87 leases. Short-term exception when the maximum possible term is 12 months or less. Implementation costs follow three stages: preliminary (expense), initial implementation (capitalize), operation (expense). |
| GASB 99 | Omnibus 2022 | 4–5/2022 (sources differ) | Some items on issuance. Leases, PPPs and SBITAs: FY > 6/15/2022. Financial guarantees and derivative-instrument classification: FY > 6/15/2023. | Encouraged | **Yes** | https://financialexecutives.org/Profession/2022/Q2-2022/GASB.aspx | `verified` (dates) | Technical clarifications only. |
| GASB 100 | Accounting changes and error corrections | 6/13/2022 | FY > 6/15/2023 | Encouraged | **Yes**, from 7/1/2023 | https://financialexecutives.org/Profession/2022/Q2-2022/GASB.aspx ; https://criadv.com/wp-content/uploads/2025/01/cri-gasb-pronouncement-chart-sheet-2025.pdf | `verified` (dates) / `from-memory` (detail) | Four categories: change in principle, change in estimate, change to or within the reporting entity, error correction. Changes in principle and error corrections are **retroactive** (restate beginning balances). **Changes in estimate are prospective.** Changes to or within the reporting entity adjust beginning balances. Notes show restatements in a **tabular display by reporting unit**. Older material that says "cumulative effect in current-year operations" is wrong. |
| GASB 101 | Compensated absences | 6/2023 | FY > 12/15/2023 | Encouraged | **Yes**, from 1/1/2024 | https://rsmus.com/insights/financial-reporting/gasb-revises-requirements-for-compensated-absences.html ; https://www.bakertilly.com/insights/gasb-statement-101-compensated-absences | `verified` (core) | **Replaces the GASB 16 vesting and termination-payment models.** Recognize a liability for (1) unused leave that is attributable to services already rendered, accumulates, and is **more likely than not to be used or paid**, and (2) leave used but not yet paid. Include salary-related payments. Certain leave (parental, military, jury duty) is recognized when used (`from-memory`). Governmental funds still report only amounts due (`from-memory`). |
| GASB 102 | Certain risk disclosures | 12/2023 | FY > 6/15/2024 | Encouraged | **Yes**, from 7/1/2024 | https://www.gfoa.org/gasb-releases-statement-no.-102-certain-risk-disclosures ; https://www.bdo.com/insights/industries/government-public-sector/gasb-102-certain-risk-disclosures | `verified` (core) / `from-memory` (criteria) | Disclose **concentrations** (lack of diversity in significant inflows or outflows) and **constraints** (limits imposed externally or by the highest decision-making authority). Disclosure is required when the item is known before the statements are issued, makes the unit vulnerable to a **substantial impact**, and a triggering event has occurred, has begun, or is more likely than not to begin within 12 months. |

### 4b. Statements 103–105 and open projects

| Pronouncement | Topic | Issued | Effective | Early adoption? | Eligible for 2026 CPA testing? | Source URL | Status | Change to commonly taught rules |
|---|---|---|---|---|---|---|---|---|
| **GASB 103** | **Financial reporting model improvements** | 4/2024 | **FY > 6/15/2025** | Encouraged | **Yes, all of 2026** (from 7/1/2025) | https://www.bdo.com/insights/assurance/gasb-103-financial-reporting-model-improvements ; https://cbh.com/guide/articles/gasb-103-financial-reporting-model-improvements-explained ; https://www.crowe.com/insights/take-into-account/gasb-releases-financial-reporting-model-updates ; https://www.forvismazars.us/forsights/2026/09/gasb-2026-2027-outlook-what-to-watch | `verified` (items listed) / `partial` (detail) | See "GASB 103 in detail" below. |
| GASB 104 | Disclosure of certain capital assets | 9/2024 | FY > 6/15/2025 | Encouraged | **Yes**, from 7/1/2025 | https://www.journalofaccountancy.com/news/2024/oct/gasb-provides-guidance-for-certain-capital-assets.html ; https://bdo.com/insights/industries/government-public-sector/gasb-104-disclosure-of-certain-capital-assets | `verified` | In the capital-asset note, disclose **separately**: lease assets (GASB 87), intangible right-to-use assets in public-private and public-public partnerships (GASB 94), **subscription assets** (GASB 96), and other intangibles by major class. **Capital assets held for sale** need extra disclosure: historical cost and accumulated depreciation by major class. |
| **GASB 105** | **Subsequent events** | 12/2025 (reported 12/17/2025) | **FY > 6/15/2026** | Encouraged | **Yes, from 7/1/2026 (Q3 2026).** (A) = 7/1/2026; (B) = 7/1/2026. | https://www.crowe.com/insights/take-into-account/gasb-updates-disclosure-requirements-subsequent-events ; https://www.sikich.com/insight/gasb-statement-105-was-released-what-to-know/ ; https://www.cbh.com/insights/alerts/gasb-105-updated-guidance-on-subsequent-events/ | `verified` (dates) / `partial` (detail) | Standardizes the term "subsequent events" across GASB literature. Distinguishes **recognized** events (evidence about conditions existing at the statement date) from **nonrecognized** events. Specifies when notes are required and what to say about nonrecognized events. One summary says the date through which events were evaluated must be disclosed; confirm against the Statement. Older material that cites only the AU-C 560-based guidance for governments is outdated for FY > 6/15/2026. |
| GASB projects (not Statements) | Infrastructure assets: Exposure Draft March/April 2026, final expected mid-2027, effective possibly FY > 6/15/2028. Going concern and severe financial stress: Exposure Draft expected Q2 2027. **No GASB Statement 106 was found as of 10/7/2026.** | — | — | — | **Not testable** | https://www.forvismazars.us/forsights/2026/09/gasb-2026-2027-outlook-what-to-watch ; https://www.cpapracticeadvisor.com/2026/04/09/gasb-looks-to-improve-guidance-on-infrastructure-assets/181310/ ; https://go.plantemoran.com/rs/946-CTY-601/images/GOV_GASB_Quarterly_Updates_Q1_Q2_2026_8.5x11.pdf?version=0 | `verified` (as of search date) | — |

### GASB 103 in detail (changes to commonly taught rules)

1. **Budgetary comparison information is presented as RSI only.** The option to present the budgetary comparison as a basic financial statement is gone. The comparison covers the general fund and major special revenue funds. **Variance columns are now required for both final budget vs actual and original vs final budget.** Notes to RSI explain significant variances.
2. **MD&A** has 5 required sections:
   - overview of the financial statements
   - financial summary
   - detailed analyses
   - significant capital asset and long-term financing activity
   - currently known facts, decisions or conditions

   MD&A should explain *why* results changed and avoid boilerplate.
3. **Unusual or infrequent items** are presented separately, gross (inflows and outflows not netted), as the last flows before the net change. Notes disclose the program or function involved and whether the event was within management's control. These items **replace extraordinary and special items** (the replacement is `from-memory`; confirm in GASB 103).
4. **Proprietary fund statement of revenues, expenses and changes in fund net position:** operating and nonoperating items are newly defined. A new subtotal, "**operating income (loss) and noncapital subsidies**", appears, with noncapital subsidies reported separately. The order of the statement is prescribed.
5. **Major component units:** each is shown in the statements of net position and activities, unless that reduces readability. In that case, combining statements are presented after the fund statements.
6. **Statistical section:** changes to the financial trends schedules.

---

## 5. Governmental basics (fund balance, modified accrual, measurement focus)

Every row in this part is `from-memory`. None of these rules is changed by GASB 99–105, except where the "Effect of GASB 101–105" column says so.

| Rule | Current requirement | Effect of GASB 101–105 | Status |
|---|---|---|---|
| **Fund balance classifications** (GASB 54, governmental funds) | See the list below this table. | None | `from-memory` |
| **Modified accrual: "available"** | Revenue is recognized when **measurable and available**, meaning collectible within the period or soon enough after to pay current-period liabilities. For **property taxes**, available means collected within **60 days** after year-end (NCGA Interpretation 3 / GASB Cod. P70). Other revenues use the government's own disclosed availability period. Amounts not yet available are **deferred inflows of resources**. | None | `from-memory` |
| Property taxes (GASB 33, imposed nonexchange revenue) | A receivable arises at the enforceable legal claim date (or on receipt, if earlier). Revenue belongs to the **period for which the taxes are levied**. In governmental funds the 60-day availability test also applies. Taxes received or levied in advance are deferred inflows. | None | `from-memory` |
| Modified accrual expenditures | Recognized when the fund liability is incurred. Exceptions: unmatured principal and interest on general long-term debt are recognized **when due**. Compensated absences, claims and judgments, and similar items are recognized when due and payable from current resources. | GASB 101 changes how the government-wide liability is measured, not the fund-level "when due" rule | `from-memory` |
| Measurement focus and basis by fund type | **Governmental funds** (general, special revenue, capital projects, debt service, permanent): current financial resources focus, modified accrual. **Proprietary funds** (enterprise, internal service): economic resources focus, full accrual. **Fiduciary funds** (pension and OPEB trust, investment trust, private-purpose trust, custodial under GASB 84): economic resources focus, full accrual. | GASB 103 changes the format of the proprietary operating statement (Part 4) | `from-memory` |
| Government-wide statements | Economic resources focus and full accrual. Columns for governmental activities, business-type activities and discretely presented component units; **fiduciary activities are excluded**. Internal service funds are generally folded into governmental activities. **Statement of net position:** assets + deferred outflows − liabilities − deferred inflows = net position, split into net investment in capital assets, restricted and unrestricted. **Statement of activities:** net (expense) revenue by function. Program revenues are charges for services, operating grants and contributions, and capital grants and contributions; taxes are general revenues. | GASB 103: unusual or infrequent items, and major component units shown in the statements. **Deriving government-wide statements from fund statements is BAR.** | `from-memory` |

GASB 54 fund balance classes, in order:

1. **Nonspendable:** not in spendable form (inventories, prepaids), or legally or contractually required to be kept intact (a permanent fund's corpus).
2. **Restricted:** constraints imposed externally (creditors, grantors, contributors, other governments' laws) or by constitutional provision or enabling legislation.
3. **Committed:** set by formal action of the highest decision-making authority (for example, an ordinance) taken before year-end. Removing the commitment requires the same type of action.
4. **Assigned:** intended use set by the governing body or an official it has delegated. All positive residual amounts in governmental funds other than the general fund are assigned.
5. **Unassigned:** the general fund's residual. Other governmental funds can show only a negative unassigned balance.

Default spending order, unless the government's policy says otherwise: restricted first, then committed, then assigned, then unassigned. Stabilization arrangements must be disclosed.

---

## 6. Open items for the next pass

These need the official AICPA 2026 FAR and BAR Blueprint PDFs, or another search budget:

1. The FAR vs BAR placement of EPS, segment disclosures, employee benefit plan statements, goodwill impairment and "basic" consolidations. Becker's list conflicts with the repo's `docs/BLUEPRINT_NOTES.md` (Part 1c).
2. Whether defined benefit pension **employer** accounting appears in any FAR 2026 representative task.
3. The count of fair-value representative tasks changed in FAR in 2026 (two removed and one added, vs one replaced).
4. GASB 103: confirm that extraordinary and special items were eliminated, and the exact list of nonoperating categories in the proprietary fund statement.
5. GASB 105: confirm the disclosure requirements (whether the evaluation date must be disclosed) and the issue date.
6. ASU 2025-09: the effective date for entities other than PBEs.
7. ASU 2023-06: whether the SEC has removed any related S-X/S-K requirement, which would trigger an effective date.
8. All `from-memory` rows in Parts 3 and 5 (low risk, but not re-verified).
