# M-far-special-purpose: reviewer notes

Scope: 41 items (the lesson, 3 lesson MCQs, 28 practice MCQs, 1 exam MCQ, 7 flashcards, 1 TBS). Blind answers are in `blind-answers.csv`, saved before keys were opened. There are 14 findings: S1 0, S2 2, S3 9, S4 3.

## (a) Blind vs. key disagreements

| id | my answer | key | resolution |
|---|---|---|---|
| (none) | | | All 32 MCQ keys matched my blind answers. All 9 TBS cells matched: rev 649,000, sal 315,000, rent 52,000, sup 20,000, dep 10,000, ni 252,000; q1, q2 and q3 dropdowns. |

Distractor arithmetic was re-derived for every calc item. Each wrong number traces to the stated error, except 21(d) $460,000, which models no error, and 22(c) $187,000, which is a sign error labeled "distractor-number". Both are in finding 007.

## (b) Lesson design

- **Big idea → pre-questions → body → takeaways → checks.** The big idea (users agree to a simpler basis, e.g., a lender) is clear and motivating. Pre-question `far-spf-pre1` (cash + AR increase) primes the main computational skill well. It does not prime the framework and titles half, which is acceptable for a single pre-question. The body runs in this order: framework table, titles table, check 1, the cash-to-accrual T-account, the expense-adjustment table, a worked example (salaries and insurance), a faded example (fees with unearned revenue, accrued expenses and depreciation), tax basis vs. GAAP bullets, disclosures, check 2. The takeaways match the body.
- **Recomputation.** The T-account balances (30,000 + 255,000 = 240,000 + 45,000). The worked example gives 418,000 and 20,000. The faded example gives 190,000, 108,000 and 73,000. All are correct. No rule errors were found.
- **Minutes.** The value is 14. The body is about 730 words, plus about 400 in the frontmatter, five blocks (2 checks, a T-account, worked, faded with 3 inputs) and 1 pre-question. My estimate is 12–15 minutes, so the value is realistic.
- **Lesson–item alignment.** These items test material the lesson never teaches:
  - far-spf-24, -25, -28: personal financial statements (ASC 274). No FAR lesson covers them (finding 001).
  - far-spf-26: the liquidation basis (ASC 205-30). No FAR lesson covers it (finding 001).
  - far-spf-03: write-offs in the AR roll-forward. Only flashcard fc3 covers this (finding 003).
  - far-spf-20: supplies bought on account, where AP for purchases adjusts cash paid (finding 003).
  - far-spf-19: the reverse direction, accrual to cash (finding 003).
  - far-spf-18: "statutory accounting". The lesson gives "insurance department" as its regulatory-basis example, so this is acceptable.
- **Sequencing.** The module sits in far-u3, before far-receivables (u5). The lesson and chk2/fc5 contrast direct write-off with the CECL allowance before CECL is taught. MACRS, bonus and §179 are REG content that FAR never teaches. In both cases the lesson gives enough in one line to answer the items, so I logged no finding. The cash-to-accrual logic builds on far-cash-flows (u1, earlier), which is good. The lesson frontmatter has no prerequisite metadata to check.
- **Tax-basis and modified-cash coverage.** Both are taught as bullets only, with no computation (finding 004).

## (c) Practice design

- **Counts.** 28 practice MCQs plus 1 exam MCQ and 1 TBS (15 min). That is ample for a small Area I topic, but about 30% of it is redundant:
  - modified-cash "capitalize & depreciate" tested four times (finding 005)
  - 02/14 and pre1/21 near-duplicates (finding 006)
  - 4 off-topic PFS and liquidation items (finding 001)
- **Difficulty spread as labeled.** d1: 4, d2: 13, d3: 11. Items run 01–18 at d1–d2, then 19–28 all at d3. The progression looks easy-to-hard but is not: the d3 tail contains the module's easiest items (21, 23, 24, 27). Real difficulty is roughly d1 ×14, d2 ×12, d3 ×2–3 (03, 20).
- **Skill mix.**
  - As labeled (practice + exam), remembering 5 / application 14 / analysis 10 (17/48/34%), which looks like the FAR target (5–15 / 45–55 / 35–45).
  - On review, the true mix is about remembering 15 / application 14 / analysis 0 (finding 002).
  - A recall-heavy mix is natural for this topic. The labels should say so, and any analysis-level practice should come from new items, not relabels.
- **Routing.** Every item carries moduleId far-special-purpose, so a miss routes back to this lesson. For the PFS and liquidation items, that lesson has nothing to teach.

## (d) Items with no issues found

far-spf-pre1, far-spf-01, far-spf-03 (item itself is fine; the lesson gap is logged on the lesson), far-spf-07, far-spf-09, far-spf-11, far-spf-12, far-spf-13, far-spf-fc2, far-spf-fc3, far-spf-fc4, far-spf-fc5, far-spf-fc6, far-spf-fc7, far-tbs-u3-special-purpose.

TBS detail:
- All 6 numeric answers are exact integers with no rounding, so an explicit tolerance of 0 cannot reject a correct answer.
- Each of the 3 dropdowns has one correct option and plausible wrong ones.
- The exhibits are complete: no write-offs, no supplies payable, equipment bought Jan 2 so a full year of depreciation.
- skill: application and 15 minutes are realistic.
- The NI row cascades from the earlier rows, which is standard practice.

## (e) Needs expert verification

- **Finding 001.** Whether personal financial statements (ASC 274) and the liquidation basis (ASC 205-30) appear anywhere in the 2026 FAR Blueprint. Two searches could not confirm. If they are absent, the items should be optional or removed. If present, they need a lesson.
- **Finding 004.** The exact 2026 FAR representative-task wording for special purpose frameworks, i.e. whether application tasks to "prepare" cash, modified-cash and tax-basis statements exist. The lesson's `task:` strings are paraphrases and could not be checked against the Blueprint PDF.
- **far-spf-05.** Whether AICPA nonauthoritative guidance allows nontaxable revenue and nondeductible expenses to be disclosed only in the notes, rather than included in the statement. The superseded TQA 1500 and practice aid treat them as included in the statement, either as separate lines or with disclosure. If notes-only disclosure is acceptable, distractor (d) becomes partly defensible. I believe it is not acceptable, so no finding was raised beyond the trap label.

## (f) Could not check

- The official AICPA 2026 FAR Blueprint PDF, because direct fetches are blocked. Task-level coverage relies on `review/reference/blueprint-notes.md`, which lists group E, "Special purpose frameworks", without tasks. The 2026 Summary of Changes removed the AICPA cash- and tax-basis practice aid from the FAR references. The lesson does not cite it, so there is no currency issue.
- The app rendering of tacct, faded and check blocks. The app is reviewed separately.
- Currency: no item depends on a tax year, a dollar threshold or a recent ASU. CECL, AU-C 800 and the FRF for SMEs references are current. The lesson needs no `taxYear`.

Web searches used: 2 of 3. Neither settled the Blueprint placement questions. URLs from the results, all secondary sources:
- https://forum.another71.com/forum/far-cpa-exam/review/topic/blueprints-special-purpose-frameworks (quotes a Blueprint task to "recall appropriate financial statement titles" for special purpose frameworks)
- https://ipassthecpaexam.com/cpa-far-exam/
