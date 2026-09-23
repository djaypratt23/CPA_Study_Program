---
id: tcp-retirement-education
section: TCP
title: Retirement & education savings planning
minutes: 20
taxYear: '2025'
objectives:
  - text: Determine contribution limits and deductibility for IRAs, Roth IRAs, 401(k), SEP, and SIMPLE plans.
    skill: application
    task: Calculate retirement plan contribution limits
  - text: Determine the tax on distributions, including early-withdrawal penalties, exceptions, and required minimum distributions.
    skill: application
    task: Calculate the tax on retirement plan distributions
  - text: Compare §529 plans, Coverdell accounts, and education credits for an education savings goal.
    skill: analysis
    task: Analyze education savings alternatives
bigIdea:
  what: >-
    Retirement and education accounts trade access for tax benefits. Traditional accounts give a deduction now and
    tax withdrawals later; Roth accounts tax the money now and let qualified withdrawals come out tax-free. Early
    or non-qualified withdrawals usually cost income tax plus a 10% additional tax.
  why: >-
    Planning questions ask which account suits a client, how much they can put in, and what a withdrawal costs.
    The numbers change every year, so learn the structure and keep the 2025 figures handy.
  example: >-
    A 35-year-old in a low bracket who expects higher income later should favor a Roth — she pays tax at today's
    low rate and never again on the growth.
preQuestions: [tcp-re-pre1]
keyTakeaways:
  - "2025 limits: IRA $7,000 (+$1,000 age 50+). 401(k)/403(b) deferrals $23,500 (+$7,500 age 50+; +$11,250 at ages 60–63). SIMPLE $16,500. Defined contribution annual additions (§415(c)) $70,000."
  - "SEP: employer contribution up to 25% of compensation (20% of net SE earnings after the SE tax deduction for a sole proprietor), max $70,000."
  - "Traditional IRA deduction phase-out for active participants (2025): $79,000–$89,000 single; $126,000–$146,000 MFJ. Spouse who isn't covered but whose spouse is: $236,000–$246,000."
  - "Roth IRA contribution phase-out (2025): $150,000–$165,000 single; $236,000–$246,000 MFJ. Qualified distributions (5-year rule and age 59½, death, disability, or $10,000 first home) are tax-free. Contributions come out first, tax-free."
  - "Early distributions (before 59½): 10% additional tax, with exceptions such as death, disability, substantially equal periodic payments, medical costs over 7.5% of AGI, and — for IRAs only — higher education expenses and $10,000 first-time homebuyer. Separation from service at 55+ is an exception for employer plans only."
  - "RMDs begin at age 73. Missing an RMD: 25% excise tax, reduced to 10% if corrected timely."
  - "§529 plans: nondeductible federally; tax-free growth and withdrawals for qualified higher education expenses, up to $10,000/year of K-12 tuition (for 2025), and up to $35,000 lifetime rolled to the beneficiary's Roth IRA (account open 15+ years). Non-qualified earnings: income tax + 10%."
  - "Coverdell ESA: $2,000 per beneficiary per year; phase-out $95,000–$110,000 single, $190,000–$220,000 MFJ."
  - "Education credits (2025): AOTC up to $2,500 per student (first 4 years; 40% refundable); lifetime learning credit up to $2,000 per return. Both phase out $80,000–$90,000 single / $160,000–$180,000 MFJ. No double-dipping with §529 withdrawals."
citations:
  - source: IRC §219 (IRA deduction), §408A (Roth IRAs), §401(k), §408(k) (SEP), §408(p) (SIMPLE), §415(c)
  - source: IRC §72(t) (Early distributions), §401(a)(9) and §4974 (RMDs), §529, §530 (Coverdell), §25A (Education credits)
  - source: IRS Notice 2024-80 (2025 retirement plan limits)
---

## Traditional vs Roth

| | Traditional IRA / 401(k) | Roth IRA / Roth 401(k) |
|---|---|---|
| Contribution | Deductible / pre-tax (IRA deduction may phase out) | After-tax |
| Growth | Tax-deferred | Tax-free |
| Qualified withdrawal | Ordinary income | Tax-free |
| RMDs during owner's life | Yes (age 73) | No for Roth IRAs or Roth 401(k)s |
| Best when | Current rate > future rate | Current rate < future rate |

```worked
title: Partial IRA deduction
scenario: |
  Maya (single, age 40) is covered by her employer's 401(k). Her 2025 MAGI is $83,000. She contributes $7,000 to a
  traditional IRA. How much can she deduct?
steps:
  - label: Phase-out range
    work: 79,000 to 89,000 (range of 10,000)
    result: She is 4,000 into the range
  - label: Reduction
    work: 7,000 × 4,000 ÷ 10,000
    result: 2,800
  - label: Deductible amount
    work: 7,000 − 2,800
    result: 4,200 (the other 2,800 is a nondeductible contribution — track basis on Form 8606)
insight: A nondeductible contribution still grows tax-deferred, and the basis comes out tax-free later.
```

```check
tcp-re-chk1
```

## Early distributions

```faded
title: Your turn — the cost of an early withdrawal
scenario: |
  Owen (age 45, 24% bracket) withdraws $30,000 from his traditional IRA: $10,000 pays his daughter's qualified
  college tuition, and the rest pays off a car loan. The IRA is fully pre-tax.
steps:
  - label: Amount included in gross income
    answer: 30000
    solution: The entire pre-tax distribution is taxable
  - label: Amount subject to the 10% additional tax
    answer: 20000
    hint: Higher education expenses are an IRA exception
    solution: 30,000 − 10,000 education exception = 20,000
  - label: Additional tax
    answer: 2000
    solution: 10% × 20,000 = 2,000 (plus income tax of 24% × 30,000 = 7,200)
```

```check
tcp-re-chk2
```

## Education savings

| | §529 plan | Coverdell ESA | AOTC / LLC |
|---|---|---|---|
| Contribution limit | Plan-set (gift tax rules apply) | $2,000/yr | — |
| Income limit | None | Yes | Yes |
| K-12 | Tuition up to $10,000/yr (2025) | Tuition and other expenses | No |
| Tax benefit | Tax-free growth and qualified withdrawals | Tax-free growth and qualified withdrawals | Credit against tax |
