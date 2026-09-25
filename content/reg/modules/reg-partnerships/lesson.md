---
id: reg-partnerships
section: REG
title: 'Partnerships: formation, operations & basis'
minutes: 20
taxYear: '2025'
objectives:
  - text: Separate partnership ordinary business income from separately stated items and guaranteed payments.
    skill: application
    task: Calculate a partner's distributive share of partnership items
  - text: Compute a partner's outside basis and apply the basis limit on losses.
    skill: application
    task: Calculate a partner's basis
  - text: Determine the tax consequences of current distributions and the sale of a partnership interest.
    skill: application
    task: Determine the consequences of partnership distributions
  - text: Review Form 1065 classification, guaranteed payments and self-employment items, and resolve related diagnostics.
    skill: analysis
bigIdea:
  what: >-
    A partnership doesn't pay income tax. It reports ordinary business income and "separately stated" items on
    Schedule K-1, and each partner pays tax on its share whether or not cash is distributed. The partner's outside
    basis tracks those amounts — going up with income and contributions and down with losses and distributions.
  why: >-
    Basis limits losses, determines whether distributions are taxable, and sets gain on a sale. Most partnership
    exam questions are really basis questions.
  example: >-
    A 25% partner's share of ordinary income is $40,000, and she receives $30,000 in cash. She's taxed on $40,000 and
    her basis rises by $10,000 net — the cash isn't separately taxed because it's less than her basis.
preQuestions: [reg-pt-pre1]
keyTakeaways:
  - "Formation: generally no gain or loss on contributing property (§721); outside basis = cash + basis of property − liabilities relieved + share of partnership liabilities; partnership takes carryover basis."
  - "Separately stated items (flow through with their character): capital gains and losses, §1231 items, dividends, interest, charitable contributions, §179 expense, tax-exempt income, investment interest, foreign taxes. Everything else nets into ordinary business income."
  - "Guaranteed payments are deductible by the partnership in computing ordinary income and are ordinary (and self-employment) income to the partner."
  - "Outside basis increases: contributions, share of taxable and tax-exempt income, increases in share of liabilities. Decreases: distributions, share of losses and nondeductible expenses, decreases in share of liabilities. Basis can't go below zero."
  - "Losses are deductible only to the extent of outside basis (then at-risk and passive limits); excess losses carry forward."
  - "Current distributions: no gain unless cash (including a decrease in liability share) exceeds outside basis. Property received takes the partnership's basis, limited to the partner's remaining outside basis."
  - "Sale of an interest: capital gain or loss, except the portion attributable to unrealized receivables and inventory (§751 \"hot assets\") is ordinary. The amount realized includes relief from the partner's share of liabilities."
  - "Form 1065 and K-1s are due March 15 for calendar-year partnerships."
citations:
  - source: IRC §701–§704 (Partners' distributive shares), §705 (Basis), §707(c) (Guaranteed payments)
  - source: IRC §721–§723 (Contributions), §731–§733 (Distributions), §741, §751 (Sales of interests), §752 (Liabilities)
---

## Ordinary income vs. separately stated items

```worked
title: Allocating partnership items
scenario: |
  The AB Partnership (equal partners Ann and Ben) has 2025 sales $500,000, cost of sales $200,000, salaries to
  employees $80,000, a guaranteed payment to Ann of $40,000, long-term capital gain $10,000, charitable
  contributions $6,000, and municipal interest $2,000.
steps:
  - label: Ordinary business income
    work: 500,000 − 200,000 − 80,000 − 40,000 guaranteed payment
    result: 180,000 → 90,000 each
  - label: Separately stated
    work: LTCG 10,000; charity 6,000; municipal interest 2,000
    result: Each partner gets 5,000; 3,000; 1,000
  - label: Ann's income from the partnership
    work: 40,000 guaranteed payment + 90,000 ordinary + 5,000 LTCG (+ 1,000 exempt interest)
    result: 135,000 taxable (charity 3,000 is her itemized deduction)
insight: Items that could be treated differently on a partner's own return (capital gains, charity, §179) must be separately stated so they keep their character.
```

```check
reg-pt-chk1
```

## Outside basis

```worked
title: Ben's basis rollforward
scenario: |
  Ben's basis at January 1, 2025 is $50,000. His share of partnership liabilities increased by $8,000. Using the
  items above, he received $70,000 in cash distributions.
steps:
  - label: Add income items
    work: 50,000 + 90,000 ordinary + 5,000 LTCG + 1,000 exempt interest + 8,000 liabilities
    result: 154,000
  - label: Subtract nondeductible / separately stated deductions
    work: − 3,000 charitable contributions
    result: 151,000
  - label: Subtract distributions
    work: − 70,000
    result: 81,000 ending basis
insight: Tax-exempt income increases basis (so it's never taxed on distribution); nondeductible expenses decrease it.
```

## Distributions

```mermaid
flowchart TD
  D[Current distribution] --> C{Cash > outside basis?}
  C -- Yes --> G[Gain = cash − basis; basis becomes 0]
  C -- No --> P[No gain; reduce basis by cash]
  P --> Q[Property: basis = lesser of partnership's basis or partner's remaining outside basis]
```

```check
reg-pt-chk2
```

## Reviewing Form 1065 classification

Checklist for a prepared Schedule K:

- **Guaranteed payments** (including health premiums paid for a partner) are deducted in computing ordinary business income **and** reported separately on line 4.
- **Separately stated items** (interest, dividends, §1231, capital gains, §179, charity, tax-exempt income) stay out of ordinary income.
- **Self-employment earnings** (line 14a): a general partner's share of ordinary income plus guaranteed payments for services. A **limited partner's** distributive share is excluded; only guaranteed payments for services count.

**Resolving diagnostics.** Tax software raises a diagnostic whenever an entry looks unusual. It is a question, not an error. For each one, decide whether:

1. the **input is wrong** — fix the entry;
2. the entry is **right and the difference is expected** — clear the flag and document why; or
3. the source documents **cannot answer it** — ask the client.

Clearing a flag without understanding it is how errors reach a filed return.
