---
id: reg-corp-formation-liquidation
section: REG
title: Formation (§351), redemptions & liquidations
minutes: 19
taxYear: '2025'
objectives:
  - text: Determine gain recognized and basis in a §351 corporate formation, including boot and liabilities.
    skill: application
    task: Calculate the tax consequences of forming a corporation
  - text: Determine whether a stock redemption is treated as a sale or a dividend.
    skill: application
    task: Determine the tax treatment of stock redemptions
  - text: Determine the consequences of complete liquidations to shareholders, the corporation, and parent corporations.
    skill: application
    task: Determine the tax consequences of corporate liquidations
bigIdea:
  what: >-
    Transferring property to a corporation you control is tax-free under §351, with carryover bases. Getting money
    out is where tax bites: a redemption may be a sale (capital gain with basis recovery) or a dividend, and a
    liquidation is a taxable sale at both the corporate and shareholder levels — unless a parent liquidates its subsidiary.
  why: >-
    Formation, redemption, and liquidation decisions are made once, involve large amounts, and are expensive to get
    wrong.
  example: >-
    Two founders transfer property for 100% of a new corporation's stock — tax-free. A third person who receives
    stock only for services has taxable compensation and isn't counted toward the 80% control test.
preQuestions: [reg-fl-pre1]
keyTakeaways:
  - "§351: no gain or loss when one or more persons transfer property to a corporation solely for stock and the transferors control it (80% of voting power and 80% of each other class) immediately after."
  - "Boot (cash or other property) triggers gain up to the lesser of realized gain or boot. Liabilities assumed by the corporation aren't boot, except that liabilities exceeding the transferor's total basis create gain (§357(c)) and tax-avoidance liabilities are boot."
  - "Shareholder's stock basis = basis of property transferred + gain recognized − boot received − liabilities assumed by the corporation. Corporation's basis in the property = transferor's basis + gain the transferor recognized."
  - "Stock received for services is ordinary income at FMV, and service-only providers don't count toward control."
  - "Redemptions are treated as sales (capital gain or loss) if they are: not essentially equivalent to a dividend; substantially disproportionate (after the redemption, less than 50% of voting power and less than 80% of the prior ownership percentage); a complete termination of interest; a partial liquidation (noncorporate shareholders); or to pay death taxes (§303). Otherwise, a dividend. Constructive ownership (§318) applies."
  - "Complete liquidation: shareholders recognize capital gain or loss (FMV received − stock basis) and take FMV basis; the corporation recognizes gain or loss as if it sold its assets (with limits on some losses to related parties)."
  - "Parent–subsidiary liquidation (parent owns 80%+): no gain or loss to the parent (§332) or the subsidiary on distributions to the parent (§337); the parent takes carryover bases (§334(b))."
citations:
  - source: IRC §351, §357, §358, §362 (Corporate formation)
  - source: IRC §302, §318 (Redemptions and constructive ownership)
  - source: IRC §331, §332, §334, §336, §337 (Liquidations)
---

## §351 formation

```worked
title: Forming Vista Corp.
scenario: |
  Ana transfers equipment (basis $30,000; FMV $100,000) and receives stock worth $90,000 plus $10,000 cash.
  Ben transfers land (basis $120,000; FMV $100,000) for $100,000 of stock. Together they own 100%.
steps:
  - label: Control test
    work: Ana and Ben together own 100% (≥ 80%)
    result: §351 applies
  - label: Ana's gain
    work: Realized 70,000; boot 10,000
    result: Recognizes 10,000
  - label: Ana's stock basis
    work: 30,000 + 10,000 gain − 10,000 boot
    result: 30,000
  - label: Vista's basis in the equipment
    work: 30,000 + 10,000 gain recognized by Ana
    result: 40,000
  - label: Ben
    work: Realized loss 20,000 not recognized; stock basis 120,000
    result: Vista's basis in the land is generally limited to FMV 100,000 (built-in loss rule) unless Ben elects to reduce his stock basis
insight: Carryover basis preserves the untaxed gain or loss for later. Boot is the only thing that forces recognition (plus §357(c)).
```

```check
reg-fl-chk1
```

## Redemptions: sale or dividend?

| Test | Requirement |
|---|---|
| Substantially disproportionate (§302(b)(2)) | After the redemption, shareholder owns < 50% of voting stock **and** < 80% of her prior ownership percentage |
| Complete termination (§302(b)(3)) | All stock redeemed (family attribution can be waived) |
| Not essentially equivalent to a dividend (§302(b)(1)) | A meaningful reduction in interest |
| Partial liquidation (§302(b)(4)) | Corporate contraction; noncorporate shareholders |
| §303 | To pay death taxes and expenses of a deceased shareholder |

Constructive ownership (§318): stock owned by a spouse, children, grandchildren, and parents (not siblings or grandparents) is treated as owned by the shareholder.

```worked
title: Substantially disproportionate?
scenario: |
  Cole owns 60 of 100 shares. The corporation redeems 30 of his shares.
steps:
  - label: Ownership after
    work: 30 ÷ 70
    result: 42.9% — less than 50%
  - label: 80% test
    work: 80% × 60% = 48%
    result: 42.9% < 48%
  - label: Result
    work: Both tests met
    result: Sale treatment — capital gain = proceeds − basis of redeemed shares
insight: Remember the denominator shrinks after a redemption — compute ownership using the shares outstanding afterward.
```

## Liquidations

| Party | General liquidation (§331/§336) | Parent–subsidiary (§332/§337) |
|---|---|---|
| Shareholders | Capital gain or loss = FMV received − stock basis; FMV basis in assets | Parent: no gain or loss; carryover basis |
| Corporation | Gain or loss as if assets were sold at FMV | No gain or loss on distributions to the parent |

```check
reg-fl-chk2
```
