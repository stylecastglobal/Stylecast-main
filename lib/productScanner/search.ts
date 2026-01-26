const STOP_WORDS = new Set([
  "the",
  "and",
  "with",
  "for",
  "from",
  "your",
  "you",
  "of",
  "in",
  "on",
  "to",
  "a",
  "an",
  "by",
  "or",
  "ml",
  "oz",
]);

export function normalizeQuery(input: string): string[] {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

export function scoreTextMatch(tokens: string[], haystack: string): number {
  if (!tokens.length) return 0;
  const text = haystack.toLowerCase();
  let hits = 0;
  for (const token of tokens) {
    if (text.includes(token)) hits += 1;
  }
  return hits / tokens.length;
}
