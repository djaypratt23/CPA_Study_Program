---
id: tcp-partnership-formation
section: TCP
title: Partnership formation & partner basis
minutes: 20
taxYear: '2025'
objectives:
  - text: Determine gain recognized and the partner's outside basis on contributions of cash, property, and services.
    skill: application
    task: Calculate a partner's initial basis in a partnership interest
  - text: Determine the partnership's inside basis and holding period in contributed property.
    skill: application
    task: Determine the partnership's basis in contributed property
  - text: Analyze the effect of partnership liabilities on basis and on gain recognition at formation.
    skill: analysis
    task: Analyze the effect of liabilities on a partner's basis
bigIdea:
  what: >-
    Forming a partnership is generally tax-free: contributing property for a partnership interest is a
    change in the form of ownership, not a sale (§721). Basis carries over — the partner's "outside" basis in the
    interest and the partnership's "inside" basis in the assets both start from the property's old basis.
  why: >-
    Taxing formation would discourage people from pooling assets into a business. Carryover basis preserves the
    built-in gain so it is taxed later, when the property or the interest is sold. Liabilities count as money:
    being relieved of debt is like receiving cash, and taking on a share of partnership debt is like contributing cash.
  example: >-
    Two friends open a bakery LLC. One contributes a building she bought years ago; the other contributes cash.
    Neither owes tax at formation. The building's old basis becomes the LLC's basis, and its built-in gain is
    allocated back to her if the LLC later sells it.
preQuestions: [tcp-pf-pre1]
keyTakeaways:
  - "§721: no gain or loss on contributing property in exchange for a partnership interest."
  - "§722 outside basis = cash + adjusted basis of property contributed − liabilities the partnership assumes from the partner + the partner's share of partnership liabilities."
  - "If net liability relief exceeds basis, the excess is gain (§731 deemed cash distribution) and outside basis is reduced to zero — never negative."
  - "§723 inside basis = the contributing partner's adjusted basis (carryover). Holding period tacks for capital and §1231 assets (§1223)."
  - "A capital interest received for services is ordinary income at FMV; that amount becomes basis."
  - "§704(c): built-in gain or loss at contribution is allocated to the contributing partner when the property is sold."
  - "§724: contributed receivables and inventory keep ordinary character (inventory for 5 years); capital-loss property keeps its character for 5 years."
  - "§709: deduct up to $5,000 of organization costs (reduced dollar for dollar above $50,000) and amortize the rest over 180 months. Syndication costs are never deductible."
citations:
  - source: IRC §721 (Nonrecognition of gain or loss on contribution)
  - source: IRC §722 and §723 (Basis of contributing partner's interest; basis of property contributed)
  - source: IRC §752 and §731 (Treatment of liabilities; distributions)
  - source: IRC §704(c) and §724 (Contributed property)
  - source: IRC §709 (Organization and syndication fees)
---

> **Tax year:** 2025 law. These formation rules were not changed by the One Big Beautiful Bill Act.

## Two bases to track

| | Outside basis (the partner's interest) | Inside basis (partnership's assets) |
|---|---|---|
| Starts at | Cash + basis of property − debt relief + share of partnership debt | Partner's adjusted basis in the property (carryover) |
| Holding period | Tacks for capital/§1231 property; starts at contribution for cash, inventory, or services | Tacks (§1223) |
| Used for | Loss limits, distributions, sale of the interest | Depreciation, gain or loss when the partnership sells |

```check
tcp-pf-chk1
```

## Liabilities are treated like cash (§752)

- The partnership assumes the partner's debt → treated as a **cash distribution** to that partner (reduces basis).
- The partner's share of the partnership's debt → treated as a **cash contribution** (increases basis).
- Net the two. Gain is recognized only if the net relief exceeds the partner's basis.

```worked
title: Land subject to a mortgage
scenario: |
  Ana contributes land (adjusted basis $40,000; FMV $100,000) subject to a $30,000 mortgage the partnership
  assumes, for a 50% interest. Ben contributes $70,000 cash for 50%. Liabilities are shared equally.
steps:
  - label: Ana's outside basis
    work: 40,000 − 30,000 (relief) + 15,000 (50% share)
    result: 25,000 — no gain, since net relief of 15,000 is less than her 40,000 basis
  - label: Ben's outside basis
    work: 70,000 + 15,000 (50% share)
    result: 85,000
  - label: Partnership's basis in the land
    work: Carryover from Ana
    result: 40,000 (holding period includes Ana's)
  - label: Book (§704(b)) capital accounts
    work: Ana 100,000 − 30,000 debt; Ben 70,000
    result: Ana 70,000; Ben 70,000 — equal, as the 50/50 deal intended
insight: Tax basis and book capital differ by Ana's $60,000 built-in gain. §704(c) makes sure that gain is taxed to Ana, not Ben, when the land is sold.
```

```faded
title: Your turn — liability exceeds basis
scenario: |
  Cruz contributes equipment (adjusted basis $20,000; FMV $60,000) subject to a $50,000 liability for a 25%
  interest. The partnership assumes the liability, and liabilities are shared by ownership percentage.
steps:
  - label: Cruz's share of the assumed liability
    answer: 12500
    solution: 50,000 × 25% = 12,500
  - label: Net liability relief
    answer: 37500
    hint: Relief of the full liability minus Cruz's share
    solution: 50,000 − 12,500 = 37,500
  - label: Gain recognized
    answer: 17500
    hint: Net relief in excess of basis
    solution: 37,500 − 20,000 basis = 17,500 gain (deemed cash distribution)
  - label: Cruz's outside basis
    answer: 0
    solution: 20,000 − 37,500 + 17,500 gain = 0. Basis can't go below zero.
```

```check
tcp-pf-chk2
```

## Services and other traps

| Situation | Result |
|---|---|
| Capital interest for services | Ordinary income = FMV of the interest; basis = that amount |
| Contributed inventory sold within 5 years | Ordinary income to the partnership (§724) |
| Contributed receivables of a cash-basis partner (zero basis) | Ordinary income when collected, allocated to the contributor under §704(c) |
| Organization costs | Up to $5,000 deducted, the rest amortized over 180 months |
| Syndication costs (selling interests) | Never deductible or amortizable |

**Form 1065** is due the 15th day of the 3rd month after year-end (March 15 for a calendar-year partnership), with a 6-month extension available.
