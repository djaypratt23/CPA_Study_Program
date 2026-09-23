---
id: far-contingencies
section: FAR
title: Contingencies & commitments
minutes: 16
objectives:
  - text: Apply the probable/reasonably possible/remote framework to loss contingencies, including ranges of loss.
    skill: application
    task: Determine recognition and disclosure of loss contingencies
  - text: Account for assurance-type warranties and guarantees.
    skill: application
    task: Calculate warranty liabilities and expense
  - text: Explain why gain contingencies are not recognized and when commitments require disclosure or loss recognition.
    skill: remembering
bigIdea:
  what: >-
    A contingency is an existing situation whose outcome — a gain or a loss — depends on a future event, like a
    lawsuit's verdict. GAAP accrues likely, measurable losses now, discloses the merely possible, and waits on
    gains until they're realized.
  why: >-
    Readers need to know about serious threats before they happen, but booking every conceivable loss would make
    statements meaningless. The probability tiers balance timely warning against speculation. The asymmetry for
    gains avoids counting chickens before they hatch.
  example: >-
    A food company faces a recall lawsuit. Counsel believes a loss is probable, likely between $2 million and $5
    million with no amount more likely than another. The company accrues $2 million and discloses that it could
    lose up to $3 million more.
preQuestions: [far-cont-pre1]
keyTakeaways:
  - "Loss contingency: accrue if probable AND reasonably estimable. Probable but not estimable, or reasonably possible → disclose. Remote → generally nothing (guarantees are still disclosed)."
  - "Range of loss: accrue the best estimate in the range; if no amount is better, accrue the minimum and disclose the additional exposure."
  - Gain contingencies are not recognized until realized or realizable; disclose without misleading implications.
  - Assurance-type warranties are accrued as an expense and liability in the period of sale based on estimated costs.
  - Guarantees generally require recognizing a liability at inception for the fair value of the obligation to stand ready, even if payment is not probable.
  - Unasserted claims are disclosed only if assertion is probable and an unfavorable outcome is at least reasonably possible.
  - Unconditional purchase obligations are disclosed; a loss is recognized on a firm, non-cancelable purchase commitment when the market price falls below the contract price.
citations:
  - source: FASB ASC 450-20 (Loss Contingencies)
  - source: FASB ASC 450-30 (Gain Contingencies)
  - source: FASB ASC 460-10 (Guarantees)
  - source: FASB ASC 440-10 (Commitments)
---

## The probability grid

| Likelihood | Reasonably estimable | Not estimable |
|---|---|---|
| **Probable** (likely to occur) | **Accrue** + disclose | Disclose |
| **Reasonably possible** (more than remote, less than likely) | Disclose | Disclose |
| **Remote** (slight) | Nothing* | Nothing* |

\*Certain guarantees are disclosed even when remote.

```mermaid
flowchart TD
  A["Loss contingency at the balance sheet date"] --> B{"Probable?"}
  B -->|Yes| C{"Reasonably estimable?"}
  C -->|Yes| D["Accrue (best estimate, or minimum of range) + disclose"]
  C -->|No| E["Disclose nature + estimate of range or statement that it can't be estimated"]
  B -->|No| F{"Reasonably possible?"}
  F -->|Yes| E
  F -->|No, remote| G["No accrual or disclosure (except certain guarantees)"]
```

The condition must exist **at the balance sheet date**; information after year-end (before issuance) can help estimate it (see Subsequent Events).

```check
far-cont-chk1
```

## Ranges

```worked
title: Accruing a range of loss
scenario: |
  Legal counsel concludes a loss from a lawsuit is probable. Case 1: the range is $400,000 to $900,000 and
  $600,000 is the best estimate. Case 2: the range is $400,000 to $900,000 and no amount is more likely.
steps:
  - label: Case 1 — accrue
    work: Best estimate within the range
    result: 600,000 accrued; disclose the reasonably possible additional 300,000
  - label: Case 2 — accrue
    work: No best estimate → use the minimum
    result: 400,000 accrued; disclose the reasonably possible additional 500,000
insight: IFRS would use the midpoint (650,000) in Case 2 — a classic U.S. GAAP vs. IFRS comparison.
```

## Warranties and guarantees

**Assurance-type warranties** are loss contingencies accrued at the time of sale:

```faded
title: Your turn — warranty liability
scenario: |
  A company began selling appliances with a 2-year assurance warranty this year. Sales were $2,000,000;
  estimated warranty costs are 3% of sales. Actual warranty repairs paid this year were $22,000.
steps:
  - label: Warranty expense for the year
    answer: 60000
    solution: 2,000,000 × 3% = 60,000 (recognized in the year of sale)
  - label: Warranty liability at year-end
    answer: 38000
    solution: 60,000 − 22,000 paid = 38,000
```

**Guarantees** of others' debt: at inception, recognize a liability for the **fair value of the stand-ready obligation** (ASC 460), even if payment isn't probable. If a payment later becomes probable and estimable, apply ASC 450.

## Gain contingencies

Don't recognize until **realized or realizable** — e.g., a lawsuit the company expects to win, a pending tax refund claim. Disclosure is allowed but must avoid misleading implications about likelihood.

## Commitments

- **Unconditional purchase obligations** (take-or-pay contracts): disclose.
- **Firm purchase commitments** that are non-cancelable: if the market price falls below the contract price, recognize a **loss** and liability now.
- Other commitments (capital expenditures, employment contracts) are disclosed if significant.

```check
far-cont-chk2
```
