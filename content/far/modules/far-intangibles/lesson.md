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

> Detailed R&D and internal-use software accounting is tested in BAR; for FAR, remember that internal development costs are expensed.

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
