# Automated cue hints (heuristics only — judge each). REVEALS KEY INFORMATION: open only after blind-answers.csv is saved.

| id | flags |
|---|---|
| reg-cc-02 | absolutes only in distractors d |
| reg-cc-03 | absolutes only in distractors b |
| reg-cc-04 | key longest |
| reg-cc-07 | key longest; absolutes only in distractors a,c; key repeats most stem words (2) |
| reg-cc-09 | key longest; absolutes only in distractors b,c,d |
| reg-cc-10 | key longest |
| reg-cc-12 | absolutes only in distractors b |
| reg-cc-20 | absolutes only in distractors d |
| reg-cc-23 | key longest |
| reg-cc-25 | key much longest |
| reg-cc-26 | absolutes only in distractors a |
| reg-x5-01 | absolutes only in distractors d |
| reg-x5-02 | absolutes only in distractors b,d |
| reg-x5-04 | absolutes only in distractors a |
| tcp-x2-01 | key longest |
| reg-x5-38 | key repeats most stem words (2) |
| reg-x5-40 | absolutes only in distractors d |

## Near-duplicate stems within this batch (Jaccard ≥ 0.5 on word sets)

- reg-cc-pre1 ~ reg-cc-31: 0.50
- reg-cc-chk1 ~ reg-x5-03: 0.50
- reg-cc-01 ~ reg-x5-37: 0.50
- reg-cc-02 ~ reg-cc-21: 0.56
- reg-cc-02 ~ reg-x5-37: 0.81
- reg-cc-03 ~ reg-cc-29: 0.50
- reg-cc-03 ~ reg-x5-24: 0.53
- reg-cc-04 ~ reg-x5-38: 0.50
- reg-cc-13 ~ reg-x5-27: 0.70
- reg-cc-20 ~ reg-x5-40: 0.55
- reg-cc-21 ~ reg-x5-37: 0.61
- reg-cc-29 ~ reg-x5-04: 0.57
- reg-cc-29 ~ reg-x5-24: 0.53

## Label distribution (practice + exam pools)

skill: {'application': 26, 'remembering': 12, 'analysis': 14}
difficulty: {2: 26, 1: 12, 3: 14}
key letters: {'a': 16, 'c': 16, 'd': 13, 'b': 7}
calc: {True: 29, False: 23}
