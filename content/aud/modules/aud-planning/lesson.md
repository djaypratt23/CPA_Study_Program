---
id: aud-planning
section: AUD
title: Audit strategy, audit plan & planning analytics
minutes: 16
objectives:
  - text: Distinguish the overall audit strategy from the audit plan and identify preliminary engagement activities.
    skill: remembering
    task: Recall the elements of audit planning
  - text: Perform planning analytical procedures and identify the risks they indicate.
    skill: analysis
    task: Use analytical procedures to identify risks of material misstatement
  - text: Identify the required risk assessment procedures and the engagement team discussion.
    skill: remembering
    task: Identify risk assessment procedures
bigIdea:
  what: >-
    Planning decides what the audit will focus on. The overall strategy sets scope, timing, and direction; the
    audit plan lists the specific procedures. Planning analytics — comparing this year's numbers with
    expectations — point the auditor at accounts that look wrong before any detailed testing starts.
  why: >-
    An unplanned audit tests everything a little and nothing well. Analytical procedures are cheap and fast, and
    they often flag the misstatement (a margin that jumped, receivables that ballooned) that the detailed work
    must then chase.
  example: >-
    A retailer's gross margin rose from 30% to 35% while competitors' margins fell. Before testing anything,
    the auditor plans extra work on inventory pricing and revenue cut-off, the two places a margin can be
    inflated.
preQuestions: [aud-pl-pre1]
keyTakeaways:
  - "Preliminary engagement activities: evaluate independence and ethics, decide on acceptance or continuance, and agree the terms."
  - "Overall audit strategy = scope, timing, and direction of the audit. Audit plan = the nature, timing, and extent of risk assessment procedures and further audit procedures. The plan is more detailed and is updated throughout the audit."
  - "Risk assessment procedures (required): inquiries of management and others, analytical procedures, and observation and inspection."
  - "The engagement team must discuss the susceptibility of the statements to material misstatement, including fraud (the \"brainstorming\" discussion)."
  - "Analytical procedures are required in risk assessment (planning) and near the end of the audit (overall review). Using them as substantive procedures is optional."
  - "Analytics compare recorded amounts with expectations built from prior periods, budgets, industry data, and relationships between financial and nonfinancial data. Unexpected changes — or the absence of expected changes — signal risk."
  - "Those charged with governance are told the planned scope and timing of the audit and significant risks identified (without making procedures predictable)."
citations:
  - source: AU-C 300 (Planning an audit)
  - source: AU-C 315 (Understanding the entity and assessing risks of material misstatement)
  - source: AU-C 520 (Analytical procedures)
  - source: AU-C 260 (Communication with those charged with governance)
  - source: PCAOB AS 2101 (Audit planning) and AS 2110 (Identifying and assessing risks)
---

## Planning sequence

```timeline
title: From acceptance to execution
events:
  - when: Preliminary activities
    label: Independence, acceptance or continuance, terms
    detail: Must be done before significant audit work begins
  - when: Overall audit strategy
    label: Scope, timing, direction
    detail: Reporting deadlines, materiality, high-risk areas, team, specialists
  - when: Risk assessment procedures
    label: Understand the entity, its environment, and internal control
    detail: Inquiry, analytics, observation and inspection; team discussion
  - when: Audit plan
    label: Nature, timing, and extent of further procedures
    detail: Updated whenever new information changes the risk assessment
```

| | Overall audit strategy | Audit plan |
|---|---|---|
| Level | Broad | Detailed |
| Content | Scope, timing, direction; allocation of resources | Specific risk assessment and further audit procedures |
| Example | "Use a specialist to value the derivatives; interim fieldwork in October" | "Confirm 40 receivables selected by monetary unit sampling at year-end" |

```check
aud-pl-chk1
```

## Planning analytical procedures

Compare current results with expectations. Big unexpected changes — or no change where one was expected — point to accounts that may be misstated.

```worked
title: Scanning the ratios
scenario: |
  Crestview Supply (wholesale) — Year 2 vs. Year 1. Industry margins fell in Year 2.
  Sales: 4,380,000 vs. 4,015,000. Cost of sales: 2,847,000 vs. 2,810,500.
  Accounts receivable: 600,000 vs. 400,000. Inventory: 900,000 vs. 700,000.
steps:
  - label: Gross margin
    work: (4,380,000 − 2,847,000) ÷ 4,380,000 vs. (4,015,000 − 2,810,500) ÷ 4,015,000
    result: 35.0% vs. 30.0% — up while industry fell
  - label: Days sales in receivables
    work: 600,000 ÷ (4,380,000 ÷ 365) vs. 400,000 ÷ (4,015,000 ÷ 365)
    result: 50.0 days vs. 36.4 days
  - label: Inventory turnover
    work: 2,847,000 ÷ 800,000 average inventory (Year 1 average not available; compare with Year 1 year-end 4.0)
    result: About 3.6 times — slowing
  - label: Risk indicated
    work: Margin up, receivables growing faster than sales, inventory building
    result: Possible fictitious or early revenue, overstated inventory, or understated reserves
insight: Each ratio alone might have an innocent explanation. Together they tell a consistent story, so the plan should target revenue cut-off and existence, receivables confirmation, and inventory valuation.
```

```faded
title: Your turn — receivables collection period
scenario: |
  Credit sales were $7,300,000 and year-end receivables were $1,000,000 (prior year: credit sales $6,570,000,
  receivables $540,000). Use a 365-day year.
steps:
  - label: Current-year average daily credit sales
    answer: 20000
    solution: 7,300,000 ÷ 365 = 20,000
  - label: Current-year days sales outstanding
    answer: 50
    solution: 1,000,000 ÷ 20,000 = 50 days
  - label: Prior-year days sales outstanding
    answer: 30
    hint: 6,570,000 ÷ 365 = 18,000 per day
    solution: 540,000 ÷ 18,000 = 30 days — collection has slowed sharply, so the allowance and existence of receivables are risks
```

## Risk assessment procedures and the team discussion

- **Inquiries** of management, internal audit, in-house legal counsel, and others (such as sales or IT staff).
- **Analytical procedures** (as above).
- **Observation and inspection** — touring facilities, reading minutes, business plans, and contracts.
- **Engagement team discussion** — how and where the statements are susceptible to material misstatement, including fraud. Key members, including the engagement partner, participate.

```check
aud-pl-chk2
```
