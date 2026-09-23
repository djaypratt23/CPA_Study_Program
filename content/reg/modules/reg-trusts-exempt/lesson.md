---
id: reg-trusts-exempt
section: REG
title: Trusts, estates, gift tax & tax-exempt organizations (overview)
minutes: 17
taxYear: '2025'
objectives:
  - text: Identify how trusts and estates are taxed, including distributable net income and simple vs. complex trusts.
    skill: remembering
    task: Recall the taxation of fiduciary entities
  - text: Compute taxable gifts using the annual exclusion, gift splitting, and the marital and charitable deductions.
    skill: application
    task: Calculate taxable gifts
  - text: Determine the requirements for tax-exempt status and when unrelated business income is taxed.
    skill: application
    task: Determine unrelated business taxable income
bigIdea:
  what: >-
    Trusts and estates are taxpayers too, but they get a deduction for income distributed to beneficiaries (limited
    by distributable net income), so income is taxed once. Gifts of property are subject to a separate transfer tax,
    softened by the annual exclusion and a large lifetime exemption. Charities are exempt — except on unrelated
    business income.
  why: >-
    REG tests these at an overview level: who pays tax on trust income, how much of a gift is taxable, and whether a
    charity's side business owes tax.
  example: >-
    A father gives each of his two children $50,000 in 2025, and his wife elects to split gifts. Each spouse is
    treated as giving $25,000 to each child; after the $19,000 annual exclusions, the taxable gifts are $6,000 per
    child per spouse — covered by their lifetime exemptions, so no gift tax is paid, but Form 709 is required.
preQuestions: [reg-te-pre1]
keyTakeaways:
  - "Form 1041: estates and trusts with gross income of $600 or more. Exemptions: estate $600, simple trust $300, complex trust $100. Trust tax brackets are highly compressed (the top 37% rate applies at a low level of income)."
  - "Simple trust: must distribute all income currently, makes no charitable contributions, and doesn't distribute principal. Otherwise it's a complex trust."
  - "Distributable net income (DNI) caps the distribution deduction and the amount taxable to beneficiaries; income keeps its character (e.g., tax-exempt interest)."
  - "Grantor trusts (e.g., revocable trusts) are ignored — the grantor is taxed on the income."
  - "Gift tax (2025): annual exclusion $19,000 per donee (present-interest gifts); gift splitting between spouses; unlimited marital deduction (U.S. citizen spouse) and charitable deduction; tuition and medical expenses paid directly to the provider are excluded. Form 709 is due April 15."
  - "Lifetime unified exemption: $13,990,000 for 2025 (rising to $15,000,000 in 2026 under the One Big Beautiful Bill Act). Estate tax applies to the taxable estate after the marital, charitable, debt, and expense deductions."
  - "501(c)(3) organizations: organized and operated exclusively for exempt purposes; no private inurement; no political campaign activity; limited lobbying. Annual information returns (Form 990, 990-EZ, or 990-N) are due the 15th day of the 5th month."
  - "Unrelated business taxable income: income from a trade or business regularly carried on and not substantially related to the exempt purpose. Excluded: dividends, interest, royalties, most real property rents (unless debt-financed), activities run by volunteers, and sales of donated goods. There's a $1,000 specific deduction; Form 990-T is required if gross UBI is $1,000 or more."
citations:
  - source: IRC §641–§692 (Estates and trusts), §671–§679 (Grantor trusts)
  - source: IRC §2501–§2524 (Gift tax), §2010 (Unified credit), §2001–§2056 (Estate tax)
  - source: IRC §501(c)(3), §511–§514 (Unrelated business income)
---

## Trusts and estates

| Type | Distributions | Exemption |
|---|---|---|
| Estate | As the executor decides | $600 |
| Simple trust | All income must be distributed; no charity; no principal distributions | $300 |
| Complex trust | May accumulate income, make charitable gifts, or distribute principal | $100 |
| Grantor trust | Ignored for income tax — the grantor reports the income | — |

The trust deducts distributions to beneficiaries up to DNI, and beneficiaries report those amounts with the same character (dividends, tax-exempt interest, and so on).

```check
reg-te-chk1
```

## Gift tax

```worked
title: Computing taxable gifts
scenario: |
  In 2025, Rosa (married; her husband consents to gift splitting) gives: $60,000 cash to her son; stock worth
  $100,000 to her husband; $30,000 to a public charity; and pays $40,000 of her granddaughter's tuition directly to
  the university.
steps:
  - label: Gift to son, split
    work: 30,000 from each spouse − 19,000 annual exclusion each
    result: 11,000 taxable gift for Rosa (and 11,000 for her husband)
  - label: Gift to husband
    work: Unlimited marital deduction
    result: 0
  - label: Gift to charity
    work: Charitable deduction
    result: 0
  - label: Tuition paid directly
    work: Excluded
    result: 0
  - label: Tax due
    work: 11,000 is sheltered by Rosa's lifetime exemption
    result: No gift tax, but Form 709 is required (a taxable gift and gift splitting)
insight: The annual exclusion applies per donee per donor — gift splitting lets a couple give $38,000 per donee tax-free.
```

## Tax-exempt organizations and UBTI

```worked
title: Is it unrelated business income?
scenario: |
  A 501(c)(3) art museum has several revenue sources.
steps:
  - label: Admission fees and art classes
    work: Substantially related to the exempt purpose
    result: Not UBTI
  - label: A gift shop staffed by volunteers
    work: Volunteer exception
    result: Not UBTI
  - label: A for-profit restaurant open to the public, run by paid staff
    work: Regularly carried on; not substantially related
    result: UBTI — taxed at corporate rates after the $1,000 specific deduction
  - label: Dividends from its endowment
    work: Passive income exclusion
    result: Not UBTI
insight: The three-part test — trade or business, regularly carried on, not substantially related — must all be met for UBTI.
```

```check
reg-te-chk2
```
