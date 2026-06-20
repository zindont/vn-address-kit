import { normalizeText } from "../normalize/normalize-text";
import { levenshtein } from "./levenshtein";

export interface SearchableUnit {
  name: string;
  nameWithType: string;
  normalizedName: string;
}

export interface ScoredResult<T> {
  item: T;
  score: number;
  strategy: "exact" | "normalized" | "contains" | "fuzzy";
}

export function scoreUnit<T extends SearchableUnit>(keyword: string, unit: T): ScoredResult<T> | undefined {
  const query = normalizeText(keyword);
  const normalizedName = normalizeText(unit.name);
  const normalizedWithType = normalizeText(unit.nameWithType);
  const storedNormalized = normalizeText(unit.normalizedName);

  if (!query) return undefined;
  if (query === normalizedName || query === normalizedWithType || query === storedNormalized) {
    return { item: unit, score: 1, strategy: "exact" };
  }
  if (normalizedWithType.endsWith(query) || normalizedName.includes(query) || normalizedWithType.includes(query)) {
    return { item: unit, score: 0.9, strategy: "contains" };
  }

  const distance = Math.min(levenshtein(query, normalizedName), levenshtein(query, normalizedWithType));
  const longest = Math.max(query.length, normalizedName.length, normalizedWithType.length);
  const similarity = longest === 0 ? 0 : 1 - distance / longest;
  if (similarity >= 0.62) {
    return { item: unit, score: Math.max(0.55, Math.min(0.82, similarity)), strategy: "fuzzy" };
  }
  return undefined;
}

export function sortScored<T>(results: Array<ScoredResult<T>>): Array<ScoredResult<T>> {
  return results.sort((a, b) => b.score - a.score);
}
