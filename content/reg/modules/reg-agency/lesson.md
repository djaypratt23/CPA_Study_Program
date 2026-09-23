---
id: reg-agency
section: REG
title: Agency
minutes: 14
objectives:
  - text: Identify how agency relationships are created, including actual, apparent authority and ratification.
    skill: remembering
    task: Recall how agency relationships are formed
  - text: Determine the liability of principals and agents on contracts and for torts.
    skill: application
    task: Determine liability in agency relationships
  - text: Determine the effect of terminating an agency, including notice to third parties.
    skill: application
    task: Determine the effect of termination of an agency
bigIdea:
  what: >-
    An agent acts on behalf of a principal and can bind the principal to contracts — through actual authority (the
    principal said so, expressly or impliedly), apparent authority (the principal made it look that way to a third
    party), or ratification (the principal approves afterward).
  why: >-
    Businesses act through agents: employees, officers, brokers. Knowing who is bound when an agent signs a contract
    or causes an accident decides who pays.
  example: >-
    A store manager was fired, but suppliers weren't told. He orders $10,000 of goods from a regular supplier. The
    store is bound by apparent authority because it never notified that supplier of the termination.
preQuestions: [reg-ag-pre1]
keyTakeaways:
  - "Actual authority: express (stated) or implied (reasonably necessary to carry out express authority). Apparent authority: created by the principal's conduct toward a third party."
  - "Ratification: the principal, with knowledge of all material facts, approves the whole transaction; the agent must have purported to act for the principal, who must have existed and had capacity at the time."
  - "Agent's duties: loyalty, obedience, reasonable care, accounting, and notification. Principal's duties: compensation, reimbursement, indemnification, and cooperation."
  - "Contracts: disclosed principal → only the principal is bound; partially disclosed → both; undisclosed → the agent is bound, and the principal is too once revealed."
  - "Torts: an employer is liable for an employee's torts within the scope of employment (respondeat superior); generally not for independent contractors (except inherently dangerous work)."
  - "Termination by act of the parties: apparent authority lingers until third parties get notice — actual notice to those who dealt with the agent, constructive notice (e.g., publication) to others. Termination by operation of law (death, insanity, bankruptcy) ends authority automatically."
  - "An agency coupled with an interest can't be revoked by the principal."
citations:
  - source: Restatement (Third) of Agency
---

## Types of authority

| Authority | Source | Example |
|---|---|---|
| Express actual | The principal's words to the agent | "Buy up to 100 units for me." |
| Implied actual | Reasonably necessary to carry out express authority | Hiring a truck to deliver the units |
| Apparent | The principal's conduct toward the third party | The principal lets a former employee keep acting without telling customers |
| Ratification | The principal later approves the unauthorized act | The principal accepts the benefits knowing the facts |

```check
reg-ag-chk1
```

## Liability on contracts

```mermaid
flowchart TD
  A[Agent signs a contract with authority] --> D{Did the third party know of the principal?}
  D -- Disclosed: identity known --> P[Principal liable; agent not liable]
  D -- Partially disclosed: existence known, identity unknown --> B[Principal and agent both liable]
  D -- Undisclosed: third party thinks agent acts alone --> U[Agent liable; principal also liable once disclosed]
```

An agent who acts **without** authority (and isn't ratified) is liable to the third party for breach of the implied warranty of authority.

## Liability for torts

```worked
title: Who pays for the accident?
scenario: |
  Three drivers cause car accidents.
steps:
  - label: A delivery employee hits a pedestrian while making deliveries
    work: An employee acting within the scope of employment
    result: Both the employer (respondeat superior) and the employee are liable
  - label: The same employee detours miles away to visit a friend (a frolic)
    work: Outside the scope of employment
    result: Only the employee is liable
  - label: An independent courier hired for one job causes an accident
    work: Independent contractor; not inherently dangerous work
    result: Generally only the courier is liable
insight: The employer's control over how the work is done separates employees from independent contractors.
```

## Termination

| Method | Effect on authority |
|---|---|
| Act of the parties (mutual agreement, lapse of time, fulfilled purpose, revocation, renunciation) | Actual authority ends; **apparent authority continues** until third parties receive notice |
| Operation of law (death or insanity of either party, bankruptcy, illegality, destruction of subject matter) | All authority ends immediately — no notice needed |

```check
reg-ag-chk2
```
