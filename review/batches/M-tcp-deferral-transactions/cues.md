# Automated cue hints (heuristics only — judge each)

| id | key | flags |
|---|---|---|
| tcp-dt-pre1 | a | key longest; key repeats most stem words (2) |
| tcp-dt-chk1 | a | absolutes only in distractors d |
| tcp-dt-chk2 | b | key longest |
| tcp-dt-03 | c | key longest |
| tcp-dt-05 | d | absolutes only in distractors c |
| tcp-dt-06 | a | absolutes only in distractors d |
| tcp-dt-09 | c | all/none/both-of-above option; absolutes only in distractors b |
| tcp-dt-10 | d | absolutes only in distractors a |
| tcp-dt-11 | d | absolutes only in distractors b; key repeats most stem words (3) |
| tcp-dt-15 | c | absolutes only in distractors a,b |
| tcp-dt-18 | b | absolutes only in distractors a,c,d |
| tcp-dt-19 | c | absolutes only in distractors a,b |
| tcp-dt-30 | b | key much shortest |
| tcp-dt-33 | a | absolutes only in distractors b,c,d |
| tcp-dt-37 | a | absolutes only in distractors c |
| tcp-dt-38 | b | key much longest; absolutes only in distractors a,c |
| tcp-dt-45 | a | absolutes only in distractors b,c,d |
| tcp-dt-46 | b | absolutes only in distractors c |
| tcp-x4-07 | a | key longest |
| reg-x3-06 | b | absolutes only in distractors c |
| tcp-x4-14 | b | absolutes only in distractors d; key repeats most stem words (4) |
| tcp-x4-18 | b | absolutes only in distractors a |

## Near-duplicate stems within this batch (Jaccard ≥ 0.5 on word sets)

- tcp-dt-03 ~ tcp-dt-26: 0.67
- tcp-dt-03 ~ tcp-x4-07: 0.67
- tcp-dt-09 ~ tcp-x4-18: 0.60

## Label distribution (practice + exam pools)

skill: {'application': 35, 'remembering': 9, 'analysis': 13}
difficulty: {2: 24, 1: 9, 3: 24}
key letters: {'c': 13, 'a': 16, 'd': 14, 'b': 14}
calc: {True: 26, False: 31}
