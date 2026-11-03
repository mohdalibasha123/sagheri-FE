import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { Language } from '../../../core/enums';
import { BackendCmsPage, PublicContentService } from '../../../core/services/public-content.service';
import { LanguageStateService } from '../../../core/state/language-state.service';

interface LegalContent {
  heading: string;
  items: LegalClause[];
}

interface LegalClause {
  number: number;
  body: string;
}

@Component({
  selector: 'app-legal',
  standalone: true,
  template: `
    <section class="legal-page">
      <div class="legal-hero">
        <div class="container">
          <p class="eyebrow">{{ pageKey }}</p>
          <h1>{{ pageTitle }}</h1>
          @if (seoDescription) {
            <p>{{ seoDescription }}</p>
          }
        </div>
      </div>

      <div class="container">
        <article class="legal-content">
          @if (legalContent.heading) {
            <h2>{{ legalContent.heading }}</h2>
          }

          @if (legalContent.items.length) {
            <ol class="clauses">
              @for (item of legalContent.items; track item.number) {
                <li>
                  <span class="clause-number">{{ item.number }}</span>
                  <p>{{ item.body }}</p>
                </li>
              }
            </ol>
          }
        </article>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }

    .container {
      width: min(100% - 48px, 900px);
      margin-inline: auto;
    }

    .legal-page {
      min-height: 70vh;
      padding-bottom: 72px;
      background: var(--sagheri-bg);
    }

    .legal-hero {
      padding: 64px 0 42px;
      border-bottom: 1px solid var(--sagheri-border);
      background: linear-gradient(135deg, #fff8ee, #fdf5e4);
      text-align: center;
    }

    .eyebrow {
      margin: 0 0 8px;
      color: var(--sagheri-primary);
      font-size: 13px;
      font-weight: 800;
      letter-spacing: 0;
      text-transform: uppercase;
    }

    h1 {
      margin: 0;
      color: var(--sagheri-text);
      font-size: 36px;
      font-weight: 800;
      line-height: 1.25;
    }

    .legal-hero p:not(.eyebrow) {
      max-width: 640px;
      margin: 12px auto 0;
      color: var(--sagheri-muted);
      font-size: 15px;
      line-height: 1.8;
    }

    .legal-content {
      margin-top: 34px;
      padding: 32px;
      border: 1px solid var(--sagheri-border);
      border-radius: 20px;
      background: #fff;
      box-shadow: 0 8px 28px rgba(93, 63, 51, .07);
    }

    h2 {
      margin: 0 0 22px;
      color: var(--sagheri-text);
      font-size: 24px;
      font-weight: 800;
      line-height: 1.35;
    }

    .clauses {
      display: grid;
      gap: 14px;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .clauses li {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 12px;
      align-items: start;
      padding: 16px;
      border: 1px solid rgba(229, 214, 200, .85);
      border-radius: 14px;
      background: var(--sagheri-card);
    }

    .clause-number {
      width: 34px;
      height: 34px;
      display: grid;
      place-items: center;
      border-radius: 50%;
      color: #fff;
      background: var(--sagheri-primary);
      font-size: 14px;
      font-weight: 800;
    }

    .clauses p {
      margin: 0;
      color: var(--sagheri-text);
      font-size: 15px;
      line-height: 1.9;
      white-space: pre-line;
    }

    @media (max-width: 700px) {
      .container {
        width: min(100% - 28px, 900px);
      }

      .legal-hero {
        padding: 54px 0 32px;
      }

      h1 {
        font-size: 30px;
      }

      .legal-content {
        margin-top: 22px;
        padding: 20px;
        border-radius: 18px;
      }

      .clauses li {
        grid-template-columns: 1fr;
      }
    }
  `],
})
export class LegalComponent {
  private readonly contentService = inject(PublicContentService);
  private readonly route = inject(ActivatedRoute);
  private readonly languageState = inject(LanguageStateService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  pageKey = 'terms';
  page?: BackendCmsPage;

  constructor() {
    this.route.url.subscribe((segments) => {
      this.pageKey = segments[0]?.path || 'terms';
      this.loadPage(this.pageKey);
    });
  }

  get pageTitle(): string {
    if (!this.page) {
      return '';
    }
    return this.text(this.page.titleAr, this.page.titleEn || this.page.titleAr);
  }

  get seoDescription(): string {
    if (!this.page) {
      return '';
    }
    return this.text(
      this.page.seoDescriptionAr || '',
      this.page.seoDescriptionEn || this.page.seoDescriptionAr || '',
    );
  }

  get legalContent(): LegalContent {
    return this.page ? this.toLegalContent(this.page) : { heading: '', items: [] };
  }

  text(ar: string, en: string): string {
    return this.languageState.language() === Language.EN ? en : ar;
  }

  private loadPage(pageKey: string): void {
    this.contentService.cmsPage(pageKey).subscribe((page) => {
      this.page = page;
      this.updateMeta(page);
      this.cdr.markForCheck();
    });
  }

  private toLegalContent(page: BackendCmsPage): LegalContent {
    const section = page.sections.find((item) => item.sectionType === 'LEGAL_CONTENT');
    const raw = this.languageState.language() === Language.EN ? section?.contentJsonEn : section?.contentJsonAr;
    const value = this.asRecord(raw);
    const items = Array.isArray(value['items']) ? value['items'] : [];

    return {
      heading: this.asString(value['heading']),
      items: items
        .map((item) => this.asRecord(item))
        .map((item) => ({
          number: this.asNumber(item['number']),
          body: this.asString(item['body']),
        }))
        .filter((item) => item.number > 0 && item.body),
    };
  }

  private updateMeta(page: BackendCmsPage): void {
    const seoTitle = this.text(page.seoTitleAr || page.titleAr, page.seoTitleEn || page.seoTitleAr || page.titleAr);
    const description = this.text(
      page.seoDescriptionAr || '',
      page.seoDescriptionEn || page.seoDescriptionAr || '',
    );

    if (seoTitle) {
      this.title.setTitle(seoTitle);
    }

    if (description) {
      this.meta.updateTag({ name: 'description', content: description });
    }
  }

  private asRecord(value: unknown): Record<string, unknown> {
    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value);
        return this.asRecord(parsed);
      } catch {
        return {};
      }
    }
    return value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {};
  }

  private asString(value: unknown): string {
    return typeof value === 'string' ? value : '';
  }

  private asNumber(value: unknown): number {
    return typeof value === 'number' ? value : Number(value) || 0;
  }
}
