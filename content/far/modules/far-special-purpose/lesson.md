---
id: far-special-purpose
section: FAR
title: Special purpose frameworks (cash & tax basis)
minutes: 14
objectives:
  - text: Identify special purpose frameworks and the titles used for their financial statements.
    skill: remembering
    task: Identify the characteristics of special purpose frameworks
  - text: Convert cash-basis revenues and expenses to the accrual basis.
    skill: application
    task: Convert cash basis or modified cash basis amounts to accrual basis
  - text: Explain key differences between income-tax-basis and GAAP financial statements.
    skill: application
bigIdea:
  what: >-
    Not every set of financial statements has to follow GAAP. Special purpose frameworks — cash basis, modified
    cash, income tax basis, regulatory, contractual, and others — are simpler or tailored bases a user has agreed to.
  why: >-
    A small landlord whose only reader is the bank may not need the cost and complexity of GAAP accruals. Using
    the tax basis the owner already tracks for the IRS can give that reader exactly what it needs, cheaply — as long
    as everyone knows which basis was used.
  example: >-
    A family-owned rental property company prepares "statements of assets, liabilities, and equity — income tax
    basis" because its lender only wants numbers that tie to the tax return.
preQuestions: [far-spf-pre1]
keyTakeaways:
  - "Special purpose frameworks: cash basis, modified cash basis, income tax basis, regulatory basis, contractual basis, and other bases with substantial support (e.g., the AICPA FRF for SMEs)."
  - "Statements must use titles that signal the basis — e.g., statement of revenues collected and expenses paid; statement of revenues and expenses — income tax basis. Avoid GAAP titles like 'balance sheet' or 'income statement' without a qualifier."
  - "Cash to accrual revenue: cash collected + ending receivables − beginning receivables (− beginning unearned revenue + ending unearned revenue when unearned revenue exists, reversed)."
  - "Cash to accrual expense: cash paid + ending accrued liabilities − beginning accrued liabilities − ending prepaids + beginning prepaids."
  - Modified cash basis adds accrual-like treatment with substantial support, such as capitalizing and depreciating fixed assets and recording debt.
  - Disclosures describe the basis, how it differs from GAAP (effects need not be quantified), and contain the same informative disclosures as GAAP for similar items.
citations:
  - source: AICPA AU-C 800 (Special Considerations — Audits of Financial Statements Prepared in Accordance With Special Purpose Frameworks)
    note: Defines the frameworks and titling expectations
  - source: AICPA Financial Reporting Framework for Small- and Medium-Sized Entities (FRF for SMEs)
---

## The frameworks

| Framework | What it is | Typical user |
|---|---|---|
| **Cash basis** | Record only cash receipts and disbursements | Very small entities, some trusts |
| **Modified cash basis** | Cash basis plus modifications with substantial support (e.g., depreciate fixed assets, record loans, accrue income taxes) | Small businesses, NFPs |
| **Income tax basis** | The basis used (or expected to be used) on the federal tax return | Closely held companies, partnerships |
| **Regulatory basis** | Required by a regulator (e.g., an insurance department) | Regulated entities |
| **Contractual basis** | Agreed in a contract (e.g., a loan agreement) | Parties to that contract |
| **Other** | A definite set of criteria with substantial support, applied to all material items (e.g., FRF for SMEs) | Private companies |

### Titles matter

Because readers assume "balance sheet" and "income statement" mean GAAP, special-purpose statements use distinct titles:

| GAAP title | Cash basis | Income tax basis |
|---|---|---|
| Balance sheet | Statement of assets and liabilities arising from cash transactions | Statement of assets, liabilities, and equity — income tax basis |
| Income statement | Statement of revenues collected and expenses paid | Statement of revenues and expenses — income tax basis |

```check
far-spf-chk1
```

## Converting cash basis to accrual basis

The exam's favorite task. Think in T-accounts: the accrual amount is what was **earned** or **incurred**, regardless of cash timing.

```tacct
title: Deriving accrual revenue from receivables
accounts:
  - name: Accounts receivable
    debits:
      - { label: Beginning balance, amount: 30000 }
      - { label: Accrual revenue (solve), amount: 255000 }
    credits:
      - { label: Cash collected, amount: 240000 }
      - { label: Ending balance, amount: 45000 }
```

**Revenue** = cash collected + ending AR − beginning AR = 240,000 + 45,000 − 30,000 = **255,000**.

For expenses, adjust cash paid for changes in both **accrued liabilities** (unpaid expenses) and **prepaids** (paid-ahead expenses):

| Change during the year | Effect on accrual expense vs. cash paid |
|---|---|
| Accrued liability ↑ | Add (incurred, not yet paid) |
| Accrued liability ↓ | Subtract (paid for last year's expense) |
| Prepaid ↑ | Subtract (paid for next year) |
| Prepaid ↓ | Add (used up last year's payment) |

```worked
title: Cash to accrual — salaries and insurance
scenario: |
  Cash paid for salaries $410,000; salaries payable: beginning $12,000, ending $20,000.
  Cash paid for insurance $18,000; prepaid insurance: beginning $6,000, ending $4,000.
steps:
  - label: Salaries expense
    work: 410,000 + 20,000 − 12,000
    result: 418,000
  - label: Insurance expense
    work: 18,000 + 6,000 (beginning prepaid used) − 4,000 (ending prepaid not yet used)
    result: 20,000
insight: The same "beginning + additions − ending" logic works for every balance sheet account — just be clear which side the cash is on.
```

```faded
title: Your turn — accrual net income from cash data
scenario: |
  A consultant's cash-basis records show fees collected $180,000 and operating expenses paid $110,000.
  Fees receivable: beginning $15,000, ending $22,000. Unearned fees: beginning $5,000, ending $2,000.
  Accrued expenses payable: beginning $8,000, ending $6,000. Depreciation (not recorded on cash basis) $9,000.
steps:
  - label: Accrual fee revenue
    answer: 190000
    hint: Receivables up → add. Unearned fees down → the decrease was earned this year → add.
    solution: 180,000 + (22,000 − 15,000) + (5,000 − 2,000) = 190,000
  - label: Accrual operating expenses (before depreciation)
    answer: 108000
    hint: Accrued expenses fell — some cash paid was for last year's expense.
    solution: 110,000 + 6,000 − 8,000 = 108,000
  - label: Accrual net income
    answer: 73000
    solution: 190,000 − 108,000 − 9,000 = 73,000
```

## Income tax basis vs. GAAP — common differences

- **Bad debts**: tax uses the **direct write-off** method; GAAP requires an allowance (CECL).
- **Depreciation**: tax (MACRS, bonus, §179) vs. GAAP useful-life depreciation.
- **Nontaxable revenue and nondeductible expenses** (e.g., municipal bond interest, the nondeductible portion of meals, fines) are still **presented** in tax-basis statements, often as separate lines or disclosed.
- **No deferred taxes** — tax-basis statements report the tax expense of the return.

Disclosures in all special purpose frameworks: a description of the basis and **how it differs from GAAP** (the effects need not be quantified), plus disclosures comparable to GAAP for similar items (e.g., related parties, debt terms).

```check
far-spf-chk2
```
