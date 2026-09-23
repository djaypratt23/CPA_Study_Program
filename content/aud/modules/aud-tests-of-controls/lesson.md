---
id: aud-tests-of-controls
section: AUD
title: Tests of controls
minutes: 14
objectives:
  - text: Determine when tests of controls are required.
    skill: remembering
    task: Determine when the auditor must test controls
  - text: Select procedures that test the operating effectiveness of a control.
    skill: application
    task: Design tests of operating effectiveness
  - text: Apply the rules for using prior-year evidence and interim tests of controls.
    skill: application
    task: Determine whether audit evidence from prior audits may be used
bigIdea:
  what: >-
    A test of controls asks whether a control operated effectively throughout the period the auditor relies on it:
    how it was applied, whether it was applied consistently, and by whom. Passing tests lower control risk and
    therefore the substantive work required.
  why: >-
    Relying on controls is efficient only if they truly worked. Testing them — beyond just asking — protects the
    auditor from cutting substantive work based on a control that exists only on paper.
  example: >-
    Policy says the controller approves every credit memo over $1,000. The auditor selects 40 credit memos over
    $1,000 issued during the year and inspects each for the controller's approval, investigating any exceptions.
preQuestions: [aud-toc-pre1]
keyTakeaways:
  - "Tests of controls are required when the auditor's risk assessment assumes controls operate effectively (planned reliance), or when substantive procedures alone cannot provide sufficient evidence (e.g., highly automated processing)."
  - "Procedures: inquiry combined with observation, inspection of documents, and reperformance. Inquiry alone is not sufficient."
  - "Evidence must cover the period of reliance. Interim tests must be updated for the remaining period."
  - "Prior-year evidence may be used for unchanged controls if the auditor confirms they haven't changed — but each control must be tested at least once every third audit, and some controls must be tested each year. Controls over significant risks must be tested in the current period."
  - "A deviation doesn't automatically mean the control failed; the auditor evaluates its cause and whether the sample results support reliance."
  - "A dual-purpose test tests a control and a balance with the same items (e.g., vouching invoices for approval and for correct amounts)."
citations:
  - source: AU-C 330 (Tests of controls; using evidence from previous audits)
  - source: PCAOB AS 2301 and AS 2201
---

## When are tests of controls required?

```mermaid
flowchart TD
  A[Relevant assertion] --> B{Does the planned approach rely on controls operating effectively?}
  B -- Yes --> T[Test operating effectiveness]
  B -- No --> C{Can substantive procedures alone provide sufficient evidence?}
  C -- No: e.g., highly automated, no paper trail --> T
  C -- Yes --> S[Substantive approach; control risk at maximum]
```

```check
aud-toc-chk1
```

## How to test a control

| Control | Test |
|---|---|
| Manual approval of credit memos | **Inspect** a sample of credit memos for evidence of approval |
| Segregation of duties at the loading dock | **Observe** (and inquire), since it leaves no documentary trail |
| Monthly bank reconciliation reviewed by the controller | **Inspect** reconciliations for review evidence and **reperform** one |
| Automated three-way match | Test the configuration once (with effective ITGCs), or reperform with test data |

**Design vs. operating effectiveness:** A walkthrough shows whether a control is designed and implemented. Operating effectiveness requires evidence across the period of reliance.

## Using prior-year evidence

```worked
title: Can the auditor rely on last year's tests?
scenario: |
  Three controls at Ridge Foods were tested in Year 1 and are unchanged in Year 2.
steps:
  - label: Credit approval control (not related to a significant risk)
    work: Confirm no change (inquiry plus observation or inspection); rotate testing
    result: Prior-year evidence may be used — but test it at least once every third audit
  - label: Control over revenue cut-off — a significant risk
    work: Controls over significant risks must be tested in the current period if relied on
    result: Must be tested in Year 2
  - label: All other unchanged controls
    work: The auditor must test some controls each audit
    result: Rotate — not all controls can be skipped in the same year
insight: A control that changed must be retested this year, regardless of the rotation.
```

```check
aud-toc-chk2
```
