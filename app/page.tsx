import { SignalCanvas } from "./signal-canvas";
import { TokenDirectory } from "./token-directory";
import { getSnapshotTokens } from "../src/lib/snapshot";

export default async function Home() {
  const tokens = await getSnapshotTokens();
  const canonicalMappingCount = tokens.filter((token) => token.registryStatus === "First-party registry").length;

  return (
    <main>
      <nav className="nav" aria-label="Primary navigation">
        <a className="brand" href="/">Stock Token Radar<span> / research terminal</span></a>
        <div className="nav-links"><a href="#directory">Directory</a><a href="#methodology">Method</a></div>
      </nav>

      <section className="hero" aria-labelledby="page-title">
        <SignalCanvas />
        <div className="hero-content">
          <div className="hero-status"><span className="status-dot" />First-party snapshot loaded · Chain ID 4663</div>
          <p className="eyebrow">A public verification terminal</p>
          <h1 id="page-title">The contract is<br /><em>the starting point.</em></h1>
          <p className="hero-copy">
            Inspect Robinhood Chain tokenized-stock mappings against a dated, reproducible first-party source. No wallet connection. No trading surface. No implied investment advice.
          </p>
          <a className="primary-action" href="#directory">Browse the registry <span aria-hidden="true">↓</span></a>
        </div>
        <div className="stats" aria-label="Snapshot statistics">
          <div><strong>{tokens.length}</strong><span>instruments mapped</span></div>
          <div><strong>{canonicalMappingCount}</strong><span>canonical mappings</span></div>
          <div><strong>08.08.26</strong><span>snapshot captured</span></div>
        </div>
      </section>

      <section className="proof-strip" aria-label="Verification principles">
        <p><span>01</span> First-party mapping</p>
        <p><span>02</span> Immutable source snapshot</p>
        <p><span>03</span> Contract-level inspection</p>
      </section>

      <TokenDirectory tokens={tokens} />

      <section id="methodology" className="methodology">
        <div className="method-intro"><p className="eyebrow">Methodology</p><h2>Evidence, not a trading interface.</h2></div>
        <div className="method-grid">
          <p>
            <strong>Economic exposure is not share ownership.</strong> Robinhood describes Stock Tokens as tokenized debt securities that provide economic exposure to underlying securities. Holders do not receive legal or beneficial rights in the issuer of the underlying security.
          </p>
          <p>
            <strong>Every mapping has a trail.</strong> This directory is derived from a 96-record first-party Robinhood asset-registry snapshot captured on 08 Aug 2026. The original JSON remains committed so the mapping can be reproduced and audited.
          </p>
        </div>
        <p className="sources">
          Primary sources: <a href="https://api.robinhood.com/rhj/assets" target="_blank" rel="noreferrer">asset registry ↗</a> <a href="https://docs.robinhood.com/chain/contracts/" target="_blank" rel="noreferrer">token contracts ↗</a> <a href="https://robinhood.com/rhj/stocktokens/?lang=en" target="_blank" rel="noreferrer">product terms ↗</a>
        </p>
      </section>
    </main>
  );
}
