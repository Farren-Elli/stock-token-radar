"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { CopyContractButton } from "./copy-contract-button";
import { useWatchlist, WatchlistButton } from "./watchlist";
import { evidenceLabel, evidenceSourceUrl, searchTokens, type StockToken } from "../src/lib/token-registry";

export function TokenDirectory({ tokens }: { tokens: StockToken[] }) {
  const [query, setQuery] = useState("");
  const [watchlistOnly, setWatchlistOnly] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const watchlist = useWatchlist();
  const watchedTokens = useMemo(
    () => tokens.filter((token) => watchlist.isWatched(token.contractAddress)),
    [tokens, watchlist.addresses],
  );
  const results = useMemo(() => {
    const searched = searchTokens(tokens, query);
    return watchlistOnly ? searched.filter((token) => watchlist.isWatched(token.contractAddress)) : searched;
  }, [tokens, query, watchlistOnly, watchlist.addresses]);

  useEffect(() => {
    function focusSearch(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
      }
    }
    window.addEventListener("keydown", focusSearch);
    return () => window.removeEventListener("keydown", focusSearch);
  }, []);

  return (
    <section id="directory" className="directory" aria-labelledby="directory-heading">
      <div className="directory-heading">
        <div>
          <p className="eyebrow">Canonical mapping index</p>
          <h2 id="directory-heading">Search the evidence trail.</h2>
        </div>
        <p className="result-count"><strong>{results.length}</strong> of {tokens.length} records</p>
      </div>

      <div className="watchlist-panel" aria-label="Local research watchlist">
        <div><span aria-hidden="true">★</span><p><strong>Local research watchlist</strong><small>Stored only in this browser. No account, wallet, or server sync.</small></p></div>
        <div className="watchlist-tickers">
          {watchedTokens.length ? watchedTokens.map((token) => <Link key={token.contractAddress} href={`/token/${token.contractAddress}`}>{token.ticker}</Link>) : <span>Save instruments with the star control.</span>}
        </div>
        <button type="button" className={watchlistOnly ? "filter-button filter-button-active" : "filter-button"} aria-pressed={watchlistOnly} onClick={() => setWatchlistOnly((value) => !value)}>
          {watchlistOnly ? "Showing saved" : "Show saved only"}
        </button>
      </div>

      <label className="search-label" htmlFor="token-search">Search ticker, company, or contract address</label>
      <div className="search-shell">
        <span aria-hidden="true">⌕</span>
        <input ref={searchRef} id="token-search" className="search" type="search" placeholder="TSLA · Tesla · 0x322f…" value={query} onChange={(event) => setQuery(event.target.value)} />
        <kbd>⌘ K</kbd>
      </div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Instrument</th><th>Contract address</th><th>Registry evidence</th><th><span className="visually-hidden">Watchlist</span></th></tr></thead>
          <tbody>
            {results.map((token) => {
              const sourceUrl = evidenceSourceUrl(token.registryStatus);
              const watched = watchlist.isWatched(token.contractAddress);
              return (
                <tr key={token.contractAddress}>
                  <td><Link href={`/token/${token.contractAddress}`} className="token-link"><strong>{token.ticker}</strong><span>{token.name}</span></Link></td>
                  <td><div className="contract-cell"><code>{token.contractAddress.slice(0, 10)}…{token.contractAddress.slice(-6)}</code><CopyContractButton address={token.contractAddress} /></div></td>
                  <td>{sourceUrl ? <a className="evidence-link" href={sourceUrl} target="_blank" rel="noreferrer">{evidenceLabel(token.registryStatus)} <span aria-hidden="true">↗</span></a> : <span className="status">{evidenceLabel(token.registryStatus)}</span>}</td>
                  <td><WatchlistButton address={token.contractAddress} isWatched={watched} onToggle={watchlist.toggle} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {results.length === 0 ? <p className="empty-state">No instruments match the current search and watchlist filters.</p> : null}
      <p className="table-note">Each copy control preserves the complete contract address. Canonical mapping links point to Robinhood’s token-contract documentation; the raw source JSON, retrieval timestamp, and SHA-256 are committed under <code>data/source-snapshots/</code>.</p>
    </section>
  );
}