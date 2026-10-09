# Automated cue hints (heuristics only — judge each). REVEALS KEY INFORMATION: open only after blind-answers.csv is saved.

| id | flags |
|---|---|
| tcp-pa-chk1 | absolutes only in distractors c |
| tcp-pa-02 | absolutes only in distractors d |
| tcp-pa-05 | absolutes only in distractors c |
| tcp-pa-06 | key much longest; absolutes only in distractors d |
| tcp-pa-08 | absolutes only in distractors c |
| tcp-pa-09 | key much shortest |
| tcp-pa-10 | absolutes only in distractors c |
| tcp-pa-13 | absolutes only in distractors a |
| tcp-pa-15 | absolutes only in distractors b |
| tcp-pa-16 | key much shortest |
| tcp-pa-17 | key much shortest |
| tcp-pa-18 | key much shortest; absolutes only in distractors a,b,d |
| tcp-pa-19 | key longest |
| tcp-pa-22 | absolutes only in distractors a |
| tcp-pa-25 | key longest; absolutes only in distractors b |
| tcp-pa-29 | key longest; absolutes only in distractors d |
| tcp-pa-32 | key longest; absolutes only in distractors a,c |
| tcp-pa-33 | key much shortest; absolutes only in distractors b |
| tcp-pa-35 | key much shortest; absolutes only in distractors a,b,d |
| tcp-pa-39 | key much shortest |
| tcp-pa-40 | absolutes only in distractors a,c |
| tcp-pa-41 | absolutes only in distractors c; key repeats most stem words (2) |
| tcp-pa-42 | absolutes only in distractors a,c,d |
| tcp-x1-09 | absolutes only in distractors d |
| tcp-x1-10 | absolutes only in distractors a,b |
| tcp-x1-12 | key longest; absolutes only in distractors a |
| reg-x4-09 | absolutes only in distractors c |
| tcp-x1-41 | absolutes only in distractors d |

## Near-duplicate stems within this batch (Jaccard ≥ 0.5 on word sets)

- tcp-pa-chk1 ~ reg-x4-09: 0.53
- tcp-pa-11 ~ tcp-x1-09: 0.59
- tcp-pa-11 ~ reg-x4-09: 0.79
- tcp-pa-11 ~ tcp-x1-31: 0.59
- tcp-x1-09 ~ reg-x4-09: 0.65
- tcp-x1-09 ~ tcp-x1-31: 0.50
- reg-x4-09 ~ tcp-x1-31: 0.56

## Label distribution (practice + exam pools)

skill: {'remembering': 8, 'application': 32, 'analysis': 14}
difficulty: {1: 8, 3: 23, 2: 23}
key letters: {'d': 16, 'a': 12, 'c': 14, 'b': 12}
calc: {False: 29, True: 25}
