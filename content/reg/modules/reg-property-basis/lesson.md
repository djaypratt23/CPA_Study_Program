---
id: reg-property-basis
section: REG
title: Basis of property & gain or loss
minutes: 18
taxYear: '2025'
objectives:
  - text: Compute amount realized, adjusted basis, and realized gain or loss on a sale.
    skill: application
    task: Calculate realized and recognized gain or loss on the disposition of property
  - text: Determine the basis and holding period of property acquired by purchase, gift, inheritance, or for services.
    skill: application
    task: Calculate the tax basis of property acquired in different ways
  - text: Apply the related-party and wash-sale loss rules.
    skill: analysis
    task: Analyze the tax effects of transactions between related parties
bigIdea:
  what: >-
    Basis is your after-tax investment in property — the dollars that have already been taxed (or treated as
    taxed). On a sale, gain or loss = amount realized − adjusted basis. How you acquired the property decides
    what your starting basis is.
  why: >-
    Basis makes sure income is taxed once: you are not taxed again on dollars you already invested, and you
    can't deduct losses that aren't really yours. Gift and related-party rules stop people from shifting built-in
    losses to someone who could deduct them.
  example: >-
    A parent gives stock worth $6,000 that cost $10,000. If the child could use $10,000 as basis, the family
    could "gift" a $4,000 loss to whoever needs a deduction. The dual-basis rule blocks that.
preQuestions: [reg-pb-pre1]
keyTakeaways:
  - "Amount realized = cash + FMV of property received + liabilities assumed by the buyer − selling expenses."
  - "Adjusted basis = cost (including acquisition costs) + capital improvements − depreciation and other recoveries."
  - "Gift, FMV ≥ donor's basis at the gift: donee takes the donor's basis (+ the gift tax on the net appreciation); the holding period tacks."
  - "Gift, FMV < donor's basis: dual basis. Gain → donor's basis; loss → FMV at the gift date; a sale in between → no gain or loss."
  - "Inherited property: FMV at death (or the alternate valuation date, if elected); the holding period is always long-term."
  - "Related-party losses (§267) are disallowed; the buyer can use the disallowed loss only to reduce a later gain."
  - "Wash sale (§1091): a loss is disallowed if substantially identical stock is bought within 30 days before or after; the disallowed loss is added to the new shares' basis."
citations:
  - source: IRC §1001 (Determination of amount of and recognition of gain or loss)
  - source: IRC §1012 and §1016 (Basis; adjustments to basis)
  - source: IRC §1015 (Basis of property acquired by gift)
    note: Reg. §1.1015-5 for the gift tax adjustment
  - source: IRC §1014 and §2032 (Basis of inherited property; alternate valuation)
  - source: IRC §267 and §1091 (Related-party losses; wash sales)
---

> **Tax year:** 2025 law. The core basis rules in this module were not changed by the One Big Beautiful Bill Act.

## The core equation

| Step | Formula |
|---|---|
| Amount realized | Cash + FMV of property received + debt relief − selling costs |
| Adjusted basis | Cost + improvements − depreciation |
| Realized gain (loss) | Amount realized − adjusted basis |
| Recognized gain (loss) | Realized, unless a rule defers or disallows it |

```check
reg-pb-chk2
```

## Basis depends on how you got it

```mermaid
flowchart TD
  A[How was the property acquired?] --> P[Purchase: cost]
  A --> S[For services: FMV, which is taxed as income]
  A --> I[Inherited: FMV at date of death]
  A --> G[Gift]
  G --> Q{FMV at gift below donor's basis?}
  Q -- No --> C[Donor's basis plus gift tax on appreciation]
  Q -- Yes --> D{Donee's sale price}
  D -- Above donor's basis --> DG[Gain: use donor's basis]
  D -- Below FMV at gift --> DL[Loss: use FMV at gift]
  D -- In between --> N[No gain or loss]
```

```check
reg-pb-chk1
```

```worked
title: Gift of loss property — three possible sales
scenario: |
  Dana's basis in stock is $20,000. She gives it to Eli when its FMV is $15,000. Consider three possible sale prices.
steps:
  - label: Eli sells for $25,000
    work: Gain basis = donor's $20,000 → 25,000 − 20,000
    result: $5,000 gain; the holding period includes Dana's
  - label: Eli sells for $12,000
    work: Loss basis = FMV $15,000 → 12,000 − 15,000
    result: $3,000 loss; the holding period starts at the gift date
  - label: Eli sells for $17,000
    work: Above $15,000 (no loss) but below $20,000 (no gain)
    result: No gain or loss
insight: Test gain against the donor's basis first, then test loss against FMV. If neither produces a result, there is none.
```

## Gift tax adjustment (appreciated gifts)

Basis increase = gift tax paid × (net appreciation ÷ taxable amount of the gift). The taxable amount is the gift after the annual exclusion.

```faded
title: Your turn — gift with gift tax paid
scenario: |
  Donor's basis is $40,000; FMV at the gift is $100,000. The taxable gift after the annual exclusion is $80,000,
  and the donor paid $12,000 of gift tax on it.
steps:
  - label: Net appreciation
    answer: 60000
    solution: 100,000 − 40,000 = 60,000
  - label: Gift tax added to basis
    answer: 9000
    hint: 12,000 × 60,000 ÷ 80,000
    solution: 12,000 × 0.75 = 9,000
  - label: Donee's basis
    answer: 49000
    solution: 40,000 + 9,000 = 49,000 (never more than FMV)
```

## Loss disallowance rules

| Rule | Trigger | Consequence |
|---|---|---|
| **§267 related party** | Sale at a loss to family (spouse, siblings, ancestors, lineal descendants) or a >50%-owned entity | Seller's loss is disallowed. The buyer's later **gain** is reduced by the disallowed loss (it never creates a loss) |
| **§1091 wash sale** | Substantially identical securities bought within 30 days before or after a loss sale | Loss is disallowed and added to the basis of the new shares; the holding period tacks |

> **Trap:** In-laws are *not* related parties under §267, but siblings are.
