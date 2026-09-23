---
id: aud-using-others
section: AUD
title: Using specialists, internal auditors & service organizations
minutes: 17
objectives:
  - text: Evaluate the work of an auditor's specialist and a management's specialist.
    skill: application
    task: Use the work of a specialist
  - text: Determine the extent to which the work of internal auditors can be used, including direct assistance.
    skill: evaluation
    task: Evaluate the use of internal auditors' work
  - text: Distinguish SOC 1 Type 1 and Type 2 reports and their use by a user auditor.
    skill: application
    task: Obtain evidence about controls at a service organization
bigIdea:
  what: >-
    Auditors often rely on work done by others: specialists (actuaries, appraisers), the entity's internal auditors,
    service organizations that process transactions (payroll providers, cloud platforms), and other auditors of
    group components. Each has rules about how to evaluate that work — and the auditor stays responsible for the
    opinion.
  why: >-
    Using others' work can make an audit better and faster, but only if the work is competent, objective, and
    relevant. The standards make the auditor evaluate those qualities instead of assuming them.
  example: >-
    A retailer outsources payroll to a processing firm. The auditor obtains the processor's SOC 1 Type 2 report,
    confirms it covers the right period and controls, and tests the complementary user entity controls at the
    retailer (such as reviewing payroll change reports).
preQuestions: [aud-uo-pre1]
keyTakeaways:
  - "Auditor's specialist (AU-C 620): evaluate competence, capabilities, and objectivity; agree on the scope of work; evaluate the adequacy of the work. Don't refer to the specialist in an unmodified report."
  - "Management's specialist (AU-C 500): evaluate competence, capabilities, and objectivity, understand the work, and evaluate it as audit evidence."
  - "Internal audit function (AU-C 610): the auditor may use its work if its organizational status and policies support objectivity, it is competent, and it applies a systematic, disciplined approach. The more judgment involved and the higher the risk, the less the auditor may use it."
  - "Direct assistance: internal auditors working under the external auditor's direction and supervision — not permitted when significant threats to objectivity exist or competence is lacking; not for significant judgments."
  - "The external auditor keeps sole responsibility for the opinion; internal auditors' work is never referenced in the report."
  - "SOC 1 Type 1: fairness of the description and suitability of design as of a date. SOC 1 Type 2: also operating effectiveness over a period — needed to support control reliance."
  - "The user auditor tests complementary user entity controls and doesn't refer to the service auditor in an unmodified report."
citations:
  - source: AU-C 620 (Using the work of an auditor's specialist)
  - source: AU-C 500 (Using the work of a management's specialist)
  - source: AU-C 610 (Using the work of internal auditors)
  - source: AU-C 402 (Audit considerations relating to an entity using a service organization)
  - source: AU-C 600 (Audits of group financial statements)
---

## Specialists

| | Auditor's specialist | Management's specialist |
|---|---|---|
| Engaged by | The auditor (internal or external to the firm) | The entity |
| Evaluate | Competence, capabilities, objectivity | Competence, capabilities, objectivity |
| Also | Agree on the scope, roles, and communications; evaluate the adequacy of the findings | Understand the work; evaluate its appropriateness as evidence (assumptions, methods, source data) |
| Referenced in report? | No (unless required by law, or relevant to a modification — with a statement that it doesn't reduce the auditor's responsibility) | No |

```check
aud-uo-chk1
```

## Internal audit function

```mermaid
flowchart TD
  A[Can the auditor use the internal audit function's work?] --> B{Objectivity supported by status and policies?}
  B -- No --> X[Don't use it]
  B -- Yes --> C{Competent?}
  C -- No --> X
  C -- Yes --> D{Systematic and disciplined approach, including quality control?}
  D -- No --> X
  D -- Yes --> E[Use it — less for high-risk areas and significant judgments]
```

The auditor must also **reperform** some of the work it uses, and it must make all significant judgments itself.

## Service organizations (SOC 1 reports)

| Report | Covers | Supports control reliance? |
|---|---|---|
| **Type 1** | Fair description and suitable design as of a specified date | Understanding only — not operating effectiveness |
| **Type 2** | Type 1 plus **operating effectiveness** over a period | Yes, if it covers the relevant controls and period |

```worked
title: Using a payroll processor's SOC 1 report
scenario: |
  Hartley Co. (calendar year) uses PayCore for payroll. PayCore provides a SOC 1 Type 2 report covering
  October 1, Year 0 – September 30, Year 1.
steps:
  - label: Is it the right type?
    work: Type 2 tests operating effectiveness
    result: Can support reliance on PayCore's controls
  - label: Does it cover the period?
    work: The report ends September 30; Hartley's year ends December 31
    result: Obtain a bridge letter from PayCore and other evidence for October–December
  - label: Complementary user entity controls
    work: The report assumes Hartley reviews payroll change reports
    result: Test that control at Hartley
  - label: Reference in the report?
    work: Unmodified opinion
    result: No reference to the service auditor
insight: A SOC report never covers the user entity's own controls; the user auditor tests those itself.
```

```check
aud-uo-chk2
```

## Group audits (component auditors)

In a group audit, the group engagement partner decides whether to **assume responsibility** for a component auditor's work (no reference in the report) or to **make reference** to the component auditor's report — indicating the division of responsibility. Either way, the group auditor evaluates the component auditor's independence, competence, and professional reputation.
