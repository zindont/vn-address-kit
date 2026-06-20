import { normalizeAdministrativePrefix } from "./normalize-prefix";
import { removeVietnameseTones } from "./remove-vietnamese-tones";

export function normalizeText(text: string): string {
  return removeVietnameseTones(normalizeAdministrativePrefix(text))
    .toLowerCase()
    .replace(/[.,;:/\\|()[\]{}"'`~!@#$%^&*_+=?<>-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
