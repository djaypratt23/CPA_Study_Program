# Spot-check — M-far-cash (orchestrator)

Sample: 3 of 15 no-finding items (20%). I also confirmed the S1. Running `parseAmount('+360')` (src/lib/tbsScoring.ts:55) returns `null`, so the row labelled "(enter + or −)" scores a correctly typed "+360" as blank. The parser rejects a leading "+" for every numeric/review/journal input in the app, so the fix belongs in `parseAmount`. Only this one row explicitly asks for a "+".

| Item | Independent check | Result |
|---|---|---|
| far-cash-chk1 | 52,000 + 300 + 25,000 = 77,300 = key (a). Postdated check is a receivable; stamps are prepaid. (c) 81,450 and (d) 81,300 reproduce. | Agree |
| far-cash-10 | Recorded 1,670 vs actual 1,760: books overstate cash by 90 → deduct 90 on the book side. Key (d). | Agree |
| far-cash-14 | ASC 230-10-20: cash equivalents have an original maturity to the holder of three months or less; 4 months → short-term investment. Key (d). | Agree |

Outcome: no misses. Batch accepted.
