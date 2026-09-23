# CPA Study Program

A Becker-style, mobile-friendly study app for the U.S. CPA Exam (2026 blueprints), built on learning science:
concept-first lessons, retrieval practice, worked → faded → independent examples, per-choice explanations
with named traps, FSRS spaced repetition, interleaving, confidence ratings, mastery gating, an error log,
simulated exams, and an honest readiness signal.

**Live app:** https://cpa-study-program.pages.dev/ (Cloudflare Pages), with a mirror on GitHub Pages at
https://djaypratt23.github.io/CPA_Study_Program/ (see [DEPLOY.md](DEPLOY.md)).
Install it from the browser menu ("Add to Home Screen") to use it offline.

## What's inside

| Section | Status |
|---|---|
| **FAR** | Full: 37 modules (lesson, ≥10 practice MCQs, lesson checks, and flashcards in each), 24 practice TBS (2 per unit), a 50-MCQ + 7-TBS simulated exam, final-review sheets, and a glossary |
| **AUD** | Full: 32 modules, 20 practice TBS (2 per unit), a 78-MCQ + 7-TBS simulated exam, final-review sheets, and a glossary |
| **REG** | Full: 25 modules (tax year 2025, including One Big Beautiful Bill Act changes), 14 practice TBS, a 72-MCQ + 8-TBS simulated exam, final-review sheets, and a glossary |
| **TCP** | Full: 19 modules (tax year 2025, including One Big Beautiful Bill Act changes), 14 practice TBS, a 68-MCQ + 7-TBS simulated exam, final-review sheets, and a glossary |

Works on phones and desktops. On a desktop, simulations show the exhibits beside the questions (like the real exam), and
practice sets and simulated exams take keyboard shortcuts: **A–D** to choose, **1–3** for confidence, **← / →** to move.

Progress is stored **only on your device** (IndexedDB). Use **Settings → Export** to back up or move it to another device.

## Run locally

Requires Node 22+ (pinned in `.nvmrc`).

```bash
npm install
npm run dev        # http://localhost:5173/
npm run check      # lint → typecheck → build (the build runs tests → validate content → vite build)
```

Other scripts: `npm run validate` (content only), `npm test`, `npm run build`, `npm run preview`.

## Adding content

All study material lives in `content/` as data — no code changes needed. The shape is enforced by the Zod
schemas in `src/content/schema.ts`, and `npm run validate` reports any problem with the file and item id.

```
content/sections/<sec>.yaml             blueprint: exam format, weights, areas → units → modules
content/<sec>/modules/<module-id>/
    lesson.md                           Markdown + frontmatter (objectives, bigIdea, takeaways, citations)
    questions.json                      MCQs: pool "lesson" (pre-questions/checks) or "practice"
    flashcards.json
content/<sec>/tbs/<id>.json             task-based simulations (pool "practice" or "exam")
content/<sec>/exam-questions/*.json     exam-only MCQs (pool "exam")
content/<sec>/exams/<id>.json           simulated exam forms
content/<sec>/review/*.md               final-review docs
content/glossary/<sec>.json
```

Rules the validator enforces: every distractor names its **trap** and every choice has an explanation;
journal entries balance; dropdown answers are among the options; `full` sections have every module built
with ≥10 practice MCQs and ≥5 flashcards, ≥2 practice TBS per unit, and an exam form that matches the
section's testlet structure. Lessons can use fenced blocks: `check`, `worked`, `faded`, `je`, `tacct`,
`timeline`, and `mermaid` (see existing lessons for examples).

If you are unsure an answer is right, set `"needsReview": true` with a `reviewNote`. The app shows a badge,
and the item should be listed in [`REVIEW.md`](REVIEW.md).

To build out a new section, follow "Later sessions" in [`PLAN.md`](PLAN.md), then change
`status: scaffold` to `status: full` in its YAML; the validator then enforces full coverage.

## Deployment

GitHub Actions (`.github/workflows/ci.yml`) runs the full check on every push and deploys `main` to GitHub
Pages. In the repository's **Settings → Pages**, set **Source** to **GitHub Actions**.

## Docs

- [`PLAN.md`](PLAN.md) — architecture, schemas, learning-science mapping, milestones
- [`docs/BLUEPRINT_NOTES.md`](docs/BLUEPRINT_NOTES.md) — exam facts and sources
- [`REVIEW.md`](REVIEW.md) — content flagged for human review

Content is original and written for study. Standards excerpts are paraphrases, not quotations. This app
is not affiliated with the AICPA, NASBA, or any review-course provider.
