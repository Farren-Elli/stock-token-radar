# Issue tracker: Local Markdown

Issues and specifications live in `.scratch/` until this repository has a GitHub remote and the owner explicitly migrates to GitHub Issues.

## Conventions

- One feature per directory: `.scratch/<feature-slug>/`.
- Feature spec: `.scratch/<feature-slug>/spec.md`.
- Implementation tickets: `.scratch/<feature-slug>/issues/<NN>-<slug>.md`, numbered from `01`.
- Each ticket states `Status:`, `Blocked by:`, acceptance criteria, and verification commands.
- Append decisions or review notes under `## Comments` rather than losing prior reasoning.

When a workflow says to publish to the issue tracker, create the appropriate Markdown file. When it says to fetch a ticket, read the referenced file.
