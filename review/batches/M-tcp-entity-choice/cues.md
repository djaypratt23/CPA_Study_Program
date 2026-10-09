# Automated cue hints (heuristics only — judge each)

| id | key | flags |
|---|---|---|
| tcp-ec-01 | a | key longest |
| tcp-ec-02 | d | key longest; absolutes only in distractors b |
| tcp-ec-03 | c | absolutes only in distractors d |
| tcp-ec-04 | d | key longest |
| tcp-ec-05 | a | key much longest; absolutes only in distractors b |
| tcp-ec-06 | d | absolutes only in distractors b |
| tcp-ec-07 | c | absolutes only in distractors a |
| tcp-ec-08 | c | absolutes only in distractors d |
| tcp-ec-09 | a | key longest |
| tcp-ec-10 | d | key longest |
| tcp-ec-12 | a | key much shortest |
| tcp-ec-13 | b | absolutes only in distractors d |
| tcp-ec-17 | b | absolutes only in distractors d |
| tcp-ec-18 | c | absolutes only in distractors a,d |
| tcp-ec-22 | b | absolutes only in distractors c,d |
| tcp-ec-34 | c | key much shortest |
| tcp-ec-35 | d | absolutes only in distractors b |
| tcp-ec-37 | b | key longest |
| tcp-ec-38 | c | absolutes only in distractors a |
| tcp-ec-39 | d | key longest; absolutes only in distractors a,b,c |
| tcp-ec-43 | d | absolutes only in distractors c |
| tcp-ec-45 | b | absolutes only in distractors a,c |
| tcp-x3-01 | c | key much longest |

## Near-duplicate stems within this batch (Jaccard ≥ 0.5 on word sets)

- tcp-ec-04 ~ tcp-ec-38: 0.55
- tcp-ec-27 ~ tcp-x3-16: 0.50

## Label distribution (practice + exam pools)

skill: {'application': 30, 'remembering': 7, 'analysis': 14}
difficulty: {2: 25, 1: 7, 3: 19}
key letters: {'a': 13, 'd': 13, 'c': 15, 'b': 10}
calc: {False: 38, True: 13}
