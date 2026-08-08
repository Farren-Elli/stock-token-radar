# Issue tracker: GitHub Issues

Issues and specifications for this project are tracked in the repository’s GitHub Issues:

<https://github.com/Farren-Elli/stock-token-radar/issues>

## Conventions

- Create a GitHub Issue before a substantial feature or architectural change.
- Issue titles should state the outcome, not the implementation mechanism.
- Include acceptance criteria, data/source requirements, and verification commands.
- Use `Closes #<number>` in a pull request or commit message when implementation completes an issue.
- Keep product decisions in `docs/decisions.md` and durable architecture choices in `docs/adr/`; an issue is not a substitute for either.

## Project guardrails

Issues must preserve the v1 product boundary: no custody, wallet connection, trade execution, token issuance, or investment advice unless the product specification and a new ADR explicitly approve it.
