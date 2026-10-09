# Automated cue hints (heuristics only — judge each)

| id | key | flags |
|---|---|---|
| tcp-pf-pre1 | d | key much longest |
| tcp-pf-chk2 | c | absolutes only in distractors d |
| tcp-pf-01 | d | key longest |
| tcp-pf-03 | c | absolutes only in distractors b |
| tcp-pf-04 | b | all/none/both-of-above option; absolutes only in distractors c |
| tcp-pf-05 | c | absolutes only in distractors d |
| tcp-pf-08 | c | key longest |
| tcp-pf-10 | a | key longest; absolutes only in distractors b,c |
| tcp-pf-14 | a | key longest |
| tcp-pf-16 | c | key much shortest |
| tcp-pf-18 | a | absolutes only in distractors c |
| tcp-pf-19 | b | absolutes only in distractors a,c |
| tcp-pf-23 | b | key much shortest; absolutes only in distractors d |
| tcp-pf-26 | c | key longest; absolutes only in distractors a,b |
| tcp-pf-29 | b | absolutes only in distractors a,d |
| tcp-pf-30 | c | key longest; absolutes only in distractors a,d |
| tcp-pf-31 | d | key much shortest |
| tcp-pf-32 | a | absolutes only in distractors c; key repeats most stem words (2) |
| tcp-pf-33 | b | key much longest |
| tcp-pf-36 | a | key longest |
| tcp-pf-38 | c | absolutes only in distractors a,d |
| tcp-pf-42 | c | absolutes only in distractors a |
| tcp-pf-44 | a | absolutes only in distractors b |
| tcp-x2-07 | b | absolutes only in distractors a |
| tcp-x2-31 | d | absolutes only in distractors a,c |

## Near-duplicate stems within this batch (Jaccard ≥ 0.5 on word sets)

- tcp-pf-04 ~ tcp-pf-18: 0.64
- tcp-pf-30 ~ tcp-x2-07: 0.54
- tcp-pf-30 ~ tcp-x2-31: 0.50

## Label distribution (practice + exam pools)

skill: {'application': 28, 'remembering': 6, 'analysis': 14}
difficulty: {2: 18, 3: 24, 1: 6}
key letters: {'d': 10, 'a': 13, 'c': 12, 'b': 13}
calc: {False: 32, True: 16}
