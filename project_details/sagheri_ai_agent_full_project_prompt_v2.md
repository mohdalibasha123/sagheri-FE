# Sagheri Project — Complete AI Agent Prompt for Frontend + Backend Generation V2

> Use this document as the master prompt for Codex or any AI coding agent.
> The goal is to generate a complete Arabic-first RTL website and backend system for **Sagheri / صغيري**, matching the attached visual references and supporting the core business flows: course purchase and consultation booking.

---

## 0. Role Instruction for the AI Agent

You are a senior full-stack software architect, UI/UX engineer, frontend developer, backend developer, and product-minded technical lead.

Build a production-ready full-stack platform for **Sagheri / صغيري**, an Arabic-first maternal education and consultation website.

The platform must include:

1. A complete responsive Frontend.
2. A complete REST Backend.
3. Database schema and seed data.
4. Clean code architecture.
5. Strong validation.
6. Arabic RTL support.
7. Design matching the provided reference images.
8. Mandatory admin portal, CMS management, authentication, authorization, real payment integration foundation, course access, and specialist management.

Do not generate a small demo. Build a real project foundation suitable for a Middle East launch, with Arabic-first RTL UX, admin operations, secure payment flow, and clean scalable architecture.

Before writing implementation files, first generate and confirm the project structure and implementation plan.

---

# 1. Project Overview

## 1.1 Project Name

Arabic name:

**صغيري**

English name:

**Sagheri**

## 1.2 Tagline

Use this corrected Arabic tagline:

**صغيري - طريقك لأمومة أوعى**

Alternative longer version for hero or about section:

**صغيري - رحلتك الواعية في الأمومة**

## 1.3 Project Description

Sagheri is an Arabic-first platform that supports mothers and future mothers through educational courses and specialist consultations.

The platform helps users learn about:

- Pregnancy preparation.
- Pregnancy stages.
- Breastfeeding.
- Baby care after birth.
- Maternal nutrition.
- Infant nutrition.
- Pelvic floor and women’s physical therapy.
- Postpartum recovery.

The website should make users feel safe, supported, educated, and confident.

## 1.4 Core Business Features

The first version must support two main flows:

1. **Course purchase flow**
   - User browses courses.
   - User views course details.
   - User fills registration form.
   - User proceeds to mock payment.
   - System creates purchase record.
   - User sees success or failure state.

2. **Consultation booking flow**
   - User browses specialists.
   - User selects a specialist.
   - User selects consultation type.
   - User selects date/time.
   - User fills booking form.
   - System creates booking request with status `PENDING_CONFIRMATION`.
   - User sees confirmation message.

---

# 2. Brand Identity

## 2.1 Brand Personality

The brand should feel:

- Warm.
- Calm.
- Motherly.
- Educational.
- Trustworthy.
- Soft.
- Feminine but not childish.
- Professional but not cold.
- Medical/consultative but approachable.

## 2.2 Brand Positioning

Sagheri is not just a course website.

It is a soft, supportive digital guide for mothers who want reliable Arabic content and expert guidance during pregnancy, breastfeeding, baby care, and postpartum recovery.

## 2.3 Visual Keywords

The visual design must follow these keywords:

- Cream.
- Beige.
- Warm brown.
- Soft teal.
- Terracotta.
- Rounded cards.
- Gentle shadows.
- Soft floral patterns.
- Motherhood illustrations.
- Clean Arabic typography.
- RTL-first layout.
- Calm medical education.

## 2.4 Avoid These Design Styles

Do not make the website look like:

- A generic SaaS dashboard.
- A hospital website only.
- A loud e-commerce website.
- A children’s toy brand.
- A harsh modern startup landing page.
- A dark theme website.
- A cluttered marketplace.

---

# 3. Design References and Visual Requirements

The attached images show the required visual direction.

The implementation must visually match the references:

- Soft beige/cream background.
- Large rounded cards.
- Thin brown borders.
- Warm shadows.
- Brown/orange gradient buttons.
- Muted teal secondary buttons.
- Dark brown Arabic text.
- Right-side floating navigation on desktop.
- Bottom navigation on mobile if needed.
- Arabic RTL flow.
- Course cards with video thumbnails.
- Specialist cards with profile image above the card.
- FAQ accordion cards.
- Booking form with two-column layout on desktop.
- Flow colors: course in teal/green and consultation in burnt brown.

---

# 4. Color Palette

Use these CSS variables globally.

```css
:root {
  --color-background: #FDFBF5;
  --color-primary: #AD6F5F;
  --color-primary-dark: #8F5548;
  --color-primary-light: #C9826E;

  --color-secondary: #63A39E;
  --color-secondary-dark: #487D79;
  --color-secondary-light: #8BC1BD;

  --color-text: #5D3F33;
  --color-heading: #3F2A22;
  --color-muted: #8A6D5E;
  --color-card: #FFF8EE;
  --color-card-alt: #FFFCF5;
  --color-border: #E5D6C8;
  --color-border-strong: #CBB7A6;
  --color-gold: #B68A4A;
  --color-gold-light: #F7F2EA;

  --color-success: #1F5F0F;
  --color-course: #006B5C;
  --color-course-light: #E6F3F1;
  --color-consultation: #8B2F16;
  --color-consultation-light: #F7EDE7;
  --color-dark-block: #3F403B;

  --olive-primary: #6B7C52;
  --olive-light: #EEF2E6;
  --terra-primary: #B05C3A;
  --terra-light: #F7EDE7;
  --brand-gold: #8B7355;
  --brand-gold-light: #F7F2EA;
}
```

## 4.1 Usage Rules

Use:

- `#FDFBF5` for the main page background.
- `#FFF8EE` for cards.
- `#5D3F33` for body text.
- `#3F2A22` for headings.
- `#AD6F5F` for main CTAs.
- `#63A39E` for consultation/supportive secondary CTAs.
- `#006B5C` for course purchase flow.
- `#8B2F16` for consultation booking flow.
- `#E5D6C8` for card borders and dividers.
- `#B68A4A` for icons, stars, highlights, and subtle decorative details.

---

# 5. Typography

## 5.1 Fonts

Use Arabic-friendly fonts.

Preferred:

- Main Arabic font: **Tajawal**.
- Alternative Arabic font: **Cairo**.
- Optional English decorative font: **Playfair Display**.

## 5.2 CSS Font Setup

```css
body {
  font-family: 'Tajawal', 'Cairo', system-ui, sans-serif;
  direction: rtl;
  text-align: right;
  background: var(--color-background);
  color: var(--color-text);
}
```

## 5.3 Typography Rules

- Arabic text must not appear reversed or broken.
- Use `dir="rtl"` on the root HTML/body/app container.
- Avoid mixing English inside Arabic sentences unless necessary.
- Use clean line-height, approximately `1.8` for paragraphs.
- Use bold headings but avoid overly heavy fonts.

Suggested scale:

```css
.hero-title { font-size: clamp(2rem, 5vw, 4rem); font-weight: 800; }
.section-title { font-size: clamp(1.75rem, 3vw, 2.5rem); font-weight: 800; }
.card-title { font-size: 1.25rem; font-weight: 700; }
.body-text { font-size: 1rem; line-height: 1.8; }
.small-text { font-size: 0.875rem; }
```

---

# 6. Corrected Arabic Content

The Arabic content in the reference images contains many spelling and wording issues due to AI-generated image text. Use the corrected content below.

---

## 6.1 Navigation

Menu items:

- الرئيسية
- الاستشارات
- كورساتنا
- الأسئلة الشائعة
- عنّا
- تواصل معنا

CTA buttons:

- احجزي استشارة
- اشتركي الآن

Logo text:

**صغيري**

Logo subtitle:

**طريقك لأمومة أوعى**

---

## 6.2 Hero Section

Heading:

**صغيري - رحلتك الواعية في الأمومة**

Subtitle:

**تعلمي، اسألي، واطمئني مع مختصات يساعدنك في الحمل، الرضاعة، تغذية الطفل، ورعاية ما بعد الولادة بخطوات واضحة ومبسطة.**

Primary CTA:

**اشتركي في الكورسات**

Secondary CTA:

**احجزي استشارة مع أخصائية**

Supporting badges:

- محتوى عربي موثوق
- مختصات معتمدات
- استشارات فردية
- كورسات مبسطة

---

## 6.3 About Section

Section title:

**عن صغيري**

Text:

**صغيري منصة عربية صُممت لتكون رفيقتك في رحلة الأمومة، من مرحلة التخطيط للحمل وحتى ما بعد الولادة. نقدم كورسات مبسطة واستشارات فردية تساعدك على فهم جسمك، رعاية طفلك، والتعامل مع التحديات بثقة ووعي.**

Feature cards:

1. **معرفة مبسطة**
   - محتوى واضح وسهل الفهم يناسب الأمهات في مختلف المراحل.

2. **دعم متخصص**
   - استشارات مع مختصات في الرضاعة، التغذية، والعلاج الطبيعي.

3. **خطوات عملية**
   - نصائح قابلة للتطبيق تساعدك في حياتك اليومية كأم.

---

## 6.4 Specialists Section

Section title:

**اختاري الأخصائية المناسبة لكِ**

Section subtitle:

**استشارات فردية مع مختصات في الرضاعة الطبيعية، التغذية، والعلاج الطبيعي لمساعدتك في كل مرحلة من رحلتك.**

### Specialist 1

Name:

**بيان القضماني**

Title:

**استشارية رضاعة دولية معتمدة IBCLC**

Description:

**خبيرة في دعم الأمهات خلال الحمل والرضاعة، ومساعدتهن على التعامل مع تحديات الرضاعة الطبيعية، زيادة إدرار الحليب، وتصحيح وضعية الرضاعة.**

Button:

**احجزي استشارة مع بيان**

Tags:

- الرضاعة الطبيعية
- تغذية الرضيع
- مشاكل الحليب
- دعم الأم بعد الولادة

### Specialist 2

Name:

**[اسم الأخصائية]**

Title:

**أخصائية علاج طبيعي لصحة المرأة**

Description:

**أخصائية علاج طبيعي تساعد الأمهات على تقوية الجسم، تحسين عضلات الحوض، الاستعداد للولادة، والتعافي بعد الحمل والولادة.**

Button:

**احجزي استشارة مع أخصائية العلاج الطبيعي**

Tags:

- عضلات الحوض
- تمارين الحمل
- التعافي بعد الولادة
- آلام الظهر والحوض

---

## 6.5 Courses Section

Section title:

**كورسات صغيري**

Section subtitle:

**كورسات مصممة بعناية لتمنحك معرفة واضحة، خطوات عملية، وطمأنينة في كل مرحلة.**

Every course card must include:

- Course thumbnail.
- Video play icon overlay.
- Course title.
- Short description.
- Duration.
- Number of lessons.
- Price.
- Rating.
- Button: **اشتركي الآن**.
- Link/button: **عرض محتوى الكورس**.

### Course 1

Title:

**تحضير ما قبل الحمل: تغذية وعضلات الحوض**

Description:

**كورس يساعدك على التحضير للحمل من خلال التغذية المناسبة، تمارين عضلات الحوض، وفهم أساسيات تجهيز الجسم لمرحلة الحمل.**

Learning outcomes:

- تجهيز الجسم للحمل.
- تمارين عضلات الحوض.
- التغذية المناسبة.
- الوقاية من المشاكل الشائعة.

Duration:

**90 دقيقة**

Lessons:

**2 درس**

Price:

**150 دينار أردني**

Button:

**اشتركي الآن**

Secondary button:

**عرض محتوى الكورس**

### Course 2

Title:

**رحلة الحمل: مراحل النمو وتغيرات الجسم**

Description:

**تعرفي على مراحل الحمل، تغيرات الجسم، التغذية المناسبة، التمارين الآمنة، وكيفية التعامل مع الأعراض الشائعة خلال الحمل.**

Learning outcomes:

- مراحل نمو الجنين.
- تغيرات جسم الأم.
- التغذية خلال الحمل.
- تمارين آمنة للحامل.

Duration:

**270 دقيقة**

Lessons:

**3 أجزاء**

Price:

**150 دينار أردني**

Button:

**اشتركي الآن**

### Course 3

Title:

**بعد الولادة: الرضاعة الطبيعية والتغذية والعناية بالطفل**

Description:

**كورس عملي يساعدك بعد الولادة على فهم الرضاعة الطبيعية، تغذية الأم والرضيع، والعناية اليومية بالطفل في الأشهر الأولى.**

Learning outcomes:

- أساسيات الرضاعة الطبيعية.
- تغذية الأم بعد الولادة.
- العناية بالطفل.
- تنظيم الرضاعة والنوم.

Duration:

**4 ساعات تقريباً**

Lessons:

**4 إلى 5 دروس**

Price:

**150 دينار أردني**

Button:

**اشتركي الآن**

---

## 6.6 Course Detail Page Content

Course detail page must include:

1. Video preview area.
2. Course title.
3. Course description.
4. What you will learn section.
5. Course price.
6. Rating.
7. Course metadata.
8. Lessons accordion.
9. Primary CTA: **اشتركي الآن**.
10. Secondary CTA: **عرض محتوى الكورس**.

Correct labels:

- محتوى الكورس
- ماذا ستتعلمين؟
- مدة الكورس
- عدد الدروس
- السعر
- تقييم الكورس
- الدرس الأول
- الدرس الثاني
- مدة الدرس
- دقائق

Example lesson accordion:

```text
الدرس الأول: تجهيز الجسم للحمل
المدة: 45 دقيقة

الدرس الثاني: تمارين عضلات الحوض والتغذية
المدة: 45 دقيقة
```

---

## 6.7 Consultation Section

Section title:

**احجزي استشارتك بسهولة**

Subtitle:

**اختاري نوع الاستشارة، حددي الوقت المناسب، واتركي بياناتك ليتم تأكيد الموعد معكِ.**

Consultation types:

1. **مكالمة فيديو**
2. **مكالمة صوتية**
3. **محادثة نصية**

Button:

**احجزي الآن**

Booking page labels:

- اختاري نوع الاستشارة
- اختاري التاريخ المناسب
- اختاري الوقت المناسب
- بيانات الحجز
- الاسم الأول
- اسم العائلة
- رقم الهاتف مع رمز الدولة
- الدولة
- البريد الإلكتروني
- وصف مختصر للمشكلة
- الوقت المفضل للتواصل
- تأكيد الحجز

Success message:

**تم إرسال طلب الحجز بنجاح. سيتم التواصل معكِ لتأكيد الموعد.**

---

## 6.8 FAQ Section

Section title:

**الأسئلة الشائعة**

Use accordion UI.

### FAQ 1

Question:

**هل الرضاعة الطبيعية مؤلمة؟**

Answer:

**قد تشعر بعض الأمهات بانزعاج بسيط في الأيام الأولى، لكن الألم الشديد أو المستمر غالباً يدل على مشكلة في الالتقام أو الوضعية. يمكن للاستشارة أن تساعدك في تصحيح الرضاعة وتقليل الألم.**

### FAQ 2

Question:

**كيف أزيد إدرار الحليب؟**

Answer:

**زيادة إدرار الحليب تعتمد على الرضاعة المتكررة، التفريغ الجيد للثدي، شرب السوائل، الراحة، والتأكد من أن الطفل يرضع بطريقة صحيحة.**

### FAQ 3

Question:

**متى أبدأ تغذية الطفل؟**

Answer:

**عادةً يبدأ إدخال الطعام التكميلي حول عمر 6 أشهر، مع الاستمرار في الرضاعة الطبيعية أو الصناعية حسب حالة الطفل وتوصيات الطبيب.**

### FAQ 4

Question:

**هل يحتاج الرضيع لمكملات غذائية؟**

Answer:

**قد يحتاج بعض الأطفال إلى مكملات مثل فيتامين د، لكن القرار يعتمد على عمر الطفل، حالته الصحية، وتوصيات الطبيب أو الأخصائية.**

### FAQ 5

Question:

**ما فوائد الرضاعة الطبيعية؟**

Answer:

**الرضاعة الطبيعية تدعم مناعة الطفل، توفر تغذية مناسبة، تعزز الترابط بين الأم والطفل، وقد تساعد الأم في التعافي بعد الولادة.**

### FAQ 6

Question:

**هل القلق يؤثر على جودة الحليب؟**

Answer:

**القلق لا يفسد الحليب، لكنه قد يؤثر على تدفق الحليب أو انتظام الرضاعة. الدعم والراحة والتوجيه الصحيح يمكن أن يساعدوا كثيراً.**

### FAQ 7

Question:

**كيف أتعامل مع احتقان الثدي؟**

Answer:

**يمكن تخفيف الاحتقان بالرضاعة المتكررة، الكمادات الدافئة قبل الرضاعة، الكمادات الباردة بعدها، والتأكد من تفريغ الثدي بطريقة صحيحة.**

### FAQ 8

Question:

**ما هو الاحتقان التدريجي؟**

Answer:

**هو امتلاء أو شد في الثدي يحدث تدريجياً بسبب تراكم الحليب أو قلة التفريغ. يحتاج إلى متابعة وتنظيم الرضاعة لتجنب الألم أو الانسداد.**

### FAQ 9

Question:

**ماذا أفعل إذا كان طفلي يعاني من الغازات أو المغص؟**

Answer:

**يمكنك تجربة التجشئة بعد الرضاعة، حمل الطفل بوضعيات مريحة، تدليك البطن بلطف، ومراجعة الأخصائية إذا كانت الأعراض مستمرة أو شديدة.**

---

## 6.9 Reviews Section

Section title:

**آراء الأمهات**

Review 1:

**الكورس كان واضح ومفيد جداً، ساعدني أفهم جسمي وأستعد للحمل بثقة أكبر.**

Name:

**أم ليان**

Review 2:

**الاستشارة مع الأخصائية طمنتني كثير، وفهمت أخيراً سبب ألم الرضاعة وكيف أتعامل معه.**

Name:

**أم يزن**

Review 3:

**المحتوى مرتب وسهل، حسيت أنه معمول للأمهات فعلاً وليس مجرد معلومات عامة.**

Name:

**أم سارة**

---

## 6.10 Contact Section

Section title:

**تواصلي معنا**

Subtitle:

**للاستفسارات، المساعدة، أو معرفة المزيد عن الكورسات والاستشارات، يسعدنا تواصلك معنا.**

Fields:

- الاسم
- البريد الإلكتروني
- رقم الهاتف
- الرسالة

Submit button:

**إرسال**

Footer:

**© 2026 صغيري. جميع الحقوق محفوظة.**

Temporary contact info:

Email:

**support@sagheri.com**

Phone:

**+962 XX XXX XXXX**

Social icons:

- Instagram.
- Facebook.
- X / Twitter.
- WhatsApp.

---

# 7. User Journeys

## 7.1 Flow A — Buy Course

### User Steps

1. User opens homepage.
2. User browses courses.
3. User selects a course.
4. User opens course detail page.
5. User clicks **اشتركي الآن**.
6. User fills course registration form.
7. User proceeds to payment.
8. User completes mock payment.
9. System creates purchase record.
10. User sees success page.

### Course Registration Form Fields

- الاسم الأول.
- اسم العائلة.
- رقم الهاتف مع رمز الدولة.
- الدولة.
- البريد الإلكتروني.
- الحالة:
  - حامل.
  - مرضعة.
  - تخطط للحمل.
  - أخرى.

### Success Message

**تم الاشتراك بنجاح. سيتم إرسال تفاصيل الوصول إلى الكورس عبر البريد الإلكتروني.**

### Failure Message

**حدث خطأ أثناء الدفع، يرجى المحاولة مرة أخرى.**

### Validation Message

**يرجى تعبئة جميع الحقول المطلوبة.**

---

## 7.2 Flow B — Book Consultation

### User Steps

1. User opens specialists or consultations section.
2. User selects specialist.
3. User clicks **احجزي استشارة**.
4. User selects consultation type:
   - مكالمة فيديو.
   - مكالمة صوتية.
   - محادثة نصية.
5. User selects date.
6. User selects available time slot.
7. User fills booking form.
8. User submits request.
9. System creates booking with status `PENDING_CONFIRMATION`.
10. User sees confirmation page.

### Booking Form Fields

- الاسم الأول.
- اسم العائلة.
- رقم الهاتف مع رمز الدولة.
- الدولة.
- البريد الإلكتروني.
- وصف مختصر للمشكلة.
- الوقت المفضل للتواصل.

### Booking Success Message

**تم إرسال طلب الحجز بنجاح. سيتم التواصل معكِ لتأكيد الموعد.**

### Business Rule

Do not require direct online payment for consultation booking in version 1 unless payment is explicitly enabled later.

---

# 8. Frontend Technical Requirements

## 8.1 Recommended Stack

Use:

- React.
- TypeScript.
- Vite.
- Tailwind CSS.
- React Router.
- React Hook Form.
- Zod.
- Axios or Fetch API.
- Lucide React icons.
- shadcn/ui-style reusable components if available.

## 8.2 Frontend Requirements

The frontend must be:

- Fully responsive.
- Arabic-first.
- RTL by default.
- Clean and maintainable.
- Component-based.
- Connected to backend APIs.
- Styled to match the reference images.
- Accessible as much as possible.
- Friendly to mobile users.

## 8.3 Required Frontend Pages

Create these pages:

1. `/` — Home page.
2. `/courses` — Course listing page.
3. `/courses/:slug` — Course detail page.
4. `/courses/:slug/checkout` — Course purchase/registration page.
5. `/consultations` — Specialists/consultations page.
6. `/specialists/:id` — Specialist profile page.
7. `/consultations/book/:specialistId` — Consultation booking page.
8. `/faq` — FAQ page.
9. `/contact` — Contact page.
10. `/success/course` — Course purchase success page.
11. `/success/consultation` — Consultation booking success page.
12. `/payment/failure` — Payment failure page.
13. `/not-found` — 404 page.

## 8.4 Frontend Project Structure

```txt
src/
  app/
    App.tsx
    router.tsx
    providers.tsx
  assets/
    images/
    icons/
    patterns/
  components/
    layout/
      Header.tsx
      Footer.tsx
      SideNav.tsx
      MobileNav.tsx
      PageShell.tsx
    ui/
      Button.tsx
      Card.tsx
      Badge.tsx
      Accordion.tsx
      Modal.tsx
      Input.tsx
      Textarea.tsx
      Select.tsx
      DatePicker.tsx
      TimeSlotPicker.tsx
      EmptyState.tsx
      LoadingSpinner.tsx
      ErrorMessage.tsx
    home/
      HeroSection.tsx
      AboutSection.tsx
      SpecialistsSection.tsx
      CoursesSection.tsx
      ReviewsSection.tsx
      FAQPreviewSection.tsx
      ContactCTASection.tsx
    courses/
      CourseCard.tsx
      CourseDetail.tsx
      CourseMeta.tsx
      LessonAccordion.tsx
      CheckoutForm.tsx
    consultations/
      SpecialistCard.tsx
      SpecialistProfile.tsx
      ConsultationTypeSelector.tsx
      BookingForm.tsx
      AvailabilityCalendar.tsx
      TimeSlotGrid.tsx
    forms/
      FormField.tsx
      PhoneInput.tsx
  features/
    courses/
      api.ts
      types.ts
      hooks.ts
    specialists/
      api.ts
      types.ts
      hooks.ts
    consultations/
      api.ts
      types.ts
      hooks.ts
    faq/
      api.ts
      types.ts
    reviews/
      api.ts
      types.ts
    contact/
      api.ts
      types.ts
  pages/
    HomePage.tsx
    CoursesPage.tsx
    CourseDetailPage.tsx
    CourseCheckoutPage.tsx
    ConsultationsPage.tsx
    SpecialistProfilePage.tsx
    ConsultationBookingPage.tsx
    FAQPage.tsx
    ContactPage.tsx
    CourseSuccessPage.tsx
    ConsultationSuccessPage.tsx
    PaymentFailurePage.tsx
    NotFoundPage.tsx
  lib/
    apiClient.ts
    config.ts
    cn.ts
    validation.ts
  styles/
    globals.css
    theme.css
```

## 8.5 Layout Details

### Desktop

- Header at top.
- Optional floating right navigation card similar to the reference image.
- Main content centered with max width.
- Hero with two columns:
  - Text on right.
  - Visual/cards/illustration on left.
- Cards arranged in grids.
- Booking page two-column layout:
  - Right: form and selection.
  - Left: specialist/course summary.

### Mobile

- Header becomes compact.
- Cards become single column.
- Side navigation becomes bottom navigation or hamburger menu.
- Forms are full width.
- Large buttons are easy to tap.

## 8.6 Floating Navigation

Desktop right floating navigation should include:

- الرئيسية
- الاستشارات
- كورساتنا
- عنّا
- تواصل

Use icons:

- Home.
- MessageCircle.
- BookOpen.
- Users.
- Mail.

Style:

```css
.floating-nav {
  position: fixed;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
  background: #FFFCF5;
  border: 1px solid #E5D6C8;
  border-radius: 28px;
  box-shadow: 0 16px 40px rgba(93, 63, 51, 0.14);
  padding: 16px 10px;
}
```

---

# 9. Frontend Styling Details

## 9.1 Cards

```css
.card-soft {
  border-radius: 24px;
  background: #FFF8EE;
  border: 1px solid #E5D6C8;
  box-shadow: 0 12px 30px rgba(93, 63, 51, 0.12);
}
```

## 9.2 Buttons

General:

```css
.btn {
  border-radius: 14px;
  font-weight: 700;
  padding: 12px 24px;
  transition: all 0.2s ease;
}
```

Primary:

```css
.btn-primary {
  background: linear-gradient(180deg, #C98148 0%, #AD6F5F 100%);
  color: white;
  box-shadow: 0 8px 18px rgba(173, 111, 95, 0.28);
}
```

Secondary:

```css
.btn-secondary {
  background: #63A39E;
  color: white;
}
```

Course:

```css
.btn-course {
  background: #006B5C;
  color: white;
}
```

Consultation:

```css
.btn-consultation {
  background: #8B2F16;
  color: white;
}
```

## 9.3 Inputs

```css
.input-soft {
  border-radius: 14px;
  border: 1px solid #E5D6C8;
  background: #FFFCF5;
  color: #5D3F33;
  padding: 12px 14px;
}

.input-soft:focus {
  outline: none;
  border-color: #AD6F5F;
  box-shadow: 0 0 0 4px rgba(173, 111, 95, 0.12);
}
```

## 9.4 Accordion

FAQ and lessons accordion should have:

- Rounded item.
- Thin border.
- Soft cream background.
- Brown text.
- Gold/terracotta icon indicator.

## 9.5 Image/Illustration Style

Use placeholders initially if assets are not available.

Preferred style:

- Mother and baby illustrations.
- Pregnancy illustrations.
- Breastfeeding illustrations.
- Soft pastel style.
- Beige background.
- No harsh shadows.
- No unrelated stock photos.

---

# 10. Frontend API Integration

## 10.1 Environment Variables

Create `.env.example`:

```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

## 10.2 API Client

Create a shared API client:

```ts
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

## 10.3 Loading and Error States

Every API-connected page must support:

- Loading state.
- Empty state.
- Error state.
- Retry action where appropriate.

Arabic error examples:

- **تعذر تحميل البيانات، يرجى المحاولة مرة أخرى.**
- **لا توجد بيانات متاحة حالياً.**
- **حدث خطأ غير متوقع.**

---

# 11. Backend Technical Requirements

## 11.1 Recommended Backend Stack

Use:

- Java 21 or Java 25.
- Spring Boot 3.x.
- Spring Web.
- Spring Data JPA.
- PostgreSQL.
- Flyway or Liquibase.
- Bean Validation.
- MapStruct.
- Lombok optional.
- OpenAPI/Swagger.
- Maven or Gradle.

## 11.2 Backend Architecture

Use clean layered architecture:

```txt
com.sagheri
  SagheriApplication.java
  config/
    CorsConfig.java
    OpenApiConfig.java
  common/
    response/
      ApiResponse.java
      ErrorResponse.java
      FieldErrorResponse.java
    exception/
      GlobalExceptionHandler.java
      BusinessException.java
      NotFoundException.java
      DuplicateBookingException.java
    validation/
      PhoneValidator.java
    audit/
      AuditableEntity.java
  course/
    controller/
    service/
    repository/
    entity/
    dto/
    mapper/
  specialist/
    controller/
    service/
    repository/
    entity/
    dto/
    mapper/
  consultation/
    controller/
    service/
    repository/
    entity/
    dto/
    mapper/
  booking/
    controller/
    service/
    repository/
    entity/
    dto/
    mapper/
  payment/
    controller/
    service/
    provider/
    dto/
    entity/
    repository/
  faq/
    controller/
    service/
    repository/
    entity/
    dto/
    mapper/
  review/
    controller/
    service/
    repository/
    entity/
    dto/
    mapper/
  contact/
    controller/
    service/
    repository/
    entity/
    dto/
    mapper/
  notification/
    service/
```

## 11.3 Backend Rules

- Controllers must be thin.
- Business logic must be in services.
- Repositories only handle persistence.
- Use DTOs for requests/responses.
- Do not expose entities directly.
- Use MapStruct for mapping.
- Use Bean Validation annotations.
- Use clear exception handling.
- Use UUID IDs.
- Use timestamps.
- Use database migrations.
- Use seed data.

---

# 12. Database Model

## 12.1 Base Auditing Fields

Most tables should include:

- `id UUID PRIMARY KEY`
- `created_at TIMESTAMP`
- `updated_at TIMESTAMP`

Use a base auditable entity where possible.

---

## 12.2 Course Entity

Fields:

- `id UUID`
- `title_ar VARCHAR(255) NOT NULL`
- `slug VARCHAR(255) UNIQUE NOT NULL`
- `description_ar TEXT NOT NULL`
- `thumbnail_url TEXT`
- `video_preview_url TEXT`
- `duration_minutes INTEGER`
- `lessons_count INTEGER`
- `price_amount DECIMAL(10,2) NOT NULL`
- `currency VARCHAR(10) NOT NULL DEFAULT 'JOD'`
- `rating DECIMAL(2,1)`
- `is_active BOOLEAN DEFAULT TRUE`
- `display_order INTEGER`
- `created_at TIMESTAMP`
- `updated_at TIMESTAMP`

Relationships:

- One course has many lessons.
- One course has many purchases.

---

## 12.3 CourseLesson Entity

Fields:

- `id UUID`
- `course_id UUID NOT NULL`
- `title_ar VARCHAR(255) NOT NULL`
- `description_ar TEXT`
- `duration_minutes INTEGER`
- `video_url TEXT`
- `display_order INTEGER`
- `is_preview BOOLEAN DEFAULT FALSE`
- `created_at TIMESTAMP`
- `updated_at TIMESTAMP`

Relationship:

- Many lessons belong to one course.

---

## 12.4 Specialist Entity

Fields:

- `id UUID`
- `name_ar VARCHAR(255) NOT NULL`
- `title_ar VARCHAR(255) NOT NULL`
- `bio_ar TEXT NOT NULL`
- `image_url TEXT`
- `specialty VARCHAR(100)`
- `is_active BOOLEAN DEFAULT TRUE`
- `display_order INTEGER`
- `created_at TIMESTAMP`
- `updated_at TIMESTAMP`

---

## 12.5 ConsultationType Entity

Fields:

- `id UUID`
- `code VARCHAR(50) UNIQUE NOT NULL`
- `name_ar VARCHAR(100) NOT NULL`
- `description_ar TEXT`
- `duration_minutes INTEGER`
- `price_amount DECIMAL(10,2)`
- `currency VARCHAR(10) DEFAULT 'JOD'`
- `is_active BOOLEAN DEFAULT TRUE`

Examples:

- `VIDEO_CALL` / مكالمة فيديو
- `VOICE_CALL` / مكالمة صوتية
- `TEXT_CHAT` / محادثة نصية

---

## 12.6 SpecialistAvailability Entity

Fields:

- `id UUID`
- `specialist_id UUID NOT NULL`
- `available_date DATE NOT NULL`
- `start_time TIME NOT NULL`
- `end_time TIME NOT NULL`
- `is_available BOOLEAN DEFAULT TRUE`
- `created_at TIMESTAMP`
- `updated_at TIMESTAMP`

Unique constraint:

```txt
specialist_id + available_date + start_time
```

Business rule:

Do not allow duplicate availability for the same specialist/date/start time.

---

## 12.7 ConsultationBooking Entity

Fields:

- `id UUID`
- `specialist_id UUID NOT NULL`
- `consultation_type_id UUID NOT NULL`
- `booking_date DATE NOT NULL`
- `booking_time TIME NOT NULL`
- `first_name VARCHAR(100) NOT NULL`
- `last_name VARCHAR(100) NOT NULL`
- `phone_country_code VARCHAR(10) NOT NULL`
- `phone_number VARCHAR(30) NOT NULL`
- `country VARCHAR(100) NOT NULL`
- `email VARCHAR(255) NOT NULL`
- `problem_description TEXT NOT NULL`
- `preferred_contact_time VARCHAR(100)`
- `status VARCHAR(50) NOT NULL`
- `created_at TIMESTAMP`
- `updated_at TIMESTAMP`

Status enum:

- `PENDING_CONFIRMATION`
- `CONFIRMED`
- `CANCELLED`
- `COMPLETED`
- `REJECTED`

Unique active booking rule:

Prevent duplicate active bookings for:

```txt
specialist_id + booking_date + booking_time
```

where status is not cancelled/rejected.

---

## 12.8 CoursePurchase Entity

Fields:

- `id UUID`
- `course_id UUID NOT NULL`
- `first_name VARCHAR(100) NOT NULL`
- `last_name VARCHAR(100) NOT NULL`
- `phone_country_code VARCHAR(10) NOT NULL`
- `phone_number VARCHAR(30) NOT NULL`
- `country VARCHAR(100) NOT NULL`
- `email VARCHAR(255) NOT NULL`
- `mother_status VARCHAR(50) NOT NULL`
- `payment_status VARCHAR(50) NOT NULL`
- `payment_reference VARCHAR(255)`
- `total_amount DECIMAL(10,2) NOT NULL`
- `currency VARCHAR(10) NOT NULL`
- `created_at TIMESTAMP`
- `updated_at TIMESTAMP`

MotherStatus enum:

- `PREGNANT`
- `BREASTFEEDING`
- `PLANNING_PREGNANCY`
- `OTHER`

PaymentStatus enum:

- `PENDING`
- `PAID`
- `FAILED`
- `CANCELLED`
- `REFUNDED`

---

## 12.9 FAQ Entity

Fields:

- `id UUID`
- `question_ar TEXT NOT NULL`
- `answer_ar TEXT NOT NULL`
- `display_order INTEGER`
- `is_active BOOLEAN DEFAULT TRUE`
- `created_at TIMESTAMP`
- `updated_at TIMESTAMP`

---

## 12.10 Review Entity

Fields:

- `id UUID`
- `reviewer_name_ar VARCHAR(255) NOT NULL`
- `content_ar TEXT NOT NULL`
- `rating INTEGER NOT NULL`
- `is_active BOOLEAN DEFAULT TRUE`
- `display_order INTEGER`
- `created_at TIMESTAMP`
- `updated_at TIMESTAMP`

---

## 12.11 ContactMessage Entity

Fields:

- `id UUID`
- `name VARCHAR(255) NOT NULL`
- `email VARCHAR(255) NOT NULL`
- `phone VARCHAR(50)`
- `message TEXT NOT NULL`
- `status VARCHAR(50) NOT NULL DEFAULT 'NEW'`
- `created_at TIMESTAMP`

Status enum:

- `NEW`
- `READ`
- `ARCHIVED`

---

# 13. Backend API Design

Use base path:

```http
/api/v1
```

## 13.1 Courses APIs

```http
GET /api/v1/courses
GET /api/v1/courses/{slug}
GET /api/v1/courses/{id}/lessons
POST /api/v1/courses/{id}/purchase
```

### Course List Response Example

```json
{
  "success": true,
  "message": "تمت العملية بنجاح",
  "data": [
    {
      "id": "uuid",
      "titleAr": "تحضير ما قبل الحمل: تغذية وعضلات الحوض",
      "slug": "pre-pregnancy-preparation",
      "descriptionAr": "كورس يساعدك على التحضير للحمل...",
      "thumbnailUrl": "/images/course-1.jpg",
      "durationMinutes": 90,
      "lessonsCount": 2,
      "priceAmount": 150,
      "currency": "JOD",
      "rating": 5.0
    }
  ]
}
```

### Purchase Request

```json
{
  "firstName": "سارة",
  "lastName": "أحمد",
  "phoneCountryCode": "+962",
  "phoneNumber": "790000000",
  "country": "Jordan",
  "email": "sara@example.com",
  "motherStatus": "PREGNANT"
}
```

---

## 13.2 Specialists APIs

```http
GET /api/v1/specialists
GET /api/v1/specialists/{id}
GET /api/v1/specialists/{id}/availability
```

Optional query params for availability:

```http
GET /api/v1/specialists/{id}/availability?from=2026-04-01&to=2026-04-30
```

---

## 13.3 Consultation Types APIs

```http
GET /api/v1/consultation-types
```

---

## 13.4 Consultation Booking APIs

```http
POST /api/v1/consultation-bookings
GET /api/v1/consultation-bookings/{id}
```

### Booking Request

```json
{
  "specialistId": "uuid",
  "consultationTypeId": "uuid",
  "bookingDate": "2026-04-20",
  "bookingTime": "09:00",
  "firstName": "سارة",
  "lastName": "أحمد",
  "phoneCountryCode": "+962",
  "phoneNumber": "790000000",
  "country": "Jordan",
  "email": "sara@example.com",
  "problemDescription": "أحتاج مساعدة في ألم الرضاعة",
  "preferredContactTime": "مساءً"
}
```

---

## 13.5 FAQ APIs

```http
GET /api/v1/faqs
```

---

## 13.6 Reviews APIs

```http
GET /api/v1/reviews
```

---

## 13.7 Contact APIs

```http
POST /api/v1/contact-messages
```

### Contact Request

```json
{
  "name": "سارة أحمد",
  "email": "sara@example.com",
  "phone": "+962790000000",
  "message": "أرغب بمعرفة المزيد عن الاستشارات"
}
```

---

## 13.8 Payment APIs

Payment integration is part of the project. Build the payment module as a real production-ready payment abstraction with a mock provider for local development and configurable real Middle East payment providers for production.

```http
POST /api/v1/payments/initiate
POST /api/v1/payments/webhook
GET /api/v1/payments/{reference}
```

Create interface:

```java
public interface PaymentProvider {
    PaymentInitiationResponse initiatePayment(PaymentInitiationRequest request);
    PaymentStatusResponse checkStatus(String reference);
}
```

Create implementations:

```java
MockPaymentProvider
MyFatoorahPaymentProvider
HyperPayPaymentProvider
PayTabsPaymentProvider
```

Use environment variable `PAYMENT_PROVIDER` to select provider: `MOCK`, `MYFATOORAH`, `HYPERPAY`, or `PAYTABS`. Stripe can be added later, but the first production focus is Middle East friendly gateways. Do not hardcode secrets. Support redirect URLs, callback URLs, webhook verification, payment attempts, idempotency keys, and payment reconciliation.

---

# 14. Validation Rules

## 14.1 Course Purchase Validation

Required:

- firstName.
- lastName.
- phoneCountryCode.
- phoneNumber.
- country.
- email.
- motherStatus.

Rules:

- Email must be valid.
- Phone number must not contain letters.
- Mother status must be one of allowed enum values.
- Course must exist and be active.

## 14.2 Consultation Booking Validation

Required:

- specialistId.
- consultationTypeId.
- bookingDate.
- bookingTime.
- firstName.
- lastName.
- phoneCountryCode.
- phoneNumber.
- country.
- email.
- problemDescription.

Rules:

- Specialist must exist and be active.
- Consultation type must exist and be active.
- Selected slot must be available.
- Date must not be in the past.
- Prevent duplicate booking.
- Email must be valid.

## 14.3 Contact Message Validation

Required:

- name.
- email.
- message.

Rules:

- Email must be valid.
- Message must not be empty.

## 14.4 Arabic Validation Messages

Use:

- **هذا الحقل مطلوب**
- **يرجى إدخال بريد إلكتروني صحيح**
- **يرجى إدخال رقم هاتف صحيح**
- **يرجى اختيار موعد مناسب**
- **هذا الموعد غير متاح**
- **هذا الكورس غير متاح حالياً**
- **حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى**

---

# 15. API Response Format

## 15.1 Success Response

```json
{
  "success": true,
  "message": "تمت العملية بنجاح",
  "data": {}
}
```

## 15.2 Error Response

```json
{
  "success": false,
  "message": "فشل التحقق من البيانات",
  "errors": [
    {
      "field": "email",
      "message": "يرجى إدخال بريد إلكتروني صحيح"
    }
  ],
  "timestamp": "2026-04-20T10:30:00"
}
```

## 15.3 Exception Handling

Implement:

- `GlobalExceptionHandler`.
- `BusinessException`.
- `NotFoundException`.
- `DuplicateBookingException`.
- Validation error handling.
- Generic fallback exception.

Do not expose stack traces to the client.

---

# 16. Seed Data

Add seed data for:

1. Three courses.
2. Course lessons.
3. Two specialists.
4. Three consultation types.
5. Sample availability slots.
6. FAQ entries.
7. Reviews.

Use the exact corrected Arabic content from this document.

---

# 17. Security and Production Notes

For version 1:

- Public GET APIs are open.
- Write APIs are public but must be validated.
- Add CORS config for frontend URL.
- Add environment-based configuration.
- Do not expose internal errors.
- Add Swagger/OpenAPI.
- Add rate-limit TODO.
- Add admin authentication TODO.

Future:

- Admin login.
- Role-based access.
- Payment gateway integration.
- SMS/WhatsApp/email notifications.
- Course access login.
- Video hosting integration.
- Coupon/discount support.

---

# 18. Admin-Ready Future Structure

Even if no admin UI is built now, backend should be ready for admin endpoints.

Future admin capabilities:

- Manage courses.
- Manage lessons.
- Manage specialists.
- Manage availability.
- Manage bookings.
- Manage purchases.
- Manage FAQs.
- Manage reviews.
- View contact messages.

Design the services and repositories so admin APIs can be added later without rewriting the domain model.

---

# 19. Non-Functional Requirements

The solution must be:

- Clean.
- Maintainable.
- SOLID.
- Responsive.
- Arabic RTL friendly.
- Production-ready in structure.
- Easy to extend.
- Easy to test.
- Not over-engineered.
- Not a quick demo.

Rules:

- No business logic in controllers.
- No direct entity exposure in APIs.
- No duplicated validation rules where avoidable.
- No hardcoded API URLs in frontend.
- No raw SQL in services unless necessary.
- Use DTOs.
- Use mappers.
- Use clear naming.
- Add helpful README files.

---

# 20. Testing Requirements

## 20.1 Backend Tests

Add tests for:

- Course listing.
- Course purchase validation.
- Consultation booking validation.
- Duplicate booking prevention.
- FAQ listing.
- Contact message creation.

Recommended:

- Unit tests for services.
- Integration tests for controllers.
- Repository tests where needed.

## 20.2 Frontend Tests

Add basic tests for:

- Course card rendering.
- Specialist card rendering.
- Booking form validation.
- Checkout form validation.
- FAQ accordion rendering.

---

# 21. Documentation Requirements

Create README files.

## 21.1 Backend README Must Include

- Project overview.
- Tech stack.
- How to run locally.
- Environment variables.
- Database setup.
- Migration instructions.
- Swagger URL.
- Seed data notes.
- API summary.

## 21.2 Frontend README Must Include

- Project overview.
- Tech stack.
- How to run locally.
- Environment variables.
- Page routes.
- Design system notes.
- API connection notes.

## 21.3 Env Examples

Backend `.env.example`:

```env
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/sagheri
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=postgres
FRONTEND_ORIGIN=http://localhost:5173
PAYMENT_PROVIDER=mock
```

Frontend `.env.example`:

```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

---

# 22. Implementation Order

Follow this exact order:

1. Generate monorepo or separate FE/BE structure.
2. Create backend project structure.
3. Create database model and migrations.
4. Add seed data.
5. Implement backend DTOs, mappers, repositories, services, controllers.
6. Add validation and exception handling.
7. Add Swagger/OpenAPI.
8. Create frontend project structure.
9. Add theme, RTL setup, and shared UI components.
10. Build homepage.
11. Build courses pages.
12. Build consultation pages.
13. Build forms and validation.
14. Connect frontend to backend.
15. Add loading/error/success states.
16. Add responsive polish.
17. Add tests.
18. Add README files.

---

# 23. First Response Expected from AI Agent

Before coding, the AI agent must respond with:

1. Confirmed understanding of the project.
2. Proposed project structure.
3. Backend implementation plan.
4. Frontend implementation plan.
5. Database tables summary.
6. Any assumptions.
7. Questions only if blocking.

Do not start generating all files immediately before confirming the structure.

---

# 24. Important Assumptions

Use these assumptions unless instructed otherwise:

- Currency is JOD.
- Consultation booking does not require immediate payment in version 1.
- Course purchase uses mock payment in version 1.
- Admin dashboard is not required now but backend must be admin-ready.
- Arabic is the main language.
- English only appears in brand name, technical labels, or optional metadata.
- Authentication is not required for public version 1.
- Course video access is a future feature.
- Placeholder images are acceptable if final assets are not available.

---

# 25. Final Quality Checklist

Before finishing, verify:

- Arabic text is corrected and readable.
- Website is RTL.
- Design matches reference images.
- Colors match brand palette.
- Cards are rounded and soft.
- Forms are validated.
- APIs work.
- Backend returns consistent response format.
- Database migrations exist.
- Seed data exists.
- No entity is exposed directly.
- Duplicate consultation booking is prevented.
- Course purchase creates a record.
- Contact form creates a message.
- Loading/error/success states exist.
- README files exist.
- Code is clean and extendable.

---

# 26. Developer Note

This project should be implemented as a real MVP foundation, not a mockup.

The frontend should look very close to the attached Sagheri design images.

The backend should be structured as if future admin dashboard, payment integration, course access, notification services, and specialist management will be added later.



---

# 29. V2 Mandatory Enhancements from Review Notes

This section overrides any older line that says admin, authentication, authorization, or real payment integration are future-only. They are required project capabilities.

## 29.1 Reference Asset Coverage Checklist

The AI agent must explicitly cover every attached visual/reference item:

1. **Main UI mockup image**
   - Specialist profile card.
   - Course detail card.
   - Consultation booking calendar/time slots.
   - FAQ accordion.
   - Warm cream/brown card styling.
   - Rounded panels and soft shadows.
   - Video/course preview blocks.
   - Arabic RTL layout.

2. **Color palette image**
   - Use the provided palette: warm earthy brown `#AD6F5F`, aqua/teal `#63A39E`, dark brown `#5D3F33`, cream background `#FDFBF5`, medium brown `#8A6D5E`.
   - Correct spelling: use **بيج كريمي للخلفية** not broken text.
   - Use **بني متوسط للأيقونات والشرائط** for icons/navigation.

3. **Homepage website mockup image**
   - Logo centered at top.
   - Tagline under logo.
   - Two specialist cards.
   - Three course cards.
   - Floating right navigation rail.
   - Footer with support email, phone, and social links.

4. **User journey flowchart image**
   - Implement both branches: course purchase and consultation booking.
   - Course purchase must include registration form, payment, order review, success, and payment failure.
   - Consultation booking must include specialist selection, booking form, review, confirmation, and optional payment if enabled.
   - All forms must include required-field validation.

5. **PDF wireframe**
   - Include homepage navigation, hero, team, courses, reviews, FAQ, contact, footer, and style guide.
   - Use the corrected Arabic copy from this document instead of the broken OCR text.

## 29.2 Middle East Launch Requirements

The website is intended to operate in the Middle East, so the agent must consider the following from the beginning.

### Localization

- Arabic-first RTL experience.
- Arabic content must be stored separately from code where possible.
- Prepare database fields for Arabic and optional English: `titleAr/titleEn`, `descriptionAr/descriptionEn`, `bodyAr/bodyEn`.
- Default locale: `ar`.
- Optional English can be added later without schema redesign.
- Use Arabic date/time display on the frontend where appropriate.
- Support Gregorian calendar first; keep architecture flexible for future Hijri display if needed.

### Regional Settings

Create configurable site settings:

- Default country.
- Supported countries.
- Default currency.
- Supported currencies.
- Tax/VAT settings.
- Timezone.
- Support phone.
- WhatsApp support number.
- Business email.
- Social links.
- Payment provider setting.

Suggested defaults:

```txt
Default locale: ar
Default timezone: Asia/Amman or Asia/Qatar depending on business decision
Supported launch countries: Jordan, Qatar, Saudi Arabia, UAE, Kuwait, Bahrain, Oman
Default currency: JOD initially if pricing remains Jordanian; prepare for QAR, SAR, AED, KWD, BHD, OMR
```

Do not hardcode Jordan-only logic. Prices, currencies, phone country codes, and supported countries must be configurable.

### Phone Number Handling

Use proper country code support:

- +962 Jordan
- +974 Qatar
- +966 Saudi Arabia
- +971 UAE
- +965 Kuwait
- +973 Bahrain
- +968 Oman

Backend should store `phoneCountryCode`, `phoneNumber`, and normalized `phoneE164`. Frontend should show a country-code selector.

### Payment Gateway for Middle East

The payment module must be provider-agnostic and ready for Middle East gateways.

Priority providers:

1. MyFatoorah
2. HyperPay
3. PayTabs
4. Tap Payments as optional future adapter

Required payment capabilities:

- Initiate payment.
- Redirect user to payment page or embedded checkout.
- Handle payment callback/return URL.
- Handle webhook/IPN.
- Verify webhook signature if provider supports it.
- Store payment attempt.
- Store provider reference.
- Support payment status reconciliation.
- Support failed/cancelled/expired payments.
- Support refund fields even if refund API is not implemented in MVP.
- Idempotency key for payment initiation.
- Do not trust frontend payment status.
- Backend must verify final payment status with provider before granting course access or confirming paid consultation.

Payment statuses:

```txt
INITIATED
PENDING
PAID
FAILED
CANCELLED
EXPIRED
REFUNDED
PARTIALLY_REFUNDED
REQUIRES_REVIEW
```

PaymentTransaction fields:

```txt
id
businessType: COURSE_PURCHASE | CONSULTATION_BOOKING
businessId
provider
providerPaymentId
providerInvoiceId
merchantReference
idempotencyKey
amount
currency
status
paymentUrl
successUrl
failureUrl
callbackPayloadJson
webhookPayloadJson
failureReason
paidAt
expiresAt
createdAt
updatedAt
```

### Taxes / VAT / Invoices

Prepare structure for VAT and invoice generation:

- Store subtotal.
- Store discount amount.
- Store tax amount.
- Store total amount.
- Store currency.
- Store invoice number.
- Store invoice status.

Do not implement complex tax rules unless specified, but keep database ready.

## 29.3 Mandatory Authentication and Authorization Scope

The project must include authentication and authorization from the beginning.

### Required Auth Modules

Backend packages:

```txt
com.sagheri.auth
com.sagheri.user
com.sagheri.role
com.sagheri.permission
com.sagheri.security
com.sagheri.audit
```

Frontend modules:

```txt
src/features/auth
src/features/adminAuth
src/features/customerAccount
src/features/adminUsers
src/routes/ProtectedRoute.tsx
src/routes/AdminRoute.tsx
```

### User Entity

Fields:

```txt
id
email
phoneCountryCode
phoneNumber
phoneE164
passwordHash
fullName
status: ACTIVE | INACTIVE | LOCKED | PENDING_VERIFICATION
emailVerified
phoneVerified
lastLoginAt
failedLoginAttempts
lockedUntil
createdAt
updatedAt
```

### Role Model

Use many-to-many between User and Role.

Roles:

```txt
SUPER_ADMIN
ADMIN
CONTENT_MANAGER
SPECIALIST
SUPPORT
CUSTOMER
```

### Permission Examples

```txt
COURSE_READ
COURSE_WRITE
COURSE_DELETE
SPECIALIST_READ
SPECIALIST_WRITE
BOOKING_READ
BOOKING_WRITE
PAYMENT_READ
PAYMENT_RECONCILE
CMS_READ
CMS_WRITE
USER_MANAGE
SETTINGS_MANAGE
AUDIT_READ
```

### JWT Requirements

- Access token short-lived.
- Refresh token long-lived and rotatable.
- Store hashed refresh tokens in database.
- Revoke refresh tokens on logout.
- Include roles/permissions in access token claims.
- Do not store JWT in localStorage if using high-security cookie mode; if using localStorage for simplicity, document the tradeoff and keep admin app XSS-safe.

### Admin Route Protection

Frontend admin pages must:

- Redirect unauthenticated user to `/admin/login`.
- Hide menu items based on role/permissions.
- Still rely on backend enforcement.
- Show unauthorized page for forbidden actions.

## 29.4 Mandatory Admin Portal Scope

The admin portal must be implemented as part of the generated project.

### Admin Dashboard Widgets

Show:

- Total purchases.
- Total consultation bookings.
- Pending bookings.
- Paid revenue by currency.
- Failed payments.
- New contact messages.
- Active courses.
- Active specialists.

### Course Management

Admin can create/edit/activate/deactivate courses, change display order, upload thumbnail, add video preview URL, manage lessons, set price/currency, set access mode, and preview course detail page.

### Specialist Management

Admin can create/edit specialist profiles, upload image, assign specialties, enable/disable specialist, manage consultation types offered, manage availability slots, and view specialist bookings.

### Booking Management

Admin can search/filter bookings, view details, change status, add internal notes, assign booking to specialist, and export CSV.

Booking statuses:

```txt
PENDING_PAYMENT
PENDING_CONFIRMATION
CONFIRMED
CANCELLED
COMPLETED
REJECTED
NO_SHOW
```

### Purchase Management

Admin can view purchases, search by email/phone/course/payment reference, see payment status, grant/revoke course access manually with audit reason, and export CSV.

### CMS Management

Admin can edit hero section, CTA labels, about text, team section copy, courses section copy, FAQ entries, reviews, contact details, footer, social links, terms/privacy pages, and SEO metadata.

### Settings Management

Admin can configure website name, support email, support phone, WhatsApp number, default locale, default country, supported countries, supported currencies, default currency, payment provider, sandbox/live mode, whether consultation payment is required, whether course payment is required, and whether booking auto-confirms after payment.

## 29.5 DRY, Clean Code, and Best Practices

The AI agent must strictly follow these engineering standards.

### Backend Best Practices

- Use layered architecture.
- Controllers only handle HTTP concerns.
- Services contain business logic.
- Repositories only handle data access.
- Use DTOs for API requests/responses.
- Use MapStruct or manual mapper classes consistently.
- Do not expose JPA entities directly.
- Use transactions for write operations.
- Use optimistic locking where useful for booking availability/payment updates.
- Use unique database constraints for business invariants.
- Use enums for controlled statuses.
- Use database migrations for schema changes.
- Use seed data migrations for initial content.
- Use centralized exception handling.
- Use centralized response format.
- Use centralized validation messages.
- Use config properties classes instead of scattered `@Value`.
- Use strategy pattern for payment providers and notification providers.
- Use idempotency utilities for payment and booking creation.
- Use audit service for admin actions.
- Keep packages feature-based.

### Frontend Best Practices

- Use feature-based folder structure.
- Keep API calls in API client/service layer.
- Use reusable UI components.
- Use form schemas with Zod.
- Keep validation messages centralized.
- Keep design tokens centralized.
- Avoid duplicated hardcoded labels.
- Use route guards.
- Use loading, error, empty, and success states.
- Keep components small and focused.
- Use responsive design utilities.
- Use accessible buttons, labels, and form errors.
- Avoid mixing business logic inside UI components.
- Create admin and public layouts separately.

### Shared Constants

Centralize routes, API endpoints, status enums, Arabic labels, currency codes, country codes, validation messages, and theme tokens.

## 29.6 Additional Backend Entities Required

Add these entities beyond the basic model.

### CmsSection

```txt
id
key
section
titleAr
titleEn
bodyAr
bodyEn
imageUrl
ctaLabelAr
ctaLabelEn
ctaUrl
metadataJson
isActive
displayOrder
createdAt
updatedAt
```

### SiteSetting

```txt
id
settingKey
settingValue
settingType
isPublic
updatedBy
updatedAt
```

### AdminAuditLog

```txt
id
actorUserId
action
entityType
entityId
oldValueJson
newValueJson
ipAddress
userAgent
createdAt
```

### NotificationLog

```txt
id
channel: EMAIL | SMS | WHATSAPP
recipient
templateKey
subject
body
status
provider
providerReference
errorMessage
createdAt
sentAt
```

### Coupon / Discount

Prepare coupon support:

```txt
id
code
descriptionAr
discountType: PERCENTAGE | FIXED_AMOUNT
discountValue
currency
startsAt
endsAt
usageLimit
usedCount
isActive
createdAt
updatedAt
```

Coupon can be optional in frontend MVP, but backend should be ready because promotions are common in this business.

## 29.7 Payment and Booking Business Rules

### Course Purchase Rules

- Create `CoursePurchase` with status `PENDING` before payment.
- Initiate payment for the purchase.
- Only mark as `PAID` after provider verification or trusted webhook.
- Grant course access only after paid status.
- Prevent duplicate paid purchase for the same user/course unless admin allows repurchase.
- Allow retry payment for failed payment.
- Store every attempt in `PaymentTransaction`.

### Consultation Booking Rules

- If consultation payment is required:
  - Reserve slot temporarily with expiry.
  - Create booking as `PENDING_PAYMENT`.
  - Initiate payment.
  - Confirm booking after payment success.
  - Release slot if payment expires/fails.
- If consultation payment is not required:
  - Create booking as `PENDING_CONFIRMATION`.
- Prevent double booking by DB unique constraint: `specialist_id + booking_date + booking_time + active statuses`.
- Admin can manually confirm/reject.

### Slot Locking

Use one of these approaches:

1. Pessimistic lock on availability slot during booking creation.
2. Unique booking constraint plus retry/error handling.
3. Temporary reservation entity with expiration.

The generated project should at least implement the unique constraint and clean error handling.

## 29.8 Notification Requirements

Add notification service abstraction.

Interfaces:

```java
public interface NotificationProvider {
    NotificationResult send(NotificationRequest request);
}
```

Providers:

```txt
EmailNotificationProvider
SmsNotificationProvider placeholder
WhatsAppNotificationProvider placeholder
```

Events that should trigger notifications:

- Course purchase initiated.
- Course payment successful.
- Course payment failed.
- Consultation booking submitted.
- Consultation payment successful.
- Booking confirmed/rejected by admin.
- Contact message received.
- Admin password reset.

Use templates and store notification logs.

## 29.9 SEO, Performance, and Accessibility

Frontend must include SEO metadata per page, Arabic page titles, OpenGraph placeholders, semantic HTML, alt text, keyboard accessible forms and accordions, mobile-first responsive layout, lazy-loaded images, optimized bundles, and stable RTL layout.

## 29.10 Final AI Agent Acceptance Criteria

The generated project is incomplete unless it includes:

- Public website matching reference images.
- Arabic RTL layout.
- Corrected Arabic copy.
- Course listing and detail pages.
- Course checkout with payment initiation.
- Consultation booking flow.
- Payment provider abstraction with Middle East provider adapters.
- Admin portal.
- Admin authentication.
- Customer authentication.
- Role-based authorization.
- CMS management.
- Database migrations and seed data.
- API validation and global error handling.
- Audit logs.
- Notification abstraction.
- Clean README.
- `.env.example` for frontend and backend.
- Clear run instructions.
- Tests for core business flows.

If implementation becomes too large for one generation, the AI agent must proceed in milestones:

1. Architecture and project structure.
2. Backend core domain and migrations.
3. Auth and authorization.
4. Payment module.
5. Public frontend.
6. Admin portal.
7. Integration and tests.
8. Polish and documentation.
