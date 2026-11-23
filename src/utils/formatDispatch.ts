import { DeskContactConfig, DraftInquiryData } from '../types/legal';

/**
 * Strips formatting from a phone number and normalizes Indian 10-digit numbers
 * into international format without '+' for wa.me links.
 */
export function normalizeIndianPhoneForWhatsApp(rawPhone: string): string {
  const digits = rawPhone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `91${digits}`;
  }
  if (digits.length === 11 && digits.startsWith('0')) {
    return `91${digits.slice(1)}`;
  }
  if (digits.length >= 12 && digits.startsWith('91')) {
    return digits;
  }
  return digits || '918240642015';
}

/**
 * Validates whether an input string represents a valid 10-digit Indian mobile number
 * (optionally prefixed with +91, 91, or 0).
 */
export function isValidIndianPhone(rawPhone: string): boolean {
  const digits = rawPhone.replace(/\D/g, '');
  if (digits.length === 10) {
    return /^[6-9]\d{9}$/.test(digits);
  }
  if (digits.length === 11 && digits.startsWith('0')) {
    return /^[6-9]\d{9}$/.test(digits.slice(1));
  }
  if (digits.length === 12 && digits.startsWith('91')) {
    return /^[6-9]\d{9}$/.test(digits.slice(2));
  }
  return false;
}

export function formatIndianPhoneForTel(rawPhone: string): string {
  const normalized = normalizeIndianPhoneForWhatsApp(rawPhone);
  return `tel:+${normalized}`;
}

export function generateReferenceId(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `VK-${y}${m}${d}-${rand}`;
}

export function buildCallSheetText(inquiry: DraftInquiryData): string {
  const lines = [
    'VAKILKART — DRAFTING INQUIRY & CALLBACK CALL SHEET',
    `Reference ID: ${inquiry.referenceId}`,
    `Submitted At: ${inquiry.submittedAt}`,
    '--------------------------------------------------',
    `Document Type: ${inquiry.documentType}`,
    `Client Name: ${inquiry.fullName}`,
    `Phone / WhatsApp: ${inquiry.phone}`,
    `Email Address: ${inquiry.email || 'Not provided'}`,
    `City & State: ${inquiry.cityState || 'Not specified'}`,
    `Preferred Callback Slot: ${inquiry.callbackSlot}`,
    '--------------------------------------------------',
    'Key Facts / Matter Summary:',
    inquiry.matterSummary,
    '--------------------------------------------------',
    'Requested via VakilKart India Intake Desk',
  ];
  return lines.join('\n');
}

export function buildMailtoHref(
  inquiry: DraftInquiryData,
  desk: DeskContactConfig
): string {
  const recipient = encodeURIComponent(desk.intakeEmail.trim());
  const subject = encodeURIComponent(
    `[VakilKart ${inquiry.referenceId}] ${inquiry.documentType} Request — ${inquiry.fullName}`
  );
  const body = encodeURIComponent(buildCallSheetText(inquiry));
  return `mailto:${recipient}?subject=${subject}&body=${body}`;
}

export function buildWhatsAppHref(
  inquiry: DraftInquiryData,
  desk: DeskContactConfig
): string {
  const waNumber = normalizeIndianPhoneForWhatsApp(desk.whatsappDisplay);
  const message = buildCallSheetText(inquiry);
  return `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
}

export function buildDirectWhatsAppHref(desk: DeskContactConfig): string {
  const waNumber = normalizeIndianPhoneForWhatsApp(desk.whatsappDisplay);
  const intro =
    'Hello VakilKart Desk, I would like assistance with drafting a Legal Notice / Affidavit / MoU.';
  return `https://wa.me/${waNumber}?text=${encodeURIComponent(intro)}`;
}
