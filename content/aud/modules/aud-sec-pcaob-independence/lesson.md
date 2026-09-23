---
id: aud-sec-pcaob-independence
section: AUD
title: SEC, PCAOB, GAO & DOL independence rules
minutes: 16
objectives:
  - text: Identify nonaudit services prohibited for public-company audit clients and the role of audit committee pre-approval.
    skill: remembering
    task: Recall the SEC and PCAOB independence requirements for issuers
  - text: Apply partner rotation and cooling-off rules.
    skill: application
    task: Determine whether rotation and employment rules are met
  - text: Distinguish the independence frameworks of the GAO (Yellow Book) and the Department of Labor.
    skill: remembering
    task: Recall independence rules for governmental and ERISA engagements
bigIdea:
  what: >-
    Public-company (issuer) audits add a stricter layer on top of the AICPA Code. The SEC and PCAOB ban
    whole categories of nonaudit services, require the audit committee to pre-approve every service, and force
    partners to rotate. Government audits (GAO) and employee benefit plan audits (DOL) have their own rules too.
  why: >-
    After Enron and WorldCom, Congress concluded that large consulting fees and long relationships compromised
    auditors. The Sarbanes-Oxley Act of 2002 created the PCAOB and hard-wired these restrictions.
  example: >-
    A firm that audits a listed manufacturer cannot also outsource its internal audit function or value its
    acquisitions, and even permitted tax work needs the audit committee's approval before it starts.
preQuestions: [aud-spi-pre1]
keyTakeaways:
  - "SEC principles: the auditor must not audit its own work, perform management functions, act as an advocate for the client, or have a mutual or conflicting interest with the client."
  - "Prohibited nonaudit services for issuer audit clients: bookkeeping; financial information systems design and implementation; appraisal, valuation, and fairness opinions; actuarial services; internal audit outsourcing; management functions; human resources; broker-dealer and investment adviser services; legal services; expert services unrelated to the audit."
  - "Every audit and permitted nonaudit service (such as tax compliance) must be pre-approved by the audit committee."
  - "Tax services are prohibited if they involve confidential or aggressive tax positions or contingent fees, or are provided to persons in a financial reporting oversight role (PCAOB Rules 3521–3523)."
  - "Rotation: lead and concurring partners rotate after 5 years, with a 5-year time-out; other audit partners after 7 years, with a 2-year time-out."
  - "Cooling-off: a former audit engagement team member cannot become CEO, CFO, controller, or chief accounting officer (a financial reporting oversight role) of the issuer within one year before the audit period begins."
  - "GAO (Yellow Book) uses a conceptual framework plus specific nonaudit-service rules; DOL rules for ERISA plan audits extend independence to the plan and the plan sponsor."
citations:
  - source: Sarbanes-Oxley Act of 2002, Title II (Auditor independence)
  - source: SEC Regulation S-X, Rule 2-01 (Qualifications of accountants)
  - source: PCAOB Rules 3520–3526 (Independence; tax services; communications with audit committees)
  - source: GAO Government Auditing Standards, Chapter 3 (Ethics, independence, and professional judgment)
  - source: DOL Interpretive Bulletin 29 CFR 2509.75-9 (Guidelines on independence of accountants)
---

## Why issuers are different

Sarbanes-Oxley (SOX) and the SEC set **four principles**. An auditor is not independent if it:

1. audits its own work;
2. performs management functions for the client;
3. acts as an advocate for the client; or
4. has a mutual or conflicting interest with the client.

## Prohibited nonaudit services (issuer audit clients)

| Prohibited | Why |
|---|---|
| Bookkeeping and preparing financial statements | Audits its own work |
| Financial information systems design and implementation | Audits its own work |
| Appraisal, valuation, fairness opinions, contribution-in-kind reports | Audits its own work |
| Actuarial services | Audits its own work |
| Internal audit outsourcing | Management function / own work |
| Management functions and human resources | Management function |
| Broker-dealer, investment adviser, investment banking | Advocacy / mutual interest |
| Legal services and expert services unrelated to the audit | Advocacy |

**Permitted with audit committee pre-approval:** tax compliance and planning (with the PCAOB limits below), audit-related services such as comfort letters, and reviews of internal control.

```check
aud-spi-chk1
```

## PCAOB tax-service limits

- **Rule 3521:** no contingent fees.
- **Rule 3522:** no confidential transactions or aggressive tax positions (listed or recommended with a low likelihood of success).
- **Rule 3523:** no tax services to a person in a **financial reporting oversight role** (e.g., the CFO) at the issuer, or to their immediate family.
- **Rule 3524:** before the audit committee pre-approves a tax service, the auditor describes it in writing, discusses its effect on independence, and documents the discussion.
- **Rule 3526:** before accepting an engagement, and at least annually, the auditor describes in writing all relationships that may bear on independence, discusses them with the audit committee, and affirms its independence.

## Rotation and cooling-off

```timeline
title: Partner rotation (issuer audits)
events:
  - when: Years 1–5
    label: Lead and concurring (EQR) partners serve
    detail: Maximum of 5 consecutive years
  - when: Years 6–10
    label: Required time-out for lead and concurring partners
    detail: 5-year time-out before returning
  - when: Other audit partners
    label: 7 years on, then 2 years off
    detail: Applies to other partners with significant involvement
```

```worked
title: Rotation and cooling-off decisions
scenario: |
  Partner Lee has been the lead partner on a listed client's audit for five consecutive years.
  The audit senior, Nia, has been offered the job of client controller, starting next month.
steps:
  - label: Can Lee lead the next audit?
    work: 5-year maximum reached for the lead partner
    result: No — Lee must rotate off for 5 years
  - label: Can Nia take the controller job?
    work: The controller has a financial reporting oversight role; the cooling-off period is one year
    result: Nia can accept, but the firm would not be independent for the next audit period unless a full year separates her last audit work from the start of that audit period
insight: Cooling-off protects the firm's independence, not the employee's career. The consequence of a violation falls on the firm.
```

```check
aud-spi-chk2
```

## Government audits: GAO Yellow Book

- Applies to audits of governments and entities that receive federal awards performed under *Government Auditing Standards*.
- Independence of **mind** and in **appearance**, applied through a conceptual framework (threats, safeguards).
- Nonaudit services: some are prohibited outright (e.g., taking management responsibility); others require the auditor to assess threats, document the evaluation, and confirm management has suitable skill, knowledge, or experience.
- Preparing financial statements is **not automatically prohibited** under the Yellow Book, but it is a significant threat that requires evaluation and documentation.

## Employee benefit plans: DOL

- ERISA plan audits must be performed by an independent qualified public accountant under Department of Labor rules.
- Independence extends to **both the plan and the plan sponsor**.
- Impairments include a direct or material indirect financial interest in the plan or sponsor, or a member of the firm serving as a trustee, officer, or employee of the plan or sponsor during the engagement period.
