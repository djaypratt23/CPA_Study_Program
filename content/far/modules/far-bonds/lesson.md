---
id: far-bonds
section: FAR
title: Bonds payable
minutes: 20
objectives:
  - text: Price a bond as the present value of its cash flows at the market rate.
    skill: application
    task: Calculate the issue price of bonds payable
  - text: Prepare effective-interest amortization for bonds issued at a discount or premium, including semiannual payments.
    skill: application
    task: Calculate interest expense and the carrying amount of bonds
  - text: Account for debt issuance costs and bonds issued between interest dates.
    skill: application
bigIdea:
  what: >-
    A bond is a promise to pay fixed coupons plus face value at maturity. Investors pay whatever makes those cash
    flows earn the current market rate — so the price, and the company's true borrowing cost, is set by the
    market rate, not the coupon printed on the bond.
  why: >-
    If a company prints an 8% coupon when investors demand 10%, no one will pay full price. They pay less (a
    discount), and the company's real interest cost is 10%. The effective interest method records that real cost
    each period.
  example: >-
    A utility issues $1 million of 8% bonds when similar bonds yield 10%. It receives about $875,000. Over ten
    years its interest expense totals about $924,600 — the $800,000 of coupons plus the $124,600 discount.
preQuestions: [far-bond-pre1]
keyTakeaways:
  - "Issue price = PV of the face amount + PV of the coupon annuity, both at the market rate for the period (halve rates and double periods for semiannual bonds)."
  - "Market > coupon → discount; market < coupon → premium; equal → par."
  - "Effective interest: interest expense = carrying amount × market rate; amortization = expense − cash coupon (discount) or cash coupon − expense (premium)."
  - Carrying amount moves toward face value over the bond's life; discounts increase it, premiums decrease it.
  - Debt issuance costs are deducted from the carrying amount of the debt (like a discount) and amortized into interest expense.
  - "Bonds issued between interest dates: investors pay accrued interest since the last payment date, which the issuer refunds in the next full coupon."
citations:
  - source: FASB ASC 470-10 (Debt — Overall)
  - source: FASB ASC 835-30 (Imputation of Interest; effective interest method and presentation of issuance costs)
---

## Pricing a bond

> **Price = PV of face (lump sum) + PV of coupons (annuity)**, both discounted at the **market rate per period**.

```worked
title: A discount bond (semiannual)
scenario: |
  January 1: a company issues $1,000,000 of 10-year bonds with an 8% stated rate, interest paid semiannually on
  June 30 and December 31. The market rate is 10%.
steps:
  - label: Per-period rates and periods
    work: Coupon 4% × 1,000,000 = 40,000 per period; market rate 5% per period; 20 periods
    result: Use 5% and 20 periods
  - label: PV of face
    work: 1,000,000 × PV of 1 (5%, 20) = 1,000,000 × 0.37689
    result: 376,889
  - label: PV of coupons
    work: 40,000 × PV of ordinary annuity (5%, 20) = 40,000 × 12.46221
    result: 498,489
  - label: Issue price
    work: 376,889 + 498,489
    result: 875,378 — a discount of 124,622
insight: The bigger the gap between market and coupon rates, the bigger the discount or premium. The rate printed on the bond only sets the cash coupon.
```

```check
far-bond-chk1
```

## Effective interest amortization

Continuing the example (rounded to dollars):

| Period | Interest expense (5% × carrying amount) | Cash (4% × face) | Discount amortized | Carrying amount |
|---|---|---|---|---|
| Issue | | | | 875,378 |
| June 30, Yr 1 | 43,769 | 40,000 | 3,769 | 879,147 |
| Dec 31, Yr 1 | 43,957 | 40,000 | 3,957 | 883,104 |

```je
title: June 30, Year 1 interest payment
lines:
  - { account: Interest expense, debit: 43769 }
  - { account: Discount on bonds payable, credit: 3769 }
  - { account: Cash, credit: 40000 }
```

Interest expense grows each period because the carrying amount grows. For a **premium**, expense is below the coupon and shrinks each period.

> Straight-line amortization is allowed only if the result isn't materially different from the effective interest method.

```faded
title: Your turn — a premium bond
scenario: |
  On January 1 a company issues $500,000 of 5-year, 9% bonds paying interest annually each December 31, when the
  market rate is 8%. The issue price is $519,964.
steps:
  - label: Year 1 interest expense
    answer: 41597
    solution: 519,964 × 8% = 41,597
  - label: Year 1 premium amortization
    answer: 3403
    solution: 45,000 cash − 41,597 = 3,403
  - label: Carrying amount at the end of Year 1
    answer: 516561
    solution: 519,964 − 3,403 = 516,561
  - label: Year 2 interest expense
    answer: 41325
    solution: 516,561 × 8% = 41,325
```

## Issuance costs and in-between issue dates

**Debt issuance costs** (underwriting, legal, printing) are presented as a **direct deduction** from the debt's carrying amount and amortized into interest expense using the effective interest method.

**Issued between interest dates:** the buyer pays the price **plus accrued interest** since the last interest date, because the first coupon will pay a full period. The issuer credits interest payable (or interest expense) for that accrued amount.

Example: $600,000, 6% bonds with interest dates January 1 and July 1, issued at par on March 1 → accrued interest collected = 600,000 × 6% × 2/12 = **6,000**. On July 1 the full 18,000 coupon is paid, so net interest expense for March–June is 12,000.

```check
far-bond-chk2
```
