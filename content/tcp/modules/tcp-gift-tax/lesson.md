---
id: tcp-gift-tax
section: TCP
title: Gift tax compliance (Form 709)
minutes: 20
taxYear: '2025'
objectives:
  - text: Compute taxable gifts after the annual exclusion, gift splitting, and the marital and charitable deductions.
    skill: application
    task: Calculate taxable gifts
  - text: Determine when Form 709 must be filed and how the lifetime exemption (unified credit) applies.
    skill: remembering
    task: Recall gift tax filing requirements
  - text: Determine the donee's basis in gifted property, including the dual-basis rule for loss property.
    skill: application
    task: Calculate the basis of property received by gift
bigIdea:
  what: >-
    The gift tax is a transfer tax on the donor, not an income tax on the donee. Most gifts never produce tax:
    the annual exclusion removes the first $19,000 per donee (2025), spouses and charities can receive unlimited
    gifts, and a large lifetime exemption absorbs the rest. Form 709 is the scorecard that tracks how much of that
    exemption has been used.
  why: >-
    TCP tests the computation (what's a taxable gift?), the compliance (when is a 709 required?), and the planning
    (gift splitting, paying tuition directly, gifting appreciated vs loss property).
  example: >-
    A married couple gives their daughter $50,000 in 2025 and elects gift splitting. Each spouse is treated as
    giving $25,000; each subtracts a $19,000 exclusion, so each has a $6,000 taxable gift — absorbed by the lifetime
    exemption. Both must file Form 709.
preQuestions: [tcp-gt-pre1]
keyTakeaways:
  - "2025 annual exclusion: $19,000 per donee ($38,000 with gift splitting). Only present-interest gifts qualify — gifts in trust generally need Crummey powers."
  - "Unlimited exclusions: tuition paid directly to an educational institution and medical expenses paid directly to the provider (§2503(e))."
  - "Unlimited marital deduction for gifts to a U.S.-citizen spouse; gifts to a noncitizen spouse have a special annual exclusion ($190,000 for 2025). Unlimited charitable deduction."
  - "Lifetime basic exclusion amount: $13,990,000 for 2025, rising to $15,000,000 for 2026 under P.L. 119-21. The unified credit offsets gift tax before any tax is paid; the top rate is 40%."
  - "Form 709 is required for gifts over the annual exclusion, gifts of future interests, and any gift splitting. Due April 15 of the following year; an extension of the income tax return extends it."
  - "Gift splitting (§2513): spouses may treat a gift by either as made half by each; both must consent, and both generally file."
  - "Donee's basis: carryover of the donor's basis (plus gift tax on the appreciation). Dual basis for loss property: if FMV at gift < donor's basis, use FMV to measure loss, donor's basis to measure gain; a sale between the two gives no gain or loss."
  - "Planning: give appreciating assets early, give loss property never (sell it and give cash), and keep appreciated property to get a step-up at death."
citations:
  - source: IRC §2501–§2513 (Gift tax), §2503(b) and (e) (Exclusions), §2523 (Marital deduction)
  - source: IRC §1015 (Basis of property acquired by gift); §2010(c) as amended by Public Law 119-21
  - source: Rev. Proc. 2024-40 (2025 inflation adjustments); Form 709 instructions
---

> **Tax year:** 2025. The basic exclusion amount is $13,990,000 for 2025 and $15,000,000 for 2026 (P.L. 119-21).

## From total gifts to taxable gifts

```mermaid
flowchart TD
  A[Total gifts at FMV] --> B[− Direct tuition and medical payments]
  B --> C[Gift splitting: half to each spouse, if elected]
  C --> D[− Annual exclusion: $19,000 per present-interest donee]
  D --> E[− Marital and charitable deductions]
  E --> F[= Taxable gifts]
  F --> G[Tax on cumulative taxable gifts − unified credit]
```

```worked
title: Taxable gifts for a single donor
scenario: |
  In 2025 Grace (unmarried) gives: $30,000 cash to her son; $15,000 cash to her niece; $45,000 paid directly to
  her grandson's university for tuition; $100,000 to a public charity; and stock worth $60,000 to an irrevocable
  trust for her granddaughter, with income accumulated until the granddaughter turns 25 (no Crummey power).
steps:
  - label: Son
    work: 30,000 − 19,000
    result: 11,000
  - label: Niece
    work: 15,000 is under the exclusion
    result: 0
  - label: Tuition paid directly and charity
    work: Excluded / deducted in full
    result: 0
  - label: Trust for granddaughter (future interest — no annual exclusion)
    work: 60,000
    result: 60,000
  - label: Taxable gifts
    work: 11,000 + 60,000
    result: 71,000 — Form 709 required; no tax due because of the unified credit
insight: The annual exclusion depends on the donee having an immediate right to the property. A trust that accumulates income gives only a future interest.
```

```check
tcp-gt-chk1
```

## Basis of gifted property

| FMV at gift vs donor's basis | Basis for gain | Basis for loss |
|---|---|---|
| FMV ≥ donor's basis | Donor's basis (+ gift tax on appreciation) | Same |
| FMV < donor's basis | Donor's basis | FMV at date of gift |

```faded
title: Your turn — the dual-basis rule
scenario: |
  Hal gives his sister stock with a basis of $20,000 and FMV of $14,000. No gift tax is paid. Compute her
  result if she sells for (a) $25,000, (b) $10,000, (c) $17,000.
steps:
  - label: (a) Gain on sale at $25,000
    answer: 5000
    solution: 25,000 − 20,000 donor basis = 5,000 gain
  - label: (b) Loss on sale at $10,000
    answer: 4000
    hint: Use FMV at the date of the gift for losses
    solution: 14,000 − 10,000 = 4,000 loss
  - label: (c) Gain or loss on sale at $17,000
    answer: 0
    solution: Using 20,000 gives a loss; using 14,000 gives a gain — so neither is recognized
```

```check
tcp-gt-chk2
```
