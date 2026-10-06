/** Small seeded PRNG so quizzes and tests are reproducible. */
export function mulberry32(seed: number): () => number {
  let t = seed >>> 0
  return () => {
    t = (t + 0x6d2b79f5) >>> 0
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

export function shuffle<T>(arr: readonly T[], rand: () => number = Math.random): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function uid(prefix = ''): string {
  return prefix + Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

/** FNV-1a hash of a string to a 32-bit seed. */
export function hashString(s: string): number {
  let h = 0x811c9dc5
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return h >>> 0
}

export const CHOICE_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'] as const

/**
 * Display order for an MCQ's choices. With a seed (the session id), the order
 * is shuffled but stable for that session, so the stored letter carries no
 * cue; without one, the authored order is kept. Choice ids never change.
 */
export function displayChoices<C extends { id: string }>(itemId: string, choices: readonly C[], seed?: string): C[] {
  return seed ? shuffle(choices, mulberry32(hashString(`${seed}:${itemId}`))) : [...choices]
}

/** The display letter (A–D) for a stored choice id in a given display order. */
export function displayLetter(order: readonly { id: string }[], choiceId: string): string {
  const i = order.findIndex((c) => c.id === choiceId)
  return i >= 0 ? CHOICE_LETTERS[i] : choiceId.toUpperCase()
}
