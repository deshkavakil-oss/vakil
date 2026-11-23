import { useEffect, useRef, useState } from 'react';
import { ContactDeskSection } from './components/ContactDeskSection';
import { DraftingFormSection } from './components/DraftingFormSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { PaperworkShowcase } from './components/PaperworkShowcase';
import { DEFAULT_DESK_CONFIG } from './data/services';
import {
  DeskContactConfig,
  DocumentType,
  PaperworkServiceItem,
  QuickTopicChip,
} from './types/legal';

const DESK_STORAGE_KEY = 'vakilkart_desk_config_v2';

function loadSavedDeskConfig(): DeskContactConfig {
  try {
    const raw = window.localStorage.getItem(DESK_STORAGE_KEY);
    if (!raw) return DEFAULT_DESK_CONFIG;
    const parsed = JSON.parse(raw) as Partial<DeskContactConfig>;
    return {
      phoneDisplay: parsed.phoneDisplay || DEFAULT_DESK_CONFIG.phoneDisplay,
      whatsappDisplay: parsed.whatsappDisplay || DEFAULT_DESK_CONFIG.whatsappDisplay,
      intakeEmail: parsed.intakeEmail || DEFAULT_DESK_CONFIG.intakeEmail,
      coverage: parsed.coverage || DEFAULT_DESK_CONFIG.coverage,
      deskHours: parsed.deskHours || DEFAULT_DESK_CONFIG.deskHours,
    };
  } catch {
    return DEFAULT_DESK_CONFIG;
  }
}

export default function App() {
  const [selectedTopicId, setSelectedTopicId] = useState<string>('legal-notice');
  const [documentType, setDocumentType] = useState<DocumentType>('Legal Notice');
  const [matterSummary, setMatterSummary] = useState<string>('');
  const [deskConfig, setDeskConfig] = useState<DeskContactConfig>(loadSavedDeskConfig);

  const formNameInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(DESK_STORAGE_KEY, JSON.stringify(deskConfig));
    } catch {
      // Ignore storage quota errors gracefully
    }
  }, [deskConfig]);

  const scrollToFormAndFocus = () => {
    const formEl = document.getElementById('drafting-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    window.setTimeout(() => {
      formNameInputRef.current?.focus({ preventScroll: true });
    }, 350);
  };

  const handleRequestLegalNotice = () => {
    setSelectedTopicId('legal-notice');
    setDocumentType('Legal Notice');
    scrollToFormAndFocus();
  };

  const handleSelectQuickTopic = (chip: QuickTopicChip) => {
    setSelectedTopicId(chip.id);
    setDocumentType(chip.documentType);
    setMatterSummary((prev) => {
      // Only seed the prompt if empty or previously seeded by another quick-chip prompt
      const isSeededPrompt =
        prev.trim() === '' ||
        prev.startsWith('Need a formal Legal Notice drafted.') ||
        prev.startsWith('Cheque Bounce (Sec 138 NI Act)') ||
        prev.startsWith('Affidavit drafting request') ||
        prev.startsWith('Memorandum of Understanding (MoU)') ||
        prev.startsWith('Property / Landlord-Tenant Legal Notice');
      return isSeededPrompt ? `${chip.prefillPrompt} ` : prev;
    });
    scrollToFormAndFocus();
  };

  const handleSelectServiceCard = (service: PaperworkServiceItem) => {
    setDocumentType(service.documentType);
    if (service.documentType === 'Legal Notice') {
      setSelectedTopicId('legal-notice');
    } else if (service.documentType === 'Affidavit') {
      setSelectedTopicId('affidavit');
    } else if (service.documentType === 'MoU (Memorandum of Understanding)') {
      setSelectedTopicId('mou-draft');
    } else {
      setSelectedTopicId('');
    }
    scrollToFormAndFocus();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header onRequestLegalNotice={handleRequestLegalNotice} />

      <main>
        <HeroSection
          selectedTopicId={selectedTopicId}
          onSelectQuickTopic={handleSelectQuickTopic}
          onPrimaryCta={handleRequestLegalNotice}
          deskConfig={deskConfig}
        />

        <PaperworkShowcase
          selectedDocumentType={documentType}
          onSelectService={handleSelectServiceCard}
        />

        <HowItWorksSection />

        <DraftingFormSection
          documentType={documentType}
          onDocumentTypeChange={setDocumentType}
          matterSummary={matterSummary}
          onMatterSummaryChange={setMatterSummary}
          deskConfig={deskConfig}
          formNameInputRef={formNameInputRef}
        />

        <ContactDeskSection
          deskConfig={deskConfig}
          onUpdateDeskConfig={setDeskConfig}
        />
      </main>

      <Footer />
    </div>
  );
}
