import { getProvinceByCode, getWardByCode } from "../data/loader";
import type { HierarchyValidationResult } from "../types/result";

export interface ValidateHierarchyInput {
  provinceCode: string;
  wardCode: string;
}

export function validateHierarchy(input: ValidateHierarchyInput): HierarchyValidationResult {
  const province = getProvinceByCode(input.provinceCode);
  const ward = getWardByCode(input.wardCode);

  if (!province) return { valid: false, ward, reason: `Unknown province code: ${input.provinceCode}` };
  if (!ward) return { valid: false, province, reason: `Unknown ward code: ${input.wardCode}` };
  if (ward.provinceCode !== province.code) {
    return { valid: false, province, ward, reason: `Ward ${ward.code} does not belong to province ${province.code}` };
  }
  return { valid: true, province, ward };
}
