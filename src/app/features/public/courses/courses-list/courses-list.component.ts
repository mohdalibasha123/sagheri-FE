import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Language } from '../../../../core/enums';
import { PublicContentService, BackendCourseSummary } from '../../../../core/services/public-content.service';
import { LanguageStateService } from '../../../../core/state/language-state.service';

interface Course {
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  desc: string;
  descEn: string;
  duration: string;
  durationEn: string;
  lessons: number;
  price: number;
  currency: string;
  currencyEn: string;
  rating: number;
  gradient: string;
  badge: string;
  badgeEn: string;
}

@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss',
})
export class CoursesListComponent {
  private readonly languageState = inject(LanguageStateService);
  private readonly content = inject(PublicContentService);
  private readonly cdr = inject(ChangeDetectorRef);

  courses: Course[] = [];

  constructor() {
    this.content.courses().subscribe((courses) => {
      this.courses = courses.map((course, index) => this.toCourse(course, index));
      this.cdr.markForCheck();
    });
  }

  isEnglish(): boolean {
    return this.languageState.language() === Language.EN;
  }

  text(ar: string, en: string): string {
    return this.isEnglish() ? en : ar;
  }

  private toCourse(course: BackendCourseSummary, index: number): Course {
    return {
      id: course.id,
      slug: course.slug,
      title: course.titleAr,
      titleEn: course.titleEn || course.titleAr,
      desc: course.descriptionAr,
      descEn: course.descriptionEn || course.descriptionAr,
      duration: `${course.durationMinutes ?? 0} دقيقة`,
      durationEn: `${course.durationMinutes ?? 0} minutes`,
      lessons: course.lessonsCount ?? 0,
      price: Number(course.priceAmount ?? 0),
      currency: 'دينار أردني',
      currencyEn: course.currency || 'JOD',
      rating: Number(course.rating ?? 0),
      gradient: this.gradient(index),
      badge: course.badgeAr || '',
      badgeEn: course.badgeEn || course.badgeAr || '',
    };
  }

  private gradient(index: number): string {
    return [
      'linear-gradient(135deg,#8b6f47 0%,#c4956a 55%,#e8b88a 100%)',
      'linear-gradient(135deg,#3d7a74 0%,#63a39e 55%,#8fcac5 100%)',
      'linear-gradient(135deg,#5d3f33 0%,#ad6f5f 55%,#d69a73 100%)',
    ][index % 3];
  }
}
