---
id: reg-irs-procedures
section: REG
title: IRS audits, appeals & statute of limitations
minutes: 15
taxYear: '2025'
objectives:
  - text: Describe the IRS examination and appeals process, including 30-day and 90-day letters.
    skill: remembering
    task: Recall IRS examination and appeals procedures
  - text: Determine the statute of limitations for assessments and refund claims.
    skill: application
    task: Determine the applicable statute of limitations
  - text: Identify the courts available to contest a tax deficiency and the hierarchy of tax authority.
    skill: remembering
    task: Identify the sources of tax authority and litigation options
bigIdea:
  what: >-
    When the IRS disagrees with a return, a predictable sequence follows: examination, a 30-day letter offering an
    appeal, a 90-day letter (notice of deficiency), and then court. Time limits govern everything — how long the
    IRS has to assess tax and how long a taxpayer has to claim a refund.
  why: >-
    Clients panic when an IRS letter arrives. Knowing where they are in the process, which deadlines matter, and
    which court lets them litigate without paying first is some of the most valuable advice a tax professional gives.
  example: >-
    A client receives a 90-day letter proposing $30,000 more tax. If she files a Tax Court petition within 90 days,
    she can contest it without paying first. If she misses the deadline, the IRS assesses and she must pay and then
    sue for a refund.
preQuestions: [reg-irs-pre1]
keyTakeaways:
  - "Exams: correspondence (by mail), office (at an IRS office), field (at the taxpayer's place of business)."
  - "30-day letter: proposes adjustments and offers an administrative appeal (IRS Independent Office of Appeals)."
  - "90-day letter (statutory notice of deficiency): the taxpayer has 90 days (150 if addressed outside the U.S.) to petition the Tax Court without paying the tax first."
  - "Refund route: pay the tax, file a claim for refund, then sue in a U.S. District Court (jury available) or the Court of Federal Claims."
  - "Tax Court small case procedure: $50,000 or less per year in dispute; decisions can't be appealed."
  - "Assessment statute: 3 years from the later of the filing date or due date; 6 years if gross income is understated by more than 25%; unlimited for fraud or no return filed. Collection period: 10 years after assessment."
  - "Refund claims: later of 3 years from filing or 2 years from payment."
  - "Authority hierarchy: Internal Revenue Code → Treasury regulations (final, then temporary, then proposed) → revenue rulings and procedures → private letter rulings (binding only for the requesting taxpayer)."
citations:
  - source: IRC §6501 (Limitations on assessment) and §6511 (Limitations on credit or refund)
  - source: IRC §6212–6213 (Notice of deficiency; Tax Court petition)
  - source: IRC §7463 (Small tax case procedure)
---

## The path of a dispute

```mermaid
flowchart TD
  E[IRS examination] --> A{Agree?}
  A -- Yes --> P[Pay / sign agreement]
  A -- No --> L30[30-day letter: request Appeals conference]
  L30 --> AP[IRS Independent Office of Appeals]
  AP -- Unresolved --> L90[90-day letter: statutory notice of deficiency]
  L30 -- No response --> L90
  L90 --> T{Petition Tax Court within 90 days?}
  T -- Yes --> TC[Tax Court — no need to pay first]
  T -- No --> AS[IRS assesses; pay, claim refund, then sue in District Court or Court of Federal Claims]
```

| Court | Pay first? | Jury? | Appeals to |
|---|---|---|---|
| U.S. Tax Court | No | No | U.S. Court of Appeals (taxpayer's circuit) |
| U.S. District Court | Yes | Yes | U.S. Court of Appeals |
| U.S. Court of Federal Claims | Yes | No | Court of Appeals for the Federal Circuit |

```check
reg-irs-chk1
```

## Statutes of limitations

```worked
title: Can the IRS still assess?
scenario: |
  Four taxpayers filed Year 1 returns (due April 15, Year 2). Today is June 1, Year 5.
steps:
  - label: Ana filed March 1, Year 2; ordinary errors only
    work: 3 years from the due date (early returns are treated as filed on the due date) → April 15, Year 5
    result: Expired
  - label: Ben filed on time but omitted 30% of his gross income
    work: More than 25% omission → 6 years
    result: Open until April 15, Year 8
  - label: Cara filed a fraudulent return
    work: Fraud → no limit
    result: Open indefinitely
  - label: Dev filed late on October 1, Year 2
    work: 3 years from the actual filing date → October 1, Year 5
    result: Still open
insight: A return filed early is treated as filed on the due date; a late return starts the clock when it's actually filed.
```

**Refund claims:** file within the later of 3 years from when the return was filed or 2 years from when the tax was paid. The refund is limited to tax paid within the look-back period (3 years plus extensions, or 2 years).

## Sources of tax authority

| Source | Weight |
|---|---|
| Internal Revenue Code | Highest — statutory law |
| Final Treasury regulations | Force of law (legislative regulations especially) |
| Temporary regulations | Binding until replaced (expire after 3 years) |
| Proposed regulations | No authority — guidance only |
| Revenue rulings | IRS position on specific facts; can be relied on by taxpayers |
| Revenue procedures | Procedural guidance |
| Private letter rulings | Binding only for the taxpayer who requested them |

```check
reg-irs-chk2
```
