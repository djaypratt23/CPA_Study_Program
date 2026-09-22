import { useEffect } from 'react'
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import { useSettings } from './hooks/useStore'
import Analytics from './pages/Analytics'
import Course from './pages/Course'
import Dashboard from './pages/Dashboard'
import ExamHome from './pages/ExamHome'
import ExamPlayer from './pages/ExamPlayer'
import FinalReview from './pages/FinalReview'
import Flashcards from './pages/Flashcards'
import Glossary from './pages/Glossary'
import ModulePage from './pages/ModulePage'
import Notes from './pages/Notes'
import Onboarding from './pages/Onboarding'
import Planner from './pages/Planner'
import PracticeBuilder from './pages/PracticeBuilder'
import PracticeStart from './pages/PracticeStart'
import QuizPlayer from './pages/QuizPlayer'
import ReviewQueue from './pages/ReviewQueue'
import Search from './pages/Search'
import SettingsPage from './pages/SettingsPage'
import TbsList from './pages/TbsList'
import TbsPage from './pages/TbsPage'

function ThemeSync() {
  const settings = useSettings()
  useEffect(() => {
    if (!settings) return
    const root = document.documentElement
    const apply = () => {
      const dark =
        settings.theme === 'dark' || (settings.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
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

export default function App() {
  return (
    <HashRouter>
      <ThemeSync />
      <ScrollToTop />
      <Gate>
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
      </Gate>
    </HashRouter>
  )
}
