---
id: tcp-international
section: TCP
title: International tax concepts
minutes: 20
taxYear: '2025'
objectives:
  - text: Apply the income sourcing rules and compute U.S.-source and foreign-source taxable income.
    skill: application
    task: Compute U.S. and foreign source income
  - text: Explain how the United States taxes a foreign corporation's U.S. income, including withholding on FDAP income and the effect of a permanent establishment.
    skill: remembering
    task: Recall U.S. taxation of foreign corporations and permanent establishment
  - text: Compare operating abroad through a foreign branch with a foreign subsidiary, and identify a controlled foreign corporation.
    skill: remembering
    task: Recall branch versus subsidiary and CFC concepts
bigIdea:
  what: >-
    The United States taxes domestic corporations on worldwide income, relieving double tax with a foreign tax credit, and
    taxes foreign corporations only on U.S.-source income. Where income is sourced decides who taxes it and how much credit
    is allowed.
  why: >-
    TCP tests general sourcing and allocation concepts — not specific treaties or foreign laws. Get the sourcing rules and
    the branch-versus-subsidiary trade-off right and most questions follow.
  example: >-
    A U.S. company earns $1 million in Germany through a German branch. The income is on its U.S. return this year, and
    German tax paid can offset U.S. tax on it — up to the foreign tax credit limit.
preQuestions: [tcp-intl-pre1]
keyTakeaways:
  - "Sourcing: interest and dividends by the payer's residence; services where performed; rents and royalties where the property is located or used; real property gains where the property is; purchased inventory where title passes; most other personal property by the seller's residence."
  - "Foreign corporations: effectively connected income (ECI) is taxed on a net basis at 21%; fixed, determinable, annual or periodic (FDAP) U.S.-source income is subject to 30% gross withholding unless a treaty reduces it."
  - "Under a treaty, business profits are taxable in the source country only if attributable to a permanent establishment (a fixed place of business or a dependent agent)."
  - "Foreign branch: income and losses flow into the U.S. return currently. Foreign subsidiary: a separate taxpayer; losses stay abroad; earnings are generally taxed when distributed, subject to anti-deferral rules."
  - "A CFC is a foreign corporation more than 50% owned (vote or value) by U.S. shareholders, each owning at least 10%. Its U.S. shareholders include Subpart F income (and GILTI, renamed net CFC tested income from 2026) currently."
  - "Foreign tax credit limit = U.S. tax × foreign-source taxable income ÷ worldwide taxable income; excess credits carry back 1 year and forward 10."
citations:
  - source: IRC §§861–865 (Source rules), §881 and §1442 (FDAP tax and withholding), §882 (ECI), §884 (Branch profits tax)
  - source: IRC §§901, 904 (Foreign tax credit and limitation), §§951–957 (Subpart F and CFCs), §951A (GILTI), §245A (Dividends from foreign subsidiaries)
---

## Where is the income sourced?

| Income | Sourced by |
|---|---|
| Interest | Residence of the **payer** |
| Dividends | Residence of the **paying corporation** |
| Compensation for services | Where the services are **performed** |
| Rents and royalties | Where the property is **located or used** |
| Gain on real property | Where the property is **located** |
| Sale of purchased inventory | Where **title passes** |
| Sale of inventory the seller produced | Where the **production** takes place |
| Sale of other personal property | Generally the **seller's residence** |

Once gross income is sourced, deductions are allocated and apportioned to it, giving U.S.-source and foreign-source **taxable** income.

```worked
title: Foreign tax credit limit
scenario: |
  A U.S. corporation has worldwide taxable income of $2,000,000, of which $500,000 is foreign-source. Its U.S. tax before
  credits is $420,000 (21%). It paid $130,000 of foreign income tax.
steps:
  - label: Limit
    work: 420,000 × 500,000 ÷ 2,000,000
    result: 105,000
  - label: Credit allowed
    work: Lesser of foreign tax paid (130,000) and the limit (105,000)
    result: 105,000
  - label: Excess credit
    work: 130,000 − 105,000, carried back 1 year and forward 10
    result: 25,000
insight: The limit stops foreign taxes from reducing U.S. tax on U.S.-source income. Excess credits arise when the foreign rate is above the U.S. rate.
```

```check
tcp-intl-chk1
```

## Foreign corporations in the United States

- **Effectively connected income (ECI)** — income from a U.S. trade or business — is taxed on a net basis at the regular 21% rate. A **branch profits tax** of 30% may apply to earnings withdrawn from the U.S. branch.
- **FDAP income** (U.S.-source interest, dividends, rents, royalties) not connected with a U.S. business is taxed at **30% of the gross amount**, collected by **withholding** at source. Treaties often reduce the rate, and portfolio interest is exempt.
- **Permanent establishment.** Under a treaty, a foreign company's business profits are taxable in the United States only if attributable to a U.S. **permanent establishment** — a fixed place of business (office, factory, branch) or a dependent agent who habitually concludes contracts. Preparatory or auxiliary activities, such as storage or purchasing, generally do not create one.

## Operating abroad: branch or subsidiary?

| | Foreign branch | Foreign subsidiary |
|---|---|---|
| Separate taxpayer? | No — part of the U.S. corporation | Yes |
| Income | Taxed in the U.S. currently | Generally taxed when repatriated; the foreign-source portion of dividends may qualify for a 100% dividends-received deduction (§245A) |
| Start-up losses | Deductible on the U.S. return | Stay in the subsidiary |
| Foreign taxes | Direct foreign tax credit | Foreign tax credit for taxes paid on income included under the anti-deferral rules |

**Controlled foreign corporations.** A foreign corporation is a **CFC** if **U.S. shareholders** — U.S. persons owning at least **10%** of its vote or value — together own **more than 50%**. Each U.S. shareholder includes its share of the CFC's **Subpart F income** (mainly passive and related-party sales and services income) and **GILTI** currently, whether or not distributed. From 2026 GILTI is renamed net CFC tested income.
