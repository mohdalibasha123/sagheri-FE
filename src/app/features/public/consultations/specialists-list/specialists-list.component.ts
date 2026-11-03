import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Language } from '../../../../core/enums';
import { PublicContentService, BackendSpecialist } from '../../../../core/services/public-content.service';
import { LanguageStateService } from '../../../../core/state/language-state.service';
import { specialistBioParagraphs, specialistLabels } from '../../../../core/models/specialist-content';

interface Specialist {
  id: string;
  name: string;
  nameEn: string;
  title: string;
  titleEn: string;
  bio: string;
  bioEn: string;
  bgColor: string;
  initials: string;
  tags: string[];
  tagsEn: string[];
  consultationTypes: string[];
  consultationTypesEn: string[];
}

@Component({
  selector: 'app-specialists-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './specialists-list.component.html',
  styleUrl: './specialists-list.component.scss',
})
export class SpecialistsListComponent {
  private readonly languageState = inject(LanguageStateService);
  private readonly content = inject(PublicContentService);
  private readonly cdr = inject(ChangeDetectorRef);

  specialists: Specialist[] = [];

  constructor() {
    this.content.specialists().subscribe((specialists) => {
      this.specialists = specialists.map((specialist, index) => this.toSpecialist(specialist, index));
      this.cdr.markForCheck();
    });
  }

  isEnglish(): boolean {
    return this.languageState.language() === Language.EN;
  }

  text(ar: string, en: string): string {
    return this.isEnglish() ? en : ar;
  }

  private toSpecialist(specialist: BackendSpecialist, index: number): Specialist {
    const tags = specialistLabels(specialist.specialties, specialist.specialtiesJson).slice(0, 4);
    return {
      id: specialist.id,
      name: specialist.nameAr,
      nameEn: specialist.nameEn || specialist.nameAr,
      title: specialist.titleAr,
      titleEn: specialist.titleEn || specialist.titleAr,
      bio: specialistBioParagraphs(specialist.bioAr)[0] || '',
      bioEn: specialistBioParagraphs(specialist.bioEn || specialist.bioAr)[0] || '',
      bgColor: this.gradient(index),
      initials: (specialist.nameAr || specialist.nameEn || 'S').trim().charAt(0),
      tags: tags.map(tag => tag.textAr),
      tagsEn: tags.map(tag => tag.textEn || tag.textAr),
      consultationTypes: ['فيديو', 'مكالمة صوتية', 'محادثة نصية'],
      consultationTypesEn: ['Video', 'Audio call', 'Text chat'],
    };
  }

  private gradient(index: number): string {
    return [
      'linear-gradient(135deg,#c8a882 0%,#a07850 100%)',
      'linear-gradient(135deg,#ad6f5f 0%,#7a4a3c 100%)',
      'linear-gradient(135deg,#63a39e 0%,#477c78 100%)',
    ][index % 3];
  }
}
