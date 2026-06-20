import { getWards } from "../data/loader";
import type { Ward } from "../types/data";
import { scoreUnit, sortScored, type ScoredResult } from "./scoring";

export interface SearchWardOptions {
  provinceCode?: string;
}

export function searchWard(keyword: string, options: SearchWardOptions = {}): Array<ScoredResult<Ward>> {
  const wards = options.provinceCode ? getWards().filter((ward) => ward.provinceCode === options.provinceCode) : getWards();
  return sortScored(wards.flatMap((ward) => {
    const scored = scoreUnit(keyword, ward);
    return scored ? [scored] : [];
  }));
}
