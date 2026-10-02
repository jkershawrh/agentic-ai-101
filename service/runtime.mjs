const traces = Object.freeze({
  'read-only': Object.freeze({
    sourceState: 'REHEARSAL',
    requestClass: 'read-only investigation',
    modelRole: 'scripted advisory proposal',
    toolClass: 'approved read-only status tool',
    evidenceSummary: 'Service state returned by the deterministic rehearsal',
    policyDecision: 'explanation permitted',
    humanAuthority: 'operator reviews conclusion',
    targetMutated: false,
    outcome: 'grounded explanation returned',
    traceId: 'rehearsal-readonly-v1',
  }),
  'state-change': Object.freeze({
    sourceState: 'REHEARSAL',
    requestClass: 'state-changing action',
    modelRole: 'scripted advisory proposal',
    toolClass: 'controlled change request',
    evidenceSummary: 'Action intent recorded; no mutation attempted',
    policyDecision: 'deny and escalate',
    humanAuthority: 'explicit operator approval required',
    targetMutated: false,
    outcome: 'change withheld and escalation recorded',
    traceId: 'rehearsal-action-v1',
  }),
})

export function evaluateWorkflow(request) {
  const scenario = request && typeof request === 'object' ? request.scenario : undefined
  const trace = traces[scenario]
  if (!trace) throw new TypeError('Unsupported scenario')
  return { ...trace }
}

