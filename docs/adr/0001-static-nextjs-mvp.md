# ADR 0001: Use a static-data Next.js application for the first public MVP

**Status:** Accepted — 2026-08-08

## Context

The first release needs a searchable directory and token profile pages backed by a dated, immutable source snapshot. It does not need authentication, user state, a database, wallets, trading, or live chain indexing.

## Decision

Use Next.js 16 with TypeScript and a static CSV snapshot stored in the repository. The app parses the snapshot on the server at build/request time and performs directory search in the browser.

## Consequences

- The MVP can run locally and deploy as a simple web application without service credentials.
- Every displayed record has a reproducible source artifact in Git.
- Snapshot refreshes are deliberate, reviewable commits.
- Live on-chain data, a database, and scheduled ingestion are explicitly deferred until the static directory has user value and first-party verification evidence is available.
