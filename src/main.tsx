import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { StorageUnavailable } from './components/ErrorBoundary'
import { db } from './db'
import { probeIndexedDb } from './lib/storage'
import './index.css'

const root = createRoot(document.getElementById('root')!)

// Private browsing or blocked site data can make IndexedDB unusable; explain that instead of loading forever.
probeIndexedDb(() => db.open()).then((problem) =>
  root.render(<StrictMode>{problem ? <StorageUnavailable reason={problem} /> : <App />}</StrictMode>),
)
