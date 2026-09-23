---
id: reg-contracts
section: REG
title: Contracts
minutes: 18
objectives:
  - text: Determine whether a valid contract was formed — offer, acceptance, consideration, capacity, and legality — under common law and the UCC.
    skill: application
    task: Determine whether a contract exists
  - text: Apply the statute of frauds, parol evidence rule, and defenses to enforcement.
    skill: application
    task: Evaluate defenses to contract enforcement
  - text: Determine remedies, risk of loss, and warranties in sales of goods.
    skill: application
    task: Apply UCC Article 2 rules on performance and remedies
bigIdea:
  what: >-
    A contract is an enforceable promise: offer + acceptance + consideration, between parties with capacity, for a
    legal purpose. Contracts for services and real estate follow common law; sales of goods follow UCC Article 2,
    which is more flexible — especially between merchants.
  why: >-
    Contracts are how businesses commit. Most disputes come down to a handful of questions: was there really an
    agreement, did it need to be in writing, what did the parties actually agree to, and what's the remedy?
  example: >-
    A supplier emails an offer to sell 500 pallets at $20. The buyer replies "accepted, delivery by Friday." Under
    the UCC, the added delivery term doesn't prevent a contract — it's treated as a proposal (or, between
    merchants, may become part of the deal unless it materially alters it).
preQuestions: [reg-ct-pre1]
keyTakeaways:
  - "Common law governs services, employment, and real estate; UCC Article 2 governs sales of goods."
  - "Offers end by revocation (effective when received), rejection or counteroffer, lapse, and death or insanity of either party. Options (with consideration) and UCC firm offers (a merchant's signed writing, irrevocable up to 3 months without consideration) can't be revoked."
  - "Acceptance: common law mirror-image rule; UCC allows additional terms (between merchants they become part unless material, objected to, or the offer limits acceptance). Mailbox rule: acceptance is effective on dispatch."
  - "Consideration: a bargained-for legal detriment. Past consideration and preexisting duties don't count; UCC modifications need no consideration if made in good faith."
  - "Statute of frauds (writing required): Marriage, contracts that can't be performed within one Year, Land, Executor promises to pay estate debts personally, Goods of $500 or more, Suretyship (MY LEGS)."
  - "Parol evidence rule: evidence of prior or contemporaneous agreements can't contradict a fully integrated written contract (exceptions: fraud, mistake, later modifications, ambiguity)."
  - "Remedies: compensatory and consequential damages; liquidated damages if not a penalty; specific performance for land or unique goods; duty to mitigate; no punitive damages for breach alone."
  - "Risk of loss (no breach): FOB shipping point → passes at delivery to the carrier; FOB destination → at tender at destination; no carrier → merchant seller: on the buyer's receipt; non-merchant seller: on tender."
  - "Implied warranty of merchantability (merchant sellers only) and fitness for a particular purpose; disclaimers must meet UCC requirements (\"as is\" works for both)."
citations:
  - source: Restatement (Second) of Contracts
  - source: Uniform Commercial Code Article 2 (Sales)
---

## Formation: common law vs. UCC

| Issue | Common law | UCC (goods) |
|---|---|---|
| Acceptance with changed terms | Counteroffer (mirror image) | Acceptance; additional terms are proposals (between merchants, included unless material, objected to, or limited by the offer) |
| Irrevocable offers | Option contract (needs consideration) | Firm offer: merchant, signed writing, up to 3 months, no consideration |
| Modification | Needs new consideration | Good faith; no consideration needed |
| Open terms | Must be definite | Gaps filled (price, delivery, payment) if parties intended a contract |

```check
reg-ct-chk1
```

## Is it enforceable?

```worked
title: Checking enforceability
scenario: |
  Four agreements are made orally.
steps:
  - label: Sale of used equipment for $2,400
    work: Goods of $500 or more → statute of frauds
    result: Unenforceable without a signed writing (exceptions — specially manufactured goods, admission, partial performance)
  - label: A three-month consulting job for $50,000
    work: Services that can be performed within one year
    result: Enforceable orally
  - label: Sale of a vacant lot for $30,000
    work: Interest in land
    result: Unenforceable without a writing (part performance may be an exception)
  - label: A promise to pay a friend's debt if the friend doesn't
    work: Suretyship
    result: Unenforceable without a writing
insight: The statute of frauds asks what kind of contract it is — not how big it is (except goods of $500 or more).
```

## Defenses

| Defense | Effect |
|---|---|
| Fraud in the inducement | Voidable by the victim |
| Fraud in the execution | Void |
| Duress (physical) | Void; economic duress → voidable |
| Undue influence | Voidable |
| Mutual mistake of a material fact | Voidable by either party |
| Unilateral mistake | Generally enforceable (unless the other party knew or should have known) |
| Minors (lack of capacity) | Voidable by the minor (liable for the reasonable value of necessaries) |
| Illegality | Void |

## Performance and remedies

- **Substantial performance** (common law): the performing party can recover the price less damages.
- **Perfect tender** (UCC): the buyer may reject nonconforming goods; the seller may **cure** within the contract period.
- **Anticipatory repudiation:** the injured party may sue immediately or wait.
- **Remedies:** compensatory, consequential (if foreseeable), liquidated (reasonable, not a penalty), specific performance (land, unique goods), rescission and restitution. The injured party must mitigate.

```check
reg-ct-chk2
```
