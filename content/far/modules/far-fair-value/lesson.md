---
id: far-fair-value
section: FAR
title: Fair value measurement
minutes: 15
objectives:
  - text: Apply the ASC 820 definition of fair value, including principal and most advantageous markets and the treatment of transaction and transport costs.
    skill: application
    task: Determine the fair value of an asset or liability
  - text: Classify fair value measurements within the Level 1, 2, 3 hierarchy.
    skill: application
    task: Classify inputs within the fair value hierarchy
  - text: Identify valuation approaches and the effects of electing the fair value option.
    skill: remembering
bigIdea:
  what: >-
    Fair value is the price you'd receive to sell an asset (or pay to transfer a liability) in an orderly
    transaction between market participants today. It's an exit price seen through the market's eyes, not the
    company's own plans.
  why: >-
    Many standards require fair value, so GAAP needs one consistent definition. Anchoring it to market participants
    — not management's hopes — makes it more comparable. The hierarchy then tells readers how much judgment went
    into each number.
  example: >-
    A company's shares of a listed stock are valued at the closing price (Level 1). A private-company stake valued
    with a discounted cash flow model built on management's forecasts is Level 3 — same concept, much more
    judgment.
preQuestions: [far-fv-pre1]
keyTakeaways:
  - Fair value is an exit price in an orderly transaction between market participants at the measurement date.
  - Use the principal market (greatest volume and activity); if none, the most advantageous market (best net amount after transaction and transport costs).
  - "Transaction costs are used to pick the most advantageous market but are NOT deducted from fair value. Transportation costs ARE deducted if location is a characteristic of the asset."
  - Nonfinancial assets are valued at their highest and best use by market participants (physically possible, legally permissible, financially feasible).
  - "Approaches: market, income (discounted cash flows), cost (replacement cost). Hierarchy: Level 1 quoted prices for identical items in active markets; Level 2 other observable inputs; Level 3 unobservable inputs."
  - "Fair value option: elect instrument by instrument, irrevocably, at initial recognition; changes in fair value go to earnings (own-credit changes on liabilities go to OCI)."
citations:
  - source: FASB ASC 820-10 (Fair Value Measurement)
  - source: FASB ASC 825-10-25 (Fair value option)
---

## The definition, piece by piece

> Fair value = the price that would be **received to sell an asset** or **paid to transfer a liability** in an **orderly transaction** between **market participants** at the **measurement date**.

- **Exit price** — not what you paid (entry price), though they're often equal at purchase.
- **Market participants** — independent, knowledgeable, able and willing buyers and sellers; not the entity's own intentions.
- **Orderly** — not a forced liquidation or distress sale.

## Which market, and which costs?

```worked
title: Principal vs. most advantageous market
scenario: |
  A commodity trades in two markets. Market A: price $30, transaction costs $3, transport costs $2.
  Market B: price $32, transaction costs $6, transport costs $2.
steps:
  - label: If Market A is the principal market (most volume)
    work: Price 30 − transport 2 (transaction costs are not deducted)
    result: Fair value = 28
  - label: If there is no principal market — find the most advantageous market
    work: "Net received: A = 30 − 3 − 2 = 25; B = 32 − 6 − 2 = 24"
    result: Market A is most advantageous
  - label: Fair value using Market A
    work: 30 − 2 transport
    result: Fair value = 28 (transaction costs used only to choose the market)
insight: Transaction costs belong to the transaction, not the asset. Transport costs change what the asset is worth at the market's location.
```

**Highest and best use** (nonfinancial assets only): value the asset in the use that market participants would choose — even if the company uses it differently. A warehouse on land zoned for condominiums may be worth more as a residential site.

```check
far-fv-chk1
```

## Valuation approaches and the hierarchy

| Approach | Idea | Example |
|---|---|---|
| **Market** | Prices of identical or comparable items | Quoted stock price; recent sales of similar buildings |
| **Income** | Convert future amounts to a present value | DCF model; option pricing models |
| **Cost** | Current replacement cost, adjusted for obsolescence | Specialized equipment |

```mermaid
flowchart TD
  L1["Level 1 — quoted prices in active markets for IDENTICAL items<br/>(most reliable; no adjustment)"] --> L2["Level 2 — other observable inputs<br/>(quoted prices for similar items; inactive markets; yield curves, interest rates)"]
  L2 --> L3["Level 3 — unobservable inputs<br/>(entity's own assumptions, e.g., projected cash flows of a private company)"]
```

A measurement is categorized at the **lowest level of any significant input**. Level 3 measurements require the most disclosure, including a reconciliation of beginning and ending balances and quantitative information about significant unobservable inputs.

```faded
title: Your turn — classify the inputs
scenario: |
  Use 1 for Level 1, 2 for Level 2, 3 for Level 3.
steps:
  - label: Shares of a stock traded on the NYSE, valued at the closing price
    answer: 1
    tolerance: 0
    solution: Quoted price, identical asset, active market → Level 1
  - label: A corporate bond valued using quoted prices of similar bonds and observable yield curves
    answer: 2
    tolerance: 0
    solution: Observable but not identical → Level 2
  - label: A private company investment valued with a DCF based on management's 10-year projections
    answer: 3
    tolerance: 0
    solution: Significant unobservable inputs → Level 3
```

## The fair value option

An entity may **elect** to measure eligible financial assets and liabilities (e.g., loans, notes, debt securities, equity-method investments) at fair value:

- **Instrument by instrument**, at initial recognition (or other election dates), and **irrevocable**.
- Changes in fair value go to **earnings**; for **liabilities**, the portion due to changes in the entity's **own credit risk** goes to **OCI**.
- Upfront costs and fees are expensed as incurred for items under the FVO.

```check
far-fv-chk2
```
