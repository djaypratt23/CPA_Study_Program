---
id: reg-business-rental-income
section: REG
title: Schedule C, rental income & passive activity limits
minutes: 19
taxYear: '2025'
objectives:
  - text: Determine deductible business expenses for a sole proprietor, including home office and meals.
    skill: application
    task: Calculate net income from a sole proprietorship
  - text: Apply the rules for vacation homes and rental property.
    skill: application
    task: Calculate net rental income
  - text: Apply the at-risk and passive activity loss limitations, including the $25,000 rental allowance.
    skill: analysis
    task: Determine deductible losses from passive activities
bigIdea:
  what: >-
    Sole proprietors report business income on Schedule C; landlords report rent on Schedule E. Losses from these
    activities pass through filters: at-risk rules, then passive activity rules (with a special $25,000 allowance for
    rental real estate), then the excess business loss limit.
  why: >-
    Without these filters, taxpayers could shelter wages with paper losses from activities they don't run. The
    rules decide which losses are usable now and which wait for future income or a sale.
  example: >-
    A nurse with AGI of $120,000 owns a rental house that loses $30,000. Because she actively participates, she can
    deduct up to $25,000 — reduced by half of her AGI over $100,000 — so $15,000 this year; $15,000 carries forward.
preQuestions: [reg-bri-pre1]
keyTakeaways:
  - "Schedule C: deduct ordinary and necessary business expenses. Not deductible: fines and penalties, political contributions, entertainment, and personal expenses. Business meals: 50%."
  - "Home office: regular and exclusive use as the principal place of business (or to meet clients). Simplified method: $5 per square foot, up to 300 square feet. Deduction is limited to business income."
  - "Start-up costs: deduct up to $5,000 (reduced dollar for dollar above $50,000); amortize the rest over 180 months."
  - "Hobby: income is taxable, but hobby expenses aren't deductible."
  - "Vacation home: rented fewer than 15 days → rent excluded and no rental deductions. Personal use exceeding the greater of 14 days or 10% of rental days → treated as a residence; rental deductions limited to rental income."
  - "At-risk rules first: losses limited to the amount at risk (cash, basis of property, and recourse debt)."
  - "Passive activities: trade or business activities without material participation and (generally) rental activities. Passive losses offset only passive income; suspended losses carry forward and are released when the activity is fully disposed of."
  - "$25,000 allowance for rental real estate with active participation, reduced by 50% of MAGI over $100,000 (gone at $150,000). Real estate professionals (more than 750 hours and more than half of personal services in real property businesses) can treat rentals as nonpassive."
citations:
  - source: IRC §162, §183, §195, §274, §280A (Business expenses, hobbies, start-up costs, meals, home office)
  - source: IRC §465 (At-risk rules), §469 (Passive activity losses), §461(l) (Excess business losses)
---

## Schedule C deductions

| Expense | Treatment |
|---|---|
| Business meals with clients (not lavish) | 50% deductible |
| Entertainment (sporting events, golf) | Not deductible |
| Fines and penalties paid to a government | Not deductible |
| Business gifts | Deductible up to $25 per recipient per year |
| Self-employed health insurance | Deductible for AGI (not on Schedule C) |
| Half of self-employment tax | Deductible for AGI |
| Start-up costs | $5,000 immediately (phased out above $50,000), rest over 180 months |

```check
reg-bri-chk1
```

## Vacation and rental homes

```mermaid
flowchart TD
  R[Days rented at fair rental?] -- Fewer than 15 --> X[Exclude rent; deduct only itemizable items like mortgage interest and taxes]
  R -- 15 or more --> P{Personal use > greater of 14 days or 10% of rental days?}
  P -- Yes --> V[Vacation home — allocate expenses; rental deductions limited to rental income, no loss]
  P -- No --> RP[Rental property — full deductions; loss subject to passive rules]
```

## Loss limitations — in order

```worked
title: Can Priya deduct her rental loss?
scenario: |
  Priya, single, has MAGI of $120,000 (wages). She owns a rental condo, actively participates (approves tenants and
  sets rent), and has a $30,000 loss. She has no other passive income, and she is fully at risk.
steps:
  - label: At-risk limit
    work: Fully at risk
    result: Loss passes to the passive activity rules
  - label: Special allowance
    work: 25,000 − 50% × (120,000 − 100,000)
    result: 15,000
  - label: Deductible this year
    work: Lesser of the 30,000 loss or the 15,000 allowance
    result: 15,000
  - label: Suspended loss
    work: 30,000 − 15,000
    result: 15,000 carried forward — usable against future passive income or released on sale
insight: The allowance phases out by $1 for every $2 of MAGI above $100,000, so it's gone at $150,000.
```

```faded
title: Your turn
scenario: |
  Evan (MAGI $136,000) actively participates in a rental with a $20,000 loss and has no other passive income.
steps:
  - label: Allowance after the phase-out
    answer: 7000
    solution: 25,000 − 50% × 36,000 = 7,000
  - label: Suspended loss
    answer: 13000
    solution: 20,000 − 7,000 = 13,000
```

```check
reg-bri-chk2
```
