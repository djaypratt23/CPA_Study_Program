---
id: aud-revenue-receivables
section: AUD
title: Revenue & receivables, including confirmations
minutes: 17
objectives:
  - text: Design substantive procedures for revenue and receivables, including cut-off and confirmation.
    skill: application
    task: Perform substantive procedures for revenue and receivables
  - text: Recognize revenue fraud schemes and the procedures that detect them.
    skill: analysis
    task: Identify indicators of improper revenue recognition
  - text: Evaluate the allowance for credit losses.
    skill: application
    task: Evaluate the valuation of receivables
bigIdea:
  what: >-
    Revenue is the account most often manipulated, so it gets the most targeted work: cut-off at year-end, vouching
    recorded sales to proof of delivery, confirming receivables (including contract terms), and testing the
    allowance for collectibility.
  why: >-
    Revenue is presumed to be a fraud risk. Schemes such as fictitious sales, early recognition, bill-and-hold
    abuses, and side agreements are designed to look like ordinary sales — only specific procedures expose them.
  example: >-
    A distributor ships $2 million of product to its largest customer on December 30 under a secret side letter
    allowing full return in January. Confirming contract terms (not just balances) and reviewing January credit
    memos would reveal the arrangement.
preQuestions: [aud-rev-pre1]
keyTakeaways:
  - "Occurrence: vouch recorded sales to shipping documents and customer orders. Completeness: trace shipping documents to recorded sales."
  - "Cut-off: examine shipments and invoices just before and after year-end; review credit memos and returns after year-end."
  - "External confirmation of receivables is presumed (AU-C 330) unless the balance is immaterial, confirmation would be ineffective, or RMM is low and other substantive procedures address it — and the auditor documents why."
  - "Confirm terms of unusual or complex sales (including side agreements, rights of return, and bill-and-hold terms), not just balances."
  - "Valuation: test the aging, examine subsequent cash receipts, and evaluate the allowance (CECL assumptions, history, current conditions)."
  - "Lapping: stealing a customer's payment and covering it with a later customer's payment. Detect by comparing deposit slip details with the postings, and by confirming balances."
citations:
  - source: AU-C 330 (External confirmation of accounts receivable)
  - source: AU-C 505 (External confirmations)
  - source: AU-C 240 (Presumed revenue fraud risk)
---

## Revenue and receivables: the program

| Assertion | Procedure |
|---|---|
| Occurrence (revenue) / existence (receivables) | Vouch sales to shipping documents; confirm receivables; examine subsequent receipts |
| Completeness | Trace shipping documents to sales invoices and the journal; analytics |
| Cut-off | Shipments and invoices within a few days of year-end; returns and credit memos after year-end |
| Accuracy / valuation | Recompute invoices; agree to price lists; test the aging and the allowance |
| Rights | Read agreements for factoring or pledged receivables |
| Presentation | Related-party receivables, pledges, and concentration disclosures |

```check
aud-rev-chk1
```

## Revenue fraud schemes and what finds them

| Scheme | Red flags | Procedure |
|---|---|---|
| Fictitious sales | New customers with no history; receivables growing faster than sales | Confirm balances; vouch to shipping documents; examine subsequent receipts |
| Early recognition (cut-off) | Spike in sales in the last days of the period | Cut-off tests; review January returns and credit memos |
| Side agreements / rights of return | Unusual terms; large period-end sales to distributors | Confirm terms with customers; read contracts; inquire of sales staff |
| Bill-and-hold | Goods billed but still in the warehouse | Evaluate the bill-and-hold criteria; observe inventory |
| Channel stuffing | Distributors buying far above normal demand | Analytics on distributor sales and returns |

```worked
title: Testing cut-off at year-end
scenario: |
  The auditor examines shipments and invoices from December 27 to January 5 (year-end December 31).
  Terms are FOB shipping point unless stated.
steps:
  - label: Invoice dated December 30, shipped January 3
    work: Revenue recorded before shipment (control hadn't passed)
    result: Cut-off error — reverse the sale and receivable (and restore inventory)
  - label: Shipped December 31 (FOB shipping point), invoiced January 2
    work: Control passed December 31
    result: Revenue belongs in the current year — unrecorded sale
  - label: Shipped December 30 (FOB destination), delivered January 4
    work: Control passes on delivery
    result: Revenue belongs to the next year — if recorded in December, it's a cut-off error
insight: Match the recording date to the date control transferred — usually the shipping terms tell you.
```

## The receivable confirmation presumption

Confirmation of receivables is **presumed** unless one of these applies (and is documented):
1. The overall balance is immaterial.
2. Confirmation would be ineffective (e.g., customers are known not to respond).
3. RMM is low and other substantive procedures address it.

```check
aud-rev-chk2
```

## Valuation: the allowance

- Test the accuracy of the aging report (it's IPE).
- Examine cash received after year-end for older balances.
- Evaluate management's loss-rate assumptions against history, current conditions, and forecasts (CECL).
- Retrospectively compare last year's allowance with actual write-offs.
