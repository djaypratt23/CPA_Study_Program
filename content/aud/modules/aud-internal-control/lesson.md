---
id: aud-internal-control
section: AUD
title: Internal control (COSO) & control deficiencies
minutes: 18
objectives:
  - text: Identify the five components of internal control and the categories of control activities.
    skill: remembering
    task: Recall the COSO components of internal control
  - text: Evaluate segregation of duties and identify control deficiencies in a process.
    skill: analysis
    task: Identify deficiencies in internal control
  - text: Classify control deficiencies and determine the required communications.
    skill: evaluation
    task: Evaluate the severity of control deficiencies and communicate them
  - text: Evaluate identified control deficiencies, including the effect of misstatements on the ICFR assessment, and determine their impact on the nature, timing and extent of further procedures.
    skill: evaluation
bigIdea:
  what: >-
    Internal control is the set of processes that gives reasonable assurance the entity's reporting is reliable,
    its operations are effective, and it complies with laws. The auditor must understand it in every audit and
    evaluate any deficiencies it finds.
  why: >-
    Good controls prevent or catch errors before they reach the statements. When controls are weak, the auditor
    must do more substantive work — and tell management and the board what needs fixing.
  example: >-
    At a distributor, the same clerk opens the mail, deposits checks, and posts receivables. She could steal a
    check and hide it by writing off the customer's balance. Separating custody (deposits) from recording
    (posting) closes the gap.
preQuestions: [aud-ic-pre1]
keyTakeaways:
  - "COSO's five components: control environment, risk assessment, control activities, information and communication, and monitoring activities (supported by 17 principles)."
  - "The control environment (tone at the top) is the foundation: integrity and ethical values, board oversight, structure, competence, and accountability."
  - "Segregation of duties: separate authorization, recording, and custody of assets (and reconciliation)."
  - "Control activities: authorizations and approvals, verifications, reconciliations, physical controls, reviews of performance, and segregation of duties."
  - "A deficiency exists when a control's design or operation doesn't allow timely prevention or detection of misstatements. A material weakness means a reasonable possibility that a material misstatement will not be prevented, or detected and corrected, on a timely basis. A significant deficiency is less severe than a material weakness but merits attention."
  - "Significant deficiencies and material weaknesses must be communicated in writing to management and those charged with governance — ideally by the report release date and no later than 60 days after it."
  - "Documentation: narratives, flowcharts, and questionnaires. A walkthrough traces a transaction through the system to confirm the understanding."
citations:
  - source: COSO Internal Control — Integrated Framework (2013)
  - source: AU-C 315 (Understanding internal control) and AU-C 265 (Communicating internal control related matters)
  - source: PCAOB AS 2201 (Audit of internal control over financial reporting integrated with an audit of financial statements)
---

## The five components

| Component | What it is | Example |
|---|---|---|
| **Control environment** | Tone at the top: integrity, ethics, board oversight, competence, accountability | An independent audit committee; a code of conduct enforced consistently |
| **Risk assessment** | How the entity identifies and responds to risks to its objectives, including fraud and change | Evaluating the controls needed for a new product line |
| **Control activities** | Policies and procedures that carry out management's directives | Approvals, reconciliations, physical safeguards |
| **Information and communication** | Systems that capture and report information; communication of responsibilities | The general ledger system; a whistleblower hotline |
| **Monitoring activities** | Ongoing and separate evaluations of whether controls work | Internal audit reviews; management's review of exception reports |

Mnemonic: **CRIME** — Control activities, Risk assessment, Information and communication, Monitoring, (control) Environment.

```check
aud-ic-chk1
```

## Segregation of duties

```mermaid
flowchart LR
  A[Authorization: approve the transaction] --- R[Recording: journalize and post]
  R --- K[Custody: handle the asset]
  K --- A
```

No single person should control two of the three functions for the same transaction. When staff are too few to segregate, compensating controls include owner review of bank statements, mandatory vacations, and independent reconciliation.

```worked
title: Spotting a deficiency in cash receipts
scenario: |
  At Pell Hardware, the receivables clerk opens the mail, lists the checks, prepares the deposit, posts the
  customer accounts, and approves credit memos. The controller reconciles the bank account monthly.
steps:
  - label: Which functions does the clerk combine?
    work: Custody (checks and deposit), recording (posting), and authorization (credit memos)
    result: All three — a serious segregation failure
  - label: How could fraud occur?
    work: Steal a customer check, then conceal it with an unauthorized credit memo
    result: The bank reconciliation won't catch it — the stolen check was never deposited
  - label: Remedy
    work: A separate person opens the mail and prepares a remittance list; credit memos are approved by the credit manager; the list is compared with the deposit slip and postings
    result: Custody, recording, and authorization separated
insight: A reconciliation catches differences between two records. It cannot catch a transaction that never entered either record — that's why lapping and credit-memo concealment defeat it.
```

## Classifying deficiencies

```mermaid
flowchart TD
  D[Control deficiency identified] --> Q1{Reasonable possibility of a material misstatement not being prevented or detected timely?}
  Q1 -- Yes --> MW[Material weakness]
  Q1 -- No --> Q2{Important enough to merit the attention of those charged with governance?}
  Q2 -- Yes --> SD[Significant deficiency]
  Q2 -- No --> DF[Deficiency — communicate to management as appropriate]
```

**Indicators of a material weakness:** fraud by senior management (material or not); a restatement to correct a material misstatement; a material misstatement found by the auditor that the controls would not have detected; ineffective oversight by those charged with governance.

```check
aud-ic-chk2
```

## Communication (AU-C 265)

- Significant deficiencies and material weaknesses: **in writing** to management and those charged with governance.
- Timing: best by the report release date, and no later than **60 days** after it.
- The communication states that the audit was not designed to express an opinion on internal control, and its use is restricted.
- The auditor should **not** issue a written communication stating that no significant deficiencies were identified. (A communication that no *material weaknesses* were identified may be issued, for example for a regulator.)

## From deficiency to audit response

Classify the deficiency, then follow it through to the audit plan:

| Severity | Typical indicators | Effect on the audit |
|---|---|---|
| Control deficiency | Effective compensating control, or low potential misstatement | Usually no change to planned substantive work |
| Significant deficiency | Reasonably possible misstatement, less than material but merits governance attention | Rely less on the control: more extensive substantive procedures, performed nearer to year-end, with more reliable evidence |
| Material weakness | Reasonable possibility of a **material** misstatement not prevented or detected — for example, a material misstatement found by the auditor that controls missed | Integrated audit: adverse opinion on ICFR; expand substantive procedures in the area |

A misstatement found by substantive testing tells you about the controls too. Ask which control should have caught it. A material weakness in ICFR does not by itself change the financial statement opinion if the misstatement is corrected.
