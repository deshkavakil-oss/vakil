import { Menu, Scale, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onRequestLegalNotice: () => void;
}

const NAV_LINKS = [
  { label: 'Legal Notice', href: '#legal-notice' },
  { label: 'Drafts & MoU', href: '#drafts-mou' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Contact & WhatsApp', href: '#contact-whatsapp' },
];

export function Header({ onRequestLegalNotice }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#top"
          className="inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-800"
          aria-label="VakilKart Home"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-900 text-white">
            <Scale className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="font-display text-xl font-semibold tracking-tight">
            VakilKart
          </span>
        </a>

        {/* Zone 2: 4 single-line navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden items-center gap-7 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="shrink-0 whitespace-nowrap text-sm font-medium text-slate-600 underline-offset-4 transition-colors duration-150 hover:text-slate-950 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-800"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={onRequestLegalNotice}
            className="hidden shrink-0 cursor-pointer whitespace-nowrap rounded-lg bg-blue-900 px-4 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800 sm:inline-flex"
          >
            Request Legal Notice
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition-colors hover:bg-slate-100 md:hidden"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleMobileNavClick}
                className="rounded-md px-2 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-950"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onRequestLegalNotice();
              }}
              className="mt-1 w-full cursor-pointer rounded-lg bg-blue-900 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-blue-800"
            >
              Request Legal Notice
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
