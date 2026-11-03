import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Language } from '../../../../core/enums';
import { BackendSpecialist, PublicContentService } from '../../../../core/services/public-content.service';
import { LanguageStateService } from '../../../../core/state/language-state.service';
import { specialistBioParagraphs, specialistLabels } from '../../../../core/models/specialist-content';
import { SpecialistBiographyComponent } from './specialist-biography.component';

@Component({
  selector: 'app-specialist-profile',
  standalone: true,
  imports: [RouterLink, SpecialistBiographyComponent],
  template: `
    <div class="profile-page">
      <div class="container">
        <div class="profile-header">
          <div class="avatar">{{ initial }}</div>
          <div class="header-info">
            <h1>{{ t(specialist?.nameAr || '', specialist?.nameEn || specialist?.nameAr || '') }}</h1>
            <p class="specialty">{{ t(specialist?.titleAr || '', specialist?.titleEn || specialist?.titleAr || '') }}</p>
            <p class="short-bio">
              {{ biography[0] || '' }}
            </p>
            <a [routerLink]="['/consultations/book', specialist?.id]" class="btn-book">
              {{ t('احجزي استشارة', 'Book Consultation') }}
            </a>
          </div>
        </div>
        @if (credentials.length) {
          <section class="profile-section">
            <h2>{{ t('المؤهلات والتدريب', 'Qualifications and training') }}</h2>
            <ul class="credentials">
              @for (credential of credentials; track $index) { <li>{{ credential }}</li> }
            </ul>
          </section>
        }
        @if (specialties.length) {
          <section class="profile-section">
            <h2>{{ t('مجالات الخبرة', 'Areas of expertise') }}</h2>
            <ul class="specialty-tags">
              @for (s of specialties; track $index) { <li class="tag">{{ s }}</li> }
            </ul>
          </section>
        }
        @if (biography.length > 1) {
          <section class="biography">
            <h2>{{ t('عن الأخصائية', 'About the specialist') }}</h2>
            <app-specialist-biography [bio]="localizedBio" />
            <a [routerLink]="['/consultations/book', specialist?.id]" class="btn-book">
              {{ t('احجزي جلستك الفردية', 'Book your individual session') }}
            </a>
          </section>
        }
      </div>
    </div>
  `,
  styles: [`
    :host { display:block; }
    .container { max-width:1100px; margin:0 auto; padding:0 24px; }
    .profile-page { background:var(--sagheri-bg); padding-bottom:80px; }
    .profile-header { display:flex; align-items:center; gap:28px; padding:72px 0 36px; border-bottom:1px solid var(--sagheri-border); margin-bottom:36px; }
    .header-info { min-width:0; }
    .avatar { width:120px; height:120px; flex-shrink:0; border-radius:50%; background:linear-gradient(135deg,#c8a882,#a07850); display:flex; align-items:center; justify-content:center; font-size:48px; font-weight:800; color:#fff; }
    h1 { font-size:28px; font-weight:800; color:var(--sagheri-text); margin-bottom:4px; }
    .specialty { font-size:15px; color:var(--sagheri-primary); font-weight:700; margin-bottom:12px; }
    .short-bio { font-size:14px; color:var(--sagheri-muted); line-height:1.7; margin-bottom:18px; }
    .btn-book { display:inline-block; padding:12px 28px; border-radius:12px; background:var(--sagheri-secondary); color:#fff; font-weight:800; text-decoration:none; font-size:14px; }
    .profile-section { padding:24px 0; border-bottom:1px solid var(--sagheri-border); }
    .profile-section h2, .biography h2 { font-size:18px; font-weight:800; color:var(--sagheri-text); margin-bottom:16px; }
    .specialty-tags { display:flex; flex-wrap:wrap; gap:8px; list-style:none; margin:0; padding:0; }
    .credentials { padding-inline-start:20px; color:var(--sagheri-text); line-height:1.9; }
    .credentials li + li { margin-top:8px; }
    .biography { max-width:820px; padding:32px 0 0; }
    h1, p, li, .btn-book { overflow-wrap:anywhere; }
    .tag { background:rgba(99,163,158,.1); color:var(--sagheri-secondary); padding:6px 14px; border-radius:999px; font-size:13px; font-weight:700; }
    @media (max-width:700px) { .profile-header { flex-direction:column; text-align:center; } }
  `],
})
export class SpecialistProfileComponent {
  private readonly lang = inject(LanguageStateService);
  private readonly route = inject(ActivatedRoute);
  private readonly content = inject(PublicContentService);
  private readonly cdr = inject(ChangeDetectorRef);

  specialist?: BackendSpecialist;

  constructor() {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.content.specialist(id).subscribe((specialist) => {
      this.specialist = specialist;
      this.cdr.markForCheck();
    });
  }

  get initial(): string {
    return (this.specialist?.nameAr || this.specialist?.nameEn || 'S').trim().charAt(0);
  }

  get specialties(): string[] {
    return specialistLabels(this.specialist?.specialties, this.specialist?.specialtiesJson)
      .map(value => this.t(value.textAr, value.textEn || value.textAr));
  }

  get credentials(): string[] {
    return specialistLabels(this.specialist?.credentials, this.specialist?.credentialsJson)
      .map(value => this.t(value.textAr, value.textEn || value.textAr));
  }

  get biography(): string[] {
    return specialistBioParagraphs(this.localizedBio);
  }

  get localizedBio(): string {
    return this.t(this.specialist?.bioAr || '', this.specialist?.bioEn || this.specialist?.bioAr || '');
  }

  isEnglish(): boolean {
    return this.lang.language() === Language.EN;
  }

  t(ar: string, en: string): string {
    return this.isEnglish() ? en : ar;
  }

}
