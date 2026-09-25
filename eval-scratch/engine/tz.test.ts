// Spawns tzCases.test.ts under several time zones.
import { execFileSync } from 'node:child_process'
import { describe, expect, it } from 'vitest'

const ZONES = ['UTC', 'America/Los_Angeles', 'America/New_York', 'Pacific/Kiritimati', 'Pacific/Pago_Pago', 'America/Santiago', 'Australia/Lord_Howe', 'Asia/Kolkata']

describe.skipIf(process.env.TZ_CHILD === '1')('time zones', () => {
  it.each(ZONES)('%s', (tz) => {
    let out: string
    try {
      out = execFileSync('npx', ['vitest', 'run', '--config', 'eval-scratch/vitest.config.ts', 'eval-scratch/engine/tzCases.test.ts', '--reporter=verbose'], {
        env: { ...process.env, TZ: tz, TZ_CHILD: '1' }, encoding: 'utf8', stdio: 'pipe', timeout: 120_000,
      })
    } catch (e) {
      out = String((e as { stdout?: string }).stdout ?? e)
      console.log(out)
      throw e
    }
    const lines = out.split('\n').filter((l) => l.startsWith('{'))
    console.log(lines.join('\n'))
    expect(out).toMatch(/Tests\s+6 passed/)
  }, 150_000)
})
