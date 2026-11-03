import { UserRole } from '../enums';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  dateOfBirth: string;
  nationality: string;
  motherStatus: MotherStatus;
  childrenCount: number;
  chronicDiseases: ChronicDisease[];
  chronicDiseaseOther: string | null;
  medicationAllergy: string | null;
  foodAllergy: string | null;
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken?: string;
  token?: string;
  refreshToken?: string;
  user: UserProfile;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface UserProfile {
  id: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  country?: string;
  dateOfBirth?: string;
  nationality?: string;
  motherStatus?: MotherStatus;
  childrenCount?: number;
  chronicDiseases?: ChronicDisease[];
  chronicDiseaseOther?: string | null;
  medicationAllergy?: string | null;
  foodAllergy?: string | null;
  roles: UserRole[];
  permissions: string[];
  avatarUrl?: string;
  createdAt: string;
}

export type MotherStatus =
  | 'PREGNANT'
  | 'BREASTFEEDING'
  | 'PREGNANT_AND_BREASTFEEDING'
  | 'NONE'
  | 'OTHER';

export type ChronicDisease =
  | 'CHRONIC_HYPERTENSION'
  | 'GESTATIONAL_HYPERTENSION'
  | 'TYPE_1_DIABETES'
  | 'TYPE_2_DIABETES'
  | 'GESTATIONAL_DIABETES'
  | 'HYPOTHYROIDISM'
  | 'HYPERTHYROIDISM'
  | 'OTHER';

export interface Permission {
  id: string;
  name: string;
  description?: string;
}

export interface Role {
  id: string;
  name: string;
  permissions: Permission[];
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}
