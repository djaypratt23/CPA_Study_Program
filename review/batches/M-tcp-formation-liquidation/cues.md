# Automated cue hints (heuristics only — judge each). REVEALS KEY INFORMATION: open only after blind-answers.csv is saved.

| id | flags |
|---|---|
| tcp-fl-chk1 | absolutes only in distractors d |
| tcp-fl-chk2 | key longest |
| tcp-fl-01 | absolutes only in distractors b,c; key repeats most stem words (2) |
| tcp-fl-03 | absolutes only in distractors d |
| tcp-fl-07 | key longest |
| tcp-fl-08 | absolutes only in distractors d |
| tcp-fl-09 | key much shortest; absolutes only in distractors b,c,d |
| tcp-fl-10 | key longest; absolutes only in distractors d |
| tcp-fl-12 | key much longest; absolutes only in distractors a; key repeats most stem words (3) |
| tcp-fl-13 | key longest; absolutes only in distractors a,d |
| tcp-fl-16 | absolutes only in distractors d |
| tcp-fl-18 | key much shortest |
| tcp-fl-20 | key longest |
| tcp-fl-23 | absolutes only in distractors c,d |
| tcp-fl-24 | absolutes only in distractors b,d |
| tcp-fl-25 | key much longest; absolutes only in distractors c |
| tcp-fl-26 | absolutes only in distractors b,c |
| tcp-fl-30 | key much longest; absolutes only in distractors b |
| tcp-fl-32 | absolutes only in distractors a,b,d |
| tcp-fl-34 | absolutes only in distractors b,c |
| tcp-fl-35 | absolutes only in distractors a,c,d |
| tcp-fl-36 | key longest |
| tcp-fl-39 | key much longest; absolutes only in distractors c |
| tcp-fl-42 | absolutes only in distractors c |
| tcp-fl-43 | key longest |
| tcp-fl-45 | absolutes only in distractors c |
| tcp-x3-06 | key longest; absolutes only in distractors b |
| tcp-x3-07 | key longest; absolutes only in distractors d |
| reg-x5-07 | absolutes only in distractors a |
| reg-x5-08 | key much longest |
| reg-x5-10 | key longest; absolutes only in distractors b,c,d; key repeats most stem words (3) |
| tcp-x3-17 | absolutes only in distractors a,b,c |
| tcp-x3-18 | absolutes only in distractors c |
| tcp-x3-19 | absolutes only in distractors a,d |

## Near-duplicate stems within this batch (Jaccard ≥ 0.5 on word sets)

- tcp-fl-02 ~ tcp-fl-21: 0.50
- tcp-fl-15 ~ tcp-fl-31: 0.53
- tcp-fl-21 ~ reg-x5-09: 0.55
- tcp-fl-35 ~ tcp-x3-17: 0.52

## Label distribution (practice + exam pools)

skill: {'application': 37, 'remembering': 8, 'analysis': 15}
difficulty: {2: 27, 1: 8, 3: 25}
key letters: {'d': 15, 'a': 16, 'c': 14, 'b': 15}
calc: {False: 32, True: 28}
