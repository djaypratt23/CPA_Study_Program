---
id: reg-gross-income
section: REG
title: 'Gross income: inclusions & exclusions'
minutes: 19
taxYear: '2025'
objectives:
  - text: Determine whether common items are included in or excluded from gross income.
    skill: application
    task: Calculate gross income
  - text: Apply the rules for employee fringe benefits, Social Security benefits, and cancellation of debt.
    skill: application
    task: Determine the taxable portion of benefits and debt discharges
  - text: Apply timing rules, including constructive receipt and the tax benefit rule.
    skill: application
    task: Determine when income is recognized
  - text: Review Form 1040 gross income against source documents and resolve related software diagnostics.
    skill: analysis
bigIdea:
  what: >-
    Gross income is "all income from whatever source derived" unless a specific provision excludes it. So the
    question is always: is there an exclusion? Gifts, inheritances, life insurance, municipal bond interest, and many
    fringe benefits are excluded; nearly everything else is in.
  why: >-
    The starting point of the return — and a favorite exam area — is sorting items into included and excluded,
    including partial exclusions such as Social Security and scholarships.
  example: >-
    A graduate student receives a $30,000 scholarship: $22,000 for tuition and books and $8,000 for housing. Only the
    $8,000 housing portion is taxable.
preQuestions: [reg-gi-pre1]
keyTakeaways:
  - "Included: wages, tips, bonuses, business income, interest (except municipal), dividends, rents, prizes and awards, gambling winnings, unemployment compensation, alimony under pre-2019 divorce agreements, punitive damages, and forgiven debt (unless excluded)."
  - "Excluded: gifts and inheritances, life insurance death benefits, municipal bond interest, child support, alimony under post-2018 agreements, compensatory damages for physical injury, qualified scholarships (tuition, fees, books) for degree candidates, and certain fringe benefits."
  - "Fringe benefits excluded: employer health insurance, group-term life up to $50,000 of coverage, no-additional-cost services, qualified employee discounts, working condition and de minimis fringes, educational assistance up to $5,250, and dependent care assistance up to $5,000 (2025)."
  - "Social Security: 0%, up to 50%, or up to 85% taxable depending on provisional income (AGI + tax-exempt interest + 50% of benefits) compared with $25,000/$34,000 (single) or $32,000/$44,000 (joint)."
  - "Cancellation of debt is income unless the debtor is in bankruptcy, insolvent (to the extent of insolvency), or another exclusion applies; gifts of debt forgiveness aren't income."
  - "Constructive receipt: income credited, set aside, or made available without restriction is taxable when available (e.g., a check received December 31)."
  - "Tax benefit rule: a recovery (e.g., a state income tax refund) is income only to the extent the earlier deduction reduced tax."
citations:
  - source: IRC §61 (Gross income defined)
  - source: IRC §79, §101, §102, §103, §104, §106, §117, §127, §129, §132 (Exclusions)
  - source: IRC §86 (Social Security benefits), §108 (Discharge of indebtedness), §111 (Tax benefit rule)
---

## Included or excluded?

| Item | Treatment |
|---|---|
| Gift or inheritance | Excluded (income earned on it afterward is taxable) |
| Life insurance paid because of death | Excluded (except transfers for value) |
| Municipal bond interest | Excluded (may affect Social Security taxability and AMT) |
| Scholarship for tuition, fees, books | Excluded for degree candidates; room, board, and pay for services are taxable |
| Compensatory damages for physical injury or sickness | Excluded; punitive damages are taxable |
| Alimony (divorce after 2018) | Excluded by the recipient; not deductible by the payer |
| Child support | Excluded |
| Unemployment compensation | Included |
| Prizes, awards, gambling winnings | Included |
| State income tax refund | Included only to the extent a prior itemized deduction gave a tax benefit |

```check
reg-gi-chk1
```

## Fringe benefits

```worked
title: What does the employee report?
scenario: |
  Rita's employer provides the following in 2025.
steps:
  - label: Group-term life insurance of $150,000
    work: Coverage above $50,000 is taxable (IRS table cost of the $100,000 excess)
    result: Include the table cost of $100,000 of coverage
  - label: Health insurance premiums of $9,000
    work: Employer-provided accident and health coverage
    result: Excluded
  - label: Tuition reimbursement of $7,000 for an MBA
    work: Educational assistance excludable up to $5,250
    result: $1,750 included (unless it qualifies as a working condition fringe)
  - label: Holiday ham and occasional snacks
    work: De minimis fringe
    result: Excluded
  - label: A $500 cash gift card
    work: Cash and cash equivalents are never de minimis
    result: $500 included
insight: Cash is almost always taxable; employer-paid benefits are excluded only if a specific section says so.
```

## Social Security benefits

Provisional income = AGI (before Social Security) + tax-exempt interest + 50% of Social Security benefits.

| Provisional income (single / joint) | Taxable portion |
|---|---|
| Up to $25,000 / $32,000 | None |
| $25,000–$34,000 / $32,000–$44,000 | Up to 50% |
| Above $34,000 / $44,000 | Up to 85% |

## Cancellation of debt

- Generally included in gross income.
- Excluded if discharged in bankruptcy, or to the extent the taxpayer is insolvent immediately before the discharge (excluded amounts reduce tax attributes such as NOLs and basis).
- A creditor's gratuitous forgiveness is a gift; a purchase-price reduction by the seller isn't income.

```check
reg-gi-chk2
```

## Reviewing gross income against source documents

When you review a prepared return, tie **each** income line to its document, then ask whether anything on the documents is missing from the return:

| Line | Source | Common error |
|---|---|---|
| Wages | W-2 **box 1** | Using box 5 (Medicare wages include elective deferrals) |
| Taxable interest | 1099-INT box 1 | Adding box 8 tax-exempt interest (it goes on line 2a) |
| Capital gain | 1099-B plus 1099-DIV box 2a | Forgetting capital gain distributions |
| Alimony | Divorce decree date | Pre-2019 instruments: taxable to the recipient |
| State refund | 1099-G plus last year's return | Taxing a refund when last year's standard deduction gave no benefit |

Deposits with no income document (gifts, inheritances, loans, transfers between accounts) need an explanation, not automatic inclusion.

**Resolving diagnostics.** Tax software raises a diagnostic whenever an entry looks unusual. It is a question, not an error. For each one, decide whether:

1. the **input is wrong** — fix the entry;
2. the entry is **right and the difference is expected** — clear the flag and document why; or
3. the source documents **cannot answer it** — ask the client.

Clearing a flag without understanding it is how errors reach a filed return.
