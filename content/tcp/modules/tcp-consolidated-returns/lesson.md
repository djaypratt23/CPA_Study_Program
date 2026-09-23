---
id: tcp-consolidated-returns
section: TCP
title: Consolidated returns (overview)
minutes: 15
taxYear: '2025'
objectives:
  - text: Determine whether corporations form an affiliated group eligible to file a consolidated return.
    skill: application
    task: Determine eligibility to file a consolidated return
  - text: Explain the treatment of intercompany transactions, intercompany dividends, and group NOLs.
    skill: application
    task: Apply consolidated return adjustments
  - text: Evaluate the advantages and disadvantages of electing to file a consolidated return.
    skill: analysis
    task: Analyze whether to file a consolidated return
bigIdea:
  what: >-
    An affiliated group of corporations can elect to file one consolidated return, reporting the group as if it
    were a single company. Losses of one member offset income of another, and profits on sales between members are
    deferred until the property leaves the group.
  why: >-
    TCP asks whether a group qualifies (80% vote and value through a common parent) and what happens to
    intercompany items and losses.
  example: >-
    A parent owns 100% of a startup subsidiary that loses $2 million. On a consolidated return, that loss offsets
    the parent's profits immediately instead of waiting in the subsidiary for future income.
preQuestions: [tcp-cr-pre1]
keyTakeaways:
  - "Affiliated group (§1504): a common parent that is an includible corporation directly owns at least 80% of the total voting power AND 80% of the total value of at least one other includible corporation, and each member is 80%-owned by other members."
  - "Not includible: tax-exempt organizations, foreign corporations, insurance companies (with exceptions), REITs, RICs, and S corporations."
  - "Election: the first consolidated return, with Form 851 (affiliations schedule) and Form 1122 (consent of each subsidiary). Once made, it continues unless the IRS permits discontinuance."
  - "All members must use the parent's tax year."
  - "Intercompany transactions: gain or loss on sales between members is deferred until the property is sold outside the group (or the members separate)."
  - "Intercompany dividends are eliminated (they don't produce income or a DRD)."
  - "Group NOLs offset consolidated taxable income; separate return limitation year (SRLY) rules limit use of losses a member brought into the group. Consolidated charitable limit and capital gains are computed for the group."
  - "Advantages: offsetting losses, deferring intercompany gains, no tax on intercompany dividends. Disadvantages: losses on intercompany sales are also deferred, a binding election, and compliance cost."
citations:
  - source: IRC §1501 (Privilege to file consolidated returns), §1504 (Affiliated group defined)
  - source: Treas. Reg. §1.1502-13 (Intercompany transactions); Forms 851 and 1122
---

## Who can join

```mermaid
flowchart TD
  P[Parent: includible domestic C corporation] -->|≥ 80% vote AND ≥ 80% value| S1[Sub 1]
  P -->|60%| S2[Sub 2]
  S1 -->|30%| S2
  S2 --> Q{Combined 90% owned by members}
  Q --> Y[Sub 2 is in the group]
```

```check
tcp-cr-chk1
```

```worked
title: Intercompany sale
scenario: |
  Parent sells land (basis $100,000) to its 100% subsidiary for $160,000 in 2025. In 2027, the subsidiary sells
  the land to an unrelated buyer for $190,000. The group files consolidated returns.
steps:
  - label: 2025 gain recognized by the group
    work: Parent's 60,000 intercompany gain is deferred
    result: 0
  - label: Subsidiary's gain in 2027
    work: 190,000 − 160,000
    result: 30,000
  - label: Parent's deferred gain taken into account in 2027
    work: 60,000
    result: 60,000
  - label: Total group gain in 2027
    work: 30,000 + 60,000
    result: 90,000 — the same as if the parent had sold the land outside the group directly
insight: Consolidation treats the group like one company — nothing is recognized until the property leaves the group.
```

```check
tcp-cr-chk2
```

## Consolidated taxable income

- Combine each member's separate taxable income (with intercompany items deferred and intercompany dividends eliminated).
- Apply group-level items: consolidated NOL, capital gains and losses, §1231, charitable contributions (10% of consolidated TI), and the DRD for dividends from outside the group.
- One 21% tax on the total.
