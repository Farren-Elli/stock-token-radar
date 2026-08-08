# Stock Token Radar — Domain Context

## Purpose

Stock Token Radar is an educational, source-backed directory and monitoring interface for tokenized stock instruments on Robinhood Chain (chain ID `4663`). It helps a user answer: **what is this contract, what evidence supports its identity, and what can we observe on-chain?**

## Core vocabulary

| Term | Meaning | Do not call it |
|---|---|---|
| **Instrument** | A tokenized product associated with an underlying publicly traded stock or ETF. | The underlying share itself. |
| **Underlying** | The public stock or ETF to which an instrument is linked economically. | Collateral proven by a token symbol alone. |
| **Contract** | An on-chain smart-contract address on Robinhood Chain. | Official merely because it uses a familiar ticker. |
| **Registry-listed** | Present in an explorer or registry dataset. | Issuer-verified. |
| **Officially-listed** | Confirmed by a first-party Robinhood source with a reproducible mapping to the contract. | Legally authorized in every jurisdiction. |
| **Verification evidence** | Dated primary-source proof linking a contract to an instrument. | A logo, ticker, social post, or token name. |
| **Snapshot** | An immutable copy of source data captured at a specific time. | Live truth. |

## Product facts to preserve

- Robinhood's public Stock Tokens page describes Stock Tokens as tokenized debt securities issued by Robinhood Assets (Jersey) Limited.
- The page says holders receive economic exposure; it says holders do not receive legal or beneficial rights in or against the issuer of the underlying security.
- The first explorer-derived snapshot is retained for comparison only. The application directory uses the dated first-party Robinhood asset-registry snapshot.
- Availability and transferability can depend on jurisdiction and product terms. Never make a global availability claim.

## Trust hierarchy

1. First-party legal/product documentation and official contract registries.
2. Direct chain data from the specified contract and chain.
3. Reputable third-party explorers or data providers, clearly attributed.
4. Community reports only as leads, never final verification evidence.
