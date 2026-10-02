import { createJsonAdapter, registerAdapter } from './adapters'

registerAdapter(createJsonAdapter({
  id: 'workflow-readonly',
  url: '/api/v1/workflows/run',
  method: 'POST',
  body: { scenario: 'read-only' },
  timeoutMs: 2_500,
  rehearsal: {
    data: {
      sourceState: 'REHEARSAL', requestClass: 'read-only investigation', modelRole: 'scripted advisory proposal',
      toolClass: 'approved read-only status tool', evidenceSummary: 'Service state returned by the rehearsal fixture',
      policyDecision: 'explanation permitted', humanAuthority: 'operator reviews conclusion', targetMutated: false,
      outcome: 'grounded explanation returned', traceId: 'rehearsal-readonly-v1',
    },
    collectedAt: '2026-10-02T00:00:00.000Z',
  },
}))

registerAdapter(createJsonAdapter({
  id: 'workflow-action',
  url: '/api/v1/workflows/run',
  method: 'POST',
  body: { scenario: 'state-change' },
  timeoutMs: 2_500,
  rehearsal: {
    data: {
      sourceState: 'REHEARSAL', requestClass: 'state-changing action', modelRole: 'scripted advisory proposal',
      toolClass: 'controlled change request', evidenceSummary: 'Action intent recorded; no mutation attempted',
      policyDecision: 'deny and escalate', humanAuthority: 'explicit operator approval required', targetMutated: false,
      outcome: 'change withheld and escalation recorded', traceId: 'rehearsal-action-v1',
    },
    collectedAt: '2026-10-02T00:00:00.000Z',
  },
}))
