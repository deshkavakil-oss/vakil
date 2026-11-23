import { FileText } from 'lucide-react';
import { useState } from 'react';
import { HOW_IT_WORKS_STEPS } from '../data/services';

const DOCUMENTS_IMAGE_SRC = '/src/assets/images/legal_draft_documents_1795462395964.jpg';

export function HowItWorksSection() {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 border-y border-slate-200 bg-white py-14 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left: 4:3 Editorial Legal Documentation Image */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] h-full min-h-[280px] w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
              {!imgError ? (
                <img
                  src={DOCUMENTS_IMAGE_SRC}
                  alt="Bound Memorandum of Understanding, Legal Contracts, and Affidavit sheets on a stone desk"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center bg-slate-100 p-8 text-center text-slate-700">
                  <FileText className="mb-3 h-10 w-10 text-blue-900" aria-hidden="true" />
                  <p className="font-display text-lg font-semibold text-slate-900">
                    Structured Legal Paperwork
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Notices, Affidavits &amp; MoUs formatted for Indian jurisdictions
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right: 3-Step Workflow */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <p className="text-xs font-semibold tracking-wide text-blue-900">
              Intake &amp; Callback Process
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl [text-wrap:balance]">
              How VakilKart Turns Your Case Facts Into a Ready Call Sheet
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              Avoid vague phone explanations. Submit structured facts once, pick your
              callback slot, and dispatch your summary directly over WhatsApp or Email.
            </p>

            <div className="mt-8 divide-y divide-slate-200 border-t border-slate-200">
              {HOW_IT_WORKS_STEPS.map((item) => (
                <div
                  key={item.step}
                  className="grid grid-cols-1 gap-2 py-5 sm:grid-cols-12 sm:gap-4"
                >
                  <div className="font-mono text-sm font-semibold text-blue-900 tabular-nums sm:col-span-2">
                    {item.step}
                  </div>
                  <div className="sm:col-span-10">
                    <h3 className="text-base font-semibold text-slate-950">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
