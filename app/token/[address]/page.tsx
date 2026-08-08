import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyContractButton } from "../../copy-contract-button";
import { evidenceLabel, evidenceSourceUrl } from "../../../src/lib/token-registry";
import { getSnapshotTokens } from "../../../src/lib/snapshot";

export default async function TokenPage({ params }: { params: Promise<{ address: string }> }) {
  const { address } = await params;
  const tokens = await getSnapshotTokens();
  const token = tokens.find((entry) => entry.contractAddress.toLowerCase() === address.toLowerCase());

  if (!token) notFound();
  const sourceUrl = evidenceSourceUrl(token.registryStatus);

  return (
    <main className="detail-page">
      <nav className="nav"><Link href="/" className="brand">Stock Token Radar</Link><Link href="/">Directory</Link></nav>
      <section className="detail-card">
        <p className="eyebrow">Token profile · snapshot 08 Aug 2026</p>
        <h1>{token.ticker}</h1>
        <p className="detail-name">{token.name}</p>
        <dl>
          <div><dt>Robinhood Chain</dt><dd>Chain ID 4663</dd></div>
          <div><dt>Contract address</dt><dd className="detail-contract"><code>{token.contractAddress}</code><CopyContractButton address={token.contractAddress} /></dd></div>
          <div><dt>Evidence status</dt><dd>{evidenceLabel(token.registryStatus)}</dd></div>
          <div><dt>Evidence source</dt><dd>{sourceUrl ? <a href={sourceUrl} target="_blank" rel="noreferrer">Robinhood canonical token contracts ↗</a> : "No first-party canonical source link recorded."}</dd></div>
          <div><dt>Snapshot basis</dt><dd>Robinhood first-party asset registry, captured 08 Aug 2026.</dd></div>
        </dl>
        <div className="detail-actions">
          <a href={`https://robinscan.io/token/${token.contractAddress}`} target="_blank" rel="noreferrer">Inspect on Robinscan ↗</a>
          <Link href="/">Back to directory</Link>
        </div>
      </section>
    </main>
  );
}
