/**
 * Content QA (P1-14): item statistics from several learners' exported backups.
 *
 *   npx tsx scripts/item-stats.ts backup-1.json backup-2.json ... > item-stats.csv
 *
 * Each backup file is one learner. Prints CSV: item id, n, p-value, discrimination,
 * choice rates and QA flags, flagged items first.
 */
import { readFileSync } from 'node:fs'
import { computeItemStats, type Respondent } from '../src/lib/itemStats'
import { loadContent } from './load-content'

const files = process.argv.slice(2)
if (!files.length) {
  console.error('Usage: npx tsx scripts/item-stats.ts <backup.json> [more backups...]')
  process.exit(1)
}

const respondents: Respondent[] = files.map((f, i) => {
  const b = JSON.parse(readFileSync(f, 'utf8'))
  if (b?.app !== 'cpa-study-program' || !Array.isArray(b?.tables?.attempts)) throw new Error(`${f} is not a CPA Study Program backup`)
  return { id: `learner-${i + 1}`, attempts: b.tables.attempts.filter((a: { itemType?: string }) => a.itemType === 'mcq') }
})

const { bundle } = loadContent()
const answers = Object.fromEntries(Object.values(bundle.questions).map((q) => [q.id, q.answer]))
const csv = (v: string | number) => (typeof v === 'number' ? String(v) : `"${v.replace(/"/g, '""')}"`)
console.log(['item', 'n', 'p_value', 'discrimination', 'choice_rates', 'flags'].join(','))
for (const s of computeItemStats(respondents, answers))
  console.log(
    [
      csv(s.itemId),
      s.n,
      s.pValue.toFixed(3),
      s.discrimination === null ? '' : s.discrimination.toFixed(3),
      csv(
        Object.entries(s.choiceRates)
          .sort()
          .map(([k, v]) => `${k}:${v.toFixed(2)}`)
          .join(' '),
      ),
      csv(s.flags.join('; ')),
    ].join(','),
  )
