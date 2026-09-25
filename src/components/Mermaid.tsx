import { useEffect, useId, useState } from 'react'

/** Renders a Mermaid diagram. Mermaid is loaded lazily so it never slows the first paint. */
export default function Mermaid({ code, title }: { code: string; title?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '')
  const [svg, setSvg] = useState<string>('')
  const [err, setErr] = useState<string>('')
  useEffect(() => {
    let cancelled = false
    import('mermaid')
      .then(async ({ default: mermaid }) => {
        const dark = document.documentElement.classList.contains('dark')
        mermaid.initialize({
          startOnLoad: false,
          theme: dark ? 'dark' : 'default',
          securityLevel: 'strict',
          fontFamily: 'inherit',
          // The dark theme's default edge labels fail contrast; use an opaque slate background with light text.
          themeVariables: dark ? { edgeLabelBackground: '#0f172a', textColor: '#e2e8f0', lineColor: '#94a3b8' } : undefined,
        })
        const out = await mermaid.render(`m${id}`, code)
        if (!cancelled) setSvg(out.svg)
      })
      .catch((e: Error) => !cancelled && setErr(e.message))
    return () => {
      cancelled = true
    }
  }, [code, id])
  if (err)
    return (
      <pre className="my-4 overflow-x-auto rounded-lg bg-slate-100 p-3 text-xs dark:bg-slate-800" aria-label="Diagram source">
        {code}
      </pre>
    )
  return (
    <figure className="my-5 overflow-x-auto rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
      {svg ? <div className="flex justify-center [&_svg]:max-w-full" dangerouslySetInnerHTML={{ __html: svg }} role="img" aria-label={title ?? 'Diagram'} /> : <div className="muted py-6 text-center text-sm">Loading diagram…</div>}
    </figure>
  )
}
