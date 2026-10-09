# Automated cue hints (heuristics only — judge each)

| id | key | flags |
|---|---|---|
| reg-ct-chk1 | d | key longest |
| reg-ct-chk2 | a | key longest; absolutes only in distractors b |
| reg-ct-01 | c | absolutes only in distractors a,b,d; key repeats most stem words (3) |
| reg-ct-04 | c | absolutes only in distractors d |
| reg-ct-05 | d | key repeats most stem words (2) |
| reg-ct-06 | d | key longest; absolutes only in distractors a,b,c |
| reg-ct-07 | b | absolutes only in distractors c |
| reg-ct-08 | b | key longest |
| reg-ct-09 | b | absolutes only in distractors d |
| reg-ct-11 | b | key much shortest |
| reg-ct-12 | a | key longest; absolutes only in distractors b |
| reg-ct-14 | c | key longest |
| reg-ct-15 | d | key longest; absolutes only in distractors a,b,c |
| reg-ct-16 | b | key much longest |
| reg-ct-17 | c | absolutes only in distractors a |
| reg-ct-18 | d | absolutes only in distractors b |
| reg-ct-19 | a | key longest |
| reg-ct-20 | b | absolutes only in distractors c,d |
| reg-ct-21 | a | key longest; absolutes only in distractors b,c,d |
| reg-ct-22 | b | key longest |
| reg-ct-23 | c | key longest; absolutes only in distractors a,b,d |
| reg-ct-25 | a | absolutes only in distractors b,c,d |
| reg-ct-27 | c | key much longest; absolutes only in distractors a,b,d |
| reg-ct-32 | a | key much shortest |
| reg-x2-04 | c | absolutes only in distractors a |
| reg-x2-07 | c | key much shortest |
| reg-x2-20 | c | absolutes only in distractors a,b |
| reg-x2-26 | a | absolutes only in distractors c |

## Near-duplicate stems within this batch (Jaccard ≥ 0.5 on word sets)

- reg-ct-chk2 ~ reg-ct-29: 0.71
- reg-ct-01 ~ reg-ct-23: 0.56
- reg-ct-14 ~ reg-x2-25: 0.67
- reg-ct-31 ~ reg-x2-19: 0.55

## Label distribution (practice + exam pools)

skill: {'application': 17, 'remembering': 9, 'analysis': 15}
difficulty: {2: 19, 1: 7, 3: 15}
key letters: {'c': 9, 'd': 10, 'a': 10, 'b': 12}
calc: {False: 40, True: 1}
