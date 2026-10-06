import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { StorageUnavailable } from './components/ErrorBoundary'
import { loadSection } from './content'
import { db, getSettings } from './db'
import { probeIndexedDb } from './lib/storage'
import './index.css'

const root = createRoot(document.getElementById('root')!)

// Private browsing or blocked site data can make IndexedDB unusable; explain that instead of loading forever.
probeIndexedDb(() => db.open()).then(async (problem) => {
  if (problem) return root.render(<StrictMode><StorageUnavailable reason={problem} /></StrictMode>)
  // Load the learner's active section before the first render; App loads the others in the background (P2-1).
  const settings = await getSettings().catch(() => null)
  const active = settings?.activeSection
  // Onboarding needs no section content, so a first visit renders at once.
  if (active && settings?.onboarded) await loadSection(active).catch(() => undefined)
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
