/**
 * Browser storage helpers: persistent-storage requests and an IndexedDB
 * availability probe (private browsing and blocked storage lack it).
 */
import { useEffect, useState } from 'react'

/** Ask the browser not to evict our data. Resolves to the persisted state, or false if unsupported. */
export async function requestPersistence(): Promise<boolean> {
  try {
    if (!navigator.storage?.persist) return false
    if (await navigator.storage.persisted()) return true
    return await navigator.storage.persist()
  } catch {
    return false
  }
}

export async function isPersisted(): Promise<boolean> {
  try {
    return (await navigator.storage?.persisted?.()) ?? false
  } catch {
    return false
  }
}

/** Current persistence state; undefined while checking. */
export function usePersistence(): boolean | undefined {
  const [state, setState] = useState<boolean | undefined>(undefined)
  useEffect(() => {
    let live = true
    isPersisted().then((p) => live && setState(p))
    return () => {
      live = false
    }
  }, [])
  return state
}

/** Resolves to an error message if IndexedDB can't be opened, otherwise null. */
export async function probeIndexedDb(open: () => Promise<unknown>): Promise<string | null> {
  try {
    if (typeof indexedDB === 'undefined' || !indexedDB) return 'This browser does not provide IndexedDB storage.'
    await open()
    return null
  } catch (e) {
    return (e as Error)?.message || 'The database could not be opened.'
  }
}
