---
id: far-receivables
section: FAR
title: Receivables & credit losses
minutes: 18
objectives:
  - text: Estimate the allowance for credit losses on trade receivables under the CECL model and compute credit loss expense.
    skill: application
    task: Calculate the allowance for credit losses and related expense
  - text: Record write-offs and recoveries and explain their effect on net receivables.
    skill: application
  - text: Determine whether a transfer of receivables (factoring) is a sale or a secured borrowing and measure any gain or loss.
    skill: analysis
    task: Account for transfers of receivables
  - text: Prepare a receivables roll-forward from source data and reconcile the customer subledger to the general ledger, investigating each difference.
    skill: analysis
bigIdea:
  what: >-
    A receivable is only worth what the company expects to collect. The allowance for credit losses reduces gross
    receivables to that expected amount, and the current expected credit loss (CECL) model requires estimating
    losses over the receivables' whole life — starting on day one.
  why: >-
    Before CECL, losses were booked only when "probable," which critics said was "too little, too late" in the 2008
    crisis. Recording expected losses up front gives readers a truer picture of collectible assets.
  example: >-
    A distributor with $2 million of receivables knows from history that about 3% of 90-day-old invoices never get
    paid. It records that expectation now, rather than waiting for customers to default.
preQuestions: [far-rec-pre1]
keyTakeaways:
  - Trade receivables are reported at amortized cost net of an allowance for credit losses (ASC 326-20, CECL) — expected lifetime losses using historical, current, and reasonable and supportable forecast information.
  - "Balance sheet (aging) approach: credit loss expense = required ending allowance − (beginning allowance − write-offs + recoveries)."
  - Write-offs reduce both gross receivables and the allowance — net receivables and expense are unaffected.
  - A recovery reinstates the receivable and allowance, then records the cash collection.
  - The direct write-off method is not GAAP unless the difference is immaterial.
  - "Factoring is a sale only if the transferor surrenders control (assets isolated, transferee free to pledge or exchange, no effective control retained); otherwise it is a secured borrowing."
citations:
  - source: FASB ASC 326-20 (Financial Instruments — Credit Losses, Measured at Amortized Cost)
  - source: FASB ASC 310-10 (Receivables — Overall)
  - source: FASB ASC 860-10-40 (Transfers and Servicing — derecognition conditions)
---

## The allowance in one T-account

```tacct
title: Allowance for credit losses (a contra asset)
accounts:
  - name: Allowance for credit losses
    debits:
      - { label: Write-offs, amount: 18000 }
    credits:
      - { label: Beginning balance, amount: 25000 }
      - { label: Recoveries, amount: 2000 }
      - { label: Credit loss expense (plug), amount: 21000 }
```

Ending allowance = 25,000 + 2,000 − 18,000 + 21,000 = **30,000**. Under the balance sheet approach, you estimate the *ending* balance first, then **plug** the expense.

## Estimating the ending allowance (CECL)

CECL requires **expected lifetime credit losses**, considering past events, current conditions, and **reasonable and supportable forecasts**. For short-term trade receivables, an **aging schedule** with loss rates adjusted for current conditions is a common, acceptable approach. Losses are estimated on a **pool** basis when receivables share risk characteristics.

```worked
title: Aging schedule and credit loss expense
scenario: |
  At December 31: current receivables $400,000 (1% expected loss); 31–60 days $120,000 (4%); 61–90 days
  $50,000 (15%); over 90 days $30,000 (40%). The allowance had a $9,000 credit balance before adjustment,
  after write-offs and recoveries for the year.
steps:
  - label: Required ending allowance
    work: 400,000 × 1% + 120,000 × 4% + 50,000 × 15% + 30,000 × 40% = 4,000 + 4,800 + 7,500 + 12,000
    result: 28,300
  - label: Credit loss expense
    work: 28,300 required − 9,000 existing credit balance
    result: 19,300
  - label: Net receivables reported
    work: 600,000 gross − 28,300
    result: 571,700
insight: If the unadjusted allowance had a DEBIT balance (write-offs exceeded the old estimate), expense would be larger — 28,300 plus that debit balance.
```

```check
far-rec-chk1
```

## Write-offs and recoveries

```je
title: Write off a $5,000 account
lines:
  - { account: Allowance for credit losses, debit: 5000 }
  - { account: Accounts receivable, credit: 5000 }
memo: Net receivables do not change — the loss was already expected and expensed.
```

A later **recovery** of that account takes two entries: reinstate (Dr Accounts receivable / Cr Allowance) and collect (Dr Cash / Cr Accounts receivable).

## Transfers of receivables

| Method | What happens | Accounting |
|---|---|---|
| **Pledging / assigning** | Receivables are collateral for a loan | Record the loan; disclose the pledge |
| **Factoring — sale** (control surrendered) | Receivables are sold | Derecognize; record a loss (the factor's fee), any recourse obligation, and any holdback receivable |
| **Factoring — secured borrowing** (control retained) | Cash received is a loan | Keep the receivables; record a liability |

Sale treatment under ASC 860 requires that the transferred assets are **legally isolated** from the transferor, the transferee can **pledge or exchange** them, and the transferor keeps no **effective control** (e.g., no agreement to repurchase before maturity).

```faded
title: Your turn — factoring with recourse, treated as a sale
scenario: |
  A company factors $200,000 of receivables with recourse. The factor charges a 3% fee and withholds 5% of the
  receivables as protection against returns and allowances (to be refunded later). The fair value of the recourse
  obligation is $4,000. The transfer meets the sale criteria.
steps:
  - label: Factor's fee
    answer: 6000
    solution: 200,000 × 3% = 6,000
  - label: Amount withheld (due from factor)
    answer: 10000
    solution: 200,000 × 5% = 10,000 — a receivable from the factor
  - label: Cash received
    answer: 184000
    solution: 200,000 − 6,000 − 10,000 = 184,000
  - label: Loss on sale of receivables
    answer: 10000
    hint: The fee plus the recourse obligation.
    solution: 6,000 + 4,000 = 10,000. Entry — Dr Cash 184,000; Dr Due from factor 10,000; Dr Loss 10,000; Cr Receivables 200,000; Cr Recourse liability 4,000.
```

```check
far-rec-chk2
```

## Roll-forwards and subledger reconciliations

On the exam, analysis tasks rarely ask you to *compute* a balance from scratch. More often you get a schedule someone else prepared plus the source documents, and you must find what is wrong.

**The receivables roll-forward.** Each line comes from a different source, so check each one against its own document:

| Line | Source document | Common error |
|---|---|---|
| Beginning balance | Prior-year audited GL | Using an unadjusted balance |
| + Credit sales | Sales journal | Including cash sales |
| + Recoveries reinstated | Credit department approvals | Omitted, or netted against write-offs |
| − Collections | Cash receipts journal | Excluding the recovery collection |
| − Returns and allowances | Credit memo register | Missing late-December memos |
| − Write-offs | Approved write-off list | Netted with recoveries |
| = Ending balance | Must agree to the GL | — |

**Subledger to general ledger.** The GL control account should equal the total of the customer accounts. When it does not, list every item that is in one record but not the other, and adjust the record that is wrong:

- **In the GL, not the subledger** (for example, a credit memo or write-off posted only in the GL): adjust the **subledger**.
- **Posted twice in the subledger**: reverse the duplicate. A duplicated *payment* **understates** the subledger, so the fix is an **addition**.
- **Misposted between customers**: no effect on the total. It matters for collections and the aging, not the reconciliation.

A reconciliation that ends with an unexplained difference is not finished. Never plug the difference to expense.
