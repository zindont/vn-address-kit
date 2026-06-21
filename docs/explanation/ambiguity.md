# Ambiguity And Manual Review

The package follows a conservative rule: do not force a match when the data is ambiguous.

## Common Causes

- Missing district in legacy input.
- Common ward names across several provinces or districts.
- Old wards split into multiple current wards.
- OCR mistakes or incomplete address text.
- Historical names not deterministically linked to one successor.

## How Ambiguity Appears

Ambiguous conversions usually return:

```ts
{
  success: false,
  strategy: "candidate_suggestion",
  confidence: 0.7,
  warnings: ["..."],
  candidates: [/* possible current addresses */]
}
```

## Recommended Product Behavior

- Show candidates to an operator or user.
- Ask for missing district or province data when possible.
- Keep the original text next to the migrated result.
- Track manual decisions separately from automated decisions.

## What Not To Do

Do not auto-pick the first candidate just because it appears first. Candidate order is not a legal assertion.
