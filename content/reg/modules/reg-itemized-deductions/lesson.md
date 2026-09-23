---
id: reg-itemized-deductions
section: REG
title: Standard vs. itemized deductions & QBI
minutes: 20
taxYear: '2025'
objectives:
  - text: Compute itemized deductions for medical expenses, taxes, interest, charitable contributions, and casualty losses.
    skill: application
    task: Calculate itemized deductions
  - text: Compute the qualified business income deduction, including the threshold and W-2 wage limits.
    skill: application
    task: Calculate the qualified business income deduction
  - text: Identify the additional 2025 deductions enacted by the One Big Beautiful Bill Act.
    skill: remembering
    task: Identify deductions available whether or not a taxpayer itemizes
bigIdea:
  what: >-
    After AGI, taxpayers subtract the larger of the standard deduction or their itemized deductions, plus the
    qualified business income (QBI) deduction and certain other deductions. Each itemized category has its own floor
    or cap.
  why: >-
    Choosing standard vs. itemized, and getting each category's limit right, is core individual-tax work — and a
    frequent task-based simulation.
  example: >-
    A couple with AGI of $200,000 has $22,000 of medical bills, $18,000 of state and local taxes, $14,000 of mortgage
    interest, and $6,000 of cash gifts to charity. Medical counts only above $15,000 (7.5% of AGI) — $7,000 — so they
    itemize $45,000, more than their $31,500 standard deduction.
preQuestions: [reg-id-pre1]
keyTakeaways:
  - "Medical: unreimbursed expenses (including insurance premiums, prescriptions, and medical travel) above 7.5% of AGI."
  - "Taxes: state and local income (or sales), real property, and personal property taxes — capped at $40,000 for 2025 ($20,000 MFS), reduced for MAGI above $500,000 but not below $10,000. Foreign real property taxes aren't deductible."
  - "Interest: qualified residence acquisition debt up to $750,000 (home equity interest only if used to buy, build, or improve the home); investment interest up to net investment income (excess carries forward)."
  - "Charity: cash to public charities up to 60% of AGI; appreciated capital gain property at FMV up to 30%; private nonoperating foundations lower limits; 5-year carryforward. Written acknowledgment for gifts of $250 or more; qualified appraisal for noncash gifts over $5,000."
  - "Personal casualty losses: only in federally declared disasters — each loss reduced by $100, then total reduced by 10% of AGI."
  - "Gambling losses: up to gambling winnings. Miscellaneous itemized deductions (e.g., unreimbursed employee expenses) are permanently eliminated."
  - "QBI deduction (§199A): generally 20% of qualified business income, limited to 20% of taxable income (before the QBI deduction) minus net capital gain. Above the threshold ($197,300 single / $394,600 joint for 2025, phased in over $50,000/$100,000), the W-2 wage/property limit applies and specified service businesses phase out."
  - "2025–2028 deductions available whether or not the taxpayer itemizes: qualified tips (up to $25,000), qualified overtime premium (up to $12,500; $25,000 joint), interest on qualifying new U.S.-assembled vehicle loans (up to $10,000), and the $6,000 senior deduction — each with income phase-outs."
citations:
  - source: IRC §213 (Medical), §164 (Taxes), §163(h) (Qualified residence interest), §170 (Charitable contributions), §165(h) (Casualty losses)
  - source: IRC §199A (Qualified business income deduction)
  - source: Public Law 119-21 (One Big Beautiful Bill Act, 2025)
---

## Itemized deductions — the limits

| Category | Rule |
|---|---|
| Medical | Excess over **7.5% of AGI** |
| State and local taxes (SALT) | **$40,000** cap for 2025 ($20,000 MFS), phased down above $500,000 MAGI to no less than $10,000 |
| Home mortgage interest | Acquisition debt up to **$750,000** ($375,000 MFS) |
| Investment interest | Up to net investment income |
| Charitable — cash, public charity | **60%** of AGI |
| Charitable — capital gain property, public charity | FMV, **30%** of AGI |
| Casualty (federally declared disaster) | $100 per event, then **10% of AGI** |
| Gambling losses | Up to gambling winnings |

```worked
title: Itemize or not?
scenario: |
  The Ortegas (MFJ) have AGI of $200,000 for 2025: medical $22,000; state income tax $11,000; real estate tax
  $7,000; mortgage interest on a $500,000 acquisition loan $14,000; cash to their church $6,000.
steps:
  - label: Medical
    work: 22,000 − 7.5% × 200,000
    result: 7,000
  - label: Taxes
    work: 11,000 + 7,000 (under the $40,000 cap)
    result: 18,000
  - label: Interest
    work: Acquisition debt under $750,000
    result: 14,000
  - label: Charity
    work: Under 60% of AGI
    result: 6,000
  - label: Total vs. standard deduction
    work: 45,000 vs. 31,500
    result: Itemize 45,000
insight: Always compare the itemized total with the standard deduction for the filing status (plus any additional amounts).
```

```check
reg-id-chk1
```

## Charitable contribution details

| Property | Deduction amount |
|---|---|
| Cash | Amount given |
| Long-term capital gain property (e.g., stock held over 1 year) | Fair market value (30% of AGI limit for public charities) |
| Ordinary income or short-term property | Lesser of FMV or basis |
| Services | Not deductible (out-of-pocket costs and 14¢ per mile are) |
| Quid pro quo (e.g., a dinner) | Payment minus the value received |

## Qualified business income deduction

```worked
title: QBI below the threshold
scenario: |
  Sam, single, has Schedule C QBI of $90,000 and taxable income before the QBI deduction of $110,000, including
  $10,000 of net capital gain.
steps:
  - label: 20% of QBI
    work: 20% × 90,000
    result: 18,000
  - label: Taxable income limit
    work: 20% × (110,000 − 10,000)
    result: 20,000
  - label: QBI deduction
    work: Lesser of 18,000 or 20,000
    result: 18,000 (below the threshold, so no W-2 wage limit or SSTB limit)
insight: The QBI deduction isn't an itemized deduction — it's taken in addition to the standard deduction.
```

## 2025–2028 deductions (One Big Beautiful Bill Act)

| Deduction | Maximum | Phase-out begins (MAGI) |
|---|---|---|
| Qualified tips | $25,000 | $150,000 ($300,000 joint) |
| Qualified overtime (premium portion) | $12,500 ($25,000 joint) | $150,000 ($300,000 joint) |
| Qualified passenger vehicle loan interest (new, final assembly in the U.S.) | $10,000 | $100,000 ($200,000 joint) |
| Senior deduction (age 65+) | $6,000 per eligible individual | $75,000 ($150,000 joint) |

These are deductions from AGI available to itemizers and non-itemizers alike; the tips and overtime amounts remain in gross income (and subject to payroll taxes).

```check
reg-id-chk2
```
