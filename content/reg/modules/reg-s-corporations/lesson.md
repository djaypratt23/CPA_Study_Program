---
id: reg-s-corporations
section: REG
title: S corporations
minutes: 18
taxYear: '2025'
objectives:
  - text: Determine S corporation eligibility, election, and termination.
    skill: remembering
    task: Determine eligibility for S corporation status
  - text: Compute shareholders' pro rata shares, stock and debt basis, and loss limits.
    skill: application
    task: Calculate an S corporation shareholder's basis
  - text: Determine the taxation of S corporation distributions and entity-level taxes.
    skill: application
    task: Determine the tax treatment of S corporation distributions
bigIdea:
  what: >-
    An S corporation is a corporation for legal purposes but generally a pass-through for tax: its income passes to
    shareholders pro rata by shares and days. Strict eligibility rules and a few entity-level taxes apply —
    especially for former C corporations.
  why: >-
    S corporations are the most common business entity for small companies. Eligibility traps (a second class of
    stock, an ineligible shareholder) can terminate the election and create a C corporation tax bill.
  example: >-
    A 40% shareholder's basis is $25,000. Her share of the S corporation's income is $60,000, and she receives a
    $50,000 distribution. She reports $60,000 of income; the distribution is tax-free because her basis ($85,000
    before the distribution) covers it.
preQuestions: [reg-sc-pre1]
keyTakeaways:
  - "Eligibility: domestic corporation; no more than 100 shareholders (family members may count as one); shareholders are individuals (not nonresident aliens), estates, and certain trusts and exempt organizations; one class of stock (voting differences allowed)."
  - "Election (Form 2553): all shareholders consent; effective for the current year if filed by the 15th day of the 3rd month of that year (and eligibility was met all year); otherwise next year."
  - "Items pass through pro rata by shares and days; separately stated items keep their character. Form 1120-S is due March 15."
  - "Shareholder basis: stock basis increases with income (including tax-exempt) and contributions and decreases with distributions, losses, and nondeductible expenses. Debt basis arises only from loans the shareholder makes directly to the corporation — not from guaranteeing corporate debt. Losses are limited to stock plus debt basis."
  - "Distributions — no accumulated E&P: tax-free up to stock basis; excess is capital gain. With accumulated E&P from C years: first from AAA (tax-free to the extent of basis), then E&P (dividend), then remaining basis, then gain."
  - "Entity-level taxes for former C corporations: built-in gains tax (21%) on built-in gains recognized within 5 years after conversion; excess passive investment income tax when there's accumulated E&P and passive investment income exceeds 25% of gross receipts. Three consecutive such years terminate the election."
  - "Shareholder-employees must receive reasonable W-2 compensation; distributions aren't subject to self-employment tax. Health insurance for 2%+ shareholders is included in wages but deductible for AGI."
  - "After termination, a new election generally can't be made for 5 years without IRS consent."
citations:
  - source: IRC §1361–§1363 (S corporation election and eligibility), §1366–§1368 (Pass-through and distributions), §1374 (Built-in gains tax), §1375 (Passive investment income tax)
---

## Eligibility checklist

| Requirement | Traps |
|---|---|
| Domestic corporation | Certain financial institutions and insurance companies are ineligible |
| ≤ 100 shareholders | Family members may elect to count as one |
| Eligible shareholders | No partnerships, C corporations, or nonresident aliens |
| One class of stock | Differences in voting rights are allowed; differences in distribution or liquidation rights aren't |

```check
reg-sc-chk1
```

## Pro rata allocation and basis

```worked
title: Mid-year sale of stock
scenario: |
  Juno Inc. (calendar-year S corporation, 365 days) earns $73,000 of ordinary income in 2025. Kim owned 100% until
  she sold 50% to Leo on July 1 (Kim owns the stock for 181 days at 100% and 184 days at 50%).
steps:
  - label: Daily income
    work: 73,000 ÷ 365
    result: 200 per day
  - label: Kim's share
    work: 181 × 200 × 100% + 184 × 200 × 50%
    result: 36,200 + 18,400 = 54,600
  - label: Leo's share
    work: 184 × 200 × 50%
    result: 18,400
insight: Allocation is per share, per day — unless all affected shareholders elect to close the books at the sale date.
```

```faded
title: Your turn — loss limited by basis
scenario: |
  Mona's stock basis is $15,000, and she has loaned $10,000 directly to her S corporation. She also guaranteed a
  $50,000 bank loan to the corporation. Her share of the corporation's loss is $40,000.
steps:
  - label: Deductible loss (stock basis + debt basis)
    answer: 25000
    solution: 15,000 + 10,000 = 25,000 (the guarantee creates no basis)
  - label: Suspended loss carried forward
    answer: 15000
    solution: 40,000 − 25,000 = 15,000
```

## Distributions

```mermaid
flowchart TD
  D[Distribution] --> E{Accumulated E&P from C years?}
  E -- No --> B[Tax-free up to stock basis; excess is capital gain]
  E -- Yes --> A[1. AAA — tax-free to basis]
  A --> P[2. Accumulated E&P — dividend]
  P --> R[3. Remaining stock basis — tax-free]
  R --> G[4. Excess — capital gain]
```

```check
reg-sc-chk2
```
