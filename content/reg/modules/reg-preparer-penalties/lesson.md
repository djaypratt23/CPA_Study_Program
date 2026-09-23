---
id: reg-preparer-penalties
section: REG
title: Taxpayer and preparer penalties
minutes: 15
taxYear: '2025'
objectives:
  - text: Compute failure-to-file and failure-to-pay penalties and identify accuracy-related and fraud penalties.
    skill: application
    task: Calculate taxpayer penalties
  - text: Match reporting positions to the standards of reasonable basis, substantial authority, and more likely than not.
    skill: application
    task: Apply the standards for tax return positions
  - text: Identify the preparer penalties for unreasonable positions and procedural failures.
    skill: remembering
    task: Recall tax preparer penalties
bigIdea:
  what: >-
    Penalties enforce the tax system: late filing and late payment penalties for procedural failures, accuracy
    penalties for understated tax, and fraud penalties for intent. Preparers face their own penalties when they
    sign returns with positions that don't meet the required level of support.
  why: >-
    Knowing the thresholds tells you when a position needs disclosure, when a client needs a warning, and what a
    late return will actually cost.
  example: >-
    A client files three months late and pays nothing with the return: the failure-to-file penalty runs 5% per
    month (reduced by the failure-to-pay penalty for the same months) and the failure-to-pay penalty 0.5% per month.
preQuestions: [reg-pen-pre1]
keyTakeaways:
  - "Failure to file: 5% of the net tax due per month (or part), up to 25%. Failure to pay: 0.5% per month, up to 25%. When both apply in a month, the failure-to-file penalty is reduced by the failure-to-pay penalty (combined 5% per month)."
  - "Accuracy-related penalty: 20% of the underpayment for negligence or a substantial understatement (for individuals, the greater of 10% of the correct tax or $5,000). 40% for gross valuation misstatements."
  - "Civil fraud penalty: 75% of the underpayment attributable to fraud (the IRS must prove fraud by clear and convincing evidence)."
  - "Position standards: reasonable basis (about 20%) — acceptable if disclosed; substantial authority (about 40%) — no disclosure needed; more likely than not (above 50%) — required for tax shelters and reportable transactions."
  - "§6694(a) preparer penalty (unreasonable position): greater of $1,000 or 50% of the income derived. §6694(b) (willful or reckless): greater of $5,000 or 75% of the income derived."
  - "§6695: per-failure penalties for failing to sign, provide a copy, include a PTIN, keep copies or a list for 3 years, and meet due diligence requirements for certain credits and head of household status."
  - "Reasonable cause may excuse many penalties (not the fraud penalty)."
citations:
  - source: IRC §6651 (Failure to file or pay), §6662 (Accuracy-related penalty), §6663 (Fraud penalty)
  - source: IRC §6694 and §6695 (Return preparer penalties)
---

## Taxpayer penalties

| Penalty | Rate | Maximum |
|---|---|---|
| Failure to file (§6651(a)(1)) | 5% per month or part month | 25% |
| Failure to pay (§6651(a)(2)) | 0.5% per month or part month | 25% |
| Both in the same month | FTF reduced by FTP → 4.5% + 0.5% = 5% | FTF 22.5% + FTP up to 25% |
| Accuracy-related (§6662) | 20% of the underpayment (40% for gross valuation misstatements) | — |
| Civil fraud (§6663) | 75% of the fraud underpayment | — |

```worked
title: Late filing and late payment
scenario: |
  Eli's return was due April 15 and he filed it on July 10 (2 months 25 days late — counts as 3 months). The
  tax due was $10,000 and he paid it with the return. No extension; no reasonable cause.
steps:
  - label: Failure-to-pay penalty
    work: 0.5% × 3 months × 10,000
    result: 150
  - label: Failure-to-file penalty before reduction
    work: 5% × 3 × 10,000
    result: 1,500
  - label: Failure-to-file penalty after reduction
    work: 1,500 − 150
    result: 1,350
  - label: Total penalties
    work: 1,350 + 150
    result: 1,500 (plus interest)
insight: An extension of time to file doesn't extend time to pay — the failure-to-pay penalty still runs from April 15.
```

```faded
title: Your turn
scenario: |
  A return showing $8,000 of tax due is filed 4½ months late (no extension), and nothing is paid until the return is filed.
steps:
  - label: Months counted
    answer: 5
    solution: Any part of a month counts as a full month.
  - label: Failure-to-pay penalty
    answer: 200
    solution: 0.5% × 5 × 8,000 = 200
  - label: Failure-to-file penalty (after reduction)
    answer: 1800
    hint: (5% − 0.5%) per month
    solution: 4.5% × 5 × 8,000 = 1,800
```

```check
reg-pen-chk1
```

## Standards for return positions

| Standard | Rough likelihood | Consequence |
|---|---|---|
| Reasonable basis | ~20% | Avoids penalties only if **disclosed** (Form 8275) |
| Substantial authority | ~40% | Avoids the substantial-understatement penalty **without** disclosure |
| More likely than not | >50% | Required for tax shelters and reportable transactions |
| Frivolous | — | Never acceptable |

## Preparer penalties

| Section | Conduct | Penalty |
|---|---|---|
| §6694(a) | Understatement due to an unreasonable position (undisclosed position without substantial authority; disclosed position without reasonable basis) | Greater of $1,000 or 50% of the income derived |
| §6694(b) | Willful or reckless conduct | Greater of $5,000 or 75% of the income derived |
| §6695 | Failure to sign, give the client a copy, include a PTIN, retain a copy or list (3 years), or meet due-diligence requirements (EITC, CTC, AOTC, head of household) | Per failure (inflation-adjusted) |
| §7216 | Unauthorized disclosure or use of return information | Civil and criminal penalties |

```check
reg-pen-chk2
```
