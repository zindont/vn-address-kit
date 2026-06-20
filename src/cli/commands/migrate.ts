import { readFileSync, writeFileSync } from "node:fs";
import { convertBatch } from "../../convert";
import { parseCsv, stringifyCsv } from "../utils/csv";
import { printJson } from "../utils/output";

export function runMigrate(filePath: string, options: { addressColumn: string; out: string; report?: string; pretty?: boolean }): void {
  const rows = parseCsv(readFileSync(filePath, "utf8"));
  const addresses = rows.map((row) => row[options.addressColumn] ?? "");
  const report = convertBatch(addresses);
  const outputRows = rows.map((row, index) => {
    const result = report.results[index]!;
    return {
      ...row,
      vn_address_success: String(result.success),
      vn_address_confidence: result.confidence.toFixed(2),
      vn_address_strategy: result.strategy,
      vn_address_new_province_code: result.newAddress?.provinceCode ?? "",
      vn_address_new_province_name: result.newAddress?.provinceName ?? "",
      vn_address_new_ward_code: result.newAddress?.wardCode ?? "",
      vn_address_new_ward_name: result.newAddress?.wardName ?? "",
      vn_address_street: result.streetAddress ?? "",
      vn_address_warnings: result.warnings.join("; ")
    };
  });

  writeFileSync(options.out, stringifyCsv(outputRows));
  const summary = {
    total: report.total,
    matched: report.matched,
    ambiguous: report.ambiguous,
    failed: report.failed,
    averageConfidence: report.averageConfidence
  };
  if (options.report) writeFileSync(options.report, JSON.stringify(summary, null, 2));
  printJson(summary, options.pretty ?? true);
}
