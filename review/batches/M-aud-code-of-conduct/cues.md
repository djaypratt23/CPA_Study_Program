# Automated cue hints (heuristics only — judge each)

| id | key | flags |
|---|---|---|
| aud-coc-pre1 | b | key longest |
| aud-coc-chk2 | b | key longest; absolutes only in distractors a,c,d |
| aud-coc-01 | d | absolutes only in distractors b |
| aud-coc-02 | d | key much shortest |
| aud-coc-03 | c | absolutes only in distractors a,b,d |
| aud-coc-04 | a | key longest |
| aud-coc-05 | c | absolutes only in distractors d |
| aud-coc-07 | a | absolutes only in distractors c |
| aud-coc-09 | c | absolutes only in distractors a |
| aud-coc-11 | c | absolutes only in distractors d |
| aud-coc-12 | a | key much shortest; absolutes only in distractors b,d |
| aud-coc-14 | c | key much shortest; absolutes only in distractors b,d |
| aud-coc-16 | c | absolutes only in distractors a,b,d |
| aud-coc-17 | d | key much shortest |
| aud-coc-18 | a | absolutes only in distractors b,c,d |
| aud-coc-19 | b | absolutes only in distractors a,c,d |
| aud-coc-20 | c | key much shortest |
| aud-coc-21 | c | key repeats most stem words (2) |
| aud-coc-22 | d | absolutes only in distractors a,b,c |
| aud-coc-27 | a | absolutes only in distractors b,c,d |
| aud-x1-17 | a | absolutes only in distractors b,c |
| aud-x1-25 | a | absolutes only in distractors b |
| aud-x1-26 | b | key much shortest; key repeats most stem words (2) |

## Near-duplicate stems within this batch (Jaccard ≥ 0.5 on word sets)

- aud-coc-07 ~ aud-x1-25: 0.55
- aud-coc-25 ~ aud-x1-02: 0.50

## Label distribution (practice + exam pools)

skill: {'application': 18, 'remembering': 10, 'analysis': 5, 'evaluation': 3}
difficulty: {2: 17, 1: 9, 3: 10}
key letters: {'d': 9, 'c': 13, 'a': 9, 'b': 5}
calc: {False: 36}
