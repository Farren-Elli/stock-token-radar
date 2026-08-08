# Stock Token Radar — MVP Product Specification

## Problem

Tokenized-stock contracts are new, difficult to verify, and easy to confuse with either the underlying equity or ticker impersonations. Users need a trustworthy way to inspect contract identity and public on-chain information without being pushed to trade.

## Primary user

A crypto-native researcher who sees a ticker like `TSLA` or `AAPL` on Robinhood Chain and wants to determine the contract address, the provenance of the listing, and the limits of what the token represents.

## MVP outcome

A public web application where a visitor can search a locally sourced token directory, open a token profile, copy or visit the contract address, read the verification status and evidence, and understand the product/risk limitations.

## In scope

- Directory search by ticker, name, and address.
- Static source snapshot ingestion with explicit snapshot date and source URL.
- Token profile pages for directory entries.
- Source and verification-status display.
- Plain-language instrument/risk explainer and methodology page.
- Automated tests for parsing, search, status display, and core navigation.

## Out of scope

- Trading, wallet connection, signatures, deposits, borrowing, swaps, custody, or issuance.
- Price prediction, investment advice, portfolio recommendations, or yield claims.
- A token for this product.
- Live chain indexing until the static directory MVP is validated.
- User accounts, payments, or notifications.

## Acceptance criteria

1. A visitor can search `TSLA`, `Tesla`, or the known Tesla address and reach the same token profile.
2. Every displayed directory row exposes a source snapshot date and verification status.
3. The product never describes a contract as official without a stored evidence record.
4. The explainer states that the instrument is not equivalent to directly owning the underlying share.
5. The app builds, tests, and runs locally from documented commands.

## Open decisions

- Choose the smallest reliable web stack after a short prototype comparison.
- Identify a first-party machine-readable contract registry, if one exists.
- Define the evidence schema and status-transition rules before any live-data refresh.
