# Data Sources

The repository bundles the official national dataset for the 2025 two-level reform in `src/data/official/*.json`, generated from official conversion and reconciliation tables.

## Source Of Truth

The dataset is built from two official files in `data/source/`:

- `conversion-table.xlsx` — the official old/new administrative-unit conversion table for the 2025 baseline.
- `doi-chieu-2024-09-01.xls` — the commune-level reconciliation table from 2024-09-01 to 2025-07-01, used for `formerNames`.

These sources derive from:

- `Quyết định 19/2025/QĐ-TTg` for administrative unit codes from 2025-07-01.
- National Assembly Standing Committee resolutions (`Nghị quyết của Ủy ban Thường vụ Quốc hội`) for commune-level rearrangements.
- General Statistics Office (`Tổng cục Thống kê`) reconciliation data at `danhmuchanhchinh.nso.gov.vn`.

See [ADR-0001](../adr/0001-official-conversion-table-as-single-source-of-truth.md) for the source-of-truth decision.

## Coverage

| File | Records |
|---|---:|
| `current-provinces.json` | 34 |
| `current-wards.json` | 3,321 |
| `legacy-provinces.json` | 63 |
| `legacy-districts.json` | 698 |
| `legacy-wards.json` | 10,033 |
| `mappings.json` | 10,571 edges |

## Regeneration

```bash
pip install openpyxl xlrd
npm run build:data
```

The build script validates official totals and referential integrity. Runtime code reads only generated JSON.

## Legal Caution

The dataset reconciles to official totals, but legally critical workflows should re-check records against official state sources and keep verification notes.
