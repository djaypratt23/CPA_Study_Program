---
id: tcp-partnership-distributions
section: TCP
title: Partnership distributions & dispositions
minutes: 20
taxYear: '2025'
objectives:
  - text: Determine gain or loss and the basis of property received in current and liquidating partnership distributions.
    skill: application
    task: Calculate the tax effects of partnership distributions
  - text: Compute the amount and character of gain on the sale of a partnership interest, including §751 hot assets.
    skill: application
    task: Calculate gain on the sale of a partnership interest
  - text: Analyze when a §754 election (or a mandatory basis adjustment) benefits a purchasing partner.
    skill: analysis
    task: Analyze optional basis adjustments
bigIdea:
  what: >-
    Distributions from a partnership are usually tax-free: the partner just reduces outside basis and takes over
    the property. Gain arises only when cash (including debt relief and marketable securities) exceeds basis, and a
    loss only in a liquidation that pays nothing but cash, receivables, and inventory. Selling an interest is
    capital gain — except for the share of "hot assets," which is ordinary income.
  why: >-
    Expect distribution questions with a basis allocation, and a sale question that splits gain between ordinary
    and capital.
  example: >-
    A partner with $40,000 of basis receives land (partnership basis $50,000). No gain is recognized; her basis in
    the land is limited to $40,000 and her outside basis becomes zero.
preQuestions: [tcp-pd-pre1]
keyTakeaways:
  - "Current (nonliquidating) distribution: gain only if money (including decrease in share of liabilities and marketable securities) exceeds outside basis. No loss. Order: cash first, then unrealized receivables and inventory (carryover basis, limited to remaining basis), then other property (carryover basis, limited to remaining basis)."
  - "Liquidating distribution: gain if money exceeds basis. Loss only if the partner receives nothing but money, unrealized receivables, and inventory — and their bases are less than outside basis. Otherwise, the remaining outside basis is assigned to the other property received (it can be stepped up)."
  - "Distributed receivables keep ordinary character; distributed inventory is ordinary if sold within 5 years."
  - "Sale of a partnership interest (§741): capital gain or loss, except the share of §751 hot assets (unrealized receivables — including depreciation recapture — and inventory) is ordinary. Amount realized includes the buyer's assumption of the seller's share of liabilities."
  - "The partnership's tax year closes for the selling partner on the date of sale; the seller's share of income to that date increases basis before computing gain."
  - "§754 election (or mandatory for a substantial built-in loss over $250,000): the partnership adjusts the inside basis of its assets for the buyer (§743(b)) to match the price paid."
  - "Holding period of distributed property tacks on to the partnership's."
citations:
  - source: IRC §731 (Gain or loss on distribution), §732 (Basis of distributed property), §733 (Basis of distributee partner's interest)
  - source: IRC §741 (Sale of an interest), §751 (Unrealized receivables and inventory), §743 and §754 (Optional basis adjustment)
---

## Current distributions — the order

```mermaid
flowchart TD
  A[Outside basis] --> B[− Cash, marketable securities, liability relief]
  B -->|Excess over basis| G[Capital gain]
  B --> C[− Receivables and inventory: carryover basis, up to remaining basis]
  C --> D[− Other property: carryover basis, up to remaining basis]
  D --> E[Remaining outside basis]
```

```worked
title: A current distribution of cash and land
scenario: |
  Dee's outside basis is $50,000. She receives a current distribution of $20,000 cash and land with a
  partnership basis of $45,000 (FMV $60,000).
steps:
  - label: Cash first
    work: 50,000 − 20,000
    result: 30,000 remaining; no gain
  - label: Land takes carryover basis, limited to remaining outside basis
    work: Lesser of 45,000 or 30,000
    result: 30,000 basis in the land
  - label: Dee's outside basis after the distribution
    work: 30,000 − 30,000
    result: 0
insight: In a current distribution the partner never recognizes a loss and never steps up property basis.
```

```check
tcp-pd-chk1
```

## Liquidating distributions

```faded
title: Your turn — liquidation with a stepped-up asset
scenario: |
  Eli's outside basis is $70,000. In complete liquidation he receives $10,000 cash, inventory (partnership basis
  $15,000), and equipment (partnership basis $20,000).
steps:
  - label: Basis after cash
    answer: 60000
    solution: 70,000 − 10,000 = 60,000; no gain
  - label: Basis of inventory
    answer: 15000
    solution: Carryover 15,000 (never stepped up)
  - label: Basis of equipment
    answer: 45000
    hint: Other property absorbs all remaining basis in a liquidation
    solution: 60,000 − 15,000 = 45,000
  - label: Loss recognized
    answer: 0
    solution: None — he received property other than money, receivables, and inventory
```

```check
tcp-pd-chk2
```

## Selling an interest

| Step | Computation |
|---|---|
| Amount realized | Cash + buyer's assumption of seller's share of liabilities |
| − Adjusted outside basis (including share of income to the sale date) | |
| = Total gain | |
| Ordinary portion (§751) | Seller's share of hot-asset FMV − share of hot-asset basis |
| Capital portion | Total gain − ordinary portion |
