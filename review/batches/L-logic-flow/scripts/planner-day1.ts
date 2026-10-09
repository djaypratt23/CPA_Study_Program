import { loadContent } from '../../../../scripts/load-content.ts'
import { computeStudyState } from '../../../../src/lib/studyState.ts'
import { DEFAULT_SETTINGS } from '../../../../src/db/types.ts'
const { bundle } = loadContent()
const section = bundle.sections.find((s) => s.id === 'FAR')!
const st = computeStudyState({ content: bundle, section, settings: { ...DEFAULT_SETTINGS, examDates: { FAR: '2026-11-06' }, minutesByWeekday: [43, 43, 43, 43, 43, 43, 43] }, attempts: [], progress: [], srs: [], errors: [], quizSessions: [], tbsSessions: [], examSessions: [], now: new Date(2026, 9, 9, 8) })
for (const d of st.plan.days.slice(0, 6)) console.log(d.date, d.capacity, d.tasks.map((t) => `${t.kind}:${t.moduleId ?? t.unitId ?? ''}:${t.minutes}`).join(' | '))
console.log(bundle.lessons['far-balance-sheet-equity'].minutes, bundle.lessons['far-income-statement-oci'].minutes, bundle.lessons['far-notes-disclosures'].minutes, bundle.lessons['far-cash-flows'].minutes)
