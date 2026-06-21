# Confidence And Strategies

`confidence` is a pragmatic score from `0` to `1`. It explains how strongly the package trusts a conversion.

Confidence is not a legal guarantee. It is an engineering signal for automation, review queues, and audit logs.

## Strategies

| Strategy | Meaning |
|---|---|
| `old_ward_district_province_exact` | Legacy province, district, and ward matched exactly or deterministically. |
| `old_ward_province_exact` | Legacy province and ward matched without a district. |
| `former_ward` | Input used a ward name retired before 2025 and mapped through `formerNames`. |
| `split_population` | Old ward split, but the official note indicates the entire population moved to one successor. |
| `normalized_exact` | Normalized text matched exactly. |
| `no_diacritics` | No-diacritics form matched. |
| `abbreviation` | Administrative prefixes such as `P.`, `Q.`, or `TP.` were normalized. |
| `fuzzy` | Lightweight fuzzy matching was used. |
| `candidate_suggestion` | No deterministic result; candidates are returned for review. |
| `failed` | No usable match was found. |

## Suggested Interpretation

| Confidence | Suggested handling |
|---:|---|
| `>= 0.90` | Usually safe for automated migration if your domain accepts deterministic data rules. |
| `0.70–0.89` | Review recommended, especially for customer or legal data. |
| `< 0.70` | Treat as manual review or failure. |
| `0` | Failed conversion. |

## Review Guidance

Store the full conversion result. The `strategy`, `warnings`, and `candidates` fields often explain more than the numeric score alone.
