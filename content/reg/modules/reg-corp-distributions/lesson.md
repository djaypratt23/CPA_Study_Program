---
id: reg-corp-distributions
section: REG
title: E&P and corporate distributions
minutes: 18
taxYear: '2025'
objectives:
  - text: Compute current earnings and profits from taxable income.
    skill: application
    task: Calculate earnings and profits
  - text: Determine the dividend, return of capital, and capital gain portions of a distribution.
    skill: application
    task: Determine the tax treatment of corporate distributions
  - text: Determine the corporation's and shareholder's consequences of property distributions and constructive dividends.
    skill: analysis
    task: Evaluate property distributions
bigIdea:
  what: >-
    A distribution is a dividend only to the extent of the corporation's earnings and profits (E&P) — its economic
    capacity to pay. Beyond E&P, a distribution is a tax-free return of the shareholder's basis, and any excess is
    capital gain.
  why: >-
    The same $50,000 check can be fully taxable, partly tax-free, or partly capital gain. E&P, not retained
    earnings, decides.
  example: >-
    A corporation with $30,000 of current E&P and no accumulated E&P distributes $50,000 to its sole shareholder
    (stock basis $15,000). The first $30,000 is a dividend, $15,000 reduces basis to zero, and $5,000 is capital gain.
preQuestions: [reg-ep-pre1]
keyTakeaways:
  - "Current E&P ≈ taxable income + tax-exempt income + DRD + excess of tax depreciation over E&P (straight-line/ADS) depreciation − federal income taxes − nondeductible expenses (fines, disallowed meals, excess capital losses, excess charitable contributions)."
  - "Ordering: distributions come first from current E&P (allocated pro rata among the year's distributions), then accumulated E&P (chronologically), then return of stock basis, then capital gain."
  - "Positive current E&P makes distributions dividends even if accumulated E&P is negative. If current E&P is negative, net it against accumulated E&P as of the distribution date."
  - "Property distributions: the corporation recognizes gain (not loss) as if it sold appreciated property at FMV. The shareholder's dividend = FMV (minus any liability assumed); the shareholder's basis = FMV."
  - "E&P is reduced by the FMV of appreciated property distributed (adjusted basis for property with a loss), net of liabilities, and increased by gain recognized."
  - "Constructive dividends: unreasonable compensation, below-market loans, personal use of corporate assets, and bargain sales to shareholders."
  - "Qualified dividends are taxed to individuals at capital gain rates (holding period more than 60 days in the 121-day window)."
citations:
  - source: IRC §301, §312, §316 (Distributions and earnings and profits)
  - source: IRC §311(b) (Gain on distributions of appreciated property)
---

## Current E&P

```worked
title: From taxable income to current E&P
scenario: |
  Oak Corp.'s 2025 taxable income is $400,000 (tax $84,000). It had $10,000 of municipal interest, a $26,000 DRD,
  $6,000 of disallowed meals (50%), a $4,000 fine, and tax depreciation exceeding E&P depreciation by $20,000.
steps:
  - label: Start with taxable income
    work: 400,000
    result: 400,000
  - label: Add tax-exempt income, the DRD, and excess tax depreciation
    work: + 10,000 + 26,000 + 20,000
    result: 456,000
  - label: Subtract federal income tax and nondeductible expenses
    work: − 84,000 − 6,000 − 4,000
    result: 362,000 current E&P
insight: E&P measures economic ability to pay dividends, so it adds back tax-only deductions and subtracts real outflows the tax law ignores.
```

```check
reg-ep-chk1
```

## How a distribution is taxed

```mermaid
flowchart TD
  D[Cash or property distributed] --> C{Current E&P?}
  C -->|Up to current E&P| DV[Dividend]
  C -->|Beyond current E&P| A{Accumulated E&P?}
  A -->|Up to accumulated E&P| DV
  A -->|Beyond| B[Return of capital — reduces stock basis]
  B -->|Beyond basis| G[Capital gain]
```

## Property distributions

```worked
title: Distributing appreciated land
scenario: |
  Elm Corp. (ample E&P) distributes land to its sole shareholder: FMV $90,000, adjusted basis $50,000, subject to a
  $20,000 mortgage the shareholder assumes.
steps:
  - label: Corporation's gain
    work: 90,000 − 50,000
    result: 40,000 recognized (as if sold)
  - label: Shareholder's dividend
    work: 90,000 − 20,000 liability assumed
    result: 70,000
  - label: Shareholder's basis in the land
    work: FMV
    result: 90,000
insight: If the land had been worth less than basis, Elm could not deduct the loss — a reason to sell loss property and distribute the cash instead.
```

```check
reg-ep-chk2
```
