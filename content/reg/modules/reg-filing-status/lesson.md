---
id: reg-filing-status
section: REG
title: Filing status & dependents
minutes: 16
taxYear: '2025'
objectives:
  - text: Determine the correct filing status, including head of household and qualifying surviving spouse.
    skill: application
    task: Determine filing status
  - text: Determine whether a person is a qualifying child or qualifying relative.
    skill: application
    task: Determine whether a taxpayer may claim a dependent
  - text: Determine the standard deduction, including additional amounts and the limits for dependents.
    skill: application
    task: Calculate the standard deduction
bigIdea:
  what: >-
    Filing status and dependents drive almost everything else on an individual return: tax brackets, the standard
    deduction, and eligibility for credits such as the child tax credit and head-of-household rates.
  why: >-
    Status errors are among the most common return mistakes — and head-of-household status is one the IRS requires
    preparers to document under the due-diligence rules.
  example: >-
    A divorced mother pays all the costs of the home where her 10-year-old son lives all year. She files as head of
    household and claims him as a qualifying child — a lower tax rate, a bigger standard deduction, and the child
    tax credit.
preQuestions: [reg-fs-pre1]
keyTakeaways:
  - "Marital status is determined on the last day of the year (a spouse who died during the year: married for that year)."
  - "Head of household: unmarried (or considered unmarried — lived apart from the spouse for the last 6 months) at year-end, paid more than half the cost of keeping up a home that was the principal home of a qualifying person for more than half the year. A dependent parent needn't live with the taxpayer."
  - "Qualifying surviving spouse: for the 2 years after the year of the spouse's death, if the taxpayer maintains a home for a dependent child and hasn't remarried; uses joint-return rates."
  - "Qualifying child: relationship; under 19, or under 24 and a full-time student (any age if permanently disabled) and younger than the taxpayer; lived with the taxpayer more than half the year; didn't provide more than half of his or her own support; no joint return (unless only for a refund)."
  - "Qualifying relative: not anyone's qualifying child; related (or lived with the taxpayer all year as a household member); gross income below the annual limit ($5,200 for 2025); the taxpayer provides more than half of support (or a multiple support agreement: the group provides over 50%, and the claimant over 10%)."
  - "Standard deduction for 2025 (as amended by the One Big Beautiful Bill Act): $15,750 single or MFS, $31,500 MFJ or qualifying surviving spouse, $23,625 head of household; plus $2,000 (unmarried) or $1,600 (married) for each person age 65+ or blind."
  - "A dependent's standard deduction is limited to the greater of $1,350 or earned income plus $450 (not above the regular amount)."
  - "Personal exemptions are $0 (permanently eliminated)."
citations:
  - source: IRC §1, §2 (Filing status), §152 (Dependent defined), §63 (Standard deduction)
  - source: Public Law 119-21 (One Big Beautiful Bill Act, 2025)
---

## Filing status decision

```mermaid
flowchart TD
  A[Married on December 31?] -- Yes --> B{Lived apart from spouse the last 6 months, paid over half the home costs for a dependent child?}
  B -- Yes --> H[Head of household possible — considered unmarried]
  B -- No --> M[Married filing jointly or separately]
  A -- No --> C{Spouse died in one of the 2 prior years, dependent child at home, not remarried?}
  C -- Yes --> S[Qualifying surviving spouse]
  C -- No --> D{Paid over half the cost of a home for a qualifying person more than half the year?}
  D -- Yes --> H2[Head of household]
  D -- No --> SI[Single]
```

```check
reg-fs-chk1
```

## Qualifying child vs. qualifying relative

| Test | Qualifying child | Qualifying relative |
|---|---|---|
| Relationship | Child, stepchild, foster child, sibling, or a descendant of one | Broader relatives, or any household member who lived with the taxpayer all year |
| Age | Under 19, or under 24 if a full-time student (any age if disabled); younger than the taxpayer | None |
| Residency | Lived with the taxpayer more than half the year | Only for non-relatives (all year) |
| Support | Didn't provide more than half of own support | The taxpayer provides more than half (or a multiple support agreement) |
| Gross income | No limit | Less than $5,200 (2025) |

```worked
title: Who can be claimed?
scenario: |
  The Parks (married filing jointly) support several people in 2025.
steps:
  - label: Son, 22, full-time student, lived at home 9 months, earned $8,000 (didn't provide over half his support)
    work: Under 24 and a student; residency and support tests met
    result: Qualifying child — no gross income limit applies
  - label: Mrs. Park's mother, lives in her own apartment; the Parks pay 70% of her support; her gross income is $3,000 (plus nontaxable Social Security)
    work: Relative; gross income under $5,200; support over half
    result: Qualifying relative (and she needn't live with them)
  - label: A friend who lived with them all year; gross income $6,000
    work: Household member, but gross income exceeds $5,200
    result: Not a dependent
insight: Nontaxable income (such as most Social Security benefits) doesn't count toward the qualifying relative gross income limit.
```

## Standard deduction (2025)

| Filing status | Basic amount | Additional (65+ or blind, each) |
|---|---:|---:|
| Single | 15,750 | 2,000 |
| Married filing jointly / qualifying surviving spouse | 31,500 | 1,600 per spouse per condition |
| Married filing separately | 15,750 | 1,600 |
| Head of household | 23,625 | 2,000 |

For 2025–2028, individuals age 65 or older may also claim a separate deduction of up to $6,000 each (phased out at higher incomes), whether or not they itemize.

```check
reg-fs-chk2
```
