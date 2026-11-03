import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Language } from '../../enums';
import { LanguageStateService } from '../../state/language-state.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="admin-layout">
      <button type="button" class="language-toggle" (click)="toggleLanguage()">
        {{ isEnglish() ? 'العربية' : 'English' }}
      </button>
      <router-outlet />
    </div>
  `,
  styles: [`
    .admin-layout {
      min-height: 100vh;
      background: var(--sagheri-bg);
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
  `],
})
export class AdminLayoutComponent {
  private readonly languageState = inject(LanguageStateService);
  isEnglish(): boolean { return this.languageState.language() === Language.EN; }
  toggleLanguage(): void { this.languageState.toggleLanguage(); }
}
