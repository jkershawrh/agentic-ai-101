import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { basename, join } from 'node:path'

const pagesDir = new URL('../modules/ROOT/pages/', import.meta.url)
const pages = readdirSync(pagesDir).filter((name) => name.endsWith('.adoc'))
const known = new Set(pages)
const missing = []

for (const name of pages) {
  const content = readFileSync(join(pagesDir.pathname, name), 'utf8')
  for (const match of content.matchAll(/xref:([^\[]+)\[/g)) {
    const target = basename(match[1])
    if (!known.has(target)) missing.push(`${name}: ${target}`)
  }
}

const builtIndex = new URL('../build/site/index.html', import.meta.url)
if (!existsSync(builtIndex)) missing.push('built site index is missing')
if (missing.length) {
  process.stderr.write(`${missing.join('\n')}\n`)
  process.exit(1)
}
process.stdout.write(`Checked links across ${pages.length} Showroom pages\n`)

