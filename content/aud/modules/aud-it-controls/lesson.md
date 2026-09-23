---
id: aud-it-controls
section: AUD
title: IT general and application controls
minutes: 15
objectives:
  - text: Distinguish IT general controls from application controls and give examples of each.
    skill: remembering
    task: Identify types of IT controls
  - text: Identify the application control that would prevent or detect a given input or processing error.
    skill: application
    task: Evaluate automated controls over transaction processing
  - text: Evaluate the effect of ineffective IT general controls on reliance on automated controls.
    skill: analysis
    task: Evaluate risks arising from IT
bigIdea:
  what: >-
    In computerized systems, two layers of controls matter. IT general controls (ITGCs) protect the whole
    environment — who can access systems and how programs are changed. Application controls work inside a
    specific process, such as an edit check that rejects an invalid customer number.
  why: >-
    An automated control performs the same way every time — but only if nobody can change the program or bypass
    it. Weak ITGCs mean the auditor can't trust that an automated control worked all year.
  example: >-
    A payroll system rejects hours above 80 per week (a limit test). If programmers can change production code
    without approval (a weak change-management ITGC), someone could quietly raise the limit, so the auditor can't
    rely on that control without testing more.
preQuestions: [aud-itc-pre1]
keyTakeaways:
  - "ITGCs: access to programs and data (logical and physical security), program changes, program development and acquisition, and computer operations (job scheduling, backup, and recovery)."
  - "Application controls are input, processing, or output controls within a specific application — e.g., edit checks, validity checks, limit and reasonableness tests, check digits, completeness checks, batch totals, and output reconciliations."
  - "Batch control totals: record counts (number of items), financial totals (sum of amounts), and hash totals (a meaningless sum, e.g., of account numbers)."
  - "Effective ITGCs support reliance on automated controls over time. With effective ITGCs, a baseline test of an automated control may support reliance in later years (benchmarking), with change controls tested."
  - "SAS 145 requires the auditor to understand the IT environment, identify risks arising from IT, and identify the ITGCs that address them for controls it plans to rely on."
  - "Segregation in IT: separate systems development, operations, and user departments; programmers should not have access to production data or live programs."
citations:
  - source: AU-C 315 (Understanding the IT environment; risks arising from the use of IT), as amended by SAS No. 145
  - source: PCAOB AS 2201 (IT considerations) and AS 2110
---

## Two layers

| IT general controls (ITGCs) | Application controls |
|---|---|
| Apply across many applications | Apply to one process or application |
| **Access**: passwords, role-based access, periodic access reviews, prompt removal of terminated users | **Input**: edit and validity checks, limit tests, check digits, required fields |
| **Program changes**: authorization, testing, approval, migration by someone other than the developer | **Processing**: run-to-run totals, sequence checks, matching (three-way match) |
| **Development and acquisition** of new systems | **Output**: reconciliations of output to input, review of exception reports, distribution controls |
| **Operations**: job scheduling, backup and recovery, incident management | |

```check
aud-itc-chk1
```

## Input controls — matching the control to the error

| Error | Control that catches it |
|---|---|
| Customer number keyed as 10236 instead of 10263 | **Check digit** (computed digit that fails when digits are transposed) |
| Hours worked entered as 400 instead of 40 | **Limit or reasonableness test** |
| Vendor ID that doesn't exist | **Validity check** against the master file |
| Missing ship date | **Completeness check** (required field) |
| Letters in an amount field | **Field (format) check** |
| A batch of 50 invoices where one was lost in keying | **Record count** or **financial total** |

```worked
title: Batch totals
scenario: |
  A clerk batches four vendor invoices for entry: vendor numbers 1044, 2051, 3102, 1188; amounts $1,200,
  $450, $3,100, $980.
steps:
  - label: Record count
    work: 4 invoices
    result: 4
  - label: Financial total
    work: 1,200 + 450 + 3,100 + 980
    result: 5,730
  - label: Hash total (vendor numbers)
    work: 1,044 + 2,051 + 3,102 + 1,188
    result: 7,385 — meaningless as a number, but it detects a changed or substituted vendor number
insight: The system recomputes each total after input. A mismatch means an item was lost, duplicated, or changed.
```

```check
aud-itc-chk2
```

## Why ITGCs matter to reliance

```mermaid
flowchart TD
  A[Plan to rely on an automated control] --> B{Relevant ITGCs effective?}
  B -- Yes --> C[Test the automated control once; rely on it for the period; benchmarking possible in later years]
  B -- No --> D[Cannot assume consistent operation — test more, or rely on substantive procedures]
```

- **Access** failures let people change data or bypass controls.
- **Change-management** failures mean a tested program might not be the one that ran all year.
- **Segregation in IT**: developers shouldn't migrate their own changes or access production data.
