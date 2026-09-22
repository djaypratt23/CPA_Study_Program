const PATHS: Record<string, string> = {
  home: 'M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10',
  book: 'M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2V5zm0 14a2 2 0 012-2h13',
  check: 'M9 11l3 3 8-8M20 12v7a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2h9',
  cards: 'M7 4h12a1 1 0 011 1v11M4 8h12a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1z',
  chart: 'M4 20V10M10 20V4M16 20v-8M22 20H2',
  menu: 'M4 6h16M4 12h16M4 18h16',
  search: 'M11 19a8 8 0 100-16 8 8 0 000 16zm10 2l-4.35-4.35',
  settings: 'M12 15a3 3 0 100-6 3 3 0 000 6zm7.4-3a7.4 7.4 0 00-.1-1.2l2-1.6-2-3.4-2.4 1a7.5 7.5 0 00-2-1.2L14.5 3h-4l-.4 2.6a7.5 7.5 0 00-2 1.2l-2.4-1-2 3.4 2 1.6a7.4 7.4 0 000 2.4l-2 1.6 2 3.4 2.4-1a7.5 7.5 0 002 1.2l.4 2.6h4l.4-2.6a7.5 7.5 0 002-1.2l2.4 1 2-3.4-2-1.6c.07-.4.1-.8.1-1.2z',
  clock: 'M12 21a9 9 0 100-18 9 9 0 000 18zm0-14v5l3 3',
  flag: 'M5 21V4m0 0h11l-2 4 2 4H5',
  calc: 'M6 2h12a2 2 0 012 2v16a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2zm2 4h8v3H8zm0 7h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01M16 17h.01',
  sim: 'M3 4h18v12H3zM8 20h8M12 16v4M7 8h4M7 11h6',
  exam: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 5a2 2 0 002 2h2a2 2 0 002-2m-6 9l2 2 4-4',
  star: 'M12 3l2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z',
  note: 'M4 4h16v12l-4 4H4zM16 20v-4h4',
  calendar: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
  x: 'M6 6l12 12M18 6L6 18',
  chevron: 'M9 6l6 6-6 6',
  back: 'M15 6l-6 6 6 6',
  bulb: 'M9 18h6M10 21h4M12 3a6 6 0 00-4 10.5c.6.6 1 1.3 1 2.1V16h6v-.4c0-.8.4-1.5 1-2.1A6 6 0 0012 3z',
  refresh: 'M4 4v6h6M20 20v-6h-6M5.5 15a7 7 0 0012 2.5L20 14M18.5 9A7 7 0 006.5 6.5L4 10',
  glossary: 'M4 4h10a4 4 0 014 4v12H8a4 4 0 01-4-4zM8 8h6M8 12h6',
}

export default function Icon({ name, className = 'h-5 w-5' }: { name: keyof typeof PATHS | string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={PATHS[name] ?? ''} />
    </svg>
  )
}
