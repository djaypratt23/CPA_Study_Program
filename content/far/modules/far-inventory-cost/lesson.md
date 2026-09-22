---
id: far-inventory-cost
section: FAR
title: Inventory cost flow methods
minutes: 20
objectives:
  - text: Determine which goods and costs belong in inventory, including goods in transit and consignments.
    skill: application
    task: Determine ownership and cost of inventory
  - text: Compute ending inventory and cost of goods sold under FIFO, LIFO, and average cost, periodic and perpetual.
    skill: application
    task: Calculate inventory and COGS under different cost flow assumptions
  - text: Apply dollar-value LIFO and explain LIFO reserves and liquidations.
    skill: analysis
bigIdea:
  what: >-
    When identical items were bought at different prices, a cost flow assumption decides which costs go to the
    income statement (COGS) and which stay on the balance sheet (inventory). It's an assumption about costs, not
    about which physical units left the shelf.
  why: >-
    In periods of rising prices, the choice materially changes reported profit and taxes. FIFO puts old, cheap
    costs in COGS (higher profit, current-cost inventory); LIFO puts recent, expensive costs in COGS (lower profit
    and taxes, outdated inventory values).
  example: >-
    A gas station bought fuel at $3.00 and later $3.50 a gallon. Selling one gallon, FIFO charges $3.00 to COGS;
    LIFO charges $3.50. Same pump, same gallon — different reported margin.
preQuestions: [far-inv-pre1]
keyTakeaways:
  - "Ownership: FOB shipping point — buyer owns goods in transit; FOB destination — seller owns them. Consigned goods belong to the consignor."
  - Inventory cost includes purchase price, freight-in, and costs to bring goods to a saleable condition and location; abnormal waste and most storage and selling costs are expensed.
  - "Goods available for sale = beginning inventory + purchases; ending inventory + COGS must equal goods available."
  - FIFO gives the same answer under periodic and perpetual; LIFO and average cost can differ between the two.
  - "Rising prices: FIFO → higher ending inventory and net income; LIFO → higher COGS, lower income and taxes."
  - Dollar-value LIFO deflates ending inventory to base-year prices, adds layers at the index for the year they arose, and removes the most recent layers first.
  - LIFO reserve = FIFO inventory − LIFO inventory; LIFO users must use LIFO for tax and book (LIFO conformity rule).
citations:
  - source: FASB ASC 330-10 (Inventory — Overall)
  - source: Internal Revenue Code §472(c)
    note: LIFO conformity requirement
---

## What belongs in inventory?

| Situation | Whose inventory? |
|---|---|
| Goods shipped **FOB shipping point**, in transit at year-end | **Buyer's** (title passed at shipment) |
| Goods shipped **FOB destination**, in transit at year-end | **Seller's** (title passes on arrival) |
| Goods out on **consignment** at a retailer | **Consignor's** (the shipper) |
| Goods held for a customer under a bill-and-hold arrangement meeting ASC 606 criteria | Customer's |

**Costs to include:** purchase price (net of discounts), **freight-in**, duties, handling to get goods ready for sale. **Exclude:** abnormal freight, spoilage, rehandling, and **selling** costs (freight-out is a selling expense). Manufacturers allocate fixed overhead based on **normal capacity**.

```check
far-inv-chk1
```

## The three cost flow methods

Data for all examples (periodic system):

| Date | Units | Cost/unit | Total |
|---|---|---|---|
| Beginning inventory | 100 | $10 | 1,000 |
| March purchase | 200 | 11 | 2,200 |
| August purchase | 300 | 12 | 3,600 |
| November purchase | 100 | 13 | 1,300 |
| **Goods available** | **700** | | **8,100** |

450 units were sold; **250 units** remain.

```worked
title: FIFO, LIFO, and weighted average (periodic)
scenario: Use the table above.
steps:
  - label: FIFO ending inventory (the newest costs remain)
    work: 100 × 13 + 150 × 12 = 1,300 + 1,800
    result: 3,100; COGS = 8,100 − 3,100 = 5,000
  - label: LIFO ending inventory (the oldest costs remain)
    work: 100 × 10 + 150 × 11 = 1,000 + 1,650
    result: 2,650; COGS = 8,100 − 2,650 = 5,450
  - label: Weighted average
    work: 8,100 ÷ 700 = 11.5714 per unit; 250 × 11.5714
    result: 2,893 (rounded); COGS = 5,207
insight: Prices rose all year, so LIFO shows the highest COGS (lowest income) and FIFO the lowest COGS. Average lands in between.
```

### Periodic vs. perpetual

- **FIFO**: identical under both — the oldest units are always first out.
- **LIFO perpetual**: each sale takes the latest costs **available at that moment**, so results differ from LIFO periodic.
- **Moving average** (perpetual) recomputes the average after each purchase; **weighted average** (periodic) uses one average for the whole period.

## LIFO details the exam likes

- **LIFO reserve** = FIFO inventory − LIFO inventory (often disclosed so readers can compare to FIFO companies).
- **LIFO liquidation**: when units sold exceed units bought, old low-cost layers flow into COGS, inflating profit. Material liquidation effects are disclosed.
- **LIFO conformity**: a company using LIFO for taxes must use it for financial reporting.
- **IFRS prohibits LIFO.**

## Dollar-value LIFO

Dollar-value LIFO pools items and measures layers in **dollars at base-year prices**:

1. Convert ending inventory at year-end prices to **base-year** prices: ending ÷ current price index.
2. Compare with the prior year's base-year total to find the **layer** added (or removed).
3. Value each layer at the **index of the year it was added**; remove decreases from the **most recent** layers first.

```faded
title: Your turn — dollar-value LIFO
scenario: |
  Year 1 (base year): ending inventory $100,000, index 1.00.
  Year 2: ending inventory at year-end prices $132,000, index 1.10.
  Year 3: ending inventory at year-end prices $143,000, index 1.30.
steps:
  - label: Year 2 ending inventory at base-year prices
    answer: 120000
    solution: 132,000 ÷ 1.10 = 120,000
  - label: Year 2 dollar-value LIFO inventory
    answer: 122000
    hint: Base 100,000 × 1.00 + new layer 20,000 × 1.10
    solution: 100,000 + 22,000 = 122,000
  - label: Year 3 ending inventory at base-year prices
    answer: 110000
    solution: 143,000 ÷ 1.30 = 110,000 — a 10,000 decrease from Year 2
  - label: Year 3 dollar-value LIFO inventory
    answer: 111000
    hint: The decrease comes out of the Year 2 layer first.
    solution: Base 100,000 × 1.00 + remaining Year 2 layer 10,000 × 1.10 = 111,000. (No Year 3 layer is added.)
```

```check
far-inv-chk2
```
