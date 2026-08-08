"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { StockToken } from "../src/lib/token-registry";
import { evidenceLabel } from "../src/lib/token-registry";
import { REGISTRY_SNAPSHOT } from "../src/lib/research-tools";
import { CopyContractButton } from "./copy-contract-button";

export function InstrumentCompare({ tokens }: { tokens: StockToken[] }) {
  const initialLeft = tokens.find((token) => token.ticker === "AAPL")?.contractAddress ?? tokens[0]?.contractAddress ?? "";
  const initialRight = tokens.find((token) => token.ticker === "TSLA")?.contractAddress ?? tokens[1]?.contractAddress ?? initialLeft;
  const [leftAddress, setLeftAddress] = useState(initialLeft);
  const [rightAddress, setRightAddress] = useState(initialRight);
  const byAddress = useMemo(() => new Map(tokens.map((token) => [token.contractAddress, token])), [tokens]);
  const selections = [byAddress.get(leftAddress), byAddress.get(rightAddress)];

  return (
    <section id="compare" className="compare-panel" aria-labelledby="compare-heading">
      <div className="section-heading-row">
        <div><p className="eyebrow">Compare instruments</p><h2 id="compare-heading">Place two mappings side by side.</h2></div>
        <p className="comparison-note">Identity evidence only · no market ranking</p>
      </div>
      <div className="compare-selectors">
        <label>Instrument A<select value={leftAddress} onChange={(event) => setLeftAddress(event.target.value)}>{tokens.map((token) => <option key={token.contractAddress} value={token.contractAddress}>{token.ticker} · {token.name}</option>)}</select></label>
        <span aria-hidden="true">↔</span>
        <label>Instrument B<select value={rightAddress} onChange={(event) => setRightAddress(event.target.value)}>{tokens.map((token) => <option key={token.contractAddress} value={token.contractAddress}>{token.ticker} · {token.name}</option>)}</select></label>
      </div>
      <div className="compare-grid">
        {selections.map((token, index) => token ? (
          <article key={`${index}-${token.contractAddress}`}>
            <div className="compare-token-heading"><span>{index === 0 ? "A" : "B"}</span><div><strong>{token.ticker}</strong><p>{token.name}</p></div></div>
            <dl>
              <div><dt>Contract</dt><dd><code>{token.contractAddress}</code><CopyContractButton address={token.contractAddress} /></dd></div>
              <div><dt>Chain</dt><dd>{REGISTRY_SNAPSHOT.chainName} · {REGISTRY_SNAPSHOT.chainId}</dd></div>
              <div><dt>Evidence</dt><dd>{evidenceLabel(token.registryStatus)}</dd></div>
              <div><dt>Observed</dt><dd>{REGISTRY_SNAPSHOT.retrievedLabel}</dd></div>
            </dl>
            <Link href={`/token/${token.contractAddress}`}>Open verification ledger →</Link>
          </article>
        ) : null)}
      </div>
    </section>
  );
}
