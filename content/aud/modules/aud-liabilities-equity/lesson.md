---
id: aud-liabilities-equity
section: AUD
title: Liabilities & equity
minutes: 16
objectives:
  - text: Design a search for unrecorded liabilities.
    skill: application
    task: Perform substantive procedures for accounts payable and accrued liabilities
  - text: Apply the requirements for inquiries of legal counsel and evaluate responses.
    skill: application
    task: Evaluate litigation, claims, and assessments
  - text: Design substantive procedures for debt and equity, including covenant compliance.
    skill: application
    task: Perform substantive procedures for debt and equity
bigIdea:
  what: >-
    For liabilities, the main risk is understatement — leaving bills out makes results look better. So the auditor
    tests completeness, looking outside the ledger for obligations that should be there. Debt and equity are
    confirmed with outside parties and read against legal agreements.
  why: >-
    A company can't easily invent assets, but it can easily ignore an invoice or a lawsuit. The search for
    unrecorded liabilities and the legal letter are designed to find what was left out.
  example: >-
    An invoice for $85,000 of December repairs arrives January 20. It's not in year-end payables. The auditor
    finds it by examining January payments and unpaid invoices received after year-end.
preQuestions: [aud-le-pre1]
keyTakeaways:
  - "Search for unrecorded liabilities: examine disbursements and unpaid invoices after year-end, receiving reports near year-end, and vendor statements, and trace them to year-end payables."
  - "Accounts payable confirmations (if used) should go to major vendors, including those with small or zero balances — completeness is the goal."
  - "Legal letter (inquiry of legal counsel): management sends it; the lawyer responds directly to the auditor. A lawyer's refusal to respond is a scope limitation that can lead to a qualified opinion or disclaimer."
  - "Lawyers comment on unasserted claims only if management identifies them in the letter."
  - "Debt: confirm with lenders, read agreements for covenants, test covenant compliance (a violation without a waiver can require current classification), and recompute interest."
  - "Equity: confirm shares outstanding with the transfer agent and registrar, read minutes for authorized issuances and dividends, and inspect treasury stock certificates."
citations:
  - source: AU-C 501 (Litigation, claims, and assessments)
  - source: AU-C 330 and AU-C 505
  - source: PCAOB AS 2505 (Inquiry of a client's lawyer concerning litigation, claims, and assessments)
---

## Search for unrecorded liabilities

```mermaid
flowchart LR
  A[Disbursements after year-end] --> P[Year-end payables and accruals]
  B[Unpaid invoices received after year-end] --> P
  C[Receiving reports before year-end] --> P
  D[Vendor statements] --> P
```

Start from outside the recorded population and trace into it. Any obligation that existed at year-end but is missing from payables is an understatement.

```check
aud-le-chk1
```

```worked
title: Evaluating post-year-end disbursements
scenario: |
  Year-end December 31. The auditor examines January disbursements over $10,000.
steps:
  - label: "Jan 8: $42,000 for inventory received December 28"
    work: Liability existed at year-end — is it in payables?
    result: Recorded — no issue
  - label: "Jan 15: $85,000 for plant repairs completed December 20"
    work: Not in payables or accruals
    result: Unrecorded liability — understates expenses and liabilities by $85,000
  - label: "Jan 22: $30,000 for January rent"
    work: Obligation arose in January
    result: Correctly excluded
insight: The key question for each item is "When did the obligation arise?" — not when it was invoiced or paid.
```

## Inquiry of legal counsel

| Step | Detail |
|---|---|
| Management's list | Pending or threatened litigation, and unasserted claims management considers probable of assertion |
| Letter | Sent by management on its letterhead to outside counsel, asking the lawyer to reply directly to the auditor |
| Lawyer's response | Evaluates the likelihood and amount of loss; comments on unasserted claims only if listed; may limit its response to material items |
| Timing | Response dated close to the auditor's report date |
| Refusal | A lawyer's refusal to respond is a **scope limitation** → qualified opinion or disclaimer |

In-house counsel's responses don't substitute for outside counsel on matters that outside counsel handles.

```check
aud-le-chk2
```

## Debt and equity

| Area | Procedures |
|---|---|
| Debt | Confirm balances, rates, and collateral with lenders; read agreements; test covenant compliance; recompute interest and accruals; evaluate current vs. noncurrent classification |
| Equity | Confirm shares with the transfer agent and registrar; read minutes for authorization of issuances, dividends, and repurchases; inspect treasury stock; trace proceeds from issuances to cash receipts |
