---
id: tcp-multistate
section: TCP
title: 'Multistate taxation: nexus & apportionment'
minutes: 18
taxYear: '2025'
objectives:
  - text: Determine whether a business has income tax or sales tax nexus with a state, including P.L. 86-272 protection and economic nexus.
    skill: application
    task: Determine state tax nexus
  - text: Apportion business income among states using sales, property, and payroll factors.
    skill: application
    task: Calculate state apportionment
  - text: Distinguish allocation of nonbusiness income from apportionment and identify the effect of throwback and combined reporting.
    skill: analysis
    task: Analyze allocation and apportionment rules
bigIdea:
  what: >-
    A state can tax a business only if the business has nexus — a sufficient connection — with it. Once nexus
    exists, the state taxes a share of the business's income, figured by a formula (apportionment). Nonbusiness
    income, like investment gains unrelated to operations, is assigned (allocated) to one state instead.
  why: >-
    TCP asks whether a company must file in a state and how much of its income that state can tax.
  example: >-
    A software company with employees only in Texas sells to customers in 40 states. After Wayfair, states can
    require it to collect sales tax on sales above their economic thresholds, even without a physical presence.
preQuestions: [tcp-ms-pre1]
keyTakeaways:
  - "Income tax nexus: physical presence (property, employees) or, in many states, economic presence (e.g., sales above a threshold)."
  - "P.L. 86-272: a state can't impose a net income tax on a business whose only in-state activity is soliciting orders for tangible personal property, approved and shipped from outside the state. It doesn't protect services, intangibles, or gross receipts and franchise taxes based on capital."
  - "Sales tax nexus: physical presence or economic nexus after South Dakota v. Wayfair (2018) — commonly $100,000 of sales (some states also 200 transactions)."
  - "Apportionment: state share = weighted average of in-state/everywhere factors. Traditional UDITPA: equally weighted sales, property, and payroll. Many states now use a single sales factor or double-weight sales."
  - "Sales factor sourcing: tangible goods to the destination state; services and intangibles by market-based sourcing (where the benefit is received) in most states, or cost of performance in others."
  - "Throwback rule: sales shipped to a state where the seller isn't taxable are thrown back into the origin state's sales factor numerator."
  - "Allocation: nonbusiness income (e.g., rents or gains on property unrelated to the business) is allocated entirely to one state — usually the commercial domicile or where the property is located."
  - "Combined (unitary) reporting: related corporations in a unitary business compute and apportion income as a group."
citations:
  - source: Public Law 86-272 (15 U.S.C. §381); South Dakota v. Wayfair, Inc., 585 U.S. 162 (2018)
  - source: Uniform Division of Income for Tax Purposes Act (UDITPA); Multistate Tax Commission model regulations
---

## Does the state have nexus?

```mermaid
flowchart TD
  A[Activity in the state] --> B{Income tax}
  A --> S{Sales tax}
  B -->|Only solicitation of orders for tangible goods| P[Protected by P.L. 86-272]
  B -->|Employees, property, services, or economic threshold| N[Nexus: file and apportion]
  S -->|Physical presence or economic threshold| SN[Collect and remit]
  S -->|Neither| NO[No collection duty]
```

```check
tcp-ms-chk1
```

## Apportionment

```worked
title: Three-factor vs single-sales-factor
scenario: |
  Delta Corp's total business income is $2,000,000. State X factors: sales $3M of $10M; property $6M of $12M;
  payroll $2M of $5M.
steps:
  - label: Factor percentages
    work: Sales 30%; property 50%; payroll 40%
    result: —
  - label: Equally weighted three-factor
    work: (30 + 50 + 40) ÷ 3
    result: 40% → 800,000 taxed by State X
  - label: Double-weighted sales
    work: (30 × 2 + 50 + 40) ÷ 4
    result: 37.5% → 750,000
  - label: Single sales factor
    work: 30%
    result: 600,000
insight: A company with property and payroll concentrated in a state but sales spread nationally pays less to that state under a sales-only formula.
```

```faded
title: Your turn — throwback
scenario: |
  Echo Co. ships from its only warehouse in State A. Sales: $4M to State A customers; $3M to State B (where Echo
  has nexus); $3M to State C (where Echo is protected by P.L. 86-272). State A uses a single sales factor with a
  throwback rule.
steps:
  - label: State A sales numerator ($ millions)
    answer: 7
    hint: Sales into a state where Echo isn't taxable are thrown back
    solution: 4 + 3 (thrown back from C) = 7
  - label: State A apportionment percentage
    answer: 70
    solution: 7 ÷ 10 = 70%
```

```check
tcp-ms-chk2
```
