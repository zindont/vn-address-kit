import { getProvinces } from "../data/loader";
import type { Province } from "../types/data";
import { scoreUnit, sortScored, type ScoredResult } from "./scoring";

export function searchProvince(keyword: string): Array<ScoredResult<Province>> {
  return sortScored(getProvinces().flatMap((province) => {
    const scored = scoreUnit(keyword, province);
    return scored ? [scored] : [];
  }));
}
