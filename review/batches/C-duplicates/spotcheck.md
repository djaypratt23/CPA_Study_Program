# Spot-check — C-duplicates (orchestrator)

I re-verified the three contradiction findings against the items:

- **aud-ss-26 (S1).** The key is "Disclose it in a paragraph" (the pre-SSARS 25 known-departure paragraph). SSARS 25 (AR-C 90 as amended; effective for periods ending on or after Dec 15, 2025, so testable from Jan 1, 2026 under the current AICPA rule) requires a qualified or adverse conclusion. aud-ss-07 already keys the new rule. Confirmed.
- **reg-x5-41 / reg-x5-44 (S2).** `datetime.date(2026,3,15)` is a Sunday and `date(2025,3,15)` is a Saturday. Under §7503 the deadlines are March 16, 2026 and March 17, 2025, which the bank's own TCP items and TBS use. Confirmed as an inconsistency.
- **aud-qm-13 (S2, medium).** Left at medium confidence; the module reviewer for aud-quality-management will see it as well.

The leakage counts (exam items with a practice twin) come from classification.tsv. I sampled two pairs of class (b) by hand (far-x1-30 ~ far-scf-24 and far-x1-36 ~ far-rat-22, both also reported independently by the module reviewers). Both are verbatim duplicates.

Outcome: batch accepted. In the final dedupe pass, module-batch duplicate findings that repeat a C-duplicates cluster are merged into it.
