# Mapping Types

Mapping types describe how a legacy administrative unit relates to a current unit.

| Type | Meaning |
|---|---|
| `unchanged` | The legacy unit maps directly to a current unit. |
| `renamed` | The unit continues under a new name. |
| `merged` | The old unit was merged into another current unit. |
| `split` | The old unit split across multiple current units. |
| `split_population` | The old unit split geographically, but the full population moved to one successor. |
| `province_changed` | The mapping crosses a changed province context. |
| `ambiguous` | The source data does not determine one safe answer. |
| `manual_review_required` | The data should be reviewed by a human or upstream process. |

## Why Mapping Types Matter

Name matching alone is unsafe. Two wards can share a name, and one old ward can map to multiple new wards. Mapping types let the conversion engine decide whether it can return one result or must return candidates.

## Split Cases

Most split cases should not be auto-resolved. `split_population` is the exception because the official source indicates that the entire population moved to one successor. See [ADR-0002](../adr/0002-population-determined-split-resolution.md).
