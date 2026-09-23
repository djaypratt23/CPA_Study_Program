---
id: tcp-asset-dispositions
section: TCP
title: 'Sale of business assets: §1231, §1245 & §1250'
minutes: 20
taxYear: '2025'
objectives:
  - text: Classify gain on the sale of business property into ordinary income (§1245, §1250, §291) and §1231 gain.
    skill: application
    task: Calculate depreciation recapture
  - text: Apply §1231 netting, including the 5-year lookback for nonrecaptured net §1231 losses.
    skill: application
    task: Apply §1231 netting and lookback rules
  - text: Determine unrecaptured §1250 gain for individuals and the §291 recapture for corporations.
    skill: analysis
    task: Analyze recapture on the sale of depreciable real property
bigIdea:
  what: >-
    Business property held more than a year gets the best of both worlds under §1231: net gains are taxed like
    long-term capital gains, and net losses are ordinary. But depreciation that reduced ordinary income is
    "recaptured" as ordinary income (or, for individuals' real estate, taxed at up to 25%) when the asset is sold
    at a gain.
  why: >-
    Asset-sale simulations (often a Form 4797 layout) are a TCP favorite: characterize each sale, recapture, net
    §1231, and apply the lookback.
  example: >-
    A company sells a machine that cost $100,000, with $70,000 of depreciation, for $50,000. The $20,000 gain is
    entirely §1245 recapture — ordinary income — because it's less than the depreciation taken.
preQuestions: [tcp-ad-pre1]
keyTakeaways:
  - "§1231 property: depreciable property and real property used in a trade or business and held more than 1 year (plus certain casualty/condemnation gains, timber, livestock). Not inventory or capital assets."
  - "§1245 (personal property — equipment, vehicles, most §197 intangibles): ordinary income = lesser of the gain or all depreciation (including §179 and bonus). Remaining gain is §1231."
  - "§1250 (real property): only depreciation in excess of straight-line is ordinary. Since MACRS real property uses straight-line, there's usually no §1250 ordinary recapture."
  - "Individuals: the straight-line depreciation portion of the gain on real property is 'unrecaptured §1250 gain,' taxed at a maximum 25%."
  - "Corporations (§291): 20% of the lesser of the gain or the straight-line depreciation on §1250 property is ordinary income."
  - "Netting: combine all §1231 gains and losses. Net gain → long-term capital gain (after lookback); net loss → ordinary loss."
  - "5-year lookback (§1231(c)): net §1231 gain is ordinary to the extent of nonrecaptured net §1231 losses deducted in the prior 5 years."
  - "Losses on business property held 1 year or less are ordinary; gains are ordinary too (not §1231)."
citations:
  - source: IRC §1231 (Property used in the trade or business), §1245 and §1250 (Recapture), §291(a)(1) (Corporate preference items), §1(h)(6) (Unrecaptured §1250 gain)
  - source: Form 4797 instructions
---

## Character of gain on a business asset

```mermaid
flowchart TD
  A[Sale of business property held > 1 year] --> B{Gain or loss?}
  B -->|Loss| L[§1231 loss]
  B -->|Gain| C{Personal or real property?}
  C -->|Personal - §1245| D[Ordinary to extent of all depreciation; rest §1231]
  C -->|Real - §1250| E[Ordinary only for excess over straight-line]
  E --> F[Corporation: + 20% of lesser of gain or SL depreciation - §291]
  E --> G[Individual: SL depreciation portion taxed at max 25%]
  D --> N[Net all §1231 items; apply 5-year lookback]
  F --> N
  G --> N
```

```worked
title: A corporation sells a building and equipment
scenario: |
  Oak Corp sells: (1) equipment, cost $200,000, accumulated depreciation $150,000, for $90,000; (2) a building held
  10 years, cost $1,000,000, straight-line depreciation $250,000, for $1,100,000.
steps:
  - label: Equipment gain
    work: 90,000 − 50,000 basis
    result: 40,000 — all §1245 ordinary (less than 150,000 depreciation)
  - label: Building gain
    work: 1,100,000 − 750,000 basis
    result: 350,000
  - label: §291 ordinary income
    work: 20% × lesser of 350,000 or 250,000
    result: 50,000 ordinary
  - label: §1231 gain on the building
    work: 350,000 − 50,000
    result: 300,000
insight: An individual selling the same building would have no ordinary recapture, but 250,000 of the gain would be unrecaptured §1250 gain taxed at up to 25%.
```

```check
tcp-ad-chk1
```

## The lookback

```faded
title: Your turn — §1231 netting with lookback
scenario: |
  In 2025, an individual has a §1231 gain of $50,000 on land and a §1231 loss of $(10,000) on equipment (no
  recapture). In 2022, she deducted a net §1231 loss of $(15,000); she has had no §1231 gains since.
steps:
  - label: Net §1231 gain for 2025
    answer: 40000
    solution: 50,000 − 10,000 = 40,000
  - label: Recharacterized as ordinary income (lookback)
    answer: 15000
    solution: Prior 5 years' nonrecaptured net §1231 losses = 15,000
  - label: Long-term capital gain
    answer: 25000
    solution: 40,000 − 15,000 = 25,000
```

```check
tcp-ad-chk2
```
