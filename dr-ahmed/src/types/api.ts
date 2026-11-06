export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  errors: string[];
  timestamp: string;
}

export interface OperatingHourItem {
  daysArabic: string;
  daysEnglish: string;
  timeArabic: string;
  timeEnglish: string;
}

export interface PharmacyInfoDto {
  nameArabic: string;
  nameEnglish: string;
  shortNameArabic: string;
  shortNameEnglish: string;
  phoneDisplay: string;
  phoneHref: string;
  whatsappNumber: string;
  facebookUrl: string;
  addressArabic: string;
  addressEnglish: string;
  mapQuery: string;
  mapEmbedUrl: string;
  mapLink: string;
  hours: OperatingHourItem[];
}

export interface PharmacyServiceDto {
  key: string;
  titleArabic: string;
  titleEnglish: string;
  descriptionArabic: string;
  descriptionEnglish: string;
  iconName?: string;
}

export interface CreatePrescriptionDto {
  patientName: string;
  phoneNumber: string;
  address?: string;
  notes?: string;
  imageUrl?: string;
  requiresDelivery?: boolean;
}

export interface PrescriptionResponseDto {
  id: string;
  patientName: string;
  phoneNumber: string;
  address?: string;
  notes?: string;
  imageUrl?: string;
  requiresDelivery: boolean;
  status: number;
  statusText: string;
  createdAt: string;
}

export interface CreateContactInquiryDto {
  name: string;
  phone: string;
  subject?: string;
  message: string;
}

export interface ContactInquiryResponseDto {
  id: string;
  name: string;
  phone: string;
  subject?: string;
  message: string;
  isResolved: boolean;
  createdAt: string;
}

