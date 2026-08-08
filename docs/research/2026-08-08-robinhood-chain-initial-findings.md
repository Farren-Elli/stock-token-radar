# Initial Robinhood Chain Stock-Token Findings

**Collected:** 2026-08-08 19:44 BST

## Sources

1. Robinhood Stock Tokens: <https://robinhood.com/rhj/stocktokens/?lang=en>
2. Robinhood EU — About Classic Stock Tokens: <https://robinhood.com/eu/en/support/articles/about-stock-tokens/>
3. Robinscan stock registry: <https://robinscan.io/stocks>
4. Tesla token explorer page: <https://robinscan.io/token/0x322f0929c4625ed5bad873c95208d54e1c003b2d>

## Findings

- Robinhood's public Stock Tokens page advertised `90+` Stock Tokens.
- The page describes Stock Tokens as tokenized debt securities issued by Robinhood Assets (Jersey) Limited. It says they provide economic exposure but no legal or beneficial rights in or against the issuer of the underlying security.
- The Robinscan stock page identified chain ID `4663` and displayed 203 registry-listed contracts.
- The captured Robinscan table labelled 25 entries as `Official`, including AAPL, TSLA, NVDA, MSFT, AMZN, SPY, and QQQ.
- The count mismatch means the `Official` label in the snapshot must be treated as explorer-supplied evidence, not a final first-party verification claim.
- Robinhood EU's Classic Stock Tokens are a distinct product: its support page says they are derivatives tracked on a blockchain and cannot currently be sent to other wallets/platforms.

## Artifact

The raw extracted registry table is preserved at:

`data/source-snapshots/2026-08-08-robinscan-stock-registry.csv`

Its SHA-256 at collection was:

```text
7a6406c5b447572c5c1756787754642520c7667e7b149f6c5bbba2189f942b0e
```

## Next research question

Find and preserve a first-party, machine-readable mapping from Robinhood Stock Token ticker/instrument to Robinhood Chain contract address. Do not promote an explorer status label to `officially-listed` until this exists.
