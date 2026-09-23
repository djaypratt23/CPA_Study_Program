---
id: aud-engagement-acceptance
section: AUD
title: Engagement acceptance, terms & predecessor communications
minutes: 15
objectives:
  - text: Determine whether the preconditions for an audit are present.
    skill: application
    task: Evaluate the preconditions for accepting an audit engagement
  - text: Identify the required contents of an audit engagement letter.
    skill: remembering
    task: Recall the terms agreed in an engagement letter
  - text: Apply the required communications with a predecessor auditor and evaluate requests to change the engagement.
    skill: application
    task: Determine required communications with a predecessor auditor
bigIdea:
  what: >-
    Before accepting an audit, the auditor confirms two preconditions — an acceptable financial reporting framework
    and management's agreement to its responsibilities — and records the agreed terms in writing. For a new client,
    the auditor also asks the predecessor auditor what it knows.
  why: >-
    Most painful disputes between auditors and clients trace back to fuzzy expectations. The engagement letter
    fixes responsibilities in writing, and the predecessor inquiry tells the auditor whether it is walking into
    integrity problems or a firing over a disagreement.
  example: >-
    A company fires its auditor after a dispute over revenue recognition. The new auditor asks the predecessor,
    with the client's permission, about disagreements with management. The answer shapes both the acceptance
    decision and the audit plan.
preQuestions: [aud-ea-pre1]
keyTakeaways:
  - "Preconditions for an audit: (1) the financial reporting framework is acceptable; (2) management acknowledges its responsibility for preparing the statements, for internal control, and for providing access. Without them, do not accept (unless required by law)."
  - "Engagement letter contents: objective and scope of the audit; responsibilities of the auditor and of management; inherent limitations of an audit and of internal control; the applicable framework; and the expected form and content of the report."
  - "Recurring audits: assess whether circumstances require the terms to be revised and whether management needs a reminder."
  - "Before accepting, the successor requests management's permission to make inquiries of the predecessor — about management integrity, disagreements, communications about fraud, noncompliance and internal control, and the reason for the change. A refusal is a red flag."
  - "After acceptance, the successor may request access to the predecessor's working papers. The successor alone is responsible for the opening-balance evidence and must not refer to the predecessor's work as a basis for its opinion."
  - "Change from audit to a lower level of service: acceptable only with reasonable justification (e.g., the requirement for an audit no longer applies). A request to avoid scope limitations or unfavorable findings is not reasonable."
citations:
  - source: AU-C 210 (Terms of engagement)
  - source: AU-C 510 (Opening balances — initial audit engagements)
  - source: PCAOB AS 2610 (Initial audits — communications between predecessor and successor auditors)
---

## Preconditions for an audit

```mermaid
flowchart TD
  A[Prospective audit engagement] --> B{Acceptable financial reporting framework?}
  B -- No --> X[Do not accept unless required by law]
  B -- Yes --> C{Management agrees to its responsibilities?}
  C -- No --> X
  C -- Yes --> D[Agree on terms in an engagement letter]
```

Management must acknowledge responsibility for: **(1)** preparing and fairly presenting the statements;
**(2)** designing, implementing, and maintaining internal control; and **(3)** providing access to information,
additional information, and people.

If management imposes a **scope limitation** that would cause the auditor to disclaim an opinion, the auditor should not accept the engagement (unless required by law).

```check
aud-ea-chk1
```

## The engagement letter

| Required | Common additions |
|---|---|
| Objective and scope of the audit | Fees and billing |
| Responsibilities of the auditor | Arrangements for involving specialists or internal auditors |
| Responsibilities of management | Expectation of written representations |
| Inherent limitations of an audit and of internal control | Arrangements with a predecessor auditor |
| The applicable financial reporting framework | Any restriction on the auditor's liability (where permitted) |
| Expected form and content of the report (and that it may differ) | |

The letter is signed by the auditor and by management (or those charged with governance, where appropriate).

## Communicating with the predecessor

```timeline
title: Successor auditor's steps
events:
  - when: Before acceptance
    label: Ask management's permission to contact the predecessor
    detail: If management refuses, consider the reason and the effect on acceptance
  - when: Before acceptance
    label: Inquire of the predecessor
    detail: Management integrity, disagreements, fraud and noncompliance communications, internal control communications, reason for the change
  - when: After acceptance
    label: Request access to the predecessor's working papers
    detail: Helps plan the audit and gather evidence on opening balances
  - when: During the audit
    label: If the prior statements appear misstated
    detail: Ask management to inform the predecessor and arrange a meeting of the three parties
```

The predecessor should respond promptly and fully — unless there are unusual circumstances such as litigation, in which case it should state that its response is limited.

```worked
title: Evaluating a request to change the engagement
scenario: |
  Midway through an audit, Harper Co.'s owner asks to change to a review. Three possible reasons are given.
steps:
  - label: The bank dropped its audit requirement when the loan was repaid
    work: Change in the client's need for the service
    result: Reasonable — the auditor may issue a review report with no reference to the audit
  - label: The owner refuses to let the auditor confirm receivables with the largest customer
    work: Requested to avoid a scope limitation
    result: Not reasonable — do not change; consider the effect on the audit opinion
  - label: The auditor has found a likely material misstatement the owner doesn't want to correct
    work: Requested to avoid unfavorable findings
    result: Not reasonable
insight: If the change is reasonable, the new report should not mention the original engagement, any procedures performed, or any scope limitation.
```

```check
aud-ea-chk2
```
