# Automated cue hints (heuristics only — judge each). REVEALS KEY INFORMATION: open only after blind-answers.csv is saved.

| id | flags |
|---|---|
| tcp-cr2-chk1 | absolutes only in distractors d |
| tcp-cr2-02 | key much longest |
| tcp-cr2-03 | absolutes only in distractors b |
| tcp-cr2-05 | key much longest |
| tcp-cr2-06 | absolutes only in distractors b |
| tcp-cr2-08 | absolutes only in distractors d |
| tcp-cr2-10 | all/none/both-of-above option |
| tcp-cr2-15 | absolutes only in distractors b,d |
| tcp-cr2-21 | absolutes only in distractors a,c,d |
| tcp-cr2-24 | key much longest; all/none/both-of-above option; key repeats most stem words (2) |
| tcp-cr2-25 | key longest |
| tcp-cr2-27 | key much longest |
| tcp-x4-08 | absolutes only in distractors d |
| tcp-x4-09 | key longest |

## Near-duplicate stems within this batch (Jaccard ≥ 0.5 on word sets)

- tcp-cr2-chk1 ~ reg-dep-04: 0.79
- tcp-cr2-chk1 ~ tcp-cr2-19: 0.50
- tcp-cr2-chk1 ~ tcp-x4-08: 0.75
- reg-dep-04 ~ tcp-x4-08: 0.95
- tcp-cr2-17 ~ tcp-x4-10: 0.74

## Label distribution (practice + exam pools)

skill: {'application': 19, 'remembering': 6, 'analysis': 14}
difficulty: {2: 20, 1: 5, 3: 14}
key letters: {'a': 8, 'c': 11, 'd': 12, 'b': 8}
calc: {True: 22, False: 17}
