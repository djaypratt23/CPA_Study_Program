---
id: aud-modified-opinions
section: AUD
title: Qualified, adverse & disclaimer opinions
minutes: 16
objectives:
  - text: Select the appropriate opinion based on the nature of the matter and whether its effects are pervasive.
    skill: evaluation
    task: Determine the type of opinion to express
  - text: Identify the headings and wording changes in modified reports.
    skill: remembering
    task: Prepare a modified auditor's report
bigIdea:
  what: >-
    An opinion is modified for one of two reasons: the statements are materially misstated, or the auditor couldn't
    get enough evidence (a scope limitation). How bad it is — material but confined, or pervasive — decides
    between "except for" and a complete adverse opinion or disclaimer.
  why: >-
    Users need to know both what went wrong and how much of the statements they can still rely on. A qualified
    opinion tells them "everything but this is fine"; adverse and disclaimer tell them not to rely on the whole.
  example: >-
    A company refuses to record an impairment that would reduce assets by 3% of total assets — material but
    confined to one account → qualified ("except for"). If the unrecorded losses were so large that they would
    wipe out equity, affecting many accounts → adverse.
preQuestions: [aud-mo-pre1]
keyTakeaways:
  - "Material misstatement: material, not pervasive → qualified; material and pervasive → adverse."
  - "Inability to obtain sufficient appropriate evidence: material, not pervasive → qualified; possibly material and pervasive → disclaimer."
  - "Pervasive: not confined to specific elements; or, if confined, a substantial proportion of the statements; or, for disclosures, fundamental to users' understanding."
  - "Headings: \"Qualified Opinion\" and \"Basis for Qualified Opinion\"; \"Adverse Opinion\" and \"Basis for Adverse Opinion\"; \"Disclaimer of Opinion\" and \"Basis for Disclaimer of Opinion\"."
  - "In a disclaimer, the auditor states it was unable to obtain sufficient appropriate evidence, and it amends the auditor's responsibilities section. Don't identify procedures that were performed in a way that suggests partial assurance."
  - "Management-imposed scope limitation that could be pervasive: disclaim (or withdraw, where possible). If known before acceptance, don't accept."
citations:
  - source: AU-C 705 (Modifications to the opinion in the independent auditor's report)
  - source: PCAOB AS 3105 (Departures from unqualified opinions and other reporting circumstances)
---

## The two-by-two

| Nature of the matter | Material, not pervasive | Material and pervasive |
|---|---|---|
| **Statements are materially misstated** (GAAP departure) | Qualified — "except for" | **Adverse** |
| **Unable to obtain sufficient appropriate evidence** (scope limitation) | Qualified — "except for the possible effects" | **Disclaimer** |

```check
aud-mo-chk1
```

## What makes an effect pervasive?

- Not confined to specific elements, accounts, or items; **or**
- If confined, represents (or could represent) a **substantial proportion** of the statements; **or**
- For disclosures, is **fundamental** to users' understanding.

```worked
title: Choosing the opinion
scenario: |
  Four independent situations at different clients.
steps:
  - label: Inventory at one warehouse (8% of total assets) couldn't be observed, and there was no alternative evidence
    work: Scope limitation; material but confined
    result: Qualified — "except for the possible effects"
  - label: Management won't consolidate a subsidiary that holds 60% of group assets
    work: Misstatement; affects most accounts
    result: Adverse
  - label: Management won't record depreciation on a new building (material to net income only)
    work: Misstatement; confined to a few accounts
    result: Qualified — "except for the effects"
  - label: Records destroyed in a fire; the auditor can't audit most balances
    work: Scope limitation; pervasive
    result: Disclaimer
insight: First ask "misstatement or scope?", then ask "confined or pervasive?"
```

## Wording in the report

| Opinion | Opinion paragraph wording |
|---|---|
| Qualified (misstatement) | "…except for the effects of the matter described in the Basis for Qualified Opinion section, the financial statements present fairly…" |
| Qualified (scope) | "…except for the possible effects of the matter described…" |
| Adverse | "…because of the significance of the matter…, the financial statements do not present fairly…" |
| Disclaimer | "We do not express an opinion… Because of the significance of the matter…, we have not been able to obtain sufficient appropriate audit evidence to provide a basis for an audit opinion." |

```check
aud-mo-chk2
```
