---
id: aud-report-paragraphs
section: AUD
title: Emphasis-of-matter, other-matter, KAMs & CAMs
minutes: 16
objectives:
  - text: Distinguish emphasis-of-matter from other-matter paragraphs and identify when each is required.
    skill: application
    task: Determine when additional paragraphs are required in the auditor's report
  - text: Identify key audit matters (AU-C 701) and critical audit matters (PCAOB AS 3101).
    skill: remembering
    task: Identify key and critical audit matters
  - text: Apply the reporting requirements for consistency, other information, and supplementary information.
    skill: application
    task: Report on consistency and information accompanying the financial statements
bigIdea:
  what: >-
    Beyond the opinion, the report can point users to things they should notice. Emphasis-of-matter paragraphs
    highlight something already disclosed in the statements. Other-matter paragraphs talk about something not in
    the statements — usually about the audit or the report itself. KAMs and CAMs explain the hardest parts of the audit.
  why: >-
    A clean opinion can hide a story. A change in accounting principle, a major catastrophe, or an especially
    judgmental valuation matters to readers even when the numbers are right.
  example: >-
    A company adopts a new lease accounting method, applied retrospectively and fully disclosed. The opinion is
    unmodified, but an emphasis-of-matter paragraph refers readers to the note explaining the change.
preQuestions: [aud-rp-pre1]
keyTakeaways:
  - "Emphasis of matter: refers to a matter appropriately presented or disclosed in the statements that is fundamental to users' understanding. It doesn't modify the opinion."
  - "Required emphasis paragraphs include: a change in accounting principle with a material effect (consistency), the correction of a material misstatement in previously issued statements, and special purpose frameworks (alerting readers to the basis of accounting)."
  - "Other matter: a matter not presented or disclosed in the statements that's relevant to users' understanding of the audit, the auditor's responsibilities, or the report — e.g., restricted use, a predecessor's report on prior-year statements, or unaudited prior-period statements."
  - "A change in accounting estimate doesn't require a consistency paragraph."
  - "Key audit matters (AU-C 701): only if the auditor is engaged to report them; matters of most significance, selected from matters communicated to TCWG."
  - "Critical audit matters (PCAOB AS 3101): matters communicated to the audit committee that relate to material accounts or disclosures and involved especially challenging, subjective, or complex auditor judgment."
  - "Other information in an annual report (AU-C 720): read it and consider material inconsistencies with the statements; report on it in an \"Other Information\" section. Supplementary information can be reported on \"in relation to\" the statements as a whole (AU-C 725)."
citations:
  - source: AU-C 706 (Emphasis-of-matter and other-matter paragraphs)
  - source: AU-C 708 (Consistency of financial statements)
  - source: AU-C 701 (Communicating key audit matters)
  - source: AU-C 720 (Other information) and AU-C 725 (Supplementary information)
  - source: PCAOB AS 3101 (Critical audit matters)
---

## Emphasis of matter vs. other matter

| | Emphasis-of-matter | Other-matter |
|---|---|---|
| Subject | Something **in** the statements (already disclosed) | Something **not in** the statements |
| Purpose | Draw attention to a fundamental matter | Explain the audit, responsibilities, or report |
| Examples | Change in accounting principle; major catastrophe; significant related-party transactions; significant subsequent events; correction of an error | Restricted use; predecessor audited prior year; prior-year statements not audited; supplementary information |
| Effect on opinion | None — "Our opinion is not modified with respect to this matter." | None |

```check
aud-rp-chk1
```

## Consistency (AU-C 708)

| Change | Report effect |
|---|---|
| Change in accounting principle, material effect, properly accounted for | Emphasis-of-matter paragraph (required) |
| Correction of a material misstatement in previously issued statements | Emphasis-of-matter paragraph (required) |
| Change in accounting estimate | No paragraph |
| Change in principle not properly accounted for (or unjustified) | Modified opinion (qualified or adverse) |

```worked
title: Which paragraph, if any?
scenario: |
  Four situations in unmodified reports.
steps:
  - label: The company changed from LIFO to FIFO, applied retrospectively and disclosed
    work: Change in principle with material effect
    result: Emphasis-of-matter paragraph required
  - label: The company extended its equipment useful lives
    work: Change in estimate
    result: No paragraph required
  - label: Prior-year statements were audited by another firm, and that report isn't reissued
    work: Something about the audit, not in the statements
    result: Other-matter paragraph describing the predecessor's report
  - label: The statements use the income tax basis of accounting
    work: Special purpose framework
    result: Emphasis-of-matter paragraph alerting readers to the basis of accounting
insight: "In the statements → emphasis. About the audit or the report → other matter."
```

## Key audit matters and critical audit matters

```mermaid
flowchart TD
  A[Matters communicated to TCWG or the audit committee] --> B{Required significant auditor attention?}
  B -- Yes --> C{Of most significance / especially challenging, subjective, or complex?}
  C -- Yes --> D[KAM (AICPA, if engaged) or CAM (PCAOB, if it relates to a material account or disclosure)]
```

For each KAM or CAM, the report explains why it was considered one and how it was addressed in the audit. A KAM or CAM is **not** a substitute for a modified opinion, a going concern section, or required disclosures.

```check
aud-rp-chk2
```
