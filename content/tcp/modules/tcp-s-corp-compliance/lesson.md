---
id: tcp-s-corp-compliance
section: TCP
title: S corporation compliance, AAA & shareholder basis
minutes: 20
taxYear: '2025'
objectives:
  - text: Determine S corporation eligibility, the election deadline, and events that terminate the election.
    skill: remembering
    task: Recall S corporation eligibility and election rules
  - text: Compute a shareholder's stock and debt basis and the deductible loss.
    skill: application
    task: Calculate S corporation shareholder basis
  - text: Determine the taxability of distributions from an S corporation with accumulated E&P, and compute the built-in gains and excess passive income taxes.
    skill: analysis
    task: Analyze S corporation distributions and entity-level taxes
bigIdea:
  what: >-
    An S corporation is a corporation for legal purposes but a pass-through for tax. Its income flows to
    shareholders on Schedule K-1 in proportion to shares owned (per share, per day), and shareholders track stock
    and debt basis. The complications come from its C corporation past: accumulated E&P changes how distributions
    are taxed, and built-in gains at conversion can be taxed at the corporate level.
  why: >-
    TCP simulations often roll forward a shareholder's basis and AAA, then ask how a distribution is taxed.
  example: >-
    A former C corporation elects S status. Distributions come first from AAA (tax-free to the extent of basis),
    then from old C-corporation E&P (dividends), then from remaining basis.
preQuestions: [tcp-sc2-pre1]
keyTakeaways:
  - "Eligibility: domestic corporation; 100 or fewer shareholders (family members can count as one); only individuals (U.S. citizens/residents), estates, and certain trusts and exempt organizations as shareholders; one class of stock (differences in voting rights are allowed)."
  - "Election (Form 2553): all shareholders consent; effective for the current year if filed within 2 months and 15 days after the year begins (and eligible all year), otherwise next year. Late-election relief is available (Rev. Proc. 2013-30)."
  - "Termination: failing eligibility (terminates that day), revocation by more than 50% of shares, or excess passive investment income (> 25% of gross receipts) for 3 consecutive years with accumulated C-corporation E&P. Re-election generally waits 5 years."
  - "Shareholder stock basis order: + contributions, + income (including tax-exempt), − distributions, − nondeductible expenses, − losses. Losses in excess of stock basis reduce debt basis (loans from the shareholder to the corporation); guarantees of corporate debt don't create basis."
  - "Distributions (with accumulated E&P): AAA (tax-free up to basis) → accumulated E&P (dividend) → other adjustments/remaining basis (tax-free) → capital gain. Without E&P: tax-free up to basis, excess capital gain."
  - "Built-in gains tax: 21% on net recognized built-in gain within 5 years after conversion from C status, limited to the net unrealized built-in gain at conversion."
  - "Excess net passive income tax: 21% when passive investment income exceeds 25% of gross receipts and the corporation has accumulated C-corporation E&P."
  - "Form 1120-S due the 15th day of the 3rd month (March 15). Shareholder-employees must receive reasonable compensation (wages) before distributions."
citations:
  - source: IRC §1361 (S corporation defined), §1362 (Election; termination), §1366–§1368 (Pass-through; basis; distributions)
  - source: IRC §1374 (Built-in gains tax), §1375 (Excess net passive income tax); Form 2553 and Form 1120-S instructions
---

## Stock basis and debt basis

```mermaid
flowchart TD
  A[Beginning stock basis] --> B[+ Income items, including tax-exempt]
  B --> C[− Distributions]
  C --> D[− Nondeductible, noncapital expenses]
  D --> E[− Losses and deductions]
  E -->|Excess losses| F[Reduce debt basis]
  F -->|Still excess| G[Suspended loss carried forward]
```

```worked
title: Loss limited by stock and debt basis
scenario: |
  Gia owns 100% of an S corporation. Beginning stock basis $20,000; she loaned the corporation $15,000 during the
  year. Her share: ordinary loss $(45,000); tax-exempt interest $2,000; no distributions.
steps:
  - label: Stock basis before loss
    work: 20,000 + 2,000
    result: 22,000
  - label: Loss absorbed by stock basis
    work: 22,000
    result: Stock basis 0
  - label: Loss absorbed by debt basis
    work: Lesser of remaining 23,000 or 15,000
    result: 15,000; debt basis 0
  - label: Deductible loss and suspended loss
    work: 22,000 + 15,000 = 37,000 deductible
    result: 8,000 suspended
insight: Future income restores debt basis first, before stock basis — so a repayment of the loan before basis is restored produces gain.
```

```check
tcp-sc2-chk1
```

## Distributions from an S corporation with E&P

```faded
title: Your turn — the ordering rules
scenario: |
  An S corporation (formerly a C corporation) has AAA of $30,000 and accumulated E&P of $20,000 at year-end,
  before distributions. Its sole shareholder has stock basis of $50,000 (after current-year income). It
  distributes $60,000 cash.
steps:
  - label: Tax-free distribution from AAA
    answer: 30000
    solution: AAA of 30,000 → tax-free, reduces stock basis to 20,000
  - label: Dividend from accumulated E&P
    answer: 20000
    solution: Next 20,000 from E&P is a dividend (doesn't reduce stock basis)
  - label: Remaining distribution
    answer: 10000
    hint: Applied against remaining stock basis
    solution: 60,000 − 30,000 − 20,000 = 10,000, tax-free return of basis
  - label: Ending stock basis
    answer: 10000
    solution: 50,000 − 30,000 − 10,000 = 10,000
```

```check
tcp-sc2-chk2
```

## Entity-level taxes

| Tax | When | Rate |
|---|---|---|
| Built-in gains (§1374) | Converted C corporation sells appreciated assets within 5 years | 21% of net recognized built-in gain |
| Excess net passive income (§1375) | Passive investment income > 25% of gross receipts + accumulated E&P | 21% |
| LIFO recapture | C corporation using LIFO converts to S | Tax on LIFO reserve, paid over 4 years |
