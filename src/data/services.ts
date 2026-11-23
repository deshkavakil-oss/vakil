import {
  CallbackSlot,
  DeskContactConfig,
  DocumentType,
  PaperworkServiceItem,
  QuickTopicChip,
} from '../types/legal';

export const DOCUMENT_TYPE_OPTIONS: DocumentType[] = [
  'Legal Notice',
  'Reply to Legal Notice',
  'Affidavit',
  'MoU (Memorandum of Understanding)',
  'Agreement / Contract',
  'Other Legal Draft',
];

export const CALLBACK_SLOT_OPTIONS: CallbackSlot[] = [
  'ASAP / Urgent',
  'Morning (10 AM - 1 PM)',
  'Afternoon (1 PM - 5 PM)',
  'Evening (5 PM - 8 PM)',
];

export const QUICK_TOPIC_CHIPS: QuickTopicChip[] = [
  {
    id: 'legal-notice',
    label: 'Legal Notice',
    documentType: 'Legal Notice',
    prefillPrompt:
      'Need a formal Legal Notice drafted. Key dates, opposite party details, and specific demand/relief:',
  },
  {
    id: 'cheque-bounce',
    label: 'Cheque Bounce / Payment Legal Notice',
    documentType: 'Legal Notice',
    prefillPrompt:
      'Cheque Bounce (Sec 138 NI Act) / Payment Legal Notice. Cheque number, bank name, dishonour memo date, and unpaid amount (INR):',
  },
  {
    id: 'affidavit',
    label: 'Affidavit',
    documentType: 'Affidavit',
    prefillPrompt:
      'Affidavit drafting request (name change, address, income, gap year, or court declaration). Purpose and deponent details:',
  },
  {
    id: 'mou-draft',
    label: 'MoU Draft',
    documentType: 'MoU (Memorandum of Understanding)',
    prefillPrompt:
      'Memorandum of Understanding (MoU) between parties. Commercial terms, responsibilities, timeline, and exit clauses:',
  },
  {
    id: 'property-rental',
    label: 'Property / Rental Notice',
    documentType: 'Legal Notice',
    prefillPrompt:
      'Property / Landlord-Tenant Legal Notice (rent arrears, eviction, security deposit refund, or possession). Property address and lease dates:',
  },
];

export const POPULAR_PAPERWORK_SERVICES: PaperworkServiceItem[] = [
  {
    index: '01.',
    id: 'service-legal-notice',
    documentType: 'Legal Notice',
    title: 'Legal Notice Drafting',
    categoryMeta: 'Primary Demand & Pre-Litigation',
    turnaroundMeta: 'Priority Callback · All-India Statutory Format',
    summary:
      'Clear, enforceable pre-litigation Legal Notices tailored under Indian statutory provisions — built around your dates, documentary proof, and exact monetary or performance demand.',
    useCases: [
      'Section 138 NI Act Cheque Bounce & Money Recovery',
      'Landlord-Tenant Eviction, Rent Arrears & Deposit Refund',
      'Employer Salary Dues, Wrongful Termination & FnF Settlement',
      'Builder Delay, Consumer Deficiency & Contract Breach',
    ],
    featured: true,
  },
  {
    index: '02.',
    id: 'service-reply-notice',
    documentType: 'Reply to Legal Notice',
    title: 'Reply to Legal Notice',
    categoryMeta: 'Defence & Rebuttal',
    turnaroundMeta: 'Time-Sensitive · Point-by-Point Traverse',
    summary:
      'Structured point-by-point legal rebuttal to an incoming notice, safeguarding your factual record and statutory limitation rights before court proceedings begin.',
    useCases: [
      'Denial of false monetary or breach claims',
      'Counter-claim & settlement positioning',
      'Preserving documentary defence for courts',
    ],
  },
  {
    index: '03.',
    id: 'service-affidavit',
    documentType: 'Affidavit',
    title: 'Affidavit Drafting',
    categoryMeta: 'Sworn Declarations',
    turnaroundMeta: 'Stamp-Paper Ready · Notary & Magistrate Format',
    summary:
      'Precisely worded sworn statements formatted for Indian judicial, passport, university, revenue, or municipal authorities with proper verification clauses.',
    useCases: [
      'Name change, date-of-birth & Gazette declarations',
      'Address, dependency, or education gap affidavits',
      'Indemnity, loss of documents & NOC declarations',
    ],
  },
  {
    index: '04.',
    id: 'service-mou',
    documentType: 'MoU (Memorandum of Understanding)',
    title: 'Memorandum of Understanding (MoU)',
    categoryMeta: 'Bilateral Frameworks',
    turnaroundMeta: 'Commercial & Family Settlements',
    summary:
      'Balanced MoU drafts capturing mutual obligations, payment milestones, confidentiality, and dispute jurisdiction before executing definitive agreements.',
    useCases: [
      'Business partnerships & vendor collaboration',
      'Co-founder equity & IP understanding',
      'Amicable family or debt settlement MoUs',
    ],
  },
  {
    index: '05.',
    id: 'service-agreement',
    documentType: 'Agreement / Contract',
    title: 'Agreement & Contract Drafting',
    categoryMeta: 'Commercial & Civil',
    turnaroundMeta: 'Enforceable Indian Contract Act Clauses',
    summary:
      'Custom contracts drafted for Indian commercial enforceability — covering termination rights, indemnity caps, arbitration venues, and stamp compliance.',
    useCases: [
      'Leave & License / Commercial Lease Agreements',
      'Service, Consultancy & Freelance MSAs',
      'Non-Disclosure (NDA) & Loan Agreements',
    ],
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01.',
    title: 'Structured Case Intake',
    description:
      'Select your document type, preferred callback window, and summarize key dates, amounts, and opposite party details in under three minutes.',
  },
  {
    step: '02.',
    title: 'Direct Callback & Fact Verification',
    description:
      'Receive a structured callback in your chosen slot to verify jurisdiction, statutory timelines (such as 15/30-day notice windows), and relief sought.',
  },
  {
    step: '03.',
    title: 'Instant Dispatch & Draft Readiness',
    description:
      'Share your structured call sheet immediately via WhatsApp or Email so drafting begins without repeated back-and-forth explanations.',
  },
];

export const INDIAN_CITY_SUGGESTIONS = [
  'New Delhi, Delhi',
  'Mumbai, Maharashtra',
  'Bengaluru, Karnataka',
  'Kolkata, West Bengal',
  'Chennai, Tamil Nadu',
  'Hyderabad, Telangana',
  'Pune, Maharashtra',
  'Ahmedabad, Gujarat',
  'Jaipur, Rajasthan',
  'Lucknow, Uttar Pradesh',
  'Chandigarh, Chandigarh',
  'Noida, Uttar Pradesh',
  'Gurugram, Haryana',
  'Kochi, Kerala',
  'Patna, Bihar',
  'Indore, Madhya Pradesh',
];

export const DEFAULT_DESK_CONFIG: DeskContactConfig = {
  phoneDisplay: '+91 8240642015',
  whatsappDisplay: '+91 8240642015',
  intakeEmail: 'kartvakil@gmail.com',
  coverage:
    'Pan-India Coverage — Delhi NCR, Mumbai, Kolkata, Bengaluru, Chennai, Hyderabad, Pune & All District/High Court Jurisdictions',
  deskHours: 'Mon–Sat · 9:30 AM to 8:00 PM IST',
};
