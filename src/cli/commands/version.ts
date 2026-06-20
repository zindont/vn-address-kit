import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { getDataVersion } from "../../data/version";

export function runVersion(): void {
  const packagePath = join(dirname(fileURLToPath(import.meta.url)), "../../package.json");
  let packageVersion = "1.0.0";
  try {
    packageVersion = JSON.parse(readFileSync(packagePath, "utf8")).version ?? packageVersion;
  } catch {
    packageVersion = "1.0.0";
  }
  const data = getDataVersion();
  console.log(`vn-address-kit ${packageVersion}`);
  console.log(`data ${data.version}${data.sample ? " (sample)" : ""}`);
}
