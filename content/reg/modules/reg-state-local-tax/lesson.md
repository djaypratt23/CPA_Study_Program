---
id: reg-state-local-tax
section: REG
title: 'State and local taxation: nexus & apportionment'
minutes: 15
taxYear: '2025'
objectives:
  - text: Explain when a state may tax a business (nexus), including the protection of P.L. 86-272.
    skill: remembering
    task: Recall the concept of state tax nexus
  - text: Distinguish apportionment of business income from allocation of nonbusiness income.
    skill: remembering
    task: Recall apportionment and allocation concepts
  - text: Compute a corporation's state taxable income using a given apportionment formula.
    skill: application
    task: Calculate apportioned state taxable income
bigIdea:
  what: >-
    A state can tax a business's income only when the business has nexus with the state. A multistate business
    then splits its business income among the states with a formula (apportionment) and assigns nonbusiness
    income to a single state (allocation).
  why: >-
    REG expects you to recognize nexus and to compute the income one state can tax from given factors. Choosing
    where to locate property or people to manage state tax is TCP planning.
  example: >-
    A manufacturer with 30% of its sales, property and payroll (on average) in Ohio reports 30% of its business
    income to Ohio, plus any nonbusiness income allocated there.
preQuestions: [reg-slt-pre1]
keyTakeaways:
  - "Nexus is the minimum connection a state needs before it can tax a business: physical presence (property, employees, inventory) and, in many states, economic presence such as in-state sales above a threshold."
  - "P.L. 86-272 bars a state net income tax when the only in-state activity is soliciting orders for tangible personal property that are approved and shipped from outside the state. It does not protect services, intangibles, or non-income taxes."
  - "State taxable income usually starts from federal taxable income, then adds items such as state income taxes deducted federally and interest on other states' bonds, and subtracts interest on U.S. obligations."
  - "Apportionment: business income × the state's apportionment percentage. The classic formula averages three factors (in-state ÷ total sales, property and payroll); many states double-weight sales or use sales alone."
  - "Allocation: nonbusiness income (for example, rent from investment property unrelated to the business) goes entirely to one state — generally where the property is located or the taxpayer's commercial domicile."
  - "Sales of goods are sourced to the destination state; a throwback rule puts sales shipped to a state where the seller isn't taxable back into the origin state's numerator."
citations:
  - source: Public Law 86-272 (15 U.S.C. §381)
  - source: Uniform Division of Income for Tax Purposes Act (UDITPA) §§4–17; Multistate Tax Compact Art. IV
---

> **Scope:** REG tests the concepts and the computation. Planning a multistate footprint is in TCP (`Multistate taxation`).

## Nexus

```mermaid
flowchart TD
  A[In-state activity] --> Q{Only soliciting orders for tangible goods, approved and shipped from outside?}
  Q -->|Yes| P[Protected by P.L. 86-272: no state net income tax]
  Q -->|No: employees performing services, property, inventory, or economic threshold| N[Nexus: file and apportion]
```

```check
reg-slt-chk2
```

## From federal to state taxable income

1. Start with federal taxable income (before the NOL and special deductions in many states).
2. **Add** state and local income taxes deducted federally and interest on other states' municipal bonds.
3. **Subtract** interest on U.S. Treasury obligations (states can't tax it) and other state-specific items.
4. Remove **nonbusiness income**; it is allocated, not apportioned.
5. Multiply the remaining **business income** by the apportionment percentage.
6. Add the nonbusiness income **allocated** to this state.

## Apportionment

```worked
title: Three-factor apportionment
scenario: |
  Brookline Corp. has $2,000,000 of apportionable business income and $80,000 of rent from investment land
  located in State A. Its State A factors: sales $3,000,000 of $10,000,000; property $1,200,000 of $6,000,000;
  payroll $900,000 of $3,000,000. State A uses an equally weighted three-factor formula.
steps:
  - label: Factors
    work: Sales 30%; property 20%; payroll 30%
    result: 30%, 20%, 30%
  - label: Apportionment percentage
    work: (30% + 20% + 30%) ÷ 3
    result: 26.67%
  - label: Apportioned business income
    work: 2,000,000 × 26.67%
    result: 533,333
  - label: State A taxable income
    work: 533,333 + 80,000 rent allocated to State A, where the land is
    result: 613,333
insight: With a double-weighted sales factor the percentage would be (2 × 30% + 20% + 30%) ÷ 4 = 27.5%; with a single sales factor, 30%.
```

```check
reg-slt-chk1
```
