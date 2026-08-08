# Decision Log

## 2026-08-08 — Start as a non-custodial research product

**Decision:** Version 1 will be an informational directory and verification dashboard. It will not connect wallets, move money, execute trades, issue a token, or provide investment advice.

**Why:** This creates useful transparency without asking users to take financial risk or relying on unclear tokenized-security distribution rules.

## 2026-08-08 — Treat explorer labels as leads, not proof

**Decision:** The initial Robinscan snapshot may display `Official` status, but Stock Token Radar will show this only as third-party registry evidence until it is corroborated by a first-party source.

**Why:** The initial snapshot has 203 records while Robinhood's own page advertised 90+ Stock Tokens. The discrepancy needs investigation.

## 2026-08-08 — Move implementation tracking to GitHub Issues

**Decision:** After publishing `Farren-Elli/stock-token-radar`, track substantial implementation work in GitHub Issues rather than local Markdown tickets.

**Why:** GitHub Issues provide a public, durable work queue that can be linked to commits and future pull requests.

## 2026-08-08 — Use a local Markdown issue tracker initially

**Decision:** Keep specs and tickets in `.scratch/` until the GitHub repository is created and connected.

**Why:** The workspace is local-only today. The project can make progress without creating an unnecessary remote account/repository dependency.
