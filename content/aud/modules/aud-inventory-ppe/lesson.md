---
id: aud-inventory-ppe
section: AUD
title: Inventory & long-lived assets
minutes: 17
objectives:
  - text: Plan and perform procedures at the physical inventory count, including test counts in both directions.
    skill: application
    task: Observe the physical inventory count
  - text: Design procedures for inventory valuation, cut-off, and ownership.
    skill: application
    task: Perform substantive procedures for inventory
  - text: Design substantive procedures for PP&E additions, disposals, and depreciation.
    skill: application
    task: Perform substantive procedures for long-lived assets
bigIdea:
  what: >-
    For inventory, the auditor attends the client's physical count (if material and practicable), test-counts in
    both directions, checks cut-off, and tests pricing and obsolescence. For PP&E, the focus is on changes during
    the year: vouching additions, finding unrecorded disposals, and recomputing depreciation.
  why: >-
    Inventory is easy to inflate (fake count tags, obsolete goods at full cost). PP&E misstatements hide in
    capitalized repairs and retired assets still on the books.
  example: >-
    At the count, the auditor selects items on the floor and finds them on the count sheets (completeness), and
    selects count-sheet lines and finds the goods on the floor (existence). A pallet of dusty, discontinued parts is
    noted for the obsolescence review.
preQuestions: [aud-inv-pre1]
keyTakeaways:
  - "Attendance at the physical count is required when inventory is material, unless impracticable — then alternative procedures (e.g., subsequent sales, rollforward) are needed."
  - "Test counts: floor → count sheets tests completeness; count sheets → floor tests existence."
  - "At the count: observe procedures, look for obsolete or damaged goods, record the last receiving and shipping document numbers for cut-off, and control the count tags."
  - "Inventory held by third parties (public warehouses): confirm with the custodian and, if material, consider other procedures."
  - "Consigned goods: exclude consigned-in goods; include consigned-out goods."
  - "Valuation: test costing (agree to invoices), and test lower of cost and NRV using subsequent selling prices and turnover data."
  - "PP&E: vouch additions to invoices and contracts (existence, rights); analyze repairs and maintenance expense for items that should be capitalized; search for unrecorded disposals (insurance, property tax records, scrap sales); recompute depreciation; review for impairment indicators."
citations:
  - source: AU-C 501 (Audit evidence — specific considerations for selected items, inventory)
  - source: AU-C 510 (Opening balances)
  - source: PCAOB AS 2510 (Auditing inventories)
---

## At the physical count

```mermaid
flowchart LR
  F[Items on the warehouse floor] -->|test count, then trace| S[Count sheets]
  S -->|select lines, then find goods| F
  F -.- C[Completeness]
  S -.- E[Existence]
```

| During the count, the auditor… | Why |
|---|---|
| Evaluates management's count instructions | Design of the count |
| Observes the counters | Instructions followed |
| Performs test counts (both directions) | Existence and completeness |
| Notes obsolete, damaged, or slow-moving items | Valuation |
| Records the last receiving and shipping document numbers | Cut-off |
| Accounts for all prenumbered count tags | Prevents added or missing tags |

```check
aud-inv-chk1
```

## Ownership and cut-off

| Situation | Include in client's inventory? |
|---|---|
| Goods held on consignment **for** others (consigned-in) | No |
| Client's goods held by consignees (consigned-out) | Yes |
| Goods in transit, purchased FOB shipping point | Yes (control passed at shipment) |
| Goods in transit, sold FOB destination | Yes (still the seller's until delivered) |
| Goods in a public warehouse | Yes — confirm with the warehouse |

## Valuation

- **Cost**: agree unit costs to recent vendor invoices (FIFO) or cost records; test overhead allocations.
- **Lower of cost and NRV**: compare costs with subsequent selling prices less costs to sell.
- **Obsolescence**: inventory turnover by product, items with no recent sales, items noted at the count.

## Property, plant, and equipment

```worked
title: Auditing the PP&E rollforward
scenario: |
  Beginning PP&E $4,000,000 (agreed to prior-year working papers). Additions $900,000; disposals $300,000;
  ending $4,600,000. Repairs and maintenance expense rose from $120,000 to $310,000.
steps:
  - label: Beginning balance
    work: Agree to last year's audited statements
    result: Agreed
  - label: Additions
    work: Vouch large additions to invoices, contracts, and board approvals; inspect some assets
    result: Existence and rights of additions
  - label: Repairs expense up $190,000
    work: Vouch large repair entries — do any extend useful life or add capacity?
    result: A $150,000 roof replacement expensed as a repair → should be capitalized (understated PP&E)
  - label: Disposals
    work: Review insurance and property tax records, scrap sales, and plant tours for retired assets still recorded
    result: Completeness of disposals (existence of the remaining assets)
insight: Expense accounts are where capitalizable items hide; asset accounts are where retired assets hide.
```

```check
aud-inv-chk2
```
