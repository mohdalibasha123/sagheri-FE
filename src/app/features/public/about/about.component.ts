import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Language } from '../../../core/enums';
import { LanguageStateService } from '../../../core/state/language-state.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="about-page">
      <div class="about-hero">
        <div class="container">
          <div class="hero-inner">
            <div class="hero-text">
              <span class="badge">{{ text('عن صغيري', 'About Sagheri') }}</span>
              <h1>{{ text('منصة عربية لأمومة أوعى', 'An Arabic platform for conscious motherhood') }}</h1>
              <p class="hero-sub">
                {{ text('صغيري يجمع الكورسات العملية والاستشارات المتخصصة لمساعدة الأم في الحمل والرضاعة وما بعد الولادة.', 'Sagheri combines practical courses and specialist consultations to support mothers through pregnancy, breastfeeding, and postpartum care.') }}
              </p>
              <a routerLink="/specialists" class="btn-book">{{ text('احجزي استشارتك', 'Book a consultation') }}</a>
            </div>
            <div class="hero-visual"><div class="avatar-ring"><div class="avatar-inner">S</div></div></div>
          </div>
        </div>
      </div>
      <div class="container">
        <section class="mission-section">
          <div class="mission-card">
            <h2>{{ text('رسالتنا', 'Our Mission') }}</h2>
            <p>
              {{ text('نؤمن أن كل أم تستحق دعما متخصصا ومعلومة واضحة يمكن تطبيقها بثقة. هدفنا جعل رحلة الأمومة أكثر هدوءا ووعيا.', 'We believe every mother deserves specialist support and clear, practical knowledge. Our goal is to make motherhood calmer and more informed.') }}
            </p>
          </div>
        </section>
        <section class="stats-section">
          @for (s of stats; track s.num) {
            <div class="stat-card"><div class="stat-num">{{ s.num }}</div><div class="stat-label">{{ text(s.label, s.labelEn) }}</div></div>
          }
        </section>
        <section class="about-cta">
          <h2>{{ text('ابدئي رحلتك معنا', 'Start your journey with us') }}</h2>
          <p>{{ text('اختاري كورسا أو استشارة تناسب مرحلتك الحالية.', 'Choose a course or consultation that fits your current stage.') }}</p>
          <div class="cta-btns">
            <a routerLink="/specialists" class="btn-primary">{{ text('احجزي استشارة', 'Book Consultation') }}</a>
            <a routerLink="/courses" class="btn-outline">{{ text('تصفحي الكورسات', 'Browse Courses') }}</a>
          </div>
        </section>
      </div>
    </div>
  `,
  styles: [`
    :host { display:block; }
    .container { max-width:1100px; margin:0 auto; padding:0 24px; }
    .about-page { background:var(--sagheri-bg); padding-bottom:80px; }
    .about-hero { background:linear-gradient(135deg,#fff8ee 0%,#fef6e8 50%,#f9f0e0 100%); padding:60px 24px; border-bottom:1px solid var(--sagheri-border); }
    .hero-inner { display:grid; grid-template-columns:1fr 280px; gap:48px; align-items:center; }
    .badge { display:inline-block; background:rgba(173,111,95,.12); color:var(--sagheri-primary); font-size:12px; font-weight:800; padding:6px 14px; border-radius:999px; margin-bottom:16px; }
    .hero-text h1 { font-size:32px; font-weight:800; color:var(--sagheri-text); margin-bottom:16px; line-height:1.3; }
    .hero-sub { font-size:16px; color:var(--sagheri-text); font-weight:600; margin-bottom:24px; line-height:1.7; }
    .btn-book,.btn-primary { display:inline-block; padding:13px 28px; border-radius:12px; background:var(--sagheri-primary); color:#fff; font-weight:800; text-decoration:none; font-size:15px; }
    .hero-visual { display:flex; justify-content:center; }
    .avatar-ring { width:160px; height:160px; border-radius:50%; background:linear-gradient(135deg,rgba(173,111,95,.2),rgba(99,163,158,.2)); display:flex; align-items:center; justify-content:center; }
    .avatar-inner { width:140px; height:140px; border-radius:50%; background:linear-gradient(135deg,#c8a882,#a07850); display:flex; align-items:center; justify-content:center; font-size:56px; font-weight:800; color:#fff; }
    .mission-section { padding:48px 0 32px; }
    .mission-card { background:linear-gradient(135deg,#63a39e,#4d8480); border-radius:24px; padding:40px; color:#fff; }
    .mission-card h2 { font-size:24px; font-weight:800; margin-bottom:16px; }
    .mission-card p { font-size:15px; line-height:1.85; opacity:.92; }
    .stats-section { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; padding:16px 0 40px; }
    .stat-card { background:#fff; border:1px solid var(--sagheri-border); border-radius:18px; padding:24px; text-align:center; }
    .stat-num { font-size:32px; font-weight:800; color:var(--sagheri-primary); margin-bottom:6px; }
    .stat-label { font-size:13px; color:var(--sagheri-muted); font-weight:600; }
    .about-cta { background:linear-gradient(135deg,#fff8ee,#fdf5e4); border:1px solid var(--sagheri-border); border-radius:24px; padding:48px; text-align:center; }
    .about-cta h2 { font-size:26px; font-weight:800; color:var(--sagheri-text); margin-bottom:10px; }
    .about-cta p { font-size:15px; color:var(--sagheri-muted); margin-bottom:28px; }
    .cta-btns { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; }
    .btn-outline { padding:13px 28px; border-radius:12px; border:2px solid var(--sagheri-primary); color:var(--sagheri-primary); font-weight:800; text-decoration:none; font-size:15px; background:transparent; }
    @media (max-width:900px) { .hero-inner { grid-template-columns:1fr; } .hero-visual { display:none; } .stats-section { grid-template-columns:1fr 1fr; } }
  `],
})
export class AboutComponent {
  private readonly languageState = inject(LanguageStateService);
  readonly stats = [
    { num: '+500', label: 'أسرة مدعومة', labelEn: 'families supported' },
    { num: '+8', label: 'سنوات خبرة', labelEn: 'years experience' },
    { num: '4.9', label: 'تقييم الأمهات', labelEn: 'mother rating' },
    { num: '+50', label: 'دولة', labelEn: 'countries' },
  ];

  isEnglish(): boolean {
    return this.languageState.language() === Language.EN;
  }

  text(ar: string, en: string): string {
    return this.isEnglish() ? en : ar;
  }
}
