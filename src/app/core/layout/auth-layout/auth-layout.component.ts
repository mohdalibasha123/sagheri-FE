import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Language } from '../../enums';
import { LanguageStateService } from '../../state/language-state.service';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="auth-layout">
      <button type="button" class="language-toggle" (click)="toggleLanguage()">
        {{ isEnglish() ? 'العربية' : 'English' }}
      </button>
      <router-outlet />
    </div>
  `,
  styles: [`
    .auth-layout {
      min-height: 100vh;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: var(--sagheri-bg);
      overflow-x: hidden;
    }
    .language-toggle {
      position: fixed;
      z-index: 20;
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

    @media (max-width: 700px) {
      .auth-layout {
        justify-content: flex-start;
      }

      .language-toggle {
        position: sticky;
        top: 10px;
        left: auto;
        align-self: flex-start;
        margin: 10px 12px 0;
        max-width: calc(100vw - 24px);
      }
    }
  `],
})
export class AuthLayoutComponent {
  private readonly languageState = inject(LanguageStateService);
  isEnglish(): boolean { return this.languageState.language() === Language.EN; }
  toggleLanguage(): void { this.languageState.toggleLanguage(); }
}
