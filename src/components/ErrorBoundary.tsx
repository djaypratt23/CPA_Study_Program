import { Component, type ErrorInfo, type ReactNode } from 'react'
import { exportBackup, resetAll } from '../db'

interface State {
  error: Error | null
  note: string
}

/**
 * Last line of defense: a render error shows a recovery screen instead of a
 * blank page, with a way to save progress and a way to start over.
 */
export default class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { error: null, note: '' }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Unhandled render error', error, info.componentStack)
  }

  exportData = async () => {
    try {
      const data = await exportBackup()
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = `cpa-study-backup-${new Date().toISOString().slice(0, 10)}.json`
      a.click()
      URL.revokeObjectURL(a.href)
      this.setState({ note: 'Backup downloaded.' })
    } catch (e) {
      this.setState({ note: `Export failed: ${(e as Error).message}` })
    }
  }

  resetApp = async () => {
    if (!window.confirm('Erase ALL progress, notes, and settings on this device and restart? Export your data first if you can.')) return
    try {
      await resetAll()
    } finally {
      window.location.hash = '#/welcome'
      window.location.reload()
    }
  }

  render() {
    const { error, note } = this.state
    if (!error) return this.props.children
    return (
      <div role="alert" className="mx-auto max-w-xl space-y-4 px-4 py-12">
        <h1 className="h1">Something went wrong</h1>
        <p>The app hit an unexpected error. Your progress is still stored on this device.</p>
        <p className="font-mono text-xs muted break-words">{error.message}</p>
        <div className="flex flex-wrap gap-2">
          <button className="btn-primary" onClick={() => window.location.reload()}>
            Reload
          </button>
          <button className="btn-secondary" onClick={this.exportData}>
            Export data
          </button>
          <button
            className="btn border border-rose-300 text-rose-700 hover:bg-rose-50 dark:border-rose-800 dark:text-rose-300 dark:hover:bg-rose-950"
            onClick={this.resetApp}
          >
            Reset app
          </button>
        </div>
        {note && (
          <p role="status" className="text-sm">
            {note}
          </p>
        )}
      </div>
    )
  }
}

/** Shown instead of the app when IndexedDB can't be opened (e.g., some private-browsing modes). */
export function StorageUnavailable({ reason }: { reason: string }) {
  return (
    <div role="alert" className="mx-auto max-w-xl space-y-4 px-4 py-12">
      <h1 className="h1">Storage is unavailable</h1>
      <p>
        This app keeps your progress in your browser's IndexedDB storage, and the browser refused access. This usually happens in private or
        incognito windows, or when site data is blocked in the browser's settings.
      </p>
      <p>Open the app in a regular window, or allow site data for this site, then reload.</p>
      <p className="font-mono text-xs muted break-words">{reason}</p>
      <button className="btn-primary" onClick={() => window.location.reload()}>
        Reload
      </button>
    </div>
  )
}
