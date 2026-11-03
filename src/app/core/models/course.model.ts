export interface Course {
  id: string;
  slug: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  thumbnailUrl: string;
  videoPreviewUrl?: string;
  price: number;
  currency: string;
  durationMinutes: number;
  lessonsCount: number;
  rating: number;
  reviewsCount: number;
  isActive: boolean;
  isFree: boolean;
  outcomes: CourseOutcome[];
  lessons: CourseLesson[];
  createdAt: string;
}

export interface CourseOutcome {
  id: string;
  textAr: string;
  textEn: string;
  order: number;
}

export interface CourseLesson {
  id: string;
  courseId: string;
  titleAr: string;
  titleEn: string;
  descriptionAr?: string;
  descriptionEn?: string;
  videoUrl?: string;
  durationMinutes: number;
  order: number;
  isPreview: boolean;
}

export interface CoursePurchase {
  id: string;
  courseId: string;
  course: Course;
  userId: string;
  paymentStatus: string;
  paymentReference?: string;
  amount: number;
  currency: string;
  createdAt: string;
}

export interface CourseFilters {
  search?: string;
  isActive?: boolean;
  isFree?: boolean;
}
