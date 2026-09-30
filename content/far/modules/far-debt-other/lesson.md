---
id: far-debt-other
section: FAR
title: Notes, debt classification & extinguishment
minutes: 16
objectives:
  - text: Measure notes payable issued for noncash assets or with below-market interest at present value.
    skill: application
    task: Calculate the carrying amount of notes payable
  - text: Classify short-term obligations expected to be refinanced and callable debt.
    skill: application
    task: Determine the classification of debt as current or noncurrent
  - text: Compute the gain or loss on early extinguishment of debt.
    skill: application
    task: Calculate gains and losses on debt extinguishment
  - text: Perform debt covenant calculations, and distinguish a debt modification from an extinguishment and a troubled debt restructuring.
    skill: application
bigIdea:
  what: >-
    Debt is recorded at the present value of what will be paid, classified by when it must be paid, and removed
    when it is paid off — with any difference between the payoff amount and the book amount reported as a gain or
    loss.
  why: >-
    A "zero-interest" note for $150,000 due in three years isn't really a $150,000 debt today; part of it is
    interest. And a lender reading the balance sheet needs to know which debts come due within a year.
  example: >-
    A trucking company refinances a loan due in two months with a new five-year loan before issuing its
    statements. Because the refinancing actually happened, the old loan can be shown as long-term.
preQuestions: [far-dbt-pre1]
keyTakeaways:
  - A note with no stated interest (or an unreasonable rate) is recorded at present value using the market rate; the discount becomes interest expense over the note's term.
  - "A short-term obligation may be classified as noncurrent if, before the statements are issued, the entity refinances it on a long-term basis or enters a qualifying financing agreement — only to the extent of the amount refinanced."
  - Debt callable because of a covenant violation is current unless the creditor waives the right for more than one year or the violation is expected to be cured within a grace period.
  - "Gain or loss on extinguishment = net carrying amount (face ± unamortized premium/discount − unamortized issuance costs) − reacquisition price. Report it in income (not extraordinary)."
  - Disclose aggregate maturities and sinking fund requirements for each of the five years after the balance sheet date.
citations:
  - source: FASB ASC 835-30 (Imputation of Interest)
  - source: FASB ASC 470-10-45 (classification of short-term obligations expected to be refinanced; callable debt)
  - source: FASB ASC 470-50-40 (Debt — Modifications and Extinguishments)
  - source: FASB ASC 470-10-50-1 (maturity disclosures)
---

## Notes payable at present value

When a note is exchanged for property, goods, or services and has **no stated interest** or an **unreasonably low** rate, record it at the **fair value of the property or the present value of the note** at the market rate, whichever is more clearly determinable.

```worked
title: A noninterest-bearing note for equipment
scenario: |
  On January 1, a company buys equipment by signing a $150,000 note due in 3 years with no stated interest.
  The company's incremental borrowing rate is 9%. The equipment has no reliable cash price.
steps:
  - label: Present value of the note
    work: 150,000 × PV of 1 (9%, 3) = 150,000 × 0.77218
    result: 115,828 — equipment and note (net) are recorded at this amount
  - label: Discount on the note
    work: 150,000 − 115,828
    result: 34,172 — interest over three years
  - label: Year 1 interest expense
    work: 115,828 × 9%
    result: 10,425; note carrying amount 126,253 at year-end
insight: Recording the equipment at 150,000 would overstate the asset and understate interest expense by the same amount.
```

## Current or noncurrent?

```mermaid
flowchart TD
  A["Obligation due within 12 months of the balance sheet date"] --> B{"Before the statements are issued, did the company<br/>refinance it long-term, or sign a qualifying<br/>non-cancelable financing agreement?"}
  B -->|No| C["Current liability"]
  B -->|Yes| D["Noncurrent — but only up to the amount<br/>actually refinanced / available under the agreement"]
```

**Refinancing traps**
- Intent alone is not enough — it must be **demonstrated** by an actual refinancing or a qualifying agreement **before issuance**.
- If short-term debt is **repaid** with cash after year-end and then new long-term debt is issued, the original obligation remains **current** (current assets were used).

**Callable debt**: long-term debt callable at the balance sheet date because of a covenant violation is **current**, unless the lender waives or loses the call right for more than one year, or it's probable the violation will be cured within a grace period.

```check
far-dbt-chk1
```

## Extinguishment

When debt is retired early (called, repurchased in the market):

> **Gain (loss) = net carrying amount − reacquisition price**

Net carrying amount = face ± unamortized premium/discount − unamortized debt issuance costs, updated to the extinguishment date.

```faded
title: Your turn — calling bonds
scenario: |
  A company calls $1,000,000 of bonds at 102. At the call date, the unamortized discount is $22,000 and
  unamortized debt issuance costs are $8,000 (both already updated to the call date).
steps:
  - label: Net carrying amount
    answer: 970000
    solution: 1,000,000 − 22,000 − 8,000 = 970,000
  - label: Reacquisition price
    answer: 1020000
    solution: 1,000,000 × 102% = 1,020,000
  - label: Gain (loss) on extinguishment — enter a loss as negative
    answer: -50000
    solution: 970,000 − 1,020,000 = (50,000) loss, reported in income from continuing operations
```

## Disclosures

For long-term debt: interest rates, maturity dates, restrictive covenants, collateral, and the **combined aggregate maturities for each of the next five years**. Unconditional purchase obligations and assets pledged as collateral are also disclosed.

```check
far-dbt-chk2
```

## Debt covenant compliance

Loan agreements define their own ratios, so compute each covenant **exactly as the agreement defines it**. Common covenants:

| Covenant | Computation |
|---|---|
| Maximum leverage | Total debt ÷ EBITDA (EBITDA = net income + interest + taxes + depreciation and amortization) |
| Minimum interest coverage | EBITDA (or EBIT) ÷ interest expense |
| Minimum current ratio | Current assets ÷ current liabilities |
| Minimum net worth | Total equity, often with specified adjustments |

If a covenant is breached at the balance sheet date and the lender can call the debt, the debt is **current** unless, before the statements are issued, the lender waives the right to demand repayment for more than a year from the balance sheet date, or a grace period cure is probable (ASC 470-10-45-11).

## Modification, extinguishment and troubled debt restructurings

**Modification or extinguishment?** When a borrower and its existing lender change the terms of debt, compare the present value of the cash flows under the new terms with the present value of the remaining cash flows under the old terms, both discounted at the **original effective rate**. A difference of **10% or more** means the terms are substantially different (ASC 470-50):

- **Extinguishment:** derecognize the old debt, record the new debt at fair value, and recognize a gain or loss. Fees paid to the lender are part of the gain or loss.
- **Modification:** keep the old debt; compute a new effective rate prospectively. Fees paid to the lender adjust the carrying amount and are amortized.

**Troubled debt restructuring (debtor)** — the creditor grants a concession because the debtor is in financial difficulty (ASC 470-60):

- **Settlement by transferring an asset:** gain on disposal of the asset (fair value − carrying amount) plus a **gain on restructuring** (carrying amount of debt − fair value of the asset).
- **Modification of terms:** compare total **undiscounted** future cash payments under the new terms with the debt's carrying amount (including accrued interest). If the payments are less, reduce the debt to the total payments and recognize a gain; all later payments reduce principal and no interest expense is recognized. If they are not less, recognize no gain and use a new effective rate prospectively.
