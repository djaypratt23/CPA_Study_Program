# Spot-check — M-far-receivables (orchestrator)

Sample: 3 of 14 no-finding items (21%).

| Item | Independent check | Result |
|---|---|---|
| far-rec-01 | Key: 15,000 − 12,000 + 1,500 = 4,500; 22,000 − 4,500 = 17,500 = (b). Correct. **But** (c) $20,500 is explained as "ignores the recovery". Ignoring it gives 19,000; 20,500 = 22,000 − (15,000 − 12,000 − 1,500), i.e. the recovery's sign is flipped, so the explanation and the trap label are wrong. | **Miss** |
| far-rec-07 | Fee 80,000 × 2% = 1,600 loss; holdback 3,200 is a receivable from the factor. Key (a). | Agree |
| far-rec-fc1 | CECL: expected lifetime credit losses from initial recognition, using history, current conditions and reasonable and supportable forecasts. | Agree |

**Miss handling.** I sent the reviewer back to re-run the defect class (reproduce every numeric distractor and TBS explanation). It confirmed far-rec-01(c) and found one more: far-rec-05(b), where $746,000 is gross AR but the stated error yields $716,000. Findings 011 and 006 were extended, and the batch was re-merged.

For all batches not yet started, the reviewer prompt now explicitly requires reproducing every numeric distractor. Batches merged earlier get a targeted distractor sweep before the final report.

Batch accepted after correction.
