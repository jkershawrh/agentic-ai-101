import { readFileSync } from 'node:fs'

const playbook = readFileSync(new URL('../../site.yml', import.meta.url), 'utf8')
const footer = readFileSync(
  new URL('../supplemental-ui/partials/footer-scripts.hbs', import.meta.url),
  'utf8',
)
const executeUi = readFileSync(
  new URL('../supplemental-ui/js/execute-command.js', import.meta.url),
  'utf8',
)

if (!playbook.includes('supplemental_files: ./showroom/supplemental-ui')) {
  throw new Error('Antora playbook does not install the local supplemental UI')
}
if (!footer.includes('execute-command.js')) {
  throw new Error('Showroom footer does not load the Execute control')
}
for (const marker of [
  '.listingblock.execute',
  'Execute',
  '/terminal',
  "type: 'execute'",
  'event.origin !== window.location.origin',
]) {
  if (!executeUi.includes(marker)) {
    throw new Error(`Execute control is missing contract marker: ${marker}`)
  }
}

process.stdout.write('Execute-to-terminal UI contract is complete\n')
