import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Language } from '../../enums';
import { LanguageStateService } from '../../state/language-state.service';
import { AccountNavComponent } from '../account-nav/account-nav.component';

@Component({
  selector: 'app-public-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, AccountNavComponent],
  template: `
    <nav class="side-nav" [attr.aria-label]="text('التنقل الرئيسي', 'Main navigation')">
      <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">
        <span aria-hidden="true">⌂</span>{{ text('الرئيسية', 'Home') }}
      </a>
      <a routerLink="/specialists" routerLinkActive="active">
        <span aria-hidden="true">☉</span>{{ text('الاستشارات', 'Consultations') }}
      </a>
      <a routerLink="/courses" routerLinkActive="active">
        <span aria-hidden="true">▷</span>{{ text('الكورسات', 'Courses') }}
      </a>
      <a routerLink="/about" routerLinkActive="active">
        <span aria-hidden="true">؟</span>{{ text('عنا', 'About') }}
      </a>
      <a routerLink="/contact" routerLinkActive="active">
        <span aria-hidden="true">✉</span>{{ text('تواصل', 'Contact') }}
      </a>
      <app-account-nav controlId="desktop-account-panel" />
    </nav>
    <nav class="mobile-nav" [attr.aria-label]="text('التنقل السريع', 'Quick navigation')">
      <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">{{ text('الرئيسية', 'Home') }}</a>
      <a routerLink="/specialists" routerLinkActive="active">{{ text('استشارات', 'Consult') }}</a>
      <a routerLink="/courses" routerLinkActive="active">{{ text('كورسات', 'Courses') }}</a>
      <a routerLink="/contact" routerLinkActive="active">{{ text('تواصل', 'Contact') }}</a>
      <app-account-nav controlId="mobile-account-panel" />
    </nav>
  `,
  styleUrl: './public-navigation.component.scss',
})
export class PublicNavigationComponent {
  private readonly languageState = inject(LanguageStateService);
  text(ar: string, en: string): string {
    return this.languageState.language() === Language.EN ? en : ar;
  }
}
