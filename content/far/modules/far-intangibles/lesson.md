---
id: far-intangibles
section: FAR
title: Intangible assets & goodwill
minutes: 16
objectives:
  - text: Distinguish finite-lived from indefinite-lived intangibles and compute amortization.
    skill: application
    task: Calculate amortization of intangible assets
  - text: Determine which costs of internally developed intangibles are capitalized versus expensed.
    skill: application
    task: Identify costs to capitalize for intangible assets
  - text: Compute goodwill arising in an acquisition.
    skill: application
  - text: Determine the carrying amount of purchased software, capitalized internal-use software and cloud computing implementation costs.
    skill: application
bigIdea:
  what: >-
    Intangible assets are rights and relationships without physical substance — patents, trademarks, customer
    lists, licenses, goodwill. GAAP records them mainly when they're bought, and spreads the cost of those with
    limited lives over the years they provide benefit.
  why: >-
    Internally built brands and know-how are real but hard to measure reliably, so most of that spending is
    expensed. A purchase, in contrast, gives an objective price. Amortization then matches cost to benefit —
    except where no end to the benefit is foreseeable.
  example: >-
    A beverage company that buys a rival's famous trademark records it at the purchase price and doesn't amortize
    it (it can be renewed indefinitely). The company's own decades of brand advertising never hit the balance
    sheet.
preQuestions: [far-int-pre1]
keyTakeaways:
  - Purchased intangibles are recorded at cost (fair value in a business combination). Internally developed intangibles are generally expensed, except direct costs such as legal and registration fees.
  - Finite-lived intangibles are amortized over the shorter of legal life and useful life, usually straight-line with zero residual value, and tested for impairment under ASC 360.
  - Indefinite-lived intangibles (e.g., renewable trademarks, some licenses) are not amortized but are tested for impairment at least annually.
  - Successful legal defense costs of a patent are capitalized; unsuccessful defense costs are expensed and the patent is usually written off.
  - "Goodwill = consideration transferred (+ fair value of any noncontrolling interest) − fair value of identifiable net assets acquired. Internally generated goodwill is never recognized."
  - Start-up and organization costs are expensed as incurred.
citations:
  - source: FASB ASC 350-30 (General Intangibles Other Than Goodwill)
  - source: FASB ASC 350-20 (Goodwill)
  - source: FASB ASC 805-30-30-1 (measurement of goodwill)
  - source: FASB ASC 720-15 (Start-up costs)
---

## Getting intangibles on the books

| How obtained | Accounting |
|---|---|
| **Purchased separately** | Capitalize the cost (price plus direct costs) |
| **Acquired in a business combination** | Recognize identifiable intangibles (those arising from **contractual/legal rights** or that are **separable**) at fair value, separate from goodwill |
| **Developed internally** | Expense research, development, advertising, training, and the like. Capitalize only direct costs such as **legal and registration fees** for a patent or trademark |

> Research and development costs are expensed (ASC 730). **Software is different** — purchased software and internal-use software development costs can be capitalized, and cloud computing implementation costs follow the same rules. See *Software and cloud computing arrangements* below; FAR tests these.

## Finite vs. indefinite lives

```mermaid
flowchart TD
  A["Intangible (other than goodwill)"] --> B{"Is there a foreseeable limit<br/>to its cash-flow-generating period?"}
  B -->|Yes: finite| C["Amortize over the SHORTER of legal and useful life<br/>(pattern of benefit; straight-line if not determinable)<br/>Impairment: ASC 360 two-step test"]
  B -->|No: indefinite| D["Do not amortize<br/>Impairment: at least annually, CA vs. FV<br/>Reassess life each period"]
```

| Asset | Typical treatment |
|---|---|
| Patent | Finite: legal life 20 years from filing — often a shorter useful life |
| Copyright | Finite: author's life + 70 years, usually far shorter useful life |
| Customer list | Finite |
| Trademark / trade name (renewable at little cost, intended to renew) | **Indefinite** |
| Broadcast license renewable without substantial cost | Often indefinite |
| Franchise with a fixed term | Finite (over the term) |

If an indefinite life later becomes finite, start amortizing (after testing for impairment).

```worked
title: Patent amortization with a legal defense
scenario: |
  On January 1, Year 1, a company buys a patent for $180,000. Its remaining legal life is 15 years; the company
  expects it to be useful for 12 years. On January 1, Year 3, the company successfully defends the patent,
  paying $24,000 in legal fees. The remaining useful life is unchanged.
steps:
  - label: Annual amortization, Years 1–2
    work: 180,000 ÷ 12 (shorter of legal and useful life)
    result: 15,000 per year; carrying amount 150,000 at January 1, Year 3
  - label: Capitalize the successful defense
    work: 150,000 + 24,000
    result: 174,000
  - label: Year 3 amortization
    work: 174,000 ÷ 10 remaining years
    result: 17,400
insight: Had the defense failed, the 24,000 would be expensed — and the patent itself likely written off, since it no longer protects anything.
```

```check
far-int-chk1
```

## Goodwill

Goodwill appears **only in a business combination**, as a residual:

> Goodwill = consideration transferred + fair value of noncontrolling interest (if any) − fair value of identifiable net assets acquired

If the result is negative, it is a **bargain purchase gain** (after re-checking the measurements). Goodwill is not amortized by public companies; it's tested for impairment (see the impairment module).

```faded
title: Your turn — measuring goodwill
scenario: |
  A company pays $2,500,000 cash to acquire 100% of another company. The target's identifiable assets have a
  fair value of $3,100,000 (including a customer list valued at $200,000 that the target never recorded) and
  its liabilities have a fair value of $900,000.
steps:
  - label: Fair value of identifiable net assets
    answer: 2200000
    solution: 3,100,000 − 900,000 = 2,200,000 (the customer list is identifiable and included)
  - label: Goodwill
    answer: 300000
    solution: 2,500,000 − 2,200,000 = 300,000
  - label: Goodwill if the price had been $2,000,000 (bargain purchase gain entered as a negative)
    answer: -200000
    solution: 2,000,000 − 2,200,000 = −200,000 → no goodwill; a 200,000 bargain purchase gain in earnings
```

## Costs that are always expensed

Start-up costs (opening a new facility, entering a new market), organization costs (legal fees to incorporate), relocation, internally generated goodwill, and most advertising.

```check
far-int-chk2
```

## Software and cloud computing arrangements

**Purchased software licenses** are intangible assets: capitalize the cost and amortize it straight-line over the expected useful life, testing for impairment like other long-lived assets.

**Internal-use software** (ASC 350-40) — software developed or obtained for the entity's own use, not for sale:

| Stage | Treatment |
|---|---|
| Preliminary project (evaluating alternatives, selecting a vendor) | Expense |
| Application development (design, coding, installation, testing) | **Capitalize** external direct costs, payroll of employees working directly on the project, and interest |
| Post-implementation / operation (training, maintenance, data conversion) | Expense |

Amortize capitalized costs straight-line once the software is ready for its intended use.

> ASU 2025-06 replaces the stage model with a "probable-to-complete" threshold for fiscal years beginning after December 15, 2027. Until then, the stage model applies.

**Cloud computing arrangements (hosting).** First ask whether the contract includes a **software license** — the customer can take possession of the software without significant penalty and run it on its own or a third party's hardware.

- **Yes:** account for the license as purchased software (an intangible asset).
- **No — it is a service contract:** expense the hosting fees over the contract term. **Implementation costs** are capitalized or expensed using the same stages as internal-use software. Capitalized amounts are presented as a prepaid (not an intangible), amortized straight-line over the term of the arrangement including reasonably certain renewals, and the amortization is reported in the **same line as the hosting fees**.

```worked
title: Implementation costs of a hosted ERP system
scenario: |
  A company signs a 5-year hosting contract for an ERP system (no software license). It pays $60,000 a year in
  hosting fees. It incurs $20,000 evaluating vendors, $150,000 configuring and testing the system, and $30,000
  training staff. The system goes live on January 1.
steps:
  - label: Expensed immediately
    work: Vendor evaluation 20,000 + training 30,000
    result: 50,000
  - label: Capitalized implementation costs
    work: Configuration and testing (application development stage)
    result: 150,000
  - label: Annual amortization, reported with hosting expense
    work: 150,000 ÷ 5 years
    result: 30,000
insight: Total annual operating expense for the arrangement is 60,000 hosting + 30,000 amortization = 90,000, all in the same income statement line.
```
