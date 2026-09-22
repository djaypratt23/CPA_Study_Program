---
id: far-ppe-acquisition
section: FAR
title: 'PP&E: acquisition cost & capitalized interest'
minutes: 18
objectives:
  - text: Determine which costs are capitalized to land, land improvements, buildings, and equipment.
    skill: application
    task: Calculate the initial cost of property, plant, and equipment
  - text: Allocate a lump-sum purchase price using relative fair values.
    skill: application
  - text: Compute interest capitalized on self-constructed assets using weighted-average accumulated expenditures.
    skill: application
    task: Calculate capitalized interest
  - text: Distinguish capital expenditures from revenue expenditures after acquisition.
    skill: application
bigIdea:
  what: >-
    The cost of a long-lived asset is everything necessarily spent to get it in place and ready for its intended
    use. Those costs are capitalized — held on the balance sheet — and later spread over the years the asset helps
    produce revenue.
  why: >-
    A delivery truck serves the business for years. Charging its entire cost (and the cost of getting it
    road-ready) to the month it was bought would make that month look terrible and the following years look
    artificially good. Capitalizing matches cost to benefit.
  example: >-
    A bakery buys a $60,000 oven, pays $2,000 for delivery and $3,000 to install a gas line and test it. The oven's
    cost is $65,000. The $500 it later spends on a routine cleaning is an expense.
preQuestions: [far-ppe-pre1]
keyTakeaways:
  - Capitalize all costs necessary to acquire the asset and bring it to the condition and location for its intended use (price, freight, installation, testing, permits, architect fees).
  - "Land: price, closing costs, title and survey, clearing, and demolishing an old building (net of salvage). Land improvements (paving, fences, lighting) are separate and depreciable."
  - "Lump-sum purchases: allocate the price by relative fair values."
  - "Capitalized interest = avoidable interest on weighted-average accumulated expenditures: specific borrowing rate first, weighted-average rate on other debt for the excess — capped at actual interest incurred."
  - Interest is capitalized only while expenditures are made, construction activities are in progress, and interest is being incurred; not for routinely produced inventory or assets already in use.
  - "After acquisition: additions and improvements that extend life or capacity are capitalized; ordinary repairs and maintenance are expensed."
citations:
  - source: FASB ASC 360-10-30 (Property, Plant, and Equipment — initial measurement)
  - source: FASB ASC 835-20 (Capitalization of Interest)
  - source: FASB ASC 410-20 (Asset Retirement Obligations)
---

## What goes into the cost?

| Asset | Capitalize | Expense |
|---|---|---|
| **Land** | Purchase price, broker and legal fees, title insurance, survey, clearing and grading, demolition of an old building (less salvage), back taxes assumed, permanent improvements maintained by the city (streets, sewers assessed to owner) | Annual property taxes after purchase |
| **Land improvements** (depreciable) | Parking lots, driveways, fences, landscaping with limited life, outdoor lighting | |
| **Building** | Purchase price or construction cost, architect fees, building permits, excavation for the foundation, capitalized interest during construction | Costs of a strike, uninsured accidents during construction |
| **Equipment** | Price (net of discounts), sales tax, freight, insurance in transit, installation, testing and trial runs | Repairs after the asset is in use; training staff to operate it |

> **Trap:** Demolishing an old building on land just purchased → **land** cost (it prepares the land). Demolishing a building the company already used → loss on disposal of that building.

```check
far-ppe-chk1
```

## Lump-sum (basket) purchases

When several assets are bought for one price, allocate by **relative fair values**:

| Asset | Fair value | % of total | Allocated cost of $900,000 |
|---|---|---|---|
| Land | 300,000 | 30% | 270,000 |
| Building | 600,000 | 60% | 540,000 |
| Equipment | 100,000 | 10% | 90,000 |
| **Total** | **1,000,000** | 100% | **900,000** |

## Asset retirement obligations (brief)

If the company is legally obligated to dismantle an asset or restore a site, it records the **fair value of the ARO** (usually a present value) as a liability and **adds the same amount to the asset's cost**. The liability accretes (interest-like expense) and the added cost is depreciated.

## Capitalizing interest on self-constructed assets

**Qualifying assets:** assets constructed for the company's own use, or discrete projects (e.g., ships, real estate developments) built for sale or lease. **Not qualifying:** inventory routinely produced in large quantities, assets already in use or ready for use, and land not being developed.

The steps:

```mermaid
flowchart TD
  A["Weighted-average accumulated expenditures (WAAE)<br/>each expenditure × fraction of the period outstanding"] --> B["Apply the specific construction loan rate<br/>to WAAE up to the loan amount"]
  B --> C["Apply the weighted-average rate on other debt<br/>to any WAAE above the specific loan"]
  C --> D["Avoidable interest = B + C"]
  D --> E["Capitalize the LESSER of avoidable interest and actual interest incurred"]
```

```worked
title: Capitalized interest on a new warehouse
scenario: |
  A company builds a warehouse during the year: expenditures of $600,000 on January 1, $400,000 on July 1, and
  $200,000 on October 1. The warehouse is completed December 31. Debt outstanding all year: an 8% $500,000
  construction loan and $2,000,000 of 10% general bonds.
steps:
  - label: Weighted-average accumulated expenditures
    work: 600,000 × 12/12 + 400,000 × 6/12 + 200,000 × 3/12 = 600,000 + 200,000 + 50,000
    result: 850,000
  - label: Interest on the specific loan
    work: 500,000 × 8%
    result: 40,000
  - label: Interest on the excess using the general rate
    work: (850,000 − 500,000) × 10%
    result: 35,000
  - label: Avoidable interest vs. actual interest
    work: "Avoidable 75,000; actual = 500,000 × 8% + 2,000,000 × 10% = 240,000"
    result: Capitalize 75,000; expense the remaining 165,000
insight: Interest capitalized becomes part of the warehouse's cost and is depreciated over its life.
```

```faded
title: Your turn — capitalized interest
scenario: |
  A company starts building its own headquarters on April 1 and spends $1,200,000 that day, then $800,000 on
  October 1. Construction continues into next year. It has no specific construction loan; its only debt is
  $3,000,000 of 9% notes outstanding all year. Calendar year-end.
steps:
  - label: Weighted-average accumulated expenditures for the year
    answer: 1100000
    hint: April 1 spending is outstanding 9 months; October 1 spending 3 months.
    solution: 1,200,000 × 9/12 + 800,000 × 3/12 = 900,000 + 200,000 = 1,100,000
  - label: Avoidable interest
    answer: 99000
    solution: 1,100,000 × 9% = 99,000
  - label: Actual interest incurred
    answer: 270000
    solution: 3,000,000 × 9% = 270,000
  - label: Interest capitalized
    answer: 99000
    solution: Lesser of 99,000 and 270,000 = 99,000
```

## After the asset is in service

| Expenditure | Treatment |
|---|---|
| **Addition** (a new wing) | Capitalize |
| **Improvement/betterment** (replace a roof with a better one; upgrade that increases capacity or life) | Capitalize (remove the old component's cost if known) |
| **Extraordinary repair** that extends useful life | Capitalize |
| **Ordinary repairs and maintenance** | Expense |

```check
far-ppe-chk2
```
