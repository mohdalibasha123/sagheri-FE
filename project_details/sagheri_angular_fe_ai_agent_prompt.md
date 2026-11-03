# Sagheri / صغيري — Angular Frontend AI Agent Prompt

Copy this entire prompt and give it to your AI coding agent together with the attached UI images, flowcharts, and wireframe documents.

---

## Role

You are a **Senior Frontend Software Engineer with 15+ years of experience** in enterprise Angular, UI/UX architecture, design systems, Arabic/English localization, accessibility, performance optimization, clean code, scalable frontend architecture, CMS-driven websites, admin portals, and production deployment.

Your task is to do the same analysis and UI/UX extraction that was previously done from the Sagheri attached images and documents, but this time the scope is **Frontend only**.

You must analyze the attached images, mockups, UI references, flowcharts, and documents, then extract the complete frontend requirements and build a full **Angular** frontend project.

The backend will be provided separately and will expose complete APIs to control:
- CMS content
- Courses
- Specialists
- Consultations
- Users
- Roles
- Permissions
- Payments
- Admin portal data

Your work must focus only on the Angular frontend, but the frontend must be designed to integrate cleanly with these backend APIs.

---

# 1. Project Overview

Project name:

**صغيري / Sagheri**

Sagheri is an Arabic-first maternal education and consultation platform for mothers in the Middle East.

The platform provides:
1. Maternal education courses.
2. Course purchase flow.
3. Payment-ready checkout flow.
4. Specialist consultation booking.
5. User authentication screens.
6. User profile area.
7. Admin portal for CMS and operational management.
8. Arabic/English support.
9. RTL-first layout with future LTR support.
10. Middle East-ready UX, localization, phone numbers, currency, and payment flow.

The frontend must visually match the attached images:
- Soft cream/beige backgrounds.
- Warm earthy brand colors.
- Rounded cards.
- Gentle shadows.
- Calm motherhood identity.
- Arabic RTL layout.
- Floating side navigation.
- Course cards with video thumbnails.
- Specialist cards with profile images.
- FAQ accordion.
- Contact section.
- Checkout and booking forms.
- Elegant, trustworthy, medical/educational feel.

This must not be a simple demo. Build a production-ready frontend foundation.

---

# 2. First Step Before Coding: UI/UX & Requirement Extraction

Before implementing code, analyze all attached images and documents and create this file inside the Angular project:

```txt
/docs/ui-ux-requirements-extraction.md
```

This file must document all frontend findings clearly.

## 2.1 Extract All Screens

Identify and document every screen/page implied by the images, documents, and expected user journeys.

At minimum include:

### Public Website
- Homepage
- Courses listing page
- Course detail page
- Course checkout page
- Payment success page
- Payment failure page
- Payment pending page
- Specialists listing page
- Specialist profile page
- Consultation booking page
- FAQ page
- Contact page
- About page
- Terms and conditions page
- Privacy policy page
- Refund policy page

### Authentication
- Login page
- Register page
- Forgot password page
- Reset password page
- Email verification / OTP placeholder page if needed

### User Area
- User dashboard
- User profile
- My courses
- My course details / access page placeholder
- My consultation bookings
- Booking details
- Payment history

### Admin Portal
- Admin login
- Admin dashboard
- Admin CMS homepage content management
- Admin courses management
- Admin course lessons management
- Admin specialists management
- Admin consultation types management
- Admin specialist availability management
- Admin consultation bookings management
- Admin course purchases management
- Admin FAQ management
- Admin reviews/testimonials management
- Admin contact messages management
- Admin users management
- Admin roles management
- Admin permissions management
- Admin media library
- Admin menus/navigation management
- Admin website settings
- Admin localization/translations management
- Admin audit logs page placeholder

## 2.2 Extract Visual Requirements

From the images and documents, extract and document:

- Brand colors.
- Typography.
- Font sizes.
- Spacing.
- Border radius.
- Shadow style.
- Card style.
- Button style.
- Input style.
- Select/dropdown style.
- Radio/checkbox style.
- Form validation style.
- Icon style.
- Illustration style.
- Section layout patterns.
- Navigation behavior.
- Desktop layout.
- Tablet layout.
- Mobile layout.
- RTL behavior.
- LTR behavior for English.
- Loading states.
- Skeleton states.
- Empty states.
- Error states.
- Success states.
- Warning states.
- Disabled states.
- Hover states.
- Focus-visible states.
- Admin table style.
- Admin form style.
- Admin dialog style.

## 2.3 Extract User Flows

Document frontend flows in `/docs/ui-ux-requirements-extraction.md`.

Required flows:

### Course Purchase Flow
1. User opens homepage.
2. User views courses.
3. User opens course detail page.
4. User clicks subscribe/buy.
5. User fills checkout form.
6. User reviews order summary.
7. User starts payment.
8. User is redirected to payment provider or embedded payment page.
9. User returns to payment success/failure/pending page.
10. Frontend checks payment status through API.
11. User sees final confirmation.

### Consultation Booking Flow
1. User opens specialist list.
2. User opens specialist profile.
3. User chooses consultation type.
4. User chooses date.
5. User chooses available time slot.
6. User fills booking form.
7. User submits booking.
8. Frontend shows pending confirmation success message.
9. User can view booking from profile area.

### Auth Flow
1. User registers.
2. User logs in.
3. Frontend stores authentication state.
4. Frontend applies route guards.
5. User accesses profile, purchases, and bookings.
6. Admin accesses admin portal based on role/permission.

### Admin CMS Flow
1. Admin logs in.
2. Admin views dashboard.
3. Admin manages homepage content.
4. Admin manages courses, specialists, FAQ, reviews, and settings.
5. Admin uploads or selects media.
6. Admin saves changes through backend APIs.
7. Public website reflects CMS updates.

## 2.4 Extract Reusable Components

Identify reusable components from the images and required flows.

At minimum include:

### Layout Components
- PublicLayoutComponent
- AdminLayoutComponent
- AuthLayoutComponent
- UserLayoutComponent
- HeaderComponent
- FooterComponent
- FloatingSideNavComponent
- MobileBottomNavComponent
- MobileDrawerComponent
- BreadcrumbComponent

### Public UI Components
- HeroSectionComponent
- SectionHeaderComponent
- CourseCardComponent
- CourseDetailComponent
- VideoThumbnailComponent
- PlayOverlayComponent
- LessonAccordionComponent
- SpecialistCardComponent
- SpecialistProfileCardComponent
- ConsultationTypeSelectorComponent
- AvailabilityCalendarComponent
- TimeSlotPickerComponent
- BookingSummaryComponent
- CheckoutSummaryComponent
- FaqAccordionComponent
- ReviewCardComponent
- ContactFormComponent
- PriceDisplayComponent
- RatingDisplayComponent

### Shared UI Components
- UiButtonComponent
- UiCardComponent
- UiInputComponent
- UiTextareaComponent
- UiSelectComponent
- UiPhoneInputComponent
- UiCountrySelectComponent
- UiDatePickerComponent
- UiModalComponent
- UiConfirmDialogComponent
- UiToastComponent
- UiBadgeComponent
- UiStatusBadgeComponent
- UiSpinnerComponent
- UiSkeletonComponent
- UiEmptyStateComponent
- UiErrorStateComponent
- UiPaginationComponent

### Admin Components
- AdminPageHeaderComponent
- AdminDataTableComponent
- AdminFiltersComponent
- AdminSearchComponent
- AdminActionMenuComponent
- AdminFormDialogComponent
- AdminDeleteConfirmDialogComponent
- AdminStatusBadgeComponent
- AdminMetricCardComponent
- AdminMediaPickerComponent
- AdminRichTextEditorComponent
- AdminTranslationTabsComponent

## 2.5 Arabic Content Correction

The Arabic text in the attached generated images may include spelling mistakes or unnatural AI wording.

You must:
- Extract the intended meaning.
- Rewrite the Arabic correctly.
- Make Arabic professional, warm, and natural.
- Support mothers and maternal education context.
- Avoid broken Arabic.
- Avoid mixed RTL/LTR layout issues.
- Provide Arabic and English copy where needed.

Create corrected content in:

```txt
/src/assets/i18n/ar.json
/src/assets/i18n/en.json
```

---

# 3. Brand Identity

## 3.1 Brand Name

Arabic:

```txt
صغيري
```

English:

```txt
Sagheri
```

## 3.2 Tagline

Arabic:

```txt
صغيري - طريقك لأمومة أوعى
```

English:

```txt
Sagheri - Your path to more conscious motherhood
```

## 3.3 Brand Description

Arabic:

```txt
منصة عربية تساعد الأمهات على فهم الحمل، الرضاعة، تغذية الطفل، ورعاية ما بعد الولادة بطريقة علمية مبسطة.
```

English:

```txt
An Arabic platform that helps mothers understand pregnancy, breastfeeding, child nutrition, and postpartum care in a simple, evidence-based way.
```

## 3.4 Brand Personality

The UI must feel:
- Warm
- Calm
- Mother-focused
- Trustworthy
- Feminine
- Premium
- Educational
- Professional
- Medical but friendly
- Middle East appropriate
- Arabic-first
- Soft and elegant

Avoid:
- Generic SaaS design
- Harsh colors
- Cold medical/hospital feel
- Childish visuals
- Crowded layouts
- Sharp cards
- Broken Arabic spacing
- Poor RTL support

---

# 4. Arabic & English Localization

The project must support both:

- Arabic: default language, RTL.
- English: secondary language, LTR.

Use a clean i18n approach.

Recommended:
- Transloco or ngx-translate.
- Translation files under `src/assets/i18n`.

Files:

```txt
src/assets/i18n/ar.json
src/assets/i18n/en.json
```

Requirements:
- Arabic is default.
- Direction changes based on selected language.
- HTML `dir` attribute must update dynamically.
- Layout must work in RTL and LTR.
- Use logical CSS properties where possible.
- Avoid hardcoded Arabic strings inside components.
- All user-facing labels must come from translations unless CMS-driven.
- Admin portal also supports Arabic and English labels.

Example keys:

```json
{
  "brand": {
    "name": "صغيري",
    "tagline": "طريقك لأمومة أوعى"
  },
  "navigation": {
    "home": "الرئيسية",
    "courses": "الكورسات",
    "consultations": "الاستشارات",
    "faq": "الأسئلة الشائعة",
    "contact": "تواصل معنا"
  }
}
```

---

# 5. Design System

Create a design system using SCSS tokens and reusable UI components.

## 5.1 Color Tokens

Use these CSS variables:

```scss
:root {
  --sagheri-bg: #FDFBF5;
  --sagheri-card: #FFF8EE;
  --sagheri-primary: #AD6F5F;
  --sagheri-primary-dark: #8F5647;
  --sagheri-primary-light: #D69A73;
  --sagheri-secondary: #63A39E;
  --sagheri-secondary-dark: #477C78;
  --sagheri-text: #5D3F33;
  --sagheri-muted: #8A6D5E;
  --sagheri-border: #E5D6C8;
  --sagheri-gold: #B68A4A;
  --sagheri-success: #1F5F0F;
  --sagheri-course: #006B5C;
  --sagheri-consultation: #8B2F16;
  --sagheri-dark-block: #3F403B;
  --sagheri-danger: #B3261E;
  --sagheri-warning: #C77B00;
  --sagheri-info: #2F6F9F;
  --sagheri-white: #FFFFFF;
  --sagheri-black: #1E1E1E;
}
```

## 5.2 Spacing Tokens

```scss
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
}
```

## 5.3 Radius Tokens

```scss
:root {
  --radius-xs: 6px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 18px;
  --radius-xl: 24px;
  --radius-2xl: 32px;
  --radius-pill: 999px;
}
```

## 5.4 Shadow Tokens

```scss
:root {
  --shadow-soft: 0 12px 30px rgba(93, 63, 51, 0.12);
  --shadow-card: 0 8px 24px rgba(93, 63, 51, 0.10);
  --shadow-button: 0 4px 12px rgba(173, 111, 95, 0.30);
  --shadow-modal: 0 24px 60px rgba(93, 63, 51, 0.22);
}
```

## 5.5 Layout Tokens

```scss
:root {
  --container-max: 1180px;
  --admin-sidebar-width: 280px;
  --header-height: 72px;
  --mobile-bottom-nav-height: 72px;
}
```

---

# 6. Typography

Use Arabic-friendly fonts.

Recommended:
- Arabic: Tajawal
- Arabic fallback: Cairo
- English fallback: Inter or system-ui
- Optional elegant heading accent: Playfair Display

Requirements:
- Use `font-display: swap`.
- Arabic must render correctly.
- Use responsive font sizes.
- Maintain readable line-height.

Suggested typography:

```scss
body {
  font-family: 'Tajawal', 'Cairo', system-ui, sans-serif;
  background: var(--sagheri-bg);
  color: var(--sagheri-text);
  margin: 0;
}

html[dir='rtl'] body {
  direction: rtl;
}

html[dir='ltr'] body {
  direction: ltr;
}
```

Heading sizes:
- H1: 40px desktop, 30px mobile.
- H2: 32px desktop, 26px mobile.
- H3: 24px desktop, 20px mobile.
- Body: 16px.
- Small: 14px.
- Caption: 12px.

---

# 7. Angular Technology Stack

Use:
- Angular latest stable version.
- TypeScript strict mode.
- Standalone components preferred.
- Angular Router.
- Angular Reactive Forms.
- Angular HttpClient.
- Angular Signals where useful.
- RxJS best practices.
- SCSS.
- Angular CDK where useful.
- Transloco or ngx-translate for i18n.
- ESLint.
- Prettier.
- Docker.
- Nginx production deployment.

Avoid heavy UI libraries unless absolutely needed. The UI must be custom and match the attached images.

Allowed helper libraries:
- Angular CDK
- Transloco or ngx-translate
- date-fns or Day.js
- lucide-angular or custom SVG icons
- A lightweight rich text editor for admin CMS if needed

---

# 8. Angular Architecture

Use a scalable feature-based architecture.

Recommended structure:

```txt
src/
  app/
    core/
      api/
      auth/
      config/
      constants/
      enums/
      guards/
      interceptors/
      layout/
      models/
      services/
      state/
      utils/
    shared/
      components/
      directives/
      pipes/
      validators/
      ui/
    features/
      public/
        home/
        courses/
        consultations/
        faq/
        contact/
        about/
        legal/
      auth/
        login/
        register/
        forgot-password/
        reset-password/
        verify-account/
      user/
        dashboard/
        profile/
        my-courses/
        my-bookings/
        payment-history/
      checkout/
        course-checkout/
        payment-success/
        payment-failure/
        payment-pending/
      admin/
        dashboard/
        courses/
        lessons/
        specialists/
        consultation-types/
        availability/
        bookings/
        purchases/
        faq/
        reviews/
        contact-messages/
        users/
        roles/
        permissions/
        cms-pages/
        media-library/
        navigation/
        translations/
        settings/
        audit-logs/
    assets/
      images/
      icons/
      illustrations/
      i18n/
      styles/
        abstracts/
        base/
        components/
        layout/
        pages/
        themes/
  environments/
    environment.ts
    environment.local.ts
    environment.dev.ts
    environment.prod.ts
```

---

# 9. Naming Conventions

Follow these naming rules strictly.

## 9.1 Files

Use kebab-case:

```txt
course-card.component.ts
course-card.component.html
course-card.component.scss
course.service.ts
course.model.ts
booking-form.component.ts
payment-status.enum.ts
```

## 9.2 Components

Use PascalCase:

```ts
CourseCardComponent
ConsultationBookingComponent
AdminDataTableComponent
```

## 9.3 Services

Use descriptive names:

```ts
CourseService
SpecialistService
BookingService
PaymentService
CmsService
AdminCourseService
```

## 9.4 Interfaces

Do not prefix with `I`.

Correct:

```ts
export interface Course {
  id: string;
  titleAr: string;
}
```

Avoid:

```ts
export interface ICourse {}
```

## 9.5 Enums

Use PascalCase enum names and backend-compatible values.

```ts
export enum PaymentStatus {
  PENDING = 'PENDING',
  INITIATED = 'INITIATED',
  PAID = 'PAID',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
  REFUNDED = 'REFUNDED'
}
```

## 9.6 Observables

Suffix observable streams with `$`.

```ts
courses$ = this.courseService.getCourses();
loading$ = this.loadingService.loading$;
```

## 9.7 Private Members

Use `private readonly`.

```ts
private readonly http = inject(HttpClient);
private readonly router = inject(Router);
```

## 9.8 Methods

Use action-based names:

```ts
loadCourses()
submitBooking()
selectTimeSlot()
initiatePayment()
handlePaymentCallback()
openDeleteDialog()
```

Avoid vague names:
- doStuff()
- handleData()
- process()
- test()
- temp()

---

# 10. Clean Code Requirements

Apply:
- DRY.
- SOLID.
- Separation of concerns.
- Reusable components.
- Strong typing.
- Centralized API endpoints.
- Centralized route constants.
- Centralized validation messages.
- Centralized error handling.
- Centralized i18n.
- No duplicated form validation logic.
- No magic numbers.
- No hardcoded user-facing text in components.
- No business logic in templates.
- No direct DOM manipulation unless needed.
- No unnecessary subscriptions.
- No nested subscriptions.
- No `any` unless strongly justified.
- No massive components.
- No unstructured SCSS.

Use:
- Reactive Forms.
- `takeUntilDestroyed()`.
- `async` pipe.
- Signals for local state where useful.
- Route-level lazy loading.
- HTTP interceptors.
- Guards.
- Resolvers only where useful.
- OnPush change detection where practical.

---

# 11. Public Website Requirements

## 11.1 Homepage

Sections:
1. Hero.
2. Specialists preview.
3. Courses preview.
4. Reviews.
5. FAQ preview.
6. Contact CTA.
7. Footer.

Hero Arabic title:

```txt
صغيري - رحلتك الواعية في الأمومة
```

Hero Arabic subtitle:

```txt
تعلمي، اسألي، واطمئني مع مختصات يساعدنك في الحمل، الرضاعة، تغذية الطفل، ورعاية ما بعد الولادة بخطوات واضحة ومبسطة.
```

Hero English title:

```txt
Sagheri - Your conscious motherhood journey
```

Hero English subtitle:

```txt
Learn, ask, and feel reassured with specialists who support you through pregnancy, breastfeeding, child nutrition, and postpartum care.
```

CTA buttons:
- اشتركي في الكورسات
- احجزي استشارة مع أخصائية

English:
- Explore Courses
- Book a Consultation

## 11.2 Courses Page

Show courses in responsive card grid.

Each card includes:
- Thumbnail.
- Play icon overlay.
- Course title.
- Description.
- Duration.
- Lessons count.
- Price.
- Rating.
- CTA: اشتركي الآن / Subscribe Now.
- Link: عرض محتوى الكورس / View Course Content.

## 11.3 Course Detail Page

Include:
- Video preview area.
- Course title.
- Description.
- Learning outcomes.
- Lessons accordion.
- Duration.
- Number of lessons.
- Price.
- Rating.
- Main CTA.
- Related courses.

## 11.4 Course Checkout Page

Fields:
- First name.
- Last name.
- Phone country code.
- Phone number.
- Country.
- Email.
- Mother status:
  - Pregnant
  - Breastfeeding
  - Planning pregnancy
  - Other

Include:
- Order summary.
- Course price.
- Discount placeholder.
- Tax/VAT placeholder.
- Total.
- Payment method area.
- Pay button.

## 11.5 Specialists Page

Show specialist cards with:
- Image.
- Name.
- Title.
- Bio summary.
- Specialty tags.
- Consultation types.
- CTA: احجزي استشارة / Book Consultation.

## 11.6 Specialist Profile Page

Include:
- Image.
- Name.
- Title.
- Full bio.
- Specialties.
- Consultation types.
- Availability preview.
- CTA to booking.

## 11.7 Consultation Booking Page

Use a clear split layout:
- Specialist details.
- Consultation type selector.
- Date selector.
- Time slot selector.
- Booking form.
- Booking summary.
- Submit button.

Fields:
- First name.
- Last name.
- Phone country code.
- Phone number.
- Country.
- Email.
- Problem description.
- Preferred contact time.

Success message Arabic:

```txt
تم إرسال طلب الحجز بنجاح. سيتم التواصل معكِ لتأكيد الموعد.
```

English:

```txt
Your booking request has been submitted successfully. We will contact you to confirm the appointment.
```

## 11.8 FAQ Page

Use accordion UI.

## 11.9 Contact Page

Fields:
- Name.
- Email.
- Phone.
- Message.

---

# 12. Authentication & Authorization Frontend

The backend will provide APIs for users, roles, and permissions.

Create frontend support for:

## 12.1 Auth Pages
- Login.
- Register.
- Forgot password.
- Reset password.
- Verify account placeholder.

## 12.2 Auth Service

Create:

```ts
AuthService
```

Methods:
- login()
- register()
- logout()
- refreshToken()
- getCurrentUser()
- isAuthenticated()
- hasRole()
- hasPermission()

## 12.3 Auth Models

Create models:
- LoginRequest
- LoginResponse
- RegisterRequest
- UserProfile
- Role
- Permission
- TokenPair

## 12.4 Route Guards

Create:
- authGuard
- guestGuard
- adminGuard
- roleGuard
- permissionGuard

## 12.5 Roles

Prepare for:

```ts
export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SPECIALIST = 'SPECIALIST',
  CONTENT_MANAGER = 'CONTENT_MANAGER'
}
```

## 12.6 Permissions

Examples:
- CMS_VIEW
- CMS_EDIT
- COURSE_VIEW
- COURSE_CREATE
- COURSE_UPDATE
- COURSE_DELETE
- BOOKING_VIEW
- BOOKING_UPDATE
- USER_VIEW
- USER_UPDATE
- ROLE_MANAGE
- PAYMENT_VIEW

Use permission-based rendering for admin actions.

---

# 13. Admin Portal Requirements

Build a complete frontend foundation for the admin portal.

Admin route:

```txt
/admin
```

The admin portal must be separate from the public site layout.

## 13.1 Admin Layout

Include:
- Sidebar.
- Top bar.
- Breadcrumbs.
- User menu.
- Language switcher.
- Notifications placeholder.
- Main content area.
- Responsive mobile drawer.

Admin navigation:
- Dashboard
- CMS Homepage
- Courses
- Lessons
- Specialists
- Consultation Types
- Availability
- Bookings
- Purchases
- FAQ
- Reviews
- Contact Messages
- Users
- Roles
- Permissions
- Media Library
- Navigation Menus
- Translations
- Site Settings
- Audit Logs

Arabic labels:
- لوحة التحكم
- محتوى الصفحة الرئيسية
- الكورسات
- الدروس
- الأخصائيات
- أنواع الاستشارات
- المواعيد المتاحة
- الحجوزات
- طلبات الشراء
- الأسئلة الشائعة
- آراء الأمهات
- رسائل التواصل
- المستخدمون
- الأدوار
- الصلاحيات
- مكتبة الوسائط
- قوائم التنقل
- الترجمات
- إعدادات الموقع
- سجل العمليات

## 13.2 Admin Dashboard

Show metric cards:
- Total courses.
- Active courses.
- New bookings.
- Pending purchases.
- Paid purchases.
- New messages.
- Total users.
- Total revenue placeholder.

Show:
- Recent bookings table.
- Recent purchases table.
- Recent messages table.

## 13.3 Admin CRUD Pages

Create UI foundation for:

### Courses
- List.
- Search.
- Filter by status.
- Create.
- Edit.
- Delete.
- Activate/deactivate.
- Upload/select thumbnail.
- Manage course translations.

### Lessons
- List by course.
- Create.
- Edit.
- Delete.
- Reorder.
- Preview flag.
- Video URL field.

### Specialists
- List.
- Create.
- Edit.
- Delete.
- Activate/deactivate.
- Manage profile image.
- Manage specialties.
- Manage translations.

### Consultation Types
- List.
- Create.
- Edit.
- Delete.
- Duration.
- Price.
- Status.

### Availability
- Calendar view.
- Table view.
- Add time slot.
- Remove time slot.
- Prevent duplicate slot visually.

### Bookings
- List.
- Search.
- Filter by status.
- View details.
- Change status.
- Export placeholder.

### Purchases
- List.
- Search.
- Filter by payment status.
- View details.
- Payment reference.
- Refund placeholder if backend supports later.

### FAQ
- List.
- Create.
- Edit.
- Delete.
- Reorder.
- Activate/deactivate.
- Arabic/English tabs.

### Reviews
- List.
- Create.
- Edit.
- Delete.
- Reorder.
- Activate/deactivate.

### Contact Messages
- List.
- View details.
- Mark as read.
- Archive.

### Users
- List.
- Search.
- Filter.
- View profile.
- Change status.
- Assign roles placeholder.

### Roles & Permissions
- Roles table.
- Permissions matrix.
- Assign/remove permissions UI.

### CMS Pages
- Homepage hero.
- Homepage sections.
- Footer content.
- About page.
- Legal pages.
- CTA labels.
- SEO metadata fields.

### Media Library
- Upload placeholder.
- Grid/list view.
- Search.
- Select media.
- Copy URL.
- Delete placeholder.

### Settings
- Site name.
- Contact email.
- Contact phone.
- Social links.
- Default currency.
- Default language.
- Payment settings display placeholder.

## 13.4 Admin Reusable Components

Create:
- AdminDataTableComponent.
- AdminPageHeaderComponent.
- AdminFiltersComponent.
- AdminActionMenuComponent.
- AdminFormDialogComponent.
- AdminDeleteConfirmDialogComponent.
- AdminStatusBadgeComponent.
- AdminPaginationComponent.
- AdminMetricCardComponent.
- AdminEmptyStateComponent.
- AdminLoadingStateComponent.
- AdminPermissionDirective.

Admin tables must support:
- Loading.
- Empty state.
- Pagination.
- Sorting placeholder.
- Filters.
- Row actions.
- Permission-based actions.

---

# 14. CMS-Driven Frontend

Avoid hardcoding content that should be controlled by admin CMS.

CMS-controlled content includes:
- Hero title.
- Hero subtitle.
- Hero image.
- CTA labels.
- Homepage sections.
- Courses.
- Specialists.
- FAQ.
- Reviews.
- Contact info.
- Footer links.
- Social media links.
- Legal pages.
- SEO metadata.
- Navigation menus.
- Site settings.

Create service layer:
- CmsService
- CourseService
- SpecialistService
- ConsultationService
- BookingService
- PaymentService
- ContactService
- ReviewService
- FaqService
- UserService
- AdminCmsService
- AdminCourseService
- AdminUserService
- AdminRoleService
- AdminPermissionService

If backend APIs are not ready, create mock data under:

```txt
src/app/core/mock-data/
```

But all services must be designed so switching from mock data to real APIs is easy.

---

# 15. Payment Frontend Requirements

Payment integration is in project scope.

The frontend must be payment-ready.

## 15.1 Supported Future Providers

Prepare architecture for:
- Stripe
- HyperPay
- PayTabs
- MyFatoorah
- Tap Payments
- Checkout.com

## 15.2 Payment Flow

1. User starts course checkout.
2. Frontend validates form.
3. Frontend creates purchase/order through API.
4. Frontend calls payment initiation API.
5. Backend returns:
   - redirectUrl, or
   - checkoutSessionId, or
   - embedded payment configuration.
6. Frontend redirects user or opens payment component.
7. User returns to success/failure/pending page.
8. Frontend calls payment status API.
9. Frontend displays final result.

## 15.3 Payment Routes

Create:
- `/checkout/course/:courseId`
- `/payment/success`
- `/payment/failure`
- `/payment/pending`
- `/payment/callback`

## 15.4 Payment Models

Create:
- PaymentInitiationRequest
- PaymentInitiationResponse
- PaymentStatusResponse
- PaymentProvider
- PaymentStatus

```ts
export enum PaymentStatus {
  PENDING = 'PENDING',
  INITIATED = 'INITIATED',
  PAID = 'PAID',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
  REFUNDED = 'REFUNDED'
}
```

## 15.5 Payment UI States

Show Arabic/English messages for:
- Loading payment session.
- Redirecting to payment provider.
- Payment success.
- Payment failure.
- Payment pending.
- Payment cancelled.
- Retry payment.
- Contact support.

Arabic examples:
- جاري تجهيز عملية الدفع...
- سيتم تحويلك إلى صفحة الدفع الآمنة.
- تم الدفع بنجاح.
- فشلت عملية الدفع، يرجى المحاولة مرة أخرى.
- عملية الدفع قيد المعالجة.
- الرجوع إلى الكورسات.
- التواصل مع الدعم.

---

# 16. Middle East Readiness

The website will be active in the Middle East.

Frontend must support:

## 16.1 RTL First
- Arabic is default.
- Use `dir="rtl"` by default.
- Use logical CSS properties.
- Avoid fixed left/right unless needed.
- Test all components in RTL.

## 16.2 LTR Support
- English must be supported.
- Layout direction must switch to LTR.
- Navigation and icons should remain visually correct.

## 16.3 Country & Phone Codes

Create country and phone code selector with Middle East countries first:

- الأردن +962
- قطر +974
- السعودية +966
- الإمارات +971
- الكويت +965
- البحرين +973
- عُمان +968
- فلسطين +970
- لبنان +961
- مصر +20
- العراق +964

## 16.4 Currency Display

Support:
- JOD
- QAR
- SAR
- AED
- KWD
- BHD
- OMR
- USD

Default currency from design/content:

```txt
JOD
```

Arabic display example:

```txt
150 دينار أردني
```

English display example:

```txt
JOD 150
```

## 16.5 Date & Time
- Localized Arabic dates.
- English dates when English is selected.
- Clear time slot formatting.
- Timezone-ready.
- Avoid ambiguous date formats.
- Support 24-hour format.

---

# 17. API Integration Design

The backend will provide complete APIs.

Create API endpoint constants:

```ts
export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    refresh: '/auth/refresh',
    me: '/auth/me'
  },
  courses: {
    list: '/courses',
    detail: (idOrSlug: string) => `/courses/${idOrSlug}`,
    purchase: (id: string) => `/courses/${id}/purchase`
  },
  specialists: {
    list: '/specialists',
    detail: (id: string) => `/specialists/${id}`,
    availability: (id: string) => `/specialists/${id}/availability`
  },
  bookings: {
    create: '/consultation-bookings',
    detail: (id: string) => `/consultation-bookings/${id}`
  },
  payments: {
    initiate: '/payments/initiate',
    status: (reference: string) => `/payments/${reference}`
  },
  admin: {
    dashboard: '/admin/dashboard'
  }
};
```

Use:
- ApiService wrapper around HttpClient.
- AuthInterceptor for token.
- ErrorInterceptor.
- Loading interceptor if useful.
- Retry only where safe.
- Proper error models.

---

# 18. Environment Profiles

Create these environment files:

```txt
src/environments/environment.ts
src/environments/environment.local.ts
src/environments/environment.dev.ts
src/environments/environment.prod.ts
```

## 18.1 Local

```ts
export const environment = {
  production: false,
  profile: 'local',
  apiBaseUrl: 'http://localhost:8080/api/v1',
  paymentReturnBaseUrl: 'http://localhost:4200',
  enableMockApi: false,
  enableDebugLogs: true,
  defaultLanguage: 'ar',
  defaultDirection: 'rtl'
};
```

## 18.2 Dev

```ts
export const environment = {
  production: false,
  profile: 'dev',
  apiBaseUrl: 'https://dev-api.sagheri.com/api/v1',
  paymentReturnBaseUrl: 'https://dev.sagheri.com',
  enableMockApi: false,
  enableDebugLogs: true,
  defaultLanguage: 'ar',
  defaultDirection: 'rtl'
};
```

## 18.3 Prod

```ts
export const environment = {
  production: true,
  profile: 'prod',
  apiBaseUrl: 'https://api.sagheri.com/api/v1',
  paymentReturnBaseUrl: 'https://sagheri.com',
  enableMockApi: false,
  enableDebugLogs: false,
  defaultLanguage: 'ar',
  defaultDirection: 'rtl'
};
```

Configure Angular build configurations for:
- local
- dev
- production

Add npm scripts:

```json
{
  "start": "ng serve --configuration local",
  "start:dev": "ng serve --configuration dev",
  "build:local": "ng build --configuration local",
  "build:dev": "ng build --configuration dev",
  "build:prod": "ng build --configuration production",
  "lint": "ng lint",
  "test": "ng test"
}
```

---

# 19. Docker Deployment Build

Add Docker support for production deployment.

## 19.1 Dockerfile

Create:

```dockerfile
# Stage 1: Build Angular app
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build:prod

# Stage 2: Serve with Nginx
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/ /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

Adjust the `COPY --from=build` path based on the actual Angular output folder name.

## 19.2 Nginx Config

Create:

```txt
nginx.conf
```

Content:

```nginx
server {
  listen 80;
  server_name _;

  root /usr/share/nginx/html;
  index index.html;

  gzip on;
  gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss image/svg+xml;

  location / {
    try_files $uri $uri/ /index.html;
  }

  location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|webp|woff|woff2)$ {
    expires 30d;
    add_header Cache-Control "public, max-age=2592000";
    try_files $uri =404;
  }
}
```

## 19.3 Docker Ignore

Create `.dockerignore`:

```txt
node_modules
dist
.angular
.git
.gitignore
Dockerfile
README.md
npm-debug.log
coverage
.vscode
.idea
```

## 19.4 Docker Build Commands

Document in README:

```bash
docker build -t sagheri-frontend .
docker run -p 8080:80 sagheri-frontend
```

---

# 20. Accessibility Requirements

Implement:
- Semantic HTML.
- Proper heading hierarchy.
- Keyboard navigation.
- Visible focus states.
- ARIA only where needed.
- Alt text for images.
- Form labels associated with inputs.
- Error messages connected to fields.
- Color contrast compliance.
- Minimum touch target size 44px.
- Support reduced motion preference.

---

# 21. Performance Requirements

Implement:
- Lazy-loaded routes.
- Optimized images.
- Responsive images if possible.
- Avoid large unused libraries.
- Use trackBy in loops.
- Use OnPush where practical.
- Use skeleton loaders.
- Keep initial bundle small.
- Preload important assets carefully.
- Avoid unnecessary change detection.
- Use pure pipes where useful.

---

# 22. SEO Requirements

For public pages:
- Dynamic page title.
- Meta description.
- Open Graph placeholders.
- Arabic/English metadata.
- Clean URLs.
- Semantic headings.
- Image alt text.
- Sitemap placeholder route/design not required but prepare SEO service.

Create:
- SeoService
- PageMeta model

---

# 23. Form Validation

Use Reactive Forms.

Centralize validation messages.

Arabic examples:
- هذا الحقل مطلوب
- يرجى إدخال بريد إلكتروني صحيح
- يرجى إدخال رقم هاتف صحيح
- يرجى اختيار موعد مناسب
- هذا الموعد غير متاح
- كلمة المرور قصيرة جداً
- كلمة المرور وتأكيدها غير متطابقين
- حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى

English examples:
- This field is required
- Please enter a valid email address
- Please enter a valid phone number
- Please select a valid appointment
- This time slot is not available
- Password is too short
- Passwords do not match
- Something went wrong. Please try again

---

# 24. Error Handling

Create:
- Global error handling strategy.
- ErrorInterceptor.
- ApiError model.
- Toast notifications.
- Field-level validation errors.
- Page-level error state.

Handle:
- 400 validation errors.
- 401 unauthorized.
- 403 forbidden.
- 404 not found.
- 409 conflict.
- 500 server error.
- Network error.
- Payment pending/failure.

---

# 25. State Management

Use simple Angular service-based state or signals initially.

Do not introduce NgRx unless the complexity becomes necessary.

Create state services:
- AuthStateService.
- LanguageStateService.
- LayoutStateService.
- Cart/CheckoutStateService if needed.
- AdminUiStateService.

---

# 26. Required Models

Create strongly typed models.

Examples:
- Course
- CourseLesson
- CoursePurchase
- Specialist
- ConsultationType
- SpecialistAvailability
- ConsultationBooking
- Faq
- Review
- ContactMessage
- UserProfile
- Role
- Permission
- PaymentInitiationRequest
- PaymentInitiationResponse
- PaymentStatusResponse
- CmsPage
- CmsSection
- MediaAsset
- SiteSettings
- ApiResponse
- ApiError

---

# 27. Routing Requirements

Use lazy-loaded routes.

Example route groups:

```txt
/
  home
  courses
  courses/:slug
  checkout/course/:courseId
  specialists
  specialists/:id
  consultations/book/:specialistId
  faq
  contact
  about
  terms
  privacy
  refund-policy

/auth
  login
  register
  forgot-password
  reset-password
  verify-account

/user
  dashboard
  profile
  my-courses
  my-bookings
  payment-history

/payment
  success
  failure
  pending
  callback

/admin
  dashboard
  cms-home
  courses
  lessons
  specialists
  consultation-types
  availability
  bookings
  purchases
  faq
  reviews
  contact-messages
  users
  roles
  permissions
  media
  navigation
  translations
  settings
  audit-logs
```

Use route guards:
- Public routes open.
- Auth routes for guests only.
- User routes require authenticated user.
- Admin routes require admin role or permissions.

---

# 28. UI Style Details to Match Images

Implement the UI to feel like the attached references.

## Cards

```scss
.sagheri-card {
  background: var(--sagheri-card);
  border: 1px solid var(--sagheri-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-card);
  padding: 24px;
}
```

## Buttons

```scss
.sagheri-btn-primary {
  background: linear-gradient(180deg, #C98148 0%, #AD6F5F 100%);
  color: #fff;
  border-radius: 12px;
  font-weight: 700;
  box-shadow: var(--shadow-button);
}
```

```scss
.sagheri-btn-secondary {
  background: var(--sagheri-secondary);
  color: #fff;
  border-radius: 12px;
  font-weight: 700;
}
```

```scss
.sagheri-btn-course {
  background: var(--sagheri-course);
  color: #fff;
}
```

```scss
.sagheri-btn-consultation {
  background: var(--sagheri-consultation);
  color: #fff;
}
```

## Inputs

```scss
.sagheri-input {
  border: 1px solid var(--sagheri-border);
  border-radius: 12px;
  background: #fff;
  color: var(--sagheri-text);
  padding: 12px 14px;
}
```

## Admin Table

```scss
.admin-table {
  background: #fff;
  border-radius: 18px;
  border: 1px solid var(--sagheri-border);
  overflow: hidden;
}
```

---

# 29. Testing Requirements

Add testing foundation:
- Unit tests for services.
- Unit tests for validators.
- Unit tests for guards.
- Component tests for key UI components where practical.

At minimum ensure:
- Project builds successfully.
- Lint passes.
- TypeScript strict mode passes.

---

# 30. README Requirements

Create a complete README including:
- Project overview.
- Tech stack.
- Folder structure.
- Environment profiles.
- How to run local.
- How to build dev.
- How to build prod.
- Docker build/run.
- API configuration.
- i18n notes.
- RTL/LTR notes.
- Admin portal notes.
- Coding conventions.
- Deployment notes.

---

# 31. Implementation Order

Follow this exact implementation order:

1. Analyze images/documents.
2. Create `/docs/ui-ux-requirements-extraction.md`.
3. Create Angular project structure.
4. Configure strict TypeScript, SCSS, routing, and environments.
5. Create design tokens and global styles.
6. Create i18n setup Arabic/English.
7. Create layout components.
8. Create shared UI components.
9. Create models and API services.
10. Create public pages.
11. Create checkout and payment pages.
12. Create auth pages and guards.
13. Create user area pages.
14. Create admin portal layout.
15. Create admin CRUD UI foundations.
16. Add mock data where backend is not available.
17. Add Dockerfile and nginx.conf.
18. Add README.
19. Run lint/build.
20. Fix all build and TypeScript errors.

---

# 32. Important Final Rules

- Frontend only.
- Do not generate backend code.
- Do not skip the UI/UX extraction document.
- Do not hardcode CMS content that should be controlled by admin.
- Build with Angular best practices.
- Use Arabic and English.
- Arabic is default.
- RTL is default.
- Admin portal is mandatory.
- Authentication and authorization frontend support is mandatory.
- Payment frontend flow is mandatory.
- Use clean code, DRY, SOLID, and strict typing.
- Use environment profiles for local, dev, and prod.
- Include Docker deployment build.
- The final application must look and feel like the attached Sagheri images.
- The project must be ready to connect to real backend APIs later.
