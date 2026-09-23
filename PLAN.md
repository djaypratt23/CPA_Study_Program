# PLAN — CPA Study Program

The north star: **maximize genuine understanding and retention, and make "what do I do next?" obvious.**
Exam facts and their sources are in [`docs/BLUEPRINT_NOTES.md`](docs/BLUEPRINT_NOTES.md).

## Architecture

```
content/                 ← all study material, as data (no code)
  sections/<id>.yaml     ← blueprint config per section: exam format, weights, skill mix, areas → units → modules
  <sec>/modules/<module-id>/
      lesson.md          ← Markdown + YAML frontmatter (objectives, big idea, takeaways, citations)
      questions.json     ← MCQs (pool: practice | lesson)
      flashcards.json
  <sec>/tbs/<id>.json    ← task-based simulations (pool: practice | exam)
  <sec>/exam-questions/  ← MCQs reserved for simulated exams (never shown in practice)
  <sec>/exams/<id>.json  ← simulated exam forms (testlets → item ids)
  <sec>/review/*.md      ← final-review docs (condensed notes, formulas, mnemonics)
  glossary/<sec>.json
src/
  content/schema.ts      ← Zod schemas (single source of truth for content shape)
  content/build.ts       ← parse + validate + cross-reference + coverage rules (app and CI share it)
  lib/                   ← pure logic, unit-tested: srs (FSRS), tbsScoring, planner, mastery,
                           analytics/readiness, quiz builder, exam scoring, search
  db/                    ← Dexie (IndexedDB) schema, write actions, backup export/import
  components/, pages/    ← React UI (HashRouter; mobile-first; Tailwind v4)
scripts/validate-content.ts ← `npm run validate` (CI gate)
tests/                   ← Vitest
```

- **Stack:** React 19 + TypeScript + Vite + Tailwind v4, `vite-plugin-pwa` (offline, installable),
  Dexie for IndexedDB, `ts-fsrs` for spaced repetition, Zod for content validation, react-markdown +
  lazy-loaded Mermaid for visuals.
- **No backend.** Progress is local; Settings → Export/Import JSON is the backup and device-transfer path.
- **Everything derived is recomputed.** The plan, mastery, readiness, and recommendations are pure
  functions of stored attempts/progress + content. That is what makes re-planning automatic.

## Content schemas (summary — see `src/content/schema.ts`)

| Type | Key fields | Validation rules |
|---|---|---|
| Section | exam testlets, weighting, skill allocation, areas(allocation) → units → modules | `full` sections must have every module built, ≥2 practice TBS per unit, ≥1 exam form |
| Lesson | objectives (skill + blueprint task), `bigIdea{what,why,example}`, preQuestions, keyTakeaways, citations, taxYear, needsReview | module id = folder; pre/check questions must exist and be `lesson` pool |
| MCQ | stem, 4 choices each with explanation, `trap` label on every distractor, answer, skill, calc, needsReview | every distractor names its trap; no duplicate choices |
| Flashcard | front, back | ≥5 per built module |
| TBS | exhibits, parts: `numeric` (tolerance), `dropdown`, `journal`, `docreview`, `research` | JEs must balance; answers must be among options; perfect response must score 100% (test) |
| Exam form | testlets → item ids | must match the section's testlet structure exactly; exam-pool items only |

Lesson Markdown supports structured fenced blocks: ` ```check ` (embedded question), ` ```worked `,
` ```faded ` (learner completes blanked steps), ` ```je ` (journal entry), ` ```tacct ` (T-accounts),
` ```timeline `, and ` ```mermaid ` (flowcharts/decision trees).

## Learning-science rules → where they live

| Requirement | Implementation |
|---|---|
| Concept first | `bigIdea` is required frontmatter and renders before the lesson body |
| Retrieval everywhere | pre-questions before the big idea; ` ```check ` blocks inside lessons |
| Worked → faded → independent | ` ```worked `, then ` ```faded `, then the practice set / TBS |
| Explain every choice | schema forces an explanation per choice + trap label per distractor |
| Spaced repetition | FSRS for flashcards and for missed/guessed/unsure questions (`lib/srs.ts`) |
| Interleaving | mixed sets and mastery checks interleave modules (`lib/quiz.ts`) |
| Confidence ratings | Guess/Unsure/Confident before reveal; correct guesses requeued like misses; calibration analytics |
| Mastery gating | ≥80% on mixed retrieval on ≥2 different days, ≥3 items/day, guesses count wrong (`lib/mastery.ts`) |
| Error log | cause tags after misses → analytics recommendations |
| Dual coding | journal entries, T-accounts, timelines, Mermaid diagrams |
| Chunking | modules are 10–20 minutes (`minutes` 5–30 enforced) |
| Cumulative/final review | planner's final-review window, mixed cumulative sets, mock exam, final-review docs |

## Milestones

- [x] **M1** Scaffold, CI (lint → typecheck → validate → test → build), GitHub Pages deploy
- [x] **M2** Content schemas, validator, lesson reader (big idea, embedded checks, visuals, notes, highlights)
- [x] **M3** MCQ engine: tutor/test/review modes, confidence, per-choice explanations, error log, flags, notes, timer, calculator
- [x] **M4** Flashcards + FSRS spaced repetition (cards and problem questions)
- [x] **M5** TBS engine: numeric, dropdown, journal entry, document review, research-excerpt; partial credit; exhibits in tabs
- [x] **M6** Planner, dashboard ("Continue" + today's plan), readiness, analytics, recommendations
- [x] **M7** Simulated exam: testlets, 4-hour clock, optional break, locked testlets, approximate score with caveat
- [x] **M8** FAR full content (every module: lesson, ≥10 practice MCQs, flashcards; ≥2 TBS per unit; mock exam)
- [x] **M9** AUD, REG, TCP scaffolds: full blueprint outline + one complete sample module each
- [x] **M10** Final review mode docs, polish, README, REVIEW.md

## Later sessions (one section at a time)

Progress: **FAR — full. AUD — full.** Next: REG, then TCP.

For each remaining section, in the learner's planned order (FAR → AUD → REG → TCP, adjustable in Settings):

1. Re-verify the section's blueprint against the official PDF; update `content/sections/<id>.yaml`.
2. Write every module (lesson + ≥10 practice MCQs + lesson checks + flashcards), unit by unit.
3. Write ≥2 practice TBS per unit, then 7–8 exam-pool TBS and the exam-pool MCQs for a mock exam form.
4. Add final-review docs and glossary entries.
5. Flip `status: scaffold` → `status: full` — the validator then enforces full coverage.
6. Second-pass review of every answer key; flag anything uncertain `needsReview: true` and list it in `REVIEW.md`.

Tax sections: before writing, re-check which provisions are testable in the exam window (six-month rule;
OBBBA special policy) and set `taxYear` on each module.

## Content accuracy process

1. Draft item with full computation in the explanation.
2. Separate arithmetic re-check (independent recomputation) — for TBS, the test suite also proves every
   answer key scores 100% against its own schema.
3. Second-pass answer-key review before commit.
4. Uncertain → `needsReview: true` + `reviewNote`, listed in `REVIEW.md`, shown with a ⚠ badge in the app.
