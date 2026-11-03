import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Language } from '../../../core/enums';
import { BackendCourseDetail, PublicContentService } from '../../../core/services/public-content.service';
import { LanguageStateService } from '../../../core/state/language-state.service';

@Component({
  selector: 'app-course-checkout',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="checkout-page">
      <div class="checkout-card">
        <a routerLink="/courses" class="back-link">{{ t('العودة للكورسات', 'Back to courses') }}</a>
        <h1>{{ t('إتمام الشراء', 'Checkout') }}</h1>
        @if (course) {
          <div class="summary">
            <h2>{{ t(course.titleAr, course.titleEn || course.titleAr) }}</h2>
            <p>{{ t(course.descriptionAr, course.descriptionEn || course.descriptionAr) }}</p>
            <strong>{{ course.priceAmount }} {{ course.currency }}</strong>
          </div>
        }

        @if (created()) {
          <div class="success">
            <h2>{{ t('تم إنشاء طلب الشراء', 'Purchase created') }}</h2>
            <p>{{ t('مرجع الدفع:', 'Payment reference:') }} {{ paymentReference() }}</p>
          </div>
        } @else {
          <form #checkoutForm="ngForm" class="checkout-form" (ngSubmit)="submit(checkoutForm.valid)">
            <div class="row">
              <label>{{ t('الاسم الأول', 'First name') }}<input [(ngModel)]="form.firstName" name="firstName" required /></label>
              <label>{{ t('اسم العائلة', 'Last name') }}<input [(ngModel)]="form.lastName" name="lastName" required /></label>
            </div>
            <label>{{ t('البريد الإلكتروني', 'Email') }}<input type="email" [(ngModel)]="form.email" name="email" required /></label>
            <div class="row phone-row">
              <label>{{ t('رمز الدولة', 'Country code') }}<input [(ngModel)]="form.phoneCountryCode" name="phoneCountryCode" required /></label>
              <label>{{ t('رقم الهاتف', 'Phone number') }}<input type="tel" [(ngModel)]="form.phoneNumber" name="phoneNumber" required /></label>
            </div>
            <label>{{ t('الدولة', 'Country') }}<input [(ngModel)]="form.country" name="country" required /></label>
            <label>
              {{ t('الحالة الحالية', 'Current status') }}
              <select [(ngModel)]="form.motherStatus" name="motherStatus" required>
                <option value="PREGNANT">{{ t('حامل', 'Pregnant') }}</option>
                <option value="BREASTFEEDING">{{ t('مرضع', 'Breastfeeding') }}</option>
                <option value="PLANNING_PREGNANCY">{{ t('أتجهز للحمل', 'Planning pregnancy') }}</option>
                <option value="OTHER">{{ t('أخرى', 'Other') }}</option>
              </select>
            </label>
            @if (error()) {
              <div class="error">{{ error() }}</div>
            }
            <button type="submit" [disabled]="loading()">{{ loading() ? t('جاري الإرسال...', 'Submitting...') : t('تأكيد الشراء', 'Confirm purchase') }}</button>
          </form>
        }
      </div>
    </div>
  `,
  styles: [`
    :host { display:block; }
    .checkout-page { min-height:70vh; padding:72px 24px; background:var(--sagheri-bg); }
    .checkout-card { width:min(100%,760px); margin:0 auto; padding:28px; border:1px solid var(--sagheri-border); border-radius:22px; background:#fff; box-shadow:var(--shadow-card); }
    .back-link { color:var(--sagheri-secondary); font-weight:800; text-decoration:none; }
    h1 { margin:18px 0; color:var(--sagheri-text); }
    .summary { padding:18px; margin-bottom:18px; border-radius:16px; background:var(--sagheri-card); border:1px solid var(--sagheri-border); }
    .summary h2 { margin:0 0 8px; font-size:20px; color:var(--sagheri-text); }
    .summary p { color:var(--sagheri-muted); }
    .summary strong { display:block; margin-top:8px; color:var(--sagheri-primary); font-size:22px; }
    .checkout-form { display:grid; gap:14px; }
    .row { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
    .phone-row { grid-template-columns:150px 1fr; }
    label { display:grid; gap:6px; font-weight:800; color:var(--sagheri-text); }
    input, select { min-height:44px; padding:10px 12px; border:1px solid var(--sagheri-border); border-radius:12px; background:#fff; font:inherit; }
    button { min-height:48px; border:0; border-radius:12px; color:#fff; background:var(--sagheri-primary); font:inherit; font-weight:800; cursor:pointer; }
    button:disabled { opacity:.7; cursor:progress; }
    .error { padding:10px 12px; border-radius:12px; color:var(--sagheri-danger); background:rgba(179,38,30,.08); }
    .success { padding:18px; border-radius:16px; color:var(--sagheri-success); background:rgba(31,95,15,.08); }
    @media (max-width:640px) { .row, .phone-row { grid-template-columns:1fr; } }
  `],
})
export class CourseCheckoutComponent {
  private readonly lang = inject(LanguageStateService);
  private readonly route = inject(ActivatedRoute);
  private readonly content = inject(PublicContentService);
  private readonly cdr = inject(ChangeDetectorRef);

  readonly loading = signal(false);
  readonly created = signal(false);
  readonly error = signal('');
  readonly paymentReference = signal('');

  course?: BackendCourseDetail;
  courseId = '';
  form = {
    firstName: '',
    lastName: '',
    phoneCountryCode: '+962',
    phoneNumber: '',
    country: 'Jordan',
    email: '',
    motherStatus: 'PREGNANT',
  };

  constructor() {
    this.courseId = this.route.snapshot.paramMap.get('courseId') || '';
    if (this.courseId) {
      this.content.course(this.courseId).subscribe((course) => {
        this.course = course;
        this.cdr.markForCheck();
      });
    }
  }

  t(ar: string, en: string): string {
    return this.lang.language() === Language.EN ? en : ar;
  }

  submit(valid: boolean | null): void {
    if (!valid || !this.courseId) {
      this.error.set(this.t('يرجى تعبئة الحقول المطلوبة', 'Please fill the required fields'));
      return;
    }

    this.loading.set(true);
    this.error.set('');
    this.content.purchaseCourse(this.courseId, this.form).subscribe({
      next: (res) => {
        const response = res as { paymentReference?: string };
        this.paymentReference.set(response.paymentReference || '');
        this.created.set(true);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(this.t('تعذر إنشاء طلب الشراء. يرجى المحاولة مرة أخرى.', 'Could not create purchase. Please try again.'));
        this.loading.set(false);
      },
    });
  }
}
