import { Component, inject } from '@angular/core';
import { Language } from '../../../core/enums';
import { LanguageStateService } from '../../../core/state/language-state.service';

@Component({ selector: 'app-user-profile', standalone: true, template: `<div class="page-placeholder"><h1>{{ t('ملفي الشخصي', 'My Profile') }}</h1></div>`, styles: [`.page-placeholder { padding: 88px 40px 40px; text-align: center; color: var(--sagheri-text); }`] })
export class UserProfileComponent { private readonly lang = inject(LanguageStateService); t(ar: string, en: string): string { return this.lang.language() === Language.EN ? en : ar; } }
