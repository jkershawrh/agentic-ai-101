import assert from 'node:assert/strict'
import test from 'node:test'
import { createAppServer } from './server.mjs'

async function withServer(run) {
  const server = createAppServer()
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
  try {
    const address = server.address()
    await run(`http://127.0.0.1:${address.port}`)
  } finally {
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()))
  }
}

test('health endpoints distinguish liveness and readiness', async () => withServer(async (base) => {
  for (const path of ['/healthz', '/readyz']) {
    const response = await fetch(`${base}${path}`)
    assert.equal(response.status, 200)
    assert.deepEqual(await response.json(), { status: 'ok', sourceState: 'REHEARSAL' })
  }
}))

test('workflow endpoint returns the contract envelope', async () => withServer(async (base) => {
  const response = await fetch(`${base}/api/v1/workflows/run`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ scenario: 'read-only' }),
  })
  assert.equal(response.status, 200)
  assert.match(response.headers.get('content-type'), /^application\/json/)
  const body = await response.json()
  assert.equal(body.sourceState, 'REHEARSAL')
  assert.equal(body.policyDecision, 'explanation permitted')
  assert.equal(body.targetMutated, false)
}))

test('HTTP boundary rejects invalid input and unknown surface area', async () => withServer(async (base) => {
  const invalid = await fetch(`${base}/api/v1/workflows/run`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ scenario: 'do-anything' }),
  })
  assert.equal(invalid.status, 400)
  assert.deepEqual(await invalid.json(), { error: 'unsupported_scenario' })

  const missing = await fetch(`${base}/api/v1/not-real`)
  assert.equal(missing.status, 404)
  assert.deepEqual(await missing.json(), { error: 'not_found' })
}))

