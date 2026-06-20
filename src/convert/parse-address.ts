import type { ParsedAddress } from "../types/address";

const WARD_HINT = /\b(phường|phuong|p\.?|xã|xa|x\.?|thị trấn|thi tran|tt\.?)\b/i;
const DISTRICT_HINT = /\b(quận|quan|q\.?|huyện|huyen|h\.?|thành phố|thanh pho|tp\.?|tỉnh|tinh|thị xã|thi xa|tx\.?)\b/i;

export function parseAddress(text: string): ParsedAddress {
  const parts = text.split(",").map((part) => part.trim()).filter(Boolean);
  const warnings: string[] = [];

  if (parts.length < 2) {
    return { input: text, streetAddress: text.trim() || undefined, confidence: 0.2, warnings: ["Address text does not contain enough comma-separated parts."] };
  }

  const province = parts.at(-1);
  const district = parts.length >= 3 ? parts.at(-2) : undefined;
  const ward = parts.length >= 4 ? parts.at(-3) : undefined;
  const streetParts = parts.slice(0, Math.max(0, parts.length - 3));

  if (!province) warnings.push("Province could not be parsed.");
  if (!district) warnings.push("District could not be parsed.");
  if (!ward) warnings.push("Ward could not be parsed.");
  if (ward && !WARD_HINT.test(ward)) warnings.push("Ward component has no obvious ward/commune prefix.");
  if (district && !DISTRICT_HINT.test(district)) warnings.push("District component has no obvious district/city prefix.");

  return {
    input: text,
    streetAddress: streetParts.join(", ") || undefined,
    province,
    district,
    ward,
    confidence: warnings.length === 0 ? 0.8 : 0.55,
    warnings
  };
}
