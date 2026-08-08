"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { searchTokens, type StockToken } from "../src/lib/token-registry";

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
                  <span className={token.registryStatus ? "status status-evidence" : "status"}>
                    {token.registryStatus ? "Explorer-labelled official" : "Registry-listed; unverified"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="table-note">
        “Explorer-labelled official” reflects the third-party snapshot’s label only. It is not a first-party verification claim.
      </p>
    </section>
  );
}
