---
id: aud-subsequent-events
section: AUD
title: Subsequent events & subsequently discovered facts
minutes: 16
objectives:
  - text: Identify procedures for subsequent events between the balance sheet date and the report date.
    skill: remembering
    task: Perform procedures to identify subsequent events
  - text: Apply dual dating and the auditor's responsibilities after the report date.
    skill: application
    task: Determine the report date and the effect of subsequent events on the report
  - text: Evaluate subsequently discovered facts and omitted procedures after the report is released.
    skill: evaluation
    task: Respond to subsequently discovered facts and omitted procedures
  - text: Determine whether subsequent events are properly reflected in the financial statements and the effect on the report date.
    skill: analysis
bigIdea:
  what: >-
    The auditor's duty to search for subsequent events runs from the balance sheet date to the report date. After
    that there's no duty to search, but if the auditor learns of a fact that would have changed the report, it
    must act — and the response depends on whether the report has been released.
  why: >-
    Statements are issued weeks after year-end. Events in between — a lawsuit settled, a customer bankrupt — can
    change what the year-end numbers should say or what users need to know.
  example: >-
    The report is dated March 1. On March 8, before release, the client's largest customer files for bankruptcy
    because of losses that began last year. The receivable is written down and the auditor dual-dates the report
    for that note.
preQuestions: [aud-se-pre1]
keyTakeaways:
  - "Recognized (Type I) events: conditions that existed at the balance sheet date → adjust. Nonrecognized (Type II): conditions arising after it → disclose if material."
  - "Procedures through the report date: inquire of management, read minutes, read the latest interim statements, obtain legal letters, and get written representations dated as of the report date."
  - "The report is dated no earlier than when sufficient appropriate evidence is obtained (including management's acceptance of responsibility for the final statements)."
  - "Facts learned after the report date but before release: discuss with management; if the statements are amended, either dual-date the report (\"March 1, except for Note 12, as to which the date is March 8\") — extending procedures only for that event — or re-date it, extending all subsequent-events procedures."
  - "Subsequently discovered facts (after release) that existed at the report date: determine whether the statements need revision; if management revises, issue a new report; if management won't act, notify TCWG and take steps to prevent reliance."
  - "Omitted procedures discovered after release: assess their importance; if the omission impairs the support for the opinion and people are relying on it, perform the procedures (or alternatives)."
citations:
  - source: AU-C 560 (Subsequent events and subsequently discovered facts)
  - source: AU-C 585 (Consideration of omitted procedures after the report release date)
  - source: FASB ASC 855 (Subsequent events)
---

## The timeline

```timeline
title: Auditor's responsibilities after year-end
events:
  - when: December 31
    label: Balance sheet date
  - when: Jan 1 – March 1
    label: Active search for subsequent events
    detail: Inquiry, minutes, interim statements, legal letters, representations
  - when: March 1
    label: Report date
    detail: Date sufficient appropriate evidence obtained
  - when: March 1 – March 15
    label: No duty to search, but must respond to facts that become known
    detail: Dual-date or re-date if the statements are amended
  - when: March 15
    label: Report release date
  - when: After release
    label: Subsequently discovered facts; omitted procedures
    detail: Evaluate and act; possibly a new report or steps to prevent reliance
```

```check
aud-se-chk1
```

## Dual dating vs. re-dating

```worked
title: Choosing the report date
scenario: |
  Fieldwork ends and the report is dated March 1 (Year 2). On March 8, before release, a lawsuit that arose in
  Year 1 settles for more than accrued. Management revises the accrual and Note 12.
steps:
  - label: Option 1 — dual date
    work: "March 1, Year 2, except for Note 12, as to which the date is March 8, Year 2"
    result: Subsequent-events responsibility extends to March 8 only for Note 12
  - label: Option 2 — re-date
    work: Date the report March 8
    result: Subsequent-events procedures must be extended through March 8 for all events
insight: Dual dating limits the extra work; re-dating extends responsibility for everything.
```

## After the report is released

```mermaid
flowchart TD
  F[Auditor learns of a fact that existed at the report date] --> Q{Would it have affected the report?}
  Q -- No --> N[No action needed]
  Q -- Yes --> M[Discuss with management; determine whether statements need revision]
  M --> R{Management revises?}
  R -- Yes --> NR[Perform procedures on the revision; issue a new report with an emphasis-of-matter or other-matter paragraph]
  R -- No --> P[Notify those charged with governance; take steps to prevent reliance — e.g., notify regulators and known users; consider legal advice]
```

```check
aud-se-chk2
```

## Reviewing management's treatment of subsequent events

For each event, ask **when the underlying condition arose**:

- **Existed at the balance sheet date** (customer already in financial difficulty, a lawsuit about a prior-year event): adjust, for only the *incremental* amount beyond what was already recorded.
- **Arose after the balance sheet date** (a new competitor's price cut, a fire, a stock issuance): no adjustment; disclose if material.

Common management errors: accruing the full settlement instead of the increase over the existing accrual, and writing down assets for post-year-end declines. When management adds a disclosure after the report date but before release, the auditor either **dual-dates** the report for that note or **re-dates** it and extends the subsequent-events procedures to the new date.
