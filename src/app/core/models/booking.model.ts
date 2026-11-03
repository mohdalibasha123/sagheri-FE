import { BookingStatus, ConsultationType } from '../enums';
import { Specialist, ConsultationTypeItem, TimeSlot } from './specialist.model';

export interface ConsultationBooking {
  id: string;
  specialistId: string;
  specialist: Specialist;
  consultationTypeId: string;
  consultationType: ConsultationTypeItem;
  slotId: string;
  slot: TimeSlot;
  date: string;
  status: BookingStatus;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  phoneCode: string;
  country: string;
  problemDescription: string;
  preferredContactTime?: string;
  createdAt: string;
}

export interface BookingRequest {
  specialistId: string;
  consultationTypeId: string;
  slotId: string;
  date: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  phoneCode: string;
  country: string;
  problemDescription: string;
  preferredContactTime?: string;
}

export interface Faq {
  id: string;
  questionAr: string;
  questionEn: string;
  answerAr: string;
  answerEn: string;
  order: number;
  isActive: boolean;
}

export interface Review {
  id: string;
  authorNameAr: string;
  authorNameEn: string;
  textAr: string;
  textEn: string;
  rating: number;
  avatarUrl?: string;
  order: number;
  isActive: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  isRead: boolean;
  isArchived: boolean;
  createdAt: string;
}

export interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  message: string;
}
