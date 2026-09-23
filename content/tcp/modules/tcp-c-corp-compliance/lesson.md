---
id: tcp-c-corp-compliance
section: TCP
title: C corporation returns, Schedule M-1/M-3 & estimated tax
minutes: 20
taxYear: '2025'
objectives:
  - text: Prepare the book-to-tax reconciliation on Schedule M-1 and determine when Schedule M-3 is required.
    skill: application
    task: Reconcile book income to taxable income on Schedule M-1
  - text: Determine corporate estimated tax requirements, including the large-corporation rules and filing deadlines.
    skill: application
    task: Calculate corporate estimated tax payments
  - text: Identify when the accumulated earnings tax, personal holding company tax, or corporate AMT may apply.
    skill: remembering
    task: Recall corporate penalty taxes and the corporate AMT
bigIdea:
  what: >-
    A corporate return (Form 1120) starts from the books. Schedule M-1 (or M-3 for large corporations) explains
    every difference between book income and taxable income, and Schedule M-2 reconciles retained earnings.
    Compliance adds deadlines, quarterly estimates, and a handful of penalty taxes designed to stop corporations
    from being used to avoid shareholder-level tax.
  why: >-
    The M-1 reconciliation is one of the most common TCP simulations. You'll also be asked whether a
    corporation's estimates were enough and which schedules it must file.
  example: >-
    A corporation's books show $1,000,000 of income, including $30,000 of municipal interest and $250,000 of
    federal tax expense. On Schedule M-1, the tax expense is added back and the municipal interest subtracted.
preQuestions: [tcp-cc-pre1]
keyTakeaways:
  - "Form 1120 due: 15th day of the 4th month after year-end (April 15 for calendar-year corporations); 6-month extension (Form 7004). Tax is due by the original date."
  - "Schedule M-1: book net income → + federal income tax, + excess capital losses, + income taxed but not booked, + expenses booked but not deductible (fines, 50% of meals, excess charitable contributions, life insurance premiums) − income booked but not taxable (municipal interest, life insurance proceeds) − deductions not charged to books = taxable income before NOL and special deductions."
  - "Schedule M-3 is required when total assets are $10 million or more; it separates permanent and temporary differences. Corporations with total receipts and total assets under $250,000 can skip Schedules L, M-1, and M-2."
  - "Schedule M-2 reconciles unappropriated retained earnings: beginning + net income − distributions ± other = ending."
  - "Estimated tax: 25% of the required annual payment by the 15th day of the 4th, 6th, 9th, and 12th months; required if tax is $500 or more. Safe harbor: lesser of 100% of current-year tax or 100% of prior-year tax (the prior-year option requires a 12-month prior year with positive tax)."
  - "Large corporation ($1 million+ of taxable income in any of the 3 prior years): may use prior-year tax only for the first installment; must catch up in the second."
  - "Accumulated earnings tax: 20% of accumulated taxable income retained beyond reasonable business needs (minimum credit $250,000; $150,000 for personal service corporations). Personal holding company tax: 20% of undistributed PHC income when 60%+ of adjusted ordinary gross income is passive and 5 or fewer individuals own over 50%."
  - "Corporate AMT: 15% of adjusted financial statement income for corporations with average annual AFSI over $1 billion."
citations:
  - source: IRC §6072 (Corporate return due date), §6655 (Corporate estimated tax)
  - source: IRC §531–§537 (Accumulated earnings tax), §541–§547 (Personal holding company tax), §55(b)(2) (Corporate AMT)
  - source: Form 1120 instructions, Schedules M-1, M-2, M-3
---

## Schedule M-1 layout

| Line | Item | Direction |
|---|---|---|
| 1 | Net income per books | Start |
| 2 | Federal income tax per books | + |
| 3 | Excess of capital losses over capital gains | + |
| 4 | Income subject to tax not recorded on books (e.g., prepaid rent received) | + |
| 5 | Expenses on books not deducted (fines, 50% of meals, excess charity, book depreciation over tax, life insurance premiums) | + |
| 7 | Income on books not taxed (municipal interest, life insurance proceeds) | − |
| 8 | Deductions on return not charged to books (tax depreciation over book) | − |
| 10 | Income (line 28 of Form 1120) | = |

```worked
title: A full M-1
scenario: |
  Birch Corp's 2025 book net income is $600,000. The books include: federal income tax expense $150,000;
  a $20,000 capital loss (no capital gains); $12,000 of municipal interest; $8,000 of meals (all 50% deductible);
  a $5,000 OSHA fine; and life insurance proceeds of $100,000 on a key officer. Book depreciation is $40,000 and
  tax depreciation is $70,000. Rent of $24,000 for 2026 was received in December 2025 and recorded as unearned.
steps:
  - label: Add federal income tax and the capital loss
    work: 600,000 + 150,000 + 20,000
    result: 770,000
  - label: Add prepaid rent (taxable when received)
    work: + 24,000
    result: 794,000
  - label: Add nondeductible expenses
    work: + 4,000 (50% of meals) + 5,000 fine
    result: 803,000
  - label: Subtract nontaxable income
    work: − 12,000 municipal interest − 100,000 life insurance
    result: 691,000
  - label: Subtract excess tax depreciation
    work: − (70,000 − 40,000)
    result: 661,000 taxable income before special deductions
insight: Ask one question for each item — is it in book income, in taxable income, or both? — and the direction follows.
```

```check
tcp-cc-chk1
```

## Estimated tax

```faded
title: Your turn — a large corporation's installments
scenario: |
  Aspen Corp (calendar year) had 2024 taxable income of $3,000,000 and 2024 tax of $630,000. It expects 2025 tax
  of $840,000. Compute the minimum installments to avoid a penalty.
steps:
  - label: First installment (April 15) — prior-year tax allowed
    answer: 157500
    solution: 25% × 630,000 = 157,500
  - label: Required annual payment for the rest of the year
    answer: 840000
    hint: A large corporation must base installments on current-year tax after the first
    solution: 100% of current-year tax = 840,000
  - label: Second installment (June 15), including catch-up
    answer: 262500
    solution: 50% × 840,000 − 157,500 paid = 262,500
  - label: Third and fourth installments, each
    answer: 210000
    solution: 25% × 840,000 = 210,000
```

```check
tcp-cc-chk2
```

## Penalty taxes and the corporate AMT

| Tax | Targets | Rate |
|---|---|---|
| Accumulated earnings tax | Retaining earnings beyond reasonable business needs to avoid shareholder dividend tax | 20% |
| Personal holding company tax | Closely held corporations earning mostly passive income | 20% of undistributed PHC income |
| Corporate AMT | Very large corporations (average AFSI > $1 billion) | 15% of AFSI |

Paying dividends (including consent dividends) avoids both penalty taxes. The AET and PHC tax never apply in the same year — the PHC tax takes priority.
