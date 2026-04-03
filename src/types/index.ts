export interface UserProfile {
  fullName: string;
  age: number;
  location: {
    region: string;
    province: string;
    city: string;
  };
  monthlyIncome: number;
  employmentStatus: 'employed' | 'self-employed' | 'unemployed' | 'informal' | 'student' | 'senior';
  hasPhilHealth: boolean;
  philHealthCategory?: 'indigent' | 'sponsored' | 'informal' | 'formal' | 'senior' | 'lifetime';
  diagnosis: string;
  hospitalName: string;
  estimatedBill: number;
  hasExistingCoverage: boolean;
  existingCoverageAmount: number;
}

export interface GovernmentProgram {
  id: string;
  name: string;
  agency: string;
  description: string;
  maxCoverage: number;
  coverageType: 'full' | 'partial' | 'case-rate';
  eligibilityCriteria: EligibilityCriteria;
  requiredDocuments: string[];
  applicationProcess: string[];
  officeAddress: string;
  contactInfo: string;
  processingTime: string;
  successRate: number; // 0-100
  icon: string;
}

export interface EligibilityCriteria {
  maxIncome?: number;
  employmentStatuses?: string[];
  requiresPhilHealth?: boolean;
  philHealthCategories?: string[];
  minAge?: number;
  maxAge?: number;
  regions?: string[]; // empty = nationwide
  conditionTypes?: string[];
}

export interface MatchResult {
  program: GovernmentProgram;
  matchScore: number; // 0-100
  estimatedCoverage: number;
  missingDocuments: string[];
  matchReasons: string[];
  warnings: string[];
}

export interface Application {
  id: string;
  programId: string;
  programName: string;
  agency: string;
  status: 'draft' | 'submitted' | 'pending' | 'approved' | 'denied';
  dateCreated: string;
  dateSubmitted?: string;
  dateUpdated?: string;
  estimatedCoverage: number;
  documents: DocumentItem[];
  letterGenerated: boolean;
  notes: string;
}

export interface DocumentItem {
  name: string;
  required: boolean;
  uploaded: boolean;
  fileName?: string;
}

export interface CrowdfundCampaign {
  id: string;
  patientName: string;
  age: number;
  diagnosis: string;
  hospitalName: string;
  totalBill: number;
  philHealthCoverage: number;
  guaranteeLetterCoverage: number;
  fundingGoal: number;
  amountRaised: number;
  donorCount: number;
  dateCreated: string;
  story: string;
  verifications: Verification[];
  status: 'active' | 'funded' | 'closed';
  imageUrl: string;
  daysLeft: number;
}

export interface Verification {
  type: 'hospital' | 'barangay' | 'employer' | 'social-worker';
  label: string;
  verified: boolean;
  verifiedDate?: string;
}

export interface Donation {
  id: string;
  campaignId: string;
  amount: number;
  donorName: string;
  paymentMethod: 'gcash' | 'maya' | 'bank' | 'card';
  date: string;
  message?: string;
}

export interface TrackedBill {
  id: string;
  patientName: string;
  age: number;
  diagnosis: string;
  hospitalName: string;
  totalBill: number;
  lineItems: { name: string; amount: number }[];
  fundingSources: FundingSource[];
  crowdfunding: { goal: number; raised: number; donorCount: number };
}

export interface FundingSource {
  id: string;
  name: string;
  agency: string;
  status: 'pending' | 'approved' | 'denied' | 'partial';
  requestedAmount: number;
  approvedAmount: number;
  dateSubmitted: string;
  dateResolved?: string;
  denialReason?: string;
}
