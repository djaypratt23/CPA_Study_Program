---
id: far-subsequent-events
section: FAR
title: Subsequent events
minutes: 12
objectives:
  - text: Distinguish recognized (Type I) from nonrecognized (Type II) subsequent events.
    skill: application
    task: Identify and account for subsequent events
  - text: Determine the evaluation period and required disclosures for SEC filers and other entities.
    skill: remembering
bigIdea:
  what: >-
    Events happen between the balance sheet date and the day the statements go out. If an event reveals more about
    a condition that already existed at year-end, adjust the numbers. If it's a new condition that arose after
    year-end, leave the numbers alone and disclose it if it matters.
  why: >-
    The balance sheet is a picture of one date. New evidence about that date should sharpen the picture; brand-new
    events belong to the next picture — but readers still need to hear about big ones before relying on stale
    statements.
  example: >-
    In January, a customer that was already failing at December 31 files for bankruptcy: adjust the allowance at
    year-end. A warehouse burns down in February: don't adjust — disclose the loss.
preQuestions: [far-se-pre1]
keyTakeaways:
  - "Recognized (Type I): evidence about conditions that existed at the balance sheet date → adjust the statements (e.g., settling a lawsuit for an amount different from the accrual; a customer's bankruptcy from a deteriorating condition)."
  - "Nonrecognized (Type II): conditions that arose after the balance sheet date → no adjustment; disclose if material (e.g., casualty loss, issuing stock or debt, business combination, market-value declines after year-end)."
  - SEC filers evaluate subsequent events through the date the statements are issued and do not disclose that date. Other entities evaluate through the date the statements are available to be issued and disclose that date.
  - Stock dividends and splits after year-end but before issuance are reflected retroactively in EPS and share data.
  - Material nonrecognized events may warrant pro forma information.
citations:
  - source: FASB ASC 855-10 (Subsequent Events)
  - source: FASB ASC 260-10-55-12 (stock dividends/splits after the balance sheet date)
---

## The timeline

```timeline
title: Two windows, two treatments
events:
  - { when: Dec 31, label: Balance sheet date }
  - { when: Jan–Feb, label: 'Subsequent events window', detail: 'Evaluate everything that happens here' }
  - { when: Mar 1, label: 'Statements issued (SEC filer) or available to be issued (others)' }
```

## Type I vs. Type II

```mermaid
flowchart TD
  A["Event after the balance sheet date, before issuance"] --> B{"Did the underlying condition exist at the balance sheet date?"}
  B -->|Yes| C["Recognized (Type I): ADJUST the statements"]
  B -->|No| D["Nonrecognized (Type II): do NOT adjust; DISCLOSE if material"]
```

| Event after December 31 | Type | Treatment |
|---|---|---|
| Lawsuit (event occurred before year-end) settled for more than accrued | I | Adjust the liability and expense |
| Major customer files bankruptcy due to a condition that worsened over months | I | Adjust the allowance for credit losses |
| Inventory sold after year-end below its carrying amount due to year-end obsolescence | I | Adjust inventory to NRV |
| Fire destroys a plant | II | Disclose |
| Customer's bankruptcy caused by a flood after year-end | II | Disclose |
| Issuance of bonds or stock; business combination | II | Disclose |
| Decline in market value of investments after year-end | II | Disclose |
| Lawsuit arising from an event after year-end | II | Disclose |

```check
far-se-chk1
```

## How long do you look?

| Entity | Evaluate through | Disclose the date? |
|---|---|---|
| SEC filer | Date statements are **issued** | No |
| All others | Date statements are **available to be issued** | **Yes** — and whether that's the issued or available-to-be-issued date |

```faded
title: Your turn — adjust or not?
scenario: |
  A company accrued $300,000 at December 31 for a lawsuit over an accident that happened in October. On
  February 5, before issuance, it settles for $420,000. On February 10 a flood destroys $250,000 of uninsured
  inventory. Enter the amount to add to the December 31 accrued liability for each (0 if none).
steps:
  - label: Adjustment for the lawsuit settlement
    answer: 120000
    solution: Condition (the accident) existed at year-end → Type I. Increase the liability to 420,000 (+120,000).
  - label: Adjustment for the flood
    answer: 0
    solution: The flood arose after year-end → Type II. No adjustment; disclose the 250,000 loss.
```

```check
far-se-chk2
```
