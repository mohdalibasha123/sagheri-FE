import { Injectable, signal, effect } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';
import { Language, Direction } from '../enums';

const LANGUAGE_KEY = 'sagheri_language';

@Injectable({ providedIn: 'root' })
export class LanguageStateService {
  private readonly document = inject(DOCUMENT);

  readonly language = signal<Language>(this.readStoredLanguage());
  readonly direction = signal<Direction>(
    this.language() === Language.AR ? Direction.RTL : Direction.LTR,
  );

  constructor() {
    effect(() => {
      const lang = this.language();
      const dir = lang === Language.AR ? Direction.RTL : Direction.LTR;
      this.direction.set(dir);
      this.document.documentElement.lang = lang;
      this.document.documentElement.dir = dir;
      localStorage.setItem(LANGUAGE_KEY, lang);
    });
  }

  setLanguage(lang: Language): void {
    this.language.set(lang);
  }

  toggleLanguage(): void {
    this.language.update((l) => (l === Language.AR ? Language.EN : Language.AR));
  }

  isRtl(): boolean {
    return this.direction() === Direction.RTL;
  }

  private readStoredLanguage(): Language {
    return localStorage.getItem(LANGUAGE_KEY) === Language.EN ? Language.EN : Language.AR;
  }
}
