---
id: aud-data-analytics
section: AUD
title: Data analytics & analytical procedures
minutes: 14
objectives:
  - text: Describe the steps in performing an audit data analytic and the uses of analytics across the audit.
    skill: remembering
    task: Describe the use of audit data analytics
  - text: Evaluate the relevance and reliability of data used in analytics.
    skill: application
    task: Assess the reliability of information used as audit evidence
  - text: Evaluate outliers and results of analytics, including the final overall review.
    skill: analysis
    task: Evaluate the results of analytical procedures
  - text: Use data-analytic outputs to identify notable items and select responses, and evaluate explanations for differences found by analytical procedures.
    skill: analysis
bigIdea:
  what: >-
    Audit data analytics (ADAs) analyze entire populations with software — sorting, filtering, matching, and
    visualizing data to find patterns and outliers. They can support risk assessment, tests of controls,
    substantive testing, and the final review.
  why: >-
    Testing 100% of transactions with a rule (every payment matched to an approved invoice) can be stronger and
    faster than sampling — but only if the data is complete and accurate, and only if the auditor follows up on
    the outliers.
  example: >-
    An ADA compares every vendor's bank account number with employee bank accounts and finds one match: a clerk
    set up a fictitious vendor that pays into her own account.
preQuestions: [aud-da-pre1]
keyTakeaways:
  - "ADA steps: plan the ADA (objective, population, criteria); access and prepare the data; assess its relevance and reliability; perform the ADA; evaluate the results — investigate outliers."
  - "Data reliability: test the completeness and accuracy of the data (e.g., reconcile the extract to the general ledger; test the controls over the report or the logic producing it)."
  - "Common techniques: sorting and stratification, duplicate detection, gap detection, three-way matching of whole populations, Benford's Law, regression, and visualizations."
  - "Outliers aren't misstatements until investigated; items that fit expectations aren't proof of correctness unless the ADA was designed as a substantive procedure with suitable precision."
  - "Analytical procedures near the end of the audit (required) help form an overall conclusion about whether the statements are consistent with the auditor's understanding."
  - "Analytics don't replace professional skepticism or judgment; they direct them."
citations:
  - source: AICPA Guide to Audit Data Analytics
  - source: AU-C 500 (Information produced by the entity), AU-C 520 (Analytical procedures)
---

## The ADA cycle

```mermaid
flowchart LR
  P[Plan: objective, population, criteria] --> D[Access and prepare data]
  D --> R[Assess relevance and reliability]
  R --> X[Perform the ADA]
  X --> E[Evaluate results: investigate outliers]
  E --> P
```

## Where analytics fit

| Stage | Example ADA |
|---|---|
| Risk assessment | Visualize monthly revenue by product and region to spot unusual spikes |
| Tests of controls | Test every purchase order over $10,000 for the required approval field |
| Substantive procedures | Three-way match of all invoices to POs and receiving reports; recompute every aged receivable |
| Fraud procedures | Journal entries posted on weekends, by unusual users, or with round amounts; vendor–employee address matches |
| Overall review | Compare final statements with expectations and the auditor's understanding |

```check
aud-da-chk1
```

## Is the data good enough?

Information produced by the entity (IPE) must be evaluated for **completeness and accuracy** before it's used as evidence.

```worked
title: Validating a sales data extract
scenario: |
  The client provides a 180,000-line sales extract for an ADA that recomputes each invoice's revenue.
steps:
  - label: Completeness
    work: Reconcile the extract's total to general ledger revenue (and record counts to system reports)
    result: The extract totals $48.2 million; the GL shows $48.2 million — agrees
  - label: Accuracy
    work: Agree a few lines to source invoices; test the ITGCs over the report that created the extract
    result: No exceptions
  - label: Perform and evaluate
    work: The recomputation flags 27 invoices whose prices differ from the price master
    result: Investigate each — pricing errors, approved discounts, or potential fraud
insight: An ADA on unreconciled data can give false comfort. Reconcile first, analyze second.
```

## Final analytical procedures

Near the end of the audit, the auditor performs analytics to check that the statements make sense as a whole. Unexpected relationships not already explained may point to risks that were missed — requiring the auditor to revise the risk assessment and perform more procedures.

```check
aud-da-chk2
```

## Acting on analytics output

An exception report is a starting point, not a conclusion. For each flag, decide which of three responses fits:

| Situation | Response |
|---|---|
| Flags point to a fraud or override risk (post-close manual entries, unauthorized users, unusual revenue spikes) | Investigate **every** flagged item: inspect support, and inquire of someone other than the preparer |
| The test was poorly designed (it flags system batch jobs or other expected activity) | Refine the parameters and rerun |
| The flags are explained by activity already corroborated (tested recurring schedules) | Document the explanation; no further investigation |

## Evaluating differences in analytical procedures

1. Compare the recorded amount with the **expectation** and the **threshold** set in advance.
2. If the difference exceeds the threshold, investigate the **whole** difference, not just the excess.
3. Accept only the explanations you **corroborate** with other evidence; inquiry alone is not enough (AU-C 520).
4. If the difference left after corroborated explanations is below the threshold, the procedure supports the balance. If it is above, perform other substantive procedures or consider a misstatement.

**Final analytical procedures** near the end of the audit may reveal a previously unrecognized risk (for example, receivables growing much faster than revenue). The auditor then revises the risk assessment and performs more procedures.
