import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { Language } from '../../../core/enums';
import { BackendFaq, PublicContentService } from '../../../core/services/public-content.service';
import { LanguageStateService } from '../../../core/state/language-state.service';

interface FaqItem {
  q: string;
  qEn: string;
  a: string;
  aEn: string;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  template: `
    <div class="faq-page">
      <div class="faq-hero">
        <div class="container">
          <h1>{{ text('الأسئلة الشائعة', 'Frequently Asked Questions') }}</h1>
          <p>{{ text('كل ما تحتاجين معرفته عن خدمات صغيري', 'Everything you need to know about Sagheri services') }}</p>
        </div>
      </div>
      <div class="container">
        <div class="faq-list">
          @for (item of items; track item.q; let i = $index) {
            <div class="faq-item" [class.open]="openIndex() === i" (click)="toggle(i)">
              <div class="faq-q">
                <span>{{ text(item.q, item.qEn) }}</span>
                <span class="faq-icon">{{ openIndex() === i ? '-' : '+' }}</span>
              </div>
              @if (openIndex() === i) {
                <div class="faq-a">{{ text(item.a, item.aEn) }}</div>
              }
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display:block; }
    .container { max-width:800px; margin:0 auto; padding:0 24px; }
    .faq-page { background:var(--sagheri-bg); padding-bottom:80px; }
    .faq-hero { background:linear-gradient(135deg,#fff8ee,#fdf5e4); padding:56px 24px 40px; text-align:center; border-bottom:1px solid var(--sagheri-border); }
    .faq-hero h1 { font-size:36px; font-weight:800; color:var(--sagheri-text); margin-bottom:8px; }
    .faq-hero p { font-size:16px; color:var(--sagheri-muted); }
    .faq-list { display:flex; flex-direction:column; gap:12px; padding-top:32px; }
    .faq-item { background:#fff; border:1px solid var(--sagheri-border); border-radius:16px; overflow:hidden; cursor:pointer; }
    .faq-item.open { border-color:var(--sagheri-primary); }
    .faq-q { display:flex; justify-content:space-between; align-items:center; padding:18px 20px; font-size:15px; font-weight:700; color:var(--sagheri-text); gap:12px; }
    .faq-icon { font-size:22px; color:var(--sagheri-primary); flex-shrink:0; }
    .faq-a { padding:14px 20px 18px; font-size:14px; color:var(--sagheri-muted); line-height:1.85; border-top:1px solid var(--sagheri-border); }
  `],
})
export class FaqComponent {
  private readonly languageState = inject(LanguageStateService);
  private readonly content = inject(PublicContentService);
  private readonly cdr = inject(ChangeDetectorRef);

  readonly openIndex = signal<number | null>(0);
  items: FaqItem[] = [];

  constructor() {
    this.content.faqs().subscribe((faqs) => {
      this.items = faqs.map((faq) => this.toFaq(faq));
      this.cdr.markForCheck();
    });
  }

  isEnglish(): boolean {
    return this.languageState.language() === Language.EN;
  }

  text(ar: string, en: string): string {
    return this.isEnglish() ? en : ar;
  }

  toggle(i: number): void {
    this.openIndex.set(this.openIndex() === i ? null : i);
  }

  private toFaq(faq: BackendFaq): FaqItem {
    return {
      q: faq.questionAr,
      qEn: faq.questionEn || faq.questionAr,
      a: faq.answerAr,
      aEn: faq.answerEn || faq.answerAr,
    };
  }
}
