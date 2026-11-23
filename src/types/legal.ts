export type DocumentType =
  | 'Legal Notice'
  | 'Reply to Legal Notice'
  | 'Affidavit'
  | 'MoU (Memorandum of Understanding)'
  | 'Agreement / Contract'
  | 'Other Legal Draft';

export type CallbackSlot =
  | 'ASAP / Urgent'
  | 'Morning (10 AM - 1 PM)'
  | 'Afternoon (1 PM - 5 PM)'
  | 'Evening (5 PM - 8 PM)';

export interface QuickTopicChip {
  id: string;
  label: string;
  documentType: DocumentType;
  prefillPrompt: string;
}

export interface PaperworkServiceItem {
  index: string;
  id: string;
  documentType: DocumentType;
  title: string;
  categoryMeta: string;
  turnaroundMeta: string;
  summary: string;
  useCases: string[];
  featured?: boolean;
}

export interface DraftInquiryData {
  referenceId: string;
  submittedAt: string;
  documentType: DocumentType;
  fullName: string;
  phone: string;
  email: string;
  cityState: string;
  callbackSlot: CallbackSlot;
  matterSummary: string;
}

export interface DeskContactConfig {
  phoneDisplay: string;
  whatsappDisplay: string;
  intakeEmail: string;
  coverage: string;
  deskHours: string;
}
