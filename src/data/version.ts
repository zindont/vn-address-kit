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
    description: "Sample dataset for tests, examples, and package integration. Not official administrative data.",
    sources: ["Sample data created for tests and examples. Not official administrative data."]
  };
}
