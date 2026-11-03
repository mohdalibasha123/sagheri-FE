# Sagheri Frontend Project Analysis and Backend Requirements

Date: 2026-08-10

This document records the current understanding of the Sagheri frontend repository, the product/business requirements, the implemented code, UI/UX direction, current gaps, and the backend capabilities required to make the frontend fully dynamic and admin-controlled.

## 1. Executive Summary

Sagheri is an Arabic-first maternal education and specialist consultation platform for mothers in the Middle East. The frontend is an Angular 21 standalone-component application with SCSS design tokens, RTL/LTR language state, auth guards, API endpoint constants, domain models, mock API behavior, and a routed structure for public pages, auth, checkout, user area, and admin area.

The project is currently a strong frontend foundation rather than a finished production product. The brand direction and several public pages are implemented visually, but much of the business functionality is still static or placeholder-based. The backend must eventually control courses, course videos, specialists, availability, bookings, payments, CMS content, media assets, legal pages, reviews, FAQ, site settings, navigation, translations, users, roles, permissions, and audit logs.

Important current risk: all environment profiles, including production, currently have `enableMockApi: true`. This must be changed before connecting real APIs or deploying production.

## 2. Business Understanding

### Product

Brand: Sagheri.

Core positioning:

- Arabic-first motherhood education and consultation platform.
- Targets mothers and mothers-to-be in Jordan and the Middle East.
- Covers pregnancy, breastfeeding, child nutrition, postpartum recovery, pelvic health, and maternal wellbeing.
- Must feel warm, calm, trustworthy, educational, professional, and culturally appropriate.

### Main Business Lines

1. Paid educational courses.
2. Course checkout and payment.
3. Specialist consultation booking.
4. User accounts for purchased courses, bookings, and payment history.
5. Admin portal for content, media, operations, users, permissions, and settings.

### Main User Types

- Visitor: browses public content, courses, specialists, FAQ, legal/contact/about pages.
- Registered user: purchases courses, views owned courses, books consultations, manages profile.
- Admin: manages courses, specialists, bookings, users, settings, and eventually CMS/content/media.
- Specialist: appears as a domain role in the code but no specialist-facing portal is implemented yet.
- Content manager: appears as a domain role in the code but no permission-specific content workflow is implemented yet.

### Core User Flows

Course purchase flow:

1. User opens homepage.
2. User browses courses.
3. User opens a course detail page.
4. User clicks subscribe/buy.
5. User fills checkout/profile fields.
6. User reviews order summary.
7. Frontend creates purchase/order.
8. Frontend initiates payment.
9. Backend returns redirect URL, checkout session, or embedded config.
10. User completes payment externally or through embedded UI.
11. User returns to success/failure/pending route.
12. Frontend checks payment status.
13. User gets course access if paid.

Consultation booking flow:

1. User opens specialists list.
2. User selects a specialist.
3. User chooses consultation type: video, audio, or text.
4. User chooses a date.
5. User chooses an available time slot.
6. User fills booking contact/problem details.
7. User submits booking.
8. Backend creates booking and notifies specialist/admin.
9. User sees confirmation and can view booking in user area.

Admin CMS/operations flow:

1. Admin logs in.
2. Admin accesses `/admin`.
3. Admin manages homepage, pages, courses, lessons/videos, specialists, consultation types, availability, bookings, purchases, FAQ, reviews, messages, users, roles, permissions, media, navigation, translations, settings, and audit logs.
4. Public website reads those changes from backend APIs.

## 3. Repository Inventory

Top-level relevant files and folders:

- `src/`: Angular source.
- `src/app/core/`: auth, guards, interceptors, models, constants, layout, services, state.
- `src/app/features/`: public pages, auth pages, checkout pages, user pages, admin pages.
- `src/assets/styles/`: SCSS design system.
- `src/assets/i18n/`: Arabic and English translation JSON files.
- `src/environments/`: local/dev/prod environment profiles.
- `public/`: public static assets including logo and SPA redirects.
- `docs/`: product/UI analysis documentation.
- `project_details/`: source-of-truth images, wireframe PDF, and original agent prompt.
- `Dockerfile`, `nginx.conf`, `netlify.toml`: deployment support.
- `package.json`: Angular scripts and dependencies.

## 4. Tech Stack

Framework:

- Angular 21.2.x.
- Standalone components.
- Angular Router with lazy-loaded `loadComponent`.
- Angular HttpClient with fetch adapter.
- Angular signals for local and shared state.
- TypeScript strict mode.
- SCSS.

Libraries:

- `@angular/cdk`.
- `@jsverse/transloco` is installed, but there is no active Transloco provider/configuration currently wired in the app.
- `date-fns`.
- `rxjs`.
- `vitest` and Angular unit-test builder.

Scripts:

- `npm start`: `ng serve --configuration local`.
- `npm run start:dev`: `ng serve --configuration dev`.
- `npm run build`: `ng build`.
- `npm run build:local`.
- `npm run build:dev`.
- `npm run build:prod`.
- `npm test`.
- `npm run lint`.

## 5. Angular App Structure

### Bootstrap

- `src/main.ts` bootstraps `App` with `appConfig`.
- `src/app/app.ts` is a minimal root shell with `<router-outlet />`.
- `src/app/app.config.ts` provides:
  - Router with component input binding.
  - View transitions.
  - HttpClient with fetch.
  - `authInterceptor`.
  - `errorInterceptor`.

### Routing

Routes are defined in `src/app/app.routes.ts`.

Public routes:

- `/`
- `/courses`
- `/courses/:slug`
- `/specialists`
- `/specialists/:id`
- `/consultations/book/:specialistId`
- `/faq`
- `/contact`
- `/about`
- `/terms`
- `/privacy`
- `/refund-policy`
- `/checkout/course/:courseId` guarded by `authGuard`
- `/payment/success`
- `/payment/failure`
- `/payment/pending`

Auth routes under `/auth`, guarded by `guestGuard`:

- `/auth/login`
- `/auth/register`
- `/auth/forgot-password`
- `/auth/reset-password`
- `/auth/verify-account`

User routes under `/user`, guarded by `authGuard`:

- `/user/dashboard`
- `/user/profile`
- `/user/my-courses`
- `/user/my-bookings`
- `/user/payment-history`

Admin routes under `/admin`, guarded by `adminGuard`:

- `/admin/dashboard`
- `/admin/courses`
- `/admin/specialists`
- `/admin/bookings`
- `/admin/users`
- `/admin/settings`

Important mismatch:

- `APP_ROUTES` defines many more admin routes than `app.routes.ts` currently registers, including CMS home, lessons, consultation types, availability, purchases, FAQ, reviews, contact messages, roles, permissions, media, navigation, translations, and audit logs.
- Payment callback route exists in `APP_ROUTES` but is not registered in `app.routes.ts`.

## 6. Core State and Auth

### Auth State

`AuthStateService` stores:

- Access token in `localStorage` key `sagheri_access_token`.
- Refresh token in `localStorage` key `sagheri_refresh_token`.
- Current user in `localStorage` key `sagheri_current_user`.
- `currentUser` signal.
- `isAuthenticated` computed signal.
- `isAdmin` computed signal.

Roles are enum-based:

- `USER`
- `ADMIN`
- `SPECIALIST`
- `CONTENT_MANAGER`

Auth concerns:

- Access token storage in `localStorage` is simple and convenient, but it carries XSS exposure risk.
- Token refresh exists as a service method but is not automatically integrated into the `errorInterceptor`.
- `isAdmin` only checks `UserRole.ADMIN`, not granular permissions.

### Auth Service

`AuthService` supports:

- login.
- register.
- logout.
- refresh token.
- get current user.
- forgot password.
- reset password.

### Guards

- `authGuard`: requires logged-in user.
- `guestGuard`: redirects authenticated users to user dashboard.
- `adminGuard`: requires `ADMIN` role.

## 7. API Layer

### ApiService

`ApiService` wraps HttpClient with methods:

- `get<T>()`
- `post<T>()`
- `put<T>()`
- `patch<T>()`
- `delete<T>()`

It prepends `environment.apiBaseUrl`.

When `environment.enableMockApi` is true, it returns mock responses from in-service logic.

Current mock data covers:

- auth login/register/refresh/me.
- courses list/detail.
- specialists list/detail.
- consultation booking creation.
- payment initiate/status.
- admin dashboard and generic admin list responses.

### Interceptors

`authInterceptor`:

- Adds `Authorization: Bearer <token>` if access token exists.

`errorInterceptor`:

- Normalizes HTTP errors to `ApiError`.
- On 401, clears auth state and navigates to login.
- On 403, navigates home.

Missing:

- Automatic refresh-token retry.
- Toast/global notification integration.
- Field-level validation error mapping.
- Network/offline messaging.

## 8. Environment Profiles

Files:

- `src/environments/environment.ts`
- `src/environments/environment.local.ts`
- `src/environments/environment.dev.ts`
- `src/environments/environment.prod.ts`

Configured API URLs:

- local: `http://localhost:8080/api/v1`
- dev: `https://dev-api.sagheri.com/api/v1`
- prod: `https://api.sagheri.com/api/v1`

Configured payment return URLs:

- local: `http://localhost:4200`
- dev: `https://dev.sagheri.com`
- prod: `https://sagheri.com`

Critical issue:

- `enableMockApi` is currently `true` in local, dev, and prod. Production must be `false` before real deployment.

## 9. Domain Models

The code already defines useful backend contracts.

### Course Domain

`Course` includes:

- id, slug.
- Arabic/English title and description.
- thumbnail URL.
- optional video preview URL.
- price, currency.
- duration, lessons count.
- rating, reviews count.
- active/free flags.
- outcomes.
- lessons.
- created date.

`CourseLesson` includes:

- id, courseId.
- Arabic/English title and optional description.
- video URL.
- duration.
- order.
- preview flag.

`CoursePurchase` includes:

- id, course, user, payment status/reference, amount, currency, created date.

### Specialist and Consultation Domain

`Specialist` includes:

- Arabic/English name, title, bio.
- image URL.
- specialties.
- consultation types.
- active flag.

`ConsultationTypeItem` includes:

- type: `VIDEO`, `AUDIO`, `TEXT`.
- Arabic/English name.
- duration.
- price/currency.
- active flag.

`SpecialistAvailability` includes:

- specialist id.
- date.
- slots.

`TimeSlot` includes:

- id.
- start time.
- end time.
- booked flag.

### Booking Domain

`BookingRequest` includes:

- specialist id.
- consultation type id.
- slot id.
- date.
- first/last name.
- email.
- phone and phone code.
- country.
- problem description.
- optional preferred contact time.

`ConsultationBooking` expands the request with specialist, consultation type, slot, status, and timestamps.

### Payment Domain

`PaymentInitiationRequest`:

- purchase id.
- optional provider.
- optional return URL.

`PaymentInitiationResponse`:

- optional redirect URL.
- optional checkout session id.
- optional embedded config.
- provider.
- reference.

`PaymentStatusResponse`:

- reference.
- payment status.
- amount.
- currency.
- provider.
- optional paid date/message.

### CMS Domain

`CmsPage`:

- page key.
- Arabic/English title.
- sections.
- Arabic/English SEO metadata.
- updated date.

`CmsSection`:

- key.
- type.
- Arabic/English content objects.
- order.
- visible flag.

`SiteSettings`:

- site name.
- contact email/phone.
- social links.
- default currency/language.
- optional logo URL.

`MediaAsset`:

- id, URL, filename, mime type, size, created date.

## 10. UI/UX Source of Truth

The project source files and reference images establish the following design direction.

### Brand Identity

- Arabic-first.
- RTL by default.
- Soft, calm, warm, feminine, trustworthy.
- Motherhood, pregnancy, breastfeeding, child care, postpartum recovery.
- Medical/educational but not hospital-cold.

### Logo

- Mother holding baby with floral/wreath details.
- Used in public hero, footer, and auth pages.

### Color Palette

Official palette:

- Background: `#FDFBF5`.
- Primary warm earthy brown: `#AD6F5F`.
- Secondary teal: `#63A39E`.
- Dark text brown: `#5D3F33`.
- Muted brown: `#8A6D5E`.

Additional tokens implemented:

- Card: `#FFF8EE`.
- Border: `#E5D6C8`.
- Gold: `#B68A4A`.
- Primary dark: `#8F5647`.
- Primary light: `#D69A73`.
- Secondary dark: `#477C78`.
- Course green: `#006B5C`.
- Consultation rust: `#8B2F16`.
- Dark block: `#3F403B`.
- Danger/warning/info colors.

### Typography

Loaded fonts in `index.html`:

- Tajawal.
- Cairo.
- Inter.

Expected use:

- Arabic body and headings: Tajawal/Cairo.
- English: Inter/system fallback.
- H1 around 30-40px in token docs, though home hero currently uses larger clamp up to 58px.

### Layout Patterns

Reference UI:

- Cream background.
- Rounded cards.
- Thin warm borders.
- Gentle drop shadows.
- Floating right-side desktop navigation.
- Mobile bottom navigation.
- Specialist cards with photos.
- Course cards with video thumbnails and play overlay.
- FAQ accordion.
- Footer with logo, contact, social links, legal links.

Current implementation:

- Matches overall palette and rounded/shadow card direction.
- Implements floating side nav and mobile bottom nav in `PublicLayoutComponent`.
- Uses placeholder symbols/icons instead of icon library.
- Uses gradient placeholders/initials instead of real photos/video thumbnails.
- Some global component classes exist but feature components also define local button/card styles.

## 11. Current UI Implementation Status

### Public Layout

Implemented:

- Floating right-side nav on desktop.
- Mobile bottom nav.
- Language toggle.
- Footer with logo, contact email, phone placeholder, legal links.

Gaps:

- Icons are text/symbol placeholders, not a polished icon system.
- Footer contact/social content is hardcoded.
- No dynamic CMS navigation.
- No authenticated user nav state.
- No header/user menu.

### Home Page

Implemented sections:

- Hero.
- Service summary/stat panel.
- Specialists preview.
- Courses preview.
- Reviews.
- FAQ preview.
- CTA.

Data source:

- Hardcoded arrays in `HomeComponent`.

Gaps:

- Should be CMS/API-driven.
- Specialist images are initials/gradients, not media assets.
- Course video thumbnails are gradient blocks, not real videos/images.
- Reviews are hardcoded.
- FAQ is hardcoded.
- CTA and section copy are hardcoded.

### Courses List

Implemented:

- Static course cards for 3 courses.
- Duration, lessons, price, rating, badge, CTA.

Gaps:

- No API service call.
- No pagination/filter/search.
- No loading/error/empty states.
- No real thumbnails or video previews.
- No purchased/enrolled state.

### Course Detail

Implemented:

- Static course detail.
- Video-style preview area.
- Outcomes.
- Lesson accordion.
- Price/rating.

Gaps:

- Does not read route slug.
- No API service call.
- No real video player.
- No course access rules.
- No related courses.
- Checkout link should integrate with purchase/payment flow.

### Specialists List

Implemented:

- Static specialists list.
- Specialist tags and consultation types.
- Booking CTA.

Gaps:

- No API service call.
- No real profile images.
- No filtering by specialty/consultation type.
- No availability preview.

### Specialist Profile

Status:

- Component exists, but needs confirmation/expansion. It is not a full backend-driven profile page yet.

Required:

- Full specialist bio.
- Credentials.
- Specialties.
- Consultation types/prices.
- Availability preview.
- Reviews/testimonials if supported.
- Booking CTA.

### Consultation Booking

Implemented:

- Static consultation types.
- Static calendar days.
- Static slots.
- Simple form using `FormsModule`.
- Signal-based selected type/date/slot/submitted state.

Gaps:

- No API integration for specialist, consultation types, availability, or booking create.
- Uses fixed 2026-04 dates.
- No real calendar logic.
- No duplicate-slot or race-condition handling.
- No reactive form validation.
- No backend confirmation or notification status.

### Contact Page

Implemented:

- Contact hero.
- Contact form.
- Success state.
- Contact info card.

Gaps:

- Does not call contact API.
- No validation beyond basic HTML required attributes.
- Contact info is hardcoded.
- No admin message management integration.

### FAQ, About, Legal

Status:

- FAQ and About are implemented enough for static display.
- Legal page is a placeholder saying content will be admin-managed.

Required:

- FAQ API/CMS integration.
- About page CMS integration.
- Legal pages CMS integration with versioning/publish workflow.

### Auth Pages

Implemented:

- Login form.
- Register form.
- Forgot password.
- Reset password.
- Verify account.
- Mock login behavior: any email/password works when mock API is enabled; email containing `admin` receives admin role.

Gaps:

- Uses template-driven forms, not reactive forms.
- Missing complete server-side validation mapping.
- Verify account does not call backend.
- Forgot/reset flows are mostly placeholders.
- Copy says mock account/local backend in user-facing UI; this must be removed for production.

### Checkout and Payment

Implemented:

- Routes/components exist.
- Payment success/failure/pending pages are placeholders.
- Payment API models and endpoints exist.
- Mock payment initiate/status exists.

Gaps:

- Checkout page is only a placeholder.
- No order summary.
- No course purchase creation.
- No payment initiation UI.
- No provider redirect handling.
- Payment callback route constant exists but route is not registered.
- Payment status pages do not call backend.

### User Area

Implemented:

- Routes/components exist for dashboard, profile, my courses, my bookings, payment history.
- Layout has language toggle.

Gaps:

- Pages are placeholders.
- No user sidebar/topbar/dashboard.
- No API calls.
- No course access UI.
- No booking detail/cancel/reschedule UI.
- No profile edit.

### Admin Area

Implemented:

- Admin routes for dashboard, courses, specialists, bookings, users, settings.
- Admin guard.
- Layout only provides language toggle and router outlet.
- Global admin SCSS classes exist.

Gaps:

- Admin pages are placeholders.
- No sidebar/topbar/breadcrumbs.
- Many admin route constants are not registered.
- No CRUD tables/forms/dialogs.
- No media library.
- No CMS editor.
- No translation editor.
- No roles/permissions matrix.
- No audit log UI.

## 12. Localization Status

Implemented:

- `LanguageStateService` stores language in localStorage and updates `html lang` and `dir`.
- Arabic default.
- English toggle.
- `src/assets/i18n/ar.json` and `src/assets/i18n/en.json` contain broad translation keys.

Gaps:

- Transloco is installed but not wired.
- Components mostly use manual `text(ar, en)` or `t(ar, en)` helpers.
- Many user-facing strings are hardcoded in components.
- CMS content needs a multilingual structure.
- Admin translations page is planned but not implemented.

Note:

- Arabic text appears as mojibake in some PowerShell outputs from this environment, but the project intent and source files are Arabic-first UTF-8.

## 13. Design System Status

Implemented SCSS:

- `abstracts/_tokens.scss`
- `abstracts/_mixins.scss`
- `base/_reset.scss`
- `base/_typography.scss`
- `components/_buttons.scss`
- `components/_cards.scss`
- `components/_forms.scss`
- `layout/_admin.scss`
- `styles.scss` imports the design system.

Strengths:

- CSS custom properties are in place.
- Logical spacing/radius/shadow tokens exist.
- Form, button, card, and admin table foundations exist.
- RTL/LTR global direction support exists.

Gaps:

- No reusable Angular shared UI components yet.
- Feature components duplicate button/card styles locally.
- No standardized icon system.
- No toast/modal/dialog implementation.
- No skeleton/loading/empty/error components beyond a global `.skeleton` utility.
- No accessible reusable form controls.

## 14. Deployment Status

Docker:

- Multi-stage build using `node:20-alpine`.
- Serves Angular build with `nginx:1.27-alpine`.
- Copies `dist/sagheri-fe/browser` to Nginx root.

Nginx:

- SPA fallback to `index.html`.
- Gzip enabled.
- Static asset cache configured.

Netlify:

- `npm run build:prod`.
- Publishes `dist/sagheri-fe/browser`.
- Redirects all routes to `/index.html`.

Risk:

- Production builds currently use `environment.prod.ts`, which still has `enableMockApi: true`.

## 15. Testing and Quality Status

Observed:

- `app.spec.ts` exists.
- `package.json` includes `npm test`.
- Angular test builder and Vitest are installed.

Not yet verified in this analysis:

- Full test suite was not run during this document creation.

Known quality gaps:

- Most feature behavior has no tests yet.
- Route guards and services need unit tests.
- Forms need validation tests.
- Payment and booking flows need integration-style component tests.
- Admin CRUD components need tests once implemented.

## 16. Backend Requirements

The backend must expose stable, typed APIs that match or refine the frontend model layer.

### Auth and Accounts

Required:

- Register user.
- Login user.
- Refresh token.
- Logout/revoke refresh token.
- Current user profile.
- Forgot password.
- Reset password.
- Verify account/email.
- Optional OTP support.
- Role and permission claims.

Recommended endpoints:

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout`
- `GET /auth/me`
- `POST /auth/forgot-password`
- `POST /auth/reset-password`
- `POST /auth/verify`
- `POST /auth/resend-verification`

### Courses

Required public capabilities:

- List active courses.
- Filter/search courses.
- Get course detail by slug or id.
- Return localized fields.
- Return thumbnails, preview videos, lessons, outcomes, duration, price, currency, rating/reviews count.
- Return access state for authenticated users if applicable.

Required admin capabilities:

- Create/update/delete/archive courses.
- Publish/unpublish courses.
- Manage course translations.
- Manage course pricing/currency.
- Upload/select thumbnail.
- Upload/select preview video.
- Manage lessons.
- Reorder lessons.
- Mark lessons as free preview.
- Attach protected lesson video assets.

Recommended endpoints:

- `GET /courses`
- `GET /courses/{idOrSlug}`
- `GET /courses/{id}/related`
- `POST /admin/courses`
- `GET /admin/courses`
- `GET /admin/courses/{id}`
- `PUT /admin/courses/{id}`
- `PATCH /admin/courses/{id}/status`
- `DELETE /admin/courses/{id}`
- `GET /admin/courses/{courseId}/lessons`
- `POST /admin/courses/{courseId}/lessons`
- `PUT /admin/lessons/{id}`
- `DELETE /admin/lessons/{id}`
- `PATCH /admin/courses/{courseId}/lessons/reorder`

### Course Videos and Media Access

Videos are business-critical. The backend must not only store a raw URL.

Required:

- Media library upload and metadata.
- Separate public preview videos from protected paid lesson videos.
- Signed/private video playback URLs for purchased users.
- Thumbnail/poster images.
- Video duration metadata.
- MIME type and file size.
- Processing status if transcoding is used.
- Access control for protected course content.
- Optional support for external providers: Vimeo, Mux, Cloudflare Stream, S3/CloudFront, Bunny Stream, or YouTube unlisted for preview only.

Recommended media fields:

- `id`
- `type`: image, video, document.
- `url`
- `posterUrl`
- `provider`
- `providerAssetId`
- `durationSeconds`
- `mimeType`
- `sizeBytes`
- `width`
- `height`
- `visibility`: public, private, protected.
- `status`: uploading, processing, ready, failed.
- `createdAt`
- `updatedAt`

Recommended endpoints:

- `GET /admin/media`
- `POST /admin/media/upload`
- `GET /admin/media/{id}`
- `DELETE /admin/media/{id}`
- `POST /media/{id}/signed-url`
- `GET /courses/{courseId}/lessons/{lessonId}/playback-url`

### Course Purchases and Access

Required:

- Create purchase/order before payment.
- Track amount, currency, course, user, payment provider, payment reference, status.
- Grant course access only after successful payment.
- Expose user's purchased courses.
- Support payment pending/failure/cancelled states.
- Handle duplicate/retry/idempotency.

Recommended endpoints:

- `POST /courses/{courseId}/purchase`
- `GET /user/courses`
- `GET /user/courses/{courseId}`
- `GET /user/payments`
- `GET /admin/purchases`
- `GET /admin/purchases/{id}`
- `PATCH /admin/purchases/{id}/status` if manual reconciliation is needed.

### Payments

Required:

- Backend-owned payment provider integration.
- Frontend should never process raw card data directly unless using provider-hosted fields.
- Initiate payment from a purchase/order.
- Return redirect URL, checkout session id, or embedded config.
- Payment callback/webhook processing.
- Payment status lookup.
- Idempotent operations.
- Support at least JOD initially; prepare for regional currencies.

Potential providers:

- HyperPay.
- PayTabs.
- MyFatoorah.
- Tap Payments.
- Checkout.com.
- Stripe if business/legal setup allows.

Recommended endpoints:

- `POST /payments/initiate`
- `GET /payments/{reference}`
- `POST /payments/callback`
- `POST /payments/webhook/{provider}`
- `POST /admin/payments/{reference}/refund` if refunds are supported.

### Specialists

Required public capabilities:

- List active specialists.
- Filter by specialty/consultation type.
- Get specialist profile.
- Return profile image, name/title/bio in Arabic and English.
- Return specialties.
- Return consultation types/prices.
- Return availability preview.

Required admin capabilities:

- Create/update/delete/archive specialists.
- Upload/select profile image.
- Manage specialties.
- Manage consultation types per specialist or globally.
- Publish/unpublish specialist.

Recommended endpoints:

- `GET /specialists`
- `GET /specialists/{id}`
- `GET /specialists/{id}/consultation-types`
- `POST /admin/specialists`
- `GET /admin/specialists`
- `GET /admin/specialists/{id}`
- `PUT /admin/specialists/{id}`
- `PATCH /admin/specialists/{id}/status`
- `DELETE /admin/specialists/{id}`

### Consultation Types

Required:

- Video, audio, text types.
- Duration.
- Price.
- Currency.
- Active flag.
- Optional per-specialist overrides.

Recommended endpoints:

- `GET /consultation-types`
- `GET /specialists/{id}/consultation-types`
- `GET /admin/consultation-types`
- `POST /admin/consultation-types`
- `PUT /admin/consultation-types/{id}`
- `DELETE /admin/consultation-types/{id}`

### Specialist Availability and Booking

Required:

- Calendar availability by specialist/date range.
- Time slots with start/end time and timezone.
- Slot booking must be atomic to prevent double-booking.
- Booking status lifecycle: pending, confirmed, cancelled, completed.
- Admin status changes.
- Specialist/admin notification.
- User notification.
- Optional reschedule/cancel policy.

Recommended endpoints:

- `GET /specialists/{id}/availability?from=YYYY-MM-DD&to=YYYY-MM-DD`
- `POST /consultation-bookings`
- `GET /consultation-bookings/{id}`
- `GET /user/bookings`
- `GET /admin/bookings`
- `GET /admin/bookings/{id}`
- `PATCH /admin/bookings/{id}/status`
- `POST /admin/specialists/{id}/availability`
- `DELETE /admin/availability/{slotId}`
- `PATCH /admin/specialists/{id}/availability/reorder` if needed.

### CMS Pages and Homepage

The frontend should eventually stop hardcoding public copy and section arrays.

CMS-controlled content:

- Hero title/subtitle.
- Hero image.
- CTA labels and links.
- Homepage sections and order.
- Featured specialists.
- Featured courses.
- Reviews/testimonials.
- FAQ preview.
- Contact CTA.
- Footer content.
- Legal pages.
- About page.
- SEO metadata.

Recommended endpoints:

- `GET /cms/pages/{key}`
- `GET /cms/settings`
- `GET /cms/navigation/{location}`
- `GET /admin/cms/pages`
- `GET /admin/cms/pages/{id}`
- `POST /admin/cms/pages`
- `PUT /admin/cms/pages/{id}`
- `PATCH /admin/cms/pages/{id}/publish`
- `PATCH /admin/cms/sections/reorder`

Recommended page keys:

- `home`
- `about`
- `faq`
- `contact`
- `terms`
- `privacy`
- `refund-policy`

### FAQ

Required:

- Public active FAQ list.
- Category or topic support if needed.
- Order.
- Arabic/English question and answer.
- Active flag.

Recommended endpoints:

- `GET /faq`
- `GET /admin/faq`
- `POST /admin/faq`
- `PUT /admin/faq/{id}`
- `DELETE /admin/faq/{id}`
- `PATCH /admin/faq/reorder`
- `PATCH /admin/faq/{id}/status`

### Reviews and Testimonials

Required:

- Public active reviews.
- Author name/label in Arabic and English.
- Text in Arabic and English.
- Rating.
- Optional avatar.
- Order.
- Active flag.

Recommended endpoints:

- `GET /reviews`
- `GET /admin/reviews`
- `POST /admin/reviews`
- `PUT /admin/reviews/{id}`
- `DELETE /admin/reviews/{id}`
- `PATCH /admin/reviews/reorder`
- `PATCH /admin/reviews/{id}/status`

### Contact Messages

Required:

- Create contact message.
- Admin list.
- Admin view.
- Mark read/unread.
- Archive.

Recommended endpoints:

- `POST /contact-messages`
- `GET /admin/contact-messages`
- `GET /admin/contact-messages/{id}`
- `PATCH /admin/contact-messages/{id}/read`
- `PATCH /admin/contact-messages/{id}/archive`

### Users, Roles, Permissions

Required:

- Admin user listing/search/filter.
- User status management.
- Role assignment.
- Permission management.
- Permission checks for admin UI actions.

Recommended endpoints:

- `GET /admin/users`
- `GET /admin/users/{id}`
- `PATCH /admin/users/{id}/status`
- `PATCH /admin/users/{id}/roles`
- `GET /admin/roles`
- `POST /admin/roles`
- `PUT /admin/roles/{id}`
- `DELETE /admin/roles/{id}`
- `GET /admin/permissions`
- `PATCH /admin/roles/{id}/permissions`

### Settings, Navigation, Translations, Audit Logs

Required:

- Site settings: name, logo, contact email, phone, WhatsApp, socials, default language, default currency, support hours.
- Navigation menus by location.
- Translation key management if backend-managed translations are desired.
- Audit logs for admin changes.

Recommended endpoints:

- `GET /cms/settings`
- `GET /admin/settings`
- `PUT /admin/settings`
- `GET /admin/navigation`
- `POST /admin/navigation`
- `PUT /admin/navigation/{id}`
- `PATCH /admin/navigation/reorder`
- `GET /admin/translations`
- `PUT /admin/translations`
- `GET /admin/audit-logs`

## 17. API Response and Error Shape Recommendation

Use consistent response contracts.

Single object:

```json
{
  "data": {},
  "message": "optional message"
}
```

Paginated list:

```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "totalItems": 100,
    "totalPages": 5
  }
}
```

Error:

```json
{
  "status": 400,
  "code": "VALIDATION_ERROR",
  "message": "Validation failed",
  "errors": {
    "email": ["Email is required"]
  }
}
```

## 18. Frontend Implementation Priorities

Priority 1: make the app real-backend ready.

- Set `enableMockApi: false` for dev/prod when backend is ready.
- Add typed services: `CourseService`, `SpecialistService`, `BookingService`, `PaymentService`, `CmsService`, `ContactService`, `FaqService`, `ReviewService`, `UserService`, admin services.
- Replace component hardcoded arrays with service calls.
- Register missing routes, especially payment callback and admin modules.
- Wire Transloco or replace with a deliberate translation strategy.

Priority 2: complete revenue flows.

- Course checkout form.
- Purchase/order creation.
- Payment initiation.
- Payment return/status pages.
- User course access page.
- Protected lesson video playback.

Priority 3: complete consultation flow.

- Specialist detail.
- Availability API integration.
- Atomic slot booking.
- Booking confirmation.
- User bookings page.
- Admin booking management.

Priority 4: admin CMS and operations.

- Real admin layout with sidebar/topbar.
- Admin dashboard metrics.
- CRUD tables and forms.
- Media library.
- CMS homepage and legal page management.
- FAQ/reviews/contact messages.
- Users/roles/permissions.
- Audit logs.

Priority 5: polish and quality.

- Reusable UI components.
- Loading/empty/error states.
- Toasts/dialogs.
- Better icons.
- Responsive QA.
- Accessibility pass.
- Tests for services, guards, forms, payment, booking, and admin flows.

## 19. Known Gaps and Risks

- Production mock API is enabled.
- Transloco is installed but unused.
- Public content is mostly hardcoded.
- Admin portal is mostly placeholder.
- Checkout/payment flow is mostly placeholder.
- User area is mostly placeholder.
- Consultation booking uses static dates and slots.
- Payment callback route constant exists but route is missing.
- No automatic token refresh in interceptor.
- No reusable shared UI component library yet.
- No real media/video playback implementation.
- No CMS integration.
- No robust validation/error handling.
- No role/permission based action-level admin UI.
- Git status could not be inspected because this sandbox user is blocked by Git safe-directory ownership checks.

## 20. Ownership Notes for Future Development

When continuing this frontend project:

- Preserve Arabic-first and RTL-first behavior.
- Keep the official colors as the brand source of truth.
- Use backend/CMS data for business content instead of hardcoded arrays.
- Keep user-facing Arabic warm, professional, and natural.
- Avoid generic SaaS visual patterns; this is a motherhood education and care platform.
- Treat course videos and protected paid access as critical business infrastructure.
- Keep API contracts strongly typed and centralized.
- Prefer focused feature services over putting business logic inside components.
- Build reusable UI components only when they remove real duplication or enforce consistency.
- Before production deployment, disable mock APIs, remove mock copy from auth pages, and test the full payment and booking lifecycle.
