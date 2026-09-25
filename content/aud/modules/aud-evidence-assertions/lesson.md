---
id: aud-evidence-assertions
section: AUD
title: Sufficient appropriate evidence & assertions
minutes: 17
objectives:
  - text: Identify the relevant assertions for classes of transactions and account balances.
    skill: remembering
    task: Identify financial statement assertions
  - text: Design and evaluate external confirmation procedures, including responses to nonresponses and management refusals.
    skill: application
    task: Perform external confirmation procedures
  - text: Apply audit documentation requirements, including assembly and retention periods.
    skill: remembering
    task: Recall audit documentation requirements
  - text: Conclude whether sufficient appropriate audit evidence has been obtained and identify the evidence still needed.
    skill: evaluation
bigIdea:
  what: >-
    Evidence must be sufficient (enough of it) and appropriate (relevant to the assertion and reliable). Assertions
    are management's implicit claims — "these receivables exist, are complete, and are valued correctly" — and
    each procedure targets one or more of them.
  why: >-
    Framing every procedure around an assertion keeps the audit honest: you know exactly what a confirmation proves
    (existence) and what it doesn't (collectibility), so you don't mistake lots of evidence for the right evidence.
  example: >-
    A customer confirms owing $80,000. That's strong evidence the receivable exists, but it says little about
    whether the customer can pay — valuation needs other evidence, such as subsequent cash receipts and the aging.
preQuestions: [aud-ev-pre1]
keyTakeaways:
  - "Transactions and events: occurrence, completeness, accuracy, cut-off, classification, presentation."
  - "Account balances: existence, rights and obligations, completeness, accuracy/valuation and allocation, classification, presentation."
  - "Appropriateness = relevance + reliability. Sufficiency depends on the risk and on the quality of the evidence — more evidence doesn't make up for poor quality."
  - "Confirmations: the auditor controls the requests and responses. Positive requests ask for a reply in every case; negative requests ask for a reply only if the recipient disagrees — used only when RMM is low, there are many small, homogeneous balances, few exceptions are expected, and recipients are expected to read them."
  - "Positive nonresponse → perform alternative procedures (e.g., examine subsequent cash receipts, or shipping documents and invoices)."
  - "If management refuses to allow a confirmation: inquire about the reasons, evaluate them, perform alternative procedures; if the refusal is unreasonable, communicate with those charged with governance and consider the effect on the opinion."
  - "Documentation (AU-C 230): enough for an experienced auditor with no connection to the audit to understand it. Assemble the final file within 60 days after the report release date; retain it at least 5 years. PCAOB: 14 days (formerly 45; AS 1215 as amended by AS 1000) and 7 years."
citations:
  - source: AU-C 500 (Audit evidence), as amended by SAS No. 142
  - source: AU-C 315 (Assertions)
  - source: AU-C 505 (External confirmations)
  - source: AU-C 230 (Audit documentation) and PCAOB AS 1215
---

## Assertions

| Transactions (income statement) | Account balances (balance sheet) |
|---|---|
| **Occurrence** — recorded transactions happened | **Existence** — assets and liabilities exist |
| **Completeness** — all transactions are recorded | **Rights and obligations** — the entity owns the assets and owes the liabilities |
| **Accuracy** — amounts are recorded correctly | **Completeness** — all balances are recorded |
| **Cut-off** — recorded in the right period | **Accuracy, valuation and allocation** — at appropriate amounts |
| **Classification** — in the proper accounts | **Classification** — in the proper accounts |
| **Presentation** — appropriately aggregated and described, with disclosures | **Presentation** — appropriately aggregated and described, with disclosures |

```check
aud-ev-chk1
```

## External confirmations (AU-C 505)

```mermaid
flowchart TD
  S[Auditor selects items and sends requests] --> R{Response?}
  R -- Positive reply agrees --> OK[Evidence of existence]
  R -- Exception --> X[Investigate: timing difference, dispute, or misstatement]
  R -- No reply to a positive request --> A[Alternative procedures: subsequent receipts, shipping docs]
  S --> M{Management refuses to allow a request?}
  M -- Yes --> V[Inquire about the reasons and evaluate them; perform alternative procedures; if unreasonable, communicate with TCWG and consider the opinion]
```

```worked
title: Following up confirmation results
scenario: |
  Of 50 positive receivable confirmations, 42 agreed, 3 reported exceptions, and 5 did not reply.
steps:
  - label: Exception — customer says a $6,000 payment was mailed December 30
    work: Trace the payment to the January cash receipts
    result: Timing difference — no misstatement
  - label: Exception — customer disputes a $4,200 invoice for goods never received
    work: Examine shipping documents for the invoice
    result: No shipping document → likely misstatement to project
  - label: Five nonresponses
    work: Examine cash received after year-end that applies to the year-end invoices; if none, examine shipping documents and orders
    result: Alternative procedures substitute for the missing confirmations
insight: A confirmation proves existence. Collectibility (valuation) is tested separately, often with the same subsequent-receipts evidence.
```

## Audit documentation

| | AICPA (nonissuers) | PCAOB (issuers) |
|---|---|---|
| Report date | Date sufficient appropriate evidence obtained | Same |
| Assembly of the final file | Within **60 days** after the report release date | Within **14 days** (AS 1000 amendment; formerly 45) |
| Retention | At least **5 years** from the report release date | **7 years** |

After the documentation completion date, nothing may be deleted. Additions must note who made them, when, and why.

```check
aud-ev-chk2
```

## Concluding on sufficiency and appropriateness

Before concluding on an area, ask two separate questions:

- **Appropriate?** Is the evidence relevant to the assertion and reliable? External evidence the auditor obtains directly beats internal evidence; documents beat inquiry; evidence from a self-interested source (a sales manager vouching for their own inventory) is weak, especially when it contradicts other data.
- **Sufficient?** Is there enough of it, given the assessed risk? A procedure performed on far fewer items than planned is the right kind of evidence, just not enough.

The fix differs: insufficient evidence needs **more of the same**; inappropriate evidence needs **different** evidence. More copies of internally generated invoices will never prove that goods shipped. If the auditor cannot obtain the evidence (for example, management forbids a letter to legal counsel), the result is a scope limitation.
