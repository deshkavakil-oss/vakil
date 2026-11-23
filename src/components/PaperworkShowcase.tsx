import { ArrowUpRight, Check } from 'lucide-react';
import { POPULAR_PAPERWORK_SERVICES } from '../data/services';
import { DocumentType, PaperworkServiceItem } from '../types/legal';

interface PaperworkShowcaseProps {
  selectedDocumentType: DocumentType;
  onSelectService: (service: PaperworkServiceItem) => void;
}

export function PaperworkShowcase({
  selectedDocumentType,
  onSelectService,
}: PaperworkShowcaseProps) {
  return (
    <section id="legal-notice" className="scroll-mt-20 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div id="drafts-mou" className="max-w-2xl scroll-mt-24">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl [text-wrap:balance]">
            Popular Legal Paperwork &amp; Notice Drafting
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600">
            Legal Notice drafting is our primary priority desk. Select any document
            category below to pre-select it in the inquiry form and prepare your
            structured call sheet.
          </p>
        </div>

        {/* Asymmetric Bento Grid: Featured Legal Notice spans 2 columns */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {POPULAR_PAPERWORK_SERVICES.map((service) => {
            const isSelected = selectedDocumentType === service.documentType;
            const isFeatured = Boolean(service.featured);

            return (
              <article
                key={service.id}
                className={`flex flex-col justify-between rounded-xl border p-6 transition-colors duration-150 sm:p-7 ${
                  isFeatured ? 'lg:col-span-2' : ''
                } ${
                  isSelected
                    ? 'border-blue-900 bg-white ring-1 ring-blue-900/20'
                    : isFeatured
                      ? 'border-slate-300 bg-white'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  {/* Unboxed editorial metadata line */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                    <div className="flex items-center gap-2 font-medium">
                      <span className="font-mono text-slate-400 tabular-nums">
                        {service.index}
                      </span>
                      <span className="text-slate-700">{service.categoryMeta}</span>
                      <span aria-hidden="true">·</span>
                      <span>{service.turnaroundMeta}</span>
                    </div>
                    {isFeatured && (
                      <span className="font-semibold text-blue-900">
                        #1 Primary Desk
                      </span>
                    )}
                  </div>

                  <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
                    {service.title}
                  </h3>

                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600 sm:text-base">
                    {service.summary}
                  </p>

                  <ul
                    className={`mt-5 grid gap-2 text-sm text-slate-700 ${
                      isFeatured ? 'sm:grid-cols-2' : 'grid-cols-1'
                    }`}
                  >
                    {service.useCases.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-blue-900"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-xs font-medium text-slate-500">
                    {isSelected ? 'Selected in Intake Form' : 'Click to draft this document'}
                  </span>
                  <button
                    type="button"
                    onClick={() => onSelectService(service)}
                    className={`inline-flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800 ${
                      isSelected
                        ? 'bg-blue-900 text-white hover:bg-blue-800'
                        : 'border border-slate-200 bg-slate-50 text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <span>
                      {isFeatured ? 'Request Legal Notice' : `Draft ${service.documentType.split(' ')[0]}`}
                    </span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
