import { useCallback, useEffect, useRef } from 'react'

/**
 * Debounced saving for free-text fields: `schedule` saves after the user
 * pauses, and `flush` saves now (on blur). A pending save is also flushed
 * when the component unmounts or the page is hidden, so an app update or a
 * closed tab can't drop what was typed.
 */
export function useDebouncedSave(save: (value: string) => unknown, delayMs = 600) {
  const saveRef = useRef(save)
  // The save target is captured with the value, so a pending edit is never saved to a
  // different item after the component re-renders for the next question.
  const pending = useRef<{ value: string; save: (value: string) => unknown } | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    saveRef.current = save
  }, [save])

  const flush = useCallback(() => {
    clearTimeout(timer.current)
    if (pending.current === null) return
    const { value, save: target } = pending.current
    pending.current = null
    void target(value)
  }, [])

  const schedule = useCallback(
    (value: string) => {
      pending.current = { value, save: saveRef.current }
      clearTimeout(timer.current)
      timer.current = setTimeout(flush, delayMs)
    },
    [flush, delayMs],
  )

  useEffect(() => {
    const onHide = () => document.visibilityState === 'hidden' && flush()
    document.addEventListener('visibilitychange', onHide)
    window.addEventListener('pagehide', flush)
    return () => {
      document.removeEventListener('visibilitychange', onHide)
      window.removeEventListener('pagehide', flush)
      flush()
    }
  }, [flush])

  return { schedule, flush }
}
