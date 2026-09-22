import type { ContentBundle } from '../content/build'

export interface SearchHit {
  kind: 'module' | 'question' | 'flashcard' | 'glossary' | 'review' | 'tbs'
  id: string
  title: string
  snippet: string
  to: string
  score: number
}

const strip = (s: string) =>
  s
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#>*_`|[\]()-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

function snippet(text: string, terms: string[]): string {
  const lower = text.toLowerCase()
  const i = Math.max(0, lower.indexOf(terms[0]))
  const start = Math.max(0, i - 60)
  return (start ? '…' : '') + text.slice(start, start + 180) + (text.length > start + 180 ? '…' : '')
}

/** Simple ranked full-text search over all content (all terms must match). */
export function search(bundle: ContentBundle, query: string, limit = 50): SearchHit[] {
  const terms = query.toLowerCase().split(/\s+/).filter((t) => t.length > 1)
  if (!terms.length) return []
  const hits: SearchHit[] = []
  const consider = (kind: SearchHit['kind'], id: string, title: string, body: string, to: string, weight: number) => {
    const t = title.toLowerCase()
    const b = body.toLowerCase()
    if (!terms.every((x) => t.includes(x) || b.includes(x))) return
    const score = weight * terms.reduce((s, x) => s + (t.includes(x) ? 3 : 0) + Math.min(3, b.split(x).length - 1), 0)
    hits.push({ kind, id, title, snippet: snippet(body, terms), to, score })
  }
  for (const l of Object.values(bundle.lessons)) {
    const body = strip([l.bigIdea.what, l.bigIdea.why, l.bigIdea.example, l.body, l.keyTakeaways.join(' '), l.citations.map((c) => c.source).join(' ')].join(' '))
    consider('module', l.id, l.title, body, `/module/${l.id}`, 1.5)
  }
  for (const g of bundle.glossary) consider('glossary', g.term, g.term, g.definition, `/glossary?term=${encodeURIComponent(g.term)}`, 2)
  for (const f of bundle.flashcards) consider('flashcard', f.id, strip(f.front), strip(f.back), `/flashcards?module=${f.moduleId}`, 1)
  for (const q of Object.values(bundle.questions))
    if (q.pool !== 'exam') consider('question', q.id, strip(q.stem).slice(0, 90), strip(q.explanation), `/module/${q.moduleId}`, 0.7)
  for (const d of bundle.reviewDocs) consider('review', d.id, d.title, strip(d.body), `/final-review/${d.id}`, 1.2)
  for (const t of Object.values(bundle.tbs)) if (t.pool === 'practice') consider('tbs', t.id, t.title, strip(t.instructions), `/tbs/${t.id}`, 1)
  return hits.sort((a, b) => b.score - a.score).slice(0, limit)
}
