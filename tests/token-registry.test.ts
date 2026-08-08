import { describe, expect, it } from "vitest";
import {
  evidenceLabel,
  evidenceSourceUrl,
  normalizeSearchQuery,
  parseTokenCsv,
  searchTokens,
  type StockToken,
} from "../src/lib/token-registry";

const tokens: StockToken[] = [
  {
    ticker: "TSLA",
    name: "Tesla",
    contractAddress: "0x322f0929c4625ed5bad873c95208d54e1c003b2d",
    registryStatus: "Official",
  },
  {
    ticker: "AAPL",
    name: "Apple",
    contractAddress: "0xaf3d76f1834a1d425780943c99ea8a608f8a93f9",
    registryStatus: "Official",
  },
];

describe("searchTokens", () => {
  it("finds a token by ticker regardless of case", () => {
    expect(searchTokens(tokens, "tsla")).toEqual([tokens[0]]);
  });

  it("finds a token by company name", () => {
    expect(searchTokens(tokens, "apple")).toEqual([tokens[1]]);
  });

  it("finds a token by its full contract address", () => {
    expect(searchTokens(tokens, tokens[0].contractAddress)).toEqual([tokens[0]]);
  });

  it("returns every token for a blank query", () => {
    expect(searchTokens(tokens, "   ")).toEqual(tokens);
  });
});

describe("evidenceLabel", () => {
  it("marks a first-party registry record as canonical mapping evidence", () => {
    expect(evidenceLabel("First-party registry")).toBe("First-party canonical mapping");
  });

  it("keeps third-party records explicitly unverified", () => {
    expect(evidenceLabel("Official")).toBe("Third-party explorer label; unverified");
    expect(evidenceLabel("")).toBe("Third-party registry; unverified");
  });
});

describe("evidenceSourceUrl", () => {
  it("links first-party mapping evidence to Robinhood's canonical contract documentation", () => {
    expect(evidenceSourceUrl("First-party registry")).toBe("https://docs.robinhood.com/chain/contracts/");
  });

  it("does not invent a canonical link for third-party statuses", () => {
    expect(evidenceSourceUrl("Official")).toBeUndefined();
  });
});

describe("parseTokenCsv", () => {
  it("parses quoted names and preserves the registry status", () => {
    const csv = [
      "ticker,company_or_fund,contract_address,registry_status",
      'TSLA,Tesla,0x322f0929c4625ed5bad873c95208d54e1c003b2d,Official',
      'ALAB,"Astera Labs, Inc.",0x748c32c3ca24edf31ea597db1f3d330a7a6da3dc,',
    ].join("\n");

    expect(parseTokenCsv(csv)).toEqual([
      tokens[0],
      {
        ticker: "ALAB",
        name: "Astera Labs, Inc.",
        contractAddress: "0x748c32c3ca24edf31ea597db1f3d330a7a6da3dc",
        registryStatus: "",
      },
    ]);
  });
});

describe("normalizeSearchQuery", () => {
  it("trims whitespace and lowercases values", () => {
    expect(normalizeSearchQuery("  TSLA  ")).toBe("tsla");
  });
});
