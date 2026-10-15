# M-far-government — reviewer notes

Scope: 48 items (lesson `far-government`, 3 lesson MCQs, 31 practice MCQs, 3 exam MCQs, 7 flashcards, 3 TBS). I applied every check to every item. Findings: 0 S1, 1 S2, 11 S3, 4 S4 (see `findings.jsonl`).

## (a) Blind vs. key

All 37 MCQs and all 34 TBS rows (numeric and dropdown) matched my blind answers. I recomputed every numeric item and TBS row and found no key errors.

| id | my answer | key | resolution |
|---|---|---|---|
| (all MCQs) | = key | — | No disagreement. |
| far-x1-35 | a (with reservation) | a | The key is the best answer, but its wording ("collected within 60 days") leaves out "during the year or … after year-end". See finding 008. |
| far-tbs-x1-government pt rev/def | 4,700,000 / 200,000, *assuming* 60 days | 4,700,000 / 200,000 | Agree, but the exhibit never states the availability period. See finding 009. |
| far-tbs-r3-property-tax defi | 150,000 (read "the rest" as the collectible remainder) | 150,000 | Agree. The exhibit wording is loose. See finding 016. |

Main recomputations:
- far-gov-18: −100,000 + 2,000,000 − 600,000 − 3,000,000 + 500,000 = −1,200,000
- far-x1-17: 900,000 + 40,000 = 940,000; government-wide 980,000
- r3: 5,000,000 × 98% = 4,900,000; 4,600,000 + 150,000 = 4,750,000; deferred inflows 150,000
- x1: 4,500,000 + 200,000 = 4,700,000; 4,900,000 − 4,700,000 = 200,000
- u4 plan: additions 1,840,000; deductions 635,000; ending 7,605,000

## (b) Lesson design (`far-government`)

- **Big idea.** Good: two lenses (government-wide vs. fund) with a concrete bond/bridge example. Accurate.
- **Pre-question** (`far-gov-pre1`, bond proceeds → other financing source). It primes the central contrast of the lesson well, and the big-idea example and the comparison table both answer it.
- **Body.** Sections:
  - comparison table
  - modified-accrual paragraph
  - fund-family diagram and mnemonic
  - permanent vs. private-purpose callout
  - net position and GASB 54 table
  - worked example (I recomputed: fund balance +500,000; NP change 0; accrued interest 2,000,000 × 4% × 6/12 = 40,000, correct)
  - faded example (4,850,000 / 4,950,000, correct)

  Accuracy is good overall, with these gaps:
  - Fund-type purposes are not defined for special revenue, debt service, capital projects, custodial or investment trust funds (finding 003).
  - The NICA definition misses the unspent-proceeds rule, which matters in the lesson's own worked example (finding 004).
  - GASB 103 is absent (finding 013).
  - The Assigned/Committed definitions are slightly narrow (finding 014).
  - Objective 3 has no `task`. This is minor.
- **Takeaways.** Accurate and consistent with the glossary and `far-high-yield.md` (no cross-platform conflicts found for the 60-day rule, modified accrual, or unassigned fund balance).
- **Inline checks.** chk1 (enterprise) and chk2 (committed) are well placed after the sections they test.
- **Minutes (16).** About 1,080 words including frontmatter, plus a diagram, 2 tables, 1 worked block, 1 faded block (2 inputs) and 3 inline MCQs. That is roughly 7–8 min reading and 6–8 min interaction, so 16 is realistic.
- **Sequencing.** The lesson comes after the NFP modules in far-u4 and relies on nothing taught later. It only uses general accrual concepts from earlier units.
- **Items testing content the lesson never teaches:**
  - far-gov-13 (encumbrances in fund balance)
  - far-gov-15 (budget entry)
  - far-gov-25 (available appropriation)
  - far-gov-20 (interfund transfer)
  - far-gov-18 and -21 (fund-to-government-wide reconciliation adjustments; the lesson only says a reconciliation is required)
  - far-gov-22 (compensated absences)
  - far-gov-17 (contents of RSI)
  - far-gov-19 and -28 (principal repayment as an expenditure / reduction of the liability; only implied by "debt service recognized when due")
  - far-gov-02, TBS r3 a2–a4, u4 c–e, x1 f1/f2/f5/f7 (purposes of special revenue, debt service, capital projects and custodial funds)

  Most of the first group is BAR-scope (finding 002). The rest are lesson gaps (finding 003).

## (c) Practice design

- **Count.** 31 practice MCQs, plus 3 lesson MCQs, 3 exam MCQs and 3 TBS. That is plenty for a "foundational concepts" module, but about 5 slots are duplicates (finding 005) and 7 are BAR-scope mechanics (finding 002).
- **Difficulty as labeled.** d1 9 / d2 10 / d3 12. The apparent easy-to-hard ramp is artificial: items 21–31 are all labeled d3/analysis although they are recall or one-step items (finding 001). After the proposed relabel the spread is about d1 12 / d2 17 / d3 2, which is lighter at the top end. The new in-scope items suggested in 002/005 should include a few genuinely harder application items (for example a statement of activities net (expense) revenue calculation, or a property tax levy with uncollectibles and a stated availability period).
- **Skill mix (practice, as labeled).** Remembering 9, application 12, analysis 10. After relabel: about remembering 13, application 18, analysis 0. The FAR section targets are R&U 5–15%, App 45–55% and Analysis 35–45%, but the Blueprint tests government concepts in FAR at the lower skill levels. Zero analysis items in this module is therefore defensible, as long as the section-level analysis share is built elsewhere. The current labels overstate analysis and would distort the section skill-mix dashboard.
- **Routing.** A missed item would route back to a lesson that does not teach 9 of the practice items (see (b)).
- **Mocks.** far-x1-17 appears on both far-mock-1 and far-mock-3. Mock 3 also carries far-x1-35 and the x1 TBS property-tax part, so three items test the 60-day rule (finding 006).

## (d) Items with no issues found

far-gov-pre1, far-gov-chk1, far-gov-01, far-gov-02, far-gov-03, far-gov-06, far-gov-09, far-gov-19, far-gov-23, far-x1-25, far-gov-fc1, far-gov-fc2, far-gov-fc3, far-gov-fc4, far-gov-fc5, far-gov-fc7.

Notes on this list:
- far-gov-01 stays clean because finding 005 proposes deleting its duplicate, far-gov-11.
- far-gov-19 and far-gov-02 are correct. The lesson gap that affects them is logged against the lesson (finding 003).

## (e) Needs expert verification

- **Finding 002 and finding 007.** The exact FAR I.C "State and local government concepts" representative tasks in the official 2026 FAR Blueprint. I could not see them: the AICPA PDF fetch was blocked and 2 web searches did not surface the task text. Two questions are open:
  - Whether fund balance classification (GASB 54) is FAR or BAR. This decides the optional flags on far-gov-04/-08/-14/-13, chk2 and the u4 fb part.
  - Whether budgetary/encumbrance, interfund and compensated-absence items are BAR only. The reference sheets (status "partial") and SuperFastCPA's BAR task pages point to BAR.
- **GASB paragraph pinpoints** cited from memory: GASB 63 ¶9 / Cod. 2200.118 (NICA, unspent proceeds); GASB 54 ¶¶13–14, 29–35. The rules themselves are long-settled, but the paragraph numbers should be confirmed.
- **GASB 103 issuance date.** The reference sheet says 4/2024. It is eligible for 2026 either way.

## (f) Could not check, and why

- **Official AICPA Blueprint PDF.** The direct fetch (dlcp.dc.gov copy) returned 403 from the egress proxy. Searches used: 2 of 3.
  1. "FAR CPA exam blueprint 'state and local government concepts' representative tasks…" returned only overviews (https://accounting.uworld.com/cpa-review/cpa-exam/content-structure/cpa-exam-blueprints/, https://dlcp.dc.gov/sites/default/files/dc/sites/DLCP/publication/attachments/Uniform%20CPA%20Examination%20Blueprints%202.5.24.pdf, table of contents only).
  2. The SuperFastCPA query surfaced BAR task pages for the reconciliation and for fund-balance journal entries (https://www.superfastcpa.com/bar-cpa-exam-how-to-prepare-a-schedule-to-reconcile-fund-balances-in-the-governmental-financial-statements-to-net-position-in-government-wide-statements/, https://www.superfastcpa.com/bar-cpa-exam-how-to-calculate-the-fund-balances-for-state-and-local-governments-and-prepare-journal-entries/).
- **GASB primary texts** (GASB 33, 54, 63, 84, 101, 103) were not fetched (gasb.org is blocked). I relied on the reference sheet (Parts 4–5, from-memory/partial) and my own knowledge.
- **App rendering** of the mermaid diagram, faded block and TBS scoring UI was not exercised. Usability is reviewed separately. Per schema, TBS numeric tolerance defaults to 1 when omitted (far-tbs-x1-government), which is fine for these integer answers.
