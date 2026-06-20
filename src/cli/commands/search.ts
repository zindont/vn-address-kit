import { searchProvince, searchWard } from "../../search";
import { printJson } from "../utils/output";

export function runSearch(kind: string, keyword: string, options: { province?: string; json?: boolean; pretty?: boolean }): void {
  if (kind !== "province" && kind !== "ward") {
    throw new Error("Search kind must be 'province' or 'ward'.");
  }
  const results = kind === "province" ? searchProvince(keyword) : searchWard(keyword, { provinceCode: options.province });
  if (options.json) {
    printJson(results, options.pretty);
    return;
  }
  for (const result of results) {
    const item = result.item;
    console.log(`${item.nameWithType} (${item.code}) score=${result.score.toFixed(2)} strategy=${result.strategy}`);
  }
}
