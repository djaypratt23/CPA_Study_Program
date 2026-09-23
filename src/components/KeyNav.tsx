import { useHotkeys } from '../hooks/useDesktop'

/** ←/→ keyboard navigation between questions. Pass undefined to disable a direction. */
export default function KeyNav({ onPrev, onNext }: { onPrev?: () => void; onNext?: () => void }) {
  useHotkeys((e) => {
    const fn = e.key === 'ArrowLeft' ? onPrev : e.key === 'ArrowRight' ? onNext : undefined
    if (!fn) return
    e.preventDefault()
    fn()
  })
  return null
}
