# Automated cue hints (heuristics only — judge each). REVEALS KEY INFORMATION: open only after blind-answers.csv is saved.

| id | flags |
|---|---|
| tcp-gt-pre1 | absolutes only in distractors d |
| tcp-gt-chk1 | absolutes only in distractors b |
| tcp-gt-chk2 | key much longest; key repeats most stem words (2) |
| tcp-gt-01 | absolutes only in distractors d |
| tcp-gt-02 | key longest |
| tcp-gt-03 | absolutes only in distractors b |
| tcp-gt-06 | absolutes only in distractors b |
| tcp-gt-08 | key longest |
| tcp-gt-09 | key longest |
| tcp-gt-10 | key much longest |
| tcp-gt-16 | key much shortest |
| tcp-gt-18 | key longest |
| tcp-gt-20 | key longest |
| tcp-gt-21 | absolutes only in distractors b,c |
| tcp-gt-23 | key much shortest |
| tcp-gt-28 | key much shortest |
| tcp-gt-29 | key much shortest |
| tcp-gt-34 | key much shortest |
| tcp-gt-36 | key much shortest |
| tcp-gt-37 | key much shortest |
| tcp-gt-39 | key much longest; absolutes only in distractors b,c |
| tcp-gt-40 | key much shortest; absolutes only in distractors c,d |
| tcp-gt-41 | absolutes only in distractors a |
| tcp-gt-42 | key longest; absolutes only in distractors d |
| tcp-x1-13 | absolutes only in distractors d |
| tcp-x1-16 | key longest |
| tcp-x1-24 | key longest; absolutes only in distractors d; key repeats most stem words (3) |
| reg-x5-19 | absolutes only in distractors d |
| tcp-x1-42 | absolutes only in distractors a |
| tcp-x1-43 | key much shortest |

## Near-duplicate stems within this batch (Jaccard ≥ 0.5 on word sets)

- tcp-gt-chk1 ~ reg-x5-19: 0.62
- tcp-gt-01 ~ tcp-x1-33: 0.52
- tcp-gt-05 ~ tcp-gt-26: 0.50
- tcp-gt-10 ~ tcp-x1-42: 0.50
- tcp-gt-13 ~ tcp-gt-30: 0.63
- tcp-gt-28 ~ tcp-x1-43: 0.62

## Label distribution (practice + exam pools)

skill: {'application': 31, 'remembering': 8, 'analysis': 14}
difficulty: {2: 23, 1: 8, 3: 22}
key letters: {'a': 14, 'c': 13, 'd': 12, 'b': 14}
calc: {True: 25, False: 28}
