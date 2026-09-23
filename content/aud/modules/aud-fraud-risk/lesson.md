---
id: aud-fraud-risk
section: AUD
title: Fraud risk assessment
minutes: 17
objectives:
  - text: Distinguish fraudulent financial reporting from misappropriation of assets and apply the fraud triangle.
    skill: application
    task: Identify fraud risk factors
  - text: Identify the presumed fraud risks and the required responses to management override.
    skill: remembering
    task: Recall the required procedures in response to fraud risks
  - text: Evaluate the auditor's communication and other responsibilities when fraud is identified or suspected.
    skill: evaluation
    task: Determine communications when fraud is identified
bigIdea:
  what: >-
    Fraud is intentional misstatement — either cooking the books (fraudulent financial reporting) or stealing assets
    (misappropriation). Fraud usually needs three conditions: pressure or incentive, opportunity, and a
    rationalization. The auditor looks for these, and always assumes two risks: improper revenue recognition and
    management override of controls.
  why: >-
    Fraud is designed to be hidden, so ordinary procedures often miss it. The standards force the auditor to think
    like a fraudster (the team discussion), keep skepticism high, and perform specific procedures aimed at the
    most common schemes.
  example: >-
    A CFO facing a covenant breach (pressure) who can post journal entries without review (opportunity) and who
    believes "we'll fix it next quarter" (rationalization) books fictitious year-end sales. Testing unusual
    late-year journal entries is the procedure most likely to find it.
preQuestions: [aud-fr-pre1]
keyTakeaways:
  - "Two types of fraud: fraudulent financial reporting (manipulating records, misapplying principles, omitting disclosures) and misappropriation of assets (theft, often concealed with false records)."
  - "Fraud triangle: incentive or pressure; opportunity; attitude or rationalization."
  - "Presumed risks: improper revenue recognition (rebuttable, with documentation) and management override of controls (never rebuttable)."
  - "Required responses to override: test journal entries and other adjustments; review accounting estimates for bias, including a retrospective review; evaluate the business rationale for significant unusual transactions."
  - "Other responses: build unpredictability into procedures, and assign staff based on skill and experience."
  - "Inquire of management, those charged with governance, internal audit, and others about fraud risks and known or suspected fraud."
  - "Communicate: fraud involving senior management, or causing material misstatement → those charged with governance. Other fraud → an appropriate level of management. Outside the entity only if law, regulation, or a subpoena requires it (or to a successor auditor, with consent)."
citations:
  - source: AU-C 240 (Consideration of fraud in a financial statement audit)
  - source: PCAOB AS 2401 (Consideration of fraud in a financial statement audit)
---

## Two kinds of fraud

| | Fraudulent financial reporting | Misappropriation of assets |
|---|---|---|
| Who | Usually management | Usually employees (often smaller amounts) |
| How | Fictitious revenue, hiding liabilities, biased estimates, improper disclosures | Theft of cash or inventory, fictitious vendors, payroll ghosts |
| Concealment | Top-side journal entries, side agreements | False documents, altered records |

## The fraud triangle

```mermaid
flowchart TD
  I[Incentive or pressure: targets, debt covenants, personal debts] --- O[Opportunity: weak controls, override, complex transactions]
  O --- A[Attitude or rationalization: 'I'll pay it back', aggressive tone at the top]
  A --- I
```

```check
aud-fr-chk1
```

## The two presumed risks

1. **Revenue recognition** — presumed a fraud risk. It can be **rebutted** (e.g., a single revenue stream of simple, fixed rental income), but the auditor must document why.
2. **Management override of controls** — present in every entity and **cannot be rebutted**.

Required procedures for management override — every audit:

| Procedure | Why |
|---|---|
| Test journal entries and other adjustments (especially at period-end, entered by unusual users, to unusual accounts, round amounts, or lacking descriptions) | Top-side entries are the favorite tool of financial reporting fraud |
| Review accounting estimates for bias, including a **retrospective review** of prior-year estimates | Management bias shows up as consistently optimistic estimates |
| Evaluate the business rationale of **significant unusual transactions** | Complex, unusual deals may be designed to disguise results |

```worked
title: Selecting journal entries to test
scenario: |
  Holt Industries posted 48,000 journal entries this year. The auditor designs criteria to select entries for testing.
steps:
  - label: Entries posted in the last 5 days of the year or in the closing process
    work: Period-end timing is higher risk
    result: Select
  - label: Entries posted by the CFO, who doesn't normally post
    work: Unusual users
    result: Select
  - label: Entries crediting revenue with a debit to an unusual account (e.g., a reserve)
    work: Unusual account combinations
    result: Select
  - label: Recurring monthly depreciation entries generated by the system
    work: Routine, automated, low risk
    result: Generally not selected (unless other factors apply)
insight: Use data analytics to filter the whole population with risk-based criteria, then examine support for each selected entry.
```

```check
aud-fr-chk2
```

## When fraud is found or suspected

- Evaluate the implications: fraud involving management is significant even if small, and it affects the reliability of representations.
- Communicate on a timely basis:
  - to **those charged with governance** — fraud involving senior management, or fraud causing a material misstatement;
  - to an **appropriate level of management** (at least one level above those involved) — any fraud or evidence that fraud may exist.
- Disclosure **outside** the entity is generally prohibited by confidentiality, **except**: to comply with legal or regulatory requirements; to a successor auditor responding to inquiries (with client consent); in response to a subpoena; or to a funding agency under government auditing requirements.
- Consider whether to **withdraw** if management doesn't take appropriate action.
