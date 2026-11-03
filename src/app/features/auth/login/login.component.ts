import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { APP_ROUTES } from '../../../core/constants/app-routes';
import { UserRole } from '../../../core/enums';
import { Language } from '../../../core/enums';
import { LanguageStateService } from '../../../core/state/language-state.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  template: `
    <div class="auth-page">
      <form class="auth-card" (ngSubmit)="login()">
        <img src="/sagheri-logo.png" [alt]="text('شعار صغيري', 'Sagheri logo')" />
        <h1>{{ text('تسجيل الدخول', 'Login') }}</h1>
        <p>{{ text('استخدمي أي بريد وكلمة مرور للدخول التجريبي. بريد يحتوي على admin يفتح لوحة الإدارة.', 'Use any email and password for mock login. An email containing admin opens the admin portal.') }}</p>

        <label>
          {{ text('البريد الإلكتروني', 'Email') }}
          <input type="email" [(ngModel)]="form.email" name="email" placeholder="user@sagheri.local" required />
        </label>

        <label>
          {{ text('كلمة المرور', 'Password') }}
          <input
            [type]="showPassword() ? 'text' : 'password'"
            [(ngModel)]="form.password"
            name="password"
            placeholder="كلمة المرور"
            required
          />
        </label>

        <button type="button" class="link-button" (click)="showPassword.set(!showPassword())">
          {{ showPassword() ? text('إخفاء كلمة المرور', 'Hide password') : text('إظهار كلمة المرور', 'Show password') }}
        </button>

        @if (error()) {
          <div class="auth-error">{{ error() }}</div>
        }

        <button class="btn-auth" type="submit" [disabled]="loading()">
          {{ loading() ? text('جاري الدخول...', 'Logging in...') : text('تسجيل الدخول', 'Login') }}
        </button>

        <a routerLink="/auth/forgot-password">{{ text('نسيت كلمة المرور؟', 'Forgot password?') }}</a>
        <p class="switch">{{ text('ليس لديك حساب؟', 'No account?') }} <a routerLink="/auth/register">{{ text('إنشاء حساب', 'Create account') }}</a></p>
      </form>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .auth-page {
        min-height: 100vh;
        display: grid;
        place-items: center;
        padding: 24px;
        background: var(--sagheri-bg);
      }

      .auth-card {
        width: min(100%, 430px);
        display: grid;
        gap: 16px;
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

      p,
      a,
      .link-button {
        color: var(--sagheri-muted);
      }

      label {
        display: grid;
        gap: 7px;
        color: var(--sagheri-text);
        font-weight: 800;
      }

      input {
        min-height: 46px;
        padding: 10px 12px;
        border: 1px solid var(--sagheri-border);
        border-radius: 12px;
        font: inherit;
      }

      input:focus {
        outline: 3px solid rgba(99, 163, 158, .16);
        border-color: var(--sagheri-secondary);
      }

      .link-button {
        border: 0;
        background: transparent;
        text-align: start;
        cursor: pointer;
        font: inherit;
        font-weight: 700;
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
        background: var(--sagheri-primary);
        font: inherit;
        font-weight: 800;
        cursor: pointer;
      }

      .btn-auth:disabled {
        opacity: .7;
        cursor: progress;
      }

      a {
        text-align: center;
        font-weight: 800;
        text-decoration: none;
      }

      .switch a {
        color: var(--sagheri-secondary);
      }
    `,
  ],
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly languageState = inject(LanguageStateService);

  readonly showPassword = signal(false);
  readonly loading = signal(false);
  readonly error = signal('');

  readonly form = {
    email: 'user@sagheri.local',
    password: 'password',
  };

  login(): void {
    if (!this.form.email || !this.form.password) {
      this.error.set(this.text('يرجى إدخال البريد الإلكتروني وكلمة المرور', 'Please enter email and password'));
      return;
    }

    this.loading.set(true);
    this.error.set('');

    this.auth.login(this.form).subscribe({
      next: (res) => {
        const target = res.user.roles.includes(UserRole.ADMIN)
          ? APP_ROUTES.ADMIN_DASHBOARD
          : APP_ROUTES.USER_DASHBOARD;
        this.router.navigate([target]);
      },
      error: () => {
        this.error.set(this.text('تعذر تسجيل الدخول. يرجى المحاولة مرة أخرى.', 'Could not log in. Please try again.'));
        this.loading.set(false);
      },
    });
  }

  text(ar: string, en: string): string {
    return this.languageState.language() === Language.EN ? en : ar;
  }
}
