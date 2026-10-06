import { useLocation } from 'react-router-dom'
import { useRegisterSW } from 'virtual:pwa-register/react'

/** Routes where a reload would interrupt a timed or in-progress task. */
const BUSY = /^\/(exam|quiz|tbs)\//

/**
 * A new deploy never reloads the page on its own. The learner gets a toast and
 * chooses when to reload; during an exam, quiz, or simulation the reload
 * button is withheld until they leave the task.
 */
export default function UpdatePrompt() {
  const { pathname } = useLocation()
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({ immediate: true })
  if (!needRefresh) return null
  const busy = BUSY.test(pathname)
  return (
    <div
      role="status"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-md flex-wrap items-center gap-3 rounded-xl bg-slate-900 p-3 text-sm text-white shadow-lg dark:bg-slate-100 dark:text-slate-900"
    >
      <span className="flex-1">
        {busy ? 'A new version is ready. You can reload once you finish or leave this session.' : 'A new version of the app is ready.'}
      </span>
      {!busy && (
        <button className="btn-primary" onClick={() => updateServiceWorker(true)}>
          Reload
        </button>
      )}
      <button className="btn-ghost" onClick={() => setNeedRefresh(false)}>
        Later
      </button>
    </div>
  )
}
