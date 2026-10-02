import assert from 'node:assert/strict'
import test from 'node:test'
import { evaluateWorkflow } from './runtime.mjs'

test('a read-only investigation returns source-labeled evidence without mutation', () => {
  const result = evaluateWorkflow({ scenario: 'read-only' })
  assert.equal(result.sourceState, 'REHEARSAL')
  assert.equal(result.requestClass, 'read-only investigation')
  assert.equal(result.toolClass, 'approved read-only status tool')
  assert.equal(result.policyDecision, 'explanation permitted')
  assert.equal(result.humanAuthority, 'operator reviews conclusion')
  assert.equal(result.targetMutated, false)
})

test('a state-changing request fails closed and preserves human authority', () => {
  const result = evaluateWorkflow({ scenario: 'state-change' })
  assert.equal(result.sourceState, 'REHEARSAL')
  assert.equal(result.requestClass, 'state-changing action')
  assert.equal(result.toolClass, 'controlled change request')
  assert.equal(result.policyDecision, 'deny and escalate')
  assert.equal(result.humanAuthority, 'explicit operator approval required')
  assert.equal(result.targetMutated, false)
})

test('unknown and malformed scenarios are rejected instead of guessed', () => {
  assert.throws(() => evaluateWorkflow({ scenario: 'restart-now' }), /Unsupported scenario/)
  assert.throws(() => evaluateWorkflow({}), /Unsupported scenario/)
  assert.throws(() => evaluateWorkflow(null), /Unsupported scenario/)
})

test('repeated evaluation is deterministic', () => {
  assert.deepEqual(evaluateWorkflow({ scenario: 'read-only' }), evaluateWorkflow({ scenario: 'read-only' }))
  assert.deepEqual(evaluateWorkflow({ scenario: 'state-change' }), evaluateWorkflow({ scenario: 'state-change' }))
})
