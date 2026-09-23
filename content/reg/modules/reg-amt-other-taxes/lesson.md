---
id: reg-amt-other-taxes
section: REG
title: AMT, self-employment tax & other taxes
minutes: 18
taxYear: '2025'
objectives:
  - text: Compute self-employment tax and the related deduction.
    skill: application
    task: Calculate self-employment tax
  - text: Compute AMTI and alternative minimum tax using common adjustments and preferences.
    skill: application
    task: Calculate the alternative minimum tax
  - text: Apply the net investment income tax, additional Medicare tax, kiddie tax, and estimated tax rules.
    skill: application
    task: Determine other taxes and estimated tax requirements
bigIdea:
  what: >-
    Beyond regular income tax, individuals can owe self-employment tax (Social Security and Medicare for the
    self-employed), the alternative minimum tax, the 3.8% net investment income tax, the 0.9% additional Medicare
    tax, and the kiddie tax — and they must pay during the year through withholding or estimates.
  why: >-
    These "other taxes" surprise clients: a new freelancer's first-year SE tax, an AMT bill after exercising ISOs, or
    an underpayment penalty for skipping estimates.
  example: >-
    A freelancer nets $80,000. SE tax is $80,000 × 92.35% × 15.3% ≈ $11,304, and she deducts half (≈ $5,652) for AGI.
preQuestions: [reg-ot-pre1]
keyTakeaways:
  - "Self-employment tax: net SE earnings × 92.35% × 15.3% (12.4% Social Security up to the $176,100 wage base for 2025, reduced by W-2 wages; 2.9% Medicare, no cap). Half is deductible for AGI. No SE tax if net SE earnings are under $400."
  - "Additional Medicare tax: 0.9% of wages and SE income above $200,000 (single) or $250,000 (joint). Net investment income tax: 3.8% of the lesser of net investment income or MAGI above $200,000 ($250,000 joint)."
  - "AMT: taxable income + adjustments and preferences (e.g., state and local taxes deducted, the standard deduction if taken, private activity bond interest, the ISO bargain element, depreciation differences) = AMTI; minus the exemption ($88,100 single / $137,000 joint for 2025, reduced by 25% of AMTI above $626,350 / $1,252,700); times 26%/28% = tentative minimum tax. AMT = TMT − regular tax, if positive."
  - "Kiddie tax: a child's unearned income above $2,700 (2025) is taxed at the parents' rate — children under 19, or full-time students under 24."
  - "Estimated tax: pay by April 15, June 15, September 15, and January 15. No penalty if withholding and estimates cover 90% of current-year tax or 100% of prior-year tax (110% if prior-year AGI exceeded $150,000), or the balance due is under $1,000."
citations:
  - source: IRC §1401–1402 (Self-employment tax), §3101(b)(2) (Additional Medicare tax), §1411 (Net investment income tax)
  - source: IRC §55–58 (Alternative minimum tax), §1(g) (Kiddie tax), §6654 (Estimated tax)
---

## Self-employment tax

```worked
title: SE tax for a freelancer
scenario: |
  Tara has 2025 Schedule C net profit of $80,000 and no wages.
steps:
  - label: Net earnings from self-employment
    work: 80,000 × 92.35%
    result: 73,880
  - label: SE tax
    work: 73,880 × 15.3%
    result: 11,304 (rounded)
  - label: Deduction for AGI
    work: 50% × 11,304
    result: 5,652
insight: The 92.35% factor mimics the employer's deduction for its half of FICA. If Tara also had wages, the 12.4% Social Security portion would apply only up to the wage base remaining after her wages.
```

```check
reg-ot-chk1
```

## Alternative minimum tax

```mermaid
flowchart LR
  TI[Taxable income] --> P[+ Adjustments and preferences: SALT, standard deduction, private activity bond interest, ISO spread, depreciation]
  P --> AMTI[AMTI]
  AMTI --> E[− Exemption, phased out above the threshold]
  E --> T[× 26% / 28% = tentative minimum tax]
  T --> AMT[AMT = TMT − regular tax, if positive]
```

| Adjustment or preference | Why it's added back |
|---|---|
| State and local taxes deducted | Not deductible for AMT |
| Standard deduction | Not allowed for AMT |
| Interest on private activity bonds | Taxable for AMT (a preference) |
| Bargain element on exercise of ISOs | Income for AMT (timing difference) |
| Accelerated depreciation differences | AMT uses slower methods for some property |

AMT caused by timing items (such as ISOs) creates a **minimum tax credit** that can offset regular tax in later years.

## Other taxes and estimated payments

| Tax | Rate | Threshold (2025) |
|---|---|---|
| Additional Medicare tax | 0.9% | Wages + SE income over $200,000 single / $250,000 joint |
| Net investment income tax | 3.8% | Lesser of NII or MAGI over $200,000 / $250,000 |
| Kiddie tax | Parents' rate | Child's unearned income over $2,700 |

```check
reg-ot-chk2
```
