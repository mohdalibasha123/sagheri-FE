import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { PageMeta } from '../models/cms.model';
import { LanguageStateService } from '../state/language-state.service';
import { Language } from '../enums';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly langState = inject(LanguageStateService);

  setMeta(page: PageMeta): void {
    const suffix = this.langState.language() === Language.AR ? 'صغيري' : 'Sagheri';
    this.title.setTitle(`${page.title} | ${suffix}`);

    if (page.description) {
      this.meta.updateTag({ name: 'description', content: page.description });
    }
    if (page.ogTitle) {
      this.meta.updateTag({ property: 'og:title', content: page.ogTitle });
    }
    if (page.ogDescription) {
      this.meta.updateTag({ property: 'og:description', content: page.ogDescription });
    }
    if (page.ogImage) {
      this.meta.updateTag({ property: 'og:image', content: page.ogImage });
    }
  }
}
