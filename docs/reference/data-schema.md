# Data Schema Reference

The runtime reads generated JSON from `src/data/official/*.json`.

## `Province`

```ts
interface Province {
  code: string;
  name: string;
  type: "province" | "city";
  nameWithType: string;
  slug: string;
  normalizedName: string;
}
```

## `Ward`

```ts
interface Ward {
  code: string;
  name: string;
  type: "ward" | "commune" | "special_zone";
  nameWithType: string;
  provinceCode: string;
  slug: string;
  normalizedName: string;
}
```

## `LegacyProvince`

```ts
interface LegacyProvince {
  code: string;
  name: string;
  type: "province" | "city";
  nameWithType: string;
  slug: string;
  normalizedName: string;
}
```

## `LegacyDistrict`

```ts
interface LegacyDistrict {
  code: string;
  name: string;
  type: "district" | "city" | "town" | "urban_district";
  nameWithType: string;
  provinceCode: string;
  slug: string;
  normalizedName: string;
}
```

## `LegacyWard`

```ts
interface LegacyWard {
  code: string;
  name: string;
  type: "ward" | "commune" | "town";
  nameWithType: string;
  districtCode: string;
  provinceCode: string;
  slug: string;
  normalizedName: string;
  formerNames?: LegacyFormerName[];
}
```

## `LegacyFormerName`

A ward name retired in a pre-2025 reform round that deterministically resolves to the surviving legacy ward.

```ts
interface LegacyFormerName {
  name: string;
  normalizedName: string;
  code?: string;
  since?: string;
  decree?: string;
}
```

## `AddressMapping`

```ts
type MappingType =
  | "unchanged"
  | "renamed"
  | "merged"
  | "split"
  | "split_population"
  | "province_changed"
  | "ambiguous"
  | "manual_review_required";

interface AddressMapping {
  oldProvinceCode: string;
  oldDistrictCode?: string;
  oldWardCode?: string;
  newProvinceCode: string;
  newWardCode: string;
  type: MappingType;
  note?: string;
}
```

## Code Format

Codes follow the official bare GSO scheme and are stored as strings:

| Unit | Format |
|---|---|
| Province | `NN` |
| Legacy district | `NNN` |
| Legacy/current ward | `NNNNN` |

Leading zeroes are preserved.
