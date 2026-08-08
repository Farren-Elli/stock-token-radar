import { describe, expect, it } from "vitest";
import type { StockToken } from "../src/lib/token-registry";
import {
  compareTokenSnapshots,
  parseWatchlist,
  searchResearchLinks,
  toggleWatchlistAddress,
  type ResearchLink,
} from "../src/lib/research-tools";

const token = (ticker: string, contractAddress: string): StockToken => ({
  ticker,
  name: ticker,
  contractAddress,
  registryStatus: "First-party registry",
});

describe("compareTokenSnapshots", () => {
  it("treats the first first-party snapshot as a baseline, not as newly added tokens", () => {
    expect(compareTokenSnapshots([token("AAPL", "0x1")])).toEqual({
      mode: "baseline",
      currentCount: 1,
      previousCount: null,
      added: [],
      removed: [],
      changed: [],
    });
  });

  it("reports added, removed, and remapped tickers between comparable snapshots", () => {
    const previous = [token("AAPL", "0x1"), token("TSLA", "0x2"), token("OLD", "0x3")];
    const current = [token("AAPL", "0x1"), token("TSLA", "0x9"), token("NVDA", "0x4")];

    expect(compareTokenSnapshots(current, previous)).toEqual({
      mode: "comparison",
      currentCount: 3,
      previousCount: 3,
      added: ["NVDA"],
      removed: ["OLD"],
      changed: [{ ticker: "TSLA", previousAddress: "0x2", currentAddress: "0x9" }],
    });
  });
});

describe("searchResearchLinks", () => {
  const links: ResearchLink[] = [
    { title: "Token contracts", description: "Canonical mappings", url: "https://example.com/contracts", tags: ["robinhood", "contracts"] },
    { title: "Raw snapshot", description: "Immutable JSON", url: "https://example.com/data.json", tags: ["evidence", "json"] },
  ];

  it("searches title, description, URL, and tags without case sensitivity", () => {
    expect(searchResearchLinks(links, "JSON")).toEqual([links[1]]);
    expect(searchResearchLinks(links, "contracts")).toEqual([links[0]]);
    expect(searchResearchLinks(links, "example.com/data")).toEqual([links[1]]);
  });

  it("returns all links for a blank query", () => {
    expect(searchResearchLinks(links, " ")).toEqual(links);
  });
});

describe("local watchlist helpers", () => {
  it("parses only valid string addresses and de-duplicates case-insensitively", () => {
    expect(parseWatchlist('["0xAbC", "0xabc", 9, "0xDef"]')).toEqual(["0xabc", "0xdef"]);
    expect(parseWatchlist("not json")).toEqual([]);
  });

  it("adds and removes addresses without mutating the original list", () => {
    const original = ["0xabc"];
    expect(toggleWatchlistAddress(original, "0xDEF")).toEqual(["0xabc", "0xdef"]);
    expect(toggleWatchlistAddress(original, "0xABC")).toEqual([]);
    expect(original).toEqual(["0xabc"]);
  });
});
