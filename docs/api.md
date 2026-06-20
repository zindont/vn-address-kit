# API Reference

## Data

- `getDataVersion()` returns data metadata and whether the bundled dataset is sample-only.
- `getProvinces()`, `getProvinceByCode(code)`, `getProvinceByName(name)` read current provinces.
- `getWards()`, `getWardByCode(code)`, `getWardsByProvince(provinceCode)` read current wards.

## Normalize

- `removeVietnameseTones(text)` removes Vietnamese diacritics.
- `normalizeAdministrativePrefix(text)` expands common prefixes such as `TP.`, `P.`, `Q.`, `H.`.
- `normalizeText(text)` trims, lowercases, removes tones, collapses spaces, and strips punctuation noise.

## Search

- `searchProvince(keyword)` searches current provinces by exact, normalized, no-diacritics, abbreviation, and fuzzy matching.
- `searchWard(keyword, { provinceCode })` searches current wards, optionally inside one province.
- `searchAdministrativeUnit(keyword)` returns both province and ward results.

## Validate

- `validateProvince(provinceCode)` returns a boolean.
- `validateWard(wardCode)` returns a boolean.
- `validateHierarchy({ provinceCode, wardCode })` returns `{ valid, province, ward, reason }`.
- `validateAddress({ provinceCode, wardCode })` is an alias for hierarchy validation.

## Convert

- `parseAddress(text)` splits a comma-separated address from right to left.
- `convertOldToNew(input)` converts structured legacy province/district/ward input.
- `convertAddressText(text)` parses and converts free-text input.
- `convertBatch(items)` converts an array of strings or structured inputs and returns summary statistics.
