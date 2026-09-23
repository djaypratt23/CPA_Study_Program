---
id: aud-understanding-entity
section: AUD
title: Understanding the entity & its environment
minutes: 15
objectives:
  - text: Identify the aspects of the entity and its environment the auditor must understand.
    skill: remembering
    task: Obtain an understanding of the entity and its environment
  - text: Use inherent risk factors to assess inherent risk on a spectrum and identify significant risks.
    skill: application
    task: Assess inherent risk using inherent risk factors
  - text: Distinguish assertion-level from financial-statement-level risks and apply the stand-back requirement.
    skill: analysis
    task: Identify risks of material misstatement at the financial statement and assertion levels
bigIdea:
  what: >-
    Before assessing risk, the auditor learns how the business works: its industry, how it makes money, how it is
    financed and governed, and how management measures success. Risk is then assessed per assertion, with inherent
    risk placed on a spectrum using five inherent risk factors.
  why: >-
    Misstatements hide where the business is complex, judgmental, or under pressure. Knowing the business lets the
    auditor predict where those places are, instead of spreading effort evenly.
  example: >-
    A software company begins selling multi-year subscriptions bundled with implementation services. Revenue now
    involves complexity (allocation), subjectivity (standalone prices), and change (a new model), so revenue
    occurrence and cut-off move toward the high end of the inherent risk spectrum.
preQuestions: [aud-ue-pre1]
keyTakeaways:
  - "Understand: the organizational structure, ownership, governance, and business model (including IT); industry, regulatory, and other external factors; how performance is measured; and the applicable framework and accounting policies."
  - "Inherent risk factors: complexity, subjectivity, change, uncertainty, and susceptibility to misstatement from management bias or fraud."
  - "Inherent risk is assessed on a spectrum. A significant risk is one at or near the upper end of that spectrum (or one that standards require to be treated as significant)."
  - "Inherent risk and control risk are assessed separately for each relevant assertion. If controls are not tested, control risk is assessed at maximum."
  - "Financial-statement-level risks are pervasive (e.g., weak tone at the top, going concern pressure) and call for overall responses. Assertion-level risks call for specific further procedures."
  - "Stand-back: for each material class of transactions, account balance, or disclosure with no relevant assertion identified, the auditor re-evaluates whether that conclusion is still appropriate."
  - "Performance measures used for incentives can create pressure to misstate results."
citations:
  - source: AU-C 315 (Understanding the entity and its environment and assessing the risks of material misstatement), as amended by SAS No. 145
  - source: PCAOB AS 2110 (Identifying and assessing risks of material misstatement)
---

## What the auditor must understand

| Area | Examples of what to learn |
|---|---|
| Structure, ownership, governance | Subsidiaries, related parties, the board and audit committee |
| Business model and IT | Revenue streams, key customers, how IT is used in operations and reporting |
| External factors | Industry competition, regulation, economic conditions |
| Performance measures | KPIs, budgets, analyst expectations, bonus metrics |
| Accounting framework and policies | Revenue policies, estimates, changes in policies |

## Inherent risk factors

```mermaid
flowchart LR
  A[Complexity] --> S[Inherent risk spectrum]
  B[Subjectivity] --> S
  C[Change] --> S
  D[Uncertainty] --> S
  E[Susceptibility to bias or fraud] --> S
  S --> L[Lower]
  S --> H[Higher: significant risk at the upper end]
```

```check
aud-ue-chk1
```

## Levels of risk

| Level | Nature | Response |
|---|---|---|
| **Financial statement level** | Pervasive — affects many assertions (weak control environment, management integrity concerns, going concern pressure) | Overall responses: more experienced staff, more supervision, more skepticism, unpredictability, changes to timing |
| **Assertion level** | Specific (valuation of inventory, cut-off of revenue) | Further audit procedures designed for that assertion |

```worked
title: Placing risks on the spectrum
scenario: |
  Marlow Pharmaceuticals, Year 2. Three accounts are being assessed.
steps:
  - label: Cash (one bank account, simple reconciliations)
    work: Low complexity, subjectivity, change, and uncertainty
    result: Lower end of the spectrum
  - label: Litigation reserve for a new product-liability class action
    work: High uncertainty and subjectivity; susceptible to management bias
    result: Upper end — a significant risk
  - label: Revenue under a new rebate program
    work: Change and complexity in estimating variable consideration
    result: Elevated; the program's first year warrants focused procedures
insight: The factors explain why a risk is high. The auditor documents them because they drive the response.
```

```check
aud-ue-chk2
```

## Separate assessments and the stand-back

- **Inherent risk** is assessed for every relevant assertion.
- **Control risk** is assessed separately. If the auditor does not plan to test operating effectiveness, control risk is at **maximum** — the RMM then equals the inherent risk assessment.
- **Stand-back:** for material items where no relevant assertion was identified, re-evaluate that conclusion. Material items always get substantive procedures.
