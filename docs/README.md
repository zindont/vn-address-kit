# Documentation

This documentation follows the Diátaxis model: tutorials, how-to guides, reference, and explanation. Each section has a different job, so readers can choose the shortest path for their task.

**Languages:** English is the canonical documentation language. Vietnamese user-facing docs are linked under [Vietnamese Docs](#vietnamese-docs). Official Vietnamese legal names and source titles stay in Vietnamese when precision matters.

## Start Here

- [Getting Started](tutorials/getting-started.md) — install the package, run `npx`, convert one address, and inspect the result.
- [README in Vietnamese](../README.vi.md) — overview for Vietnamese developers.

## Tutorials

Tutorials teach by walking through a complete learning path.

- [Getting Started](tutorials/getting-started.md)

## How-To Guides

How-to guides solve specific tasks. They assume you already know what you want to accomplish.

- [Convert a Single Address](how-to/convert-single-address.md)
- [Migrate a CSV File](how-to/migrate-csv.md)
- [Handle Ambiguous Results](how-to/handle-ambiguous-results.md)
- [Run Quick Tasks With npx](how-to/run-with-npx.md)
- [Verify Official Data](how-to/verify-official-data.md)

## Reference

Reference pages describe the package precisely and compactly.

- [API Reference](reference/api.md)
- [CLI Reference](reference/cli.md)
- [Data Schema Reference](reference/data-schema.md)

## Explanation

Explanation pages provide background, rationale, and conceptual guidance.

- [Administrative Model](explanation/administrative-model.md)
- [Confidence And Strategies](explanation/confidence.md)
- [Mapping Types](explanation/mapping-types.md)
- [Ambiguity And Manual Review](explanation/ambiguity.md)
- [Data Sources](explanation/data-sources.md)
- [Limitations](explanation/limitations.md)

## Data And Architecture Decisions

- [ADR-0001: Official conversion table as source of truth](adr/0001-official-conversion-table-as-single-source-of-truth.md)
- [ADR-0002: Population-determined split resolution](adr/0002-population-determined-split-resolution.md)
- [ADR-0003: Former ward names for pre-2025 rounds](adr/0003-former-ward-names-for-pre-2025-rounds.md)

## Vietnamese Docs

- [README tiếng Việt](../README.vi.md)
- [Bắt đầu nhanh](vi/getting-started.md)
- [Migrate CSV](vi/migrate-csv.md)

## Maintainer Notes

- [Documentation Language Policy](language-policy.md)
- [Domain docs for agents](agents/domain.md)
- [Issue tracker workflow](agents/issue-tracker.md)
- [Triage labels](agents/triage-labels.md)
