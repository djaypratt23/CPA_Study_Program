---
id: reg-cost-recovery
section: REG
title: 'Cost recovery: MACRS, §179, bonus & amortization'
minutes: 20
taxYear: '2025'
objectives:
  - text: Compute MACRS depreciation using the half-year, mid-quarter, and mid-month conventions.
    skill: application
    task: Calculate MACRS depreciation
  - text: Apply §179 expensing (including the business income limit) and bonus depreciation for 2025.
    skill: application
    task: Calculate §179 and bonus depreciation
  - text: Compute amortization of start-up and organizational costs and §197 intangibles.
    skill: application
    task: Calculate amortization of intangibles
  - text: Review a depreciation and amortization schedule against source documents and resolve diagnostic discrepancies.
    skill: analysis
    task: Review depreciation and amortization for accuracy
bigIdea:
  what: >-
    Cost recovery decides when a business deducts what it spends on long-lived assets. Immediate expensing
    (§179, bonus) front-loads deductions; MACRS spreads them over a recovery period; §197 intangibles and
    start-up costs are amortized. Planning is choosing the timing that produces the most value — usually sooner,
    but not always.
  why: >-
    REG asks you to compute each year's deduction (convention, recovery period, §179 limits, bonus) and to review a
    prepared depreciation schedule against invoices and placed-in-service dates. Deciding *when* to expense is a
    TCP planning question; getting the numbers right is REG.
  example: >-
    A profitable company buys $500,000 of equipment in 2025 after January 19. It can expense the full cost with
    100% bonus depreciation, or elect out and depreciate over 7 years if it expects much higher income later.
preQuestions: [tcp-cr2-pre1]
keyTakeaways:
  - "Order: §179 first, then bonus depreciation on the remaining basis, then regular MACRS on what's left."
  - "2025 §179: up to $2,500,000, reduced dollar for dollar by qualifying purchases over $4,000,000 (P.L. 119-21, for property placed in service after 2024). Limited to taxable income from active trades or businesses; the excess carries forward. Can be elected asset by asset; available for qualified improvement property and certain nonresidential roof, HVAC, security, and fire systems."
  - "Bonus depreciation: 100% for property acquired after January 19, 2025 (made permanent by P.L. 119-21); 40% for property acquired before January 20, 2025 and placed in service in 2025. Not limited by income; can create a loss; elect out by class of property."
  - "MACRS personal property: 200% declining balance switching to straight-line; half-year convention, unless more than 40% of the year's depreciable basis (excluding real property) is placed in service in the 4th quarter → mid-quarter convention."
  - "Real property: straight-line, mid-month convention — residential rental 27.5 years, nonresidential 39 years. Land isn't depreciable."
  - "Listed property (e.g., vehicles): business use must exceed 50% for §179, bonus, and MACRS; otherwise ADS straight-line. Passenger autos have annual dollar caps."
  - "§197 intangibles (acquired goodwill, customer lists, covenants not to compete): 15-year straight-line from the month acquired. Start-up and organizational costs: deduct up to $5,000 each (reduced by costs over $50,000), amortize the rest over 180 months."
  - "Domestic research and experimental expenditures: deductible currently for tax years beginning after 2024 under new §174A (P.L. 119-21); foreign R&E is amortized over 15 years."
citations:
  - source: IRC §168 (MACRS and bonus depreciation), §179 (Election to expense), §280F (Listed property), §197 (Intangibles), §195 and §248 (Start-up and organizational costs)
  - source: IRC §168(k), §179(b), and §174A as amended or added by Public Law 119-21; Rev. Proc. 87-57 (MACRS tables)
---

> **Tax year:** 2025. §179 limits, 100% bonus depreciation, and domestic R&E expensing come from P.L. 119-21 (see REVIEW.md).

## MACRS first-year rates (half-year convention)

| Class | Examples | Year 1 rate |
|---|---|---|
| 5-year | Cars, light trucks, computers | 20.00% |
| 7-year | Office furniture, most machinery | 14.29% |
| 15-year | Land improvements (150% DB) | 5.00% |
| 27.5-year residential | Rental housing (placed in service in January) | 3.485% |
| 39-year nonresidential | Office buildings (placed in service in January) | 2.461% |

```worked
title: §179, bonus, and MACRS together
scenario: |
  In June 2025, River LLC buys machinery (7-year) for $3,000,000 — it acquired it after January 19, 2025. Total 2025
  equipment purchases are $3,000,000; business taxable income before this deduction is $4,000,000. River wants
  to expense $1,000,000 under §179, elect out of bonus depreciation for 7-year property, and depreciate the rest.
steps:
  - label: §179 limit
    work: Purchases 3,000,000 < 4,000,000 threshold, so no phase-out; election of 1,000,000 ≤ 2,500,000 and ≤ income
    result: 1,000,000
  - label: Remaining basis
    work: 3,000,000 − 1,000,000
    result: 2,000,000
  - label: MACRS (half-year, 7-year)
    work: 14.29% × 2,000,000
    result: 285,800
  - label: Total 2025 cost recovery
    work: 1,000,000 + 285,800
    result: 1,285,800
insight: Without the election out, 100% bonus would have deducted the full 3,000,000. Choosing a smaller deduction can make sense when future rates or income are expected to be higher.
```

```check
tcp-cr2-chk1
```

## The mid-quarter trap

```faded
title: Your turn — is the mid-quarter convention required?
scenario: |
  A calendar-year business places in service: $100,000 of equipment in March and $300,000 of equipment in
  November. It also buys a $1,000,000 building in November. No §179 or bonus.
steps:
  - label: Depreciable basis of personal property placed in service in Q4
    answer: 300000
    hint: Real property is excluded from the test
    solution: 300,000 (the building is excluded)
  - label: Q4 percentage of the year's personal property (%)
    answer: 75
    solution: 300,000 ÷ 400,000 = 75%
  - label: Mid-quarter convention required? (1 = yes, 0 = no)
    answer: 1
    solution: Yes — more than 40% placed in service in the last quarter
```

```check
tcp-cr2-chk2
```

## Real property: the mid-month convention

Residential rental property (27.5 years) and nonresidential real property (39 years) use straight-line and the
**mid-month** convention: the asset is treated as placed in service (or disposed of) in the middle of its month.

```worked
title: First-year depreciation on a nonresidential building
scenario: |
  A company places a warehouse in service on April 10, 2025. Its cost is $1,560,000, of which $120,000 is land.
steps:
  - label: Depreciable basis
    work: 1,560,000 − 120,000
    result: 1,440,000
  - label: Months in 2025 under mid-month
    work: April counts as a half month; May–December are 8 months
    result: 8.5
  - label: 2025 depreciation
    work: 1,440,000 ÷ 39 × 8.5 ÷ 12
    result: 26,154 (rounded)
insight: Land never depreciates. In the year of sale, the mid-month convention again gives half a month for the month of disposal.
```

## Amortization of intangibles

| Cost | Treatment |
|---|---|
| Start-up costs (§195) | Deduct up to $5,000 in the year business begins, reduced dollar for dollar by costs over $50,000; amortize the rest over 180 months from the month business begins |
| Organizational costs (§248 corporations, §709 partnerships) | Same $5,000 / $50,000 / 180-month rule, computed separately from start-up costs |
| Purchased §197 intangibles (goodwill, customer lists, covenants not to compete) | 15-year straight-line from the month acquired; no first-year expensing |
| Self-created goodwill | Not amortizable |

```worked
title: Start-up cost deduction
scenario: |
  A new business incurs $51,500 of start-up costs and begins operations on October 1, 2025.
steps:
  - label: Immediate deduction
    work: 5,000 − (51,500 − 50,000)
    result: 3,500
  - label: Amortizable balance
    work: 51,500 − 3,500
    result: 48,000
  - label: 2025 amortization (3 months)
    work: 48,000 ÷ 180 × 3
    result: 800
  - label: Total 2025 deduction
    work: 3,500 + 800
    result: 4,300
insight: At $55,000 or more of start-up costs, the immediate deduction is zero and everything is amortized over 180 months.
```

## Reviewing a depreciation schedule

When you review a prepared depreciation schedule, tie each line to its source document and ask:

1. **Placed-in-service date** — does it match the invoice or the installation record? A December asset changes the
   mid-quarter test.
2. **Class and life** — is the asset in the right MACRS class (5-, 7-, 15-, 27.5- or 39-year)?
3. **Basis** — is land excluded, and are installation and freight included?
4. **Convention** — half-year unless more than 40% of personal property was placed in service in Q4; mid-month for real property.
5. **Elections** — does the §179 amount respect the dollar limit, the phase-out and the business income limit?
   Was bonus elected out by class?

A diagnostic such as "mid-quarter convention may apply" or "§179 exceeds business income" points you to items 4 and 5.
