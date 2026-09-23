---
id: aud-going-concern
section: AUD
title: Going concern
minutes: 15
objectives:
  - text: Identify conditions and events that may raise substantial doubt about an entity's ability to continue as a going concern.
    skill: remembering
    task: Identify indicators of going concern issues
  - text: Evaluate management's plans and determine whether substantial doubt is alleviated.
    skill: evaluation
    task: Evaluate management's plans to mitigate going concern conditions
  - text: Determine the effect of going concern conclusions on the auditor's report.
    skill: application
    task: Determine the reporting consequences of going concern uncertainty
bigIdea:
  what: >-
    Statements assume the business will keep operating. The auditor evaluates whether there is substantial doubt
    that the entity can continue for a reasonable period — under U.S. GAAP, one year after the statements are
    issued (or available to be issued) — and, if so, whether management's plans alleviate it.
  why: >-
    If a company may fail within the year, users need to know. Asset values, debt classification, and every
    investor's decision change when survival is uncertain.
  example: >-
    A manufacturer has recurring losses, is in default on its loan, and lost its largest customer. Management plans
    to sell a division, but no buyer has been identified. The plan isn't probable of being effectively implemented,
    so substantial doubt remains and the auditor's report includes a going concern section.
preQuestions: [aud-gc-pre1]
keyTakeaways:
  - "Evaluation period (U.S. GAAP): one year after the date the statements are issued or available to be issued."
  - "Indicators: negative trends (recurring losses, negative cash flows), other signs of financial difficulty (loan defaults, denied credit, restructuring), internal matters (strikes, loss of key personnel), external matters (legal proceedings, loss of a key customer or license)."
  - "Management's plans can alleviate substantial doubt only if it is probable they will be effectively implemented and that they will mitigate the conditions."
  - "Substantial doubt alleviated by plans: disclosure in the notes is required; no going concern section in the auditor's report is required."
  - "Substantial doubt remains: the report includes a separate section headed \"Substantial Doubt About the Entity's Ability to Continue as a Going Concern\" (the opinion remains unmodified if disclosure is adequate)."
  - "Inadequate disclosure → qualified or adverse opinion. In rare cases with multiple significant uncertainties, the auditor may disclaim."
  - "Conditional language (\"if the company doesn't obtain financing...\") must not be used in the going concern section."
citations:
  - source: AU-C 570 (The auditor's consideration of an entity's ability to continue as a going concern), SAS No. 132
  - source: FASB ASC 205-40 (Going concern)
  - source: PCAOB AS 2415
---

## The evaluation

```mermaid
flowchart TD
  A[Conditions or events identified] --> B{Substantial doubt before considering plans?}
  B -- No --> OK[No going concern reporting]
  B -- Yes --> C[Evaluate management's plans]
  C --> D{Probable of effective implementation AND mitigates the conditions?}
  D -- Yes --> E[Substantial doubt alleviated: note disclosure; no report section required]
  D -- No --> F[Substantial doubt remains]
  F --> G{Disclosure adequate?}
  G -- Yes --> H[Unmodified opinion + going concern section]
  G -- No --> I[Qualified or adverse opinion]
```

| Indicator category | Examples |
|---|---|
| Negative trends | Recurring losses, working capital deficiencies, negative operating cash flow |
| Financial difficulty | Loan defaults, arrearages in dividends, denial of trade credit, need to sell substantial assets |
| Internal matters | Work stoppages, dependence on one project, uneconomic long-term commitments |
| External matters | Legal proceedings, loss of a key franchise, license, patent, customer, or supplier; uninsured catastrophe |

```check
aud-gc-chk1
```

## Evaluating management's plans

```worked
title: Are the plans enough?
scenario: |
  Burke Ltd. has a $6 million loan due in five months and cash of $1 million. Management offers three plans.
steps:
  - label: Plan A — refinance with the current lender
    work: The lender has sent a signed commitment letter with no unusual conditions
    result: Probable of implementation — strong evidence
  - label: Plan B — sell a warehouse for $3 million
    work: No buyer identified; the market is weak
    result: Not probable — gives little weight
  - label: Plan C — owner will contribute capital "if needed"
    work: No written commitment; the owner's financial capacity is unknown
    result: Not probable without evidence of ability and intent
insight: Evidence of plans means documents — commitment letters, signed agreements, financial capacity — not intentions.
```

```check
aud-gc-chk2
```

## Reporting

| Situation | Opinion | Report content |
|---|---|---|
| No substantial doubt | Unmodified | Nothing about going concern |
| Substantial doubt alleviated by plans | Unmodified | Nothing required (auditor may add emphasis of matter) |
| Substantial doubt remains; adequate disclosure | Unmodified | Separate "Substantial Doubt About the Entity's Ability to Continue as a Going Concern" section |
| Inadequate disclosure | Qualified or adverse | Basis for the modification |
| Multiple significant uncertainties (rare) | Disclaimer permitted | |
