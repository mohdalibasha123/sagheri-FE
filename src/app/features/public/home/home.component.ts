import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Language } from '../../../core/enums';
import {
  BackendCourseSummary,
  BackendFaq,
  BackendReview,
  BackendSpecialist,
  PublicContentService,
} from '../../../core/services/public-content.service';
import { LanguageStateService } from '../../../core/state/language-state.service';
import { specialistBioParagraphs, specialistLabels } from '../../../core/models/specialist-content';

interface Specialist {
  id: string;
  name: string;
  nameEn: string;
  role: string;
  roleEn: string;
  bio: string;
  bioEn: string;
  color: string;
  initial: string;
  tags: string[];
  tagsEn: string[];
}

interface Course {
  slug: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  duration: string;
  durationEn: string;
  lessons: number;
  price: number;
  currency: string;
  currencyEn: string;
  gradient: string;
  badge: string;
  badgeEn: string;
}

interface Faq {
  q: string;
  qEn: string;
  a: string;
  aEn: string;
}

interface Review {
  name: string;
  nameEn: string;
  label: string;
  labelEn: string;
  text: string;
  textEn: string;
}

interface HeroContent {
  eyebrow: string;
  eyebrowEn: string;
  headline: string;
  headlineEn: string;
  subtitle: string;
  subtitleEn: string;
  ctaPrimary: string;
  ctaPrimaryEn: string;
  ctaSecondary: string;
  ctaSecondaryEn: string;
}

interface StatContent {
  value: string;
  label: string;
  labelEn: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly languageState = inject(LanguageStateService);
  private readonly content = inject(PublicContentService);
  private readonly cdr = inject(ChangeDetectorRef);

  readonly openFaq = signal<number | null>(0);

  specialists: Specialist[] = [];
  courses: Course[] = [];
  reviews: Review[] = [];
  faqs: Faq[] = [];
  hero: HeroContent = {
    eyebrow: '',
    eyebrowEn: '',
    headline: '',
    headlineEn: '',
    subtitle: '',
    subtitleEn: '',
    ctaPrimary: '',
    ctaPrimaryEn: '',
    ctaSecondary: '',
    ctaSecondaryEn: '',
  };
  stats: StatContent[] = [];

  constructor() {
    this.content.homeData().subscribe(({ page, courses, specialists, reviews, faqs }) => {
      this.applyHomeCms(page);
      this.courses = courses.map((course, index) => this.toCourse(course, index));
      this.specialists = specialists.map((specialist, index) => this.toSpecialist(specialist, index));
      this.reviews = reviews.map((review) => this.toReview(review));
      this.faqs = faqs.map((faq) => this.toFaq(faq));
      this.cdr.markForCheck();
    });
  }

  isEnglish(): boolean {
    return this.languageState.language() === Language.EN;
  }

  text(ar: string, en: string): string {
    return this.isEnglish() ? en : ar;
  }

  toggleFaq(index: number): void {
    this.openFaq.update((current) => (current === index ? null : index));
  }

  private toCourse(course: BackendCourseSummary, index: number): Course {
    return {
      slug: course.slug,
      title: course.titleAr,
      titleEn: course.titleEn || course.titleAr,
      description: course.descriptionAr,
      descriptionEn: course.descriptionEn || course.descriptionAr,
      duration: `${course.durationMinutes ?? 0} دقيقة`,
      durationEn: `${course.durationMinutes ?? 0} minutes`,
      lessons: course.lessonsCount ?? 0,
      price: Number(course.priceAmount ?? 0),
      currency: 'دينار أردني',
      currencyEn: course.currency || 'JOD',
      gradient: this.courseGradient(index),
      badge: course.badgeAr || '',
      badgeEn: course.badgeEn || course.badgeAr || '',
    };
  }

  private toSpecialist(specialist: BackendSpecialist, index: number): Specialist {
    const tags = specialistLabels(specialist.specialties, specialist.specialtiesJson).slice(0, 3);
    return {
      id: specialist.id,
      name: specialist.nameAr,
      nameEn: specialist.nameEn || specialist.nameAr,
      role: specialist.titleAr,
      roleEn: specialist.titleEn || specialist.titleAr,
      bio: specialistBioParagraphs(specialist.bioAr)[0] || '',
      bioEn: specialistBioParagraphs(specialist.bioEn || specialist.bioAr)[0] || '',
      color: this.specialistGradient(index),
      initial: (specialist.nameAr || specialist.nameEn || 'S').trim().charAt(0),
      tags: tags.map(tag => tag.textAr),
      tagsEn: tags.map(tag => tag.textEn || tag.textAr),
    };
  }

  private toFaq(faq: BackendFaq): Faq {
    return {
      q: faq.questionAr,
      qEn: faq.questionEn || faq.questionAr,
      a: faq.answerAr,
      aEn: faq.answerEn || faq.answerAr,
    };
  }

  private toReview(review: BackendReview): Review {
    return {
      name: review.reviewerNameAr,
      nameEn: review.reviewerNameEn || review.reviewerNameAr,
      label: '',
      labelEn: '',
      text: review.contentAr,
      textEn: review.contentEn || review.contentAr,
    };
  }

  private courseGradient(index: number): string {
    return [
      'linear-gradient(135deg, #8b6f47, #d69a73)',
      'linear-gradient(135deg, #3d7a74, #8fcac5)',
      'linear-gradient(135deg, #5d3f33, #d69a73)',
    ][index % 3];
  }

  private specialistGradient(index: number): string {
    return [
      'linear-gradient(135deg, #c98148, #8f5647)',
      'linear-gradient(135deg, #63a39e, #477c78)',
      'linear-gradient(135deg, #ad6f5f, #7a4a3c)',
    ][index % 3];
  }

  private applyHomeCms(page: { sections: Array<{ sectionKey: string; titleAr?: string; titleEn?: string; contentAr?: string; contentEn?: string; contentJsonAr?: unknown; contentJsonEn?: unknown }> }): void {
    const heroSection = page.sections.find((section) => section.sectionKey === 'hero');
    const aboutSection = page.sections.find((section) => section.sectionKey === 'about');
    const heroAr = this.asRecord(heroSection?.contentJsonAr);
    const heroEn = this.asRecord(heroSection?.contentJsonEn);
    const aboutAr = this.asRecord(aboutSection?.contentJsonAr);
    const aboutEn = this.asRecord(aboutSection?.contentJsonEn);

    this.hero = {
      eyebrow: heroSection?.titleAr || '',
      eyebrowEn: heroSection?.titleEn || heroSection?.titleAr || '',
      headline: this.asString(heroAr['headline']) || heroSection?.titleAr || '',
      headlineEn: this.asString(heroEn['headline']) || heroSection?.titleEn || heroSection?.titleAr || '',
      subtitle: this.asString(heroAr['subtitle']) || heroSection?.contentAr || '',
      subtitleEn: this.asString(heroEn['subtitle']) || heroSection?.contentEn || heroSection?.contentAr || '',
      ctaPrimary: this.asString(heroAr['ctaPrimary']),
      ctaPrimaryEn: this.asString(heroEn['ctaPrimary']) || this.asString(heroAr['ctaPrimary']),
      ctaSecondary: this.asString(heroAr['ctaSecondary']),
      ctaSecondaryEn: this.asString(heroEn['ctaSecondary']) || this.asString(heroAr['ctaSecondary']),
    };

    const statsAr = this.asStats(aboutAr['stats']);
    const statsEn = this.asStats(aboutEn['stats']);
    this.stats = statsAr.map((stat, index) => ({
      value: stat.value,
      label: stat.label,
      labelEn: statsEn[index]?.label || stat.label,
    }));
  }

  private asRecord(value: unknown): Record<string, unknown> {
    return value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {};
  }

  private asString(value: unknown): string {
    return typeof value === 'string' ? value : '';
  }

  private asStats(value: unknown): Array<{ value: string; label: string }> {
    return Array.isArray(value)
      ? value
          .map((item) => this.asRecord(item))
          .map((item) => ({ value: this.asString(item['value']), label: this.asString(item['label']) }))
          .filter((item) => item.value && item.label)
      : [];
  }
}
