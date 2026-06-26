# Documentation Language Policy

`vietnam-address-kit` serves Vietnamese address workflows but should remain easy for international open-source contributors to review.

## Canonical Language

- English is the canonical language for repository documentation, issue templates, ADRs, and maintainer workflow docs.
- Vietnamese user-facing documentation lives in dedicated localized files such as `README.vi.md`.
- Avoid mixing English and Vietnamese prose in the same paragraph unless the Vietnamese phrase is an official name, legal title, source title, or address example.

## Vietnamese Terms

Keep official names in Vietnamese when translating them could reduce precision. Examples:

- `Quyết định 19/2025/QĐ-TTg`
- `Ủy ban Thường vụ Quốc hội`
- `Tổng cục Thống kê`
- Province, district, ward, commune, and street names.

When helpful, introduce the English concept first and keep the Vietnamese title in parentheses.

## Code Examples

- Use ASCII no-diacritics examples for terminal commands when copy/paste reliability matters.
- Use Vietnamese diacritics in TypeScript examples when demonstrating normalization behavior.
- Keep API names, CLI flags, JSON fields, and filenames unchanged across languages.

## Adding New Docs

- Add English documentation first.
- Add a localized Vietnamese file when the document is user-facing and likely to be read by Vietnamese developers.
- Link language alternatives at the top of localized files.
