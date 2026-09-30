import { lazy, Suspense, useEffect } from 'react'
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import Layout from './components/Layout'
import UpdatePrompt from './components/UpdatePrompt'
import { loadAllSections, loadSection, useContentVersion } from './content'
import { useSettings } from './hooks/useStore'
import Dashboard from './pages/Dashboard'
import Onboarding from './pages/Onboarding'

// Route-level code splitting (P2-1): only the dashboard and onboarding ship in the main chunk.
const Analytics = lazy(() => import('./pages/Analytics'))
const Course = lazy(() => import('./pages/Course'))
const ExamHome = lazy(() => import('./pages/ExamHome'))
const ExamPlayer = lazy(() => import('./pages/ExamPlayer'))
const FinalReview = lazy(() => import('./pages/FinalReview'))
const Flashcards = lazy(() => import('./pages/Flashcards'))
const Glossary = lazy(() => import('./pages/Glossary'))
const ModulePage = lazy(() => import('./pages/ModulePage'))
const Notes = lazy(() => import('./pages/Notes'))
const Planner = lazy(() => import('./pages/Planner'))
const PracticeBuilder = lazy(() => import('./pages/PracticeBuilder'))
const PracticeStart = lazy(() => import('./pages/PracticeStart'))
const QuizPlayer = lazy(() => import('./pages/QuizPlayer'))
const ReviewQueue = lazy(() => import('./pages/ReviewQueue'))
const Search = lazy(() => import('./pages/Search'))
const SettingsPage = lazy(() => import('./pages/SettingsPage'))
const TbsList = lazy(() => import('./pages/TbsList'))
const TbsPage = lazy(() => import('./pages/TbsPage'))

function ThemeSync() {
  const settings = useSettings()
  useEffect(() => {
    if (!settings) return
    const root = document.documentElement
    const apply = () => {
      const dark = settings.theme === 'dark' || (settings.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
      root.classList.toggle('dark', dark)
    }
    apply()
    root.style.fontSize = `${16 * settings.fontScale}px`
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [settings])
  return null
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (!pathname.startsWith('/module/')) window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function Gate({ children }: { children: React.ReactNode }) {
  const settings = useSettings()
  const { pathname } = useLocation()
  if (settings === undefined) return <div className="p-8 text-center muted">Loading…</div>
  if (!settings.onboarded && pathname !== '/welcome') return <Navigate to="/welcome" replace />
  // Settings are a live query; after onboarding finishes, leave /welcome once the write lands.
  if (settings.onboarded && pathname === '/welcome') return <Navigate to="/" replace />
  return <>{children}</>
}

/** Loads the active section's content when the learner switches section (P2-1). */
function SectionLoader() {
  const settings = useSettings()
  const active = settings?.activeSection
  const onboarded = !!settings?.onboarded
  useEffect(() => {
    if (active) void loadSection(active)
  }, [active])
  // Once the learner is set up, load the other sections in the background, off the critical path.
  useEffect(() => {
    if (!onboarded) return
    const t = setTimeout(() => void loadAllSections(active), 3000)
    return () => clearTimeout(t)
  }, [onboarded, active])
  return null
}

export default function App() {
  // Re-render the whole tree when another content section finishes loading.
  useContentVersion()
  return (
    <HashRouter>
      <ThemeSync />
      <SectionLoader />
      <ScrollToTop />
      <UpdatePrompt />
      <ErrorBoundary>
        <Gate>
          <Suspense fallback={<p className="p-6 muted">Loading…</p>}>
            <Routes>
              <Route path="/welcome" element={<Onboarding />} />
              <Route element={<Layout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/plan" element={<Planner />} />
                <Route path="/course" element={<Course />} />
                <Route path="/course/:sectionId" element={<Course />} />
                <Route path="/module/:moduleId" element={<ModulePage />} />
                <Route path="/practice" element={<PracticeBuilder />} />
                <Route path="/practice/start" element={<PracticeStart />} />
                <Route path="/quiz/:sessionId" element={<QuizPlayer />} />
                <Route path="/tbs" element={<TbsList />} />
                <Route path="/tbs/:tbsId" element={<TbsPage />} />
                <Route path="/review" element={<ReviewQueue />} />
                <Route path="/flashcards" element={<Flashcards />} />
                <Route path="/exam" element={<ExamHome />} />
                <Route path="/exam/:sessionId" element={<ExamPlayer />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/final-review" element={<FinalReview />} />
                <Route path="/final-review/:docId" element={<FinalReview />} />
                <Route path="/search" element={<Search />} />
                <Route path="/glossary" element={<Glossary />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </Suspense>
        </Gate>
      </ErrorBoundary>
    </HashRouter>
  )
}
