// Times the same content build the browser runs at startup (src/content/build.ts), using Node.
import fs from 'node:fs'
import path from 'node:path'
import { buildContent } from '../../src/content/build'
const root = path.resolve(import.meta.dirname, '../../content')
const raw: Record<string, string> = {}
const walk = (d: string) => {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f)
    if (fs.statSync(p).isDirectory()) walk(p)
    else if (/\.(md|json|ya?ml)$/.test(f)) raw['/content/' + path.relative(root, p)] = fs.readFileSync(p, 'utf8')
  }
}
walk(root)
for (let i = 0; i < 3; i++) {
  const t = performance.now()
  const r = buildContent(raw)
  console.log(`run ${i + 1}: ${(performance.now() - t).toFixed(0)} ms, files ${Object.keys(raw).length}, errors ${r.errors.length}, lessons ${Object.keys(r.bundle.lessons).length}, questions ${Object.keys(r.bundle.questions).length}, tbs ${Object.keys(r.bundle.tbs).length}, cards ${r.bundle.flashcards.length}`)
}
