# Spot-check — M-far-income-taxes (orchestrator)

Sample: 3 of 15 no-finding items (20%). F-0945 is upgraded to S1 (see `_adjustments.md`); it is the same root cause as the other journal-scoring S1s.

| Item | Independent check | Result |
|---|---|---|
| far-tax-04 | ΔDTL +15,000 − ΔDTA +6,000 = 9,000 deferred expense = key (d). (b) 21,000 wrong sign; (c) −6,000 DTA only. | Agree |
| far-tax-10 | Post-2017 federal NOLs carry forward indefinitely (80% limit on use), so DTA 1,000,000 × 21% = 210,000 if realization is more likely than not. Key (c). | Agree |
| far-tax-15 | ASC 740-20 intraperiod allocation: the tax benefit goes with discontinued operations, net of tax. Key (c). | Agree |

Outcome: no misses. Batch accepted, with one severity upgrade.
