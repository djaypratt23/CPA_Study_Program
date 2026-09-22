---
id: far-conceptual-framework
section: FAR
title: Conceptual framework & standard setting
minutes: 15
objectives:
  - text: Identify who sets U.S. GAAP for different reporting entities and what counts as authoritative.
    skill: remembering
    task: Recall the roles of the FASB, SEC, GASB, FAF, and PCC in standard setting
  - text: Navigate the FASB Codification's numbering to find where a rule would live.
    skill: application
    task: Use the Codification structure to locate recognition, measurement, and disclosure guidance
  - text: Apply the qualitative characteristics and element definitions to judge whether information belongs in the financial statements.
    skill: application
    task: Apply the conceptual framework to identify elements and useful information
bigIdea:
  what: >-
    The conceptual framework is the "constitution" behind GAAP: a short set of ideas about who financial
    statements are for, what makes information useful, and what assets, liabilities, revenues, and expenses
    actually are. Individual standards (the Codification) are the "laws" written under it.
  why: >-
    Without shared definitions, every company could call anything an asset. The framework keeps standard
    setters consistent from one topic to the next, and it gives preparers a way to reason about situations no
    standard specifically covers.
  example: >-
    A software company wants to put "our talented engineering team" on the balance sheet. The framework answers
    no: an asset is a present right to an economic benefit that the entity controls. The company has no enforceable
    right to its employees' future work, so there is no asset — however valuable the team is.
preQuestions: [far-cf-pre1]
keyTakeaways:
  - The FASB Accounting Standards Codification is the single source of authoritative nongovernmental GAAP; SEC rules are also authoritative for SEC registrants. Concepts Statements are not authoritative GAAP.
  - The FAF oversees both the FASB (businesses and not-for-profits) and the GASB (state and local governments); the SEC has legal authority over public-company reporting but relies on the FASB.
  - Useful information must be relevant (predictive value, confirmatory value, materiality) and faithfully represented (complete, neutral, free from error). Comparability, verifiability, timeliness, and understandability enhance it; cost is the pervasive constraint.
  - An asset is a present right to an economic benefit; a liability is a present obligation to transfer an economic benefit. Future plans and intentions are not assets or liabilities.
  - 'Codification section numbers are a map: -25 recognition, -30 initial measurement, -35 subsequent measurement, -45 presentation, -50 disclosure.'
citations:
  - source: FASB ASC 105-10 (Generally Accepted Accounting Principles)
    note: Codification is the source of authoritative nongovernmental GAAP; SEC guidance for registrants
  - source: FASB Concepts Statement No. 8, Chapter 1 (Objective) and Chapter 3 (Qualitative Characteristics)
  - source: FASB Concepts Statement No. 8, Chapter 4 (Elements of Financial Statements)
  - source: FASB ASC 205-40 (Going Concern)
---

## Who writes the rules?

Think of standard setting as a chain of authority:

```mermaid
flowchart TD
  SEC["SEC — legal authority over public-company reporting"] -->|"recognizes as GAAP setter"| FASB
  FAF["Financial Accounting Foundation (FAF) — oversight, funding, appoints boards"] --> FASB["FASB — GAAP for businesses & not-for-profits"]
  FAF --> GASB["GASB — GAAP for state & local governments"]
  PCC["Private Company Council"] -->|"proposes private-company alternatives, FASB endorses"| FASB
  FASB --> ASC["Accounting Standards Codification (ASC)"]
  ASU["Accounting Standards Updates (ASUs)"] -->|"amend"| ASC
```

- **FASB** (Financial Accounting Standards Board) sets GAAP for businesses and not-for-profits.
- **GASB** sets GAAP for state and local governments. (Federal government reporting is a separate body, FASAB — rarely tested.)
- **FAF** oversees both boards; it does **not** write standards.
- **SEC** has statutory authority over public-company reporting. It generally lets the FASB set GAAP, but SEC rules and interpretive releases are **also authoritative for SEC registrants**.
- **PCC** recommends simpler alternatives for private companies (for example, amortizing goodwill); they become GAAP only when the FASB endorses them.

**Due process.** New GAAP arrives as an **Accounting Standards Update (ASU)** after agenda setting, research, an exposure draft, public comment, and redeliberation. An ASU is not itself authoritative; it *amends the Codification*, which is.

### What is (and isn't) authoritative

| Authoritative for a nonpublic business | Authoritative additionally for SEC registrants | Not authoritative |
|---|---|---|
| FASB Codification (ASC) | SEC rules, regulations, interpretive releases, and staff guidance | Concepts Statements, IFRS, textbooks, AICPA issues papers, industry practice |

When the Codification doesn't address a transaction, preparers first look for guidance on **similar** transactions in the Codification, and only then to nonauthoritative sources (Concepts Statements first among them).

```check
far-cf-chk1
```

## Finding your way around the Codification

Every Codification reference reads **Topic–Subtopic–Section–Paragraph**. `ASC 842-20-25-1` means Topic 842 (Leases), Subtopic 20 (Lessee), Section 25 (Recognition), paragraph 1.

Topics are grouped by the first digit:

| Topic range | Area | Example |
|---|---|---|
| 100s | General principles | 105 GAAP |
| 200s | Presentation | 230 Cash flows, 250 Accounting changes, 260 EPS |
| 300s | Assets | 330 Inventory, 350 Goodwill & intangibles, 360 PP&E |
| 400s | Liabilities | 450 Contingencies, 470 Debt |
| 500s | Equity | 505 Equity |
| 600s | Revenue | 606 Revenue from contracts with customers |
| 700s | Expenses | 740 Income taxes |
| 800s | Broad transactions | 820 Fair value, 842 Leases |
| 900s | Industry | 958 Not-for-profit entities |

The **section number** is the part that saves time on the exam, because it is the same in every topic:

| Section | Contents |
|---|---|
| -05 | Overview and background |
| -10 | Objectives |
| -15 | Scope and scope exceptions |
| -20 | Glossary |
| **-25** | **Recognition** — *whether and when* to record |
| **-30** | **Initial measurement** — *at what amount* at first |
| **-35** | **Subsequent measurement** — how the amount changes later |
| -40 | Derecognition |
| **-45** | **Other presentation matters** |
| **-50** | **Disclosure** |
| -55 | Implementation guidance and illustrations |
| -65 | Transition |

> **Exam habit:** turn the question into a verb. "When do we record it?" → -25. "At what amount?" → -30. "How do we report it later?" → -35. "What goes in the notes?" → -50.

## Who are financial statements for, and what makes them useful?

**Objective (CON 8, Ch. 1):** provide financial information that helps **existing and potential investors, lenders, and other creditors** decide whether to provide resources to the entity. Management, regulators, and employees may use the statements too, but they are not the *primary* users the standards are written for.

**Qualitative characteristics (CON 8, Ch. 3):**

```mermaid
flowchart TD
  U["Useful financial information"] --> R["Relevance (fundamental)"]
  U --> F["Faithful representation (fundamental)"]
  R --> R1["Predictive value"]
  R --> R2["Confirmatory value"]
  R --> R3["Materiality (entity-specific)"]
  F --> F1["Complete"]
  F --> F2["Neutral"]
  F --> F3["Free from error"]
  U --> E["Enhancing: Comparability · Verifiability · Timeliness · Understandability"]
  U --> C["Pervasive constraint: benefits must justify the cost"]
```

Two traps the exam loves:

1. **Materiality is an aspect of relevance**, judged for the specific entity — there is no bright-line percentage in the framework.
2. **"Free from error" does not mean perfectly accurate.** An estimate is free from error if it is clearly described and the process used to develop it is applied without errors.

Also note what's *missing*: **conservatism and prudence are not qualitative characteristics** — deliberately understating assets would violate *neutrality*. "Reliability" was replaced by faithful representation.

```check
far-cf-chk2
```

## The elements: what actually goes on the statements

CON 8 Chapter 4 defines the building blocks. The two definitions everything else hangs on:

- **Asset:** a **present right** of an entity **to an economic benefit**.
- **Liability:** a **present obligation** of an entity **to transfer an economic benefit**.

Everything else is derived: **equity** is the residual (assets − liabilities); **revenues and gains** increase equity (other than owner investments); **expenses and losses** decrease it (other than distributions to owners); **comprehensive income** is all changes in equity from non-owner sources.

| Situation | Asset or liability now? | Why |
|---|---|---|
| Signed purchase order for next month's inventory (nothing delivered or paid) | Generally no (executory contract) | Neither party has performed yet |
| Board votes to build a new plant next year | No | A plan or intention is not a present right or obligation |
| Customer paid in advance for a service not yet provided | **Liability** | Present obligation to deliver the service |
| Legal right to use a leased warehouse | **Asset** (right-of-use) | Present right to economic benefit, controlled |

**Recognition** (putting an item into the statements, not just the notes) requires that the item meets an element definition, can be measured with a relevant measurement attribute, and can be faithfully represented — subject to materiality and the cost constraint.

## Underlying assumptions still worth knowing

- **Economic entity** — the business is separate from its owners.
- **Going concern** — assume the entity continues. Under ASC 205-40, management must evaluate whether there is **substantial doubt** about the entity's ability to continue as a going concern **within one year after the date the financial statements are issued** (or available to be issued) and disclose accordingly.
- **Monetary unit** and **periodicity** — measure in a stable currency, over artificial periods.
- **Accrual basis** — record revenues when earned and expenses when incurred, not when cash moves.

## Putting it together

When the exam hands you an unfamiliar situation, walk this chain: *Does it meet an element definition? → Can it be measured relevantly and faithfully? → Is it material? → Where would the Codification address it (which section number)?* That chain is the conceptual framework doing its job.
