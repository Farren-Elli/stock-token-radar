# Stock Token Radar

A public, source-backed dashboard for researching tokenized stock instruments on Robinhood Chain.

> **Status:** Public GitHub repository and tested local MVP are available. Phase 2 is focused on deployment, data freshness, and product depth.

## Product promise

Stock Token Radar helps users discover token contracts, understand verification status, and inspect public on-chain activity. It is deliberately **non-custodial** and **informational only**:

- no user wallets or signatures;
- no asset custody, swaps, deposits, or token issuance;
- no trade execution or investment recommendations;
- no claim that a token is the underlying share.

## Initial MVP

1. Searchable token directory.
2. Token profile pages with contract address, registry status, source links, and retrieval date.
3. A prominent explanation of what a Robinhood Chain stock token is and is not.
4. A verification-status model: `officially-listed`, `registry-listed-unverified`, `unknown`, or `disputed`.
5. A transparent methodology and immutable source snapshots.

## Repository map

- `CONTEXT.md` — domain vocabulary and facts all contributors should use.
- `docs/product-spec.md` — MVP scope and acceptance criteria.
- `docs/decisions.md` — decision log.
- `docs/research/` — dated research findings and source links.
- `data/source-snapshots/` — immutable raw registry snapshots.
- `docs/agents/issue-tracker.md` — GitHub Issue workflow.
- `.agents/skills/` — project-local Matt Pocock engineering skills installed for Codex-compatible agents.

## Source snapshot

The first snapshot was collected on 2026-08-08 from a public Robinscan stock registry and is retained for comparison. The application directory uses Robinhood’s first-party asset registry snapshot captured on 2026-08-08: 96 Chain ID 4663 contract mappings. The raw JSON hash is `c5a34065a65f3c596f963ffb3ed8b777b8964567a88e451cd78cc51fcf6b7589`.

## Current setup

No application runtime has been chosen yet. The next milestone is an evidence-based architecture decision and a small local prototype—not deployment.
