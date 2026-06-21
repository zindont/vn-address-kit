# Administrative Model

Vietnam's 2025 reform changes many address workflows from a three-level administrative model to a two-level model.

## Legacy Model

Many existing systems store addresses as:

```txt
street, ward/commune, district, province/city
```

This package calls those fields legacy province, legacy district, and legacy ward.

## Current Model

The 2025 model removes the district level from address hierarchy:

```txt
street, ward/commune/special zone, province/city
```

The package calls these current provinces and current wards.

## Mapping Edges

A conversion is not just a name lookup. It uses mapping edges from old units to new units. A single legacy ward may:

- remain effectively unchanged,
- be renamed,
- be merged into another ward,
- split across several wards,
- move under a changed province context,
- require manual review.

This is why conversion results include confidence, strategy, warnings, and candidates.
