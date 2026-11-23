import {
  Check,
  CheckCircle2,
  ClipboardCopy,
  Mail,
  MessageCircle,
  PencilLine,
  PhoneCall,
  RotateCcw,
} from 'lucide-react';
import { FormEvent, RefObject, useState } from 'react';
import {
  CALLBACK_SLOT_OPTIONS,
  DOCUMENT_TYPE_OPTIONS,
  INDIAN_CITY_SUGGESTIONS,
} from '../data/services';
import {
  CallbackSlot,
  DeskContactConfig,
  DocumentType,
  DraftInquiryData,
} from '../types/legal';
import {
  buildCallSheetText,
  buildMailtoHref,
  buildWhatsAppHref,
  generateReferenceId,
  isValidIndianPhone,
} from '../utils/formatDispatch';

interface DraftingFormSectionProps {
  documentType: DocumentType;
  onDocumentTypeChange: (value: DocumentType) => void;
  matterSummary: string;
  onMatterSummaryChange: (value: string) => void;
  deskConfig: DeskContactConfig;
  formNameInputRef: RefObject<HTMLInputElement | null>;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  matterSummary?: string;
}

export function DraftingFormSection({
  documentType,
  onDocumentTypeChange,
  matterSummary,
  onMatterSummaryChange,
  deskConfig,
  formNameInputRef,
}: DraftingFormSectionProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [cityState, setCityState] = useState('');
  const [callbackSlot, setCallbackSlot] = useState<CallbackSlot>('ASAP / Urgent');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedInquiry, setSubmittedInquiry] = useState<DraftInquiryData | null>(
    null
  );
  const [copied, setCopied] = useState(false);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name (minimum 2 characters).';
    }
    if (!isValidIndianPhone(phone)) {
      nextErrors.phone =
        'Enter a valid 10-digit Indian mobile / WhatsApp number (e.g., 8240642015).';
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address or leave blank.';
    }
    if (matterSummary.trim().length < 12) {
      nextErrors.matterSummary =
        'Please summarize key facts, dates, amounts, and what draft/relief you need.';
    }
    return nextErrors;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setCopied(false);

    const formattedTime = new Intl.DateTimeFormat('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date());

    const inquiry: DraftInquiryData = {
      referenceId: generateReferenceId(),
      submittedAt: formattedTime,
      documentType,
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      cityState: cityState.trim(),
      callbackSlot,
      matterSummary: matterSummary.trim(),
    };

    setSubmittedInquiry(inquiry);

    // Smoothly ensure the summary card is visible on smaller viewports
    requestAnimationFrame(() => {
      const summaryEl = document.getElementById('callback-summary-card');
      if (summaryEl && window.innerWidth < 1024) {
        summaryEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  };

  const handleCopyCallSheet = async () => {
    if (!submittedInquiry) return;
    const text = buildCallSheetText(submittedInquiry);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback copy via temporary textarea
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleResetInquiry = () => {
    setSubmittedInquiry(null);
    setFullName('');
    setPhone('');
    setEmail('');
    setCityState('');
    setCallbackSlot('ASAP / Urgent');
    onMatterSummaryChange('');
    setErrors({});
    setCopied(false);
  };

  return (
    <section id="drafting-form" className="scroll-mt-20 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-wide text-blue-900">
            Drafting Inquiry &amp; Callback Request
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl [text-wrap:balance]">
            Submit Your Case Details &amp; Generate Your Call Sheet
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600">
            Fill in your structured request below. Upon submission, you get a
            formatted Callback Summary ready to copy or dispatch instantly via
            WhatsApp and Email.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* Left Column: Structured Intake Form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 lg:col-span-7"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* Document Type */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="doc-type"
                  className="block text-sm font-semibold text-slate-900"
                >
                  Document Type
                </label>
                <select
                  id="doc-type"
                  name="documentType"
                  value={documentType}
                  onChange={(e) =>
                    onDocumentTypeChange(e.target.value as DocumentType)
                  }
                  className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-800 focus:ring-2 focus:ring-blue-800/20 focus:outline-none"
                >
                  {DOCUMENT_TYPE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Full Name */}
              <div>
                <label
                  htmlFor="full-name"
                  className="block text-sm font-semibold text-slate-900"
                >
                  Full Name <span className="text-red-700">*</span>
                </label>
                <input
                  ref={formNameInputRef}
                  id="full-name"
                  name="fullName"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="e.g., Rohan Chatterjee"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                  }}
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={errors.fullName ? 'full-name-error' : undefined}
                  className={`mt-1.5 w-full rounded-lg border px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none ${
                    errors.fullName
                      ? 'border-red-600 focus:ring-2 focus:ring-red-600/20'
                      : 'border-slate-300 focus:border-blue-800 focus:ring-2 focus:ring-blue-800/20'
                  }`}
                />
                {errors.fullName && (
                  <p id="full-name-error" className="mt-1.5 text-xs font-medium text-red-700">
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Phone / WhatsApp */}
              <div>
                <label
                  htmlFor="phone-number"
                  className="block text-sm font-semibold text-slate-900"
                >
                  Phone / WhatsApp Number (India){' '}
                  <span className="text-red-700">*</span>
                </label>
                <input
                  id="phone-number"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="e.g., 8240642015 or +91 8240642015"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors({ ...errors, phone: undefined });
                  }}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'phone-error' : 'phone-help'}
                  className={`mt-1.5 w-full rounded-lg border px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none ${
                    errors.phone
                      ? 'border-red-600 focus:ring-2 focus:ring-red-600/20'
                      : 'border-slate-300 focus:border-blue-800 focus:ring-2 focus:ring-blue-800/20'
                  }`}
                />
                {errors.phone ? (
                  <p id="phone-error" className="mt-1.5 text-xs font-medium text-red-700">
                    {errors.phone}
                  </p>
                ) : (
                  <p id="phone-help" className="mt-1 text-xs text-slate-500">
                    10-digit Indian mobile number for callback &amp; WhatsApp updates.
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label
                  htmlFor="email-address"
                  className="block text-sm font-semibold text-slate-900"
                >
                  Email Address{' '}
                  <span className="font-normal text-slate-500">(Recommended)</span>
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="e.g., rohan@company.in"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={`mt-1.5 w-full rounded-lg border px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none ${
                    errors.email
                      ? 'border-red-600 focus:ring-2 focus:ring-red-600/20'
                      : 'border-slate-300 focus:border-blue-800 focus:ring-2 focus:ring-blue-800/20'
                  }`}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1.5 text-xs font-medium text-red-700">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* City & State */}
              <div>
                <label
                  htmlFor="city-state"
                  className="block text-sm font-semibold text-slate-900"
                >
                  City &amp; State (India)
                </label>
                <input
                  id="city-state"
                  name="cityState"
                  type="text"
                  list="india-cities-list"
                  placeholder="e.g., Kolkata, West Bengal"
                  value={cityState}
                  onChange={(e) => setCityState(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-800 focus:ring-2 focus:ring-blue-800/20 focus:outline-none"
                />
                <datalist id="india-cities-list">
                  {INDIAN_CITY_SUGGESTIONS.map((city) => (
                    <option key={city} value={city} />
                  ))}
                </datalist>
              </div>

              {/* Preferred Callback Time Slot */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="callback-slot"
                  className="block text-sm font-semibold text-slate-900"
                >
                  Preferred Callback Time Slot (IST)
                </label>
                <select
                  id="callback-slot"
                  name="callbackSlot"
                  value={callbackSlot}
                  onChange={(e) => setCallbackSlot(e.target.value as CallbackSlot)}
                  className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-800 focus:ring-2 focus:ring-blue-800/20 focus:outline-none"
                >
                  {CALLBACK_SLOT_OPTIONS.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              {/* Key Facts / Matter Summary */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="matter-summary"
                  className="block text-sm font-semibold text-slate-900"
                >
                  Key Facts / Matter Summary <span className="text-red-700">*</span>
                </label>
                <textarea
                  id="matter-summary"
                  name="matterSummary"
                  rows={5}
                  required
                  placeholder="Describe what happened, key dates, amounts in INR (if any), opposite party name/city, and what specific relief or draft you need..."
                  value={matterSummary}
                  onChange={(e) => {
                    onMatterSummaryChange(e.target.value);
                    if (errors.matterSummary) {
                      setErrors({ ...errors, matterSummary: undefined });
                    }
                  }}
                  aria-invalid={Boolean(errors.matterSummary)}
                  aria-describedby={
                    errors.matterSummary ? 'summary-error' : 'summary-help'
                  }
                  className={`mt-1.5 w-full rounded-lg border px-3.5 py-2.5 text-sm leading-relaxed text-slate-900 placeholder:text-slate-400 focus:outline-none ${
                    errors.matterSummary
                      ? 'border-red-600 focus:ring-2 focus:ring-red-600/20'
                      : 'border-slate-300 focus:border-blue-800 focus:ring-2 focus:ring-blue-800/20'
                  }`}
                />
                {errors.matterSummary ? (
                  <p id="summary-error" className="mt-1.5 text-xs font-medium text-red-700">
                    {errors.matterSummary}
                  </p>
                ) : (
                  <p id="summary-help" className="mt-1 text-xs text-slate-500">
                    Include dates, invoice/cheque numbers, or agreement references to
                    speed up drafting.
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-5">
              <p className="text-xs text-slate-500">
                Generates a structured Callback &amp; Inquiry Summary for WhatsApp &amp;
                Email dispatch.
              </p>
              <button
                type="submit"
                className="inline-flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-lg bg-blue-900 px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
              >
                <PhoneCall className="h-4 w-4" aria-hidden="true" />
                <span>Generate Callback Summary</span>
              </button>
            </div>
          </form>

          {/* Right Column: Callback & Inquiry Summary OR Pre-Submit Guide */}
          <div id="callback-summary-card" className="lg:col-span-5">
            {submittedInquiry ? (
              <div className="rounded-xl border border-slate-300 bg-white p-6 sm:p-7">
                <div className="flex items-start justify-between gap-3 border-b border-slate-200 pb-4">
                  <div>
                    <div className="flex items-center gap-2 text-emerald-800">
                      <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span className="text-xs font-semibold">
                        Ready for Callback &amp; Dispatch
                      </span>
                    </div>
                    <h3 className="mt-1.5 font-display text-xl font-semibold text-slate-950">
                      Callback &amp; Inquiry Summary
                    </h3>
                  </div>
                  <span className="font-mono text-xs font-medium text-slate-600 tabular-nums">
                    {submittedInquiry.referenceId}
                  </span>
                </div>

                {/* Structured Call Sheet Data */}
                <dl className="mt-5 space-y-3 text-sm">
                  <div className="flex items-baseline justify-between gap-4 border-b border-slate-100 pb-2">
                    <dt className="shrink-0 text-slate-500">Document</dt>
                    <dd className="text-right font-semibold text-slate-950">
                      {submittedInquiry.documentType}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 border-b border-slate-100 pb-2">
                    <dt className="shrink-0 text-slate-500">Client Name</dt>
                    <dd className="text-right font-medium text-slate-900">
                      {submittedInquiry.fullName}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 border-b border-slate-100 pb-2">
                    <dt className="shrink-0 text-slate-500">Phone / WhatsApp</dt>
                    <dd className="text-right font-mono font-medium text-slate-900 tabular-nums">
                      {submittedInquiry.phone}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 border-b border-slate-100 pb-2">
                    <dt className="shrink-0 text-slate-500">Email</dt>
                    <dd className="truncate text-right font-medium text-slate-900">
                      {submittedInquiry.email || 'Not provided'}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 border-b border-slate-100 pb-2">
                    <dt className="shrink-0 text-slate-500">City &amp; State</dt>
                    <dd className="text-right font-medium text-slate-900">
                      {submittedInquiry.cityState || 'Not specified'}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 border-b border-slate-100 pb-2">
                    <dt className="shrink-0 text-slate-500">Callback Slot</dt>
                    <dd className="text-right font-semibold text-blue-900">
                      {submittedInquiry.callbackSlot}
                    </dd>
                  </div>
                  <div className="pt-1">
                    <dt className="text-xs font-semibold text-slate-500">
                      Key Facts / Matter Summary
                    </dt>
                    <dd className="mt-1.5 rounded-lg bg-slate-50 p-3 text-sm leading-relaxed whitespace-pre-wrap text-slate-800">
                      {submittedInquiry.matterSummary}
                    </dd>
                  </div>
                </dl>

                {/* Dispatch Actions: WhatsApp, Email, Copy Call Sheet */}
                <div className="mt-6 space-y-2.5">
                  <a
                    href={buildWhatsAppHref(submittedInquiry, deskConfig)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    <span>Send on WhatsApp</span>
                  </a>

                  <a
                    href={buildMailtoHref(submittedInquiry, deskConfig)}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-900 px-4 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    <span>Send via Email</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyCallSheet}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition-colors duration-150 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-700" aria-hidden="true" />
                        <span className="text-emerald-800">Copied Call Sheet</span>
                      </>
                    ) : (
                      <>
                        <ClipboardCopy className="h-4 w-4" aria-hidden="true" />
                        <span>Copy Call Sheet</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
                  <span>Dispatching to {deskConfig.intakeEmail}</span>
                  <button
                    type="button"
                    onClick={handleResetInquiry}
                    className="inline-flex cursor-pointer items-center gap-1 font-medium text-slate-700 hover:text-slate-950"
                  >
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>New Request</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-7">
                <div className="flex items-center gap-2 text-slate-700">
                  <PencilLine className="h-4 w-4 text-blue-900" aria-hidden="true" />
                  <h3 className="font-display text-lg font-semibold text-slate-950">
                    What Your Call Sheet Includes
                  </h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Once you submit the form, VakilKart formats your facts into a
                  standardized intake sheet ready for immediate callback and dispatch:
                </p>

                <ul className="mt-5 divide-y divide-slate-100 border-t border-slate-100 text-sm">
                  <li className="py-3">
                    <span className="font-semibold text-slate-900">
                      01. Unique Case Reference ID
                    </span>
                    <p className="mt-0.5 text-xs text-slate-600">
                      Timestamped intake tag (e.g., VK-20261123-4821) for tracking
                      callbacks and revisions.
                    </p>
                  </li>
                  <li className="py-3">
                    <span className="font-semibold text-slate-900">
                      02. One-Click WhatsApp &amp; Email Dispatch
                    </span>
                    <p className="mt-0.5 text-xs text-slate-600">
                      Pre-filled messages addressed directly to{' '}
                      <span className="font-medium text-slate-800">
                        {deskConfig.whatsappDisplay}
                      </span>{' '}
                      and{' '}
                      <span className="font-medium text-slate-800">
                        {deskConfig.intakeEmail}
                      </span>
                      .
                    </p>
                  </li>
                  <li className="py-3">
                    <span className="font-semibold text-slate-900">
                      03. Clipboard-Ready Call Sheet
                    </span>
                    <p className="mt-0.5 text-xs text-slate-600">
                      Copy the full structured brief in one click for phone follow-ups,
                      advocate review, or internal records.
                    </p>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
