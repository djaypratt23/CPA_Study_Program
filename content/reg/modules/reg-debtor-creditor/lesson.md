---
id: reg-debtor-creditor
section: REG
title: Debtor-creditor relationships, secured transactions & bankruptcy
minutes: 18
objectives:
  - text: Determine when a security interest attaches and is perfected, and resolve priority disputes.
    skill: application
    task: Determine priorities among secured creditors
  - text: Apply bankruptcy rules on filing, the automatic stay, preferential transfers, priorities, and discharge.
    skill: application
    task: Apply bankruptcy rules
  - text: Determine the rights and defenses of sureties.
    skill: application
    task: Determine surety rights and defenses
bigIdea:
  what: >-
    Creditors protect themselves with collateral (UCC Article 9 security interests) and with guarantors (sureties).
    When a debtor fails, bankruptcy law decides who gets paid, in what order, and which debts survive.
  why: >-
    Priority fights are zero-sum: whichever creditor attached and perfected properly — or whose transfer wasn't
    preferential — gets paid, and the others often get pennies.
  example: >-
    A lender files a financing statement on a company's equipment in March. A second lender lends against the same
    equipment in May and files. The first to file (or perfect) wins, so the March lender is paid first.
preQuestions: [reg-dc-pre1]
keyTakeaways:
  - "Attachment: value given, the debtor has rights in the collateral, and an authenticated security agreement describing it (or the secured party has possession or control)."
  - "Perfection: filing a financing statement; possession; control (deposit accounts); or automatic for a purchase-money security interest (PMSI) in consumer goods."
  - "Priority: generally first to file or perfect. A PMSI in equipment perfected within 20 days of the debtor receiving it has priority; a PMSI in inventory needs perfection and notice to prior filers before delivery."
  - "A buyer in the ordinary course of business takes free of a security interest created by the seller, even if perfected."
  - "Bankruptcy: Chapter 7 (liquidation), Chapter 11 (reorganization), Chapter 13 (individual repayment plan). Involuntary Chapter 7: one creditor if fewer than 12 creditors, otherwise three, holding unsecured claims above a statutory dollar amount."
  - "The automatic stay halts most collection actions when the petition is filed."
  - "Preferential transfer: to a creditor, for an antecedent debt, while insolvent, within 90 days before filing (1 year for insiders), letting the creditor get more than in liquidation."
  - "Priority of unsecured claims begins with domestic support obligations, administrative expenses, and wages earned within 180 days (up to a cap), then certain taxes. Nondischargeable debts include most recent taxes, support obligations, most student loans, and debts from fraud or willful injury."
  - "Surety rights: exoneration, reimbursement, subrogation, and contribution (among co-sureties, in proportion to their guarantees). Release of the debtor without the surety's consent, or a material modification, can discharge the surety; the debtor's bankruptcy or incapacity doesn't."
citations:
  - source: UCC Article 9 (Secured transactions)
  - source: U.S. Bankruptcy Code (Title 11)
  - source: Restatement (Third) of Suretyship and Guaranty
---

## Secured transactions

```mermaid
flowchart LR
  A[Attachment: value + debtor's rights + authenticated security agreement] --> P[Perfection: filing, possession, control, or automatic PMSI in consumer goods]
  P --> R[Priority against other creditors and buyers]
```

```worked
title: Who has priority?
scenario: |
  Harlan Co. buys equipment. Lender A filed a financing statement covering "all equipment" on March 1 and lent on
  March 10. Lender B lent on February 20 but filed on March 5. The seller of new equipment retains a PMSI, delivers
  the equipment June 1, and files June 15.
steps:
  - label: Lender A vs. Lender B (existing equipment)
    work: First to file or perfect — A filed March 1, B filed March 5
    result: A wins, even though B lent first
  - label: PMSI seller vs. Lenders A and B (new equipment)
    work: A PMSI in equipment perfected within 20 days after the debtor receives it
    result: The seller has priority in the new equipment (June 15 is within 20 days of June 1)
insight: Lending first doesn't win priority — filing or perfecting first does, except for a timely PMSI.
```

```check
reg-dc-chk1
```

## Bankruptcy

| Chapter | Who | What happens |
|---|---|---|
| 7 | Individuals and businesses | Trustee liquidates nonexempt assets; individuals receive a discharge |
| 11 | Mainly businesses | Debtor in possession proposes a reorganization plan |
| 13 | Individuals with regular income (within debt limits) | 3–5 year repayment plan |

**Preferential transfers** (the trustee can recover): (1) to or for a creditor, (2) for an antecedent debt, (3) while insolvent (presumed during the 90 days before filing), (4) within 90 days (1 year for insiders), (5) that lets the creditor receive more than in a Chapter 7 liquidation. Exceptions include contemporaneous exchanges for new value and payments in the ordinary course of business.

**Fraudulent transfers:** made with intent to hinder creditors, or for less than reasonably equivalent value while insolvent — reachable back 2 years under federal law.

## Suretyship

| Event | Effect on the surety |
|---|---|
| Creditor releases the principal debtor without reserving rights against the surety | Surety discharged |
| Creditor releases collateral | Surety discharged to the extent of the collateral's value |
| Material modification of the debt without the surety's consent | Surety discharged (compensated surety only if prejudiced) |
| Debtor's bankruptcy or incapacity | **Not** a defense for the surety |
| Creditor's fraud on the surety | Defense |

```check
reg-dc-chk2
```
