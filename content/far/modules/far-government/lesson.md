---
id: far-government
section: FAR
title: State & local government reporting concepts
minutes: 16
objectives:
  - text: Identify the fund categories and the fund types within each.
    skill: remembering
    task: Identify fund types used by state and local governments
  - text: Match measurement focus and basis of accounting to government-wide and fund statements.
    skill: application
    task: Distinguish government-wide from fund financial statements
  - text: Classify net position and governmental fund balance components.
    skill: application
bigIdea:
  what: >-
    Governments report on two levels at once: government-wide statements that look like a business (full accrual,
    all assets and liabilities), and fund statements that track whether money raised for a purpose was spent as
    legally required (short-term, spendable resources).
  why: >-
    Citizens want two answers: "Is the city financially sustainable over the long run?" (government-wide) and "Did
    officials spend this year's tax money the way the budget and laws said?" (funds). One set of numbers can't
    answer both.
  example: >-
    A city borrows $10 million to build a bridge. The capital projects fund reports the bond proceeds as an "other
    financing source" and the construction as an expenditure. The government-wide statements instead show a $10
    million bridge asset and a $10 million bond liability.
preQuestions: [far-gov-pre1]
keyTakeaways:
  - GASB sets standards for state and local governments. The annual comprehensive financial report includes MD&A, government-wide statements, fund statements, notes, and required supplementary information.
  - "Governmental funds (general, special revenue, debt service, capital projects, permanent) use the current financial resources measurement focus and modified accrual basis."
  - "Proprietary funds (enterprise, internal service) and fiduciary funds (pension/OPEB trust, investment trust, private-purpose trust, custodial) use economic resources and full accrual."
  - "Government-wide statements (statement of net position, statement of activities) use economic resources and full accrual, and exclude fiduciary activities."
  - "Net position: net investment in capital assets, restricted, unrestricted. Governmental fund balance: nonspendable, restricted, committed, assigned, unassigned."
  - Only the general fund reports a positive unassigned fund balance.
citations:
  - source: GASB Statement No. 34 (Basic Financial Statements and MD&A for State and Local Governments), as amended
  - source: GASB Statement No. 54 (Fund Balance Reporting and Governmental Fund Type Definitions)
  - source: GASB Statement No. 84 (Fiduciary Activities)
  - source: GASB Codification Sections 1100, 1300, and 2200
---

## Two lenses on the same government

| | Government-wide statements | Governmental fund statements |
|---|---|---|
| Statements | Statement of net position; statement of activities | Balance sheet; statement of revenues, expenditures, and changes in fund balances |
| Measurement focus | **Economic resources** | **Current financial resources** |
| Basis | **Full accrual** | **Modified accrual** |
| Capital assets & long-term debt | **Reported** (depreciated) | **Not reported** — capital outlay is an expenditure; debt proceeds are an other financing source |
| Scope | Governmental + business-type activities (not fiduciary) | Each major governmental fund |

Under **modified accrual**, revenues are recognized when **measurable and available** (collectible within the period or soon enough after to pay current liabilities — commonly 60 days for property taxes), and **expenditures** are recognized when the liability is incurred, with exceptions such as debt service recognized when due.

## The fund families

```mermaid
flowchart TD
  F["Funds"] --> G["Governmental<br/>current financial resources · modified accrual"]
  F --> P["Proprietary<br/>economic resources · accrual"]
  F --> FI["Fiduciary<br/>economic resources · accrual"]
  G --> G1["General"]
  G --> G2["Special revenue"]
  G --> G3["Debt service"]
  G --> G4["Capital projects"]
  G --> G5["Permanent"]
  P --> P1["Enterprise (fees to the public — water utility, airport)"]
  P --> P2["Internal service (fees to other departments — motor pool, IT)"]
  FI --> FI1["Pension & OPEB trust"]
  FI --> FI2["Investment trust"]
  FI --> FI3["Private-purpose trust"]
  FI --> FI4["Custodial"]
```

Mnemonic for the governmental funds: "**G**et **S**ome **D**ebt, **C**ity **P**lanners" — **G**eneral, **S**pecial revenue, **D**ebt service, **C**apital projects, **P**ermanent.

> **Permanent fund vs. private-purpose trust:** a permanent fund holds resources whose *earnings* support the government's own programs (e.g., cemetery care); a private-purpose trust benefits individuals or other organizations.

```check
far-gov-chk1
```

## Net position and fund balance

**Government-wide net position** has three components:

1. **Net investment in capital assets** — capital assets, net of depreciation, minus related debt.
2. **Restricted** — externally imposed (creditors, grantors, laws) or by enabling legislation.
3. **Unrestricted** — everything else.

**Governmental fund balance** has five classifications (GASB 54), from most to least constrained:

| Classification | Constraint |
|---|---|
| **Nonspendable** | Not in spendable form (inventory, prepaids) or legally required to be kept intact (permanent fund corpus) |
| **Restricted** | Externally imposed (grantors, creditors, laws of other governments) or by enabling legislation |
| **Committed** | Formal action of the government's highest decision-making body (e.g., council ordinance) |
| **Assigned** | Intended use set by a body or official delegated authority |
| **Unassigned** | Residual — positive only in the general fund |

```worked
title: Converting a governmental fund transaction to the government-wide view
scenario: |
  A town issues $2,000,000 of 10-year bonds at par on July 1 and spends $1,500,000 on a new fire station by
  year-end (December 31). Interest at 4% is payable annually on June 30.
steps:
  - label: Capital projects fund — resources
    work: Bond proceeds are an "other financing source" of 2,000,000; construction is a 1,500,000 capital outlay expenditure.
    result: Fund balance increases 500,000
  - label: Government-wide — assets and liabilities
    work: Capitalize the fire station (1,500,000) and report bonds payable (2,000,000); cash 500,000 remains.
    result: Net position change from these items = 0 (before interest)
  - label: Government-wide — accrued interest at December 31
    work: 2,000,000 × 4% × 6/12
    result: 40,000 interest expense and interest payable (the debt service fund records nothing until due)
insight: The same event reduces the fund balance through expenditures while the government-wide statements simply swap cash for a building — which is why a reconciliation between the two is required.
```

```faded
title: Your turn — modified accrual property tax revenue
scenario: |
  A county levies $5,000,000 of property taxes for its fiscal year ending June 30. By June 30 it collected
  $4,600,000. It expects $250,000 to be collected by August 15 (within 60 days), $100,000 later in the next year,
  and $50,000 to be uncollectible.
steps:
  - label: Property tax revenue in the general fund (modified accrual)
    answer: 4850000
    hint: Measurable and available — collected during the year or within 60 days after.
    solution: 4,600,000 + 250,000 = 4,850,000; the 100,000 collectible later is deferred inflows of resources.
  - label: Property tax revenue in the government-wide statements (accrual)
    answer: 4950000
    solution: Levy 5,000,000 − estimated uncollectible 50,000 = 4,950,000 (for the year the tax was levied).
```

```check
far-gov-chk2
```
