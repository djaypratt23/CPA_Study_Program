# Spot-check — M-far-equity (orchestrator)

Sample: 3 of 13 no-finding items (23%). I also confirmed the S1 (far-tbs-x2-equity `ts`). The label says "Treasury stock (a deduction)", the key is +168,000, and the UI help text says "use a minus sign or (parentheses) for negatives". (168,000) therefore parses to −168,000 and fails the default ±1 tolerance.

| Item | Independent check | Result |
|---|---|---|
| far-seq-01 | Noncash issuance at the more clearly determinable FV: 5,000 × 48 = 240,000. Key (c). | Agree |
| far-seq-02 | Incremental method: preferred 1,000 × 60 = 60,000; common gets the residual 90,000. Key (a). | Agree |
| far-seq-fc7 | Stock issuance costs reduce APIC. | Agree |

Outcome: no misses. Batch accepted.
