---
id: reg-federal-regulation
section: REG
title: Federal employment & securities regulation
minutes: 17
taxYear: '2025'
objectives:
  - text: Determine whether a securities offering must be registered or qualifies for an exemption.
    skill: application
    task: Apply the registration requirements of the Securities Act of 1933
  - text: Identify the reporting requirements and insider rules of the Securities Exchange Act of 1934.
    skill: remembering
    task: Recall requirements of the Securities Exchange Act of 1934
  - text: Apply federal employment laws — FICA, FUTA, FLSA, ERISA, workers' compensation, COBRA, and FMLA.
    skill: application
    task: Apply federal employment regulations
bigIdea:
  what: >-
    Securities laws protect investors: the 1933 Act requires registration (full disclosure) of new offerings unless
    an exemption applies, and the 1934 Act regulates trading and requires ongoing reports. Employment laws set
    payroll taxes, wages, benefits, and workplace protections.
  why: >-
    Raising capital or hiring staff triggers these rules. Knowing the exemptions lets a small company raise money
    without a costly registration; knowing payroll rules avoids penalties.
  example: >-
    A startup raises $4 million from 25 accredited investors under Rule 506(b) with no general advertising. It
    avoids registration, files a Form D, and the shares are restricted securities.
preQuestions: [reg-fr-pre1]
keyTakeaways:
  - "1933 Act: offers and sales of securities must be registered unless the security or transaction is exempt. Exempt securities include government and bank securities, short-term commercial paper (maturity of 9 months or less), and nonprofit securities."
  - "Exempt transactions: Rule 504 (up to $10 million in 12 months); Rule 506(b) (unlimited amount; unlimited accredited investors plus up to 35 sophisticated nonaccredited; no general solicitation); Rule 506(c) (general solicitation allowed; all purchasers accredited and verified); intrastate offerings; Regulation A (Tier 1 up to $20 million, Tier 2 up to $75 million)."
  - "1934 Act: companies listed on an exchange, or with more than $10 million in assets and a class held by 2,000 or more holders (or 500 nonaccredited), register and file 10-K (annual), 10-Q (quarterly), and 8-K (current events) reports."
  - "Short-swing profits (§16(b)): officers, directors, and 10%+ owners must return profits from a purchase and sale within 6 months."
  - "FICA: employer and employee each pay 6.2% Social Security (up to the wage base) and 1.45% Medicare; employees pay an extra 0.9% on wages over $200,000. FUTA: employers only, 6.0% on the first $7,000 per employee, less a state credit of up to 5.4%."
  - "FLSA: minimum wage and overtime at 1.5 times the regular rate over 40 hours per week for nonexempt employees."
  - "ERISA vesting for employer contributions: defined contribution — 3-year cliff or 2-to-6-year graded; defined benefit — 5-year cliff or 3-to-7-year graded. Employee contributions vest immediately."
  - "Workers' compensation: no-fault; the exclusive remedy against the employer (employees can still sue negligent third parties)."
  - "COBRA (employers with 20+ employees): continued group health coverage, generally 18 months, at the employee's cost. FMLA (50+ employees): up to 12 weeks of unpaid, job-protected leave."
citations:
  - source: Securities Act of 1933; Regulation D (Rules 504, 506); Regulation A
  - source: Securities Exchange Act of 1934 §12, §13, §16(b)
  - source: FICA, FUTA, FLSA, ERISA, COBRA, FMLA
---

## Registering securities (1933 Act)

```mermaid
flowchart TD
  S[Offering of a security] --> E1{Exempt security?}
  E1 -- Yes: government, bank, commercial paper ≤ 9 months, nonprofit --> N[No registration]
  E1 -- No --> E2{Exempt transaction?}
  E2 -- Yes: Reg D, Reg A, intrastate, crowdfunding --> N2[No registration, but antifraud rules apply]
  E2 -- No --> R[Register with the SEC: registration statement and prospectus]
```

| Exemption | Maximum raised | Investors | General solicitation? |
|---|---|---|---|
| Rule 504 | $10 million / 12 months | Any | Generally no (state rules may allow) |
| Rule 506(b) | Unlimited | Unlimited accredited + up to 35 nonaccredited (sophisticated) | No |
| Rule 506(c) | Unlimited | Accredited only (verified) | Yes |
| Regulation A Tier 1 / Tier 2 | $20 million / $75 million | Any (Tier 2 limits for nonaccredited) | Yes ("testing the waters") |
| Intrastate (Rule 147/147A) | No federal cap | In-state residents | Limited |

**Accredited investors** include institutions, directors and executive officers of the issuer, and individuals with net worth over $1 million (excluding the primary residence) or income over $200,000 ($300,000 with a spouse) in each of the last two years.

```check
reg-fr-chk1
```

## Employment laws

```worked
title: Payroll taxes for one employee
scenario: |
  In 2025, Kai earns $60,000. The state unemployment credit is the full 5.4%.
steps:
  - label: Social Security — employee share
    work: 6.2% × 60,000
    result: 3,720 (employer matches 3,720)
  - label: Medicare — employee share
    work: 1.45% × 60,000
    result: 870 (employer matches 870)
  - label: FUTA — employer only
    work: (6.0% − 5.4%) × 7,000
    result: 42
insight: Employees never pay FUTA. The additional 0.9% Medicare tax applies only to wages over $200,000 and isn't matched by the employer.
```

| Law | Key rule |
|---|---|
| FLSA | Minimum wage; overtime at 1.5× over 40 hours/week (nonexempt employees) |
| ERISA | Fiduciary duties for plan managers; vesting schedules; no requirement to offer a plan |
| Workers' compensation | No-fault; exclusive remedy against the employer; not for intentional self-inflicted injuries |
| COBRA | 20+ employees; up to 18 months of continued coverage (36 for some events); employee may pay up to 102% |
| FMLA | 50+ employees; 12 weeks unpaid leave for birth, adoption, or serious health conditions |
| Title VII / ADA / ADEA | Anti-discrimination (ADEA protects workers 40 and older) |

```check
reg-fr-chk2
```
