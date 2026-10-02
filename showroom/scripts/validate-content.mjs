import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const pagesDir = new URL('../modules/ROOT/pages/', import.meta.url)
const pages = readdirSync(pagesDir).filter((name) => name.endsWith('.adoc'))
const errors = []
const requiredSections = ['== Show', '== Learn', '== Do', '== Prove']

for (const name of pages.filter((page) => page !== 'index.adoc')) {
  const content = readFileSync(join(pagesDir.pathname, name), 'utf8')
  for (const section of requiredSections) {
    if (!content.includes(section)) errors.push(`${name}: missing ${section}`)
  }
}

const all = pages.map((name) => readFileSync(join(pagesDir.pathname, name), 'utf8')).join('\n')
if (!all.includes('role="execute"')) errors.push('No executable Showroom blocks found')
if (!all.includes('REHEARSAL')) errors.push('REHEARSAL source label is missing')
if (!all.includes('targetMutated')) errors.push('Mutation boundary is not tested')

if (errors.length) {
  process.stderr.write(`${errors.join('\n')}\n`)
  process.exit(1)
}
process.stdout.write(`Validated ${pages.length} Showroom pages\n`)

