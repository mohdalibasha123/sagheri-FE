import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Language } from '../../../core/enums';
import { PublicContentService } from '../../../core/services/public-content.service';
import { LanguageStateService } from '../../../core/state/language-state.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="contact-page">
      <div class="contact-hero">
        <div class="container">
          <h1>{{ text('تواصلي معنا', 'Contact Us') }}</h1>
          <p>{{ text('نحن هنا للإجابة على أسئلتك ودعمك في رحلة الأمومة', 'We are here to answer your questions and support your motherhood journey') }}</p>
        </div>
      </div>
      <div class="container">
        <div class="contact-layout">
          <div class="contact-form-wrap">
            @if (sent()) {
              <div class="success-box">
                <div class="success-icon">✓</div>
                <h3>{{ text('تم الإرسال بنجاح', 'Message sent') }}</h3>
                <p>{{ text('سنرد عليك خلال 24 ساعة.', 'We will reply within 24 hours.') }}</p>
              </div>
            } @else {
              <h2 class="form-heading">{{ text('أرسلي رسالتك', 'Send your message') }}</h2>
              <form class="the-form" (ngSubmit)="send()">
                <div class="form-row">
                  <label class="form-field">{{ text('الاسم الأول', 'First name') }}<input [(ngModel)]="form.firstName" name="firstName" required /></label>
                  <label class="form-field">{{ text('اسم العائلة', 'Last name') }}<input [(ngModel)]="form.lastName" name="lastName" required /></label>
                </div>
                <label class="form-field">{{ text('البريد الإلكتروني', 'Email') }}<input type="email" [(ngModel)]="form.email" name="email" required /></label>
                <label class="form-field">{{ text('الموضوع', 'Subject') }}<input [(ngModel)]="form.subject" name="subject" /></label>
                <label class="form-field">{{ text('رسالتك', 'Message') }}<textarea [(ngModel)]="form.message" name="message" rows="5" required></textarea></label>
                <button type="submit" class="btn-send">{{ text('إرسال الرسالة', 'Send Message') }}</button>
              </form>
            }
          </div>
          <div class="contact-info">
            <div class="info-card">
              <div class="info-item"><div class="info-icon">✉</div><div><h4>{{ text('البريد الإلكتروني', 'Email') }}</h4><p>info&#64;sagheri.com</p></div></div>
              <div class="info-item"><div class="info-icon">☎</div><div><h4>{{ text('واتساب', 'WhatsApp') }}</h4><p dir="ltr">+962 7x xxx xxxx</p></div></div>
              <div class="info-item"><div class="info-icon">◷</div><div><h4>{{ text('ساعات العمل', 'Working hours') }}</h4><p>{{ text('السبت - الخميس، 9 صباحا - 6 مساء', 'Saturday - Thursday, 9 AM - 6 PM') }}</p></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display:block; }
    .container { max-width:1100px; margin:0 auto; padding:0 24px; }
    .contact-page { background:var(--sagheri-bg); padding-bottom:80px; }
    .contact-hero { background:linear-gradient(135deg,#fff8ee,#fdf5e4); padding:56px 24px 40px; text-align:center; border-bottom:1px solid var(--sagheri-border); }
    .contact-hero h1 { font-size:36px; font-weight:800; color:var(--sagheri-text); margin-bottom:8px; }
    .contact-hero p { font-size:16px; color:var(--sagheri-muted); }
    .contact-layout { display:grid; grid-template-columns:1fr 320px; gap:40px; padding:40px 0; align-items:start; }
    .contact-form-wrap,.info-card { background:#fff; border:1px solid var(--sagheri-border); border-radius:20px; padding:32px; }
    .form-heading { font-size:20px; font-weight:800; color:var(--sagheri-text); margin-bottom:24px; }
    .the-form { display:flex; flex-direction:column; gap:16px; }
    .form-row { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
    .form-field { display:flex; flex-direction:column; gap:6px; font-size:13px; font-weight:700; color:var(--sagheri-text); }
    input,textarea { border:1.5px solid var(--sagheri-border); border-radius:10px; padding:10px 12px; font:inherit; color:var(--sagheri-text); background:#fff; }
    textarea { resize:vertical; }
    .btn-send { padding:14px; border-radius:12px; background:var(--sagheri-secondary); color:#fff; font:inherit; font-size:16px; font-weight:800; border:none; cursor:pointer; }
    .success-box { text-align:center; padding:32px 0; }
    .success-icon { font-size:52px; color:var(--sagheri-secondary); margin-bottom:16px; }
    .info-item { display:flex; align-items:flex-start; gap:14px; margin-bottom:20px; }
    .info-item:last-child { margin-bottom:0; }
    .info-icon { font-size:24px; flex-shrink:0; color:var(--sagheri-primary); }
    .info-item h4 { font-size:14px; font-weight:800; color:var(--sagheri-text); margin-bottom:4px; }
    .info-item p { font-size:13px; color:var(--sagheri-muted); line-height:1.6; }
    @media (max-width:900px) { .contact-layout { grid-template-columns:1fr; } }
    @media (max-width:600px) { .form-row { grid-template-columns:1fr; } }
  `],
})
export class ContactComponent {
  private readonly languageState = inject(LanguageStateService);
  private readonly content = inject(PublicContentService);
  private readonly cdr = inject(ChangeDetectorRef);
  readonly sent = signal(false);
  readonly form = { firstName: '', lastName: '', email: '', subject: '', message: '' };

  isEnglish(): boolean {
    return this.languageState.language() === Language.EN;
  }

  text(ar: string, en: string): string {
    return this.isEnglish() ? en : ar;
  }

  send(): void {
    this.content.createContactMessage({
      name: `${this.form.firstName} ${this.form.lastName}`.trim(),
      email: this.form.email,
      phone: '',
      message: this.form.subject ? `${this.form.subject}\n\n${this.form.message}` : this.form.message,
    }).subscribe(() => {
      this.sent.set(true);
      this.cdr.markForCheck();
    });
  }
}
