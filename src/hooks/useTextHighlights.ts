import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Exam-style text highlighting (P1-10) using the CSS Custom Highlight API, so the
 * rendered question markup is never modified. Highlights are ephemeral: they reset
 * when `resetKey` changes (a new question). Unsupported browsers get `supported: false`.
 */
export const HIGHLIGHT_NAME = 'exam-highlight'

export const highlightSupported = (): boolean => typeof CSS !== 'undefined' && 'highlights' in CSS && typeof (globalThis as { Highlight?: unknown }).Highlight === 'function'

export function useTextHighlights(resetKey: string) {
  const ranges = useRef<Range[]>([])
  const [state, setState] = useState<{ key: string; count: number }>({
    key: resetKey,
    count: 0,
  })
  const count = state.key === resetKey ? state.count : 0

  const apply = useCallback(() => {
    if (!highlightSupported()) return
    if (ranges.current.length) CSS.highlights.set(HIGHLIGHT_NAME, new Highlight(...ranges.current))
    else CSS.highlights.delete(HIGHLIGHT_NAME)
  }, [])

  useEffect(() => {
    ranges.current = []
    apply()
    return () => {
      ranges.current = []
      if (highlightSupported()) CSS.highlights.delete(HIGHLIGHT_NAME)
    }
  }, [resetKey, apply])

  /** Highlight the current selection if it lies inside `container`. Returns whether anything was added. */
  const addSelection = useCallback(
    (container: HTMLElement | null): boolean => {
      const sel = window.getSelection()
      if (!container || !sel || sel.rangeCount === 0 || sel.isCollapsed) return false
      const range = sel.getRangeAt(0)
      if (!container.contains(range.commonAncestorContainer)) return false
      ranges.current = [...ranges.current, range.cloneRange()]
      apply()
      sel.removeAllRanges()
      setState({ key: resetKey, count: ranges.current.length })
      return true
    },
    [apply, resetKey],
  )

  const clear = useCallback(() => {
    ranges.current = []
    apply()
    setState({ key: resetKey, count: 0 })
  }, [apply, resetKey])

  return { supported: highlightSupported(), count, addSelection, clear }
}
