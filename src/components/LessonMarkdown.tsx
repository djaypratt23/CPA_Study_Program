import { memo } from 'react'
import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { parse as parseYaml } from 'yaml'
import { BLOCK_SCHEMAS } from '../content/build'
import InlineQuestion from './InlineQuestion'
import { FadedExample, JournalEntry, TAccounts, Timeline, WorkedExample } from './LessonBlocks'
import { baseComponents } from './Markdown'
import Mermaid from './Mermaid'

function StructuredBlock({ lang, code, sessionId }: { lang: string; code: string; sessionId: string }) {
  if (lang === 'mermaid') return <Mermaid code={code} />
  if (lang === 'check')
    return (
      <>
        {code
          .split(/\s+/)
          .filter(Boolean)
          .map((id) => (
            <InlineQuestion key={id} id={id} label="Check your understanding" sessionId={sessionId} />
          ))}
      </>
    )
  if (lang in BLOCK_SCHEMAS) {
    const parsed = BLOCK_SCHEMAS[lang as keyof typeof BLOCK_SCHEMAS].safeParse(parseYaml(code))
    if (!parsed.success) return <pre className="text-xs text-rose-600">Invalid {lang} block</pre>
    const d = parsed.data as never
    switch (lang) {
      case 'worked':
        return <WorkedExample data={d} />
      case 'faded':
        return <FadedExample data={d} />
      case 'je':
        return <JournalEntry data={d} />
      case 'tacct':
        return <TAccounts data={d} />
      case 'timeline':
        return <Timeline data={d} />
    }
  }
  return (
    <pre className="my-4 overflow-x-auto rounded-lg bg-slate-100 p-3 text-sm dark:bg-slate-800">
      <code>{code}</code>
    </pre>
  )
}

function LessonMarkdown({ body, sessionId }: { body: string; sessionId: string }) {
  const components: Components = {
    ...baseComponents,
    pre: ({ children }) => <>{children}</>,
    code: ({ className, children }) => {
      const lang = /language-(\w+)/.exec(className ?? '')?.[1]
      const code = String(children ?? '').replace(/\n$/, '')
      if (!lang)
        return code.includes('\n') ? (
          <pre className="my-4 overflow-x-auto rounded-lg bg-slate-100 p-3 text-sm dark:bg-slate-800">
            <code>{code}</code>
          </pre>
        ) : (
          <code>{children}</code>
        )
      return <StructuredBlock lang={lang} code={code} sessionId={sessionId} />
    },
  }
  return (
    <div className="prose-lesson">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {body}
      </ReactMarkdown>
    </div>
  )
}

export default memo(LessonMarkdown)
