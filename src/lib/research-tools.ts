import type { StockToken } from "./token-registry";

export const REGISTRY_SNAPSHOT = {
  chainId: 4663,
  chainName: "Robinhood Chain",
  sourceName: "Robinhood Stock Token asset registry",
  sourceUrl: "https://api.robinhood.com/rhj/assets",
  contractDocsUrl: "https://docs.robinhood.com/chain/contracts/",
  apiDocsUrl: "https://docs.robinhood.com/chain/stock-token-apis/",
  productTermsUrl: "https://robinhood.com/rhj/stocktokens/?lang=en",
  retrievedAt: "2026-08-08T20:12:58+01:00",
  retrievedLabel: "08 Aug 2026 · 20:12:58 BST",
  retrievalMethod: "Unauthenticated HTTPS GET with Accept: application/json",
  responseSha256: "c5a34065a65f3c596f963ffb3ed8b777b8964567a88e451cd78cc51fcf6b7589",
  recordCount: 96,
  snapshotRepoUrl: "https://github.com/farren-labs/stock-token-radar/blob/main/data/source-snapshots/2026-08-08-robinhood-rhj-assets.json",
  researchNoteUrl: "https://github.com/farren-labs/stock-token-radar/blob/main/docs/research/2026-08-08-first-party-contract-registry.md",
} as const;

export type ResearchLink = {
  title: string;
  description: string;
  url: string;
  tags: string[];
  type?: "Primary source" | "Project evidence" | "Explorer";
};

export const RESEARCH_LINKS: ResearchLink[] = [
  {
    title: "Robinhood asset registry",
    description: "Live first-party JSON endpoint used to map token symbols to Robinhood Chain deployments.",
    url: REGISTRY_SNAPSHOT.sourceUrl,
    tags: ["robinhood", "registry", "json", "mapping", "api"],
    type: "Primary source",
  },
  {
    title: "Canonical token contracts",
    description: "Robinhood documentation describing canonical Stock Token contract addresses.",
    url: REGISTRY_SNAPSHOT.contractDocsUrl,
    tags: ["robinhood", "contracts", "canonical", "documentation"],
    type: "Primary source",
  },
  {
    title: "Stock Token API documentation",
    description: "First-party schema documentation for symbols, deployments, chain IDs, and contract addresses.",
    url: REGISTRY_SNAPSHOT.apiDocsUrl,
    tags: ["api", "schema", "deployments", "documentation"],
    type: "Primary source",
  },
  {
    title: "Stock Token product terms",
    description: "Robinhood product description and underlying-rights limitations for tokenized debt securities.",
    url: REGISTRY_SNAPSHOT.productTermsUrl,
    tags: ["product", "terms", "risk", "economic exposure"],
    type: "Primary source",
  },
  {
    title: "Immutable source snapshot",
    description: "The exact first-party JSON response retained in the public project repository.",
    url: REGISTRY_SNAPSHOT.snapshotRepoUrl,
    tags: ["snapshot", "json", "github", "sha-256", "reproducible"],
    type: "Project evidence",
  },
  {
    title: "First-party registry research note",
    description: "Retrieval record, validation method, hashes, limitations, and evidence-policy rationale.",
    url: REGISTRY_SNAPSHOT.researchNoteUrl,
    tags: ["methodology", "research", "verification", "limitations"],
    type: "Project evidence",
  },
  {
    title: "Robinscan contract explorer",
    description: "Third-party explorer for inspecting Robinhood Chain contract activity and bytecode.",
    url: "https://robinscan.io/",
    tags: ["explorer", "robinscan", "chain", "third-party"],
    type: "Explorer",
  },
];

export type SnapshotComparison = {
  mode: "baseline" | "comparison";
  currentCount: number;
  previousCount: number | null;
  added: string[];
  removed: string[];
  changed: Array<{ ticker: string; previousAddress: string; currentAddress: string }>;
};

export function compareTokenSnapshots(current: StockToken[], previous?: StockToken[]): SnapshotComparison {
  if (!previous) {
    return { mode: "baseline", currentCount: current.length, previousCount: null, added: [], removed: [], changed: [] };
  }

  const currentByTicker = new Map(current.map((token) => [token.ticker.toLowerCase(), token]));
  const previousByTicker = new Map(previous.map((token) => [token.ticker.toLowerCase(), token]));
  const added = current
    .filter((token) => !previousByTicker.has(token.ticker.toLowerCase()))
    .map((token) => token.ticker)
    .sort();
  const removed = previous
    .filter((token) => !currentByTicker.has(token.ticker.toLowerCase()))
    .map((token) => token.ticker)
    .sort();
  const changed = current
    .flatMap((token) => {
      const prior = previousByTicker.get(token.ticker.toLowerCase());
      if (!prior || prior.contractAddress.toLowerCase() === token.contractAddress.toLowerCase()) return [];
      return [{ ticker: token.ticker, previousAddress: prior.contractAddress, currentAddress: token.contractAddress }];
    })
    .sort((left, right) => left.ticker.localeCompare(right.ticker));

  return { mode: "comparison", currentCount: current.length, previousCount: previous.length, added, removed, changed };
}

export function searchResearchLinks(links: ResearchLink[], query: string): ResearchLink[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return links;

  return links.filter((link) => [link.title, link.description, link.url, ...link.tags]
    .join(" ")
    .toLowerCase()
    .includes(normalized));
}

export function parseWatchlist(value: string | null): string[] {
  if (!value) return [];

  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];

    return Array.from(new Set(parsed
      .filter((entry): entry is string => typeof entry === "string" && /^0x[0-9a-f]+$/i.test(entry))
      .map((entry) => entry.toLowerCase())));
  } catch {
    return [];
  }
}

export function toggleWatchlistAddress(addresses: string[], address: string): string[] {
  const normalized = address.toLowerCase();
  return addresses.includes(normalized)
    ? addresses.filter((entry) => entry !== normalized)
    : [...addresses, normalized];
}
