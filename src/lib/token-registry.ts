export type StockToken = {
  ticker: string;
  name: string;
  contractAddress: string;
  registryStatus: string;
};

export function normalizeSearchQuery(query: string): string {
  return query.trim().toLowerCase();
}

export function parseTokenCsv(csv: string): StockToken[] {
  const lines = csv.trim().split(/\r?\n/);
  const rows = lines.slice(1).filter(Boolean);

  return rows.map((line) => {
    const fields = line.match(/(?:^|,)(?:"([^"]*(?:""[^"]*)*)"|([^",]*))/g)?.map(
      (field) => field.replace(/^,/, "").replace(/^"|"$/g, "").split('""').join('"'),
    );

    if (!fields || fields.length < 4) {
      throw new Error(`Invalid token row: ${line}`);
    }

    return {
      ticker: fields[0],
      name: fields[1],
      contractAddress: fields[2],
      registryStatus: fields[3],
    };
  });
}

export function searchTokens(tokens: StockToken[], query: string): StockToken[] {
  const normalizedQuery = normalizeSearchQuery(query);

  if (!normalizedQuery) {
    return tokens;
  }

  return tokens.filter((token) =>
    [token.ticker, token.name, token.contractAddress].some((value) =>
      value.toLowerCase().includes(normalizedQuery),
    ),
  );
}
