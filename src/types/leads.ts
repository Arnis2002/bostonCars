export type LeadType =
'vehicle-inquiry' |
'test-drive' |
'financing' |
'trade-in' |
'vehicle-finder' |
'general-contact';

export type ContactMethod = 'Phone call' | 'Text message' | 'Email';
export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

/** Transactional consent (required to respond) is kept separate from optional marketing consent. */
export interface LeadConsent {
  consentContact: boolean;
  consentMarketing: boolean;
}

export interface LeadContact {
  name: string;
  phone: string;
  email: string;
}

export interface VehicleInquiryLead extends LeadContact, LeadConsent {
  vehicleId: string;
  preferredContact: ContactMethod | '';
  message: string;
}

export interface TestDriveLead extends LeadContact, LeadConsent {
  vehicleId: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
}

export interface FinancingLead extends LeadConsent {
  vehicleOfInterest: string;
  vehicleType: string;
  priceRange: string;
  downPayment: string;
  tradeIn: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredContact: ContactMethod | '';
  employmentStatus: string;
  incomeRange: string;
  residenceStatus: string;
  timeAtAddress: string;
}

export interface TradeInLead extends LeadContact, LeadConsent {
  vinOrPlate: string;
  year: string;
  make: string;
  model: string;
  trim: string;
  mileage: string;
  condition: string;
  accidentHistory: string;
  titleStatus: string;
  loanStatus: string;
  photoCount: number;
  preferredContact: ContactMethod | '';
  notes: string;
}

export interface VehicleFinderLead extends LeadContact, LeadConsent {
  vehicleType: string;
  make: string;
  model: string;
  yearMin: string;
  yearMax: string;
  budget: string;
  mileageMax: string;
  features: string;
}

export interface GeneralContactLead extends LeadContact, LeadConsent {
  reason: string;
  vehicleId: string;
  preferredDate: string;
  message: string;
}

export interface LeadSubmission {
  type: LeadType;
  payload: Record<string, unknown>;
  submittedAt: string;
  source: string;
}