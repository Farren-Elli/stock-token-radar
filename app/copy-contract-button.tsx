"use client";

import { useState } from "react";

export function CopyContractButton({ address, label = "contract address" }: { address: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button className="copy-button" type="button" onClick={copyAddress} aria-label={`Copy complete ${label} ${address}`}>
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
