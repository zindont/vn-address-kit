# Data Sources

The current repository bundles development-only sample data in `src/data/sample/*.json`.

The initial repository uses sample data for development. Replace `src/data/sample/*.json` with verified official data before production use.

## Current Sample Data

The sample dataset includes a few records for Khánh Hòa, Hà Nội, and TP. Hồ Chí Minh. It exists only to make tests, examples, and architecture runnable.

## Expected Real Data Format

Real data should keep the same JSON shapes for current provinces, current wards, legacy provinces, legacy districts, legacy wards, and mapping rules. Mapping records should include old unit codes, new unit codes, mapping type, and optional notes.

## Replacement Workflow

1. Import verified administrative data into `src/data/sample` or a new data directory.
2. Update `src/data/version.ts` with version, date, and source references.
3. Add validation tests for hierarchy and mapping coverage.
4. Document legal sources and data changelog entries.

## Guarantees

No legal correctness guarantee is provided until verified official data is imported and audited.
