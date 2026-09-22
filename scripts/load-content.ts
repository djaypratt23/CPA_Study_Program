import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { buildContent } from '../src/content/build.ts'

export function readContentDir(root = join(process.cwd(), 'content')): Record<string, string> {
  const out: Record<string, string> = {}
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      const p = join(dir, name)
      if (statSync(p).isDirectory()) walk(p)
      else if (/\.(md|json|ya?ml)$/.test(name)) out['/content/' + relative(root, p).split('\\').join('/')] = readFileSync(p, 'utf8')
    }
  }
  walk(root)
  return out
}

export function loadContent() {
  return buildContent(readContentDir())
}
