# Project Handoff

**Last updated:** 2026-08-08

## Completed

- Created local Git workspace, then migrated it to `/Volumes/Farren/Projects/stock-token-radar`.
- Published the public GitHub repository: `https://github.com/Farren-Elli/stock-token-radar`.
- Installed 10 curated Matt Pocock engineering skills locally under `.agents/skills/` for Codex-compatible agents.
- Established project rules, domain vocabulary, product spec, research record, decision log, and GitHub Issue workflow.
- Preserved the initial Robinscan stock-registry snapshot in `data/source-snapshots/` for comparison only.
- Built the Next.js dashboard: searchable 96-contract first-party directory, token profile routes, source/evidence language, and no wallet/trading functionality.
- Redesigned the research UI with an original canvas-based signal field, compact verification-terminal visual system, responsive evidence index, and methodology section.
- Added copy controls for every contract address in the directory and token profiles.
- Linked every first-party canonical-mapping status to Robinhood’s token-contract documentation.
- Verified `npm test` (10 tests) and `npm run build`; fetched the local home and Apple profile routes successfully from the development server.

## Verified facts

- Robinhood Chain ID: `4663`.
- The app uses a 96-contract first-party asset-registry snapshot captured at 2026-08-08 20:12:58 BST; raw JSON SHA-256: `c5a34065a65f3c596f963ffb3ed8b777b8964567a88e451cd78cc51fcf6b7589`.
- The earlier 203-record Robinscan explorer snapshot is retained only for comparison.

## Next exact task

Choose a Next.js-capable hosting provider, deploy the production build from `main`, record the public HTTPS URL in the README, and verify the homepage plus an Apple profile page. After that, begin the reviewed first-party registry-refresh workflow described in GitHub Issue #1.

## Do not do yet

Do not add wallets, trading, user accounts, tokens, payment processing, or a live indexer.
