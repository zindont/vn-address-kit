import type { ConversionResult } from "../../types/result";

export function printJson(value: unknown, pretty = false): void {
  console.log(JSON.stringify(value, null, pretty ? 2 : 0));
}

export function formatConversionResult(result: ConversionResult): string {
  const lines = [
    `Success: ${result.success}`,
    `Confidence: ${result.confidence.toFixed(2)}`,
    `Strategy: ${result.strategy}`
  ];
  if (result.streetAddress) lines.push(`Street: ${result.streetAddress}`);
  if (result.newAddress) {
    lines.push(`New province: ${result.newAddress.provinceName} (${result.newAddress.provinceCode})`);
    lines.push(`New ward: ${result.newAddress.wardName} (${result.newAddress.wardCode})`);
  }
  if (result.warnings.length > 0) lines.push(`Warnings: ${result.warnings.join("; ")}`);
  if (result.candidates.length > 0) lines.push(`Candidates: ${result.candidates.map((candidate) => `${candidate.newWardName}, ${candidate.newProvinceName} (${candidate.confidence.toFixed(2)})`).join("; ")}`);
  return lines.join("\n");
}
