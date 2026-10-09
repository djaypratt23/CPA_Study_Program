# Automated cue hints (heuristics only — judge each). REVEALS KEY INFORMATION: open only after blind-answers.csv is saved.

| id | flags |
|---|---|
| aud-ic-chk2 | absolutes only in distractors a |
| aud-ic-01 | absolutes only in distractors a,b |
| aud-ic-02 | absolutes only in distractors b |
| aud-ic-03 | key longest |
| aud-ic-08 | key longest |
| aud-ic-09 | absolutes only in distractors a,b |
| aud-ic-10 | key longest; key repeats most stem words (2) |
| aud-ic-11 | absolutes only in distractors d |
| aud-ic-12 | key much shortest |
| aud-ic-14 | absolutes only in distractors a |
| aud-ic-15 | key longest |
| aud-ic-17 | absolutes only in distractors b |
| aud-ic-20 | absolutes only in distractors b |
| aud-ic-25 | absolutes only in distractors b |
| aud-ic-26 | absolutes only in distractors c |
| aud-x2-29 | key much shortest; absolutes only in distractors c,d |

## Near-duplicate stems within this batch (Jaccard ≥ 0.5 on word sets)

- aud-ic-01 ~ aud-ic-08: 0.50
- aud-ic-02 ~ aud-x2-29: 0.60
- aud-ic-08 ~ aud-ic-22: 0.50
- aud-ic-08 ~ aud-x2-15: 0.50

## Label distribution (practice + exam pools)

skill: {'remembering': 13, 'application': 11, 'analysis': 8, 'evaluation': 2}
difficulty: {1: 13, 2: 11, 3: 10}
key letters: {'c': 11, 'd': 4, 'a': 15, 'b': 4}
calc: {False: 34}
