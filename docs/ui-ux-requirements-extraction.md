# Sagheri UI/UX Requirements Extraction

Extracted from source-of-truth images in `/project_details`.

---

## 1. Brand Identity

| Element | Value |
|---|---|
| Arabic Name | صغيري |
| English Name | Sagheri |
| Tagline AR | طريقك لأمومة أوعى |
| Tagline EN | Your path to more conscious motherhood |
| Default Language | Arabic (RTL) |
| Domain | sagheri.com |
| Support Email | support@sagheri.com |
| Support Phone | +962 XXXXXXXXX (Jordan) |

**Logo:** Illustrated mother holding baby with floral wreath elements, warm earthy tones. Used centered at top of homepage and in footer.

---

## 2. Color Palette (from official palette image)

| Token | Hex | Arabic Label | Usage |
|---|---|---|---|
| Background | `#FDFBF5` | بيج كريمي للخلفية | Page background |
| Primary | `#AD6F5F` | بني ترابي دافئ | Course CTAs, main actions |
| Secondary / Teal | `#63A39E` | أزرق مائي | Consultation buttons |
| Text Dark | `#5D3F33` | بني داكن للنص | Body text, headings |
| Muted / Icon | `#8A6D5E` | بني متوسط للأيقونات | Nav icons, strips |
| Card Background | `#FFF8EE` | كريمي فاتح | Card surfaces |
| Border | `#E5D6C8` | — | Dividers, input borders |
| Gold | `#B68A4A` | ذهبي | Rating stars, accents |

---

## 3. Typography

| Element | Font | Weight | Size Desktop | Size Mobile |
|---|---|---|---|---|
| Arabic body | Tajawal | 400 | 16px | 16px |
| Arabic headings | Tajawal | 700 | — | — |
| English body | Inter | 400 | 16px | 16px |
| H1 | Tajawal | 700 | 40px | 30px |
| H2 | Tajawal | 700 | 32px | 26px |
| H3 | Tajawal | 700 | 24px | 20px |
| Small | Tajawal | 400 | 14px | 14px |
| Caption | Tajawal | 400 | 12px | 12px |

---

## 4. Navigation (from homepage image)

### Desktop: Floating Side Navigation (RTL right side)
- Position: fixed right side, vertical
- Background: white card with soft shadow
- Icons + Arabic labels
- Items: الرئيسية, الاستشارات, كورساتنا, عنا, تواصل
- Active state: filled icon + primary color highlight

### Mobile: Bottom Navigation Bar
- Height: 72px
- Background: white
- Icons: home, calendar/booking, menu, phone/contact
- Color: muted brown (#8A6D5E) for inactive, primary (#AD6F5F) for active

---

## 5. Screens Identified

### Public Website
| Screen | Route | Notes |
|---|---|---|
| Homepage | `/` | Hero, specialists preview, courses, reviews, FAQ, footer |
| Courses List | `/courses` | Card grid, filter by type |
| Course Detail | `/courses/:slug` | Video, lessons accordion, pricing, CTA |
| Course Checkout | `/checkout/course/:id` | Form + order summary + payment |
| Payment Success | `/payment/success` | Confirmation page |
| Payment Failure | `/payment/failure` | Retry CTA |
| Payment Pending | `/payment/pending` | Processing state |
| Specialists List | `/specialists` | Cards with booking CTA |
| Specialist Profile | `/specialists/:id` | Full bio, availability |
| Consultation Booking | `/consultations/book/:id` | Type + date + time + form |
| FAQ | `/faq` | Accordion |
| Contact | `/contact` | Form |
| About | `/about` | Brand story |
| Legal Pages | `/terms`, `/privacy`, `/refund-policy` | Text pages |

### Authentication
| Screen | Route |
|---|---|
| Login | `/auth/login` |
| Register | `/auth/register` |
| Forgot Password | `/auth/forgot-password` |
| Reset Password | `/auth/reset-password` |
| Verify Account | `/auth/verify-account` |

### User Area
| Screen | Route |
|---|---|
| Dashboard | `/user/dashboard` |
| Profile | `/user/profile` |
| My Courses | `/user/my-courses` |
| My Bookings | `/user/my-bookings` |
| Payment History | `/user/payment-history` |

### Admin Portal
| Screen | Route |
|---|---|
| Dashboard | `/admin/dashboard` |
| CMS Homepage | `/admin/cms-home` |
| Courses | `/admin/courses` |
| Lessons | `/admin/lessons` |
| Specialists | `/admin/specialists` |
| Consultation Types | `/admin/consultation-types` |
| Availability | `/admin/availability` |
| Bookings | `/admin/bookings` |
| Purchases | `/admin/purchases` |
| FAQ | `/admin/faq` |
| Reviews | `/admin/reviews` |
| Contact Messages | `/admin/contact-messages` |
| Users | `/admin/users` |
| Roles | `/admin/roles` |
| Permissions | `/admin/permissions` |
| Media Library | `/admin/media` |
| Navigation Menus | `/admin/navigation` |
| Translations | `/admin/translations` |
| Site Settings | `/admin/settings` |
| Audit Logs | `/admin/audit-logs` |

---

## 6. Component Inventory (from UI images)

### Specialist Card (homepage + list)
- Circular portrait photo, warm border
- Name in bold Arabic
- Title (e.g., استشارية رضاعة - IBCLC)
- Short bio (2 lines)
- Teal CTA button: "احجز استشارة مع [name]"

### Specialist Popup / Modal (from UI mockup image)
- Larger version with full name and title
- Extended bio text
- "إقرأي المزيد" text link
- "احجز المزيد" warm orange CTA button
- Close (×) button top right

### Course Card (homepage + list)
- Video thumbnail with play button overlay (circular, centered)
- Course title (bold, Arabic)
- Description (2–3 lines)
- Duration (~90 دقيقة) + lessons count
- Gold rating stars
- Price (150 دينار أردني)
- Primary CTA: "اشترك الآن" (warm earthy brown)
- Secondary link: "عرض محتوى الكورس"

### Course Detail Card / Popup (from UI mockup image)
- Full width video player area
- Course title and description
- "ماذا ستتعلمين؟" section with checklist outcomes
- Lessons accordion (numbered, with duration)
- Price display with star rating
- "عرض محتوى الكورس" action button

### Consultation Booking UI (from UI mockup image)
- **Left panel:** Specialist profile card
- **Right panel:**
  - Consultation type selector: فيديو (video camera icon), مكالمة صوتية (phone icon), محادثة نصية (chat bubble icon)
  - Price per consultation shown
  - Date calendar (Arabic month, day labels: الأحد الاثنين ...)
  - Time slot grid (morning + afternoon slots)
  - "الحالي" / "Book" CTA button
  - Total price: **150 دينار**

### FAQ Accordion (from UI mockup image)
- Section header: "الأسئلة الشائعة"
- Each item: question row with expand arrow
- On expand: answer text below
- Sample questions observed:
  - لحات الرضاعة مونة؟ (Is breastfeeding challenging?)
  - كيف تزيدين إدرار الحليب؟
  - متى أبدأ بتغذية الطفل التكميلية؟
  - ما هي فوائد الرضاعة الطبيعية؟
  - هل يحتاج الرضيع لمكملات غذائية؟
  - ما هو الوضع المثالي للرضاعة؟
  - كيف أتعامل مع احتقان الثدي؟
  - ما هي تمارين الحوض بعد الولادة؟
  - كيف أحصل على نظام غذائي للأم المرضعة؟

---

## 7. User Flows (from flowchart image)

### Course Purchase Flow
1. User opens homepage → browses
2. User selects course path
3. Clicks "اشتري الآن" on course card
4. Fills registration/checkout form:
   - First name, last name, phone (+ country code), country, email
   - Mother status: حامل / مرضع / تجهز للحمل
   - Card number, CVV, expiry date
5. Reviews order: course name + price
6. Completes purchase → confirmation + email sent
7. Error: clear message + retry

### Consultation Booking Flow
1. User selects specialist path
2. Chooses specialist (e.g., استشارية رضاعة أو علاج طبيعي)
3. Clicks "احجزي استشارة"
4. Fills booking form:
   - First name, last name, phone (+ country code), country, email
   - Problem description (brief)
   - Preferred contact time
5. Reviews booking: specialist + slot + data
6. Confirms → success (no advance payment)
7. Specialist notified immediately

---

## 8. Form Specifications

### Course Registration/Checkout Form
| Field | Type | Required |
|---|---|---|
| الاسم الأول | text | yes |
| اسم العائلة | text | yes |
| رقم الهاتف (مع رمز الدولة) | phone + select | yes |
| الدولة | select | yes |
| البريد الإلكتروني | email | yes |
| الحالة: حامل / مرضع / تجهز للحمل | radio | yes |
| رقم البطاقة | card input | yes |
| CVV | text | yes |
| تاريخ الانتهاء | date | yes |

### Consultation Booking Form
| Field | Type | Required |
|---|---|---|
| الاسم الأول | text | yes |
| اسم العائلة | text | yes |
| رقم الهاتف (مع رمز الدولة) | phone + select | yes |
| الدولة | select | yes |
| البريد الإلكتروني | email | yes |
| وصف مختصر للمشكلة | textarea | yes |
| الوقت المفضل للتواصل | text/select | no |

---

## 9. Footer Structure (from homepage image)

- Logo + tagline center
- Support: support@sagheri.com
- Phone: +962 XXXXXXXXX
- Social icons: X (Twitter), Instagram
- Copyright: حقوق النشر © 2024 صغيري - جميع الحقوق محفوظة.

---

## 10. Content Corrections (Arabic)

The following Arabic content was extracted from images and professionally corrected:

| Original (AI-generated)              | Corrected |
|--------------------------------------|---|
| احجز المزيد                          | احجزي موعدك |
| إقليل مزيد                           | اقرئي المزيد |
| لحات الرضاعة مونة؟                   | هل الرضاعة الطبيعية مؤلمة؟ |
| كف تريد إدرار الحليب؟                | كيف تزيدين إدرار الحليب؟ |
| متى أبنا تقدية الطفل الحقلي؟         | متى أبدأ بتغذية الطفل التكميلية؟ |
| بيان القضماني - استشارية رضاعة IBCLC | بيان القدماني - استشارية رضاعة دولية IBCLC |
