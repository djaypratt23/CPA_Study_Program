# C-duplicates: cross-module duplicate and contradiction review

Scope: all 4,579 MCQs (module `questions.json` files plus `exam-questions/*.json`), per the brief's check 7.

## Method

1. I read all 510 candidate pairs from `candidates.tsv` (rendered in `pairs-1.md` and `pairs-2.md`) and classified each one in `classification.tsv` (pair, id_a, id_b, class, note). I recomputed numeric pairs whose answers differ. Where two items covered the same fact with different keys, I opened both full items (`scripts/show.py`).
2. Supplementary scans, in `scripts/`:
   - `tfidf_scan.py`: TF-IDF cosine over the stem plus the keyed-answer text. It found 981 further pairs at 0.50 or higher that `candidates.tsv` didn't have; 342 of them involve an exam item. I reviewed all exam-involving pairs that had the same or a contained key, or a cosine of 0.6 or more (161 pairs), plus the top non-exam pairs.
   - `contra_scan.py`: stem-only cosine of 0.6 or more, identical numbers in both stems, and different keys. This looks for contradictions; I reviewed all 208 pairs.
   - A scan of keyed answers for due dates that fall on a weekend.
   - Confirmed pairs from these scans are in `scripts/extra_confirmed.txt` (151 pairs). They feed the findings but are not part of the 510-row classification.
3. `scripts/build.py` builds `classification.tsv` and the generated findings (004 onward) from `cls_raw.txt` and `extra_confirmed.txt`.

## Classification of the 510 candidate pairs

| Class | Meaning | Pairs |
|---|---|---|
| a | exact or near-exact duplicate (same pool type) | 123 |
| b | practice/lesson ↔ exam duplicate, or REG ↔ TCP duplicate | 113 |
| c | contradiction | 3 |
| d | legitimate variation (different numbers or angle) | 271 |

I recomputed every numeric class-d pair, and none has a wrong key. Examples: inventory cost flows, goodwill and asset impairment, DRD, NOL, SALT, §179, kiddie tax, FTC, rental allowance, DDB/SYD and NIIT.

## Contradictions (3 in the candidates, 1 more from the date scan)

- **C-duplicates-001 (S1)**: aud-ss-26 keys the superseded pre-SSARS 25 review rule ("disclose it in a paragraph"). aud-ss-07 correctly keys a qualified or adverse review conclusion (SSARS 25 / AR-C 90).
- **C-duplicates-002 (S2)**: reg-x5-41 keys the 2025 Form 1065 due date as "March 15, 2026", a Sunday. tcp-po-06, reg-tbs-x5-research and tcp-numbers.md all say March 16, 2026 (§7503). The date scan found the same problem in reg-x5-44: the S election is keyed "March 15, 2025", a Saturday, while tcp-sc2-01 keys March 17, 2025.
- **C-duplicates-003 (S2, medium confidence)**: aud-qm-13 says SQMS No. 1 requires EQRs for listed-entity audits, which is the ISQM 1 rule. aud-qm-23 and the module lesson give the AICPA rule: engagements required by law or regulation, plus those the firm designates.

No other contradictions turned up. Pairs whose keys look opposed turned out to be mirror questions (is / is not), different stages (first step vs ultimate response), or AICPA vs PCAOB.

## Practice/lesson ↔ exam leakage (S2, one finding per section)

| Section | Exam pool size | Exam items with a practice/lesson twin | Pairs | Finding |
|---|---|---|---|---|
| AUD | 156 | 41 (26%) | 49 | C-duplicates-004 |
| FAR | 104 | 15 (14%) | 16 | C-duplicates-005 |
| REG | 148 | 35 (24%) | 48 | C-duplicates-006 |
| TCP | 136 | 40 (29%) | 45 | C-duplicates-007 |

Many of these use identical numbers and options. Examples: far-rat-22 = far-x1-36, reg-ot-12 = reg-x4-32, reg-dep-04 = tcp-x4-08, tcp-ad-26 = tcp-x4-11, far-gov-24 = far-x1-17 and aud-pl-chk2 = aud-x2-39. Some cross sections: a REG practice item duplicates a TCP exam item (e.g., reg-te-01 = tcp-x1-13), and FAR or REG practice items duplicate AUD exam items (far-nd-12 = aud-x3-51, reg-al-16 = aud-x1-18). The counts are a floor. The supplementary scan has more exam-involving pairs between cosine 0.50 and 0.60 that I didn't review one by one.

## REG ↔ TCP duplicates (S3, C-duplicates-008)

46 pairs, many verbatim. Examples: tcp-sc2-pre1 = reg-sc-pre1, tcp-sc2-33 = reg-sc-17, tcp-re-31 = reg-adj-30, tcp-pa-31 = reg-bri-14 and tcp-ms-01 = reg-slt-23. Four pairs are exam-pool items in both sections: tcp-x1-21 = reg-x4-31, tcp-x2-10 = reg-x5-15, reg-x5-11 = tcp-x3-14 and tcp-x1-12 = reg-x4-08.

## Clusters where the same fact is tested more than about 3 times (S3, findings 009–033)

There are 25 clusters. Notable ones:
- $25,000 rental allowance phase-out: 8 items, 3 of them in exam pools.
- DRD with taxable-income limit: 8.
- 2025 SALT cap: 8.
- Post-2017 80% NOL limit: 7.
- §1245 recapture characterization: 7.
- Goodwill impairment cap: 6.
- AOTC: 6, including $3,000 → $2,250 four times, three of them in exam pools.
- Tax Court 90 days: 6.
- Form 1065 due date: 5 (it also carries the contradiction in 002).
- Guaranteed payments: 5.
- Predecessor other-matter paragraph: 5.
- Each of the rest has 4 items: Form 1120 due date, lead partner rotation, earliest report date, §179 phase-out, kiddie tax, IRA phase-out, §6694(a), §1244, capital interest for services, holding-period tacking, representation letter date, 401(k) catch-up, SE tax of $7,065, and fair value less transport.

## Near-duplicate clusters (S3, findings 034–181)

There is one finding per connected cluster of class-a pairs (148 in all), skipping clusters already covered by a >3 cluster:
- 105 within practice.
- 33 lesson ↔ practice: the lesson check repeats a practice item almost word for word.
- 10 inside an exam pool, where a mock can draw both items: far-x2-04 = far-x2-20, far-x1-04 = far-x1-20, aud-x3-02 = aud-x3-28, aud-x3-19 = aud-x3-38, aud-x3-10 = aud-x3-45, aud-x1-10 = aud-x1-32, aud-x3-11 = aud-x3-46, reg-x5-02 = reg-x5-28, reg-x3-01 = reg-x3-10 and tcp-x2-03 = tcp-x2-36.

Four more exam-pool pairs sit inside the >3 clusters rather than getting their own finding: reg-x4-17 = reg-x4-31, reg-x1-06 = reg-x1-15, aud-x3-27 = aud-x3-52 and tcp-x2-07 = tcp-x2-31.

Exact verbatim pairs inside one module include:
- far-nfs-14 = far-nfs-27
- far-nd-11 = far-nd-22
- far-gov-01 = far-gov-11
- far-inv-14 = far-inv-26
- far-cash-17 = far-cash-25
- far-pay-17 = far-pay-22
- reg-fs-06 = reg-fs-26
- reg-pb-09 = reg-pb-27
- tcp-fl-05 = tcp-fl-32
- tcp-gt-05 = tcp-gt-26
- tcp-cr-10 = tcp-cr-29

## Other observations (not findings)

- Several items carry a `moduleId` from the other section. TCP-prefixed items sit in `reg-cost-recovery` (tcp-cr2-*, tcp-x4-08). REG exam items are tagged to TCP modules (reg-x4-09 → tcp-passive-rental, reg-x5-09 → tcp-formation-liquidation, reg-x3-05 → tcp-asset-dispositions, reg-x5-19 → tcp-gift-tax, reg-x3-06 → tcp-deferral-transactions). This may skew per-module statistics. I'm leaving it to the per-module and section reviewers.
- Four FAR exam-pool items use module-style ids: far-scf-01, far-iso-01, far-eps-03 and far-rec-07. The ids are unique bank-wide, so nothing collides.
- The weekend-date convention is inconsistent across the bank. Generic items say "March 15", year-specific TCP items and the TBS say "March 16, 2026", and two REG exam items use the weekend date (finding 002).
