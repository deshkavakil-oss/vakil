import {
  Check,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  RotateCcw,
  SlidersHorizontal,
} from 'lucide-react';
import { FormEvent, useState } from 'react';
import { DEFAULT_DESK_CONFIG } from '../data/services';
import { DeskContactConfig } from '../types/legal';
import {
  buildDirectWhatsAppHref,
  formatIndianPhoneForTel,
} from '../utils/formatDispatch';

interface ContactDeskSectionProps {
  deskConfig: DeskContactConfig;
  onUpdateDeskConfig: (next: DeskContactConfig) => void;
}

export function ContactDeskSection({
  deskConfig,
  onUpdateDeskConfig,
}: ContactDeskSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftConfig, setDraftConfig] = useState<DeskContactConfig>(deskConfig);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleToggleEdit = () => {
    setDraftConfig(deskConfig);
    setIsEditing((prev) => !prev);
  };

  const handleSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUpdateDeskConfig({
      phoneDisplay: draftConfig.phoneDisplay.trim() || DEFAULT_DESK_CONFIG.phoneDisplay,
      whatsappDisplay:
        draftConfig.whatsappDisplay.trim() || DEFAULT_DESK_CONFIG.whatsappDisplay,
      intakeEmail: draftConfig.intakeEmail.trim() || DEFAULT_DESK_CONFIG.intakeEmail,
      coverage: draftConfig.coverage.trim() || DEFAULT_DESK_CONFIG.coverage,
      deskHours: draftConfig.deskHours.trim() || DEFAULT_DESK_CONFIG.deskHours,
    });
    setIsEditing(false);
    setSavedNotice(true);
    window.setTimeout(() => setSavedNotice(false), 2500);
  };

  const handleResetDefaults = () => {
    setDraftConfig(DEFAULT_DESK_CONFIG);
    onUpdateDeskConfig(DEFAULT_DESK_CONFIG);
    setIsEditing(false);
    setSavedNotice(true);
    window.setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <section
      id="contact-whatsapp"
      className="scroll-mt-20 border-t border-slate-200 bg-white py-14 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 sm:p-10">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-wide text-blue-900">
                Contact &amp; WhatsApp Intake Desk
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl [text-wrap:balance]">
                Reach VakilKart Directly Across India
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                Speak directly with the drafting desk, send documents on WhatsApp, or
                configure your preferred VakilKart contact routing details below.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              {savedNotice && (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Desk details updated</span>
                </span>
              )}
              <button
                type="button"
                onClick={handleToggleEdit}
                className="inline-flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{isEditing ? 'Close Editor' : 'Configure Desk Contacts'}</span>
              </button>
            </div>
          </div>

          {isEditing ? (
            <form onSubmit={handleSave} className="mt-6 space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label
                    htmlFor="desk-phone"
                    className="block text-xs font-semibold text-slate-800"
                  >
                    VakilKart Phone Number
                  </label>
                  <input
                    id="desk-phone"
                    type="text"
                    value={draftConfig.phoneDisplay}
                    onChange={(e) =>
                      setDraftConfig({ ...draftConfig, phoneDisplay: e.target.value })
                    }
                    className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-800 focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="desk-whatsapp"
                    className="block text-xs font-semibold text-slate-800"
                  >
                    VakilKart WhatsApp Number
                  </label>
                  <input
                    id="desk-whatsapp"
                    type="text"
                    value={draftConfig.whatsappDisplay}
                    onChange={(e) =>
                      setDraftConfig({
                        ...draftConfig,
                        whatsappDisplay: e.target.value,
                      })
                    }
                    className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-800 focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="desk-email"
                    className="block text-xs font-semibold text-slate-800"
                  >
                    Intake Email Address
                  </label>
                  <input
                    id="desk-email"
                    type="email"
                    value={draftConfig.intakeEmail}
                    onChange={(e) =>
                      setDraftConfig({ ...draftConfig, intakeEmail: e.target.value })
                    }
                    className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-800 focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="desk-coverage"
                    className="block text-xs font-semibold text-slate-800"
                  >
                    Office &amp; Service Coverage (India)
                  </label>
                  <input
                    id="desk-coverage"
                    type="text"
                    value={draftConfig.coverage}
                    onChange={(e) =>
                      setDraftConfig({ ...draftConfig, coverage: e.target.value })
                    }
                    className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-800 focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="desk-hours"
                    className="block text-xs font-semibold text-slate-800"
                  >
                    Desk Hours
                  </label>
                  <input
                    id="desk-hours"
                    type="text"
                    value={draftConfig.deskHours}
                    onChange={(e) =>
                      setDraftConfig({ ...draftConfig, deskHours: e.target.value })
                    }
                    className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-800 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleResetDefaults}
                  className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Reset to Default Desk Info</span>
                </button>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="cursor-pointer rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="cursor-pointer rounded-lg bg-blue-900 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-800"
                  >
                    Save Desk Configuration
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
              {/* Structured Contact Details */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-8">
                <div className="rounded-lg border border-slate-200 bg-white p-4">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <Phone className="h-3.5 w-3.5 text-blue-900" aria-hidden="true" />
                    <span>Call &amp; WhatsApp Desk</span>
                  </div>
                  <a
                    href={formatIndianPhoneForTel(deskConfig.phoneDisplay)}
                    className="mt-1.5 inline-block font-mono text-base font-semibold text-slate-950 tabular-nums hover:text-blue-900"
                  >
                    {deskConfig.phoneDisplay}
                  </a>
                  <p className="mt-0.5 text-xs text-slate-500">{deskConfig.deskHours}</p>
                </div>

                <div className="rounded-lg border border-slate-200 bg-white p-4">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <MessageCircle
                      className="h-3.5 w-3.5 text-emerald-700"
                      aria-hidden="true"
                    />
                    <span>WhatsApp Legal Desk</span>
                  </div>
                  <a
                    href={buildDirectWhatsAppHref(deskConfig)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 inline-block font-mono text-base font-semibold text-slate-950 tabular-nums hover:text-emerald-800"
                  >
                    {deskConfig.whatsappDisplay}
                  </a>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Direct WhatsApp intake &amp; case PDFs
                  </p>
                </div>

                <div className="rounded-lg border border-slate-200 bg-white p-4">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <Mail className="h-3.5 w-3.5 text-blue-900" aria-hidden="true" />
                    <span>Direct Email</span>
                  </div>
                  <a
                    href={`mailto:${encodeURIComponent(deskConfig.intakeEmail)}`}
                    className="mt-1.5 block truncate text-base font-semibold text-slate-950 hover:text-blue-900"
                  >
                    {deskConfig.intakeEmail}
                  </a>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Pre-filled Mailto dispatch target
                  </p>
                </div>

                <div className="rounded-lg border border-slate-200 bg-white p-4">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <MapPin className="h-3.5 w-3.5 text-blue-900" aria-hidden="true" />
                    <span>Service Coverage Across India</span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed font-medium text-slate-800">
                    {deskConfig.coverage}
                  </p>
                </div>
              </div>

              {/* Direct Action Buttons */}
              <div className="flex flex-col gap-3 lg:col-span-4">
                <a
                  href={formatIndianPhoneForTel(deskConfig.phoneDisplay)}
                  className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  <span>Call Now</span>
                </a>

                <a
                  href={buildDirectWhatsAppHref(deskConfig)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  <span>Open WhatsApp</span>
                </a>

                <a
                  href={`mailto:${encodeURIComponent(deskConfig.intakeEmail)}?subject=${encodeURIComponent('VakilKart Legal Drafting Inquiry')}`}
                  className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition-colors duration-150 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  <span>Send Email</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
