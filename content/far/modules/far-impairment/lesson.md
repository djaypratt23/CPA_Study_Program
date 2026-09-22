---
id: far-impairment
section: FAR
title: Impairment of long-lived assets
minutes: 16
objectives:
  - text: Apply the two-step recoverability and measurement test to long-lived assets held and used.
    skill: application
    task: Determine and measure impairment of long-lived assets
  - text: Measure impairment for assets held for sale, indefinite-lived intangibles, and goodwill.
    skill: application
    task: Calculate goodwill and intangible asset impairment
  - text: Explain when impairment losses may and may not be reversed.
    skill: remembering
bigIdea:
  what: >-
    An impairment is a write-down when an asset's carrying amount is more than it can deliver. GAAP uses different
    tests depending on whether the company will keep using the asset, sell it, or whether it's goodwill or an
    indefinite-lived intangible.
  why: >-
    Depreciation assumes things go as planned. When a factory's product is suddenly obsolete, continuing to carry
    it at cost would overstate assets and push the loss into future years. Impairment brings the bad news forward.
  example: >-
    A retailer's mall store keeps losing money as foot traffic collapses. The store's equipment and leasehold
    improvements are tested and written down to fair value, even though they're physically fine.
preQuestions: [far-imp-pre1]
keyTakeaways:
  - "Held and used (ASC 360): test only when indicators exist. Step 1 — recoverability: is the carrying amount greater than the undiscounted future cash flows? Step 2 — if so, loss = carrying amount − fair value."
  - The written-down amount is the new cost basis, depreciated over the remaining life; impairment losses on assets held and used are never reversed.
  - Held for sale — lower of carrying amount or fair value less cost to sell; no depreciation; later recoveries are recognized only up to losses previously recognized.
  - Indefinite-lived intangibles — test at least annually (optional qualitative screen); loss = carrying amount − fair value; no reversal.
  - Goodwill (public entities) — test at the reporting-unit level at least annually; loss = carrying amount of the unit − its fair value, limited to the goodwill balance; no reversal.
  - Test other assets before goodwill so the reporting unit's carrying amount is right.
citations:
  - source: FASB ASC 360-10-35 (Impairment or disposal of long-lived assets)
  - source: FASB ASC 350-30-35 (indefinite-lived intangible assets)
  - source: FASB ASC 350-20-35 (Goodwill impairment), as amended by ASU 2017-04
  - source: FASB ASC 350-20-35-63 onward (private company alternative)
---

## Which test? Follow the asset.

```mermaid
flowchart TD
  A["Which asset?"] --> B["Long-lived asset (group) held and used<br/>(PP&E, finite-lived intangibles)"]
  A --> C["Held for sale"]
  A --> D["Indefinite-lived intangible<br/>(e.g., a renewable trademark)"]
  A --> E["Goodwill"]
  B --> B1["Indicator? → Recoverability: CA > undiscounted cash flows?<br/>→ Loss = CA − fair value"]
  C --> C1["Lower of CA or FV less cost to sell"]
  D --> D1["Annually: CA vs. FV → loss = CA − FV"]
  E --> E1["Annually at reporting unit: CA vs. FV<br/>→ loss = excess, capped at goodwill"]
```

## Assets held and used — two steps

**Indicators** that trigger testing: a significant drop in market price, adverse change in how the asset is used or in its physical condition, legal or business-climate changes, cost overruns, operating or cash flow losses, or an expectation that the asset will be sold significantly before the end of its life.

```worked
title: Testing a production line
scenario: |
  A production line has a carrying amount of $900,000. Because demand has collapsed, management estimates
  undiscounted future net cash flows of $850,000. The line's fair value is $700,000.
steps:
  - label: Step 1 — recoverability
    work: Carrying amount 900,000 vs. undiscounted cash flows 850,000
    result: 900,000 > 850,000 → not recoverable; go to Step 2
  - label: Step 2 — measure the loss
    work: 900,000 − 700,000 fair value
    result: Impairment loss 200,000 (in income from continuing operations)
  - label: After the write-down
    work: New cost basis 700,000, depreciated over the remaining useful life
    result: No later reversal, even if value recovers
insight: The two numbers do different jobs — undiscounted cash flows decide WHETHER there's an impairment; fair value decides HOW MUCH.
```

> **Trap:** if undiscounted cash flows had been $950,000, there is **no impairment** — even though fair value (700,000) is below carrying amount.

```check
far-imp-chk1
```

## Indefinite-lived intangibles

Test **at least annually** and when events suggest impairment. An optional **qualitative assessment** can skip the quantitative test if it is *not more likely than not* that the asset is impaired. Quantitative test: one step — if carrying amount exceeds fair value, the loss equals the excess.

## Goodwill

For public business entities (ASU 2017-04):

1. Test at the **reporting unit** level, at least annually (and when triggering events occur). An optional qualitative screen is allowed.
2. Compare the reporting unit's **fair value** with its **carrying amount (including goodwill)**.
3. Impairment loss = carrying amount − fair value, **not to exceed the goodwill** allocated to that unit.

```faded
title: Your turn — goodwill impairment
scenario: |
  Reporting unit Beta has net assets with a carrying amount of $5,000,000, including goodwill of $1,200,000.
  Beta's fair value is $4,400,000.
steps:
  - label: Excess of carrying amount over fair value
    answer: 600000
    solution: 5,000,000 − 4,400,000 = 600,000
  - label: Goodwill impairment loss
    answer: 600000
    hint: Compare the excess with the goodwill balance.
    solution: The excess (600,000) is less than goodwill (1,200,000), so the full 600,000 is recognized.
  - label: If Beta's fair value were $3,500,000 instead, the goodwill impairment would be
    answer: 1200000
    solution: Excess = 1,500,000, but the loss is capped at goodwill of 1,200,000.
```

**Private companies** may elect to amortize goodwill (straight-line, generally over 10 years or less) and test it only upon a triggering event, at the entity or reporting-unit level.

## Reversals — the rule of thumb

| Category | Reverse later? |
|---|---|
| Held and used PP&E / finite-lived intangibles | **No** |
| Indefinite-lived intangibles | **No** |
| Goodwill | **No** |
| Held for sale | **Yes**, but only up to cumulative losses previously recognized |

(IFRS permits reversals for assets other than goodwill — a common comparison question.)

```check
far-imp-chk2
```
