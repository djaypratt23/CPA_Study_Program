---
id: aud-quality-management
section: AUD
title: Quality management
minutes: 14
objectives:
  - text: Identify the components of a firm's system of quality management under SQMS No. 1.
    skill: remembering
    task: Recall the components of a system of quality management
  - text: Apply the requirements for engagement quality reviews and the engagement partner's responsibilities.
    skill: application
    task: Determine when an engagement quality review is required and who may perform it
  - text: Distinguish peer review and PCAOB inspections.
    skill: remembering
    task: Recall the external monitoring of accounting firms
bigIdea:
  what: >-
    Quality management moves firms from following a checklist of policies to running a risk-based system: set
    quality objectives, identify what could stop the firm from meeting them, and design responses. The engagement
    partner is responsible for quality on each engagement.
  why: >-
    Audit failures usually trace back to firm-level causes — rushed staffing, pressure to keep clients, weak
    review. A system that looks for those risks, monitors itself, and fixes root causes protects every engagement.
  example: >-
    A firm growing fast in construction audits identifies a quality risk: too few staff with percentage-of-
    completion expertise. Its response is targeted training, specialist review of revenue estimates, and a cap on
    new construction clients until capacity catches up.
preQuestions: [aud-qm-pre1]
keyTakeaways:
  - "SQMS No. 1 (effective December 15, 2025) has eight components: governance and leadership; the firm's risk assessment process; relevant ethical requirements; acceptance and continuance; engagement performance; resources; information and communication; and the monitoring and remediation process."
  - "Risk-based approach: establish quality objectives → identify and assess quality risks → design and implement responses."
  - "The individual with ultimate responsibility evaluates the system at least annually and concludes whether it provides reasonable assurance that objectives are met."
  - "SQMS No. 2: an engagement quality (EQ) review is an objective evaluation of significant judgments, done before the report is released. A former engagement partner generally needs a 2-year cooling-off period before serving as EQ reviewer."
  - "AU-C 220 (SAS 146): the engagement partner takes overall responsibility for managing and achieving quality on the engagement."
  - "External monitoring: AICPA peer review (generally every 3 years) for firms auditing nonissuers; PCAOB inspections for firms auditing issuers — annually if more than 100 issuer clients, at least every 3 years otherwise."
citations:
  - source: SQMS No. 1 (QM 10), A Firm's System of Quality Management
  - source: SQMS No. 2 (QM 20), Engagement Quality Reviews
  - source: SAS No. 146 (AU-C 220), Quality Management for an Engagement
  - source: Sarbanes-Oxley Act Section 104 (PCAOB inspections)
---

## The eight components (SQMS No. 1)

```mermaid
flowchart TD
  G[Governance and leadership] --> R[Firm's risk assessment process]
  R --> E[Relevant ethical requirements]
  R --> A[Acceptance and continuance]
  R --> P[Engagement performance]
  R --> S[Resources]
  R --> I[Information and communication]
  E --> M[Monitoring and remediation]
  A --> M
  P --> M
  S --> M
  I --> M
```

| Component | What it covers |
|---|---|
| Governance and leadership | Culture, leadership's accountability, and commitment to quality |
| Risk assessment process | Setting quality objectives, identifying quality risks, designing responses |
| Relevant ethical requirements | Independence and the Code |
| Acceptance and continuance | Integrity of the client; firm competence and capacity |
| Engagement performance | Direction, supervision, review, consultation, differences of opinion, EQ reviews |
| Resources | People, technology, intellectual resources, and service providers |
| Information and communication | Getting the right information to the right people |
| Monitoring and remediation | Inspecting engagements, finding deficiencies, root-cause analysis, fixing them |

```check
aud-qm-chk1
```

## Engagement quality reviews (SQMS No. 2)

- **Required** for engagements the firm's policies specify (e.g., based on risk or public interest) and where required by law or regulation. PCAOB rules (AS 1220) require an EQ review for every issuer audit.
- **Timing:** completed before the report is released; the engagement partner may not release the report until the EQ reviewer notifies them the review is complete.
- **Eligibility:** competence, authority, objectivity, and independence. The EQ reviewer cannot be a member of the engagement team. A person who was the engagement partner generally has a **two-year cooling-off** period before becoming the EQ reviewer.
- **Scope:** significant judgments and the conclusions reached — not a re-audit.

```worked
title: Can this person be the EQ reviewer?
scenario: |
  The firm needs an EQ reviewer for the Year 5 audit of Oakridge Health. Three candidates are proposed.
steps:
  - label: Partner Diaz — engagement partner for Years 1–4
    work: Former engagement partner; the cooling-off period has not passed
    result: Not eligible until Year 7 (two-year cooling-off)
  - label: Manager Evans — on the Year 5 engagement team
    work: EQ reviewer cannot be a member of the engagement team
    result: Not eligible
  - label: Partner Fox — health-care specialist, no involvement with Oakridge
    work: Competent, objective, independent
    result: Eligible
insight: Objectivity is the key test. Anyone who helped make the judgments cannot review them.
```

## Engagement partner responsibilities (AU-C 220)

The engagement partner is responsible for managing and achieving quality on the engagement, including:
direction, supervision, and review of the team; making sure the team has sufficient and appropriate resources;
consultation on difficult or contentious matters; and resolving differences of opinion before the report is released.

## External monitoring

| | Peer review (AICPA) | PCAOB inspection |
|---|---|---|
| Who | Firms performing audits and other A&A services for nonissuers | Firms registered with the PCAOB that audit issuers |
| How often | Generally once every 3 years | Annually (>100 issuer audit clients); at least every 3 years otherwise |
| Types | System review (for firms that perform audits); engagement review (other A&A work only) | Inspection of selected engagements and the firm's quality control system |

```check
aud-qm-chk2
```
