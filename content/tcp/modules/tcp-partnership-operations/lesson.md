---
id: tcp-partnership-operations
section: TCP
title: Partnership operations, allocations & Schedule K-1
minutes: 20
taxYear: '2025'
objectives:
  - text: Separate partnership ordinary business income from separately stated items and prepare a partner's Schedule K-1 amounts.
    skill: application
    task: Calculate ordinary business income and separately stated items
  - text: Compute a partner's year-end outside basis and the deductible loss, applying the basis-adjustment order.
    skill: application
    task: Calculate a partner's adjusted basis
  - text: Determine the treatment of guaranteed payments and the required tax year of a partnership.
    skill: application
    task: Apply guaranteed payment and tax year rules
bigIdea:
  what: >-
    A partnership doesn't pay income tax. It computes income, splits it into "ordinary business income" and items
    that must be shown separately (because they're treated differently on the partners' returns), and reports each
    partner's share on Schedule K-1. Partners pay tax on their shares whether or not cash is distributed, and
    their outside basis rises and falls to keep score.
  why: >-
    The Form 1065 page 1 vs Schedule K split is a classic simulation, followed by a basis roll-forward for one
    partner.
  example: >-
    A partnership earns $200,000 from operations and $10,000 of dividends and gives $4,000 to charity. Ordinary
    business income is $200,000; the dividends and the charitable gift are separately stated because partners
    treat them differently (qualified dividend rates; itemized deduction limits).
preQuestions: [tcp-po-pre1]
keyTakeaways:
  - "Separately stated items: capital gains and losses, §1231 gains and losses, dividends, interest, royalties, charitable contributions, §179 expense, investment interest, foreign taxes, tax-exempt income, nondeductible expenses, and guaranteed payments (shown separately to the recipient)."
  - "Guaranteed payments (for services or use of capital, without regard to income) are deductible in computing ordinary business income and are ordinary income (and SE income for services) to the partner, in the partner's tax year in which the partnership year ends."
  - "Basis adjustment order (Reg. §1.705-1): beginning basis + contributions + share of income items (including tax-exempt) + increase in share of liabilities − distributions (including decrease in liabilities) − nondeductible, noncapital expenses − losses and deductions. Basis can't go below zero."
  - "Losses in excess of basis are suspended until basis is restored. Then apply at-risk, passive, and excess business loss limits."
  - "Allocations follow the partnership agreement if they have substantial economic effect (§704(b)); otherwise, by the partners' interests in the partnership."
  - "Required tax year: (1) majority-interest partners' year, (2) principal partners' year (all 5%+ partners), (3) least aggregate deferral. A §444 election or business purpose can allow another year."
  - "Form 1065 is due the 15th day of the 3rd month after year-end (March 15); 6-month extension. Late-filing penalty is assessed per partner per month (up to 12 months)."
  - "Self-employment tax: general partners pay SE tax on their share of ordinary business income plus guaranteed payments; limited partners only on guaranteed payments for services."
citations:
  - source: IRC §702 (Income and credits of partner), §703 (Partnership computations), §704 (Distributive share), §705 (Basis of partner's interest)
  - source: IRC §706 (Taxable years), §707(c) (Guaranteed payments), §6698 (Failure to file partnership return)
  - source: Treas. Reg. §1.705-1, §1.704-1(b); Form 1065 and Schedule K-1 instructions
---

## Page 1 vs Schedule K

| Item | Ordinary business income (page 1) | Separately stated (Schedule K) |
|---|---|---|
| Sales, COGS, operating expenses, depreciation (non-§179) | ✓ | |
| Guaranteed payments | Deducted | Reported to the partner |
| Interest, dividends, royalties | | ✓ |
| Capital and §1231 gains/losses | | ✓ |
| Charitable contributions | | ✓ |
| §179 expense | | ✓ |
| Tax-exempt income; nondeductible expenses | | ✓ (basis items) |

```worked
title: Ordinary business income
scenario: |
  Maple Partners reports: sales $900,000; cost of goods sold $400,000; salaries $150,000; guaranteed payment to
  partner Ana $60,000; depreciation (MACRS) $40,000; §179 expense $25,000; charitable contributions $8,000;
  dividends $12,000; municipal interest $3,000; long-term capital gain $20,000.
steps:
  - label: Gross profit
    work: 900,000 − 400,000
    result: 500,000
  - label: Deduct salaries, guaranteed payment, and depreciation
    work: 500,000 − 150,000 − 60,000 − 40,000
    result: 250,000 ordinary business income
  - label: Separately stated items
    work: §179 25,000; charity 8,000; dividends 12,000; LTCG 20,000; tax-exempt interest 3,000
    result: Reported on Schedule K and each partner's K-1
insight: If an item could be treated differently on any partner's return, it's separately stated.
```

```check
tcp-po-chk1
```

## Rolling a partner's basis forward

```faded
title: Your turn — basis with a loss
scenario: |
  Ben's beginning outside basis is $30,000. His 40% share this year: ordinary business loss $(70,000); tax-exempt
  interest $5,000; nondeductible expenses $2,000. He received a $10,000 cash distribution. His share of
  partnership liabilities increased by $20,000.
steps:
  - label: Basis before distributions and losses
    answer: 55000
    hint: Beginning + income items (including tax-exempt) + liability increase
    solution: 30,000 + 5,000 + 20,000 = 55,000
  - label: After the distribution
    answer: 45000
    solution: 55,000 − 10,000 = 45,000
  - label: After nondeductible expenses
    answer: 43000
    solution: 45,000 − 2,000 = 43,000
  - label: Loss deductible this year (basis limit)
    answer: 43000
    solution: Limited to 43,000; 27,000 is suspended and basis is zero
```

```check
tcp-po-chk2
```

## Guaranteed payments

- Deductible by the partnership (if ordinary and necessary, not capitalized).
- Ordinary income to the partner **regardless** of partnership income — a guaranteed payment can create or increase a partnership loss.
- Included in the partner's return for the partner's tax year in which the partnership's tax year ends.
- Not wages: no withholding, no W-2; subject to SE tax when paid for services.
