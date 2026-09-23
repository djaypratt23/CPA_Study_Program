---
id: tcp-passive-rental
section: TCP
title: Passive activities, rental property & at-risk rules
minutes: 20
taxYear: '2025'
objectives:
  - text: Apply the loss limitation sequence — basis, at-risk, passive activity, and excess business loss — to a taxpayer's losses.
    skill: application
    task: Calculate allowable losses under the loss limitation rules
  - text: Apply the $25,000 active-participation rental allowance and the real estate professional exception.
    skill: application
    task: Calculate the rental real estate loss allowance
  - text: Classify vacation-home use and allocate expenses between rental and personal use.
    skill: analysis
    task: Analyze the tax treatment of mixed-use rental property
bigIdea:
  what: >-
    A loss from a business or rental passes through four gates before it reduces other income: basis, at-risk,
    passive activity, and (for large losses) the excess business loss limit. A loss stuck at a gate isn't lost — it
    carries forward until the gate opens.
  why: >-
    Loss-limitation questions are a TCP staple, often in a simulation that feeds a K-1 into an individual return.
    The order matters.
  example: >-
    A dentist invests in a real estate partnership and receives a $30,000 loss. She doesn't work in the activity,
    so it's passive. With no passive income, the loss is suspended — until she has passive income or sells the
    interest.
preQuestions: [tcp-pa-pre1]
keyTakeaways:
  - "Order of limits: (1) basis, (2) at-risk (§465), (3) passive activity (§469), (4) excess business loss (§461(l))."
  - "Passive activity: a trade or business in which the taxpayer doesn't materially participate, and (generally) any rental activity. Passive losses offset only passive income; the excess is suspended and carried forward."
  - "Suspended passive losses are fully released when the taxpayer disposes of the entire interest in a fully taxable transaction to an unrelated party."
  - "Rental real estate with active participation: up to $25,000 of losses against nonpassive income, reduced by 50% of MAGI over $100,000 (fully phased out at $150,000)."
  - "Real estate professional: more than 750 hours AND more than half of personal services in real property trades — rentals in which they materially participate are not passive."
  - "At-risk amount: cash and adjusted basis contributed + recourse debt + qualified nonrecourse real estate financing. Nonrecourse debt generally isn't at risk."
  - "Excess business loss (2025): net business losses above $313,000 single / $626,000 MFJ are disallowed and become an NOL carryforward."
  - "Vacation home: rented fewer than 15 days → rent excluded, no rental deductions. Personal use more than the greater of 14 days or 10% of rental days → residence; rental deductions limited to rental income."
citations:
  - source: IRC §469 (Passive activity losses), §465 (At-risk limitations), §461(l) (Excess business losses)
  - source: IRC §280A (Vacation homes); Rev. Proc. 2024-40 (2025 excess business loss thresholds)
---

## Four gates, in order

```mermaid
flowchart TD
  L[Loss from K-1 or Schedule C/E] --> B{1. Basis}
  B -->|Excess suspended until basis restored| B2[Carryforward]
  B --> R{2. At-risk}
  R -->|Excess suspended| R2[Carryforward]
  R --> P{3. Passive?}
  P -->|Excess over passive income suspended| P2[Carryforward to passive income or disposition]
  P --> X{4. Excess business loss}
  X -->|Above $313,000 / $626,000| X2[NOL carryforward]
  X --> D[Deductible]
```

```worked
title: The $25,000 rental allowance with a phase-out
scenario: |
  Tom (single) owns a rental house he actively manages (approves tenants, sets rent). The rental loss is $22,000.
  His MAGI is $120,000, and he has no passive income.
steps:
  - label: Maximum allowance
    work: 25,000
    result: 25,000
  - label: Phase-out
    work: 50% × (120,000 − 100,000)
    result: 10,000 reduction
  - label: Allowance
    work: 25,000 − 10,000
    result: 15,000 deductible against wages
  - label: Suspended loss
    work: 22,000 − 15,000
    result: 7,000 carried forward
insight: Active participation is a low bar — making management decisions counts — but it requires at least a 10% ownership interest.
```

```check
tcp-pa-chk1
```

## Vacation homes (§280A)

| Rental days | Personal use days | Treatment |
|---|---|---|
| Fewer than 15 | Any | Rent is tax-free; no rental expenses deductible (mortgage interest and taxes still itemized) |
| 15 or more | ≤ greater of 14 days or 10% of rental days | Rental property; loss allowed subject to passive rules |
| 15 or more | > greater of 14 days or 10% of rental days | Personal residence; expenses allocated to rental; deductions limited to rental income |

```faded
title: Your turn — mixed-use home
scenario: |
  A beach house is rented 90 days and used personally 30 days. Rental income $12,000. Mortgage interest and
  property taxes $9,000; utilities and maintenance $6,000; depreciation (if the whole year were rental) $7,500.
  Use the IRS days-used allocation (90 ÷ 120).
steps:
  - label: Rental percentage
    answer: 75
    solution: 90 ÷ 120 = 75%
  - label: Rental share of interest and taxes
    answer: 6750
    solution: 75% × 9,000 = 6,750
  - label: Rental share of utilities and maintenance
    answer: 4500
    solution: 75% × 6,000 = 4,500
  - label: Depreciation allowed
    answer: 750
    hint: Deductions can't exceed rental income; depreciation comes last
    solution: 12,000 − 6,750 − 4,500 = 750 of depreciation; the rest carries forward
```

```check
tcp-pa-chk2
```
