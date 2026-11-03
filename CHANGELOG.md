# Sagheri / صغيري — Project Changelog

All project changes, implementation decisions, and version history are recorded here.

---

## [Unreleased] — In Progress

### HTML Specialist Biographies (2026-11-04)

- Added backend seed 006 to upgrade both specialists' Arabic/English biography attributes to semantic HTML without changing already-applied seed 005.
- Question headings use the primary-dark brand color with a teal accent; benefits use readable lists and the personal statements use blockquotes.
- Added sanitized rich biography rendering and HTML-aware text previews for cards, preserving legacy plain-text support.
- Applied the seed to local PostgreSQL and refreshed the generated backup. Runtime content still comes from the backend API.
- Build passed, with the existing Home/Consultation SCSS budget warnings. All 23 FE and 22 BE tests passed.

### Permanent Backend Specialist Seed (2026-11-03)

- Added and registered backend Liquibase seed `005-specialist-document-profiles.sql` with the complete Arabic and English profiles for the two existing specialists.
- Applied the changeset to local PostgreSQL through Liquibase and verified it was recorded once. Later admin edits survive subsequent migration runs.
- Confirmed the public specialist API, envelope/raw snapshots, and FE proxy return the reviewed document content exactly.
- All 22 backend tests passed. Frontend browser verification loads the seeded response with the fallback JSON asset blocked.

### Specialist Profiles From Owner Document (2026-11-03)

- Published the introductions for Bayan Al-Qadamani and Walaa Al-Maghrabi through the existing local backend admin API, preserving specialist IDs and booking links.
- Added bilingual expertise and qualifications rendering, readable full biographies, and concise previews on home/listing cards.
- Added profile links to the homepage specialist section.
- Kept the reviewable document import under `docs/content`, separate from runtime content. No backend files were edited.
- Added normalization tests for bilingual/legacy data and paragraph-based biography previews.

### Global Account Navigation (2026-11-03)

- Moved public navigation to the root app shell so it remains available across public, authentication, customer, and admin routes.
- Added a Lucide profile icon with bilingual sign-in and registration links for guests.
- Signed-in navigation displays the returned full name, with support for older first/last-name profiles, plus account/profile links and logout.
- Logout uses the existing auth service to clear stored credentials and return home.
- Added the account control to responsive mobile navigation, reserved layout space globally, and constrained long names to avoid overflow.
- Added account tests covering registration state, name rendering, logout, Escape/focus handling, outside clicks, and English labels.

### Source of Truth Analysis (2026-04-25)

Analyzed all reference files in `/project_details`:

**Images analyzed:**
- `WhatsApp Image 2026-03-31 at 20.41.44.jpeg` — Homepage UI mockup showing layout, specialist cards, course cards, floating side nav, footer
- `WhatsApp Image 2026-03-31 at 20.41.44 (1).jpeg` — Official brand color palette ("لوحة ألوان تصميم صغيري")
- `WhatsApp Image 2026-04-01 at 15.07.31.jpeg` — User flow diagram: course purchase and consultation booking flows
- `WhatsApp Image 2026-04-05 at 14.51.04.jpeg` — UI components: specialist profile card, consultation booking UI, course detail card, FAQ accordion
- `ChatGPT Image Apr 5, 2026, 02_50_25 PM.png` — Additional UI component variations (warm beige palette variant)

**PDF:** `sagheri_website_wireframe (1).pdf` — Wireframe document (referenced for layout structure)

---

### Key Decisions from Source of Truth

#### Brand & Identity
- Brand: **صغيري / Sagheri**
- Tagline: **صغيري - طريقك لأمومة أوعى**
- Arabic-first, RTL-default platform
- Maternal education + specialist consultation platform for Middle East mothers

#### Confirmed Color Palette (from color palette image)
| Token | Hex | Usage |
|---|---|---|
| Background | `#FDFBF5` | Page background (creamy beige) |
| Primary | `#AD6F5F` | Course CTA buttons, main actions |
| Secondary / Teal | `#63A39E` | Consultation buttons |
| Text Dark | `#5D3F33` | Body text, headings |
| Muted | `#8A6D5E` | Nav icons, strip elements |

#### Navigation (from homepage image)
- Floating side nav on the right (RTL) with icons + labels
- Nav items: الرئيسية, الاستشارات, كورساتنا, عنا, تواصل
- Mobile bottom nav implied

#### Specialist Cards (from homepage image)
- Circular photo, name, title (e.g., IBCLC)
- Short bio
- Teal CTA: "احجز استشارة مع [name]"

#### Course Cards (from homepage image)
- Video thumbnail + play button overlay
- Title, description, duration (~90 min), price (150 JOD)
- Primary CTA: "اشترك الآن"

#### Consultation Booking UI (from UI components image)
- Specialist popup with bio and "احجز المزيد" CTA
- Consultation type selector: فيديو (video), مكالمة صوتية (audio), محادثة نصية (text)
- Date/time picker with calendar grid
- Price display per session

#### User Flows (from flowchart image)
- **Course Purchase:** Browse → Select course → Register form (name, phone+country, email, status: حامل/مرضع/تجهز للحمل) → Payment (card number, CVV, expiry) → Confirm
- **Consultation Booking:** Browse → Select specialist → Book form (name, phone+country, email, problem description, preferred time) → Confirm (no advance payment, specialist notified instantly)

#### FAQ (from UI components image)
- Accordion style
- Topics: breastfeeding, milk production, child nutrition, breastfeeding positions, etc.

#### Footer (from homepage image)
- Logo + tagline
- support@sagheri.com
- +962 XXXXXXXXX (Jordan)
- Social: X (Twitter), Twitter/Y, Instagram

---

## v0.1.0 — Project Foundation (2026-04-25)

### Added

#### Project Scaffold
- Angular 21.2.8 project via `ng new --standalone --strict --style scss --skip-git`
- TypeScript strict mode enabled
- Node 24.15.0 / npm 11.12.1

#### Dependencies
- `@angular/cdk` ^21.2.8 — overlay, portal, a11y
- `@jsverse/transloco` ^7.6.1 — Arabic/English i18n
- `date-fns` ^4.1.0 — date formatting and locale
- `@angular/common`, `@angular/forms`, `@angular/router` (core Angular)

#### Directory Structure
Full feature-based architecture created:
```
src/app/core/        — api, auth, config, constants, enums, guards, interceptors, layout, models, services, state, utils
src/app/shared/      — components, directives, pipes, validators, ui
src/app/features/    — public, auth, user, checkout, admin
src/assets/          — i18n, images, icons, illustrations, styles (abstracts/base/components/layout)
src/environments/    — environment.ts, environment.local.ts, environment.dev.ts, environment.prod.ts
docs/                — ui-ux-requirements-extraction.md
```

#### Design System (SCSS)
- `_tokens.scss` — CSS custom properties: colors, spacing, radius, shadow, layout
- `_mixins.scss` — breakpoints, RTL/LTR helpers, flex, truncation, focus ring, card base
- `_reset.scss` — modern CSS reset with RTL/LTR direction
- `_typography.scss` — Tajawal/Inter font scale, heading sizes
- `_buttons.scss` — primary, secondary, course, consultation, outline, ghost, sm, lg variants
- `_cards.scss` — `.sagheri-card` base styles
- `_forms.scss` — input, select, textarea, label, error styles
- `_admin.scss` — admin layout, sidebar, topbar, table, metric card

#### HTML / index.html
- `lang="ar" dir="rtl"` Arabic-first by default
- Tajawal + Cairo + Inter Google Fonts loaded with `font-display: swap`
- Arabic meta description

#### Environments
- `environment.ts` (local default)
- `environment.local.ts` — `http://localhost:8080/api/v1`
- `environment.dev.ts` — `https://dev-api.sagheri.com/api/v1`
- `environment.prod.ts` — `https://api.sagheri.com/api/v1`
- `angular.json` updated with `local`, `dev`, `production` build/serve configs

#### npm Scripts
```json
"start": "ng serve --configuration local"
"start:dev": "ng serve --configuration dev"
"build:local", "build:dev", "build:prod"
"lint", "test"
```

#### i18n Files
- `src/assets/i18n/ar.json` — complete Arabic translations (brand, navigation, hero, courses, specialists, consultation, checkout, form, validation, auth, user, payment, faq, contact, footer, status, admin, currency, common)
- `src/assets/i18n/en.json` — complete English translations, same structure

#### Core Layer
**Enums:** `PaymentStatus`, `BookingStatus`, `ConsultationType`, `UserRole`, `Language`, `Direction`, `Currency`

**Models:** `ApiResponse`, `ApiPaginatedResponse`, `ApiError`, `PaginationParams`, `LoginRequest`, `LoginResponse`, `RegisterRequest`, `UserProfile`, `Role`, `Permission`, `TokenPair`, `ForgotPasswordRequest`, `ResetPasswordRequest`, `Course`, `CourseLesson`, `CourseOutcome`, `CoursePurchase`, `Specialist`, `Specialty`, `ConsultationTypeItem`, `SpecialistAvailability`, `TimeSlot`, `ConsultationBooking`, `BookingRequest`, `Faq`, `Review`, `ContactMessage`, `ContactRequest`, `PaymentInitiationRequest`, `PaymentInitiationResponse`, `PaymentStatusResponse`, `CheckoutForm`, `CmsPage`, `CmsSection`, `SeoMeta`, `SiteSettings`, `SocialLinks`, `MediaAsset`, `PageMeta`, `UserListItem`

**Constants:** `API_ENDPOINTS` (all endpoints), `APP_ROUTES` (all route paths), `MIDDLE_EAST_COUNTRIES` + `ALL_COUNTRIES` with Arabic/English names and phone codes

**State Services:** `AuthStateService` (signals, JWT storage), `LanguageStateService` (signal + effect for dir/lang), `LayoutStateService` (mobile nav, admin sidebar)

**Services:** `ApiService` (HttpClient wrapper), `AuthService` (login/register/logout/refresh), `SeoService` (title + meta tags)

**Interceptors:** `authInterceptor` (Bearer token), `errorInterceptor` (401→login redirect, 403→home redirect)

**Guards:** `authGuard`, `guestGuard`, `adminGuard`

#### Routing
- Full lazy-loaded route tree for all 40+ pages
- Public, auth, user, admin route groups with appropriate guards
- `withComponentInputBinding()` + `withViewTransitions()`

#### Layout Components (shells)
- `PublicLayoutComponent` — wraps public pages with `<router-outlet>`
- `AuthLayoutComponent` — centered auth pages
- `UserLayoutComponent` — user area shell
- `AdminLayoutComponent` — admin area shell

#### Feature Component Stubs (30 components)
All routes have compilable stub components:
- Public: Home, CoursesList, CourseDetail, SpecialistsList, SpecialistProfile, ConsultationBooking, FAQ, Contact, About, Legal
- Auth: Login, Register, ForgotPassword, ResetPassword, VerifyAccount
- Checkout: CourseCheckout, PaymentSuccess, PaymentFailure, PaymentPending
- User: Dashboard, Profile, MyCourses, MyBookings, PaymentHistory
- Admin: Dashboard, Courses, Specialists, Bookings, Users, Settings

#### Deployment
- `Dockerfile` — multi-stage (Node 20 build + Nginx 1.27 serve)
- `nginx.conf` — SPA routing + gzip + static asset caching (30d)
- `.dockerignore` — excludes node_modules, dist, .git, project_details

#### Documentation
- `docs/ui-ux-requirements-extraction.md` — full extraction from source images: colors, typography, navigation, screens list, component specs, user flows, form specs, footer structure, Arabic content corrections

### Build Status
✅ `ng build --configuration local` — **PASSES**, 0 errors
- Initial bundle: 1.38 MB (unoptimized local build)
- 30+ lazy-loaded route chunks generated
- Styles: 10.85 kB CSS

---

## Planned: v0.2.0 — Public Homepage & Core UI Components

- Full `PublicLayoutComponent` with floating side nav + header + footer
- `HomeComponent` — hero, specialists preview, courses preview, reviews, FAQ, contact CTA
- `CourseCardComponent`, `SpecialistCardComponent`, `FaqAccordionComponent`
- Shared UI: `UiButtonComponent`, `UiInputComponent`, `UiSelectComponent`, `UiSpinnerComponent`, `UiSkeletonComponent`
- Mock data for courses, specialists, FAQ, reviews

---

*Maintained by AI agent. Each session appends a new version entry.*
