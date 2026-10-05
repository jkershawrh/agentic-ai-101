import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const root = new URL('../showroom/supplemental-ui/', import.meta.url)

test('showroom preserves the Intel and Red Hat partnership header', async () => {
  const [header, metadata, styles, intelLogo] = await Promise.all([
    readFile(new URL('partials/header-content.hbs', root), 'utf8'),
    readFile(new URL('partials/head-meta.hbs', root), 'utf8'),
    readFile(new URL('css/site-extra.css', root), 'utf8'),
    readFile(new URL('img/intel-logo.svg', root), 'utf8'),
  ])

  assert.match(header, /alt="Intel"/)
  assert.match(header, /alt="Red Hat Demo Platform"/)
  assert.match(header, /\{\{site\.title\}\}/)
  assert.match(metadata, /site-extra\.css/)
  assert.match(styles, /launchpad-showroom-title/)
  assert.match(intelLogo, /<title[^>]*>Intel<\/title>/)
})
