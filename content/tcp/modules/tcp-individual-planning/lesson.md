---
id: tcp-individual-planning
section: TCP
title: Income timing, estimated tax & individual planning
minutes: 20
taxYear: '2025'
objectives:
  - text: Compute required estimated tax payments and determine whether an underpayment penalty applies using the safe harbors.
    skill: application
    task: Calculate estimated tax payments and safe harbors
  - text: Evaluate timing strategies — deferring income, accelerating deductions, and bunching itemized deductions — to minimize tax across years.
    skill: analysis
    task: Analyze the tax effect of income and deduction timing
  - text: Apply the net investment income tax, the additional Medicare tax, and the kiddie tax in planning situations.
    skill: application
    task: Calculate surtaxes that affect individual planning
bigIdea:
  what: >-
    Individual tax planning is mostly about *when* and *how* income and deductions land. The same dollars can cost
    very different amounts of tax depending on the year they fall in, the bracket they hit, and whether a surtax or
    phase-out is triggered. Compliance adds a cash-flow rule: tax must be paid as income is earned, through
    withholding or quarterly estimates.
  why: >-
    TCP moves beyond "what is taxable" (REG) to "what should the client do." Expect questions that ask which
    choice produces the lowest tax, or whether a client has done enough to avoid an underpayment penalty.
  example: >-
    A single client itemizes only slightly above the standard deduction every year. By paying two years of
    charitable gifts in one year (bunching) and taking the standard deduction the next, she deducts more in total
    over the two years.
preQuestions: [tcp-ip-pre1]
keyTakeaways:
  - "Estimated tax safe harbors (no penalty if withholding + estimates ≥ the lesser of): 90% of current-year tax, or 100% of prior-year tax — 110% of prior-year tax if prior-year AGI exceeded $150,000 ($75,000 MFS). No penalty if the balance due is under $1,000."
  - "Installments are due April 15, June 15, September 15, and January 15 — 25% of the required annual payment each. Withholding is treated as paid evenly through the year unless you elect otherwise; the annualized income method helps when income is lumpy."
  - "Timing: defer income and accelerate deductions when rates will be the same or lower next year; do the opposite when rates or income will rise. Watch phase-outs and the AMT."
  - "Bunching: concentrate itemized deductions (especially charitable gifts, often through a donor-advised fund) into alternating years and take the standard deduction in between."
  - "NIIT: 3.8% on the lesser of net investment income or MAGI above $200,000 single / $250,000 MFJ / $125,000 MFS (not indexed). Additional Medicare tax: 0.9% on wages/SE income above the same thresholds."
  - "Kiddie tax (2025): a child's unearned income above $2,700 is taxed at the parents' rate (under 19, or a full-time student under 24)."
  - "Qualified charitable distributions: an IRA owner age 70½+ can transfer up to $108,000 (2025) directly to charity; it counts toward the RMD and is excluded from income."
  - "2025 SALT itemized deduction cap: $40,000 ($20,000 MFS), reduced by 30% of MAGI over $500,000 but not below $10,000 (P.L. 119-21)."
citations:
  - source: IRC §6654 (Failure by individual to pay estimated tax)
  - source: IRC §1411 (Net investment income tax), §3101(b)(2) (Additional Medicare tax), §1(g) (Kiddie tax)
  - source: IRC §164(b)(6) as amended by Public Law 119-21; §408(d)(8) (Qualified charitable distributions)
---

> **Tax year:** 2025 law, including One Big Beautiful Bill Act changes (see REVIEW.md for amounts to confirm).

## Estimated tax: paying as you go

```mermaid
flowchart TD
  A[Total tax after credits − withholding] -->|Less than $1,000| B[No penalty]
  A -->|$1,000 or more| C{Paid enough on time?}
  C --> D[Required annual payment = lesser of 90% of current-year tax or 100% of prior-year tax]
  D --> E[110% of prior-year tax if prior-year AGI > $150,000]
  E --> F[25% due each installment: 4/15, 6/15, 9/15, 1/15]
```

```worked
title: Required annual payment for a high-income client
scenario: |
  Dana's 2024 tax was $40,000 on AGI of $220,000. She expects 2025 tax of $60,000. Her employer will withhold
  $30,000 in 2025. How much must she pay in estimates to be safe?
steps:
  - label: 90% of current-year tax
    work: 90% × 60,000
    result: 54,000
  - label: Prior-year safe harbor (AGI over $150,000)
    work: 110% × 40,000
    result: 44,000
  - label: Required annual payment
    work: Lesser of 54,000 or 44,000
    result: 44,000
  - label: Estimates needed
    work: 44,000 − 30,000 withholding
    result: 14,000 total, or 3,500 per quarter
insight: The prior-year safe harbor is usually the easiest target when income is rising — it is known on January 1.
```

```check
tcp-ip-chk1
```

## Timing and bunching

| When the client expects… | Income | Deductions |
|---|---|---|
| Same or lower rates next year | Defer (e.g., delay a year-end bonus, use installment sale) | Accelerate (pay deductible expenses in December) |
| Higher rates or income next year | Accelerate (e.g., Roth conversion now) | Defer |
| Itemized deductions near the standard deduction | — | Bunch into alternating years (donor-advised fund) |

```faded
title: Your turn — bunching charitable gifts
scenario: |
  Lee (single, 2025 standard deduction $15,750) has $8,000 of SALT and $6,000 of mortgage interest every year and
  gives $6,000 a year to charity. Compare giving $6,000 each year with giving $12,000 in 2025 and nothing in 2026.
  Assume the same standard deduction in 2026.
steps:
  - label: Itemized deductions each year without bunching
    answer: 20000
    solution: 8,000 + 6,000 + 6,000 = 20,000 (itemize both years)
  - label: Two-year total deductions without bunching
    answer: 40000
    solution: 20,000 × 2 = 40,000
  - label: 2025 itemized deductions with bunching
    answer: 26000
    hint: Add both years of gifts to 2025
    solution: 8,000 + 6,000 + 12,000 = 26,000
  - label: Two-year total with bunching (2026 is the larger of itemized or standard)
    answer: 41750
    hint: 2026 itemized would be 14,000, so take the standard deduction
    solution: 26,000 + 15,750 = 41,750 — 1,750 more deductions than giving evenly
```

```check
tcp-ip-chk2
```

## Surtaxes that shape planning

- **NIIT (3.8%)** applies to interest, dividends, capital gains, rents, royalties, and passive business income — not wages, active business income, IRA distributions, or tax-exempt interest. Base = lesser of NII or MAGI over the threshold.
- **Additional Medicare tax (0.9%)** applies to wages and self-employment income over the threshold. Employers withhold it only on wages over $200,000, regardless of filing status.
- **Kiddie tax:** shifting investments to a child only helps up to $2,700 of unearned income (2025); above that, the parents' rate applies.
