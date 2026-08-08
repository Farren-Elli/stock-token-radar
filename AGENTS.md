# Stock Token Radar

## Mission
Build a public, educational, non-custodial dashboard for discovering and verifying tokenized stock instruments on Robinhood Chain. The product must not execute trades, custody assets, issue a token, or make financial recommendations.

## Non-negotiable product rules
- Treat contract verification as a source-backed claim, never an assumption.
- Clearly distinguish an underlying stock from a tokenized instrument that provides economic exposure.
- Show source, retrieval time, and verification method for registry data.
- Label unknown or unverified contracts conservatively; never call them official without evidence.
- Keep legal and risk copy factual and prominent. This product is informational, not financial, legal, or tax advice.
- Never add user wallets, signing, swaps, deposits, or user funds without an explicit new product decision and security review.

## Working agreement
- Read `README.md`, `CONTEXT.md`, relevant `docs/adr/`, and `docs/decisions.md` before changing product behavior.
- Use small, independently testable changes. Run the documented checks before declaring a task complete.
- Keep raw source snapshots immutable under `data/source-snapshots/`; derived data must record its source snapshot and timestamp.
- Add an ADR for decisions that would be expensive to reverse (runtime, data pipeline, database, authentication, deployment, or verification policy).
- Do not place secrets in the repository. Put local values only in `.env.local`.
- End each milestone by updating `docs/handoff.md` with completed work, tests run, decisions, and the next exact task.

## Agent skills

### Issue tracker
Issues and implementation briefs are tracked as local Markdown files under `.scratch/`. See `docs/agents/issue-tracker.md`.

### Domain docs
This is a single-context repository. See `docs/agents/domain.md`.

## Commands
Commands will be added to `README.md` as the application scaffold is created. Do not invent commands or claim a build passed without running it.
