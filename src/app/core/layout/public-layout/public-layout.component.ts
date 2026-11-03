import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LanguageStateService } from '../../state/language-state.service';
import { Language } from '../../enums';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="page-shell">
      <button type="button" class="language-toggle" (click)="toggleLanguage()">
        {{ isEnglish() ? 'العربية' : 'English' }}
      </button>


      <main>
        <router-outlet />
      </main>

      <footer class="site-footer">
        <div class="footer-inner">
          <div>
            <img src="sagheri-logo.png" alt="شعار صغيري" />
            <h2>{{ text('صغيري', 'Sagheri') }}</h2>
            <p>{{ text('طريقك لأمومة أوعى', 'Your path to conscious motherhood') }}</p>
          </div>

          <address>
            <a href="mailto:support@sagheri.com">support@sagheri.com</a>
            <span dir="ltr">+962 XXXXXXXX</span>
          </address>

          <div class="footer-links">
            <a routerLink="/privacy">{{ text('سياسة الخصوصية', 'Privacy Policy') }}</a>
            <a routerLink="/terms">{{ text('الشروط والأحكام', 'Terms') }}</a>
            <a routerLink="/refund-policy">{{ text('سياسة الاسترداد', 'Refund Policy') }}</a>
          </div>
        </div>
        <p class="copyright">
          {{ text('حقوق النشر © 2026 صغيري - جميع الحقوق محفوظة.', 'Copyright © 2026 Sagheri - All rights reserved.') }}
        </p>
      </footer>

    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .page-shell {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        background: var(--sagheri-bg);
      }

      main {
        flex: 1;
      }

      .language-toggle {
        position: fixed;
        z-index: 21;
        top: 18px;
        left: 18px;
        min-height: 42px;
        padding: 8px 14px;
        border: 1px solid var(--sagheri-border);
        border-radius: 999px;
        color: var(--sagheri-primary);
        background: #fff;
        box-shadow: var(--shadow-card);
        font: inherit;
        font-weight: 800;
        cursor: pointer;
      }

      .site-footer {
        margin-top: auto;
        padding: 38px 24px 18px;
        color: #e7d8ca;
        background: var(--sagheri-dark-block);
      }

      .footer-inner {
        max-width: 1050px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        gap: 30px;
        align-items: center;
      }

      .site-footer img {
        width: 70px;
        height: 70px;
        object-fit: contain;
      }

      .site-footer h2,
      .site-footer p {
        margin: 0;
      }

      .site-footer h2 {
        margin-top: 8px;
        color: #fff;
      }

      address,
      .footer-links {
        display: grid;
        gap: 8px;
        font-style: normal;
      }

      address {
        text-align: center;
      }

      .footer-links {
        justify-items: end;
      }

      .site-footer a {
        color: #d69a73;
        text-decoration: none;
      }

      .copyright {
        margin-top: 28px !important;
        padding-top: 16px;
        border-top: 1px solid rgba(255, 255, 255, .1);
        text-align: center;
        color: #b9a89a;
        font-size: 13px;
      }

      @media (max-width: 767px) {
        .language-toggle {
          top: 12px;
          left: 12px;
        }

        .footer-inner {
          grid-template-columns: 1fr;
          text-align: center;
        }

        .footer-links {
          justify-items: center;
        }

      }
    `,
  ],
})
export class PublicLayoutComponent {
  private readonly languageState = inject(LanguageStateService);

  isEnglish(): boolean {
    return this.languageState.language() === Language.EN;
  }

  text(ar: string, en: string): string {
    return this.isEnglish() ? en : ar;
  }

  toggleLanguage(): void {
    this.languageState.toggleLanguage();
  }
}
