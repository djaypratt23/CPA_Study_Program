---
id: reg-accountant-liability
section: REG
title: "Accountants' legal duties & liability"
minutes: 16
objectives:
  - text: Identify the elements of negligence and fraud claims against accountants and the standards for third-party liability.
    skill: remembering
    task: Recall common law liability of accountants
  - text: Apply the liability provisions of the Securities Act of 1933 and the Securities Exchange Act of 1934.
    skill: application
    task: Determine accountant liability under federal securities laws
  - text: Determine ownership of working papers and the scope of accountant-client privilege.
    skill: remembering
    task: Recall the legal status of working papers and privileged communications
bigIdea:
  what: >-
    Accountants can be sued by clients (breach of contract, negligence, fraud) and by third parties who relied on
    their work. The state's approach to third parties decides who may sue for negligence. Federal securities laws
    add liability for misstated registration statements (1933 Act) and for fraud in the securities markets (1934 Act).
  why: >-
    Liability rules shape how auditors write engagement letters, whom they let rely on their reports, and how they
    document their work. The key variables are who the plaintiff is and what the accountant's state of mind was.
  example: >-
    A bank lends money based on audited statements that turn out to be wrong. Whether the bank can sue the auditor
    for ordinary negligence depends on the state rule — near-privity, the Restatement's foreseen users, or
    foreseeability.
preQuestions: [reg-al-pre1]
keyTakeaways:
  - "Negligence: duty, breach, causation, damages. Contributory or comparative negligence of the client may be a defense."
  - "Third parties — negligence: Ultramares (privity or near privity: the accountant knew of the specific user and purpose); Restatement (Second) §552 (a known, limited group of foreseen users); foreseeability (any reasonably foreseeable user — minority rule)."
  - "Gross negligence (constructive fraud) and fraud: reckless disregard or intent (scienter). Liability extends to all foreseeable third parties who relied."
  - "1933 Act §11 (misstated registration statement): any purchaser may sue; the plaintiff needn't prove the accountant's negligence or (generally) reliance. Defenses: due diligence, the plaintiff knew of the misstatement, the loss wasn't caused by it."
  - "1934 Act §10(b) and Rule 10b-5: the plaintiff must prove a material misstatement, scienter (intent or recklessness), reliance, and damages. §18: false filings with the SEC; good-faith defense."
  - "Working papers belong to the accountant but are confidential. No general accountant-client privilege under federal law, except the limited §7525 tax practitioner privilege (not for criminal matters or tax shelter promotion)."
citations:
  - source: Ultramares Corp. v. Touche (N.Y. 1931)
  - source: Restatement (Second) of Torts §552
  - source: Securities Act of 1933 §11; Securities Exchange Act of 1934 §10(b), Rule 10b-5, §18
  - source: IRC §7525 (Confidentiality privileges relating to taxpayer communications)
---

## Common law liability

| Claim | What the plaintiff must show | Who can sue |
|---|---|---|
| Breach of contract | Failure to perform agreed services | Client (and intended third-party beneficiaries) |
| Negligence | Duty, breach (failure to exercise due care), proximate cause, damages | Client; third parties depending on the state rule |
| Gross negligence / constructive fraud | Reckless disregard for the truth | Client and foreseeable third parties |
| Fraud | Material misrepresentation, scienter, justifiable reliance, damages | Client and all foreseeable third parties |

## Third-party negligence claims

```mermaid
flowchart LR
  U[Ultramares — privity or near privity: known user and purpose] --> R[Restatement §552 — foreseen users: a known, limited class]
  R --> F[Foreseeability — any reasonably foreseeable user]
```

From left to right, more third parties can sue for ordinary negligence.

```worked
title: Who can sue for negligence?
scenario: |
  A CPA audits Hart Co. knowing Hart will show the statements to First Bank for a specific loan. Hart also
  gives them to Second Bank (unknown to the CPA) and to an investor who found them online.
steps:
  - label: First Bank
    work: A specifically known user and purpose
    result: Can sue under all three approaches
  - label: Second Bank
    work: A member of a known class (lenders for the loan) but not specifically known
    result: Can sue under the Restatement and foreseeability approaches, not Ultramares
  - label: The online investor
    work: Not known; arguably foreseeable
    result: Can sue for negligence only in a foreseeability state; could sue anywhere for fraud
insight: For fraud and gross negligence, the circle of plaintiffs is large everywhere. The state rule matters only for ordinary negligence.
```

```check
reg-al-chk1
```

## Federal securities laws

| | 1933 Act §11 | 1934 Act §10(b) / Rule 10b-5 |
|---|---|---|
| Applies to | Registration statements (new issues) | Any purchase or sale of securities |
| Plaintiff proves | A material misstatement or omission and a loss | Material misstatement, **scienter**, reliance, causation, damages |
| Negligence required? | No — the burden shifts to the accountant | More than negligence — intent or recklessness |
| Accountant's defenses | Due diligence; the plaintiff knew; the loss had other causes | Lack of scienter; no reliance |

```check
reg-al-chk2
```

## Working papers and privilege

- Working papers are the **accountant's property** but may not be disclosed without client consent, except by subpoena, for peer review or ethics investigations, or as required by law.
- No federal accountant-client privilege in general; **§7525** gives a limited privilege for federal tax advice by federally authorized practitioners in noncriminal tax matters (not written communications promoting tax shelters). Some states grant a statutory privilege.
