"use client";

import type { StockToken } from "../src/lib/token-registry";
import { evidenceLabel } from "../src/lib/token-registry";
import { REGISTRY_SNAPSHOT } from "../src/lib/research-tools";
import { CopyContractButton } from "./copy-contract-button";
import { useWatchlist, WatchlistButton } from "./watchlist";

export function VerificationLedger({ token }: { token: StockToken }) {
  const watchlist = useWatchlist();
  const watched = watchlist.isWatched(token.contractAddress);

  return (
    <section className="verification-ledger" aria-labelledby="ledger-heading">
      <div className="ledger-heading-row">
        <div><p className="eyebrow">Verification ledger</p><h2 id="ledger-heading">Source-backed identity record</h2></div>
        <div className="ledger-controls"><span className="canonical-pill"><i />Canonical mapping observed</span><WatchlistButton address={token.contractAddress} isWatched={watched} onToggle={watchlist.toggle} /></div>
      </div>
      <dl className="ledger-grid">
        <div className="ledger-wide"><dt>Complete contract address</dt><dd className="detail-contract"><code>{token.contractAddress}</code><CopyContractButton address={token.contractAddress} /></dd></div>
        <div><dt>Instrument</dt><dd>{token.ticker} · {token.name}</dd></div>
        <div><dt>Network</dt><dd>{REGISTRY_SNAPSHOT.chainName} · chain ID {REGISTRY_SNAPSHOT.chainId}</dd></div>
        <div><dt>Evidence classification</dt><dd>{evidenceLabel(token.registryStatus)}</dd></div>
        <div><dt>Observed at</dt><dd><time dateTime={REGISTRY_SNAPSHOT.retrievedAt}>{REGISTRY_SNAPSHOT.retrievedLabel}</time></dd></div>
        <div className="ledger-wide"><dt>Verification method</dt><dd>Matched <code>{token.ticker}</code> to <code>deployments[].contractAddress</code> where <code>chainId == {REGISTRY_SNAPSHOT.chainId}</code> in Robinhood’s first-party asset-registry response.</dd></div>
        <div className="ledger-wide"><dt>Snapshot SHA-256</dt><dd className="hash-value"><code>{REGISTRY_SNAPSHOT.responseSha256}</code><CopyContractButton address={REGISTRY_SNAPSHOT.responseSha256} label="snapshot SHA-256" /></dd></div>
      </dl>
      <div className="ledger-source-row">
        <a href={REGISTRY_SNAPSHOT.sourceUrl} target="_blank" rel="noreferrer">Live registry endpoint ↗</a>
        <a href={REGISTRY_SNAPSHOT.contractDocsUrl} target="_blank" rel="noreferrer">Canonical contract documentation ↗</a>
        <a href={REGISTRY_SNAPSHOT.snapshotRepoUrl} target="_blank" rel="noreferrer">Immutable captured JSON ↗</a>
        <a href={REGISTRY_SNAPSHOT.researchNoteUrl} target="_blank" rel="noreferrer">Verification research note ↗</a>
      </div>
      <p className="ledger-caveat">This ledger verifies the first-party ticker-to-contract mapping observed at the stated time. It does not verify ownership of an underlying share, investment safety, price accuracy, liquidity, or legal suitability.</p>
    </section>
  );
}
