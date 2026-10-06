/**
 * A tiny spreadsheet evaluator for the exam spreadsheet tool (P1-10).
 * Cells hold numbers, text, or formulas starting with "=". Formulas support
 * + - * / ^, parentheses, unary minus, cell references (A1), and the functions
 * SUM, AVERAGE, MIN, MAX and ROUND over arguments or ranges (A1:B3).
 */

export type Cells = Record<string, string>
export type CellValue = number | string

export const ERR = '#ERR'
export const CYCLE = '#CYCLE'
export const DIV0 = '#DIV/0'

const REF = /^([A-Z])([1-9][0-9]?)$/

export function colName(i: number): string {
  return String.fromCharCode(65 + i)
}

/** Expand "A1:B2" into ["A1","A2","B1","B2"]. */
export function expandRange(from: string, to: string): string[] {
  const a = REF.exec(from)
  const b = REF.exec(to)
  if (!a || !b) throw new Error('bad range')
  const [c1, c2] = [a[1].charCodeAt(0), b[1].charCodeAt(0)].sort((x, y) => x - y)
  const [r1, r2] = [Number(a[2]), Number(b[2])].sort((x, y) => x - y)
  const out: string[] = []
  for (let c = c1; c <= c2; c++) for (let r = r1; r <= r2; r++) out.push(String.fromCharCode(c) + r)
  return out
}

type Tok = { t: 'num'; v: number } | { t: 'ref'; v: string } | { t: 'fn'; v: string } | { t: 'op'; v: string }

function tokenize(src: string): Tok[] {
  const toks: Tok[] = []
  let i = 0
  const s = src.toUpperCase()
  while (i < s.length) {
    const ch = s[i]
    if (ch === ' ') {
      i++
      continue
    }
    const num = /^(\d+(\.\d*)?|\.\d+)/.exec(s.slice(i))
    if (num) {
      toks.push({ t: 'num', v: Number(num[0]) })
      i += num[0].length
      continue
    }
    const word = /^[A-Z]+[0-9]*/.exec(s.slice(i))
    if (word) {
      const w = word[0]
      if (REF.test(w)) toks.push({ t: 'ref', v: w })
      else if (/^[A-Z]+$/.test(w)) toks.push({ t: 'fn', v: w })
      else throw new Error('bad token')
      i += w.length
      continue
    }
    if ('+-*/^(),:'.includes(ch)) {
      toks.push({ t: 'op', v: ch })
      i++
      continue
    }
    throw new Error('bad char')
  }
  return toks
}

class DivZero extends Error {}
class Cycle extends Error {}

export function evaluate(cells: Cells): Record<string, CellValue> {
  const out: Record<string, CellValue> = {}
  const visiting = new Set<string>()

  const valueOf = (ref: string): number => {
    const v = cellValue(ref)
    if (typeof v === 'number') return v
    if (v === '') return 0
    if (v === CYCLE) throw new Cycle()
    if (v === DIV0) throw new DivZero()
    throw new Error('not a number')
  }

  const cellValue = (ref: string): CellValue => {
    if (ref in out) return out[ref]
    const raw = (cells[ref] ?? '').trim()
    if (!raw.startsWith('=')) {
      const n = Number(raw.replace(/,/g, ''))
      return (out[ref] = raw === '' ? '' : Number.isFinite(n) ? n : raw)
    }
    if (visiting.has(ref)) throw new Cycle()
    visiting.add(ref)
    let v: CellValue
    try {
      v = formula(raw.slice(1))
    } catch (e) {
      if (e instanceof Cycle) {
        visiting.delete(ref)
        out[ref] = CYCLE
        throw e
      }
      v = e instanceof DivZero ? DIV0 : ERR
    }
    visiting.delete(ref)
    return (out[ref] = v)
  }

  const formula = (src: string): number => {
    const toks = tokenize(src)
    let p = 0
    const peek = () => toks[p]
    const eat = (v?: string) => {
      const t = toks[p++]
      if (!t || (v !== undefined && !(t.t === 'op' && t.v === v))) throw new Error('syntax')
      return t
    }
    const expr = (): number => {
      let v = term()
      while (peek()?.t === 'op' && (peek()!.v === '+' || peek()!.v === '-')) v = eat().v === '+' ? v + term() : v - term()
      return v
    }
    const term = (): number => {
      let v = power()
      while (peek()?.t === 'op' && (peek()!.v === '*' || peek()!.v === '/')) {
        if (eat().v === '*') v *= power()
        else {
          const d = power()
          if (d === 0) throw new DivZero()
          v /= d
        }
      }
      return v
    }
    const power = (): number => {
      const b = unary()
      if (peek()?.t === 'op' && peek()!.v === '^') {
        eat()
        return b ** power()
      }
      return b
    }
    const unary = (): number => {
      if (peek()?.t === 'op' && peek()!.v === '-') {
        eat()
        return -unary()
      }
      if (peek()?.t === 'op' && peek()!.v === '+') {
        eat()
        return unary()
      }
      return primary()
    }
    const args = (): number[] => {
      eat('(')
      const vals: number[] = []
      if (!(peek()?.t === 'op' && peek()!.v === ')')) {
        for (;;) {
          const t = peek()
          const next = toks[p + 1]
          if (t?.t === 'ref' && next?.t === 'op' && next.v === ':') {
            p += 2
            const to = eat()
            if (to.t !== 'ref') throw new Error('syntax')
            for (const r of expandRange(t.v, to.v)) {
              const cv = cellValue(r)
              if (cv === CYCLE) throw new Cycle()
              if (cv === DIV0) throw new DivZero()
              if (typeof cv === 'number') vals.push(cv)
            }
          } else vals.push(expr())
          if (peek()?.t === 'op' && peek()!.v === ',') eat(',')
          else break
        }
      }
      eat(')')
      return vals
    }
    const primary = (): number => {
      const t = eat()
      if (t.t === 'num') return t.v
      if (t.t === 'ref') return valueOf(t.v)
      if (t.t === 'op' && t.v === '(') {
        const v = expr()
        eat(')')
        return v
      }
      if (t.t === 'fn') {
        const vals = args()
        switch (t.v) {
          case 'SUM':
            return vals.reduce((a, b) => a + b, 0)
          case 'AVERAGE':
            if (!vals.length) throw new DivZero()
            return vals.reduce((a, b) => a + b, 0) / vals.length
          case 'MIN':
            return vals.length ? Math.min(...vals) : 0
          case 'MAX':
            return vals.length ? Math.max(...vals) : 0
          case 'ROUND': {
            const [x, d = 0] = vals
            const f = 10 ** d
            return Math.round(x * f) / f
          }
        }
      }
      throw new Error('syntax')
    }
    const v = expr()
    if (p !== toks.length) throw new Error('syntax')
    if (!Number.isFinite(v)) throw new Error('not finite')
    return v
  }

  for (const ref of Object.keys(cells)) {
    try {
      cellValue(ref)
    } catch {
      out[ref] = CYCLE
    }
  }
  return out
}

/** Display a computed value: numbers get thousands separators and up to 4 decimals. */
export function displayValue(v: CellValue | undefined): string {
  if (v === undefined || v === '') return ''
  if (typeof v === 'number') return v.toLocaleString('en-US', { maximumFractionDigits: 4 })
  return v
}
