---
id: tcp-formation-liquidation
section: TCP
title: Corporate formation, distributions & liquidation planning
minutes: 20
taxYear: '2025'
objectives:
  - text: Plan a corporate formation to qualify for (or deliberately avoid) §351 nonrecognition.
    skill: analysis
    task: Analyze the tax consequences of forming a corporation
  - text: Compare the tax results of dividends, redemptions, and §1244 stock losses for shareholders.
    skill: application
    task: Calculate the tax effects of corporate distributions and redemptions
  - text: Determine the corporate- and shareholder-level results of complete liquidations under §331/§336 and §332/§337.
    skill: application
    task: Calculate the tax effects of a corporate liquidation
bigIdea:
  what: >-
    Getting money into and out of a corporation are both taxable events unless a specific rule says otherwise.
    §351 lets owners contribute property tax-free if they control the corporation. Getting money out is a choice
    among salary (deductible, one tax), dividends (double tax, preferential rate), redemptions (possibly capital
    gain with basis recovery), and liquidation (double tax, except for 80% subsidiaries).
  why: >-
    TCP planning questions ask which structure lowers total tax — for example, whether a redemption qualifies for
    exchange treatment or whether a contributor should recognize a loss.
  example: >-
    A founder transfers a building with a built-in loss to her new corporation. If §351 applies, the loss is
    deferred; she might instead sell it to an unrelated party first, or structure the transfer so the loss isn't
    duplicated (§362(e)(2) may limit the corporation's basis anyway).
preQuestions: [tcp-fl-pre1]
keyTakeaways:
  - "§351: no gain or loss if property is transferred for stock and the transferors control the corporation (80% of voting power and 80% of each other class) immediately after. Services aren't property; a person contributing only services isn't counted as a transferor."
  - "Boot in §351: gain recognized = lesser of boot received or realized gain. Liabilities assumed are not boot unless there's a tax-avoidance purpose (§357(b)); liabilities in excess of total basis produce gain (§357(c))."
  - "Basis: shareholder's stock = property basis + gain recognized − boot − liabilities assumed. Corporation's property = transferor's basis + gain recognized (limited to FMV for net built-in loss property under §362(e)(2) unless the shareholder elects to reduce stock basis)."
  - "§1244: individuals may deduct losses on qualifying small business stock (originally issued; $1 million capital limit) as ordinary — up to $50,000 per year ($100,000 MFJ); the rest is capital."
  - "Redemptions are exchanges (capital gain with basis recovery) if: substantially disproportionate (after: < 50% of vote and < 80% of prior percentage), complete termination, not essentially equivalent to a dividend, partial liquidation (noncorporate shareholders), or to pay death taxes (§303). §318 attribution applies. Otherwise: dividend to the extent of E&P."
  - "Complete liquidation (§331/§336): shareholders recognize capital gain or loss (FMV received − stock basis); the corporation recognizes gain or loss as if it sold its assets at FMV (with loss limits for related parties and built-in loss property)."
  - "Subsidiary liquidation (§332/§337): parent owning ≥ 80% of vote and value recognizes nothing; the subsidiary recognizes no gain or loss on distributions to the parent; carryover basis and tax attributes pass to the parent."
citations:
  - source: IRC §351, §357, §358, §362 (Corporate formation); §1244 (Small business stock losses)
  - source: IRC §302 and §318 (Redemptions and attribution); §331, §332, §336, §337 (Liquidations)
---

## Formation planning

```worked
title: §351 with boot and a liability
scenario: |
  Kai transfers equipment (basis $60,000; FMV $150,000) subject to a $40,000 liability to a new corporation for
  80% of its stock (FMV $100,000) and $10,000 cash. The corporation assumes the liability.
steps:
  - label: Realized gain
    work: (100,000 stock + 10,000 cash + 40,000 liability) − 60,000
    result: 90,000
  - label: Recognized gain
    work: Lesser of boot (10,000) or realized gain; liability 40,000 < basis 60,000, so §357(c) doesn't apply
    result: 10,000
  - label: Kai's stock basis
    work: 60,000 + 10,000 − 10,000 cash − 40,000 liability
    result: 20,000
  - label: Corporation's basis in equipment
    work: 60,000 + 10,000
    result: 70,000
insight: §351 defers gain — the deferred 80,000 is preserved in Kai's low stock basis and the corporation's carryover basis.
```

```check
tcp-fl-chk1
```

## Getting money out

| Method | Corporation | Shareholder |
|---|---|---|
| Salary | Deductible (if reasonable) | Ordinary income + payroll taxes |
| Dividend | Not deductible | Qualified dividend rate (0/15/20%) + NIIT, no basis recovery |
| Qualifying redemption | Not deductible; gain on appreciated property distributed | Capital gain after basis recovery |
| Liquidation (§331) | Gain/loss on assets (§336) | Capital gain/loss |

```faded
title: Your turn — substantially disproportionate redemption
scenario: |
  Lena owns 60 of a corporation's 100 shares; unrelated shareholders own the rest. The corporation redeems 30 of
  her shares. Is the redemption substantially disproportionate? (Enter percentages as whole numbers.)
steps:
  - label: Lena's ownership after the redemption (%)
    answer: 43
    solution: 30 ÷ 70 = 42.86%, about 43%
  - label: 80% of her prior ownership (%)
    answer: 48
    solution: 80% × 60% = 48%
  - label: Does it qualify? (1 = yes, 0 = no)
    answer: 1
    hint: Both tests — below 50% and below 80% of prior
    solution: Yes — 42.86% < 50% and < 48%; exchange treatment
```

```check
tcp-fl-chk2
```
