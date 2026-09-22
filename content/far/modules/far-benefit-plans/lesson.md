---
id: far-benefit-plans
section: FAR
title: Employee benefit plan financial statements
minutes: 13
objectives:
  - text: Identify the required financial statements of defined contribution and defined benefit plans.
    skill: remembering
    task: Identify the financial statements of employee benefit plans
  - text: Compute the change in and ending balance of net assets available for benefits.
    skill: application
    task: Prepare a statement of changes in net assets available for benefits
  - text: Measure plan investments, participant loans, and contributions receivable.
    skill: application
bigIdea:
  what: >-
    A retirement plan is its own reporting entity, separate from the employer that sponsors it. Its statements
    answer one question for participants: how much is in the pot to pay benefits, and why did it change?
  why: >-
    Participants rely on the plan — not the employer's balance sheet — for their retirement. The Department of Labor
    and participants need to see that contributions arrived, investments are valued fairly, and money went out only
    as benefits and reasonable expenses.
  example: >-
    A manufacturer sponsors a 401(k) plan. The plan's own statements show $48 million of investments, $1.2 million
    of participant loans, and a year in which contributions and investment gains exceeded benefit withdrawals.
preQuestions: [far-ebp-pre1]
keyTakeaways:
  - "Defined contribution (ASC 962): statement of net assets available for benefits and statement of changes in net assets available for benefits."
  - Defined benefit (ASC 960) adds information about the actuarial present value of accumulated plan benefits and the changes in it (as of the beginning or end of the year).
  - Investments are reported at fair value (fully benefit-responsive investment contracts in DC plans at contract value).
  - Participant loans are notes receivable from participants measured at unpaid principal plus accrued unpaid interest — not investments.
  - "Change in net assets = contributions (employer, participant, rollovers) + investment income including net appreciation − benefits paid − administrative expenses."
  - Accrual basis — contributions receivable are recorded when due under the plan or a formal commitment.
citations:
  - source: FASB ASC 960 (Plan Accounting — Defined Benefit Pension Plans)
  - source: FASB ASC 962 (Plan Accounting — Defined Contribution Pension Plans)
  - source: FASB ASC 965 (Plan Accounting — Health and Welfare Benefit Plans)
    note: Similar structure; not emphasized here
---

## Defined contribution vs. defined benefit

| | Defined contribution (e.g., 401(k)) | Defined benefit (pension) |
|---|---|---|
| Promise | Contributions specified; benefit = account balance | Benefit formula specified (e.g., 1.5% × years × final pay) |
| Investment risk | Participant | Employer/plan |
| Statements | Net assets available for benefits; changes in net assets | Same two, **plus** accumulated plan benefits and changes in them |

> These are the **plan's** statements. The **employer's** accounting for pension cost (ASC 715) is a separate topic.

## The statement of net assets available for benefits

| Assets | Measurement |
|---|---|
| Investments (mutual funds, common stock, collective trusts) | **Fair value** |
| Fully benefit-responsive investment contracts (DC plans) | **Contract value** |
| Notes receivable from participants (plan loans) | **Unpaid principal + accrued unpaid interest** |
| Employer and participant contributions receivable | Amounts due under the plan or a formal commitment |
| Less: liabilities (accrued expenses, excess contributions payable) | |
| **= Net assets available for benefits** | |

## The statement of changes in net assets

```worked
title: Change in net assets of a 401(k) plan
scenario: |
  Beginning net assets $30,000,000. During the year: employer contributions $1,800,000; participant contributions
  $2,600,000; rollovers in $400,000; interest and dividends $900,000; net appreciation in fair value of investments
  $2,100,000; benefits paid to participants $3,200,000; administrative expenses $100,000.
steps:
  - label: Additions — contributions
    work: 1,800,000 + 2,600,000 + 400,000
    result: 4,800,000
  - label: Additions — investment income
    work: 900,000 + 2,100,000
    result: 3,000,000
  - label: Deductions
    work: 3,200,000 + 100,000
    result: 3,300,000
  - label: Net increase and ending net assets
    work: 4,800,000 + 3,000,000 − 3,300,000 = 4,500,000; 30,000,000 + 4,500,000
    result: Ending net assets available for benefits = 34,500,000
insight: Net appreciation combines realized and unrealized gains and losses on investments — plans do not separate them on the face.
```

```check
far-ebp-chk1
```

## Defined benefit plans: accumulated plan benefits

A DB plan also reports the **actuarial present value of accumulated plan benefits** — benefits attributable to service **already rendered**, based on the plan's formula (generally without projecting future salary increases), categorized as:

1. Vested benefits of participants **currently receiving payments**,
2. **Other vested** benefits, and
3. **Nonvested** benefits.

It also discloses the significant effects of factors that changed that amount — plan amendments, changes in the nature of the plan (e.g., a spinoff), and changes in actuarial assumptions. This information may be presented as of the **beginning or end** of the plan year (on the face or in notes).

```faded
title: Your turn — ending net assets
scenario: |
  A DC plan begins the year with net assets of $12,000,000. Participant contributions $950,000; employer match
  $475,000; dividends $220,000; net depreciation in fair value of investments $(610,000); benefits paid $1,300,000;
  administrative fees $35,000. At year-end the employer owed a $60,000 match for December payroll (not yet recorded
  in the figures above).
steps:
  - label: Total employer contributions including the receivable
    answer: 535000
    solution: 475,000 + 60,000 = 535,000 (accrual basis)
  - label: Net change in net assets
    answer: -240000
    hint: Additions − deductions; depreciation is negative investment income.
    solution: 950,000 + 535,000 + 220,000 − 610,000 − 1,300,000 − 35,000 = −240,000
  - label: Ending net assets available for benefits
    answer: 11760000
    solution: 12,000,000 − 240,000 = 11,760,000
```

```check
far-ebp-chk2
```
