---
id: far-revenue-contracts
section: FAR
title: 'Revenue I: contracts & performance obligations'
minutes: 18
objectives:
  - text: Explain the five-step revenue model and apply the criteria for a contract with a customer (Step 1).
    skill: application
    task: Identify contracts with customers
  - text: Identify distinct performance obligations, including warranties and customer options (Step 2).
    skill: application
    task: Identify performance obligations in a contract
  - text: Determine whether an entity is a principal (gross) or an agent (net).
    skill: analysis
bigIdea:
  what: >-
    Revenue is recognized when a company transfers control of promised goods or services to a customer, in the
    amount it expects to be entitled to. The five-step model breaks that into: find the contract, find the
    promises, price the deal, split the price across the promises, and recognize each piece when it's delivered.
  why: >-
    Before ASC 606, revenue rules differed by industry and transaction. One control-based model makes revenue
    comparable across companies — and it forces a company selling a bundle (a phone plus two years of service)
    to recognize each part when that part is actually delivered.
  example: >-
    A gym sells a $1,200 annual membership that includes a free personal-training session worth $100. The
    membership and the session are separate promises, so part of the $1,200 is recognized when the session is
    delivered and the rest over the year.
preQuestions: [far-rev1-pre1]
keyTakeaways:
  - "Five steps: (1) identify the contract, (2) identify performance obligations, (3) determine the transaction price, (4) allocate it, (5) recognize revenue when (or as) each obligation is satisfied."
  - "Contract criteria: approved and committed parties, identifiable rights, identifiable payment terms, commercial substance, and collection of substantially all consideration is probable."
  - A good or service is distinct if the customer can benefit from it on its own (or with readily available resources) AND the promise is separately identifiable within the contract.
  - Assurance-type warranties (product works as promised) are not separate obligations — accrue the cost. Service-type warranties (extra coverage, often sold separately) are separate performance obligations.
  - An option for additional goods at a discount the customer wouldn't otherwise get (a material right) is a separate performance obligation.
  - "Principal (controls the good before transfer) → gross revenue. Agent (arranges for another party to provide it) → net commission."
citations:
  - source: FASB ASC 606-10-25-1 to 25-8 (Identifying the contract)
  - source: FASB ASC 606-10-25-14 to 25-22 (Identifying performance obligations)
  - source: FASB ASC 606-10-55-30 to 55-35 (Warranties)
  - source: FASB ASC 606-10-55-36 to 55-40 (Principal versus agent)
---

## The five steps at a glance

```mermaid
flowchart LR
  S1["1. Identify the contract"] --> S2["2. Identify performance obligations"]
  S2 --> S3["3. Determine the transaction price"]
  S3 --> S4["4. Allocate the price to obligations"]
  S4 --> S5["5. Recognize revenue when/as each is satisfied"]
```

This module covers Steps 1–2; the next covers Steps 3–5.

## Step 1 — Is there a contract?

A contract (written, oral, or implied by customary practice) is accounted for under ASC 606 only if **all five** are met:

1. The parties have **approved** it and are committed to perform,
2. Each party's **rights** can be identified,
3. **Payment terms** can be identified,
4. It has **commercial substance**, and
5. It is **probable** the entity will collect substantially all of the consideration it's entitled to.

If the criteria aren't met, cash received is recorded as a **liability** until they are met, the contract is terminated, or the entity has no remaining obligations and substantially all consideration is received and nonrefundable.

Contracts entered at or near the same time with the same customer are **combined** if they're negotiated as a package, the price of one depends on the other, or the goods are a single obligation.

```check
far-rev1-chk1
```

## Step 2 — What did we promise?

A promise is a separate **performance obligation** if the good or service is **distinct**:

```mermaid
flowchart TD
  A["Promised good or service"] --> B{"Capable of being distinct?<br/>Customer can benefit on its own or with readily available resources"}
  B -->|No| C["Combine with other promises"]
  B -->|Yes| D{"Distinct within the context of the contract?<br/>Not an input to a combined output, not significantly modified/customized, not highly interdependent"}
  D -->|No| C
  D -->|Yes| E["Separate performance obligation"]
```

**Examples**

| Contract | Performance obligations |
|---|---|
| Sell standard software + 2 years of updates + installation any IT firm could do | **Three**: software, updates, installation |
| Build a custom factory: design, materials, construction | **One**: the company integrates them into a single output |
| Sell a car with a standard 3-year manufacturer warranty | **One** (assurance warranty — accrue its cost) |
| Sell a car + optional 5-year extended warranty | **Two**: the car and the service-type warranty |
| Sell a phone with a voucher for 50% off future accessories (not offered to others) | **Two**: the phone and a **material right** |

### Principal or agent?

Ask: **does the company control the good or service before it's transferred to the customer?** Indicators of control: primary responsibility for fulfillment, inventory risk, discretion in setting the price.

- **Principal** → revenue = gross amount billed; cost of sales separately.
- **Agent** → revenue = the **net** fee or commission.

```worked
title: Gross or net?
scenario: |
  An online travel site sells a hotel room to a traveler for $300. It never commits to buy rooms in advance; the
  hotel is responsible for the stay and sets a minimum price; the site keeps $45 and remits $255 to the hotel.
steps:
  - label: Who controls the room before the guest gets it?
    work: The site has no inventory risk and isn't responsible for providing the stay.
    result: The hotel does — the site is an agent
  - label: Revenue recognized by the site
    work: Net commission
    result: 45 (not 300)
insight: If the site pre-purchased blocks of rooms at its own risk and set prices, it would likely be the principal and report 300 of revenue with 255 of cost.
```

```check
far-rev1-chk2
```
