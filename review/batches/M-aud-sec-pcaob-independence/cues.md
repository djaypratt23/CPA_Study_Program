# Automated cue hints (heuristics only — judge each)

| id | key | flags |
|---|---|---|
| aud-spi-01 | d | key longest; key repeats most stem words (2) |
| aud-spi-02 | c | absolutes only in distractors d |
| aud-spi-03 | a | absolutes only in distractors b,c |
| aud-spi-04 | b | key longest; absolutes only in distractors a,c,d |
| aud-spi-06 | b | absolutes only in distractors c,d |
| aud-spi-07 | b | absolutes only in distractors a,d |
| aud-spi-08 | c | absolutes only in distractors a |
| aud-spi-09 | b | key longest; absolutes only in distractors c; key repeats most stem words (2) |
| aud-spi-12 | b | key much shortest; absolutes only in distractors c,d |
| aud-spi-13 | c | key much shortest; absolutes only in distractors d |
| aud-spi-14 | d | key much shortest; absolutes only in distractors c |
| aud-spi-16 | b | absolutes only in distractors d |
| aud-spi-18 | d | absolutes only in distractors b,c |
| aud-spi-19 | a | absolutes only in distractors b,c,d |
| aud-spi-20 | b | key much shortest |
| aud-spi-25 | b | absolutes only in distractors a |
| aud-spi-27 | d | absolutes only in distractors a |
| aud-x1-07 | a | absolutes only in distractors d |
| aud-x1-08 | a | key much shortest |
| aud-x1-09 | c | absolutes only in distractors a,d |
| aud-x1-27 | c | absolutes only in distractors a,b,d |
| aud-x1-28 | d | absolutes only in distractors a |

## Near-duplicate stems within this batch (Jaccard ≥ 0.5 on word sets)

- aud-spi-chk2 ~ aud-spi-16: 0.83
- aud-spi-chk2 ~ aud-spi-21: 0.62
- aud-spi-chk2 ~ aud-x1-20: 0.56
- aud-spi-04 ~ aud-x1-27: 0.50
- aud-spi-16 ~ aud-spi-21: 0.75
- aud-spi-21 ~ aud-x1-20: 0.60

## Label distribution (practice + exam pools)

skill: {'remembering': 19, 'application': 10, 'analysis': 4, 'evaluation': 2}
difficulty: {1: 17, 2: 11, 3: 7}
key letters: {'d': 7, 'c': 12, 'a': 7, 'b': 9}
calc: {False: 35}
