---
id: aud-specific-risks
section: AUD
title: Related parties, estimates & other specific risks
minutes: 17
objectives:
  - text: Respond to risks related to accounting estimates and evaluate indicators of management bias.
    skill: application
    task: Audit accounting estimates
  - text: Identify related parties and evaluate related-party transactions and disclosures.
    skill: application
    task: Perform procedures to identify related-party relationships and transactions
  - text: Distinguish the auditor's responsibilities for laws with a direct effect from other laws and regulations.
    skill: evaluation
    task: Evaluate the entity's compliance with laws and regulations
bigIdea:
  what: >-
    Some areas need special handling. Estimates rest on management's judgment and can be tilted; related-party
    deals can be arranged off-market and hidden; and violations of laws can create liabilities the books don't
    show. Each has its own standard and procedures.
  why: >-
    These are where honest errors meet deliberate bias. Lots of past frauds involved related-party sales at fake
    prices or reserves quietly released to hit targets.
  example: >-
    A company sells land to an entity owned by its CEO's brother at twice appraised value and books a large gain.
    Without identifying the relationship, the auditor would see a normal sale. With it, the auditor evaluates the
    business purpose, terms, and disclosure.
preQuestions: [aud-sr-pre1]
keyTakeaways:
  - "Estimates (AU-C 540): understand how management makes them (method, assumptions, data). Respond by (1) using events up to the report date, (2) testing how management made the estimate, or (3) developing an independent point estimate or range. Evaluate for management bias."
  - "Retrospective review: compare prior-year estimates with actual outcomes to identify bias (required under AU-C 240)."
  - "Related parties (AU-C 550): inquire about relationships and transactions, stay alert when reading minutes and contracts, and treat significant related-party transactions outside the normal course of business as significant risks."
  - "A statement that related-party transactions were at arm's length may be disclosed only if management can substantiate it."
  - "Laws with a direct effect on amounts and disclosures (e.g., tax, pension law): obtain sufficient appropriate evidence of compliance. Other laws (e.g., environmental, safety): limited procedures — inquiry and inspecting regulatory correspondence."
  - "Noncompliance identified or suspected: understand it, evaluate its effect, communicate it to TCWG (other than clearly inconsequential matters), and consider whether withdrawal or reporting to outside parties is required."
citations:
  - source: AU-C 540 (Auditing accounting estimates and related disclosures), as revised by SAS No. 143
  - source: AU-C 550 (Related parties)
  - source: AU-C 250 (Consideration of laws and regulations in an audit of financial statements)
  - source: PCAOB AS 2501, AS 2410, AS 2405
---

## Accounting estimates

```mermaid
flowchart TD
  E[Estimate: e.g., warranty reserve] --> A[Use subsequent events up to the report date]
  E --> B[Test how management made it: method, assumptions, data]
  E --> C[Develop an auditor's point estimate or range]
  A --> V[Compare and evaluate for bias]
  B --> V
  C --> V
```

**Indicators of management bias:** changes in assumptions that consistently move results toward management's goals; selecting a point estimate at the optimistic end of a range; assumptions that are inconsistent with each other or with industry data.

```worked
title: Evaluating a warranty reserve
scenario: |
  Management records a warranty reserve of $400,000. The auditor develops a range of $450,000–$600,000
  based on historical claims. Last year management's estimate was $350,000 and actual claims were $480,000.
steps:
  - label: Compare with the auditor's range
    work: 400,000 is below the 450,000 low end
    result: Misstatement of at least 50,000 (to the nearest point of the range)
  - label: Retrospective review
    work: Last year's estimate was 130,000 below actual claims
    result: Possible pattern of optimistic estimates — an indicator of bias
  - label: Response
    work: Accumulate the 50,000 misstatement; consider the bias indicator in evaluating other estimates and the statements as a whole
    result: Discuss with management and those charged with governance
insight: When management's estimate is outside the auditor's range, the misstatement is at least the distance to the nearest end of the range.
```

```check
aud-sr-chk1
```

## Related parties

| Step | Procedure |
|---|---|
| Understand | Ask management who the related parties are and about transactions with them; understand controls over authorizing them |
| Stay alert | Read minutes, contracts, bank confirmations, and legal letters for signs of undisclosed relationships (guarantees, loans at unusual terms, unusual year-end sales) |
| Respond | Significant transactions **outside the normal course of business** → significant risk: read the agreements, evaluate the business rationale, and check authorization |
| Evaluate | Proper accounting and disclosure; an "arm's-length" claim only if substantiated |

```check
aud-sr-chk2
```

## Laws and regulations

| Category | Examples | Auditor's responsibility |
|---|---|---|
| **Direct effect** on material amounts and disclosures | Income tax, pension law, grant terms | Obtain sufficient appropriate evidence of compliance |
| **Other** laws fundamental to operations | Environmental rules, occupational safety, licensing | Limited procedures: inquire of management and those charged with governance, inspect correspondence with regulators |

If noncompliance is suspected: understand the matter, discuss it with management (at least one level above those involved) and, when appropriate, TCWG; evaluate the effect on the statements (fines, contingencies); consider legal counsel; and consider withdrawal if the entity doesn't take remedial action.
