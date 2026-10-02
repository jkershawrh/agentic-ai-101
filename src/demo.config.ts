import type { DemoConfig } from './types'

const technicalTopology = {
  boundary: { label: 'Governed workflow boundary', detail: 'the agent can propose; policy controls authority' },
  entry: { id: 'request', kind: 'operator', label: 'User request', detail: 'intent plus requested action' },
  primaryPath: [
    { id: 'orchestrator', kind: 'service', label: 'Agent orchestrator', detail: 'plans the next bounded step', endpoint: 'POST /api/v1/workflows/run', edgeLabel: 'classify' },
    { id: 'model', kind: 'model', label: 'Advisory model', detail: 'proposes a plan or explanation', edgeLabel: 'propose' },
    { id: 'tool', kind: 'tool', label: 'Approved tool', detail: 'reads evidence or requests a controlled action', edgeLabel: 'invoke' },
    { id: 'trace', kind: 'data', label: 'Evidence trace', detail: 'records inputs, sources, decisions, and outcome', edgeLabel: 'record' },
  ],
  supportPath: [
    { id: 'evidence', kind: 'data', label: 'Returned evidence', detail: 'source-labeled facts, not model memory', edgeLabel: 'ground' },
    { id: 'policy', kind: 'policy', label: 'Deterministic policy', detail: 'permits, denies, or escalates', edgeLabel: 'decide' },
    { id: 'human', kind: 'authority', label: 'Human authority', detail: 'owns consequential action', edgeLabel: 'approve' },
  ],
}

export const demoConfig: DemoConfig = {
  id: 'agentic-ai-101',
  title: 'Understand Agentic Workflows',
  subtitle: 'Trace how an agent plans, uses tools, proves evidence, and stays inside its authority',
  event: 'Agentic AI learning path · 101',
  audience: 'Technical sellers, solution architects, developers, and platform practitioners',
  cta: 'Follow one request from intent to accountable outcome.',
  brand: {
    primary: { name: 'Red Hat', logo: '/logos/redhat.svg', alt: 'Red Hat' },
    partner: { name: 'Intel', logo: '/logos/intel.png', alt: 'Intel' },
    attribution: 'Red Hat × Intel',
  },
  acts: [
    { id: 'stakes', label: '00', title: 'Why Agentic', scenes: [
      { id: 'intro', type: 'intro', beat: 'stakes', title: 'A model can propose. It cannot grant permission.', subtitle: 'Agentic systems become useful when tools, evidence, policy, and human authority are visible.', speakerPrompt: 'Open with the boundary: this is not a chatbot tour. Trace how useful work happens without hiding who is allowed to act.' },
      { id: 'reframe', type: 'reframe', beat: 'reframe', eyebrow: 'The shift', title: 'Move from an answer to an accountable workflow', before: 'Prompt → generated answer', after: 'Ask → Plan → Use → Prove → Decide → Record', detail: 'An agentic workflow coordinates bounded steps. The model proposes; tools obtain evidence; deterministic policy and people control action.', speakerPrompt: 'Contrast generation with agency. A long prompt or tool call alone does not create a governed agentic system.' },
    ] },
    { id: 'architecture', label: '01', title: 'Trace the Workflow', scenes: [
      { id: 'guided-architecture', type: 'guided-architecture', beat: 'system-reveal', eyebrow: 'One request · six responsibilities', title: 'Every step has a job—and a boundary', body: 'Reveal the workflow in the same order the learner will inspect it.', layers: [
        { id: 'ask', component: 'Ask', tone: 'primary', question: 'What does the user want?', answer: 'A bounded request names the desired outcome and action.', detail: 'Intent must be explicit before planning begins.', activeNodeIds: ['request'] },
        { id: 'plan', component: 'Plan', tone: 'primary', question: 'What should happen next?', answer: 'The orchestrator asks an advisory model for a proposed sequence.', detail: 'A proposal is not permission.', activeNodeIds: ['request', 'orchestrator', 'model'] },
        { id: 'use', component: 'Use', tone: 'partner', question: 'What can the workflow touch?', answer: 'Only approved tools with declared read or change scope.', detail: 'Tool boundaries are more important than model confidence.', activeNodeIds: ['orchestrator', 'tool'] },
        { id: 'prove', component: 'Prove', tone: 'success', question: 'What supports the conclusion?', answer: 'Returned evidence keeps its source and becomes part of the trace.', detail: 'Evidence comes from tools and systems of record—not from the model claiming it knows.', activeNodeIds: ['tool', 'evidence', 'trace'] },
        { id: 'decide', component: 'Decide', tone: 'primary', question: 'Who may authorize the outcome?', answer: 'Deterministic policy permits explanation, denies mutation, or escalates to a person.', detail: 'The authority boundary remains inspectable.', activeNodeIds: ['evidence', 'policy', 'human'] },
        { id: 'record', component: 'Record', tone: 'success', question: 'Can another operator reconstruct what happened?', answer: 'The trace records request class, evidence, policy result, authority, and outcome.', detail: 'Accountability survives after the response disappears.', activeNodeIds: ['trace', 'policy', 'human'] },
      ], technicalTopology, speakerPrompt: 'Invite the learner to predict each next component. Reinforce that model, tool, policy, and authority are separate responsibilities.' },
    ] },
    { id: 'journey', label: '02', title: 'Change the Request', scenes: [
      { id: 'live', type: 'live-journey', beat: 'live-proof', eyebrow: 'Deterministic rehearsal · source labeled', title: 'Same workflow. Different authority.', body: 'Run a read-only investigation, then request a state-changing action. Compare the recorded decision rather than trusting the prose.', cta: 'Run both workflow traces', prompt: { label: 'LEARNER QUESTION', title: 'What changes when a request moves from reading to acting?', detail: 'Predict the tool class, policy result, and authority owner before each run.' }, context: { label: 'PROOF RULE', title: 'Behavior is deterministic; the source remains visible', body: 'This first experience uses reviewed rehearsal fixtures so every learner can inspect the same authority boundary.', footnote: 'It does not claim live model inference, Intel placement, performance, or production action.' }, nodes: [
        { id: 'ask', label: 'Ask', detail: 'classify intent', tone: 'primary' },
        { id: 'plan', label: 'Plan', detail: 'propose steps', tone: 'primary' },
        { id: 'use', label: 'Use', detail: 'invoke bounded tool', tone: 'partner' },
        { id: 'prove', label: 'Prove', detail: 'attach evidence', tone: 'success' },
        { id: 'decide', label: 'Decide', detail: 'apply policy', tone: 'primary' },
        { id: 'record', label: 'Record', detail: 'retain trace', tone: 'success' },
      ], technicalTopology, steps: [
        { id: 'readonly', title: 'Investigate service status', detail: 'A read-only request may collect approved evidence and return a grounded explanation.', adapterId: 'workflow-readonly', activeNode: 4, activeNodeIds: ['request', 'orchestrator', 'model', 'tool', 'evidence', 'policy', 'trace'], resultFields: [
          { key: 'requestClass', label: 'Request class' }, { key: 'toolClass', label: 'Tool boundary' }, { key: 'policyDecision', label: 'Policy decision' }, { key: 'humanAuthority', label: 'Authority owner' }, { key: 'outcome', label: 'Outcome' },
        ] },
        { id: 'state-change', title: 'Request a service restart', detail: 'A state-changing request reaches the same policy boundary but cannot mutate the target without human approval.', adapterId: 'workflow-action', activeNode: 5, activeNodeIds: ['request', 'orchestrator', 'model', 'tool', 'evidence', 'policy', 'human', 'trace'], resultFields: [
          { key: 'requestClass', label: 'Request class' }, { key: 'toolClass', label: 'Tool boundary' }, { key: 'policyDecision', label: 'Policy decision' }, { key: 'humanAuthority', label: 'Authority owner' }, { key: 'targetMutated', label: 'Target changed' },
        ] },
      ], speakerPrompt: 'Say REHEARSAL before interpreting the result. Compare tool class, policy decision, authority owner, and mutation state.' },
    ] },
    { id: 'classify', label: '03', title: 'Know the Difference', scenes: [
      { id: 'classification', type: 'comparison', beat: 'trials', eyebrow: 'Classification', title: 'Not every AI interaction is the same kind of system', columns: [
        { label: 'Generation', value: 'Answer', detail: 'Produces content from a prompt. No external action is implied.' },
        { label: 'Agentic investigation', value: 'Evidence', detail: 'Plans steps and uses read-only tools to ground a conclusion.', tone: 'partner' },
        { label: 'Governed action', value: 'Authority', detail: 'Requests a change only through explicit policy and human approval.', tone: 'success' },
      ], speakerPrompt: 'Have the learner classify a familiar use case. Ask what tool boundary and authority would be required before calling it agentic.' },
    ] },
    { id: 'mechanisms', label: '04', title: 'Why It Is Governable', scenes: [
      { id: 'mechanisms', type: 'mechanisms', beat: 'trials', eyebrow: 'Mechanisms', title: 'Useful agency comes from separation of responsibility', body: 'The model is one participant in the workflow—not the policy engine, evidence source, or final authority.', mechanisms: [
        { id: 'tools', label: 'Bounded tools', claim: 'Declare what can be read or changed.', detail: 'A tool contract constrains reach even when a proposal is wrong.', tone: 'partner' },
        { id: 'evidence', label: 'Source-labeled evidence', claim: 'Separate observed facts from generated explanation.', detail: 'The trace identifies where every supporting fact came from.', tone: 'success' },
        { id: 'authority', label: 'Deterministic authority', claim: 'Policy decides what is permitted.', detail: 'Consequential change fails closed or waits for a person; the model never promotes itself.', tone: 'primary' },
      ], speakerPrompt: 'Tie each mechanism back to the two traces. Ask what would fail if that responsibility were delegated to the model.' },
    ] },
    { id: 'payoff', label: '05', title: 'Prove Understanding', scenes: [
      { id: 'payoff', type: 'evidence-payoff', beat: 'transformation', eyebrow: 'Checkpoint', title: 'Read the trace—not the confidence of the answer', adapterIds: ['workflow-readonly', 'workflow-action'], fallbackLine: 'Run both workflow traces to populate this checkpoint.', evidenceFields: [
        { key: 'sourceState', label: 'Evidence source' }, { key: 'requestClass', label: 'Latest request class' }, { key: 'policyDecision', label: 'Policy result' }, { key: 'targetMutated', label: 'Target changed' },
      ], line1: 'You separated model proposal, tool evidence, policy, and authority.', line2: 'Understanding earns the right to build: continue to Agentic AI 201 on Intel Xeon 6.', cta: 'Change one input, predict the decision, verify the trace, then continue to Agentic AI 201 →', speakerPrompt: 'Use only fields returned during this session. If both traces were not run, return to the journey instead of claiming completion.' },
    ] },
  ],
  journeyHandoffs: [
    { depth: 'lab', title: 'Agentic AI 201 · Build', duration: '45–60 minutes', question: 'Can the learner turn the traced pattern into a working bounded agent?', technology: 'Red Hat OpenShift · Intel Xeon 6 · governed tools', instruction: 'Carry the Ask–Plan–Use–Prove–Decide–Record pattern into the first build lab.', href: '/catalog/agentic-ai-201' },
  ],
}
