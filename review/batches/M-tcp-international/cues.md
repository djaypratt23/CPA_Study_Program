# Automated cue hints (heuristics only — judge each)

| id | key | flags |
|---|---|---|
| tcp-intl-pre1 | b | key longest |
| tcp-intl-02 | b | key repeats most stem words (2) |
| tcp-intl-03 | c | key repeats most stem words (3) |
| tcp-intl-04 | d | absolutes only in distractors c |
| tcp-intl-05 | a | absolutes only in distractors c |
| tcp-intl-06 | b | key much shortest |
| tcp-intl-07 | c | absolutes only in distractors a,b,d; key repeats most stem words (2) |
| tcp-intl-09 | a | absolutes only in distractors c |
| tcp-intl-11 | c | absolutes only in distractors b,d |
| tcp-intl-15 | b | absolutes only in distractors a,c |
| tcp-intl-16 | b | key longest |
| tcp-intl-17 | c | key longest; absolutes only in distractors d |
| tcp-intl-19 | a | key much shortest |
| tcp-intl-20 | b | absolutes only in distractors c,d |
| tcp-intl-21 | c | absolutes only in distractors a |
| tcp-intl-24 | a | key much longest; absolutes only in distractors b |
| tcp-intl-27 | d | all/none/both-of-above option |
| tcp-intl-29 | b | key much shortest |
| tcp-intl-30 | c | absolutes only in distractors d |
| tcp-intl-31 | d | absolutes only in distractors b |
| tcp-intl-34 | c | key repeats most stem words (2) |
| tcp-intl-35 | d | absolutes only in distractors a,b |
| tcp-intl-37 | b | key much longest |
| tcp-intl-43 | d | absolutes only in distractors c |
| tcp-intl-46 | c | absolutes only in distractors a |
| tcp-intl-48 | a | key much shortest; absolutes only in distractors b,c,d |
| tcp-x2-38 | c | absolutes only in distractors d |

## Near-duplicate stems within this batch (Jaccard ≥ 0.5 on word sets)

- tcp-intl-chk1 ~ tcp-intl-09: 0.67
- tcp-intl-chk1 ~ tcp-x2-29: 0.54

## Label distribution (practice + exam pools)

skill: {'remembering': 8, 'application': 29, 'analysis': 13}
difficulty: {1: 8, 2: 21, 3: 21}
key letters: {'a': 13, 'b': 13, 'c': 13, 'd': 11}
calc: {False: 31, True: 19}
