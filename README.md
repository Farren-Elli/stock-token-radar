# Stock Token Radar

A public, source-backed dashboard for researching tokenized stock instruments on Robinhood Chain.

> **Status:** Foundation established; application implementation has not started.

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
- `.scratch/` — local Markdown issue tracker (created when work tickets are needed).
- `.agents/skills/` — project-local Matt Pocock engineering skills installed for Codex-compatible agents.

## Source snapshot

The first snapshot was collected on 2026-08-08 from the public Robinscan stock registry. It has 203 records, of which 25 were labelled `Official` by the explorer UI. Robinhood's own public Stock Tokens page advertised `90+` tokens at collection time. These counts differ, so the explorer label is **not sufficient on its own** to make an official-status claim.

## Current setup

No application runtime has been chosen yet. The next milestone is an evidence-based architecture decision and a small local prototype—not deployment.
