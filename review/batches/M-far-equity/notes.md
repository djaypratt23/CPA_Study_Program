# M-far-equity — reviewer notes

Scope: lesson `far-equity`, 3 lesson MCQs, 28 practice MCQs, 3 exam MCQs, 7 flashcards, 2 TBS (44 items). Blind pass saved first in `blind-answers.csv`. Every number was recomputed in python.

## (a) Blind vs key

All 34 MCQ blind answers match the keys, and so do all 18 TBS cells (u8: 3 JE lines, 5 numeric, 4 docreview; x2: 6 numeric). Two items were flagged as ambiguous during the blind pass, before I saw the keys:

| id | my answer | key | resolution |
|---|---|---|---|
| far-seq-18 | b ($5,000), flagged | b | The key is defensible, but (a) $14,000 is also a permitted GAAP treatment: ASC 505-30-30-8 allows the whole excess over par to go to RE (confirmed by PwC Viewpoint FG 9.4). Finding S2. |
| far-seq-23 | c ($25,000), flagged | c | The 25% sits in the ASC 505-20 "20 or 25 percent" gray zone, and the lesson's own "< 20–25%" / "> 20–25%" wording does not settle it. Finding S2. |
| all others | = key | = key | No disagreement. |

TBS recomputation:
- **u8:** JE Dr Cash 90,000, Dr RE 18,000, Cr TS 108,000 (balances). pref 96,000; com 54,000; ts 72,000; re 3,552,000; out 296,000. d1 is a reduction of RE, d2 disclosed, d3 noncurrent (ASC 470-10-45-14), d4 current liability.
- **x2:** sh 598,400; cs 604,400; apic 7,285,600; ts 168,000; re 1,968,800; tot 9,690,800. Cross-check: 8,000,000 + 1,250,000 − 280,000 + 120,000 − 299,200 + 900,000 = 9,690,800.

## (b) Lesson design

- **Big idea:** clear and well motivated (no profit from trading your own shares). However, "never create income or expense" contradicts the property-dividend gain the lesson teaches, and it primes the traps in 04 and 26 (finding).
- **Pre-questions:** only one (pre1, treasury stock above cost). It primes the treasury concept correctly but leaves the dividend and preferred-allocation objectives unprimed (S4).
- **Body:** the JE, the worked treasury example (2,000 APIC credit; 2,000 APIC + 400 RE shortfall) and the faded preferred example (50,000 / 150,000 / 30,000 / $0.15) all recompute correctly. The citations (505-10, 505-20, 505-30, 845-10-30-1) are right. The "services" parenthetical in the noncash rule reflects the superseded ASC 505-50 (finding, currency S3).
- **Takeaways:** accurate and complete for what the body teaches.
- **Inline checks:** chk1 (treasury shortfall) and chk2 (small stock dividend) are well placed. There is no check on large dividends or arrears beyond the faded example.
- **Minutes:** 20. About 990 words including frontmatter, plus 1 JE, 1 worked example, 1 faded example (4 inputs), 2 tables and 2 checks. That is about 8–10 minutes of reading plus 6–8 minutes of exercises, so 20 is realistic to slightly generous.
- **Items testing untaught material:**
  - far-seq-14 (RE appropriation)
  - far-seq-18 (retirement)
  - far-seq-20 (subscriptions receivable)
  - far-seq-07 (the "stock dividend distributable" account)
  - far-seq-15 and far-seq-27 (stock compensation, which is also BAR scope)
- **Sequencing:** nothing relies on later modules. EPS (u2) and debt classification (far-debt-other, same unit, earlier) come before this module. TBS u8 mixes in a debt-classification cell, and its moduleIds list far-debt-other, so that is fine.

## (c) Practice design

- **Count:** 28 practice MCQs, which is adequate, but there is heavy redundancy (pairs 13/25, 19/28, 06/11, chk1/24, 04/26, 15/27; large-dividend-at-par three times). Several equity topics go untested: participating preferred, rights and warrants, ASC 480 / temporary-equity preferred, net multi-event effects, RE rollforward.
- **Difficulty as labeled:** d1 = 5, d2 = 12, d3 = 11. Labels for 17 and 21–28 are inflated: their d3 is really d2.
- **Order:** file order roughly rises, but the d1 items (08–11, 14) follow the d2 items 01–07. The app does not use `difficulty` to order practice (it is referenced only in `src/lib/srs.ts` for cards), so the progression depends on file order alone.
- **Skill mix (practice + exam MCQs) as labeled:** R 4 / App 17 / An 10 (13% / 55% / 32%), which is close to the FAR targets (5–15 / 45–55 / 35–45).
- **Skill mix after the relabeling proposed in the findings:** about R 8 / App 21 / An 1–2. The module's real analysis share is far below 35–45%. Add genuine analysis items, and consider labeling the multi-transaction rollforward TBS (x2) analysis.
- **Exam pool:** all three mock MCQs are near-clones of lesson items (finding).

## (d) Items with no issues

far-seq-chk2, far-seq-01, far-seq-02, far-seq-03, far-seq-09, far-seq-10, far-seq-fc1, far-seq-fc2, far-seq-fc3, far-seq-fc4, far-seq-fc5, far-seq-fc6, far-seq-fc7.

Notes on two of these:
- fc3 ("Small (< 20–25%) / Large (> 20–25%) / split: no entry") is correct as the standard heuristic. It bundles three facts, which is acceptable.
- far-x2-25's "$     0" option text uses padded spaces. The same pattern appears in 15 places across content, so it looks deliberate and renders as "$ 0". I did not raise it as a finding.

## (e) Needs expert verification

- **far-seq-23:** whether the SEC staff treats distributions of 25% or more as splits. I could not confirm this. Search results showed SEC comment letters applying ASC 505-20's "20 or 25 percent" guideline (sec.gov CORRESP for Kraig Biocraft 2010 and Yanzhou 2007), but no bright line. The finding stands either way because the stem sits on the boundary.
- **Lesson "services" rule:** whether, after ASU 2018-07, stock issued for a nonfinancial asset used in operations, such as land, falls under ASC 718 instead of ASC 805-50. The common CPA-review treatment, "more clearly determinable" fair value, is kept for land in my proposed fix.
- **ASU 2025-12:** a vendor blog (beancount.io) claims it adds an "APIC-only" retirement option. This is unverified. The reference sheet lists ASU 2025-12 as codification improvements effective FY > 12/15/2026, so it is not testable in 2026 either way.
- **FAR 2026 Blueprint Area II.I (Equity):** I have not seen the representative-task wording first-hand. In particular, I could not confirm whether liability-vs-equity classification (ASC 480) and RE appropriations or quasi-reorganizations are listed.

Sources used:
- [PwC Viewpoint FG 9.4 Share retirement](https://viewpoint.pwc.com/dt/us/en/pwc/accounting_guides/financing_transactio/financing_transactio_US/chapter_9_share_repu_US/94_share_retirement_US.html)
- [Deloitte DART 10.4 Repurchases, reissuances and retirements](https://dart.deloitte.com/USDART/home/codification/liabilities/asc480-10/roadmap-distinguishing-liabilities-from-equity/chapter-10-equity-transactions-disclosures/10-4-repurchases-reissuances-retirements-common)
- [SEC CORRESP, Kraig Biocraft 2010](https://www.sec.gov/Archives/edgar/data/0001413119/000121390010001590/filename1.htm)
- [AccountingTools stock split accounting](https://www.accountingtools.com/articles/stock-split-accounting)

## (f) Could not check

- **Rendering in the app:** usability is out of scope for this batch. For example, I did not check whether the docreview segments read naturally on screen.
- **Primary text:** I did not read the primary text of ASC 505-30-30-8, 505-20-25-3 or 718-10-30-2, because FASB fetches are blocked. These rules are from memory and secondary sources, as cited.
- **Web searches:** I used 2 of the 3 allowed.
