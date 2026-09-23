---
id: tcp-deferral-transactions
section: TCP
title: Installment sales, like-kind exchanges & related parties
minutes: 20
taxYear: '2025'
objectives:
  - text: Compute gain recognized each year under the installment method, including recapture recognized in the year of sale.
    skill: application
    task: Calculate installment sale income
  - text: Compute recognized gain and the basis of replacement property in a §1031 like-kind exchange with boot and liabilities.
    skill: application
    task: Calculate gain and basis in a like-kind exchange
  - text: Apply related-party rules (§267, §1239, and the related-party rules for installment sales and exchanges).
    skill: analysis
    task: Analyze related-party transactions
bigIdea:
  what: >-
    Some transactions let the seller postpone gain: the installment method matches tax to cash as it's collected,
    and a like-kind exchange of real property defers gain by rolling basis into the new property. Related-party
    rules stop families and controlled entities from manufacturing losses or deferrals among themselves.
  why: >-
    TCP asks how much gain is recognized now, what the new basis is, and whether a related-party rule changes
    the answer.
  example: >-
    An investor trades a rental building (basis $400,000, FMV $1,000,000) for another building worth $1,000,000.
    No gain is recognized; the new building's basis is $400,000, preserving the $600,000 deferred gain.
preQuestions: [tcp-dt-pre1]
keyTakeaways:
  - "Installment method (§453): at least one payment received after the year of sale. Gain recognized = payments received × gross profit percentage (gross profit ÷ contract price). Contract price = selling price − liabilities assumed by the buyer (not exceeding the seller's basis)."
  - "Not eligible: inventory and dealer sales, publicly traded securities, and depreciation recapture — all §1245/§1250 recapture is recognized in the year of sale (and added to basis for the gross profit computation)."
  - "Interest charge: if installment obligations over $5 million are outstanding at year-end, interest is charged on the deferred tax."
  - "§1031 (since 2018): only real property held for business or investment qualifies (not personal property, not inventory/dealer property). Identify replacement property within 45 days and receive it within 180 days (or the return due date, if earlier)."
  - "Gain recognized = lesser of realized gain or boot received. Net liability relief is boot received (liabilities assumed by the other party can be offset by liabilities taken on or cash paid). Boot given never creates gain but increases basis."
  - "Basis of new property = FMV of new property − deferred gain (or: basis of old + boot given + gain recognized − boot received). Holding period tacks."
  - "Related-party exchange: if either party disposes of the exchanged property within 2 years, the deferred gain is recognized (§1031(f))."
  - "§267: losses on sales to related parties (family: spouse, siblings, ancestors, lineal descendants; >50%-owned entities) are disallowed; the buyer can use the disallowed loss to offset later gain. §1239: gain on sales of depreciable property to a related party is ordinary."
citations:
  - source: IRC §453 (Installment method), §453(e) (Related-party resales), §453A (Interest on deferred tax)
  - source: IRC §1031 (Like-kind exchanges), §267 (Related-party losses), §1239 (Gain from sale of depreciable property between related persons)
---

## Installment sales

```worked
title: Installment sale of rental property with recapture
scenario: |
  In 2025, an individual sells equipment used in her rental business: selling price $100,000, basis $30,000 (cost
  $80,000, depreciation $50,000). She receives $20,000 at closing and $80,000 in 2026 plus interest. No liabilities.
steps:
  - label: Total gain
    work: 100,000 − 30,000
    result: 70,000
  - label: §1245 recapture — recognized in 2025 regardless of payments
    work: Lesser of 70,000 or 50,000
    result: 50,000 ordinary in 2025
  - label: Remaining gain and gross profit percentage
    work: 70,000 − 50,000 = 20,000 ÷ 100,000 contract price
    result: 20%
  - label: Installment gain recognized
    work: '2025 — 20% × 20,000 = 4,000; 2026 — 20% × 80,000 = 16,000'
    result: 4,000 in 2025, 16,000 in 2026 (§1231)
insight: Recapture can create a tax bill larger than the cash received in the year of sale — a common planning trap.
```

```check
tcp-dt-chk1
```

## Like-kind exchanges

```faded
title: Your turn — exchange with boot and a mortgage
scenario: |
  Ivy exchanges an office building (basis $300,000; FMV $700,000; mortgage $200,000 assumed by the other party)
  for an apartment building (FMV $550,000) and $50,000 cash.
steps:
  - label: Amount realized
    answer: 800000
    solution: 550,000 + 50,000 cash + 200,000 liability relief = 800,000
  - label: Realized gain
    answer: 500000
    solution: 800,000 − 300,000 = 500,000
  - label: Boot received
    answer: 250000
    hint: Cash plus net liability relief
    solution: 50,000 + 200,000 = 250,000
  - label: Gain recognized
    answer: 250000
    solution: Lesser of 500,000 or 250,000
  - label: Basis of the apartment building
    answer: 300000
    solution: 550,000 FMV − 250,000 deferred gain = 300,000
```

```check
tcp-dt-chk2
```

## Related parties

| Rule | Effect |
|---|---|
| §267 loss disallowance | Seller's loss disallowed; buyer's later gain reduced by it (not a later loss) |
| §1239 | Gain on depreciable property sold to a >50%-owned entity or related person is ordinary |
| §453(e) | Related buyer resells within 2 years → seller recognizes the deferred installment gain |
| §453(g) | No installment method for depreciable property sold to a related person (unless no tax-avoidance purpose) |
| §1031(f) | Related-party exchange; a disposition within 2 years triggers the deferred gain |
