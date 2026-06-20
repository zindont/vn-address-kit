import { convertAddressText } from "../../convert";
import { formatConversionResult, printJson } from "../utils/output";

export function runConvert(address: string, options: { json?: boolean; pretty?: boolean }): void {
  const result = convertAddressText(address);
  if (options.json) {
    printJson(result, options.pretty);
    return;
  }
  console.log(formatConversionResult(result));
}
