---
id: far-equity
section: FAR
title: "Stockholders' equity"
minutes: 20
objectives:
  - text: Record issuances of common and preferred stock, including for noncash consideration and in lump-sum sales.
    skill: application
    task: Record stock issuances
  - text: Account for treasury stock under the cost method, including reissuance above and below cost.
    skill: application
    task: Account for treasury stock transactions
  - text: Record cash, property, and stock dividends and stock splits, and allocate dividends between preferred and common.
    skill: application
    task: Calculate dividends to preferred and common stockholders
bigIdea:
  what: >-
    Equity is the owners' residual claim, split by where it came from: what owners paid in (contributed capital)
    versus what the company earned and kept (retained earnings). Transactions with owners change equity directly —
    they never create income or expense.
  why: >-
    A company can't make a profit by trading its own shares. If it could, it could report gains just by buying back
    stock cheaply and reselling it. Keeping owner transactions in equity keeps net income a measure of operating
    performance.
  example: >-
    A company buys back shares at $30 and later resells them for $35. The $5 per share goes to additional paid-in
    capital — not to a "gain" on the income statement.
preQuestions: [far-seq-pre1]
keyTakeaways:
  - "Stock issued for cash: par (or stated value) to the stock account, excess to additional paid-in capital (APIC). Stock issued for noncash assets: at the more clearly determinable fair value."
  - "Lump-sum issuance of two classes: allocate proceeds by relative fair values (proportional), or give the class with a known value its value and the rest to the other (incremental)."
  - "Treasury stock (cost method): debit Treasury stock at cost. Reissue above cost → credit APIC–treasury stock. Below cost → debit APIC–treasury stock first, then retained earnings. Never a gain or loss."
  - "Dividends reduce retained earnings on the declaration date. Property dividends: remeasure the asset to fair value (gain/loss) first. Small stock dividends (< 20–25%) at fair value; large ones at par; stock splits change par and shares only."
  - "Cumulative preferred: dividends in arrears must be paid before common gets anything; arrears are disclosed, not recorded as a liability until declared."
citations:
  - source: FASB ASC 505-10 (Equity — Overall)
  - source: FASB ASC 505-20 (Stock dividends and stock splits)
  - source: FASB ASC 505-30 (Treasury stock)
  - source: FASB ASC 845-10-30-1 (nonreciprocal transfers to owners — property dividends)
---

## The pieces of equity

| Component | What goes in it |
|---|---|
| Preferred and common stock | Par or stated value of shares issued |
| Additional paid-in capital (APIC) | Excess over par, treasury stock reissuance gains, etc. |
| Retained earnings | Cumulative net income − dividends (± prior-period adjustments) |
| AOCI | Cumulative other comprehensive income |
| Treasury stock | Cost of reacquired shares (a **deduction**) |
| Noncontrolling interest | (Consolidated statements) |

## Issuing stock

```je
title: Issue 10,000 shares of $1 par common stock for $25 per share
lines:
  - { account: Cash, debit: 250000 }
  - { account: Common stock, credit: 10000 }
  - { account: Additional paid-in capital — common, credit: 240000 }
```

**Noncash consideration** (land, services): use the fair value of the stock or of what was received — whichever is more clearly determinable. **Issuance costs** reduce APIC (they're not expensed).

**Lump-sum issuances**: if both classes have known fair values, allocate proportionally; if only one does, give it that value and assign the rest to the other (incremental method).

## Treasury stock — cost method

```worked
title: Buy back and reissue
scenario: |
  A company buys 1,000 of its own shares at $30. Later it reissues 400 shares at $35 and then 300 shares at $22.
  There was no prior balance in APIC–treasury stock.
steps:
  - label: Purchase
    work: Dr Treasury stock 30,000 / Cr Cash 30,000
    result: Equity decreases 30,000
  - label: Reissue 400 at $35
    work: Cash 14,000; Treasury stock 400 × 30 = 12,000; excess 2,000
    result: Cr APIC–treasury stock 2,000
  - label: Reissue 300 at $22
    work: Cash 6,600; Treasury stock 300 × 30 = 9,000; shortfall 2,400
    result: Dr APIC–treasury stock 2,000 (use it up first), Dr Retained earnings 400
insight: No gains or losses ever hit the income statement. Shortfalls eat APIC from prior treasury transactions first, then retained earnings.
```

Treasury shares are **issued but not outstanding** — they get no dividends or votes and are excluded from EPS.

```check
far-seq-chk1
```

## Dividends

Three dates: **declaration** (liability recorded; RE reduced), **record** (no entry), **payment** (cash paid).

| Type | Amount charged to retained earnings | Notes |
|---|---|---|
| Cash | Amount declared | Liability at declaration |
| Property | **Fair value** of the property | Remeasure the asset first; recognize gain/loss |
| Small stock dividend (< 20–25%) | **Fair value** of shares | Credit stock at par, APIC for the excess |
| Large stock dividend (> 20–25%) | **Par** value of shares | |
| Stock split | **No entry** (memo) | Par per share falls; shares rise proportionally |
| Liquidating dividend | Reduces **APIC** (return of capital) | Excess over retained earnings |

## Preferred vs. common: splitting the dividend

```faded
title: Your turn — cumulative preferred with arrears
scenario: |
  A company has 10,000 shares of $100 par, 5% cumulative preferred stock and 200,000 shares of common stock.
  No dividends were declared in the prior two years. This year the board declares total dividends of $180,000.
steps:
  - label: Annual preferred dividend
    answer: 50000
    solution: 10,000 × 100 × 5% = 50,000
  - label: Total to preferred this year (arrears + current)
    answer: 150000
    solution: 2 years in arrears (100,000) + current year (50,000) = 150,000
  - label: Amount available to common
    answer: 30000
    solution: 180,000 − 150,000 = 30,000
  - label: Dividends per common share
    answer: 0.15
    tolerance: 0.001
    solution: 30,000 ÷ 200,000 = $0.15
```

Dividends in arrears are **not a liability** until declared, but they must be **disclosed** (total and per share).

```check
far-seq-chk2
```
