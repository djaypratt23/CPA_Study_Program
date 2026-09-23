---
id: reg-capital-gains
section: REG
title: Capital gains & losses, §1231 & recapture
minutes: 20
taxYear: '2025'
objectives:
  - text: Net capital gains and losses and determine the deduction and carryover for individuals and corporations.
    skill: application
    task: Calculate net capital gain or loss
  - text: Classify gains on business property as ordinary (§1245, §1250, §291) or §1231, and apply the §1231 netting and lookback rules.
    skill: application
    task: Determine the character of gain on the sale of business property
  - text: Apply preferential rates, including 25% unrecaptured §1250 gain and 28% collectibles gain.
    skill: analysis
    task: Determine the tax rates that apply to capital gains
bigIdea:
  what: >-
    Character matters as much as amount. Capital gains held more than a year get lower rates; ordinary income
    doesn't. For business property, depreciation taken earlier is "recaptured" as ordinary income, and whatever gain
    remains may qualify as §1231 gain — the best of both worlds (capital-gain treatment for gains, ordinary treatment
    for losses).
  why: >-
    The same $100,000 gain can be taxed at 37%, 25%, 15%, or 0% depending on how it's characterized. Getting the
    character right is most of the work in property transactions.
  example: >-
    A business sells equipment for $120,000 that cost $100,000 and was depreciated by $60,000. The $80,000 gain
    splits into $60,000 of ordinary income (recapture of depreciation) and $20,000 of §1231 gain.
preQuestions: [reg-cg-pre1]
keyTakeaways:
  - "Capital assets exclude inventory, receivables, depreciable business property, and land used in a business (those are §1231 or ordinary assets). Long-term = held more than one year."
  - "Individuals: net short-term and long-term separately, then net them. A net capital loss is deductible up to $3,000 per year ($1,500 married filing separately); the excess carries forward indefinitely and keeps its character."
  - "Corporations: capital losses offset only capital gains; excess carries back 3 years and forward 5 years as short-term; no preferential rate (21%)."
  - "Rates for individuals (2025): 0%, 15%, or 20% on long-term gains based on taxable income; 25% maximum on unrecaptured §1250 gain; 28% on collectibles. The 3.8% net investment income tax may also apply."
  - "§1245 (depreciable personal property): gain is ordinary to the extent of all depreciation taken; any excess is §1231."
  - "§1250 (real property, straight-line): no ordinary recapture for individuals, but gain up to the depreciation taken is unrecaptured §1250 gain (max 25%). Corporations recapture 20% of the lesser of the gain or straight-line depreciation as ordinary (§291)."
  - "§1231 property: business property held more than one year. Net §1231 gain → long-term capital gain (except to the extent of nonrecaptured net §1231 losses from the prior 5 years, which is ordinary); net §1231 loss → ordinary."
  - "§1244 small business stock: loss is ordinary up to $50,000 per year ($100,000 married filing jointly)."
citations:
  - source: IRC §1(h), §1211, §1212, §1221, §1222 (Capital gains and losses)
  - source: IRC §1231, §1245, §1250, §291 (Business property and recapture)
  - source: IRC §1244 (Losses on small business stock), §1411 (Net investment income tax)
---

## Netting for individuals

```worked
title: Netting capital gains and losses
scenario: |
  Maya's 2025 transactions: short-term gain $4,000; short-term loss $9,000; long-term gain $15,000; long-term loss $2,000.
steps:
  - label: Net short-term
    work: 4,000 − 9,000
    result: (5,000) net short-term loss
  - label: Net long-term
    work: 15,000 − 2,000
    result: 13,000 net long-term gain
  - label: Net the two
    work: 13,000 − 5,000
    result: 8,000 net capital gain — eligible for long-term rates
insight: A net short-term loss absorbs long-term gain first. If the overall result were a loss, only $3,000 would be deductible this year.
```

```faded
title: Your turn — a net capital loss
scenario: |
  Leo has a short-term gain of $2,000, a long-term loss of $12,000, and no other capital transactions.
steps:
  - label: Net capital loss
    answer: 10000
    solution: 12,000 − 2,000 = 10,000 net long-term loss
  - label: Deductible against ordinary income this year
    answer: 3000
    solution: Limited to $3,000
  - label: Carryforward to next year
    answer: 7000
    solution: 10,000 − 3,000 = 7,000, carried forward as long-term
```

```check
reg-cg-chk1
```

## Business property: recapture and §1231

```mermaid
flowchart TD
  G[Gain on business property held more than 1 year] --> T{Type of property}
  T -- Personal property (equipment) --> P[§1245: ordinary up to all depreciation taken; rest §1231]
  T -- Real property (building) --> B[Individuals: unrecaptured §1250 gain up to depreciation, taxed max 25%; rest §1231. Corporations: §291 ordinary = 20% of lesser of gain or SL depreciation]
  P --> N[Net all §1231 gains and losses]
  B --> N
  N -- Net gain --> LT[Long-term capital gain, after the 5-year lookback for prior §1231 losses]
  N -- Net loss --> OR[Ordinary loss]
```

```worked
title: Characterizing gains on business property
scenario: |
  An individual sole proprietor sells two assets held for years.
steps:
  - label: "Equipment: cost 100,000; depreciation 60,000; sold for 120,000"
    work: Gain 80,000; §1245 recapture = lesser of gain or depreciation = 60,000
    result: 60,000 ordinary; 20,000 §1231
  - label: "Building: cost 500,000; straight-line depreciation 150,000; sold for 600,000"
    work: Gain 250,000; unrecaptured §1250 gain = 150,000
    result: 150,000 taxed at up to 25%; 100,000 §1231
  - label: "If a C corporation sold the same building"
    work: §291 = 20% × lesser of 250,000 gain or 150,000 depreciation
    result: 30,000 ordinary; 220,000 §1231
insight: Recapture only ever reaches depreciation taken — gain above the original cost is always §1231.
```

```check
reg-cg-chk2
```
