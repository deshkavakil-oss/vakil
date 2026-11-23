import { ArrowRight, Mail, MessageCircle, Scale } from 'lucide-react';
import { useState } from 'react';
import { QUICK_TOPIC_CHIPS } from '../data/services';
import { DeskContactConfig, QuickTopicChip } from '../types/legal';
import { buildDirectWhatsAppHref } from '../utils/formatDispatch';

interface HeroSectionProps {
  selectedTopicId: string;
  onSelectQuickTopic: (chip: QuickTopicChip) => void;
  onPrimaryCta: () => void;
  deskConfig: DeskContactConfig;
}

const HERO_IMAGE_SRC = '/src/assets/images/hero_legal_chambers_1795462396820.jpg';

export function HeroSection({
  selectedTopicId,
  onSelectQuickTopic,
  onPrimaryCta,
  deskConfig,
}: HeroSectionProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="top"
      className="border-b border-slate-200 bg-white py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Core Proposition & Quick-Select Intake */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <p className="text-xs font-semibold tracking-wide text-blue-900 sm:text-sm">
              Online Legal Notice, Affidavit &amp; Draft Requests Across India
            </p>

            <h1 className="mt-4 font-display text-[clamp(2.15rem,4vw,3.5rem)] leading-[1.12] font-semibold tracking-tight text-slate-950 [text-wrap:balance]">
              Get Your Legal Notice Drafted Fast — With Structured Case Precision
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Submit your key dates, amounts, and opposite-party details in minutes.
              Built for time-sensitive Legal Notices across India, alongside sworn
              Affidavits, MoUs, and enforceable Agreements.
            </p>

            {/* Interactive Quick-Select Matter Controls */}
            <div className="mt-7">
              <p className="mb-2.5 text-xs font-medium text-slate-500">
                Select a common drafting request to pre-fill the intake form:
              </p>
              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-label="Common Legal Drafting Topics"
              >
                {QUICK_TOPIC_CHIPS.map((chip) => {
                  const isActive = selectedTopicId === chip.id;
                  return (
                    <button
                      key={chip.id}
                      type="button"
                      onClick={() => onSelectQuickTopic(chip)}
                      className={`cursor-pointer whitespace-nowrap rounded-lg border px-3.5 py-2 text-xs font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800 sm:text-sm ${
                        isActive
                          ? 'border-blue-900 bg-blue-900 text-white'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100 hover:text-slate-950'
                      }`}
                    >
                      {chip.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onPrimaryCta}
                className="inline-flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-lg bg-blue-900 px-5 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800 sm:text-base"
              >
                <span>Fill Drafting Form</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <a
                href={buildDirectWhatsAppHref(deskConfig)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>WhatsApp VakilKart</span>
              </a>
              <a
                href={`mailto:${encodeURIComponent(deskConfig.intakeEmail)}?subject=${encodeURIComponent('VakilKart Legal Drafting Request')}`}
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition-colors duration-150 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span>Email Us</span>
              </a>
            </div>

            {/* Trust Highlights — Unboxed Metadata with Middot Separators */}
            <div className="mt-8 border-t border-slate-200 pt-5">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-medium text-slate-600 sm:text-sm">
                <span>Structured Case Intake</span>
                <span aria-hidden="true" className="text-slate-400">
                  ·
                </span>
                <span>Direct Call-Back Request</span>
                <span aria-hidden="true" className="text-slate-400">
                  ·
                </span>
                <span>Instant WhatsApp &amp; Email Dispatch</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Chambers Photography with Resilient Fallback */}
          <div className="lg:col-span-5">
            <div className="relative h-64 overflow-hidden rounded-xl border border-slate-200 bg-slate-900 sm:h-80 lg:h-full lg:min-h-[420px]">
              {!imgError ? (
                <img
                  src={HERO_IMAGE_SRC}
                  alt="Indian legal chambers desk with drafted legal notice documents and fountain pen"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 p-8 text-center text-white">
                  <Scale className="mb-3 h-10 w-10 text-blue-300" aria-hidden="true" />
                  <p className="font-display text-lg font-semibold">
                    VakilKart Chambers Desk
                  </p>
                  <p className="mt-1 text-sm text-slate-300">
                    Legal Notices, Affidavits &amp; MoU Drafting Across India
                  </p>
                </div>
              )}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent p-5">
                <p className="text-xs font-medium text-slate-200">
                  Pre-Litigation &amp; Documentation Desk · Pan-India Jurisdictions
                </p>
                <p className="mt-0.5 text-sm font-semibold text-white">
                  Statutory Notices, Sworn Affidavits &amp; Commercial MoUs
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
