import { ConsultationType } from '../enums';

export interface Specialist {
  id: string;
  nameAr: string;
  nameEn: string;
  titleAr: string;
  titleEn: string;
  bioAr: string;
  bioEn: string;
  imageUrl: string;
  specialties: Specialty[];
  consultationTypes: ConsultationTypeItem[];
  isActive: boolean;
  createdAt: string;
}

export interface Specialty {
  id: string;
  nameAr: string;
  nameEn: string;
}

export interface ConsultationTypeItem {
  id: string;
  type: ConsultationType;
  nameAr: string;
  nameEn: string;
  durationMinutes: number;
  price: number;
  currency: string;
  isActive: boolean;
}

export interface SpecialistAvailability {
  id: string;
  specialistId: string;
  date: string;
  slots: TimeSlot[];
}

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}
