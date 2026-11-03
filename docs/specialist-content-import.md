# Specialist Profiles From The Trainer Document

Source: `التعريف عن المدربين وأجندة كل تدريب.docx`, supplied by the project owner.

The specialist introduction sections were imported for Bayan Al-Qadamani
(`20000000-0000-0000-0000-000000000001`) and Walaa Al-Maghrabi
(`20000000-0000-0000-0000-000000000002`). The training agendas were outside the
scope of this update. Arabic profile text comes from the document; English copy
is a translation. Minor punctuation and paragraph grouping were normalized.

## Source Of Truth

Profiles were initially saved through the existing local backend admin API:
`PUT /api/v1/admin/specialists/{id}`. At the owner's subsequent request, the same
content was added to the backend's permanent Liquibase seed history:
`src/main/resources/db/changelog/seed-data/005-specialist-document-profiles.sql`.
The master changelog includes it after seed 004. The changeset ID is
`sagheri:seed-007-specialist-document-profiles`.

The migration updates the existing two records rather than inserting duplicates.
IDs, image references, specialty codes, user associations, active status, availability,
booking relationships, and display order are preserved. It executes once and does
not overwrite later admin changes on subsequent startups. Existing migrations and
their checksums were not edited.

This changeset was applied through Liquibase to the local PostgreSQL `qa` database
and verified as recorded exactly once. Fresh databases receive it during normal
backend startup. All 22 backend tests passed, including new coverage for fresh
profile seeding, envelope/raw API consistency, and preservation of later admin edits
when Liquibase runs again.

`docs/content/specialists-from-document.json` is a reviewable import artifact,
not a runtime frontend content source. The app continues to load the backend
snapshot. JSON fallback remains governed by `enableContentFallbackJson`.

## Data Mapping

### HTML Biographies (2026-11-04)

Follow-up seed: `006-specialist-html-biographies.sql`, changeset
`sagheri:seed-008-specialist-html-biographies`. It is included after seed 005 and
updates only `bio_ar`, `bio_en`, and update timestamps for the two existing IDs.
Both migrations are applied to local PostgreSQL and recorded in Liquibase.

The API now returns semantic HTML in `bioAr/bioEn`: paragraphs, a statement
blockquote, `h3` question headings, and a benefits list with bold lead-ins. No
inline colors or executable markup are included in the seed. Question headings
use the FE primary-dark color and a secondary-teal border, with responsive sizing
and logical RTL/LTR spacing.

`SpecialistBiographyComponent` renders this with normal Angular `[innerHTML]`
sanitization, without bypassing security. Its CSS is scoped by a wrapper class
because API HTML has no Angular view-scope attributes. Card/header previews use
DOM parsing to extract readable text, so markup and HTML entities do not leak
onto cards. Plain-text bios remain supported.

`scripts/prepare-specialist-html.mjs` derives the reviewable
`docs/content/specialist-html-profiles.json` import artifact from the original
plain-text source. The admin import script now uses this HTML artifact. Neither
document artifact is a runtime FE content source.

Validation: all 23 FE tests and all 22 BE tests passed, including sanitization,
preview extraction, fresh seeding, and API/snapshot parity checks.

- `nameAr/nameEn`: names of the two specialists.
- `titleAr/titleEn`: their professional titles from the document.
- `bioAr/bioEn`: introductions, approach, personal statement, reasons to consult,
  and individual-support information, separated by blank lines.
- `specialtiesJson`: nine expertise entries for Bayan and ten for Walaa.
- `credentialsJson`: qualifications and training stated in the source document.

The JSON array entries use `{ "textAr": "...", "textEn": "..." }`. The existing
backend serializes these as `specialties` and `credentials` in its snapshot.
The FE supports both these bilingual entries and older plain string arrays.

Home and listing cards show an introductory paragraph and selected expertise
tags. Each full profile shows all expertise entries, qualifications, and the
remaining biography paragraphs, with consultation booking links.

## Reimport

Use `scripts/import-specialist-profiles.mjs` with `SAGHERI_ADMIN_EMAIL` and
`SAGHERI_ADMIN_PASSWORD` supplied through the process environment. Optional
`BE_BASE_URL` defaults to `http://localhost:8080`. The script backs up the existing
records in ignored `tmp/`, updates only the two known IDs, and verifies the public
snapshot. Reimporting overwrites these profiles with the reviewed import content;
normal future edits should be made through backend content management.

After successful import, `npm run content:fallback` regenerates the backup from
the backend. Do not edit the fallback asset manually.
