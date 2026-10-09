# Automated cue hints (heuristics only — judge each)

| id | key | flags |
|---|---|---|
| tcp-gt-pre1 | c | absolutes only in distractors d |
| tcp-gt-chk1 | d | absolutes only in distractors b |
| tcp-gt-chk2 | a | key much longest; key repeats most stem words (2) |
| tcp-gt-01 | a | absolutes only in distractors d |
| tcp-gt-02 | c | key longest |
| tcp-gt-03 | d | absolutes only in distractors b |
| tcp-gt-06 | d | absolutes only in distractors b |
| tcp-gt-08 | b | key longest |
| tcp-gt-09 | b | key longest |
| tcp-gt-10 | b | key much longest |
| tcp-gt-16 | d | key much shortest |
| tcp-gt-18 | b | key longest |
| tcp-gt-20 | d | key longest |
| tcp-gt-21 | a | absolutes only in distractors b,c |
| tcp-gt-23 | c | key much shortest |
| tcp-gt-28 | a | key much shortest |
| tcp-gt-29 | b | key much shortest |
| tcp-gt-34 | c | key much shortest |
| tcp-gt-36 | a | key much shortest |
| tcp-gt-37 | b | key much shortest |
| tcp-gt-39 | d | key much longest; absolutes only in distractors b,c |
| tcp-gt-40 | a | key much shortest; absolutes only in distractors c,d |
| tcp-gt-41 | b | absolutes only in distractors a |
| tcp-gt-42 | c | key longest; absolutes only in distractors d |
| tcp-x1-13 | c | absolutes only in distractors d |
| tcp-x1-16 | d | key longest |
| tcp-x1-24 | a | key longest; absolutes only in distractors d; key repeats most stem words (3) |
| reg-x5-19 | b | absolutes only in distractors d |
| tcp-x1-42 | b | absolutes only in distractors a |
| tcp-x1-43 | c | key much shortest |

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
