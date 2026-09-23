---
id: reg-nontaxable-exchanges
section: REG
title: Like-kind exchanges, involuntary conversions & related-party rules
minutes: 19
taxYear: '2025'
objectives:
  - text: Compute recognized gain, deferred gain, and basis in like-kind exchanges with boot and liabilities.
    skill: application
    task: Calculate gain and basis in a like-kind exchange
  - text: Apply the involuntary conversion rules and the §121 exclusion on the sale of a principal residence.
    skill: application
    task: Determine recognized gain on involuntary conversions and home sales
  - text: Apply installment sale reporting and related-party limits on deferral.
    skill: application
    task: Apply installment sale and related-party rules
bigIdea:
  what: >-
    Some realized gains aren't taxed now. Swapping real property for like-kind real property (§1031), replacing
    property destroyed or condemned (§1033), and selling a home you've lived in (§121) let taxpayers defer or
    exclude gain — as long as they don't take cash (boot) out.
  why: >-
    These rules recognize that a taxpayer who reinvests hasn't "cashed out." Deferred gain isn't forgiven, though:
    it's built into a lower basis in the new property.
  example: >-
    An investor trades a $900,000 rental building (basis $400,000) for a $850,000 building plus $50,000 cash. She
    realizes $500,000 of gain but recognizes only $50,000 — the boot — and takes a $400,000 basis in the new building.
preQuestions: [reg-nt-pre1]
keyTakeaways:
  - "§1031 applies only to real property held for business or investment exchanged for like-kind real property (not personal residences, inventory, or real property held for sale)."
  - "Recognized gain = lesser of realized gain or boot received. Boot includes cash and liabilities relieved (net of liabilities assumed; cash paid offsets liabilities relieved, but liabilities assumed don't offset cash received). Losses aren't recognized."
  - "Basis of new property = FMV of new property − deferred gain (equivalently: old basis + gain recognized + boot paid − boot received)."
  - "Deferred exchanges: identify replacement property within 45 days and receive it within 180 days (or the return due date, if earlier)."
  - "Related-party exchanges: if either party disposes of the property within 2 years, the deferred gain is triggered."
  - "§1033 involuntary conversions: gain is deferred if proceeds are reinvested in similar property within 2 years after the close of the year of gain (3 years for condemned business or investment real property). Recognized gain = lesser of realized gain or unreinvested proceeds."
  - "§121: exclude up to $250,000 ($500,000 married filing jointly) of gain on a principal residence owned and used 2 of the last 5 years; once every 2 years; partial exclusion for unforeseen circumstances; depreciation after May 6, 1997 isn't excluded."
  - "Installment sales (§453): recognize gain as payments are received — payment × gross profit percentage. Depreciation recapture is recognized in the year of sale; not available for inventory or dealer sales."
citations:
  - source: IRC §1031 (Like-kind exchanges)
  - source: IRC §1033 (Involuntary conversions)
  - source: IRC §121 (Exclusion of gain from sale of principal residence)
  - source: IRC §453 (Installment method), §1041 (Transfers between spouses)
---

## Like-kind exchanges (§1031)

```worked
title: Exchange with a mortgage (liability relief is boot)
scenario: |
  Nora exchanges an investment building (adjusted basis $300,000; FMV $700,000) subject to a $100,000 mortgage
  that the other party assumes, for investment land worth $600,000.
steps:
  - label: Amount realized
    work: FMV of land 600,000 + mortgage relieved 100,000
    result: 700,000
  - label: Realized gain
    work: 700,000 − 300,000
    result: 400,000
  - label: Boot received
    work: Net liability relief
    result: 100,000
  - label: Recognized gain
    work: Lesser of 400,000 realized or 100,000 boot
    result: 100,000
  - label: Basis in the land
    work: 600,000 FMV − 300,000 deferred gain (check — 300,000 old basis + 100,000 gain − 100,000 boot)
    result: 300,000
insight: Deferred gain lives on in the lower basis. If Nora sold the land for $600,000 tomorrow, she'd recognize the $300,000 deferred gain.
```

```faded
title: Your turn — cash boot
scenario: |
  Omar exchanges investment land (basis $200,000; FMV $500,000) for a rental building worth $450,000 plus $50,000 cash.
steps:
  - label: Realized gain
    answer: 300000
    solution: (450,000 + 50,000) − 200,000 = 300,000
  - label: Recognized gain
    answer: 50000
    solution: Lesser of 300,000 or the 50,000 cash boot
  - label: Basis in the building
    answer: 200000
    solution: 450,000 − 250,000 deferred = 200,000
```

```check
reg-nt-chk1
```

## Involuntary conversions (§1033)

| Rule | Detail |
|---|---|
| Replacement property | Similar or related in service or use (like-kind for condemned business or investment real property) |
| Replacement period | 2 years after the close of the tax year in which gain is realized (3 years for condemned business or investment real property) |
| Recognized gain | Lesser of realized gain or proceeds not reinvested |
| Basis | Cost of replacement − deferred gain |
| Losses | Recognized (subject to casualty loss rules for personal property) |

Example: a warehouse (basis $400,000) is destroyed; insurance pays $700,000; $650,000 is reinvested. Realized gain $300,000; recognized $50,000 (unreinvested); new basis $650,000 − $250,000 = $400,000.

## Sale of a principal residence (§121)

```worked
title: Home sale exclusion
scenario: |
  Two sales of principal residences.
steps:
  - label: A married couple (joint return) owned and lived in their home 8 years; gain 620,000
    work: Exclusion up to 500,000
    result: 120,000 recognized (long-term capital gain)
  - label: A single taxpayer owned and used her home 12 months, then moved for a new job 200 miles away; gain 200,000
    work: Partial exclusion for a change in employment — 12 ÷ 24 × 250,000 = 125,000
    result: 75,000 recognized
insight: The 2-out-of-5-year ownership and use tests need not overlap, and the partial exclusion prorates the dollar cap, not the gain.
```

## Installment sales and related parties

- **Installment method:** gain recognized each year = payments received × gross profit percentage (gross profit ÷ contract price). Example: land with basis $60,000 sold for $200,000; $50,000 received in Year 1 → gross profit % = 140,000 ÷ 200,000 = 70% → recognize $35,000 in Year 1.
- Depreciation recapture is recognized in full in the year of sale. Installment reporting isn't allowed for inventory or dealer sales.
- **Related parties:** §1031 deferral is lost if either party disposes of the exchanged property within 2 years. §267 disallows losses on sales between related parties. Transfers between spouses (§1041) are tax-free with carryover basis.

```check
reg-nt-chk2
```
