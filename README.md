# Stock Token Radar

A public, source-backed dashboard for researching tokenized stock instruments on Robinhood Chain.

> **Status:** The evidence-first research release is implemented and tested locally. Public deployment and the reviewed registry-refresh workflow are next.

## Product promise

Stock Token Radar helps users discover token contracts, understand verification status, and inspect public on-chain activity. It is deliberately **non-custodial** and **informational only**:

- no user wallets or signatures;
- no asset custody, swaps, deposits, or token issuance;
- no trade execution or investment recommendations;
- no claim that a token is the underlying share.

## Current capabilities

1. Searchable 96-instrument first-party mapping directory with complete-address copy controls.
2. Source-backed verification ledgers with method, timestamp, chain, canonical documentation, and snapshot SHA-256.
3. Side-by-side instrument comparison focused on identity evidence rather than market ranking.
4. A baseline snapshot-change tracker ready for the next comparable first-party snapshot.
5. Searchable primary-source and project-evidence links.
6. A five-step visual token-verification guide.
7. A browser-local research watchlist with no account, wallet, or server sync.
8. A restrained canvas-based signal field that respects reduced-motion preferences.

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

## Local setup

The app uses Next.js 16, React 19, TypeScript, and Vitest with a static, repository-backed data source.

```bash
npm install
npm run dev
npm test
npm run build
```

The next milestone is deployment from `main`, followed by a reviewed, reproducible registry-refresh workflow.
