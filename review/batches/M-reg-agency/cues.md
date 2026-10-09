# Automated cue hints (heuristics only — judge each)

| id | key | flags |
|---|---|---|
| reg-ag-pre1 | b | key longest |
| reg-ag-chk1 | b | absolutes only in distractors c |
| reg-ag-01 | c | absolutes only in distractors a,b |
| reg-ag-02 | c | absolutes only in distractors a |
| reg-ag-04 | a | key much shortest |
| reg-ag-05 | c | absolutes only in distractors a,b |
| reg-ag-06 | d | key longest |
| reg-ag-07 | d | key longest; absolutes only in distractors a |
| reg-ag-08 | c | absolutes only in distractors a,b |
| reg-ag-09 | a | key much longest |
| reg-ag-10 | d | absolutes only in distractors a,b,c |
| reg-ag-12 | d | key much shortest |
| reg-ag-13 | a | absolutes only in distractors b,c,d |
| reg-ag-14 | b | absolutes only in distractors d |
| reg-ag-15 | c | key longest; absolutes only in distractors b |
| reg-ag-16 | c | absolutes only in distractors a,b,d |
| reg-ag-17 | d | absolutes only in distractors a,c |
| reg-ag-18 | a | key much shortest |
| reg-ag-19 | b | absolutes only in distractors a,c,d |
| reg-ag-21 | a | key much shortest; absolutes only in distractors b,c |
| reg-ag-22 | b | absolutes only in distractors a,c,d |
| reg-ag-23 | c | all/none/both-of-above option; absolutes only in distractors d |
| reg-ag-24 | d | key much shortest; absolutes only in distractors a,b,c |
| reg-ag-25 | a | absolutes only in distractors b,c,d |
| reg-ag-26 | b | absolutes only in distractors a,c; key repeats most stem words (2) |
| reg-ag-27 | c | absolutes only in distractors a |
| reg-ag-29 | a | absolutes only in distractors b,d |
| reg-ag-30 | b | key longest; absolutes only in distractors a,c,d |
| reg-ag-31 | c | absolutes only in distractors d |
| reg-ag-32 | d | key much shortest |
| reg-ag-33 | a | key much shortest |
| reg-x2-01 | c | absolutes only in distractors a,b,d |
| reg-x2-02 | d | key much longest |
| reg-x2-03 | a | key much shortest |
| reg-x2-17 | d | absolutes only in distractors b |
| reg-x2-18 | a | absolutes only in distractors b,c |
| reg-x2-24 | c | absolutes only in distractors a |

## Near-duplicate stems within this batch (Jaccard ≥ 0.5 on word sets)

- reg-ag-pre1 ~ reg-ag-31: 0.58
- reg-ag-04 ~ reg-ag-14: 1.00
- reg-ag-04 ~ reg-x2-24: 1.00
- reg-ag-06 ~ reg-x2-03: 0.80
- reg-ag-14 ~ reg-x2-24: 1.00

## Label distribution (practice + exam pools)

skill: {'application': 12, 'remembering': 13, 'analysis': 14}
difficulty: {2: 13, 1: 12, 3: 14}
key letters: {'c': 13, 'd': 11, 'a': 10, 'b': 5}
calc: {False: 39}
