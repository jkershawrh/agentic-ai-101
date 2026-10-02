# Agentic AI 101 — Understand Agentic Workflows

Agentic AI 101 is the foundation of the Red Hat × Intel Agentic AI learning path. It teaches a learner to trace one request through six explicit responsibilities:

`Ask → Plan → Use → Prove → Decide → Record`

The experience distinguishes model proposal, bounded tools, source-labeled evidence, deterministic policy, and human authority. It is intentionally not another model-serving lab and does not duplicate Agentic AI 201.

## Current status

- Blueprint: reviewed
- Seven-scene presentation candidate: green
- Deterministic read-only and state-changing rehearsal traces: green
- Typed service and HTTP contract tests: 7 passing
- Component and behavior tests: 33 passing
- Visual checks: 9 passing across stage, laptop, and mobile
- Production build and offline asset verification: green
- Six-page Showroom journey, executable commands, content validation, and link validation: green
- Launchpad lifecycle: draft, not orderable

The current proof is labeled `REHEARSAL`. It makes no claim of live model inference, Intel hardware placement, performance, autonomous action, or production readiness.

## Remaining gates

1. Package the presentation, service, and Showroom content as immutable artifacts.
2. Produce SBOM, signature, provenance, and factory evidence.
3. Submit the Launchpad intake proposal without granting it promotion authority.
4. Run a one-seat Flightpath certification and prove complete reclaim with zero residue.
5. Promote only after Launchpad evidence and review pass.

## Learning-path handoff

Agentic AI 101 hands into **Agentic AI 201 — Build an AI Agent on Intel Xeon 6**. The learner carries the same six-part workflow into a working bounded agent.

## Sales-path handoff

The sales experiences remain a separate persona layer. They should route participants into this technical foundation without duplicating its runtime or inheriting its certification. See [Sales track handoff](docs/sales-track-handoff.md).

## Validation

```text
npm run check
npm run test:visual
```
