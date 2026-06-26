# Handle Ambiguous Results

`vietnam-address-kit` intentionally avoids forcing a single answer when input is ambiguous.

## Detect Ambiguity

```ts
const result = convertAddressText("Loc Tho, Khanh Hoa");

if (!result.success && result.candidates.length > 0) {
  console.log("Manual review required", result.candidates);
}
```

Ambiguity usually means the input is missing a district, has a common ward name, or maps to multiple current wards.

## Present Candidates To Reviewers

Show reviewers:

- Original input.
- Parsed `oldAddress` fields, if available.
- Each candidate's province, ward, confidence, strategy, and reason.
- Warnings.

```ts
for (const candidate of result.candidates) {
  console.log(candidate.newProvinceName, candidate.newWardName, candidate.reason);
}
```

## Avoid Unsafe Auto-Matching

Do not auto-pick the first candidate unless your product owner has approved a clear rule. Candidate order is useful for review, not a legal guarantee.

## Improve The Input

When possible, ask upstream systems to provide:

- Province.
- Legacy district.
- Legacy ward.
- Street address.
- Original user-entered text.

Structured input is easier to migrate and audit than a single free-text field.
