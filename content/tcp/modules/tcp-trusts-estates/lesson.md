---
id: tcp-trusts-estates
section: TCP
title: 'Trusts & estates: fiduciary income tax'
minutes: 20
taxYear: '2025'
objectives:
  - text: Compute distributable net income (DNI) and the income distribution deduction for simple and complex trusts and estates.
    skill: application
    task: Calculate DNI and the distribution deduction
  - text: Determine the taxable income of a trust or estate, including the exemption and the compressed rate brackets.
    skill: application
    task: Calculate fiduciary taxable income
  - text: Determine filing requirements and planning tools (the 65-day election, fiscal year for estates, grantor trust rules).
    skill: remembering
    task: Recall fiduciary return requirements
bigIdea:
  what: >-
    A trust or estate is a separate taxpayer, but it acts like a conduit: it deducts what it distributes, and the
    beneficiaries pay tax on it. DNI is the ceiling that keeps the income from being taxed twice and carries the
    character of the income (tax-exempt, dividends) out to the beneficiaries.
  why: >-
    Fiduciary tax brackets reach 37% at only $15,650 of taxable income (2025), so distributing income to
    beneficiaries in lower brackets is a core planning move.
  example: >-
    A simple trust earns $40,000 of interest and must distribute all income. It deducts $40,000, pays no tax, and
    the beneficiary reports $40,000 on her own return.
preQuestions: [tcp-te-pre1]
keyTakeaways:
  - "Form 1041 is required when gross income is $600 or more (or any taxable income, or a nonresident alien beneficiary). Due the 15th day of the 4th month after year-end (April 15 for calendar-year trusts); 5½-month extension."
  - "Simple trust: must distribute all income currently, no charitable gifts, no corpus distributions this year; exemption $300. Complex trust: exemption $100. Estate: exemption $600."
  - "DNI (simplified) = taxable income before the distribution deduction and exemption + tax-exempt interest (net of allocable expenses) − capital gains allocated to corpus."
  - "Distribution deduction = lesser of (distributions required and made) or DNI, excluding the tax-exempt portion."
  - "Capital gains allocated to corpus are taxed to the trust (not in DNI) unless distributed or required to be distributed."
  - "2025 fiduciary brackets: 10% up to $3,150; 24% to $11,450; 35% to $15,650; 37% above. NIIT applies to undistributed NII above $15,650."
  - "Estates may choose a fiscal year; trusts generally must use a calendar year. The 65-day election treats distributions made within 65 days after year-end as made in the prior year."
  - "Grantor trust (e.g., revocable trust or grantor retains certain powers): income is taxed to the grantor, not the trust."
citations:
  - source: IRC §641–§663 (Estates, trusts, and beneficiaries), §643(a) (DNI), §651 and §661 (Distribution deductions), §663(b) (65-day rule)
  - source: IRC §671–§679 (Grantor trusts); Rev. Proc. 2024-40 (2025 rates); Form 1041 instructions
---

## DNI: the ceiling and the character

```worked
title: Simple trust
scenario: |
  A simple trust has: taxable interest $30,000; qualified dividends $10,000; tax-exempt interest $6,000; long-term
  capital gain $20,000 (allocated to corpus); trustee fees $4,000 (allocated to income). Assume $1,000 of the fee is
  allocable to tax-exempt income. It distributes all accounting income ($42,000) to the beneficiary.
steps:
  - label: Taxable income before the distribution deduction and exemption
    work: 30,000 + 10,000 + 20,000 − 3,000 deductible fees
    result: 57,000
  - label: DNI
    work: 57,000 + (6,000 − 1,000) net tax-exempt − 20,000 capital gain
    result: 42,000
  - label: Distribution deduction (exclude the tax-exempt part)
    work: Lesser of 42,000 distributed or 42,000 DNI, − 5,000 tax-exempt
    result: 37,000
  - label: Trust taxable income
    work: 57,000 − 37,000 − 300 exemption
    result: 19,700 (the capital gain, less the exemption)
insight: The beneficiary reports 42,000 with its character — 5,000 tax-exempt, and the rest split between interest and dividends.
```

```check
tcp-te-chk1
```

## Complex trusts and planning

```faded
title: Your turn — a complex trust distribution
scenario: |
  A complex trust has DNI of $50,000 (all taxable interest; no tax-exempt income or capital gains). The trustee
  distributes $30,000 during the year and nothing else.
steps:
  - label: Distribution deduction
    answer: 30000
    solution: Lesser of 30,000 distributed or 50,000 DNI
  - label: Trust taxable income
    answer: 19900
    hint: Subtract the complex trust exemption
    solution: 50,000 − 30,000 − 100 = 19,900
  - label: Additional distribution needed to reduce taxable income to zero (ignoring the exemption)
    answer: 20000
    solution: 50,000 − 30,000 = 20,000 — can be paid within 65 days after year-end under §663(b)
```

```check
tcp-te-chk2
```

| | Simple trust | Complex trust | Estate |
|---|---|---|---|
| Must distribute all income | Yes | No | No |
| Charitable deduction | No | Yes | Yes |
| Exemption | $300 | $100 | $600 |
| Tax year | Calendar | Calendar | Calendar or fiscal |
