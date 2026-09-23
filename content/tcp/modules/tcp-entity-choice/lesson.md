---
id: tcp-entity-choice
section: TCP
title: Choice of entity
minutes: 20
taxYear: '2025'
objectives:
  - text: Compare the total tax burden on business income earned through a C corporation, an S corporation, a partnership/LLC, and a sole proprietorship.
    skill: analysis
    task: Analyze the tax consequences of choice of entity
  - text: Apply the default classification and check-the-box rules for eligible entities.
    skill: remembering
    task: Recall entity classification rules
  - text: Identify planning factors — the QBI deduction, self-employment tax, §1202 stock, loss use, and exit — that favor one entity over another.
    skill: analysis
    task: Evaluate non-rate factors in entity selection
bigIdea:
  what: >-
    The same business income can be taxed once (pass-through) or twice (C corporation: 21% at the entity, then
    dividend tax when distributed). The right choice depends on whether profits will be distributed or reinvested,
    who the owners are, whether early losses need to flow out, payroll taxes, and how the owners plan to exit.
  why: >-
    TCP presents a client and asks which entity minimizes tax or best meets their goals — so compute the combined
    rate, then weigh the non-rate factors.
  example: >-
    A founder who plans to reinvest every dollar for 10 years and sell the company may prefer a C corporation:
    21% on retained profits and possibly §1202 exclusion on the sale. A consultant who takes all profits out every
    year usually prefers a pass-through.
preQuestions: [tcp-ec-pre1]
keyTakeaways:
  - "C corporation distributed earnings: 21% corporate tax + up to 23.8% on qualified dividends (20% + 3.8% NIIT) ≈ 39.8% combined. Retained earnings bear only 21% (watch the accumulated earnings tax)."
  - "Pass-through: one level of tax at the owner's rate (up to 37%), reduced by the 20% QBI deduction when available (effective top rate 29.6%); plus SE tax or NIIT depending on participation."
  - "S corporation: pass-through, but owner-employees take reasonable wages; distributions above wages avoid SE/payroll tax. Limits: 100 shareholders, one class of stock, no entity owners."
  - "Partnership/LLC: most flexible — special allocations, debt increases basis, tax-free property distributions; general partners/active members pay SE tax on their share."
  - "Check-the-box (Form 8832): an eligible entity with one owner defaults to a disregarded entity; with two or more owners, a partnership. It can elect corporate status. State-law corporations are always corporations. After a change, a new election generally waits 60 months."
  - "§1202 qualified small business stock: C corporation stock held more than 5 years can exclude 100% of gain, up to the greater of $10 million or 10 × basis (for stock acquired before July 5, 2025). For stock issued after July 4, 2025, P.L. 119-21 allows 50%/75%/100% exclusion after 3/4/5 years, a $15 million cap, and a $75 million gross asset limit."
  - "Losses: flow through to owners of pass-throughs (subject to basis, at-risk, passive limits); stay trapped in a C corporation as NOLs."
  - "Exit: asset sales of pass-throughs give buyers a stepped-up basis with one level of tax; C corporation asset sales face double tax."
citations:
  - source: IRC §11, §1(h), §1411 (Rates), §199A (Qualified business income deduction)
  - source: Treas. Reg. §301.7701-2 and -3 (Entity classification); IRC §1202 as amended by Public Law 119-21
---

> **Tax year:** 2025. The QBI deduction was made permanent by P.L. 119-21; §1202 changes apply to stock issued after July 4, 2025 (see REVIEW.md).

## Combined rate on $100 of profit

| | C corp, distributed | C corp, retained | Pass-through, top bracket with QBI | Pass-through, no QBI |
|---|---|---|---|---|
| Entity tax | 21.0 | 21.0 | 0 | 0 |
| Owner tax | 23.8% × 79 = 18.8 | 0 (for now) | 37% × 80 = 29.6 | 37.0 |
| Total | **39.8** | **21.0** | **29.6** (+ SE tax or NIIT as applicable) | **37.0** |

```worked
title: C corporation vs S corporation for a distributing owner
scenario: |
  Taylor's business will earn $300,000 a year, and she will take all of it out. As an S corporation she would pay
  herself a $120,000 salary (reasonable) and take the rest as distributions. Assume her marginal rate is 35%, the QBI
  deduction applies to the $180,000 of S corporation income, and ignore payroll tax. Compare income tax only.
steps:
  - label: C corporation — entity tax on $300,000 (no salary)
    work: 21% × 300,000
    result: 63,000
  - label: C corporation — dividend tax on 237,000
    work: 23.8% × 237,000
    result: 56,406 → total 119,406
  - label: S corporation — salary
    work: 35% × 120,000
    result: 42,000
  - label: S corporation — pass-through income after 20% QBI deduction
    work: 35% × (180,000 × 80%)
    result: 50,400 → total 92,400
insight: When profits are distributed each year, the single level of tax usually wins. The picture changes when profits are reinvested for years.
```

```check
tcp-ec-chk1
```

## Default classification

```faded
title: Your turn — check-the-box outcomes
scenario: |
  Classify each entity for federal tax purposes if no election is made. Enter 1 for disregarded entity,
  2 for partnership, 3 for corporation.
steps:
  - label: A single-member LLC owned by an individual
    answer: 1
    solution: Disregarded entity (reported on Schedule C, E, or F)
  - label: A two-member LLC
    answer: 2
    solution: Partnership (Form 1065)
  - label: A state-law corporation
    answer: 3
    solution: Per se corporation; it can't elect out (but can elect S status)
  - label: A two-member LLC that files Form 8832 electing association status
    answer: 3
    hint: The election overrides the default
    solution: Taxed as a corporation (and could then elect S status)
```

```check
tcp-ec-chk2
```
