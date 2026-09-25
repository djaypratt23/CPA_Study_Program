import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { uid } from '../lib/random'

/**
 * One active tab per lock name (e.g. one mock exam). Opening the same exam in
 * another tab claims the lock; the older tab steps aside until the learner
 * chooses to take it back. Without BroadcastChannel the lock is a no-op.
 */
export function useTabLock(name: string, enabled = true): { blocked: boolean; takeOver: () => void } {
  const [blocked, setBlocked] = useState(false)
  const channel = useRef<BroadcastChannel | null>(null)
  const me = useMemo(() => uid('tab-'), [])

  useEffect(() => {
    if (!enabled || typeof BroadcastChannel === 'undefined') return
    const ch = new BroadcastChannel('cpa-tab-lock')
    channel.current = ch
    ch.onmessage = (e: MessageEvent) => {
      const m = e.data as { type?: string; name?: string; from?: string }
      if (m?.type === 'claim' && m.name === name && m.from !== me) setBlocked(true)
    }
    ch.postMessage({ type: 'claim', name, from: me })
    return () => {
      ch.close()
      channel.current = null
    }
  }, [name, me, enabled])

  const takeOver = useCallback(() => {
    channel.current?.postMessage({ type: 'claim', name, from: me })
    setBlocked(false)
  }, [name, me])

  return { blocked, takeOver }
}
