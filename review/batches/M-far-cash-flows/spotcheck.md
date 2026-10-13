# Spot-check — M-far-cash-flows (orchestrator)

Sample: 3 of 19 no-finding items (16%). Also re-verified the batch's S1 (`far-tbs-u1-cash-flows` row `purch`): the instructions say "enter decreases in cash as negative numbers", the row is keyed +100,000 with tolerance 0, and `withinTolerance` in `src/lib/tbsScoring.ts:75` compares signed values, so −100,000 is scored wrong. Confirmed.

| Item | Independent check | Result |
|---|---|---|
| far-scf-11 | CA 80,000 − 50,000 = 30,000; loss 7,000 → proceeds 23,000 = key (c). (b) 37,000 = 30,000 + 7,000; (d) 73,000 = 80,000 − 7,000. | Agree |
| far-scf-16 | 120 + 25 + 2 − 15 + 5 + 4 − 10 = 131 = key (c). (a) 141 omits −(15 − 5); (b) 127 subtracts the amortization; (d) 126 omits dividends. | Agree |
| far-scf-fc2 | Increase in a current asset → subtract; increase in a current liability → add. | Agree |

Outcome: no misses. Batch accepted.
