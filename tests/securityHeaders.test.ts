import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

// P2-4: the Content-Security-Policy in public/_headers must allow exactly the inline theme script in index.html.
describe('security headers (P2-4)', () => {
  const headers = readFileSync('public/_headers', 'utf8')
  const csp = /Content-Security-Policy: (.+)/.exec(headers)?.[1] ?? ''

  it('hashes the inline script in index.html', () => {
    const html = readFileSync('index.html', 'utf8')
    const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1])
    expect(scripts).toHaveLength(1)
    const hash = createHash('sha256').update(scripts[0]).digest('base64')
    expect(csp).toContain(`'sha256-${hash}'`)
  })

  it('locks down framing, sniffing, objects and inline script', () => {
    expect(csp).toContain("frame-ancestors 'none'")
    expect(csp).toContain("object-src 'none'")
    expect(csp).not.toMatch(/script-src[^;]*'unsafe-inline'/)
    expect(headers).toContain('X-Content-Type-Options: nosniff')
    expect(headers).toMatch(/Referrer-Policy: \S+/)
  })
})
