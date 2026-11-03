# Sagheri FE/BE Runtime Verification

Date: 2026-08-12

## Backend Snapshot

Verified against the running backend at `http://localhost:8080/api/v1/cms/static-content-snapshot.json`.

Seeded content currently returned by backend:

- Courses: 3
- Specialists: 2
- Consultation types: 3
- FAQs: 9
- Reviews: 3
- CMS pages: 7
- Site settings: 10

Important gap: CMS page records exist for `about`, `contact`, `faq`, `privacy`, `refund-policy`, and `terms`, but their `sections` arrays are empty. The `home` CMS page has content sections. Courses, specialists, consultation types, FAQs, reviews, and settings are seeded.

## Frontend Runtime Fixes

The browser could not call `http://localhost:8080` directly because the backend response did not include CORS headers for the Angular dev-server origin. Local FE now uses an Angular dev proxy:

- `proxy.conf.json` proxies `/api/v1` to `http://localhost:8080`.
- `src/environments/environment.local.ts` uses `apiBaseUrl: '/api/v1'`.
- `npm start` now runs with `--proxy-config proxy.conf.json`.

The Angular app is running without Zone.js, so async RxJS subscriptions did not automatically refresh public templates after HTTP responses. The affected public content pages now trigger change detection after backend data arrives.

## Verified UI Routes

Verified with headless Chrome against `http://localhost:4203`:

- `/` renders backend courses, specialists, reviews, and FAQs.
- `/courses` renders the 3 backend courses.
- `/courses/pre-pregnancy-preparation` renders course detail, lessons, and outcomes.
- `/specialists` renders the 2 backend specialists.
- `/faq` renders the 9 backend FAQs.
- `/consultations/book/20000000-0000-0000-0000-000000000001` renders the backend specialist and the 3 backend consultation types.

## Build

`npm run build` passed.

Existing warnings remain:

- `src/app/features/public/consultations/consultation-booking/consultation-booking.component.scss` exceeds the component style budget.
- `src/app/features/public/home/home.component.scss` exceeds the component style budget.

## Notes

No backend files were changed.

The frontend can render backend static content now, but backend still needs fuller CMS section seeding if every static/legal/about/contact page should be fully admin-managed instead of partially static in FE templates.
