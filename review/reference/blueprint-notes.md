# AICPA CPA Exam Blueprints effective 1 January 2026: reconstruction notes (FAR, AUD, REG, TCP)

Companion to `blueprint-tasks.csv`. Compiled 2026-10 for the content-coverage review.

## How this was built, and how far to trust it

- The official PDFs and their mirrors could not be fetched, because the egress proxy blocks them. The 2026 Blueprints are mirrored at [dokoblog CPA-Exam-Blueprints-2026.pdf][bp26] and [ctfassets CPA_Exam_Blueprints_2026.pdf][bp26c]. The Summary of Changes is mirrored at [dokoblog Summary-of-Changes…01012026.pdf][soc].
- I used only web search, about 45 queries before the shared budget ran out. Search results are summaries generated from those pages, so wording marked **verified** came from search output that quotes or paraphrases the Blueprint or the Summary of Changes. It can still differ in small details such as articles and punctuation.
- **Area names, weights, the 2026 changes and the inflation-indexing rule are well supported.** Several sources confirm them, including the Summary of Changes.
- **Group and topic lists** are confirmed for:
  - FAR Area I (6 groups), Area II (9 groups) and Area III (7 groups)
  - AUD Area IV (5 groups)
  - AUD Area I and II group names (secondary sources)
  - TCP Area I (4 groups), Area II (5 groups), Area III and Area IV
  - REG area names, plus several REG group names
- Group lettering and topic numbering are mostly **reconstructed** from knowledge of the 2021–2025 Blueprints. Treat letters and numbers as stable IDs, not as official citations, until someone checks them against the PDF.
- **Representative task text is mostly reconstructed.** That is 300 of 377 rows, and another 67 are `uncertain`. Only 10 rows are `verified`. The reconstructed rows follow the Blueprint's verb conventions:
  - Remembering and Understanding: recall, identify, understand
  - Application: calculate, prepare, determine, perform
  - Analysis: analyze, reconcile, "detect, investigate and correct discrepancies"
  - Evaluation (AUD only): evaluate

  They capture the testable content and skill level, but they are not verbatim Blueprint statements.

### CSV conventions

- `task_id` is `SECTION-Area.Group.Task` when a group has no topics (for example `FAR-II.D.3`), and `SECTION-Area.Group.Topic.Task` when it has topics (for example `FAR-I.A.1.2`).
  - The Blueprint numbers areas, groups and topics, but it does not number tasks. Task numbers here are sequential within each topic, in skill order (R&U, then Application, Analysis, Evaluation).
  - A `.T` suffix is reserved for topic-only rows. None were needed: every topic has at least a reconstructed task.
- `source_url`:
  - For `verified` rows, it is the page or PDF the text came from.
  - For other rows, it is the source that supports the group or topic name. Where none was found, it is the Blueprint PDF, as the place to check.
- Bracketed notes in group or topic names, such as `[placement uncertain]`, flag structural doubts.

### Row counts

| Section | Rows | verified | reconstructed | uncertain | topic-only |
|---|---|---|---|---|---|
| FAR | 119 | 6 | 95 | 18 | 0 |
| AUD | 114 | 3 | 86 | 25 | 0 |
| REG | 94 | 1 | 76 | 17 | 0 |
| TCP | 50 | 0 | 43 | 7 | 0 |
| **Total** | **377** | **10** | **300** | **67** | **0** |

## Facts common to all sections

- **Approval and timing.** The AICPA Board of Examiners approved the revisions on **18 August 2025**, effective **1 January 2026** ([Summary of Changes][soc]).
  - The changes are "not intended to significantly change the nature or scope of the content eligible for testing."
  - No sections were added, removed or reorganized. Exam format and timing are unchanged.
- **Exam model.** It is still the CPA Evolution model: three Core sections (AUD, FAR, REG) plus one Discipline (BAR, ISC or TCP). Each section is 4 hours.
  - The candidate gets an optional 15-minute standard break after testlet 3, which does not count against exam time.
  - Some items in every section are unscored pretest items.
  - MCQ and TBS each weigh 50% of the score in all four sections, and the passing score is 75.
- **H.R. 1 (One Big Beautiful Bill Act).** These rules apply to REG and TCP only ([Testing of H.R. 1 on the CPA Exam][hr1]).
  - Provisions with effective dates in 2024 and 2025 become eligible for testing on **1 July 2026**.
  - All other provisions become eligible in the calendar quarter that begins six months after the provision's effective date.
- **What was not changed in 2026.** BAR had no significant Blueprint changes. ISC changes covered data security and change management.
  - One secondary source, UWorld, wrongly attributed the ISC "change management / data management, two tasks added" item to TCP.

---

## FAR: Financial Accounting and Reporting (Core)

**Format:** 50 MCQ (2 testlets × 25) and 7 TBS (testlets of 2, 3 and 2).

**Skill allocation:**

| Skill level | Range |
|---|---|
| Remembering and Understanding | 5–15% |
| Application | 45–55% |
| Analysis | 35–45% |
| Evaluation | not tested |

**Area weights.** These are confirmed and match the structure you gave me.

| Area | Title | Weight |
|---|---|---|
| I | Financial Reporting | 30–40% |
| II | Select Balance Sheet Accounts | 30–40% |
| III | Select Transactions | 25–35% |

### Groups and topics

Each item is marked V (name verified in a search result) or R (reconstructed).

**Area I: Financial Reporting.** The six group names are V ([SuperfastCPA FAR guide][sfcfar], WallStreetMojo, cpaexamsmastery).

- **A. General-purpose financial reporting: for-profit business entities**
  1. Balance sheet/statement of financial position (V; its 3 tasks are V)
  2. Income statement/statement of profit or loss (R)
  3. Statement of comprehensive income (R)
  4. Statement of changes in equity (R)
  5. Statement of cash flows (R)
  6. Notes to financial statements (R)
  7. Consolidated financial statements (including wholly owned subsidiaries and noncontrolling interests). Sources conflict on this topic:
     - UWorld and Kesler still place NCI and basic consolidation in FAR.
     - Becker and Eduyush list consolidated financial statements among the topics that moved to BAR. That likely covers VIEs, complex NCI and foreign-currency translation.
     - The task wording "Prepare consolidated financial statements (includes adjustments, eliminations and/or noncontrolling interests) from supporting documentation" comes from the July 2021 Blueprint.
     - **Verify this topic.**
- **B. General-purpose financial reporting: nongovernmental not-for-profit entities**
  1. Statement of financial position (V; 2 tasks V)
  2. Statement of activities (V as a topic name, through the Summary of Changes)
  3. Statement of cash flows (R)
  4. Notes to financial statements (R)
- **C. State and local government concepts.** These are foundational only: the ACFR, measurement focus, basis of accounting, fund types and net position. Full government accounting is BAR Area III.
- **D. Public company reporting topics (U.S. SEC reporting requirements, earnings per share and segment reporting).** It is uncertain how much of EPS and segment reporting stays in FAR. BAR Area II also has a "Public company reporting topics" group.
- **E. Special purpose frameworks**
- **F. Financial statement ratios and performance metrics.** The profitability-ratio task is V. The examples in the liquidity-ratio task changed in 2026.

**Area II: Select Balance Sheet Accounts.** The nine group names are V ([ipassthecpaexam][ipass], UWorld).

- A. Cash and cash equivalents
- B. Trade receivables
- C. Inventory
- D. Property, plant and equipment
- E. Investments, with three topics (names R; Atlas and ExamPrep support the split):
  1. Financial assets at fair value
  2. Financial assets at amortized cost
  3. Equity method investments
- F. Intangible assets. Finite-lived only: goodwill, indefinite-lived intangibles and internally developed software are BAR.
- G. Payables and accrued liabilities
- H. Debt (financial liabilities)
- I. Equity

**Area III: Select Transactions.** The seven group names are V ([UWorld blueprint page][uwbp]).

- A. Accounting changes and error corrections
- B. Contingencies and commitments
- C. Revenue recognition. This covers ASC 606 at the Remembering and Application levels, plus not-for-profit contributions. Analysis-level revenue tasks moved to BAR.
- D. Accounting for income taxes
- E. Fair value measurements
- F. Lessee accounting
- G. Subsequent events

### 2026 changes for FAR ([Summary of Changes][soc])

1. **References.** The Section Introduction's References removed an AICPA Practice Aid on cash- and tax-basis financial statements that the AICPA no longer maintains.
2. **Area I, Statement of activities (NFP).** One Application task was revised so its scope is **not limited to contributions with donor restrictions**.
3. **Area I, Financial statement ratios and performance metrics.** The examples in one task were revised. The liquidity-ratio examples now read roughly "current, quick, accounts receivable turnover, inventory turnover, days payable outstanding". The 2025 PDF had "accounts payable turnover", so confirm the exact list.
4. **Area III, Fair value measurements.** Two tasks were removed and one was added, to clarify how ASC 820 is split between FAR and BAR. FAR now appears limited to concepts and the hierarchy, with measurement calculations in BAR. **The exact new task text was not seen.**

### FAR References

This list is reconstructed. Confirm it against the Section Introduction.

- FASB Accounting Standards Codification
- GASB standards (Codification of Governmental Accounting and Financial Reporting Standards), for the foundational concepts
- SEC Regulations S-X and S-K and the related forms, for public company reporting
- AICPA Audit and Accounting Guides (e.g., Not-for-Profit Entities)
- Current textbooks

The cash/tax-basis Practice Aid was **removed** in 2026.

### What moved from FAR to BAR (CPA Evolution, unchanged for 2026)

These sources describe the move: [Becker BAR guide][beckerbar], [Eduyush BAR Area II][eduyushbar] and the BAR blueprint groups.

- Indefinite-lived intangible assets, including goodwill and goodwill impairment
- Internally developed software
- Analysis-level revenue recognition tasks
- Stock compensation (share-based payments)
- Research and development costs
- Business combinations
- Consolidated financial statements beyond basic NCI and eliminations, and VIEs (placement disputed; see I.A.7 above)
- Derivatives and hedge accounting
- Lessor accounting (FAR keeps lessee accounting only)
- Public company reporting beyond FAR's basic coverage
- Financial statements of employee benefit plans (statement of net assets available for benefits, and the statement of changes in it)
- Government accounting beyond the foundational concepts (BAR Area III: State and Local Governments)
- Foreign currency transactions, translation and remeasurement (UWorld and SuperfastCPA place these in BAR Area II)
- FAR fair value measurement scope was narrowed further in 2026.

The repository's `far-benefit-plans` module, marked optional, therefore maps to BAR, not FAR.

---

## AUD: Auditing and Attestation (Core)

**Format:** 78 MCQ (2 testlets × 39) and 7 TBS (testlets of 2, 3 and 2).

**Skill allocation:**

| Skill level | Range |
|---|---|
| Remembering and Understanding | 30–40% |
| Application | 30–40% |
| Analysis | 15–25% |
| Evaluation | 5–15% |

**Area weights.** These match the structure you gave me. Areas III and IV were confirmed in this pass.

| Area | Title | Weight |
|---|---|---|
| I | Ethics, Professional Responsibilities and General Principles | 15–25% |
| II | Assessing Risk and Developing a Planned Response | 25–35% |
| III | Performing Further Procedures and Obtaining Evidence | 30–40% |
| IV | Forming Conclusions and Reporting | 10–20% |

### Groups and topics

**Area I.** The group names are V through the [UWorld 2026–27 summary][uwbp]. The letter order is R.

- A. Nature and scope. Topics:
  1. Audit engagements (the task is V)
  2. Engagements under Government Auditing Standards (Yellow Book and single audit)
  3. Other engagements
- B. Professional skepticism and professional judgment. This covers unconscious auditor biases and other impediments to skepticism.
- C. Ethics, independence and professional conduct. UWorld calls it "Ethics, Independence, and Professional Responsibilities". Topics:
  1. AICPA Code of Professional Conduct
  2. SEC and PCAOB
  3. GAO
  4. Department of Labor (the DOL independence task is V)
- D. Terms of engagement. Topics:
  1. Preconditions
  2. Terms of engagement and engagement letter (the acceptance-and-continuance task is V)
- E. Requirements for engagement documentation
- F. Communication with management and those charged with governance
- G. Audit and assurance quality. This replaced the "firm's system of quality control" wording and is based on SQMS No. 1 and No. 2.

**Area II.** Group names are V from a secondary source whose lettering was inconsistent. The order is R.

- A. Planning an engagement
- B. Understanding an entity and its environment. Topics:
  1. External factors, including the applicable financial reporting framework
  2. Internal factors
- C. Understanding an entity's system of internal control. Topics:
  1. **Control environment, IT general controls, and entity-level controls.** The topic name was revised in 2026, and two of its tasks were revised to emphasize entity-level controls.
  2. Business processes and information flows (R)
  3. Limitations of controls and risk of management override (R)
- D. Materiality. Topics:
  1. For the financial statements as a whole
  2. Tolerable misstatement and performance materiality
- E. Assessing and responding to risks of material misstatement, whether due to fraud or error. Examples were added to its tasks in 2026.
- F. Planning for and using the work of others
- G. Specific areas of engagement risk. Topics (R):
  1. Compliance with laws and regulations
  2. Accounting estimates
  3. Related parties

**Area III.** The scope text was seen in a search result: "use of data and information … reliability of data … data analytics; sufficient appropriate evidence …; sampling techniques …; performing procedures to obtain evidence including tests of controls…".

- A. Use of data and information (R)
- B. Sufficient appropriate evidence (R)
- C. Sampling techniques (R)
- D. Procedures to obtain sufficient appropriate evidence. A secondary source cites **Topic 3 as External confirmations (V)**. Topics 1, 2 and 4 are guesses:
  1. Tests of controls
  2. Analytical procedures
  3. External confirmations
  4. Tests of details
- E. Specific matters that require special consideration. This is the 2021 group name, and its 2026 name is uncertain. Topics:
  1. **Accounting estimates (V as a topic name; task revised in 2026)**
  2. Investments and derivatives
  3. Inventory
  4. Litigation, claims and assessments
  5. Going concern
- F. Misstatements and internal control deficiencies
- G. Written representations
- H. Subsequent events and subsequently discovered facts

The placement of E through H in the 2026 Blueprint is R.

**Area IV.** The five group names are V ([Surgent][surgent], a 2026–27 exam guide).

- A. Reports on auditing engagements. Covers forming an opinion, opinion types, form and content of the report, key and critical audit matters, and integrated audit reports (R).
- B. Reports on attestation engagements
- C. Accounting and review service engagements. Covers preparation, compilation and review.
- D. Reporting on compliance
- E. Other reporting considerations. Covers consistency and comparative statements, other information, interim reviews, supplementary information, and special considerations under GAS.

### 2026 changes for AUD ([Summary of Changes][soc])

1. **References.** The Section Introduction's References were revised to reflect the **AICPA Quality Management standards**: SQMS No. 1, SQMS No. 2 and SAS No. 146.
2. **Area II, Control environment topic.** The topic was renamed "Control environment, IT general controls, and entity-level controls", and **two tasks** in it were revised to emphasize entity-level controls.
3. **Area III, External confirmations.** One task was revised.
4. **Examples added** to tasks in:
   - Area II, Group "Assessing and responding to risks of material misstatement, whether due to fraud or error"
   - Area III, topic "External confirmations"
5. **Area III, Accounting estimates.** One task was revised to clarify that the **inputs to an accounting estimate include methods and data** (SAS 143 terms: method, significant assumptions, data).

### AUD References

This list is reconstructed. Confirm it against the PDF.

- AICPA Professional Standards: Code of Professional Conduct, SASs (AU-C), SSAEs (AT-C), SSARS (AR-C), and the **Statements on Quality Management Standards** (updated in 2026)
- PCAOB auditing standards, rules and quality control standards (QC 1000)
- SEC independence rules (Regulation S-X Rule 2-01) and the Sarbanes-Oxley Act
- U.S. GAO *Government Auditing Standards* (Yellow Book)
- Uniform Guidance (2 CFR 200), Single Audit Act and the OMB Compliance Supplement
- Department of Labor and ERISA independence guidance
- COSO *Internal Control—Integrated Framework*
- AICPA Audit and Accounting Guides, including *Audit Sampling* and *Audit Data Analytics*

---

## REG: Taxation and Regulation (Core)

**Format:** 72 MCQ (2 testlets × 36) and 8 TBS (testlets of 2, 3 and 3).

**Skill allocation:**

| Skill level | Range |
|---|---|
| Remembering and Understanding | 25–35% |
| Application | 35–45% |
| Analysis | 25–35% |
| Evaluation | not tested |

**Area weights.** These match the structure you gave me. Areas I, III, IV and V were confirmed with the official PDF ranges this pass. Some prep sites show stale ranges (28–38%, 12–22%), which should be ignored.

| Area | Title | Weight |
|---|---|---|
| I | Ethics, Professional Responsibilities and Federal Tax Procedures | 10–20% |
| II | Business Law | 15–25% |
| III | Federal Taxation of Property Transactions | 5–15% |
| IV | Federal Taxation of Individuals | 22–32% |
| V | Federal Taxation of Entities (including tax preparation) | 23–33% |

### Groups and topics

**Area I**

- A. Ethics and responsibilities in tax practice. Topics:
  1. Regulations governing practice before the IRS (Circular 230) (V)
  2. IRC and regulations related to tax return preparers (R)
  3. AICPA SSTS (topic existence uncertain)
- B. Licensing and disciplinary systems (V)
- C. Federal tax procedures. Topics (R):
  1. Audits, appeals and judicial process
  2. Substantiation and disclosure of tax positions
  3. Taxpayer penalties
  4. Authoritative hierarchy
- D. Legal duties and responsibilities. Topics (R):
  1. Common law duties and liability
  2. Privileged communications, confidentiality and privacy acts

**Area II.** These names are R, from the 2021 structure.

- A. Agency. Topics:
  1. Authority
  2. Duties and liabilities
- B. Contracts. Topics:
  1. Formation
  2. Performance
  3. Discharge, breach and remedies
- C. Debtor-creditor relationships. Topics:
  1. Rights and duties of debtors, creditors and guarantors
  2. Bankruptcy and insolvency
  3. Secured transactions
- D. Federal laws and regulations. Topic names are uncertain: employment tax, worker classification, Affordable Care Act.
- E. Business structure. Topics:
  1. Selection, formation, operation and termination
  2. Rights, duties, legal obligations and authority of owners and management

**Area III**

- A. Basis of assets (V, through UWorld)
- B. **Cost recovery (depreciation and amortization)** (V, through the Summary of Changes; one task was revised in 2026)
- C. Taxable and nontaxable sales and exchanges (uncertain)
- D. Amount and character of gains and losses and the netting process (uncertain)

The 2021 Blueprint grouped C and D under "Acquisition and disposition of assets", together with related-party transactions and gift taxation. In the 2024+ split, nontaxable dispositions, character and netting (including installment sales), and related-party transactions with imputed interest are **TCP Area IV group names (V)**. How much remains in REG at the Remembering and Application levels is unconfirmed.

**Area IV**

- A. Gross income (inclusions and exclusions)
- B. Reporting of items from pass-through entities
- C. **Adjustments and deductions to arrive at adjusted gross income and taxable income** (V, through the Summary of Changes)
- D. Passive activity losses (excluding foreign tax credit implications)
- E. Filing status
- F. Computation of tax and credits

The names other than C are R. The search confirmed that the area covers "routine and recurring" individual compliance, with topics including filing status, credits, estimated-tax safe harbor, the net investment income tax and self-employment tax.

**Area V.** The intro text was seen: "required adjustments to book income … computation of taxable income for C corporations, including **state and local tax issues**, and allowable tax credits". The group list comes from [Universal CPA Review][univreg]:

- A. Tax treatment of formation and liquidation of business entities
- B. Differences between book and tax income (loss)
- C. C corporations
- D. S corporations
- E. Partnerships
- F. Limited liability companies
- G. Trusts
- H. Tax-exempt organizations

That list matches the 2021 layout. Whether F, G and H survived the 2024 REG/TCP split is **uncertain**, so they appear in the CSV as single `uncertain` rows.

### 2026 changes for REG ([Summary of Changes][soc])

1. **New Section assumption (H.R. 1):** "Candidates should assume that references to individual wages or compensation do not include overtime or tips unless otherwise stated." The change was made so the Blueprints do not need to be reissued when the H.R. 1 provisions become testable.
2. **Area IV, Group C.** One Application task was revised (V in the CSV). It reads: "Identify the itemized deductions from adjusted gross income allowed in the calculation of taxable income given a specific scenario, including medical expenses, qualified residence interest expense, casualty losses, taxes and charitable contributions."
3. **Area III, Cost recovery (depreciation and amortization).** One task was revised to clarify scope.
4. UWorld also reports clarifications to tasks on "investment alternatives". That is not confirmed for REG and may belong to TCP personal financial planning.

### REG References

This list is reconstructed.

- **Tax:**
  - Internal Revenue Code of 1986, as amended, and Treasury Regulations
  - Treasury Department Circular No. 230
  - AICPA Statements on Standards for Tax Services
  - AICPA Code of Professional Conduct
  - IRS publications and form instructions
- **Business law:**
  - Restatements (Agency; Contracts; Suretyship and Guaranty)
  - Uniform Commercial Code Articles 2 and 9
  - Federal Bankruptcy Code (Title 11)
  - Revised Uniform Partnership Act, Uniform Limited Partnership Act, Revised Uniform LLC Act and Model Business Corporation Act
  - Employment-related federal law: FICA, FUTA and the Affordable Care Act
- Current textbooks

The Blueprint cites the IRC as a whole, not specific IRC sections. Section numbers in task statements, such as 179, 351 and 1231, are my additions.

---

## TCP: Tax Compliance and Planning (Discipline)

**Format:** 68 MCQ (2 testlets × 34) and 7 TBS (testlets of 2, 3 and 2).

**Skill allocation:**

| Skill level | Range |
|---|---|
| Remembering and Understanding | 5–15% |
| Application | 55–65% |
| Analysis | 25–35% |
| Evaluation | not tested |

**Area weights.** These match the structure you gave me. One study guide shows Area I as 40–50%, but its own table and the other sources give 30–40%.

| Area | Title | Weight |
|---|---|---|
| I | Tax Compliance and Planning for Individuals and Personal Financial Planning | 30–40% |
| II | Entity Tax Compliance | 30–40% |
| III | Entity Tax Planning | 10–20% |
| IV | Property Transactions (disposition of assets) | 10–20% |

TCP covers **nonroutine** transactions and planning. REG covers routine, recurring compliance.

### Groups and topics

**Area I.** The groups are V ([UWorld TCP][uwtcp] and Breezy's copy of the 2024 TCP Blueprint).

- A. Individual compliance and tax planning for gross income, AGI, taxable income and estimated taxes. This covers incentive compensation such as stock options, and accelerating or deferring income and deductions.
- B. Passive activity and at-risk loss limitations (excluding tax credit implications)
- C. Gift taxation (compliance and planning)
- D. Personal financial planning: qualified retirement plans, investing, education funding, and risk mitigation through insurance

**Area II.** The groups are V.

- A. C corporations. The topics cover NOL utilization, **consolidated tax returns** and **international tax issues**. The international topic focuses on general concepts of sourcing and allocating income, not specific foreign laws or treaties. Topic names 1 and 2 are R.
- B. S corporations
- C. Partnerships
- D. Trusts
- E. Tax-exempt organizations

**Area III**

- A. Formation and liquidation of business entities, including comparisons of entity types
- B. Tax planning for C corporations: NOL and capital-loss carryover savings, state and local tax opportunities on expansion, estimated payments, and timing of income and expenses
- C. Tax planning for S corporations and partnerships. Whether this is one group or two is uncertain.

**Area IV.** The three group names are V.

- A. Nontaxable dispositions
- B. Amount and character of gains and losses and the netting process (including installment sales)
- C. Related party transactions, including imputed interest

### 2026 changes for TCP ([Summary of Changes][soc])

1. **H.R. 1 assumption added** to the Section Introduction. It is the same individual wages and compensation (overtime and tips) assumption as REG, added so the Blueprint need not be reissued once the H.R. 1 provisions are testable.
2. **Area II, International tax issues.** One task was **removed**: "Explain the requirements related to Interest Charge Domestic International Sales Corporation (IC-DISC), foreign derived intangible income (FDII), base erosion and anti-abuse (BEAT) and global intangible low-taxed income (GILTI)." These concepts are **no longer eligible for testing** in TCP.
3. UWorld's "change management/data management tasks clarified, two tasks added" belongs to **ISC**, not TCP.

### TCP References

This list is reconstructed. It covers the Internal Revenue Code and Treasury Regulations, IRS publications and form instructions (Forms 1040, 1041, 1065, 1120, 1120-S, 709 and 990), and current textbooks on federal taxation and personal financial planning.

---

## REG and TCP: inflation-adjusted amounts, assumptions, and the split between sections

### Inflation-adjusted amounts

The TCP Blueprint states, and Becker reports the same for REG: **"Candidates will not be tested on their knowledge of specific tax rate percentages, amounts or limitations that are indexed to inflation."** Sources: [Becker REG][beckerreg], [Becker TCP][beckertcp], [Breezy TCP Blueprint][breezytcp].

- When a question needs an indexed figure (standard deduction, contribution limits, phase-outs, the gift-tax annual exclusion, and so on), the exam supplies it.
- Implication for the platform: items should **state** any inflation-indexed amount they rely on. Items that require recalling an indexed dollar amount do not fit the Blueprint.
- Non-indexed statutory parameters are fair game to know, for example the 21% corporate rate and the 80% NOL limitation.
- Reported assumption: unless stated otherwise, assume transactions occur in the current year and apply the most recent tax law that is eligible for testing (Becker). The exact assumption wording should be confirmed in the PDF.
- Eligibility of new law: OBBBA provisions effective in 2024–2025 have been testable since **1 July 2026**. Examples include the expanded SALT cap, the deductions for tips, overtime, car-loan interest and seniors, 100% bonus depreciation and the IRC 179 changes.
  - The new wages/compensation assumption means stems that are silent on the point treat wages as excluding overtime and tips.

### REG-only versus TCP-only

| Topic | REG (routine compliance; R&U, Application, some Analysis) | TCP (nonroutine compliance and planning; Application and Analysis) | Confidence |
|---|---|---|---|
| Circular 230, preparer penalties, procedures, licensing | REG only | — | High |
| Business law | REG only | — | High |
| Basis of assets; cost recovery | REG (Area III, groups A and B) | Used inside planning tasks | High |
| Like-kind and involuntary conversions; §1231/1245/1250 character and netting; installment sales; related party and imputed interest | REG Area III at the basic level (uncertain) | **TCP Area IV group names** (V) | Medium: TCP is certain; REG depth unconfirmed |
| Gift tax | Not found in REG's current structure. One blog mentions it in a REG outline; it was REG Area III.C in 2021–2023. | **TCP Area I.C (V)** | Medium: treat it as TCP |
| Estate tax | Not tested in either section (beyond the gift and estate exclusion linkage in TCP study guides) | — | Medium |
| Trusts and fiduciary income tax (Form 1041) | Listed as REG Area V.G by one 2026 guide (uncertain) | **TCP Area II.D (V)** | Medium: TCP certain, REG doubtful |
| Tax-exempt organizations (Form 990, UBIT) | Listed as REG Area V.H by one guide (uncertain) | **TCP Area II.E (V)** | Medium |
| Individual AMT | Not confirmed in REG Area IV. Search results did not mention AMT for REG. | Not confirmed in TCP. Reconstructed as an `uncertain` TCP row. | Low: verify |
| NIIT and additional Medicare tax | Listed among REG Area IV topics by a study guide | Plausible in TCP Area I.A (`uncertain`) | Low/medium |
| Passive activity and at-risk losses | REG IV.D, basic | TCP I.B, nonroutine and planning | High |
| Stock options and incentive compensation | — | TCP I.A | High |
| Personal financial planning (retirement, education, investing, insurance) | — | TCP I.D | High |
| Consolidated corporate returns | — | TCP II.A | High |
| International tax (sourcing and allocation) | — | TCP II.A (IC-DISC, FDII, BEAT and GILTI removed in 2026) | High |
| State and local taxes | REG V intro: "C corporations, including state and local tax issues" | TCP III.B (SALT planning for expansion) | Medium |
| S corporation built-in gains tax | REG V.D.5 | TCP II.B (nonroutine) | Medium |
| §754 adjustments and §751 hot assets | Basic in REG V.E (sale of an interest) | TCP II.C | Medium |

---

## Discrepancies with the structure I was given

- **None at the area, weight, skill-allocation or MCQ/TBS-count level.** Every weight and skill range in the structure you gave me matches what the searches returned.
  - The MCQ/TBS counts and testlet splits were not re-verified by search this pass. They match my knowledge of the 2024–2026 format.
- These were naming details and caveats, not discrepancies:
  - FAR Area III's lease group is "Lessee accounting".
  - AUD Area I adds a "Professional skepticism and professional judgment" group and uses "Audit and assurance quality" in place of quality control.
  - REG Area V's title includes "(including tax preparation)".
  - TCP Area IV's title includes "(disposition of assets)".
- Secondary-source errors noticed and ignored:
  - REG weights of 28–38% and 12–22%
  - TCP Area I at 40–50%
  - AUD and FAR area structures from the July 2021 Blueprint (four FAR areas)
  - UWorld assigning the ISC changes to TCP

## Highest-value items to check against the PDF

1. FAR I.A.7 (consolidations) and I.D (EPS and segments): are they in FAR in 2026, and at what depth?
2. FAR III.E: the exact replacement fair-value task; and FAR I.F: the exact 2026 liquidity-ratio examples.
3. FAR I.B.2: the exact revised statement-of-activities task.
4. AUD III group lettering and the topics under "Procedures to obtain sufficient appropriate evidence"; the two revised entity-level-control tasks; the revised confirmation and estimate tasks.
5. REG III group list. Is "Taxable and nontaxable sales and exchanges / Amount and character / Related party" still in REG? Is gift tax in REG at all?
6. REG V.F, G and H (LLCs, trusts, exempt organizations): still in REG after 2024?
7. Individual AMT placement in REG and TCP.
8. The exact wording of the REG and TCP Section Introduction assumptions, and the References lists for all four sections.

## Sources

- [bp26]: https://www.dokoblog.com/wp-content/uploads/2025/10/CPA-Exam-Blueprints-2026.pdf — 2026 Blueprints (mirror of the AICPA PDF)
- [bp26c]: https://assets.ctfassets.net/rb9cdnjh59cm/71s84dkfo3KEsoLlz4vv6G/f4314469ec5368b5b4dd0d0184f00a71/CPA_Exam_Blueprints_2026.pdf — 2026 Blueprints (second mirror)
- [soc]: https://www.dokoblog.com/wp-content/uploads/2025/10/Summary-of-Changes-to-the-Exam-Blueprints-effective-01012026.pdf — Summary of Changes effective 1 January 2026 (also on Studocu: https://www.studocu.com/en-us/document/american-university-usa/business-finance/summary-of-changes-to-cpa-exam-blueprints-effective-01012026/149255821)
- [hr1]: https://www.dokoblog.com/wp-content/uploads/2025/10/Testing-of-H.R.-1-on-the-CPA-Exam.pdf — Testing of H.R. 1 on the CPA Exam
- 2025 Blueprints: https://www.dokoblog.com/wp-content/uploads/2024/10/CPA-Exam-Blueprints-2025.pdf ; 2024 Blueprints: https://dlcp.dc.gov/sites/default/files/dc/sites/DLCP/publication/attachments/Uniform%20CPA%20Examination%20Blueprints%202.5.24.pdf ; July 2021 Blueprints: https://business.fullerton.edu/academics/accountancy/assets/pdf/cpa-exam-blueprints-effective-july-2021.pdf
- [uwbp]: https://accounting.uworld.com/cpa-review/cpa-exam/blueprints/ ; [uwtcp]: https://accounting.uworld.com/cpa-review/cpa-exam/tcp/ ; UWorld REG: https://accounting.uworld.com/cpa-review/cpa-exam/reg/ ; UWorld changes: https://accounting.uworld.com/cpa-review/cpa-exam/changes/
- [sfcfar]: https://www.superfastcpa.com/ultimate-guide-to-the-far-section-cpa-exam-blueprint-and-study-resources/
- [ipass]: https://ipassthecpaexam.com/cpa-far-exam/
- [surgent]: https://www.surgent.com/exam-review/cpa-review/resources/about-the-cpa-exam-sections/
- [breezytcp]: https://breezycpa.com/wp-content/uploads/2024/08/TCP.pdf — copy of the 2024 TCP Blueprint
- [univreg]: https://www.universalcpareview.com/cpa-exam-study-guide/reg/
- [beckerreg]: https://www.becker.com/blog/cpa/the-complete-guide-to-the-reg-cpa-exam ; [beckertcp]: https://www.becker.com/blog/cpa/the-complete-guide-to-the-tcp-cpa-exam ; [beckerbar]: https://becker.com/blog/cpa/the-complete-guide-to-the-bar-cpa-exam
- [eduyushbar]: https://eduyush.com/blogs/cima/bar-technical-accounting-reporting-cpa-exam
- Other 2026-change summaries: https://atlascpaindex.com/news/cpa-exam-blueprint-changes-2026 ; https://ais-cpa.com/important-changes-to-the-2020-cpa-exam-blueprint ; https://www.dokoblog.com/uscpa-blueprints-2026/

[bp26]: https://www.dokoblog.com/wp-content/uploads/2025/10/CPA-Exam-Blueprints-2026.pdf
[bp26c]: https://assets.ctfassets.net/rb9cdnjh59cm/71s84dkfo3KEsoLlz4vv6G/f4314469ec5368b5b4dd0d0184f00a71/CPA_Exam_Blueprints_2026.pdf
[soc]: https://www.dokoblog.com/wp-content/uploads/2025/10/Summary-of-Changes-to-the-Exam-Blueprints-effective-01012026.pdf
[hr1]: https://www.dokoblog.com/wp-content/uploads/2025/10/Testing-of-H.R.-1-on-the-CPA-Exam.pdf
[uwbp]: https://accounting.uworld.com/cpa-review/cpa-exam/blueprints/
[uwtcp]: https://accounting.uworld.com/cpa-review/cpa-exam/tcp/
[sfcfar]: https://www.superfastcpa.com/ultimate-guide-to-the-far-section-cpa-exam-blueprint-and-study-resources/
[ipass]: https://ipassthecpaexam.com/cpa-far-exam/
[surgent]: https://www.surgent.com/exam-review/cpa-review/resources/about-the-cpa-exam-sections/
[breezytcp]: https://breezycpa.com/wp-content/uploads/2024/08/TCP.pdf
[univreg]: https://www.universalcpareview.com/cpa-exam-study-guide/reg/
[beckerreg]: https://www.becker.com/blog/cpa/the-complete-guide-to-the-reg-cpa-exam
[beckertcp]: https://www.becker.com/blog/cpa/the-complete-guide-to-the-tcp-cpa-exam
[beckerbar]: https://becker.com/blog/cpa/the-complete-guide-to-the-bar-cpa-exam
[eduyushbar]: https://eduyush.com/blogs/cima/bar-technical-accounting-reporting-cpa-exam
