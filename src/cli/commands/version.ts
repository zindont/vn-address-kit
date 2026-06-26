import { getDataVersion } from "../../data/version";
import { PACKAGE_VERSION } from "../../package-version";

export function runVersion(): void {
  const data = getDataVersion();
  console.log(`vietnam-address-kit ${PACKAGE_VERSION}`);
  console.log(`data ${data.version}${data.sample ? " (sample)" : ""}`);
}
