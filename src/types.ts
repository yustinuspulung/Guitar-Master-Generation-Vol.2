export interface Juror {
  id: string;
  name: string;
  role: string;
  band?: string;
  bio: string;
  imageUrl: string;
  articleUrl?: string;
  specialty: string;
}

export interface TourPoint {
  city: string;
  type: 'Club to Club' | 'City to City' | 'Klimaks';
  venue: string;
  date?: string;
  highlight?: boolean;
}

export interface AuditionZone {
  id: string;
  region: string;
  zones: string[];
  liveAuditionVenue: string;
  details: string;
}

export interface InvestmentItem {
  category: string;
  amount: string;
  percentage: number;
  details: string;
}

export interface LeadFormData {
  fullName: string;
  institution: string;
  email: string;
  whatsApp: string;
}

export interface SubmissionLead extends LeadFormData {
  id: string;
  timestamp: string;
}
