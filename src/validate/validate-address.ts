import { getProvinceByCode, getWardByCode } from "../data/loader";
import { validateHierarchy } from "./validate-hierarchy";

export function validateProvince(provinceCode: string): boolean {
  return Boolean(getProvinceByCode(provinceCode));
}

export function validateWard(wardCode: string): boolean {
  return Boolean(getWardByCode(wardCode));
}

export function validateAddress(input: { provinceCode: string; wardCode: string }) {
  return validateHierarchy(input);
}
