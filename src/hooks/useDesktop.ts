import { useEffect, useRef, useSyncExternalStore } from 'react'

/** Tracks a CSS media query, e.g. `(min-width: 1024px)`. */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

/** Desktop-width layouts (Tailwind `lg`). */
export const useIsWide = () => useMediaQuery('(min-width: 1024px)')

/** True when a key press belongs to a form field, not a global shortcut. */
export function isTypingTarget(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null
  if (!el) return false
  const tag = el.tagName
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable
}

/**
 * Global keyboard shortcuts. The handler sees only plain key presses (no Ctrl/Cmd/Alt) made outside
 * form fields and outside the calculator, so typing is never hijacked.
 */
export function useHotkeys(handler: (e: KeyboardEvent) => void, enabled = true) {
  const ref = useRef(handler)
  useEffect(() => {
    ref.current = handler
  })
  useEffect(() => {
    if (!enabled) return
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey || e.defaultPrevented) return
      if (isTypingTarget(e.target)) return
      if ((e.target as HTMLElement | null)?.closest?.('[data-no-hotkeys]')) return
      ref.current(e)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [enabled])
}
