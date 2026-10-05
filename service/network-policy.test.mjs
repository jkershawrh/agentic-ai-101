import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

test('the Showroom terminal can reach the rehearsal API', async () => {
  const policy = await readFile(
    new URL('../deploy/openshift/base/network-policy.yaml', import.meta.url),
    'utf8',
  )
  assert.match(policy, /app\.kubernetes\.io\/name: showroom/)
  assert.doesNotMatch(policy, /^\s+app: showroom$/m)
})
