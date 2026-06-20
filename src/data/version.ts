export interface DataVersion {
  version: string;
  sample: boolean;
  lastUpdatedAt: string;
  description: string;
  sources: string[];
}

export function getDataVersion(): DataVersion {
  return {
    version: "sample-2026.06.20",
    sample: true,
    lastUpdatedAt: "2026-06-20",
    description: "Development-only sample dataset for vn-address-kit MVP.",
    sources: ["Sample data created for tests and examples. Not official administrative data."]
  };
}
