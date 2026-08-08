# First-party Robinhood Chain Stock-Token Contract Registry

**Research question:** Does Robinhood provide a first-party, machine-readable mapping from a Robinhood Chain Stock Token instrument/ticker to its on-chain contract address?

**Conclusion:** **Yes.** Robinhood publishes a public, unauthenticated JSON registry at [`https://api.robinhood.com/rhj/assets`](https://api.robinhood.com/rhj/assets). Its `assets[]` records contain `tokenSymbol`, `tokenName`, `id`, status/multiplier metadata, and `deployments[]`; each deployment includes `chainId` and `contractAddress`. Robinhood's own developer documentation identifies this endpoint as the Stock Token asset-metadata endpoint and states that deployments are per-chain. The companion first-party contract page also says its Stock Token table is generated live from the on-chain asset registry and that the addresses there identify canonical Robinhood Stock Tokens.

This is direct first-party registry evidence. No Robinscan data or explorer status label was used to establish the conclusion.

## Retrieval record

| Item | Value |
|---|---|
| Retrieval date/time | 2026-08-08 20:12:58 BST (UTC+01:00) |
| Registry URL | <https://api.robinhood.com/rhj/assets> |
| Retrieval method | Unauthenticated `GET` with `Accept: application/json` |
| HTTP result | `200 OK`; `Content-Type: application/json` |
| Response size | 75,196 bytes |
| Response SHA-256 | `c5a34065a65f3c596f963ffb3ed8b777b8964567a88e451cd78cc51fcf6b7589` |
| Top-level shape observed | JSON object with `assets` array |
| Asset records observed | 96 |
| Robinhood Chain deployment observed | `chainId: 4663`, `networkName: "Robinhood Chain"` |

The endpoint is live and documented as cached; the count, status, and rows are observations at this retrieval time, not a permanent issuance list.

## Verified direct evidence

### 1. First-party documentation specifies the JSON mapping schema

**Source:** [Robinhood Chain documentation — Stock Token APIs](https://docs.robinhood.com/chain/stock-token-apis/)
**Retrieved:** 2026-08-08

The Robinhood-controlled documentation states that Robinhood provides read-only REST endpoints under `https://api.robinhood.com/rhj/` for Stock Token data. For `GET https://api.robinhood.com/rhj/assets`, it documents:

- `tokenSymbol` — token symbol (example: `AAPL`);
- `tokenName` — display name;
- `id` — on-chain `uid()` identifier;
- `deployments[]` — one entry per chain;
- `deployments[].contractAddress` — EIP-55-checksummed address; and
- `deployments[].chainId` — EIP-155 chain ID.

The documentation's example itself links a symbol to a deployment address. It also documents `GET https://api.robinhood.com/rhj/prices/{symbol}`, whose quote records repeat `tokenSymbol` and `deployments[]`.

### 2. The live first-party API returned the mapping in the documented shape

**Source:** <https://api.robinhood.com/rhj/assets>
**Retrieved:** 2026-08-08 20:12:58 BST

The live response contained 96 `assets` records and 96 deployments. A JSON validation of the retrieved response found no missing `id`, `tokenSymbol`, `tokenName`, `deployments`, `status`, `deployments[].chainId`, or `deployments[].contractAddress` fields; all deployments used chain ID `4663`; all 96 contract values had `0x` + 40-hex-character form; and no `tokenSymbol` was duplicated. For example, the record selected by `tokenSymbol == "AAPL"` was unique in the response and contained:

```json
{
  "tokenSymbol": "AAPL",
  "tokenName": "Apple • Robinhood Token",
  "id": "0x00000000000000000000000000000000c2425be3658540dd8e2424cbf3c5c649",
  "deployments": [
    {
      "chainId": 4663,
      "contractAddress": "0xaF3D76f1834A1d425780943C99Ea8A608f8a93f9",
      "networkName": "Robinhood Chain"
    }
  ],
  "status": "ASSET_STATUS_ACTIVE"
}
```

This verifies a machine-readable first-party mapping for the AAPL Stock Token at the time retrieved:

| Token symbol | Token name | Chain ID | Contract address |
|---|---|---:|---|
| `AAPL` | Apple • Robinhood Token | 4663 | `0xaF3D76f1834A1d425780943C99Ea8A608f8a93f9` |

A second direct API check corroborated the same mapping for AAPL:

**Source:** <https://api.robinhood.com/rhj/prices/AAPL>
**Retrieved:** 2026-08-08 20:12:58 BST
**HTTP result:** `200 OK`; response SHA-256 `9360b57f04937b476acd0f437fbe9db22b8707d90258d20c4dd1a276037a6da3`

Its `quotes[0]` record had `tokenSymbol: "AAPL"` and deployment `{ "chainId": 4663, "contractAddress": "0xaF3D76f1834A1d425780943C99Ea8A608f8a93f9" }`.

### 3. Robinhood labels its contract registry canonical

**Source:** [Robinhood Chain documentation — Token Contracts](https://docs.robinhood.com/chain/contracts/)
**Retrieved:** 2026-08-08

The page says:

> “Use the addresses on this page to identify the canonical Robinhood Stock Token for each underlying — a token with a matching name/ticker but a different contract address is not a Robinhood Stock Token.”

It further says the Stock Tokens & Tokenized ETFs table is “generated live from the on-chain asset registry.” This is explicit first-party language supporting use of the registry mapping to distinguish canonical Robinhood tokens from lookalikes. At retrieval, the rendered static HTML displayed `Loading tokens…`; the contract rows were therefore not relied on as a static scrape. The `/rhj/assets` JSON endpoint above is the directly retrievable machine-readable registry.

### 4. Product scope and issuer identity are separately stated by Robinhood

**Source:** [Robinhood Stock Tokens product page](https://robinhood.com/rhj/stocktokens/?lang=en)
**Retrieved:** 2026-08-08

The product page identifies the product as Robinhood Stock Tokens and describes them as tokenized debt securities issued by Robinhood Assets (Jersey) Limited. This supports that the API/docs concern the intended Robinhood Stock Token product; it is not the evidence for an individual address mapping.

## Recommended evidence-model treatment

- Treat each row from `https://api.robinhood.com/rhj/assets` whose deployment has `chainId == 4663` as **first-party mapping evidence** for `tokenSymbol`/`tokenName` → `contractAddress` at its retrieval timestamp.
- Preserve a raw response snapshot and SHA-256 when ingesting, because the endpoint is live and can change.
- Keep both the asset `id` and deployment `chainId`; the docs say `id` is stable across chains, while deployments are chain-specific.
- Do not infer a mapping from a token's ERC-20 symbol/name, a logo, or an explorer label. Use the documented API record and chain ID.
- Use `status` as reported metadata, not as a substitute for preserving the dated registry response.

## What remains unverified / out of scope for this retrieval

1. **Complete historical registry:** The 96-record count is only the live response observed on 2026-08-08. This research did not establish when each token was added, removed, activated, or deprecated.
2. **All current rows independently enumerated in this note:** The endpoint supplies the complete response, but this note records one reproducible AAPL example rather than reproducing all 96 mappings. An ingestion job must snapshot and parse the full JSON response.
3. **On-chain bytecode and ERC-20 metadata:** This research did not call Robinhood Chain RPC to confirm deployed bytecode, `symbol()`, `name()`, `uid()`, or `uiMultiplier()` for the listed contracts. The API is first-party registry evidence, while direct-chain checks are a separate evidence layer.
4. **Legal status, availability, and investor eligibility:** A canonical mapping does not by itself establish that a token is legally available in a jurisdiction, transferable in every context, currently tradeable, or suitable for an investor.
5. **Cryptographic provenance or signed registry:** The public API response was not observed to include a detached signature, signed manifest, or versioned historical feed. Its first-party status here rests on Robinhood's `api.robinhood.com` endpoint plus Robinhood documentation explicitly naming that endpoint and schema.
6. **Relation to third-party explorer records:** No Robinscan row, label, count, or address was used to prove this mapping. Any overlap with an explorer must be separately compared against this dated first-party source.

## Source list

1. Robinhood API, asset registry: <https://api.robinhood.com/rhj/assets>
2. Robinhood API, AAPL quote/deployment cross-check: <https://api.robinhood.com/rhj/prices/AAPL>
3. Robinhood Chain documentation, API schema: <https://docs.robinhood.com/chain/stock-token-apis/>
4. Robinhood Chain documentation, canonical Token Contracts registry: <https://docs.robinhood.com/chain/contracts/>
5. Robinhood Stock Tokens product page: <https://robinhood.com/rhj/stocktokens/?lang=en>
