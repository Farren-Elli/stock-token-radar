"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CopyContractButton } from "./copy-contract-button";
import { evidenceLabel, evidenceSourceUrl, searchTokens, type StockToken } from "../src/lib/token-registry";

export function TokenDirectory({ tokens }: { tokens: StockToken[] }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchTokens(tokens, query), [tokens, query]);

  return (
    <section id="directory" className="directory" aria-labelledby="directory-heading">
      <div className="directory-heading">
        <div>
          <p className="eyebrow">Canonical mapping index</p>
          <h2 id="directory-heading">Search the evidence trail.</h2>
        </div>
        <p className="result-count"><strong>{results.length}</strong> of {tokens.length} records</p>
      </div>
      <label className="search-label" htmlFor="token-search">
        Search ticker, company, or contract address
      </label>
      <div className="search-shell">
        <span aria-hidden="true">⌕</span>
        <input
          id="token-search"
          className="search"
          type="search"
          placeholder="TSLA · Tesla · 0x322f…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <kbd>⌘ K</kbd>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Contract address</th>
              <th>Registry evidence</th>
            </tr>
          </thead>
          <tbody>
            {results.map((token) => {
              const sourceUrl = evidenceSourceUrl(token.registryStatus);

              return (
                <tr key={token.contractAddress}>
                  <td>
                    <Link href={`/token/${token.contractAddress}`} className="token-link">
                      <strong>{token.ticker}</strong>
                      <span>{token.name}</span>
                    </Link>
                  </td>
                  <td>
                    <div className="contract-cell">
                      <code>{token.contractAddress.slice(0, 10)}…{token.contractAddress.slice(-6)}</code>
                      <CopyContractButton address={token.contractAddress} />
                    </div>
                  </td>
                  <td>
                    {sourceUrl ? (
                      <a className="evidence-link" href={sourceUrl} target="_blank" rel="noreferrer">
                        {evidenceLabel(token.registryStatus)} <span aria-hidden="true">↗</span>
                      </a>
                    ) : (
                      <span className="status">{evidenceLabel(token.registryStatus)}</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="table-note">
        Each copy control preserves the complete contract address. Canonical mapping links point to Robinhood’s token-contract documentation; the raw source JSON, retrieval timestamp, and SHA-256 are committed under <code>data/source-snapshots/</code>.
      </p>
    </section>
  );
}
