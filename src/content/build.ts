/**
 * Turns raw content files (path -> text) into a validated, cross-referenced
 * ContentBundle. Shared by the app (Vite glob imports) and by the CI
 * validator (Node fs), so both see exactly the same rules.
 */
import { parse as parseYaml } from 'yaml'
import { z } from 'zod'
import {
  ExamForm,
  FadedBlock,
  Flashcard,
  GlossaryEntry,
  JournalBlock,
  LessonFrontmatter,
  Mcq,
  ReviewDocFrontmatter,
  SectionConfig,
  TAccountBlock,
  Tbs,
  TimelineBlock,
  WorkedBlock,
  type FlashcardWithModule,
  type Lesson,
  type ReviewDoc,
  type SectionId,
} from './schema'

export type RawFiles = Record<string, string>

export interface ModuleMeta {
  id: string
  title: string
  section: SectionId
  areaId: string
  unitId: string
  order: number // global order within the section
  blueprint?: string[] // Blueprint task references, when tagged
}

export interface ContentBundle {
  sections: SectionConfig[]
  modules: ModuleMeta[]
  lessons: Record<string, Lesson>
  questions: Record<string, Mcq>
  flashcards: FlashcardWithModule[]
  tbs: Record<string, Tbs>
  exams: ExamForm[]
  glossary: GlossaryEntry[]
  reviewDocs: ReviewDoc[]
}

export interface BuildResult {
  bundle: ContentBundle
  errors: string[]
  warnings: string[]
}

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/

export function splitFrontmatter(text: string): { data: unknown; body: string } {
  const m = FRONTMATTER.exec(text)
  if (!m) return { data: {}, body: text }
  return { data: parseYaml(m[1]), body: m[2] }
}

function fmtZod(err: z.ZodError): string {
  return err.issues.map((i) => `${i.path.join('.') || '(root)'}: ${i.message}`).join('; ')
}

/** Normalize a path so both "/content/far/..." and "content/far/..." work. */
function norm(p: string): string {
  const i = p.indexOf('content/')
  return i >= 0 ? p.slice(i + 'content/'.length) : p
}

/** Fenced blocks that carry structured YAML; exported for the lesson renderer. */
export const BLOCK_SCHEMAS = {
  worked: WorkedBlock,
  faded: FadedBlock,
  je: JournalBlock,
  tacct: TAccountBlock,
  timeline: TimelineBlock,
} as const

const FENCE = /```(\w+)[^\n]*\n([\s\S]*?)```/g

export function buildContent(files: RawFiles): BuildResult {
  const errors: string[] = []
  const warnings: string[] = []
  const bundle: ContentBundle = {
    sections: [],
    modules: [],
    lessons: {},
    questions: {},
    flashcards: [],
    tbs: {},
    exams: [],
    glossary: [],
    reviewDocs: [],
  }
  const seenIds = new Map<string, string>()
  const claimId = (id: string, where: string) => {
    const prev = seenIds.get(id)
    if (prev) errors.push(`Duplicate id "${id}" in ${where} (already used in ${prev})`)
    else seenIds.set(id, where)
  }

  const entries = Object.entries(files)
    .map(([p, text]) => [norm(p), text] as const)
    .sort(([a], [b]) => a.localeCompare(b))

  // 1. Sections
  for (const [path, text] of entries) {
    if (!/^sections\/[a-z]+\.ya?ml$/.test(path)) continue
    try {
      const r = SectionConfig.safeParse(parseYaml(text))
      if (!r.success) errors.push(`${path}: ${fmtZod(r.error)}`)
      else bundle.sections.push(r.data)
    } catch (e) {
      errors.push(`${path}: YAML error ${(e as Error).message}`)
    }
  }
  const sectionOrder = ['FAR', 'AUD', 'REG', 'BAR', 'ISC', 'TCP']
  bundle.sections.sort((a, b) => sectionOrder.indexOf(a.id) - sectionOrder.indexOf(b.id))

  const moduleIndex = new Map<string, ModuleMeta>()
  for (const s of bundle.sections) {
    let order = 0
    for (const a of s.areas)
      for (const u of a.units)
        for (const m of u.modules) {
          if (moduleIndex.has(m.id)) errors.push(`sections/${s.id}: module ${m.id} listed twice`)
          const meta: ModuleMeta = { id: m.id, title: m.title, section: s.id, areaId: a.id, unitId: u.id, order: order++, blueprint: m.blueprint }
          moduleIndex.set(m.id, meta)
          bundle.modules.push(meta)
        }
  }
  const unitSections = new Map(bundle.sections.flatMap((s) => s.areas.flatMap((a) => a.units.map((u) => [u.id, s.id] as const))))

  const lessonChecks: { lessonId: string; qid: string; kind: 'check' | 'pre' }[] = []

  // 2. Module files
  for (const [path, text] of entries) {
    const m = /^([a-z]+)\/modules\/([a-z0-9-]+)\/(lesson\.md|questions\.json|flashcards\.json)$/.exec(path)
    if (!m) continue
    const [, , moduleId, file] = m
    const meta = moduleIndex.get(moduleId)
    if (!meta) {
      errors.push(`${path}: module "${moduleId}" is not listed in any section config`)
      continue
    }
    try {
      if (file === 'lesson.md') {
        const { data, body } = splitFrontmatter(text)
        const r = LessonFrontmatter.safeParse(data)
        if (!r.success) {
          errors.push(`${path}: ${fmtZod(r.error)}`)
          continue
        }
        if (r.data.id !== moduleId) errors.push(`${path}: frontmatter id "${r.data.id}" must equal folder name`)
        if (r.data.section !== meta.section) errors.push(`${path}: section mismatch`)
        bundle.lessons[moduleId] = { ...r.data, body, unitId: meta.unitId, areaId: meta.areaId }
        for (const q of r.data.preQuestions) lessonChecks.push({ lessonId: moduleId, qid: q, kind: 'pre' })
        for (const fm of body.matchAll(FENCE)) {
          const [, lang, content] = fm
          if (lang === 'check') {
            for (const qid of content.split(/\s+/).filter(Boolean))
              lessonChecks.push({ lessonId: moduleId, qid, kind: 'check' })
          } else if (lang in BLOCK_SCHEMAS) {
            const schema = BLOCK_SCHEMAS[lang as keyof typeof BLOCK_SCHEMAS]
            try {
              const br = schema.safeParse(parseYaml(content))
              if (!br.success) errors.push(`${path}: \`\`\`${lang} block: ${fmtZod(br.error)}`)
            } catch (e) {
              errors.push(`${path}: \`\`\`${lang} block YAML error ${(e as Error).message}`)
            }
          }
        }
      } else if (file === 'questions.json') {
        const arr = JSON.parse(text) as unknown[]
        if (!Array.isArray(arr)) throw new Error('expected an array')
        for (const raw of arr) {
          const r = Mcq.safeParse({ moduleId, ...(raw as object) })
          if (!r.success) {
            errors.push(`${path}: ${(raw as { id?: string }).id ?? '?'}: ${fmtZod(r.error)}`)
            continue
          }
          if (r.data.moduleId !== moduleId) errors.push(`${path}: ${r.data.id} moduleId mismatch`)
          claimId(r.data.id, path)
          bundle.questions[r.data.id] = r.data
        }
      } else {
        const arr = JSON.parse(text) as unknown[]
        if (!Array.isArray(arr)) throw new Error('expected an array')
        for (const raw of arr) {
          const r = Flashcard.safeParse(raw)
          if (!r.success) {
            errors.push(`${path}: ${fmtZod(r.error)}`)
            continue
          }
          claimId(r.data.id, path)
          bundle.flashcards.push({ ...r.data, moduleId, section: meta.section })
        }
      }
    } catch (e) {
      errors.push(`${path}: ${(e as Error).message}`)
    }
  }

  // 3. Exam-pool questions, TBS, exam forms, review docs, glossary
  for (const [path, text] of entries) {
    try {
      if (/^[a-z]+\/exam-questions\/[a-z0-9-]+\.json$/.test(path)) {
        for (const raw of JSON.parse(text) as unknown[]) {
          const r = Mcq.safeParse(raw)
          if (!r.success) {
            errors.push(`${path}: ${(raw as { id?: string }).id ?? '?'}: ${fmtZod(r.error)}`)
            continue
          }
          if (!moduleIndex.has(r.data.moduleId)) errors.push(`${path}: ${r.data.id} unknown module ${r.data.moduleId}`)
          if (r.data.pool !== 'exam') errors.push(`${path}: ${r.data.id} must have pool "exam"`)
          claimId(r.data.id, path)
          bundle.questions[r.data.id] = r.data
        }
      } else if (/^[a-z]+\/tbs\/[a-z0-9-]+\.json$/.test(path)) {
        const r = Tbs.safeParse(JSON.parse(text))
        if (!r.success) {
          errors.push(`${path}: ${fmtZod(r.error)}`)
          continue
        }
        claimId(r.data.id, path)
        const unitSection = unitSections.get(r.data.unitId)
        if (!unitSection) errors.push(`${path}: unknown unit ${r.data.unitId}`)
        else if (unitSection !== r.data.section) errors.push(`${path}: unit ${r.data.unitId} belongs to ${unitSection}, not ${r.data.section}`)
        for (const mid of r.data.moduleIds) {
          const m = moduleIndex.get(mid)
          if (!m) errors.push(`${path}: unknown module ${mid}`)
          else if (m.section !== r.data.section) errors.push(`${path}: module ${mid} belongs to ${m.section}, not ${r.data.section}`)
        }
        bundle.tbs[r.data.id] = r.data
      } else if (/^[a-z]+\/exams\/[a-z0-9-]+\.json$/.test(path)) {
        const r = ExamForm.safeParse(JSON.parse(text))
        if (!r.success) errors.push(`${path}: ${fmtZod(r.error)}`)
        else bundle.exams.push(r.data)
      } else if (/^[a-z]+\/review\/[a-z0-9-]+\.md$/.test(path)) {
        const { data, body } = splitFrontmatter(text)
        const r = ReviewDocFrontmatter.safeParse(data)
        if (!r.success) errors.push(`${path}: ${fmtZod(r.error)}`)
        else bundle.reviewDocs.push({ ...r.data, body })
      } else if (/^glossary\/[a-z]+\.json$/.test(path)) {
        for (const raw of JSON.parse(text) as unknown[]) {
          const r = GlossaryEntry.safeParse(raw)
          if (!r.success) errors.push(`${path}: ${fmtZod(r.error)}`)
          else bundle.glossary.push(r.data)
        }
      }
    } catch (e) {
      errors.push(`${path}: ${(e as Error).message}`)
    }
  }
  bundle.reviewDocs.sort((a, b) => a.section.localeCompare(b.section) || a.order - b.order)
  bundle.glossary.sort((a, b) => a.term.localeCompare(b.term))

  // 4. Cross-references
  for (const c of lessonChecks) {
    const q = bundle.questions[c.qid]
    if (!q) errors.push(`lesson ${c.lessonId}: ${c.kind} question "${c.qid}" not found`)
    else if (q.pool !== 'lesson') errors.push(`lesson ${c.lessonId}: ${c.kind} question "${c.qid}" must have pool "lesson"`)
  }
  const examIds = new Set<string>()
  for (const ex of bundle.exams) {
    if (examIds.has(ex.id)) errors.push(`exam ${ex.id}: duplicate exam form id`)
    examIds.add(ex.id)
    const formItems = ex.testlets.flatMap((t) => t.items)
    for (const id of formItems.filter((id, i) => formItems.indexOf(id) !== i)) errors.push(`exam ${ex.id}: item ${id} appears more than once`)
    const sec = bundle.sections.find((s) => s.id === ex.section)
    if (!sec) {
      errors.push(`exam ${ex.id}: unknown section`)
      continue
    }
    if (ex.testlets.length !== sec.exam.testlets.length)
      errors.push(`exam ${ex.id}: has ${ex.testlets.length} testlets, section config expects ${sec.exam.testlets.length}`)
    ex.testlets.forEach((t, i) => {
      const cfg = sec.exam.testlets[i]
      if (cfg && (cfg.kind !== t.kind || cfg.count !== t.items.length))
        errors.push(`exam ${ex.id}: testlet ${i + 1} should be ${cfg.count} ${cfg.kind}, found ${t.items.length} ${t.kind}`)
      for (const id of t.items) {
        if (t.kind === 'mcq') {
          const q = bundle.questions[id]
          if (!q) errors.push(`exam ${ex.id}: question ${id} not found`)
          else if (q.pool !== 'exam') errors.push(`exam ${ex.id}: question ${id} should be exam-pool`)
        } else {
          const tb = bundle.tbs[id]
          if (!tb) errors.push(`exam ${ex.id}: TBS ${id} not found`)
          else if (tb.pool !== 'exam') errors.push(`exam ${ex.id}: TBS ${id} should be exam-pool`)
        }
      }
    })
  }

  // Skill mix vs. the Blueprint's skill allocation (warning): exam-pool and practice MCQs plus TBS.
  for (const s of bundle.sections) {
    const mods = new Set(bundle.modules.filter((m) => m.section === s.id).map((m) => m.id))
    const skills = [
      ...Object.values(bundle.questions).filter((q) => mods.has(q.moduleId) && q.pool !== 'lesson').map((q) => q.skill),
      ...Object.values(bundle.tbs).filter((t) => t.section === s.id).map((t) => t.skill),
    ]
    if (!skills.length) continue
    for (const a of s.skillAllocation) {
      const share = (100 * skills.filter((k) => k === a.level).length) / skills.length
      if (share < a.min || share > a.max)
        warnings.push(`skill mix: ${s.id} ${a.level} is ${share.toFixed(1)}% of items (Blueprint ${a.min}–${a.max}%)`)
    }
  }

  // 5. Coverage requirements
  for (const s of bundle.sections) {
    const mods = bundle.modules.filter((m) => m.section === s.id)
    const withLesson = mods.filter((m) => bundle.lessons[m.id])
    if (s.status === 'scaffold') {
      if (withLesson.length < 1) errors.push(`${s.id}: scaffold sections need at least one complete sample module`)
    }
    const strict = s.status === 'full'
    for (const m of withLesson) {
      const practice = Object.values(bundle.questions).filter((q) => q.moduleId === m.id && q.pool === 'practice')
      const cards = bundle.flashcards.filter((f) => f.moduleId === m.id)
      const minQ = 10
      if (practice.length < minQ) errors.push(`${m.id}: has ${practice.length} practice MCQs, needs >= ${minQ}`)
      if (cards.length < 5) errors.push(`${m.id}: has ${cards.length} flashcards, needs >= 5`)
    }
    if (strict) {
      for (const m of mods) if (!bundle.lessons[m.id]) errors.push(`${s.id} (full): module ${m.id} has no lesson`)
      for (const a of s.areas)
        for (const u of a.units) {
          const n = Object.values(bundle.tbs).filter((t) => t.unitId === u.id && t.pool === 'practice').length
          if (n < 2) errors.push(`${s.id} (full): unit ${u.id} has ${n} practice TBS, needs >= 2`)
        }
      if (!bundle.exams.some((e) => e.section === s.id)) errors.push(`${s.id} (full): needs a simulated exam form`)
    }
  }

  return { bundle, errors, warnings }
}
