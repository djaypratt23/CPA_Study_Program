import { describe, expect, it } from "vitest";
import { loadContent } from "../scripts/load-content";
import type { Tbs } from "../src/content/schema";

// Regression tests for content corrected in remediation (REMEDIATION_TASKS.md P0-9, P1-8).

const { bundle } = loadContent();
const q = (id: string) => {
  const item = bundle.questions[id];
  if (!item) throw new Error(`missing MCQ ${id}`);
  return item;
};
const keyText = (id: string) =>
  q(id).choices.find((c) => c.id === q(id).answer)!.text;
const row = (t: Tbs, id: string) => {
  for (const p of t.parts)
    if (p.kind === "numeric" || p.kind === "dropdown")
      for (const r of p.rows) if (r.id === id) return r;
  throw new Error(`missing row ${id}`);
};

describe("P0-9 stale AUD rules", () => {
  it("no AUD item teaches the superseded 45-day PCAOB assembly period as current", () => {
    const texts = [
      ...Object.values(bundle.questions)
        .filter((x) => x.moduleId.startsWith("aud-"))
        .flatMap((x) => [
          x.stem,
          x.explanation,
          ...x.choices.flatMap((c) => [c.text, c.explanation]),
        ]),
      ...bundle.flashcards
        .filter((f) => f.section === "AUD")
        .flatMap((f) => [f.front, f.back]),
    ];
    for (const t of texts)
      if (/45 days|45-day/.test(t))
        expect(t, t).toMatch(/formerly 45|reduced from 45/);
  });
  it("aud-ev-chk2 offers the 14-day PCAOB period as the distractor", () => {
    expect(
      q("aud-ev-chk2").choices.some(
        (c) => c.text === "Within 14 days — March 24",
      ),
    ).toBe(true);
  });
  it("SSARS 25: a known departure in a review modifies the conclusion", () => {
    expect(keyText("aud-ss-07")).toMatch(/qualified or adverse/);
    expect(keyText("aud-x4-12")).toMatch(/qualified or adverse/);
  });
});

describe("P1-8 medium content fixes", () => {
  it("far-dsec-10 price and key agree with annual payments", () => {
    expect(q("far-dsec-10").stem).toContain("$105,154");
    expect(keyText("far-dsec-10")).toBe("$1,588");
    const price =
      10000 * [1, 2, 3].reduce((a, t) => a + 1 / 1.08 ** t, 0) +
      100000 / 1.08 ** 3;
    expect(Math.round(price)).toBe(105154);
    expect(10000 - Math.round(105154 * 0.08)).toBe(1588);
  });
  it("reg-pb-03 uses the $19,000 2025 annual exclusion", () => {
    expect(q("reg-pb-03").stem).toContain("$19,000");
    expect(keyText("reg-pb-03")).toBe("$48,000");
  });
  it("aud-sa-04 projected misstatement no longer equals the audited value", () => {
    expect(keyText("aud-sa-04")).toBe("$6,000");
    expect(q("aud-sa-04").stem).toContain("$3,500");
  });
  it("tcp-sc2-01 moves the weekend Form 2553 deadline (IRC §7503)", () => {
    expect(keyText("tcp-sc2-01")).toBe("March 17, 2025");
  });
  it("reg-tbs-x5-research uses the March 16, 2026 due date", () => {
    const t = bundle.tbs["reg-tbs-x5-research"];
    expect(row(t, "p").answer).toBe("March 16, 2026");
    expect(row(t, "s").answer).toBe("March 16, 2026");
  });
  it("tcp-tbs-u3-m1 book tax expense reconciles to current plus deferred tax", () => {
    const t = bundle.tbs["tcp-tbs-u3-m1"];
    const current = Number(row(t, "tax").answer);
    const deferred = Math.round(0.21 * (50000 - 18000 - 12000));
    expect(current + deferred).toBe(195720);
    expect(row(t, "re").answer).toBe(1200000 + (930000 - 195720) - 200000);
  });
});

describe("P1-5 indexed amounts are stated, not recalled", () => {
  // Each item once required recalling an inflation-indexed amount; the stem (or TBS instructions) must now state it.
  const mcqs: Record<string, string> = {
    "reg-adj-chk1": "$300",
    "reg-adj-chk2": "$85,000",
    "reg-fs-chk2": "$2,000",
    "reg-te-pre1": "$19,000",
    "reg-adj-01": "$8,550",
    "reg-adj-02": "$7,000",
    "reg-adj-05": "$126,000",
    "reg-adj-09": "$79,000",
    "reg-ot-03": "$88,100",
    "reg-ot-04": "$2,700",
    "reg-ot-07": "$176,100",
    "reg-fs-05": "$5,200",
    "reg-fs-06": "$1,350",
    "reg-fs-08": "$31,500",
    "reg-te-01": "$19,000",
    "reg-te-05": "$19,000",
    "reg-x4-02": "$5,200",
    "reg-x4-03": "$31,500",
    "reg-x4-12": "$79,000",
    "reg-x5-19": "$19,000",
    "reg-cr-chk1": "$2,200",
    "reg-x4-16": "$2,200",
    "reg-id-chk1": "$40,000",
    "tcp-ip-07": "$2,700",
    "tcp-gt-01": "$19,000",
    "tcp-gt-04": "$13,990,000",
    "tcp-gt-10": "$19,000",
    "tcp-pa-05": "$626,000",
    "tcp-re-01": "$23,500",
    "tcp-re-03": "$236,000",
    "tcp-te-03": "$15,650",
    "tcp-x1-04": "$2,700",
    "tcp-x1-13": "$19,000",
    "tcp-x1-17": "$11,250",
    "tcp-x4-08": "$2,500,000",
    "tcp-gt-chk1": "$19,000",
    "tcp-re-chk1": "$79,000",
    "tcp-cr2-chk1": "$4,000,000",
  };
  it.each(Object.entries(mcqs))("%s states %s", (id, amount) => {
    expect(q(id).stem).toContain(amount);
  });
  const tbs: Record<string, string> = {
    "reg-tbs-u4-gross-income": "$23,625",
    "reg-tbs-u5-credits-amt": "$88,100",
    "reg-tbs-u5-taxable-income": "$31,500",
    "reg-tbs-u7-s-corp-gifts": "$19,000",
    "reg-tbs-x4-individual": "$300",
    "reg-tbs-x4-family": "$2,200",
    "tcp-tbs-u2-retirement-education": "$79,000",
    "tcp-tbs-u7-exchange-installment": "$2,500,000",
    "tcp-tbs-x1-gift-retirement": "$13,990,000",
  };
  it.each(Object.entries(tbs))("%s states %s", (id, amount) => {
    expect(bundle.tbs[id].instructions).toContain(amount);
  });
});
