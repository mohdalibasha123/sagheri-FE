import { PaymentStatus } from '../enums';

export interface PaymentInitiationRequest {
  purchaseId: string;
  provider?: string;
  returnUrl?: string;
}

export interface PaymentInitiationResponse {
  redirectUrl?: string;
  checkoutSessionId?: string;
  embeddedConfig?: Record<string, unknown>;
  provider: string;
  reference: string;
}

export interface PaymentStatusResponse {
  reference: string;
  status: PaymentStatus;
  amount: number;
  currency: string;
  provider: string;
  paidAt?: string;
  message?: string;
}

export interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  phoneCode: string;
  country: string;
  motherStatus: string;
}
