---
id: aud-cash-investments
section: AUD
title: Cash & investments
minutes: 15
objectives:
  - text: Design substantive procedures for cash, including bank confirmations, reconciliations, and cutoff bank statements.
    skill: application
    task: Perform substantive procedures for cash
  - text: Detect kiting using a bank transfer schedule.
    skill: analysis
    task: Identify misstatements from interbank transfers
  - text: Design procedures for investments, including existence, valuation, and classification.
    skill: application
    task: Perform substantive procedures for investments
bigIdea:
  what: >-
    Cash is small in risk per dollar but high in fraud appeal. The auditor confirms balances with banks, tests the
    client's reconciliation using a cutoff statement obtained directly from the bank, and reviews transfers between
    accounts near year-end. Investments are confirmed with custodians and tested for fair value and classification.
  why: >-
    Reconciliations are where theft and window dressing hide — outstanding checks that never clear, deposits in
    transit that never arrive, or transfers counted in two banks at once (kiting).
  example: >-
    On December 31, a company deposits a $50,000 check drawn on its own Bank A account into Bank B and records the
    deposit, but doesn't record the Bank A disbursement until January. For one night, the $50,000 is counted twice.
preQuestions: [aud-cash-pre1]
keyTakeaways:
  - "Standard bank confirmation: balances, and loans directly with the financial institution; sent and received by the auditor."
  - "Cutoff bank statement (for 10–15 days after year-end), sent directly to the auditor: verify that deposits in transit were deposited promptly and outstanding checks cleared."
  - "Bank transfer schedule: lists transfers near year-end with book and bank dates for both accounts. A receipt recorded in the year with the disbursement recorded next year overstates cash (kiting)."
  - "A proof of cash (four-column reconciliation) reconciles beginning balance, receipts, disbursements, and ending balance — it detects unrecorded receipts and disbursements."
  - "Cash counts: count all locations simultaneously (or control them) to prevent shifting cash, with the custodian present."
  - "Investments: confirm with the custodian or inspect certificates (existence, rights); test fair values (AU-C 540); evaluate classification (e.g., held-to-maturity intent and ability); for equity-method investees, obtain the investee's audited statements."
citations:
  - source: AU-C 505 (External confirmations)
  - source: AU-C 501 (Investments in securities and derivative instruments)
  - source: AU-C 540 (Fair value estimates)
---

## Cash procedures

| Procedure | Assertion |
|---|---|
| Bank confirmation received directly by the auditor | Existence; completeness of loans |
| Test the client's reconciliation; agree the bank balance to the confirmation and the book balance to the ledger | Existence, accuracy |
| Obtain a **cutoff bank statement** directly from the bank | Deposits in transit and outstanding checks are real |
| Bank transfer schedule | Cut-off; detect kiting |
| Proof of cash | Unrecorded receipts or disbursements |
| Read agreements and confirmations for restrictions | Presentation (restricted cash, compensating balances) |

```check
aud-cash-chk1
```

## Kiting and the bank transfer schedule

```worked
title: Reading a bank transfer schedule
scenario: |
  Year-end December 31. Transfers near year-end:
steps:
  - label: "Check #611, $40,000, Bank A → Bank B: disbursed per books Dec 29, per bank Jan 2; received per books Dec 29, per bank Dec 30"
    work: Both sides recorded in the books in December
    result: Proper — the check is an outstanding check on the Bank A reconciliation
  - label: "Check #612, $50,000, Bank A → Bank B: disbursed per books Jan 2, per bank Jan 4; received per books Dec 31, per bank Dec 31"
    work: Receipt recorded in December, disbursement not until January
    result: Cash overstated by $50,000 at December 31 — kiting
  - label: "Check #613, $25,000, Bank C → Bank A: disbursed per books Jan 3, per bank Jan 5; received per books Jan 3, per bank Jan 4"
    work: Both sides in January
    result: Proper — no year-end effect
insight: Compare the book dates on both sides. If the receipt is recorded before year-end and the disbursement after, cash is double-counted.
```

## Investments

- **Existence and rights:** confirm with the broker or custodian; inspect securities held by the client (count them simultaneously with cash).
- **Valuation:** compare fair values to quoted prices (Level 1); for Level 2 and 3, test the model, inputs, and assumptions, or use a specialist.
- **Classification:** debt securities as HTM require positive intent and ability to hold to maturity — inquire, read minutes, and review past sales from the HTM portfolio.
- **Equity method:** obtain the investee's audited statements; recompute the investor's share of income and dividends.

```check
aud-cash-chk2
```
