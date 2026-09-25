/**
 * Zod schemas for every kind of content file under /content.
 *
 * Content is data: adding a module, question, simulation, or flashcard should
 * never require touching app code. Both the app (via Vite's import.meta.glob)
 * and the CI validator (scripts/validate-content.ts) parse content through
 * these schemas, so a malformed file fails the build instead of the learner.
 */
import { z } from 'zod'

export const SECTION_IDS = ['AUD', 'FAR', 'REG', 'BAR', 'ISC', 'TCP'] as const
export const SectionId = z.enum(SECTION_IDS)
export type SectionId = z.infer<typeof SectionId>

export const SKILL_LEVELS = ['remembering', 'application', 'analysis', 'evaluation'] as const
export const SkillLevel = z.enum(SKILL_LEVELS)
export type SkillLevel = z.infer<typeof SkillLevel>

export const SKILL_LABELS: Record<SkillLevel, string> = {
  remembering: 'Remembering & Understanding',
  application: 'Application',
  analysis: 'Analysis',
  evaluation: 'Evaluation',
}

const Range = z
  .object({ min: z.number().min(0).max(100), max: z.number().min(0).max(100) })
  .refine((r) => r.min <= r.max, { message: 'allocation min must not exceed max' })

/* ------------------------------------------------------------------ */
/* Section configuration (content/sections/<id>.yaml)                  */
/* ------------------------------------------------------------------ */

export const ModuleRef = z.object({
  id: z.string().regex(/^[a-z]{3}-[a-z0-9-]+$/, 'module ids look like far-cash-receivables'),
  title: z.string().min(3),
  /** Optional Blueprint task references (e.g. "II.B"), for automated coverage checks. */
  blueprint: z.array(z.string().regex(/^[IVX]+(\.[A-Z](\.\d+)?)?$/, 'blueprint refs look like II.B or III.E.6')).optional(),
})

export const UnitConfig = z.object({
  id: z.string().min(3),
  title: z.string().min(3),
  modules: z.array(ModuleRef).min(1),
})

export const AreaConfig = z.object({
  id: z.string().min(3),
  title: z.string().min(3),
  allocation: Range,
  units: z.array(UnitConfig).min(1),
})

export const TestletConfig = z.object({
  kind: z.enum(['mcq', 'tbs']),
  count: z.number().int().positive(),
})

export const SectionConfig = z.object({
  id: SectionId,
  name: z.string(),
  kind: z.enum(['core', 'discipline']),
  status: z.enum(['full', 'scaffold']),
  blueprintEffective: z.string(),
  description: z.string(),
  taxYear: z.string().optional(),
  taxNote: z.string().optional(),
  exam: z.object({
    durationMinutes: z.number().int().positive(),
    testlets: z.array(TestletConfig).min(1),
    breakAfterTestlet: z.number().int().positive().optional(),
    breakMinutes: z.number().int().positive().optional(),
    weighting: z.object({ mcq: z.number().positive(), tbs: z.number().positive() }),
    passingScore: z.number(),
  }),
  skillAllocation: z.array(z.object({ level: SkillLevel, min: z.number(), max: z.number() })),
  areas: z.array(AreaConfig).min(1),
}).superRefine((s, ctx) => {
  const b = s.exam.breakAfterTestlet
  if (b !== undefined && b >= s.exam.testlets.length)
    ctx.addIssue({ code: 'custom', message: `${s.id}: breakAfterTestlet ${b} must come before the last testlet (${s.exam.testlets.length})` })
  for (const a of s.skillAllocation)
    if (a.min > a.max) ctx.addIssue({ code: 'custom', message: `${s.id}: skillAllocation ${a.level} min exceeds max` })
})
export type SectionConfig = z.infer<typeof SectionConfig>
export type AreaConfig = z.infer<typeof AreaConfig>
export type UnitConfig = z.infer<typeof UnitConfig>

/* ------------------------------------------------------------------ */
/* Lessons (content/<section>/modules/<module-id>/lesson.md)           */
/* ------------------------------------------------------------------ */

export const Objective = z.object({
  text: z.string().min(5),
  skill: SkillLevel,
  task: z.string().optional(), // blueprint representative task (paraphrased)
})

export const Citation = z.object({
  source: z.string().min(2), // e.g., "ASC 842-20-25-1", "IRC §1031", "AU-C 240"
  note: z.string().optional(),
})

export const LessonFrontmatter = z.object({
  id: z.string(),
  section: SectionId,
  title: z.string().min(3),
  minutes: z.number().int().min(5).max(30),
  objectives: z.array(Objective).min(1),
  bigIdea: z.object({
    what: z.string().min(10),
    why: z.string().min(10),
    example: z.string().min(10),
  }),
  preQuestions: z.array(z.string()).default([]),
  keyTakeaways: z.array(z.string()).min(2),
  citations: z.array(Citation).min(1),
  taxYear: z.string().optional(),
  needsReview: z.boolean().default(false),
  reviewNote: z.string().optional(),
})
export type LessonFrontmatter = z.infer<typeof LessonFrontmatter>

export type Lesson = LessonFrontmatter & {
  body: string
  unitId: string
  areaId: string
}

/* Structured blocks embedded in lesson Markdown as fenced code blocks. */

// YAML turns bare numbers like `1.6` into numbers; prose fields accept either and become strings.
const Text = z.union([z.string(), z.number()]).transform(String)

export const WorkedBlock = z.object({
  title: z.string(),
  scenario: z.string(),
  steps: z.array(z.object({ label: Text, work: Text, result: Text.optional() })).min(1),
  insight: z.string().optional(),
})

export const FadedBlock = z.object({
  title: z.string(),
  scenario: z.string(),
  steps: z
    .array(
      z.object({
        label: Text,
        work: Text.optional(), // shown when the step is given
        answer: z.number().optional(), // when present, the learner must compute it
        tolerance: z.number().min(0).default(0.5),
        hint: z.string().optional(),
        solution: Text.optional(), // shown after an attempt
      }),
    )
    .min(1),
})

export const JournalBlock = z.object({
  title: z.string().optional(),
  date: z.string().optional(),
  lines: z
    .array(z.object({ account: z.string(), debit: z.number().optional(), credit: z.number().optional() }))
    .min(2),
  memo: z.string().optional(),
})

export const TAccountBlock = z.object({
  title: z.string().optional(),
  accounts: z
    .array(
      z.object({
        name: z.string(),
        debits: z.array(z.object({ label: z.string(), amount: z.number() })).default([]),
        credits: z.array(z.object({ label: z.string(), amount: z.number() })).default([]),
      }),
    )
    .min(1),
})

export const TimelineBlock = z.object({
  title: z.string().optional(),
  events: z.array(z.object({ when: z.string(), label: z.string(), detail: z.string().optional() })).min(2),
})

/* ------------------------------------------------------------------ */
/* Multiple-choice questions                                           */
/* ------------------------------------------------------------------ */

export const TRAP_TYPES = [
  'wrong-rule',
  'partial-computation',
  'wrong-period',
  'wrong-sign',
  'wrong-classification',
  'reversed',
  'distractor-number',
  'outdated-rule',
  'irrelevant-fact',
  'overgeneralization',
  'other',
] as const

export const Choice = z.object({
  id: z.enum(['a', 'b', 'c', 'd']),
  text: z.string().min(1),
  explanation: z.string().min(15, 'explain why this choice is right or wrong (15+ characters)'),
  trap: z.enum(TRAP_TYPES).optional(),
})

export const Mcq = z
  .object({
    id: z.string().regex(/^[a-z]{3}-[a-z0-9-]+$/),
    moduleId: z.string(),
    pool: z.enum(['practice', 'lesson', 'exam']),
    stem: z.string().min(10),
    choices: z.array(Choice).length(4),
    answer: z.enum(['a', 'b', 'c', 'd']),
    explanation: z.string().min(10), // overall teaching point, full computation when calculation-based
    skill: SkillLevel,
    difficulty: z.number().int().min(1).max(3).default(2),
    calc: z.boolean().default(false),
    needsReview: z.boolean().default(false),
    reviewNote: z.string().optional(),
  })
  .superRefine((q, ctx) => {
    const ids = q.choices.map((c) => c.id)
    if (new Set(ids).size !== 4) ctx.addIssue({ code: 'custom', message: `${q.id}: duplicate choice ids` })
    if (!ids.includes(q.answer)) ctx.addIssue({ code: 'custom', message: `${q.id}: answer not among choices` })
    for (const c of q.choices) {
      if (c.id !== q.answer && !c.trap)
        ctx.addIssue({ code: 'custom', message: `${q.id}: distractor ${c.id} must name the trap it represents` })
      if (c.id === q.answer && c.trap)
        ctx.addIssue({ code: 'custom', message: `${q.id}: correct answer should not carry a trap label` })
    }
    const texts = q.choices.map((c) => c.text.trim().toLowerCase())
    if (new Set(texts).size !== 4) ctx.addIssue({ code: 'custom', message: `${q.id}: duplicate choice text` })
  })
export type Mcq = z.infer<typeof Mcq>

/* ------------------------------------------------------------------ */
/* Flashcards                                                          */
/* ------------------------------------------------------------------ */

export const Flashcard = z.object({
  id: z.string(),
  front: z.string().min(3),
  back: z.string().min(1),
  needsReview: z.boolean().default(false),
})
export type Flashcard = z.infer<typeof Flashcard>
export type FlashcardWithModule = Flashcard & { moduleId: string; section: SectionId }

/* ------------------------------------------------------------------ */
/* Task-based simulations                                              */
/* ------------------------------------------------------------------ */

export const NUMERIC_UNITS = ['$', '%', 'x', 'years', 'days'] as const

const NumericPart = z.object({
  kind: z.literal('numeric'),
  id: z.string(),
  prompt: z.string(),
  rows: z
    .array(
      z
        .object({
          id: z.string(),
          label: z.string(),
          answer: z.number(),
          tolerance: z.number().min(0).optional(),
          /** Unit shown beside the input. "%" rows are keyed in percent points (25 means 25%). */
          unit: z.enum(NUMERIC_UNITS).optional(),
          explanation: z.string().min(5),
        })
        .superRefine((r, ctx) => {
          // Whole-dollar answers default to ±1; a fractional key (a ratio, a rate) must say how precise to be.
          if (!Number.isInteger(r.answer) && r.tolerance === undefined)
            ctx.addIssue({ code: 'custom', message: `row ${r.id}: non-integer answer ${r.answer} needs an explicit tolerance` })
        })
        .transform((r) => ({ ...r, tolerance: r.tolerance ?? 1 })),
    )
    .min(1),
})

const DropdownPart = z.object({
  kind: z.literal('dropdown'),
  id: z.string(),
  prompt: z.string(),
  options: z.array(z.string()).min(2).optional(), // shared option list for every row
  rows: z
    .array(
      z.object({
        id: z.string(),
        label: z.string(),
        options: z.array(z.string()).min(2).optional(),
        answer: z.string(),
        explanation: z.string().min(5),
      }),
    )
    .min(1),
})

const JournalPart = z.object({
  kind: z.literal('journal'),
  id: z.string(),
  prompt: z.string(),
  accounts: z.array(z.string()).min(2), // dropdown list, including plausible distractors
  maxLines: z.number().int().min(2).max(10).default(6),
  lines: z
    .array(z.object({ account: z.string(), debit: z.number().optional(), credit: z.number().optional() }))
    .min(2),
  tolerance: z.number().min(0).default(1),
  explanation: z.string().min(5),
})

const DocReviewPart = z.object({
  kind: z.literal('docreview'),
  id: z.string(),
  prompt: z.string(),
  segments: z
    .array(
      z.union([
        // Strict: a segment is either plain text or an editable cell, never both.
        z.strictObject({ text: z.string() }),
        z.strictObject({
          id: z.string(),
          original: z.string(),
          options: z.array(z.string()).min(2), // must include the original wording
          answer: z.string(),
          explanation: z.string().min(5),
        }),
      ]),
    )
    .min(1),
})

const ResearchPart = z.object({
  kind: z.literal('research'),
  id: z.string(),
  prompt: z.string(),
  excerpts: z.array(z.object({ id: z.string(), citation: z.string(), text: z.string() })).min(2),
  answer: z.string(),
  explanation: z.string().min(5),
})

export const TbsPart = z.discriminatedUnion('kind', [NumericPart, DropdownPart, JournalPart, DocReviewPart, ResearchPart])
export type TbsPart = z.infer<typeof TbsPart>

export const Tbs = z
  .object({
    id: z.string(),
    section: SectionId,
    unitId: z.string(),
    moduleIds: z.array(z.string()).min(1),
    pool: z.enum(['practice', 'exam']),
    title: z.string(),
    minutes: z.number().int().min(5).max(40),
    skill: SkillLevel,
    instructions: z.string(),
    exhibits: z.array(z.object({ title: z.string(), content: z.string() })).default([]),
    parts: z.array(TbsPart).min(1),
    needsReview: z.boolean().default(false),
    reviewNote: z.string().optional(),
  })
  .superRefine((t, ctx) => {
    const dup = (ids: string[]) => ids.filter((id, i) => ids.indexOf(id) !== i)
    for (const id of dup(t.parts.map((p) => p.id))) ctx.addIssue({ code: 'custom', message: `${t.id}: duplicate part id "${id}"` })
    for (const p of t.parts) {
      const cells =
        p.kind === 'numeric' || p.kind === 'dropdown' ? p.rows.map((r) => r.id) : p.kind === 'docreview' ? p.segments.flatMap((s) => ('id' in s ? [s.id] : [])) : []
      for (const id of dup(cells)) ctx.addIssue({ code: 'custom', message: `${t.id}/${p.id}: duplicate row id "${id}"` })
      if (p.kind === 'dropdown') {
        for (const r of p.rows) {
          const opts = r.options ?? p.options
          if (!opts) ctx.addIssue({ code: 'custom', message: `${t.id}/${p.id}/${r.id}: no options` })
          else if (!opts.includes(r.answer))
            ctx.addIssue({ code: 'custom', message: `${t.id}/${p.id}/${r.id}: answer "${r.answer}" not in options` })
        }
      }
      if (p.kind === 'docreview') {
        for (const s of p.segments) {
          if ('id' in s) {
            if (!s.options.includes(s.answer))
              ctx.addIssue({ code: 'custom', message: `${t.id}/${p.id}/${s.id}: answer not in options` })
            if (!s.options.includes(s.original))
              ctx.addIssue({ code: 'custom', message: `${t.id}/${p.id}/${s.id}: options must include original text` })
          }
        }
      }
      if (p.kind === 'research' && !p.excerpts.some((e) => e.id === p.answer))
        ctx.addIssue({ code: 'custom', message: `${t.id}/${p.id}: research answer not among excerpts` })
      if (p.kind === 'journal') {
        const dr = p.lines.reduce((s, l) => s + (l.debit ?? 0), 0)
        const cr = p.lines.reduce((s, l) => s + (l.credit ?? 0), 0)
        if (Math.abs(dr - cr) > 0.001)
          ctx.addIssue({ code: 'custom', message: `${t.id}/${p.id}: journal entry does not balance (${dr} vs ${cr})` })
        for (const l of p.lines) {
          if (!p.accounts.includes(l.account))
            ctx.addIssue({ code: 'custom', message: `${t.id}/${p.id}: account "${l.account}" missing from list` })
          if ((l.debit === undefined) === (l.credit === undefined))
            ctx.addIssue({ code: 'custom', message: `${t.id}/${p.id}: each line needs exactly one of debit/credit` })
        }
      }
    }
  })
export type Tbs = z.infer<typeof Tbs>

/* ------------------------------------------------------------------ */
/* Simulated exams                                                     */
/* ------------------------------------------------------------------ */

export const ExamForm = z.object({
  id: z.string(),
  section: SectionId,
  title: z.string(),
  testlets: z
    .array(
      z.discriminatedUnion('kind', [
        z.object({ kind: z.literal('mcq'), items: z.array(z.string()).min(1) }),
        z.object({ kind: z.literal('tbs'), items: z.array(z.string()).min(1) }),
      ]),
    )
    .min(1),
})
export type ExamForm = z.infer<typeof ExamForm>

/* ------------------------------------------------------------------ */
/* Glossary and final review                                           */
/* ------------------------------------------------------------------ */

export const GlossaryEntry = z.object({
  term: z.string(),
  definition: z.string(),
  section: SectionId,
  moduleId: z.string().optional(),
})
export type GlossaryEntry = z.infer<typeof GlossaryEntry>

export const ReviewDocFrontmatter = z.object({
  id: z.string(),
  section: SectionId,
  title: z.string(),
  kind: z.enum(['condensed', 'formulas', 'mnemonics', 'high-yield']),
  order: z.number().int().default(0),
})
export type ReviewDoc = z.infer<typeof ReviewDocFrontmatter> & { body: string }
