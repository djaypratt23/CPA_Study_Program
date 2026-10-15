# Spot-check — M-far-consolidations (orchestrator)

Sample: 3 of 22 no-finding items (14%). I also confirmed all three S1s.
- **Lesson line 48:** it lists "control is temporary" as a consolidation exception. That exception was removed (SFAS 144; not in ASC 810-10-15-10).
- **Lesson line 101:** it says "25% markup on cost; 25% of the selling price" for a 20,000 profit on a 60,000 cost. 20,000/60,000 is 33⅓% on cost; 25% is of the 80,000 price.
- **`scoreJournal` (src/lib/tbsScoring.ts):** it matches expected lines one by one on account, side and amount, so a correct netted entry (Dr Sales 100,000; Cr COGS 90,000; Cr Inventory 10,000) loses the two COGS cells.

| Item | Independent check | Result |
|---|---|---|
| far-con-05 | Intercompany land gain 60,000 is eliminated; land at the group's 150,000 carrying amount = key (d). | Agree |
| far-con-11 | 300,000 + 180,000 − 40,000 = 440,000 = key (d). | Agree |
| far-con-fc4 | 25% markup on cost → 0.25/1.25 = 20% of transfer price; formula correct. | Agree |

Outcome: no misses. Batch accepted.
