---
id: aud-written-representations
section: AUD
title: Written representations & completing the audit
minutes: 15
objectives:
  - text: Identify the required written representations and the date and signers of the representation letter.
    skill: remembering
    task: Obtain written representations from management
  - text: Determine the effect of management's refusal to provide representations.
    skill: application
    task: Evaluate the effect of written representations on the opinion
  - text: Identify the procedures performed to complete the audit.
    skill: remembering
    task: Perform completion procedures
bigIdea:
  what: >-
    At the end of the audit, management confirms in writing that it has met its responsibilities and given the
    auditor everything relevant. The letter doesn't replace evidence, but a refusal to sign it undermines everything
    else the auditor was told.
  why: >-
    Many audit conclusions rest partly on what management said. The letter makes those statements explicit, dated,
    and signed by the people accountable — and a refusal is a red flag about integrity.
  example: >-
    The CFO refuses to represent that she has disclosed all known fraud. The auditor can't rely on any of
    management's other representations, disclaims an opinion, and considers withdrawing.
preQuestions: [aud-wr-pre1]
keyTakeaways:
  - "The letter is addressed to the auditor, dated as of the auditor's report date, covers all periods reported on, and is signed by management with overall responsibility (usually the CEO and CFO)."
  - "Required representations about management's responsibilities: preparing the statements under the framework; providing all relevant information and access; recording all transactions."
  - "Other required representations include: fraud and suspected fraud known to management; noncompliance with laws; uncorrected misstatements are immaterial (with a summary attached); related parties; subsequent events; litigation and claims; and estimates."
  - "If management doesn't provide the representations about its responsibilities, or the auditor doubts their reliability, the auditor disclaims an opinion or withdraws."
  - "Written representations complement other evidence; they are not sufficient evidence by themselves."
  - "Completion: final analytical procedures, evaluating misstatements, subsequent events review, legal letters, representations, going concern conclusion, engagement quality review (if required), and communications with those charged with governance."
citations:
  - source: AU-C 580 (Written representations)
  - source: AU-C 450 (Evaluation of misstatements)
  - source: PCAOB AS 2805 (Management representations)
---

## The representation letter

| Feature | Requirement |
|---|---|
| Addressed to | The auditor |
| Signed by | Management with overall responsibility for financial and operating matters (typically CEO and CFO) |
| Dated | **As of the auditor's report date** |
| Periods | All periods covered by the report, even if current management wasn't present for all of them |

```check
aud-wr-chk1
```

## What management represents

**About its responsibilities (required — refusal leads to a disclaimer or withdrawal):**
- The statements are prepared in accordance with the applicable framework, as agreed in the engagement letter.
- It provided all relevant information and access, and all transactions are recorded.

**Other representations:**
- Internal control: responsibility for design and maintenance to prevent and detect fraud
- Fraud: results of its fraud risk assessment; all known or suspected fraud involving management, key employees, or others where material
- Noncompliance with laws and regulations
- Uncorrected misstatements are immaterial, individually and in aggregate (summary attached)
- Related parties and related-party transactions identified and disclosed
- Subsequent events adjusted or disclosed
- Litigation and claims disclosed; estimates' assumptions are reasonable

```worked
title: When representations go wrong
scenario: |
  Three situations arise at the end of the audit of Lyle Corp.
steps:
  - label: The CEO signs, but the CFO refuses to sign
    work: Both have overall responsibility; the CFO's refusal is a refusal by management
    result: Discuss; if unresolved, treat it as a refusal — consider the effect on the opinion
  - label: Management refuses to represent that all transactions were recorded
    work: A representation about management's responsibilities
    result: Disclaim an opinion (or withdraw)
  - label: A representation contradicts audit evidence (it says no related-party sales; the auditor found one)
    work: Reliability of all representations is in doubt
    result: Reconsider the competence and integrity of management and the effect on other evidence
insight: A refusal on the core responsibility representations is so fundamental that a qualified opinion isn't enough.
```

## Completing the audit

```timeline
title: Wrap-up
events:
  - when: Near report date
    label: Final analytical procedures and evaluation of misstatements
  - when: Near report date
    label: Subsequent events review and updated legal letters
  - when: Report date
    label: Representation letter dated as of the report date
  - when: Before release
    label: Engagement quality review (if required) and communications with those charged with governance
```

```check
aud-wr-chk2
```
