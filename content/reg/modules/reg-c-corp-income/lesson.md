---
id: reg-c-corp-income
section: REG
title: C corporation taxable income & book-tax reconciliation
minutes: 20
taxYear: '2025'
objectives:
  - text: Reconcile book income to taxable income (Schedule M-1) for common permanent and temporary differences.
    skill: application
    task: Reconcile book income to taxable income
  - text: Compute the charitable contribution limit, dividends-received deduction, NOL deduction, and capital loss treatment for corporations.
    skill: application
    task: Calculate special corporate deductions and limits
  - text: Identify corporate filing and estimated tax requirements and cost recovery rules for 2025.
    skill: remembering
    task: Recall corporate compliance requirements
bigIdea:
  what: >-
    A C corporation pays a flat 21% tax on its taxable income. Taxable income starts from book income and is adjusted
    for items the tax law treats differently — some permanently (municipal interest, fines, 50% of meals), some
    temporarily (depreciation) — and for special corporate deductions like the dividends-received deduction.
  why: >-
    Corporate returns are a standard task-based simulation: take book income and walk to taxable income, applying
    each limit in the right order.
  example: >-
    A corporation's book income includes $8,000 of municipal interest and $110,000 of federal income tax expense.
    For taxable income, the interest is subtracted (it's exempt) and the tax expense is added back (it isn't deductible).
preQuestions: [reg-cc-pre1]
keyTakeaways:
  - "Rate: flat 21%. Form 1120 is due the 15th day of the 4th month after year-end (April 15 for calendar-year corporations), with a 6-month extension."
  - "Estimated tax: four installments (15th day of the 4th, 6th, 9th, and 12th months). Safe harbor: 100% of current-year tax or 100% of prior-year tax (large corporations — $1 million+ taxable income in a prior 3-year period — can use prior year only for the first installment)."
  - "Add back to book income: federal income tax expense, fines and penalties, 50% of business meals, entertainment, life insurance premiums when the corporation is beneficiary, net capital loss, excess charitable contributions, and book depreciation above tax depreciation. Subtract: tax-exempt interest, life insurance proceeds, and tax depreciation above book."
  - "Charitable contributions: limited to 10% of taxable income computed before the charitable deduction, DRD, NOL carryback, and capital loss carryback; excess carries forward 5 years. Accrual-basis corporations may deduct amounts authorized by the board and paid within 3½ months after year-end."
  - "Dividends-received deduction: 50% (less than 20% owned), 65% (20% to less than 80%), 100% (80% or more). The 50%/65% DRD is limited to that percentage of taxable income before the DRD — unless taking the full DRD creates or increases an NOL."
  - "NOLs (post-2017): carried forward indefinitely, deductible up to 80% of taxable income; no carryback."
  - "Capital losses: deductible only against capital gains; carry back 3 years and forward 5 years as short-term."
  - "Cost recovery for 2025: §179 expensing up to $2,500,000 (phase-out above $4,000,000 of purchases) and 100% bonus depreciation for property acquired after January 19, 2025."
citations:
  - source: IRC §11 (Corporate rate), §170(b)(2) (Corporate charitable limit), §243 (Dividends received deduction), §172 (NOL), §1211–1212 (Capital losses)
  - source: IRC §179 and §168(k) as amended by Public Law 119-21
  - source: Form 1120, Schedule M-1 instructions
---

## From book income to taxable income

```worked
title: Schedule M-1 style reconciliation
scenario: |
  Harbor Tech's 2025 book net income is $500,000. Book income includes: federal income tax expense $110,000;
  municipal bond interest $8,000; premiums on key-person life insurance (Harbor is beneficiary) $4,000; business
  meals $10,000; a regulatory fine $3,000. Book depreciation is $60,000; tax depreciation is $90,000.
steps:
  - label: Add back federal income tax expense
    work: + 110,000
    result: 610,000
  - label: Subtract municipal interest
    work: − 8,000
    result: 602,000
  - label: Add nondeductible items
    work: + 4,000 premiums + 5,000 (50% of meals) + 3,000 fine
    result: 614,000
  - label: Depreciation difference
    work: − (90,000 − 60,000)
    result: 584,000 taxable income (before special deductions)
insight: Permanent differences never reverse; the depreciation difference is temporary and creates a deferred tax liability on the books.
```

```check
reg-cc-chk1
```

## Special corporate deductions — in order

```mermaid
flowchart TD
  A[Taxable income before special deductions] --> B[Charitable contributions: limit = 10% of TI before charity, DRD, NOL and capital loss carrybacks]
  B --> C[Dividends-received deduction: 50% / 65% / 100%, with the TI limit]
  C --> D[NOL deduction: up to 80% of TI]
  D --> E[Taxable income × 21%]
```

```worked
title: Charitable limit and DRD
scenario: |
  Before charitable contributions and the DRD, Pine Corp. has taxable income of $300,000, which includes $100,000
  of dividends from a 30%-owned domestic corporation. It paid $40,000 to charity.
steps:
  - label: Charitable limit
    work: 10% × 300,000
    result: 30,000 deductible; 10,000 carries forward 5 years
  - label: Taxable income before DRD
    work: 300,000 − 30,000
    result: 270,000
  - label: DRD (65%)
    work: Lesser of 65% × 100,000 = 65,000 or 65% × 270,000 = 175,500
    result: 65,000
  - label: Taxable income
    work: 270,000 − 65,000
    result: 205,000 → tax 43,050 at 21%
insight: The DRD taxable income limit matters only when taxable income before the DRD is smaller than the dividend itself.
```

```check
reg-cc-chk2
```
