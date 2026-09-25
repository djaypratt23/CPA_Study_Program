import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { content } from '../content'
import { saveSettings } from '../db'
import { useSettings } from '../hooks/useStore'
import type { SectionId } from '../content/schema'
import Icon from './Icon'

const PRIMARY = [
  { to: '/', label: 'Home', icon: 'home' },
  { to: '/course', label: 'Course', icon: 'book' },
  { to: '/practice', label: 'Practice', icon: 'check' },
  { to: '/review', label: 'Review', icon: 'cards' },
]
const SECONDARY = [
  { to: '/plan', label: 'Study plan', icon: 'calendar' },
  { to: '/tbs', label: 'Simulations', icon: 'sim' },
  { to: '/exam', label: 'Simulated exam', icon: 'exam' },
  { to: '/analytics', label: 'Analytics', icon: 'chart' },
  { to: '/final-review', label: 'Final review', icon: 'star' },
  { to: '/flashcards', label: 'Flashcard decks', icon: 'cards' },
  { to: '/glossary', label: 'Glossary', icon: 'glossary' },
  { to: '/notes', label: 'Notes & highlights', icon: 'note' },
  { to: '/search', label: 'Search', icon: 'search' },
  { to: '/settings', label: 'Settings', icon: 'settings' },
]

function navClass({ isActive }: { isActive: boolean }) {
  return `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${
    isActive
      ? 'bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-200'
      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
  }`
}

export function SectionSwitcher() {
  const settings = useSettings()
  if (!settings) return null
  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="sr-only">Active exam section</span>
      <select
        className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 font-semibold dark:border-slate-700 dark:bg-slate-900"
        value={settings.activeSection}
        onChange={(e) => saveSettings({ activeSection: e.target.value as SectionId })}
      >
        {content.sections.map((s) => (
          <option key={s.id} value={s.id}>
            {s.id}
            {s.status === 'scaffold' ? ' (preview)' : ''}
          </option>
        ))}
      </select>
    </label>
  )
}

export default function Layout() {
  const [moreOpen, setMoreOpen] = useState(false)
  const { pathname } = useLocation()
  const immersive = pathname.startsWith('/exam/')
  // Simulations use a side-by-side task/exhibit layout on desktop, so give them the full width.
  const wide = pathname.startsWith('/tbs/')

  if (immersive) return <Outlet />

  return (
    <div className="min-h-dvh md:flex">
      {/* A button, not href="#main": the HashRouter would treat "#main" as a route and navigate Home. */}
      <button
        type="button"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-2 focus:text-slate-900"
        onClick={() => document.getElementById('main')?.focus()}
      >
        Skip to content
      </button>
      {/* Desktop sidebar */}
      <aside className="hidden w-60 shrink-0 border-r border-slate-200 bg-white p-4 md:sticky md:top-0 md:block md:h-dvh md:self-start md:overflow-y-auto dark:border-slate-800 dark:bg-slate-900">
        <Link to="/" className="mb-4 flex items-center gap-2 text-lg font-bold">
          <img src={`${import.meta.env.BASE_URL}icon.svg`} alt="" className="h-8 w-8" />
          CPA Study
        </Link>
        <div className="mb-4">
          <SectionSwitcher />
        </div>
        <nav className="space-y-1" aria-label="Main">
          {[...PRIMARY, ...SECONDARY].map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === '/'} className={navClass}>
              <Icon name={n.icon} />
              {n.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="min-w-0 flex-1">
        {/* Mobile top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white/95 px-4 py-2 backdrop-blur md:hidden dark:border-slate-800 dark:bg-slate-900/95">
          <Link to="/" className="flex items-center gap-2 font-bold">
            <img src={`${import.meta.env.BASE_URL}icon.svg`} alt="" className="h-7 w-7" />
            CPA Study
          </Link>
          <div className="flex items-center gap-1">
            <SectionSwitcher />
            <Link to="/search" className="btn-ghost px-2" aria-label="Search">
              <Icon name="search" />
            </Link>
          </div>
        </header>
        <main id="main" tabIndex={-1} className={`focus:outline-none mx-auto w-full ${wide ? 'max-w-4xl lg:max-w-7xl' : 'max-w-4xl'} px-4 pt-4 pb-28 md:px-8 md:pt-8 md:pb-12`}>
          <Outlet />
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav
        className="safe-bottom fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-slate-200 bg-white md:hidden dark:border-slate-800 dark:bg-slate-900"
        aria-label="Main"
      >
        {PRIMARY.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            end={n.to === '/'}
            onClick={() => setMoreOpen(false)}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 py-2 text-xs font-medium ${isActive ? 'text-blue-700 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'}`
            }
          >
            <Icon name={n.icon} />
            {n.label}
          </NavLink>
        ))}
        <button
          className={`flex flex-col items-center gap-0.5 py-2 text-xs font-medium ${moreOpen ? 'text-blue-700 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'}`}
          onClick={() => setMoreOpen((o) => !o)}
          aria-expanded={moreOpen}
          aria-controls="more-menu"
        >
          <Icon name="menu" />
          More
        </button>
      </nav>
      {moreOpen && (
        <div className="fixed inset-0 z-20 bg-black/30 md:hidden" onClick={() => setMoreOpen(false)}>
          <div
            id="more-menu"
            className="safe-bottom absolute inset-x-0 bottom-14 max-h-[70dvh] overflow-y-auto rounded-t-2xl bg-white p-3 dark:bg-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="grid grid-cols-2 gap-1" aria-label="More">
              {SECONDARY.map((n) => (
                <NavLink key={n.to} to={n.to} className={navClass} onClick={() => setMoreOpen(false)}>
                  <Icon name={n.icon} />
                  {n.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  )
}
