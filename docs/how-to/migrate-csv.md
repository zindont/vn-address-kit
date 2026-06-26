# Migrate A CSV File

Use the CLI when you need to migrate a spreadsheet-style export without writing code.

## Input Format

The CSV must have one column that contains the address text.

```csv
id,name,address
1,Nguyen Van A,"123 Le Loi, P Loc Tho, TP Nha Trang, Khanh Hoa"
2,Tran Thi B,"456 Nguyen Trai, P Ben Thanh, Q1, TP HCM"
```

## Run Migration

```bash
npx vietnam-address-kit@latest migrate customers.csv \
  --address-column address \
  --out customers.migrated.csv \
  --report report.json
```

For local development from this repository:

```bash
npm run build
node dist/cli/index.js migrate customers.csv \
  --address-column address \
  --out customers.migrated.csv \
  --report report.json
```

## Output Columns

The output CSV keeps your original columns and adds:

| Column | Meaning |
|---|---|
| `vn_address_success` | Whether conversion succeeded. |
| `vn_address_confidence` | Score from `0` to `1`. |
| `vn_address_strategy` | Matching strategy used. |
| `vn_address_new_province_code` | Current province code. |
| `vn_address_new_province_name` | Current province name. |
| `vn_address_new_ward_code` | Current ward code. |
| `vn_address_new_ward_name` | Current ward name. |
| `vn_address_street` | Preserved street address. |
| `vn_address_warnings` | Semicolon-separated warning messages. |

## Report JSON

The report contains summary counts:

```json
{
  "total": 1000,
  "matched": 920,
  "ambiguous": 50,
  "failed": 30,
  "averageConfidence": 0.91
}
```

## Recommended Production Workflow

1. Back up the original file.
2. Run migration into a new output file.
3. Review all rows where `vn_address_success=false`.
4. Review low-confidence rows under your chosen threshold.
5. Keep the report and original input for audit.
