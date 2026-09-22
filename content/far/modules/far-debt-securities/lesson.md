---
id: far-debt-securities
section: FAR
title: Investments in debt securities
minutes: 18
objectives:
  - text: Classify debt securities as held-to-maturity, available-for-sale, or trading and apply the related measurement.
    skill: application
    task: Classify and measure investments in debt securities
  - text: Compute interest income using the effective interest method for securities bought at a discount or premium.
    skill: application
    task: Calculate interest income and amortized cost
  - text: Record fair value changes, credit losses, and sales of AFS securities, including reclassification from AOCI.
    skill: analysis
bigIdea:
  what: >-
    A company holding bonds must say why it holds them. That intent decides the accounting: hold to collect the
    cash flows (held-to-maturity, amortized cost), trade for short-term gains (trading, fair value through net
    income), or somewhere in between (available-for-sale, fair value through OCI).
  why: >-
    If a company will simply collect a bond's coupons and principal, day-to-day price swings don't affect what it
    receives, so amortized cost is most relevant. If it might sell anytime, fair value tells readers what the asset
    is worth now.
  example: >-
    An insurer buys a 10-year bond to match a 10-year policy liability and has the ability to hold it to maturity.
    It classifies it as HTM. A hedge fund buying the same bond for a quick flip classifies it as trading.
preQuestions: [far-dsec-pre1]
keyTakeaways:
  - "HTM: positive intent and ability to hold to maturity → amortized cost, with an allowance for expected credit losses (CECL)."
  - "Trading: bought to sell in the near term → fair value, unrealized gains and losses in net income."
  - "AFS: everything else → fair value; unrealized gains and losses (non-credit) in OCI; credit losses through an allowance limited to the excess of amortized cost over fair value."
  - "Effective interest: interest income = carrying amount × market rate at purchase; the difference from the cash coupon amortizes the discount (increase) or premium (decrease)."
  - When an AFS security is sold, the accumulated unrealized gain or loss is reclassified from AOCI to net income.
  - Interest income is based on amortized cost for all three categories; only the fair value adjustment differs.
citations:
  - source: FASB ASC 320-10 (Investments — Debt Securities)
  - source: FASB ASC 326-20 and 326-30 (credit losses on HTM and AFS debt securities)
  - source: FASB ASC 310-20-35 (effective interest method)
---

## Three buckets for debt securities

| Category | Intent | Balance sheet | Unrealized gains/losses | Credit losses |
|---|---|---|---|---|
| **Held-to-maturity (HTM)** | Positive intent **and ability** to hold to maturity | Amortized cost | Not recognized | CECL allowance (ASC 326-20) |
| **Trading** | Sell in the near term | Fair value | **Net income** | Captured in fair value |
| **Available-for-sale (AFS)** | Neither of the above | Fair value | **OCI** (non-credit portion) | Allowance, limited to (amortized cost − fair value) (ASC 326-30) |

> **Trap:** equity securities (stocks) never go in these buckets — they're covered in the next module.

```check
far-dsec-chk1
```

## Effective interest amortization

Bonds are bought at a **discount** when the market rate exceeds the coupon rate, and at a **premium** when the coupon rate is higher. The effective interest method keeps the **yield constant** on the carrying amount:

- Interest income = beginning amortized cost × **market (effective) rate at purchase**
- Cash received = face × **coupon rate**
- Amortization = the difference (increases amortized cost for a discount; decreases it for a premium)

```worked
title: A bond bought at a discount (HTM)
scenario: |
  On January 1, Year 1, a company buys a $100,000, 5-year bond with a 6% annual coupon, paid December 31, when the
  market rate is 8%. Price: $92,015 (present value of the cash flows at 8%).
steps:
  - label: Year 1 interest income
    work: 92,015 × 8%
    result: 7,361
  - label: Cash received and discount amortized
    work: 100,000 × 6% = 6,000 cash; 7,361 − 6,000
    result: 1,361 amortized; amortized cost = 93,376
  - label: Year 2 interest income
    work: 93,376 × 8%
    result: 7,470; amortization 1,470; amortized cost = 94,846
insight: Interest income rises each year because the carrying amount climbs toward face value. By maturity, amortized cost equals 100,000.
```

```je
title: December 31, Year 1 — interest on the discount bond
lines:
  - { account: Cash, debit: 6000 }
  - { account: Investment in debt securities (discount amortization), debit: 1361 }
  - { account: Interest income, credit: 7361 }
```

## Fair value adjustments

At each reporting date, trading and AFS securities are adjusted to fair value; HTM is not. Suppose the bond above were **AFS** and its fair value at December 31, Year 1 were $95,000:

- Amortized cost 93,376 → fair value 95,000 → unrealized **gain of 1,624 in OCI**.
- If it were **trading**, the same 1,624 would go to **net income**.

Many companies use a "fair value adjustment" valuation account so the investment's amortized cost stays visible.

```faded
title: Your turn — a premium bond classified as AFS
scenario: |
  On January 1, a company buys a $200,000, 10% bond (annual interest each December 31) for $207,580 to yield 9%.
  It is classified as AFS. At December 31, fair value is $203,000. There is no credit loss.
steps:
  - label: Interest income for the year
    answer: 18682
    solution: 207,580 × 9% = 18,682
  - label: Premium amortization
    answer: 1318
    solution: 20,000 cash − 18,682 = 1,318
  - label: Amortized cost at December 31
    answer: 206262
    solution: 207,580 − 1,318 = 206,262
  - label: Unrealized loss recognized in OCI (enter as a positive number)
    answer: 3262
    solution: 206,262 − 203,000 = 3,262 (non-credit, so OCI)
```

## Selling an AFS security

When sold, the realized gain or loss (proceeds − amortized cost) goes to net income, and the related accumulated OCI is **reclassified** out — so the amount isn't counted twice in comprehensive income.

## Credit losses

- **HTM**: CECL allowance for expected lifetime losses from day one.
- **AFS**: only when fair value < amortized cost. The credit portion goes through an **allowance** (to net income), capped at the amount by which fair value is below amortized cost; the non-credit portion stays in OCI. If the company **intends to sell** (or will more likely than not be required to sell) before recovery, write the security down to fair value through net income.

```check
far-dsec-chk2
```
