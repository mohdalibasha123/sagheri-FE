import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, shareReplay, throwError } from 'rxjs';
import { API_ENDPOINTS } from '../constants/api-endpoints';
import { ApiService } from './api.service';
import { environment } from '../../../environments/environment';

export interface PublicContentSnapshot {
  schemaVersion: number;
  generatedAt: string;
  source: string;
  courses: BackendCourseDetail[];
  specialists: BackendSpecialist[];
  consultationTypes: BackendConsultationType[];
  faqs: BackendFaq[];
  reviews: BackendReview[];
  cmsPages: BackendCmsPage[];
  siteSettings: BackendSiteSetting[];
}

export interface BackendCourseSummary {
  id: string;
  slug: string;
  titleAr: string;
  titleEn?: string;
  subtitleAr?: string;
  subtitleEn?: string;
  descriptionAr: string;
  descriptionEn?: string;
  thumbnailUrl?: string;
  durationMinutes?: number;
  lessonsCount?: number;
  priceAmount: number;
  currency: string;
  rating?: number;
  reviewsCount?: number;
  badgeAr?: string;
  badgeEn?: string;
  free?: boolean;
  displayOrder?: number;
}

export interface BackendCourseDetail extends BackendCourseSummary {
  videoPreviewUrl?: string;
  outcomes?: Array<{ id: string; textAr: string; textEn?: string; displayOrder?: number }>;
  lessons?: Array<{
    id: string;
    titleAr: string;
    titleEn?: string;
    descriptionAr?: string;
    descriptionEn?: string;
    durationMinutes?: number;
    videoUrl?: string;
    displayOrder?: number;
    preview?: boolean;
  }>;
}

export interface BackendLocalizedText {
  textAr: string;
  textEn?: string;
}

export interface BackendSpecialist {
  id: string;
  nameAr: string;
  nameEn?: string;
  titleAr: string;
  titleEn?: string;
  bioAr: string;
  bioEn?: string;
  imageUrl?: string;
  specialty?: string;
  specialties?: Array<string | BackendLocalizedText>;
  credentials?: Array<string | BackendLocalizedText>;
  specialtiesJson?: string;
  credentialsJson?: string;
  displayOrder?: number;
}

export interface BackendFaq {
  id: string;
  questionAr: string;
  questionEn?: string;
  answerAr: string;
  answerEn?: string;
}

export interface BackendReview {
  id: string;
  reviewerNameAr: string;
  reviewerNameEn?: string;
  contentAr: string;
  contentEn?: string;
  rating?: number;
  displayOrder?: number;
}

export interface BackendConsultationType {
  id: string;
  code: string;
  nameAr: string;
  nameEn?: string;
  descriptionAr?: string;
  descriptionEn?: string;
  durationMinutes?: number;
  priceAmount: number;
  currency: string;
}

export interface BackendAvailability {
  id: string;
  availableDate: string;
  startTime: string;
  endTime: string;
}

export interface BackendCmsPage {
  id: string;
  pageKey: string;
  titleAr: string;
  titleEn?: string;
  sections: Array<{
    id?: string;
    sectionKey: string;
    titleAr?: string;
    titleEn?: string;
    contentAr?: string;
    contentEn?: string;
    contentJsonAr?: unknown;
    contentJsonEn?: unknown;
    metadata?: unknown;
    sectionType?: string;
    displayOrder?: number;
  }>;
  seoTitleAr?: string;
  seoTitleEn?: string;
  seoDescriptionAr?: string;
  seoDescriptionEn?: string;
  ogImageUrl?: string;
}

export interface BackendSiteSetting {
  id: string;
  settingKey: string;
  settingValue: string;
  valueType?: string;
  groupName?: string;
}

@Injectable({ providedIn: 'root' })
export class PublicContentService {
  private readonly api = inject(ApiService);
  private readonly http = inject(HttpClient);
  private readonly fallbackAssetPath = 'assets/content-fallback.json';

  private readonly snapshot$ = this.api.get<PublicContentSnapshot>(API_ENDPOINTS.cms.staticContentSnapshot).pipe(
    catchError((error) => this.fallbackSnapshot(error)),
    map((snapshot) => this.normalizeSnapshot(snapshot)),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  snapshot(): Observable<PublicContentSnapshot> {
    return this.snapshot$;
  }

  courses(): Observable<BackendCourseSummary[]> {
    return this.snapshot$.pipe(map((snapshot) => snapshot.courses));
  }

  course(idOrSlug: string): Observable<BackendCourseDetail> {
    return this.snapshot$.pipe(
      map((snapshot) => {
        const course = snapshot.courses.find((item) => item.id === idOrSlug || item.slug === idOrSlug);
        if (course) {
          return course;
        }
        throw new Error(`Course not found: ${idOrSlug}`);
      }),
    );
  }

  specialists(): Observable<BackendSpecialist[]> {
    return this.snapshot$.pipe(map((snapshot) => snapshot.specialists));
  }

  specialist(id: string): Observable<BackendSpecialist | undefined> {
    return this.snapshot$.pipe(map((snapshot) => snapshot.specialists.find((item) => item.id === id)));
  }

  consultationTypes(): Observable<BackendConsultationType[]> {
    return this.snapshot$.pipe(map((snapshot) => snapshot.consultationTypes));
  }

  availability(specialistId: string): Observable<BackendAvailability[]> {
    return this.api.get<BackendAvailability[]>(API_ENDPOINTS.specialists.availability(specialistId)).pipe(
      catchError(() => of([])),
    );
  }

  faqs(): Observable<BackendFaq[]> {
    return this.snapshot$.pipe(map((snapshot) => snapshot.faqs));
  }

  reviews(): Observable<BackendReview[]> {
    return this.snapshot$.pipe(map((snapshot) => snapshot.reviews));
  }

  cmsPage(pageKey: string): Observable<BackendCmsPage> {
    return this.api.get<BackendCmsPage>(API_ENDPOINTS.cms.page(pageKey)).pipe(
      catchError((error) => this.cmsPageFromSnapshot(pageKey, error)),
    );
  }

  siteSettings(): Observable<BackendSiteSetting[]> {
    return this.snapshot$.pipe(map((snapshot) => snapshot.siteSettings));
  }

  setting(key: string): Observable<string> {
    return this.siteSettings().pipe(
      map((settings) => settings.find((setting) => setting.settingKey === key)?.settingValue ?? ''),
    );
  }

  homeData(): Observable<{
    snapshot: PublicContentSnapshot;
    page: BackendCmsPage;
    courses: BackendCourseDetail[];
    specialists: BackendSpecialist[];
    faqs: BackendFaq[];
    reviews: BackendReview[];
  }> {
    return this.snapshot$.pipe(
      map((snapshot) => ({
        snapshot,
        page: snapshot.cmsPages.find((item) => item.pageKey === 'home') ?? {
          id: 'home',
          pageKey: 'home',
          titleAr: '',
          titleEn: '',
          sections: [],
        },
        courses: snapshot.courses,
        specialists: snapshot.specialists,
        faqs: snapshot.faqs,
        reviews: snapshot.reviews,
      })),
    );
  }

  createBooking(body: unknown): Observable<unknown> {
    return this.api.post<unknown>(API_ENDPOINTS.bookings.create, body);
  }

  purchaseCourse(courseId: string, body: unknown): Observable<unknown> {
    return this.api.post<unknown>(API_ENDPOINTS.courses.purchase(courseId), body);
  }

  createContactMessage(body: unknown): Observable<unknown> {
    return this.api.post<unknown>(API_ENDPOINTS.contact.create, body);
  }

  private normalizeSnapshot(snapshot: PublicContentSnapshot): PublicContentSnapshot {
    return {
      schemaVersion: snapshot.schemaVersion,
      generatedAt: snapshot.generatedAt,
      source: snapshot.source,
      courses: snapshot.courses ?? [],
      specialists: snapshot.specialists ?? [],
      consultationTypes: snapshot.consultationTypes ?? [],
      faqs: snapshot.faqs ?? [],
      reviews: snapshot.reviews ?? [],
      cmsPages: snapshot.cmsPages ?? [],
      siteSettings: snapshot.siteSettings ?? [],
    };
  }

  private fallbackSnapshot(error: unknown): Observable<PublicContentSnapshot> {
    if (!environment.enableContentFallbackJson) {
      return throwError(() => error);
    }

    return this.http.get<PublicContentSnapshot>(this.fallbackAssetPath);
  }

  private cmsPageFromSnapshot(pageKey: string, error: unknown): Observable<BackendCmsPage> {
    if (!environment.enableContentFallbackJson) {
      return throwError(() => error);
    }

    return this.http.get<PublicContentSnapshot>(this.fallbackAssetPath).pipe(
      map((snapshot) => this.normalizeSnapshot(snapshot)),
      map((snapshot) => {
        const page = snapshot.cmsPages.find((item) => item.pageKey === pageKey);
        if (page) {
          return page;
        }
        return {
          id: pageKey,
          pageKey,
          titleAr: pageKey,
          titleEn: pageKey,
          sections: [],
        };
      }),
    );
  }
}
