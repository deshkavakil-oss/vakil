import { Scale } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-950 py-10 text-slate-300">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 border-b border-slate-800 pb-8 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2.5 text-white">
              <Scale className="h-4 w-4 text-blue-400" aria-hidden="true" />
              <span className="font-display text-lg font-semibold tracking-tight">
                VakilKart
              </span>
            </div>
            <p className="mt-2 max-w-md text-xs leading-relaxed text-slate-400">
              Online Legal Notice, Affidavit, MoU &amp; Legal Documentation Requests
              Across India. Structured case intake for prompt advocate review and
              callback coordination.
            </p>
          </div>

          <nav
            aria-label="Footer Navigation"
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-slate-300"
          >
            <a href="#legal-notice" className="hover:text-white">
              Legal Notice
            </a>
            <a href="#drafts-mou" className="hover:text-white">
              Drafts &amp; MoU
            </a>
            <a href="#how-it-works" className="hover:text-white">
              How It Works
            </a>
            <a href="#drafting-form" className="hover:text-white">
              Callback Form
            </a>
            <a href="#contact-whatsapp" className="hover:text-white">
              Contact &amp; WhatsApp
            </a>
          </nav>
        </div>

        <div className="mt-6 flex flex-col justify-between gap-3 text-xs text-slate-400 sm:flex-row sm:items-center">
          <p>
            © {currentYear} VakilKart India. All rights reserved.
          </p>
          <p>
            Submitting an intake summary does not create a vakalatnama until formal
            engagement is confirmed.
          </p>
        </div>
      </div>
    </footer>
  );
}
