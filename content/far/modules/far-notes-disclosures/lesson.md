---
id: far-notes-disclosures
section: FAR
title: Notes, related parties & risk disclosures
minutes: 12
objectives:
  - text: Identify what belongs in the summary of significant accounting policies.
    skill: remembering
    task: Identify required disclosures in the notes to the financial statements
  - text: Apply related-party disclosure requirements, including when arm's-length language is prohibited.
    skill: application
    task: Identify and disclose related-party transactions
  - text: Determine when concentrations and significant estimates must be disclosed.
    skill: application
bigIdea:
  what: >-
    The notes are the part of the financial statements that tells readers how the numbers were made and what
    risks sit behind them — policies chosen, relationships that might not be arm's length, and estimates that could
    change soon.
  why: >-
    Two companies with identical numbers can carry very different risk. If one buys all its inventory from a
    single supplier owned by the CEO, a lender needs to know. The notes surface what the face of the statements
    cannot.
  example: >-
    A restaurant group leases its headquarters from its founder's family trust at below-market rent. The rent
    expense is on the income statement, but only the related-party note tells readers that this favorable rent
    could disappear.
preQuestions: [far-nd-pre1]
keyTakeaways:
  - The summary of significant accounting policies (usually Note 1) describes principles and methods chosen where alternatives exist or that are unusual — not dollar amounts or details of accounts.
  - "Related-party disclosures: the nature of the relationship, a description of the transactions, dollar amounts, and amounts due to or from the related party. Compensation and ordinary-course expense allowances are excluded."
  - Do not state that related-party transactions were on arm's-length terms unless that claim can be substantiated.
  - "Concentrations (customers, suppliers, markets, geographic areas) are disclosed when they make the entity vulnerable to a near-term severe impact and that impact is at least reasonably possible."
  - Significant estimates are disclosed when it is reasonably possible the estimate will change materially in the near term (within one year).
citations:
  - source: FASB ASC 235-10 (Notes to Financial Statements — accounting policies)
  - source: FASB ASC 850-10 (Related Party Disclosures)
  - source: FASB ASC 275-10 (Risks and Uncertainties)
---

## Note 1: significant accounting policies

The first note usually summarizes **the accounting principles and methods of applying them** that materially affect the statements — especially where GAAP offers choices or the entity's policy is unusual or industry-specific.

| Typically in the policies note | Not in the policies note |
|---|---|
| Basis of consolidation | Composition of inventory (raw materials vs. finished goods) |
| Inventory cost method (FIFO, weighted average) | Details of a debt issue, maturities |
| Depreciation methods | Dollar amounts of depreciation expense |
| Revenue recognition policies | Specific litigation |
| Definition of cash equivalents | |

The pattern: the policies note says **how**, other notes say **how much**.

```check
far-nd-chk1
```

## Related parties

**Who is a related party?** Affiliates, entities under common control, equity-method investees, principal owners (more than 10% of voting interests), management and their immediate families, trusts for employee benefits managed by management, and any party that can significantly influence the other.

**Disclose** (ASC 850-10-50):

1. The **nature of the relationship**,
2. A **description of the transactions** (including those with nominal or no amounts) for each period presented,
3. The **dollar amounts** of transactions and the effects of any change in terms, and
4. **Amounts due to or from** related parties at the balance sheet date.

**Excluded:** compensation arrangements, expense allowances, and other similar items in the ordinary course of business — and transactions eliminated in consolidation (in the consolidated statements).

> **Trap:** A company may **not** state that a related-party transaction was on terms equivalent to an arm's-length transaction unless it can **substantiate** that claim.

```mermaid
flowchart TD
  A["Transaction with this party?"] --> B{"Related party?<br/>(affiliate, >10% owner, management & family, equity investee, common control)"}
  B -->|No| N["Ordinary disclosure rules"]
  B -->|Yes| C{"Compensation or ordinary-course expense allowance?"}
  C -->|Yes| N2["No related-party disclosure needed"]
  C -->|No| D["Disclose: relationship, description, amounts, balances due"]
```

## Risks and uncertainties (ASC 275)

Four disclosure areas:

1. **Nature of operations** — major products/services and principal markets.
2. **Use of estimates** — a statement that preparing statements under GAAP requires estimates.
3. **Certain significant estimates** — disclose when it is **at least reasonably possible** that an estimate will **change in the near term** (within one year of the statement date) and the effect would be **material**.
4. **Current vulnerability due to concentrations** — concentrations in customers, suppliers, lenders, products, markets, or geographic areas, disclosed when the concentration exists at the statement date, makes the entity vulnerable to a **near-term severe impact**, and that impact is at least reasonably possible.

Special rule: **all** concentrations of labor subject to collective bargaining agreements, and operations located outside the entity's home country, are candidates; for labor, disclose the percentage covered and whether agreements expire within one year when the vulnerability test is met.

```check
far-nd-chk2
```
