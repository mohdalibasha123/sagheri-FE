import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Language } from '../../../../core/enums';
import { BackendCourseDetail, PublicContentService } from '../../../../core/services/public-content.service';
import { LanguageStateService } from '../../../../core/state/language-state.service';

interface CourseView {
  id: string;
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
  reviews: number;
  gradient: string;
  outcomes: string[];
  outcomesEn: string[];
}

interface LessonView {
  title: string;
  titleEn: string;
  duration: string;
  durationEn: string;
  free: boolean;
}

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss',
})
export class CourseDetailComponent {
  private readonly languageState = inject(LanguageStateService);
  private readonly route = inject(ActivatedRoute);
  private readonly content = inject(PublicContentService);
  private readonly cdr = inject(ChangeDetectorRef);

  readonly openLesson = signal<number | null>(null);

  course: CourseView = this.emptyCourse();
  lessons: LessonView[] = [];

  constructor() {
    const idOrSlug = this.route.snapshot.paramMap.get('slug') || this.route.snapshot.paramMap.get('id') || '';
    if (idOrSlug) {
      this.content.course(idOrSlug).subscribe((course) => {
        this.course = this.toCourse(course);
        this.lessons = (course.lessons || []).map((lesson) => ({
          title: lesson.titleAr,
          titleEn: lesson.titleEn || lesson.titleAr,
          duration: `${lesson.durationMinutes ?? 0} دقيقة`,
          durationEn: `${lesson.durationMinutes ?? 0} min`,
          free: !!lesson.preview,
        }));
        this.cdr.markForCheck();
      });
    }
  }

  isEnglish(): boolean {
    return this.languageState.language() === Language.EN;
  }

  text(ar: string, en: string): string {
    return this.isEnglish() ? en : ar;
  }

  toggleLesson(i: number): void {
    this.openLesson.update((v) => (v === i ? null : i));
  }

  private toCourse(course: BackendCourseDetail): CourseView {
    return {
      id: course.id,
      title: course.titleAr,
      titleEn: course.titleEn || course.titleAr,
      desc: course.descriptionAr,
      descEn: course.descriptionEn || course.descriptionAr,
      duration: `${course.durationMinutes ?? 0} دقيقة`,
      durationEn: `${course.durationMinutes ?? 0} minutes`,
      lessons: course.lessonsCount ?? course.lessons?.length ?? 0,
      price: Number(course.priceAmount ?? 0),
      currency: 'دينار أردني',
      currencyEn: course.currency || 'JOD',
      rating: Number(course.rating ?? 0),
      reviews: course.reviewsCount ?? 0,
      gradient: 'linear-gradient(135deg,#8b6f47 0%,#c4956a 50%,#e8b88a 100%)',
      outcomes: (course.outcomes || []).map((outcome) => outcome.textAr),
      outcomesEn: (course.outcomes || []).map((outcome) => outcome.textEn || outcome.textAr),
    };
  }

  private emptyCourse(): CourseView {
    return {
      title: '',
      id: '',
      titleEn: '',
      desc: '',
      descEn: '',
      duration: '',
      durationEn: '',
      lessons: 0,
      price: 0,
      currency: 'دينار أردني',
      currencyEn: 'JOD',
      rating: 0,
      reviews: 0,
      gradient: 'linear-gradient(135deg,#8b6f47 0%,#c4956a 50%,#e8b88a 100%)',
      outcomes: [],
      outcomesEn: [],
    };
  }
}
