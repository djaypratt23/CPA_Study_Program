---
id: far-payables
section: FAR
title: Payables & accrued liabilities
minutes: 14
objectives:
  - text: Record accounts payable under the gross and net methods and accrue expenses incurred but unpaid.
    skill: application
    task: Calculate accounts payable and accrued liabilities
  - text: Compute payroll liabilities, sales taxes payable, and compensated absences.
    skill: application
  - text: Compute bonus accruals based on formulas that depend on net income.
    skill: application
  - text: Reconcile the accounts payable subledger to the general ledger, search for unrecorded liabilities and review an accrued liabilities schedule against source data.
    skill: analysis
bigIdea:
  what: >-
    Accrued liabilities are obligations for things the company has already received — goods, labor, services —
    but hasn't paid for yet. Recording them when incurred keeps expenses in the period they helped produce revenue.
  why: >-
    If a company only recorded wages when paid, a payroll that straddles year-end would put December's work into
    January's expenses. Accruals match the cost to the period, and show lenders the full set of short-term
    obligations.
  example: >-
    Employees earned $40,000 of wages in the last week of December that won't be paid until January 5. The company
    records wages expense and wages payable of $40,000 at December 31.
preQuestions: [far-pay-pre1]
keyTakeaways:
  - "Gross method: record purchases and payables at the invoice price; discounts taken reduce cost when paid. Net method: record net of the discount; discounts lost are a financing expense."
  - Sales taxes collected are liabilities, not revenue. If recorded sales include tax, divide by (1 + tax rate) to find sales.
  - "Payroll: withholdings (income tax, the employee's FICA) are liabilities; the employer's FICA match and unemployment taxes are additional payroll tax expense."
  - Accrue compensated absences (vacation) when the obligation relates to services already rendered, the rights vest or accumulate, payment is probable, and the amount is estimable. Sick pay that doesn't vest need not be accrued.
  - "Bonus formulas: write an equation — e.g., bonus = 10% × (income − bonus) — and solve algebraically."
  - Liabilities are measured at the amount needed to settle; short-term trade payables are not discounted.
citations:
  - source: FASB ASC 405-10 (Liabilities — Overall)
  - source: FASB ASC 710-10-25 (Compensation — compensated absences)
  - source: FASB ASC 606-10-32-2A (sales taxes excluded from transaction price)
---

## Accounts payable: gross vs. net method

Terms "2/10, net 30" offer a 2% discount if paid within 10 days.

| Event | Gross method | Net method |
|---|---|---|
| Buy $10,000 of inventory | Dr Inventory 10,000 / Cr AP 10,000 | Dr Inventory 9,800 / Cr AP 9,800 |
| Pay within 10 days | Dr AP 10,000 / Cr Inventory 200 / Cr Cash 9,800 | Dr AP 9,800 / Cr Cash 9,800 |
| Pay after 10 days | Dr AP 10,000 / Cr Cash 10,000 | Dr AP 9,800 / Dr **Purchase discounts lost** 200 / Cr Cash 10,000 |

The net method highlights missed discounts (an inefficiency) as a separate expense.

## Accrued expenses

Typical year-end accruals: wages, interest, utilities, property taxes, and professional fees. The entry is always **Dr Expense / Cr Liability** for amounts incurred but not yet paid.

```check
far-pay-chk1
```

## Sales taxes and payroll

**Sales tax** collected from customers is owed to the government — a liability, never revenue.

```worked
title: Sales tax embedded in recorded sales
scenario: A retailer rang up $212,000 of total receipts, including 6% sales tax, and credited it all to Sales.
steps:
  - label: True sales
    work: 212,000 ÷ 1.06
    result: 200,000
  - label: Sales tax payable
    work: 212,000 − 200,000
    result: 12,000 — reclassify from Sales to Sales taxes payable
insight: Don't compute 6% × 212,000 (= 12,720) — the tax is 6% of sales, and 212,000 already includes it.
```

**Payroll.** With gross wages of $100,000, federal income tax withheld of $15,000, and FICA at 7.65%:

```je
title: Recording payroll
lines:
  - { account: Wages expense, debit: 100000 }
  - { account: Federal income tax withheld payable, credit: 15000 }
  - { account: FICA taxes payable (employee), credit: 7650 }
  - { account: Wages payable (net pay), credit: 77350 }
memo: The employer separately records payroll tax expense for its matching FICA (7,650) plus federal and state unemployment taxes.
```

## Compensated absences

Accrue vacation (and similar) pay when **all four** conditions hold:

1. The obligation is for services **already rendered**,
2. The rights **vest or accumulate** (carry forward),
3. Payment is **probable**, and
4. The amount is **reasonably estimable**.

**Sick pay** that is paid only for actual illness and does not vest is typically not required to be accrued, even if it accumulates.

## Bonuses based on income

Translate the words into an equation.

```faded
title: Your turn — bonus based on income after the bonus
scenario: |
  A company's income before the bonus and income taxes is $550,000. The CEO's bonus is 10% of income after
  deducting the bonus but before income taxes.
steps:
  - label: Set up the equation — bonus B = 10% × (550,000 − B). Solve for B.
    answer: 50000
    hint: B = 55,000 − 0.1B → 1.1B = 55,000
    solution: B = 55,000 ÷ 1.1 = 50,000
  - label: Check — income after the bonus
    answer: 500000
    solution: 550,000 − 50,000 = 500,000; 10% of that is 50,000 ✓
```

```check
far-pay-chk2
```

## Reconciling AP and reviewing accruals

**AP subledger vs. GL.** Classify each difference by the record it affects:

| Item | Correct |
|---|---|
| Invoice in subledger, GL batch not posted | GL only |
| Debit memo in GL, not posted to the vendor | Subledger only |
| Goods received, no invoice yet (title passed) | **Both**: an unrecorded liability |
| Payment posted to the wrong vendor | Neither total (but two vendor balances) |

A reconciliation that agrees proves only that the two records agree with **each other**. Liabilities missing from both records are found by comparing the **receiving log** and January disbursements with year-end payables.

**Reviewing accruals.** Recompute each accrual from its source instead of accepting the prior method:

- **Interest:** principal × rate × the months since the **last payment date**, not a full year.
- **Wages:** the unpaid workdays since the last pay period ended.
- **Warranty liability:** beginning liability + expense accrued − claims paid. The year's *expense* is not the year-end *liability*.
- **Compensated absences:** vested, earned and unused vacation is accrued when earned.
- **Utilities and other services:** December usage billed in January is a December expense.
