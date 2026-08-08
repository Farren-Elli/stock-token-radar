import { readFile } from "node:fs/promises";
import * as path from "node:path";
import { parseTokenCsv, type StockToken } from "./token-registry";

const snapshotPath = path.join(
  process.cwd(),
  "data/derived/2026-08-08-robinhood-chain-first-party-token-registry.csv",
);

export async function getSnapshotTokens(): Promise<StockToken[]> {
  const csv = await readFile(snapshotPath, "utf8");
  return parseTokenCsv(csv);
}
