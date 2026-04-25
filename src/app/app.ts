import { DOCUMENT } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

type Language = 'ar' | 'en';

const CONTENT = {
  ar: {
    dir: 'rtl',
    htmlLang: 'ar',
    switchLabel: 'English',
    brandMark: 'ص',
    brand: 'صغيري',
    brandSubtitle: 'طريقك لأمومة أوعى',
    navItems: [
      { label: 'الرئيسية', icon: '⌂', href: '#home' },
      { label: 'الاستشارات', icon: '◌', href: '#specialists' },
      { label: 'كورسـاتنا', icon: '▤', href: '#courses' },
      { label: 'الأسئلة', icon: '؟', href: '#faq' },
      { label: 'عنّا', icon: '♡', href: '#about' },
      { label: 'تواصل', icon: '✉', href: '#contact' },
    ],
    ctaNow: 'اشتركي الآن',
    heroEyebrow: 'منصة عربية للأمومة الواعية',
    heroTitle: 'صغيري - رحلتك الواعية في الأمومة',
    heroText:
      'تعلمي، اسألي، واطمئني مع مختصات يساعدنك في الحمل، الرضاعة، تغذية الطفل، ورعاية ما بعد الولادة بخطوات واضحة ومبسطة.',
    coursesCta: 'اشتركي في الكورسات',
    consultCta: 'احجزي استشارة مع أخصائية',
    badges: ['محتوى عربي موثوق', 'مختصات معتمدات', 'استشارات فردية', 'كورسات مبسطة'],
    heroProfileName: 'بيان القضماني',
    heroProfileTitle: 'استشارية رضاعة معتمدة IBCLC',
    heroProfileNote: 'استشارة فردية مطمئنة',
    heroCourseTitle: 'تحضير ما قبل الحمل',
    heroCourseText: 'تغذية وعضلات الحوض بخطوات عملية.',
    bookingPrompt: 'اختاري وقتك المناسب',
    video: 'فيديو',
    voice: 'صوتية',
    bookNow: 'احجزي الآن',
    aboutEyebrow: 'عن صغيري',
    aboutTitle: 'رفيقتك في كل مرحلة من رحلة الأمومة',
    aboutText:
      'صغيري منصة عربية صممت لتكون رفيقتك من مرحلة التخطيط للحمل وحتى ما بعد الولادة. نقدم كورسات مبسطة واستشارات فردية تساعدك على فهم جسمك، رعاية طفلك، والتعامل مع التحديات بثقة ووعي.',
    features: [
      { title: 'معرفة مبسطة', text: 'محتوى واضح وسهل الفهم يناسب الأمهات في مختلف المراحل.' },
      { title: 'دعم متخصص', text: 'استشارات مع مختصات في الرضاعة، التغذية، والعلاج الطبيعي.' },
      { title: 'خطوات عملية', text: 'نصائح قابلة للتطبيق تساعدك في حياتك اليومية كأم.' },
    ],
    specialistsEyebrow: 'الاستشارات',
    specialistsTitle: 'اختاري الأخصائية المناسبة لكِ',
    specialistsText:
      'استشارات فردية مع مختصات في الرضاعة الطبيعية، التغذية، والعلاج الطبيعي لمساعدتك في كل مرحلة من رحلتك.',
    specialists: [
      {
        name: 'بيان القضماني',
        title: 'استشارية رضاعة دولية معتمدة IBCLC',
        description:
          'خبيرة في دعم الأمهات خلال الحمل والرضاعة، ومساعدتهن على التعامل مع تحديات الرضاعة الطبيعية وزيادة إدرار الحليب.',
        action: 'احجزي استشارة مع بيان',
        theme: 'primary',
      },
      {
        name: 'أخصائية العلاج الطبيعي',
        title: 'أخصائية علاج طبيعي لصحة المرأة',
        description:
          'تساعد الأمهات على تقوية الجسم، تحسين عضلات الحوض، الاستعداد للولادة، والتعافي بعد الحمل والولادة.',
        action: 'احجزي استشارة مع الأخصائية',
        theme: 'secondary',
      },
    ],
    coursesEyebrow: 'كورسـاتنا',
    coursesTitle: 'كورسات صغيري',
    coursesText: 'كورسات مصممة بعناية لتمنحك معرفة واضحة، خطوات عملية، وطمأنينة في كل مرحلة.',
    courses: [
      {
        title: 'تحضير ما قبل الحمل: تغذية وعضلات الحوض',
        description: 'كورس يساعدك على التحضير للحمل من خلال التغذية المناسبة وتمارين عضلات الحوض.',
        duration: '90 دقيقة',
        lessons: '2 درس',
        illustration: 'prep',
      },
      {
        title: 'رحلة الحمل: مراحل النمو وتغيرات الجسم',
        description: 'تعرفي على مراحل الحمل، تغيرات الجسم، التغذية المناسبة، والتمارين الآمنة.',
        duration: '270 دقيقة',
        lessons: '3 أجزاء',
        illustration: 'pregnancy',
      },
      {
        title: 'بعد الولادة: الرضاعة والتغذية والعناية بالطفل',
        description: 'كورس عملي لفهم الرضاعة الطبيعية وتغذية الأم والرضيع والعناية اليومية بالطفل.',
        duration: '4 ساعات',
        lessons: '4-5 دروس',
        illustration: 'baby',
      },
    ],
    duration: 'المدة',
    lessons: 'الدروس',
    price: 'السعر',
    priceValue: '150 دينار',
    ratingLabel: 'تقييم 5 من 5',
    viewCourse: 'عرض محتوى الكورس',
    bookingEyebrow: 'حجز سريع',
    bookingTitle: 'احجزي استشارتك بسهولة',
    bookingText: 'اختاري نوع الاستشارة، حددي الوقت المناسب، واتركي بياناتك ليتم تأكيد الموعد معكِ.',
    consultationTypes: ['مكالمة فيديو', 'مكالمة صوتية', 'محادثة نصية'],
    faqEyebrow: 'الأسئلة الشائعة',
    faqTitle: 'إجابات مختصرة تطمئنك',
    faqs: [
      {
        question: 'هل الرضاعة الطبيعية مؤلمة؟',
        answer:
          'قد تشعر بعض الأمهات بانزعاج بسيط في الأيام الأولى، لكن الألم الشديد أو المستمر غالبا يدل على مشكلة في الالتقام أو الوضعية.',
      },
      {
        question: 'كيف أزيد إدرار الحليب؟',
        answer:
          'زيادة إدرار الحليب تعتمد على الرضاعة المتكررة، التفريغ الجيد للثدي، شرب السوائل، الراحة، والتأكد من أن الطفل يرضع بطريقة صحيحة.',
      },
      {
        question: 'متى أبدأ تغذية الطفل؟',
        answer:
          'عادة يبدأ إدخال الطعام التكميلي حول عمر 6 أشهر، مع الاستمرار في الرضاعة حسب حالة الطفل وتوصيات الطبيب.',
      },
      {
        question: 'هل يحتاج الرضيع لمكملات غذائية؟',
        answer:
          'قد يحتاج بعض الأطفال إلى مكملات مثل فيتامين د، لكن القرار يعتمد على عمر الطفل وحالته الصحية وتوصيات الطبيب أو الأخصائية.',
      },
    ],
    reviewsEyebrow: 'آراء الأمهات',
    reviewsTitle: 'تجارب قريبة من واقعك',
    reviews: [
      { text: 'الكورس كان واضح ومفيد جدا، ساعدني أفهم جسمي وأستعد للحمل بثقة أكبر.', name: 'أم ليان' },
      {
        text: 'الاستشارة مع الأخصائية طمنتني كثيرا وفهمت أخيرا سبب ألم الرضاعة وكيف أتعامل معه.',
        name: 'أم يزن',
      },
      { text: 'المحتوى مرتب وسهل، حسيت أنه معمول للأمهات فعلا وليس مجرد معلومات عامة.', name: 'أم سارة' },
    ],
    contactEyebrow: 'تواصلي معنا',
    contactTitle: 'للاستفسارات أو الحجز',
    contactText: 'يسعدنا تواصلك لمعرفة المزيد عن الكورسات والاستشارات أو لتأكيد موعد مناسب.',
    nameLabel: 'الاسم',
    namePlaceholder: 'اكتبي اسمك',
    emailLabel: 'البريد الإلكتروني',
    phoneLabel: 'رقم الهاتف',
    messageLabel: 'الرسالة',
    messagePlaceholder: 'كيف يمكننا مساعدتك؟',
    send: 'إرسال',
    footer: '© 2026 صغيري. جميع الحقوق محفوظة.',
  },
  en: {
    dir: 'ltr',
    htmlLang: 'en',
    switchLabel: 'العربية',
    brandMark: 'S',
    brand: 'Sagheri',
    brandSubtitle: 'Your path to mindful motherhood',
    navItems: [
      { label: 'Home', icon: '⌂', href: '#home' },
      { label: 'Consultations', icon: '◌', href: '#specialists' },
      { label: 'Courses', icon: '▤', href: '#courses' },
      { label: 'FAQ', icon: '?', href: '#faq' },
      { label: 'About', icon: '♡', href: '#about' },
      { label: 'Contact', icon: '✉', href: '#contact' },
    ],
    ctaNow: 'Join Now',
    heroEyebrow: 'Arabic-first mindful motherhood platform',
    heroTitle: 'Sagheri - Your Mindful Motherhood Journey',
    heroText:
      'Learn, ask, and feel reassured with specialists who support pregnancy, breastfeeding, baby nutrition, and postpartum care through clear practical steps.',
    coursesCta: 'Join the Courses',
    consultCta: 'Book a Specialist Consultation',
    badges: ['Trusted Arabic content', 'Certified specialists', 'One-to-one consultations', 'Simple courses'],
    heroProfileName: 'Bayan Al-Qadamani',
    heroProfileTitle: 'Certified IBCLC Lactation Consultant',
    heroProfileNote: 'Calm one-to-one guidance',
    heroCourseTitle: 'Preparing Before Pregnancy',
    heroCourseText: 'Nutrition and pelvic-floor steps made practical.',
    bookingPrompt: 'Choose a suitable time',
    video: 'Video',
    voice: 'Voice',
    bookNow: 'Book Now',
    aboutEyebrow: 'About Sagheri',
    aboutTitle: 'A companion for every stage of motherhood',
    aboutText:
      'Sagheri is an Arabic-first platform designed to support you from pregnancy planning through postpartum. We offer simple courses and individual consultations that help you understand your body, care for your baby, and face challenges with confidence.',
    features: [
      { title: 'Simple Knowledge', text: 'Clear content that is easy to understand across different motherhood stages.' },
      { title: 'Specialist Support', text: 'Consultations with specialists in lactation, nutrition, and physical therapy.' },
      { title: 'Practical Steps', text: 'Actionable guidance that fits everyday life as a mother.' },
    ],
    specialistsEyebrow: 'Consultations',
    specialistsTitle: 'Choose the right specialist for you',
    specialistsText:
      'Individual consultations with specialists in breastfeeding, nutrition, and physical therapy to support every stage of your journey.',
    specialists: [
      {
        name: 'Bayan Al-Qadamani',
        title: 'Certified International Lactation Consultant IBCLC',
        description:
          'Experienced in supporting mothers through pregnancy and breastfeeding, including latch challenges and milk supply concerns.',
        action: 'Book with Bayan',
        theme: 'primary',
      },
      {
        name: 'Women’s Physical Therapist',
        title: 'Physical Therapist for Women’s Health',
        description:
          'Helps mothers strengthen the body, improve pelvic-floor function, prepare for birth, and recover after pregnancy.',
        action: 'Book with the Specialist',
        theme: 'secondary',
      },
    ],
    coursesEyebrow: 'Courses',
    coursesTitle: 'Sagheri Courses',
    coursesText: 'Carefully designed courses that give you clear knowledge, practical steps, and reassurance at each stage.',
    courses: [
      {
        title: 'Before Pregnancy: Nutrition and Pelvic Floor',
        description: 'A course that helps you prepare for pregnancy with suitable nutrition and pelvic-floor exercises.',
        duration: '90 minutes',
        lessons: '2 lessons',
        illustration: 'prep',
      },
      {
        title: 'Pregnancy Journey: Growth Stages and Body Changes',
        description: 'Learn about pregnancy stages, body changes, nutrition, and safe movement.',
        duration: '270 minutes',
        lessons: '3 parts',
        illustration: 'pregnancy',
      },
      {
        title: 'Postpartum: Breastfeeding, Nutrition, and Baby Care',
        description: 'A practical course for breastfeeding, mother and infant nutrition, and daily baby care.',
        duration: '4 hours',
        lessons: '4-5 lessons',
        illustration: 'baby',
      },
    ],
    duration: 'Duration',
    lessons: 'Lessons',
    price: 'Price',
    priceValue: '150 JOD',
    ratingLabel: '5 out of 5 rating',
    viewCourse: 'View Course Content',
    bookingEyebrow: 'Quick Booking',
    bookingTitle: 'Book your consultation easily',
    bookingText: 'Choose the consultation type, select a suitable time, and leave your details so the appointment can be confirmed.',
    consultationTypes: ['Video Call', 'Voice Call', 'Text Chat'],
    faqEyebrow: 'FAQ',
    faqTitle: 'Short answers that reassure you',
    faqs: [
      {
        question: 'Is breastfeeding painful?',
        answer:
          'Some mothers may feel mild discomfort in the early days, but severe or lasting pain often points to a latch or positioning issue.',
      },
      {
        question: 'How can I increase milk supply?',
        answer:
          'Milk supply is supported by frequent feeding, effective breast emptying, fluids, rest, and making sure the baby feeds correctly.',
      },
      {
        question: 'When should I start feeding my baby solids?',
        answer:
          'Complementary foods usually start around 6 months, while continuing breastfeeding or formula according to the baby’s needs and medical advice.',
      },
      {
        question: 'Does my baby need supplements?',
        answer:
          'Some babies may need supplements such as vitamin D, but this depends on age, health, and professional recommendations.',
      },
    ],
    reviewsEyebrow: 'Mother Reviews',
    reviewsTitle: 'Experiences that feel close to yours',
    reviews: [
      { text: 'The course was clear and very useful. It helped me understand my body and prepare for pregnancy with more confidence.', name: 'Layan’s Mother' },
      {
        text: 'The specialist consultation reassured me and finally helped me understand breastfeeding pain and how to handle it.',
        name: 'Yazan’s Mother',
      },
      { text: 'The content is organized and easy. It feels truly made for mothers, not just generic information.', name: 'Sara’s Mother' },
    ],
    contactEyebrow: 'Contact Us',
    contactTitle: 'For questions or booking',
    contactText: 'We are happy to help you learn more about courses and consultations or confirm a suitable appointment.',
    nameLabel: 'Name',
    namePlaceholder: 'Your name',
    emailLabel: 'Email',
    phoneLabel: 'Phone',
    messageLabel: 'Message',
    messagePlaceholder: 'How can we help?',
    send: 'Send',
    footer: '© 2026 Sagheri. All rights reserved.',
  },
} as const;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly document = inject(DOCUMENT);
  readonly lang = signal<Language>('ar');
  readonly copy = computed(() => CONTENT[this.lang()]);

  constructor() {
    effect(() => {
      const copy = this.copy();
      this.document.documentElement.lang = copy.htmlLang;
      this.document.documentElement.dir = copy.dir;
      this.document.title =
        this.lang() === 'ar'
          ? 'صغيري - رحلتك الواعية في الأمومة'
          : 'Sagheri - Your Mindful Motherhood Journey';
    });
  }

  toggleLanguage(): void {
    this.lang.update((value) => (value === 'ar' ? 'en' : 'ar'));
  }
}
