# Getting Started

This tutorial gets you from zero to a successful address conversion in a few minutes.

## Prerequisites

- Node.js 18 or newer.
- A terminal with `npm` or `npx`.

## 1. Run The CLI Without Installing

Use `npx` for a one-off conversion:

```bash
npx vn-address-kit@latest convert "123 Le Loi, P Loc Tho, TP Nha Trang, Khanh Hoa" --json --pretty
```

You should see a JSON result with:

- `success`: whether the package found a deterministic conversion.
- `newAddress`: the current two-level province and ward.
- `confidence`: a score from `0` to `1`.
- `strategy`: the rule used to produce the result.
- `warnings` and `candidates`: audit data for review.

## 2. Install The Package

```bash
npm install vn-address-kit
```

## 3. Convert Text In TypeScript

```ts
import { convertAddressText } from "vn-address-kit";

const result = convertAddressText(
  "123 Le Loi, P Loc Tho, TP Nha Trang, Khanh Hoa"
);

console.log(result.success);
console.log(result.newAddress);
console.log(result.confidence);
```

## 4. Convert Structured Input

Use structured input when your system already stores province, district, ward, and street fields separately.

```ts
import { convertOldToNew } from "vn-address-kit";

const result = convertOldToNew({
  province: "Khánh Hòa",
  district: "Nha Trang",
  ward: "Lộc Thọ",
  streetAddress: "123 Lê Lợi"
});

console.log(result);
```

## 5. Search And Validate

```ts
import { searchProvince, searchWard, validateHierarchy } from "vn-address-kit";

console.log(searchProvince("khanh hoa"));
console.log(searchWard("loc tho", { provinceCode: "56" }));
console.log(validateHierarchy({ provinceCode: "56", wardCode: "56001" }));
```

## Next Steps

- Use [Convert a Single Address](../how-to/convert-single-address.md) for production conversion patterns.
- Use [Migrate a CSV File](../how-to/migrate-csv.md) for batch migration.
- Read [Confidence And Strategies](../explanation/confidence.md) before deciding confidence thresholds.
