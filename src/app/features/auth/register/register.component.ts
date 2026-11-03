import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { APP_ROUTES } from '../../../core/constants/app-routes';
import { Language } from '../../../core/enums';
import { ChronicDisease, MotherStatus, RegisterRequest } from '../../../core/models/auth.model';
import { LanguageStateService } from '../../../core/state/language-state.service';

interface SelectOption<T extends string = string> {
  value: T;
  labelAr: string;
  labelEn: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule],
  template: `
    <div class="auth-page">
      <form class="auth-card" (ngSubmit)="register()">
        <img src="/sagheri-logo.png" [alt]="text('شعار صغيري', 'Sagheri logo')" />
        <h1>{{ text('إنشاء حساب', 'Create Account') }}</h1>
        <p>{{ text('أدخلي بياناتك حتى تكون تجربتك داخل صغيري مناسبة لمرحلتك واحتياجك.', 'Enter your details so Sagheri can match your stage and needs.') }}</p>

        <label>
          {{ text('الإسم', 'Full name') }}
          <input [(ngModel)]="form.fullName" name="fullName" autocomplete="name" required />
        </label>

        <div class="row">
          <label>
            {{ text('العمر', 'Age') }}
            <input type="date" [(ngModel)]="form.dateOfBirth" name="dateOfBirth" [max]="today" required />
            <span class="field-hint">{{ text('اختاري تاريخ الميلاد، وسيتم إرساله كتاريخ وليس كرقم عمر.', 'Choose date of birth. We send the date, not a numeric age.') }}</span>
          </label>

          <label>
            {{ text('الجنسية', 'Nationality') }}
            <select [(ngModel)]="form.nationality" name="nationality" required>
              @for (country of arabCountries; track country.value) {
                <option [value]="country.value">{{ text(country.labelAr, country.labelEn) }}</option>
              }
            </select>
          </label>
        </div>

        <label>
          {{ text('حامل/مرضع؟', 'Pregnant / breastfeeding?') }}
          <select [(ngModel)]="form.motherStatus" name="motherStatus" required>
            @for (status of motherStatuses; track status.value) {
              <option [value]="status.value">{{ text(status.labelAr, status.labelEn) }}</option>
            }
          </select>
        </label>

        <label>
          {{ text('كم طفل عند الأم غير الحمل؟', 'How many children, excluding current pregnancy?') }}
          <input type="number" [(ngModel)]="form.childrenCount" name="childrenCount" min="0" inputmode="numeric" required />
        </label>

        <fieldset>
          <legend>{{ text('هل عند الأم أمراض مزمنة؟', 'Does the mother have chronic diseases?') }}</legend>
          <div class="chip-grid">
            @for (disease of chronicDiseaseOptions; track disease.value) {
              <label class="chip-option">
                <input
                  class="chip-check"
                  type="checkbox"
                  [checked]="hasDisease(disease.value)"
                  (change)="toggleDisease(disease.value)"
                  [name]="'disease-' + disease.value"
                />
                <span class="check-box" aria-hidden="true"></span>
                <span class="chip-label">{{ text(disease.labelAr, disease.labelEn) }}</span>
              </label>
            }
          </div>
        </fieldset>

        @if (hasDisease('OTHER')) {
          <label>
            {{ text('اذكري المرض المزمن الآخر', 'Other chronic disease') }}
            <input [(ngModel)]="form.chronicDiseaseOther" name="chronicDiseaseOther" />
          </label>
        }

        <label>
          {{ text('هل عند الأم حساسية دوائية؟', 'Medication allergy') }}
          <input [(ngModel)]="form.medicationAllergy" name="medicationAllergy" />
        </label>

        <label>
          {{ text('هل عند الأم حساسية غذائية؟', 'Food allergy') }}
          <input [(ngModel)]="form.foodAllergy" name="foodAllergy" />
        </label>

        <label>
          {{ text('البريد الإلكتروني', 'Email') }}
          <input type="email" [(ngModel)]="form.email" name="email" autocomplete="email" required />
        </label>

        <label>
          {{ text('كلمة المرور', 'Password') }}
          <input type="password" [(ngModel)]="form.password" name="password" autocomplete="new-password" required />
        </label>

        @if (error()) {
          <div class="auth-error">{{ error() }}</div>
        }

        <button class="btn-auth" type="submit" [disabled]="loading()">
          {{ loading() ? text('جاري إنشاء الحساب...', 'Creating account...') : text('إنشاء الحساب', 'Create account') }}
        </button>

        <p class="switch">
          {{ text('لديك حساب بالفعل؟', 'Already have an account?') }}
          <a routerLink="/auth/login">{{ text('تسجيل الدخول', 'Login') }}</a>
        </p>
      </form>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }

      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      .auth-page {
        min-height: 100vh;
        display: grid;
        place-items: center;
        width: 100%;
        padding: 72px 24px 32px;
        background: var(--sagheri-bg);
        overflow-x: hidden;
      }

      .auth-card {
        width: min(100%, 680px);
        max-width: 100%;
        display: grid;
        gap: 14px;
        padding: 34px;
        border: 1px solid var(--sagheri-border);
        border-radius: 24px;
        background: #fff;
        box-shadow: var(--shadow-card);
      }

      img {
        width: 72px;
        height: 72px;
        object-fit: contain;
        margin: 0 auto;
      }

      h1,
      p {
        margin: 0;
        text-align: center;
      }

      p {
        color: var(--sagheri-muted);
      }

      .row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 14px;
        align-items: start;
      }

      label,
      fieldset {
        display: grid;
        gap: 7px;
        min-width: 0;
        color: var(--sagheri-text);
        font-weight: 800;
        line-height: 1.45;
      }

      .row > label {
        grid-template-rows: auto 46px minmax(18px, auto);
      }

      fieldset {
        margin: 0;
        padding: 14px;
        border: 1px solid var(--sagheri-border);
        border-radius: 16px;
      }

      legend {
        padding: 0 6px;
        color: var(--sagheri-text);
      }

      input:not([type='checkbox']),
      select {
        width: 100%;
        min-width: 0;
        height: 46px;
        padding: 10px 12px;
        border: 1px solid var(--sagheri-border);
        border-radius: 12px;
        background: #fff;
        color: var(--sagheri-text);
        font: inherit;
      }

      select {
        appearance: auto;
      }

      input:not([type='checkbox']):focus,
      select:focus {
        outline: 3px solid rgba(99, 163, 158, .16);
        border-color: var(--sagheri-secondary);
      }

      .field-hint {
        min-height: 18px;
        color: var(--sagheri-muted);
        font-size: 12px;
        font-weight: 600;
        line-height: 1.5;
      }

      .chip-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 8px;
      }

      .chip-option {
        min-height: 44px;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 10px;
        border: 1px solid var(--sagheri-border);
        border-radius: 12px;
        background: var(--sagheri-card);
        color: var(--sagheri-text);
        font-size: 13px;
        font-weight: 800;
        position: relative;
        cursor: pointer;
        transition: border-color .18s ease, background .18s ease;
      }

      .chip-option:has(.chip-check:checked) {
        border-color: rgba(99, 163, 158, .55);
        background: rgba(99, 163, 158, .1);
      }

      .chip-label {
        min-width: 0;
        overflow-wrap: anywhere;
      }

      .chip-check {
        position: absolute;
        width: 1px;
        height: 1px;
        opacity: 0;
        pointer-events: none;
      }

      .check-box {
        width: 17px;
        height: 17px;
        min-width: 17px;
        flex: 0 0 17px;
        display: grid;
        place-items: center;
        margin: 0;
        border: 1.5px solid var(--sagheri-border);
        border-radius: 5px;
        background: #fff;
        transition: border-color .18s ease, background .18s ease, box-shadow .18s ease;
      }

      .chip-check:checked + .check-box {
        border-color: var(--sagheri-secondary);
        background: var(--sagheri-secondary);
      }

      .chip-check:checked + .check-box::after {
        content: '';
        width: 8px;
        height: 4px;
        border-left: 2px solid #fff;
        border-bottom: 2px solid #fff;
        transform: rotate(-45deg);
      }

      .chip-check:focus-visible + .check-box {
        box-shadow: 0 0 0 3px rgba(99, 163, 158, .16);
      }

      .auth-error {
        padding: 10px 12px;
        border: 1px solid rgba(179, 38, 30, .25);
        border-radius: 12px;
        color: var(--sagheri-danger);
        background: rgba(179, 38, 30, .08);
      }

      .btn-auth {
        min-height: 48px;
        border: 0;
        border-radius: 12px;
        color: #fff;
        background: var(--sagheri-secondary);
        font: inherit;
        font-weight: 800;
        cursor: pointer;
      }

      .btn-auth:disabled {
        opacity: .7;
        cursor: progress;
      }

      a {
        color: var(--sagheri-secondary);
        font-weight: 800;
        text-decoration: none;
      }

      @media (max-width: 640px) {
        .auth-page {
          min-height: auto;
          place-items: start center;
          padding: 16px 14px 28px;
        }

        .row,
        .chip-grid {
          grid-template-columns: 1fr;
        }

        .row > label {
          grid-template-rows: auto 46px auto;
        }

        .auth-card {
          width: 100%;
          max-width: calc(100vw - 28px);
          padding: 24px 18px;
          border-radius: 20px;
        }
      }
    `,
  ],
})
export class RegisterComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly languageState = inject(LanguageStateService);
  private readonly cdr = inject(ChangeDetectorRef);

  readonly loading = signal(false);
  readonly error = signal('');
  readonly today = this.localDate(new Date());

  readonly arabCountries: SelectOption[] = [
    { value: 'DZ', labelAr: 'الجزائر', labelEn: 'Algeria' },
    { value: 'BH', labelAr: 'البحرين', labelEn: 'Bahrain' },
    { value: 'KM', labelAr: 'جزر القمر', labelEn: 'Comoros' },
    { value: 'DJ', labelAr: 'جيبوتي', labelEn: 'Djibouti' },
    { value: 'EG', labelAr: 'مصر', labelEn: 'Egypt' },
    { value: 'IQ', labelAr: 'العراق', labelEn: 'Iraq' },
    { value: 'JO', labelAr: 'الأردن', labelEn: 'Jordan' },
    { value: 'KW', labelAr: 'الكويت', labelEn: 'Kuwait' },
    { value: 'LB', labelAr: 'لبنان', labelEn: 'Lebanon' },
    { value: 'LY', labelAr: 'ليبيا', labelEn: 'Libya' },
    { value: 'MR', labelAr: 'موريتانيا', labelEn: 'Mauritania' },
    { value: 'MA', labelAr: 'المغرب', labelEn: 'Morocco' },
    { value: 'OM', labelAr: 'عمان', labelEn: 'Oman' },
    { value: 'PS', labelAr: 'فلسطين', labelEn: 'Palestine' },
    { value: 'QA', labelAr: 'قطر', labelEn: 'Qatar' },
    { value: 'SA', labelAr: 'السعودية', labelEn: 'Saudi Arabia' },
    { value: 'SO', labelAr: 'الصومال', labelEn: 'Somalia' },
    { value: 'SD', labelAr: 'السودان', labelEn: 'Sudan' },
    { value: 'SY', labelAr: 'سوريا', labelEn: 'Syria' },
    { value: 'TN', labelAr: 'تونس', labelEn: 'Tunisia' },
    { value: 'AE', labelAr: 'الإمارات', labelEn: 'United Arab Emirates' },
    { value: 'YE', labelAr: 'اليمن', labelEn: 'Yemen' },
  ];

  readonly motherStatuses: SelectOption<MotherStatus>[] = [
    { value: 'PREGNANT', labelAr: 'حامل', labelEn: 'Pregnant' },
    { value: 'BREASTFEEDING', labelAr: 'مرضع', labelEn: 'Breastfeeding' },
    { value: 'PREGNANT_AND_BREASTFEEDING', labelAr: 'حامل ومرضع', labelEn: 'Pregnant and breastfeeding' },
    { value: 'NONE', labelAr: 'لا', labelEn: 'No' },
    { value: 'OTHER', labelAr: 'أخرى', labelEn: 'Other' },
  ];

  readonly chronicDiseaseOptions: SelectOption<ChronicDisease>[] = [
    { value: 'CHRONIC_HYPERTENSION', labelAr: 'ارتفاع ضغط مزمن', labelEn: 'Chronic hypertension' },
    { value: 'GESTATIONAL_HYPERTENSION', labelAr: 'ارتفاع ضغط الحمل', labelEn: 'Gestational hypertension' },
    { value: 'TYPE_1_DIABETES', labelAr: 'سكري النوع الأول', labelEn: 'Type 1 diabetes' },
    { value: 'TYPE_2_DIABETES', labelAr: 'سكري النوع الثاني', labelEn: 'Type 2 diabetes' },
    { value: 'GESTATIONAL_DIABETES', labelAr: 'سكري الحمل', labelEn: 'Gestational diabetes' },
    { value: 'HYPOTHYROIDISM', labelAr: 'كسل الغدة الدرقية', labelEn: 'Hypothyroidism' },
    { value: 'HYPERTHYROIDISM', labelAr: 'فرط نشاط الغدة الدرقية', labelEn: 'Hyperthyroidism' },
    { value: 'OTHER', labelAr: 'أخرى', labelEn: 'Other' },
  ];

  readonly form = {
    fullName: '',
    dateOfBirth: '',
    nationality: 'JO',
    motherStatus: 'NONE' as MotherStatus,
    childrenCount: 0,
    chronicDiseases: [] as ChronicDisease[],
    chronicDiseaseOther: '',
    medicationAllergy: '',
    foodAllergy: '',
    email: '',
    password: '',
  };

  register(): void {
    if (!this.isValid()) {
      return;
    }

    this.loading.set(true);
    this.error.set('');

    this.auth.register(this.payload()).subscribe({
      next: () => this.router.navigate([APP_ROUTES.USER_DASHBOARD]),
      error: () => {
        this.error.set(this.text('تعذر إنشاء الحساب. يرجى المحاولة مرة أخرى.', 'Could not create account. Please try again.'));
        this.loading.set(false);
        this.cdr.markForCheck();
      },
    });
  }

  hasDisease(disease: ChronicDisease): boolean {
    return this.form.chronicDiseases.includes(disease);
  }

  toggleDisease(disease: ChronicDisease): void {
    this.form.chronicDiseases = this.hasDisease(disease)
      ? this.form.chronicDiseases.filter((item) => item !== disease)
      : [...this.form.chronicDiseases, disease];

    if (!this.hasDisease('OTHER')) {
      this.form.chronicDiseaseOther = '';
    }
  }

  text(ar: string, en: string): string {
    return this.languageState.language() === Language.EN ? en : ar;
  }

  private isValid(): boolean {
    if (!this.form.fullName.trim() || !this.form.dateOfBirth || !this.form.email.trim() || !this.form.password) {
      this.error.set(this.text('يرجى تعبئة الحقول المطلوبة', 'Please fill the required fields'));
      return false;
    }

    if (this.form.childrenCount < 0) {
      this.error.set(this.text('عدد الأطفال يجب أن يكون صفر أو أكثر', 'Children count must be zero or more'));
      return false;
    }

    if (this.hasDisease('OTHER') && !this.form.chronicDiseaseOther.trim()) {
      this.error.set(this.text('يرجى ذكر المرض المزمن الآخر', 'Please specify the other chronic disease'));
      return false;
    }

    return true;
  }

  private payload(): RegisterRequest {
    const hasOtherDisease = this.hasDisease('OTHER');

    return {
      fullName: this.form.fullName.trim(),
      dateOfBirth: this.form.dateOfBirth,
      nationality: this.form.nationality,
      motherStatus: this.form.motherStatus,
      childrenCount: Math.max(0, Number(this.form.childrenCount) || 0),
      chronicDiseases: this.form.chronicDiseases,
      chronicDiseaseOther: hasOtherDisease ? this.optionalText(this.form.chronicDiseaseOther) : null,
      medicationAllergy: this.optionalText(this.form.medicationAllergy),
      foodAllergy: this.optionalText(this.form.foodAllergy),
      email: this.form.email.trim(),
      password: this.form.password,
    };
  }

  private optionalText(value: string): string | null {
    const trimmed = value.trim();
    return trimmed ? trimmed : null;
  }

  private localDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
