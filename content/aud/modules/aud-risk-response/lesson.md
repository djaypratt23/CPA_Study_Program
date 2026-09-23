---
id: aud-risk-response
section: AUD
title: 'Further audit procedures: nature, timing & extent'
minutes: 16
objectives:
  - text: Identify the types of audit procedures and link them to assertions.
    skill: remembering
    task: Identify audit procedures and the assertions they address
  - text: Determine the direction of testing for existence versus completeness.
    skill: application
    task: Design substantive procedures that address specific assertions
  - text: Evaluate the use of interim testing and substantive analytical procedures.
    skill: analysis
    task: Determine the nature, timing, and extent of further audit procedures
bigIdea:
  what: >-
    Further audit procedures are the auditor's answer to the assessed risks: tests of controls (did the control
    work?) and substantive procedures (is the number right?). Each procedure is chosen for the assertion at risk,
    performed at a sensible time, and sized to the risk.
  why: >-
    A procedure only helps if it points the right way. Vouching recorded sales to shipping documents proves
    they happened; it can never find sales that were never recorded. Matching direction to assertion is what makes
    evidence relevant.
  example: >-
    To find unrecorded liabilities, the auditor starts outside the ledger — payments after year-end and unpaid
    invoices — and traces them back to see whether they were recorded.
preQuestions: [aud-rr-pre1]
keyTakeaways:
  - "Types of procedures: inspection of records or assets, observation, inquiry, external confirmation, recalculation, reperformance, and analytical procedures."
  - "Existence/occurrence: start from the recorded entry and vouch back to source documents or assets. Completeness: start from source documents (or outside evidence) and trace forward into the records."
  - "Substantive procedures are required for each material class of transactions, account balance, and disclosure, regardless of the assessed RMM."
  - "If substantive procedures are performed at an interim date, the auditor covers the remaining period with further substantive procedures, or combines them with tests of controls (a rollforward)."
  - "Substantive analytical procedures work best for large volumes of predictable transactions and need a precise expectation built from reliable data."
  - "Evidence is more reliable when it comes from independent sources, is obtained directly by the auditor, is documentary and original, and when related controls are effective."
  - "Inquiry alone is never sufficient to test a control's effectiveness or to support a material assertion."
citations:
  - source: AU-C 330 (Performing audit procedures in response to assessed risks and evaluating the audit evidence obtained)
  - source: AU-C 500 (Audit evidence) and AU-C 520 (Analytical procedures)
  - source: PCAOB AS 2301 (The auditor's responses to the risks of material misstatement)
---

## The toolbox

| Procedure | Example | Typical assertion |
|---|---|---|
| Inspection of records | Vouch sales entries to shipping documents | Occurrence |
| Inspection of assets | Examine equipment additions | Existence |
| Observation | Watch the client's inventory count | Existence |
| Inquiry | Ask about pending litigation | Completeness (never sufficient alone) |
| External confirmation | Confirm receivables with customers | Existence, rights |
| Recalculation | Recompute depreciation | Accuracy, valuation |
| Reperformance | Re-execute an aging to test the control | Control effectiveness |
| Analytical procedures | Expected interest = average debt × rate | Many (depending on precision) |

## Direction of testing

```mermaid
flowchart LR
  subgraph Existence / occurrence
  L1[Ledger entry] -->|vouch| S1[Source document or asset]
  end
  subgraph Completeness
  S2[Source document or outside evidence] -->|trace| L2[Ledger entry]
  end
```

```check
aud-rr-chk1
```

```worked
title: Designing the direction
scenario: |
  The risks for Duncan Supply are (1) fictitious sales and (2) unrecorded purchases at year-end.
steps:
  - label: Fictitious sales (occurrence)
    work: Select sales invoices from the sales journal → vouch to shipping documents and customer orders
    result: Starts from the recorded population, because fictitious items are in the records
  - label: Unrecorded purchases (completeness)
    work: Select receiving reports and cash disbursements after year-end → trace to the purchases journal and accounts payable
    result: Starts outside the recorded population, because unrecorded items aren't in the records
insight: Ask, "If the misstatement exists, which population contains it?" Test from that population.
```

## Timing and interim testing

- Testing at an **interim date** is efficient but leaves a gap to year-end. The auditor must cover the **remaining period** with substantive procedures (and, where relying on controls, evidence the controls continued to operate).
- **Higher risk** → test closer to year-end.
- Some procedures can only be done at or after year-end (e.g., cut-off tests and the final reconciliation of the financial statements to the records).

## Substantive analytical procedures

Suitable when relationships are plausible and predictable (e.g., interest expense, payroll, rental income). The auditor develops an **expectation** precise enough to detect a material misstatement, sets a threshold for acceptable differences, and investigates differences above it — corroborating management's explanations.

```check
aud-rr-chk2
```

## Reliability of evidence (from more to less reliable)

1. Obtained directly by the auditor (observation, recalculation)
2. From independent external sources (confirmations, bank statements received directly)
3. Internal evidence when controls are effective
4. Internal evidence when controls are weak; oral representations
