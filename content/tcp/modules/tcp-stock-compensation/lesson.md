---
id: tcp-stock-compensation
section: TCP
title: Stock options & equity compensation
minutes: 18
taxYear: '2025'
objectives:
  - text: Determine the timing and character of income from nonqualified stock options, incentive stock options, and restricted stock.
    skill: application
    task: Calculate income from equity compensation
  - text: Distinguish a qualifying from a disqualifying disposition of ISO stock and compute the resulting income.
    skill: analysis
    task: Analyze dispositions of stock acquired through options
  - text: Explain the §83(b) election and when it benefits the employee.
    skill: application
    task: Evaluate the §83(b) election
bigIdea:
  what: >-
    Equity compensation is wages paid in stock. The tax question is always: *when* is the bargain element taxed,
    and is it ordinary income or capital gain? Nonqualified options and restricted stock produce ordinary income
    when the stock becomes the employee's; incentive stock options can turn the whole gain into long-term capital
    gain if the holding periods are met — at the price of a possible AMT adjustment.
  why: >-
    Stock-option questions reward a timeline: grant → vest → exercise → sale. Put the numbers on the line and the
    answer follows.
  example: >-
    An engineer exercises NQSOs at $10 when the stock is worth $50. She has $40 per share of wage income now and a
    $50 basis. If she sells later at $70, the extra $20 is capital gain.
preQuestions: [tcp-sc-pre1]
keyTakeaways:
  - "NQSO (no readily ascertainable FMV at grant): nothing at grant; ordinary income (wages) at exercise = FMV − strike; basis = FMV at exercise; later gain or loss is capital."
  - "ISO: nothing at grant or exercise for regular tax; the spread at exercise is an AMT adjustment. Qualifying disposition (more than 2 years from grant AND more than 1 year from exercise): all gain = LTCG. Employer gets no deduction."
  - "ISO disqualifying disposition: ordinary income = lesser of (FMV at exercise − strike) or (sale price − strike); the rest is capital gain. Employer gets a matching deduction."
  - "Restricted stock (§83): ordinary income when it vests (substantial risk of forfeiture lapses) = FMV − amount paid. §83(b) election within 30 days of transfer: income at grant instead; later appreciation is capital gain; no deduction if forfeited."
  - "RSUs: ordinary income when shares are delivered (usually at vesting); §83(b) is not available for RSUs."
  - "§423 ESPP: no income at purchase; discount up to 15%. Qualifying disposition: ordinary income = lesser of the actual gain or the discount based on FMV at grant."
  - "Employer deduction generally equals and matches the employee's ordinary income."
citations:
  - source: IRC §83 (Property transferred in connection with performance of services)
  - source: IRC §421–§423 (Incentive stock options and employee stock purchase plans)
  - source: IRC §56(b)(3) (AMT adjustment for ISOs); Treas. Reg. §1.83-7 (Nonqualified options)
---

## Line up the dates

```mermaid
flowchart LR
  G[Grant] --> V[Vest]
  V --> E[Exercise: pay strike price]
  E --> S[Sale]
  E -.NQSO: ordinary income = spread.-> E
  E -.ISO: AMT adjustment = spread.-> E
  S -.ISO qualifying: all LTCG.-> S
```

| | NQSO | ISO (qualifying) | Restricted stock (no 83(b)) |
|---|---|---|---|
| Grant | — | — | — |
| Vest / exercise | Ordinary income = spread | AMT adjustment only | Ordinary income at vesting |
| Sale | Capital gain/loss from FMV at exercise | LTCG from strike price | Capital gain/loss from FMV at vesting |
| Employer deduction | Yes, at exercise | None | Yes, at vesting |

```worked
title: ISO — qualifying vs disqualifying
scenario: |
  Rosa is granted ISOs on 1,000 shares at $20 on March 1, 2022. She exercises on June 1, 2024 when FMV is $50.
  Case A: she sells on July 1, 2025 at $80. Case B: she sells on December 1, 2024 at $80.
steps:
  - label: Case A holding periods
    work: More than 2 years from grant (3/1/2022) and more than 1 year from exercise (6/1/2024)
    result: Qualifying
  - label: Case A gain
    work: (80 − 20) × 1,000
    result: 60,000 LTCG; no ordinary income
  - label: Case B — sold within 1 year of exercise
    work: Ordinary income = lesser of (50 − 20) or (80 − 20), × 1,000
    result: 30,000 ordinary income
  - label: Case B remaining gain
    work: (80 − 50) × 1,000
    result: 30,000 short-term capital gain (held under 1 year after exercise)
insight: In the year of exercise, Rosa also has a $30,000 AMT adjustment if she still holds the shares at year-end.
```

```check
tcp-sc-chk1
```

## Restricted stock and §83(b)

```faded
title: Your turn — the §83(b) election
scenario: |
  On January 10, 2025, Jay receives 2,000 restricted shares (FMV $5) that vest on January 10, 2028, when FMV is
  expected to be $30. He pays nothing. He files a §83(b) election and sells at $30 right after vesting.
steps:
  - label: Ordinary income in 2025
    answer: 10000
    solution: 2,000 × $5 = 10,000 (included at transfer because of the election)
  - label: Ordinary income at vesting in 2028
    answer: 0
    hint: The election already reported the income
    solution: None — the election replaced the vesting-date inclusion
  - label: Capital gain on sale
    answer: 50000
    solution: 2,000 × (30 − 5) = 50,000 long-term (holding period began at transfer)
  - label: Ordinary income without the election
    answer: 60000
    solution: 2,000 × 30 = 60,000 at vesting
```

```check
tcp-sc-chk2
```

**Planning:** §83(b) makes sense when the current value is low and expected growth is high — it converts future appreciation to capital gain. The risk: tax paid now is not refunded if the shares are forfeited.
