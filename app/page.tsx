import { TokenDirectory } from "./token-directory";
import { getSnapshotTokens } from "../src/lib/snapshot";

export default async function Home() {
  const tokens = await getSnapshotTokens();
  const canonicalMappingCount = tokens.filter((token) => token.registryStatus === "First-party registry").length;

  return (
    <main>
      <nav className="nav" aria-label="Primary navigation">
        <span className="brand">Stock Token Radar</span>
        <a href="#methodology">Methodology</a>
      </nav>

      <section className="hero">
        <p className="eyebrow">Robinhood Chain · chain ID 4663</p>
        <h1>See the contract.<br />See the evidence.</h1>
        <p className="hero-copy">
          A public, non-custodial research directory for tokenized stock instruments. No wallet connection, no trading, no hype.
        </p>
        <div className="stats" aria-label="Snapshot statistics">
          <div><strong>{tokens.length}</strong><span>registry entries</span></div>
          <div><strong>{canonicalMappingCount}</strong><span>first-party mappings</span></div>
          <div><strong>08 Aug 2026</strong><span>snapshot date</span></div>
        </div>
      </section>

      <TokenDirectory tokens={tokens} />

      <section id="methodology" className="methodology">
        <p className="eyebrow">Read this first</p>
        <h2>An instrument is not the underlying share.</h2>
        <div className="method-grid">
          <p>
            Robinhood describes its Stock Tokens as tokenized debt securities that provide economic exposure to underlying securities. It says holders do not have legal or beneficial rights in or against the issuer of the underlying security.
          </p>
          <p>
            This version uses a 96-record snapshot from Robinhood’s first-party asset registry, captured on 08 Aug 2026. The original JSON is retained in the repository so its contract mappings can be audited and reproduced.
          </p>
        </div>
        <p className="sources">
          Sources: <a href="https://api.robinhood.com/rhj/assets">Robinhood asset registry</a> · <a href="https://docs.robinhood.com/chain/contracts/">Robinhood token contracts</a> · <a href="https://robinhood.com/rhj/stocktokens/?lang=en">Robinhood Stock Tokens</a>
        </p>
      </section>
    </main>
  );
}
