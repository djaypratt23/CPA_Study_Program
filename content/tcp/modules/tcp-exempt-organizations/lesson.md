---
id: tcp-exempt-organizations
section: TCP
title: Tax-exempt organizations & UBTI
minutes: 18
taxYear: '2025'
objectives:
  - text: Determine the requirements for §501(c)(3) status and distinguish public charities from private foundations.
    skill: remembering
    task: Recall requirements for tax-exempt status
  - text: Determine which Form 990 series return an organization must file and when.
    skill: application
    task: Determine exempt organization filing requirements
  - text: Compute unrelated business taxable income and identify the common exclusions.
    skill: application
    task: Calculate unrelated business taxable income
bigIdea:
  what: >-
    An exempt organization pays no income tax on income from its mission, but it isn't tax-free on everything.
    Income from a trade or business that is regularly carried on and unrelated to the exempt purpose (UBTI) is
    taxed at corporate rates, so exempt organizations don't get an unfair edge over taxable businesses.
  why: >-
    TCP tests the filing requirements (990, 990-EZ, 990-N, 990-T), the UBTI definition and exclusions, and the
    rules that keep insiders from benefiting.
  example: >-
    A museum's gift shop sells reproductions of its art (related — exempt) and also runs a public parking garage
    every day with paid staff (unrelated — UBTI).
preQuestions: [tcp-eo-pre1]
keyTakeaways:
  - "§501(c)(3): organized and operated exclusively for charitable, religious, educational, scientific, or similar purposes; no private inurement; no substantial lobbying; no political campaign activity. Apply on Form 1023 (or 1023-EZ for small organizations) within 27 months of formation for retroactive exemption."
  - "Public charity vs private foundation: public charities have broad public support (e.g., one-third of support from the public); private foundations pay a 1.39% excise tax on net investment income, must distribute about 5% of assets annually, and face self-dealing rules."
  - "Annual returns: Form 990-N (e-postcard) if gross receipts are normally $50,000 or less; Form 990-EZ if gross receipts < $200,000 and total assets < $500,000; otherwise Form 990. Private foundations file Form 990-PF. Churches are exempt from filing."
  - "Due date: 15th day of the 5th month after year-end (May 15 for calendar-year organizations); 6-month extension. Failure to file for 3 consecutive years automatically revokes exemption."
  - "UBTI: income from a trade or business, regularly carried on, not substantially related to the exempt purpose. Taxed at 21% (corporations) or trust rates; $1,000 specific deduction; Form 990-T if gross UBI is $1,000 or more."
  - "UBTI exclusions: dividends, interest, royalties, most rents from real property, and capital gains (unless debt-financed); businesses run by volunteers; sales of donated goods; activities for the convenience of members, students, or employees; qualified sponsorship payments."
  - "Losses from one unrelated trade or business can't offset income from another (the silo rule, §512(a)(6))."
  - "Intermediate sanctions (§4958): excess benefit transactions with disqualified persons — 25% tax on the person (200% if not corrected) and 10% on managers who knowingly approve."
citations:
  - source: IRC §501(c)(3), §509 (Private foundation defined), §4940 (Excise tax on investment income), §4958 (Excess benefit transactions)
  - source: IRC §511–§514 (Unrelated business income, including debt-financed property); §6033 (Returns by exempt organizations)
---

## Which return?

```mermaid
flowchart TD
  A[Exempt organization] --> B{Private foundation?}
  B -->|Yes| PF[Form 990-PF]
  B -->|No| C{Gross receipts normally ≤ $50,000?}
  C -->|Yes| N[Form 990-N]
  C -->|No| D{Receipts < $200,000 AND assets < $500,000?}
  D -->|Yes| EZ[Form 990-EZ or 990]
  D -->|No| F[Form 990]
  A --> U{Gross UBI ≥ $1,000?}
  U -->|Yes| T[Also Form 990-T]
```

```check
tcp-eo-chk1
```

## Unrelated business taxable income

```worked
title: UBTI with exclusions
scenario: |
  A §501(c)(3) hospital reports: a public pharmacy selling to walk-in customers, gross profit $90,000 and direct
  expenses $30,000; dividends on its endowment $50,000; a thrift shop selling donated clothing, profit $20,000;
  and an annual volunteer-run fundraiser, profit $8,000.
steps:
  - label: Unrelated business (public pharmacy)
    work: 90,000 − 30,000
    result: 60,000
  - label: Excluded items
    work: Dividends (passive), donated goods, volunteer-run activity
    result: 0
  - label: Specific deduction
    work: − 1,000
    result: 59,000 UBTI
  - label: Tax (corporate rate)
    work: 21% × 59,000
    result: 12,390 — file Form 990-T
insight: Ask three questions — trade or business? regularly carried on? substantially related? A "no" to any means no UBTI.
```

```faded
title: Your turn — debt-financed property
scenario: |
  A university owns an office building (not used for exempt purposes) with average acquisition indebtedness of
  $600,000 and average adjusted basis of $1,500,000. Net rental income is $100,000.
steps:
  - label: Debt/basis percentage
    answer: 40
    solution: 600,000 ÷ 1,500,000 = 40%
  - label: Debt-financed income included in UBTI
    answer: 40000
    hint: Rents are normally excluded, but not the debt-financed share
    solution: 40% × 100,000 = 40,000
```

```check
tcp-eo-chk2
```
