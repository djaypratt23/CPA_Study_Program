---
id: aud-sampling
section: AUD
title: Audit sampling (attributes & variables)
minutes: 18
objectives:
  - text: Distinguish sampling and nonsampling risk and identify the risks that affect audit effectiveness versus efficiency.
    skill: remembering
    task: Identify the types of sampling risk
  - text: Determine how factors affect sample size in attribute and variables sampling.
    skill: application
    task: Determine sample sizes for tests of controls and substantive tests
  - text: Evaluate sample results using the upper deviation rate and projected misstatement.
    skill: analysis
    task: Evaluate the results of audit sampling
bigIdea:
  what: >-
    Sampling tests less than 100% of a population and projects the result. Attribute sampling estimates how often
    a control fails (a rate); variables sampling, such as monetary unit sampling, estimates how many dollars a
    balance is misstated.
  why: >-
    Because the auditor looks only at a sample, there is a risk the sample misleads (sampling risk). Sample-size
    factors and the evaluation rules exist to keep that risk acceptably low — most importantly the risk of wrongly
    concluding that things are fine.
  example: >-
    Testing approvals on 60 of 12,000 invoices finds 2 unapproved. The sample rate is 3.3%, but the true rate
    could be higher. The auditor compares the upper deviation rate (from a table) with the tolerable rate before
    deciding whether it can rely on the control.
preQuestions: [aud-sa-pre1]
keyTakeaways:
  - "Sampling risk: the sample's conclusion differs from the population's. Nonsampling risk: human error, such as using the wrong procedure or missing a deviation."
  - "Tests of controls: risk of assessing control risk too low (overreliance — hurts effectiveness) vs. too high (underreliance — hurts efficiency)."
  - "Substantive tests: risk of incorrect acceptance (effectiveness) vs. incorrect rejection (efficiency)."
  - "Attribute sample size increases with a lower tolerable rate, a higher expected deviation rate, and a lower acceptable risk of overreliance. Population size has little effect on large populations."
  - "Evaluate attribute results: upper deviation rate = sample rate + allowance for sampling risk. If it exceeds the tolerable rate, don't rely on the control as planned."
  - "Monetary unit sampling (MUS): each dollar is a sampling unit, so large items are more likely to be selected. Sampling interval = population book value ÷ sample size. Items at or above the interval: use the actual misstatement. Smaller items: tainting % × interval."
  - "MUS is good at finding overstatements but weak for understatements and zero or negative balances. Classical variables sampling (mean-per-unit, difference, ratio) handles those."
citations:
  - source: AU-C 530 (Audit sampling)
  - source: AICPA Audit Guide, Audit Sampling
  - source: PCAOB AS 2315 (Audit sampling)
---

## Sampling risks

| | Effectiveness risk (the dangerous one) | Efficiency risk |
|---|---|---|
| Tests of controls | Risk of assessing control risk **too low** (overreliance) | Risk of assessing control risk too high (underreliance) |
| Substantive tests | Risk of **incorrect acceptance** | Risk of incorrect rejection |

Effectiveness risks can lead to the wrong opinion. Efficiency risks just cause extra work.

```check
aud-sa-chk1
```

## Attribute sampling (tests of controls)

| Factor | Effect on sample size |
|---|---|
| Tolerable deviation rate ↑ | Smaller (inverse) |
| Expected deviation rate ↑ | Larger (direct) |
| Acceptable risk of overreliance ↑ | Smaller (inverse) |
| Population size ↑ (large populations) | Little or no effect |

```worked
title: Evaluating an attribute sample
scenario: |
  The tolerable deviation rate is 7%, with a 5% risk of overreliance. Of 60 invoices tested for approval, 2 had
  no approval. From the table, the upper deviation rate for 2 deviations in 60 at 5% risk is 10.2%.
steps:
  - label: Sample deviation rate
    work: 2 ÷ 60
    result: 3.3%
  - label: Allowance for sampling risk
    work: 10.2% − 3.3%
    result: 6.9%
  - label: Compare the upper deviation rate with the tolerable rate
    work: 10.2% > 7%
    result: Can't rely on the control as planned — increase assessed control risk and expand substantive work
insight: The sample rate alone (3.3%) looks fine. The decision always uses the upper deviation rate. Also consider the nature of the deviations — one intentional deviation may matter more than the rate.
```

## Monetary unit sampling (substantive tests)

```worked
title: Projecting misstatement in MUS
scenario: |
  Receivables book value is $3,000,000; the sample size is 100, so the sampling interval is $30,000.
  Three misstatements were found.
steps:
  - label: Item A — book 6,000, audited 4,500
    work: Tainting = 1,500 ÷ 6,000 = 25%; projected = 25% × 30,000
    result: 7,500
  - label: Item B — book 40,000, audited 37,000
    work: Book value ≥ interval, so use the actual misstatement
    result: 3,000
  - label: Item C — book 12,000, audited 11,400
    work: Tainting = 600 ÷ 12,000 = 5%; projected = 5% × 30,000
    result: 1,500
  - label: Total projected misstatement
    work: 7,500 + 3,000 + 1,500
    result: 12,000
insight: The upper misstatement limit adds basic precision (interval × reliability factor) and an incremental allowance to the projection; if it exceeds tolerable misstatement, the balance may be materially misstated.
```

```faded
title: Your turn — MUS interval and projection
scenario: |
  Inventory book value is $2,400,000 and the sample size is 80. One item with a book value of $8,000 has an
  audited value of $6,000.
steps:
  - label: Sampling interval
    answer: 30000
    solution: 2,400,000 ÷ 80 = 30,000
  - label: Tainting percentage (as a decimal)
    answer: 0.25
    tolerance: 0.001
    solution: (8,000 − 6,000) ÷ 8,000 = 0.25
  - label: Projected misstatement
    answer: 7500
    solution: 0.25 × 30,000 = 7,500
```

```check
aud-sa-chk2
```
