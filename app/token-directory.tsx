"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { evidenceLabel, searchTokens, type StockToken } from "../src/lib/token-registry";

export function TokenDirectory({ tokens }: { tokens: StockToken[] }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchTokens(tokens, query), [tokens, query]);

  return (
    <section className="directory" aria-labelledby="directory-heading">
      <div className="directory-heading">
        <div>
          <p className="eyebrow">Snapshot directory</p>
          <h2 id="directory-heading">Search {tokens.length} observed contracts</h2>
        </div>
        <p className="result-count">{results.length} matching</p>
      </div>
      <label className="search-label" htmlFor="token-search">
        Search ticker, company, or full contract address
      </label>
      <input
        id="token-search"
        className="search"
        type="search"
        placeholder="Try TSLA, Tesla, or 0x322f…"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Contract</th>
              <th>Registry evidence</th>
            </tr>
          </thead>
          <tbody>
            {results.map((token) => (
              <tr key={token.contractAddress}>
                <td>
                  <Link href={`/token/${token.contractAddress}`} className="token-link">
                    <strong>{token.ticker}</strong>
                    <span>{token.name}</span>
                  </Link>
                </td>
                <td>
                  <code>{token.contractAddress.slice(0, 10)}…{token.contractAddress.slice(-6)}</code>
                </td>
                <td>
                  <span className={token.registryStatus === "First-party registry" ? "status status-evidence" : "status"}>
                    {evidenceLabel(token.registryStatus)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="table-note">
        Records are derived from Robinhood’s first-party asset registry snapshot. The raw JSON, retrieval timestamp, and SHA-256 are committed under <code>data/source-snapshots/</code>.
      </p>
    </section>
  );
}
