# Limitations

`vietnam-address-kit` is designed for deterministic migration workflows, but it cannot remove every data-quality risk.

## Data Limits

- The dataset reconciles to official 2025 totals, but legally critical workflows should still verify against official state sources.
- Pre-2025 ward names are covered only when the official reconciliation source names the successor unambiguously.
- Partial merges and province-ambiguous historical names are intentionally not guessed.

## Parsing Limits

- Free-text parsing assumes comma-separated address text and reads from right to left.
- OCR errors and severe typos may fail or return weak fuzzy matches.
- Missing province, district, or ward fields reduce confidence.

## Product Limits

- `confidence` is an engineering signal, not a legal guarantee.
- Candidate order is not a final decision.
- Production migrations should preserve audit fields and review low-confidence rows.
