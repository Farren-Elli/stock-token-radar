import type { StockToken } from "../src/lib/token-registry";
import { compareTokenSnapshots, REGISTRY_SNAPSHOT } from "../src/lib/research-tools";

export function SnapshotTracker({ tokens }: { tokens: StockToken[] }) {
  const comparison = compareTokenSnapshots(tokens);

  return (
    <section className="snapshot-panel" aria-labelledby="snapshot-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Snapshot change tracker</p>
          <h2 id="snapshot-heading">A baseline for every future change.</h2>
        </div>
        <span className="baseline-badge">Baseline snapshot</span>
      </div>

      <div className="snapshot-grid">
        <article><span>Current records</span><strong>{comparison.currentCount}</strong><small>First-party mappings</small></article>
        <article><span>Added</span><strong>—</strong><small>No earlier comparable snapshot</small></article>
        <article><span>Removed</span><strong>—</strong><small>No earlier comparable snapshot</small></article>
        <article><span>Remapped</span><strong>—</strong><small>No earlier comparable snapshot</small></article>
      </div>

      <div className="snapshot-timeline">
        <span className="timeline-node" aria-hidden="true" />
        <div>
          <strong>{REGISTRY_SNAPSHOT.retrievedLabel}</strong>
          <p>First comparable first-party snapshot recorded. Change counts remain intentionally blank until the next independently captured registry snapshot.</p>
        </div>
        <a href={REGISTRY_SNAPSHOT.snapshotRepoUrl} target="_blank" rel="noreferrer">Inspect baseline JSON ↗</a>
      </div>
    </section>
  );
}
