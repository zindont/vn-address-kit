# Limitations

- The bundled dataset is sample-only and not production-ready.
- Ambiguous ward names can return multiple candidates instead of a forced match.
- Missing district or ward fields reduce confidence.
- OCR errors and severe typos may fail or return weak fuzzy matches.
- The parser assumes comma-separated address text and reads province/district/ward from right to left.
- The package does not guarantee legal correctness without verified official data.

Users should verify low-confidence results and all migrations before production use.
