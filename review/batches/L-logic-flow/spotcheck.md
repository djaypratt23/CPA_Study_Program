# Spot-check — L-logic-flow (orchestrator)

This batch has no content items, so I re-verified its two most consequential findings against the code.

- **F-0151 (S1), `src/lib/analytics.ts:207`.** `const studied = args.modules.filter((m) => m.lessonDone || m.status !== 'not-started')`. Any module that has a single attempt counts as studied, so after a diagnostic the coverage term reaches about 1 and the `(1 − coverage) × UNSTUDIED_ACCURACY` penalty disappears. Confirmed.
- **F-0160 (S2), `src/lib/srs.ts:80`.** `if (confidence === 'unsure') return Rating.Hard`. In ts-fsrs, a Hard rating on a card in its learning steps keeps it on the current step instead of graduating it. The agent's simulation output (scripts/srs.out.txt) shows repeated 6-minute intervals. The mechanism is confirmed by the code. The interval values rest on the agent's simulation.

Outcome: both confirmed. Batch accepted.
