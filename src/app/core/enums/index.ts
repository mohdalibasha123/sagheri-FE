export enum PaymentStatus {
  PENDING = 'PENDING',
  INITIATED = 'INITIATED',
  PAID = 'PAID',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
  REFUNDED = 'REFUNDED',
}

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}

export enum ConsultationType {
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  TEXT = 'TEXT',
}

export enum UserRole {
  USER = 'USER',
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN',
  CONSULTANT = 'CONSULTANT',
  CONTENT_MANAGER = 'CONTENT_MANAGER',
}

export enum Language {
  AR = 'ar',
  EN = 'en',
}

export enum Direction {
  RTL = 'rtl',
  LTR = 'ltr',
}

export enum Currency {
  JOD = 'JOD',
  SAR = 'SAR',
  AED = 'AED',
  QAR = 'QAR',
  KWD = 'KWD',
  BHD = 'BHD',
  OMR = 'OMR',
  USD = 'USD',
}
