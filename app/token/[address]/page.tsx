import Link from "next/link";
import { notFound } from "next/navigation";
import { SignalCanvas } from "../../signal-canvas";
import { VerificationLedger } from "../../verification-ledger";
import { getSnapshotTokens } from "../../../src/lib/snapshot";

export default async function TokenPage({ params }: { params: Promise<{ address: string }> }) {
  const { address } = await params;
  const tokens = await getSnapshotTokens();
  const token = tokens.find((entry) => entry.contractAddress.toLowerCase() === address.toLowerCase());

  if (!token) notFound();

  return (
    <main className="detail-page">
      <nav className="nav"><Link href="/" className="brand">Stock Token Radar</Link><Link href="/">Directory</Link></nav>
      <section className="detail-hero">
        <SignalCanvas />
        <p className="eyebrow">Tokenized instrument profile · observed 08 Aug 2026</p>
        <h1>{token.ticker}</h1>
        <p className="detail-name">{token.name} · Robinhood tokenized instrument</p>
        <p className="detail-intro">This page documents a first-party contract mapping for an instrument providing economic exposure. It is not a profile of the underlying share itself.</p>
      </section>
      <VerificationLedger token={token} />
      <div className="detail-actions">
        <a href={`https://robinscan.io/token/${token.contractAddress}`} target="_blank" rel="noreferrer">Inspect contract on Robinscan ↗</a>
        <Link href="/">Back to research terminal</Link>
      </div>
    </main>
  );
}
