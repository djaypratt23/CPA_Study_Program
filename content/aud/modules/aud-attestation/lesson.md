---
id: aud-attestation
section: AUD
title: Attestation engagements (examination, review, agreed-upon procedures)
minutes: 16
objectives:
  - text: Distinguish examinations, reviews, and agreed-upon procedures engagements under the SSAEs.
    skill: remembering
    task: Identify the types of attestation engagements
  - text: Apply the preconditions for attestation engagements and the requirements for written assertions.
    skill: application
    task: Accept and plan an attestation engagement
  - text: Identify reports on controls at service organizations (SOC 1, SOC 2, SOC 3) and on prospective financial information.
    skill: remembering
    task: Identify SOC reports and prospective financial information engagements
bigIdea:
  what: >-
    Attestation engagements apply audit-like thinking to subject matter other than historical statements: controls,
    compliance, greenhouse gas emissions, forecasts. The practitioner can examine (reasonable assurance), review
    (limited assurance), or perform agreed-upon procedures (no assurance — just findings).
  why: >-
    Users increasingly need trustworthy information beyond financial statements. The level of assurance should match
    how much users will rely on it and how much work is practical.
  example: >-
    A cloud software company wants to show customers its systems are secure. It engages a CPA to examine its
    controls against the Trust Services Criteria and issue a SOC 2 Type 2 report.
preQuestions: [aud-at-pre1]
keyTakeaways:
  - "Examination: reasonable assurance; opinion. Review: limited assurance; conclusion (\"we are not aware of any material modifications…\"). Agreed-upon procedures: no assurance; procedures and findings."
  - "Preconditions: independence; a responsible party; appropriate subject matter; suitable and available criteria; access to evidence; the practitioner's competence."
  - "Examinations and reviews: request a written assertion from the responsible party. If the engaging party is also the responsible party and refuses, the practitioner withdraws where possible."
  - "Agreed-upon procedures (AT-C 215): the engaging party acknowledges the procedures are appropriate; reports can be general use; findings are stated without assurance."
  - "Prospective financial information: forecasts (expected conditions) vs. projections (hypothetical assumptions). Examinations, compilations, and AUPs are allowed; reviews are not. Projections are restricted use."
  - "SOC 1: controls relevant to user entities' financial reporting. SOC 2: Trust Services Criteria (security, availability, processing integrity, confidentiality, privacy) — restricted use. SOC 3: Trust Services Criteria, general use."
citations:
  - source: SSAEs — AT-C 105 (Concepts common to all attestation engagements), AT-C 205 (Examination), AT-C 210 (Review), AT-C 215 (Agreed-upon procedures)
  - source: AT-C 305 (Prospective financial information), AT-C 320 (Service organizations — SOC 1)
  - source: AICPA Trust Services Criteria (SOC 2 and SOC 3)
---

## Three levels of service

| | Examination | Review | Agreed-upon procedures |
|---|---|---|---|
| Assurance | Reasonable | Limited | None |
| Procedures | Like an audit — risk assessment, tests | Mainly inquiry and analytics | Specific procedures agreed with the engaging party |
| Report | Opinion | Conclusion (negative assurance) | Procedures and findings |
| Written assertion | Requested | Requested | Not required |

```check
aud-at-chk1
```

## Preconditions

1. The practitioner is independent (for examinations, reviews, and AUPs).
2. A responsible party exists and takes responsibility for the subject matter.
3. The subject matter is appropriate (identifiable and measurable against criteria).
4. The criteria are **suitable** (relevant, objective, measurable, complete) and **available** to users.
5. The practitioner expects to obtain the evidence needed.

## SOC reports

```mermaid
flowchart TD
  A[Service organization report] --> B{Purpose?}
  B -- Controls relevant to user entities' financial reporting --> S1[SOC 1 — Type 1 or Type 2 — restricted to user entities and their auditors]
  B -- Security, availability, processing integrity, confidentiality, privacy --> S2[SOC 2 — Type 1 or Type 2 — restricted use]
  B -- Same criteria, general-use summary --> S3[SOC 3 — general use]
```

## Prospective financial information

```worked
title: Forecast or projection?
scenario: |
  Two clients request help with prospective statements.
steps:
  - label: Management's best estimate of next year's results for a bank loan application
    work: Expected conditions
    result: Financial forecast — can be examined, compiled, or subjected to AUP; general use allowed
  - label: '"What if we open two new stores?" statements for a potential investor'
    work: Hypothetical assumptions
    result: Financial projection — restricted use (to parties negotiating directly with the entity)
  - label: The client asks for a review of the forecast
    work: AT-C 305
    result: Not permitted — reviews of prospective information aren't allowed
insight: Examinations of PFI express an opinion on whether the statements follow the presentation guidelines and whether the assumptions provide a reasonable basis.
```

```check
aud-at-chk2
```
